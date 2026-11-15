// VeodarDental: Veodar's own management software for dental clinics. Its page lives
// under the healthcare sector (/sectores/salud/veodardental/) and is shown as a block on
// the healthcare page and as a case on the desktop apps service.
//
// The copy only says what the program does today. Anything that needs the clinic or a
// third party first (the AEAT with the clinic's certificate, a WhatsApp Business account,
// the bank's payment terminal) says so. No prices, clients, ratings or results: a test
// (tests/veodardental.test.js) checks it. The screenshots are of the program running with
// its invented demo data; phone, ID and bank account numbers are blurred anyway (the
// program marks where it draws them: --zonas-privadas).
import type { Lang } from '../i18n';

export type Shot =
  | 'inicio'
  | 'agenda'
  | 'odontograma'
  | 'odontograma-radiografia'
  | 'periodontograma'
  | 'presupuestos'
  | 'facturas'
  | 'comunicaciones'
  | 'equipos'
  | 'ficha-imagenes'
  | 'tac'
  | 'comparar-radiografias'
  | 'ia-radiografia'
  | 'ficha-resumen'
  | 'ficha-filiacion'
  | 'ficha-salud'
  | 'ficha-historial'
  | 'ficha-documentos'
  | 'ficha-presupuestos'
  | 'ficha-cuenta'
  | 'cobros'
  | 'verifactu'
  | 'caja'
  | 'gastos'
  | 'bancos'
  | 'recalls'
  | 'listin'
  | 'almacen'
  | 'laboratorio'
  | 'ortodoncia'
  | 'tarifas'
  | 'colaboradores'
  | 'informes'
  | 'configuracion'
  | 'modulos'
  | 'pizarra'
  | 'entrada';

export type Feature = { title: string; text: string };

export type Tab = { shot: Shot; tab: string; title: string; text: string; points: string[] };

/** A screen in the gallery: its screenshot, its name and one line on what it is for. */
export type Screen = { shot: Shot; title: string; text: string };

/** The installers of the published version, as the release workflow names them. */
export type DownloadKey = 'exe' | 'msi' | 'dmg-arm' | 'dmg-intel' | 'deb' | 'rpm' | 'arch' | 'appimage' | 'portable';

// The version the download links point to: a GitHub release of jorgellb/veodardental,
// published by its installers workflow when the version tag is pushed. Sizes are those
// of that version's files, rounded to the megabyte. A new version changes these lines.
export const VD_VERSION = '0.2.1';
export const VD_RELEASES = 'https://github.com/jorgellb/veodardental/releases';
export const vdDownloads: Record<DownloadKey, { file: string; mb: number }> = {
  exe: { file: `veodardental_${VD_VERSION}_x64-setup.exe`, mb: 14 },
  msi: { file: `veodardental_${VD_VERSION}_x64_en-US.msi`, mb: 19 },
  'dmg-arm': { file: `VeodarDental_${VD_VERSION}_aarch64.dmg`, mb: 18 },
  'dmg-intel': { file: `VeodarDental_${VD_VERSION}_x64.dmg`, mb: 19 },
  deb: { file: `veodardental_${VD_VERSION}_amd64.deb`, mb: 23 },
  rpm: { file: `veodardental-${VD_VERSION}-1.x86_64.rpm`, mb: 17 },
  arch: { file: `veodardental-${VD_VERSION}-1-x86_64.pkg.tar.zst`, mb: 21 },
  appimage: { file: `veodardental_${VD_VERSION}_x86_64.AppImage`, mb: 22 },
  portable: { file: `VeodarDental-${VD_VERSION}-linux-x86_64.tar.gz`, mb: 23 },
};
export const vdDownloadUrl = (key: DownloadKey) => `${VD_RELEASES}/download/v${VD_VERSION}/${vdDownloads[key].file}`;

export type VdText = {
  title: string;
  description: string;
  crumb: string;
  kicker: string;
  /** Headline: the part in `em` is set in italics. */
  h1: [string, string, string];
  lead: string;
  cta: string;
  ctaDownload: string;
  chips: string[];
  archTitle: string;
  archLegend: { planned: string; done: string; prior: string };
  archNotes: { tooth: string; what: string; state: 'planned' | 'done' | 'prior' }[];
  shotNote: string;
  facts: Feature[];
  tour: { kicker: string; title: string; text: string; tabs: Tab[] };
  /** Every screen of the program, by area, each one opening large. */
  gallery: {
    kicker: string;
    title: string;
    text: string;
    /** «Ampliar», before the name of the screen, for the link that opens it large. */
    open: string;
    close: string;
    prev: string;
    next: string;
    /** What the row of links to the groups is, for screen readers. */
    jump: string;
    groups: { id: string; title: string; text: string; screens: Screen[] }[];
  };
  clinic: { kicker: string; title: string; text: string; features: Feature[] };
  imaging: {
    kicker: string;
    title: string;
    text: string;
    flow: {
      label: string;
      steps: Feature[];
      capture: string;
      devices: string[];
      program: string;
      folder: string;
      importLabel: string;
      kinds: string[];
    };
    roles: { title: string; text: string; device: { title: string; points: string[] }; veodar: { title: string; points: string[] } };
    devicesTitle: string;
    devices: Feature[];
    vendors: string;
    tabsLabel: string;
    tabs: Tab[];
    views: { title: string; text: string; labels: [string, string, string]; alt: string };
  };
  desk: {
    kicker: string;
    title: string;
    text: string;
    features: Feature[];
    chat: { clinic: string; reminder: string; reply: string; confirmed: string; agenda: string; planned: string; done: string; time: string; replyTime: string };
  };
  money: { kicker: string; title: string; text: string; features: Feature[]; chain: { invoice: string; hash: string; prev: string; ok: string; first: string } };
  trust: { kicker: string; title: string; text: string; features: Feature[] };
  move: { kicker: string; title: string; text: string; steps: Feature[] };
  built: { kicker: string; title: string; text: string; features: Feature[]; service: string; rust: string };
  download: {
    kicker: string;
    title: string;
    text: string;
    version: string;
    notes: string;
    yours: string;
    systems: { id: 'windows' | 'macos' | 'linux'; name: string; req: string; files: { key: DownloadKey; label: string }[] }[];
    firstTime: { title: string; text: string; windows: string; mac: string };
    clinic: string;
    contact: string;
    /** The link to the free dental software page. */
    freeLink: string;
  };
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  /** The block on the healthcare page and the case on the desktop apps page. */
  promo: { kicker: string; title: string; text: string; link: string; caseKicker: string; caseTitle: string; caseText: string; caseLink: string; points: string[] };
  shotAlt: Record<Shot, string>;
};

const es: VdText = {
  title: 'VeodarDental: software para clínicas dentales',
  description:
    'Programa gratuito para clínicas dentales: agenda, odontograma, periodontograma, presupuestos, cobros, facturas VERI*FACTU y WhatsApp. Funciona sin internet.',
  crumb: 'VeodarDental',
  kicker: 'Producto Veodar · Clínicas dentales',
  h1: ['Toda tu clínica dental en ', 'un solo', ' programa.'],
  lead: 'VeodarDental lleva la agenda, la historia clínica con odontograma y periodontograma, los presupuestos, los cobros, las facturas VERI*FACTU y los recordatorios a pacientes. Funciona en los ordenadores de la clínica, también sin internet, y está hecho en Rust para ir rápido y no perder un dato aunque se corte la luz a mitad de un guardado.',
  cta: 'Pide una demostración',
  ctaDownload: 'Descargar',
  chips: ['Gratuito', 'Agenda por profesional', 'Odontograma', 'Periodontograma', 'VERI*FACTU', 'WhatsApp y SMS', 'RGPD'],
  archTitle: 'Odontograma de VeodarDental',
  archLegend: { planned: 'Previsto', done: 'Realizado', prior: 'Previo' },
  archNotes: [
    { tooth: '16', what: 'Obturación OD', state: 'done' },
    { tooth: '21', what: 'Corona', state: 'prior' },
    { tooth: '26', what: 'Implante', state: 'planned' },
    { tooth: '36', what: 'Obturación O', state: 'planned' },
  ],
  shotNote: 'Capturas del programa con sus datos de ejemplo, inventados.',
  facts: [
    { title: 'Sin internet', text: 'Trabaja en tus ordenadores. La red solo hace falta para lo que sale fuera.' },
    { title: 'Varios puestos', text: 'Hasta 15 ordenadores con un servidor en la propia clínica.' },
    { title: 'Datos cifrados', text: 'Datos, diario y copias cifrados, con copia diaria automática.' },
    { title: 'Cinco idiomas', text: 'Castellano, catalán, euskera, gallego e inglés.' },
  ],
  tour: {
    kicker: 'El programa por dentro',
    title: 'Lo que ves cada día, sin rodeos.',
    text: 'Cada pantalla cabe en un portátil de 1280 píxeles y tiene un modo tableta con botones del tamaño del dedo.',
    tabs: [
      {
        shot: 'inicio',
        tab: 'Inicio',
        title: 'El día, de un vistazo',
        text: 'Al abrir el programa: las citas de hoy, quién está en la sala de espera, lo cobrado y lo pendiente.',
        points: ['Avisos que piden atención: stock bajo mínimo, laboratorio retrasado, presupuestos por aceptar', 'Fichaje de entrada y salida del equipo'],
      },
      {
        shot: 'agenda',
        tab: 'Agenda',
        title: 'Agenda por profesional y gabinete',
        text: 'Día o semana, con cada doctor en su columna, sus horarios, la comida y los festivos.',
        points: ['Las citas pedidas por internet llegan listas para confirmar', 'Sala de espera, en consulta y finalizada, a la vista'],
      },
      {
        shot: 'odontograma',
        tab: 'Odontograma',
        title: 'Un odontograma que se entiende',
        text: 'Cada pieza con lo previsto, lo realizado y lo previo, por caras, con su doctor y su tarifa.',
        points: ['Vista clara o de radiografía', 'Dentición temporal'],
      },
      {
        shot: 'periodontograma',
        tab: 'Periodontograma',
        title: 'Periodontograma con su evolución',
        text: 'Sondaje, sangrado, placa, recesión, furca y movilidad, comparados con el sondaje anterior.',
        points: ['Se puede dictar por voz, con cada valor a la vista antes de guardarlo', 'Índices de placa y sangrado calculados solos'],
      },
      {
        shot: 'presupuestos',
        tab: 'Presupuestos',
        title: 'Presupuestos que se siguen',
        text: 'Pendientes, aceptados, rechazados y caducados, con lo que hay en juego y la tasa de aceptación.',
        points: ['Planes por fases y alternativas', 'El paciente lo firma desde su móvil'],
      },
      {
        shot: 'facturas',
        tab: 'Facturas',
        title: 'Facturas preparadas para VERI*FACTU',
        text: 'Serie correlativa por año, cada factura encadenada a la anterior con su huella SHA-256 y su código QR.',
        points: ['Rectificativas y anulaciones dentro de la cadena', 'Un botón comprueba la integridad del registro'],
      },
      {
        shot: 'comunicaciones',
        tab: 'Comunicaciones',
        title: 'Recordatorios que salen solos',
        text: 'Citas, revisiones, cumpleaños y presupuestos por WhatsApp, SMS o correo, según lo que prefiera cada paciente.',
        points: ['Solo a quien ha dado su consentimiento', 'Sin datos de salud en los mensajes'],
      },
    ],
  },
  gallery: {
    kicker: 'Todas las pantallas',
    title: 'El programa entero, pantalla a pantalla.',
    text: 'Casi todo VeodarDental tal como se ve hoy, con sus datos de ejemplo, ordenado por áreas. Pulsa en una captura para verla en grande y pasar a la siguiente con las flechas.',
    open: 'Ampliar',
    close: 'Cerrar',
    prev: 'Anterior',
    next: 'Siguiente',
    jump: 'Áreas del programa',
    groups: [
      {
        id: 'recepcion',
        title: 'Recepción',
        text: 'Lo que tiene abierto quien atiende el mostrador y el teléfono.',
        screens: [
          { shot: 'inicio', title: 'Inicio', text: 'Las citas de hoy, la sala de espera, lo cobrado, lo pendiente y los avisos del día.' },
          { shot: 'agenda', title: 'Agenda', text: 'Cada profesional en su columna; las citas pedidas por internet esperan a un lado para confirmarlas.' },
          { shot: 'pizarra', title: 'Pizarra de la sala de espera', text: 'Para la pantalla de la sala: a quién le toca y en qué gabinete, con solo las iniciales si se prefiere.' },
          { shot: 'recalls', title: 'Recalls', text: 'Las revisiones que tocan, vencidas o próximas, con el teléfono a mano para llamar.' },
          { shot: 'listin', title: 'Listín telefónico', text: 'Contactos, colaboradores, laboratorios y proveedores en un solo listín, con las últimas llamadas.' },
          { shot: 'entrada', title: 'Entrada', text: 'Cada persona entra con su usuario y su PIN, y el programa se bloquea solo tras un rato sin uso.' },
        ],
      },
      {
        id: 'ficha',
        title: 'Ficha del paciente',
        text: 'Todo lo de un paciente en pestañas, con sus alertas clínicas siempre arriba.',
        screens: [
          { shot: 'ficha-resumen', title: 'Resumen', text: 'Lo realizado, lo cobrado y lo previsto, sus datos de contacto y sus próximas citas.' },
          { shot: 'ficha-filiacion', title: 'Filiación', text: 'Datos personales y administrativos, tarifa o mutua, domiciliación bancaria y quién paga.' },
          { shot: 'ficha-salud', title: 'Salud', text: 'El cuestionario de salud con su fecha y su estado; el paciente puede rellenarlo desde el enlace de su cita.' },
          { shot: 'ficha-historial', title: 'Historial', text: 'Lo hecho y lo previsto, pieza a pieza, con su doctor, su fecha y su importe.' },
          { shot: 'ficha-documentos', title: 'Documentos y consentimientos', text: 'Consentimientos con el texto de cada tratamiento, firmados por el paciente en la pantalla.' },
          { shot: 'ficha-presupuestos', title: 'Presupuestos del paciente', text: 'Sus presupuestos, con su estado, su validez y su importe.' },
          { shot: 'ficha-cuenta', title: 'Cuenta', text: 'Cargos y cobros con su saldo, para cobrar o devolver desde la misma pestaña.' },
        ],
      },
      {
        id: 'clinica',
        title: 'Clínica',
        text: 'Las herramientas del gabinete.',
        screens: [
          { shot: 'odontograma', title: 'Odontograma', text: 'Lo previsto, lo realizado y lo previo de cada pieza, por caras, con su doctor y su tarifa.' },
          { shot: 'odontograma-radiografia', title: 'Odontograma en vista de radiografía', text: 'La misma boca sobre fondo oscuro, como se ve en una radiografía.' },
          { shot: 'periodontograma', title: 'Periodontograma', text: 'Sondaje, sangrado, placa, recesión, furca y movilidad, comparados con el sondaje anterior.' },
          { shot: 'ortodoncia', title: 'Ortodoncia', text: 'Casos activos con su aparato, sus controles y lo que falta de tratamiento.' },
          { shot: 'laboratorio', title: 'Laboratorio', text: 'Trabajos encargados con su fecha de entrega y los retrasados a la vista.' },
        ],
      },
      {
        id: 'imagen',
        title: 'Imagen',
        text: 'Radiografías, TAC y fotos, con los programas de cada aparato.',
        screens: [
          { shot: 'equipos', title: 'Imágenes y enlaces', text: 'Cada aparato de la clínica con su programa y su carpeta, configurado una vez.' },
          { shot: 'ficha-imagenes', title: 'Imágenes del paciente', text: 'Un botón para capturar con cada aparato y su galería, con la radiografía abierta.' },
          { shot: 'tac', title: 'TAC', text: 'Un estudio de ejemplo en el visor del programa, en vista axial con su escala.' },
          { shot: 'comparar-radiografias', title: 'Comparar radiografías', text: 'Dos imágenes del mismo paciente lado a lado, con los días entre una y otra.' },
          { shot: 'ia-radiografia', title: 'IA de radiografías', text: 'Hallazgos propuestos por pieza, en borrador hasta que los revisa un dentista.' },
        ],
      },
      {
        id: 'cuentas',
        title: 'Cuentas',
        text: 'Del presupuesto al banco.',
        screens: [
          { shot: 'presupuestos', title: 'Presupuestos', text: 'Pendientes, aceptados, rechazados y caducados, con la tasa de aceptación.' },
          { shot: 'cobros', title: 'Cobros', text: 'Cada cobro con su forma de pago; las remesas SEPA y los pagos por internet, en sus pestañas.' },
          { shot: 'facturas', title: 'Facturas', text: 'Serie correlativa por año, cada factura encadenada a la anterior con su huella.' },
          { shot: 'verifactu', title: 'VERI*FACTU', text: 'Los registros pendientes de enviar a la AEAT, los aceptados y los rechazados.' },
          { shot: 'caja', title: 'Caja', text: 'Movimientos del día y arqueo del efectivo, billete a billete.' },
          { shot: 'gastos', title: 'Gastos', text: 'Gastos por categoría y proveedor, con lo pendiente de pago y el resultado del periodo.' },
          { shot: 'bancos', title: 'Bancos', text: 'El extracto del banco, en Norma 43 o Excel, conciliado con los cobros y los gastos.' },
        ],
      },
      {
        id: 'gestion',
        title: 'Gestión',
        text: 'Lo que lleva la dirección de la clínica.',
        screens: [
          { shot: 'comunicaciones', title: 'Comunicaciones', text: 'Recordatorios por WhatsApp, SMS o correo, solo a quien ha dado su consentimiento.' },
          { shot: 'almacen', title: 'Almacén', text: 'Productos con su stock, lotes que caducan y pedidos a proveedores.' },
          { shot: 'tarifas', title: 'Tarifas y tratamientos', text: 'El catálogo de tratamientos con su precio en cada tarifa o mutua.' },
          { shot: 'colaboradores', title: 'Colaboradores', text: 'Doctores, higienistas y personal, con su horario de consulta y su producción.' },
          { shot: 'informes', title: 'Informes', text: 'Libro diario, producción, ingresos, captación y resumen económico, entre las fechas que elijas.' },
          { shot: 'configuracion', title: 'Configuración', text: 'Datos de la clínica, gabinetes, usuarios y permisos, cita online, copias de seguridad y trabajo en red.' },
          { shot: 'modulos', title: 'Más módulos', text: 'Las integraciones (radiología, WhatsApp, receta electrónica, bancos…) y dónde se configura cada una.' },
        ],
      },
    ],
  },
  clinic: {
    kicker: 'Clínica',
    title: 'Lo clínico, con el cuidado que merece.',
    text: 'La historia de cada paciente en una ficha: lo que tiene, lo que se le ha hecho y lo que hay que tener en cuenta antes de sentarlo en el sillón.',
    features: [
      { title: 'Alertas clínicas con su fuente', text: 'Alergias, anticoagulantes o una cardiopatía avisan antes de empezar, con la fuente citada. El profesional deja constancia de que las ha revisado.' },
      { title: 'Radiografías, TAC y modelos 3D', text: 'Periapicales, panorámicas, estudios DICOM y CBCT y modelos STL en la ficha del paciente, con comparación entre fechas.' },
      { title: 'IA de radiografías, como borrador', text: 'Propone hallazgos sobre una radiografía, pero nada entra en la historia sin la revisión de un dentista. A la IA solo viaja la imagen, sin el nombre.' },
      { title: 'Notas, recetas y consentimientos', text: 'Notas de evolución con plantillas o dictadas. Recetas con vademécum y avisos de alergias y anticoagulantes. Consentimientos firmados en la tableta.' },
      { title: 'Implantes y esterilización trazados', text: 'Cada implante, del lote del pedido al paciente. Cada bolsa esterilizada, del ciclo validado al paciente con el que se usó.' },
      { title: 'Ortodoncia y laboratorio', text: 'Controles de ortodoncia con sus cuotas. Órdenes al laboratorio con sus adjuntos, de serie sin el nombre del paciente.' },
    ],
  },
  imaging: {
    kicker: 'Radiología e imagen',
    title: 'Tus aparatos de rayos, conectados a la ficha.',
    text: 'Cada aparato sigue con el programa de su fabricante, que es el que hace las tomas y las enseña con su visor profesional. VeodarDental lo abre desde la ficha con el paciente ya elegido y junta en su galería lo que captura, ordenado por tipo y por fecha.',
    flow: {
      label: 'Cómo se conecta un aparato de imagen',
      steps: [
        { title: 'Un botón en la ficha', text: '«Capturar con» muestra un botón por cada aparato de la clínica.' },
        { title: 'El paciente, ya puesto', text: 'VeodarDental escribe sus datos en el fichero puente IMCONECT.ini y abre el programa del aparato con sus parámetros.' },
        { title: 'El aparato captura', text: 'Con el programa de su fabricante, que deja las imágenes en la carpeta del paciente.' },
        { title: 'A su galería', text: 'Lo que deja el aparato entra solo en su ficha, ordenado: periapicales, panorámicas, TAC, fotos y modelos 3D. Lo dudoso espera a que alguien lo confirme.' },
      ],
      capture: 'Capturar con',
      devices: ['RVG', 'Panorámica', 'TAC', 'Cámara', 'Escáner'],
      program: 'Programa del aparato',
      folder: 'Carpeta del paciente',
      importLabel: 'Importar',
      kinds: ['Periapical', 'Panorámica', 'TAC 3D', 'Foto intraoral', 'Escáner 3D'],
    },
    roles: {
      title: 'Cada aparato, con su propio programa.',
      text: 'Cada clínica tiene su TAC, su ortopantomógrafo, sus sensores y su cámara, y cada uno trae el programa de su fabricante: Carestream, Acteon AIS, Planmeca, Dentsply Sirona u otro. VeodarDental no lo sustituye: se integra con él.',
      device: {
        title: 'Lo hace el programa del aparato',
        points: ['Las tomas: radiografías, TAC y fotos', 'Su visor profesional: medidas, reconstrucciones y planificación de implantes', 'Guardar los estudios a su manera'],
      },
      veodar: {
        title: 'Lo hace VeodarDental',
        points: [
          'Abrir ese programa desde la ficha, con el paciente ya puesto',
          'Juntar en la ficha lo que captura, con su fecha y sus piezas',
          'Volver a abrir un estudio en el visor del fabricante con un botón',
          'Con los aparatos que hablan DICOM en red, darles la lista de citados y recibir sus imágenes',
          'Un visor rápido para la consulta: radiografías, TAC en tres planos y modelos 3D',
        ],
      },
    },
    devicesTitle: 'Los aparatos que se conectan',
    devices: [
      { title: 'Radiovisiógrafo (RVG)', text: 'Periapicales y aletas de mordida, con las piezas a las que corresponden.' },
      { title: 'Ortopantomógrafo', text: 'Panorámicas y telerradiografías.' },
      { title: 'TAC / CBCT', text: 'Estudios DICOM en vista axial, coronal y sagital. Por la red DICOM, el TAC recibe la lista de citados.' },
      { title: 'Cámara intraoral', text: 'Fotos para el plan de tratamiento y para enseñárselas al paciente.' },
      { title: 'Escáner intraoral', text: 'Modelos 3D en STL, PLY u OBJ que se giran y se miden en milímetros.' },
    ],
    vendors: 'Trae plantillas para los programas de Carestream, Acteon, Planmeca, Dentsply Sirona, Dexis y MyRay, y cualquier otro se añade con su ruta, sus parámetros y su fichero puente. Habla DICOM en red con los aparatos que lo admiten, y un sensor o un escáner sin programa propio captura por TWAIN con NAPS2, un programa libre. En la instalación se ajusta a los aparatos de tu clínica y se prueba con ellos.',
    tabsLabel: 'Radiología e imagen, pantalla a pantalla',
    tabs: [
      {
        shot: 'equipos',
        tab: 'Equipos',
        title: 'Cada aparato, configurado una vez',
        text: 'En «Imágenes y enlaces» está cada aparato con su programa, sus parámetros y la carpeta donde deja las imágenes. Si en ese ordenador no está instalado, lo dice.',
        points: ['Comodines con los datos del paciente: número de historia, nombre, DNI, fecha de nacimiento', 'Un registro de cada apertura, con su resultado'],
      },
      {
        shot: 'ficha-imagenes',
        tab: 'En la ficha',
        title: 'Capturar sin salir del paciente',
        text: 'En la pestaña Imágenes de cada paciente: un botón por aparato, su galería por tipo y un visor con zoom, brillo, contraste, negativo y giro.',
        points: ['Lo que deja el aparato en la carpeta del paciente entra solo en su ficha', 'Cada imagen con su fecha, sus piezas y el aparato del que viene'],
      },
      {
        shot: 'tac',
        tab: 'TAC',
        title: 'Un vistazo al TAC sin salir de la ficha',
        text: 'Para enseñarlo en la consulta o comprobar qué estudio es: vista axial, coronal o sagital, con la proporción real, la escala en milímetros y la orientación en los bordes. Para planificar, «Abrir en visor 3D» lo abre en el programa del fabricante.',
        points: ['Muestra el paciente y la fecha que dice el propio fichero, para comprobar que es su estudio', 'El visor profesional del TAC, a un botón, con el paciente ya puesto'],
      },
      {
        shot: 'comparar-radiografias',
        tab: 'Comparar',
        title: 'Antes y después, lado a lado',
        text: 'Dos radiografías del mismo paciente, la más antigua a la izquierda, con sus fechas, sus piezas y los días entre una y otra.',
        points: ['El mismo zoom y el mismo giro en las dos', 'Solo compara imágenes del mismo paciente'],
      },
      {
        shot: 'ia-radiografia',
        tab: 'IA',
        title: 'Una segunda mirada, como borrador',
        text: 'Si la clínica la activa, la IA propone hallazgos por pieza sobre una radiografía, con su gravedad y su confianza. Nada entra en la historia sin la revisión de un profesional.',
        points: ['A la IA solo viaja la imagen, sin el nombre del paciente', 'Queda apuntado qué modelo respondió y quién lo pidió'],
      },
    ],
    views: {
      title: 'Un TAC en sus tres planos',
      text: 'Un estudio de ejemplo, inventado, en el visor rápido de VeodarDental: el implante del 46 y el hueco del 36 en los tres planos. Las medidas y la planificación se hacen en el visor del fabricante del TAC, que se abre desde la ficha.',
      labels: ['Axial', 'Coronal', 'Sagital'],
      alt: 'Corte {view} de un TAC dental de ejemplo en el visor de VeodarDental',
    },
  },
  desk: {
    kicker: 'Recepción',
    title: 'Menos teléfono en recepción.',
    text: 'Lo que hoy se hace llamando, el programa lo hace por mensaje, y la respuesta llega sola a la agenda.',
    features: [
      { title: 'Cita online', text: 'Con los huecos reales de la agenda, por profesional y por motivo.' },
      { title: 'Confirmar sin llamar', text: 'Cada recordatorio lleva un enlace para confirmar, cambiar o anular la cita.' },
      { title: 'Lista de espera', text: 'Un hueco que queda libre se ofrece a la lista de espera, y el primero que contesta se lo queda.' },
      { title: '«Mi espacio» del paciente', text: 'Sus citas, presupuestos, facturas y documentos, con su DNI y su fecha de nacimiento.' },
    ],
    chat: {
      clinic: 'Tu clínica',
      reminder: 'Hola, Ana: le recordamos su cita el lunes 16 a las 09:30 con la Dra. Ruiz. ¿Podrá venir?',
      reply: 'Sí, allí estaré',
      confirmed: 'Cita confirmada en la agenda',
      agenda: 'Agenda · lunes 16',
      planned: 'Planificada',
      done: 'Confirmada',
      time: '10:02',
      replyTime: '10:05',
    },
  },
  money: {
    kicker: 'Cuentas',
    title: 'Las cuentas, al céntimo.',
    text: 'Del presupuesto a la factura y del cobro al banco, con cada importe calculado en céntimos exactos.',
    features: [
      { title: 'Presupuestos, cuotas y financiación', text: 'Las cuotas suman exactamente el total. Financiación con entidad y seguimiento de cada plazo.' },
      { title: 'Cobros y caja', text: 'Caja diaria con lo esperado en efectivo, cobros con datáfono y pago por internet con el TPV de tu banco.' },
      { title: 'Mutuas y SEPA', text: 'Autorizaciones y liquidaciones a aseguradoras, remesas SEPA y conciliación con el extracto del banco.' },
      { title: 'Informes con sus fórmulas', text: 'Producción, cobros, pendientes y un cuadro de mando que dice cómo se calcula cada cifra.' },
    ],
    chain: { invoice: 'Factura', hash: 'Huella', prev: 'Huella anterior', ok: 'Integridad del registro: correcta', first: 'Primera de la serie' },
  },
  trust: {
    kicker: 'Seguridad',
    title: 'Tus datos, en tu clínica.',
    text: 'Los datos de salud son de categoría especial, y el programa está diseñado pensando en eso.',
    features: [
      { title: 'En tus ordenadores', text: 'Con un ordenador basta. Con varios, un servidor en la propia clínica, o en la nube con un proveedor de la UE si lo prefieres.' },
      { title: 'Nada se pierde', text: 'Cada cambio se apunta en un diario antes de guardarse: si se va la luz a mitad, al volver está todo.' },
      { title: 'Copias que se ensayan', text: 'Copia diaria automática y cifrada, y un ensayo de restauración que comprueba pacientes, saldos y facturas.' },
      { title: 'Quién vio qué', text: 'Registro de cada acceso a una historia y permisos por perfil comprobados en el servidor: recepción no ve lo clínico.' },
      { title: 'Derechos del paciente', text: 'Exportación completa de su historia, limitación y bloqueo, con cada solicitud registrada.' },
      { title: 'Registro de jornada', text: 'El equipo ficha desde el programa, y cada corrección queda trazada.' },
    ],
  },
  move: {
    kicker: 'Cambiarse',
    title: 'Cambiarse sin miedo.',
    text: 'Traemos tus pacientes, citas, tratamientos, saldos y documentos desde tu programa actual, en este orden:',
    steps: [
      { title: 'Exportación', text: 'Tu programa actual exporta los datos. Te decimos qué hace falta.' },
      { title: 'Simulacro', text: 'Los importamos aparte y comparamos recuentos y totales, saldos incluidos, con los del programa de origen.' },
      { title: 'Repaso', text: 'Revisas el simulacro con tu equipo y decides los casos dudosos, como dos fichas con el mismo DNI.' },
      { title: 'Cambio', text: 'El día elegido, con una copia previa de todo y los datos de ejemplo fuera.' },
    ],
  },
  built: {
    kicker: 'Hecho por Veodar',
    title: 'Rápido porque está hecho en Rust.',
    text: 'VeodarDental es un programa de escritorio de verdad, no una web metida en una ventana. Lo construimos nosotros, con las mismas herramientas con las que hacemos apps de escritorio a medida.',
    features: [
      { title: 'Rápido con miles de pacientes', text: 'En nuestras mediciones con una clínica de prueba de 8.000 pacientes, guardar un cambio tarda entre 0,02 y 0,15 segundos.' },
      { title: 'Varios centros', text: 'Un grupo de clínicas ve sus cifras juntas, y cada usuario trabaja solo en los centros que le tocan.' },
      { title: 'Actualizaciones coordinadas', text: 'Todos los puestos se actualizan a la vez, con vuelta atrás si algo no va.' },
    ],
    service: 'Apps de escritorio a medida',
    rust: 'Desarrollo con Rust',
  },
  download: {
    kicker: 'Descargar',
    title: 'Pruébalo en tu ordenador.',
    text: 'Es gratuito, sin licencia ni pago por puesto. Se instala en un momento y se abre con una clínica de ejemplo, con pacientes, citas y facturas inventados: entra como Dirección con la contraseña inicial 0000, que te pedirá cambiar.',
    version: 'Versión',
    notes: 'Notas de la versión y anteriores, en GitHub',
    yours: 'Tu sistema',
    systems: [
      {
        id: 'windows',
        name: 'Windows',
        req: 'Windows 10 y 11, 64 bits',
        files: [
          { key: 'exe', label: 'Instalador' },
          { key: 'msi', label: 'Para instalar en varios equipos' },
        ],
      },
      {
        id: 'macos',
        name: 'macOS',
        req: 'macOS 11 o posterior',
        files: [
          { key: 'dmg-arm', label: 'Mac con chip de Apple' },
          { key: 'dmg-intel', label: 'Mac con Intel' },
        ],
      },
      {
        id: 'linux',
        name: 'Linux',
        req: 'Probado en Ubuntu 20.04 y 24.04, Debian 12 y 13, Fedora, Rocky Linux 8, openSUSE Leap y Arch',
        files: [
          { key: 'deb', label: 'Debian, Ubuntu, Mint' },
          { key: 'rpm', label: 'Fedora, Red Hat, Rocky, Alma, openSUSE' },
          { key: 'arch', label: 'Arch, Manjaro' },
          { key: 'appimage', label: 'AppImage, sin instalar' },
          { key: 'portable', label: 'Portable, para cualquier distribución' },
        ],
      },
    ],
    firstTime: {
      title: 'La primera vez',
      text: 'Los instaladores todavía no van firmados, y Windows y macOS avisan al abrirlos.',
      windows: 'En Windows: «Windows protegió su PC» › «Más información» › «Ejecutar de todos modos».',
      mac: 'En macOS: si no se abre, Ajustes del Sistema › Privacidad y seguridad › «Abrir igualmente».',
    },
    clinic: 'Para usarlo en la clínica, con varios puestos, tus datos y VERI*FACTU, te ayudamos con la puesta en marcha.',
    freeLink: 'Programa de gestión dental gratis: qué incluye y cómo elegirlo',
    contact: 'Hablemos',
  },
  faqTitle: 'Lo que suelen preguntar las clínicas',
  faq: [
    { q: '¿Necesito internet para trabajar?', a: 'No. VeodarDental funciona en los ordenadores de la clínica. La conexión solo hace falta para lo que sale fuera: los recordatorios, la cita online y el envío de facturas a la AEAT.' },
    { q: '¿Cumple VERI*FACTU?', a: 'Genera los registros de facturación encadenados con su huella, el código QR y el envío a la AEAT. Lo activamos con el certificado de tu clínica, primero en el entorno de pruebas de la AEAT.' },
    { q: '¿Puedo traer los datos de mi programa actual?', a: 'Sí. Primero hacemos un simulacro con una exportación de tu programa y comparamos recuentos y totales. Solo cuando cuadra se hace el cambio.' },
    { q: '¿Cuántos ordenadores pueden usarlo a la vez?', a: 'Hasta 15 puestos por clínica, con un servidor en uno de los ordenadores de la clínica. Si tenéis varios centros, cada uno con su servidor y las cifras del grupo juntas.' },
    { q: '¿En qué ordenadores funciona?', a: 'En Windows 10 y 11, en macOS 11 o posterior (con chip de Apple o con Intel) y en Linux: Debian, Ubuntu, Fedora, Red Hat y sus derivadas, openSUSE y Arch. Antes de instalarlo en la clínica, lo probamos en vuestros equipos.' },
    { q: '¿Puedo probarlo antes?', a: 'Sí. Descárgalo en esta página: se abre con una clínica de ejemplo inventada para que lo pruebes sin miedo. Cuando empieces con la clínica de verdad, los datos de ejemplo se quitan.' },
    { q: '¿Qué aparatos de rayos se pueden conectar?', a: 'Radiovisiógrafos, ortopantomógrafos, TAC, cámaras y escáneres intraorales, de cuatro maneras: abriendo el programa del fabricante con el paciente ya puesto (por parámetros o con un fichero puente), trayendo a la ficha lo que deja en su carpeta, por DICOM en red con los aparatos que lo admiten (les da la lista de citados y recibe sus imágenes) y, para un sensor o un escáner sin programa propio, capturando por TWAIN con NAPS2. Antes de instalarlo comprobamos cómo se conecta cada aparato de tu clínica.' },
    { q: '¿Sustituye al visor de mi TAC?', a: 'No. El TAC se sigue viendo, midiendo y planificando con el programa de su fabricante, que se abre desde la ficha con un botón. El visor de VeodarDental es para echar un vistazo en la consulta: abre los estudios DICOM, también comprimidos en JPEG, JPEG 2000 o RLE; los de JPEG-LS los deja para el visor del fabricante.' },
    { q: '¿Cuánto cuesta?', a: 'El programa es gratuito: se descarga y se usa sin licencia, sin pagar por puesto ni por paciente. Lo que se paga, si lo quieres, es nuestro trabajo: la instalación, el paso desde tu programa actual, el servidor y el soporte. Te lo damos por escrito después de la demostración, con lo que entra y lo que no.' },
  ],
  ctaTitle: '¿Lo vemos con tu agenda de esta semana?',
  ctaText: 'Te enseñamos VeodarDental con datos parecidos a los de tu clínica y te decimos qué haría falta para cambiarte.',
  promo: {
    kicker: 'Nuestro producto para clínicas dentales',
    title: 'VeodarDental: toda la clínica en un programa.',
    text: 'Agenda, odontograma, periodontograma, presupuestos, cobros, facturas VERI*FACTU y recordatorios por WhatsApp. Funciona en los ordenadores de la clínica, también sin internet.',
    link: 'Conocer VeodarDental',
    caseKicker: 'Hecho en casa',
    caseTitle: 'VeodarDental, nuestro programa de gestión dental.',
    caseText: 'Un programa de escritorio en Rust para clínicas dentales: varios puestos con un servidor en la clínica, sin depender de internet y con un diario que no pierde nada aunque se vaya la luz.',
    caseLink: 'Ver VeodarDental',
    points: ['Gratuito', 'Agenda y odontograma', 'VERI*FACTU', 'Sin internet'],
  },
  shotAlt: {
    inicio: 'Pantalla de inicio de VeodarDental con las citas de hoy, la sala de espera, lo cobrado y los avisos',
    agenda: 'Agenda de VeodarDental por profesional, con citas pedidas por internet para confirmar',
    odontograma: 'Odontograma de un paciente en VeodarDental, con las herramientas de tratamiento',
    'odontograma-radiografia': 'Odontograma de VeodarDental en vista de radiografía, con fondo oscuro',
    periodontograma: 'Periodontograma de VeodarDental con sondaje, sangrado, placa y comparación con el anterior',
    presupuestos: 'Libro de presupuestos de VeodarDental con pendientes, aceptados y tasa de aceptación',
    facturas: 'Facturas de VeodarDental con la serie correlativa y la huella de cada registro',
    comunicaciones: 'Comunicaciones de VeodarDental: recordatorios por WhatsApp, SMS y correo pendientes de enviar',
    equipos: 'Pantalla Imágenes y enlaces de VeodarDental con el radiovisiógrafo, el ortopantomógrafo, el TAC y la cámara intraoral configurados',
    'ficha-imagenes': 'Pestaña Imágenes de un paciente en VeodarDental, con un botón para capturar con cada aparato, su galería y una periapical',
    tac: 'Estudio de TAC de ejemplo en el visor de VeodarDental, en vista axial con su orientación y su escala en milímetros',
    'comparar-radiografias': 'Dos periapicales del mismo paciente comparadas lado a lado en VeodarDental, con los días entre una y otra',
    'ia-radiografia': 'Análisis con IA de una panorámica en VeodarDental: hallazgos por pieza en borrador, pendientes de la revisión de un profesional',
    'ficha-resumen': 'Resumen de la ficha de un paciente en VeodarDental, con lo realizado, lo cobrado, lo previsto y sus próximas citas',
    'ficha-filiacion': 'Pestaña Filiación de un paciente en VeodarDental, con datos personales, tarifa y domiciliación bancaria',
    'ficha-salud': 'Cuestionario de salud de un paciente en VeodarDental, con su fecha y su estado',
    'ficha-historial': 'Historial de tratamientos de un paciente en VeodarDental, pieza a pieza, con doctor, fecha e importe',
    'ficha-documentos': 'Consentimiento informado de extracción en VeodarDental, firmado por el paciente en la pantalla',
    'ficha-presupuestos': 'Presupuestos de un paciente en VeodarDental, con su estado, su validez y su importe',
    'ficha-cuenta': 'Cuenta de un paciente en VeodarDental, con cargos, cobros y saldo',
    cobros: 'Hoja de cobros de VeodarDental con cada cobro, su forma de pago y quién lo cobró',
    verifactu: 'Pantalla VERI*FACTU de VeodarDental con los registros pendientes de enviar a la AEAT',
    caja: 'Caja de VeodarDental con los movimientos del día y el arqueo del efectivo, billete a billete',
    gastos: 'Gastos de VeodarDental por categoría y proveedor, con lo pendiente de pago y el resultado',
    bancos: 'Bancos en VeodarDental: extracto importado y conciliación con cobros y gastos',
    recalls: 'Lista de recalls de VeodarDental con las revisiones vencidas y próximas',
    listin: 'Listín telefónico de VeodarDental con contactos, colaboradores, laboratorios y proveedores',
    almacen: 'Almacén de VeodarDental con productos, stock, lotes que caducan y pedidos',
    laboratorio: 'Trabajos de laboratorio en VeodarDental con su fecha de entrega y los retrasados',
    ortodoncia: 'Casos de ortodoncia en VeodarDental con su aparato, sus controles y su avance',
    tarifas: 'Tarifas y tratamientos de VeodarDental: el catálogo con su precio en cada tarifa o mutua',
    colaboradores: 'Colaboradores de VeodarDental con su especialidad, su horario de consulta y su producción',
    informes: 'Informes de VeodarDental: resumen económico entre dos fechas',
    configuracion: 'Configuración de VeodarDental con los datos de la clínica y su horario',
    modulos: 'Más módulos de VeodarDental: las integraciones y dónde se configura cada una',
    pizarra: 'Pizarra de la sala de espera de VeodarDental: a quién le toca y en qué gabinete, con las iniciales',
    entrada: 'Pantalla de entrada de VeodarDental con los usuarios de la clínica y el teclado del PIN',
  },
};

const en: VdText = {
  title: 'VeodarDental: Dental Practice Management Software',
  description:
    'Free dental practice software: scheduling, odontogram, periodontal chart, treatment plans, payments, VERI*FACTU invoices and WhatsApp reminders. Works offline.',
  crumb: 'VeodarDental',
  kicker: 'A Veodar product · Dental clinics',
  h1: ['Your whole dental clinic in ', 'one', ' program.'],
  lead: 'VeodarDental runs the schedule, the clinical record with odontogram and periodontal chart, treatment plans, payments, VERI*FACTU invoices and patient reminders. It works on the clinic’s own computers, offline too, and it is built in Rust to be fast and to lose no data even if the power goes out halfway through a save.',
  cta: 'Ask for a demo',
  ctaDownload: 'Download',
  chips: ['Free', 'Schedule by practitioner', 'Odontogram', 'Periodontal chart', 'VERI*FACTU', 'WhatsApp and SMS', 'GDPR'],
  archTitle: 'VeodarDental odontogram',
  archLegend: { planned: 'Planned', done: 'Done', prior: 'Existing' },
  archNotes: [
    { tooth: '16', what: 'Filling OD', state: 'done' },
    { tooth: '21', what: 'Crown', state: 'prior' },
    { tooth: '26', what: 'Implant', state: 'planned' },
    { tooth: '36', what: 'Filling O', state: 'planned' },
  ],
  shotNote: 'Screenshots of the program with its invented demo data. The interface is shown in Spanish.',
  facts: [
    { title: 'Offline', text: 'It runs on your computers. The network is only needed for what goes out.' },
    { title: 'Several workstations', text: 'Up to 15 computers with a server in the clinic itself.' },
    { title: 'Encrypted data', text: 'Data, journal and backups encrypted, with an automatic daily backup.' },
    { title: 'Five languages', text: 'Spanish, Catalan, Basque, Galician and English.' },
  ],
  tour: {
    kicker: 'Inside the program',
    title: 'What you see every day, plainly.',
    text: 'Every screen fits a 1280-pixel laptop and has a tablet mode with finger-sized buttons.',
    tabs: [
      {
        shot: 'inicio',
        tab: 'Home',
        title: 'The day at a glance',
        text: 'When you open the program: today’s appointments, who is in the waiting room, what has been collected and what is owed.',
        points: ['Alerts that need attention: stock below minimum, late lab work, plans awaiting acceptance', 'Staff clock-in and clock-out'],
      },
      {
        shot: 'agenda',
        tab: 'Schedule',
        title: 'Schedule by practitioner and surgery',
        text: 'Day or week, each dentist in their own column, with their hours, lunch breaks and holidays.',
        points: ['Online booking requests arrive ready to confirm', 'Waiting room, in surgery and finished, at a glance'],
      },
      {
        shot: 'odontograma',
        tab: 'Odontogram',
        title: 'An odontogram that reads at once',
        text: 'Each tooth with what is planned, done and existing, by surface, with its dentist and its fee.',
        points: ['Light or X-ray view', 'Primary dentition'],
      },
      {
        shot: 'periodontograma',
        tab: 'Periodontal chart',
        title: 'A periodontal chart with its history',
        text: 'Probing depth, bleeding, plaque, recession, furcation and mobility, compared with the previous exam.',
        points: ['It can be dictated, with each value shown before it is saved', 'Plaque and bleeding indices worked out for you'],
      },
      {
        shot: 'presupuestos',
        tab: 'Treatment plans',
        title: 'Treatment plans you can follow up',
        text: 'Pending, accepted, rejected and expired, with the amount at stake and the acceptance rate.',
        points: ['Phased plans and alternatives', 'The patient signs from their phone'],
      },
      {
        shot: 'facturas',
        tab: 'Invoices',
        title: 'Invoices ready for VERI*FACTU',
        text: 'A sequential series per year, each invoice chained to the previous one with its SHA-256 hash and its QR code.',
        points: ['Corrective invoices and cancellations inside the chain', 'One button checks the integrity of the record'],
      },
      {
        shot: 'comunicaciones',
        tab: 'Messages',
        title: 'Reminders that go out on their own',
        text: 'Appointments, check-ups, birthdays and treatment plans by WhatsApp, SMS or email, as each patient prefers.',
        points: ['Only to patients who have given consent', 'No health data in the messages'],
      },
    ],
  },
  gallery: {
    kicker: 'Every screen',
    title: 'The whole program, screen by screen.',
    text: 'Almost all of VeodarDental as it looks today, with its demo data, sorted by area. Click a screenshot to see it large and move to the next one with the arrows.',
    open: 'Enlarge',
    close: 'Close',
    prev: 'Previous',
    next: 'Next',
    jump: 'Areas of the program',
    groups: [
      {
        id: 'recepcion',
        title: 'Front desk',
        text: 'What the person at the desk and on the phone keeps open.',
        screens: [
          { shot: 'inicio', title: 'Home', text: 'Today’s appointments, the waiting room, payments collected, what is owed and the day’s alerts.' },
          { shot: 'agenda', title: 'Schedule', text: 'Each practitioner in their column; online booking requests wait at the side to be confirmed.' },
          { shot: 'pizarra', title: 'Waiting room board', text: 'For the waiting room screen: whose turn it is and in which surgery, with initials only if you prefer.' },
          { shot: 'recalls', title: 'Recalls', text: 'The check-ups that are due, overdue or coming up, with the phone number at hand to call.' },
          { shot: 'listin', title: 'Phone book', text: 'Contacts, staff, labs and suppliers in one phone book, with the latest calls.' },
          { shot: 'entrada', title: 'Sign-in', text: 'Each person signs in with their user and PIN, and the program locks itself after a while unused.' },
        ],
      },
      {
        id: 'ficha',
        title: 'Patient record',
        text: 'Everything about a patient in tabs, with their clinical alerts always on top.',
        screens: [
          { shot: 'ficha-resumen', title: 'Summary', text: 'What has been done, collected and planned, contact details and upcoming appointments.' },
          { shot: 'ficha-filiacion', title: 'Personal details', text: 'Personal and administrative details, price list or insurer, direct debit and who pays.' },
          { shot: 'ficha-salud', title: 'Health', text: 'The health questionnaire with its date and status; the patient can fill it in from their appointment link.' },
          { shot: 'ficha-historial', title: 'History', text: 'What has been done and what is planned, tooth by tooth, with practitioner, date and amount.' },
          { shot: 'ficha-documentos', title: 'Documents and consent', text: 'Consent forms with the text of each treatment, signed by the patient on the screen.' },
          { shot: 'ficha-presupuestos', title: 'The patient’s plans', text: 'Their treatment plans, with status, validity and amount.' },
          { shot: 'ficha-cuenta', title: 'Account', text: 'Charges and payments with the balance, to collect or refund from the same tab.' },
        ],
      },
      {
        id: 'clinica',
        title: 'Clinical',
        text: 'The tools of the surgery.',
        screens: [
          { shot: 'odontograma', title: 'Odontogram', text: 'What is planned, done and prior on each tooth, by surface, with practitioner and price list.' },
          { shot: 'odontograma-radiografia', title: 'Odontogram in X-ray view', text: 'The same mouth on a dark background, as it looks on an X-ray.' },
          { shot: 'periodontograma', title: 'Periodontal chart', text: 'Probing, bleeding, plaque, recession, furcation and mobility, compared with the previous exam.' },
          { shot: 'ortodoncia', title: 'Orthodontics', text: 'Active cases with their appliance, their check-ups and the treatment left.' },
          { shot: 'laboratorio', title: 'Laboratory', text: 'Work sent to the lab with its delivery date and the late ones in sight.' },
        ],
      },
      {
        id: 'imagen',
        title: 'Imaging',
        text: 'X-rays, CT and photos, with each device’s own program.',
        screens: [
          { shot: 'equipos', title: 'Images and links', text: 'Each device in the clinic with its program and its folder, set up once.' },
          { shot: 'ficha-imagenes', title: 'The patient’s images', text: 'A button to capture with each device and their gallery, with the X-ray open.' },
          { shot: 'tac', title: 'CT', text: 'An example study in the program’s viewer, in axial view with its scale.' },
          { shot: 'comparar-radiografias', title: 'Compare X-rays', text: 'Two images of the same patient side by side, with the days between them.' },
          { shot: 'ia-radiografia', title: 'X-ray AI', text: 'Findings proposed per tooth, as a draft until a dentist reviews them.' },
        ],
      },
      {
        id: 'cuentas',
        title: 'Accounts',
        text: 'From the treatment plan to the bank.',
        screens: [
          { shot: 'presupuestos', title: 'Treatment plans', text: 'Pending, accepted, rejected and expired, with the acceptance rate.' },
          { shot: 'cobros', title: 'Payments', text: 'Each payment with its method; SEPA direct debits and online payments in their own tabs.' },
          { shot: 'facturas', title: 'Invoices', text: 'A sequential series per year, each invoice chained to the previous one by its hash.' },
          { shot: 'verifactu', title: 'VERI*FACTU', text: 'The records waiting to be sent to the AEAT, the accepted ones and the rejected ones.' },
          { shot: 'caja', title: 'Cash desk', text: 'The day’s movements and the cash count, note by note.' },
          { shot: 'gastos', title: 'Expenses', text: 'Expenses by category and supplier, with what is unpaid and the result for the period.' },
          { shot: 'bancos', title: 'Banks', text: 'The bank statement, in Norma 43 or Excel, matched against payments and expenses.' },
        ],
      },
      {
        id: 'gestion',
        title: 'Management',
        text: 'What the clinic’s management looks after.',
        screens: [
          { shot: 'comunicaciones', title: 'Messages', text: 'Reminders by WhatsApp, SMS or email, only to those who have given consent.' },
          { shot: 'almacen', title: 'Stock', text: 'Products with their stock, batches about to expire and orders to suppliers.' },
          { shot: 'tarifas', title: 'Price lists and treatments', text: 'The treatment catalog with its price in each price list or insurer.' },
          { shot: 'colaboradores', title: 'Staff', text: 'Dentists, hygienists and staff, with their surgery hours and their production.' },
          { shot: 'informes', title: 'Reports', text: 'Day book, production, income, new patients and financial summary, between the dates you choose.' },
          { shot: 'configuracion', title: 'Settings', text: 'Clinic details, surgeries, users and permissions, online booking, backups and network use.' },
          { shot: 'modulos', title: 'More modules', text: 'The integrations (imaging, WhatsApp, e-prescription, banks…) and where each one is set up.' },
        ],
      },
    ],
  },
  clinic: {
    kicker: 'Clinical',
    title: 'Clinical work, handled with the care it needs.',
    text: 'Each patient’s history in one record: what they have, what has been done and what to keep in mind before they sit in the chair.',
    features: [
      { title: 'Clinical alerts with their source', text: 'Allergies, anticoagulants or a heart condition raise an alert before you start, with the source cited. The practitioner records that they have reviewed it.' },
      { title: 'X-rays, CT scans and 3D models', text: 'Periapicals, panoramics, DICOM and CBCT studies and STL models in the patient’s record, compared across dates.' },
      { title: 'AI on X-rays, as a draft', text: 'It suggests findings on an X-ray, but nothing enters the record without a dentist’s review. Only the image goes to the AI, without the name.' },
      { title: 'Notes, prescriptions and consent', text: 'Progress notes from templates or dictated. Prescriptions with a drug database and allergy and anticoagulant warnings. Consent forms signed on a tablet.' },
      { title: 'Implants and sterilisation traced', text: 'Each implant, from the order’s batch to the patient. Each sterilised pouch, from the validated cycle to the patient it was used on.' },
      { title: 'Orthodontics and the lab', text: 'Orthodontic check-ups with their instalments. Lab orders with their attachments, without the patient’s name by default.' },
    ],
  },
  imaging: {
    kicker: 'X-rays and imaging',
    title: 'Your X-ray equipment, connected to the record.',
    text: 'Each device keeps its maker’s program, which takes the images and shows them in its professional viewer. VeodarDental opens it from the record with the patient already selected and gathers what it captures in their gallery, sorted by type and date.',
    flow: {
      label: 'How an imaging device connects',
      steps: [
        { title: 'One button in the record', text: '“Capture with” shows a button for each device in the clinic.' },
        { title: 'The patient, already set', text: 'VeodarDental writes their details to the IMCONECT.ini bridge file and opens the device’s program with its parameters.' },
        { title: 'The device captures', text: 'With its maker’s own program, which saves the images in the patient’s folder.' },
        { title: 'Into their gallery', text: 'What the device saves goes into their record by itself, sorted: periapicals, panoramics, CT scans, photos and 3D models. Anything doubtful waits for someone to confirm it.' },
      ],
      capture: 'Capture with',
      devices: ['Sensor', 'Panoramic', 'CBCT', 'Camera', 'Scanner'],
      program: 'Device program',
      folder: 'Patient folder',
      importLabel: 'Import',
      kinds: ['Periapical', 'Panoramic', '3D CT', 'Intraoral photo', '3D scan'],
    },
    roles: {
      title: 'Each device, with its own program.',
      text: 'Every clinic has its CBCT, its panoramic unit, its sensors and its camera, each with its maker’s program: Carestream, Acteon AIS, Planmeca, Dentsply Sirona or another. VeodarDental does not replace it: it works with it.',
      device: {
        title: 'What the device’s program does',
        points: ['The captures: X-rays, CT scans and photos', 'Its professional viewer: measurements, reconstructions and implant planning', 'Storing the studies its own way'],
      },
      veodar: {
        title: 'What VeodarDental does',
        points: [
          'Open that program from the record, with the patient already set',
          'Gather what it captures in the record, with its date and teeth',
          'Reopen a study in the maker’s viewer with one button',
          'With devices that speak DICOM over the network, give them the list of booked patients and receive their images',
          'A quick viewer for the surgery: X-rays, CT in three planes and 3D models',
        ],
      },
    },
    devicesTitle: 'The devices that connect',
    devices: [
      { title: 'Intraoral sensor (RVG)', text: 'Periapicals and bitewings, with the teeth they belong to.' },
      { title: 'Panoramic unit', text: 'Panoramic and cephalometric X-rays.' },
      { title: 'CT / CBCT', text: 'DICOM studies in axial, coronal and sagittal views. Over the DICOM network, the scanner gets the list of booked patients.' },
      { title: 'Intraoral camera', text: 'Photos for the treatment plan and to show the patient.' },
      { title: 'Intraoral scanner', text: '3D models in STL, PLY or OBJ that you can turn and measure in millimeters.' },
    ],
    vendors: 'It comes with templates for the programs of Carestream, Acteon, Planmeca, Dentsply Sirona, Dexis and MyRay, and any other is added with its path, parameters and bridge file. It speaks DICOM over the network with devices that support it, and a sensor or scanner without its own program captures through TWAIN with NAPS2, a free program. At installation it is adjusted to your clinic’s devices and tested with them.',
    tabsLabel: 'X-rays and imaging, screen by screen',
    tabs: [
      {
        shot: 'equipos',
        tab: 'Devices',
        title: 'Each device, set up once',
        text: 'Under “Images and links” each device has its program, its parameters and the folder where it saves the images. If it is not installed on that computer, it says so.',
        points: ['Placeholders for the patient’s details: record number, name, ID, date of birth', 'A log of every launch, with its result'],
      },
      {
        shot: 'ficha-imagenes',
        tab: 'In the record',
        title: 'Capture without leaving the patient',
        text: 'In each patient’s Images tab: a button per device, their gallery by type and a viewer with zoom, brightness, contrast, negative and rotation.',
        points: ['What the device saves in the patient’s folder goes into their record by itself', 'Each image with its date, its teeth and the device it came from'],
      },
      {
        shot: 'tac',
        tab: 'CBCT',
        title: 'A look at the CT scan without leaving the record',
        text: 'To show it in the surgery or check which study it is: axial, coronal or sagittal view, at true proportions, with a millimeter scale and the orientation on the edges. For planning, “Open in 3D viewer” opens it in the maker’s program.',
        points: ['It shows the patient and date the file itself carries, to check it is their study', 'The scanner’s professional viewer, one button away, with the patient already set'],
      },
      {
        shot: 'comparar-radiografias',
        tab: 'Compare',
        title: 'Before and after, side by side',
        text: 'Two X-rays of the same patient, the older one on the left, with their dates, their teeth and the days between them.',
        points: ['The same zoom and rotation on both', 'It only compares images of the same patient'],
      },
      {
        shot: 'ia-radiografia',
        tab: 'AI',
        title: 'A second look, as a draft',
        text: 'If the clinic switches it on, the AI suggests findings per tooth on an X-ray, with their severity and confidence. Nothing enters the record without a practitioner’s review.',
        points: ['Only the image goes to the AI, without the patient’s name', 'It records which model answered and who asked'],
      },
    ],
    views: {
      title: 'A CT scan in its three planes',
      text: 'An invented example study in VeodarDental’s quick viewer: the implant at 46 and the gap at 36 in all three planes. Measuring and planning are done in the scanner maker’s viewer, which opens from the record.',
      labels: ['Axial', 'Coronal', 'Sagittal'],
      alt: '{view} slice of an example dental CT scan in the VeodarDental viewer',
    },
  },
  desk: {
    kicker: 'Front desk',
    title: 'Less time on the phone at the front desk.',
    text: 'What is done by phone today, the program does by message, and the answer lands on the schedule by itself.',
    features: [
      { title: 'Online booking', text: 'With the real gaps in the schedule, by practitioner and by reason.' },
      { title: 'Confirm without calling', text: 'Every reminder carries a link to confirm, change or cancel the appointment.' },
      { title: 'Waiting list', text: 'A slot that frees up is offered to the waiting list, and the first to answer gets it.' },
      { title: 'The patient’s own space', text: 'Their appointments, plans, invoices and documents, with their ID and date of birth.' },
    ],
    chat: {
      clinic: 'Your clinic',
      reminder: 'Hi Ana, a reminder of your appointment on Monday the 16th at 9:30 with Dr Ruiz. Will you be able to come?',
      reply: 'Yes, I’ll be there',
      confirmed: 'Appointment confirmed on the schedule',
      agenda: 'Schedule · Monday 16',
      planned: 'Planned',
      done: 'Confirmed',
      time: '10:02',
      replyTime: '10:05',
    },
  },
  money: {
    kicker: 'Accounts',
    title: 'The accounts, to the cent.',
    text: 'From the treatment plan to the invoice and from the payment to the bank, with every amount worked out in exact cents.',
    features: [
      { title: 'Plans, instalments and financing', text: 'Instalments add up exactly to the total. Financing with a lender, with every instalment tracked.' },
      { title: 'Payments and the till', text: 'A daily till with the cash you should have, card terminal payments and online payment through your bank’s gateway.' },
      { title: 'Insurers and SEPA', text: 'Authorisations and claims to insurers, SEPA direct debits and reconciliation with the bank statement.' },
      { title: 'Reports with their formulas', text: 'Production, payments, debts and a dashboard that says how each figure is worked out.' },
    ],
    chain: { invoice: 'Invoice', hash: 'Hash', prev: 'Previous hash', ok: 'Integrity of the record: correct', first: 'First of the series' },
  },
  trust: {
    kicker: 'Security',
    title: 'Your data, in your clinic.',
    text: 'Health data is a special category of personal data, and the program is designed with that in mind.',
    features: [
      { title: 'On your computers', text: 'One computer is enough. With several, a server in the clinic itself, or in the cloud with an EU provider if you prefer.' },
      { title: 'Nothing gets lost', text: 'Every change goes into a journal before it is saved: if the power goes out halfway, it is all there when it comes back.' },
      { title: 'Backups that are rehearsed', text: 'An automatic, encrypted daily backup, and a restore rehearsal that checks patients, balances and invoices.' },
      { title: 'Who saw what', text: 'Every access to a record is logged, and permissions by role are checked on the server: the front desk does not see clinical data.' },
      { title: 'Patient rights', text: 'Full export of their record, restriction and blocking, with every request logged.' },
      { title: 'Working-time record', text: 'The team clocks in from the program, and every correction is traceable.' },
    ],
  },
  move: {
    kicker: 'Switching',
    title: 'Switch without fear.',
    text: 'We bring your patients, appointments, treatments, balances and documents from your current program, in this order:',
    steps: [
      { title: 'Export', text: 'Your current program exports the data. We tell you what is needed.' },
      { title: 'Rehearsal', text: 'We import it separately and compare counts and totals, balances included, with the source program.' },
      { title: 'Review', text: 'You go through the rehearsal with your team and settle the doubtful cases, such as two records with the same ID.' },
      { title: 'Switch', text: 'On the chosen day, with a backup of everything first and the demo data removed.' },
    ],
  },
  built: {
    kicker: 'Built by Veodar',
    title: 'Fast because it is built in Rust.',
    text: 'VeodarDental is a real desktop program, not a website in a window. We build it ourselves, with the same tools we use for custom desktop apps.',
    features: [
      { title: 'Fast with thousands of patients', text: 'In our measurements with a test clinic of 8,000 patients, saving a change takes between 0.02 and 0.15 seconds.' },
      { title: 'Several sites', text: 'A group of clinics sees its figures together, and each user works only in the sites assigned to them.' },
      { title: 'Coordinated updates', text: 'Every workstation updates at the same time, with a way back if something is wrong.' },
    ],
    service: 'Custom desktop apps',
    rust: 'Rust development',
  },
  download: {
    kicker: 'Download',
    title: 'Try it on your computer.',
    text: 'It is free, with no license and no per-workstation charge. It installs in a moment and opens with an example clinic, with invented patients, appointments and invoices: sign in as Dirección (management) with the initial password 0000, which it will ask you to change.',
    version: 'Version',
    notes: 'Release notes and earlier versions, on GitHub',
    yours: 'Your system',
    systems: [
      {
        id: 'windows',
        name: 'Windows',
        req: 'Windows 10 and 11, 64-bit',
        files: [
          { key: 'exe', label: 'Installer' },
          { key: 'msi', label: 'For installing on several computers' },
        ],
      },
      {
        id: 'macos',
        name: 'macOS',
        req: 'macOS 11 or later',
        files: [
          { key: 'dmg-arm', label: 'Mac with Apple silicon' },
          { key: 'dmg-intel', label: 'Mac with Intel' },
        ],
      },
      {
        id: 'linux',
        name: 'Linux',
        req: 'Tested on Ubuntu 20.04 and 24.04, Debian 12 and 13, Fedora, Rocky Linux 8, openSUSE Leap and Arch',
        files: [
          { key: 'deb', label: 'Debian, Ubuntu, Mint' },
          { key: 'rpm', label: 'Fedora, Red Hat, Rocky, Alma, openSUSE' },
          { key: 'arch', label: 'Arch, Manjaro' },
          { key: 'appimage', label: 'AppImage, no install' },
          { key: 'portable', label: 'Portable, for any distribution' },
        ],
      },
    ],
    firstTime: {
      title: 'The first time',
      text: 'The installers are not signed yet, so Windows and macOS warn you when you open them.',
      windows: 'On Windows: “Windows protected your PC” › “More info” › “Run anyway”.',
      mac: 'On macOS: if it does not open, System Settings › Privacy & Security › “Open Anyway”.',
    },
    clinic: 'To use it in your clinic, with several workstations, your data and VERI*FACTU, we help you set it up.',
    freeLink: 'Free dental software: what it includes and how to choose',
    contact: 'Let’s talk',
  },
  faqTitle: 'What clinics usually ask',
  faq: [
    { q: 'Do I need the internet to work?', a: 'No. VeodarDental runs on the clinic’s computers. A connection is only needed for what goes out: reminders, online booking and sending invoices to the Spanish tax agency.' },
    { q: 'Does it comply with VERI*FACTU?', a: 'It creates the chained billing records with their hash, the QR code and the submission to the Spanish tax agency. We switch it on with your clinic’s certificate, first in the agency’s test environment.' },
    { q: 'Can I bring the data from my current program?', a: 'Yes. First we run a rehearsal with an export from your program and compare counts and totals. Only when they match do we switch.' },
    { q: 'How many computers can use it at once?', a: 'Up to 15 workstations per clinic, with a server on one of the clinic’s computers. With several sites, each has its own server and the group’s figures come together.' },
    { q: 'Which computers does it run on?', a: 'Windows 10 and 11, macOS 11 or later (with Apple silicon or Intel) and Linux: Debian, Ubuntu, Fedora, Red Hat and its derivatives, openSUSE and Arch. Before installing it in the clinic, we test it on your computers.' },
    { q: 'Can I try it first?', a: 'Yes. Download it from this page: it opens with an invented example clinic so you can try it without worry. When you start with your real clinic, the example data is removed.' },
    { q: 'Which X-ray devices can be connected?', a: 'Intraoral sensors, panoramic units, CT scanners, intraoral cameras and scanners, in four ways: opening the maker’s program with the patient already set (through parameters or a bridge file), bringing into the record what it saves in its folder, over the DICOM network with devices that support it (they get the list of booked patients and send their images) and, for a sensor or scanner without its own program, capturing through TWAIN with NAPS2. Before installing, we check how each of your clinic’s devices connects.' },
    { q: 'Does it replace my CT scanner’s viewer?', a: 'No. The CT scan is still viewed, measured and planned in its maker’s program, which opens from the record with one button. VeodarDental’s viewer is for a quick look in the surgery: it opens DICOM studies, compressed ones too (JPEG, JPEG 2000 or RLE); JPEG-LS studies are left to the maker’s viewer.' },
    { q: 'How much does it cost?', a: 'The program is free: you download it and use it with no license and no charge per workstation or patient. What you pay for, if you want it, is our work: installation, moving from your current program, the server and support. We put it in writing after the demo, with what is included and what is not.' },
  ],
  ctaTitle: 'Shall we look at it with this week’s schedule?',
  ctaText: 'We show you VeodarDental with data similar to your clinic’s and tell you what switching would take.',
  promo: {
    kicker: 'Our product for dental clinics',
    title: 'VeodarDental: the whole clinic in one program.',
    text: 'Scheduling, odontogram, periodontal chart, treatment plans, payments, VERI*FACTU invoices and WhatsApp reminders. It runs on the clinic’s computers, offline too.',
    link: 'Discover VeodarDental',
    caseKicker: 'Built in-house',
    caseTitle: 'VeodarDental, our dental practice management program.',
    caseText: 'A Rust desktop program for dental clinics: several workstations with a server in the clinic, no dependence on the internet and a journal that loses nothing even if the power goes out.',
    caseLink: 'See VeodarDental',
    points: ['Free', 'Schedule and odontogram', 'VERI*FACTU', 'Offline'],
  },
  shotAlt: {
    inicio: 'VeodarDental home screen with today’s appointments, the waiting room, payments collected and alerts',
    agenda: 'VeodarDental schedule by practitioner, with online booking requests to confirm',
    odontograma: 'A patient’s odontogram in VeodarDental, with the treatment tools',
    'odontograma-radiografia': 'VeodarDental odontogram in X-ray view, on a dark background',
    periodontograma: 'VeodarDental periodontal chart with probing, bleeding, plaque and comparison with the previous exam',
    presupuestos: 'VeodarDental treatment plan book with pending and accepted plans and the acceptance rate',
    facturas: 'VeodarDental invoices with the sequential series and the hash of each record',
    comunicaciones: 'VeodarDental messages: WhatsApp, SMS and email reminders waiting to be sent',
    equipos: 'The VeodarDental Images and links screen with the intraoral sensor, panoramic unit, CT scanner and intraoral camera set up',
    'ficha-imagenes': 'A patient’s Images tab in VeodarDental, with a button to capture with each device, their gallery and a periapical',
    tac: 'An example CT study in the VeodarDental viewer, in axial view with its orientation and millimeter scale',
    'comparar-radiografias': 'Two periapicals of the same patient compared side by side in VeodarDental, with the days between them',
    'ia-radiografia': 'AI analysis of a panoramic X-ray in VeodarDental: findings per tooth as a draft awaiting a practitioner’s review',
    'ficha-resumen': 'Summary of a patient record in VeodarDental, with what has been done, collected and planned, and upcoming appointments',
    'ficha-filiacion': 'Personal details tab of a patient in VeodarDental, with price list and direct debit',
    'ficha-salud': 'A patient’s health questionnaire in VeodarDental, with its date and status',
    'ficha-historial': 'A patient’s treatment history in VeodarDental, tooth by tooth, with practitioner, date and amount',
    'ficha-documentos': 'Informed consent for an extraction in VeodarDental, signed by the patient on the screen',
    'ficha-presupuestos': 'A patient’s treatment plans in VeodarDental, with status, validity and amount',
    'ficha-cuenta': 'A patient’s account in VeodarDental, with charges, payments and balance',
    cobros: 'VeodarDental payments sheet with each payment, its method and who took it',
    verifactu: 'VeodarDental VERI*FACTU screen with the records waiting to be sent to the AEAT',
    caja: 'VeodarDental cash desk with the day’s movements and the cash count, note by note',
    gastos: 'VeodarDental expenses by category and supplier, with what is unpaid and the result',
    bancos: 'Banks in VeodarDental: an imported statement matched against payments and expenses',
    recalls: 'VeodarDental recall list with overdue and upcoming check-ups',
    listin: 'VeodarDental phone book with contacts, staff, labs and suppliers',
    almacen: 'VeodarDental stock with products, quantities, expiring batches and orders',
    laboratorio: 'Lab work in VeodarDental with its delivery date and the late jobs',
    ortodoncia: 'Orthodontic cases in VeodarDental with their appliance, check-ups and progress',
    tarifas: 'VeodarDental price lists and treatments: the catalog with its price in each list or insurer',
    colaboradores: 'VeodarDental staff with their speciality, surgery hours and production',
    informes: 'VeodarDental reports: financial summary between two dates',
    configuracion: 'VeodarDental settings with the clinic details and opening hours',
    modulos: 'VeodarDental more modules: the integrations and where each one is set up',
    pizarra: 'VeodarDental waiting room board: whose turn it is and in which surgery, with initials',
    entrada: 'VeodarDental sign-in screen with the clinic’s users and the PIN keypad',
  },
};

export const vdFor = (lang: Lang): VdText => (lang === 'en' ? en : es);
export const vdTexts = { es, en };
