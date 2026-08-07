import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { resolve } from 'node:path';
import { after, before, test } from 'node:test';

const projectRoot = resolve(import.meta.dirname, '..');
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

before(async () => {
  const build = spawnSync(process.execPath, ['node_modules/astro/astro.js', 'build'], {
    cwd: projectRoot,
    encoding: 'utf8',
  });
  assert.equal(build.status, 0, `Astro build failed:\n${build.stdout}\n${build.stderr}`);

  const port = await getAvailablePort();
  phpBaseUrl = `http://127.0.0.1:${port}`;
  phpServer = spawn('php', ['-S', `127.0.0.1:${port}`, '-t', 'public'], {
    cwd: projectRoot,
    env: { ...process.env, LEDKASA_CONTACT_RECIPIENT: 'test-recipient@example.com' },
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

after(() => phpServer?.kill());

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
});

test('quote page renders a consent-gated validated form without recipient configuration', () => {
  const html = builtHtml('teklif-al');
  assert.match(html, /<form[^>]+action="\/contact\.php"[^>]+method="post"/);
  assert.match(html, /name="name"[^>]+required/);
  assert.match(html, /name="email"[^>]+type="email"[^>]+required/);
  assert.match(html, /name="message"[^>]+required/);
  assert.match(html, /name="website"/);
  assert.match(html, /name="kvkk_consent"[^>]+required/);
  assert.match(html, /class="consent-field"[\s\S]*?href="\/kvkk-aydinlatma\/"/);
  assert.match(html, /href="\/kvkk-aydinlatma\/">KVKK Aydınlatma/);
  assert.doesNotMatch(html, /\/kvkk-aydinlatma-metni\//);
  assert.match(html, /id="durum-basarili"[^>]+data-submission-feedback[^>]+role="status"[^>]+tabindex="-1"/);
  assert.match(html, /id="durum-hata"[^>]+data-submission-feedback[^>]+role="alert"[^>]+tabindex="-1"/);
  assert.match(html, /Talebiniz başarıyla alındı\./);
  assert.match(html, /Form gönderilemedi\./);
  assert.doesNotMatch(html, /test-recipient@example\.com/);
});

test('contact handler accepts POST only and validates required fields', async () => {
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

test('contact handler silently accepts a completed honeypot without sending', async () => {
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

test('contact handler redirects normal browser submissions to safe quote states', async () => {
  const invalidResponse = await fetch(`${phpBaseUrl}/contact.php`, {
    method: 'POST',
    body: new URLSearchParams({ name: '', email: 'invalid', message: '', kvkk_consent: '' }),
    headers: { Accept: 'text/html,application/xhtml+xml' },
    redirect: 'manual',
  });
  assert.equal(invalidResponse.status, 303);
  assert.equal(invalidResponse.headers.get('location'), '/teklif-al/?durum=hata#durum-hata');

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
  assert.equal(honeypotResponse.headers.get('location'), '/teklif-al/?durum=basarili#durum-basarili');
  assert.doesNotMatch(honeypotResponse.headers.get('location'), /Spam|bot@example|message/);
});
