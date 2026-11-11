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

/** English slug of each sector page, keyed by its Spanish slug (the internal id). Grows by phase. */
export const SECTOR_SLUGS: Record<string, string> = {
  industria: 'manufacturing',
  logistica: 'logistics',
  'retail-ecommerce': 'retail-ecommerce',
  salud: 'healthcare',
  seguros: 'insurance',
  'banca-fintech': 'banking-fintech',
  'inmobiliaria-construccion': 'real-estate-construction',
  energia: 'energy',
  educacion: 'education',
  'despachos-profesionales': 'law-and-accounting-firms',
  agroalimentacion: 'agrifood',
  'hosteleria-turismo': 'hospitality-tourism',
};
const SECTOR_IDS = Object.fromEntries(Object.entries(SECTOR_SLUGS).map(([id, en]) => [en, id]));
export const sectorIdOf = (slug: string, lang: Lang) => (lang === 'en' ? SECTOR_IDS[slug] : slug);

/** English slug of each glossary term, keyed by its Spanish slug (the internal id). */
export const TERM_SLUGS: Record<string, string> = {
  'agente-de-ia': 'ai-agent',
  mcp: 'mcp-model-context-protocol',
  rag: 'rag-retrieval-augmented-generation',
  'human-in-the-loop': 'human-in-the-loop',
  'prompt-injection': 'prompt-injection',
  geo: 'geo-generative-engine-optimization',
  'llms-txt': 'llms-txt',
  'core-web-vitals': 'core-web-vitals',
  'datos-estructurados': 'structured-data',
  'offline-first': 'offline-first',
  pwa: 'pwa-progressive-web-app',
  webhook: 'webhook',
  idempotencia: 'idempotency',
  'design-tokens': 'design-tokens',
  webgpu: 'webgpu',
  cpq: 'cpq-configure-price-quote',
  oee: 'oee',
  mes: 'mes-manufacturing-execution-system',
  'opc-ua': 'opc-ua',
  scada: 'scada',
  sga: 'wms-warehouse-management-system',
  'prueba-de-entrega': 'proof-of-delivery',
  edi: 'edi-electronic-data-interchange',
  'gs1-128': 'gs1-128',
  'trazabilidad-alimentaria': 'food-traceability',
  pim: 'pim-product-information-management',
  tpv: 'pos-point-of-sale',
  pms: 'hotel-pms',
  'channel-manager': 'channel-manager',
  escandallo: 'recipe-costing',
  'registro-de-viajeros': 'spain-traveler-registration',
  kyc: 'kyc-know-your-customer',
  'psd2-open-banking': 'psd2-open-banking',
  'conciliacion-bancaria': 'bank-reconciliation',
  dora: 'dora',
  verifactu: 'verifactu',
  'datos-de-categoria-especial': 'special-category-data',
  'encargado-del-tratamiento': 'data-processor',
  bc3: 'bc3-file',
  'certificacion-de-obra': 'progress-billing',
  pvgis: 'pvgis',
  fundae: 'fundae',
  lexnet: 'lexnet',
  'dias-habiles': 'business-days-legal-deadlines',
};
const TERM_IDS = Object.fromEntries(Object.entries(TERM_SLUGS).map(([id, en]) => [en, id]));
export const termIdOf = (slug: string, lang: Lang) => (lang === 'en' ? TERM_IDS[slug] : slug);

/** Service id (Spanish slug) for a slug in either language. */
export const serviceIdOf = (slug: string, lang: Lang) => (lang === 'en' ? SERVICE_IDS[slug] : slug);

export const PAGES = {
  home: { es: '/', en: '/en/' },
  servicios: { es: '/servicios/', en: '/en/services/' },
  soluciones: { es: '/soluciones/', en: '/en/solutions/' },
  sectores: { es: '/sectores/', en: '/en/industries/' },
  precios: { es: '/precios/', en: '/en/pricing/' },
  contacto: { es: '/contacto/', en: '/en/contact/' },
  avisoLegal: { es: '/aviso-legal/', en: '/en/legal-notice/' },
  privacidad: { es: '/privacidad/', en: '/en/privacy/' },
  cookies: { es: '/cookies/', en: '/en/cookies/' },
  glosario: { es: '/glosario/', en: '/en/glossary/' },
  almeria: { es: '/desarrollo-software-almeria/', en: '/en/software-development-almeria/' },
  mapa: { es: '/mapa-del-sitio/', en: '/en/sitemap/' },
} as const;
export type PageKey = keyof typeof PAGES;

/** Path of a fixed page in a language, with an optional #anchor. */
export const pathTo = (key: PageKey, lang: Lang, hash = '') => `${PAGES[key][lang]}${hash ? `#${hash}` : ''}`;

/** Path of a service page in a language. */
export const serviceHref = (id: string, lang: Lang = 'es') =>
  lang === 'en' ? `/en/services/${SERVICE_SLUGS[id]}/` : `/servicios/${id}/`;

/** Path of a sector page in a language. */
export const sectorHref = (id: string, lang: Lang = 'es') =>
  lang === 'en' ? `/en/industries/${SECTOR_SLUGS[id]}/` : `/sectores/${id}/`;

/** Path of a glossary term in a language. */
export const termHref = (id: string, lang: Lang = 'es') =>
  lang === 'en' ? `/en/glossary/${TERM_SLUGS[id]}/` : `/glosario/${id}/`;

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
  const sEs = path.match(/^\/sectores\/([^/]+)\/$/);
  if (sEs && SECTOR_SLUGS[sEs[1]]) return { es: path, en: sectorHref(sEs[1], 'en') };
  const sEn = path.match(/^\/en\/industries\/([^/]+)\/$/);
  if (sEn && SECTOR_IDS[sEn[1]]) return { es: sectorHref(SECTOR_IDS[sEn[1]], 'es'), en: path };
  const tEs = path.match(/^\/glosario\/([^/]+)\/$/);
  if (tEs && TERM_SLUGS[tEs[1]]) return { es: path, en: termHref(tEs[1], 'en') };
  const tEn = path.match(/^\/en\/glossary\/([^/]+)\/$/);
  if (tEn && TERM_IDS[tEn[1]]) return { es: termHref(TERM_IDS[tEn[1]], 'es'), en: path };
  return null;
}
