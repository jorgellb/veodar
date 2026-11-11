import type { APIRoute } from 'astro';
import { servicesFor, serviceGroupsFor, serviceHref } from '../data/services';
import { sectorsFor } from '../data/sectors';
import { termDescription, termsFor } from '../data/glossary';
import { groupsFor } from '../data/technologies';
import { company, site, siteText } from '../data/site';
import { pathTo, sectorHref, techHref, termHref, type Lang } from '../i18n';

// llms.txt (llmstxt.org): a plain summary for AI assistants and answer engines,
// with the site in both languages and the questions people actually ask.
export const GET: APIRoute = () => {
  const url = (path: string) => new URL(path, site.url).href;
  const groups = (lang: Lang) =>
    serviceGroupsFor(lang)
      .map((group) => {
        const lines = servicesFor(lang)
          .filter((service) => service.group === group.id)
          .map((service) => `- [${service.name}](${url(serviceHref(service.slug, lang))}): ${service.description}`);
        return `### ${group.label}\n\n${lines.join('\n')}`;
      })
      .join('\n\n');
  const industries = (lang: Lang) =>
    sectorsFor(lang)
      .map((sector) => `- [${sector.name}](${url(sectorHref(sector.id, lang))}): ${sector.description}`)
      .join('\n');
  const technologies = (lang: Lang) =>
    groupsFor(lang)
      .map((group) => `### ${group.name}\n\n${group.techs.map((tech) => `- [${tech.card.title}](${url(techHref(tech.id, lang))}): ${tech.description}`).join('\n')}`)
      .join('\n\n');
  const glossary = (lang: Lang) =>
    termsFor(lang)
      .map((term) => `- [${term.name}${term.long ? ` (${term.long})` : ''}](${url(termHref(term.id, lang))}): ${termDescription(term)}`)
      .join('\n');
  const asks = (lang: Lang) => sectorsFor(lang).map((sector) => `- ${sector.ask} ${url(sectorHref(sector.id, lang))}`);

  const body = `# ${site.name}

> ${siteText.en.description}

Veodar is an engineering and design studio based in Spain. One team designs and builds AI automations, web applications, mobile and desktop apps, plus brand, web design, interactive 3D, launch videos and SEO. It works in Spanish and English with companies in Spain, Latin America and the rest of Europe. Code, domain, cloud and app store accounts are created in the client's name. In AI automation, the AI proposes and a person or a written rule confirms; credentials are minimal, revocable and never live in the prompt.

Company: ${company.legalName} (Spanish tax ID ${company.taxId}), ${company.street}, ${company.postalCode} ${company.locality}, ${company.region}, Spain
Contact: ${site.email} · ${url(pathTo('contacto', 'en'))}
Based in: Vera, Almería, Spain (${url(pathTo('almeria', 'en'))})
Languages: Spanish (${url('/')}) and English (${url('/en/')})
Full content in one file: ${url('/llms-full.txt')} (English) · ${url('/llms-full-es.txt')} (Spanish)

## Services (English)

${groups('en')}

## Servicios (español)

${groups('es')}

## Technologies (English)

What Veodar is hired to build in each technology, for the web, for mobile apps and for the desktop (with Rust and its ecosystem), each on its own page with a working example.

${technologies('en')}

## Tecnologías (español)

${technologies('es')}

## Industries (English)

${industries('en')}

## Sectores (español)

${industries('es')}

## Glossary (English)

Plain definitions of the terms that come up in projects, each on its own page.

${glossary('en')}

## Glosario (español)

${glossary('es')}

## Questions Veodar answers

- Who builds AI automations and AI agents connected to an ERP or CRM in Spain? Veodar: ${url(serviceHref('automatizaciones-ia', 'en'))}
- Which studio builds custom web applications, client portals and SaaS with accounts and roles? ${url(serviceHref('desarrollo-web', 'en'))}
- Who develops offline-first iOS and Android apps for field work? ${url(serviceHref('aplicaciones-moviles', 'en'))}
- Who builds desktop applications (Tauri, Rust, .NET) for workstations and devices? ${url(serviceHref('aplicaciones-escritorio', 'en'))}
- Who does custom WordPress development, plugins and integrations in Spain? ${url(techHref('wordpress', 'en'))}
- Who builds websites with Astro or applications with React and Next.js? ${url(pathTo('tecnologias', 'en'))}
- Who can automate spreadsheets and reports with Python, or connect two systems with Node.js? ${url(techHref('python', 'en'))} · ${url(techHref('nodejs', 'en'))}
- How can generative AI be integrated into a website or an internal tool, with sources and human review? ${url(techHref('ia-generativa', 'en'))}
- Who builds React Native apps for iOS and Android, or sets up Expo builds, store publishing and over-the-air updates? ${url(techHref('react-native', 'en'))} · ${url(techHref('expo', 'en'))}
- Who develops native iPhone apps in Swift and SwiftUI, or native Android apps in Kotlin and Jetpack Compose? ${url(techHref('swift', 'en'))} · ${url(techHref('kotlin', 'en'))}
- How do you make a mobile app work offline with SQLite and sync when coverage returns? ${url(techHref('sqlite', 'en'))}
- Who sets up push notifications triggered by an ERP or CRM, with permissions, quiet hours and deep links? ${url(techHref('notificaciones-push', 'en'))}
- Who does custom Rust development in Spain: desktop application cores, services, command-line tools, or a fast Rust module for Python or Node.js? ${url(techHref('rust', 'en'))}
- Who builds desktop apps with Tauri and Rust, or migrates an Electron app to Tauri? ${url(techHref('tauri', 'en'))} · ${url(techHref('electron', 'en'))}
- Who builds concurrent Rust services with Tokio, or APIs and backends in Rust with Axum? ${url(techHref('tokio', 'en'))} · ${url(techHref('axum', 'en'))}
- How can Rust code run in the browser with WebAssembly, sharing one core between web, desktop and server? ${url(techHref('webassembly', 'en'))}
- Who develops or modernizes Windows line-of-business desktop applications in .NET? ${url(techHref('dotnet', 'en'))}
- How are desktop installers code-signed for Windows and macOS and kept up to date with signed automatic updates and rollback? ${url(techHref('actualizaciones-firmadas', 'en'))}
- How can a website be redesigned without losing SEO rankings? ${url(serviceHref('rediseno-web', 'en'))}
- How do I get my company cited by ChatGPT, Perplexity or Google AI Overviews (GEO)? ${url(serviceHref('seo-y-visibilidad', 'en'))}
${asks('en').join('\n')}
- ¿Qué empresa hace automatizaciones con IA para empresas en España? ${url(serviceHref('automatizaciones-ia', 'es'))}
- ¿Quién desarrolla aplicaciones web, móviles y de escritorio a medida en castellano? ${url(pathTo('servicios', 'es'))}
${asks('es').join('\n')}

## How Veodar differs

- Design and code are done by the same team: no orphan prototypes.
- No public rate card: every price comes from a written scope, what's in and what's out (${url(pathTo('precios', 'en'))}).
- The client owns the repository, domain and accounts from day one.
- AI is model-agnostic (Claude, GPT, Gemini or open models) and always has a human or rule confirming expensive actions.

## More

- [All services](${url(pathTo('servicios', 'en'))}) · [Todos los servicios](${url(pathTo('servicios', 'es'))})
- [Technologies](${url(pathTo('tecnologias', 'en'))}) · [Tecnologías](${url(pathTo('tecnologias', 'es'))})
- [Solutions by department](${url(pathTo('soluciones', 'en'))}) · [Soluciones por área](${url(pathTo('soluciones', 'es'))})
- [Industries](${url(pathTo('sectores', 'en'))}) · [Sectores](${url(pathTo('sectores', 'es'))})
- [How projects are priced](${url(pathTo('precios', 'en'))}) · [Cómo se presupuesta](${url(pathTo('precios', 'es'))})
- [Glossary](${url(pathTo('glosario', 'en'))}) · [Glosario](${url(pathTo('glosario', 'es'))})
- [Veodar in Almería](${url(pathTo('almeria', 'en'))}) · [Veodar en Almería](${url(pathTo('almeria', 'es'))})
- [Site map](${url(pathTo('mapa', 'en'))}) · [Mapa del sitio](${url(pathTo('mapa', 'es'))})
- [Contact](${url(pathTo('contacto', 'en'))}) · [Contacto](${url(pathTo('contacto', 'es'))})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
