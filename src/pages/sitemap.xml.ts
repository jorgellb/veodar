import type { APIRoute } from 'astro';
import { services, serviceHref } from '../data/services';
import { site } from '../data/site';

export const GET: APIRoute = ({ site: astroSite }) => {
  const origin = astroSite ?? new URL(site.url);
  const today = new Date().toISOString().slice(0, 10);
  const paths: [string, string][] = [
    ['/', '1.0'],
    ['/servicios/', '0.9'],
    ...services.map((service): [string, string] => [serviceHref(service.slug), '0.8']),
    ['/soluciones/', '0.7'],
    ['/precios/', '0.6'],
    ['/contacto/', '0.6'],
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(([path, priority]) => `  <url><loc>${new URL(path, origin).href}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`)
  .join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
