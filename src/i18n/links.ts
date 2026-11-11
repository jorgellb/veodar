// Contextual internal links. Running text (doc blocks and FAQ answers) is scanned
// for the terms people search for, and the first mention of each term links to the
// page that targets it. That spreads authority with descriptive anchors instead of
// "click here", in both languages.
//
// Rules keep it natural: one link per target per page, at most MAX_PER_PAGE links
// to services, sectors and fixed pages, MAX_TECH_PER_PAGE to technologies and
// MAX_TERMS_PER_PAGE to glossary terms, never a link to the page itself, and never
// inside headings.

import { termsFor } from '../data/glossary';
import { pathTo, sectorHref, serviceHref, techHref, termHref, type Lang } from './index';

/**
 * `exact` matches the term only as written (a name: "React" but not "react");
 * `except` lists what may not follow it ("React" is not "React Native").
 */
type Rule = { to: string; terms: string[]; exact?: boolean; except?: string[] };

const isService = (to: string) => /^\/(servicios|en\/services)\/[^/]+\/$/.test(to);

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
        { to: sectorHref('educacion', lang), terms: ['centros de formación', 'centros educativos', 'academias'] },
        { to: sectorHref('despachos-profesionales', lang), terms: ['despachos de abogados', 'asesorías', 'gestorías'] },
        { to: sectorHref('agroalimentacion', lang), terms: ['cooperativas agroalimentarias', 'cooperativas', 'agroalimentaria'] },
        { to: sectorHref('hosteleria-turismo', lang), terms: ['hoteles y restaurantes', 'hoteles', 'hostelería'] },
        { to: pathTo('sectores', lang), terms: ['cada sector', 'por sector'] },
        { to: pathTo('tecnologias', lang), terms: ['desarrollo por tecnología', 'por tecnología'] },
        { to: pathTo('almeria', lang), terms: ['Vera (Almería)', 'provincia de Almería', 'Almería'] },
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
        { to: sectorHref('educacion', lang), terms: ['training centers', 'schools and academies', 'academies'] },
        { to: sectorHref('despachos-profesionales', lang), terms: ['law firms', 'accounting practices'] },
        { to: sectorHref('agroalimentacion', lang), terms: ['agricultural cooperatives', 'cooperatives', 'agrifood'] },
        { to: sectorHref('hosteleria-turismo', lang), terms: ['hotels and restaurants', 'hotels', 'hospitality'] },
        { to: pathTo('sectores', lang), terms: ['every industry', 'by industry'] },
        { to: pathTo('tecnologias', lang), terms: ['development by technology', 'by technology'] },
        { to: pathTo('almeria', lang), terms: ['Vera (Almería)', 'province of Almería', 'Almería'] },
      ];

// Technologies: the name of each one links to its page. They have a budget of their
// own, so a paragraph that names the stack never spends the links to services.
const techRules = (lang: Lang): Rule[] => [
  { to: techHref('wordpress', lang), terms: ['WordPress'], exact: true },
  { to: techHref('astro', lang), terms: ['Astro'], exact: true },
  { to: techHref('nextjs', lang), terms: ['Next.js'], exact: true },
  { to: techHref('react', lang), terms: ['React'], exact: true, except: [' Native'] },
  { to: techHref('nodejs', lang), terms: ['Node.js'], exact: true },
  { to: techHref('python', lang), terms: ['Python'], exact: true },
  { to: techHref('ia-generativa', lang), terms: lang === 'es' ? ['IA generativa', 'modelos de lenguaje', 'modelo de lenguaje'] : ['generative AI', 'language models', 'language model'] },
  { to: techHref('javascript', lang), terms: ['JavaScript'], exact: true },
  { to: techHref('react-native', lang), terms: ['React Native'], exact: true },
  { to: techHref('expo', lang), terms: ['Expo'], exact: true },
  { to: techHref('swiftui', lang), terms: ['SwiftUI'], exact: true },
  { to: techHref('swift', lang), terms: ['Swift'], exact: true },
  { to: techHref('jetpack-compose', lang), terms: ['Jetpack Compose'], exact: true },
  { to: techHref('kotlin', lang), terms: ['Kotlin'], exact: true },
  { to: techHref('sqlite', lang), terms: ['SQLite'], exact: true },
  { to: techHref('notificaciones-push', lang), terms: lang === 'es' ? ['notificaciones push', 'notificación push'] : ['push notifications', 'push notification'] },
  { to: techHref('rust', lang), terms: ['Rust'], exact: true },
  { to: techHref('tauri', lang), terms: ['Tauri'], exact: true },
  // In Spanish «Tokio» is also the city: there the name links only from its own cards.
  ...(lang === 'en' ? [{ to: techHref('tokio', lang), terms: ['Tokio'], exact: true }] : []),
  { to: techHref('axum', lang), terms: ['Axum'], exact: true },
  { to: techHref('webassembly', lang), terms: ['WebAssembly'], exact: true },
  { to: techHref('electron', lang), terms: ['Electron'], exact: true },
  { to: techHref('dotnet', lang), terms: ['.NET'], exact: true },
  { to: techHref('actualizaciones-firmadas', lang), terms: lang === 'es' ? ['actualizaciones firmadas', 'firma de código'] : ['signed updates', 'code signing'] },
];

// Glossary terms: the phrases each term declares in `match`. They come after the
// rules above, so a phrase that already sells a service keeps pointing at that page.
// Order: the terms that belong to the page being rendered (its sector or its service)
// go first, so the cap is spent on them; then terms that only match spelled-out
// phrases before those with an acronym, because an acronym usually comes back later
// in the text and a phrase does not.
const termRuleCache = new Map<string, Rule[]>();
function termRules(lang: Lang, here: string): Rule[] {
  const key = `${lang} ${here}`;
  const cached = termRuleCache.get(key);
  if (cached) return cached;
  const scored = termsFor(lang)
    .filter((term) => term.match?.length)
    .map((term, index) => {
      const own = term.sectors.some((id) => sectorHref(id, lang) === here) || term.services.some((id) => serviceHref(id, lang) === here);
      const phraseOnly = term.match!.every((text) => !isAcronym(text));
      return { rule: { to: termHref(term.id, lang), terms: term.match! }, score: (own ? 0 : 2) + (phraseOnly ? 0 : 1), index };
    })
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((item) => item.rule);
  termRuleCache.set(key, scored);
  return scored;
}

const MAX_PER_PAGE = 8;
const MAX_TECH_PER_PAGE = 4;
const MAX_TECH_PER_PARAGRAPH = 3;
const MAX_TERMS_PER_PAGE = 6;
const used = new Map<string, Set<string>>();
const usedTech = new Map<string, Set<string>>();
const usedTerms = new Map<string, Set<string>>();

// An acronym (MES, GEO, POS) only matches as written: "mes" is also a month.
const isAcronym = (term: string) => /^[A-Z0-9][A-Z0-9 .*-]*$/.test(term) && /[A-Z]{2}/.test(term);

const escapeHtml = (text: string) =>
  text.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]!);
const escapeRe = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const norm = (path: string) => (path.endsWith('/') ? path : `${path}/`);

/** Forget what a page has linked: call once at the top of every page render (dev re-renders pages). */
export function startLinks(pagePath: string) {
  used.set(norm(pagePath), new Set());
  usedTech.set(norm(pagePath), new Set());
  usedTerms.set(norm(pagePath), new Set());
}

/** Link the first mention of one of `rule.terms` in `html`, or return null if none is there. */
function linkFirst(html: string, rule: Rule, className: string): string | null {
  for (const term of rule.terms) {
    // Whole words only (accents count as letters), and never inside a link we already added.
    const except = rule.except?.length ? `(?!${rule.except.map((tail) => escapeRe(escapeHtml(tail))).join('|')})` : '';
    const re = new RegExp(`(?<![\\p{L}\\p{N}>])(${escapeRe(escapeHtml(term))})(?![\\p{L}\\p{N}])${except}(?![^<]*</a>)`, rule.exact || isAcronym(term) ? 'u' : 'iu');
    const match = re.exec(html);
    if (!match) continue;
    return `${html.slice(0, match.index)}<a class="${className}" href="${rule.to}">${match[1]}</a>${html.slice(match.index + match[1].length)}`;
  }
  return null;
}

/**
 * Escape `text` and link the first mention of up to `max` services, sectors or fixed
 * pages that this page has not linked yet (with `max` 2: one service and one of the
 * rest), the technologies it names, and one glossary term unless `terms` is false.
 * Returns HTML for set:html.
 */
export function linkify(text: string, lang: Lang, pagePath: string, max = 1, terms = true): string {
  const here = norm(pagePath);
  if (!used.has(here)) used.set(here, new Set());
  if (!usedTech.has(here)) usedTech.set(here, new Set());
  if (!usedTerms.has(here)) usedTerms.set(here, new Set());
  const done = used.get(here)!;
  const doneTech = usedTech.get(here)!;
  const doneTerms = usedTerms.get(here)!;
  let html = escapeHtml(text);
  let added = 0;
  // With two links in a paragraph, one goes to a service and the other elsewhere
  // (a sector, pricing, solutions), so no paragraph turns into a list of services.
  let serviceTaken = false;
  let otherTaken = false;
  for (const rule of rules(lang)) {
    if (added >= max || done.size >= MAX_PER_PAGE) break;
    if (done.has(rule.to) || norm(rule.to.split('#')[0]) === here) continue;
    const service = isService(rule.to);
    if (max === 2 && (service ? serviceTaken : otherTaken)) continue;
    const linked = linkFirst(html, rule, 'ctx-link');
    if (!linked) continue;
    html = linked;
    done.add(rule.to);
    added++;
    if (service) serviceTaken = true;
    else otherTaken = true;
  }
  let techAdded = 0;
  for (const rule of techRules(lang)) {
    if (techAdded >= MAX_TECH_PER_PARAGRAPH || doneTech.size >= MAX_TECH_PER_PAGE) break;
    if (doneTech.has(rule.to) || norm(rule.to) === here) continue;
    const linked = linkFirst(html, rule, 'ctx-link ctx-tech');
    if (!linked) continue;
    html = linked;
    doneTech.add(rule.to);
    techAdded++;
  }
  if (!terms) return html;
  for (const rule of termRules(lang, here)) {
    if (doneTerms.size >= MAX_TERMS_PER_PAGE) break;
    if (doneTerms.has(rule.to) || norm(rule.to) === here) continue;
    const linked = linkFirst(html, rule, 'ctx-link ctx-term');
    if (!linked) continue;
    html = linked;
    doneTerms.add(rule.to);
    break; // one glossary link per paragraph is enough
  }
  return html;
}
