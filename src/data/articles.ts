import { siteUrl } from './site';

export interface ContentSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ApplicationArea {
  slug: 'etkinlik-ve-sahne' | 'magaza-ve-showroom' | 'kurumsal-ve-reklam';
  title: string;
  eyebrow: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  imageAlt: string;
  sections: ContentSection[];
  productLinks: { name: string; url: string; note: string }[];
}

export interface Article {
  slug:
    | 'led-ekran-kasasi-nasil-secilir'
    | 'rental-led-ekran-kurulum-rehberi'
    | 'poster-led-ekran-kullanim-alanlari'
    | 'led-ekran-kablolama-rehberi'
    | 'kasa-secimi-cnc-kapaksiz-rental-kabinet';
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  imageAlt: string;
  sections: ContentSection[];
  productLinks: { name: string; url: string }[];
}

export const applicationAreas: ApplicationArea[] = [
  {
    slug: 'etkinlik-ve-sahne',
    title: 'Etkinlik ve Sahne',
    eyebrow: 'Geçici ve değişken kurulumlar',
    summary:
      'Etkinlik, sahne ve organizasyon alanlarında kurulup sökülen LED ekranlar için kasa, güç ve veri bağlantılarını aynı sistem içinde değerlendirin.',
    seoTitle: 'Etkinlik ve Sahne LED Ekran Çözümleri | LEDKASA',
    seoDescription:
      'Etkinlik ve sahne LED ekranlarında rental kabinet, güç ve veri bağlantısı seçiminde dikkat edilmesi gerekenleri inceleyin.',
    image: '/assets/images/products/rental-led-kabinet.png',
    imageAlt: 'Etkinlik ve sahne uygulamalarına yönelik rental LED kabinet',
    sections: [
      {
        heading: 'Kurulum akışını bir bütün olarak ele alın',
        paragraphs: [
          'Geçici kurulumlarda ekran ölçüsü kadar montaj sırası, erişim yönü ve bağlantı düzeni de önem taşır. Kabinet seçimi, kurulum ekibinin sahadaki hareket planıyla birlikte değerlendirilmelidir.',
          'Rental kabinetler modüler ekran kurgularına yöneliktir. Proje değerlendirmesinde kurulacağı yüzey, ekran yerleşimi ve taşıma düzeni gibi kullanım koşulları netleştirilir.',
        ],
      },
      {
        heading: 'Güç ve veri yolunu önceden planlayın',
        paragraphs: [
          'Power Plug, Cat6 kablo ve Cable Set seçimi yalnızca parça listesi değildir; ekran yerleşimine uygun bir bağlantı akışının parçalarıdır.',
        ],
        bullets: ['Bağlantı noktalarının erişilebilirliği', 'Kabloların kurulum rotası', 'Söküm sırasında düzenli ayrıştırma'],
      },
    ],
    productLinks: [
      { name: 'Rental LED Kabinet', url: '/urunler/led-ekran-kasalari/rental-led-kabinet/', note: 'Modüler sahne ve etkinlik ekranları için.' },
      { name: 'Power Plug', url: '/urunler/guc-ve-baglanti-ekipmanlari/power-plug/', note: 'Güç bağlantısı kurgusu için.' },
      { name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/', note: 'Bağlantıları bir arada planlamak için.' },
    ],
  },
  {
    slug: 'magaza-ve-showroom',
    title: 'Mağaza ve Showroom',
    eyebrow: 'Dikey ve sabit dijital iletişim',
    summary:
      'Ürün, kampanya ve marka içeriklerini sergileyen alanlar için poster LED kasa ve sabit ekran seçeneklerini kullanım senaryosuna göre planlayın.',
    seoTitle: 'Mağaza ve Showroom LED Ekran Çözümleri | LEDKASA',
    seoDescription:
      'Mağaza, showroom ve karşılama alanları için poster LED kasa ve bağlantı ekipmanı seçeneklerini keşfedin.',
    image: '/assets/images/products/poster-led-kasa.png',
    imageAlt: 'Mağaza ve showroom uygulamalarına yönelik poster LED kasa',
    sections: [
      {
        heading: 'Ekranı mekânın dolaşımına yerleştirin',
        paragraphs: [
          'Poster ekranlar giriş, vitrin, ürün alanı ve fuaye gibi dikey iletişimin öne çıktığı noktalarda değerlendirilebilir. Görüş mesafesi, içerik yönü ve ekranın çevresindeki hareket alanı yerleşim kararını etkiler.',
          'Katlanabilir poster kasa seçeneği, ekranın farklı kullanım noktaları arasında değerlendirilmesinin planlandığı projelerde ele alınabilir.',
        ],
      },
      {
        heading: 'Kasa ve içerik formatını birlikte düşünün',
        paragraphs: [
          'Dikey içerik için ayrılan alan ile kasa formunun uyumu, ekranın mekân içinde bütünlüklü görünmesine yardımcı olur. Sabit bir duvar uygulaması düşünülüyorsa CNC veya kapaksız kabinet seçenekleri ayrıca karşılaştırılabilir.',
        ],
      },
    ],
    productLinks: [
      { name: 'Poster LED Kasa', url: '/urunler/led-ekran-kasalari/poster-led-kasa/', note: 'Dikey ekran uygulamaları için.' },
      { name: 'Katlanabilir Poster LED Kasa', url: '/urunler/led-ekran-kasalari/katlanabilir-poster-led-kasa/', note: 'Değişken yerleşim senaryoları için.' },
      { name: 'Flat Kablo', url: '/urunler/guc-ve-baglanti-ekipmanlari/flat-kablo/', note: 'Modül bağlantı düzeni için.' },
    ],
  },
  {
    slug: 'kurumsal-ve-reklam',
    title: 'Kurumsal ve Reklam',
    eyebrow: 'Kalıcı ekran yerleşimleri',
    summary:
      'Kurumsal iletişim ve reklam ekranlarında kasa yapısını, erişim ihtiyacını ve bağlantı altyapısını proje koşullarına göre birlikte değerlendirin.',
    seoTitle: 'Kurumsal ve Reklam LED Ekran Çözümleri | LEDKASA',
    seoDescription:
      'Kurumsal alanlar ve reklam uygulamaları için CNC LED kasa, kapaksız kabinet ve bağlantı çözümlerini inceleyin.',
    image: '/assets/images/products/cnc-led-kasa.png',
    imageAlt: 'Kurumsal ve reklam uygulamalarına yönelik CNC LED kasa',
    sections: [
      {
        heading: 'Sabit kurulum koşullarını netleştirin',
        paragraphs: [
          'Kurumsal alan, toplantı bölümü, karşılama noktası veya reklam yüzeyi için planlanan LED ekranda montaj yüzeyi ve erişim yönü kasa seçiminin temel girdileridir.',
          'CNC kasa ve kapaksız kabinet seçenekleri, projenin yerleşim ve erişim ihtiyacına göre ayrı ayrı değerlendirilir.',
        ],
      },
      {
        heading: 'Bağlantı düzenini proje ölçeğine uyarlayın',
        paragraphs: [
          'Veri ve güç bağlantılarının ekran mimarisiyle birlikte planlanması, kurulum öncesinde daha açık bir parça listesi oluşturulmasına yardımcı olur.',
        ],
        bullets: ['Kasa formu ve montaj yüzeyi', 'Bakım erişim yönü', 'Güç ve veri kablosu rotaları'],
      },
    ],
    productLinks: [
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/', note: 'Sabit ekran projeleri için.' },
      { name: 'Kapaksız LED Kabinet', url: '/urunler/led-ekran-kasalari/kapaksiz-led-kabinet/', note: 'Yalın ve erişilebilir kasa yapısı için.' },
      { name: 'Cat6 Kablo', url: '/urunler/guc-ve-baglanti-ekipmanlari/cat6-kablo/', note: 'Veri bağlantısı planı için.' },
    ],
  },
];

export const articles: Article[] = [
  {
    slug: 'led-ekran-kasasi-nasil-secilir',
    title: 'LED Ekran Kasası Nasıl Seçilir?',
    excerpt: 'Kullanım alanı, kurulum biçimi, erişim yönü ve bağlantı düzeni üzerinden doğru kasa ailesini belirlemek için pratik bir çerçeve.',
    seoTitle: 'LED Ekran Kasası Nasıl Seçilir? | LEDKASA',
    seoDescription: 'LED ekran kasası seçerken kullanım alanı, sabit veya rental kurulum, erişim ve bağlantı planında dikkat edilecek noktalar.',
    image: '/assets/images/categories/led-ekran-kasalari.png',
    imageAlt: 'Farklı kullanım senaryolarına yönelik LED ekran kasaları',
    sections: [
      {
        heading: 'Önce kullanım senaryosunu tanımlayın',
        paragraphs: [
          'Kasa seçimi ürün adından önce ekranın nerede ve nasıl kullanılacağıyla başlar. Sabit bir kurulum ile sık kurulup sökülen bir etkinlik ekranı aynı önceliklere sahip değildir.',
          'Mekân, ekranın yaklaşık yerleşimi, montaj yüzeyi ve kurulum sıklığı teklif öncesinde paylaşılırsa ürün ailesi daha doğru daraltılabilir.',
        ],
        bullets: ['Sabit veya geçici kurulum', 'Dikey poster ya da geniş ekran formu', 'Önden veya arkadan erişim ihtiyacı'],
      },
      {
        heading: 'Kasa ailesini kurulum tipine göre karşılaştırın',
        paragraphs: [
          'CNC ve kapaksız kabinet seçenekleri sabit yerleşimler için değerlendirilebilir. Rental kabinet modüler etkinlik kurgularına, poster kasalar ise dikey içerik senaryolarına odaklanır.',
          'Tek bir ürün ailesi her proje için varsayılan değildir. Montaj, taşıma ve erişim ihtiyaçları birlikte ele alınmalıdır.',
        ],
      },
      {
        heading: 'Bağlantı ekipmanlarını sonradan eklemeyin',
        paragraphs: [
          'Cat6, güç bağlantıları, flat kablolar ve kablo seti; ekranın modül ve kabinet düzeniyle birlikte planlandığında teklif kapsamı daha anlaşılır olur.',
        ],
      },
    ],
    productLinks: [
      { name: 'LED Ekran Kasaları', url: '/urunler/led-ekran-kasalari/' },
      { name: 'Güç ve Bağlantı Ekipmanları', url: '/urunler/guc-ve-baglanti-ekipmanlari/' },
    ],
  },
  {
    slug: 'rental-led-ekran-kurulum-rehberi',
    title: 'Rental LED Ekran Kurulum Rehberi',
    excerpt: 'Rental kabinetlerle oluşturulan geçici ekranlarda yerleşim, bağlantı sırası ve kurulum akışını teklif öncesinde planlayın.',
    seoTitle: 'Rental LED Ekran Kurulum Rehberi | LEDKASA',
    seoDescription: 'Rental LED ekran kurulumunda kabinet yerleşimi, güç ve veri bağlantı düzeni için planlama adımlarını inceleyin.',
    image: '/assets/images/products/rental-led-kabinet.png',
    imageAlt: 'Rental LED ekran kurulumunda kullanılan modüler kabinet',
    sections: [
      {
        heading: 'Ekran yerleşimini kurulumdan önce tarif edin',
        paragraphs: [
          'Ekranın genişlik ve yükseklik yönündeki yerleşimi, kullanılacak kabinet sayısını ve bağlantı rotalarını etkiler. Proje alanının koşulları uzman kurulum ekipleriyle değerlendirilmelidir.',
          'LEDKASA ürün değerlendirmesi; talep edilen kasa ve bağlantı ekipmanlarının proje bilgileriyle eşleştirilmesine odaklanır.',
        ],
      },
      {
        heading: 'Kurulum sırasını sadeleştirin',
        paragraphs: ['Kabinetlerin, güç bağlantılarının ve veri kablolarının hangi sırayla ele alınacağını önceden not etmek saha iletişimini kolaylaştırır.'],
        bullets: ['Kabinet yerleşim sırasını belirleyin', 'Güç ve veri rotalarını ayırın', 'Kablo etiketleme yaklaşımını kararlaştırın'],
      },
      {
        heading: 'Söküm planını da kurulum kapsamına alın',
        paragraphs: ['Geçici ekranlarda bağlantıların düzenli ayrıştırılması ve parçaların bir sonraki kullanıma hazırlanması, ekipman planının doğal bir parçasıdır.'],
      },
    ],
    productLinks: [
      { name: 'Rental LED Kabinet', url: '/urunler/led-ekran-kasalari/rental-led-kabinet/' },
      { name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/' },
    ],
  },
  {
    slug: 'poster-led-ekran-kullanim-alanlari',
    title: 'Poster LED Ekran Kullanım Alanları',
    excerpt: 'Dikey poster ekranları mağaza, showroom, karşılama ve kurumsal iletişim noktalarında konumlandırırken dikkate alınacak başlıklar.',
    seoTitle: 'Poster LED Ekran Kullanım Alanları | LEDKASA',
    seoDescription: 'Poster LED ekranların mağaza, showroom, fuaye ve kurumsal alanlardaki kullanım senaryolarını keşfedin.',
    image: '/assets/images/products/katlanabilir-poster-led-kasa.png',
    imageAlt: 'Dikey iletişim alanları için katlanabilir poster LED kasa',
    sections: [
      {
        heading: 'Dikey içeriğin öne çıktığı noktalar',
        paragraphs: ['Poster LED ekranlar, dikey görsel ve mesajların mekân içinde ayrılmış bir yüzeyde sunulması gereken senaryolarda değerlendirilebilir.'],
        bullets: ['Mağaza girişleri ve ürün alanları', 'Showroom ve fuaye noktaları', 'Kurumsal karşılama alanları'],
      },
      {
        heading: 'Sabit ve katlanabilir seçenekleri ayırın',
        paragraphs: ['Ekran aynı noktada kalacaksa poster kasa, farklı yerleşimlerin planlandığı senaryolarda ise katlanabilir poster kasa değerlendirmeye alınabilir. Nihai seçim, kullanım ve montaj koşullarına göre yapılır.'],
      },
      {
        heading: 'Yerleşim kararını içerikle birlikte verin',
        paragraphs: ['İçeriğin okunacağı mesafe, ekran çevresindeki yaya akışı ve enerji bağlantısına erişim, kasa seçiminin yanı sıra mekân planını da etkiler.'],
      },
    ],
    productLinks: [
      { name: 'Poster LED Kasa', url: '/urunler/led-ekran-kasalari/poster-led-kasa/' },
      { name: 'Katlanabilir Poster LED Kasa', url: '/urunler/led-ekran-kasalari/katlanabilir-poster-led-kasa/' },
    ],
  },
  {
    slug: 'led-ekran-kablolama-rehberi',
    title: 'LED Ekran Kablolama Rehberi',
    excerpt: 'LED ekran sistemlerinde güç, veri ve modül bağlantılarını proje yerleşimiyle birlikte ele almak için temel planlama adımları.',
    seoTitle: 'LED Ekran Kablolama Rehberi | LEDKASA',
    seoDescription: 'LED ekran kablolamasında Cat6, Power Plug, flat kablo ve Cable Set seçimlerini planlama yaklaşımıyla inceleyin.',
    image: '/assets/images/categories/guc-ve-baglanti-ekipmanlari.png',
    imageAlt: 'LED ekran güç ve veri bağlantı ekipmanları',
    sections: [
      {
        heading: 'Bağlantıları işlevine göre ayırın',
        paragraphs: ['Veri, güç ve modül içi bağlantılar farklı görevler üstlenir. Ürün listesi hazırlanırken her bağlantının ekran düzenindeki yeri ayrı olarak tarif edilmelidir.'],
        bullets: ['Cat6 ile veri bağlantısı', 'Power Plug ile güç bağlantısı', 'Flat kablo ile modül bağlantısı'],
      },
      {
        heading: 'Kablo rotasını kabinet düzeniyle eşleştirin',
        paragraphs: ['Kablo uzunluğu ve bağlantı noktası kararları, ekran yerleşimi kesinleşmeden varsayılmamalıdır. Kasa yapısı, erişim yönü ve kabinet sıralaması bağlantı planına girdi sağlar.'],
      },
      {
        heading: 'Set kapsamını teklif öncesinde netleştirin',
        paragraphs: ['Cable Set, birden fazla bağlantı ihtiyacının proje kapsamında birlikte değerlendirilmesine yardımcı olur. Set içeriği ve uyumluluk, paylaşılan proje bilgilerine göre teklif aşamasında netleştirilir.'],
      },
    ],
    productLinks: [
      { name: 'Cat6 Kablo', url: '/urunler/guc-ve-baglanti-ekipmanlari/cat6-kablo/' },
      { name: 'Power Plug', url: '/urunler/guc-ve-baglanti-ekipmanlari/power-plug/' },
      { name: 'Flat Kablo', url: '/urunler/guc-ve-baglanti-ekipmanlari/flat-kablo/' },
      { name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/' },
    ],
  },
  {
    slug: 'kasa-secimi-cnc-kapaksiz-rental-kabinet',
    title: 'CNC, Kapaksız ve Rental Kabinet Karşılaştırması',
    excerpt: 'Üç kasa yaklaşımını sabit kurulum, erişim ve geçici kullanım eksenlerinde karşılaştırarak başlangıç seçiminizi daraltın.',
    seoTitle: 'CNC, Kapaksız ve Rental Kabinet Karşılaştırması | LEDKASA',
    seoDescription: 'CNC LED kasa, kapaksız LED kabinet ve rental LED kabinet arasındaki kullanım odaklı farkları karşılaştırın.',
    image: '/assets/images/products/kapaksiz-led-kabinet.png',
    imageAlt: 'CNC, kapaksız ve rental LED kabinet seçimlerini temsil eden kasa',
    sections: [
      {
        heading: 'CNC LED kasa ne zaman değerlendirilir?',
        paragraphs: ['CNC LED kasa, sabit ekran yerleşimleri ve düzenli bir kasa mimarisi aranan projelerde değerlendirilebilir. Montaj yüzeyi ve erişim koşulları seçimden önce paylaşılmalıdır.'],
      },
      {
        heading: 'Kapaksız kabinet neyi öne çıkarır?',
        paragraphs: ['Kapaksız kabinet, yalın kasa yapısı ve proje yerleşimine göre erişim yaklaşımının öne çıktığı sabit uygulamalarda seçenek oluşturur.'],
      },
      {
        heading: 'Rental kabinet hangi senaryoya yöneliktir?',
        paragraphs: ['Rental kabinet, etkinlik ve sahne gibi modüler, geçici kurulum kurgularında ele alınır. Kurulum ve söküm akışı kararın önemli bir parçasıdır.'],
      },
      {
        heading: 'Karşılaştırmayı proje bilgileriyle tamamlayın',
        paragraphs: ['Kullanım alanı, kurulum sıklığı, erişim yönü ve bağlantı düzeni birlikte değerlendirilmeden yalnızca ürün adına göre karar verilmemelidir.'],
      },
    ],
    productLinks: [
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
      { name: 'Kapaksız LED Kabinet', url: '/urunler/led-ekran-kasalari/kapaksiz-led-kabinet/' },
      { name: 'Rental LED Kabinet', url: '/urunler/led-ekran-kasalari/rental-led-kabinet/' },
    ],
  },
];

export const faqItems = [
  {
    question: 'Hangi LED ekran kasası projem için uygun?',
    answer: 'Kullanım alanı, sabit veya geçici kurulum, ekran formu ve erişim ihtiyacı birlikte değerlendirilir. Proje bilgilerinizi teklif formunda paylaşarak uygun ürün ailesini daraltabilirsiniz.',
  },
  {
    question: 'Ürünlerde standart fiyat yayınlanıyor mu?',
    answer: 'Hayır. Ürün kapsamı ve uyumluluk proje ayrıntılarına göre değişebildiği için fiyatlandırma teklif aşamasında hazırlanır.',
  },
  {
    question: 'Kasa ve bağlantı ekipmanları birlikte tekliflendirilebilir mi?',
    answer: 'Evet. İhtiyacınıza göre kasa, Cat6, güç bağlantısı, flat kablo ve kablo seti aynı talep içinde değerlendirilebilir.',
  },
  {
    question: 'Rental kabinet ile sabit kasa arasındaki temel fark nedir?',
    answer: 'Rental kabinet geçici ve modüler kurulum senaryolarına yöneliktir. CNC ve kapaksız kasa seçenekleri ise sabit yerleşim koşullarına göre değerlendirilebilir.',
  },
  {
    question: 'Poster LED kasa nerelerde kullanılabilir?',
    answer: 'Poster kasalar mağaza, showroom, fuaye ve kurumsal karşılama alanları gibi dikey içeriğin öne çıktığı noktalarda değerlendirilebilir.',
  },
  {
    question: 'Teklif istemek için hangi bilgiler gerekir?',
    answer: 'Ürün veya kullanım alanı, tahmini proje kapsamı, kurulum biçimi ve varsa bağlantı ekipmanı ihtiyacınızı paylaşmanız başlangıç için yeterlidir.',
  },
  {
    question: 'Teknik uyumluluk nasıl netleştirilir?',
    answer: 'Kullanılacak sistemin ve proje yerleşiminin bilgileri incelendikten sonra ürün kapsamı teklif aşamasında netleştirilir.',
  },
  {
    question: 'LEDKASA ile nasıl iletişim kurabilirim?',
    answer: 'Teklif formunu kullanabilir veya info@ledkasa.com.tr adresine proje özetinizi gönderebilirsiniz.',
  },
] as const;

export const articleCanonical = (article: Article) => `${siteUrl}/bilgi-merkezi/${article.slug}/`;
