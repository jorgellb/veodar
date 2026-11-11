// Technologies: routes in both languages, the data every card and page is built
// from, the drawings each one needs and the links that the running text gets.
// The pages themselves are checked on the built site by `npm run seo:audit`.
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { gzipSync } from 'node:zlib';
import { alternatesOf, pathTo, techGroupHref, techHref, techIdOf, TECH_SLUGS } from '../src/i18n/index.ts';
import { linkify, startLinks } from '../src/i18n/links.ts';
import { servicesFor } from '../src/data/services.ts';
import { PROCESS_STEPS, TECH_GROUPS, TECH_IDS, groupsFor, techOfStack, techsFor, techsOf } from '../src/data/technologies.ts';

const file = (path) => new URL(`../${path}`, import.meta.url);
const LANGS = ['es', 'en'];
const WEB = ['wordpress', 'astro', 'react', 'nextjs', 'nodejs', 'python', 'ia-generativa', 'javascript'];
const MOBILE = ['react-native', 'expo', 'swift', 'swiftui', 'kotlin', 'jetpack-compose', 'sqlite', 'notificaciones-push'];
const DESKTOP = ['rust', 'tauri', 'tokio', 'axum', 'webassembly', 'electron', 'dotnet', 'actualizaciones-firmadas'];
// The page title gets " | Veodar" appended; the audit warns outside these bounds.
const SUFFIX = ' | Veodar'.length;

describe('routes', () => {
  it('lists the web technologies in the order of the brief, then the mobile and the desktop ones', () => {
    assert.deepEqual([...TECH_IDS], [...WEB, ...MOBILE, ...DESKTOP]);
    assert.deepEqual(Object.keys(TECH_SLUGS), [...TECH_IDS]);
  });

  it('gives each one a path in Spanish and in English', () => {
    assert.equal(pathTo('tecnologias', 'es'), '/tecnologias/');
    assert.equal(pathTo('tecnologias', 'en'), '/en/technologies/');
    assert.equal(techHref('nextjs', 'es'), '/tecnologias/nextjs/');
    assert.equal(techHref('ia-generativa', 'es'), '/tecnologias/ia-generativa/');
    assert.equal(techHref('ia-generativa', 'en'), '/en/technologies/generative-ai/');
    assert.equal(techHref('react-native', 'es'), '/tecnologias/react-native/');
    assert.equal(techHref('notificaciones-push', 'es'), '/tecnologias/notificaciones-push/');
    assert.equal(techHref('notificaciones-push', 'en'), '/en/technologies/push-notifications/');
    assert.equal(techHref('dotnet', 'es'), '/tecnologias/dotnet/');
    assert.equal(techHref('actualizaciones-firmadas', 'en'), '/en/technologies/signed-updates/');
  });

  it('gives each group a way into the index: the first at the top, the rest at their section', () => {
    assert.equal(techGroupHref('web', 'es'), '/tecnologias/');
    assert.equal(techGroupHref('web', 'en'), '/en/technologies/');
    assert.equal(techGroupHref('movil', 'es'), '/tecnologias/#apps-moviles');
    assert.equal(techGroupHref('movil', 'en'), '/en/technologies/#mobile-apps');
    assert.equal(techGroupHref('escritorio', 'es'), '/tecnologias/#apps-escritorio');
    assert.equal(techGroupHref('escritorio', 'en'), '/en/technologies/#desktop-apps');
  });

  it('finds the id behind a slug in either language', () => {
    assert.equal(techIdOf('generative-ai', 'en'), 'ia-generativa');
    assert.equal(techIdOf('ia-generativa', 'es'), 'ia-generativa');
    assert.equal(techIdOf('nothing', 'en'), undefined);
    assert.equal(techIdOf('push-notifications', 'en'), 'notificaciones-push');
    assert.equal(techIdOf('signed-updates', 'en'), 'actualizaciones-firmadas');
    assert.equal(techIdOf('notificaciones-push', 'en'), undefined, 'the Spanish slug is not an English page');
  });

  it('pairs every page with its translation, both ways', () => {
    assert.deepEqual(alternatesOf('/tecnologias/'), { es: '/tecnologias/', en: '/en/technologies/' });
    assert.deepEqual(alternatesOf('/en/technologies/'), { es: '/tecnologias/', en: '/en/technologies/' });
    for (const id of TECH_IDS) {
      const pair = { es: techHref(id, 'es'), en: techHref(id, 'en') };
      assert.deepEqual(alternatesOf(pair.es), pair);
      assert.deepEqual(alternatesOf(pair.en), pair);
    }
    assert.equal(alternatesOf('/tecnologias/cobol/'), null);
    assert.equal(alternatesOf('/en/technologies/ia-generativa/'), null, 'the Spanish slug is not an English page');
  });
});

describe('the data of each technology', () => {
  const es = techsFor('es');
  const en = techsFor('en');

  it('has the same ones, in the same order, in both languages', () => {
    assert.deepEqual(es.map((tech) => tech.id), [...TECH_IDS]);
    assert.deepEqual(en.map((tech) => tech.id), [...TECH_IDS]);
  });

  it('sorts them into three groups of eight, each hanging from a service', () => {
    assert.deepEqual([...TECH_GROUPS], ['web', 'movil', 'escritorio']);
    const services = new Set(servicesFor('es').map((service) => service.slug));
    for (const lang of LANGS) {
      assert.deepEqual(techsOf('web', lang).map((tech) => tech.id), WEB);
      assert.deepEqual(techsOf('movil', lang).map((tech) => tech.id), MOBILE);
      assert.deepEqual(techsOf('escritorio', lang).map((tech) => tech.id), DESKTOP);
      const groups = groupsFor(lang);
      assert.deepEqual(groups.map((group) => group.id), [...TECH_GROUPS]);
      for (const group of groups) {
        assert.ok(services.has(group.service), `${group.id} → ${group.service}`);
        assert.equal(group.href, techGroupHref(group.id, lang));
        assert.equal(group.techs.length, 8, `${group.id} (${lang})`);
        for (const text of [group.name, group.menu.name, group.menu.desc, group.block.title, group.block.lead, group.block.list, group.block.contact, group.index.title, group.index.lead, group.index.service]) {
          assert.ok(text?.trim(), `${group.id} (${lang})`);
        }
      }
      assert.equal(new Set(groups.map((group) => group.anchor)).size, groups.length, 'one section each on the index');
    }
    assert.deepEqual(groupsFor('es').map((group) => group.service), ['desarrollo-web', 'aplicaciones-moviles', 'aplicaciones-escritorio']);
  });

  it('numbers each technology inside its group', () => {
    assert.deepEqual(techsOf('movil', 'es').map((tech) => tech.number), ['01', '02', '03', '04', '05', '06', '07', '08']);
    assert.equal(techsOf('escritorio', 'es')[0].id, 'rust', 'Rust opens its group');
    assert.equal(techsOf('escritorio', 'en').at(-1).number, '08');
    assert.equal(techsFor('es').find((tech) => tech.id === 'javascript').number, '08');
  });

  it('finds the technology behind a name of a service stack', () => {
    assert.equal(techOfStack('React Native'), 'react-native');
    assert.equal(techOfStack('Push'), 'notificaciones-push');
    assert.equal(techOfStack('React 19'), 'react');
    assert.equal(techOfStack('SQLite'), 'sqlite');
    assert.equal(techOfStack('PostgreSQL'), undefined);
    // Every name the mobile service lists has a page.
    const mobile = servicesFor('es').find((service) => service.slug === 'aplicaciones-moviles');
    assert.deepEqual(mobile.stack.map(techOfStack), MOBILE);
    // And so does every name the desktop service lists, in both languages.
    for (const lang of LANGS) {
      const desktop = servicesFor(lang).find((service) => service.slug === 'aplicaciones-escritorio');
      assert.deepEqual(desktop.stack.map(techOfStack), ['tauri', 'rust', 'electron', 'dotnet', 'sqlite', 'actualizaciones-firmadas'], lang);
    }
  });

  it('uses the headings agreed for the Spanish pages', () => {
    assert.deepEqual(
      es.slice(0, 8).map((tech) => tech.h1),
      [
        'Programación WordPress a medida',
        'Desarrollo web con Astro',
        'Desarrollo de interfaces y aplicaciones con React',
        'Desarrollo de aplicaciones con Next.js',
        'Backend e integraciones con Node.js',
        'Programación y automatización con Python',
        'Integración de IA generativa en tu empresa',
        'Programación JavaScript a medida',
      ],
    );
    assert.deepEqual(
      es.slice(0, 8).map((tech) => tech.card.title),
      [
        'Programación a medida en WordPress',
        'Desarrollo web con Astro',
        'Desarrollo con React',
        'Desarrollo con Next.js',
        'Backend con Node.js',
        'Programación con Python',
        'Integración de IA generativa',
        'Programación con JavaScript',
      ],
    );
  });

  it('names the technology in the heading of every mobile page', () => {
    assert.deepEqual(
      techsOf('movil', 'es').map((tech) => tech.h1),
      [
        'Desarrollo de apps con React Native',
        'Desarrollo de apps con Expo',
        'Desarrollo de apps iOS con Swift',
        'Desarrollo de interfaces con SwiftUI',
        'Desarrollo de apps Android con Kotlin',
        'Desarrollo de interfaces con Jetpack Compose',
        'Apps que funcionan sin conexión con SQLite',
        'Notificaciones push para tu app',
      ],
    );
    assert.deepEqual(
      techsOf('movil', 'es').map((tech) => tech.card.title),
      [
        'Desarrollo de apps con React Native',
        'Desarrollo de apps con Expo',
        'Desarrollo de apps iOS con Swift',
        'Interfaces con SwiftUI',
        'Desarrollo de apps Android con Kotlin',
        'Interfaces con Jetpack Compose',
        'Datos sin conexión con SQLite',
        'Notificaciones push a medida',
      ],
    );
    assert.deepEqual(
      techsOf('movil', 'en').map((tech) => tech.name),
      ['React Native', 'Expo', 'Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'SQLite', 'Push notifications'],
    );
  });

  it('names the technology in the heading of every desktop page, Rust first', () => {
    assert.deepEqual(
      techsOf('escritorio', 'es').map((tech) => tech.h1),
      [
        'Desarrollo de software en Rust',
        'Desarrollo de apps de escritorio con Tauri',
        'Servicios concurrentes en Rust con Tokio',
        'APIs y backends en Rust con Axum',
        'Rust en el navegador con WebAssembly',
        'Desarrollo de apps de escritorio con Electron',
        'Desarrollo de aplicaciones de escritorio con .NET',
        'Firma y actualización automática de apps de escritorio',
      ],
    );
    assert.deepEqual(
      techsOf('escritorio', 'es').map((tech) => tech.card.title),
      [
        'Desarrollo en Rust',
        'Apps de escritorio con Tauri',
        'Servicios concurrentes con Tokio',
        'APIs y backends en Rust con Axum',
        'Rust en el navegador con WebAssembly',
        'Apps de escritorio con Electron',
        'Aplicaciones de escritorio con .NET',
        'Firma y actualización automática',
      ],
    );
    assert.deepEqual(
      techsOf('escritorio', 'en').map((tech) => tech.name),
      ['Rust', 'Tauri', 'Tokio', 'Axum', 'WebAssembly', 'Electron', '.NET', 'Signed updates'],
    );
    // The emphasis of the group: most of its pages are Rust or built on it.
    const onRust = techsOf('escritorio', 'es').filter((tech) => tech.id === 'rust' || tech.techs.includes('rust'));
    assert.ok(onRust.length >= 6, `${onRust.length} of 8 pages are Rust or combine with it`);
  });

  for (const lang of LANGS) {
    const techs = techsFor(lang);

    it(`${lang}: titles and descriptions are unique and the length a result page shows whole`, () => {
      for (const key of ['title', 'description', 'h1']) {
        assert.equal(new Set(techs.map((tech) => tech[key])).size, techs.length, `${key} repeated`);
      }
      for (const tech of techs) {
        const title = tech.title.length + SUFFIX;
        assert.ok(title >= 30 && title <= 62, `${tech.id} title is ${title} characters with the site name`);
        assert.ok(tech.description.length >= 110 && tech.description.length <= 160, `${tech.id} description is ${tech.description.length} characters`);
      }
    });

    it(`${lang}: every page has all its sections filled`, () => {
      for (const tech of techs) {
        const where = `${tech.id} (${lang})`;
        for (const text of [tech.name, tech.kicker, tech.lead, tech.card.title, tech.card.text, tech.scene.title, tech.scene.caption]) assert.ok(text?.trim(), where);
        assert.ok(tech.solve.cases.length >= 3 && tech.solve.cases.length <= 4, `${where}: situations`);
        assert.ok(tech.solve.checks.length >= 3, `${where}: what to check first`);
        assert.ok(tech.build.items.length >= 3 && tech.build.items.length <= 4, `${where}: three or four services`);
        for (const item of tech.build.items) assert.ok(item.name && item.text && item.label && item.examples.length >= 2, `${where}: ${item.name}`);
        assert.ok(tech.example.heading && tech.example.intro && tech.example.note, `${where}: example`);
        assert.ok(tech.fit.inputs.length >= 2 && tech.fit.outputs.length >= 2 && tech.fit.core.label, `${where}: connections`);
        assert.ok(tech.fit.checks.length >= 3, `${where}: dependencies`);
        assert.equal(tech.process.steps.length, PROCESS_STEPS[lang].length, `${where}: one line per step of the process`);
        assert.ok(tech.process.deliverables.length >= 3, `${where}: deliverables`);
        assert.ok(tech.faq.length >= 4, `${where}: questions`);
        for (const item of tech.faq) assert.ok(item.q.trim().endsWith('?') && item.a.length > 80, `${where}: "${item.q}" needs an answer that stands on its own`);
        assert.ok(tech.cta.title && tech.cta.text && tech.cta.bring.length >= 3, `${where}: contact`);
      }
    });
  }

  it('says the same number of things in both languages', () => {
    es.forEach((tech, index) => {
      const other = en[index];
      for (const path of ['solve.cases', 'solve.checks', 'build.items', 'fit.inputs', 'fit.outputs', 'fit.checks', 'process.deliverables', 'faq', 'cta.bring']) {
        const read = (from) => path.split('.').reduce((value, key) => value[key], from);
        assert.equal(read(other).length, read(tech).length, `${tech.id}: ${path}`);
      }
      assert.deepEqual(other.build.items.map((item) => item.part), tech.build.items.map((item) => item.part), `${tech.id}: parts`);
    });
  });

  it('never promises what the brief rules out', () => {
    // No invented prices, deadlines, clients or guarantees in the copy.
    const banned = /\b(garantizamos|100 ?%|€|\$\d|en \d+ (días|semanas)|in \d+ (days|weeks)|we guarantee|nuestros clientes dicen|our clients say)\b/i;
    for (const lang of LANGS) {
      for (const tech of techsFor(lang)) assert.ok(!banned.test(JSON.stringify(tech)), `${tech.id} (${lang})`);
    }
  });

  it('links only to services and technologies that exist', () => {
    const services = new Set(servicesFor('es').map((service) => service.slug));
    for (const tech of es) {
      assert.ok(tech.services.length >= 2, `${tech.id}: related services`);
      for (const slug of tech.services) assert.ok(services.has(slug), `${tech.id} → ${slug}`);
      assert.ok(tech.techs.length >= 2, `${tech.id}: technologies it combines with`);
      for (const id of tech.techs) assert.ok(TECH_IDS.includes(id) && id !== tech.id, `${tech.id} → ${id}`);
      for (const node of [...tech.fit.inputs, ...tech.fit.outputs]) {
        if (node.tech) assert.ok(TECH_IDS.includes(node.tech) && node.tech !== tech.id, `${tech.id}: diagram → ${node.tech}`);
        if (node.service) assert.ok(services.has(node.service), `${tech.id}: diagram → ${node.service}`);
      }
    }
  });
});

describe('the drawings', () => {
  const es = techsFor('es');

  it('has a scene, its motion and a thumbnail for every technology', () => {
    assert.equal(new Set(es.map((tech) => tech.figure)).size, es.length, 'one scene each');
    for (const tech of es) {
      for (const path of [`src/generated/${tech.figure}.svg`, `src/generated/${tech.figure}.json`, `src/generated/small/${tech.figure}.svg`, `src/iso/live/fig-${tech.figure}.ts`]) {
        assert.ok(existsSync(file(path)), `${tech.id}: ${path}`);
      }
    }
  });

  it('has a drawing for every part a page shows on its own', () => {
    for (const tech of es) {
      const parts = new Set([tech.solve.part, ...tech.build.items.map((item) => item.part)]);
      for (const part of parts) assert.ok(existsSync(file(`src/generated/small/${tech.figure}--${part}.svg`)), `${tech.id}: ${part}`);
    }
  });

  it('keeps the small drawings free of words and light enough for a card', () => {
    for (const tech of es) {
      const svg = readFileSync(file(`src/generated/small/${tech.figure}.svg`), 'utf8');
      assert.ok(!/<text\b/.test(svg), `${tech.id}: a thumbnail carries no text (it would need translating)`);
      assert.ok(/<style>/.test(svg), `${tech.id}: a thumbnail brings its own styles, it is shown as an image`);
      assert.ok(!/ [a-z-]+(?=[ >/])(?![=])/.test(svg.replace(/<style>[\s\S]*?<\/style>/, '').replace(/="[^"]*"/g, '=""').replace(/<\/?[a-zA-Z]+/g, '<')), `${tech.id}: every attribute has a value (the file is XML)`);
      // What a visitor downloads: the server compresses it.
      const sent = gzipSync(svg).length;
      assert.ok(sent < 14_000, `${tech.id}: thumbnail is ${(sent / 1024).toFixed(1)} KB compressed`);
    }
  });

  it('describes every scene in English too', async () => {
    const { localizeSvg } = await import('../src/i18n/figures.ts');
    for (const tech of es) {
      const svg = readFileSync(file(`src/generated/${tech.figure}.svg`), 'utf8');
      const label = (text) => text.match(/aria-label="([^"]*)"/)[1];
      assert.notEqual(label(localizeSvg(svg, tech.figure, 'en')), label(svg), `${tech.id}: English description`);
    }
  });
});

describe('links to technologies in running text', () => {
  const page = '/servicios/automatizaciones-ia/';

  it('links the first mention of each technology', () => {
    startLinks(page);
    const html = linkify('Un servicio en Node.js recibe el aviso y un proceso en Python limpia los datos. Otro Node.js no se enlaza.', 'es', page, 2);
    assert.equal(html.match(/href="\/tecnologias\/nodejs\/"/g)?.length, 1);
    assert.equal(html.match(/href="\/tecnologias\/python\/"/g)?.length, 1);
    assert.match(html, /<a class="ctx-link ctx-tech" href="\/tecnologias\/nodejs\/">Node\.js<\/a>/);
  });

  it('uses the English pages on English text', () => {
    startLinks('/en/services/ai-automation/');
    const html = linkify('The model is a generative AI service called from Python.', 'en', '/en/services/ai-automation/', 2);
    assert.match(html, /href="\/en\/technologies\/generative-ai\/">generative AI<\/a>/);
    assert.match(html, /href="\/en\/technologies\/python\/">Python<\/a>/);
  });

  it('does not take the place of a link to a service', () => {
    startLinks(page);
    const html = linkify('El desarrollo web con React acaba en un portal.', 'es', page, 1);
    assert.match(html, /href="\/servicios\/desarrollo-web\/"/);
    assert.match(html, /href="\/tecnologias\/react\/"/);
  });

  it('never links a technology from its own page, and stops at its budget for the page', () => {
    startLinks('/tecnologias/python/');
    assert.doesNotMatch(linkify('Python lee el archivo.', 'es', '/tecnologias/python/', 2), /<a /);
    startLinks(page);
    const html = ['WordPress', 'Astro', 'React', 'Next.js', 'Node.js', 'Python', 'JavaScript'].map((name) => linkify(`Trabajamos con ${name}.`, 'es', page, 1)).join(' ');
    assert.equal(html.match(/ctx-tech/g).length, 4);
  });

  it('leaves a word alone when it is part of another', () => {
    startLinks(page);
    assert.doesNotMatch(linkify('El astronauta reacciona.', 'es', page, 2), /<a /);
    startLinks(page);
    assert.doesNotMatch(linkify('La exposición fue en la Expoagro; un cambio swift no es Swiftly.', 'es', page, 2), /<a /);
  });

  it('tells React Native from React, and SwiftUI from Swift', () => {
    const mobile = '/servicios/aplicaciones-moviles/';
    startLinks(mobile);
    const html = linkify('La app está en React Native con Expo y la interfaz del reloj en SwiftUI.', 'es', mobile, 1);
    assert.match(html, /href="\/tecnologias\/react-native\/">React Native<\/a>/);
    assert.match(html, /href="\/tecnologias\/expo\/">Expo<\/a>/);
    assert.match(html, /href="\/tecnologias\/swiftui\/">SwiftUI<\/a>/);
    assert.doesNotMatch(html, /tecnologias\/react\/|tecnologias\/swift\//);
    startLinks(mobile);
    const native = linkify('El módulo nativo se escribe en Swift y en Kotlin, y los datos van a SQLite.', 'es', mobile, 1);
    assert.match(native, /href="\/tecnologias\/swift\/">Swift<\/a>/);
    assert.match(native, /href="\/tecnologias\/kotlin\/">Kotlin<\/a>/);
    assert.match(native, /href="\/tecnologias\/sqlite\/">SQLite<\/a>/);
  });

  it('links the desktop technologies by name, and leaves look-alikes alone', () => {
    const desktop = '/servicios/aplicaciones-escritorio/';
    startLinks(desktop);
    const html = linkify('El núcleo va en Rust con Tauri; la app antigua está en Electron y la de gestión en .NET.', 'es', desktop, 1);
    assert.match(html, /href="\/tecnologias\/rust\/">Rust<\/a>/);
    assert.match(html, /href="\/tecnologias\/tauri\/">Tauri<\/a>/);
    assert.match(html, /href="\/tecnologias\/electron\/">Electron<\/a>/);
    startLinks(desktop);
    assert.match(linkify('La aplicación de gestión está hecha en .NET.', 'es', desktop, 1), /href="\/tecnologias\/dotnet\/">\.NET<\/a>/);
    startLinks(desktop);
    assert.doesNotMatch(linkify('Un portal en ASP.NET, un viaje a Tokio y metal con rust.', 'es', desktop, 1), /ctx-tech/);
    startLinks(desktop);
    assert.match(linkify('El instalador lleva firma de código y la API usa Axum.', 'es', desktop, 1), /href="\/tecnologias\/actualizaciones-firmadas\/">firma de código<\/a>/);
    startLinks('/en/services/desktop-app-development/');
    const en = linkify('The service runs on Tokio, compiles to WebAssembly and ships with signed updates.', 'en', '/en/services/desktop-app-development/', 1);
    assert.match(en, /href="\/en\/technologies\/tokio\/">Tokio<\/a>/);
    assert.match(en, /href="\/en\/technologies\/webassembly\/">WebAssembly<\/a>/);
    assert.match(en, /href="\/en\/technologies\/signed-updates\/">signed updates<\/a>/);
  });

  it('links the phrase a mobile technology is known by, in each language', () => {
    startLinks(page);
    assert.match(linkify('Cuando el pedido cambia, salen las notificaciones push.', 'es', page, 1), /href="\/tecnologias\/notificaciones-push\/">notificaciones push<\/a>/);
    startLinks('/en/services/ai-automation/');
    const html = linkify('Push notifications go out from Jetpack Compose screens.', 'en', '/en/services/ai-automation/', 1);
    assert.match(html, /href="\/en\/technologies\/push-notifications\/">Push notifications<\/a>/);
    assert.match(html, /href="\/en\/technologies\/jetpack-compose\/">Jetpack Compose<\/a>/);
  });
});
