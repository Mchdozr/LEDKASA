/** Doğrulanmış üretici föyü (specifications 参数.pdf) — ürün eşleşmesi sabittir. */

export type ManufacturerGroupKey = '960-mg' | '640-small-pitch-480' | '640-small-pitch-family';

export interface ManufacturerFeature {
  title: string;
  description: string;
}

export interface ManufacturerSheet {
  /** site.ts Product.slug */
  productSlug: 'cnc-led-kasa' | 'kapaksiz-led-kabinet' | 'rental-led-kabinet' | 'poster-led-kasa' | 'katlanabilir-poster-led-kasa';
  /** CNC içinde alt grup; diğer ürünlerde yok */
  groupKey?: ManufacturerGroupKey;
  foyTitle: string;
  foySource: string;
  pdfPath?: string;
  features: ManufacturerFeature[];
}

export const manufacturerSheets: ManufacturerSheet[] = [
  {
    productSlug: 'cnc-led-kasa',
    groupKey: '960-mg',
    foyTitle: '960×960 mm magnezyum alaşım döküm kabinet',
    foySource: '960×960-B Mg Alloy Die Casting Cabinet — specifications föyü',
    pdfPath: '/assets/docs/mg-alloy-cabinet-960x960.pdf',
    features: [
      { title: 'Ultra hafif', description: 'Alüminyum döküm kabine göre yaklaşık %40 daha hafif; taşıma ve kurulum maliyetini düşürür.' },
      { title: 'Ultra ince', description: 'Yüksek mukavemetli gövde; alüminyum tasarıma göre yaklaşık %30 daha ince profil.' },
      { title: 'Anti-parazit', description: 'EMI / elektromanyetik parazit önleme yaklaşımı.' },
      { title: 'Hızlı soğutma', description: 'Isı dağıtımı modül devresini korur; üst/alt havalandırma delikleri (föy örneği).' },
      { title: 'Kolay kurulum', description: 'Hızlı kilit ve birleştirme parçaları ile sahada hızlı montaj (föy: ~20 sn vurgusu).' },
      { title: 'Yüksek hassasiyet', description: 'CNC işleme ile birleşim hatlarında sıkı tolerans.' },
      { title: 'Geniş uyumluluk', description: 'Farklı modül çizimlerine göre işlenebilir; iç/dış mekân senaryoları.' },
      { title: 'Maliyet-performans', description: 'Seri üretim ve tedarik zinciri ile ölçeklenebilir kabinet ailesi.' },
    ],
  },
  {
    productSlug: 'cnc-led-kasa',
    groupKey: '640-small-pitch-480',
    foyTitle: '640×480-B küçük pitch kabinet',
    foySource: '640×480-B Small Pitch Cabinet — specifications föyü',
    pdfPath: '/assets/docs/small-pitch-640x480-B.pdf',
    features: [
      { title: 'Hızlı soğutma', description: 'Isı dağıtımı modül devresini korur (föy: Fast cooling).' },
      { title: 'Anti-parazit', description: 'EMI / elektromanyetik parazit önleme (föy: Anti-interference).' },
      { title: 'Sert bağlantı', description: 'Modül yapıştırıldığında devreye girer (Hard connection installation).' },
      { title: 'Hızlı kurulum', description: 'Hızlı kilit ile yaklaşık 20 sn montaj (föy).' },
      { title: 'Yüksek hassasiyet', description: 'CNC işleme ile birleşim hatlarında sıkı tolerans; dikişsiz birleşim hedefi.' },
      { title: 'Önden bakım', description: 'Kabinet çelik konstrüksiyondan önden sökülebilir; mıknatıs ve bağlantı noktaları föyde gösterilir.' },
      { title: 'İç mekân uyumu', description: 'Modül çizimine göre işlenebilir; IP30 iç mekân (föy).' },
      { title: 'Maliyet-performans', description: 'Seri üretim ve tedarik zinciri (föy: High cost-effective).' },
    ],
  },
  {
    productSlug: 'cnc-led-kasa',
    groupKey: '640-small-pitch-family',
    foyTitle: '640 mm küçük pitch aile özeti',
    foySource: '320×480 / 640×480 / 320×640 / 640×640 — specifications föyü',
    pdfPath: '/assets/docs/small-pitch-cabinet-640.pdf',
    features: [
      { title: 'Modüler ölçü ailesi', description: '320×480, 640×480, 320×640 ve 640×640 mm gövde seçenekleri.' },
      { title: 'Ortak modül kiti', description: '320×160 mm suite; P1–P2.5 aralığında küçük pitch modüller.' },
      { title: 'Önden bakım', description: '48 mm tipik kalınlık; servis önden planlanır.' },
      { title: 'Alüminyum alaşım', description: 'Mg/Al seçenekleri föyde; renk siyah/gümüş.' },
    ],
  },
  {
    productSlug: 'kapaksiz-led-kabinet',
    foyTitle: 'Kapaksız / açık çerçeve kabinet',
    foySource: 'Föydeki açık kasa + merkez güç kutusu görselleri',
    features: [
      { title: 'Açık modül ızgarası', description: 'Modül yuvaları doğrudan erişilebilir; kapaksız arka mimari.' },
      { title: 'Merkez güç / kart hattı', description: 'Dikey güç kutusu ve modül alanı ayrımı.' },
      { title: 'Hızlı kilit birleşim', description: 'Kabinetler arası hizalama ve kilitleme noktaları.' },
      { title: 'Servis odaklı', description: 'Bakım yönü netleştirildiğinde sabit duvar projelerine uygun.' },
    ],
  },
  {
    productSlug: 'rental-led-kabinet',
    foyTitle: '960×960 mm rental / sahne kabineti',
    foySource: 'Turuncu yan tutamaklı, mavi konektörlü 960 föy görselleri',
    features: [
      { title: 'Taşıma tutamakları', description: 'Turuncu entegre yan tutamaklar; sahne kurulumunda hızlı pozisyonlama.' },
      { title: 'Hızlı kilit', description: 'Kabinetler arası mekanik kilit ve hizalama.' },
      { title: 'Güç / veri daisy-chain', description: 'Üst/alt mavi konektör noktaları (föy görseli).' },
      { title: 'Ayak / ground stack', description: 'Katlanır ayak ile tek kabinet demo veya zemin kurulumu (föy görseli).' },
    ],
  },
];

/** Galeri görseli → ürün eşleşmesi (rastgele yerleştirme yok). */
export const manufacturerGalleryManifest = [
  {
    file: 'cnc-960-arka-gorunum.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '960-mg' as const,
    caption: '960×960 mm Mg alaşım döküm — arka görünüm (küçük pitch 640 değil)',
  },
  {
    file: 'cnc-960-olcu-diyagram.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '960-mg' as const,
    caption: '960×960 mm modül yerleşim diyagramı',
  },
  {
    file: 'cnc-960-ip65-arka.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '960-mg' as const,
    caption: '960×960 mm — IP65 dış mekân / kablo delikleri (föy)',
  },
  {
    file: 'cnc-960-ozellik-ikonlari.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '960-mg' as const,
    caption: '960×960 mm Mg alaşım — föy özellik ikonları',
  },
  {
    file: 'cnc-960x960-foy.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '960-mg' as const,
    caption: '960×960 mm tam üretici föy sayfası',
  },
  {
    file: 'cnc-640-urun-fotolari.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '640-small-pitch-480' as const,
    caption: '640×480-B — föy ürün görselleri (ön / arka / iç yapı)',
  },
  {
    file: 'cnc-640-ozellik-seridi.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '640-small-pitch-480' as const,
    caption: '640×480-B — föy özellik seridi',
  },
  {
    file: 'cnc-640-spec-tablo.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '640-small-pitch-480' as const,
    caption: '640×480-B — teknik parametre tablosu (föy)',
  },
  {
    file: 'cnc-640-eslestirilmis-urunler.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '640-small-pitch-480' as const,
    caption: '640×480-B — eşleşen PCB / flight case (föy)',
  },
  {
    file: 'cnc-640x480-foy.webp',
    productSlug: 'cnc-led-kasa' as const,
    groupKey: '640-small-pitch-480' as const,
    caption: '640×480-B tam üretici föy sayfası',
  },
] as const;

export const featuresForProductGroup = (
  productSlug: ManufacturerSheet['productSlug'],
  groupKey?: ManufacturerSheet['groupKey'],
) =>
  manufacturerSheets.filter(
    (sheet) => sheet.productSlug === productSlug && (groupKey ? sheet.groupKey === groupKey : !sheet.groupKey),
  );
