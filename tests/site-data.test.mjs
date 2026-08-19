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
  const catalogImages = [
    ...productCategories.map((entry) => entry.image),
    ...products.flatMap((entry) => [entry.image, ...(entry.gallery?.map((item) => item.src) ?? [])]),
  ];

  for (const image of catalogImages) {
    const publicFile = resolve(process.cwd(), 'public', image.replace(/^\//, ''));
    assert.equal(existsSync(publicFile), true, `missing local catalog image: ${image}`);
  }
});

test('CNC product exposes verified datasheet specs without inventing offers', () => {
  const cnc = products.find((product) => product.slug === 'cnc-led-kasa');
  assert.ok(cnc?.specs?.length);
  const primarySheet = cnc?.datasheets?.[0];
  assert.ok(primarySheet?.url);
  assert.equal(
    existsSync(resolve(process.cwd(), 'public', primarySheet.url.replace(/^\//, ''))),
    true,
    `missing datasheet: ${primarySheet.url}`,
  );
  const joined = cnc.specs.map((spec) => `${spec.label} ${spec.value}`).join(' ');
  assert.match(joined, /960/);
  assert.match(joined, /320/);
  assert.match(joined, /Flight case/i);
});

test('CNC keeps 960 Mg and 640 small-pitch datasheets in separate labeled groups', () => {
  const cnc = products.find((product) => product.slug === 'cnc-led-kasa');
  assert.equal(cnc?.specGroups?.length, 3);
  const mgGroup = cnc.specGroups.find((g) => g.groupKey === '960-mg');
  const pitch480 = cnc.specGroups.find((g) => g.groupKey === '640-small-pitch-480');
  const pitchFamily = cnc.specGroups.find((g) => g.groupKey === '640-small-pitch-family');
  assert.ok(mgGroup && pitch480 && pitchFamily);
  const mgJoined = mgGroup.specs.map((spec) => spec.value).join(' ');
  const pitchJoined = [pitch480, pitchFamily].flatMap((g) => g.specs).map((s) => s.value).join(' ');
  assert.match(mgJoined, /960/);
  assert.doesNotMatch(mgJoined, /4,3 kg/);
  assert.match(pitchJoined, /W640 × H480/);
  assert.match(pitchJoined, /4,3 kg/);
  assert.doesNotMatch(pitchJoined, /960 × 960/);
  assert.ok(mgGroup);
  assert.ok(pitch480);
  const pitch480Sheet = cnc.datasheets?.find((sheet) => sheet.url.includes('640x480-B'));
  assert.ok(pitch480Sheet);
  assert.equal(existsSync(resolve(process.cwd(), 'public', pitch480Sheet.url.replace(/^\//, ''))), true);
  assert.equal(cnc.gallery?.filter((item) => item.groupKey === '960-mg' && item.kind === 'cabinet-photo').length, 2);
  assert.equal(cnc.gallery?.filter((item) => item.groupKey === '640-small-pitch-480' && item.kind === 'cabinet-photo').length, 3);
  for (const item of cnc.gallery ?? []) {
    assert.equal(existsSync(resolve(process.cwd(), 'public', item.src.replace(/^\//, ''))), true, item.src);
  }
});

test('rental product exposes 960 Mg datasheet specs and cabinet gallery', () => {
  const rental = products.find((product) => product.slug === 'rental-led-kabinet');
  assert.equal(rental?.specGroups?.length, 2);
  const mgGroup = rental?.specGroups?.find((g) => g.groupKey === 'rental-960-mg');
  assert.ok(mgGroup);
  const joined = mgGroup.specs.map((spec) => spec.value).join(' ');
  assert.match(joined, /960/);
  assert.match(joined, /11,8 kg/);
  assert.match(joined, /P5/);
  assert.match(joined, /kabinet kapasitesi/);
  assert.doesNotMatch(joined, /640×480/);
  assert.equal(rental?.gallery?.filter((item) => item.kind === 'cabinet-photo').length, 4);
  for (const item of rental?.gallery ?? []) {
    assert.equal(existsSync(resolve(process.cwd(), 'public', item.src.replace(/^\//, ''))), true, item.src);
  }
  const sheet = rental?.datasheets?.[0];
  assert.ok(sheet?.url.includes('mg-alloy-cabinet-960x960'));
  assert.equal(existsSync(resolve(process.cwd(), 'public', sheet.url.replace(/^\//, ''))), true);
});

test('poster products expose datasheet-backed sizes', () => {
  const poster = products.find((product) => product.slug === 'poster-led-kasa');
  const foldable = products.find((product) => product.slug === 'katlanabilir-poster-led-kasa');

  assert.ok(poster?.datasheets?.[0]?.url);
  assert.ok(foldable?.datasheets?.[0]?.url);
  assert.equal(existsSync(resolve(process.cwd(), 'public', poster.datasheets[0].url.replace(/^\//, ''))), true);
  assert.equal(existsSync(resolve(process.cwd(), 'public', foldable.datasheets[0].url.replace(/^\//, ''))), true);

  const posterJoined = (poster.specGroups ?? []).flatMap((group) => group.specs).map((spec) => spec.value).join(' ');
  assert.match(posterJoined, /640/);
  assert.match(posterJoined, /1920/);
  assert.match(posterJoined, /2000/);
  assert.doesNotMatch(posterJoined, /24,66 kg/);

  const foldableJoined = (foldable.specGroups ?? foldable.specs ?? [])
    .flatMap((entry) => ('specs' in entry ? entry.specs : [entry]))
    .map((spec) => spec.value)
    .join(' ');
  assert.match(foldableJoined, /500 × 2000/);
  assert.match(foldableJoined, /195 mm/);
  assert.match(foldableJoined, /24,66 kg/);
  assert.match(foldableJoined, /640/);
  assert.match(foldableJoined, /26 kg/);
  assert.equal(foldable?.gallery?.filter((item) => item.groupKey === 'foldable-500' && item.kind === 'cabinet-photo').length, 3);
  for (const item of foldable?.gallery ?? []) {
    assert.equal(existsSync(resolve(process.cwd(), 'public', item.src.replace(/^\//, ''))), true, item.src);
  }
});

test('every product carries qualitative specs, guide and application cross-links', () => {
  const slugSet = new Set(products.map((product) => product.slug));

  for (const product of products) {
    const hasSpecs = Boolean(product.specs?.length || product.specGroups?.length);
    assert.ok(hasSpecs, `${product.slug} needs specs or specGroups`);
    assert.ok(product.specsNote, `${product.slug} needs specsNote`);
    assert.ok(product.relatedGuides?.length, `${product.slug} needs relatedGuides`);
    assert.ok(product.applicationLinks?.length, `${product.slug} needs applicationLinks`);
    assert.ok(product.complementaryProducts?.length, `${product.slug} needs complementaryProducts`);
    for (const relatedSlug of product.complementaryProducts) {
      assert.equal(slugSet.has(relatedSlug), true, `${product.slug} → unknown ${relatedSlug}`);
    }
  }
});

test('blog data defines 18 posts, page size 6, and local images', async () => {
  const { readFileSync } = await import('node:fs');
  const blogSource = readFileSync(resolve(process.cwd(), 'src/data/blog.ts'), 'utf8');
  assert.match(blogSource, /export const BLOG_PAGE_SIZE = 6;/);
  const slugs = [...blogSource.matchAll(/^\s+slug: '([^']+)'/gm)].map((match) => match[1]);
  assert.equal(slugs.length, 18);
  assert.equal(new Set(slugs).size, 18);
  assert.match(blogSource, /summary:/);
  assert.match(blogSource, /faqs:/);
  assert.match(blogSource, /table:/);
  const images = [...blogSource.matchAll(/^\s+image: images\.(\w+)/gm)].map((match) => match[1]);
  assert.equal(images.length, 18);
  const imagePaths = [...blogSource.matchAll(/^\s+\w+: '(\/assets\/images\/[^']+)'/gm)].map((match) => match[1]);
  assert.ok(imagePaths.length >= 10);
  for (const image of imagePaths) {
    const publicFile = resolve(process.cwd(), 'public', image.replace(/^\//, ''));
    assert.equal(existsSync(publicFile), true, `missing blog image asset: ${image}`);
  }
});
