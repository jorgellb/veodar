// The decisions of scripts/indexnow.mjs, kept free of network and disk so
// tests/indexnow.test.js can cover them.

/** Every <url> of a sitemap as { url: lastmod } ('' when it has no <lastmod>). */
export function parseSitemap(xml) {
  const pages = {};
  for (const [, url, lastmod = ''] of xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)) pages[url] = lastmod;
  return pages;
}

/**
 * Which URLs to announce, given the live pages as { url: lastmod }.
 *  - all: every live page.
 *  - previous (what the last run announced, same shape): the pages that are new or whose
 *    lastmod changed, plus the ones that disappeared, so search engines drop them.
 *  - neither (a run by hand, with no memory): the pages changed in the last `days` days.
 */
export function pickUrls(pages, { all = false, previous = null, today = new Date(), days = 2 } = {}) {
  const live = Object.keys(pages);
  if (all) return live;
  if (previous) return [...live.filter((url) => previous[url] !== pages[url]), ...Object.keys(previous).filter((url) => !(url in pages))];
  const since = new Date(today.getTime() - days * 86_400_000).toISOString().slice(0, 10);
  return live.filter((url) => pages[url] >= since);
}
