export const siteUrl = 'https://ledkasa.com.tr';

export const businessContact = {
  email: 'info@ledkasa.com.tr',
  phoneDisplay: '+90 530 405 67 68',
  phoneTel: '+905304056768',
  whatsappUrl: 'https://wa.me/905304056768',
} as const;

export const organizationLogo = '/favicon.svg';

/** LEDKASA, Ledajans grubunun kasa / kabinet odaklı markasıdır. */
export const companyProfile = {
  brandName: 'LEDKASA',
  legalName: 'TAHA LED DIŞ TİCARET ANONİM ŞİRKETİ',
  parentBrand: 'Ledajans',
  parentUrl: 'https://ledajans.com/',
  parentEmail: 'info@ledajans.com',
  relationship:
    'LEDKASA; Ledajans grubu bünyesinde LED ekran kasa, kabinet ve bağlantı ekipmanlarına odaklanan ürün markasıdır. Satış ve proje iletişimi LEDKASA kanallarından, grup operasyonu ise Ledajans çatısı altında yürütülür.',
  taxOffice: 'Şişli',
  taxNumber: '816 060 6453',
  tradeRegistryNo: '79014-5',
  officePhoneDisplay: '+90 212 220 40 04',
  officePhoneTel: '+902122204004',
  office: {
    label: 'Merkez ofis',
    line1: 'Halide Edip Adıvar Mah. Gül 2 Sokak No: 10a',
    line2: '34382 Şişli / İstanbul',
    mapQuery: 'Halide Edip Adıvar Mah. Gül 2 Sokak No: 10a, 34382 Şişli/İstanbul',
  },
  production: {
    label: 'Kasa üretim yeri',
    line1: 'Bakırcılar ve Pirinçciler Sanayi Sitesi',
    line2: 'Beylikdüzü Organize Sanayi Bölgesi, 34524 Beylikdüzü / İstanbul',
    latitude: 40.998306,
    longitude: 28.667111,
    coordinatesDisplay: `40°59'53.9"N 28°40'01.6"E`,
    mapEmbedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=28.662111%2C40.995306%2C28.672111%2C41.001306&layer=mapnik&marker=40.998306%2C28.667111',
    mapLinkUrl: 'https://www.openstreetmap.org/?mlat=40.998306&mlon=28.667111#map=17/40.998306/28.667111',
  },
} as const;

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductCategory {
  slug: 'led-ekran-kasalari' | 'guc-ve-baglanti-ekipmanlari';
  name: string;
  shortName: string;
  description: string;
  url: string;
  canonicalUrl: string;
  image: string;
  imageAlt: string;
  products: Product[];
}

export interface Product {
  slug:
    | 'cnc-led-kasa'
    | 'kapaksiz-led-kabinet'
    | 'rental-led-kabinet'
    | 'poster-led-kasa'
    | 'katlanabilir-poster-led-kasa'
    | 'cat6-kablo'
    | 'power-plug'
    | 'flat-kablo'
    | 'cable-set';
  categorySlug: ProductCategory['slug'];
  name: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  specs?: ProductSpec[];
  useCases?: string[];
  relatedGuides?: { name: string; url: string }[];
  applicationLinks?: { name: string; url: string }[];
  complementaryProducts?: Product['slug'][];
  datasheetUrl?: string;
  datasheetLabel?: string;
  specsNote?: string;
  url: string;
  image: string;
  imageAlt: string;
  canonicalUrl: string;
  seoTitle: string;
  seoDescription: string;
}

const categoryPath = (slug: ProductCategory['slug']) => `/urunler/${slug}/`;
const productPath = (categorySlug: ProductCategory['slug'], slug: Product['slug']) =>
  `${categoryPath(categorySlug)}${slug}/`;
const canonicalPath = (path: string) => `${siteUrl}${path}`;

export const products: Product[] = [
  {
    slug: 'cnc-led-kasa',
    categorySlug: 'led-ekran-kasalari',
    name: 'CNC LED Kasa',
    shortDescription: 'Sabit LED ekran projeleri için hassas üretimli, düzenli kabinet çözümü.',
    description:
      'CNC LED Kasa, sabit LED ekran kurulumlarında düzenli kabin mimarisi, modül uyumu ve profesyonel görünüm aranan projeler için değerlendirilir. Teklif aşamasında ekran ölçüsü, pitch ve montaj yüzeyi netleştirilir.',
    highlights: [
      'Sabit kurulum ve kalıcı ekran yüzeyleri',
      'Mg alaşım döküm: alüminyuma göre daha hafif / ince gövde yaklaşımı',
      'Hassas birleşim için CNC destekli üretim',
      'Modül pitch ve proje ölçüsüne göre değerlendirme',
    ],
    specs: [
      { label: 'Örnek kabinet ölçüsü', value: 'W960 × H960 × D87 mm' },
      { label: 'Ağırlık (temel aksesuarlarla)', value: '11,8 kg' },
      { label: 'Malzeme', value: 'Magnezyum alaşım (Mg alloy) döküm' },
      { label: 'Modül uyumu (örnek)', value: 'P4 / P5 / P6.67 / P8 / P10 / P13.33' },
      { label: 'Örnek suite / modül boyutu', value: '320 × 160 mm' },
      { label: 'Kurulum tipi', value: 'Sabit kurulum' },
      { label: 'Ortam', value: 'İç mekân / dış mekân (proje koşullarına göre)' },
      { label: 'Renk', value: 'Siyah (özel renk talebe göre)' },
      { label: 'Dahil aksesuarlar', value: 'Hızlı kilit, tutamak, sistem/güç plakası, birleştirme parçası' },
      { label: 'Örnek güç seçenekleri', value: '200W-5V 40A veya 400W-5V 80A' },
      { label: 'Örnek güç konektörü', value: '20A 3×2,5 mm²' },
      { label: 'Flight case (örnek)', value: '5 veya 6 kabinet kapasitesi' },
    ],
    specsNote:
      'Aşağıdaki teknik değerler doğrulanmış üretici föyüne (960×960 mm Mg alaşım döküm kabinet) aittir. Projenize özel ölçü, pitch ve aksesuar kapsamı teklifte netleştirilir.',
    useCases: [
      'Kurumsal lobi ve kalıcı reklam yüzeyleri',
      'Mağaza / showroom sabit LED duvarları',
      'İç ve dış mekân sabit kurulumlar',
    ],
    relatedGuides: [
      { name: 'LED ekran kasası nasıl seçilir?', url: '/bilgi-merkezi/led-ekran-kasasi-nasil-secilir/' },
      { name: 'Modül pitch ve kasa uyumu', url: '/bilgi-merkezi/modul-pitch-ve-kasa-uyumu/' },
      { name: 'Kasa karşılaştırma tablosu', url: '/urunler/kasa-karsilastirma/' },
    ],
    applicationLinks: [
      { name: 'Kurumsal ve Reklam', url: '/uygulama-alanlari/kurumsal-ve-reklam/' },
    ],
    complementaryProducts: ['kapaksiz-led-kabinet', 'cat6-kablo', 'power-plug'],
    datasheetUrl: '/assets/docs/mg-alloy-cabinet-960x960.pdf',
    datasheetLabel: '960×960 mm teknik föyü (PDF)',
    url: productPath('led-ekran-kasalari', 'cnc-led-kasa'),
    image: '/assets/images/products/cnc-led-kasa.webp',
    imageAlt: 'CNC üretim LED ekran kasası',
    canonicalUrl: canonicalPath(productPath('led-ekran-kasalari', 'cnc-led-kasa')),
    seoTitle: 'CNC LED Kasa | LEDKASA',
    seoDescription:
      'Sabit LED ekran projeleri için CNC LED kasa. 960×960 mm Mg alaşım örnek föyü, pitch uyumu ve teklif süreci LEDKASA’da.',
  },
  {
    slug: 'kapaksiz-led-kabinet',
    categorySlug: 'led-ekran-kasalari',
    name: 'Kapaksız LED Kabinet',
    shortDescription: 'Erişilebilir ve yalın kabin yapısı arayan sabit LED ekran projeleri için.',
    description:
      'Kapaksız LED Kabinet, bakım erişimi ve yalın arka yapı ihtiyacının öne çıktığı sabit LED ekran uygulamalarında değerlendirilir. Yerleşim ve erişim yönü teklif öncesi netleştirilir.',
    highlights: ['Yalın kabin mimarisi', 'Bakım erişimine uygun planlama', 'Sabit proje yerleşimine uyum'],
    specs: [
      { label: 'Kurulum tipi', value: 'Sabit kurulum' },
      { label: 'Tipik kullanım', value: 'Erişim odaklı sabit LED yüzeyler' },
      { label: 'Öne çıkan ihtiyaç', value: 'Bakım / servis erişim yönü' },
      { label: 'Bağlantı yaklaşımı', value: 'Erişilebilir arka hat planı' },
      { label: 'Teklifte netleşenler', value: 'Ölçü, pitch, montaj yüzeyi, aksesuar' },
    ],
    specsNote: 'Ölçü ve pitch değerleri proje özelinde değişir; uydurma teknik ölçü yayınlanmaz. Kapsam teklifte netleştirilir.',
    useCases: ['Servis erişimi gereken sabit duvar ekranları', 'Kontrol odası ve teknik alanlar', 'Kurumsal kalıcı paneller'],
    relatedGuides: [
      { name: 'CNC, kapaksız ve rental karşılaştırma', url: '/bilgi-merkezi/kasa-secimi-cnc-kapaksiz-rental-kabinet/' },
      { name: 'Kasa karşılaştırma tablosu', url: '/urunler/kasa-karsilastirma/' },
      { name: 'LED ekran kasası nasıl seçilir?', url: '/bilgi-merkezi/led-ekran-kasasi-nasil-secilir/' },
    ],
    applicationLinks: [
      { name: 'Kurumsal ve Reklam', url: '/uygulama-alanlari/kurumsal-ve-reklam/' },
    ],
    complementaryProducts: ['cnc-led-kasa', 'cat6-kablo', 'power-plug'],
    url: productPath('led-ekran-kasalari', 'kapaksiz-led-kabinet'),
    image: '/assets/images/products/kapaksiz-led-kabinet.webp',
    imageAlt: 'Kapaksız LED ekran kabineti',
    canonicalUrl: canonicalPath(productPath('led-ekran-kasalari', 'kapaksiz-led-kabinet')),
    seoTitle: 'Kapaksız LED Kabinet | LEDKASA',
    seoDescription: 'Kapaksız LED kabinet ile erişilebilir sabit ekran kurgularını LEDKASA’da proje ihtiyacınıza göre değerlendirin.',
  },
  {
    slug: 'rental-led-kabinet',
    categorySlug: 'led-ekran-kasalari',
    name: 'Rental LED Kabinet',
    shortDescription: 'Etkinlik ve sahne kurulumları için modüler LED ekran kabini.',
    description:
      'Rental LED Kabinet, etkinlik, sahne ve geçici kurulumlarda hızlı montaj–söküm akışına uygun modüler LED ekran sistemleri için planlanır. Taşıma, kilitleme ve bağlantı rotası birlikte ele alınır.',
    highlights: ['Etkinlik ve sahne projeleri', 'Modüler kurulum / söküm akışı', 'Güç ve veri ile birlikte planlama'],
    specs: [
      { label: 'Kurulum tipi', value: 'Geçici / rental' },
      { label: 'Tipik kullanım', value: 'Etkinlik, sahne, organizasyon' },
      { label: 'Öne çıkan ihtiyaç', value: 'Hızlı kurulum–söküm ve taşıma' },
      { label: 'Bağlantı yaklaşımı', value: 'Sökülebilir güç + veri hatları' },
      { label: 'Teklifte netleşenler', value: 'Kabinet adedi, hat uzunlukları, set kapsamı' },
    ],
    specsNote: 'Rental sistemlerde ölçü ve hat uzunlukları sahaya göre değişir; kapsam teklifte belirlenir.',
    useCases: ['Konser ve sahne LED yüzeyleri', 'Fuar ve organizasyon ekranları', 'Geçici outdoor/indoor kurgular'],
    relatedGuides: [
      { name: 'Rental LED ekran kurulum rehberi', url: '/bilgi-merkezi/rental-led-ekran-kurulum-rehberi/' },
      { name: 'Kablolama rehberi', url: '/bilgi-merkezi/led-ekran-kablolama-rehberi/' },
      { name: 'Kasa karşılaştırma tablosu', url: '/urunler/kasa-karsilastirma/' },
    ],
    applicationLinks: [
      { name: 'Etkinlik ve Sahne', url: '/uygulama-alanlari/etkinlik-ve-sahne/' },
    ],
    complementaryProducts: ['cable-set', 'power-plug', 'cat6-kablo'],
    url: productPath('led-ekran-kasalari', 'rental-led-kabinet'),
    image: '/assets/images/products/rental-led-kabinet.webp',
    imageAlt: 'Rental kullanım için LED ekran kabineti',
    canonicalUrl: canonicalPath(productPath('led-ekran-kasalari', 'rental-led-kabinet')),
    seoTitle: 'Rental LED Kabinet | LEDKASA',
    seoDescription: 'Etkinlik ve sahne için rental LED kabinet seçeneklerini kurulum akışıyla birlikte LEDKASA’da inceleyin.',
  },
  {
    slug: 'poster-led-kasa',
    categorySlug: 'led-ekran-kasalari',
    name: 'Poster LED Kasa',
    shortDescription: 'Dikey dijital ekran uygulamaları için poster ekran kasa çözümü.',
    description:
      'Poster LED Kasa, mağaza, fuaye ve kurumsal alanlarda dikey içerik sunan LED ekran uygulamaları için değerlendirilir. Üretici föyünde ince, modüler ve geniş dikey örnek ölçüleri yer alır; görüş mesafesi ve yerleşim noktası seçimi etkiler.',
    highlights: [
      'Dikey reklam / poster ekran uygulamaları',
      'İnce, modüler veya geniş dikey örnek gövdeler',
      'Mg / Al alaşım kabinet seçenekleri',
      'Stand (sac taban + tekerlek) veya sabit yerleşim planı',
    ],
    specs: [
      { label: 'Örnek ince dikey ölçü', value: 'W640 × H1920 × D420 mm' },
      { label: 'Örnek ince dikey modül uyumu', value: 'P1 / P1.25 / P1.37 / P1.53 / P1.66 / P1.83 / P2 / P2.5 / P4 / P5' },
      { label: 'Örnek ince dikey ortam', value: 'İç mekân' },
      { label: 'Örnek modüler ölçü', value: 'W500 × H2000 × D420 mm veya W1000 × H2000 × D420 mm' },
      { label: 'Örnek modüler pitch', value: 'P2.5 / P2.604 / P2.976 / P3.91 / P4.46 / P4.81 / P5.21 / P6.25' },
      { label: 'Örnek modüler ortam', value: 'İç mekân / dış mekân' },
      { label: 'Örnek geniş dikey ölçü', value: 'W960 × H1920 × D450 mm' },
      { label: 'Örnek geniş dikey pitch', value: 'P2.5 / P5 / P6.67 / P8 / P10 / P13.33' },
      { label: 'Malzeme', value: 'Magnezyum alaşım / alüminyum alaşım' },
      { label: 'Renk', value: 'Siyah (özel renk talebe göre)' },
      { label: 'Dahil aksesuarlar (örnek)', value: 'Kilit, tutamak, sistem/güç plakası, birleştirme, sac taban, tekerlek' },
      { label: 'Kurulum tipi', value: 'Dikey poster / reklam ekranı' },
    ],
    specsNote:
      'Aşağıdaki değerler doğrulanmış poster/advertising machine üretici föyündeki örnek gövdelere aittir. Nihai ölçü, pitch, ortam ve montaj tipi teklifte netleştirilir; fiyat veya stok yayınlanmaz.',
    useCases: ['Mağaza vitrin ve ürün alanları', 'Showroom dikey paneller', 'Kurumsal lobi iletişimi'],
    relatedGuides: [
      { name: 'Poster LED kullanım alanları', url: '/bilgi-merkezi/poster-led-ekran-kullanim-alanlari/' },
      { name: 'Mağaza ve showroom uygulamaları', url: '/uygulama-alanlari/magaza-ve-showroom/' },
      { name: 'Kasa karşılaştırma tablosu', url: '/urunler/kasa-karsilastirma/' },
    ],
    applicationLinks: [
      { name: 'Mağaza ve Showroom', url: '/uygulama-alanlari/magaza-ve-showroom/' },
      { name: 'Kurumsal ve Reklam', url: '/uygulama-alanlari/kurumsal-ve-reklam/' },
    ],
    complementaryProducts: ['katlanabilir-poster-led-kasa', 'flat-kablo', 'power-plug'],
    datasheetUrl: '/assets/docs/poster-led-cabinet-overview.pdf',
    datasheetLabel: 'Poster LED kasa örnek föyü (PDF)',
    url: productPath('led-ekran-kasalari', 'poster-led-kasa'),
    image: '/assets/images/products/poster-led-kasa.webp',
    imageAlt: 'Dikey poster LED ekran kasası',
    canonicalUrl: canonicalPath(productPath('led-ekran-kasalari', 'poster-led-kasa')),
    seoTitle: 'Poster LED Kasa | LEDKASA',
    seoDescription:
      'Poster LED kasa: 640×1920, 500/1000×2000 ve 960×1920 örnek ölçüler, pitch uyumu ve teklif süreci LEDKASA’da.',
  },
  {
    slug: 'katlanabilir-poster-led-kasa',
    categorySlug: 'led-ekran-kasalari',
    name: 'Katlanabilir Poster LED Kasa',
    shortDescription: 'Taşıma ve değişken yerleşime uyum sağlayan poster ekran çözümü.',
    description:
      'Katlanabilir Poster LED Kasa, ön bakımlı ve katlanabilir gövde yaklaşımıyla dikey LED poster uygulamalarında değerlendirilir. 640×1920 mm örnek föy; taşıma, braket ve yeniden kurulum akışı teklifte netleşir.',
    highlights: [
      'Ön bakım (front maintenance) uyumlu gövde',
      'Katlanabilir poster ekran yaklaşımı',
      '640×1920 mm örnek ölçü',
      'Taşıma / braketli dikey yerleşim planı',
    ],
    specs: [
      { label: 'Örnek kabinet ölçüsü', value: 'W640 × H1920 mm' },
      { label: 'Ağırlık (örnek)', value: 'Mg 26 kg / Al 30 kg' },
      { label: 'Modül uyumu (örnek)', value: 'P1 / P1.25 / P1.37 / P1.53 / P1.66 / P1.83 / P2 / P2.5 / P4 / P5' },
      { label: 'Örnek suite / modül boyutu', value: '160 × 320 mm' },
      { label: 'Malzeme', value: 'Magnezyum alaşım / alüminyum alaşım' },
      { label: 'Kurulum tipi', value: 'Poster / reklam ekranı (katlanabilir)' },
      { label: 'Bakım yaklaşımı', value: 'Önden bakım' },
      { label: 'Ortam', value: 'İç mekân' },
      { label: 'Renk', value: 'Siyah (özel renk talebe göre)' },
      { label: 'Dahil aksesuarlar (örnek)', value: 'Yaylı kilit, tutamak, sistem/güç plakası, braket' },
      { label: 'Örnek güç seçenekleri', value: '200W-5V 40A veya 300W-5V 60A' },
      { label: 'Örnek güç konektörü', value: '20A 3×2,5 mm²' },
      { label: 'Flight case (örnek)', value: '1 kabinet / kasa' },
    ],
    specsNote:
      'Aşağıdaki değerler doğrulanmış 640×1920 katlanabilir Al/Mg döküm kabinet föyüne aittir. Taşıma formu, yerleşim adedi ve hatlar teklifte netleşir.',
    useCases: ['Gezici tanıtım noktaları', 'Çoklu mağaza yerleşimleri', 'Geçici dikey iletişim yüzeyleri'],
    relatedGuides: [
      { name: 'Poster LED kullanım alanları', url: '/bilgi-merkezi/poster-led-ekran-kullanim-alanlari/' },
      { name: 'Mağaza ve showroom uygulamaları', url: '/uygulama-alanlari/magaza-ve-showroom/' },
      { name: 'Kasa karşılaştırma tablosu', url: '/urunler/kasa-karsilastirma/' },
    ],
    applicationLinks: [
      { name: 'Mağaza ve Showroom', url: '/uygulama-alanlari/magaza-ve-showroom/' },
    ],
    complementaryProducts: ['poster-led-kasa', 'cable-set', 'flat-kablo'],
    datasheetUrl: '/assets/docs/foldable-poster-cabinet-640x1920.pdf',
    datasheetLabel: '640×1920 katlanabilir föy (PDF)',
    url: productPath('led-ekran-kasalari', 'katlanabilir-poster-led-kasa'),
    image: '/assets/images/products/katlanabilir-poster-led-kasa.webp',
    imageAlt: 'Katlanabilir poster LED ekran kasası',
    canonicalUrl: canonicalPath(productPath('led-ekran-kasalari', 'katlanabilir-poster-led-kasa')),
    seoTitle: 'Katlanabilir Poster LED Kasa | LEDKASA',
    seoDescription:
      'Katlanabilir poster LED kasa: 640×1920 örnek ölçü, ön bakım, Mg/Al ağırlık ve pitch uyumu LEDKASA’da.',
  },
  {
    slug: 'cat6-kablo',
    categorySlug: 'guc-ve-baglanti-ekipmanlari',
    name: 'Cat6 Kablo',
    shortDescription: 'LED ekran sistemleri için planlı veri bağlantı kablosu.',
    description:
      'Cat6 Kablo, LED ekran sistemlerinde receiving card ve veri hattı kurgusuna uygun bağlantı için kullanılır. Uzunluk ve rota ekran yerleşimine göre teklifte netleşir.',
    highlights: ['Veri bağlantısı için', 'LED ekran sistemleriyle kullanım', 'Proje rotasına göre teklif'],
    specs: [
      { label: 'İşlev', value: 'LED veri hattı' },
      { label: 'Tipik kullanım', value: 'Kontrolör–kabinet / kabinetler arası' },
      { label: 'Planlama girdisi', value: 'Ekran yerleşimi ve rota' },
      { label: 'Teklifte netleşenler', value: 'Uzunluk, adet, etiketleme' },
    ],
    specsNote: 'Kablo uzunluğu ve adet, kabinet düzeni netleşmeden sabitlenmez.',
    useCases: ['Kabinetler arası veri hattı', 'Kontrolör–ekran veri yolu', 'Etkinlik ve sabit kurulumlar'],
    relatedGuides: [
      { name: 'LED ekran kablolama rehberi', url: '/bilgi-merkezi/led-ekran-kablolama-rehberi/' },
      { name: 'Güç ve veri planlama', url: '/bilgi-merkezi/led-ekran-guc-ve-veri-planlama/' },
    ],
    applicationLinks: [
      { name: 'Etkinlik ve Sahne', url: '/uygulama-alanlari/etkinlik-ve-sahne/' },
      { name: 'Kurumsal ve Reklam', url: '/uygulama-alanlari/kurumsal-ve-reklam/' },
    ],
    complementaryProducts: ['power-plug', 'cable-set', 'rental-led-kabinet'],
    url: productPath('guc-ve-baglanti-ekipmanlari', 'cat6-kablo'),
    image: '/assets/images/products/cat6-kablo.webp',
    imageAlt: 'LED ekran sistemleri için Cat6 kablo',
    canonicalUrl: canonicalPath(productPath('guc-ve-baglanti-ekipmanlari', 'cat6-kablo')),
    seoTitle: 'Cat6 Kablo | LEDKASA',
    seoDescription: 'LED ekran veri bağlantısı için Cat6 kablo çözümlerini proje rotasıyla birlikte LEDKASA’da inceleyin.',
  },
  {
    slug: 'power-plug',
    categorySlug: 'guc-ve-baglanti-ekipmanlari',
    name: 'Power Plug',
    shortDescription: 'LED ekran güç bağlantıları için bağlantı ekipmanı.',
    description:
      'Power Plug, LED ekran güç dağıtımında kabinet ve PSU kurgusuna uygun bağlantı ekipmanı seçimi için sunulur. Akım ve konektör tipi proje bilgisine göre değerlendirilir.',
    highlights: ['Güç bağlantısı için', 'Sistem kurgusuna uygun seçim', 'Teklif odaklı tedarik'],
    specs: [
      { label: 'İşlev', value: 'LED güç bağlantısı' },
      { label: 'Tipik kullanım', value: 'Kabinet / dağıtım hattı' },
      { label: 'Planlama girdisi', value: 'Yük profili ve erişim' },
      { label: 'Teklifte netleşenler', value: 'Konektör tipi, adet, hat düzeni' },
    ],
    specsNote: 'Akım ve konektör tipi modül/PSU bilgisine göre teklifte doğrulanır.',
    useCases: ['Kabinet güç girişi', 'Dağıtım hattı bağlantıları', 'Rental ve sabit kurulumlar'],
    relatedGuides: [
      { name: 'Güç ve veri planlama', url: '/bilgi-merkezi/led-ekran-guc-ve-veri-planlama/' },
      { name: 'Kablolama rehberi', url: '/bilgi-merkezi/led-ekran-kablolama-rehberi/' },
    ],
    applicationLinks: [
      { name: 'Etkinlik ve Sahne', url: '/uygulama-alanlari/etkinlik-ve-sahne/' },
      { name: 'Kurumsal ve Reklam', url: '/uygulama-alanlari/kurumsal-ve-reklam/' },
    ],
    complementaryProducts: ['cat6-kablo', 'cable-set', 'cnc-led-kasa'],
    url: productPath('guc-ve-baglanti-ekipmanlari', 'power-plug'),
    image: '/assets/images/products/power-plug.webp',
    imageAlt: 'LED ekran güç bağlantısı için power plug',
    canonicalUrl: canonicalPath(productPath('guc-ve-baglanti-ekipmanlari', 'power-plug')),
    seoTitle: 'Power Plug | LEDKASA',
    seoDescription: 'LED ekran güç bağlantıları için Power Plug çözümlerini LEDKASA’da proje ihtiyacınıza göre değerlendirin.',
  },
  {
    slug: 'flat-kablo',
    categorySlug: 'guc-ve-baglanti-ekipmanlari',
    name: 'Flat Kablo',
    shortDescription: 'LED modül bağlantılarında düzenli yerleşim için flat kablo.',
    description:
      'Flat Kablo, LED ekranlarda modül–kart ve panel içi bağlantıların düzenli yerleşimine yardımcı olur. Adet ve pin yapısı kullanılan modül ailesine göre teklifte netleşir.',
    highlights: ['Düzenli bağlantı yerleşimi', 'LED modül sistemleri için', 'İhtiyaca göre teklif'],
    specs: [
      { label: 'İşlev', value: 'Modül / panel içi bağlantı' },
      { label: 'Tipik kullanım', value: 'Düzenli arka kablolama' },
      { label: 'Planlama girdisi', value: 'Modül ailesi ve kabinet formu' },
      { label: 'Teklifte netleşenler', value: 'Adet, pin/yapı, uzunluk' },
    ],
    specsNote: 'Pin yapısı ve adet, kullanılan modül ailesine göre teklifte netleşir.',
    useCases: ['Modül içi sinyal bağlantısı', 'Panel arkası düzenli kablolama', 'Bakım erişimine uygun yerleşim'],
    relatedGuides: [
      { name: 'Modül pitch ve kasa uyumu', url: '/bilgi-merkezi/modul-pitch-ve-kasa-uyumu/' },
      { name: 'Kablolama rehberi', url: '/bilgi-merkezi/led-ekran-kablolama-rehberi/' },
    ],
    applicationLinks: [
      { name: 'Mağaza ve Showroom', url: '/uygulama-alanlari/magaza-ve-showroom/' },
    ],
    complementaryProducts: ['poster-led-kasa', 'cnc-led-kasa', 'cable-set'],
    url: productPath('guc-ve-baglanti-ekipmanlari', 'flat-kablo'),
    image: '/assets/images/products/flat-kablo.webp',
    imageAlt: 'LED ekran modülleri için flat kablo',
    canonicalUrl: canonicalPath(productPath('guc-ve-baglanti-ekipmanlari', 'flat-kablo')),
    seoTitle: 'Flat Kablo | LEDKASA',
    seoDescription: 'LED ekran modül bağlantıları için flat kablo seçeneklerini LEDKASA’da inceleyin.',
  },
  {
    slug: 'cable-set',
    categorySlug: 'guc-ve-baglanti-ekipmanlari',
    name: 'Cable Set',
    shortDescription: 'LED ekran projeleri için birlikte planlanan kablo seti.',
    description:
      'Cable Set, güç, veri ve modül bağlantı ihtiyaçlarını proje kapsamında bir arada değerlendirmek için sunulan set çözümüdür. İçerik proje ölçüsüne göre teklifte belirlenir.',
    highlights: ['Birlikte planlanan bağlantı ekipmanları', 'Proje kapsamına göre seçim', 'Teklif odaklı çözüm'],
    specs: [
      { label: 'İşlev', value: 'Güç + veri bağlantı seti' },
      { label: 'Tipik kullanım', value: 'Komple proje parça listesi' },
      { label: 'Planlama girdisi', value: 'Kasa tipi ve ekran ölçeği' },
      { label: 'Teklifte netleşenler', value: 'Set içeriği, adet, uyumluluk' },
    ],
    specsNote: 'Set içeriği proje ölçüsüne göre belirlenir; sabit paket içeriği varsayılmaz.',
    useCases: ['Komple ekran bağlantı paketi', 'Rental saha setleri', 'Sabit kurulum parça listeleri'],
    relatedGuides: [
      { name: 'Kablolama rehberi', url: '/bilgi-merkezi/led-ekran-kablolama-rehberi/' },
      { name: 'Güç ve veri planlama', url: '/bilgi-merkezi/led-ekran-guc-ve-veri-planlama/' },
    ],
    applicationLinks: [
      { name: 'Etkinlik ve Sahne', url: '/uygulama-alanlari/etkinlik-ve-sahne/' },
      { name: 'Kurumsal ve Reklam', url: '/uygulama-alanlari/kurumsal-ve-reklam/' },
    ],
    complementaryProducts: ['rental-led-kabinet', 'cnc-led-kasa', 'cat6-kablo'],
    url: productPath('guc-ve-baglanti-ekipmanlari', 'cable-set'),
    image: '/assets/images/products/cable-set.webp',
    imageAlt: 'LED ekran bağlantıları için kablo seti',
    canonicalUrl: canonicalPath(productPath('guc-ve-baglanti-ekipmanlari', 'cable-set')),
    seoTitle: 'Cable Set | LEDKASA',
    seoDescription: 'LED ekran sistemleri için Cable Set çözümlerini LEDKASA ile proje ihtiyacınıza göre değerlendirin.',
  },
];

export const productCategories: ProductCategory[] = [
  {
    slug: 'led-ekran-kasalari',
    name: 'LED Ekran Kasaları',
    shortName: 'LED Kasalar',
    description:
      'Sabit kurulum, rental kullanım ve poster ekran projeleri için LED ekran kasa çözümleri.',
    url: categoryPath('led-ekran-kasalari'),
    canonicalUrl: canonicalPath(categoryPath('led-ekran-kasalari')),
    image: '/assets/images/categories/led-ekran-kasalari.webp',
    imageAlt: 'LED ekran kasa sistemleri',
    products: products.filter((product) => product.categorySlug === 'led-ekran-kasalari'),
  },
  {
    slug: 'guc-ve-baglanti-ekipmanlari',
    name: 'Güç ve Bağlantı Ekipmanları',
    shortName: 'Bağlantı Ekipmanları',
    description:
      'LED ekran sistemlerinde düzenli güç ve sinyal altyapısı kurmak için bağlantı ekipmanları.',
    url: categoryPath('guc-ve-baglanti-ekipmanlari'),
    canonicalUrl: canonicalPath(categoryPath('guc-ve-baglanti-ekipmanlari')),
    image: '/assets/images/categories/guc-ve-baglanti-ekipmanlari.webp',
    imageAlt: 'LED ekran bağlantı ekipmanları',
    products: products.filter((product) => product.categorySlug === 'guc-ve-baglanti-ekipmanlari'),
  },
];

export const cabinetComparisonRows = [
  {
    criterion: 'Tipik kullanım',
    cnc: 'Sabit / kalıcı ekran',
    kapaksiz: 'Sabit, erişim odaklı',
    rental: 'Geçici / etkinlik',
    poster: 'Dikey poster / reklam',
  },
  {
    criterion: 'Örnek ölçü (föy)',
    cnc: '960×960×87 mm',
    kapaksiz: 'Proje özelinde',
    rental: 'Proje / set özelinde',
    poster: '640×1920, 500/1000×2000, 960×1920',
  },
  {
    criterion: 'Kurulum sıklığı',
    cnc: 'Bir kez / seyrek müdahale',
    kapaksiz: 'Bir kez, bakım erişimli',
    rental: 'Sık kurulum–söküm',
    poster: 'Sabit veya değişken nokta',
  },
  {
    criterion: 'Montaj yaklaşımı',
    cnc: 'Duvar / strüktür sabit',
    kapaksiz: 'Duvar / teknik alan',
    rental: 'Ground stack / flying',
    poster: 'Dikey stand, braket veya duvar',
  },
  {
    criterion: 'Bağlantı planı',
    cnc: 'Kalıcı güç + veri rotası',
    kapaksiz: 'Erişilebilir arka hat',
    rental: 'Hızlı sökülebilir hatlar',
    poster: 'Tek nokta güç/veri',
  },
  {
    criterion: 'İlk değerlendirme sorusu',
    cnc: 'Ölçü, pitch, yüzey?',
    kapaksiz: 'Bakım erişim yönü?',
    rental: 'Kurulum süresi ve taşıma?',
    poster: 'Dikey format, ortam, görüş mesafesi?',
  },
] as const;

export const productsByCategory = (categorySlug: ProductCategory['slug']) =>
  productCategories.find((category) => category.slug === categorySlug)?.products ?? [];
