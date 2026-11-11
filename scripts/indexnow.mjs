// Tells IndexNow (Bing, Yandex, Seznam, Naver…; Bing's index also feeds ChatGPT
// search and Copilot) which pages changed, so they are recrawled without waiting.
//
//   node scripts/indexnow.mjs          pages whose <lastmod> in the live sitemap is at most 2 days old
//   node scripts/indexnow.mjs --all    every page in the sitemap (first run, or after a big change)
//   node scripts/indexnow.mjs --dry    print what would be sent, send nothing
//
// INDEXNOW_ALL=true does the same as --all (the GitHub workflow sets it from its checkbox).
//
// It reads the sitemap from production, so it only ever submits pages that are live.
// <lastmod> comes from src/data/updated.ts: bump the date there when content changes.
// The key is public by design: it is served at https://veodar.com/<key>.txt.
const HOST = 'veodar.com';
const KEY = '0a7890a5a47751f506d75852a302d920';
const args = new Set(process.argv.slice(2));
const all = args.has('--all') || process.env.INDEXNOW_ALL === 'true';
const origin = `https://${HOST}`;

const keyFile = await fetch(`${origin}/${KEY}.txt`);
if (!keyFile.ok || (await keyFile.text()).trim() !== KEY) {
  console.error(`La clave no está publicada en ${origin}/${KEY}.txt (${keyFile.status}). Despliega primero.`);
  process.exit(1);
}
const xml = await (await fetch(`${origin}/sitemap.xml`)).text();
const entries = [...xml.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)].map((m) => ({ url: m[1], lastmod: m[2] }));
const since = new Date(Date.now() - 2 * 86_400_000).toISOString().slice(0, 10);
const urls = entries.filter((entry) => all || entry.lastmod >= since).map((entry) => entry.url);
console.log(`${urls.length} de ${entries.length} URL${all ? '' : ` con cambios desde ${since}`}`);
if (!urls.length || args.has('--dry')) {
  if (args.has('--dry')) console.log(urls.join('\n'));
  process.exit(0);
}
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList: urls }),
});
// 200 = accepted, 202 = accepted, key still being checked.
console.log(`IndexNow: ${response.status} ${response.statusText}`);
if (!response.ok) process.exit(1);
