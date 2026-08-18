#!/usr/bin/env node
/** U-Motion 960×960-B ürün fotoğrafları → rental galeri WebP */
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

const projectRoot = resolve(import.meta.dirname, '..');
const cropDir = resolve(projectRoot, 'assets/manufacturer/crops');
const outDir = resolve(projectRoot, 'public/assets/images/products/gallery');
mkdirSync(cropDir, { recursive: true });

const sources = [
  ['7539c933-92fe-487b-9ec8-6b3314edaf0b', 'rental-960-on-gorunum'],
  ['52b9a64a-3139-485e-bf6e-16529f73cf6e', 'rental-960-arka-gorunum'],
  ['91afe476-31a6-41b3-8f2b-26c6e82e858e', 'rental-960-ultra-hafif'],
  ['9aba664f-e495-482f-af0b-63996611fee4', 'rental-960-hava-cikislari'],
];

const baseUrl =
  'https://omo-oss-image1.thefastimg.com/portal-saas/pg2024120315275521942/cms/image';
const headers = {
  'User-Agent': 'Mozilla/5.0',
  Referer: 'https://www.umtdiecast.com/products_detail/140.html',
};

for (const [uid, name] of sources) {
  const res = await fetch(`${baseUrl}/${uid}.jpg`, { headers });
  if (!res.ok) throw new Error(`İndirilemedi: ${name} (${res.status})`);
  const buf = Buffer.from(await res.arrayBuffer());
  const png = resolve(cropDir, `${name}.png`);
  const webp = resolve(outDir, `${name}.webp`);
  await sharp(buf).rotate().png().toFile(png);
  await sharp(buf)
    .rotate()
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(webp);
}

writeFileSync(
  resolve(projectRoot, 'assets/manufacturer/rental-960-source-ids.json'),
  JSON.stringify({ product: '960X960-B', sources: Object.fromEntries(sources) }, null, 2),
);
console.log(`Rental 960: ${sources.length} üretici fotoğrafı işlendi.`);
