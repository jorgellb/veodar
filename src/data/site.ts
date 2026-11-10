export const site = {
  name: 'Veodar',
  url: 'https://veodar.com',
  email: 'hola@veodar.com',
  locale: 'es_ES',
  tagline: 'Automatizaciones con IA y software a medida',
  description:
    'Estudio de ingeniería y diseño: automatizaciones con IA, desarrollo web, apps móviles y de escritorio, 3D interactivo y SEO. Código y cuentas a nombre de tu empresa.',
};

export const organizationLd = {
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: `${site.url}/`,
  email: site.email,
  logo: `${site.url}/favicon.svg`,
  description: site.description,
  knowsLanguage: ['es'],
  areaServed: [
    { '@type': 'Country', name: 'España' },
    { '@type': 'Place', name: 'Latinoamérica' },
  ],
  knowsAbout: [
    'Automatización con inteligencia artificial',
    'Agentes de IA',
    'Model Context Protocol',
    'Desarrollo web',
    'Aplicaciones móviles',
    'Aplicaciones de escritorio',
    'Diseño web',
    '3D interactivo',
    'SEO',
    'Generative Engine Optimization',
  ],
};

export const websiteLd = {
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: `${site.url}/`,
  name: site.name,
  inLanguage: 'es',
  publisher: { '@id': `${site.url}/#organization` },
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).href,
    })),
  };
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

const askPrompt = encodeURIComponent(
  '¿Qué hace Veodar (veodar.com) en automatizaciones con IA y desarrollo de software a medida, y para qué tipo de empresa encaja?',
);

export const askAi = [
  { name: 'ChatGPT', href: `https://chatgpt.com/?q=${askPrompt}` },
  { name: 'Claude', href: `https://claude.ai/new?q=${askPrompt}` },
  { name: 'Perplexity', href: `https://www.perplexity.ai/search?q=${askPrompt}` },
  { name: 'Gemini', href: `https://www.google.com/search?udm=50&q=${askPrompt}` },
];
