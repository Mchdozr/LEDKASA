# Üretici föy PDF

`specifications 参数.pdf` dosyasını buraya koyun:

- `specifications.pdf` (tercih edilen ad)
- veya `specifications .pdf`

Sonra:

```bash
npm run assets:import-specs
```

Script her sayfayı ürün eşleşmesine göre ayırır ve `public/assets/images/products/gallery/` altına WebP üretir. Eşleşme kuralları `scripts/import-specifications-pdf.mjs` içindedir.
