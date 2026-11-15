// The free dental software page: its route in both languages, the words people search
// for in its title and headline, and the rule of the brand page: nothing it cannot back
// up. "Best" only appears inside a question (the search it answers), never as a claim.
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { describe, it } from 'node:test';
import { alternatesOf, pathTo } from '../src/i18n/index.ts';
import { freeFor } from '../src/data/dental-gratis.ts';

const file = (path) => new URL(`../${path}`, import.meta.url);
const LANGS = ['es', 'en'];

describe('the free dental software page', () => {
  it('has a short URL in each language, paired both ways', () => {
    const pair = { es: '/programa-gestion-dental-gratis/', en: '/en/free-dental-software/' };
    assert.equal(pathTo('dentalGratis', 'es'), pair.es);
    assert.equal(pathTo('dentalGratis', 'en'), pair.en);
    assert.deepEqual(alternatesOf(pair.es), pair);
    assert.deepEqual(alternatesOf(pair.en), pair);
    assert.ok(existsSync(file('src/pages/programa-gestion-dental-gratis.astro')));
    assert.ok(existsSync(file('src/pages/en/free-dental-software.astro')));
  });

  it('puts the words people search for in its title, headline and description', () => {
    const es = freeFor('es');
    assert.match(es.title, /^Programa de gestión dental gratis/);
    assert.match(es.h1, /programa de gestión dental gratis/i);
    assert.match(es.description, /gratis/);
    assert.match(es.lead, /programa de gestión dental gratuito/);
    const en = freeFor('en');
    assert.match(en.title, /^Free Dental Practice Management Software/);
    assert.match(en.h1, /free dental practice management software/i);
    for (const lang of LANGS) {
      const { title, description } = freeFor(lang);
      // the title carries the brand (VeodarDental), so the site name is not added
      assert.ok(title.length >= 30 && title.length <= 62, `${lang}: title is ${title.length} characters`);
      assert.ok(description.length >= 110 && description.length <= 160, `${lang}: description is ${description.length} characters`);
    }
  });

  it('says the same number of things in both languages', () => {
    const shape = (value) =>
      Array.isArray(value) ? value.map(shape) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)])) : typeof value;
    assert.deepEqual(shape(freeFor('en')), shape(freeFor('es')));
  });

  it('answers "the best" as a question, and never claims to be it', () => {
    const banned =
      /\b(el mejor|la mejor opción|los mejores|the best|best-in-class|number one|n\.º 1|líder|leading|garantizamos|guaranteed|homologad[oa]|certificad[oa] (?:por|para)|certified (?:by|for)|clientes satisfechos|our clients|nuestros clientes)\b/i;
    for (const lang of LANGS) {
      // the questions people ask («¿Cuál es el mejor…?», "What is the best…?") are allowed
      const text = JSON.stringify(freeFor(lang)).replace(/¿[^?]*\?/g, ' ').replace(/(?:^|[."\]])\s*(?:What|Which|Is|Does|Can|So|On|Why)[^?."]*\?/g, ' ');
      const found = text.match(banned);
      assert.ok(!found, `${lang}: «${found?.[0]}» in «${found ? text.slice(Math.max(0, found.index - 60), found.index + 60) : ''}»`);
    }
  });

  it('answers each question first, in its opening sentence', () => {
    for (const lang of LANGS) {
      const t = freeFor(lang);
      assert.match(t.free.answer, lang === 'es' ? /^Sí\./ : /^Yes\./);
      assert.ok(t.faq.length >= 8, `${lang}: ${t.faq.length} questions`);
      for (const section of [t.free, t.includes, t.choose, t.start, t.spain, t.why]) {
        assert.ok(section.answer.length >= 120, `${lang}: «${section.title}» needs a full answer`);
      }
    }
  });
});
