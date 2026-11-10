import type { Lang } from '../i18n';

export const site = {
  name: 'Veodar',
  url: 'https://veodar.com',
  email: 'info@veodar.com',
  locale: 'es_ES',
  tagline: 'Automatizaciones con IA y software a medida',
  description:
    'Estudio de ingeniería y diseño: automatizaciones con IA, desarrollo web, apps móviles y de escritorio, 3D interactivo y SEO. Código y cuentas a nombre de tu empresa.',
};

/** The company behind the site, as it appears in the legal notice. */
export const company = {
  legalName: 'Veodar S.L.',
  taxId: 'B14287718',
  street: 'Carretera de Ronda, 80',
  postalCode: '04620',
  locality: 'Vera',
  region: 'Almería',
  country: { es: 'España', en: 'Spain' },
  /** Mercantile Registry entry (volume, folio, sheet); shown in the legal notice once known. */
  registry: '',
};

/** Tagline and description in each language (site.* keeps the Spanish ones). */
export const siteText: Record<Lang, { tagline: string; description: string }> = {
  es: { tagline: site.tagline, description: site.description },
  en: {
    tagline: 'AI automation and custom software',
    description:
      'Engineering and design studio: AI automation, web development, mobile and desktop apps, interactive 3D and SEO. Code and accounts in your company’s name.',
  },
};

export const organizationLd = {
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: company.legalName,
  taxID: company.taxId,
  url: `${site.url}/`,
  email: site.email,
  logo: `${site.url}/favicon.svg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.street,
    postalCode: company.postalCode,
    addressLocality: company.locality,
    addressRegion: company.region,
    addressCountry: 'ES',
  },
  description: site.description,
  knowsLanguage: ['es', 'en'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: site.email,
    availableLanguage: ['Spanish', 'English'],
  },
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

/** The organization, described in the page's language. */
export const organizationLdFor = (lang: Lang) => ({ ...organizationLd, description: siteText[lang].description });

export const websiteLd = {
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: `${site.url}/`,
  name: site.name,
  inLanguage: ['es', 'en'],
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

const askPrompts: Record<Lang, string> = {
  es: '¿Qué hace Veodar (veodar.com) en automatizaciones con IA y desarrollo de software a medida, y para qué tipo de empresa encaja?',
  en: 'What does Veodar (veodar.com) do in AI automation and custom software development, and what kind of company is it a good fit for?',
};

/** "Ask an AI about Veodar" links, with the question in the page's language. */
export const askAiFor = (lang: Lang) => {
  const q = encodeURIComponent(askPrompts[lang]);
  return [
    { name: 'ChatGPT', href: `https://chatgpt.com/?q=${q}` },
    { name: 'Claude', href: `https://claude.ai/new?q=${q}` },
    { name: 'Perplexity', href: `https://www.perplexity.ai/search?q=${q}` },
    { name: 'Gemini', href: `https://www.google.com/search?udm=50&q=${q}` },
  ];
};
export const askAi = askAiFor('es');
