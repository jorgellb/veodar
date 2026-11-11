// llms-full.txt: the whole site as one Markdown document per language, for an AI
// assistant or agent that is asked to read veodar.com. Built from the same data as
// the pages, so it cannot drift from them.
import { categories, termsFor } from './glossary';
import { localFor } from './local';
import { extrasFor, pagesFor, type Block, type Faq } from './pages';
import { sectorsFor } from './sectors';
import { servicesFor, serviceGroupsFor, serviceHref } from './services';
import { PROCESS_STEPS, techsFor } from './technologies';
import { company, site, siteText } from './site';
import { UPDATED } from './updated';
import { pathTo, sectorHref, techHref, termHref, type Lang } from '../i18n';

const url = (path: string) => new URL(path, site.url).href;

const L = {
  es: {
    intro: 'Contenido completo de veodar.com en español, en un solo documento. Cada sección indica la URL de la página de la que procede.',
    company: 'Empresa',
    contact: 'Contacto',
    updated: 'Actualizado',
    index: 'Índice resumido',
    other: 'Versión en inglés',
    services: 'Servicios',
    techs: 'Tecnologías',
    example: 'Ejemplo ilustrativo',
    sectors: 'Sectores',
    more: 'Soluciones y precios',
    local: 'Veodar en Almería',
    glossary: 'Glosario',
    get: 'Qué recibís',
    faq: 'Preguntas frecuentes',
    stack: 'Tecnologías y sistemas',
    project: 'En un proyecto',
  },
  en: {
    intro: 'The full content of veodar.com in English, in a single document. Every section gives the URL of the page it comes from.',
    company: 'Company',
    contact: 'Contact',
    updated: 'Updated',
    index: 'Short index',
    other: 'Spanish version',
    services: 'Services',
    techs: 'Technologies',
    example: 'Illustrative example',
    sectors: 'Industries',
    more: 'Solutions and pricing',
    local: 'Veodar in Almería',
    glossary: 'Glossary',
    get: 'What you get',
    faq: 'Frequently asked questions',
    stack: 'Technologies and systems',
    project: 'In a project',
  },
};

type Doc = { title: string; path: string; description: string; lead: string; blocks: Block[]; deliverables?: string[]; faq: Faq[]; stack?: string[] };

export function llmsFull(lang: Lang): string {
  const T = L[lang];
  const doc = (d: Doc) =>
    [
      `### ${d.title}`,
      `URL: ${url(d.path)}`,
      `> ${d.description}`,
      d.lead,
      ...d.blocks.flatMap((block) => [`#### ${block.heading}`, ...block.paragraphs]),
      ...(d.stack?.length ? [`**${T.stack}:** ${d.stack.join(', ')}.`] : []),
      ...(d.deliverables?.length ? [`#### ${T.get}`, d.deliverables.map((item) => `- ${item}`).join('\n')] : []),
      `#### ${T.faq}`,
      ...d.faq.map((item) => `**${item.q}**\n${item.a}`),
    ].join('\n\n');

  const services = servicesFor(lang);
  const serviceDocs = serviceGroupsFor(lang).flatMap((group) =>
    services
      .filter((service) => service.group === group.id)
      .map((service) =>
        doc({ title: service.title, path: serviceHref(service.slug, lang), description: service.description, lead: service.lead, blocks: service.blocks, deliverables: service.deliverables, faq: service.faq, stack: service.stack }),
      ),
  );
  // A technology page has its own sections; they are flattened into the same shape.
  const techDocs = techsFor(lang).map((tech) =>
    doc({
      title: tech.title,
      path: techHref(tech.id, lang),
      description: tech.description,
      lead: tech.lead,
      blocks: [
        { heading: tech.solve.heading, paragraphs: [tech.solve.intro, ...tech.solve.cases.map((item) => `**${item.h}.** ${item.p}`), `**${tech.solve.checkTitle}:** ${tech.solve.checks.join('; ')}.`] },
        { heading: tech.build.heading, paragraphs: [tech.build.intro, ...tech.build.items.map((item) => `**${item.name}.** ${item.text} (${item.examples.join(', ')}.)`)] },
        { heading: `${T.example}: ${tech.example.heading}`, paragraphs: [tech.example.intro, tech.example.note] },
        {
          heading: tech.fit.heading,
          paragraphs: [
            tech.fit.intro,
            `${[...tech.fit.inputs, ...tech.fit.outputs].map((node) => `${node.label} (${node.flow})`).join('; ')}.`,
            `**${tech.fit.checkTitle}:** ${tech.fit.checks.join('; ')}.`,
          ],
        },
        { heading: tech.process.heading, paragraphs: PROCESS_STEPS[lang].map((step, index) => `**${index + 1}. ${step}.** ${tech.process.steps[index]}`) },
      ],
      deliverables: tech.process.deliverables,
      faq: tech.faq,
    }),
  );
  const sectorDocs = sectorsFor(lang).map((sector) =>
    doc({ title: sector.title, path: sectorHref(sector.id, lang), description: sector.description, lead: sector.lead, blocks: sector.blocks, deliverables: sector.deliverables, faq: sector.faq, stack: sector.stack }),
  );
  const extras = extrasFor(lang);
  const infoDocs = (['soluciones', 'precios'] as const).map((id) => {
    const page = pagesFor(lang).find((item) => item.slug === id)!;
    return doc({ title: page.title, path: pathTo(id, lang), description: page.description, lead: page.lead, blocks: page.blocks, deliverables: extras[id].deliverables, faq: page.faq });
  });
  const local = localFor(lang);
  const localDoc = doc({ title: local.title, path: pathTo('almeria', lang), description: local.description, lead: local.lead, blocks: local.blocks, deliverables: local.deliverables, faq: local.faq });
  const terms = termsFor(lang);
  const glossary = categories.flatMap((category) => [
    `### ${category[lang]}`,
    ...terms
      .filter((term) => term.cat === category.id)
      .map((term) =>
        [`#### ${term.name}${term.long ? ` (${term.long})` : ''}`, `URL: ${url(termHref(term.id, lang))}`, term.def, ...term.body, `**${T.project}:** ${term.use}`].join('\n\n'),
      ),
  ]);

  return `${[
    `# ${site.name}`,
    `> ${siteText[lang].description}`,
    T.intro,
    [
      `${T.company}: ${company.legalName} (NIF ${company.taxId}), ${company.street}, ${company.postalCode} ${company.locality}, ${company.region}, ${company.country[lang]}`,
      `${T.contact}: ${site.email} · ${url(pathTo('contacto', lang))}`,
      `${T.updated}: ${UPDATED.home}`,
      `${T.index}: ${url('/llms.txt')}`,
      `${T.other}: ${url(lang === 'en' ? '/llms-full-es.txt' : '/llms-full.txt')}`,
    ].join('\n'),
    `## ${T.services}`,
    ...serviceDocs,
    `## ${T.techs}`,
    ...techDocs,
    `## ${T.sectors}`,
    ...sectorDocs,
    `## ${T.more}`,
    ...infoDocs,
    `## ${T.local}`,
    localDoc,
    `## ${T.glossary}`,
    ...glossary,
  ].join('\n\n')}\n`;
}
