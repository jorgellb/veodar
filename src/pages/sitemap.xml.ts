import type { APIRoute } from 'astro';
import { servicesFor } from '../data/services';
import { sectorsFor } from '../data/sectors';
import { site } from '../data/site';
import { UPDATED, sectorUpdated, serviceUpdated } from '../data/updated';
import { techsFor } from '../data/technologies';
import { termsFor } from '../data/glossary';
import { LANGS, PAGES, sectorHref, serviceHref, techHref, termHref, type Lang } from '../i18n';

// Every page in both languages, each listing its counterpart (hreflang) so search
// engines treat them as translations of one page, not as duplicates.
export const GET: APIRoute = ({ site: astroSite }) => {
  const origin = astroSite ?? new URL(site.url);
  const abs = (path: string) => new URL(path, origin).href;

  type Entry = { paths: Record<Lang, string>; priority: string; updated: string };
  const entries: Entry[] = [
    { paths: PAGES.home, priority: '1.0', updated: UPDATED.home },
    { paths: PAGES.servicios, priority: '0.9', updated: UPDATED.services },
    ...servicesFor('es').map((service) => ({
      paths: { es: serviceHref(service.slug, 'es'), en: serviceHref(service.slug, 'en') },
      priority: '0.8',
      updated: serviceUpdated(service.slug),
    })),
    { paths: PAGES.tecnologias, priority: '0.8', updated: UPDATED.tech },
    ...techsFor('es').map((tech) => ({
      paths: { es: techHref(tech.id, 'es'), en: techHref(tech.id, 'en') },
      priority: '0.7',
      updated: UPDATED.tech,
    })),
    { paths: PAGES.soluciones, priority: '0.7', updated: UPDATED.pages },
    { paths: PAGES.sectores, priority: '0.8', updated: UPDATED.sectors },
    ...sectorsFor('es').map((sector) => ({
      paths: { es: sectorHref(sector.id, 'es'), en: sectorHref(sector.id, 'en') },
      priority: '0.7',
      updated: sectorUpdated(sector.id),
    })),
    { paths: PAGES.veodardental, priority: '0.8', updated: UPDATED.veodardental },
    { paths: PAGES.almeria, priority: '0.7', updated: UPDATED.local },
    { paths: PAGES.glosario, priority: '0.6', updated: UPDATED.glossary },
    ...termsFor('es').map((term) => ({
      paths: { es: termHref(term.id, 'es'), en: termHref(term.id, 'en') },
      priority: '0.5',
      updated: UPDATED.glossary,
    })),
    { paths: PAGES.precios, priority: '0.6', updated: UPDATED.pages },
    { paths: PAGES.contacto, priority: '0.6', updated: UPDATED.pages },
    { paths: PAGES.avisoLegal, priority: '0.2', updated: UPDATED.legal },
    { paths: PAGES.privacidad, priority: '0.2', updated: UPDATED.legal },
    { paths: PAGES.cookies, priority: '0.2', updated: UPDATED.legal },
    { paths: PAGES.mapa, priority: '0.2', updated: UPDATED.pages },
  ];

  const urls = entries.flatMap(({ paths, priority, updated }) =>
    LANGS.map((lang) => {
      const links = [
        ...LANGS.map((alt) => `<xhtml:link rel="alternate" hreflang="${alt}" href="${abs(paths[alt])}"/>`),
        `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(paths.es)}"/>`,
      ].join('');
      return `  <url><loc>${abs(paths[lang])}</loc><lastmod>${updated}</lastmod><priority>${priority}</priority>${links}</url>`;
    }),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
