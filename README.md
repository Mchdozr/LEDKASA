# LEDKASA kurumsal sitesi

LEDKASA, Astro ile üretilen ve Plesk üzerinde statik `dist/` paketi olarak yayınlanan Türkçe B2B ürün sitesidir. Fiyat, stok, sertifika, şirket adresi ve doğrulanmamış referans yayınlanmaz; ürün talepleri teklif formuna yönlendirilir.

## Yerel geliştirme ve doğrulama

Gereksinim: güncel Node.js LTS ve npm.

```powershell
npm ci
npm run dev
```

Ürün veya editoryal kaynak görselleri değiştiğinde yerel WebP kopyalarını yeniden üretin. Komut kaynakları `assets/` altında korur; çıktıları uzun kenar en fazla 1400 piksel ve WebP kalite 84 olacak şekilde oluşturur.

```powershell
npm run assets:optimize
```

Yayın paketi yalnızca başarılı test ve build sonrasında hazırlanmalıdır:

```powershell
npm test
npm run build
```

Yayınlanacak paket `dist/` klasörüdür. `src/`, `tests/`, kök `assets/` kaynakları ve `node_modules/` web köküne alınmamalıdır. Build; statik sayfaların yanında `contact.php`, `robots.txt`, manifest, favicon ve sitemap dosyalarını da `dist/` içine kopyalar.

## Plesk'e yükleme

1. Yerelde `npm ci`, `npm test` ve `npm run build` komutlarını çalıştırın.
2. Plesk **Web Siteleri ve Alan Adları > Dosya Yöneticisi** bölümünde alan adına ayrılmış dizinde `dist` klasörünü oluşturun.
3. Yerel `dist/` klasörünün **içeriğini** sunucudaki `dist/` dizinine yükleyin; `contact.php` ve `sitemap-index.xml` dosyalarının bu dizinin doğrudan altında olduğunu kontrol edin.
4. **Web Siteleri ve Alan Adları > Barındırma Ayarları > Belge kökü (Document root)** alanını bu dizine yönlendirin. Standart abonelik düzeninde değer `httpdocs/dist` olur; panel alan adı için farklı bir kök gösteriyorsa onun altındaki gerçek `dist` yolunu seçin.
5. Ayarı kaydedip Plesk önizlemesinde `/`, `/urunler/`, `/teklif-al/`, `/contact.php` ve fiziksel `/404.html` dosyasını kontrol edin. `contact.php` yalnızca POST kabul ettiği için doğrudan GET isteğinde 405 yanıtı beklenir. `404.html` dosyasının bulunması, özel 404 yanıtını kendiliğinden etkinleştirmez; aşağıdaki eşlemeyi ayrıca yapın.

Mevcut canlı dosyaların üzerine tek tek kopyalamak yerine tamamı doğrulanmış yeni `dist/` paketine geçin. Geri dönüş için önceki yayın klasörünü Plesk yedeğinde saklayın.

## Plesk özel 404 eşlemesi

Plesk'te **Web Siteleri ve Alan Adları > Alan adı > Barındırma ve DNS > Barındırma** yolundan **Özel hata belgeleri (Custom error documents)** seçeneğini etkinleştirin. Sunucunun işletim sistemine göre şu eşlemeyi uygulayın:

- **Linux / Apache-nginx:** `dist/404.html` dosyasını alan adının Plesk ana dizinindeki `error_docs/not_found.html` konumuna kopyalayın. Plesk'in 404 için beklediği `not_found.html` adını koruyun; dosyayı yalnızca belge kökünde bırakmak yeterli değildir.
- **Windows / IIS:** **Sanal Dizinler > /** altında **Hata Belgeleri (Error Documents)** ekranını açın, 404 kaydını düzenleyin ve türü **Dosya (File)** olacak biçimde `error_docs` içindeki `not_found.html` dosyasına bağlayın. Plesk güvenlik nedeniyle `error_docs` yüklemesini Dosya Yöneticisi/FTP üzerinden engelliyorsa dosyayı RDP ile yerleştirin veya barındırma sağlayıcısından eşlemeyi yapmasını isteyin.

Aktif web sunucusu katmanının bu ayarı kullandığını, var olmayan gerçek bir yol isteyerek doğrulayın:

```powershell
curl.exe -i https://ledkasa.com.tr/404-kontrol-yolu
```

Yanıt durumunun `404` ve gövdenin `Aradığınız sayfa bulunamadı` metnini içermesi gerekir. `200` veya Plesk'in varsayılan hata sayfası gelirse özel hata belgesi eşlemesi henüz aktif değildir. Ayrıntılar için [Plesk'in resmi özel hata sayfaları belgesine](https://docs.plesk.com/en-US/obsidian/administrator-guide/website-management/websites-and-domains/extended-website-management/customizing-error-pages.65246/) bakın.

## Teklif formu alıcısı

`public/contact.php`, geçerli bir `LEDKASA_CONTACT_RECIPIENT` ortam değişkenini kullanır; değişken yoksa `info@ledkasa.com.tr` adresine döner. Üretimde alıcıyı açıkça tanımlayın:

1. Plesk **Web Siteleri ve Alan Adları > PHP Ayarları** bölümünde alan adının kullandığı PHP işleyicisini kontrol edin.
2. PHP-FPM kullanılıyorsa alan adının ek FPM havuz yönergelerine aşağıdaki satırı ekleyin; değer gerçek alıcı adresi olmalıdır:

   ```ini
   env[LEDKASA_CONTACT_RECIPIENT] = info@ledkasa.com.tr
   ```

3. Bu alan panelde görünmüyorsa sunucu yöneticisinden aynı ortam değişkenini alan adına ait PHP-FPM havuzunda tanımlamasını isteyin. İşleyiciye özgü ayar bilinmeden `.htaccess` veya genel PHP yapılandırması eklemeyin.
4. Plesk posta günlüğü ve gerçek bir test formuyla teslimatı doğrulayın. Gönderen alanı `no-reply@ledkasa.com.tr` olduğundan SPF/DKIM ve alan adına ait posta hizmeti de kontrol edilmelidir.

## Teklif formu kötüye kullanım koruması

`contact.php`, tarayıcının sağladığı `Origin` ve `Sec-Fetch-Site` başlıklarında cross-site istekleri posta işleminden önce reddeder. Bu başlıkları göndermeyen normal sunucu/CLI istemcileri desteklenmeye devam eder. Uç nokta ayrıca `REMOTE_ADDR` başına 10 dakikada en fazla beş işleme izin verir. Sayaç, varsayılan olarak sistem geçici dizinindeki `ledkasa-contact-rate-limit` klasöründe, belge kökü dışında ve dosya kilidiyle tutulur. Plesk PHP kullanıcısının bu dizine yazabildiğini yayın öncesi doğrulayın; gerekiyorsa belge kökü dışında bir dizini `LEDKASA_CONTACT_RATE_LIMIT_DIR` ortam değişkeniyle tanımlayın.

Uygulama sınırı tek savunma katmanı kabul edilmemelidir. Sunucu yöneticisinden etkin web yığınına göre `/contact.php` için ikinci bir IP bazlı istek limiti isteyin:

- nginx kullanılıyorsa yönetici, `http` kapsamına bir `limit_req_zone` eklemeli ve Plesk'in ürettiği PHP işleyici konumunu bozmadan bu uç noktada `limit_req` uygulamalıdır. `limit_req_zone` doğrudan alan adının “Ek nginx yönergeleri” alanına yapıştırılmamalıdır; bu yönerge `http` kapsamı gerektirir.
- Apache kullanılıyorsa yönetici, mevcutsa ModSecurity veya `mod_evasive` üzerinden yalnızca `/contact.php` POST trafiğine IP/zaman penceresi kuralı eklemelidir. Modül ve sunucu kapsamı doğrulanmadan genel bir `.htaccess` kuralı eklenmemelidir.
- Plesk nginx+Apache proxy düzeninde istemci IP'sinin PHP tarafında doğru `REMOTE_ADDR` olarak ulaştığı kontrol edilmelidir; proxy adresi görünüyorsa güvenilen proxy/IP aktarımı sunucu yöneticisi tarafından yapılandırılmalıdır.

Kuraldan sonra aynı IP'den kısa sürede tekrarlanan test POST'larının genel bir `429`/engelleme yanıtı aldığını, normal aynı-origin form gönderiminin çalıştığını ve yanıtların alıcı ya da posta ayrıntısı içermediğini doğrulayın.

## DNS, TLS ve yönlendirme

DNS'teki kök `A` kaydı Plesk sunucusu `194.36.84.221` adresine yayıldıktan sonra:

1. Plesk **SSL/TLS Sertifikaları > Let's Encrypt** üzerinden `ledkasa.com.tr` ve DNS kaydı hazırsa `www.ledkasa.com.tr` adlarını kapsayan sertifika alın.
2. Sertifikayı alan adının barındırma ayarlarında seçin.
3. **Barındırma Ayarları** içinde Plesk'in **HTTP'den HTTPS'ye kalıcı 301 yönlendirmesi** seçeneğini etkinleştirin.
4. Aynı ekranda tercih edilen alan adını `ledkasa.com.tr` (www olmadan) seçin ve Plesk'in SEO güvenli 301 yönlendirmesini kullanın.
5. `http://`, `https://www` ve `https://` varyasyonlarını ayrı ayrı deneyerek son adresin `https://ledkasa.com.tr/` olduğunu doğrulayın.

Web sunucusu yığını (Apache, nginx veya ikisi) doğrulanmadan özel `.htaccess` yönlendirme kuralı eklemeyin; yönlendirmeleri Plesk'in alan adı ayarlarından yönetin.

## Arama motoru yayını

TLS ve yönlendirmeler doğrulandıktan sonra Google Search Console'da `ledkasa.com.tr` için Domain property oluşturun ve DNS kaydıyla doğrulayın. Ardından **Site Haritaları** bölümüne şunu gönderin:

```text
https://ledkasa.com.tr/sitemap-index.xml
```

`robots.txt` aynı sitemap adresini bildirir. Yayın sonrası Search Console URL Denetimi ile ana sayfa, iki kategori ve en az bir ürün sayfasını kontrol edin. Sitemap 404 sayfasını içermez.

## İçerik ve yasal notlar

- `public/assets/attributions.md` üç editoryal fotoğrafın tam kaynak sayfalarını ve Unsplash lisansını kaydeder. Rakip ürün görseli kullanılmaz.
- Yasal sayfalar şeffaf taslaklardır. Doğrulanmış ticari bilgiler, gerçek veri akışları ve şirket özelindeki yükümlülükler eklenmeden nihai hukuki metin kabul edilmemelidir.
- Fiziksel konum, vergi bilgisi, sertifika veya müşteri referansı doğrulanana kadar siteye eklenmemelidir. Doğrulanmış telefon: `+90 530 405 67 68`.
