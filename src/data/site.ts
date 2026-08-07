export const siteUrl = 'https://ledkasa.com.tr';

export interface ProductCategory {
  slug: 'led-ekran-kasalari' | 'guc-ve-baglanti-ekipmanlari';
  name: string;
  shortName: string;
  description: string;
  canonicalUrl: string;
  image: string;
  imageAlt: string;
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
  image: string;
  imageAlt: string;
  canonicalUrl: string;
  seoTitle: string;
  seoDescription: string;
}

const productPath = (categorySlug: ProductCategory['slug'], slug: Product['slug']) =>
  `${siteUrl}/urunler/${categorySlug}/${slug}/`;

export const productCategories: ProductCategory[] = [
  {
    slug: 'led-ekran-kasalari',
    name: 'LED Ekran Kasaları',
    shortName: 'LED Kasalar',
    description:
      'Sabit kurulum, rental kullanım ve poster ekran projeleri için LED ekran kasa çözümleri.',
    canonicalUrl: `${siteUrl}/urunler/led-ekran-kasalari/`,
    image: '/assets/images/categories/led-ekran-kasalari.webp',
    imageAlt: 'LED ekran kasa sistemleri',
  },
  {
    slug: 'guc-ve-baglanti-ekipmanlari',
    name: 'Güç ve Bağlantı Ekipmanları',
    shortName: 'Bağlantı Ekipmanları',
    description:
      'LED ekran sistemlerinde düzenli güç ve sinyal altyapısı kurmak için bağlantı ekipmanları.',
    canonicalUrl: `${siteUrl}/urunler/guc-ve-baglanti-ekipmanlari/`,
    image: '/assets/images/categories/guc-ve-baglanti-ekipmanlari.webp',
    imageAlt: 'LED ekran bağlantı ekipmanları',
  },
];

export const products: Product[] = [
  {
    slug: 'cnc-led-kasa',
    categorySlug: 'led-ekran-kasalari',
    name: 'CNC LED Kasa',
    shortDescription: 'Projeye göre hazırlanan, düzenli ve güçlü LED ekran kasa çözümü.',
    description:
      'CNC LED Kasa, sabit LED ekran projelerinde sistemin düzenli, sağlam ve profesyonel görünmesini destekleyen kasa çözümüdür.',
    highlights: ['Sabit kurulum projelerine uygun', 'Düzenli kabin mimarisi', 'Teklif odaklı proje planlaması'],
    image: '/assets/images/products/cnc-led-kasa.webp',
    imageAlt: 'CNC üretim LED ekran kasası',
    canonicalUrl: productPath('led-ekran-kasalari', 'cnc-led-kasa'),
    seoTitle: 'CNC LED Kasa | LEDKASA',
    seoDescription: 'Sabit LED ekran projeleri için CNC LED kasa çözümlerini LEDKASA ile inceleyin.',
  },
  {
    slug: 'kapaksiz-led-kabinet',
    categorySlug: 'led-ekran-kasalari',
    name: 'Kapaksız LED Kabinet',
    shortDescription: 'Erişilebilir ve sade kabin yapısı arayan LED ekran projeleri için.',
    description:
      'Kapaksız LED Kabinet, proje yerleşimine göre erişilebilirlik ve yalın bir kasa yapısı sunmayı hedefleyen LED ekran uygulamaları için değerlendirilir.',
    highlights: ['Yalın kabin yapısı', 'Proje yerleşimine uyum', 'Teklif öncesi ihtiyaç analizi'],
    image: '/assets/images/products/kapaksiz-led-kabinet.webp',
    imageAlt: 'Kapaksız LED ekran kabineti',
    canonicalUrl: productPath('led-ekran-kasalari', 'kapaksiz-led-kabinet'),
    seoTitle: 'Kapaksız LED Kabinet | LEDKASA',
    seoDescription: 'Kapaksız LED kabinet seçeneklerini LED ekran projeniz için LEDKASA’da inceleyin.',
  },
  {
    slug: 'rental-led-kabinet',
    categorySlug: 'led-ekran-kasalari',
    name: 'Rental LED Kabinet',
    shortDescription: 'Etkinlik ve sahne kurulumları için modüler LED ekran kabini.',
    description:
      'Rental LED Kabinet, etkinlik, sahne ve geçici kurulum senaryolarında modüler ekran sistemleri için planlanan kasa çözümüdür.',
    highlights: ['Etkinlik ve sahne projeleri', 'Modüler kurulum yaklaşımı', 'Teklif odaklı çözüm'],
    image: '/assets/images/products/rental-led-kabinet.webp',
    imageAlt: 'Rental kullanım için LED ekran kabineti',
    canonicalUrl: productPath('led-ekran-kasalari', 'rental-led-kabinet'),
    seoTitle: 'Rental LED Kabinet | LEDKASA',
    seoDescription: 'Etkinlik ve sahne projeleri için rental LED kabinet seçeneklerini LEDKASA’da inceleyin.',
  },
  {
    slug: 'poster-led-kasa',
    categorySlug: 'led-ekran-kasalari',
    name: 'Poster LED Kasa',
    shortDescription: 'Dikey dijital ekran uygulamaları için poster ekran kasa çözümü.',
    description:
      'Poster LED Kasa, mağaza, fuaye ve kurumsal alanlardaki dikey LED ekran uygulamalarının ihtiyaçlarına yönelik kasa çözümüdür.',
    highlights: ['Dikey ekran uygulamaları', 'Mağaza ve showroom kullanımı', 'Kurumsal proje desteği'],
    image: '/assets/images/products/poster-led-kasa.webp',
    imageAlt: 'Dikey poster LED ekran kasası',
    canonicalUrl: productPath('led-ekran-kasalari', 'poster-led-kasa'),
    seoTitle: 'Poster LED Kasa | LEDKASA',
    seoDescription: 'Poster LED ekran projeleri için kasa çözümlerini LEDKASA ile inceleyin.',
  },
  {
    slug: 'katlanabilir-poster-led-kasa',
    categorySlug: 'led-ekran-kasalari',
    name: 'Katlanabilir Poster LED Kasa',
    shortDescription: 'Taşıma ve kurulum akışına uyum sağlayan poster ekran çözümü.',
    description:
      'Katlanabilir Poster LED Kasa, farklı alanlarda değerlendirilmek üzere tasarlanan poster ekran projelerinde pratik yerleşim yaklaşımı sunar.',
    highlights: ['Esnek kullanım senaryoları', 'Poster ekran projeleri', 'Teklif öncesi proje değerlendirmesi'],
    image: '/assets/images/products/katlanabilir-poster-led-kasa.webp',
    imageAlt: 'Katlanabilir poster LED ekran kasası',
    canonicalUrl: productPath('led-ekran-kasalari', 'katlanabilir-poster-led-kasa'),
    seoTitle: 'Katlanabilir Poster LED Kasa | LEDKASA',
    seoDescription: 'Katlanabilir poster LED kasa çözümünü LEDKASA ile proje ihtiyaçlarınıza göre değerlendirin.',
  },
  {
    slug: 'cat6-kablo',
    categorySlug: 'guc-ve-baglanti-ekipmanlari',
    name: 'Cat6 Kablo',
    shortDescription: 'LED ekran sistemleri için veri bağlantı kablosu çözümü.',
    description:
      'Cat6 Kablo, LED ekran sistemlerinde planlı veri bağlantısı kurmak için kullanılan bağlantı ekipmanı alternatifidir.',
    highlights: ['Veri bağlantısı için', 'LED ekran sistemleriyle kullanım', 'Proje ihtiyacına göre teklif'],
    image: '/assets/images/products/cat6-kablo.webp',
    imageAlt: 'LED ekran sistemleri için Cat6 kablo',
    canonicalUrl: productPath('guc-ve-baglanti-ekipmanlari', 'cat6-kablo'),
    seoTitle: 'Cat6 Kablo | LEDKASA',
    seoDescription: 'LED ekran veri bağlantısı için Cat6 kablo çözümlerini LEDKASA’da inceleyin.',
  },
  {
    slug: 'power-plug',
    categorySlug: 'guc-ve-baglanti-ekipmanlari',
    name: 'Power Plug',
    shortDescription: 'LED ekran güç bağlantıları için bağlantı ekipmanı.',
    description:
      'Power Plug, LED ekran sistemlerindeki güç bağlantısı kurgusuna uygun ekipman seçimi için sunulan ürün grubudur.',
    highlights: ['Güç bağlantısı için', 'Sistem kurgusuna uygun seçim', 'Teklif odaklı tedarik'],
    image: '/assets/images/products/power-plug.webp',
    imageAlt: 'LED ekran güç bağlantısı için power plug',
    canonicalUrl: productPath('guc-ve-baglanti-ekipmanlari', 'power-plug'),
    seoTitle: 'Power Plug | LEDKASA',
    seoDescription: 'LED ekran güç bağlantıları için Power Plug çözümlerini LEDKASA’da inceleyin.',
  },
  {
    slug: 'flat-kablo',
    categorySlug: 'guc-ve-baglanti-ekipmanlari',
    name: 'Flat Kablo',
    shortDescription: 'LED modül bağlantılarında düzenli yerleşim için flat kablo çözümü.',
    description:
      'Flat Kablo, LED ekran sistemlerinde modül ve bileşen bağlantılarının proje düzenine göre planlanmasına yardımcı olan ekipman grubudur.',
    highlights: ['Düzenli bağlantı yerleşimi', 'LED modül sistemleri için', 'İhtiyaca göre teklif'],
    image: '/assets/images/products/flat-kablo.webp',
    imageAlt: 'LED ekran modülleri için flat kablo',
    canonicalUrl: productPath('guc-ve-baglanti-ekipmanlari', 'flat-kablo'),
    seoTitle: 'Flat Kablo | LEDKASA',
    seoDescription: 'LED ekran modül bağlantıları için flat kablo seçeneklerini LEDKASA’da inceleyin.',
  },
  {
    slug: 'cable-set',
    categorySlug: 'guc-ve-baglanti-ekipmanlari',
    name: 'Cable Set',
    shortDescription: 'LED ekran projeleri için birlikte planlanan kablo seti çözümü.',
    description:
      'Cable Set, LED ekran sistemindeki bağlantı ihtiyaçlarını proje kapsamına göre bir arada değerlendirmek için sunulan kablo seti çözümüdür.',
    highlights: ['Birlikte planlanan bağlantı ekipmanları', 'Proje kapsamına göre seçim', 'Teklif odaklı çözüm'],
    image: '/assets/images/products/cable-set.webp',
    imageAlt: 'LED ekran bağlantıları için kablo seti',
    canonicalUrl: productPath('guc-ve-baglanti-ekipmanlari', 'cable-set'),
    seoTitle: 'Cable Set | LEDKASA',
    seoDescription: 'LED ekran sistemleri için Cable Set çözümlerini LEDKASA ile proje ihtiyacınıza göre değerlendirin.',
  },
];

export const productsByCategory = (categorySlug: ProductCategory['slug']) =>
  products.filter((product) => product.categorySlug === categorySlug);
