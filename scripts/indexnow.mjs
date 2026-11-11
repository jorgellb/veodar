// Tells IndexNow (Bing, Yandex, Seznam, Naver…; Bing's index also feeds ChatGPT
// search and Copilot) which pages changed, so they are recrawled without waiting.
//
//   node scripts/indexnow.mjs          pages whose <lastmod> in the live sitemap is at most 2 days old
//   node scripts/indexnow.mjs --all    every page in the sitemap
//   node scripts/indexnow.mjs --dry    print what would be sent, send nothing
//
// It reads the sitemap from production, so it only ever announces what is live.
// <lastmod> comes from src/data/updated.ts: bump the date there when content changes.
// The key is public by design: it is the name of the file public/<key>.txt, served at
// https://veodar.com/<key>.txt, and the script takes it from there.
//
// The GitHub workflow (.github/workflows/indexnow.yml) runs it after every push to
// main with three variables:
//   INDEXNOW_WAIT_FOR=<commit>  wait until /version.txt on production says that commit
//   INDEXNOW_STATE=<file>       remember the sitemap announced last time and send only
//                               what is new, changed or gone since then
//   INDEXNOW_ALL=true           the same as --all
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { parseSitemap, pickUrls } from './indexnow-plan.mjs';

const HOST = 'veodar.com';
const KEY = readdirSync(new URL('../public/', import.meta.url)).find((name) => /^[0-9a-f]{32}\.txt$/.test(name))?.slice(0, -4);
if (!KEY) {
  console.error('Falta el archivo de clave de IndexNow en public/ (32 caracteres hexadecimales y .txt).');
  process.exit(1);
}
const WAIT_MINUTES = Number(process.env.INDEXNOW_WAIT_MINUTES) || 10;
const args = new Set(process.argv.slice(2));
const dry = args.has('--dry');
const all = args.has('--all') || process.env.INDEXNOW_ALL === 'true';
const statePath = process.env.INDEXNOW_STATE || '';
const waitFor = process.env.INDEXNOW_WAIT_FOR || '';
const origin = `https://${HOST}`;

/** Body of a production file, or a short note of why it could not be read. */
async function live(path) {
  try {
    const response = await fetch(`${origin}${path}`, { cache: 'no-store' });
    return response.ok ? (await response.text()).trim() : `HTTP ${response.status}`;
  } catch (error) {
    return `sin respuesta (${error.cause?.code ?? error.message})`;
  }
}

/** The sitemap announced by the last run, or null when there is no usable memory. */
function readState(path) {
  if (!path || !existsSync(path)) return null;
  try {
    const state = JSON.parse(readFileSync(path, 'utf8'));
    return state && typeof state === 'object' && !Array.isArray(state) ? state : null;
  } catch {
    return null;
  }
}

if (waitFor) {
  const deadline = Date.now() + WAIT_MINUTES * 60_000;
  for (let served = await live('/version.txt'); served !== waitFor; served = await live('/version.txt')) {
    if (Date.now() > deadline) {
      console.error(`${origin} no sirve el commit ${waitFor} tras ${WAIT_MINUTES} min (version.txt: ${served}).`);
      process.exit(1);
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  console.log(`${origin} ya sirve ${waitFor.slice(0, 7)}`);
}

const key = await live(`/${KEY}.txt`);
if (key !== KEY) {
  console.error(`La clave no está publicada en ${origin}/${KEY}.txt (${key}). Despliega primero.`);
  process.exit(1);
}
const pages = parseSitemap(await live('/sitemap.xml'));
const total = Object.keys(pages).length;
if (!total) {
  console.error(`No se ha podido leer ${origin}/sitemap.xml.`);
  process.exit(1);
}
const previous = readState(statePath);
const urls = pickUrls(pages, { all, previous });
const basis = all ? 'todas' : previous ? 'nuevas, cambiadas o retiradas desde el último aviso' : 'con cambios en los dos últimos días';
console.log(`${urls.length} URL de ${total} (${basis})`);
if (dry) {
  console.log(urls.join('\n'));
  process.exit(0);
}
if (urls.length) {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList: urls }),
  });
  // 200 = accepted, 202 = accepted, key still being checked.
  console.log(`IndexNow: ${response.status} ${response.statusText}`);
  if (!response.ok) process.exit(1);
}
// Only a run that got this far moves the memory forward: a failed one is retried whole.
if (statePath) {
  mkdirSync(dirname(statePath), { recursive: true });
  writeFileSync(statePath, JSON.stringify(pages));
}
