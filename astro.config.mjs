import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ledkasa.com.tr',
  output: 'static',
  build: {
    format: 'directory',
  },
});
