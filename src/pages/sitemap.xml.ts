import type { APIRoute } from 'astro';
import { servicesFor } from '../data/services';
import { sectorsFor } from '../data/sectors';
import { site } from '../data/site';
import { LANGS, PAGES, sectorHref, serviceHref, type Lang } from '../i18n';

// Every page in both languages, each listing its counterpart (hreflang) so search
// engines treat them as translations of one page, not as duplicates.
export const GET: APIRoute = ({ site: astroSite }) => {
  const origin = astroSite ?? new URL(site.url);
  const abs = (path: string) => new URL(path, origin).href;
  const today = new Date().toISOString().slice(0, 10);

  type Entry = { paths: Record<Lang, string>; priority: string };
  const entries: Entry[] = [
    { paths: PAGES.home, priority: '1.0' },
    { paths: PAGES.servicios, priority: '0.9' },
    ...servicesFor('es').map((service) => ({
      paths: { es: serviceHref(service.slug, 'es'), en: serviceHref(service.slug, 'en') },
      priority: '0.8',
    })),
    { paths: PAGES.soluciones, priority: '0.7' },
    { paths: PAGES.sectores, priority: '0.8' },
    ...sectorsFor('es').map((sector) => ({
      paths: { es: sectorHref(sector.id, 'es'), en: sectorHref(sector.id, 'en') },
      priority: '0.7',
    })),
    { paths: PAGES.precios, priority: '0.6' },
    { paths: PAGES.contacto, priority: '0.6' },
  ];

  const urls = entries.flatMap(({ paths, priority }) =>
    LANGS.map((lang) => {
      const links = [
        ...LANGS.map((alt) => `<xhtml:link rel="alternate" hreflang="${alt}" href="${abs(paths[alt])}"/>`),
        `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(paths.es)}"/>`,
      ].join('');
      return `  <url><loc>${abs(paths[lang])}</loc><lastmod>${today}</lastmod><priority>${priority}</priority>${links}</url>`;
    }),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
