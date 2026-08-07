import { mkdir, rm } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import sharp from 'sharp';

const projectRoot = resolve(import.meta.dirname, '..');
const source = (path) => resolve(projectRoot, 'assets', path);
const output = (path) => resolve(projectRoot, 'public', 'assets', 'images', path);

const copies = [
  ['cnc-kasa.png', 'products/cnc-led-kasa.webp'],
  ['kapaksiz-kabinet.png', 'products/kapaksiz-led-kabinet.webp'],
  ['rental-kabinet.png', 'products/rental-led-kabinet.webp'],
  ['poster-kasa.png', 'products/poster-led-kasa.webp'],
  ['katlanabilir-poster-kasa.png', 'products/katlanabilir-poster-led-kasa.webp'],
  ['generated/cat6-cable-source.png', 'products/cat6-kablo.webp'],
  ['generated/power-plug-source.png', 'products/power-plug.webp'],
  ['generated/flat-cable-source.png', 'products/flat-kablo.webp'],
  ['generated/cable-set-source.png', 'products/cable-set.webp'],
  ['cnc-kasa.png', 'categories/led-ekran-kasalari.webp'],
  ['generated/cable-set-source.png', 'categories/guc-ve-baglanti-ekipmanlari.webp'],
  ['editorial/event-stage-source.jpg', 'editorial/event-stage.webp'],
  ['editorial/retail-signage-source.jpg', 'editorial/retail-digital-signage.webp'],
  ['editorial/electronics-workshop-source.jpg', 'editorial/electronics-workshop.webp'],
];

const legacyPublicCopies = [
  'products/cnc-led-kasa.png',
  'products/kapaksiz-led-kabinet.png',
  'products/rental-led-kabinet.png',
  'products/poster-led-kasa.png',
  'products/katlanabilir-poster-led-kasa.png',
  'products/cat6-kablo.jpg',
  'products/flat-kablo.jpg',
  'products/cable-set.png',
  'categories/led-ekran-kasalari.png',
  'categories/guc-ve-baglanti-ekipmanlari.png',
];

for (const [inputPath, outputPath] of copies) {
  const destination = output(outputPath);
  await mkdir(dirname(destination), { recursive: true });
  await sharp(source(inputPath))
    .rotate()
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(destination);

  const metadata = await sharp(destination).metadata();
  if (metadata.format !== 'webp' || Math.max(metadata.width ?? 0, metadata.height ?? 0) > 1400) {
    throw new Error(`Asset verification failed: ${relative(projectRoot, destination)}`);
  }
}

for (const legacyPath of legacyPublicCopies) {
  await rm(output(legacyPath), { force: true });
}

console.log(`Optimized and verified ${copies.length} local WebP assets.`);
