<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, bool $ok, string $message, bool $wantsJson, ?string $redirectState = null): void
{
    if (!$wantsJson && $redirectState !== null) {
        $safeState = $redirectState === 'basarili' ? 'basarili' : 'hata';
        header('Location: /teklif-al/?durum=' . $safeState . '#quote-form-heading', true, 303);
        exit;
    }

    http_response_code($status);
    echo json_encode(
        ['ok' => $ok, 'message' => $message],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

function hasAllowedRequestContext(): bool
{
    $fetchSite = $_SERVER['HTTP_SEC_FETCH_SITE'] ?? null;
    if (is_string($fetchSite) && $fetchSite !== '') {
        $fetchSite = strtolower(trim($fetchSite));
        if (!in_array($fetchSite, ['same-origin', 'same-site', 'none'], true)) {
            return false;
        }
    }

    $origin = $_SERVER['HTTP_ORIGIN'] ?? null;
    if (!is_string($origin) || trim($origin) === '') {
        return true;
    }

    $origin = trim($origin);
    $parts = parse_url($origin);
    if (
        !is_array($parts)
        || !isset($parts['scheme'], $parts['host'])
        || !in_array(strtolower((string) $parts['scheme']), ['http', 'https'], true)
        || isset($parts['user'], $parts['pass'], $parts['query'], $parts['fragment'])
        || (isset($parts['path']) && $parts['path'] !== '' && $parts['path'] !== '/')
    ) {
        return false;
    }

    $normalizedOrigin = strtolower(rtrim($origin, '/'));
    $allowedOrigins = ['https://ledkasa.com.tr', 'https://www.ledkasa.com.tr'];
    $configuredOrigins = getenv('LEDKASA_CONTACT_ALLOWED_ORIGINS');
    if (is_string($configuredOrigins) && trim($configuredOrigins) !== '') {
        foreach (explode(',', $configuredOrigins) as $configuredOrigin) {
            $configuredOrigin = strtolower(rtrim(trim($configuredOrigin), '/'));
            if ($configuredOrigin !== '') {
                $allowedOrigins[] = $configuredOrigin;
            }
        }
    }

    if (in_array($normalizedOrigin, $allowedOrigins, true)) {
        return true;
    }

    $requestHost = $_SERVER['HTTP_HOST'] ?? null;
    if (!is_string($requestHost) || trim($requestHost) === '') {
        return false;
    }

    $scheme = isset($_SERVER['HTTPS']) && strtolower((string) $_SERVER['HTTPS']) !== 'off' ? 'https' : 'http';
    $requestOrigin = $scheme . '://' . strtolower(trim($requestHost));
    return hash_equals($requestOrigin, $normalizedOrigin);
}

function rateLimitDirectory(): ?string
{
    $configuredDirectory = getenv('LEDKASA_CONTACT_RATE_LIMIT_DIR');
    $directory = is_string($configuredDirectory) && trim($configuredDirectory) !== ''
        ? trim($configuredDirectory)
        : rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'ledkasa-contact-rate-limit';

    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        return null;
    }

    $resolvedDirectory = realpath($directory);
    if ($resolvedDirectory === false || !is_writable($resolvedDirectory)) {
        return null;
    }

    $documentRoot = $_SERVER['DOCUMENT_ROOT'] ?? null;
    $resolvedDocumentRoot = is_string($documentRoot) && $documentRoot !== '' ? realpath($documentRoot) : false;
    if ($resolvedDocumentRoot !== false) {
        $rootPrefix = rtrim(strtolower($resolvedDocumentRoot), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
        $directoryPrefix = rtrim(strtolower($resolvedDirectory), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
        if (strpos($directoryPrefix, $rootPrefix) === 0) {
            return null;
        }
    }

    return $resolvedDirectory;
}

function consumeRateLimit(int $maximumRequests = 5, int $windowSeconds = 600): string
{
    $directory = rateLimitDirectory();
    if ($directory === null) {
        return 'unavailable';
    }

    $remoteAddress = $_SERVER['REMOTE_ADDR'] ?? '';
    $clientKey = is_string($remoteAddress) && filter_var($remoteAddress, FILTER_VALIDATE_IP) !== false
        ? $remoteAddress
        : 'unknown-client';
    $filePath = $directory . DIRECTORY_SEPARATOR . hash('sha256', $clientKey) . '.json';
    $handle = @fopen($filePath, 'c+');
    if ($handle === false) {
        return 'unavailable';
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            return 'unavailable';
        }

        rewind($handle);
        $contents = stream_get_contents($handle);
        if ($contents === false) {
            return 'unavailable';
        }

        $timestamps = [];
        if ($contents !== '') {
            $decoded = json_decode($contents, true);
            if (!is_array($decoded)) {
                return 'unavailable';
            }
            $timestamps = array_values(array_filter(
                $decoded,
                static function ($timestamp) {
                    return is_int($timestamp);
                }
            ));
        }

        $now = time();
        $windowStart = $now - $windowSeconds;
        $timestamps = array_values(array_filter(
            $timestamps,
            static function ($timestamp) use ($windowStart, $now) {
                return is_int($timestamp) && $timestamp > $windowStart && $timestamp <= $now;
            }
        ));
        if (count($timestamps) >= $maximumRequests) {
            return 'throttled';
        }

        $timestamps[] = $now;
        $encoded = json_encode($timestamps);
        if ($encoded === false) {
            return 'unavailable';
        }
        rewind($handle);
        if (!ftruncate($handle, 0) || fwrite($handle, $encoded) === false || !fflush($handle)) {
            return 'unavailable';
        }

        return 'allowed';
    } catch (Exception $exception) {
        return 'unavailable';
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

/**
 * @return array{host:?string,port:int,user:?string,pass:?string,encryption:string,from:string}
 */
function mailTransportConfig(): array
{
    $localConfigPath = __DIR__ . '/contact.local.php';
    $local = [];
    if (is_file($localConfigPath)) {
        if (!defined('LEDKASA_CONTACT_BOOTSTRAP')) {
            define('LEDKASA_CONTACT_BOOTSTRAP', true);
        }
        $loaded = include $localConfigPath;
        if (is_array($loaded)) {
            $local = $loaded;
        }
    }

    $envOrLocal = static function (string $envKey, string $localKey, ?string $default = null) use ($local): ?string {
        $envValue = getenv($envKey);
        if (is_string($envValue) && trim($envValue) !== '') {
            return trim($envValue);
        }
        $localValue = $local[$localKey] ?? null;
        if (is_string($localValue) && trim($localValue) !== '') {
            return trim($localValue);
        }
        return $default;
    };

    $portRaw = $envOrLocal('LEDKASA_SMTP_PORT', 'port', '465');
    $port = is_numeric($portRaw) ? (int) $portRaw : 465;

    return [
        'host' => $envOrLocal('LEDKASA_SMTP_HOST', 'host'),
        'port' => $port > 0 ? $port : 465,
        'user' => $envOrLocal('LEDKASA_SMTP_USER', 'user'),
        'pass' => $envOrLocal('LEDKASA_SMTP_PASS', 'pass'),
        'encryption' => strtolower($envOrLocal('LEDKASA_SMTP_ENCRYPTION', 'encryption', 'ssl') ?? 'ssl'),
        'from' => $envOrLocal('LEDKASA_MAIL_FROM', 'from', 'no-reply@ledkasa.com.tr') ?? 'no-reply@ledkasa.com.tr',
    ];
}

function smtpRead($socket): string
{
    $data = '';
    while (($line = fgets($socket, 515)) !== false) {
        $data .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }
    return $data;
}

function smtpExpect($socket, array $codes): bool
{
    $response = smtpRead($socket);
    foreach ($codes as $code) {
        if (strpos($response, (string) $code) === 0) {
            return true;
        }
    }
    return false;
}

function smtpCommand($socket, string $command, array $codes): bool
{
    fwrite($socket, $command . "\r\n");
    return smtpExpect($socket, $codes);
}

function sendViaSmtp(string $recipient, string $subject, string $body, string $replyTo, array $transport, bool $requireAuth = true): bool
{
    $host = $transport['host'] ?? null;
    if (!is_string($host) || $host === '') {
        return false;
    }

    $user = $transport['user'] ?? null;
    $pass = $transport['pass'] ?? null;
    if ($requireAuth && (!is_string($user) || $user === '' || !is_string($pass) || $pass === '')) {
        return false;
    }

    $encryption = strtolower((string) ($transport['encryption'] ?? ($requireAuth ? 'ssl' : 'none')));
    $port = (int) ($transport['port'] ?? ($encryption === 'ssl' ? 465 : 25));
    $from = is_string($transport['from'] ?? null) && filter_var($transport['from'], FILTER_VALIDATE_EMAIL)
        ? $transport['from']
        : 'info@ledkasa.com.tr';

    $remoteHost = $host;
    if ($encryption === 'ssl') {
        $remoteHost = 'ssl://' . $host;
    }
    $socket = @stream_socket_client($remoteHost . ':' . $port, $errno, $errstr, 20, STREAM_CLIENT_CONNECT);
    if ($socket === false) {
        return false;
    }

    stream_set_timeout($socket, 20);

    try {
        if (!smtpExpect($socket, [220])) {
            return false;
        }
        if (!smtpCommand($socket, 'EHLO ledkasa.com.tr', [250])) {
            return false;
        }

        if ($encryption === 'tls') {
            if (!smtpCommand($socket, 'STARTTLS', [220])) {
                return false;
            }
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                return false;
            }
            if (!smtpCommand($socket, 'EHLO ledkasa.com.tr', [250])) {
                return false;
            }
        }

        if ($requireAuth) {
            if (!smtpCommand($socket, 'AUTH LOGIN', [334])) {
                return false;
            }
            if (!smtpCommand($socket, base64_encode((string) $user), [334])) {
                return false;
            }
            if (!smtpCommand($socket, base64_encode((string) $pass), [235])) {
                return false;
            }
        }

        if (!smtpCommand($socket, 'MAIL FROM:<' . $from . '>', [250])) {
            return false;
        }
        if (!smtpCommand($socket, 'RCPT TO:<' . $recipient . '>', [250, 251])) {
            return false;
        }
        if (!smtpCommand($socket, 'DATA', [354])) {
            return false;
        }

        $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
        $normalizedBody = str_replace(["\r\n", "\r"], "\n", $body);
        $normalizedBody = preg_replace('/^\./m', '..', $normalizedBody);
        $payload = [
            'Date: ' . date('r'),
            'From: LEDKASA Web Sitesi <' . $from . '>',
            'To: <' . $recipient . '>',
            'Reply-To: ' . $replyTo,
            'Subject: ' . $encodedSubject,
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            '',
            $normalizedBody,
            '.',
        ];
        fwrite($socket, implode("\r\n", $payload) . "\r\n");
        if (!smtpExpect($socket, [250])) {
            return false;
        }

        smtpCommand($socket, 'QUIT', [221]);
        return true;
    } finally {
        fclose($socket);
    }
}

function sendViaPhpMail(string $recipient, string $subject, string $body, string $replyTo, string $from): bool
{
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'From: LEDKASA Web Sitesi <' . $from . '>',
        'Reply-To: ' . $replyTo,
        'X-Mailer: LEDKASA-Contact/1.0',
    ];

    return @mail(
        $recipient,
        $encodedSubject,
        $body,
        implode("\r\n", $headers),
        '-f' . $from
    );
}

/**
 * @return array{ok:bool,channel:string}
 */
function deliverContactMail(string $recipient, string $subject, string $body, string $replyTo): array
{
    $transport = mailTransportConfig();
    $from = filter_var($transport['from'], FILTER_VALIDATE_EMAIL) ? $transport['from'] : 'info@ledkasa.com.tr';
    $transport['from'] = $from;

    $user = is_string($transport['user'] ?? null) ? trim((string) $transport['user']) : '';
    $pass = is_string($transport['pass'] ?? null) ? trim((string) $transport['pass']) : '';
    $configuredHost = is_string($transport['host'] ?? null) ? trim((string) $transport['host']) : '';
    $hasRemoteSmtp = $configuredHost !== '' && $user !== '' && $pass !== '';

    $attempts = [];
    if ($hasRemoteSmtp) {
        $attempts[] = ['channel' => 'smtp', 'transport' => $transport, 'auth' => true];
        $attempts[] = [
            'channel' => 'smtp-587-tls',
            'transport' => array_merge($transport, ['host' => $configuredHost, 'port' => 587, 'encryption' => 'tls']),
            'auth' => true,
        ];
        $attempts[] = [
            'channel' => 'smtp-local-465',
            'transport' => array_merge($transport, ['host' => '127.0.0.1', 'port' => 465, 'encryption' => 'ssl']),
            'auth' => true,
        ];
        $attempts[] = [
            'channel' => 'smtp-local-587',
            'transport' => array_merge($transport, ['host' => '127.0.0.1', 'port' => 587, 'encryption' => 'tls']),
            'auth' => true,
        ];
        $attempts[] = [
            'channel' => 'smtp-localhost-465',
            'transport' => array_merge($transport, ['host' => 'localhost', 'port' => 465, 'encryption' => 'ssl']),
            'auth' => true,
        ];
    }

    $attempts[] = [
        'channel' => 'local-smtp',
        'transport' => ['host' => '127.0.0.1', 'port' => 25, 'encryption' => 'none', 'from' => $from],
        'auth' => false,
    ];

    foreach ($attempts as $attempt) {
        if (sendViaSmtp($recipient, $subject, $body, $replyTo, $attempt['transport'], $attempt['auth'])) {
            return ['ok' => true, 'channel' => $attempt['channel']];
        }
    }

    $allowPhpMail = getenv('LEDKASA_CONTACT_ALLOW_PHP_MAIL');
    $phpMailAllowed = is_string($allowPhpMail) && in_array(strtolower(trim($allowPhpMail)), ['1', 'true', 'yes', 'on'], true);
    if ($phpMailAllowed && sendViaPhpMail($recipient, $subject, $body, $replyTo, $from)) {
        return ['ok' => true, 'channel' => 'php-mail'];
    }

    return ['ok' => false, 'channel' => $hasRemoteSmtp ? 'smtp-failed' : 'smtp-missing'];
}

$accept = is_string($_SERVER['HTTP_ACCEPT'] ?? null) ? strtolower($_SERVER['HTTP_ACCEPT']) : '';
$wantsJson = strpos($accept, 'application/json') !== false;

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Bu uç nokta yalnızca form gönderimlerini kabul eder.', $wantsJson);
}

if (!hasAllowedRequestContext()) {
    respond(403, false, 'İstek doğrulanamadı. Lütfen formu yeniden açıp deneyin.', $wantsJson, 'hata');
}

$honeypot = is_string($_POST['website'] ?? null) ? trim($_POST['website']) : '';
if ($honeypot !== '') {
    respond(200, true, 'Talebiniz alınmıştır.', $wantsJson, 'basarili');
}

$rateLimitState = consumeRateLimit();
if ($rateLimitState === 'throttled') {
    respond(429, false, 'Çok fazla istek gönderildi. Lütfen daha sonra yeniden deneyin.', $wantsJson, 'hata');
}

$readField = static function (string $key): string {
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }

    $value = strip_tags($value);
    $value = str_replace(["\0", "\r"], '', $value);
    return trim($value);
};

$name = $readField('name');
$email = $readField('email');
$phone = $readField('phone');
$company = $readField('company');
$product = $readField('product');
$installType = $readField('install_type');
$environment = $readField('environment');
$quantityEstimate = $readField('quantity_estimate');
$message = $readField('message');
$consent = $_POST['kvkk_consent'] ?? '';

$allowedInstallTypes = ['', 'sabit', 'rental', 'poster', 'karisik'];
$allowedEnvironments = ['', 'indoor', 'outdoor', 'her-ikisi'];
$allowedProducts = [
    '',
    'cnc-led-kasa',
    'kapaksiz-led-kabinet',
    'rental-led-kabinet',
    'poster-led-kasa',
    'katlanabilir-poster-led-kasa',
    'cat6-kablo',
    'power-plug',
    'flat-kablo',
    'cable-set',
];

$hasValidLengths = strlen($name) <= 120
    && strlen($email) <= 254
    && strlen($phone) <= 40
    && strlen($company) <= 160
    && strlen($product) <= 80
    && strlen($installType) <= 40
    && strlen($environment) <= 40
    && strlen($quantityEstimate) <= 120
    && strlen($message) <= 5000
    && in_array($installType, $allowedInstallTypes, true)
    && in_array($environment, $allowedEnvironments, true)
    && in_array($product, $allowedProducts, true);

if (
    $name === ''
    || $message === ''
    || !$hasValidLengths
    || filter_var($email, FILTER_VALIDATE_EMAIL) === false
    || $consent !== 'on'
) {
    respond(422, false, 'Lütfen zorunlu alanları geçerli bilgilerle doldurun.', $wantsJson, 'hata');
}

$configuredRecipient = getenv('LEDKASA_CONTACT_RECIPIENT');
$recipient = is_string($configuredRecipient) && filter_var($configuredRecipient, FILTER_VALIDATE_EMAIL) !== false
    ? $configuredRecipient
    : 'info@ledkasa.com.tr';

$subject = 'LEDKASA web sitesi teklif talebi';
$installLabels = [
    'sabit' => 'Sabit kurulum',
    'rental' => 'Rental / geçici',
    'poster' => 'Poster / dikey',
    'karisik' => 'Karışık / emin değilim',
];
$environmentLabels = [
    'indoor' => 'İç mekân',
    'outdoor' => 'Dış mekân',
    'her-ikisi' => 'Her ikisi',
];

$bodyLines = [
    'Yeni teklif talebi',
    '',
    'Ad soyad: ' . $name,
    'E-posta: ' . $email,
    'Telefon: ' . ($phone !== '' ? $phone : 'Belirtilmedi'),
    'Firma: ' . ($company !== '' ? $company : 'Belirtilmedi'),
    'Ürün: ' . ($product !== '' ? $product : 'Belirtilmedi'),
    'Kurulum tipi: ' . ($installLabels[$installType] ?? 'Belirtilmedi'),
    'Ortam: ' . ($environmentLabels[$environment] ?? 'Belirtilmedi'),
    'Tahmini ölçü/adet: ' . ($quantityEstimate !== '' ? $quantityEstimate : 'Belirtilmedi'),
    '',
    'Proje detayları:',
    $message,
];

$delivery = deliverContactMail($recipient, $subject, implode("\n", $bodyLines), $email);
if (!$delivery['ok']) {
    $message = $delivery['channel'] === 'smtp-missing'
        ? 'Mail gönderimi için sunucu SMTP ayarı eksik. Lütfen daha sonra yeniden deneyin veya telefon/WhatsApp ile yazın.'
        : 'Talebiniz şu anda gönderilemedi. Lütfen daha sonra yeniden deneyin veya telefon/WhatsApp ile yazın.';
    respond(503, false, $message, $wantsJson, 'hata');
}

respond(200, true, 'Talebiniz alınmıştır. En kısa sürede size dönüş yapacağız.', $wantsJson, 'basarili');
