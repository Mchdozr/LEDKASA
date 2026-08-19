/** Ürün grubu anahtarları — CNC ve rental alt profilleri. */

export type ManufacturerGroupKey =
  | '960-mg'
  | '640-small-pitch-480'
  | '640-small-pitch-family'
  | 'rental-960-mg'
  | 'poster-500-outdoor';

/** Galeri görseli → ürün eşleşmesi (yalnızca kabinet fotoğrafları). */
export const manufacturerGalleryManifest = [
  {
    file: 'cnc-960-arka-gorunum.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '960-mg' as const,
    caption: '960×960 mm — arka görünüm',
  },
  {
    file: 'cnc-960-ip65-arka.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '960-mg' as const,
    caption: '960×960 mm — dış mekân arka görünüm',
  },
  {
    file: 'cnc-640-on-gorunum.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '640-small-pitch-480' as const,
    caption: '640×480-B — ön görünüm',
  },
  {
    file: 'cnc-640-arka-gorunum.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '640-small-pitch-480' as const,
    caption: '640×480-B — arka görünüm',
  },
  {
    file: 'cnc-640-ic-yapi.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '640-small-pitch-480' as const,
    caption: '640×480-B — önden bakım iç yapı',
  },
  {
    file: 'rental-960-on-gorunum.webp',
    productSlug: 'rental-led-kabinet' as const,
    groupKey: 'rental-960-mg' as const,
    caption: '960×960 mm — ön görünüm',
  },
  {
    file: 'rental-960-arka-gorunum.webp',
    productSlug: 'rental-led-kabinet' as const,
    groupKey: 'rental-960-mg' as const,
    caption: '960×960 mm — arka görünüm',
  },
  {
    file: 'rental-960-ultra-hafif.webp',
    productSlug: 'rental-led-kabinet' as const,
    groupKey: 'rental-960-mg' as const,
    caption: 'Ultra hafif magnezyum gövde',
  },
  {
    file: 'rental-960-hava-cikislari.webp',
    productSlug: 'rental-led-kabinet' as const,
    groupKey: 'rental-960-mg' as const,
    caption: 'Üst/alt hava çıkış portları',
  },
  {
    file: 'poster-500-on-gorunum.webp',
    productSlug: 'poster-led-kasa' as const,
    groupKey: 'poster-500-outdoor' as const,
    caption: 'Dış mekân LED poster — ön görünüm',
  },
  {
    file: 'poster-500-arka-gorunum.webp',
    productSlug: 'poster-led-kasa' as const,
    groupKey: 'poster-500-outdoor' as const,
    caption: 'Dış mekân LED poster — arka görünüm',
  },
  {
    file: 'poster-500-olcu-detay.webp',
    productSlug: 'poster-led-kasa' as const,
    groupKey: 'poster-500-outdoor' as const,
    caption: '500 × 2000 mm teknik detay şeması (TR)',
  },
] as const;
