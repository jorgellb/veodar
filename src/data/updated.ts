// The date each group of pages last changed in substance. The sitemap's <lastmod>,
// the schema.org dateModified and the visible "Actualizado" line all read from here,
// so search engines get one consistent, truthful signal. Bump a date only when that
// content really changes; a rebuild alone should not make every page look new.
export const UPDATED = {
  home: '2026-11-10',
  services: '2026-11-10',
  sectors: '2026-11-10',
  pages: '2026-11-10',
  glossary: '2026-11-10',
  local: '2026-11-10',
  legal: '2026-11-10',
} as const;
export type UpdatedKey = keyof typeof UPDATED;
