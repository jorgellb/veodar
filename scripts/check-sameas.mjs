// Checks that every Wikipedia article named in src/data/glossary.ts (`wiki`) exists,
// so schema.org `sameAs` never points at a missing page:
//   node scripts/check-sameas.mjs
// Uses Wikipedia's REST summary endpoint; exits 1 if any title is missing.
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/data/glossary.ts', import.meta.url), 'utf8');
const entries = [...source.matchAll(/id: '([^']+)'[^\n]*?wiki: \{([^}]*)\}/g)].flatMap(([, id, body]) =>
  [...body.matchAll(/(es|en): '([^']+)'/g)].map(([, lang, title]) => ({ id, lang, title })),
);
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
async function summary(lang, title) {
  // Wikipedia throttles bursts: go slowly and wait when it says so.
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`, {
      headers: { 'User-Agent': 'sameas-check/1.0 (static site build check)' },
    });
    if (response.status !== 429) return { status: response.status, data: response.ok ? await response.json() : null };
    await sleep(4000 * (attempt + 1));
  }
  return { status: 429, data: null };
}
let missing = 0;
let unknown = 0;
for (const { id, lang, title } of entries) {
  const { status, data } = await summary(lang, title);
  const ok = status === 200 && data?.type === 'standard';
  if (status === 429) unknown++;
  else if (!ok) missing++;
  console.log(`${ok ? 'ok ' : status === 429 ? '?? ' : 'NO '} ${lang} ${title.padEnd(48)} ${id}${ok ? ` → ${data.title}` : ` (${status}${data?.type ? ` ${data.type}` : ''})`}`);
  await sleep(1500);
}
console.log(`${entries.length} títulos · ${missing} sin artículo · ${unknown} sin comprobar (límite de peticiones)`);
process.exit(missing || unknown ? 1 : 0);
