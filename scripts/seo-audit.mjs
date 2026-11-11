#!/usr/bin/env node
// SEO audit of the built site (dist/). Run `npm run build` first, then
// `npm run seo:audit`. Add `--json file.json` to save the numbers and
// `--verbose` for the per-page tables. Exits 1 when it finds errors.
//
// It checks what a crawler would see: status of every internal link and
// #fragment, the internal link graph (depth from the home page, orphans, links
// from running content vs. menus), anchor texts, titles, descriptions,
// headings, hreflang pairs, canonicals, structured data and the sitemap.
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const ORIGIN = 'https://veodar.com';
const args = process.argv.slice(2);
const jsonOut = args.includes('--json') ? args[args.indexOf('--json') + 1] : null;
const verbose = args.includes('--verbose');

if (!existsSync(DIST)) {
  console.error('No dist/ folder. Run `npm run build` first.');
  process.exit(2);
}

// ── Read every page ──────────────────────────────────────────────────────
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name === 'index.html') files.push(full);
  }
})(DIST);

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
const text = (html) =>
  decode(
    html
      .replace(/<(script|style|svg|template)\b[\s\S]*?<\/\1>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return m ? decode(m[1]) : null;
};
const pathOf = (file) => {
  const dir = file.slice(DIST.length, -'index.html'.length);
  return dir || '/';
};

const pages = new Map();
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const path = pathOf(file);
  const mainStart = html.indexOf('<main');
  const mainEnd = html.lastIndexOf('</main>');
  const main = mainStart >= 0 ? html.slice(mainStart, mainEnd) : '';
  const head = html.slice(0, html.indexOf('</head>'));
  const hreflang = {};
  for (const m of head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) hreflang[m[1]] = m[2];
  let ld = [];
  let ldError = null;
  const ldTag = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (ldTag) {
    try {
      ld = JSON.parse(ldTag[1])['@graph'] ?? [];
    } catch (error) {
      ldError = String(error);
    }
  }
  const links = [];
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const href = attr(m[1], 'href');
    if (!href) continue;
    const anchor = text(m[2]) || attr(m[1], 'aria-label') || '';
    links.push({
      href,
      anchor,
      zone: m.index > mainStart && m.index < mainEnd ? 'main' : 'chrome',
      inText: /class="[^"]*ctx-link/.test(m[1]),
      rel: attr(m[1], 'rel') ?? '',
      target: attr(m[1], 'target') ?? '',
    });
  }
  const headings = [...main.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => ({ level: Number(m[1]), text: text(m[2]) }));
  pages.set(path, {
    path,
    bytes: Buffer.byteLength(html),
    lang: (html.match(/<html lang="([^"]+)"/) ?? [])[1] ?? '',
    title: decode((head.match(/<title>([\s\S]*?)<\/title>/) ?? [])[1] ?? ''),
    description: decode((head.match(/<meta name="description" content="([^"]*)"/) ?? [])[1] ?? ''),
    canonical: (head.match(/<link rel="canonical" href="([^"]+)"/) ?? [])[1] ?? '',
    robots: (head.match(/<meta name="robots" content="([^"]*)"/) ?? [])[1] ?? '',
    hreflang,
    ld,
    ldError,
    links,
    headings,
    ids: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
    words: text(main).split(' ').filter(Boolean).length,
    imgNoAlt: [...html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)].length,
  });
}

// ── Resolve links ────────────────────────────────────────────────────────
const errors = [];
const warnings = [];
const notes = [];
const isIndexable = (p) => !p.robots.includes('noindex');
const indexable = [...pages.values()].filter(isIndexable);

const resolve = (href, from) => {
  if (/^(mailto:|tel:|javascript:)/.test(href)) return null;
  let url = href;
  if (url.startsWith(ORIGIN)) url = url.slice(ORIGIN.length) || '/';
  if (/^https?:\/\//.test(url)) return { external: href };
  if (url.startsWith('#')) return { path: from, hash: url.slice(1), raw: href };
  if (!url.startsWith('/')) return { path: null, raw: href };
  const [path, hash = ''] = url.split('#');
  return { path: path.split('?')[0], hash, raw: href };
};

const inbound = new Map([...pages.keys()].map((p) => [p, { main: new Map(), chrome: new Map(), text: new Map() }]));
const external = new Map();
for (const page of pages.values()) {
  for (const link of page.links) {
    const to = resolve(link.href, page.path);
    if (!to) continue;
    if (to.external) {
      const list = external.get(to.external) ?? [];
      list.push({ from: page.path, rel: link.rel, target: link.target });
      external.set(to.external, list);
      if (link.target === '_blank' && !/noopener/.test(link.rel)) warnings.push(`${page.path}: external link without rel=noopener → ${to.external}`);
      continue;
    }
    if (to.path === null) {
      errors.push(`${page.path}: relative link "${to.raw}"`);
      continue;
    }
    const target = pages.get(to.path);
    if (!target) {
      const asFile = join(DIST, to.path);
      if (existsSync(asFile) && statSync(asFile).isFile()) continue;
      if (pages.has(`${to.path}/`)) warnings.push(`${page.path}: link without trailing slash (redirects) → ${to.raw}`);
      else errors.push(`${page.path}: broken link → ${to.raw}`);
      continue;
    }
    if (to.hash && !target.ids.has(to.hash)) errors.push(`${page.path}: broken anchor → ${to.raw}`);
    if (to.path === page.path) continue;
    const bucket = inbound.get(to.path)[link.zone];
    const anchors = bucket.get(page.path) ?? [];
    anchors.push(link.anchor);
    bucket.set(page.path, anchors);
    if (link.inText) {
      const t = inbound.get(to.path).text;
      t.set(page.path, [...(t.get(page.path) ?? []), link.anchor]);
    }
  }
}

// ── Depth from the home page ─────────────────────────────────────────────
// Clicks from the home page of each language: / for Spanish pages, /en/ for English ones.
const depth = new Map([['/', 0], ['/en/', 0]]);
const queue = ['/', '/en/'].filter((path) => pages.has(path));
while (queue.length) {
  const cur = queue.shift();
  for (const link of pages.get(cur).links) {
    const to = resolve(link.href, cur);
    if (!to || to.external || !to.path || !pages.has(to.path) || depth.has(to.path)) continue;
    depth.set(to.path, depth.get(cur) + 1);
    queue.push(to.path);
  }
}

// ── Checks ───────────────────────────────────────────────────────────────
const dup = (key, label, list = indexable) => {
  const seen = new Map();
  for (const p of list) seen.set(p[key], [...(seen.get(p[key]) ?? []), p.path]);
  for (const [value, where] of seen) if (value && where.length > 1) errors.push(`duplicate ${label} on ${where.join(', ')}: "${value.slice(0, 70)}"`);
};
dup('title', 'title');
dup('description', 'description');

const sitemap = existsSync(join(DIST, 'sitemap.xml')) ? readFileSync(join(DIST, 'sitemap.xml'), 'utf8') : '';
const inSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, '') || '/'));

for (const p of pages.values()) {
  if (p.path === '/404/' || p.path.endsWith('/404/')) continue;
  const index = isIndexable(p);
  if (p.ldError) errors.push(`${p.path}: JSON-LD does not parse (${p.ldError})`);
  if (p.imgNoAlt) errors.push(`${p.path}: ${p.imgNoAlt} <img> without alt`);
  const h1 = p.headings.filter((h) => h.level === 1);
  if (h1.length !== 1) errors.push(`${p.path}: ${h1.length} h1`);
  let last = 0;
  for (const h of p.headings) {
    if (last && h.level > last + 1) warnings.push(`${p.path}: heading jumps h${last} → h${h.level} ("${h.text.slice(0, 40)}")`);
    last = h.level;
  }
  if (!index) {
    if (inSitemap.has(p.path)) errors.push(`${p.path}: noindex but listed in the sitemap`);
    continue;
  }
  if (p.title.length > 62) warnings.push(`${p.path}: title ${p.title.length} chars`);
  if (p.title.length < 30) warnings.push(`${p.path}: short title (${p.title.length}): "${p.title}"`);
  if (p.description.length > 160) warnings.push(`${p.path}: description ${p.description.length} chars`);
  if (p.description.length < 110) warnings.push(`${p.path}: short description (${p.description.length})`);
  if (p.canonical !== ORIGIN + p.path) errors.push(`${p.path}: canonical is ${p.canonical}`);
  if (!inSitemap.has(p.path)) errors.push(`${p.path}: indexable but missing from the sitemap`);
  if (!depth.has(p.path)) errors.push(`${p.path}: unreachable from the home page`);
  const langs = Object.keys(p.hreflang).sort().join();
  if (langs !== 'en,es,x-default') errors.push(`${p.path}: hreflang set is "${langs}"`);
  else {
    const other = p.hreflang[p.lang === 'es' ? 'en' : 'es'].replace(ORIGIN, '');
    if (p.hreflang[p.lang] !== ORIGIN + p.path) errors.push(`${p.path}: hreflang for its own language points elsewhere`);
    if (pages.get(other)?.hreflang[p.lang] !== ORIGIN + p.path) errors.push(`${p.path}: hreflang not returned by ${other}`);
  }
  const into = inbound.get(p.path);
  if (into.main.size + into.chrome.size === 0) errors.push(`${p.path}: orphan page (no internal links)`);
  if (p.words < 250) warnings.push(`${p.path}: thin content (${p.words} words)`);
}
for (const path of inSitemap) if (!pages.has(path)) errors.push(`sitemap lists a page that does not exist: ${path}`);

// ── Report ───────────────────────────────────────────────────────────────
const rows = indexable
  .map((p) => {
    const into = inbound.get(p.path);
    const anchors = new Map();
    for (const list of into.main.values()) for (const a of list) anchors.set(a, (anchors.get(a) ?? 0) + 1);
    return {
      path: p.path,
      lang: p.lang,
      depth: depth.get(p.path) ?? -1,
      words: p.words,
      kb: Math.round(p.bytes / 1024),
      inMain: into.main.size,
      inText: into.text.size,
      inChrome: into.chrome.size,
      outMain: new Set(p.links.filter((l) => l.zone === 'main').map((l) => resolve(l.href, p.path)?.path).filter((x) => x && x !== p.path && pages.has(x))).size,
      anchors: [...anchors.entries()].sort((a, b) => b[1] - a[1]),
      types: p.ld.map((n) => n['@type']).flat(),
    };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

const avg = (list, f) => (list.length ? list.reduce((s, x) => s + f(x), 0) / list.length : 0);
const summary = {
  pages: pages.size,
  indexable: indexable.length,
  errors: errors.length,
  warnings: warnings.length,
  maxDepth: Math.max(...rows.map((r) => r.depth)),
  avgContentInlinks: Number(avg(rows, (r) => r.inMain).toFixed(1)),
  avgInTextInlinks: Number(avg(rows, (r) => r.inText).toFixed(1)),
  pagesUnder3ContentInlinks: rows.filter((r) => r.inMain < 3).length,
  pagesWithoutInTextInlinks: rows.filter((r) => r.inText === 0).length,
  avgWords: Math.round(avg(rows, (r) => r.words)),
  totalKb: rows.reduce((s, r) => s + r.kb, 0),
  heaviest: [...rows].sort((a, b) => b.kb - a.kb).slice(0, 5).map((r) => `${r.path} ${r.kb} KB`),
  externalDomains: [...new Set([...external.keys()].map((u) => new URL(u).hostname))].sort(),
};

console.log(`\nSEO audit · ${summary.pages} pages (${summary.indexable} indexable)`);
console.log(`  depth from home: max ${summary.maxDepth}`);
console.log(`  links from page content: ${summary.avgContentInlinks} source pages per page on average; ${summary.pagesUnder3ContentInlinks} pages have fewer than 3`);
console.log(`  links inside running text: ${summary.avgInTextInlinks} per page on average; ${summary.pagesWithoutInTextInlinks} pages receive none`);
console.log(`  words per page: ${summary.avgWords} on average · HTML total ${summary.totalKb} KB`);
console.log(`  heaviest: ${summary.heaviest.join(' · ')}`);
if (verbose) {
  console.log('\n  path · depth · words · KB · content-in · text-in · menu-in · content-out · top anchors');
  for (const r of rows)
    console.log(
      `  ${r.path.padEnd(52)} d${r.depth} ${String(r.words).padStart(5)}w ${String(r.kb).padStart(5)}KB  in ${String(r.inMain).padStart(2)}/${String(r.inText).padStart(2)}/${String(r.inChrome).padStart(2)}  out ${String(r.outMain).padStart(2)}  ${r.anchors
        .slice(0, 3)
        .map(([a, n]) => `"${a.slice(0, 28)}"×${n}`)
        .join(' ')}`,
    );
}
if (errors.length) console.log(`\n✗ ${errors.length} errors\n` + errors.map((e) => `  - ${e}`).join('\n'));
if (warnings.length) console.log(`\n! ${warnings.length} warnings\n` + warnings.slice(0, verbose ? 500 : 25).map((w) => `  - ${w}`).join('\n') + (warnings.length > 25 && !verbose ? `\n  … ${warnings.length - 25} more (use --verbose)` : ''));
if (!errors.length && !warnings.length) console.log('\n✓ no errors or warnings');
for (const n of notes) console.log(`  · ${n}`);

if (jsonOut) writeFileSync(jsonOut, JSON.stringify({ summary, rows, errors, warnings }, null, 2));
process.exit(errors.length ? 1 : 0);
