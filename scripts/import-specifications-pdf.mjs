#!/usr/bin/env node
/**
 * specifications 参数.pdf → sayfa görselleri + routing manifest.
 * Kaynak: assets/uploads/specifications.pdf
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const projectRoot = resolve(import.meta.dirname, '..');
const uploadCandidates = [
  resolve(projectRoot, 'assets/uploads/specifications.pdf'),
  resolve(projectRoot, 'assets/uploads/specifications .pdf'),
  resolve(projectRoot, 'assets/uploads/960960PDF.pdf'),
];
const sourcePdf = uploadCandidates.find((p) => existsSync(p));

if (!sourcePdf) {
  console.error('PDF bulunamadı: assets/uploads/specifications.pdf');
  process.exit(1);
}

const outDir = resolve(projectRoot, 'assets/manufacturer/pages');
const publicGallery = resolve(projectRoot, 'public/assets/images/products/gallery');
mkdirSync(outDir, { recursive: true });
mkdirSync(publicGallery, { recursive: true });

const extract = spawnSync(
  'python3',
  [
    '-c',
    `import pymupdf, json, sys
doc = pymupdf.open(sys.argv[1])
pages = []
for i, page in enumerate(doc):
    text = page.get_text()
    pix = page.get_pixmap(matrix=pymupdf.Matrix(2, 2))
    path = sys.argv[2] + f'/page-{i+1:02d}.png'
    pix.save(path)
    pages.append({'index': i, 'text': text[:4000], 'image': path})
print(json.dumps(pages))`,
    sourcePdf,
    outDir,
  ],
  { encoding: 'utf8' },
);

if (extract.status !== 0) {
  console.error(extract.stderr || extract.stdout);
  process.exit(extract.status ?? 1);
}

const pages = JSON.parse(extract.stdout.trim());
const routing = [];

for (const page of pages) {
  const t = page.text.toLowerCase();
  let productSlug = 'cnc-led-kasa';
  let groupKey = '960-mg';
  let label = 'sayfa';

  if (/640\s*[×x*]\s*480|640x480|small pitch cabinet/i.test(page.text)) {
    groupKey = '640-small-pitch-480';
    label = '640x480-B';
  } else if (/640\s*[×x*]\s*640|640x640/i.test(page.text)) {
    groupKey = '640-small-pitch-family';
    label = '640x640-aile';
  } else if (/960\s*[×x*]\s*960|960x960|mg alloy|magnesium/i.test(page.text)) {
    groupKey = '960-mg';
    label = '960x960-mg';
  } else if (/poster|advertising|1920/i.test(page.text)) {
    productSlug = 'poster-led-kasa';
    groupKey = null;
    label = 'poster';
  } else if (/foldable|katlan/i.test(page.text)) {
    productSlug = 'katlanabilir-poster-led-kasa';
    groupKey = null;
    label = 'katlanabilir-poster';
  } else if (/rental|kickstand|handle/i.test(t) && /960/.test(page.text)) {
    productSlug = 'rental-led-kabinet';
    groupKey = null;
    label = 'rental-960';
  }

  const base = `${productSlug}-${label}-p${String(page.index + 1).padStart(2, '0')}`;
  const webpOut = resolve(publicGallery, `${base}.webp`);
  await sharp(page.image)
    .rotate()
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(webpOut);

  routing.push({
    page: page.index + 1,
    productSlug,
    groupKey,
    publicPath: `/assets/images/products/gallery/${base}.webp`,
    sourcePage: page.image,
  });
}

writeFileSync(
  resolve(projectRoot, 'assets/manufacturer/import-routing.json'),
  JSON.stringify({ sourcePdf, pages: routing }, null, 2),
);
console.log(`İşlendi: ${pages.length} sayfa`);
