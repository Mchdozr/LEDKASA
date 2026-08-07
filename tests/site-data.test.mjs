import assert from 'node:assert/strict';
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
