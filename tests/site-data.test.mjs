import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const { productCategories, products, siteUrl } = await import('../src/data/site.ts');

test('product catalog exposes the two intended product families', () => {
  assert.deepEqual(
    productCategories.map((category) => category.slug).sort(),
    ['guc-ve-baglanti-ekipmanlari', 'led-ekran-kasalari'],
  );
});

test('product catalog has nine uniquely-addressable quotation products', () => {
  const slugs = products.map((product) => product.slug);

  assert.equal(products.length, 9);
  assert.equal(new Set(slugs).size, 9);
  assert.deepEqual(slugs.sort(), [
    'cable-set',
    'cat6-kablo',
    'cnc-led-kasa',
    'flat-kablo',
    'kapaksiz-led-kabinet',
    'katlanabilir-poster-led-kasa',
    'poster-led-kasa',
    'power-plug',
    'rental-led-kabinet',
  ]);
});

test('every category and product canonical URL is absolute and stable', () => {
  assert.equal(siteUrl, 'https://ledkasa.com.tr');

  for (const category of productCategories) {
    assert.equal(category.canonicalUrl, `${siteUrl}/urunler/${category.slug}/`);
  }

  for (const product of products) {
    assert.equal(product.canonicalUrl, `${siteUrl}/urunler/${product.categorySlug}/${product.slug}/`);
    assert.ok(productCategories.some((category) => category.slug === product.categorySlug));
  }
});

test('catalog exposes one shared root-relative navigation tree', () => {
  assert.deepEqual(
    productCategories.map((category) => category.url),
    ['/urunler/led-ekran-kasalari/', '/urunler/guc-ve-baglanti-ekipmanlari/'],
  );

  assert.deepEqual(
    productCategories.flatMap((category) => category.products.map((product) => product.url)).sort(),
    [
      '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/',
      '/urunler/guc-ve-baglanti-ekipmanlari/cat6-kablo/',
      '/urunler/guc-ve-baglanti-ekipmanlari/flat-kablo/',
      '/urunler/guc-ve-baglanti-ekipmanlari/power-plug/',
      '/urunler/led-ekran-kasalari/cnc-led-kasa/',
      '/urunler/led-ekran-kasalari/kapaksiz-led-kabinet/',
      '/urunler/led-ekran-kasalari/katlanabilir-poster-led-kasa/',
      '/urunler/led-ekran-kasalari/poster-led-kasa/',
      '/urunler/led-ekran-kasalari/rental-led-kabinet/',
    ],
  );

  for (const category of productCategories) {
    assert.ok(category.url.startsWith('/'));
    assert.equal(category.url.startsWith('//'), false);
    assert.ok(category.products.length > 0);
    assert.ok(category.products.every((product) => product.categorySlug === category.slug));
  }
});

test('every catalog image resolves to a committed local public asset', () => {
  const catalogImages = [...productCategories, ...products].map((entry) => entry.image);

  for (const image of catalogImages) {
    const publicFile = resolve(process.cwd(), 'public', image.replace(/^\//, ''));
    assert.equal(existsSync(publicFile), true, `missing local catalog image: ${image}`);
  }
});

test('CNC product exposes verified datasheet specs without inventing offers', () => {
  const cnc = products.find((product) => product.slug === 'cnc-led-kasa');
  assert.ok(cnc?.specs?.length);
  assert.ok(cnc.datasheetUrl);
  assert.equal(
    existsSync(resolve(process.cwd(), 'public', cnc.datasheetUrl.replace(/^\//, ''))),
    true,
    `missing datasheet: ${cnc.datasheetUrl}`,
  );
  const joined = cnc.specs.map((spec) => `${spec.label} ${spec.value}`).join(' ');
  assert.match(joined, /960/);
  assert.match(joined, /320/);
  assert.match(joined, /Flight case/i);
});

test('poster products expose datasheet-backed example sizes', () => {
  const poster = products.find((product) => product.slug === 'poster-led-kasa');
  const foldable = products.find((product) => product.slug === 'katlanabilir-poster-led-kasa');

  assert.ok(poster?.datasheetUrl);
  assert.ok(foldable?.datasheetUrl);
  assert.equal(existsSync(resolve(process.cwd(), 'public', poster.datasheetUrl.replace(/^\//, ''))), true);
  assert.equal(existsSync(resolve(process.cwd(), 'public', foldable.datasheetUrl.replace(/^\//, ''))), true);

  const posterJoined = poster.specs.map((spec) => spec.value).join(' ');
  assert.match(posterJoined, /640/);
  assert.match(posterJoined, /1920/);
  assert.match(posterJoined, /2000/);

  const foldableJoined = foldable.specs.map((spec) => spec.value).join(' ');
  assert.match(foldableJoined, /640/);
  assert.match(foldableJoined, /26 kg/);
  assert.match(foldableJoined, /ön/i);
});

test('every product carries qualitative specs, guide and application cross-links', () => {
  const slugSet = new Set(products.map((product) => product.slug));

  for (const product of products) {
    assert.ok(product.specs?.length, `${product.slug} needs specs`);
    assert.ok(product.specsNote, `${product.slug} needs specsNote`);
    assert.ok(product.relatedGuides?.length, `${product.slug} needs relatedGuides`);
    assert.ok(product.applicationLinks?.length, `${product.slug} needs applicationLinks`);
    assert.ok(product.complementaryProducts?.length, `${product.slug} needs complementaryProducts`);
    for (const relatedSlug of product.complementaryProducts) {
      assert.equal(slugSet.has(relatedSlug), true, `${product.slug} → unknown ${relatedSlug}`);
    }
  }
});
