export const siteUrl = 'https://ledkasa.com.tr';

export const businessContact = {
  email: 'info@ledkasa.com.tr',
  phoneDisplay: '+90 530 405 67 68',
  phoneTel: '+905304056768',
  whatsappUrl: 'https://wa.me/905304056768',
} as const;

export const organizationLogo = '/favicon.svg';

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
      'Hassas birleşim için CNC destekli üretim yaklaşımı',
      'Modül pitch ve proje ölçüsüne göre değerlendirme',
    ],
    specs: [
      { label: 'Örnek kabinet ölçüsü', value: 'W960 × H960 × D87 mm' },
      { label: 'Ağırlık (temel aksesuarlarla)', value: '11,8 kg' },
      { label: 'Malzeme', value: 'Magnezyum alaşım (Mg alloy) döküm' },
      { label: 'Modül uyumu (örnek)', value: 'P4 / P5 / P6.67 / P8 / P10 / P13.33' },
      { label: 'Kurulum tipi', value: 'Sabit kurulum' },
      { label: 'Ortam', value: 'İç mekân / dış mekân (proje koşullarına göre)' },
      { label: 'Renk', value: 'Siyah (özel renk talebe göre)' },
      { label: 'Dahil aksesuarlar', value: 'Hızlı kilit, tutamak, sistem/güç plakası, birleştirme parçası' },
      { label: 'Örnek güç seçenekleri', value: '200W-5V 40A veya 400W-5V 80A' },
      { label: 'Örnek güç konektörü', value: '20A 3×2,5 mm²' },
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
    useCases: ['Servis erişimi gereken sabit duvar ekranları', 'Kontrol odası ve teknik alanlar', 'Kurumsal kalıcı paneller'],
    relatedGuides: [
      { name: 'CNC, kapaksız ve rental karşılaştırma', url: '/bilgi-merkezi/kasa-secimi-cnc-kapaksiz-rental-kabinet/' },
      { name: 'Kasa karşılaştırma tablosu', url: '/urunler/kasa-karsilastirma/' },
    ],
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
    useCases: ['Konser ve sahne LED yüzeyleri', 'Fuar ve organizasyon ekranları', 'Geçici outdoor/indoor kurgular'],
    relatedGuides: [
      { name: 'Rental LED ekran kurulum rehberi', url: '/bilgi-merkezi/rental-led-ekran-kurulum-rehberi/' },
      { name: 'Kablolama rehberi', url: '/bilgi-merkezi/led-ekran-kablolama-rehberi/' },
    ],
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
      'Poster LED Kasa, mağaza, fuaye ve kurumsal alanlarda dikey içerik sunan LED ekran uygulamaları için değerlendirilir. Görüş mesafesi ve yerleşim noktası seçimi etkiler.',
    highlights: ['Dikey ekran uygulamaları', 'Mağaza ve showroom kullanımı', 'Kurumsal karşılama noktaları'],
    useCases: ['Mağaza vitrin ve ürün alanları', 'Showroom dikey paneller', 'Kurumsal lobi iletişimi'],
    relatedGuides: [
      { name: 'Poster LED kullanım alanları', url: '/bilgi-merkezi/poster-led-ekran-kullanim-alanlari/' },
      { name: 'Mağaza ve showroom uygulamaları', url: '/uygulama-alanlari/magaza-ve-showroom/' },
    ],
    url: productPath('led-ekran-kasalari', 'poster-led-kasa'),
    image: '/assets/images/products/poster-led-kasa.webp',
    imageAlt: 'Dikey poster LED ekran kasası',
    canonicalUrl: canonicalPath(productPath('led-ekran-kasalari', 'poster-led-kasa')),
    seoTitle: 'Poster LED Kasa | LEDKASA',
    seoDescription: 'Poster LED ekran projeleri için dikey kasa çözümlerini LEDKASA ile inceleyin ve teklif alın.',
  },
  {
    slug: 'katlanabilir-poster-led-kasa',
    categorySlug: 'led-ekran-kasalari',
    name: 'Katlanabilir Poster LED Kasa',
    shortDescription: 'Taşıma ve değişken yerleşime uyum sağlayan poster ekran çözümü.',
    description:
      'Katlanabilir Poster LED Kasa, farklı noktalarda değerlendirilen dikey LED ekran projelerinde taşıma ve kurulum akışını sadeleştirmeyi hedefler.',
    highlights: ['Değişken yerleşim senaryoları', 'Poster ekran projeleri', 'Taşıma ve kurulum planlaması'],
    useCases: ['Gezici tanıtım noktaları', 'Çoklu mağaza yerleşimleri', 'Geçici dikey iletişim yüzeyleri'],
    relatedGuides: [
      { name: 'Poster LED kullanım alanları', url: '/bilgi-merkezi/poster-led-ekran-kullanim-alanlari/' },
    ],
    url: productPath('led-ekran-kasalari', 'katlanabilir-poster-led-kasa'),
    image: '/assets/images/products/katlanabilir-poster-led-kasa.webp',
    imageAlt: 'Katlanabilir poster LED ekran kasası',
    canonicalUrl: canonicalPath(productPath('led-ekran-kasalari', 'katlanabilir-poster-led-kasa')),
    seoTitle: 'Katlanabilir Poster LED Kasa | LEDKASA',
    seoDescription: 'Katlanabilir poster LED kasa ile değişken yerleşimli dikey ekran projelerini LEDKASA’da değerlendirin.',
  },
  {
    slug: 'cat6-kablo',
    categorySlug: 'guc-ve-baglanti-ekipmanlari',
    name: 'Cat6 Kablo',
    shortDescription: 'LED ekran sistemleri için planlı veri bağlantı kablosu.',
    description:
      'Cat6 Kablo, LED ekran sistemlerinde receiving card ve veri hattı kurgusuna uygun bağlantı için kullanılır. Uzunluk ve rota ekran yerleşimine göre teklifte netleşir.',
    highlights: ['Veri bağlantısı için', 'LED ekran sistemleriyle kullanım', 'Proje rotasına göre teklif'],
    useCases: ['Kabinetler arası veri hattı', 'Kontrolör–ekran veri yolu', 'Etkinlik ve sabit kurulumlar'],
    relatedGuides: [
      { name: 'LED ekran kablolama rehberi', url: '/bilgi-merkezi/led-ekran-kablolama-rehberi/' },
      { name: 'Güç ve veri planlama', url: '/bilgi-merkezi/led-ekran-guc-ve-veri-planlama/' },
    ],
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
    useCases: ['Kabinet güç girişi', 'Dağıtım hattı bağlantıları', 'Rental ve sabit kurulumlar'],
    relatedGuides: [
      { name: 'Güç ve veri planlama', url: '/bilgi-merkezi/led-ekran-guc-ve-veri-planlama/' },
      { name: 'Kablolama rehberi', url: '/bilgi-merkezi/led-ekran-kablolama-rehberi/' },
    ],
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
    useCases: ['Modül içi sinyal bağlantısı', 'Panel arkası düzenli kablolama', 'Bakım erişimine uygun yerleşim'],
    relatedGuides: [
      { name: 'Modül pitch ve kasa uyumu', url: '/bilgi-merkezi/modul-pitch-ve-kasa-uyumu/' },
      { name: 'Kablolama rehberi', url: '/bilgi-merkezi/led-ekran-kablolama-rehberi/' },
    ],
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
    useCases: ['Komple ekran bağlantı paketi', 'Rental saha setleri', 'Sabit kurulum parça listeleri'],
    relatedGuides: [
      { name: 'Kablolama rehberi', url: '/bilgi-merkezi/led-ekran-kablolama-rehberi/' },
      { name: 'Güç ve veri planlama', url: '/bilgi-merkezi/led-ekran-guc-ve-veri-planlama/' },
    ],
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
    poster: 'Dikey iletişim',
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
    poster: 'Dikey stand veya duvar',
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
    poster: 'Görüş mesafesi ve içerik?',
  },
] as const;

export const productsByCategory = (categorySlug: ProductCategory['slug']) =>
  productCategories.find((category) => category.slug === categorySlug)?.products ?? [];
