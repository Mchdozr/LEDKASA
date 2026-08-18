import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { createServer } from 'node:net';
import { join, resolve } from 'node:path';
import { after, before, test } from 'node:test';
import { phpAvailable } from './php-available.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const describePhp = phpAvailable() ? test : test.skip;
const expectedProductRoutes = [
  ['led-ekran-kasalari/cnc-led-kasa', 'CNC LED Kasa'],
  ['led-ekran-kasalari/kapaksiz-led-kabinet', 'Kapaksız LED Kabinet'],
  ['led-ekran-kasalari/rental-led-kabinet', 'Rental LED Kabinet'],
  ['led-ekran-kasalari/poster-led-kasa', 'Poster LED Kasa'],
  ['led-ekran-kasalari/katlanabilir-poster-led-kasa', 'Katlanabilir Poster LED Kasa'],
  ['guc-ve-baglanti-ekipmanlari/cat6-kablo', 'Cat6 Kablo'],
  ['guc-ve-baglanti-ekipmanlari/power-plug', 'Power Plug'],
  ['guc-ve-baglanti-ekipmanlari/flat-kablo', 'Flat Kablo'],
  ['guc-ve-baglanti-ekipmanlari/cable-set', 'Cable Set'],
];

const expectedCategoryRoutes = [
  ['led-ekran-kasalari', 'LED Ekran Kasaları'],
  ['guc-ve-baglanti-ekipmanlari', 'Güç ve Bağlantı Ekipmanları'],
];

const builtHtml = (route) =>
  readFileSync(resolve(projectRoot, 'dist', ...route.split('/'), 'index.html'), 'utf8');

const getAvailablePort = () => new Promise((resolvePort, reject) => {
  const server = createServer();
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => {
    const address = server.address();
    server.close(() => resolvePort(address.port));
  });
});

let phpServer;
let phpBaseUrl;
let rateLimitDirectory;

before(async () => {
  const build = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], {
    cwd: projectRoot,
    encoding: 'utf8',
  });
  assert.equal(build.status, 0, `Astro build failed:\n${build.stdout}\n${build.stderr}`);

  if (!phpAvailable()) return;

  rateLimitDirectory = mkdtempSync(join(tmpdir(), 'ledkasa-routes-contact-'));
  const port = await getAvailablePort();
  phpBaseUrl = `http://127.0.0.1:${port}`;
  phpServer = spawn('php', ['-S', `127.0.0.1:${port}`, '-t', 'public'], {
    cwd: projectRoot,
    env: {
      ...process.env,
      LEDKASA_CONTACT_RECIPIENT: 'test-recipient@example.com',
      LEDKASA_CONTACT_RATE_LIMIT_DIR: rateLimitDirectory,
    },
    stdio: 'ignore',
  });

  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      await fetch(`${phpBaseUrl}/contact.php`);
      return;
    } catch {
      await new Promise((resolveWait) => setTimeout(resolveWait, 100));
    }
  }
  throw new Error('PHP test server did not start');
});

after(() => {
  phpServer?.kill();
  if (rateLimitDirectory) rmSync(rateLimitDirectory, { recursive: true, force: true });
});

test('build emits the catalog landing page and both category routes', () => {
  const catalogHtml = builtHtml('urunler');
  assert.match(catalogHtml, /<h1[^>]*>\s*LED Ekran Ürünleri\s*<\/h1>/);

  for (const [route, categoryName] of expectedCategoryRoutes) {
    const html = builtHtml(`urunler/${route}`);
    assert.match(html, new RegExp(`<h1[^>]*>\\s*${categoryName}\\s*</h1>`));
  }
});

test('build emits nine product routes with unique titles and price-free Product schema', () => {
  const titles = new Set();

  for (const [route, productName] of expectedProductRoutes) {
    const html = builtHtml(`urunler/${route}`);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title?.includes(productName), `missing unique title for ${route}`);
    assert.equal(titles.has(title), false, `duplicate product title: ${title}`);
    titles.add(title);
    assert.match(html, /"@type":"Product"/);
    assert.doesNotMatch(html, /"offers"\s*:/);
    assert.doesNotMatch(html, /₺|\bTRY\b|priceCurrency/);
  }

  assert.equal(titles.size, 9);
});

test('every product page preserves its canonical and product-specific quotation context', () => {
  for (const [route] of expectedProductRoutes) {
    const html = builtHtml(`urunler/${route}`);
    const slug = route.split('/').at(-1);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://ledkasa\\.com\\.tr/urunler/${route}/">`));
    assert.match(html, new RegExp(`href="/teklif-al/\\?urun=${slug}"`));
  }
});

test('product pages include breadcrumbs and related products', () => {
  const html = builtHtml('urunler/led-ekran-kasalari/cnc-led-kasa');
  assert.match(html, /aria-label="Sayfa yolu"/);
  assert.match(html, /İlgili ürünler/);
  assert.match(html, /Özellik özeti/);
  assert.match(html, /W960 × H960 × D87 mm/);
  assert.match(html, /mg-alloy-cabinet-960x960\.pdf/);
  assert.match(html, /640×480-B|640×480/);
  assert.match(html, /640 mm küçük pitch aile/);
  assert.match(html, /datasheet-card/);
  assert.match(html, /cnc-960-arka-gorunum\.webp/);
  assert.match(html, /cnc-640-on-gorunum\.webp/);
  assert.doesNotMatch(html, /cnc-640-ozellik-seridi\.webp/);
  assert.doesNotMatch(html, /Ultra hafif/);
  assert.doesNotMatch(html, /640×1920 mm Mg/);
  assert.match(html, /İlgili rehberler/);
});

test('rental and poster pages do not inherit the 640 small-pitch CNC table', () => {
  const rental = builtHtml('urunler/led-ekran-kasalari/rental-led-kabinet');
  const poster = builtHtml('urunler/led-ekran-kasalari/poster-led-kasa');
  const foldable = builtHtml('urunler/led-ekran-kasalari/katlanabilir-poster-led-kasa');
  for (const html of [rental, poster, foldable]) {
    assert.doesNotMatch(html, /640×480-B/);
    assert.doesNotMatch(html, /640 mm küçük pitch aile/);
    assert.doesNotMatch(html, /cnc-960-olcu-diyagram\.webp/);
  }
});

test('cabinet comparison page publishes a decision table', () => {
  const html = builtHtml('urunler/kasa-karsilastirma');
  assert.match(html, /LED kasa karşılaştırma tablosu/);
  assert.match(html, /comparison-table/);
  assert.match(html, /href="\/urunler\/led-ekran-kasalari\/cnc-led-kasa\/"/);
});

test('quote page renders a consent-gated validated form without recipient configuration', () => {
  const html = builtHtml('teklif-al');
  assert.match(html, /href="tel:\+905304056768"/);
  assert.match(html, /href="https:\/\/wa\.me\/905304056768/);
  assert.match(html, /WhatsApp ile yazın/);
  assert.match(html, /<form[^>]+action="\/contact\.php"[^>]+method="post"/);
  assert.match(html, /name="name"[^>]+required/);
  assert.match(html, /name="email"[^>]+type="email"[^>]+required/);
  assert.match(html, /name="message"[^>]+required/);
  assert.match(html, /name="install_type"/);
  assert.match(html, /name="environment"/);
  assert.match(html, /name="quantity_estimate"/);
  assert.match(html, /name="website"/);
  assert.match(html, /name="kvkk_consent"[^>]+required/);
  assert.match(html, /class="consent-field"[\s\S]*?href="\/kvkk-aydinlatma\/"/);
  assert.match(html, /href="\/kvkk-aydinlatma\/">KVKK Aydınlatma/);
  assert.doesNotMatch(html, /\/kvkk-aydinlatma-metni\//);
  assert.match(html, /id="durum-basarili"[^>]+data-submission-feedback[^>]+role="status"[^>]+hidden/);
  assert.match(html, /id="durum-hata"[^>]+data-submission-feedback[^>]+role="alert"[^>]+hidden/);
  assert.match(html, /Talebiniz başarıyla alındı\./);
  assert.match(html, /Form gönderilemedi\./);
  assert.match(html, /Teklif talebi gönder/);
  assert.match(html, /data-product-select/);
  assert.match(html, /data-product-preselect-note/);
  assert.match(html, /Seçili ürün:/);
  assert.doesNotMatch(html, /test-recipient@example\.com/);
});

describePhp('contact handler accepts POST only and validates required fields', async () => {
  const getResponse = await fetch(`${phpBaseUrl}/contact.php`);
  assert.equal(getResponse.status, 405);

  const invalidResponse = await fetch(`${phpBaseUrl}/contact.php`, {
    method: 'POST',
    body: new URLSearchParams({ name: '', email: 'not-an-email', message: '', kvkk_consent: '' }),
    headers: { Accept: 'application/json' },
  });
  assert.equal(invalidResponse.status, 422);
  assert.deepEqual(await invalidResponse.json(), {
    ok: false,
    message: 'Lütfen zorunlu alanları geçerli bilgilerle doldurun.',
  });
});

describePhp('contact handler silently accepts a completed honeypot without sending', async () => {
  const response = await fetch(`${phpBaseUrl}/contact.php`, {
    method: 'POST',
    body: new URLSearchParams({
      name: 'Spam Bot',
      email: 'bot@example.com',
      message: 'Automated message',
      kvkk_consent: 'on',
      website: 'https://spam.example.com',
    }),
    headers: { Accept: 'application/json' },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    ok: true,
    message: 'Talebiniz alınmıştır.',
  });
});

describePhp('contact handler redirects normal browser submissions to safe quote states', async () => {
  const invalidResponse = await fetch(`${phpBaseUrl}/contact.php`, {
    method: 'POST',
    body: new URLSearchParams({ name: '', email: 'invalid', message: '', kvkk_consent: '' }),
    headers: { Accept: 'text/html,application/xhtml+xml' },
    redirect: 'manual',
  });
  assert.equal(invalidResponse.status, 303);
  assert.equal(invalidResponse.headers.get('location'), '/teklif-al/?durum=hata#quote-form-heading');

  const honeypotResponse = await fetch(`${phpBaseUrl}/contact.php`, {
    method: 'POST',
    body: new URLSearchParams({
      name: 'Spam Bot',
      email: 'bot@example.com',
      message: 'Automated message',
      kvkk_consent: 'on',
      website: 'https://spam.example.com',
    }),
    headers: { Accept: 'text/html,application/xhtml+xml' },
    redirect: 'manual',
  });
  assert.equal(honeypotResponse.status, 303);
  assert.equal(honeypotResponse.headers.get('location'), '/teklif-al/?durum=basarili#quote-form-heading');
  assert.doesNotMatch(honeypotResponse.headers.get('location'), /Spam|bot@example|message/);
});
