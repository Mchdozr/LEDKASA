#!/usr/bin/env node
/** 960×960 Mg föy gömülü görselinden rental kabinet foto kırpımları (yalnızca sol sütun). */
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const projectRoot = resolve(import.meta.dirname, '..');
const pdf = resolve(projectRoot, 'public/assets/docs/mg-alloy-cabinet-960x960.pdf');
const tmpJpg = resolve(projectRoot, 'assets/manufacturer/rental-960-embedded.jpg');
const outDir = resolve(projectRoot, 'public/assets/images/products/gallery');
const cropDir = resolve(projectRoot, 'assets/manufacturer/crops');
mkdirSync(cropDir, { recursive: true });
mkdirSync(outDir, { recursive: true });

const extract = spawnSync(
  'python3',
  [
    '-c',
    `import pymupdf, sys
doc = pymupdf.open(sys.argv[1])
xref = doc[0].get_images(full=True)[0][0]
pix = pymupdf.Pixmap(doc, xref)
pix.save(sys.argv[2])`,
    pdf,
    tmpJpg,
  ],
  { encoding: 'utf8' },
);
if (extract.status !== 0) {
  console.error(extract.stderr || extract.stdout);
  process.exit(extract.status ?? 1);
}

const photoW = 520;
const regions = {
  rear: { left: 8, top: 72, width: photoW, height: 318 },
  front: { left: 8, top: 402, width: photoW, height: 318 },
  olcu: { left: 8, top: 392, width: photoW, height: 360 },
  ultra: { left: 8, top: 108, width: photoW, height: 286 },
  hava: { left: 8, top: 768, width: photoW, height: 220 },
  ip65: { left: 8, top: 972, width: photoW, height: 240 },
};

async function publish(name, region) {
  const pngOut = resolve(cropDir, `${name}.png`);
  await sharp(tmpJpg).extract(region).png().toFile(pngOut);
  await sharp(pngOut)
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(resolve(outDir, `${name}.webp`));
}

// Ön+arka: dikey kompozit — grid'de tam genişlikte okunaklı
const rearBuf = await sharp(tmpJpg).extract(regions.rear).toBuffer();
const frontBuf = await sharp(tmpJpg).extract(regions.front).toBuffer();
await sharp({
  create: { width: photoW, height: 636, channels: 3, background: '#ffffff' },
})
  .composite([
    { input: rearBuf, left: 0, top: 0 },
    { input: frontBuf, left: 0, top: 318 },
  ])
  .png()
  .toFile(resolve(cropDir, 'rental-960-urun-gorunumu.png'));
await sharp(resolve(cropDir, 'rental-960-urun-gorunumu.png'))
  .webp({ quality: 88 })
  .toFile(resolve(outDir, 'rental-960-urun-gorunumu.webp'));

await publish('rental-960-olcu-diyagram', regions.olcu);
await publish('rental-960-ultra-hafif', regions.ultra);
await publish('rental-960-hava-cikislari', regions.hava);
await publish('rental-960-ip65-yapi', regions.ip65);

console.log('Rental 960 galeri: 5 kabinet fotoğrafı üretildi.');
