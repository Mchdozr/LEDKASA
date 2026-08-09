import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/** @param {string} page */
function sitemapPriority(page) {
  const path = new URL(page).pathname;
  if (path === '/') return 1.0;
  if (path.startsWith('/urunler/')) return 0.9;
  if (path.startsWith('/uygulama-alanlari/') || path.startsWith('/bilgi-merkezi/')) return 0.8;
  if (
    path.startsWith('/hakkimizda/') ||
    path.startsWith('/sss/') ||
    path.startsWith('/teklif-al/') ||
    path.startsWith('/iletisim/') ||
    path.startsWith('/site-haritasi/')
  ) {
    return 0.7;
  }
  if (
    path.startsWith('/kvkk-aydinlatma/') ||
    path.startsWith('/gizlilik-politikasi/') ||
    path.startsWith('/cerez-politikasi/')
  ) {
    return 0.3;
  }
  return 0.6;
}

/** @param {string} page */
function sitemapChangeFreq(page) {
  const path = new URL(page).pathname;
  if (path === '/') return 'weekly';
  if (path.startsWith('/urunler/') || path.startsWith('/bilgi-merkezi/') || path.startsWith('/uygulama-alanlari/')) {
    return 'monthly';
  }
  if (
    path.startsWith('/kvkk-aydinlatma/') ||
    path.startsWith('/gizlilik-politikasi/') ||
    path.startsWith('/cerez-politikasi/')
  ) {
    return 'yearly';
  }
  return 'monthly';
}

export default defineConfig({
  site: 'https://ledkasa.com.tr',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://ledkasa.com.tr/404/',
      serialize(item) {
        return {
          ...item,
          priority: sitemapPriority(item.url),
          changefreq: sitemapChangeFreq(item.url),
        };
      },
    }),
  ],
  build: {
    format: 'directory',
  },
});
