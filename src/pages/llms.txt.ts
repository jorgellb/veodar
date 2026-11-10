import type { APIRoute } from 'astro';
import { services, serviceHref, serviceGroups } from '../data/services';
import { site } from '../data/site';

// llms.txt: a plain summary for AI assistants and answer engines (llmstxt.org).
export const GET: APIRoute = () => {
  const url = (path: string) => new URL(path, site.url).href;
  const groups = serviceGroups
    .map((group) => {
      const lines = services
        .filter((service) => service.group === group.id)
        .map((service) => `- [${service.name}](${url(serviceHref(service.slug))}): ${service.description}`);
      return `## ${group.label}\n\n${lines.join('\n')}`;
    })
    .join('\n\n');
  const body = `# ${site.name}

> ${site.description}

Veodar es un estudio de ingeniería y diseño que trabaja en castellano para empresas de España y Latinoamérica. Un mismo equipo diseña y construye. El código, el dominio y las cuentas de nube y de tiendas se crean a nombre del cliente. En automatizaciones con IA, la IA propone y una persona o una regla escrita confirma; las credenciales son mínimas, revocables y no viven en el prompt.

Contacto: ${site.email}

${groups}

## Más

- [Todos los servicios](${url('/servicios/')})
- [Soluciones por área (TI, seguridad, finanzas, personas, RevOps, legal)](${url('/soluciones/')})
- [Cómo se presupuesta un proyecto](${url('/precios/')})
- [Contacto](${url('/contacto/')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
