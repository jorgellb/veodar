// The date each group of pages last changed in substance. The sitemap's <lastmod>,
// the schema.org dateModified and the visible "Actualizado" line all read from here,
// so search engines get one consistent, truthful signal. Bump a date only when that
// content really changes; a rebuild alone should not make every page look new.
export const UPDATED = {
  home: '2026-11-11',
  services: '2026-11-10',
  tech: '2026-11-11',
  sectors: '2026-11-10',
  pages: '2026-11-10',
  glossary: '2026-11-10',
  local: '2026-11-10',
  legal: '2026-11-10',
} as const;
export type UpdatedKey = keyof typeof UPDATED;

// Pages that changed after the rest of their group, all on 2026-11-11: the web
// development and mobile apps pages gained their block of technologies (and the mobile
// one two paragraphs), and the AI automation page a paragraph.
const SERVICE_UPDATED: Record<string, string> = {
  'desarrollo-web': '2026-11-11',
  'automatizaciones-ia': '2026-11-11',
  'aplicaciones-moviles': '2026-11-11',
};
/** The date a service page last changed in substance. */
export const serviceUpdated = (id: string) => SERVICE_UPDATED[id] ?? UPDATED.services;
