// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wpflame.com',
  integrations: [sitemap()],
  redirects: {
    '/woocommerce-speed': '/use-cases/woocommerce-checkout/',
    '/slow-store': '/use-cases/woocommerce-checkout/',
    '/agency-performance': '/use-cases/client-performance-report/',
    '/client-reporting': '/use-cases/client-performance-report/',
    '/elementor-slow': '/use-cases/plugin-regression/',
    '/page-builder-bloat': '/use-cases/plugin-regression/',
    '/campaigns/woocommerce-speed': '/use-cases/woocommerce-checkout/',
    '/campaigns/slow-store': '/use-cases/woocommerce-checkout/',
    '/campaigns/agency-performance': '/use-cases/client-performance-report/',
    '/campaigns/client-reporting': '/use-cases/client-performance-report/',
    '/campaigns/elementor-slow': '/use-cases/plugin-regression/',
    '/campaigns/page-builder-bloat': '/use-cases/plugin-regression/',
  },
});
