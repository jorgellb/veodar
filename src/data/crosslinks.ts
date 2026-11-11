// Internal linking between services and sectors. Every pair says, in one line, what
// that service does in that sector; the line appears on both pages, each linking to
// the other. Anchors rotate through a few natural variants per target, so a page is
// not always linked with the same words.
import type { Lang } from '../i18n';

type Pair = { service: string; sector: string; es: string; en: string };

export const pairs: Pair[] = [
  // Automatizaciones con IA
  { service: 'automatizaciones-ia', sector: 'seguros', es: 'Partes de siniestro leídos al entrar y expedientes montados para el tramitador.', en: 'Claims read on arrival and files built for the handler.' },
  { service: 'automatizaciones-ia', sector: 'banca-fintech', es: 'Conciliación bancaria que cruza movimientos y facturas, con lo dudoso a revisión.', en: 'Bank reconciliation that matches transactions to invoices and sends doubts to review.' },
  { service: 'automatizaciones-ia', sector: 'despachos-profesionales', es: 'Plazos calculados al recibir cada notificación y documentación de clientes ya clasificada.', en: 'Deadlines calculated as each notice arrives and client documents already sorted.' },
  { service: 'automatizaciones-ia', sector: 'salud', es: 'Recordatorios, lista de espera y consentimientos sin llamadas desde recepción.', en: 'Reminders, waitlists and consent forms without front-desk calls.' },
  { service: 'automatizaciones-ia', sector: 'logistica', es: 'Pedidos y albaranes en PDF, Excel o EDI leídos y cargados en el SGA.', en: 'Orders and delivery notes in PDF, Excel or EDI read and loaded into the WMS.' },
  { service: 'automatizaciones-ia', sector: 'agroalimentacion', es: 'Visión artificial en la línea para medir calibre, color y defectos.', en: 'Machine vision on the line to measure size, color and defects.' },
  { service: 'automatizaciones-ia', sector: 'industria', es: 'Ofertas y órdenes preparadas desde pedidos en PDF, y visión artificial en el control de calidad.', en: 'Quotes and orders prepared from PDF orders, plus machine vision in quality control.' },
  { service: 'automatizaciones-ia', sector: 'retail-ecommerce', es: 'Fichas de producto redactadas y revisadas, reposición propuesta y devoluciones preparadas.', en: 'Product pages drafted and reviewed, restocking proposed and returns prepared.' },
  { service: 'automatizaciones-ia', sector: 'energia', es: 'Alarmas agrupadas en órdenes de trabajo con su causa probable, y facturas revisadas con IA.', en: 'Alarms grouped into work orders with a probable cause, and invoices reviewed with AI.' },
  { service: 'automatizaciones-ia', sector: 'educacion', es: 'Avisos al tutor antes de perder el mínimo de asistencia y certificados que se envían solos.', en: 'Alerts to the tutor before attendance drops below the minimum, and certificates that send themselves.' },
  { service: 'automatizaciones-ia', sector: 'hosteleria-turismo', es: 'Asistente para huéspedes en varios idiomas y check-in online con los datos del registro de viajeros.', en: 'A multilingual guest assistant and online check-in with the traveler-registration data.' },
  { service: 'automatizaciones-ia', sector: 'inmobiliaria-construccion', es: 'Respuesta a los leads de los portales y agenda de visitas, sin perder ninguno.', en: 'Replies to portal leads and viewings scheduled, without losing any.' },
  // Desarrollo web
  { service: 'desarrollo-web', sector: 'logistica', es: 'Portal de clientes con el estado de cada envío, sus albaranes y sus pruebas de entrega.', en: 'A customer portal with every shipment’s status, delivery notes and proofs of delivery.' },
  { service: 'desarrollo-web', sector: 'inmobiliaria-construccion', es: 'Portal del comprador con sus documentos, sus pagos y el avance de su vivienda.', en: 'A buyer portal with their documents, payments and progress on their home.' },
  { service: 'desarrollo-web', sector: 'educacion', es: 'Matrícula online con documentos, pago y firma, sin pasar por secretaría.', en: 'Online enrollment with documents, payment and signature, with no trip to the office.' },
  { service: 'desarrollo-web', sector: 'banca-fintech', es: 'Backoffices y producto fintech con libro contable y registro de auditoría.', en: 'Back offices and fintech products with a ledger and an audit log.' },
  { service: 'desarrollo-web', sector: 'seguros', es: 'Portal del asegurado con el estado de cada siniestro y la documentación pendiente.', en: 'A policyholder portal with the status of every claim and any pending documents.' },
  { service: 'desarrollo-web', sector: 'salud', es: 'Herramientas internas con accesos por rol y registro de cada consulta al dato.', en: 'Internal tools with role-based access and a log of every data lookup.' },
  { service: 'desarrollo-web', sector: 'energia', es: 'Portal de autoconsumo con los trámites y la producción de cada instalación.', en: 'A self-consumption portal with each installation’s paperwork and production.' },
  { service: 'desarrollo-web', sector: 'despachos-profesionales', es: 'Portal del cliente que pide la documentación que falta y la deja clasificada.', en: 'A client portal that requests missing documents and files them.' },
  { service: 'desarrollo-web', sector: 'agroalimentacion', es: 'Portal del socio con sus entradas y sus liquidaciones.', en: 'A grower portal with their deliveries and settlements.' },
  // Apps móviles
  { service: 'aplicaciones-moviles', sector: 'logistica', es: 'App del conductor con la hoja de ruta y la prueba de entrega, también sin cobertura.', en: 'A driver app with the route sheet and proof of delivery, even offline.' },
  { service: 'aplicaciones-moviles', sector: 'industria', es: 'Parte de producción en la línea, aunque en la nave no haya wifi.', en: 'Production reports on the line, even when the plant has no Wi-Fi.' },
  { service: 'aplicaciones-moviles', sector: 'energia', es: 'Órdenes de trabajo, checklists y fotos en plantas donde no llega la señal.', en: 'Work orders, checklists and photos at plants with no signal.' },
  { service: 'aplicaciones-moviles', sector: 'hosteleria-turismo', es: 'App de pisos: la habitación se marca limpia y recepción puede volver a venderla.', en: 'A housekeeping app: a room is marked clean and the front desk can sell it again.' },
  { service: 'aplicaciones-moviles', sector: 'agroalimentacion', es: 'Cuaderno de campo digital por parcela, que se sincroniza al volver la cobertura.', en: 'A digital field log per plot that syncs when the signal returns.' },
  { service: 'aplicaciones-moviles', sector: 'seguros', es: 'App de peritación con fotos, checklist y firma en la misma visita.', en: 'A loss-adjusting app with photos, checklist and signature in the same visit.' },
  { service: 'aplicaciones-moviles', sector: 'salud', es: 'Consentimientos y formularios que el paciente firma desde su móvil antes de la cita.', en: 'Consent forms the patient signs on their phone before the appointment.' },
  { service: 'aplicaciones-moviles', sector: 'banca-fintech', es: 'Alta de clientes desde el móvil, con lectura y validación de documentos.', en: 'Customer onboarding from the phone, with document capture and validation.' },
  { service: 'aplicaciones-moviles', sector: 'inmobiliaria-construccion', es: 'App de partes de obra con fotos, también donde no hay cobertura.', en: 'A site-report app with photos, even where there is no signal.' },
  { service: 'aplicaciones-moviles', sector: 'educacion', es: 'Registro de asistencia desde el móvil, con QR o desde la app.', en: 'Attendance taken on the phone, by QR or from the app.' },
  // Apps de escritorio
  { service: 'aplicaciones-escritorio', sector: 'industria', es: 'Puestos de línea conectados a máquinas, básculas y lectores.', en: 'Line workstations connected to machines, scales and scanners.' },
  { service: 'aplicaciones-escritorio', sector: 'agroalimentacion', es: 'Puestos de báscula y etiquetado para las entradas de socios y las etiquetas GS1.', en: 'Scale and labeling stations for grower intake and GS1 labels.' },
  { service: 'aplicaciones-escritorio', sector: 'despachos-profesionales', es: 'Herramientas de puesto que trabajan con los documentos y los programas del despacho.', en: 'Workstation tools that work with the firm’s own documents and software.' },
  { service: 'aplicaciones-escritorio', sector: 'logistica', es: 'Puestos de expedición conectados a básculas, lectores y etiquetadoras.', en: 'Shipping stations connected to scales, scanners and label printers.' },
  // Identidad de marca
  { service: 'identidad-de-marca', sector: 'banca-fintech', es: 'Una marca que transmite confianza desde el icono de la app hasta el extracto.', en: 'A brand that signals trust from the app icon to the statement.' },
  { service: 'identidad-de-marca', sector: 'hosteleria-turismo', es: 'Del rótulo a la web de reservas, la misma identidad en cada punto de contacto.', en: 'From the sign to the booking site, one identity at every touchpoint.' },
  { service: 'identidad-de-marca', sector: 'energia', es: 'Propuestas, portal del cliente e instalaciones con una sola voz.', en: 'Proposals, customer portal and installations with one voice.' },
  { service: 'identidad-de-marca', sector: 'agroalimentacion', es: 'Marca y envase para vender con nombre propio, no solo a granel.', en: 'Brand and packaging to sell under your own name, not only in bulk.' },
  // Diseño web
  { service: 'diseno-web', sector: 'hosteleria-turismo', es: 'Webs de hotel con un motor de reservas directas rápido y claro.', en: 'Hotel websites with a fast, clear direct-booking engine.' },
  { service: 'diseno-web', sector: 'retail-ecommerce', es: 'Tiendas online con fichas que se entienden y un carrito sin fricción.', en: 'Online stores with product pages that make sense and a frictionless cart.' },
  { service: 'diseno-web', sector: 'salud', es: 'Webs de clínica donde pedir cita cuesta dos toques.', en: 'Clinic websites where booking takes two taps.' },
  { service: 'diseno-web', sector: 'educacion', es: 'Webs de centros de formación que llevan de la oferta de cursos a la matrícula.', en: 'Training-center websites that lead from the course catalog to enrollment.' },
  { service: 'diseno-web', sector: 'seguros', es: 'Formularios de alta y de parte que se rellenan sin llamar a nadie.', en: 'Quote and claim forms people can complete without calling anyone.' },
  // Desarrollo creativo
  { service: 'desarrollo-creativo', sector: 'retail-ecommerce', es: 'Páginas de producto que explican con movimiento lo que una foto no cuenta.', en: 'Product pages that explain with motion what a photo cannot.' },
  { service: 'desarrollo-creativo', sector: 'energia', es: 'Explicadores interactivos de cómo funciona una instalación.', en: 'Interactive explainers of how an installation works.' },
  { service: 'desarrollo-creativo', sector: 'educacion', es: 'Simulaciones y explicadores interactivos que se recuerdan mejor que un PDF.', en: 'Interactive simulations and explainers that stick better than a PDF.' },
  // Web 3D
  { service: 'web-3d-interactiva', sector: 'inmobiliaria-construccion', es: 'Promociones que se recorren en el navegador antes de que existan.', en: 'Developments you can walk through in the browser before they exist.' },
  { service: 'web-3d-interactiva', sector: 'industria', es: 'Maquinaria y producto industrial que se gira, se abre y se entiende.', en: 'Industrial machinery and products you can turn, open and understand.' },
  { service: 'web-3d-interactiva', sector: 'retail-ecommerce', es: 'Producto en 3D en la propia ficha, sin instalar nada.', en: 'Products in 3D on the product page itself, with nothing to install.' },
  // Configuradores 3D
  { service: 'configuradores-3d', sector: 'industria', es: 'Las variantes del catálogo, con precio y plazo al instante.', en: 'Catalog variants with instant price and lead time.' },
  { service: 'configuradores-3d', sector: 'retail-ecommerce', es: 'Al carrito llega exactamente la combinación que el cliente eligió.', en: 'The cart gets exactly the combination the customer chose.' },
  { service: 'configuradores-3d', sector: 'inmobiliaria-construccion', es: 'Acabados de obra nueva con su coste antes de firmar.', en: 'New-home finishes with their cost before signing.' },
  // Vídeos de lanzamiento
  { service: 'videos-de-lanzamiento', sector: 'industria', es: 'Qué hace la máquina, contado en un minuto y sin jerga.', en: 'What the machine does, told in one minute without jargon.' },
  { service: 'videos-de-lanzamiento', sector: 'banca-fintech', es: 'El producto financiero explicado antes de pedir el primer dato.', en: 'The financial product explained before asking for the first piece of data.' },
  { service: 'videos-de-lanzamiento', sector: 'retail-ecommerce', es: 'Vídeos de producto para la ficha y para las campañas.', en: 'Product videos for the product page and for campaigns.' },
  // Rediseño web
  { service: 'rediseno-web', sector: 'retail-ecommerce', es: 'Migraciones de tienda online con cada URL antigua redirigida a su destino.', en: 'Online store migrations with every old URL redirected to its destination.' },
  { service: 'rediseno-web', sector: 'hosteleria-turismo', es: 'Más reserva directa sin perder el tráfico que ya llega.', en: 'More direct bookings without losing the traffic you already get.' },
  { service: 'rediseno-web', sector: 'despachos-profesionales', es: 'Una web de despacho que explica qué hacéis y capta consultas.', en: 'A firm website that explains what you do and brings in inquiries.' },
  // SEO y visibilidad
  { service: 'seo-y-visibilidad', sector: 'retail-ecommerce', es: 'Un catálogo con datos estructurados que buscadores y asistentes de IA entienden.', en: 'A catalog with structured data that search engines and AI assistants understand.' },
  { service: 'seo-y-visibilidad', sector: 'hosteleria-turismo', es: 'Visibilidad propia frente a las agencias online.', en: 'Your own visibility against online travel agencies.' },
  { service: 'seo-y-visibilidad', sector: 'salud', es: 'Aparecer cuando alguien busca la especialidad en su ciudad.', en: 'Showing up when someone searches for the specialty in their city.' },
  { service: 'seo-y-visibilidad', sector: 'despachos-profesionales', es: 'Las preguntas reales de vuestros clientes, respondidas con vuestra firma.', en: 'Your clients’ real questions, answered under your name.' },
  { service: 'seo-y-visibilidad', sector: 'logistica', es: 'Aparecer cuando una empresa busca operador para su ruta o su tipo de mercancía.', en: 'Showing up when a company searches for a carrier for its route or type of freight.' },
  { service: 'seo-y-visibilidad', sector: 'seguros', es: 'Las dudas que la gente busca antes de contratar una póliza, respondidas en vuestra web.', en: 'The questions people search before buying a policy, answered on your site.' },
];

/** Sectors with similar problems, for the "other sectors" links at the foot of a sector page. */
export const siblings: Record<string, string[]> = {
  industria: ['logistica', 'agroalimentacion', 'energia'],
  logistica: ['industria', 'retail-ecommerce', 'agroalimentacion'],
  'retail-ecommerce': ['logistica', 'hosteleria-turismo', 'agroalimentacion'],
  salud: ['seguros', 'despachos-profesionales', 'educacion'],
  seguros: ['banca-fintech', 'salud', 'despachos-profesionales'],
  'banca-fintech': ['seguros', 'despachos-profesionales', 'inmobiliaria-construccion'],
  'inmobiliaria-construccion': ['banca-fintech', 'energia', 'hosteleria-turismo'],
  energia: ['industria', 'inmobiliaria-construccion', 'agroalimentacion'],
  educacion: ['salud', 'despachos-profesionales', 'hosteleria-turismo'],
  'despachos-profesionales': ['banca-fintech', 'seguros', 'inmobiliaria-construccion'],
  agroalimentacion: ['logistica', 'industria', 'retail-ecommerce'],
  'hosteleria-turismo': ['retail-ecommerce', 'inmobiliaria-construccion', 'educacion'],
};

// Anchor variants: how each page is named when another page links to it.
const sectorAnchors: Record<string, Record<Lang, string[]>> = {
  industria: { es: ['Industria y fabricación', 'Software para fábricas', 'IA para empresas industriales'], en: ['Manufacturing', 'Software for factories', 'AI for manufacturers'] },
  logistica: { es: ['Logística y transporte', 'Software para empresas de logística', 'IA para operadores logísticos'], en: ['Logistics and transportation', 'Software for logistics companies', 'AI for logistics operators'] },
  'retail-ecommerce': { es: ['Retail y ecommerce', 'Software para tiendas y ecommerce', 'IA para comercio minorista'], en: ['Retail and ecommerce', 'Software for stores and ecommerce', 'AI for retailers'] },
  salud: { es: ['Salud y clínicas', 'Software para clínicas', 'IA para centros de salud'], en: ['Healthcare and clinics', 'Software for clinics', 'AI for medical practices'] },
  seguros: { es: ['Seguros', 'Software para aseguradoras y corredurías', 'IA para corredurías de seguros'], en: ['Insurance', 'Software for insurers and brokers', 'AI for insurance brokers'] },
  'banca-fintech': { es: ['Banca y fintech', 'Software para entidades financieras', 'IA para fintech'], en: ['Banking and fintech', 'Software for financial institutions', 'AI for fintech companies'] },
  'inmobiliaria-construccion': { es: ['Inmobiliaria y construcción', 'Software para promotoras y constructoras', 'IA para inmobiliarias'], en: ['Real estate and construction', 'Software for developers and builders', 'AI for real estate agencies'] },
  energia: { es: ['Energía', 'Software para empresas de energía', 'IA para plantas e instaladoras'], en: ['Energy', 'Software for energy companies', 'AI for plants and installers'] },
  educacion: { es: ['Educación y formación', 'Software para centros de formación', 'IA para academias y colegios'], en: ['Education and training', 'Software for training centers', 'AI for schools and academies'] },
  'despachos-profesionales': { es: ['Despachos profesionales', 'Software para despachos de abogados y asesorías', 'IA para asesorías y gestorías'], en: ['Law and accounting firms', 'Software for law firms', 'AI for accounting practices'] },
  agroalimentacion: { es: ['Agroalimentación', 'Software para cooperativas agroalimentarias', 'IA para empresas agroalimentarias'], en: ['Agriculture and food', 'Software for agricultural cooperatives', 'AI for agrifood companies'] },
  'hosteleria-turismo': { es: ['Hostelería y turismo', 'Software para hoteles y restaurantes', 'IA para hoteles'], en: ['Hospitality and tourism', 'Software for hotels and restaurants', 'AI for hotels'] },
};
const serviceAnchors: Record<string, Record<Lang, string[]>> = {
  'automatizaciones-ia': { es: ['Automatizaciones con IA', 'Agentes de IA a medida', 'Automatización de procesos con IA'], en: ['AI automation', 'Custom AI agents', 'AI process automation'] },
  'desarrollo-web': { es: ['Desarrollo web a medida', 'Portales y aplicaciones web', 'Desarrollo de software web'], en: ['Custom web development', 'Portals and web apps', 'Web application development'] },
  'aplicaciones-moviles': { es: ['Apps móviles', 'Desarrollo de apps iOS y Android', 'Aplicaciones móviles a medida'], en: ['Mobile apps', 'iOS and Android app development', 'Custom mobile apps'] },
  'aplicaciones-escritorio': { es: ['Apps de escritorio', 'Software de escritorio a medida', 'Aplicaciones para Windows, macOS y Linux'], en: ['Desktop apps', 'Custom desktop software', 'Apps for Windows, macOS and Linux'] },
  'identidad-de-marca': { es: ['Identidad de marca', 'Branding y naming', 'Diseño de marca'], en: ['Brand identity', 'Branding and naming', 'Brand design'] },
  'diseno-web': { es: ['Diseño web', 'Diseño UX y UI', 'Diseño de interfaces'], en: ['Web design', 'UX and UI design', 'Interface design'] },
  'desarrollo-creativo': { es: ['Desarrollo creativo', 'Animación web y WebGL', 'Webs con movimiento'], en: ['Creative development', 'Web animation and WebGL', 'Websites with motion'] },
  'web-3d-interactiva': { es: ['Web 3D interactiva', 'Webs 3D con Three.js', '3D en tiempo real'], en: ['Interactive 3D websites', '3D websites with Three.js', 'Real-time 3D'] },
  'configuradores-3d': { es: ['Configuradores 3D', 'Configurador 3D de producto', 'Configuradores con precio al instante'], en: ['3D configurators', '3D product configurator', 'Configurators with instant pricing'] },
  'videos-de-lanzamiento': { es: ['Vídeos de lanzamiento', 'Vídeo de producto', 'Vídeos explicativos'], en: ['Launch videos', 'Product video', 'Explainer videos'] },
  'rediseno-web': { es: ['Rediseño web', 'Migración web sin perder SEO', 'Rediseño de sitios web'], en: ['Website redesign', 'Site migration without losing SEO', 'Web redesign'] },
  'seo-y-visibilidad': { es: ['SEO y visibilidad en IA', 'Posicionamiento SEO y GEO', 'SEO técnico y de contenidos'], en: ['SEO and AI search', 'SEO and GEO', 'Technical and content SEO'] },
};

const pick = (list: string[], n: number) => list[n % list.length];

const ENGINEERING = new Set(['desarrollo-web', 'aplicaciones-moviles', 'aplicaciones-escritorio']);

/** Sectors where a service is most used: anchor for the sector page plus the line. */
export function sectorsOfService(service: string, lang: Lang) {
  return pairs
    .filter((p) => p.service === service)
    .map((p) => {
      // The anchor has to fit the page it is on: "IA para…" from the AI service,
      // "Software para…" from the engineering ones, and the studio services alternate
      // between the sector's name and "Software para…", so a sector is linked with
      // different words across the site.
      const studio = pairs.filter((q) => q.sector === p.sector && q.service !== 'automatizaciones-ia' && !ENGINEERING.has(q.service));
      const n = service === 'automatizaciones-ia' ? 2 : ENGINEERING.has(service) ? 1 : studio.indexOf(p) % 2;
      return { sector: p.sector, anchor: pick(sectorAnchors[p.sector][lang], n), text: p[lang] };
    });
}

/** Services most used in a sector: anchor for the service page plus the line. */
export function servicesOfSector(sector: string, lang: Lang) {
  return pairs
    .filter((p) => p.sector === sector)
    .map((p) => {
      const n = pairs.filter((q) => q.service === p.service).indexOf(p);
      return { service: p.service, anchor: pick(serviceAnchors[p.service][lang], n), text: p[lang] };
    });
}

/** The line for one service in one sector, if that pair exists. */
export const pairText = (service: string, sector: string, lang: Lang) => pairs.find((p) => p.service === service && p.sector === sector)?.[lang];

/** A rotating anchor for a sector page (used by sibling links). */
export const sectorAnchor = (sector: string, lang: Lang, n = 0) => pick(sectorAnchors[sector][lang], n);

/** A rotating anchor for a service page. */
export const serviceAnchor = (service: string, lang: Lang, n = 0) => pick(serviceAnchors[service][lang], n);
