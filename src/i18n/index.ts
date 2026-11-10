// Languages and routes. Spanish lives at the root (its URLs never change);
// English lives under /en/ with its own, translated slugs.

export type Lang = 'es' | 'en';
export const LANGS: Lang[] = ['es', 'en'];
export const DEFAULT_LANG: Lang = 'es';

/** Language of a URL or pathname: anything under /en/ is English. */
export const langOf = (url: URL | string): Lang => {
  const path = typeof url === 'string' ? url : url.pathname;
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'es';
};

export const htmlLang: Record<Lang, string> = { es: 'es', en: 'en' };
export const ogLocale: Record<Lang, string> = { es: 'es_ES', en: 'en_US' };
export const langName: Record<Lang, string> = { es: 'Español', en: 'English' };

/** English slug of each service, keyed by its Spanish slug (the internal id). */
export const SERVICE_SLUGS: Record<string, string> = {
  'automatizaciones-ia': 'ai-automation',
  'desarrollo-web': 'web-development',
  'aplicaciones-moviles': 'mobile-app-development',
  'aplicaciones-escritorio': 'desktop-app-development',
  'identidad-de-marca': 'brand-identity',
  'diseno-web': 'web-design',
  'desarrollo-creativo': 'creative-development',
  'web-3d-interactiva': 'interactive-3d-websites',
  'configuradores-3d': '3d-product-configurators',
  'videos-de-lanzamiento': 'product-launch-videos',
  'rediseno-web': 'website-redesign',
  'seo-y-visibilidad': 'seo-and-ai-search',
};
const SERVICE_IDS = Object.fromEntries(Object.entries(SERVICE_SLUGS).map(([id, en]) => [en, id]));

/** Service id (Spanish slug) for a slug in either language. */
export const serviceIdOf = (slug: string, lang: Lang) => (lang === 'en' ? SERVICE_IDS[slug] : slug);

export const PAGES = {
  home: { es: '/', en: '/en/' },
  servicios: { es: '/servicios/', en: '/en/services/' },
  soluciones: { es: '/soluciones/', en: '/en/solutions/' },
  precios: { es: '/precios/', en: '/en/pricing/' },
  contacto: { es: '/contacto/', en: '/en/contact/' },
} as const;
export type PageKey = keyof typeof PAGES;

/** Path of a fixed page in a language, with an optional #anchor. */
export const pathTo = (key: PageKey, lang: Lang, hash = '') => `${PAGES[key][lang]}${hash ? `#${hash}` : ''}`;

/** Path of a service page in a language. */
export const serviceHref = (id: string, lang: Lang = 'es') =>
  lang === 'en' ? `/en/services/${SERVICE_SLUGS[id]}/` : `/servicios/${id}/`;

/** The same page in both languages, or null for a path with no counterpart (404). */
export function alternatesOf(pathname: string): Record<Lang, string> | null {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  for (const page of Object.values(PAGES)) {
    if (page.es === path || page.en === path) return { es: page.es, en: page.en };
  }
  const es = path.match(/^\/servicios\/([^/]+)\/$/);
  if (es && SERVICE_SLUGS[es[1]]) return { es: path, en: serviceHref(es[1], 'en') };
  const en = path.match(/^\/en\/services\/([^/]+)\/$/);
  if (en && SERVICE_IDS[en[1]]) return { es: serviceHref(SERVICE_IDS[en[1]], 'es'), en: path };
  return null;
}
