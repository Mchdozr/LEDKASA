<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, bool $ok, string $message, bool $wantsJson, ?string $redirectState = null): never
{
    if (!$wantsJson && $redirectState !== null) {
        $safeState = $redirectState === 'basarili' ? 'basarili' : 'hata';
        header('Location: /teklif-al/?durum=' . $safeState . '#durum-' . $safeState, true, 303);
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
        if (str_starts_with($directoryPrefix, $rootPrefix)) {
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
                static fn ($timestamp): bool => is_int($timestamp)
            ));
        }

        $now = time();
        $windowStart = $now - $windowSeconds;
        $timestamps = array_values(array_filter(
            $timestamps,
            static fn (int $timestamp): bool => $timestamp > $windowStart && $timestamp <= $now
        ));
        if (count($timestamps) >= $maximumRequests) {
            return 'throttled';
        }

        $timestamps[] = $now;
        $encoded = json_encode($timestamps, JSON_THROW_ON_ERROR);
        rewind($handle);
        if (!ftruncate($handle, 0) || fwrite($handle, $encoded) === false || !fflush($handle)) {
            return 'unavailable';
        }

        return 'allowed';
    } catch (JsonException) {
        return 'unavailable';
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

$accept = is_string($_SERVER['HTTP_ACCEPT'] ?? null) ? strtolower($_SERVER['HTTP_ACCEPT']) : '';
$wantsJson = str_contains($accept, 'application/json');

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
if ($rateLimitState !== 'allowed') {
    respond(503, false, 'Talebiniz şu anda işlenemedi. Lütfen daha sonra yeniden deneyin.', $wantsJson, 'hata');
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
$message = $readField('message');
$consent = $_POST['kvkk_consent'] ?? '';

$hasValidLengths = strlen($name) <= 120
    && strlen($email) <= 254
    && strlen($phone) <= 40
    && strlen($company) <= 160
    && strlen($product) <= 80
    && strlen($message) <= 5000;

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
$bodyLines = [
    'Yeni teklif talebi',
    '',
    'Ad soyad: ' . $name,
    'E-posta: ' . $email,
    'Telefon: ' . ($phone !== '' ? $phone : 'Belirtilmedi'),
    'Firma: ' . ($company !== '' ? $company : 'Belirtilmedi'),
    'Ürün: ' . ($product !== '' ? $product : 'Belirtilmedi'),
    '',
    'Proje detayları:',
    $message,
];

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: LEDKASA Web Sitesi <no-reply@ledkasa.com.tr>',
    'Reply-To: ' . $email,
];

$sent = mail($recipient, $subject, implode("\n", $bodyLines), implode("\r\n", $headers));
if (!$sent) {
    respond(503, false, 'Talebiniz şu anda gönderilemedi. Lütfen daha sonra yeniden deneyin.', $wantsJson, 'hata');
}

respond(200, true, 'Talebiniz alınmıştır.', $wantsJson, 'basarili');
