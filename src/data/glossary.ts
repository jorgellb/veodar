// Glossary: the terms that come up in projects, each on its own page. A term links
// to the services and sectors where it is used and to related terms; services and
// sectors link back. Text lives in ./glossary/es.ts and ./glossary/en.ts, keyed by id.
import { termsEs } from './glossary/es';
import { termsEn } from './glossary/en';
import type { Lang } from '../i18n';

export type TermText = {
  /** Short name, as people write it: "OEE", "Prueba de entrega". */
  name: string;
  /** Expansion or second name, shown under the heading. */
  long?: string;
  /** <title> of the page (without the site name). */
  title: string;
  /** Meta description, when the first sentence of `def` does not fit. */
  desc?: string;
  /** The definition: one or two sentences that stand on their own. */
  def: string;
  /** How it works, in two paragraphs. */
  body: string[];
  /** How it shows up in a project of ours. */
  use: string;
  /** Hard facts for the card beside the text: [label, value]. */
  facts?: [string, string][];
  /** Phrases in running text that link to this term (all-caps ones match case-sensitively). */
  match?: string[];
};

export type CategoryId = 'ia' | 'web' | 'seo' | 'planta' | 'comercio' | 'finanzas' | 'oficio';

export const categories: { id: CategoryId; es: string; en: string }[] = [
  { id: 'ia', es: 'IA y automatización', en: 'AI and automation' },
  { id: 'web', es: 'Web, apps y producto', en: 'Web, apps and product' },
  { id: 'seo', es: 'SEO y visibilidad', en: 'SEO and visibility' },
  { id: 'planta', es: 'Industria y logística', en: 'Manufacturing and logistics' },
  { id: 'comercio', es: 'Comercio y hostelería', en: 'Retail and hospitality' },
  { id: 'finanzas', es: 'Finanzas y cumplimiento', en: 'Finance and compliance' },
  { id: 'oficio', es: 'Obra, energía, formación y despachos', en: 'Construction, energy, training and law' },
];

type Meta = {
  id: string;
  cat: CategoryId;
  /** Services where it is used; the first one is its home (it leads that service's list). */
  services: string[];
  sectors: string[];
  /** Related terms. */
  see: string[];
  /** The same concept on Wikipedia, for schema.org sameAs (checked by scripts/check-sameas.mjs). */
  wiki?: Partial<Record<Lang, string>>;
};

const meta: Meta[] = [
  // IA y automatización
  { id: 'agente-de-ia', cat: 'ia', services: ['automatizaciones-ia'], sectors: ['seguros', 'despachos-profesionales'], see: ['mcp', 'human-in-the-loop', 'prompt-injection', 'rag'], wiki: { en: 'AI_agent' } },
  { id: 'mcp', cat: 'ia', services: ['automatizaciones-ia', 'desarrollo-web'], sectors: [], see: ['agente-de-ia', 'prompt-injection', 'webhook'], wiki: { en: 'Model_Context_Protocol' } },
  { id: 'rag', cat: 'ia', services: ['automatizaciones-ia'], sectors: ['despachos-profesionales', 'salud'], see: ['agente-de-ia', 'mcp', 'human-in-the-loop'], wiki: { en: 'Retrieval-augmented_generation', es: 'Generación_aumentada_por_recuperación' } },
  { id: 'human-in-the-loop', cat: 'ia', services: ['automatizaciones-ia'], sectors: ['salud', 'banca-fintech', 'seguros'], see: ['agente-de-ia', 'prompt-injection', 'conciliacion-bancaria'], wiki: { en: 'Human-in-the-loop' } },
  { id: 'prompt-injection', cat: 'ia', services: ['automatizaciones-ia'], sectors: ['banca-fintech'], see: ['agente-de-ia', 'mcp', 'human-in-the-loop'], wiki: { en: 'Prompt_injection' } },
  // Web, apps y producto
  { id: 'offline-first', cat: 'web', services: ['aplicaciones-moviles', 'aplicaciones-escritorio'], sectors: ['logistica', 'industria', 'energia'], see: ['pwa', 'idempotencia', 'prueba-de-entrega'] },
  { id: 'pwa', cat: 'web', services: ['desarrollo-web', 'aplicaciones-moviles'], sectors: ['educacion'], see: ['offline-first', 'core-web-vitals'], wiki: { en: 'Progressive_web_app', es: 'Aplicación_web_progresiva' } },
  { id: 'webhook', cat: 'web', services: ['desarrollo-web', 'automatizaciones-ia'], sectors: ['retail-ecommerce', 'banca-fintech'], see: ['idempotencia', 'mcp', 'edi'], wiki: { en: 'Webhook', es: 'Webhook' } },
  { id: 'idempotencia', cat: 'web', services: ['desarrollo-web', 'aplicaciones-moviles'], sectors: ['banca-fintech'], see: ['webhook', 'offline-first', 'psd2-open-banking'], wiki: { en: 'Idempotence', es: 'Idempotencia' } },
  { id: 'design-tokens', cat: 'web', services: ['diseno-web', 'identidad-de-marca'], sectors: [], see: ['core-web-vitals', 'pwa'] },
  { id: 'webgpu', cat: 'web', services: ['web-3d-interactiva', 'desarrollo-creativo', 'configuradores-3d'], sectors: ['inmobiliaria-construccion'], see: ['cpq', 'core-web-vitals'], wiki: { en: 'WebGPU' } },
  { id: 'cpq', cat: 'web', services: ['configuradores-3d', 'desarrollo-web'], sectors: ['industria', 'retail-ecommerce'], see: ['webgpu', 'pim'], wiki: { en: 'Configure,_price_and_quote' } },
  // SEO y visibilidad
  { id: 'geo', cat: 'seo', services: ['seo-y-visibilidad', 'rediseno-web'], sectors: ['retail-ecommerce', 'hosteleria-turismo'], see: ['llms-txt', 'datos-estructurados', 'core-web-vitals'], wiki: { en: 'Generative_engine_optimization' } },
  { id: 'llms-txt', cat: 'seo', services: ['seo-y-visibilidad'], sectors: [], see: ['geo', 'datos-estructurados'] },
  { id: 'core-web-vitals', cat: 'seo', services: ['seo-y-visibilidad', 'desarrollo-web', 'rediseno-web', 'desarrollo-creativo', 'web-3d-interactiva'], sectors: [], see: ['geo', 'datos-estructurados', 'pwa'] },
  { id: 'datos-estructurados', cat: 'seo', services: ['seo-y-visibilidad', 'diseno-web', 'rediseno-web'], sectors: ['retail-ecommerce'], see: ['geo', 'llms-txt', 'pim'], wiki: { en: 'Schema.org', es: 'Schema.org' } },
  // Industria y logística
  { id: 'oee', cat: 'planta', services: ['aplicaciones-escritorio', 'automatizaciones-ia'], sectors: ['industria'], see: ['mes', 'scada', 'opc-ua'], wiki: { en: 'Overall_equipment_effectiveness' } },
  { id: 'mes', cat: 'planta', services: ['aplicaciones-escritorio', 'desarrollo-web'], sectors: ['industria', 'agroalimentacion'], see: ['oee', 'scada', 'opc-ua'], wiki: { en: 'Manufacturing_execution_system' } },
  { id: 'opc-ua', cat: 'planta', services: ['aplicaciones-escritorio'], sectors: ['industria', 'energia'], see: ['scada', 'mes', 'oee'], wiki: { en: 'OPC_Unified_Architecture' } },
  { id: 'scada', cat: 'planta', services: ['aplicaciones-escritorio', 'automatizaciones-ia'], sectors: ['industria', 'energia'], see: ['opc-ua', 'mes', 'oee'], wiki: { en: 'SCADA', es: 'SCADA' } },
  { id: 'sga', cat: 'planta', services: ['desarrollo-web', 'automatizaciones-ia'], sectors: ['logistica', 'retail-ecommerce'], see: ['prueba-de-entrega', 'edi', 'gs1-128'], wiki: { en: 'Warehouse_management_system' } },
  { id: 'prueba-de-entrega', cat: 'planta', services: ['aplicaciones-moviles'], sectors: ['logistica'], see: ['offline-first', 'sga', 'edi'], wiki: { en: 'Proof_of_delivery' } },
  { id: 'edi', cat: 'planta', services: ['automatizaciones-ia', 'desarrollo-web'], sectors: ['logistica', 'agroalimentacion', 'retail-ecommerce'], see: ['gs1-128', 'sga', 'webhook'], wiki: { en: 'Electronic_data_interchange', es: 'Intercambio_electrónico_de_datos' } },
  { id: 'gs1-128', cat: 'planta', services: ['aplicaciones-escritorio'], sectors: ['agroalimentacion', 'logistica'], see: ['edi', 'trazabilidad-alimentaria', 'sga'], wiki: { en: 'GS1-128', es: 'GS1-128' } },
  { id: 'trazabilidad-alimentaria', cat: 'planta', services: ['aplicaciones-moviles', 'desarrollo-web'], sectors: ['agroalimentacion'], see: ['gs1-128', 'edi', 'mes'], wiki: { en: 'Traceability', es: 'Trazabilidad' } },
  // Comercio y hostelería
  { id: 'pim', cat: 'comercio', services: ['automatizaciones-ia', 'desarrollo-web'], sectors: ['retail-ecommerce'], see: ['tpv', 'datos-estructurados', 'cpq'], wiki: { en: 'Product_information_management' } },
  { id: 'tpv', cat: 'comercio', services: ['aplicaciones-escritorio', 'desarrollo-web'], sectors: ['retail-ecommerce', 'hosteleria-turismo'], see: ['pim', 'verifactu', 'escandallo'], wiki: { en: 'Point_of_sale', es: 'Terminal_punto_de_venta' } },
  { id: 'pms', cat: 'comercio', services: ['desarrollo-web', 'aplicaciones-moviles'], sectors: ['hosteleria-turismo'], see: ['channel-manager', 'registro-de-viajeros', 'tpv'], wiki: { en: 'Property_management_system' } },
  { id: 'channel-manager', cat: 'comercio', services: ['diseno-web', 'desarrollo-web'], sectors: ['hosteleria-turismo'], see: ['pms', 'registro-de-viajeros'] },
  { id: 'escandallo', cat: 'comercio', services: ['automatizaciones-ia'], sectors: ['hosteleria-turismo', 'agroalimentacion'], see: ['tpv', 'pms'], wiki: { es: 'Escandallo' } },
  { id: 'registro-de-viajeros', cat: 'comercio', services: ['desarrollo-web', 'automatizaciones-ia'], sectors: ['hosteleria-turismo'], see: ['pms', 'channel-manager', 'encargado-del-tratamiento'] },
  // Finanzas y cumplimiento
  { id: 'kyc', cat: 'finanzas', services: ['automatizaciones-ia', 'aplicaciones-moviles'], sectors: ['banca-fintech', 'seguros', 'inmobiliaria-construccion'], see: ['psd2-open-banking', 'dora', 'human-in-the-loop'], wiki: { en: 'Know_your_customer' } },
  { id: 'psd2-open-banking', cat: 'finanzas', services: ['desarrollo-web', 'automatizaciones-ia'], sectors: ['banca-fintech'], see: ['conciliacion-bancaria', 'kyc', 'dora'], wiki: { en: 'Payment_Services_Directive' } },
  { id: 'conciliacion-bancaria', cat: 'finanzas', services: ['automatizaciones-ia'], sectors: ['banca-fintech', 'despachos-profesionales'], see: ['psd2-open-banking', 'human-in-the-loop', 'verifactu'], wiki: { en: 'Bank_reconciliation' } },
  { id: 'dora', cat: 'finanzas', services: ['desarrollo-web'], sectors: ['banca-fintech', 'seguros'], see: ['kyc', 'psd2-open-banking', 'encargado-del-tratamiento'], wiki: { en: 'Digital_Operational_Resilience_Act' } },
  { id: 'verifactu', cat: 'finanzas', services: ['desarrollo-web', 'aplicaciones-escritorio'], sectors: ['despachos-profesionales', 'retail-ecommerce', 'hosteleria-turismo'], see: ['tpv', 'conciliacion-bancaria'] },
  { id: 'datos-de-categoria-especial', cat: 'finanzas', services: ['desarrollo-web', 'automatizaciones-ia'], sectors: ['salud', 'seguros'], see: ['encargado-del-tratamiento', 'human-in-the-loop'] },
  { id: 'encargado-del-tratamiento', cat: 'finanzas', services: ['desarrollo-web', 'automatizaciones-ia'], sectors: ['salud', 'despachos-profesionales', 'educacion'], see: ['datos-de-categoria-especial', 'dora'] },
  // Obra, energía, formación y despachos
  { id: 'bc3', cat: 'oficio', services: ['desarrollo-web'], sectors: ['inmobiliaria-construccion'], see: ['certificacion-de-obra'] },
  { id: 'certificacion-de-obra', cat: 'oficio', services: ['aplicaciones-moviles', 'desarrollo-web'], sectors: ['inmobiliaria-construccion'], see: ['bc3', 'offline-first'] },
  { id: 'pvgis', cat: 'oficio', services: ['configuradores-3d', 'desarrollo-web'], sectors: ['energia'], see: ['scada', 'cpq'] },
  { id: 'fundae', cat: 'oficio', services: ['automatizaciones-ia', 'desarrollo-web'], sectors: ['educacion'], see: ['human-in-the-loop', 'encargado-del-tratamiento'] },
  { id: 'lexnet', cat: 'oficio', services: ['automatizaciones-ia'], sectors: ['despachos-profesionales'], see: ['dias-habiles', 'human-in-the-loop'] },
  { id: 'dias-habiles', cat: 'oficio', services: ['automatizaciones-ia'], sectors: ['despachos-profesionales'], see: ['lexnet', 'human-in-the-loop'], wiki: { es: 'Día_hábil' } },
];

export type Term = Meta & TermText;

const build = (texts: Record<string, TermText>): Term[] =>
  meta.map((m) => {
    const text = texts[m.id];
    if (!text) throw new Error(`Falta el texto del término ${m.id}`);
    return { ...m, ...text };
  });
const es = build(termsEs);
const en = build(termsEn);

export const termsFor = (lang: Lang) => (lang === 'en' ? en : es);
export const termById = (id: string, lang: Lang) => termsFor(lang).find((term) => term.id === id);
export const categoryName = (id: CategoryId, lang: Lang) => categories.find((c) => c.id === id)![lang];

/** Meta description: the explicit one, or the first sentence of the definition. */
export function termDescription(term: Term) {
  if (term.desc) return term.desc;
  const first = term.def.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? term.def;
  if (first.length <= 160) return first;
  return `${first.slice(0, first.lastIndexOf(' ', 156))}…`;
}

/** Terms used with a service: those that have it as home first, then the rest. */
export function termsOfService(service: string, lang: Lang, max = 8) {
  const all = termsFor(lang).filter((term) => term.services.includes(service));
  return [...all.filter((term) => term.services[0] === service), ...all.filter((term) => term.services[0] !== service)].slice(0, max);
}
/** Terms used in a sector. */
export const termsOfSector = (sector: string, lang: Lang, max = 9) => termsFor(lang).filter((term) => term.sectors.includes(sector)).slice(0, max);
