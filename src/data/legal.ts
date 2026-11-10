// Legal notice, privacy policy and cookie policy, in both languages. Paragraphs
// are trusted HTML written here (links and lists), rendered with set:html.
import { company, site } from './site';
import { pathTo, type Lang } from '../i18n';

export type LegalKey = 'avisoLegal' | 'privacidad' | 'cookies';
export type LegalDoc = {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  sections: { heading: string; body: string[] }[];
  note?: string;
};

export const LEGAL_UPDATED = { iso: '2026-11-10', es: '10 de noviembre de 2026', en: 'November 10, 2026' };

const mail = `<a href="mailto:${site.email}">${site.email}</a>`;
const address = (lang: Lang) => `${company.street}, ${company.postalCode} ${company.locality} (${company.region}), ${company.country[lang]}`;
const link = (key: LegalKey | 'contacto', lang: Lang, text: string) => `<a href="${pathTo(key, lang)}">${text}</a>`;
const registry = (lang: Lang) =>
  company.registry ? (lang === 'es' ? `<li><strong>Registro:</strong> ${company.registry}</li>` : `<li><strong>Registry:</strong> ${company.registry}</li>`) : '';

const es: Record<LegalKey, LegalDoc> = {
  avisoLegal: {
    title: 'Aviso legal',
    description: 'Aviso legal de veodar.com: titular de la web, Veodar S.L., datos de contacto, condiciones de uso, propiedad intelectual y legislación aplicable.',
    eyebrow: 'Legal',
    h1: 'Aviso legal',
    lead: 'Quién está detrás de esta web y en qué condiciones se puede usar.',
    sections: [
      {
        heading: 'Titular de la web',
        body: [
          `En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico, estos son los datos del titular de veodar.com:`,
          `<ul><li><strong>Razón social:</strong> ${company.legalName}</li><li><strong>NIF:</strong> ${company.taxId}</li><li><strong>Domicilio:</strong> ${address('es')}</li><li><strong>Correo electrónico:</strong> ${mail}</li>${registry('es')}</ul>`,
        ],
      },
      {
        heading: 'Objeto y uso de la web',
        body: [
          'Esta web informa sobre los servicios de ingeniería de software, inteligencia artificial y diseño que presta Veodar, y permite contactar con el estudio. Navegar por ella implica aceptar este aviso legal.',
          'Quien la visita se compromete a usarla de forma lícita, sin dañar su funcionamiento ni intentar acceder a partes que no son públicas.',
        ],
      },
      {
        heading: 'Propiedad intelectual e industrial',
        body: [
          'Los textos, ilustraciones, figuras animadas, diseño y código de esta web pertenecen a Veodar o a sus licenciantes. No se pueden reproducir, distribuir ni transformar sin autorización por escrito, salvo para uso personal y citando la fuente.',
          'Las marcas y nombres de productos de terceros que aparecen en la web, como plataformas de software con las que trabajamos, pertenecen a sus titulares. Mencionarlas no implica ninguna relación comercial ni respaldo por su parte.',
        ],
      },
      {
        heading: 'Responsabilidad',
        body: [
          'La información de esta web es general y orientativa; no sustituye a una propuesta escrita para cada proyecto. Veodar procura que sea correcta y esté al día, pero no responde de decisiones tomadas solo a partir de ella.',
          'La web incluye enlaces a sitios de terceros, como asistentes de IA o plataformas mencionadas. Veodar no controla esos sitios ni responde de sus contenidos.',
        ],
      },
      {
        heading: 'Protección de datos y cookies',
        body: [
          `Cómo tratamos los datos personales está explicado en la ${link('privacidad', 'es', 'política de privacidad')}, y lo que guarda esta web en tu navegador, en la ${link('cookies', 'es', 'política de cookies')}.`,
        ],
      },
      {
        heading: 'Legislación aplicable',
        body: [
          'Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Almería, salvo que la normativa de consumidores establezca otro fuero.',
        ],
      },
    ],
  },
  privacidad: {
    title: 'Política de privacidad',
    description: 'Política de privacidad de Veodar S.L.: qué datos tratamos cuando nos escribes, para qué, con qué base legal, cuánto tiempo y cómo ejercer tus derechos.',
    eyebrow: 'Legal',
    h1: 'Política de privacidad',
    lead: 'Qué datos tratamos cuando nos escribes, para qué y cómo ejercer tus derechos. En corto: solo lo necesario para responderte.',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        body: [`<ul><li><strong>Responsable:</strong> ${company.legalName}</li><li><strong>NIF:</strong> ${company.taxId}</li><li><strong>Domicilio:</strong> ${address('es')}</li><li><strong>Contacto:</strong> ${mail}</li></ul>`],
      },
      {
        heading: 'Qué datos tratamos',
        body: [
          `<ul><li><strong>Formulario de ${link('contacto', 'es', 'contacto')}:</strong> nombre, correo electrónico, empresa (opcional), lo que necesitas, presupuesto y plazo orientativos y el mensaje que escribes.</li><li><strong>Correo directo:</strong> lo que nos envíes a ${mail}.</li><li><strong>Datos técnicos:</strong> la dirección IP y los datos del navegador que se usan para comprobar que el formulario no lo envía un bot, y los registros técnicos del servidor.</li><li><strong>Medición:</strong> solo si la aceptas, estadísticas de visitas y de velocidad de carga, agregadas y sin cookies.</li></ul>`,
          'No pedimos datos especialmente protegidos. Si nos los envías sin que hagan falta, los borramos.',
        ],
      },
      {
        heading: 'Para qué y con qué base legal',
        body: [
          '<ul><li><strong>Responder a tu mensaje y, si lo pides, preparar una propuesta:</strong> tu consentimiento al enviar el formulario y la aplicación de medidas precontractuales a petición tuya (artículo 6.1.a y 6.1.b del RGPD).</li><li><strong>Proteger el formulario frente a envíos automáticos:</strong> nuestro interés legítimo en evitar el spam y el abuso (artículo 6.1.f).</li><li><strong>Medir visitas y velocidad de la web:</strong> tu consentimiento en la caja de cookies, que puedes retirar cuando quieras (artículo 6.1.a).</li><li><strong>Si llegas a ser cliente:</strong> la ejecución del contrato y el cumplimiento de obligaciones legales, como las fiscales (artículo 6.1.b y 6.1.c).</li></ul>',
          'No tomamos decisiones automatizadas con efectos sobre ti ni elaboramos perfiles con estos datos.',
        ],
      },
      {
        heading: 'Cuánto tiempo los guardamos',
        body: [
          'Los mensajes se conservan el tiempo necesario para responderlos y, si no da lugar a una relación comercial, un máximo de doce meses. Si eres cliente, conservamos los datos mientras dure la relación y, después, durante los plazos que exige la ley. Los registros técnicos del servidor se conservan durante un periodo breve por motivos de seguridad.',
        ],
      },
      {
        heading: 'Quién más los trata',
        body: [
          'No cedemos tus datos a terceros salvo obligación legal. Para que la web y el formulario funcionen, usamos estos proveedores, que los tratan por cuenta de Veodar:',
          '<ul><li><strong>Vercel Inc.:</strong> alojamiento de la web y del formulario, y medición anónima si la aceptas.</li><li><strong>Resend:</strong> envío por correo de los mensajes del formulario.</li><li><strong>Cloudflare, Inc.:</strong> comprobación antispam del formulario (Turnstile).</li><li><strong>Google:</strong> servicio de correo electrónico en el que recibimos los mensajes.</li></ul>',
        ],
      },
      {
        heading: 'Transferencias internacionales',
        body: [
          'Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo, sobre todo en Estados Unidos. Esas transferencias se amparan en el Marco de Privacidad de Datos UE-EE. UU. o en las cláusulas contractuales tipo aprobadas por la Comisión Europea.',
        ],
      },
      {
        heading: 'Tus derechos',
        body: [
          `Puedes pedir acceso a tus datos, su rectificación o supresión, la limitación del tratamiento, oponerte a él, solicitar la portabilidad y retirar tu consentimiento en cualquier momento, escribiendo a ${mail}. Te responderemos en el plazo de un mes.`,
          'Si crees que no hemos tratado bien tus datos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" rel="noopener" target="_blank">aepd.es</a>).',
        ],
      },
      {
        heading: 'Menores y seguridad',
        body: [
          'Esta web se dirige a empresas y profesionales. No recogemos a sabiendas datos de menores de 14 años.',
          'Aplicamos medidas técnicas y organizativas para proteger los datos: conexiones cifradas, accesos limitados a quien los necesita y proveedores con garantías de seguridad.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Política de cookies',
    description: 'Política de cookies de veodar.com: la web no usa cookies de seguimiento ni publicidad. Qué guarda en tu navegador, para qué y cómo cambiar tu elección.',
    eyebrow: 'Legal',
    h1: 'Política de cookies',
    lead: 'Esta web no usa cookies de seguimiento ni de publicidad. Guarda lo mínimo en tu navegador y solo mide visitas si lo aceptas.',
    sections: [
      {
        heading: 'Qué son',
        body: [
          'Las cookies y el almacenamiento local son pequeños datos que una web guarda en tu navegador para recordar algo entre una visita y otra. La ley distingue entre los técnicos, que hacen falta para que la web funcione o para darte lo que pides, y el resto, que necesitan tu consentimiento.',
        ],
      },
      {
        heading: 'Qué usamos',
        body: [
          '<ul><li><strong>veodar:consent</strong> · técnico · esta web · guarda tu elección sobre la medición · 12 meses.</li><li><strong>veodar:lang</strong> · preferencia · esta web · recuerda el idioma que eliges · hasta que lo borres.</li><li><strong>Cloudflare Turnstile</strong> · seguridad · solo en la página de contacto · comprueba que el formulario no lo envía un bot · durante la sesión.</li><li><strong>Vercel Web Analytics</strong> · medición, opcional · cuenta visitas por página de forma agregada · no guarda nada en tu navegador.</li><li><strong>Vercel Speed Insights</strong> · medición, opcional · mide la velocidad real de carga · no guarda nada en tu navegador.</li></ul>',
          'Las dos herramientas de medición solo se cargan si las aceptas, y dejan de enviar datos en cuanto retiras el permiso.',
        ],
      },
      {
        heading: 'Cómo cambiar tu elección',
        body: [
          'Puedes cambiarla cuando quieras desde el botón de abajo o desde «Preferencias de cookies», al final de cada página. También puedes borrar lo que la web ha guardado desde los ajustes de privacidad de tu navegador; la próxima vez te volveremos a preguntar.',
          '<button type="button" class="legal-btn" data-cookie-open>Abrir preferencias de cookies</button>',
        ],
      },
      {
        heading: 'Cambios en esta política',
        body: [`Si añadimos alguna herramienta que necesite tu consentimiento, actualizaremos esta página y te lo volveremos a preguntar. Más información sobre datos personales en la ${link('privacidad', 'es', 'política de privacidad')}.`],
      },
    ],
  },
};

const en: Record<LegalKey, LegalDoc> = {
  avisoLegal: {
    title: 'Legal Notice',
    description: 'Legal notice for veodar.com: site owner Veodar S.L., contact details, terms of use, intellectual property and governing law.',
    eyebrow: 'Legal',
    h1: 'Legal notice',
    lead: 'Who is behind this website and the terms for using it.',
    sections: [
      {
        heading: 'Website owner',
        body: [
          'In accordance with Spanish Law 34/2002 on information society services and e-commerce, these are the details of the owner of veodar.com:',
          `<ul><li><strong>Company name:</strong> ${company.legalName}</li><li><strong>Tax ID (NIF):</strong> ${company.taxId}</li><li><strong>Registered address:</strong> ${address('en')}</li><li><strong>Email:</strong> ${mail}</li>${registry('en')}</ul>`,
        ],
      },
      {
        heading: 'Purpose and use',
        body: [
          'This website describes the software engineering, artificial intelligence and design services Veodar provides, and lets you contact the studio. Browsing it means accepting this legal notice.',
          'Visitors agree to use it lawfully, without harming how it works or trying to access parts that are not public.',
        ],
      },
      {
        heading: 'Intellectual and industrial property',
        body: [
          'The text, illustrations, animated figures, design and code of this website belong to Veodar or its licensors. They may not be reproduced, distributed or modified without written permission, except for personal use with attribution.',
          'Third-party trademarks and product names on the website, such as software platforms we work with, belong to their owners. Mentioning them does not imply any business relationship or endorsement.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'The information on this website is general guidance; it does not replace a written proposal for each project. Veodar strives to keep it accurate and current, but is not liable for decisions based solely on it.',
          'The website links to third-party sites, such as AI assistants or platforms we mention. Veodar does not control those sites and is not responsible for their content.',
        ],
      },
      {
        heading: 'Data protection and cookies',
        body: [`How we handle personal data is explained in the ${link('privacidad', 'en', 'privacy policy')}, and what this website stores in your browser, in the ${link('cookies', 'en', 'cookie policy')}.`],
      },
      {
        heading: 'Governing law',
        body: ['This legal notice is governed by Spanish law. Any dispute is subject to the courts of Almería, Spain, unless consumer protection law provides otherwise.'],
      },
    ],
    note: 'This English version is a translation for convenience. If there is any discrepancy, the Spanish version prevails.',
  },
  privacidad: {
    title: 'Privacy Policy',
    description: 'Privacy policy of Veodar S.L.: what data we process when you write to us, why, on what legal basis, for how long and how to exercise your rights.',
    eyebrow: 'Legal',
    h1: 'Privacy policy',
    lead: 'What data we process when you write to us, why, and how to exercise your rights. In short: only what we need to reply.',
    sections: [
      {
        heading: 'Data controller',
        body: [`<ul><li><strong>Controller:</strong> ${company.legalName}</li><li><strong>Tax ID (NIF):</strong> ${company.taxId}</li><li><strong>Address:</strong> ${address('en')}</li><li><strong>Contact:</strong> ${mail}</li></ul>`],
      },
      {
        heading: 'What data we process',
        body: [
          `<ul><li><strong>${link('contacto', 'en', 'Contact')} form:</strong> name, email, company (optional), what you need, approximate budget and timing, and your message.</li><li><strong>Direct email:</strong> whatever you send to ${mail}.</li><li><strong>Technical data:</strong> the IP address and browser data used to check that the form is not sent by a bot, and server logs.</li><li><strong>Measurement:</strong> only if you accept it, aggregated visit and load-speed statistics, without cookies.</li></ul>`,
          'We do not ask for special categories of data. If you send them when they are not needed, we delete them.',
        ],
      },
      {
        heading: 'Purposes and legal basis',
        body: [
          '<ul><li><strong>Replying to your message and, if you ask, preparing a proposal:</strong> your consent when you send the form and steps taken at your request before a contract (GDPR Article 6(1)(a) and (b)).</li><li><strong>Protecting the form against automated submissions:</strong> our legitimate interest in preventing spam and abuse (Article 6(1)(f)).</li><li><strong>Measuring visits and site speed:</strong> your consent in the cookie box, which you can withdraw at any time (Article 6(1)(a)).</li><li><strong>If you become a client:</strong> performing the contract and meeting legal obligations, such as tax rules (Article 6(1)(b) and (c)).</li></ul>',
          'We do not make automated decisions with effects on you or build profiles from this data.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'Messages are kept as long as needed to answer them and, if no business relationship follows, for a maximum of twelve months. If you are a client, we keep data for the duration of the relationship and then for the periods required by law. Server logs are kept for a short period for security.',
        ],
      },
      {
        heading: 'Who else processes it',
        body: [
          'We do not share your data with third parties unless the law requires it. To run the website and the form, we use these providers, which process it on Veodar’s behalf:',
          '<ul><li><strong>Vercel Inc.:</strong> hosting for the website and the form, and anonymous measurement if you accept it.</li><li><strong>Resend:</strong> delivering form messages by email.</li><li><strong>Cloudflare, Inc.:</strong> spam protection for the form (Turnstile).</li><li><strong>Google:</strong> the email service where we receive messages.</li></ul>',
        ],
      },
      {
        heading: 'International transfers',
        body: [
          'Some of these providers may process data outside the European Economic Area, mainly in the United States. These transfers rely on the EU-U.S. Data Privacy Framework or on standard contractual clauses approved by the European Commission.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `You can request access to your data, its correction or deletion, restriction of processing, object to it, request portability and withdraw your consent at any time by writing to ${mail}. We will reply within one month.`,
          'If you believe we have not handled your data properly, you can file a complaint with the Spanish Data Protection Agency (<a href="https://www.aepd.es" rel="noopener" target="_blank">aepd.es</a>).',
        ],
      },
      {
        heading: 'Minors and security',
        body: [
          'This website is aimed at businesses and professionals. We do not knowingly collect data from children under 14.',
          'We apply technical and organizational measures to protect data: encrypted connections, access limited to those who need it, and providers with security guarantees.',
        ],
      },
    ],
    note: 'This English version is a translation for convenience. If there is any discrepancy, the Spanish version prevails.',
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'Cookie policy for veodar.com: no tracking or advertising cookies. What the site stores in your browser, why, and how to change your choice.',
    eyebrow: 'Legal',
    h1: 'Cookie policy',
    lead: 'This website uses no tracking or advertising cookies. It stores the bare minimum in your browser and only measures visits if you agree.',
    sections: [
      {
        heading: 'What they are',
        body: [
          'Cookies and local storage are small pieces of data a website keeps in your browser to remember something between visits. The law distinguishes technical ones, needed for the site to work or to give you what you ask for, from the rest, which need your consent.',
        ],
      },
      {
        heading: 'What we use',
        body: [
          '<ul><li><strong>veodar:consent</strong> · technical · this site · stores your measurement choice · 12 months.</li><li><strong>veodar:lang</strong> · preference · this site · remembers the language you pick · until you clear it.</li><li><strong>Cloudflare Turnstile</strong> · security · contact page only · checks the form is not sent by a bot · for the session.</li><li><strong>Vercel Web Analytics</strong> · measurement, optional · counts visits per page in aggregate · stores nothing in your browser.</li><li><strong>Vercel Speed Insights</strong> · measurement, optional · measures real load speed · stores nothing in your browser.</li></ul>',
          'Both measurement tools load only if you accept them, and stop sending data as soon as you withdraw permission.',
        ],
      },
      {
        heading: 'How to change your choice',
        body: [
          'You can change it at any time with the button below or from “Cookie preferences” at the bottom of every page. You can also clear what the site has stored from your browser’s privacy settings; next time we will ask again.',
          '<button type="button" class="legal-btn" data-cookie-open>Open cookie preferences</button>',
        ],
      },
      {
        heading: 'Changes to this policy',
        body: [`If we add any tool that needs your consent, we will update this page and ask you again. More about personal data in the ${link('privacidad', 'en', 'privacy policy')}.`],
      },
    ],
    note: 'This English version is a translation for convenience. If there is any discrepancy, the Spanish version prevails.',
  },
};

export const legalFor = (lang: Lang) => (lang === 'en' ? en : es);
