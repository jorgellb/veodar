// /programa-gestion-dental-gratis/ and /en/free-dental-software/: the page for people
// looking for a free dental practice management program, not yet for VeodarDental by
// name. The brand page (/sectores/salud/veodardental/) shows the program; this one
// answers the search: is there a free one, is it really free, what it includes, how to
// choose one and how to start.
//
// Written for search engines and AI assistants: each section answers its heading in its
// first sentences and stands on its own. Same rules as the brand page: nothing that cannot
// be backed up. It never says VeodarDental is "the best": the "best free dental program"
// search is answered with what to check, as a question. A test (tests/dental-gratis.test.js)
// holds it to that.
import type { Lang } from '../i18n';

export type Row = { what: string; why: string; vd: string };

export type FreeText = {
  title: string;
  description: string;
  crumb: string;
  kicker: string;
  h1: string;
  lead: string;
  ctaDownload: string;
  ctaProgram: string;
  chips: string[];
  priceLabel: string;
  priceNote: string;
  free: { title: string; answer: string; text: string; freeTitle: string; free: string[]; paidTitle: string; paid: string[] };
  includes: { title: string; answer: string; groups: { name: string; items: string[] }[]; more: string };
  choose: { title: string; answer: string; head: [string, string, string]; rows: Row[]; after: string };
  start: { title: string; answer: string; steps: { title: string; text: string }[] };
  spain: { title: string; answer: string; points: string[] };
  why: { title: string; answer: string; text: string; code: string };
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  shotAlt: string;
};

const es: FreeText = {
  title: 'Programa de gestión dental gratis: VeodarDental',
  description: 'Descarga gratis VeodarDental, el programa de gestión dental sin cuotas: agenda, odontograma, facturas VERI*FACTU, radiología y WhatsApp. Windows, Mac y Linux.',
  crumb: 'Programa dental gratis',
  kicker: 'Programa dental gratuito',
  h1: 'Programa de gestión dental gratis, sin cuotas ni licencias.',
  lead: 'VeodarDental es un programa de gestión dental gratuito para clínicas dentales: agenda, historia clínica con odontograma y periodontograma, presupuestos, cobros, facturas VERI*FACTU, radiología y recordatorios por WhatsApp. Se descarga para Windows, macOS y Linux, se usa entero sin pagar y funciona sin internet.',
  ctaDownload: 'Descargar gratis',
  ctaProgram: 'Ver el programa por dentro',
  chips: ['Sin cuotas', 'Sin pagar por puesto', 'Sin límite de pacientes', 'Funciona sin internet', 'VERI*FACTU', 'Windows, macOS y Linux'],
  priceLabel: 'al mes, por puesto y por paciente',
  priceNote: 'Todas las funciones. Sin prueba que caduque.',
  free: {
    title: '¿Es gratis de verdad?',
    answer: 'Sí. VeodarDental se descarga y se usa gratis con todas sus funciones: sin licencia que comprar, sin cuota mensual y sin pagar por puesto ni por paciente. No es una prueba que caduca ni una versión recortada.',
    text: 'La licencia está escrita y publicada con el código del programa: cualquier clínica puede instalarlo y usarlo en su trabajo sin pagar. Lo que no es gratis es nuestro trabajo, y solo si lo quieres: instalarlo en tus ordenadores, pasar los datos desde tu programa actual, alojar el servidor o darte soporte.',
    freeTitle: 'Gratis, para cualquier clínica',
    free: ['El programa completo, con todas sus funciones', 'Las actualizaciones, firmadas', 'Los ordenadores que tenga la clínica', 'Sus pacientes, sin límite', 'La clínica de ejemplo para probarlo'],
    paidTitle: 'De pago, solo si lo pides',
    paid: ['Instalarlo en tus ordenadores', 'Pasar tus datos desde tu programa actual', 'El servidor en la nube, si no lo quieres en la clínica', 'Soporte y formación del equipo'],
  },
  includes: {
    title: 'Qué incluye el programa dental gratuito',
    answer: 'Incluye todo lo que usa una clínica dental a diario, sin módulos de pago: la parte clínica, la recepción, las cuentas y la radiología, en un solo programa y para varios ordenadores a la vez.',
    groups: [
      { name: 'Clínica', items: ['Odontograma por caras', 'Periodontograma, también dictado por voz', 'Alertas clínicas con su fuente', 'Notas de evolución con plantillas', 'Recetas con avisos de alergias', 'Consentimientos firmados en la tableta', 'Implantes y esterilización trazados', 'Ortodoncia y laboratorio'] },
      { name: 'Recepción', items: ['Agenda por profesional y gabinete', 'Cita online con los huecos reales', 'Recordatorios por WhatsApp, SMS y correo', 'Lista de espera', 'Sala de espera', 'Espacio del paciente'] },
      { name: 'Cuentas', items: ['Presupuestos por fases', 'Cobros, caja y datáfono', 'Facturas VERI*FACTU', 'Mutuas y remesas SEPA', 'Financiación y cuotas', 'Informes y cuadro de mando'] },
      { name: 'Radiología e imagen', items: ['Enlace con el programa de cada aparato', 'TAC, panorámicas y periapicales en la ficha', 'DICOM en red con los aparatos', 'Modelos 3D de escáner intraoral', 'Análisis con IA como borrador'] },
      { name: 'Seguridad', items: ['Datos y copias cifrados', 'Copia diaria con ensayo de restauración', 'Permisos por perfil', 'Registro de accesos', 'Derechos del paciente (RGPD)', 'Registro de jornada'] },
    ],
    more: 'Cada función, con sus capturas, en la ficha de VeodarDental',
  },
  choose: {
    title: '¿Cuál es el mejor programa dental gratis? Lo que conviene mirar',
    answer: 'Depende de la clínica, pero en España un programa de gestión dental gratuito tiene que cumplir con VERI*FACTU, guardar los datos de salud con seguridad, no dejar la clínica parada sin internet y dejarte llevar tus datos si un día te vas. Estos son los diez puntos que conviene comprobar, y cómo los cumple VeodarDental:',
    head: ['Qué mirar', 'Por qué importa', 'En VeodarDental'],
    rows: [
      { what: 'Facturación VERI*FACTU', why: 'Las facturas tienen que encadenarse y poder enviarse a la AEAT.', vd: 'Registros encadenados con su huella, código QR y envío con el certificado de la clínica.' },
      { what: 'Dónde están los datos', why: 'Los datos de salud son de categoría especial (RGPD).', vd: 'En tus ordenadores o en un servidor de la clínica; en la nube de la UE si lo prefieres.' },
      { what: 'Sin internet', why: 'Un corte no puede parar la agenda ni la consulta.', vd: 'Funciona sin conexión; la red solo hace falta para lo que sale fuera.' },
      { what: 'Llevarte tus datos', why: 'Un programa gratis no debe atarte.', vd: 'Exportación completa de la historia de cada paciente.' },
      { what: 'Copias de seguridad', why: 'Un disco roto no puede costar los historiales.', vd: 'Copia diaria cifrada y un ensayo de restauración que comprueba pacientes, saldos y facturas.' },
      { what: 'Varios puestos', why: 'Recepción, gabinetes y dirección a la vez.', vd: 'Hasta 15 ordenadores con un servidor en la propia clínica.' },
      { what: 'Aparatos de rayos', why: 'El TAC y el radiovisiógrafo tienen que llegar a la ficha.', vd: 'Por el programa de cada fabricante, por carpeta, por DICOM en red o por TWAIN.' },
      { what: 'Lo que cuesta de verdad', why: 'Algunos «gratis» cobran por módulo, por puesto o pasado un tiempo.', vd: 'Licencia gratuita y escrita. Solo se paga el servicio que pidas.' },
      { what: 'Idiomas', why: 'El equipo trabaja en su idioma.', vd: 'Castellano, catalán, euskera, gallego e inglés.' },
      { what: 'Ordenadores', why: 'No todas las clínicas usan Windows.', vd: 'Windows, macOS y Linux.' },
    ],
    after: 'La mejor comprobación es tu propia agenda: descárgalo, pruébalo con la clínica de ejemplo y compáralo con lo que usas hoy.',
  },
  start: {
    title: 'Cómo empezar a usarlo, en cuatro pasos',
    answer: 'Se descarga, se instala y se prueba con una clínica de ejemplo en unos minutos; para trabajar con tus pacientes, empiezas con la clínica vacía o traes los datos de tu programa actual.',
    steps: [
      { title: 'Descárgalo', text: 'El instalador de tu sistema, desde esta página: Windows, macOS o Linux.' },
      { title: 'Instálalo', text: 'Los instaladores aún no van firmados, y el sistema avisa la primera vez: abajo se explica cómo abrirlos.' },
      { title: 'Pruébalo', text: 'Abre con una clínica de ejemplo inventada. Entra como Dirección con la contraseña 0000, que te pedirá cambiar.' },
      { title: 'Empieza con tu clínica', text: 'Con la clínica vacía, o con tus pacientes, citas y saldos traídos de tu programa actual tras un simulacro.' },
    ],
  },
  spain: {
    title: 'Hecho en España, para clínicas españolas',
    answer: 'VeodarDental está hecho en Vera (Almería) para la forma de trabajar de las clínicas dentales españolas y su normativa: facturación VERI*FACTU, protección de datos de salud, mutuas, remesas SEPA y los idiomas del país.',
    points: [
      'Facturas VERI*FACTU, con su cadena, su QR y el envío a la AEAT',
      'Protección de datos de salud: cifrado, permisos, registro de accesos y derechos del paciente',
      'Mutuas: autorizaciones y liquidaciones',
      'Remesas SEPA y conciliación con el extracto del banco',
      'Registro de jornada del equipo',
      'En castellano, catalán, euskera, gallego e inglés',
    ],
  },
  why: {
    title: 'Por qué es gratis',
    answer: 'Porque lo que vendemos no es el programa, es el trabajo. Veodar es un estudio de software de Vera (Almería): hacemos VeodarDental, lo damos gratis y cobramos a las clínicas que lo piden por instalarlo, pasar sus datos, alojar el servidor y darles soporte.',
    text: 'El programa no lleva publicidad ni pide registrarse para usarlo. Sus datos se quedan en la clínica: solo sale lo que la clínica decide enviar, como un recordatorio o una factura a la AEAT.',
    code: 'El código y las versiones, en GitHub',
  },
  faqTitle: 'Preguntas sobre el programa dental gratis',
  faq: [
    { q: '¿Hay algún programa de gestión dental gratis en España?', a: 'Sí: VeodarDental es un programa de gestión dental gratuito, hecho en España, con agenda, odontograma, periodontograma, presupuestos, cobros, facturas VERI*FACTU y radiología. Se descarga para Windows, macOS y Linux y se usa entero sin pagar.' },
    { q: '¿Es gratis de verdad o es una prueba?', a: 'Gratis de verdad: no caduca, no tiene funciones de pago ni cobra por puesto o por paciente. La licencia lo dice por escrito y está publicada con el código del programa.' },
    { q: '¿Qué se paga entonces?', a: 'Solo el trabajo que pidas: instalarlo, pasar tus datos desde tu programa actual, el servidor en la nube y el soporte. Si lo instalas tú, no pagas nada.' },
    { q: '¿Cumple con VERI*FACTU?', a: 'Genera los registros de facturación encadenados con su huella, el código QR y el envío a la AEAT. Se activa con el certificado de tu clínica, primero en el entorno de pruebas de la AEAT.' },
    { q: '¿Funciona sin internet?', a: 'Sí. Trabaja en los ordenadores de la clínica; la conexión solo hace falta para lo que sale fuera: recordatorios, cita online y envío de facturas a la AEAT.' },
    { q: '¿En cuántos ordenadores se puede usar?', a: 'En los que tenga la clínica, sin pagar por puesto. Con un servidor en uno de ellos, hasta 15 ordenadores trabajan a la vez con los mismos datos.' },
    { q: '¿Puedo pasar mis pacientes desde otro programa?', a: 'Sí. Primero se hace un simulacro con una exportación de tu programa y se comparan recuentos y totales, saldos incluidos; solo cuando cuadra se hace el cambio.' },
    { q: '¿Funciona en Mac?', a: 'Sí: hay instalador para Mac con chip de Apple y para Mac con Intel, además de Windows y Linux.' },
    { q: '¿Tiene publicidad o vende mis datos?', a: 'No. No lleva publicidad ni pide registrarse, y los datos de los pacientes se quedan en la clínica.' },
  ],
  ctaTitle: '¿Te ayudamos a empezar?',
  ctaText: 'El programa es gratis. Si quieres, lo instalamos, pasamos tus datos y lo dejamos funcionando en tu clínica.',
  shotAlt: 'Agenda de VeodarDental, el programa de gestión dental gratuito, con las citas por profesional',
};

const en: FreeText = {
  title: 'Free Dental Practice Management Software: VeodarDental',
  description: 'Download VeodarDental free: dental practice software with no fees. Scheduling, odontogram, VERI*FACTU invoices, X-rays and WhatsApp. Windows, Mac and Linux.',
  crumb: 'Free dental software',
  kicker: 'Free dental software',
  h1: 'Free dental practice management software, with no fees or licenses.',
  lead: 'VeodarDental is free dental practice management software for dental clinics: scheduling, clinical records with odontogram and periodontal chart, treatment plans, payments, VERI*FACTU invoices, X-rays and WhatsApp reminders. It downloads for Windows, macOS and Linux, is used in full without paying and works offline.',
  ctaDownload: 'Download free',
  ctaProgram: 'See inside the program',
  chips: ['No fees', 'No per-workstation charge', 'No patient limit', 'Works offline', 'VERI*FACTU', 'Windows, macOS and Linux'],
  priceLabel: 'a month, per workstation and per patient',
  priceNote: 'Every feature. No trial that expires.',
  free: {
    title: 'Is it really free?',
    answer: 'Yes. VeodarDental downloads and runs free with every feature: no license to buy, no monthly fee and no charge per workstation or per patient. It is not an expiring trial or a cut-down version.',
    text: 'The license is written down and published with the program’s code: any clinic can install it and use it in its work without paying. What is not free is our work, and only if you want it: installing it on your computers, moving your data from your current program, hosting the server or supporting you.',
    freeTitle: 'Free, for any clinic',
    free: ['The full program, with every feature', 'Updates, signed', 'As many computers as the clinic has', 'Its patients, with no limit', 'The example clinic to try it'],
    paidTitle: 'Paid, only if you ask',
    paid: ['Installing it on your computers', 'Moving your data from your current program', 'The cloud server, if you do not want it in the clinic', 'Support and team training'],
  },
  includes: {
    title: 'What the free dental software includes',
    answer: 'It includes everything a dental clinic uses every day, with no paid modules: clinical work, front desk, accounts and X-rays, in one program and on several computers at once.',
    groups: [
      { name: 'Clinical', items: ['Odontogram by surface', 'Periodontal chart, dictated too', 'Clinical alerts with their source', 'Progress notes from templates', 'Prescriptions with allergy warnings', 'Consent forms signed on a tablet', 'Implants and sterilisation traced', 'Orthodontics and the lab'] },
      { name: 'Front desk', items: ['Schedule by practitioner and surgery', 'Online booking with the real gaps', 'WhatsApp, SMS and email reminders', 'Waiting list', 'Waiting room', 'The patient’s own space'] },
      { name: 'Accounts', items: ['Phased treatment plans', 'Payments, till and card terminal', 'VERI*FACTU invoices', 'Insurers and SEPA direct debits', 'Financing and instalments', 'Reports and dashboard'] },
      { name: 'X-rays and imaging', items: ['A link with each device’s program', 'CT, panoramics and periapicals in the record', 'DICOM networking with the devices', '3D models from intraoral scanners', 'AI analysis as a draft'] },
      { name: 'Security', items: ['Encrypted data and backups', 'Daily backup with a restore rehearsal', 'Permissions by role', 'Access log', 'Patient rights (GDPR)', 'Working-time record'] },
    ],
    more: 'Every feature, with screenshots, on the VeodarDental page',
  },
  choose: {
    title: 'What is the best free dental software? What to check',
    answer: 'It depends on the clinic, but in Spain free dental practice software has to comply with VERI*FACTU, keep health data secure, not stop the clinic when the internet goes down and let you take your data with you if you ever leave. These are the ten points worth checking, and how VeodarDental meets them:',
    head: ['What to check', 'Why it matters', 'In VeodarDental'],
    rows: [
      { what: 'VERI*FACTU invoicing', why: 'Invoices have to be chained and ready to send to the Spanish tax agency.', vd: 'Chained records with their hash, QR code and submission with the clinic’s certificate.' },
      { what: 'Where the data lives', why: 'Health data is a special category under GDPR.', vd: 'On your computers or a server in the clinic; in the EU cloud if you prefer.' },
      { what: 'Offline', why: 'An outage must not stop the schedule or the surgery.', vd: 'It works offline; the network is only needed for what goes out.' },
      { what: 'Taking your data', why: 'Free software should not tie you down.', vd: 'Full export of each patient’s record.' },
      { what: 'Backups', why: 'A broken disk must not cost the records.', vd: 'An encrypted daily backup and a restore rehearsal that checks patients, balances and invoices.' },
      { what: 'Several workstations', why: 'Front desk, surgeries and management at once.', vd: 'Up to 15 computers with a server in the clinic itself.' },
      { what: 'X-ray devices', why: 'The CBCT and the sensor have to reach the record.', vd: 'Through each maker’s program, a folder, DICOM networking or TWAIN.' },
      { what: 'What it really costs', why: 'Some “free” programs charge per module, per seat or after a while.', vd: 'A free, written license. You only pay for the service you ask for.' },
      { what: 'Languages', why: 'The team works in its own language.', vd: 'Spanish, Catalan, Basque, Galician and English.' },
      { what: 'Computers', why: 'Not every clinic runs Windows.', vd: 'Windows, macOS and Linux.' },
    ],
    after: 'The real test is your own schedule: download it, try it with the example clinic and compare it with what you use today.',
  },
  start: {
    title: 'How to start using it, in four steps',
    answer: 'You download it, install it and try it with an example clinic in a few minutes; to work with your patients, you start with an empty clinic or bring the data from your current program.',
    steps: [
      { title: 'Download it', text: 'The installer for your system, from this page: Windows, macOS or Linux.' },
      { title: 'Install it', text: 'The installers are not signed yet, so the system warns you the first time: how to open them is explained below.' },
      { title: 'Try it', text: 'It opens with an invented example clinic. Sign in as Dirección (management) with the password 0000, which it asks you to change.' },
      { title: 'Start with your clinic', text: 'With an empty clinic, or with your patients, appointments and balances brought from your current program after a rehearsal.' },
    ],
  },
  spain: {
    title: 'Made in Spain, for Spanish clinics',
    answer: 'VeodarDental is made in Vera (Almería) for the way Spanish dental clinics work and the rules they follow: VERI*FACTU invoicing, health data protection, insurers, SEPA direct debits and the country’s languages.',
    points: [
      'VERI*FACTU invoices, with their chain, QR code and submission to the tax agency',
      'Health data protection: encryption, permissions, access log and patient rights',
      'Insurers: authorisations and claims',
      'SEPA direct debits and reconciliation with the bank statement',
      'The team’s working-time record',
      'In Spanish, Catalan, Basque, Galician and English',
    ],
  },
  why: {
    title: 'Why it is free',
    answer: 'Because what we sell is not the program, it is the work. Veodar is a software studio in Vera (Almería): we make VeodarDental, give it away and charge the clinics that ask for it to install it, move their data, host the server and support them.',
    text: 'The program has no ads and needs no sign-up. Its data stays in the clinic: only what the clinic decides to send goes out, such as a reminder or an invoice to the tax agency.',
    code: 'The code and releases, on GitHub',
  },
  faqTitle: 'Questions about free dental software',
  faq: [
    { q: 'Is there free dental practice management software in Spain?', a: 'Yes: VeodarDental is free dental practice management software, made in Spain, with scheduling, odontogram, periodontal chart, treatment plans, payments, VERI*FACTU invoices and X-rays. It downloads for Windows, macOS and Linux and is used in full without paying.' },
    { q: 'Is it really free or a trial?', a: 'Really free: it does not expire, has no paid features and charges nothing per workstation or per patient. The license says so in writing and is published with the program’s code.' },
    { q: 'So what do you pay for?', a: 'Only the work you ask for: installing it, moving your data from your current program, the cloud server and support. If you install it yourself, you pay nothing.' },
    { q: 'Does it comply with VERI*FACTU?', a: 'It creates the chained billing records with their hash, the QR code and the submission to the Spanish tax agency. It is switched on with your clinic’s certificate, first in the agency’s test environment.' },
    { q: 'Does it work offline?', a: 'Yes. It runs on the clinic’s computers; a connection is only needed for what goes out: reminders, online booking and sending invoices to the tax agency.' },
    { q: 'On how many computers can it be used?', a: 'On as many as the clinic has, with no per-workstation charge. With a server on one of them, up to 15 computers work at once with the same data.' },
    { q: 'Can I bring my patients from another program?', a: 'Yes. First there is a rehearsal with an export from your program, comparing counts and totals, balances included; only when they match do you switch.' },
    { q: 'Does it run on a Mac?', a: 'Yes: there are installers for Macs with Apple silicon and with Intel, as well as Windows and Linux.' },
    { q: 'Does it have ads or sell my data?', a: 'No. It has no ads and needs no sign-up, and patient data stays in the clinic.' },
  ],
  ctaTitle: 'Shall we help you get started?',
  ctaText: 'The program is free. If you want, we install it, move your data and leave it running in your clinic.',
  shotAlt: 'The VeodarDental schedule, free dental practice management software, with appointments by practitioner',
};

export const freeFor = (lang: Lang): FreeText => (lang === 'en' ? en : es);
export const freeTexts = { es, en };
