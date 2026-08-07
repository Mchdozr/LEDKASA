import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ledkasa.com.tr',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://ledkasa.com.tr/404/',
    }),
  ],
  build: {
    format: 'directory',
  },
});
