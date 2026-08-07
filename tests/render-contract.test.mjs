import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { productCategories, products } from '../src/data/site.ts';

const headerSource = readFileSync(new URL('../src/components/Header.astro', import.meta.url), 'utf8');

test('shared navigation is driven by both catalog categories and all product detail URLs', () => {
  assert.deepEqual(
    productCategories.map((category) => category.name),
    ['LED Ekran Kasaları', 'Güç ve Bağlantı Ekipmanları'],
  );

  assert.deepEqual(
    products.map((product) => new URL(product.canonicalUrl).pathname).sort(),
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

  assert.match(headerSource, /productCategories\.map/);
  assert.match(headerSource, /productsByCategory\(category\.slug\)/);
  assert.match(headerSource, /href=\{category\.url\}/);
  assert.match(headerSource, /href=\{product\.url\}/);
});
