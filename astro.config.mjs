// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://veodar.com',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Redirects from the old service URLs live in vercel.json, so Vercel answers them
  // with a permanent 308 instead of the meta-refresh pages a static build would write.
  vite: {
    plugins: [tailwindcss()],
  },
});
