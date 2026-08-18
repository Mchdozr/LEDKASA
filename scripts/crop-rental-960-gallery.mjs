#!/usr/bin/env node
/** 960×960 Mg föy PDF → rental kabinet galeri kırpımları */
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const projectRoot = resolve(import.meta.dirname, '..');
const pdf = resolve(projectRoot, 'public/assets/docs/mg-alloy-cabinet-960x960.pdf');
const tmpPng = resolve(projectRoot, 'assets/manufacturer/rental-960-page.png');
const outDir = resolve(projectRoot, 'public/assets/images/products/gallery');
mkdirSync(resolve(projectRoot, 'assets/manufacturer'), { recursive: true });
mkdirSync(outDir, { recursive: true });

const render = spawnSync(
  'python3',
  [
    '-c',
    `import pymupdf, sys
doc = pymupdf.open(sys.argv[1])
pix = doc[0].get_pixmap(matrix=pymupdf.Matrix(2, 2))
pix.save(sys.argv[2])`,
    pdf,
    tmpPng,
  ],
  { encoding: 'utf8' },
);
if (render.status !== 0) {
  console.error(render.stderr || render.stdout);
  process.exit(render.status ?? 1);
}

const crops = [
  ['rental-960-urun-gorunumu', { left: 0, top: 120, width: 1191, height: 520 }],
  ['rental-960-olcu-diyagram', { left: 600, top: 120, width: 591, height: 520 }],
  ['rental-960-ultra-hafif', { left: 0, top: 860, width: 397, height: 360 }],
  ['rental-960-hava-cikislari', { left: 397, top: 860, width: 397, height: 360 }],
  ['rental-960-ip65-yapi', { left: 794, top: 860, width: 397, height: 360 }],
];

for (const [name, region] of crops) {
  await sharp(tmpPng)
    .extract(region)
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(resolve(outDir, `${name}.webp`));
}

console.log(`Rental 960 galeri: ${crops.length} görsel üretildi.`);
