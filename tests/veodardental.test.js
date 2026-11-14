// VeodarDental, our product for dental clinics: its page in both languages, what the
// copy may say and what it must not, and the screenshots it shows.
// The built pages are checked by `npm run seo:audit`.
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { describe, it } from 'node:test';
import { alternatesOf, pathTo } from '../src/i18n/index.ts';
import { vdFor } from '../src/data/veodardental.ts';

const file = (path) => new URL(`../${path}`, import.meta.url);
const LANGS = ['es', 'en'];
const SUFFIX = ' | Veodar'.length;
const SHOTS = ['inicio', 'agenda', 'odontograma', 'odontograma-radiografia', 'periodontograma', 'presupuestos', 'facturas', 'comunicaciones'];

describe('the VeodarDental page', () => {
  it('lives under the healthcare sector, paired with its translation both ways', () => {
    const pair = { es: '/sectores/salud/veodardental/', en: '/en/industries/healthcare/veodardental/' };
    assert.equal(pathTo('veodardental', 'es'), pair.es);
    assert.equal(pathTo('veodardental', 'en'), pair.en);
    assert.deepEqual(alternatesOf(pair.es), pair);
    assert.deepEqual(alternatesOf(pair.en), pair);
    assert.ok(existsSync(file('src/pages/sectores/salud/veodardental.astro')));
    assert.ok(existsSync(file('src/pages/en/industries/healthcare/veodardental.astro')));
  });

  it('has a title and a description a result page shows whole', () => {
    for (const lang of LANGS) {
      const { title, description } = vdFor(lang);
      assert.ok(title.length + SUFFIX >= 30 && title.length + SUFFIX <= 62, `${lang}: title is ${title.length + SUFFIX} characters with the site name`);
      assert.ok(description.length >= 110 && description.length <= 160, `${lang}: description is ${description.length} characters`);
    }
  });

  it('says the same number of things in both languages', () => {
    const shape = (value) =>
      Array.isArray(value) ? value.map(shape) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)])) : typeof value;
    assert.deepEqual(shape(vdFor('en')), shape(vdFor('es')));
  });

  it('never promises what it cannot back up', () => {
    // No prices, clients, guarantees or ratings; nothing certified or approved that is
    // not (VERI*FACTU is "ready", the AEAT is switched on with the clinic's certificate,
    // which is a digital certificate and may be named).
    const banned =
      /\b(garantizamos|garantizado|100 ?%|€|\$\d|en \d+ (días|semanas)|in \d+ (days|weeks)|we guarantee|guaranteed|nuestros clientes|our clients|clientes satisfechos|homologad[oa]|(?:está|es) certificad[oa]|certificad[oa] (?:por|para)|certified (?:by|for)|is certified|approved by|el mejor|the best|n\.º 1|number one|líder|leading)\b/i;
    for (const lang of LANGS) {
      const text = JSON.stringify(vdFor(lang));
      const found = text.match(banned);
      assert.ok(!found, `${lang}: «${found?.[0]}» in «${found ? text.slice(Math.max(0, found.index - 60), found.index + 60) : ''}»`);
    }
  });

  it('says that the screenshots carry invented demo data', () => {
    assert.match(vdFor('es').shotNote, /datos de ejemplo, inventados/);
    assert.match(vdFor('en').shotNote, /invented demo data/);
  });

  it('has every screenshot it shows, with a description in both languages', () => {
    for (const shot of SHOTS) {
      assert.ok(existsSync(file(`src/assets/veodardental/${shot}.png`)), `${shot}.png`);
      for (const lang of LANGS) assert.ok(vdFor(lang).shotAlt[shot].length > 30, `${shot} (${lang}) needs a real description`);
    }
    for (const lang of LANGS) {
      for (const tab of vdFor(lang).tour.tabs) assert.ok(SHOTS.includes(tab.shot), `${tab.shot} is not a screenshot`);
    }
    assert.ok(existsSync(file('public/og-veodardental.png')) && existsSync(file('public/og-veodardental-en.png')), 'an image to share in each language');
  });

  it('names the teeth of the odontogram as the program does (FDI)', () => {
    for (const lang of LANGS) {
      for (const note of vdFor(lang).archNotes) {
        const n = Number(note.tooth);
        assert.ok(n >= 11 && n <= 48 && n % 10 >= 1 && n % 10 <= 8, `${note.tooth} is not an FDI tooth`);
      }
    }
  });
});
