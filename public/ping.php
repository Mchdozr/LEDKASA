<?php
/**
 * Minimal runtime probe for Plesk PHP.
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
echo json_encode(
    array(
        'ok' => true,
        'php' => PHP_VERSION,
        'sapi' => PHP_SAPI,
    ),
    JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
);
