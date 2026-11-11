// How far does a page move when the web fonts arrive? (README, "Tipografías de reserva")
//
//   npm run build && npx astro preview        in one terminal
//   node scripts/font-swap-check.mjs          in another: prints one row per page, one column per width
//   node scripts/font-swap-check.mjs http://localhost:4321 --pages /,/en/ --widths 390,1440
//
// Each page is loaded twice at each width: with the .woff2 files blocked, which is what
// is on screen until the fonts load, and with them. The number is how many pixels the
// content of the first screen moves between one and the other; a dot means under 3 px.
import { openPage } from './chrome.mjs';

const args = process.argv.slice(2);
const option = (name, fallback) => (args.includes(`--${name}`) ? args[args.indexOf(`--${name}`) + 1] : fallback);
const origin = (args[0] && !args[0].startsWith('--') ? args[0] : 'http://localhost:4321').replace(/\/$/, '');
const pages = option(
  'pages',
  '/,/en/,/servicios/,/en/services/,/sectores/,/en/industries/,/servicios/automatizaciones-ia/,/en/services/web-development/,/sectores/logistica/,/en/industries/healthcare/,/glosario/,/en/glossary/,/glosario/oee/,/en/glossary/verifactu/,/desarrollo-software-almeria/,/en/software-development-almeria/,/precios/,/contacto/,/soluciones/,/aviso-legal/,/mapa-del-sitio/',
).split(',');
const widths = option('widths', '360,390,412,430,768,834,1024,1280,1366,1440,1536,1920').split(',').map(Number);
const height = Number(option('height', 900));

/** Runs in the page: where every block of the main content sits, with motion switched off. */
const POSITIONS = `(async () => {
  await document.fonts.ready;
  const still = document.createElement('style');
  still.textContent = '[data-reveal]{transform:none!important;animation:none!important;transition:none!important;opacity:1!important}';
  document.head.append(still);
  await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
  return [...document.querySelectorAll('main h1, main h2, main h3, main p, main li, main section, main figure, main .btn, main form, main table, footer')].map((element) => Math.round((element.getBoundingClientRect().top + scrollY) * 10) / 10);
})()`;

const page = await openPage();
const rows = [];
try {
  await page.send('Network.setCacheDisabled', { cacheDisabled: true });
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const positions = async (url, width, blocked) => {
    await page.send('Network.setBlockedURLs', { urls: blocked ? ['*.woff2'] : [] });
    await page.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 700 });
    await page.goto(url);
    return page.evaluate(POSITIONS);
  };
  for (const path of pages) {
    const row = { path, moves: [] };
    for (const width of widths) {
      const before = await positions(origin + path, width, true);
      const after = await positions(origin + path, width, false);
      // Only what starts on the first screen counts: that is what a visitor sees move.
      row.moves.push(before.length === after.length ? Math.max(0, ...before.map((top, index) => (Math.min(top, after[index]) < height ? Math.abs(top - after[index]) : 0))) : NaN);
    }
    rows.push(row);
  }
} finally {
  page.close();
}

const cell = (value) => String(value).padStart(6);
console.log('página'.padEnd(36) + widths.map(cell).join(''));
for (const row of rows) console.log(row.path.padEnd(36) + row.moves.map((move) => cell(move < 3 ? '·' : Math.round(move))).join(''));
const all = rows.flatMap((row) => row.moves);
const moved = all.filter((move) => !(move < 3));
console.log(`\nSe mueve 3 px o más en ${moved.length} de ${all.length} cargas (${Math.round((moved.length / all.length) * 100)} %). Máximo: ${Math.round(Math.max(0, ...moved))} px.`);
