// The technologies Veodar is hired to program in, in two groups: the ones a website or
// a server is built with and the ones a mobile app is built with. Each technology has a
// card (shown on the index, on the page of the service its group hangs from and wherever
// it is related) and a page of its own. What every language shares lives here; the text
// is in ./tech/: es.ts and en.ts (web), es-mobile.ts and en-mobile.ts (mobile) and
// groups.ts (the words of each group).
import type { Faq } from './pages';
import type { Tint } from './services';
import { techGroupHref, TECH_GROUP_ANCHORS, type Lang } from '../i18n';
import { techEs } from './tech/es';
import { techEn } from './tech/en';
import { mobileEs } from './tech/es-mobile';
import { mobileEn } from './tech/en-mobile';
import { groupText, type GroupText } from './tech/groups';

/** Ids (the Spanish slugs), in the order they are always listed inside their group. */
export const WEB_IDS = ['wordpress', 'astro', 'react', 'nextjs', 'nodejs', 'python', 'ia-generativa', 'javascript'] as const;
export const MOBILE_IDS = ['react-native', 'expo', 'swift', 'swiftui', 'kotlin', 'jetpack-compose', 'sqlite', 'notificaciones-push'] as const;
export const TECH_IDS = [...WEB_IDS, ...MOBILE_IDS] as const;
export type WebTechId = (typeof WEB_IDS)[number];
export type MobileTechId = (typeof MOBILE_IDS)[number];
export type TechId = (typeof TECH_IDS)[number];

/** The groups, in the order the index lists them, and the service each one hangs from. */
export const TECH_GROUPS = ['web', 'movil'] as const;
export type TechGroup = (typeof TECH_GROUPS)[number];
const GROUP_SERVICE: Record<TechGroup, string> = { web: 'desarrollo-web', movil: 'aplicaciones-moviles' };

/** A box of the connections diagram: what it is, what travels along its wire and, sometimes, where to read more. */
export type TechNode = { label: string; flow: string; tech?: TechId; service?: string };

export type TechText = {
  /** The technology as it is written: "Next.js". */
  name: string;
  /** What kind of thing it is, over the headline: "Tecnología · Framework web". */
  kicker: string;
  /** The card: its heading names the service, its text says what gets built. */
  card: { title: string; text: string };
  title: string;
  description: string;
  h1: string;
  lead: string;
  scene: { title: string; caption: string };
  /** What a company can solve with it, and what to look at before starting. */
  solve: {
    heading: string;
    intro: string;
    cases: { h: string; p: string }[];
    /** Caption of the close-up of the scene shown beside the checklist. */
    detail: string;
    checkTitle: string;
    checks: string[];
  };
  /** Three or four services; each is tied to one module of the scene. */
  build: { heading: string; intro: string; items: { label: string; name: string; text: string; examples: string[] }[] };
  /** Heading and words around the demo; the demo's own interface text lives in its component. */
  example: { heading: string; intro: string; note: string };
  /** What it connects to: what comes in on the left, what goes out on the right. */
  fit: { heading: string; intro: string; inputs: TechNode[]; core: { label: string; note: string }; outputs: TechNode[]; checkTitle: string; checks: string[] };
  /** One line per step of PROCESS_STEPS, written for this technology, and what is handed over. */
  process: { heading: string; steps: string[]; deliverablesTitle: string; deliverables: string[] };
  faq: Faq[];
  cta: { title: string; text: string; bringTitle: string; bring: string[] };
};

type TechMeta = {
  id: TechId;
  group: TechGroup;
  /** Name of the isometric scene (src/generated/<figure>.svg). */
  figure: string;
  tint: Tint;
  /** Line icon used where a card would be too much (lists of related technologies). */
  icon: string;
  /** Module of the scene behind each service, in the order of build.items. */
  parts: string[];
  /** Services of the site it is usually part of. */
  services: string[];
  /** Technologies it is most often combined with. */
  techs: TechId[];
};

const meta: TechMeta[] = [
  { id: 'wordpress', group: 'web', icon: 'layout', figure: 'cartridge', tint: 'sky', parts: ['cartridge', 'socket', 'admin', 'site'], services: ['desarrollo-web', 'rediseno-web', 'seo-y-visibilidad'], techs: ['astro', 'javascript', 'nodejs'] },
  { id: 'astro', group: 'web', icon: 'bolt', figure: 'pagepress', tint: 'butter', parts: ['head', 'tray', 'pages', 'island'], services: ['desarrollo-web', 'rediseno-web', 'seo-y-visibilidad'], techs: ['wordpress', 'react', 'javascript'] },
  { id: 'react', group: 'web', icon: 'grid', figure: 'instruments', tint: 'mint', parts: ['list', 'dial', 'filters', 'record'], services: ['desarrollo-web', 'diseno-web', 'aplicaciones-moviles'], techs: ['nextjs', 'nodejs', 'javascript'] },
  { id: 'nextjs', group: 'web', icon: 'layers', figure: 'storeys', tint: 'lilac', parts: ['public', 'gate', 'base', 'riser'], services: ['desarrollo-web', 'automatizaciones-ia', 'diseno-web'], techs: ['react', 'nodejs', 'ia-generativa'] },
  { id: 'nodejs', group: 'web', icon: 'sliders', figure: 'switchboard', tint: 'butter', parts: ['panel', 'inbound', 'systems', 'queue'], services: ['desarrollo-web', 'automatizaciones-ia', 'aplicaciones-moviles'], techs: ['python', 'nextjs', 'ia-generativa'] },
  { id: 'python', group: 'web', icon: 'refresh', figure: 'tabulator', tint: 'sky', parts: ['trays', 'clean', 'report', 'timer'], services: ['automatizaciones-ia', 'desarrollo-web', 'aplicaciones-escritorio'], techs: ['nodejs', 'ia-generativa', 'javascript'] },
  { id: 'ia-generativa', group: 'web', icon: 'spark', figure: 'archive', tint: 'blush', parts: ['cabinet', 'core', 'answer', 'review'], services: ['automatizaciones-ia', 'desarrollo-web', 'seo-y-visibilidad'], techs: ['python', 'nodejs', 'nextjs'] },
  { id: 'javascript', group: 'web', icon: 'browser', figure: 'chipslot', tint: 'mint', parts: ['calculator', 'form', 'board', 'chip'], services: ['desarrollo-web', 'rediseno-web', 'diseno-web'], techs: ['react', 'wordpress', 'astro'] },
  { id: 'react-native', group: 'movil', icon: 'phone', figure: 'twinbench', tint: 'mint', parts: ['phones', 'native', 'source', 'web'], services: ['aplicaciones-moviles', 'desarrollo-web', 'automatizaciones-ia'], techs: ['expo', 'sqlite', 'react'] },
  { id: 'expo', group: 'movil', icon: 'bolt', figure: 'dispatch', tint: 'butter', parts: ['tester', 'builder', 'store', 'ota'], services: ['aplicaciones-moviles', 'desarrollo-web', 'diseno-web'], techs: ['react-native', 'notificaciones-push', 'nodejs'] },
  { id: 'swift', group: 'movil', icon: 'cube', figure: 'fixture', tint: 'sky', parts: ['phone', 'probes', 'family', 'seal'], services: ['aplicaciones-moviles', 'aplicaciones-escritorio', 'automatizaciones-ia'], techs: ['swiftui', 'sqlite', 'notificaciones-push'] },
  { id: 'swiftui', group: 'movil', icon: 'layout', figure: 'composer', tint: 'lilac', parts: ['frame', 'case', 'plate', 'preview'], services: ['aplicaciones-moviles', 'diseno-web', 'aplicaciones-escritorio'], techs: ['swift', 'jetpack-compose', 'react-native'] },
  { id: 'kotlin', group: 'movil', icon: 'grid', figure: 'fleet', tint: 'mint', parts: ['rack', 'worker', 'periph', 'console'], services: ['aplicaciones-moviles', 'automatizaciones-ia', 'desarrollo-web'], techs: ['jetpack-compose', 'sqlite', 'notificaciones-push'] },
  { id: 'jetpack-compose', group: 'movil', icon: 'layers', figure: 'stretcher', tint: 'blush', parts: ['frame', 'scale', 'theme', 'adapter'], services: ['aplicaciones-moviles', 'diseno-web', 'desarrollo-web'], techs: ['kotlin', 'swiftui', 'react-native'] },
  { id: 'sqlite', group: 'movil', icon: 'key', figure: 'cardvault', tint: 'sky', parts: ['cabinet', 'sync', 'index', 'lock'], services: ['aplicaciones-moviles', 'aplicaciones-escritorio', 'automatizaciones-ia'], techs: ['react-native', 'kotlin', 'nodejs'] },
  { id: 'notificaciones-push', group: 'movil', icon: 'bell', figure: 'annunciator', tint: 'butter', parts: ['relays', 'console', 'selector', 'phone'], services: ['aplicaciones-moviles', 'automatizaciones-ia', 'desarrollo-web'], techs: ['expo', 'nodejs', 'swift'] },
];

/** Every scene also has a close-up of the moment it explains, shown in "what you can solve". */
export const DETAIL_PART = 'detail';

/** The process is the same five steps on every page; only what each one means changes. */
export const PROCESS_STEPS: Record<Lang, string[]> = {
  es: ['Revisión inicial', 'Alcance', 'Primera entrega', 'Validación', 'Documentación'],
  en: ['Initial review', 'Scope', 'First release', 'Validation', 'Documentation'],
};

type BuildItem = TechText['build']['items'][number] & { part: string };
export type Tech = TechMeta &
  Omit<TechText, 'solve' | 'build'> & {
    /** Its place inside its group, as the cards print it: "03". */
    number: string;
    solve: TechText['solve'] & { part: string };
    build: Omit<TechText['build'], 'items'> & { items: BuildItem[] };
  };

const TEXTS: Record<Lang, Record<TechId, TechText>> = { es: { ...techEs, ...mobileEs }, en: { ...techEn, ...mobileEn } };

function join(lang: Lang): Tech[] {
  const texts = TEXTS[lang];
  const seen: Partial<Record<TechGroup, number>> = {};
  return meta.map((item) => {
    const text = texts[item.id];
    if (!text) throw new Error(`Falta el texto de ${item.id} (${lang})`);
    if (text.build.items.length !== item.parts.length) throw new Error(`${item.id} (${lang}): ${text.build.items.length} servicios para ${item.parts.length} módulos`);
    const place = (seen[item.group] = (seen[item.group] ?? 0) + 1);
    return {
      ...item,
      ...text,
      number: String(place).padStart(2, '0'),
      solve: { ...text.solve, part: DETAIL_PART },
      build: { ...text.build, items: text.build.items.map((entry, index) => ({ ...entry, part: item.parts[index] })) },
    };
  });
}
const all: Record<Lang, Tech[]> = { es: join('es'), en: join('en') };

/** Every technology in a language, group after group (same order and ids in both). */
export const techsFor = (lang: Lang) => all[lang];
/** The technologies of one group. */
export const techsOf = (group: TechGroup, lang: Lang) => all[lang].filter((tech) => tech.group === group);
export const techById = (id: string, lang: Lang) => all[lang].find((tech) => tech.id === id);

export type TechGroupInfo = GroupText & {
  id: TechGroup;
  /** The service whose page shows this group and whose menu entry it hangs from. */
  service: string;
  /** Id of the group's section on the index. */
  anchor: string;
  /** The index, at that section. */
  href: string;
  techs: Tech[];
};
/** The groups in a language, each with its words and its technologies. */
export const groupsFor = (lang: Lang): TechGroupInfo[] =>
  TECH_GROUPS.map((id) => ({ ...groupText[lang][id], id, service: GROUP_SERVICE[id], anchor: TECH_GROUP_ANCHORS[id][lang], href: techGroupHref(id, lang), techs: techsOf(id, lang) }));
/** The group a service page shows, if it has one. */
export const groupOfService = (service: string, lang: Lang) => groupsFor(lang).find((group) => group.service === service);

// The names a service page lists as its stack, when they are not the technology's own.
const STACK_NAMES: Record<string, TechId> = { 'React 19': 'react', Push: 'notificaciones-push' };
/** The technology a name in a service's stack stands for, if it has a page. */
export const techOfStack = (label: string): TechId | undefined => STACK_NAMES[label] ?? all.es.find((tech) => tech.name === label)?.id;
