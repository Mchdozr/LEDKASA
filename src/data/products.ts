import type { ImageMetadata } from 'astro';

import cableSet from '../assets/products/cable-set.png';
import cat6 from '../assets/products/cat6.jpg';
import cncKasa from '../assets/products/cnc-kasa.png';
import flatKablo from '../assets/products/flat-kablo.jpg';
import kapaksizKabinet from '../assets/products/kapaksiz-kabinet.png';
import katlanabilirPoster from '../assets/products/katlanabilir-poster-kasa.png';
import posterKasa from '../assets/products/poster-kasa.png';
import powerPlug from '../assets/products/power-plug.webp';
import rentalKabinet from '../assets/products/rental-kabinet.png';

export type ProductCategory = 'kasalar' | 'baglanti';

export interface Product {
  slug: string;
  category: ProductCategory;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  features: string[];
  image: ImageMetadata;
  alt: string;
  seoTitle: string;
  seoDescription: string;
  related: string[];
}

export const categoryLabels: Record<ProductCategory, { title: string; blurb: string; code: string }> = {
  kasalar: {
    code: '01',
    title: 'Kasalar',
    blurb: 'Her uygulama için dayanıklı ve fonksiyonel LED ekran kasa seçenekleri.',
  },
  baglanti: {
    code: '02',
    title: 'Bağlantı & güç ekipmanları',
    blurb: 'Kesintisiz güç ve güvenilir veri aktarımı için tamamlayıcı ürünler.',
  },
};

export const products: Product[] = [
  {
    slug: 'cnc-kasa',
    category: 'kasalar',
    number: '01',
    title: 'CNC Kasa',
    tagline: 'Hassas üretim',
    summary: 'Hassas CNC işlenmiş gövde ile sabit ve uzun ömürlü LED ekran kurulumları.',
    description:
      'CNC Kasa, profesyonel LED ekran projelerinde mekanik hassasiyet ve saha dayanımı arayan ekipler için tasarlandı. İşlenmiş gövde toleransları, panel hizalamasını kolaylaştırır; bakım erişimi ve kablo yönetimi sahada sürpriz bırakmaz. İç mekan sabit kurulumlardan marka vitrinlerine kadar ölçeklenebilir bir temel sunar.',
    features: [
      'Hassas CNC işlenmiş gövde',
      'Sabit kurulumlara uygun rijit yapı',
      'Panel hizalama ve servis erişimi odaklı tasarım',
      'Profesyonel LED ekran sistemleriyle uyumlu form faktör',
      'Uzun ömürlü saha kullanımı için seçilmiş malzeme',
    ],
    image: cncKasa,
    alt: 'CNC LED ekran kasa',
    seoTitle: 'CNC LED Kasa | LEDKASA',
    seoDescription:
      'Hassas CNC LED ekran kasası. Sabit kurulumlar için dayanıklı gövde, doğru hizalama ve saha servisi kolaylığı.',
    related: ['kapaksiz-kabinet', 'rental-kabinet', 'cable-set'],
  },
  {
    slug: 'kapaksiz-kabinet',
    category: 'kasalar',
    number: '02',
    title: 'Kapaksız Kabinet',
    tagline: 'Açık arka yapı',
    summary: 'Açık arka yapı sayesinde hızlı servis ve esnek montaj gerektiren LED paneller için.',
    description:
      'Kapaksız Kabinet, arka erişimin kritik olduğu LED ekran kurulumlarında zaman kazandırır. Açık yapı; güç, veri ve soğutma hatlarının düzenlenmesini kolaylaştırır. Servis ekipleri panel değişimi ve kablo kontrolünü daha az müdahale ile tamamlar. Özellikle duvar ve iskelet montajlarında pratik bir kabinet çözümüdür.',
    features: [
      'Hızlı servis için açık arka yapı',
      'Güç ve veri hattı düzenine uygun boşluk',
      'Duvar ve iskelet montajlarına uyum',
      'Panel bakımında düşük müdahale süresi',
      'Sabit LED ekran projelerine uygun form',
    ],
    image: kapaksizKabinet,
    alt: 'Kapaksız LED kabinet',
    seoTitle: 'Kapaksız LED Kabinet | LEDKASA',
    seoDescription:
      'Açık arkalı LED kabinet. Hızlı servis, esnek kablo yönetimi ve profesyonel sabit ekran montajları için.',
    related: ['cnc-kasa', 'flat-kablo', 'power-plug'],
  },
  {
    slug: 'rental-kabinet',
    category: 'kasalar',
    number: '03',
    title: 'Rental Kabinet',
    tagline: 'Hızlı kurulum',
    summary: 'Etkinlik ve geçici sahalar için hızlı kurulan, taşınabilir rental LED kabinet.',
    description:
      'Rental Kabinet, sahne, fuar ve geçici LED ekran kurulumlarında hızı önceleyen ekipler için üretilir. Kilitli birleşim noktaları ve dengeli taşıma hissi, kurulum süresini kısaltır. Tekrarlanan montaj-demontaj döngülerinde gövde stabilitesini korur. Touring ve event operasyonlarında güvenilir bir rental LED çözümüdür.',
    features: [
      'Hızlı kurulum / söküm odaklı birleşimler',
      'Etkinlik ve touring kullanımına uygun dayanım',
      'Taşıma ve istifleme dostu form',
      'Tekrarlayan saha döngülerine direnç',
      'Rental LED ekran sistemleriyle uyum',
    ],
    image: rentalKabinet,
    alt: 'Rental LED kabinet',
    seoTitle: 'Rental LED Kabinet | LEDKASA',
    seoDescription:
      'Hızlı kurulumlu rental LED kabinet. Etkinlik, sahne ve geçici ekran projeleri için taşınabilir çözüm.',
    related: ['cnc-kasa', 'cable-set', 'cat6-kablo'],
  },
  {
    slug: 'poster-kasa',
    category: 'kasalar',
    number: '04',
    title: 'Poster Kasa',
    tagline: 'Dikey görüntüleme',
    summary: 'Dikey LED poster uygulamaları için kompakt ve vitrin odaklı kasa çözümü.',
    description:
      'Poster Kasa, mağaza vitrini, lobi ve yönlendirme noktalarında dikey LED görüntülemeyi temiz bir silüetle taşır. Kompakt gövde, dar alanlarda kurulumu kolaylaştırır; içerik odaklı dikey format marka iletişimini güçlendirir. İç mekan dijital poster ve totem benzeri uygulamalar için dengeli bir LED kasa seçeneğidir.',
    features: [
      'Dikey LED poster formatına uygun gövde',
      'Vitrin ve lobi kurulumları için kompakt silüet',
      'İç mekan dijital tabela uygulamalarına uyum',
      'Temiz kablo geçişi ve sade görünüm',
      'Marka iletişimi odaklı dikey ekran deneyimi',
    ],
    image: posterKasa,
    alt: 'LED poster kasa',
    seoTitle: 'LED Poster Kasa | LEDKASA',
    seoDescription:
      'Dikey LED poster kasa. Vitrin, lobi ve iç mekan dijital tabela projeleri için kompakt çözüm.',
    related: ['katlanabilir-poster-kasa', 'power-plug', 'flat-kablo'],
  },
  {
    slug: 'katlanabilir-poster-kasa',
    category: 'kasalar',
    number: '05',
    title: 'Katlanabilir Poster Kasa',
    tagline: 'Taşınabilir sistem',
    summary: 'Taşınabilir, katlanabilir yapıyla sahada hızlı kurulan LED poster sistemleri.',
    description:
      'Katlanabilir Poster Kasa, mobil tanıtım ve pop-up alanlarda LED poster kurulumunu pratikleştirir. Katlanır yapı lojistik hacmini azaltır; sahada açılıp stabilize edilmesi dakikalar içinde tamamlanır. Gezici ekipler ve kısa süreli kampanyalar için taşınabilir LED poster altyapısı sunar. Kurulum sonrası dikey görüntüleme netliğini korur.',
    features: [
      'Katlanabilir taşıma formu',
      'Pop-up ve gezici tanıtım için hızlı kurulum',
      'Düşük lojistik hacim',
      'Mobil LED poster operasyonlarına uygun',
      'Kısa süreli kampanya sahalarına esnek uyum',
    ],
    image: katlanabilirPoster,
    alt: 'Katlanabilir LED poster kasa',
    seoTitle: 'Katlanabilir LED Poster Kasa | LEDKASA',
    seoDescription:
      'Taşınabilir katlanabilir LED poster kasa. Pop-up, gezici tanıtım ve hızlı saha kurulumları için.',
    related: ['poster-kasa', 'cable-set', 'power-plug'],
  },
  {
    slug: 'cat6-kablo',
    category: 'baglanti',
    number: '06',
    title: 'Cat6 Kablo',
    tagline: 'Veri aktarımı',
    summary: 'LED ekran veri hatlarında stabil sinyal için profesyonel Cat6 kablo.',
    description:
      'Cat6 Kablo, LED ekran kontrol ve veri aktarımında sinyal bütünlüğünü korumak için seçilir. Stabil bant genişliği ve düzenli kablo yönetimi, uzun hatlarda parazit riskini azaltır. Kontrol kartı ile panel arasındaki veri yolunda güvenilir bir omurga oluşturur. Sabit ve rental kurulumlarda standartlaşmış bir bağlantı bileşenidir.',
    features: [
      'LED veri hatları için stabil Cat6 performans',
      'Kontrol ve panel bağlantılarında güvenilir omurga',
      'Uzun hatlarda sinyal bütünlüğüne destek',
      'Sabit ve rental projelerde standart kullanım',
      'Düzenli kablo yönetimiyle temiz saha kurulumu',
    ],
    image: cat6,
    alt: 'Cat6 LED veri kablosu',
    seoTitle: 'Cat6 LED Kablo | LEDKASA',
    seoDescription:
      'LED ekran veri aktarımı için Cat6 kablo. Stabil sinyal, kontrol hattı ve saha bağlantı çözümleri.',
    related: ['flat-kablo', 'cable-set', 'rental-kabinet'],
  },
  {
    slug: 'power-plug',
    category: 'baglanti',
    number: '07',
    title: 'Power Plug',
    tagline: 'Enerji bağlantısı',
    summary: 'LED ekran güç dağıtımında güvenli ve hızlı enerji bağlantısı için power plug.',
    description:
      'Power Plug, LED ekran güç hatlarında güvenli ve tekrarlanabilir bağlantı sağlar. Saha ekipleri için hızlı tak-çıkar deneyimi sunarken kontak güvenliğini korur. Kabinet ve panel güç dağıtımında standart bir arayüz oluşturur. Hem sabit hem rental sistemlerde enerji hattını sadeleştirir.',
    features: [
      'Güvenli LED güç bağlantısı',
      'Hızlı tak-çıkar saha kullanımı',
      'Kabinet ve panel güç dağıtımına uyum',
      'Tekrarlanabilir kontak kalitesi',
      'Sabit ve rental sistemlerde standart arayüz',
    ],
    image: powerPlug,
    alt: 'LED power plug güç bağlantısı',
    seoTitle: 'LED Power Plug | LEDKASA',
    seoDescription:
      'LED ekran power plug. Güvenli enerji bağlantısı, hızlı saha montajı ve güç dağıtım çözümleri.',
    related: ['cable-set', 'kapaksiz-kabinet', 'cnc-kasa'],
  },
  {
    slug: 'flat-kablo',
    category: 'baglanti',
    number: '08',
    title: 'Flat Kablo',
    tagline: 'Panel içi bağlantı',
    summary: 'Panel içi düzenli ve düşük profilli bağlantı için flat kablo çözümleri.',
    description:
      'Flat Kablo, panel içi dar boşluklarda düşük profilli bağlantı ihtiyacını karşılar. Düz form, kablo yığınını azaltır ve kapak/arka erişim alanlarını temiz tutar. LED modül ve kart bağlantılarında düzenli hat yönetimi sağlar. Bakım sırasında izlenebilirlik sunarak saha müdahalesini hızlandırır.',
    features: [
      'Düşük profilli panel içi bağlantı',
      'Dar boşluklarda düzenli hat yönetimi',
      'Modül ve kart bağlantılarına uyum',
      'Temiz arka görünüm ve kolay izlenebilirlik',
      'Servis süresini kısaltan düzenli kablolama',
    ],
    image: flatKablo,
    alt: 'LED flat kablo',
    seoTitle: 'LED Flat Kablo | LEDKASA',
    seoDescription:
      'Panel içi LED flat kablo. Düşük profil, düzenli bağlantı ve profesyonel ekran kablolama çözümleri.',
    related: ['cat6-kablo', 'cable-set', 'kapaksiz-kabinet'],
  },
  {
    slug: 'cable-set',
    category: 'baglanti',
    number: '09',
    title: 'Cable Set',
    tagline: 'Komple çözüm',
    summary: 'Güç ve veri hatlarını birlikte toplayan komple LED bağlantı seti.',
    description:
      'Cable Set, LED ekran kurulumunda güç ve veri bileşenlerini tek pakette buluşturur. Eksik parça riskini azaltır; proje bazlı tedarikte eşleşen bağlantı elemanlarıyla sahayı hızlandırır. Yeni kurulum ve retrofit projelerde tamamlayıcı bir set olarak kullanılır. Tek noktadan tedarik modelimizin pratik çıktısıdır.',
    features: [
      'Güç ve veri hatlarını kapsayan set yaklaşımı',
      'Eksik parça riskini azaltan tamamlayıcı paket',
      'Yeni kurulum ve retrofit projelere uyum',
      'Saha kurulumunu hızlandıran hazır eşleşmeler',
      'Tek noktadan LED bağlantı tedariki',
    ],
    image: cableSet,
    alt: 'LED cable set bağlantı paketi',
    seoTitle: 'LED Cable Set | LEDKASA',
    seoDescription:
      'LED ekran cable set. Güç ve veri bağlantılarını bir arada sunan komple saha çözüm paketi.',
    related: ['power-plug', 'cat6-kablo', 'rental-kabinet'],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.related
    .map((slug) => getProduct(slug))
    .filter((item): item is Product => Boolean(item));
}