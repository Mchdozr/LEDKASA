import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { productCategories } from '../src/data/site.ts';

const headerSource = readFileSync(new URL('../src/components/Header.astro', import.meta.url), 'utf8');

test('shared navigation is driven by both catalog categories and all product detail URLs', () => {
  assert.deepEqual(
    productCategories.map((category) => category.name),
    ['LED Ekran Kasaları', 'Güç ve Bağlantı Ekipmanları'],
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

  assert.match(headerSource, /import \{ productCategories \} from ['"]\.\.\/data\/site['"]/);
  assert.doesNotMatch(headerSource, /productsByCategory|new URL/);
  assert.match(headerSource, /productCategories\.map/);
  assert.match(headerSource, /href=\{category\.url\}/);
  assert.match(headerSource, /href=\{product\.url\}/);
  assert.match(headerSource, /name: 'İletişim',\s*url: '\/iletisim\/'/);
});

test('navigation marks only an exact URL match as the current page', () => {
  assert.match(headerSource, /const isCurrent = \(url: string\) => currentPath === url;/);
  assert.doesNotMatch(headerSource, /currentPath\.startsWith/);
});
