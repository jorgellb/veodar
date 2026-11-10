// Contextual internal links. Running text (doc blocks and FAQ answers) is scanned
// for the terms people search for, and the first mention of each term links to the
// page that targets it. That spreads authority with descriptive anchors instead of
// "click here", in both languages.
//
// Rules keep it natural: one link per target per page, at most MAX_PER_PAGE links
// per page, never a link to the page itself, and never inside headings.

import { pathTo, sectorHref, serviceHref, type Lang } from './index';

type Rule = { to: string; terms: string[] };

const svc = (id: string, lang: Lang) => serviceHref(id, lang);

// Longer, more specific terms first within each rule; rules are tried in order.
// Only terms that mean the same thing wherever they appear: a single generic word
// ("brand", "design", "price") would link "the truck brand" to brand identity.
const rules = (lang: Lang): Rule[] =>
  lang === 'es'
    ? [
        { to: svc('automatizaciones-ia', lang), terms: ['automatizaciones con IA', 'automatización con IA', 'agentes de IA', 'automatización', 'la IA'] },
        { to: svc('desarrollo-web', lang), terms: ['desarrollo web a medida', 'portales de clientes', 'portal de clientes', 'áreas privadas', 'desarrollo web', 'portal'] },
        { to: svc('aplicaciones-moviles', lang), terms: ['aplicaciones móviles', 'aplicación móvil', 'apps móviles', 'app móvil'] },
        { to: svc('aplicaciones-escritorio', lang), terms: ['aplicaciones de escritorio', 'aplicación de escritorio', 'apps de escritorio', 'escritorio'] },
        { to: pathTo('precios', lang), terms: ['página de precios'] },
        { to: pathTo('soluciones', lang), terms: ['TI y seguridad', 'cada área', 'por área'] },
        { to: svc('seo-y-visibilidad', lang), terms: ['visibilidad en buscadores de IA', 'posicionamiento', 'buscadores', 'SEO'] },
        { to: svc('rediseno-web', lang), terms: ['rediseño web', 'mapa de redirecciones', 'rediseños', 'rediseño'] },
        { to: svc('diseno-web', lang), terms: ['diseño web', 'design system', 'diseño de interfaz'] },
        { to: svc('identidad-de-marca', lang), terms: ['identidad de marca', 'identidad visual', 'logotipo'] },
        { to: svc('desarrollo-creativo', lang), terms: ['desarrollo creativo', 'animaciones', 'animación', 'WebGL'] },
        { to: svc('web-3d-interactiva', lang), terms: ['webs 3D', 'web 3D', '3D en tiempo real', 'Three.js'] },
        { to: svc('configuradores-3d', lang), terms: ['configuradores 3D', 'configurador 3D', 'configurador'] },
        { to: svc('videos-de-lanzamiento', lang), terms: ['vídeos de lanzamiento', 'vídeo de lanzamiento', 'vídeo de producto'] },
        { to: sectorHref('industria', lang), terms: ['industria y fabricación', 'sector industrial', 'planta de producción'] },
        { to: sectorHref('logistica', lang), terms: ['logística y transporte', 'sistema de gestión de almacén', 'prueba de entrega'] },
        { to: sectorHref('retail-ecommerce', lang), terms: ['retail y ecommerce', 'comercio electrónico', 'tienda online'] },
        { to: sectorHref('salud', lang), terms: ['clínicas y centros de salud', 'centros de salud', 'clínicas'] },
        { to: sectorHref('seguros', lang), terms: ['aseguradoras y corredurías', 'corredurías de seguros', 'aseguradoras'] },
        { to: sectorHref('banca-fintech', lang), terms: ['banca y fintech', 'conciliación bancaria', 'fintech'] },
        { to: sectorHref('inmobiliaria-construccion', lang), terms: ['inmobiliarias y constructoras', 'promotoras', 'constructoras'] },
        { to: sectorHref('energia', lang), terms: ['empresas de energía', 'plantas fotovoltaicas', 'comercializadoras'] },
        { to: pathTo('sectores', lang), terms: ['cada sector', 'por sector'] },
      ]
    : [
        { to: svc('automatizaciones-ia', lang), terms: ['AI automations', 'AI automation', 'AI agents', 'automation', 'the AI'] },
        { to: svc('desarrollo-web', lang), terms: ['custom web development', 'client portals', 'client portal', 'private areas', 'web development', 'portal'] },
        { to: svc('aplicaciones-moviles', lang), terms: ['mobile apps', 'mobile app'] },
        { to: svc('aplicaciones-escritorio', lang), terms: ['desktop applications', 'desktop application', 'desktop apps', 'desktop'] },
        { to: pathTo('precios', lang), terms: ['pricing page'] },
        { to: pathTo('soluciones', lang), terms: ['IT and security', 'every department', 'by department'] },
        { to: svc('seo-y-visibilidad', lang), terms: ['AI search visibility', 'search engines', 'rankings', 'SEO'] },
        { to: svc('rediseno-web', lang), terms: ['website redesign', 'redirect map', 'redesigns', 'redesign'] },
        { to: svc('diseno-web', lang), terms: ['web design', 'design system', 'interface design'] },
        { to: svc('identidad-de-marca', lang), terms: ['brand identity', 'visual identity', 'logo'] },
        { to: svc('desarrollo-creativo', lang), terms: ['creative development', 'animations', 'animation', 'WebGL'] },
        { to: svc('web-3d-interactiva', lang), terms: ['3D websites', '3D website', 'real-time 3D', 'Three.js'] },
        { to: svc('configuradores-3d', lang), terms: ['3D configurators', '3D configurator', 'configurator'] },
        { to: svc('videos-de-lanzamiento', lang), terms: ['launch videos', 'launch video', 'product video'] },
        { to: sectorHref('industria', lang), terms: ['manufacturing companies', 'manufacturers', 'shop floor'] },
        { to: sectorHref('logistica', lang), terms: ['logistics and transportation', 'warehouse management system', 'proof of delivery'] },
        { to: sectorHref('retail-ecommerce', lang), terms: ['retail and ecommerce', 'online store', 'ecommerce'] },
        { to: sectorHref('salud', lang), terms: ['medical practices', 'clinics'] },
        { to: sectorHref('seguros', lang), terms: ['insurers and insurance brokers', 'insurance brokers', 'insurers'] },
        { to: sectorHref('banca-fintech', lang), terms: ['banking and fintech', 'bank reconciliation', 'fintech'] },
        { to: sectorHref('inmobiliaria-construccion', lang), terms: ['real estate agencies', 'construction companies', 'homebuilders'] },
        { to: sectorHref('energia', lang), terms: ['energy companies', 'solar plants', 'energy retailers'] },
        { to: pathTo('sectores', lang), terms: ['every industry', 'by industry'] },
      ];

const MAX_PER_PAGE = 6;
const used = new Map<string, Set<string>>();

const escapeHtml = (text: string) =>
  text.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]!);
const escapeRe = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const norm = (path: string) => (path.endsWith('/') ? path : `${path}/`);

/** Forget what a page has linked: call once at the top of every page render (dev re-renders pages). */
export function startLinks(pagePath: string) {
  used.set(norm(pagePath), new Set());
}

/**
 * Escape `text` and link the first mention of up to `max` targets that this page
 * has not linked yet. Returns HTML for set:html.
 */
export function linkify(text: string, lang: Lang, pagePath: string, max = 1): string {
  const here = norm(pagePath);
  if (!used.has(here)) used.set(here, new Set());
  const done = used.get(here)!;
  let html = escapeHtml(text);
  let added = 0;
  for (const rule of rules(lang)) {
    if (added >= max || done.size >= MAX_PER_PAGE) break;
    if (done.has(rule.to) || norm(rule.to.split('#')[0]) === here) continue;
    for (const term of rule.terms) {
      // Whole words only (accents count as letters), and never inside a link we already added.
      const re = new RegExp(`(?<![\\p{L}\\p{N}>])(${escapeRe(escapeHtml(term))})(?![\\p{L}\\p{N}])(?![^<]*</a>)`, 'iu');
      const match = re.exec(html);
      if (!match) continue;
      html = `${html.slice(0, match.index)}<a class="ctx-link" href="${rule.to}">${match[1]}</a>${html.slice(match.index + match[1].length)}`;
      done.add(rule.to);
      added++;
      break;
    }
  }
  return html;
}
