import { mkdir, rm } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import sharp from 'sharp';

const projectRoot = resolve(import.meta.dirname, '..');
const source = (path) => resolve(projectRoot, 'assets', path);
const output = (path) => resolve(projectRoot, 'public', 'assets', 'images', path);

const copies = [
  ['cnc-kasa.png', 'products/cnc-led-kasa.webp'],
  ['cnc-hero-on.png', 'products/cnc-hero-on.webp'],
  ['cnc-hero-elektronik.png', 'products/cnc-hero-elektronik.webp'],
  ['cnc-hero-kapak.png', 'products/cnc-hero-kapak.webp'],
  ['cnc-hero-modul-cerceve.png', 'products/cnc-hero-modul-cerceve.webp'],
  ['cnc-hero-ekran-duvari.png', 'products/cnc-hero-ekran-duvari.webp'],
  ['kapaksiz-kabinet.png', 'products/kapaksiz-led-kabinet.webp'],
  ['rental-kabinet.png', 'products/rental-led-kabinet.webp'],
  ['poster-kasa.png', 'products/poster-led-kasa.webp'],
  ['pledkasa-1.png', 'products/katlanabilir-poster-led-kasa.webp'],
  ['pledkasa-1.png', 'products/pledkasa-1.webp'],
  ['pledkasa-2.png', 'products/pledkasa-2.webp'],
  ['pledkasa-3.png', 'products/pledkasa-3.webp'],
  ['manufacturer/mg-alloy-960x960-datasheet.jpg', 'products/gallery/cnc-960x960-foy.webp'],
  ['manufacturer/crops/cnc-960-mg/01-arka-gorunum.png', 'products/gallery/cnc-960-arka-gorunum.webp'],
  ['manufacturer/crops/cnc-960-mg/02-arka-kapak.jpg', 'products/gallery/cnc-960-arka-kapak.webp'],
  ['manufacturer/crops/cnc-960-mg/03-ic-cerceve.jpg', 'products/gallery/cnc-960-ic-cerceve.webp'],
  ['manufacturer/crops/poster-advertising/01-ince-640.png', 'products/gallery/poster-640-ince.webp'],
  ['manufacturer/crops/poster-advertising/02-moduler-500-1000.jpg', 'products/gallery/poster-500-1000-moduler.webp'],
  ['manufacturer/crops/poster-advertising/03-genis-960.jpg', 'products/gallery/poster-960-genis.webp'],
  ['manufacturer/crops/cnc-640-elektronik-arka.png', 'products/gallery/cnc-640-elektronik-arka.webp'],
  ['manufacturer/crops/cnc-640-kapak-arka.png', 'products/gallery/cnc-640-kapak-arka.webp'],
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

const siteProductBg = { r: 219, g: 217, b: 218, alpha: 1 };

const squareContainCopies = new Map([
  ['products/katlanabilir-poster-led-kasa.webp', siteProductBg],
  ['products/cnc-hero-modul-cerceve.webp', siteProductBg],
  ['products/cnc-hero-ekran-duvari.webp', siteProductBg],
  ['products/gallery/cnc-960-arka-gorunum.webp', siteProductBg],
  ['products/gallery/cnc-960-arka-kapak.webp', siteProductBg],
  ['products/gallery/cnc-960-ic-cerceve.webp', siteProductBg],
  ['products/gallery/poster-640-ince.webp', siteProductBg],
  ['products/gallery/poster-500-1000-moduler.webp', siteProductBg],
  ['products/gallery/poster-960-genis.webp', siteProductBg],
]);

const studioBackgroundMode = new Map([
  ['products/gallery/cnc-960-arka-gorunum.webp', 'light'],
  ['products/gallery/cnc-960-arka-kapak.webp', 'light'],
  ['products/gallery/cnc-960-ic-cerceve.webp', 'dark'],
  ['products/gallery/poster-640-ince.webp', 'dark'],
  ['products/gallery/poster-500-1000-moduler.webp', 'dark'],
  ['products/gallery/poster-960-genis.webp', 'dark'],
]);

const isStudioBackground = (r, g, b, mode) => {
  const maxc = Math.max(r, g, b);
  const minc = Math.min(r, g, b);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (mode === 'dark') return lum < 16 && maxc < 24;
  return lum > 188 && maxc - minc < 32;
};

const replaceConnectedStudioBackground = async (inputPath, mode, background) => {
  const { data, info } = await sharp(inputPath).rotate().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const seen = new Uint8Array(width * height);
  const stack = [];

  const enqueue = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (seen[i]) return;
    const o = i * channels;
    if (!isStudioBackground(data[o], data[o + 1], data[o + 2], mode)) return;
    seen[i] = 1;
    data[o] = background.r;
    data[o + 1] = background.g;
    data[o + 2] = background.b;
    data[o + 3] = 255;
    stack.push(i);
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  while (stack.length > 0) {
    const i = stack.pop();
    const x = i % width;
    const y = (i / width) | 0;
    enqueue(x - 1, y);
    enqueue(x + 1, y);
    enqueue(x, y - 1);
    enqueue(x, y + 1);
  }

  return sharp(data, { raw: { width, height, channels } });
};

for (const [inputPath, outputPath] of copies) {
  const destination = output(outputPath);
  await mkdir(dirname(destination), { recursive: true });
  const squareBg = squareContainCopies.get(outputPath);
  const studioMode = studioBackgroundMode.get(outputPath);
  const pipeline = studioMode
    ? await replaceConnectedStudioBackground(source(inputPath), studioMode, siteProductBg)
    : sharp(source(inputPath)).rotate();
  if (squareBg) {
    await pipeline
      .resize(1400, 1400, { fit: 'contain', background: squareBg })
      .webp({ quality: 84 })
      .toFile(destination);
  } else {
    await pipeline
      .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(destination);
  }

  const metadata = await sharp(destination).metadata();
  if (metadata.format !== 'webp' || Math.max(metadata.width ?? 0, metadata.height ?? 0) > 1400) {
    throw new Error(`Asset verification failed: ${relative(projectRoot, destination)}`);
  }
}

for (const legacyPath of legacyPublicCopies) {
  await rm(output(legacyPath), { force: true });
}

console.log(`Optimized and verified ${copies.length} local WebP assets.`);
