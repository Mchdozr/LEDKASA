import { siteUrl } from './site';

export interface BlogTable {
  headers: string[];
  rows: string[][];
}

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: BlogTable;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogLink {
  name: string;
  url: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  publishedAt: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  sections: BlogSection[];
  faqs: BlogFaq[];
  relatedLinks: BlogLink[];
  relatedProducts: BlogLink[];
  ctaLabel: string;
  ctaUrl: string;
}

export const BLOG_PAGE_SIZE = 6;

const images = {
  cnc: '/assets/images/products/cnc-led-kasa.webp',
  kapaksiz: '/assets/images/products/kapaksiz-led-kabinet.webp',
  rental: '/assets/images/products/rental-led-kabinet.webp',
  poster: '/assets/images/products/poster-led-kasa.webp',
  fold: '/assets/images/products/katlanabilir-poster-led-kasa.webp',
  cat6: '/assets/images/products/cat6-kablo.webp',
  power: '/assets/images/products/power-plug.webp',
  flat: '/assets/images/products/flat-kablo.webp',
  cable: '/assets/images/products/cable-set.webp',
  event: '/assets/images/editorial/event-stage.webp',
  retail: '/assets/images/editorial/retail-digital-signage.webp',
  workshop: '/assets/images/editorial/electronics-workshop.webp',
  cabinets: '/assets/images/categories/led-ekran-kasalari.webp',
  connect: '/assets/images/categories/guc-ve-baglanti-ekipmanlari.webp',
} as const;

const defaultRelated = (): BlogLink[] => [
  { name: 'Bilgi Merkezi', url: '/bilgi-merkezi/' },
  { name: 'Ürünler', url: '/urunler/' },
  { name: 'Kasa Karşılaştırma', url: '/urunler/kasa-karsilastirma/' },
  { name: 'Teklif Al', url: '/teklif-al/' },
  { name: 'İletişim', url: '/iletisim/' },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'led-kasa-seciminde-ilk-sorular',
    title: 'LED kasa seçiminde ilk sorular neler olmalı?',
    excerpt: 'Model adından önce kullanım alanı, kurulum biçimi ve erişim yönünü netleştirmek teklif sürecini hızlandırır.',
    summary:
      'LED kasa seçiminde önce senaryo, ortam, erişim yönü ve bağlantı ihtiyacı netleşir. LEDKASA; CNC, kapaksız, rental ve poster ailelerini proje girdilerinize göre birlikte değerlendirir.',
    seoTitle: 'LED Kasa Seçiminde İlk Sorular | LEDKASA Blog',
    seoDescription:
      'LED ekran kasası seçiminde sorulması gereken ilk soruları, kullanım alanı ve bağlantı planını LEDKASA Blog’da okuyun.',
    category: 'Seçim Rehberi',
    publishedAt: '2025-11-04',
    image: images.cabinets,
    imageAlt: 'LED ekran kasa ailesine genel bakış',
    imageCaption: 'LED kasa seçimi; ürün adı ezberlemekten çok senaryo, ortam ve bağlantı planıyla başlar.',
    sections: [
      {
        id: 'neden-ilk-sorular',
        heading: 'Neden önce sorular sorulmalı?',
        paragraphs: [
          'LED ekran kasası kararı, katalogdaki model adından önce projenin nerede ve nasıl kurulacağını anlamaya bağlıdır. Sabit duvar, rental sahne veya dikey poster ihtiyacı aynı katalogdan farklı ailelere yönlendirir.',
          'LEDKASA olarak teklif sürecinde önce kullanım senaryosunu yazıyoruz. Böylece CNC LED kasa, kapaksız kabinet, rental kabinet veya poster kasa seçenekleri daha hızlı daraltılır.',
        ],
      },
      {
        id: 'temel-sorular',
        heading: 'LED kasa seçiminde temel sorular',
        paragraphs: ['Aşağıdaki sorular ürün ailesini netleştirmek için başlangıç noktasını oluşturur.'],
        bullets: [
          'Kurulum sabit mi, geçici mi?',
          'İç mekân mı, dış mekân mı?',
          'Önden mi arkadan mı bakım erişimi var?',
          'Yaklaşık ekran ölçüsü ve görüş mesafesi nedir?',
          'Güç ve veri hattı mesafesi biliniyor mu?',
        ],
        table: {
          headers: ['Soru', 'Neden önemli?'],
          rows: [
            ['Sabit / rental', 'Kabinet mimarisi ve taşıma planını belirler'],
            ['İç / dış ortam', 'Koruma, parlaklık ve montaj detayını etkiler'],
            ['Erişim yönü', 'Kapaksız veya kapaklı kasa tercihini yönlendirir'],
            ['Ölçü ve pitch notu', 'Modül–kabinet uyumunu hızlandırır'],
            ['Hat mesafeleri', 'Cat6, Power Plug ve Cable Set kapsamını netleştirir'],
          ],
        },
      },
      {
        id: 'kasa-ve-baglanti',
        heading: 'Kasa ve bağlantıyı birlikte düşünün',
        paragraphs: [
          'Kabinet kararı güç ve veri hatlarından bağımsız ele alındığında saha sürprizi artar. Cat6, Power Plug, Flat Kablo ve Cable Set aynı proje çerçevesinde planlanmalıdır.',
          'LEDKASA katalogunda ürün kartları ile bilgi merkezi rehberleri bu yüzden birlikte okunur. Kapsam; ölçü, pitch ve hat bilgisi teklifte doğrulanır.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'İlk sorular netleştiğinde LED kasa ailesi daha doğru seçilir. Proje girdilerinizi teklif formunda paylaşarak CNC, rental, poster veya bağlantı ekipmanları için kapsamı birlikte netleştirebilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'LED kasa seçimine nereden başlamalıyım?',
        answer: 'Önce kullanım alanı, kurulum tipi ve erişim yönünü yazın. Model adı bu girdilerden sonra değerlendirilir.',
      },
      {
        question: 'Tek bir kasa her projeye uyar mı?',
        answer: 'Hayır. Sabit, rental ve poster ihtiyaçları farklı kabinet mimarileri gerektirir.',
      },
      {
        question: 'Bağlantı ekipmanlarını ne zaman konuşmalıyım?',
        answer: 'Kasa ailesi daralırken. Güç ve veri hatları sonradan eklenmemeli, aynı çerçevede planlanmalıdır.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
      { name: 'Rental LED Kabinet', url: '/urunler/led-ekran-kasalari/rental-led-kabinet/' },
    ],
    ctaLabel: 'Teklif alın',
    ctaUrl: '/teklif-al/',
  },
  {
    slug: 'sabit-kurulumda-cnc-led-kasa',
    title: 'Sabit kurulumda CNC LED kasa ne zaman öne çıkar?',
    excerpt: 'Kalıcı ekran yüzeylerinde düzenli birleşim, pitch uyumu ve montaj yüzeyi CNC kasa değerlendirmesinin merkezindedir.',
    summary:
      'CNC LED kasa; sabit kurumsal duvar ve uzun ömürlü LED ekran yüzeylerinde düzenli kabin mimarisi arayan projelerde değerlendirilir. Pitch, modül ölçüsü ve montaj yüzeyi teklifte doğrulanır.',
    seoTitle: 'Sabit Kurulumda CNC LED Kasa | LEDKASA Blog',
    seoDescription:
      'Sabit LED ekran projelerinde CNC LED kasanın hangi koşullarda değerlendirildiğini LEDKASA Blog yazısında inceleyin.',
    category: 'Ürün Ailesi',
    publishedAt: '2025-11-12',
    image: images.cnc,
    imageAlt: 'CNC LED kasa ürün görseli',
    imageCaption: 'CNC LED kasa, kalıcı duvar uygulamalarında düzenli birleşim ve pitch uyumu için değerlendirilir.',
    sections: [
      {
        id: 'cnc-nedir',
        heading: 'CNC LED kasa nedir?',
        paragraphs: [
          'CNC LED kasa; sabit LED ekran kurulumlarında düzenli kabinet birleşimi ve montaj yüzeyi uyumu arayan projelerde öne çıkan ürün ailesidir.',
          'LEDKASA katalogunda örnek gövde ve pitch notları yönlendiricidir. Kullanılan modül modeli ve nihai ölçü teklifte doğrulanır; stok veya fiyat yayınlanmaz.',
        ],
      },
      {
        id: 'ne-zaman',
        heading: 'Ne zaman öne çıkar?',
        paragraphs: ['Aşağıdaki koşullarda CNC kasa değerlendirmesi sıklaşır.'],
        bullets: [
          'Kalıcı kurumsal veya reklam duvarı',
          'Düzenli kabin ızgarası ihtiyacı',
          'Pitch ve PCB ölçüsünün netleştirilmesi',
          'Uzun dönem bakım planı olan sabit yüzey',
        ],
        table: {
          headers: ['Proje girdisi', 'CNC değerlendirmesine etkisi'],
          rows: [
            ['Ekran en × boy', 'Kabinet adedi ve ızgara düzenini belirler'],
            ['Modül pitch ailesi', 'Boşluk ve vida düzeni uyumunu etkiler'],
            ['Duvar / iskelet tipi', 'Montaj aparatı ve hizalama planını değiştirir'],
            ['Bakım erişim yönü', 'Kapaksız alternatiflerle karşılaştırmayı açar'],
          ],
        },
      },
      {
        id: 'teklif',
        heading: 'Teklif öncesi netleştirilecekler',
        paragraphs: [
          'Ekran ölçüleri, pitch notu, montaj yüzeyi ve güç/veri mesafeleri paylaşıldığında CNC LED kasa kapsamı daha hızlı oluşur. Gerekirse kapaksız kabinet ile yan yana okunur.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Sabit kurulumda CNC LED kasa; düzenli yüzey ve pitch uyumu ihtiyacı öne çıktığında değerlendirilir. Projenizi teklif formundan ileterek kapsamı birlikte netleştirebilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'CNC LED kasa her sabit projede zorunlu mu?',
        answer: 'Hayır. Erişim yönü ve montaj yüzeyi kapaksız kabineti de gündeme getirebilir.',
      },
      {
        question: 'Pitch listesi kesin midir?',
        answer: 'Katalogdaki pitch notları yönlendiricidir. Kullanılan modül teklifte teyit edilir.',
      },
      {
        question: 'Datasheet ölçüleri nihai midir?',
        answer: 'Örnek föyler yönlendiricidir. Proje ölçüsü ve montaj detayı teklifte doğrulanır.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [{ name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' }],
    ctaLabel: 'CNC kasa için teklif alın',
    ctaUrl: '/teklif-al/?urun=cnc-led-kasa',
  },
  {
    slug: 'rental-kabinet-sahne-planlama',
    title: 'Rental kabinet ile sahne planlaması nasıl yapılır?',
    excerpt: 'Kurulum-söküm penceresi, taşıma düzeni ve hat uzunlukları rental kabinet projesinin omurgasıdır.',
    summary:
      'Rental LED kabinet; etkinlik ve sahne LED ekranlarında hızlı kurulum–söküm için değerlendirilir. Kabinet adedi, taşıma ve güç/veri hatları aynı planda okunmalıdır.',
    seoTitle: 'Rental Kabinet ile Sahne Planlaması | LEDKASA Blog',
    seoDescription:
      'Etkinlik ve sahne LED ekranlarında rental kabinet planlaması için pratik çerçeveyi LEDKASA Blog’da okuyun.',
    category: 'Etkinlik',
    publishedAt: '2025-11-20',
    image: images.rental,
    imageAlt: 'Rental LED kabinet ürün görseli',
    imageCaption: 'Rental kabinet planı; kurulum penceresi, istifleme ve hat mesafeleriyle birlikte yazılır.',
    sections: [
      {
        id: 'rental-nedir',
        heading: 'Rental kabinet nedir?',
        paragraphs: [
          'Rental LED kabinet; geçici LED ekranlarda hız, tekrar kurulabilirlik ve taşınabilirlik ihtiyacı öne çıktığında değerlendirilen ürün ailesidir.',
          'LEDKASA yaklaşımında kabinet seçimi kadar sahadaki hareket alanı, istifleme ve söküm sırası da kritiktir.',
        ],
      },
      {
        id: 'planlama',
        heading: 'Sahne planlamasında kritik başlıklar',
        paragraphs: ['Kurulum öncesi tek listede toplanması faydalı olan başlıklar:'],
        bullets: [
          'Kurulum / söküm süresi',
          'İstifleme ve taşıma yolu',
          'Güç kaynağı mesafesi',
          'Veri hattı rotası ve etiketleme',
          'Yedek kabinet ihtiyacı',
        ],
        table: {
          headers: ['Plan öğesi', 'Neden gerekli?'],
          rows: [
            ['Kabinet adedi', 'Ekran ölçüsü ve yedek hesabını netleştirir'],
            ['Hat uzunlukları', 'Cable Set ve Cat6 kapsamını belirler'],
            ['Kurulum penceresi', 'Ekip ve ekipman zamanlamasını etkiler'],
            ['Söküm sırası', 'Geçici işlerde süre kaybını azaltır'],
          ],
        },
      },
      {
        id: 'baglanti',
        heading: 'Bağlantı rotasını önceden çizin',
        paragraphs: [
          'Güç ve veri hatlarının kontrol noktasına uzaklığı, söküm sırasında kablo yönetimini doğrudan etkiler. Cable Set kapsamı bu yüzden proje özelinde netleşir.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Rental kabinetle sahne planı; kabinet, hat ve zaman penceresinin birlikte okunmasıyla güçlenir. Etkinlik girdilerinizi teklif formunda paylaşabilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Rental kabinet yalnızca konser için mi?',
        answer: 'Hayır. Fuar, lansman, sahne ve geçici kurumsal ekranlarda da değerlendirilir.',
      },
      {
        question: 'Cable Set her rental işte aynı mı?',
        answer: 'Hayır. İçerik kabinet adedi, hat mesafesi ve kontrol noktasına göre değişir.',
      },
      {
        question: 'Söküm neden ayrı planlanmalı?',
        answer: 'Geçici işlerde söküm sırası kurulum kadar zaman alır ve hat yönetimini etkiler.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [
      { name: 'Rental LED Kabinet', url: '/urunler/led-ekran-kasalari/rental-led-kabinet/' },
      { name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/' },
    ],
    ctaLabel: 'Rental proje teklifi alın',
    ctaUrl: '/teklif-al/?urun=rental-led-kabinet',
  },
  {
    slug: 'poster-led-kasa-magaza-yerlesimi',
    title: 'Poster LED kasa mağaza yerleşiminde nelere bakılır?',
    excerpt: 'Dikey format, vitrin derinliği ve içerik oranı poster kasa kararını şekillendirir.',
    summary:
      'Poster LED kasa; mağaza girişi, vitrin yanı ve showroom karşılama alanlarında dikey iletişim ihtiyacı olduğunda değerlendirilir. Yerleşim, görüş mesafesi ve içerik oranıyla birlikte okunur.',
    seoTitle: 'Poster LED Kasa Mağaza Yerleşimi | LEDKASA Blog',
    seoDescription:
      'Mağaza ve showroom’da poster LED kasa yerleşimi için dikkat edilecek noktaları LEDKASA Blog’da keşfedin.',
    category: 'Perakende',
    publishedAt: '2025-11-28',
    image: images.poster,
    imageAlt: 'Poster LED kasa ürün görseli',
    imageCaption: 'Poster LED kasa yerleşimi; dikey format, vitrin derinliği ve izleyici mesafesiyle planlanır.',
    sections: [
      {
        id: 'poster-nedir',
        heading: 'Poster LED kasa nedir?',
        paragraphs: [
          'Poster LED kasa; dikey LED ekran yüzeyleri için tasarlanmış kasa ailesidir. Mağaza tabelası, vitrin yanı ve showroom karşılama noktalarında sıkça değerlendirilir.',
          'LEDKASA katalogundaki örnek gövde ölçüleri yönlendiricidir. Nihai ölçü ve pitch teklifte doğrulanır.',
        ],
      },
      {
        id: 'yerlesim',
        heading: 'Mağaza yerleşiminde bakılacaklar',
        paragraphs: ['Yerleşim kararı şu girdilerle güçlenir:'],
        bullets: [
          'Vitrin derinliği ve geçiş genişliği',
          'İzleyicinin ortalama duruş mesafesi',
          'İçerik tipi (kampanya, menü, marka hikâyesi)',
          'Güç / veri hattının gizlenmesi',
        ],
        table: {
          headers: ['Yerleşim alanı', 'Dikkat noktası'],
          rows: [
            ['Mağaza girişi', 'Karşılama mesafesi ve içerik okunabilirliği'],
            ['Vitrin yanı', 'Derinlik ve yaya akışı'],
            ['Showroom', 'Ürün hikâyesiyle ekran boyutunun uyumu'],
            ['Kasa / ödeme yakını', 'Kablo gizliliği ve bakım erişimi'],
          ],
        },
      },
      {
        id: 'icerik',
        heading: 'İçerik ve görüş mesafesi',
        paragraphs: [
          'Dikey format tek başına yeterli değildir. Pitch notu, içerik yoğunluğu ve izleme mesafesi birlikte okunmalıdır. Gerekirse katlanabilir poster kasa ile karşılaştırılır.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Poster LED kasa mağaza yerleşiminde mekân ölçüsü ve içerik planı kadar kritiktir. Mağaza ölçülerinizi teklif formunda paylaşarak kapsamı netleştirebilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Poster kasa yatay ekran yerine ne zaman tercih edilir?',
        answer: 'Dikey iletişim, dar cephe veya vitrin yanı senaryolarında değerlendirilir.',
      },
      {
        question: 'Örnek gövde ölçüleri kesin midir?',
        answer: 'Yönlendiricidir. Proje ölçüsü ve pitch teklifte doğrulanır.',
      },
      {
        question: 'Katlanabilir poster ne zaman konuşulur?',
        answer: 'Sık yer değiştirme veya sınırlı depolama ihtiyacı öne çıktığında.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [{ name: 'Poster LED Kasa', url: '/urunler/led-ekran-kasalari/poster-led-kasa/' }],
    ctaLabel: 'Poster kasa teklifi alın',
    ctaUrl: '/teklif-al/?urun=poster-led-kasa',
  },
  {
    slug: 'katlanabilir-poster-kasa-ne-zaman',
    title: 'Katlanabilir poster kasa ne zaman tercih edilir?',
    excerpt: 'Taşıma, yeniden kurulum ve braket akışı öne çıktığında katlanabilir gövde seçenekleri masaya gelir.',
    summary:
      'Katlanabilir poster LED kasa; taşınabilir dikey iletişim, yeniden kurulum ve sınırlı depolama ihtiyacı olan projelerde değerlendirilir. Ön bakımlı gövde yaklaşımı bakım planını etkiler.',
    seoTitle: 'Katlanabilir Poster LED Kasa Ne Zaman? | LEDKASA Blog',
    seoDescription:
      'Katlanabilir poster LED kasanın hangi proje koşullarında değerlendirildiğini LEDKASA Blog yazısında öğrenin.',
    category: 'Ürün Ailesi',
    publishedAt: '2025-12-05',
    image: images.fold,
    imageAlt: 'Katlanabilir poster LED kasa',
    imageCaption: 'Katlanabilir poster kasa; taşıma, depolama ve yeniden kurulum senaryolarında öne çıkar.',
    sections: [
      {
        id: 'ne-zaman',
        heading: 'Ne zaman tercih edilir?',
        paragraphs: [
          'Katlanabilir poster kasa; sık yer değiştiren perakende, pop-up mağaza veya depolama alanı sınırlı projelerde değerlendirilir.',
        ],
        bullets: [
          'Taşıma formu kritikse',
          'Yeniden kurulum sık tekrarlanıyorsa',
          'Depolama alanı dar ise',
          'Ön bakım yaklaşımı plana uyuyorsa',
        ],
        table: {
          headers: ['Koşul', 'Değerlendirme'],
          rows: [
            ['Pop-up / geçici mağaza', 'Taşınabilir dikey ekran ihtiyacı'],
            ['Sınırlı depo', 'Katlanır gövde avantajı'],
            ['Sabit vitrin', 'Standart poster kasa da yeterli olabilir'],
            ['Ön bakım', 'Gövde yaklaşımı teklifte netleşir'],
          ],
        },
      },
      {
        id: 'teklif',
        heading: 'Teklifte netleşenler',
        paragraphs: [
          'Taşıma formu, yerleşim adedi, braket ihtiyacı ve hat düzeni proje özelinde belirlenir. LEDKASA fiyat veya stok yayınlamaz; kapsam girdilerinizle oluşur.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Katlanabilir poster kasa, hareketli dikey iletişim senaryolarında masaya gelir. Proje koşullarınızı teklif formundan iletebilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Her poster proje katlanabilir mi olmalı?',
        answer: 'Hayır. Sabit vitrinlerde standart poster kasa yeterli olabilir.',
      },
      {
        question: 'Ağırlık ve ölçü kesin midir?',
        answer: 'Datasheet örnekleri yönlendiricidir. Proje konfigürasyonu teklifte teyit edilir.',
      },
      {
        question: 'Ön bakım ne anlama gelir?',
        answer: 'Bakım erişiminin önden planlandığı gövde yaklaşımıdır; sahaya göre doğrulanır.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [
      { name: 'Katlanabilir Poster LED Kasa', url: '/urunler/led-ekran-kasalari/katlanabilir-poster-led-kasa/' },
    ],
    ctaLabel: 'Katlanabilir poster teklifi',
    ctaUrl: '/teklif-al/?urun=katlanabilir-poster-led-kasa',
  },
  {
    slug: 'pitch-ve-goruntu-mesafesi',
    title: 'Pitch ve görüş mesafesi nasıl birlikte okunur?',
    excerpt: 'Piksel aralığı tek başına karar vermez; izleme mesafesi ve içerik tipi ile birlikte değerlendirilir.',
    summary:
      'LED pitch değeri; görüş mesafesi, içerik tipi ve kasa uyumu ile birlikte okunur. Daha küçük pitch yakın mesafede yumuşak görüntü sağlar ama tek başına yeterli karar değildir.',
    seoTitle: 'LED Pitch ve Görüş Mesafesi | LEDKASA Blog',
    seoDescription:
      'LED ekran pitch değeri ile görüş mesafesini birlikte nasıl okuyacağınızı LEDKASA Blog’da öğrenin.',
    category: 'Teknik',
    publishedAt: '2025-12-12',
    image: images.workshop,
    imageAlt: 'Elektronik atölyesinde LED modül çalışması',
    imageCaption: 'Pitch kararı; izleme mesafesi, içerik tipi ve kabinet uyumuyla birlikte verilmelidir.',
    sections: [
      {
        id: 'pitch-nedir',
        heading: 'Pitch nedir?',
        paragraphs: [
          'Pitch, LED modüllerde piksel merkezleri arasındaki mesafedir. Daha küçük pitch yakın mesafede daha yumuşak görüntü sağlar; ancak kasa ölçüsü, ortam ışığı ve bütçe de denkleme girer.',
        ],
      },
      {
        id: 'birlikte-okuma',
        heading: 'Pitch ve görüş mesafesini birlikte okumak',
        paragraphs: ['Karar verirken şu başlıklar birlikte ele alınır:'],
        bullets: [
          'Ortalama izleme mesafesi',
          'İçerik tipi (metin ağırlıklı / video)',
          'Ortam ışığı',
          'Modül PCB ölçüsü ve kabinet boşluğu',
        ],
        table: {
          headers: ['Girdi', 'Etki'],
          rows: [
            ['Yakın mesafe', 'Daha küçük pitch değerlendirmesi artar'],
            ['Uzak sahne', 'Daha büyük pitch de yeterli olabilir'],
            ['Yoğun metin', 'Okunabilirlik öncelenir'],
            ['Kabinet uyumu', 'Pitch tek başına yeterli olmaz'],
          ],
        },
      },
      {
        id: 'kasa-uyumu',
        heading: 'Kasa uyumu',
        paragraphs: [
          'Modül PCB ölçüsü ile kabinet boşluğu uyuşmazsa sahada sürpriz çıkar. Bu yüzden pitch kararı CNC veya kapaksız kasa ailesinden bağımsız verilmemelidir.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Pitch bir başlangıç noktasıdır. Mesafe, içerik ve kasa uyumu netleşince LEDKASA teklif kapsamında doğru aileyi birlikte daraltır.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Küçük pitch her zaman daha mı iyidir?',
        answer: 'Yakın mesafe ve yoğun içerikte avantajlı olabilir; uzak sahnelerde her zaman zorunlu değildir.',
      },
      {
        question: 'Katalog pitch listesi kesin midir?',
        answer: 'Yönlendiricidir. Kullanılan modül modeli teklifte doğrulanır.',
      },
      {
        question: 'Pitch ile kasa neden birlikte konuşulur?',
        answer: 'Modül ölçüsü kabinet boşluğuyla uyuşmazsa montaj planı yeniden yazılır.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
      { name: 'Kapaksız LED Kabinet', url: '/urunler/led-ekran-kasalari/kapaksiz-led-kabinet/' },
    ],
    ctaLabel: 'Pitch için teklif alın',
    ctaUrl: '/teklif-al/',
  },
  {
    slug: 'led-ekran-guc-dagitimi',
    title: 'LED ekran güç dağıtımı için temel planlama',
    excerpt: 'PSU seçimi, hat kesiti ve konektör tipi; ekranın parlaklık profili ve kabinet düzenine göre şekillenir.',
    summary:
      'LED ekran güç dağıtımı; kabinet düzeni, parlaklık profili ve hat mesafesiyle birlikte planlanır. Power Plug ve Cable Set kapsamı proje özelinde netleşir.',
    seoTitle: 'LED Ekran Güç Dağıtımı Planlama | LEDKASA Blog',
    seoDescription:
      'LED ekran güç dağıtımında dikkat edilecek temel planlama başlıklarını LEDKASA Blog’da okuyun.',
    category: 'Bağlantı',
    publishedAt: '2025-12-18',
    image: images.power,
    imageAlt: 'LED ekran güç bağlantısı için power plug',
    imageCaption: 'Güç planı kabinet yerleşimiyle birlikte düşünülür; örnek PSU değerleri yönlendiricidir.',
    sections: [
      {
        id: 'neden',
        heading: 'Güç, kasanın devamıdır',
        paragraphs: [
          'Güç planı kabinet yerleşiminden sonra değil, onunla birlikte düşünülmelidir. Örnek föylerdeki PSU değerleri konfigürasyon örneğidir; gerçek tüketim projeye göre hesaplanır.',
        ],
      },
      {
        id: 'basliklar',
        heading: 'Temel planlama başlıkları',
        paragraphs: ['Teklif öncesi şu girdiler faydalıdır:'],
        bullets: [
          'Kabinet adedi ve yerleşim şeması',
          'Parlaklık / ortam notu',
          'PSU konumları',
          'Konektör tipi ihtiyacı',
        ],
        table: {
          headers: ['Öğe', 'Rolü'],
          rows: [
            ['Power Plug', 'Sistem kurgusuna uygun güç bağlantısı'],
            ['Cable Set', 'Güç + veri paketini aynı çerçevede konuşmak'],
            ['Hat kesiti', 'Mesafe ve yüke göre teklifte netleşir'],
            ['Yedek hat', 'Kritik ekranlarda süreklilik planı'],
          ],
        },
      },
      {
        id: 'power-plug',
        heading: 'Power Plug’un rolü',
        paragraphs: [
          'Power Plug, sistem kurgusuna uygun güç bağlantısı için değerlendirilir. Adet ve konektör tipi teklifte netleşir; stok veya fiyat yayınlanmaz.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Doğru güç dağıtımı; kasa, PSU ve bağlantıyı aynı senaryoda okumaktan geçer. Proje şemanızı teklif formunda paylaşabilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'PSU değeri katalogda kesin midir?',
        answer: 'Örnek değerler yönlendiricidir. Gerçek tüketim proje konfigürasyonuna göre hesaplanır.',
      },
      {
        question: 'Power Plug her üründe aynı mı?',
        answer: 'Hayır. Adet ve konektör tipi sistem kurgusuna göre değişir.',
      },
      {
        question: 'Güç planı ne zaman yapılır?',
        answer: 'Kabinet düzeniyle birlikte; sonradan eklenmemelidir.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [
      { name: 'Power Plug', url: '/urunler/guc-ve-baglanti-ekipmanlari/power-plug/' },
      { name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/' },
    ],
    ctaLabel: 'Güç planı için teklif',
    ctaUrl: '/teklif-al/?urun=power-plug',
  },
  {
    slug: 'cat6-veri-hatti-ipuclari',
    title: 'Cat6 veri hattı için pratik ipuçları',
    excerpt: 'Receiving card rotası, etiketleme ve hat uzunluğu veri hattı kalitesini doğrudan etkiler.',
    summary:
      'Cat6 veri hattı; receiving card düzeni, etiketleme ve kontrol noktası mesafesiyle planlanır. LED ekran projelerinde hat görünürlüğü kurulum hızını artırır.',
    seoTitle: 'LED Ekran Cat6 Veri Hattı İpuçları | LEDKASA Blog',
    seoDescription:
      'LED ekran projelerinde Cat6 veri hattı planlaması için pratik ipuçlarını LEDKASA Blog’da inceleyin.',
    category: 'Bağlantı',
    publishedAt: '2025-12-26',
    image: images.cat6,
    imageAlt: 'Cat6 kablo ürün görseli',
    imageCaption: 'Cat6 hatları receiving card rotasına göre planlanır; etiketleme saha hızını artırır.',
    sections: [
      {
        id: 'neden',
        heading: 'Veri yolu görünür olsun',
        paragraphs: [
          'Cat6 hatları receiving card düzenine göre planlanır. Etiketleme ve rota, kurulum ekibinin saha hızını artırır.',
        ],
        bullets: ['Kontrol noktası mesafesi', 'Yedek hat ihtiyacı', 'Etiketleme standardı'],
        table: {
          headers: ['İpucu', 'Faydası'],
          rows: [
            ['Şema ile hat çizmek', 'Uzunluk tahminini netleştirir'],
            ['Etiketleme', 'Söküm ve bakımda zaman kazandırır'],
            ['Yedek hat', 'Kritik yayınlarda süreklilik sağlar'],
            ['Kart düzeni', 'Rota çakışmalarını azaltır'],
          ],
        },
      },
      {
        id: 'teklif',
        heading: 'Teklifte paylaşılacaklar',
        paragraphs: [
          'Ekran yerleşim şeması ve kart düzeni paylaşıldığında uzunluk ve adet daha doğru konuşulur. LEDKASA Cat6 kapsamını proje bilgisiyle netleştirir.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'İyi bir Cat6 planı; kasa ve güç kadar önemlidir. Şemanızı teklif formunda ileterek veri hattı kapsamını konuşabilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Cat6 uzunluğu nasıl belirlenir?',
        answer: 'Kontrol noktası, kart düzeni ve kabinet yerleşimine göre teklifte netleşir.',
      },
      {
        question: 'Yedek hat her projede gerekir mi?',
        answer: 'Kritik yayınlarda değerlendirilir; zorunluluk proje riskine bağlıdır.',
      },
      {
        question: 'Etiketleme neden önemli?',
        answer: 'Kurulum, söküm ve bakımda hat takibini hızlandırır.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [{ name: 'Cat6 Kablo', url: '/urunler/guc-ve-baglanti-ekipmanlari/cat6-kablo/' }],
    ctaLabel: 'Cat6 için teklif alın',
    ctaUrl: '/teklif-al/?urun=cat6-kablo',
  },
  {
    slug: 'flat-kablo-duzeni',
    title: 'Flat kablo düzeni neden önemlidir?',
    excerpt: 'Panel içi bağlantılarda düzenli yerleşim, bakım erişimini ve görsel bütünlüğü destekler.',
    summary:
      'Flat kablo; modül–kart bağlantılarında düzenli panel içi yerleşim ihtiyacı olan LED ekran projelerinde değerlendirilir. Pin yapısı kullanılan modül ailesine göre değişir.',
    seoTitle: 'LED Flat Kablo Düzeni | LEDKASA Blog',
    seoDescription:
      'LED ekran flat kablo düzeninin neden önemli olduğunu ve nasıl planlandığını LEDKASA Blog’da okuyun.',
    category: 'Bağlantı',
    publishedAt: '2026-01-06',
    image: images.flat,
    imageAlt: 'Flat kablo ürün görseli',
    imageCaption: 'Düzenli flat kablo yerleşimi bakım erişimini kolaylaştırır ve panel içi karmaşayı azaltır.',
    sections: [
      {
        id: 'neden',
        heading: 'Düzenli panel içi hatlar',
        paragraphs: [
          'Flat kablo; modül–kart bağlantılarında düzenli yerleşim ihtiyacı olan projelerde değerlendirilir. Pin yapısı kullanılan modül ailesine göre değişir.',
        ],
        table: {
          headers: ['Konu', 'Etki'],
          rows: [
            ['Düzensiz demet', 'Bakım süresini uzatır'],
            ['Doğru pin ailesi', 'Modül uyumunu sağlar'],
            ['Kabinet formu', 'Flat kablo adedini etkiler'],
            ['Erişim yönü', 'Hat düzenini değiştirir'],
          ],
        },
      },
      {
        id: 'bakim',
        heading: 'Bakım erişimi',
        paragraphs: [
          'Düzensiz kablo demetleri bakım süresini uzatır. Kabinet formu ile flat kablo adedi birlikte planlanmalıdır.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Flat kablo düzeni; görsel bütünlük ve bakım hızı için kritiktir. Modül notunuzu teklifte paylaşarak kapsamı netleştirebilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Her flat kablo her modüle uyar mı?',
        answer: 'Hayır. Pin yapısı ve uzunluk modül ailesine göre doğrulanır.',
      },
      {
        question: 'Adet nasıl hesaplanır?',
        answer: 'Kabinet formu, kart düzeni ve modül yerleşimine göre teklifte netleşir.',
      },
      {
        question: 'Flat kablo neden görünür olmalı?',
        answer: 'Düzenli yerleşim bakım ve montaj hatalarını azaltır.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [{ name: 'Flat Kablo', url: '/urunler/guc-ve-baglanti-ekipmanlari/flat-kablo/' }],
    ctaLabel: 'Flat kablo teklifi',
    ctaUrl: '/teklif-al/?urun=flat-kablo',
  },
  {
    slug: 'cable-set-proje-kapsami',
    title: 'Cable Set kapsamı projeye göre nasıl okunur?',
    excerpt: 'Set çözümü tek paket gibi görünse de içerik; güç, veri ve modül bağlantı ihtiyaçlarına göre değişir.',
    summary:
      'Cable Set; güç, veri ve panel bağlantılarını aynı teklif çerçevesinde konuşmak için kullanılır. İçerik kabinet adedi ve hat mesafelerine göre değişir.',
    seoTitle: 'LED Cable Set Proje Kapsamı | LEDKASA Blog',
    seoDescription:
      'LED ekran Cable Set kapsamının proje bilgilerine göre nasıl netleştiğini LEDKASA Blog’da öğrenin.',
    category: 'Bağlantı',
    publishedAt: '2026-01-14',
    image: images.cable,
    imageAlt: 'Cable set ürün görseli',
    imageCaption: 'Cable Set tek paket gibi görünse de içerik proje ölçüsüne göre belirlenir.',
    sections: [
      {
        id: 'nedir',
        heading: 'Cable Set nedir?',
        paragraphs: [
          'Cable Set; güç, veri ve panel bağlantılarını aynı teklif çerçevesinde konuşmak için kullanılan bir yaklaşımdır. İçerik sabit bir stok listesi değildir.',
        ],
        table: {
          headers: ['Proje girdisi', 'Set içeriğine etkisi'],
          rows: [
            ['Kabinet adedi', 'Hat ve konektör miktarını etkiler'],
            ['Kontrol noktası mesafesi', 'Cat6 / güç uzunluğunu değiştirir'],
            ['Modül notu', 'Flat kablo ihtiyacını yönlendirir'],
            ['Kurulum tipi', 'Rental veya sabit hat yönetimini ayırır'],
          ],
        },
      },
      {
        id: 'paylasim',
        heading: 'Ne paylaşmalısınız?',
        paragraphs: [
          'Kabinet adedi, hat mesafeleri ve kontrol noktası bilgisi set içeriğini netleştirir. LEDKASA fiyat veya stok yayınlamaz; kapsam girdilerinizle oluşur.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Cable Set’i proje ölçüsüyle okumak saha sürprizini azaltır. Şemanızı teklif formunda paylaşabilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Cable Set her zaman aynı parçaları mı içerir?',
        answer: 'Hayır. İçerik proje ihtiyacına göre belirlenir.',
      },
      {
        question: 'Ayrı ayrı kablo almak daha mı iyi?',
        answer: 'Bazı projelerde evet. LEDKASA kapsamı senaryonuza göre önerir.',
      },
      {
        question: 'Ne kadar bilgi yeterli?',
        answer: 'Kabinet adedi, mesafe ve kontrol noktası minimum faydalı settir.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [{ name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/' }],
    ctaLabel: 'Cable Set teklifi alın',
    ctaUrl: '/teklif-al/?urun=cable-set',
  },
  {
    slug: 'indoor-outdoor-kasa-farki',
    title: 'Indoor ve outdoor kasa farkı teklifi nasıl etkiler?',
    excerpt: 'Ortam koşulları; gövde, sızdırmazlık yaklaşımı ve güç planını değiştirir. Kesin iddia yerine proje girdileriyle ilerlenir.',
    summary:
      'Indoor ve outdoor LED kasa farkı; koruma, parlaklık ve montaj detaylarını değiştirir. LEDKASA ortam bilgisiyle ürün ailesini daraltır, kesin stok veya fiyat yayınlamaz.',
    seoTitle: 'Indoor Outdoor LED Kasa Farkı | LEDKASA Blog',
    seoDescription:
      'Indoor ve outdoor LED kasa farkının teklif kapsamını nasıl etkilediğini LEDKASA Blog’da okuyun.',
    category: 'Seçim Rehberi',
    publishedAt: '2026-01-22',
    image: images.event,
    imageAlt: 'Etkinlik sahnesinde LED ekran kurulumu',
    imageCaption: 'Ortam tipi; gövde, güç ve montaj detayını doğrudan etkiler.',
    sections: [
      {
        id: 'fark',
        heading: 'Ortam, ürün ailesini daraltır',
        paragraphs: [
          'İç mekân ve dış mekân ihtiyaçları aynı ürün dilini konuşsa da koruma, parlaklık ve montaj detayları farklılaşır.',
        ],
        table: {
          headers: ['Ortam', 'Teklife etkisi'],
          rows: [
            ['Indoor', 'Koruma ve parlaklık profili iç mekâna göre okunur'],
            ['Outdoor', 'Sızdırmazlık ve ışık koşulları öne çıkar'],
            ['Yarı açık alan', 'Hibrit senaryo; proje özelinde doğrulanır'],
            ['Sahne / rental', 'Taşıma ve kurulum penceresi eklenir'],
          ],
        },
      },
      {
        id: 'girdiler',
        heading: 'Paylaşılması faydalı girdiler',
        paragraphs: [
          'Ortam tipi, güneş/ışık durumu ve montaj yüksekliği değerlendirmeyi hızlandırır. CNC, rental veya poster aileleri bu girdilerle karşılaştırılır.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Indoor/outdoor farkı teklif kapsamını değiştirir. Ortam notunuzu teklif formunda paylaşarak doğru aileyi birlikte daraltabilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Outdoor her zaman farklı kasa mı ister?',
        answer: 'Çoğu senaryoda koruma ve parlaklık detayları değişir; kesin seçim proje girdilerine bağlıdır.',
      },
      {
        question: 'Yarı açık alan nasıl okunur?',
        answer: 'Hibrit senaryo olarak ele alınır ve teklifte doğrulanır.',
      },
      {
        question: 'Fiyat farkı yayınlanıyor mu?',
        answer: 'Hayır. LEDKASA fiyat yayınlamaz; kapsam proje bilgisiyle oluşur.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
      { name: 'Rental LED Kabinet', url: '/urunler/led-ekran-kasalari/rental-led-kabinet/' },
    ],
    ctaLabel: 'Ortamınıza göre teklif',
    ctaUrl: '/teklif-al/',
  },
  {
    slug: 'kapaksiz-kabinet-bakim-erisimi',
    title: 'Kapaksız kabinet ve bakım erişimi',
    excerpt: 'Yalın arka yapı ve bakım erişimi ihtiyacı öne çıktığında kapaksız kabinet seçenekleri değerlendirilir.',
    summary:
      'Kapaksız LED kabinet; bakım erişimi ve yalın arka yapı ihtiyacının öne çıktığı sabit uygulamalarda değerlendirilir. Erişim yönü netleşmeden kapsam kilitlenmez.',
    seoTitle: 'Kapaksız LED Kabinet Bakım Erişimi | LEDKASA Blog',
    seoDescription:
      'Kapaksız LED kabinetin bakım erişimi açısından nasıl değerlendirildiğini LEDKASA Blog’da inceleyin.',
    category: 'Ürün Ailesi',
    publishedAt: '2026-01-30',
    image: images.kapaksiz,
    imageAlt: 'Kapaksız LED kabinet ürün görseli',
    imageCaption: 'Kapaksız kabinet; erişim yönü ve yalın arka yapı ihtiyacı öne çıktığında değerlendirilir.',
    sections: [
      {
        id: 'nedir',
        heading: 'Kapaksız kabinet nedir?',
        paragraphs: [
          'Kapaksız LED kabinet; bakım erişimi ve yalın arka yapı ihtiyacının öne çıktığı sabit LED ekran uygulamalarında değerlendirilen üründür.',
        ],
        table: {
          headers: ['Koşul', 'Değerlendirme'],
          rows: [
            ['Arka erişim mümkün', 'Kapaksız yapı sıkça konuşulur'],
            ['Ön bakım zorunlu', 'Alternatif gövde yaklaşımları açılır'],
            ['Kalıcı duvar', 'CNC ile birlikte karşılaştırılır'],
            ['Servis sıklığı yüksek', 'Erişim planı kritikleşir'],
          ],
        },
      },
      {
        id: 'teklif',
        heading: 'Teklif öncesi',
        paragraphs: [
          'Yerleşim ve erişim yönü netleştirilmeden kapsam kilitlenmez. LEDKASA CNC ve kapaksız aileleri yan yana okur.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Bakım erişimi netse kapaksız kabinet doğru seçenek olabilir. Erişim notunuzu teklif formunda paylaşın.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Kapaksız kabinet her sabit işe uyar mı?',
        answer: 'Hayır. Erişim yönü ve montaj yüzeyi belirleyicidir.',
      },
      {
        question: 'CNC ile farkı nedir?',
        answer: 'Mimari ve erişim yaklaşımı farklıdır; proje girdilerine göre karşılaştırılır.',
      },
      {
        question: 'Ölçü kesin midir?',
        answer: 'Örnek föyler yönlendiricidir. Proje ölçüsü teklifte doğrulanır.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [{ name: 'Kapaksız LED Kabinet', url: '/urunler/led-ekran-kasalari/kapaksiz-led-kabinet/' }],
    ctaLabel: 'Kapaksız kabinet teklifi',
    ctaUrl: '/teklif-al/?urun=kapaksiz-led-kabinet',
  },
  {
    slug: 'showroom-dijital-yuzeyler',
    title: 'Showroom’da dijital yüzey nasıl planlanır?',
    excerpt: 'Showroom ekranı ürün hikâyesini taşır; kasa formu ile mekân akışı birlikte tasarlanmalıdır.',
    summary:
      'Showroom LED ekranı; ürün hikâyesi, ziyaretçi yolu ve kasa formu birlikte planlandığında güçlenir. Poster veya geniş duvar formatı senaryoya göre seçilir.',
    seoTitle: 'Showroom Dijital LED Yüzey Planlama | LEDKASA Blog',
    seoDescription: 'Showroom LED ekran ve kasa planlaması için pratik bir çerçeveyi LEDKASA Blog’da okuyun.',
    category: 'Perakende',
    publishedAt: '2026-02-07',
    image: images.retail,
    imageAlt: 'Perakende alanında dijital ekran yerleşimi',
    imageCaption: 'Showroom’da ekran boyutu kadar ziyaretçi yolu da planın parçasıdır.',
    sections: [
      {
        id: 'plan',
        heading: 'Mekân akışı + ekran',
        paragraphs: [
          'Showroom’da ekran boyutu kadar ziyaretçi yolu da önemlidir. Poster veya geniş duvar formatı, anlatılmak istenen ürüne göre seçilir.',
        ],
        table: {
          headers: ['Alan', 'Olası kasa yaklaşımı'],
          rows: [
            ['Karşılama duvarı', 'CNC / geniş sabit yüzey'],
            ['Ürün adası yanı', 'Poster LED kasa'],
            ['Vitrin hattı', 'Poster veya dikey format'],
            ['Demo noktası', 'Pitch ve mesafe birlikte okunur'],
          ],
        },
      },
      {
        id: 'katalog',
        heading: 'Katalogdan teklife',
        paragraphs: [
          'Uygulama alanı sayfalarını ve ürün kartlarını birlikte okumak karar süresini kısaltır. LEDKASA showroom girdilerinizle kapsamı netleştirir.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Dijital yüzey, showroom hikâyesinin parçasıdır. Mekân ölçünüzü teklif formunda paylaşarak doğru kasa ailesini seçebilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Showroom’da poster mi duvar mı?',
        answer: 'Ürün hikâyesi ve ziyaretçi yoluna göre değişir; ikisi de değerlendirilebilir.',
      },
      {
        question: 'Birden fazla ekran olur mu?',
        answer: 'Evet. Her nokta için ayrı senaryo ve bağlantı planı gerekir.',
      },
      {
        question: 'İçerik pitch’i etkiler mi?',
        answer: 'Yoğun metin ve yakın mesafe pitch değerlendirmesini güçlendirir.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [
      { name: 'Poster LED Kasa', url: '/urunler/led-ekran-kasalari/poster-led-kasa/' },
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
    ],
    ctaLabel: 'Showroom teklifi alın',
    ctaUrl: '/teklif-al/',
  },
  {
    slug: 'kurumsal-lobide-led-ekran',
    title: 'Kurumsal lobide LED ekran kasa seçimi',
    excerpt: 'Lobi ekranları marka karşılama alanıdır; sabit kasa ve düzenli bağlantı planı öne çıkar.',
    summary:
      'Kurumsal lobi LED ekranında CNC veya kapaksız kabinet aileleri sıkça karşılaştırılır. Görsel bütünlük, kablo gizliliği ve bakım erişimi birlikte konuşulur.',
    seoTitle: 'Kurumsal Lobi LED Ekran Kasa Seçimi | LEDKASA Blog',
    seoDescription:
      'Kurumsal lobi LED ekranlarında kasa seçimi için dikkat edilecekleri LEDKASA Blog’da keşfedin.',
    category: 'Kurumsal',
    publishedAt: '2026-02-15',
    image: images.cnc,
    imageAlt: 'Kurumsal sabit LED kasa yaklaşımı',
    imageCaption: 'Lobi ekranlarında sabit kurulum ve düzenli bağlantı gizliliği öne çıkar.',
    sections: [
      {
        id: 'lobi',
        heading: 'Kalıcı izlenim, sabit kurulum',
        paragraphs: [
          'Lobi ve resepsiyon alanlarında CNC veya kapaksız kabinet aileleri sıkça karşılaştırılır. Görsel bütünlük ve bakım erişimi birlikte konuşulur.',
        ],
        table: {
          headers: ['Öncelik', 'Kasa okuması'],
          rows: [
            ['Düzenli duvar yüzeyi', 'CNC değerlendirmesi'],
            ['Arka bakım erişimi', 'Kapaksız kabinet'],
            ['Kablo gizliliği', 'Hat rotası erken planlanır'],
            ['Marka alanı', 'Görsel bütünlük öncelenir'],
          ],
        },
      },
      {
        id: 'baglanti',
        heading: 'Bağlantı gizliliği',
        paragraphs: [
          'Kablo rotalarının görünürlüğü marka alanlarında ekstra önem taşır. Cat6 ve güç hatları mimariyle birlikte çizilmelidir.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Kurumsal lobi ekranı; kasa ve bağlantının birlikte planlandığı sabit bir yüzeyi gerektirir. Projenizi teklif formundan iletebilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Lobi için rental kabinet uygun mu?',
        answer: 'Kalıcı lobilerde sabit aileler daha sık değerlendirilir; geçici lansmanlarda rental açılabilir.',
      },
      {
        question: 'CNC mi kapaksız mı?',
        answer: 'Erişim yönü ve montaj yüzeyi belirler; ikisi teklifte karşılaştırılabilir.',
      },
      {
        question: 'Kablo gizliliği nasıl sağlanır?',
        answer: 'Hat rotası mimariyle erken planlanır; sonradan eklenmez.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
      { name: 'Kapaksız LED Kabinet', url: '/urunler/led-ekran-kasalari/kapaksiz-led-kabinet/' },
    ],
    ctaLabel: 'Lobi ekranı teklifi',
    ctaUrl: '/teklif-al/',
  },
  {
    slug: 'etkinlik-kurulum-kontrol-listesi',
    title: 'Etkinlik LED kurulum kontrol listesi',
    excerpt: 'Sahaya çıkmadan önce kabinet adedi, hatlar ve söküm planı tek listede toplanmalıdır.',
    summary:
      'Etkinlik LED kurulumunda kabinet adedi, hat mesafeleri, kurulum penceresi ve söküm sırası tek kontrol listesinde toplanmalıdır. Rental kabinet ve Cable Set birlikte okunur.',
    seoTitle: 'Etkinlik LED Kurulum Kontrol Listesi | LEDKASA Blog',
    seoDescription: 'Etkinlik LED ekran kurulumları için saha kontrol listesini LEDKASA Blog’da inceleyin.',
    category: 'Etkinlik',
    publishedAt: '2026-02-24',
    image: images.event,
    imageAlt: 'Etkinlik sahnesi LED ekran kurulumu',
    imageCaption: 'Sahaya çıkmadan önce kabinet, hat ve söküm planı tek listede toplanmalıdır.',
    sections: [
      {
        id: 'liste',
        heading: 'Sahaya çıkmadan önce',
        paragraphs: ['Kontrol listesi teklif formuna da yapıştırılabilir; böylece kapsam daha hızlı netleşir.'],
        bullets: [
          'Kabinet adedi ve yedek',
          'Güç / veri mesafeleri',
          'Kurulum penceresi',
          'Taşıma ve istifleme',
          'Söküm sırası',
        ],
        table: {
          headers: ['Madde', 'Kontrol'],
          rows: [
            ['Kabinet', 'Adet + yedek teyit'],
            ['Hatlar', 'Cat6 / güç uzunlukları'],
            ['Zaman', 'Kurulum ve söküm penceresi'],
            ['Lojistik', 'Taşıma yolu ve istifleme'],
          ],
        },
      },
      {
        id: 'sokum',
        heading: 'Söküm de planın parçası',
        paragraphs: [
          'Geçici işlerde söküm sırası kurulum kadar zaman alır. Rental kabinet ve Cable Set birlikte değerlendirilir.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Kontrol listesi; etkinlik LED kurulumunda sürprizi azaltır. Listenizi teklif formunda paylaşabilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Yedek kabinet şart mı?',
        answer: 'Riskli yayınlarda değerlendirilir; zorunluluk proje kritikliğiyle değişir.',
      },
      {
        question: 'Söküm neden ayrı satırda?',
        answer: 'Zaman ve hat yönetimi kurulumdan bağımsız planlanmalıdır.',
      },
      {
        question: 'Cable Set her etkinlikte aynı mı?',
        answer: 'Hayır. Mesafe ve kabinet adedine göre değişir.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [
      { name: 'Rental LED Kabinet', url: '/urunler/led-ekran-kasalari/rental-led-kabinet/' },
      { name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/' },
    ],
    ctaLabel: 'Etkinlik teklifi alın',
    ctaUrl: '/teklif-al/?urun=rental-led-kabinet',
  },
  {
    slug: 'teklif-oncesi-paylasilacak-bilgiler',
    title: 'Teklif öncesi paylaşılacak bilgiler',
    excerpt: 'Doğru girdiler; daha net kapsam demektir. Fiyat ve stok yayınlanmaz, proje bilgisiyle ilerlenir.',
    summary:
      'LED ekran kasa teklifi öncesinde kullanım alanı, yaklaşık ölçü, kurulum tipi ve pitch notu paylaşılmalıdır. LEDKASA kapsamı proje bilgisiyle netleştirir.',
    seoTitle: 'LED Teklif Öncesi Paylaşılacak Bilgiler | LEDKASA Blog',
    seoDescription:
      'LED ekran kasa teklifi öncesinde paylaşmanız gereken bilgileri LEDKASA Blog’da listeleyin.',
    category: 'Teklif',
    publishedAt: '2026-03-05',
    image: images.connect,
    imageAlt: 'Güç ve bağlantı ekipmanları kategorisi',
    imageCaption: 'Doğru girdiler; daha net teklif kapsamı demektir.',
    sections: [
      {
        id: 'minimum',
        heading: 'Minimum bilgi seti',
        paragraphs: ['Aşağıdaki başlıklar teklif formunu doldururken yol gösterir.'],
        bullets: [
          'Kullanım alanı ve ortam',
          'Yaklaşık ölçü / kabinet adedi',
          'Kurulum tipi',
          'Pitch veya modül notu (varsa)',
          'Güç / veri mesafesi',
        ],
        table: {
          headers: ['Bilgi', 'Neden?'],
          rows: [
            ['Ortam', 'Indoor/outdoor ailesini daraltır'],
            ['Ölçü', 'Kabinet adedini yönlendirir'],
            ['Kurulum tipi', 'Sabit / rental / poster ayrımı'],
            ['Hat mesafesi', 'Cable Set ve Cat6 kapsamı'],
          ],
        },
      },
      {
        id: 'neden',
        heading: 'Neden gerekli?',
        paragraphs: [
          'LEDKASA ürün kapsamını proje bilgisi olmadan kesinleştirmez. Bu şeffaflık, saha sürprizini azaltmak içindir.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Minimum bilgi seti teklifi hızlandırır. Formu doldurarak veya iletişim kanallarından bize ulaşabilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Tüm alanlar zorunlu mu?',
        answer: 'Ne kadar çok girdi, o kadar net kapsam. Eksik alanlar teklifte soru olarak döner.',
      },
      {
        question: 'Fiyat site üzerinde var mı?',
        answer: 'Hayır. LEDKASA fiyat ve stok yayınlamaz.',
      },
      {
        question: 'Hangi ürünü seçmeliyim?',
        answer: 'Emin değilseniz ürün alanını boş bırakıp senaryoyu yazmanız yeterlidir.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [{ name: 'Kasa karşılaştırma', url: '/urunler/kasa-karsilastirma/' }],
    ctaLabel: 'Teklif formunu doldurun',
    ctaUrl: '/teklif-al/',
  },
  {
    slug: 'modul-olcusu-kabinet-uyumu',
    title: 'Modül ölçüsü ve kabinet uyumu',
    excerpt: 'PCB ölçüsü ile kabinet boşluğu uyuşmazsa üretim ve montaj planı yeniden yazılır.',
    summary:
      'LED modül PCB ölçüsü ile kabinet boşluğu uyumu; vida düzeni ve pitch ailesiyle birlikte doğrulanmalıdır. Örnek föyler yönlendiricidir, proje modülü teklifte teyit edilir.',
    seoTitle: 'Modül Ölçüsü ve Kabinet Uyumu | LEDKASA Blog',
    seoDescription: 'LED modül ölçüsü ile kabinet uyumunu nasıl kontrol edeceğinizi LEDKASA Blog’da okuyun.',
    category: 'Teknik',
    publishedAt: '2026-03-14',
    image: images.workshop,
    imageAlt: 'LED modül ve elektronik montaj ortamı',
    imageCaption: 'PCB ölçüsü ile kabinet boşluğu yan yana okunmadan montaj planı kilitlenmez.',
    sections: [
      {
        id: 'uyum',
        heading: 'Ölçüleri yan yana koyun',
        paragraphs: [
          'Örneğin 320×160 mm suite gibi yaygın PCB ölçülerinde kabinet boşluğu ve vida düzeni doğrulanmalıdır.',
          'Doğrulanmış örnek föyler yönlendiricidir; proje modülü ayrıca teyit edilir.',
        ],
        table: {
          headers: ['Kontrol', 'Sonuç'],
          rows: [
            ['PCB ölçüsü', 'Kabinet boşluğuyla eşleşmeli'],
            ['Pitch ailesi', 'Modül–kasa uyumunu etkiler'],
            ['Vida düzeni', 'Montaj planını belirler'],
            ['Erişim yönü', 'Kabinet tipi seçimini açar'],
          ],
        },
      },
      {
        id: 'sonraki',
        heading: 'Sonraki adım',
        paragraphs: [
          'Uyum netleşince güç ve veri planına geçmek daha güvenlidir. CNC veya kapaksız aileler bu noktada netleşir.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Modül–kabinet uyumu teklifin teknik omurgasıdır. Modül notunuzu paylaşarak doğrulamayı hızlandırabilirsiniz.',
        ],
      },
    ],
    faqs: [
      {
        question: '320×160 her kasaya uyar mı?',
        answer: 'Yaygın bir ölçüdür ama vida düzeni ve boşluk her ailede teyit edilmelidir.',
      },
      {
        question: 'Datasheet yeterli midir?',
        answer: 'Yönlendiricidir. Proje modülü ayrıca doğrulanır.',
      },
      {
        question: 'Uyum yoksa ne olur?',
        answer: 'Üretim ve montaj planı yeniden yazılır; bu yüzden erken kontrol kritiktir.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
      { name: 'Kapaksız LED Kabinet', url: '/urunler/led-ekran-kasalari/kapaksiz-led-kabinet/' },
    ],
    ctaLabel: 'Uyum için teklif alın',
    ctaUrl: '/teklif-al/',
  },
  {
    slug: 'kasa-ve-baglantiyi-birlikte-planlamak',
    title: 'Kasa ve bağlantıyı birlikte planlamak',
    excerpt: 'LEDKASA yaklaşımının özeti: kasa, güç ve veri aynı proje çerçevesinde okunur.',
    summary:
      'LEDKASA yaklaşımı; LED ekran kasası ile güç ve veri bağlantılarını aynı proje çerçevesinde planlamaktır. Önce senaryo, sonra ürün ailesi, ardından teklif.',
    seoTitle: 'LED Kasa ve Bağlantıyı Birlikte Planlamak | LEDKASA Blog',
    seoDescription:
      'LED ekran kasa ile bağlantı ekipmanlarını aynı çerçevede planlama yaklaşımını LEDKASA Blog’da okuyun.',
    category: 'Yaklaşım',
    publishedAt: '2026-03-22',
    image: images.cabinets,
    imageAlt: 'LED ekran kasa ve sistem yaklaşımı',
    imageCaption: 'Kasa, güç ve veri aynı senaryoda okunduğunda teklif daha anlaşılır olur.',
    sections: [
      {
        id: 'yaklasim',
        heading: 'Parça listesi değil, sistem',
        paragraphs: [
          'Kabinet seçildikten sonra kabloları “sonradan eklemek” yerine, baştan aynı senaryoda ilerlemek teklifi anlaşılır kılar.',
        ],
        bullets: ['Senaryoyu seç', 'Kasa ailesini daralt', 'Bağlantıyı ekle', 'Teklifte netleştir'],
        table: {
          headers: ['Adım', 'Çıktı'],
          rows: [
            ['Senaryo', 'Sabit / rental / poster'],
            ['Kasa ailesi', 'CNC, kapaksız, rental, poster'],
            ['Bağlantı', 'Cat6, Power Plug, Flat, Cable Set'],
            ['Teklif', 'Proje özelinde kapsam'],
          ],
        },
      },
      {
        id: 'pratik',
        heading: 'Pratik yol',
        paragraphs: [
          'Önce uygulama alanı, sonra ürün ailesi, ardından teklif formu. Bilgi merkezi rehberleri bu zinciri destekler.',
        ],
      },
      {
        id: 'sonuc',
        heading: 'Sonuç',
        paragraphs: [
          'Birlikte planlama; saha sürprizini azaltır. Projenizi teklif formunda paylaşarak sistemi baştan kuralım.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Önce kasa mı kablo mu?',
        answer: 'Önce senaryo. Kasa ve bağlantı aynı çerçevede daraltılır.',
      },
      {
        question: 'Bilgi merkezi ile blog farkı nedir?',
        answer: 'Bilgi merkezi rehberleri; blog ise güncel SEO odaklı makale setidir. İkisi birbirini tamamlar.',
      },
      {
        question: 'Teklifte ne olur?',
        answer: 'Girdilerinize göre ürün ailesi ve bağlantı kapsamı netleştirilir; fiyat site üzerinde yayınlanmaz.',
      },
    ],
    relatedLinks: defaultRelated(),
    relatedProducts: [
      { name: 'Tüm ürünler', url: '/urunler/' },
      { name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/' },
    ],
    ctaLabel: 'Sistem teklifi alın',
    ctaUrl: '/teklif-al/',
  },
];

export const blogPageCount = Math.ceil(blogPosts.length / BLOG_PAGE_SIZE);

export function getBlogPage(page: number): BlogPost[] {
  const safePage = Math.min(Math.max(page, 1), blogPageCount);
  const start = (safePage - 1) * BLOG_PAGE_SIZE;
  return blogPosts.slice(start, start + BLOG_PAGE_SIZE);
}

export function blogCanonical(post: BlogPost): string {
  return `${siteUrl}/blog/${post.slug}/`;
}

export function blogListCanonical(page: number): string {
  return page <= 1 ? `${siteUrl}/blog/` : `${siteUrl}/blog/sayfa/${page}/`;
}

export function formatBlogDate(isoDate: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${isoDate}T12:00:00Z`));
}
