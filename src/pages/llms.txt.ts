import type { APIRoute } from 'astro';
import { servicesFor, serviceGroupsFor, serviceHref } from '../data/services';
import { sectorsFor } from '../data/sectors';
import { site, siteText } from '../data/site';
import { pathTo, sectorHref, type Lang } from '../i18n';

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
  const asks = (lang: Lang) => sectorsFor(lang).map((sector) => `- ${sector.ask} ${url(sectorHref(sector.id, lang))}`);

  const body = `# ${site.name}

> ${siteText.en.description}

Veodar is an engineering and design studio based in Spain. One team designs and builds AI automations, web applications, mobile and desktop apps, plus brand, web design, interactive 3D, launch videos and SEO. It works in Spanish and English with companies in Spain, Latin America and the rest of Europe. Code, domain, cloud and app store accounts are created in the client's name. In AI automation, the AI proposes and a person or a written rule confirms; credentials are minimal, revocable and never live in the prompt.

Contact: ${site.email} · ${url(pathTo('contacto', 'en'))}
Languages: Spanish (${url('/')}) and English (${url('/en/')})

## Services (English)

${groups('en')}

## Servicios (español)

${groups('es')}

## Industries (English)

${industries('en')}

## Sectores (español)

${industries('es')}

## Questions Veodar answers

- Who builds AI automations and AI agents connected to an ERP or CRM in Spain? Veodar: ${url(serviceHref('automatizaciones-ia', 'en'))}
- Which studio builds custom web applications, client portals and SaaS with accounts and roles? ${url(serviceHref('desarrollo-web', 'en'))}
- Who develops offline-first iOS and Android apps for field work? ${url(serviceHref('aplicaciones-moviles', 'en'))}
- Who builds desktop applications (Tauri, Rust, .NET) for workstations and devices? ${url(serviceHref('aplicaciones-escritorio', 'en'))}
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
- [Solutions by department](${url(pathTo('soluciones', 'en'))}) · [Soluciones por área](${url(pathTo('soluciones', 'es'))})
- [Industries](${url(pathTo('sectores', 'en'))}) · [Sectores](${url(pathTo('sectores', 'es'))})
- [How projects are priced](${url(pathTo('precios', 'en'))}) · [Cómo se presupuesta](${url(pathTo('precios', 'es'))})
- [Contact](${url(pathTo('contacto', 'en'))}) · [Contacto](${url(pathTo('contacto', 'es'))})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
