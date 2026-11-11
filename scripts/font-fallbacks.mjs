// Fallback fonts that take the same room as the real ones, so the page does not move
// when Fraunces and Geist arrive (README, "Tipografías de reserva"). The rules
// themselves are explained in scripts/font-fallbacks-css.mjs.
//
//   node scripts/font-fallbacks.mjs             writes src/styles/font-fallbacks.css from scripts/font-fallbacks.json
//   node scripts/font-fallbacks.mjs --measure   measures the fonts again first and rewrites the JSON
//
// Rerun it without arguments when a heading's font-size changes in global.css.
//
// --measure needs Chrome, a build in dist/ (its headings and lead paragraphs are the
// sample) and the fonts it compares against installed: Liberation Serif and Sans (they
// have the metrics of Times New Roman and Arial), Noto Serif and Roboto. A font that is
// not installed keeps the numbers it had, or can be measured from a .woff2 file:
//   --with "roboto regular=Roboto.woff2" --with "noto italic=NotoSerif-Italic.woff2"
// (faces: times regular, times italic, noto regular, noto italic, arial regular,
// arial bold, roboto regular).
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { openPage } from './chrome.mjs';
import { LOCAL, SIZES, css, local } from './font-fallbacks-css.mjs';

const root = new URL('../', import.meta.url).pathname;
const dataFile = join(root, 'scripts/font-fallbacks.json');
const cssFile = join(root, 'src/styles/font-fallbacks.css');
const globalCss = join(root, 'src/styles/global.css');
/** Weight the bold body set is measured at: the one buttons and labels use most. */
const BOLD = 560;

/** Headings and lead paragraphs of the built site: the text the scales are fitted to. */
function sample() {
  const dist = join(root, 'dist');
  if (!existsSync(dist)) throw new Error('No hay dist/. Compila antes: npm run build.');
  const pages = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? pages(join(dir, entry.name)) : entry.name === 'index.html' ? [join(dir, entry.name)] : []));
  const text = (html) =>
    html
      .replace(/<[^>]+>/g, '')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  const heads = new Set();
  const leads = new Set();
  for (const file of pages(dist)) {
    const html = readFileSync(file, 'utf8');
    for (const [, inner] of html.matchAll(/<h[12][^>]*class="[^"]*\bdisplay\b[^"]*"[^>]*>([\s\S]*?)<\/h[12]>/g)) heads.add(text(inner));
    for (const [, inner] of html.matchAll(/<p[^>]*class="[^"]*\blead\b[^"]*"[^>]*>([\s\S]*?)<\/p>/g)) leads.add(text(inner));
  }
  return { heads: [...heads].filter((line) => line.length > 8), leads: [...leads].filter((line) => line.length > 40) };
}

/** Runs inside the page. Returns every scale as "real width / fallback width". */
async function measureInPage({ real, locals, sizes, heads, leads, bold }) {
  const style = document.createElement('style');
  style.textContent = [
    ...Object.entries(real).map(([family, face]) => `@font-face{font-family:"${family}";src:url(${face.url}) format("woff2");font-weight:100 900;font-style:${face.style}}`),
    ...Object.entries(locals).map(([family, face]) => `@font-face{font-family:"${family}";src:${face.src};font-weight:${face.weight};font-style:${face.style}}`),
  ].join('\n');
  document.head.append(style);
  const host = document.createElement('div');
  host.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;white-space:pre;letter-spacing:0;font-optical-sizing:auto';
  const span = host.appendChild(document.createElement('span'));
  const box = host.appendChild(document.createElement('div'));
  box.style.width = '100ch';
  document.body.append(host);
  /** Width of a text in ems. */
  const width = (family, size, weight, slant, text) => {
    host.style.font = `${slant} ${weight} ${size}px ${family}`;
    span.textContent = text;
    return span.getBoundingClientRect().width / size;
  };
  /** The ch unit in ems: the advance of one "0". A row of zeros would add the kerning between them. */
  const ch = (family, size, weight, slant) => {
    host.style.font = `${slant} ${weight} ${size}px ${family}`;
    return box.getBoundingClientRect().width / 100 / size;
  };
  const faces = { ...real, ...locals };
  await Promise.allSettled(Object.keys(faces).map((family) => document.fonts.load(`${faces[family].style} ${faces[family].weight ?? 400} 40px "${family}"`, 'a0 ')));
  // A local font that is not installed leaves its family empty and the text falls to
  // monospace, where an "m" is as wide as an "i".
  const missing = Object.keys(locals).filter((family) => {
    const probe = (text) => width(`"${family}",monospace`, 40, locals[family].weight, locals[family].style, text);
    return probe('mmmmmmmmmm') === probe('iiiiiiiiii');
  });
  const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
  const round = (value) => Math.round(value * 10000) / 10000;
  const noDigits = (lines) => lines.map((line) => line.replace(/[0-9]/g, '')).filter((line) => line.trim().length > 4);
  /** Scales of one fallback face against one real face. */
  const fit = (realFamily, realWeight, slant, localFamily, size, lines) => {
    if (missing.includes(localFamily)) return null;
    const weight = locals[localFamily].weight;
    const one = (family, w, text) => width(`"${family}"`, size, w, slant, text);
    return {
      digits: round(ch(`"${realFamily}"`, size, realWeight, slant) / ch(`"${localFamily}"`, size, weight, slant)),
      letters: round(median(noDigits(lines).map((line) => one(realFamily, realWeight, line) / one(localFamily, weight, line)))),
    };
  };
  const out = { missing, metrics: {}, display: { times: {}, noto: {} }, body: {} };
  for (const size of sizes) {
    for (const platform of ['times', 'noto']) {
      const upright = fit('Real Display', 380, 'normal', `${platform} regular`, size, heads);
      const italic = fit('Real Display Italic', 340, 'italic', `${platform} italic`, size, heads);
      if (upright) out.display[platform][size] = { ...upright, italic: italic?.letters ?? null };
    }
  }
  for (const platform of ['arial', 'roboto']) {
    const regular = fit('Real Body', 400, 'normal', `${platform} regular`, 17, leads);
    const strong = fit('Real Body', bold, 'normal', `${platform} bold`, 17, leads);
    if (regular && strong) out.body[platform] = { ...regular, boldDigits: strong.digits, boldLetters: strong.letters };
  }
  // The ascent and descent the browser uses for each real font, as fractions of the font size.
  const context = document.createElement('canvas').getContext('2d');
  for (const [key, font] of [['display', '380 1000px "Real Display"'], ['body', '400 1000px "Real Body"']]) {
    context.font = font;
    const box = context.measureText('Hxgp');
    out.metrics[key] = { ascent: round(box.fontBoundingBoxAscent / 1000), descent: round(box.fontBoundingBoxDescent / 1000) };
  }
  host.remove();
  return out;
}

/** Measures every fallback that is installed (or given as a file) and lays it over the previous numbers. */
async function measure(previous, files) {
  const fontUrl = (file) => `data:font/woff2;base64,${readFileSync(file).toString('base64')}`;
  const shipped = (pkg) => join(root, 'node_modules/@fontsource-variable', pkg, 'files');
  const real = {
    'Real Display': { url: fontUrl(join(shipped('fraunces'), 'fraunces-latin-opsz-normal.woff2')), style: 'normal' },
    'Real Display Italic': { url: fontUrl(join(shipped('fraunces'), 'fraunces-latin-opsz-italic.woff2')), style: 'italic' },
    'Real Body': { url: fontUrl(join(shipped('geist'), 'geist-latin-wght-normal.woff2')), style: 'normal' },
  };
  /** A fallback face to measure: the installed font, or the file given with --with. */
  const face = (key, names, style = 'normal', weight = 400) => ({ src: files[key] ? `url(${fontUrl(files[key])}) format("woff2")` : local(names), style, weight });
  const locals = {
    'times regular': face('times regular', LOCAL.times.regular),
    'times italic': face('times italic', LOCAL.times.italic, 'italic'),
    'noto regular': face('noto regular', LOCAL.noto.regular),
    'noto italic': face('noto italic', LOCAL.noto.italic, 'italic'),
    'arial regular': face('arial regular', LOCAL.arial.regular),
    'arial bold': face('arial bold', LOCAL.arial.bold, 'normal', 700),
    'roboto regular': face('roboto regular', LOCAL.roboto.regular),
    'roboto bold': face('roboto regular', LOCAL.roboto.bold),
  };
  const page = await openPage();
  try {
    const found = await page.evaluate(`(${measureInPage})(${JSON.stringify({ real, locals, sizes: SIZES, ...sample(), bold: BOLD })})`);
    if (found.missing.length) console.warn(`Sin instalar, se quedan con los números anteriores: ${found.missing.join(', ')}`);
    /** One platform's steps: what was measured now, over what the JSON already had. */
    const steps = (platform) => {
      const entries = [];
      for (const size of SIZES) {
        const now = found.display[platform][size];
        const before = previous.display?.[platform]?.[size];
        if (now ?? before) entries.push([size, { ...before, ...now, italic: now?.italic ?? before?.italic ?? null }]);
      }
      return Object.fromEntries(entries);
    };
    return {
      note: 'Written by scripts/font-fallbacks.mjs --measure. Each scale is the real font width divided by the fallback width.',
      metrics: found.metrics,
      display: { times: steps('times'), noto: steps('noto') },
      body: { ...previous.body, ...found.body },
    };
  } finally {
    page.close();
  }
}

const args = process.argv.slice(2);
let data = existsSync(dataFile) ? JSON.parse(readFileSync(dataFile, 'utf8')) : {};
if (args.includes('--measure')) {
  const files = Object.fromEntries(args.flatMap((arg, index) => (arg === '--with' ? [args[index + 1].split('=')] : [])));
  data = await measure(data, files);
  writeFileSync(dataFile, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Medidas guardadas en ${dataFile.replace(root, '')}`);
}
const sheet = css(data, readFileSync(globalCss, 'utf8'));
writeFileSync(cssFile, sheet);
console.log(`${cssFile.replace(root, '')}: ${sheet.split('\n').filter((line) => line.startsWith('@font-face')).length} reglas @font-face, ${sheet.length} bytes`);
