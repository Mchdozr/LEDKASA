import { siteUrl } from './site';

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  publishedAt: string;
  image: string;
  imageAlt: string;
  sections: BlogSection[];
  relatedProducts: { name: string; url: string }[];
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

export const blogPosts: BlogPost[] = [
  {
    slug: 'led-kasa-seciminde-ilk-sorular',
    title: 'LED kasa seçiminde ilk sorular neler olmalı?',
    excerpt: 'Model adından önce kullanım alanı, kurulum biçimi ve erişim yönünü netleştirmek teklif sürecini hızlandırır.',
    seoTitle: 'LED Kasa Seçiminde İlk Sorular | LEDKASA Blog',
    seoDescription: 'LED ekran kasası seçimine başlarken sorulması gereken temel soruları ve proje girdilerini LEDKASA Blog’da okuyun.',
    category: 'Seçim Rehberi',
    publishedAt: '2025-11-04',
    image: images.cabinets,
    imageAlt: 'LED ekran kasa ailesine genel bakış',
    sections: [
      {
        heading: 'Önce senaryoyu yazın',
        paragraphs: [
          'LED kasa seçimi, ürün adını ezberlemekten çok projenin nerede ve nasıl kurulacağını anlamaya bağlıdır. Sabit duvar, rental sahne veya dikey poster ihtiyacı aynı katalogdan farklı ailelere yönlendirir.',
          'İlk turda ekranın yaklaşık ölçüleri, görüş mesafesi ve montaj yüzeyi gibi girdiler paylaşıldığında ürün ailesi daha hızlı daraltılır.',
        ],
        bullets: ['Sabit mi, geçici mi?', 'İç mekân mı, dış mekân mı?', 'Önden mi arkadan mı erişim?'],
      },
      {
        heading: 'Kasa ve bağlantıyı birlikte düşünün',
        paragraphs: [
          'Kabinet kararı güç ve veri hatlarından bağımsız ele alındığında saha sürprizi artar. Cat6, Power Plug ve Cable Set gibi parçalar aynı proje çerçevesinde planlanmalıdır.',
        ],
      },
    ],
    relatedProducts: [
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
      { name: 'Rental LED Kabinet', url: '/urunler/led-ekran-kasalari/rental-led-kabinet/' },
    ],
  },
  {
    slug: 'sabit-kurulumda-cnc-led-kasa',
    title: 'Sabit kurulumda CNC LED kasa ne zaman öne çıkar?',
    excerpt: 'Kalıcı ekran yüzeylerinde düzenli birleşim, pitch uyumu ve montaj yüzeyi CNC kasa değerlendirmesinin merkezindedir.',
    seoTitle: 'Sabit Kurulumda CNC LED Kasa | LEDKASA Blog',
    seoDescription: 'Sabit LED ekran projelerinde CNC LED kasanın hangi koşullarda değerlendirildiğini LEDKASA Blog yazısında inceleyin.',
    category: 'Ürün Ailesi',
    publishedAt: '2025-11-12',
    image: images.cnc,
    imageAlt: 'CNC LED kasa ürün görseli',
    sections: [
      {
        heading: 'Kalıcı yüzey, düzenli kabin mimarisi',
        paragraphs: [
          'CNC LED kasa; sabit kurumsal ekran ve uzun ömürlü duvar uygulamalarında düzenli kabin mimarisi arayan projelerde değerlendirilir.',
          'Pitch, modül ölçüsü ve montaj yüzeyi netleşmeden kesin ölçü veya stok ifadesi kullanılmaz; kapsam teklifte oluşur.',
        ],
      },
      {
        heading: 'Teklif öncesi netleştirilecekler',
        paragraphs: ['Proje ekibiyle şu girdiler paylaşılırsa değerlendirme hızlanır.'],
        bullets: ['Ekran en × boy', 'Modül pitch ailesi', 'Duvar / iskelet tipi', 'Bakım erişim yönü'],
      },
    ],
    relatedProducts: [{ name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' }],
  },
  {
    slug: 'rental-kabinet-sahne-planlama',
    title: 'Rental kabinet ile sahne planlaması nasıl yapılır?',
    excerpt: 'Kurulum-söküm penceresi, taşıma düzeni ve hat uzunlukları rental kabinet projesinin omurgasıdır.',
    seoTitle: 'Rental Kabinet ile Sahne Planlaması | LEDKASA Blog',
    seoDescription: 'Etkinlik ve sahne LED ekranlarında rental kabinet planlaması için pratik çerçeveyi LEDKASA Blog’da okuyun.',
    category: 'Etkinlik',
    publishedAt: '2025-11-20',
    image: images.rental,
    imageAlt: 'Rental LED kabinet ürün görseli',
    sections: [
      {
        heading: 'Modüler kurulum akışı',
        paragraphs: [
          'Rental kabinetler geçici ekranlarda hız ve tekrar kurulabilirlik için tercih edilir. Kabinet adedi kadar sahadaki hareket alanı da kritiktir.',
        ],
      },
      {
        heading: 'Bağlantı rotasını önceden çizin',
        paragraphs: [
          'Güç ve veri hatlarının kontrol noktasına uzaklığı, söküm sırasında kablo yönetimini doğrudan etkiler. Cable Set kapsamı bu yüzden proje özelinde netleşir.',
        ],
        bullets: ['Kurulum / söküm süresi', 'İstifleme ve taşıma', 'Güç kaynağı mesafesi'],
      },
    ],
    relatedProducts: [
      { name: 'Rental LED Kabinet', url: '/urunler/led-ekran-kasalari/rental-led-kabinet/' },
      { name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/' },
    ],
  },
  {
    slug: 'poster-led-kasa-magaza-yerlesimi',
    title: 'Poster LED kasa mağaza yerleşiminde nelere bakılır?',
    excerpt: 'Dikey format, vitrin derinliği ve içerik oranı poster kasa kararını şekillendirir.',
    seoTitle: 'Poster LED Kasa Mağaza Yerleşimi | LEDKASA Blog',
    seoDescription: 'Mağaza ve showroom’da poster LED kasa yerleşimi için dikkat edilecek noktaları LEDKASA Blog’da keşfedin.',
    category: 'Perakende',
    publishedAt: '2025-11-28',
    image: images.poster,
    imageAlt: 'Poster LED kasa ürün görseli',
    sections: [
      {
        heading: 'Dikey yüzey, mekân ölçüsü',
        paragraphs: [
          'Poster LED kasa; mağaza girişi, vitrin yanı ve karşılama alanlarında dikey iletişim ihtiyacı olduğunda değerlendirilir.',
          'Örnek gövde ölçüleri katalogda paylaşılır; nihai ölçü ve pitch teklifte doğrulanır.',
        ],
      },
      {
        heading: 'İçerik ve görüş mesafesi',
        paragraphs: ['Yerleşim kararı, izleyicinin ortalama duruş mesafesiyle birlikte okunmalıdır.'],
      },
    ],
    relatedProducts: [{ name: 'Poster LED Kasa', url: '/urunler/led-ekran-kasalari/poster-led-kasa/' }],
  },
  {
    slug: 'katlanabilir-poster-kasa-ne-zaman',
    title: 'Katlanabilir poster kasa ne zaman tercih edilir?',
    excerpt: 'Taşıma, yeniden kurulum ve braket akışı öne çıktığında katlanabilir gövde seçenekleri masaya gelir.',
    seoTitle: 'Katlanabilir Poster LED Kasa Ne Zaman? | LEDKASA Blog',
    seoDescription: 'Katlanabilir poster LED kasanın hangi proje koşullarında değerlendirildiğini LEDKASA Blog yazısında öğrenin.',
    category: 'Ürün Ailesi',
    publishedAt: '2025-12-05',
    image: images.fold,
    imageAlt: 'Katlanabilir poster LED kasa',
    sections: [
      {
        heading: 'Taşınabilir dikey iletişim',
        paragraphs: [
          'Katlanabilir poster kasa; sık yer değiştiren veya depolama alanı sınırlı projelerde değerlendirilir. Ön bakımlı gövde yaklaşımı bakım planını etkiler.',
        ],
      },
      {
        heading: 'Teklifte netleşenler',
        paragraphs: ['Taşıma formu, yerleşim adedi ve hat düzeni proje özelinde belirlenir.'],
      },
    ],
    relatedProducts: [
      { name: 'Katlanabilir Poster LED Kasa', url: '/urunler/led-ekran-kasalari/katlanabilir-poster-led-kasa/' },
    ],
  },
  {
    slug: 'pitch-ve-goruntu-mesafesi',
    title: 'Pitch ve görüş mesafesi nasıl birlikte okunur?',
    excerpt: 'Piksel aralığı tek başına karar vermez; izleme mesafesi ve içerik tipi ile birlikte değerlendirilir.',
    seoTitle: 'LED Pitch ve Görüş Mesafesi | LEDKASA Blog',
    seoDescription: 'LED ekran pitch değeri ile görüş mesafesini birlikte nasıl okuyacağınızı LEDKASA Blog’da öğrenin.',
    category: 'Teknik',
    publishedAt: '2025-12-12',
    image: images.workshop,
    imageAlt: 'Elektronik atölyesinde LED modül çalışması',
    sections: [
      {
        heading: 'Pitch bir başlangıç noktasıdır',
        paragraphs: [
          'Daha küçük pitch yakın mesafede daha yumuşak görüntü sağlar; ancak kasa ölçüsü, bütçe ve ortam ışığı da denkleme girer.',
          'Katalogdaki örnek pitch listeleri yönlendiricidir; kullanılan modül modeli teklifte doğrulanır.',
        ],
      },
      {
        heading: 'Kasa uyumu',
        paragraphs: ['Modül PCB ölçüsü ile kabinet boşluğu uyuşmazsa sahada sürpriz çıkar. Bu yüzden pitch kararı kasa ailesinden bağımsız verilmemelidir.'],
      },
    ],
    relatedProducts: [
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
      { name: 'Kapaksız LED Kabinet', url: '/urunler/led-ekran-kasalari/kapaksiz-led-kabinet/' },
    ],
  },
  {
    slug: 'led-ekran-guc-dagitimi',
    title: 'LED ekran güç dağıtımı için temel planlama',
    excerpt: 'PSU seçimi, hat kesiti ve konektör tipi; ekranın parlaklık profili ve kabinet düzenine göre şekillenir.',
    seoTitle: 'LED Ekran Güç Dağıtımı Planlama | LEDKASA Blog',
    seoDescription: 'LED ekran güç dağıtımında dikkat edilecek temel planlama başlıklarını LEDKASA Blog’da okuyun.',
    category: 'Bağlantı',
    publishedAt: '2025-12-18',
    image: images.power,
    imageAlt: 'LED ekran güç bağlantısı için power plug',
    sections: [
      {
        heading: 'Güç, kasanın devamıdır',
        paragraphs: [
          'Güç planı kabinet yerleşiminden sonra değil, onunla birlikte düşünülmelidir. Örnek föylerdeki PSU değerleri konfigürasyon örneğidir; gerçek tüketim projeye göre hesaplanır.',
        ],
      },
      {
        heading: 'Power Plug’un rolü',
        paragraphs: ['Power Plug, sistem kurgusuna uygun güç bağlantısı için değerlendirilir. Adet ve konektör tipi teklifte netleşir.'],
      },
    ],
    relatedProducts: [
      { name: 'Power Plug', url: '/urunler/guc-ve-baglanti-ekipmanlari/power-plug/' },
      { name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/' },
    ],
  },
  {
    slug: 'cat6-veri-hatti-ipuclari',
    title: 'Cat6 veri hattı için pratik ipuçları',
    excerpt: 'Receiving card rotası, etiketleme ve hat uzunluğu veri hattı kalitesini doğrudan etkiler.',
    seoTitle: 'LED Ekran Cat6 Veri Hattı İpuçları | LEDKASA Blog',
    seoDescription: 'LED ekran projelerinde Cat6 veri hattı planlaması için pratik ipuçlarını LEDKASA Blog’da inceleyin.',
    category: 'Bağlantı',
    publishedAt: '2025-12-26',
    image: images.cat6,
    imageAlt: 'Cat6 kablo ürün görseli',
    sections: [
      {
        heading: 'Veri yolu görünür olsun',
        paragraphs: [
          'Cat6 hatları receiving card düzenine göre planlanır. Etiketleme ve rota, kurulum ekibinin saha hızını artırır.',
        ],
        bullets: ['Kontrol noktası mesafesi', 'Yedek hat ihtiyacı', 'Etiketleme standardı'],
      },
      {
        heading: 'Teklifte paylaşılacaklar',
        paragraphs: ['Ekran yerleşim şeması ve kart düzeni paylaşıldığında uzunluk ve adet daha doğru konuşulur.'],
      },
    ],
    relatedProducts: [{ name: 'Cat6 Kablo', url: '/urunler/guc-ve-baglanti-ekipmanlari/cat6-kablo/' }],
  },
  {
    slug: 'flat-kablo-duzeni',
    title: 'Flat kablo düzeni neden önemlidir?',
    excerpt: 'Panel içi bağlantılarda düzenli yerleşim, bakım erişimini ve görsel bütünlüğü destekler.',
    seoTitle: 'LED Flat Kablo Düzeni | LEDKASA Blog',
    seoDescription: 'LED ekran flat kablo düzeninin neden önemli olduğunu ve nasıl planlandığını LEDKASA Blog’da okuyun.',
    category: 'Bağlantı',
    publishedAt: '2026-01-06',
    image: images.flat,
    imageAlt: 'Flat kablo ürün görseli',
    sections: [
      {
        heading: 'Düzenli panel içi hatlar',
        paragraphs: [
          'Flat kablo; modül–kart bağlantılarında düzenli yerleşim ihtiyacı olan projelerde değerlendirilir. Pin yapısı kullanılan modül ailesine göre değişir.',
        ],
      },
      {
        heading: 'Bakım erişimi',
        paragraphs: ['Düzensiz kablo demetleri bakım süresini uzatır. Kabinet formu ile flat kablo adedi birlikte planlanmalıdır.'],
      },
    ],
    relatedProducts: [{ name: 'Flat Kablo', url: '/urunler/guc-ve-baglanti-ekipmanlari/flat-kablo/' }],
  },
  {
    slug: 'cable-set-proje-kapsami',
    title: 'Cable Set kapsamı projeye göre nasıl okunur?',
    excerpt: 'Set çözümü tek paket gibi görünse de içerik; güç, veri ve modül bağlantı ihtiyaçlarına göre değişir.',
    seoTitle: 'LED Cable Set Proje Kapsamı | LEDKASA Blog',
    seoDescription: 'LED ekran Cable Set kapsamının proje bilgilerine göre nasıl netleştiğini LEDKASA Blog’da öğrenin.',
    category: 'Bağlantı',
    publishedAt: '2026-01-14',
    image: images.cable,
    imageAlt: 'Cable set ürün görseli',
    sections: [
      {
        heading: 'Birlikte planlanan bağlantılar',
        paragraphs: [
          'Cable Set; güç, veri ve panel bağlantılarını aynı teklif çerçevesinde konuşmak için kullanılır. İçerik proje ölçüsüne göre belirlenir.',
        ],
      },
      {
        heading: 'Ne paylaşmalısınız?',
        paragraphs: ['Kabinet adedi, hat mesafeleri ve kontrol noktası bilgisi set içeriğini netleştirir.'],
      },
    ],
    relatedProducts: [{ name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/' }],
  },
  {
    slug: 'indoor-outdoor-kasa-farki',
    title: 'Indoor ve outdoor kasa farkı teklifi nasıl etkiler?',
    excerpt: 'Ortam koşulları; gövde, sızdırmazlık yaklaşımı ve güç planını değiştirir. Kesin iddia yerine proje girdileriyle ilerlenir.',
    seoTitle: 'Indoor Outdoor LED Kasa Farkı | LEDKASA Blog',
    seoDescription: 'Indoor ve outdoor LED kasa farkının teklif kapsamını nasıl etkilediğini LEDKASA Blog’da okuyun.',
    category: 'Seçim Rehberi',
    publishedAt: '2026-01-22',
    image: images.event,
    imageAlt: 'Etkinlik sahnesinde LED ekran kurulumu',
    sections: [
      {
        heading: 'Ortam, ürün ailesini daraltır',
        paragraphs: [
          'İç mekân ve dış mekân ihtiyaçları aynı ürün dilini konuşsa da koruma, parlaklık ve montaj detayları farklılaşır.',
          'LEDKASA fiyat veya stok yayınlamaz; ortam bilgisi teklifte doğrulanır.',
        ],
      },
      {
        heading: 'Paylaşılması faydalı girdiler',
        paragraphs: ['Ortam tipi, güneş/ışık durumu ve montaj yüksekliği değerlendirmeyi hızlandırır.'],
      },
    ],
    relatedProducts: [
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
      { name: 'Rental LED Kabinet', url: '/urunler/led-ekran-kasalari/rental-led-kabinet/' },
    ],
  },
  {
    slug: 'kapaksiz-kabinet-bakim-erisimi',
    title: 'Kapaksız kabinet ve bakım erişimi',
    excerpt: 'Yalın arka yapı ve bakım erişimi ihtiyacı öne çıktığında kapaksız kabinet seçenekleri değerlendirilir.',
    seoTitle: 'Kapaksız LED Kabinet Bakım Erişimi | LEDKASA Blog',
    seoDescription: 'Kapaksız LED kabinetin bakım erişimi açısından nasıl değerlendirildiğini LEDKASA Blog’da inceleyin.',
    category: 'Ürün Ailesi',
    publishedAt: '2026-01-30',
    image: images.kapaksiz,
    imageAlt: 'Kapaksız LED kabinet ürün görseli',
    sections: [
      {
        heading: 'Erişim yönü belirleyici',
        paragraphs: [
          'Kapaksız LED kabinet; bakım erişimi ve yalın arka yapı ihtiyacının öne çıktığı sabit uygulamalarda değerlendirilir.',
        ],
      },
      {
        heading: 'Teklif öncesi',
        paragraphs: ['Yerleşim ve erişim yönü netleştirilmeden kapsam kilitlenmez.'],
      },
    ],
    relatedProducts: [{ name: 'Kapaksız LED Kabinet', url: '/urunler/led-ekran-kasalari/kapaksiz-led-kabinet/' }],
  },
  {
    slug: 'showroom-dijital-yuzeyler',
    title: 'Showroom’da dijital yüzey nasıl planlanır?',
    excerpt: 'Showroom ekranı ürün hikâyesini taşır; kasa formu ile mekân akışı birlikte tasarlanmalıdır.',
    seoTitle: 'Showroom Dijital LED Yüzey Planlama | LEDKASA Blog',
    seoDescription: 'Showroom LED ekran ve kasa planlaması için pratik bir çerçeveyi LEDKASA Blog’da okuyun.',
    category: 'Perakende',
    publishedAt: '2026-02-07',
    image: images.retail,
    imageAlt: 'Perakende alanında dijital ekran yerleşimi',
    sections: [
      {
        heading: 'Mekân akışı + ekran',
        paragraphs: [
          'Showroom’da ekran boyutu kadar ziyaretçi yolu da önemlidir. Poster veya geniş duvar formatı, anlatılmak istenen ürüne göre seçilir.',
        ],
      },
      {
        heading: 'Katalogdan teklife',
        paragraphs: ['Uygulama alanı sayfalarını ve ürün kartlarını birlikte okumak karar süresini kısaltır.'],
      },
    ],
    relatedProducts: [
      { name: 'Poster LED Kasa', url: '/urunler/led-ekran-kasalari/poster-led-kasa/' },
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
    ],
  },
  {
    slug: 'kurumsal-lobide-led-ekran',
    title: 'Kurumsal lobide LED ekran kasa seçimi',
    excerpt: 'Lobi ekranları marka karşılama alanıdır; sabit kasa ve düzenli bağlantı planı öne çıkar.',
    seoTitle: 'Kurumsal Lobi LED Ekran Kasa Seçimi | LEDKASA Blog',
    seoDescription: 'Kurumsal lobi LED ekranlarında kasa seçimi için dikkat edilecekleri LEDKASA Blog’da keşfedin.',
    category: 'Kurumsal',
    publishedAt: '2026-02-15',
    image: images.cnc,
    imageAlt: 'Kurumsal sabit LED kasa yaklaşımı',
    sections: [
      {
        heading: 'Kalıcı izlenim, sabit kurulum',
        paragraphs: [
          'Lobi ve resepsiyon alanlarında CNC veya kapaksız kabinet aileleri sıkça karşılaştırılır. Görsel bütünlük ve bakım erişimi birlikte konuşulur.',
        ],
      },
      {
        heading: 'Bağlantı gizliliği',
        paragraphs: ['Kablo rotalarının görünürlüğü marka alanlarında ekstra önem taşır.'],
      },
    ],
    relatedProducts: [
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
      { name: 'Kapaksız LED Kabinet', url: '/urunler/led-ekran-kasalari/kapaksiz-led-kabinet/' },
    ],
  },
  {
    slug: 'etkinlik-kurulum-kontrol-listesi',
    title: 'Etkinlik LED kurulum kontrol listesi',
    excerpt: 'Sahaya çıkmadan önce kabinet adedi, hatlar ve söküm planı tek listede toplanmalıdır.',
    seoTitle: 'Etkinlik LED Kurulum Kontrol Listesi | LEDKASA Blog',
    seoDescription: 'Etkinlik LED ekran kurulumları için saha kontrol listesini LEDKASA Blog’da inceleyin.',
    category: 'Etkinlik',
    publishedAt: '2026-02-24',
    image: images.event,
    imageAlt: 'Etkinlik sahnesi LED ekran kurulumu',
    sections: [
      {
        heading: 'Sahaya çıkmadan önce',
        paragraphs: ['Kontrol listesi teklif formuna da yapıştırılabilir; böylece kapsam daha hızlı netleşir.'],
        bullets: [
          'Kabinet adedi ve yedek',
          'Güç / veri mesafeleri',
          'Kurulum penceresi',
          'Taşıma ve istifleme',
        ],
      },
      {
        heading: 'Söküm de planın parçası',
        paragraphs: ['Geçici işlerde söküm sırası kurulum kadar zaman alır. Rental kabinet ve Cable Set birlikte değerlendirilir.'],
      },
    ],
    relatedProducts: [
      { name: 'Rental LED Kabinet', url: '/urunler/led-ekran-kasalari/rental-led-kabinet/' },
      { name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/' },
    ],
  },
  {
    slug: 'teklif-oncesi-paylasilacak-bilgiler',
    title: 'Teklif öncesi paylaşılacak bilgiler',
    excerpt: 'Doğru girdiler; daha net kapsam demektir. Fiyat ve stok yayınlanmaz, proje bilgisiyle ilerlenir.',
    seoTitle: 'LED Teklif Öncesi Paylaşılacak Bilgiler | LEDKASA Blog',
    seoDescription: 'LED ekran kasa teklifi öncesinde paylaşmanız gereken bilgileri LEDKASA Blog’da listeleyin.',
    category: 'Teklif',
    publishedAt: '2026-03-05',
    image: images.connect,
    imageAlt: 'Güç ve bağlantı ekipmanları kategorisi',
    sections: [
      {
        heading: 'Minimum bilgi seti',
        paragraphs: ['Aşağıdaki başlıklar teklif formunu doldururken yol gösterir.'],
        bullets: [
          'Kullanım alanı ve ortam',
          'Yaklaşık ölçü / kabinet adedi',
          'Kurulum tipi',
          'Pitch veya modül notu (varsa)',
        ],
      },
      {
        heading: 'Neden gerekli?',
        paragraphs: [
          'LEDKASA ürün kapsamını proje bilgisi olmadan kesinleştirmez. Bu şeffaflık, saha sürprizini azaltmak içindir.',
        ],
      },
    ],
    relatedProducts: [
      { name: 'Kasa karşılaştırma', url: '/urunler/kasa-karsilastirma/' },
    ],
  },
  {
    slug: 'modul-olcusu-kabinet-uyumu',
    title: 'Modül ölçüsü ve kabinet uyumu',
    excerpt: 'PCB ölçüsü ile kabinet boşluğu uyuşmazsa üretim ve montaj planı yeniden yazılır.',
    seoTitle: 'Modül Ölçüsü ve Kabinet Uyumu | LEDKASA Blog',
    seoDescription: 'LED modül ölçüsü ile kabinet uyumunu nasıl kontrol edeceğinizi LEDKASA Blog’da okuyun.',
    category: 'Teknik',
    publishedAt: '2026-03-14',
    image: images.workshop,
    imageAlt: 'LED modül ve elektronik montaj ortamı',
    sections: [
      {
        heading: 'Ölçüleri yan yana koyun',
        paragraphs: [
          'Örneğin 320×160 mm suite gibi yaygın PCB ölçülerinde kabinet boşluğu ve vida düzeni doğrulanmalıdır.',
          'Doğrulanmış örnek föyler yönlendiricidir; proje modülü ayrıca teyit edilir.',
        ],
      },
      {
        heading: 'Sonraki adım',
        paragraphs: ['Uyum netleşince güç ve veri planına geçmek daha güvenlidir.'],
      },
    ],
    relatedProducts: [
      { name: 'CNC LED Kasa', url: '/urunler/led-ekran-kasalari/cnc-led-kasa/' },
      { name: 'Kapaksız LED Kabinet', url: '/urunler/led-ekran-kasalari/kapaksiz-led-kabinet/' },
    ],
  },
  {
    slug: 'kasa-ve-baglantiyi-birlikte-planlamak',
    title: 'Kasa ve bağlantıyı birlikte planlamak',
    excerpt: 'LEDKASA yaklaşımının özeti: kasa, güç ve veri aynı proje çerçevesinde okunur.',
    seoTitle: 'LED Kasa ve Bağlantıyı Birlikte Planlamak | LEDKASA Blog',
    seoDescription: 'LED ekran kasa ile bağlantı ekipmanlarını aynı çerçevede planlama yaklaşımını LEDKASA Blog’da okuyun.',
    category: 'Yaklaşım',
    publishedAt: '2026-03-22',
    image: images.cabinets,
    imageAlt: 'LED ekran kasa ve sistem yaklaşımı',
    sections: [
      {
        heading: 'Parça listesi değil, sistem',
        paragraphs: [
          'Kabinet seçildikten sonra kabloları “sonradan eklemek” yerine, baştan aynı senaryoda ilerlemek teklifi anlaşılır kılar.',
        ],
      },
      {
        heading: 'Pratik yol',
        paragraphs: [
          'Önce uygulama alanı, sonra ürün ailesi, ardından teklif formu. Bilgi merkezi rehberleri bu zinciri destekler.',
        ],
        bullets: ['Senaryoyu seç', 'Kasa ailesini daralt', 'Bağlantıyı ekle', 'Teklifte netleştir'],
      },
    ],
    relatedProducts: [
      { name: 'Tüm ürünler', url: '/urunler/' },
      { name: 'Cable Set', url: '/urunler/guc-ve-baglanti-ekipmanlari/cable-set/' },
    ],
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
