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

$accept = is_string($_SERVER['HTTP_ACCEPT'] ?? null) ? strtolower($_SERVER['HTTP_ACCEPT']) : '';
$wantsJson = str_contains($accept, 'application/json');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Bu uç nokta yalnızca form gönderimlerini kabul eder.', $wantsJson);
}

$honeypot = is_string($_POST['website'] ?? null) ? trim($_POST['website']) : '';
if ($honeypot !== '') {
    respond(200, true, 'Talebiniz alınmıştır.', $wantsJson, 'basarili');
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
