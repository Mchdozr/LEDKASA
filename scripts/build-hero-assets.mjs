import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const projectRoot = resolve(import.meta.dirname, '..');
const products = ['cnc-led-kasa', 'rental-led-kabinet', 'poster-led-kasa'];
const outDir = resolve(projectRoot, 'public/assets/images/hero');

function buildAlpha(data, width, height, channels) {
  const n = width * height;
  const alpha = new Uint8Array(n);
  alpha.fill(255);
  const visited = new Uint8Array(n);
  const stack = [];
  const idx = (x, y) => y * width + x;

  const sample = (i) => {
    const o = i * channels;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const sat = max === 0 ? 0 : (max - min) / max;
    const neutral = Math.abs(r - g) < 30 && Math.abs(g - b) < 30 && Math.abs(r - b) < 34;
    return { lum, sat, neutral };
  };

  const isBg = (i) => {
    const { lum, sat, neutral } = sample(i);
    return neutral && lum >= 150 && sat <= 0.14;
  };

  const isSeed = (i) => {
    const { lum, sat, neutral } = sample(i);
    return neutral && lum >= 190 && sat <= 0.09;
  };

  for (let x = 0; x < width; x++) stack.push(idx(x, 0), idx(x, height - 1));
  for (let y = 0; y < height; y++) stack.push(idx(0, y), idx(width - 1, y));
  for (let i = 0; i < n; i++) if (isSeed(i)) stack.push(i);

  while (stack.length) {
    const i = stack.pop();
    if (i < 0 || i >= n || visited[i]) continue;
    visited[i] = 1;
    if (!isBg(i)) continue;
    alpha[i] = 0;
    const x = i % width;
    const y = (i / width) | 0;
    if (x > 0) stack.push(i - 1);
    if (x < width - 1) stack.push(i + 1);
    if (y > 0) stack.push(i - width);
    if (y < height - 1) stack.push(i + width);
  }

  for (let i = 0; i < n; i++) {
    if (alpha[i] === 0) continue;
    const { lum, sat, neutral } = sample(i);
    if (!(neutral && lum >= 175 && sat <= 0.1)) continue;
    const x = i % width;
    const y = (i / width) | 0;
    let transparentNeighbors = 0;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        if (alpha[idx(nx, ny)] === 0) transparentNeighbors += 1;
      }
    }
    if (transparentNeighbors >= 8) alpha[i] = 0;
  }

  const out = new Uint8Array(alpha);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = idx(x, y);
      if (alpha[i] === 0) continue;
      let near = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (alpha[idx(x + dx, y + dy)] === 0) near += 1;
        }
      }
      if (!near) continue;
      const { lum, sat, neutral } = sample(i);
      if (neutral && lum >= 140 && sat <= 0.16) out[i] = Math.max(0, 255 - near * 40);
    }
  }
  return out;
}

async function makeStudioBg(size) {
  const svg = `
  <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="wall" x1="0.15" y1="0" x2="0.9" y2="1">
        <stop offset="0%" stop-color="#1c2823"/>
        <stop offset="40%" stop-color="#101815"/>
        <stop offset="100%" stop-color="#070c0a"/>
      </linearGradient>
      <radialGradient id="key" cx="64%" cy="36%" r="46%">
        <stop offset="0%" stop-color="#d7f56a" stop-opacity="0.2"/>
        <stop offset="28%" stop-color="#6f8f62" stop-opacity="0.14"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="fill" cx="22%" cy="58%" r="40%">
        <stop offset="0%" stop-color="#9eb7a8" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a2420" stop-opacity="0"/>
        <stop offset="12%" stop-color="#151d19" stop-opacity="0.65"/>
        <stop offset="100%" stop-color="#050807"/>
      </linearGradient>
      <linearGradient id="floorSheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="45%" stop-color="#b8f236" stop-opacity="0.05"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
        <path d="M56 0H0V56" fill="none" stroke="rgba(184,242,54,0.05)" stroke-width="1"/>
      </pattern>
      <radialGradient id="vig" cx="50%" cy="42%" r="70%">
        <stop offset="50%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.62"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#wall)"/>
    <rect width="100%" height="100%" fill="url(#key)"/>
    <rect width="100%" height="100%" fill="url(#fill)"/>
    <polygon points="0,${Math.round(size * 0.58)} ${size},${Math.round(size * 0.54)} ${size},${size} 0,${size}" fill="url(#floor)"/>
    <polygon points="0,${Math.round(size * 0.58)} ${size},${Math.round(size * 0.54)} ${size},${size} 0,${size}" fill="url(#floorSheen)"/>
    <g transform="translate(0,${Math.round(size * 0.56)}) scale(1,0.42)">
      <rect width="100%" height="${size}" fill="url(#grid)"/>
    </g>
    <polygon points="0,${Math.round(size * 0.55)} ${Math.round(size * 0.34)},${Math.round(size * 0.5)} ${Math.round(size * 0.34)},${size} 0,${size}" fill="rgba(255,255,255,0.02)"/>
    <polygon points="${size},${Math.round(size * 0.52)} ${Math.round(size * 0.62)},${Math.round(size * 0.47)} ${Math.round(size * 0.62)},${size} ${size},${size}" fill="rgba(184,242,54,0.025)"/>
    <rect width="100%" height="100%" fill="url(#vig)"/>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

await mkdir(outDir, { recursive: true });

for (const name of products) {
  const input = resolve(projectRoot, `public/assets/images/products/${name}.webp`);
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const alpha = buildAlpha(data, width, height, channels);
  const rgba = Buffer.from(data);
  for (let i = 0; i < width * height; i++) rgba[i * 4 + 3] = alpha[i];

  const cutout = await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();
  const blurAlpha = await sharp(cutout).extractChannel('alpha').blur(26).raw().toBuffer();
  const shadowRaw = Buffer.alloc(width * height * 4, 0);
  const shiftY = 22;
  for (let y = 0; y < height - shiftY; y++) {
    for (let x = 0; x < width; x++) {
      const a = Math.round(blurAlpha[y * width + x] * 0.48);
      shadowRaw[((y + shiftY) * width + x) * 4 + 3] = a;
    }
  }
  const shadowPng = await sharp(shadowRaw, { raw: { width, height, channels: 4 } }).png().toBuffer();
  const destination = resolve(outDir, `${name}.webp`);
  await mkdir(dirname(destination), { recursive: true });
  await sharp(await makeStudioBg(width))
    .composite([
      { input: shadowPng, blend: 'over' },
      { input: cutout, blend: 'over' },
    ])
    .webp({ quality: 88 })
    .toFile(destination);
}

console.log(`Built ${products.length} hero studio assets in public/assets/images/hero.`);
