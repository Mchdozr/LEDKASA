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
5. Ayarı kaydedip Plesk önizlemesinde `/`, `/urunler/`, `/teklif-al/`, `/contact.php` ve `/404.html` yollarını kontrol edin. `contact.php` yalnızca POST kabul ettiği için doğrudan GET isteğinde 405 yanıtı beklenir.

Mevcut canlı dosyaların üzerine tek tek kopyalamak yerine tamamı doğrulanmış yeni `dist/` paketine geçin. Geri dönüş için önceki yayın klasörünü Plesk yedeğinde saklayın.

## Teklif formu alıcısı

`public/contact.php`, geçerli bir `LEDKASA_CONTACT_RECIPIENT` ortam değişkenini kullanır; değişken yoksa `info@ledkasa.com.tr` adresine döner. Üretimde alıcıyı açıkça tanımlayın:

1. Plesk **Web Siteleri ve Alan Adları > PHP Ayarları** bölümünde alan adının kullandığı PHP işleyicisini kontrol edin.
2. PHP-FPM kullanılıyorsa alan adının ek FPM havuz yönergelerine aşağıdaki satırı ekleyin; değer gerçek alıcı adresi olmalıdır:

   ```ini
   env[LEDKASA_CONTACT_RECIPIENT] = info@ledkasa.com.tr
   ```

3. Bu alan panelde görünmüyorsa sunucu yöneticisinden aynı ortam değişkenini alan adına ait PHP-FPM havuzunda tanımlamasını isteyin. İşleyiciye özgü ayar bilinmeden `.htaccess` veya genel PHP yapılandırması eklemeyin.
4. Plesk posta günlüğü ve gerçek bir test formuyla teslimatı doğrulayın. Gönderen alanı `no-reply@ledkasa.com.tr` olduğundan SPF/DKIM ve alan adına ait posta hizmeti de kontrol edilmelidir.

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
- Telefon, fiziksel konum, vergi bilgisi, sertifika veya müşteri referansı doğrulanana kadar siteye eklenmemelidir.
