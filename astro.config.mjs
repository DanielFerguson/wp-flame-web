// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wpflame.com',
  integrations: [sitemap({
    filter: (page) => !['/client-reporting/', '/slow-store/', '/page-builder-bloat/', '/privacy/', '/terms/']
      .some(p => page.endsWith(p))
  })]
});
