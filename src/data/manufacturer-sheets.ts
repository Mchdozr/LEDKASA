/** Ürün grubu anahtarları — CNC içinde alt profiller. */

export type ManufacturerGroupKey = '960-mg' | '640-small-pitch-480' | '640-small-pitch-family';

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
] as const;
