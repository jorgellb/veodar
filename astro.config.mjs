// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://veodar.com',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  redirects: {
    '/desarrollo-web': '/servicios/desarrollo-web/',
    '/aplicaciones-escritorio': '/servicios/aplicaciones-escritorio/',
    '/aplicaciones-moviles': '/servicios/aplicaciones-moviles/',
    '/automatizaciones-ia': '/servicios/automatizaciones-ia/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
