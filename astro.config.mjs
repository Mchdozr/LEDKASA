// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ledkasa.com.tr',
  output: 'static',
  integrations: [sitemap()],
  image: {
    domains: [],
  },
});
