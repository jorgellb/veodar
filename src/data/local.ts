// The Almería page: where the studio is and what it builds for the companies around
// it. One real location, one page. Everything here has to stay true: the address is
// the registered one (see `company` in site.ts) and the description of the province
// sticks to what anyone can check.
import type { Block, Faq } from './pages';
import type { Lang } from '../i18n';

export type LocalText = {
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lead: string;
  sceneTitle: string;
  sceneCaption: string;
  blocks: Block[];
  deliverablesTitle: string;
  deliverables: string[];
  faq: Faq[];
  ctaTitle: string;
  ctaText: string;
  sectorsKicker: string;
  sectorsTitle: string;
  /** One line per sector with weight in the province: what we build there. */
  sectors: { id: string; text: string }[];
  servicesKicker: string;
  servicesTitle: string;
};

const es: LocalText = {
  title: 'Desarrollo de software e IA en Almería',
  description:
    'Estudio de software en Vera (Almería): automatizaciones con IA, desarrollo web, apps y diseño para empresas de la provincia y de toda España.',
  kicker: 'Vera · Almería',
  h1: 'Desarrollo de software e IA en Almería',
  lead: 'Veodar es un estudio de ingeniería y diseño con sede en Vera, en el Levante almeriense. Construimos automatizaciones con IA, aplicaciones web, apps móviles y de escritorio, y también marca, diseño y SEO, para empresas de la provincia y, en remoto, para equipos de toda España y de fuera.',
  sceneTitle: 'Planta con seguidores',
  sceneCaption:
    'Los seguidores giran siguiendo a la lámpara que hace de sol. Cuando una fila deja de producir, el inversor lo detecta, salta la alarma y se imprime la orden de trabajo para el técnico.',
  blocks: [
    {
      id: 'vera',
      nav: 'Desde Vera',
      heading: 'Un estudio de software en el Levante almeriense.',
      paragraphs: [
        'Veodar tiene su sede en Vera, en el Levante de la provincia de Almería. Desde aquí diseñamos y construimos software para empresas: automatizaciones con IA, aplicaciones web con cuentas y permisos, apps móviles que funcionan sin cobertura y programas de escritorio conectados a máquinas y básculas. El mismo equipo hace además la marca, el diseño y el SEO.',
        'Trabajamos en remoto con equipos de toda España y de fuera, en castellano y en inglés. Con las empresas de la provincia hay una ventaja práctica: estamos cerca para ver el proceso donde ocurre —la nave, el almacén, la recepción— antes de proponer nada.',
        'No vendemos horas ni licencias. Cada proyecto empieza por un ejemplo real de esta semana y un alcance escrito, y termina con el código, el dominio y las cuentas a nombre de vuestra empresa.',
      ],
    },
    {
      id: 'provincia',
      nav: 'La provincia',
      heading: 'Lo que más se repite en las empresas de la provincia.',
      paragraphs: [
        'En el Poniente y en el Campo de Níjar, la horticultura bajo plástico mueve cooperativas, alhóndigas y empresas hortofrutícolas con el mismo problema: entradas de socios tecleadas a mano, lotes que se siguen en papel y etiquetas que hay que rehacer. Ahí construimos trazabilidad lote a lote, puestos de báscula y etiquetado, y el portal del socio.',
        'Esa producción sale cada día en camiones frigoríficos hacia el resto de Europa. Para las empresas de transporte y los almacenes hacemos la app del conductor con prueba de entrega, la lectura automática de pedidos y albaranes y el portal donde el cliente ve su envío.',
        'En la Comarca del Mármol, alrededor de Macael, y en la industria auxiliar de la agricultura, el dato de la planta de producción sigue llegando tarde a la oficina: ahí encajan los partes digitales, el control de calidad y las ofertas preparadas desde el pedido. Y con cerca de tres mil horas de sol al año, las plantas fotovoltaicas y las instaladoras de autoconsumo necesitan mantenimiento ordenado y producción medida frente a la esperada.',
        'En la costa —Vera, Mojácar, Garrucha, el Cabo de Gata— los hoteles y los apartamentos turísticos compiten con las agencias online por su propia reserva directa, y las promotoras venden a compradores que deciden desde otro país. Para unos hacemos motor de reservas, check-in online y registro de viajeros; para otras, la web 3D de la promoción y el portal del comprador.',
      ],
    },
    {
      id: 'empezar',
      nav: 'Cómo empezamos',
      heading: 'Cómo empezamos con una empresa de aquí.',
      paragraphs: [
        'Con un papel. Pedimos el documento que más horas cuesta —el albarán, el parte, la hoja de cálculo que alguien rellena cada lunes— y lo seguimos de principio a fin: quién lo crea, quién lo copia y dónde acaba. De ahí sale una frase que describe el proyecto y una lista de lo que entra y lo que no.',
        'Después construimos un primer corte que alguien usa de verdad, sobre los sistemas que ya tenéis: el ERP, el programa de gestión, el TPV. Si hay IA, propone, y una persona o una regla escrita confirma. Medimos el antes y el después con el mismo documento del principio.',
        'Si lo que necesitáis no es software a medida sino una herramienta que ya existe, lo decimos en la primera respuesta.',
      ],
    },
  ],
  deliverablesTitle: 'Qué podemos construir para vuestra empresa',
  deliverables: [
    'Trazabilidad y etiquetado para cooperativas y almacenes',
    'App de conductor con prueba de entrega sin cobertura',
    'Partes de producción y control de calidad en planta',
    'Motor de reservas y check-in online para alojamientos',
    'Automatizaciones con IA para asesorías y despachos',
    'Webs, tiendas online y SEO para vender fuera de la provincia',
  ],
  faq: [
    {
      q: '¿Dónde está Veodar?',
      a: 'La sede está en Vera (Almería), en el Levante almeriense. El primer contacto es por correo, en info@veodar.com, o por el formulario de contacto; respondemos con una pregunta concreta sobre vuestro caso.',
    },
    {
      q: '¿Trabajáis solo con empresas de Almería?',
      a: 'No. Trabajamos en remoto, en castellano y en inglés, con empresas de toda España, Latinoamérica y el resto de Europa. Con las empresas de la provincia la cercanía ayuda a ver el proceso en persona, pero el método es el mismo.',
    },
    {
      q: '¿Qué tipo de empresa de la provincia encaja?',
      a: 'La que tiene un proceso repetido que hoy se hace a mano: una cooperativa que teclea entradas, un transportista con albaranes en papel, un hotel que vende por varios canales, una asesoría que calcula plazos o una fábrica que rellena partes al final del turno.',
    },
    {
      q: '¿Hacéis páginas web para negocios de Almería?',
      a: 'Sí. Además del software a medida, el estudio hace diseño web, rediseños que conservan el posicionamiento, tiendas online y SEO, incluida la visibilidad en buscadores de IA.',
    },
    {
      q: '¿Cuánto cuesta un proyecto?',
      a: 'Depende del alcance. No publicamos tarifa: cada precio sale de una lista escrita de lo que entra y lo que no. En la página de precios explicamos qué hace subir o bajar la cifra.',
    },
  ],
  ctaTitle: '¿Tu empresa está en Almería?',
  ctaText: 'Mándanos el ejemplo de esta semana: el albarán, el parte o la hoja de cálculo. Te decimos si es web, móvil, escritorio o una automatización con IA, y si encaja.',
  sectorsKicker: 'Por sector',
  sectorsTitle: 'Los sectores con más peso en la provincia',
  sectors: [
    { id: 'agroalimentacion', text: 'Trazabilidad por lote, entradas de socios y etiquetas GS1 para la huerta del Poniente y de Níjar.' },
    { id: 'logistica', text: 'App del conductor y prueba de entrega para el transporte frigorífico.' },
    { id: 'industria', text: 'Partes de producción, calidad y ofertas para la piedra natural y la industria auxiliar.' },
    { id: 'hosteleria-turismo', text: 'Reserva directa, check-in online y registro de viajeros para los alojamientos de la costa.' },
    { id: 'energia', text: 'Mantenimiento y seguimiento de producción para plantas e instaladoras.' },
    { id: 'inmobiliaria-construccion', text: 'Web 3D de la promoción y portal del comprador para quien compra a distancia.' },
  ],
  servicesKicker: 'Servicios',
  servicesTitle: 'Todo lo que hacemos, también aquí',
};

const en: LocalText = {
  title: 'Software Development and AI in Almería, Spain',
  description:
    'Software studio based in Vera (Almería, Spain): AI automation, web development, apps and design for companies in the province and beyond.',
  kicker: 'Vera · Almería, Spain',
  h1: 'Software development and AI in Almería',
  lead: 'Veodar is an engineering and design studio based in Vera, on the eastern coast of Almería, in southern Spain. We build AI automations, web applications, mobile and desktop apps, plus brand, design and SEO, for companies in the province and, remotely, for teams across Spain and abroad.',
  sceneTitle: 'Solar trackers',
  sceneCaption:
    'The trackers turn to follow the lamp that plays the sun. When a row stops producing, the inverter detects it, the alarm goes off and the work order prints for the technician.',
  blocks: [
    {
      id: 'vera',
      nav: 'From Vera',
      heading: 'A software studio on the eastern coast of Almería.',
      paragraphs: [
        'Veodar is based in Vera, in the east of the province of Almería. From here we design and build software for companies: AI automations, web applications with accounts and permissions, mobile apps that work with no signal and desktop programs connected to machines and scales. The same team also does the brand, the design and the SEO.',
        'We work remotely with teams across Spain and abroad, in Spanish and in English. With companies in the province there is a practical advantage: we are close enough to see the process where it happens—the plant, the warehouse, the front desk—before proposing anything.',
        'We don’t sell hours or licenses. Every project starts with a real example from this week and a written scope, and ends with the code, the domain and the accounts in your company’s name.',
      ],
    },
    {
      id: 'provincia',
      nav: 'The province',
      heading: 'What repeats most in the province’s companies.',
      paragraphs: [
        'In the west of the province and the Níjar plain, greenhouse farming drives cooperatives, produce auctions and trading companies with the same problem: grower intake typed by hand, lots tracked on paper and labels that have to be redone. There we build lot-by-lot traceability, scale and labeling stations, and the grower portal.',
        'That produce leaves every day in refrigerated trucks for the rest of Europe. For transportation companies and warehouses we build the driver app with proof of delivery, automatic reading of orders and delivery notes, and the portal where the customer sees their shipment.',
        'In the marble district around Macael, and in the industry that supplies agriculture, data from the shop floor still reaches the office late: that is where digital reports, quality control and quotes prepared from the order fit. And with close to three thousand hours of sun a year, solar plants and self-consumption installers need orderly maintenance and production measured against what was expected.',
        'On the coast—Vera, Mojácar, Garrucha, Cabo de Gata—hotels and vacation rentals compete with the online travel agencies for their own direct bookings, and homebuilders sell to buyers who decide from another country. For the first we build booking engines, online check-in and traveler registration; for the second, the development’s 3D website and the buyer portal.',
      ],
    },
    {
      id: 'empezar',
      nav: 'How we start',
      heading: 'How we start with a company from here.',
      paragraphs: [
        'With one document. We ask for the paperwork that costs the most hours—the delivery note, the report, the spreadsheet someone fills in every Monday—and follow it from start to finish: who creates it, who copies it and where it ends up. Out of that comes one sentence that describes the project and a list of what is in and what is out.',
        'Then we build a first release that someone really uses, on top of the systems you already have: the ERP, the management software, the POS. If there is AI, it proposes, and a person or a written rule confirms. We measure before and after with the same document we started from.',
        'If what you need is not custom software but a tool that already exists, we say so in our first reply.',
      ],
    },
  ],
  deliverablesTitle: 'What we can build for your company',
  deliverables: [
    'Traceability and labeling for cooperatives and warehouses',
    'Driver app with proof of delivery, even offline',
    'Production reports and quality control on the shop floor',
    'Booking engine and online check-in for lodging',
    'AI automations for accounting and law firms',
    'Websites, online stores and SEO to sell beyond the province',
  ],
  faq: [
    {
      q: 'Where is Veodar based?',
      a: 'Our registered office is in Vera, in the province of Almería, in southern Spain. First contact is by email, at info@veodar.com, or through the contact form; we reply with a specific question about your case.',
    },
    {
      q: 'Do you only work with companies in Almería?',
      a: 'No. We work remotely, in English and Spanish, with companies across Spain, Latin America and the rest of Europe. With companies in the province, being close helps us see the process in person, but the method is the same.',
    },
    {
      q: 'What kind of company is a good fit?',
      a: 'One with a repeated process that is still done by hand: a cooperative typing in intake, a carrier with paper delivery notes, a hotel selling through several channels, an accounting firm calculating deadlines or a factory filling in reports at the end of the shift.',
    },
    {
      q: 'Do you build websites for businesses in Almería?',
      a: 'Yes. Besides custom software, the studio does web design, redesigns that keep your rankings, online stores and SEO, including visibility in AI search.',
    },
    {
      q: 'How much does a project cost?',
      a: 'It depends on the scope. We don’t publish a rate card: every price comes from a written list of what is in and what is out. Our pricing page explains what moves the figure up or down.',
    },
  ],
  ctaTitle: 'Is your company in Almería?',
  ctaText: 'Send us this week’s example: the delivery note, the report or the spreadsheet. We’ll tell you whether it’s web, mobile, desktop or an AI automation, and if it fits.',
  sectorsKicker: 'By industry',
  sectorsTitle: 'The industries that weigh most in the province',
  sectors: [
    { id: 'agroalimentacion', text: 'Lot traceability, grower intake and GS1 labels for the province’s greenhouse farming.' },
    { id: 'logistica', text: 'Driver app and proof of delivery for refrigerated transport.' },
    { id: 'industria', text: 'Production reports, quality and quotes for natural stone and supplier industries.' },
    { id: 'hosteleria-turismo', text: 'Direct bookings, online check-in and traveler registration for lodging on the coast.' },
    { id: 'energia', text: 'Maintenance and production monitoring for plants and installers.' },
    { id: 'inmobiliaria-construccion', text: 'A 3D website for the development and a buyer portal for those buying from abroad.' },
  ],
  servicesKicker: 'Services',
  servicesTitle: 'Everything we do, here too',
};

export const localFor = (lang: Lang) => (lang === 'en' ? en : es);
