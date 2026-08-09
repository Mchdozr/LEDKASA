import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, relative, resolve, sep } from 'node:path';
import { after, before, test } from 'node:test';

const projectRoot = resolve(import.meta.dirname, '..');
const outputRoot = mkdtempSync(join(tmpdir(), 'ledkasa-seo-output-'));
const siteUrl = 'https://ledkasa.com.tr';

const expectedIndexablePaths = [
  '/',
  '/bilgi-merkezi/',
  '/bilgi-merkezi/kasa-secimi-cnc-kapaksiz-rental-kabinet/',
  '/bilgi-merkezi/led-ekran-guc-ve-veri-planlama/',
  '/bilgi-merkezi/led-ekran-kablolama-rehberi/',
  '/bilgi-merkezi/led-ekran-kasasi-nasil-secilir/',
  '/bilgi-merkezi/modul-pitch-ve-kasa-uyumu/',
  '/bilgi-merkezi/poster-led-ekran-kullanim-alanlari/',
  '/bilgi-merkezi/rental-led-ekran-kurulum-rehberi/',
  '/cerez-politikasi/',
  '/gizlilik-politikasi/',
  '/hakkimizda/',
  '/iletisim/',
  '/kvkk-aydinlatma/',
  '/site-haritasi/',
  '/sss/',
  '/teklif-al/',
  '/uygulama-alanlari/',
  '/uygulama-alanlari/etkinlik-ve-sahne/',
  '/uygulama-alanlari/kurumsal-ve-reklam/',
  '/uygulama-alanlari/magaza-ve-showroom/',
  '/urunler/',
  '/urunler/guc-ve-baglanti-ekipmanlari/',
  '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/',
  '/urunler/guc-ve-baglanti-ekipmanlari/cat6-kablo/',
  '/urunler/guc-ve-baglanti-ekipmanlari/flat-kablo/',
  '/urunler/guc-ve-baglanti-ekipmanlari/power-plug/',
  '/urunler/kasa-karsilastirma/',
  '/urunler/led-ekran-kasalari/',
  '/urunler/led-ekran-kasalari/cnc-led-kasa/',
  '/urunler/led-ekran-kasalari/kapaksiz-led-kabinet/',
  '/urunler/led-ekran-kasalari/katlanabilir-poster-led-kasa/',
  '/urunler/led-ekran-kasalari/poster-led-kasa/',
  '/urunler/led-ekran-kasalari/rental-led-kabinet/',
];

const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const fullPath = join(directory, entry.name);
  return entry.isDirectory() ? walk(fullPath) : [fullPath];
});

const builtHtmlFiles = () => walk(outputRoot).filter((file) => extname(file) === '.html');
const outputPathForRoute = (route) => route === '/'
  ? resolve(outputRoot, 'index.html')
  : resolve(outputRoot, route.slice(1), 'index.html');
const structuredDataNodes = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .flatMap((match) => {
    const document = JSON.parse(match[1]);
    return Array.isArray(document['@graph']) ? document['@graph'] : [document];
  });

before(() => {
  const build = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', outputRoot], {
    cwd: projectRoot,
    encoding: 'utf8',
  });
  assert.equal(build.status, 0, `Astro build failed:\n${build.stdout}\n${build.stderr}`);
});

after(() => rmSync(outputRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }));

test('build emits a robots-linked sitemap containing every indexable canonical route except 404', () => {
  const robots = readFileSync(resolve(outputRoot, 'robots.txt'), 'utf8');
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Sitemap: https:\/\/ledkasa\.com\.tr\/sitemap-index\.xml$/m);

  const sitemapIndex = readFileSync(resolve(outputRoot, 'sitemap-index.xml'), 'utf8');
  assert.match(sitemapIndex, /https:\/\/ledkasa\.com\.tr\/sitemap-0\.xml/);
  const sitemap = readFileSync(resolve(outputRoot, 'sitemap-0.xml'), 'utf8');
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  assert.deepEqual(locations, expectedIndexablePaths.map((path) => `${siteUrl}${path}`).sort());
  assert.doesNotMatch(sitemap, /\/404\/?</);
});

test('every indexable page publishes canonical, Turkish alternate, social image and JSON-LD metadata', () => {
  for (const route of expectedIndexablePaths) {
    const html = readFileSync(outputPathForRoute(route), 'utf8');
    const canonical = `${siteUrl}${route}`;
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical.replaceAll('.', '\\.')}">`), route);
    assert.match(html, new RegExp(`<link rel="alternate" hreflang="tr-TR" href="${canonical.replaceAll('.', '\\.')}">`), route);
    assert.match(html, new RegExp(`<link rel="alternate" hreflang="x-default" href="${canonical.replaceAll('.', '\\.')}">`), route);
    assert.match(html, /property="og:image:alt"/, route);
    const image = html.match(/<meta property="og:image" content="https:\/\/ledkasa\.com\.tr(\/assets\/[^"?]+)"/)?.[1];
    assert.ok(image, `missing local Open Graph image: ${route}`);
    assert.equal(existsSync(resolve(outputRoot, image.slice(1))), true, `missing Open Graph asset: ${image}`);
    assert.match(html, /<script type="application\/ld\+json">/);
    assert.match(html, /"@type":"Organization"/);
    assert.match(html, /"@type":"WebSite"/);
    assert.doesNotMatch(html, /"@type":"LocalBusiness"/);
  }
});

test('every breadcrumb-bearing page publishes an absolute BreadcrumbList JSON-LD trail', () => {
  for (const route of expectedIndexablePaths.filter((entry) => entry !== '/')) {
    const html = readFileSync(outputPathForRoute(route), 'utf8');
    const breadcrumb = structuredDataNodes(html).find((node) => node['@type'] === 'BreadcrumbList');
    assert.ok(breadcrumb, `missing BreadcrumbList JSON-LD: ${route}`);
    assert.equal(breadcrumb.itemListElement[0].item, `${siteUrl}/`, route);
    assert.equal(breadcrumb.itemListElement.at(-1).item, `${siteUrl}${route}`, route);
    assert.deepEqual(
      breadcrumb.itemListElement.map((item) => item.position),
      breadcrumb.itemListElement.map((_, index) => index + 1),
      route,
    );
    for (const item of breadcrumb.itemListElement) {
      assert.equal(new URL(item.item).origin, siteUrl, `${route}: ${item.item}`);
      assert.ok(item.name, `${route} breadcrumb items require names.`);
    }
  }
});

test('article mainEntityOfPage relationships resolve to the canonical URL or an emitted page node', () => {
  for (const route of expectedIndexablePaths.filter((entry) => entry.startsWith('/bilgi-merkezi/') && entry !== '/bilgi-merkezi/')) {
    const html = readFileSync(outputPathForRoute(route), 'utf8');
    const nodes = structuredDataNodes(html);
    const article = nodes.find((node) => node['@type'] === 'Article');
    assert.ok(article, `missing Article schema: ${route}`);
    const relationship = article.mainEntityOfPage;
    const reference = typeof relationship === 'string' ? relationship : relationship?.['@id'];
    assert.ok(reference, `missing Article mainEntityOfPage: ${route}`);
    const canonical = `${siteUrl}${route}`;
    assert.ok(
      reference === canonical || nodes.some((node) => node['@id'] === reference && ['WebPage', 'ArticlePage'].includes(node['@type'])),
      `${route} mainEntityOfPage must be the canonical URL or reference an emitted WebPage/ArticlePage node.`,
    );
  }
});

test('homepage preview FAQ and product detail expose FAQPage / Product additionalProperty schema', () => {
  const home = readFileSync(outputPathForRoute('/'), 'utf8');
  assert.match(home, /"@type":"FAQPage"/);
  assert.match(home, /Hangi LED ekran kasası projem için uygun\?/);

  const product = readFileSync(outputPathForRoute('/urunler/led-ekran-kasalari/cnc-led-kasa/'), 'utf8');
  const productNode = structuredDataNodes(product).find((node) => node['@type'] === 'Product');
  assert.ok(productNode?.additionalProperty?.length);
  assert.ok(productNode.additionalProperty.every((entry) => entry['@type'] === 'PropertyValue' && entry.name && entry.value));
});

test('product cards are section children with h3 titles on listings and related-product regions', () => {
  for (const route of [
    '/',
    '/urunler/',
    '/urunler/led-ekran-kasalari/',
    '/urunler/led-ekran-kasalari/cnc-led-kasa/',
  ]) {
    const html = readFileSync(outputPathForRoute(route), 'utf8');
    const cards = [...html.matchAll(/<article class="product-card"[\s\S]*?<\/article>/g)].map((match) => match[0]);
    assert.ok(cards.length > 0, `${route} must render product cards.`);
    for (const card of cards) {
      assert.match(card, /<h3><a href="\/urunler\//, `${route} card title must be h3.`);
      assert.doesNotMatch(card, /<h2\b/, `${route} card must not flatten its parent section hierarchy.`);
    }
  }
});

test('404 is a useful noindex page and is absent from the sitemap', () => {
  const html = readFileSync(resolve(outputRoot, '404.html'), 'utf8');
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.match(html, /Aradığınız sayfa bulunamadı/);
  assert.match(html, /href="\/urunler\/"/);
  assert.match(html, /href="\/teklif-al\/"/);
  assert.match(html, /href="\/uygulama-alanlari\/"/);
  assert.match(html, /href="\/bilgi-merkezi\/"/);
  assert.match(html, /href="\/iletisim\/"/);
});

test('manifest, favicon and PHP form handler survive the production build', () => {
  const manifest = JSON.parse(readFileSync(resolve(outputRoot, 'manifest.webmanifest'), 'utf8'));
  assert.equal(manifest.lang, 'tr-TR');
  assert.equal(manifest.start_url, '/');
  assert.ok(manifest.icons.some((icon) => icon.src === '/favicon.svg' && icon.type === 'image/svg+xml'));
  assert.match(readFileSync(resolve(outputRoot, 'favicon.svg'), 'utf8'), /<svg/);
  assert.equal(existsSync(resolve(outputRoot, 'contact.php')), true);
});

test('all rendered local links and image references resolve inside the static package', () => {
  const broken = [];
  for (const htmlFile of builtHtmlFiles()) {
    const html = readFileSync(htmlFile, 'utf8');
    const references = [...html.matchAll(/(?:href|src|content)="(\/[^"#?]+)[^"\s]*"/g)].map((match) => match[1]);
    for (const reference of references) {
      const outputPath = reference.endsWith('/')
        ? resolve(outputRoot, reference.slice(1), 'index.html')
        : resolve(outputRoot, reference.slice(1));
      if (!existsSync(outputPath)) {
        broken.push(`${relative(outputRoot, htmlFile)} -> ${reference}`);
      }
    }
  }
  assert.deepEqual(broken, []);
});

test('public site images are optimized WebP files and catalog data references only WebP copies', async () => {
  const sharp = (await import('sharp')).default;
  sharp.cache(false);
  const { productCategories, products } = await import('../src/data/site.ts');
  const imageRoot = resolve(outputRoot, 'assets', 'images');
  const images = walk(imageRoot).filter((file) => ['.avif', '.jpg', '.jpeg', '.png', '.webp'].includes(extname(file).toLowerCase()));
  assert.ok(images.length >= 14, 'expected optimized product, category and editorial images');
  assert.deepEqual([...new Set(images.map((file) => extname(file).toLowerCase()))], ['.webp']);
  assert.equal(images.filter((file) => file.includes(`${sep}editorial${sep}`)).length, 3);
  for (const image of images) {
    const pipeline = sharp(image);
    const metadata = await pipeline.metadata();
    pipeline.destroy();
    assert.equal(metadata.format, 'webp', `unexpected image format: ${image}`);
    assert.ok(Math.max(metadata.width ?? 0, metadata.height ?? 0) <= 1400, `image exceeds 1400px: ${image}`);
  }
  for (const entry of [...productCategories, ...products]) {
    assert.match(entry.image, /^\/assets\/images\/.+\.webp$/);
  }
});

test('asset attribution file records three editorial sources and a rights-cleared licence', () => {
  const attribution = readFileSync(resolve(outputRoot, 'assets', 'attributions.md'), 'utf8');
  assert.equal((attribution.match(/^## (?:Etkinlik sahnesi|Mağaza içi dijital ekranlar|Elektronik çalışma alanı)$/gm) ?? []).length, 3);
  assert.equal((attribution.match(/https:\/\/(?:unsplash\.com|www\.pexels\.com)\/photos\//g) ?? []).length, 3);
  assert.match(attribution, /https:\/\/unsplash\.com\/license|https:\/\/www\.pexels\.com\/license/);
  assert.match(attribution, /^## Özgün aksesuar ürün render'ları$/m);
  for (const filename of ['cat6-kablo.webp', 'power-plug.webp', 'flat-kablo.webp', 'cable-set.webp']) {
    assert.match(attribution, new RegExp(`\\b${filename.replace('.', '\\.')}\\b`));
  }
});

test('catalog provenance positively inventories every published image and verifies local source digests', async () => {
  const { productCategories, products } = await import('../src/data/site.ts');
  const inventory = JSON.parse(readFileSync(resolve(outputRoot, 'assets', 'catalog-provenance.json'), 'utf8'));
  const byPublicPath = new Map(inventory.assets.map((entry) => [entry.publicPath, entry]));

  for (const image of [...productCategories, ...products].map((entry) => entry.image)) {
    const provenance = byPublicPath.get(image);
    assert.ok(provenance, `missing positive provenance: ${image}`);
    assert.equal(provenance.origin, 'original-project-render');
    const sourcePath = resolve(projectRoot, provenance.sourceFile);
    assert.equal(existsSync(sourcePath), true, `missing provenance source: ${provenance.sourceFile}`);
    const digest = createHash('sha256').update(readFileSync(sourcePath)).digest('hex');
    assert.equal(digest, provenance.sha256, `source digest mismatch: ${provenance.sourceFile}`);
  }

  for (const image of [
    '/assets/images/products/cat6-kablo.webp',
    '/assets/images/products/power-plug.webp',
    '/assets/images/products/flat-kablo.webp',
    '/assets/images/products/cable-set.webp',
  ]) {
    const provenance = byPublicPath.get(image);
    assert.equal(provenance.generation.tool, 'OpenAI built-in image_gen');
    assert.deepEqual(provenance.generation.inputImages, []);
  }
});
