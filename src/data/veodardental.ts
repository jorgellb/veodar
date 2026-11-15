// VeodarDental: Veodar's own management software for dental clinics. Its page lives
// under the healthcare sector (/sectores/salud/veodardental/) and is shown as a block on
// the healthcare page and as a case on the desktop apps service.
//
// The copy only says what the program does today. Anything that needs the clinic or a
// third party first (the AEAT with the clinic's certificate, a WhatsApp Business account,
// the bank's payment terminal) says so. No prices, clients, ratings or results: a test
// (tests/veodardental.test.js) checks it. The screenshots are of the program running with
// its invented demo data; phone numbers and ID numbers are blurred anyway.
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
  | 'ia-radiografia';

export type Feature = { title: string; text: string };

export type Tab = { shot: Shot; tab: string; title: string; text: string; points: string[] };

/** The installers of the published version, as the release workflow names them. */
export type DownloadKey = 'exe' | 'msi' | 'dmg-arm' | 'dmg-intel' | 'deb' | 'rpm' | 'arch' | 'appimage' | 'portable';

// The version the download links point to: a GitHub release of jorgellb/veodardental,
// published by its installers workflow when the version tag is pushed. Sizes are those
// of that version's files, rounded to the megabyte. A new version changes these lines.
export const VD_VERSION = '0.1.0';
export const VD_RELEASES = 'https://github.com/jorgellb/veodardental/releases';
export const vdDownloads: Record<DownloadKey, { file: string; mb: number }> = {
  exe: { file: `veodardental_${VD_VERSION}_x64-setup.exe`, mb: 13 },
  msi: { file: `veodardental_${VD_VERSION}_x64_en-US.msi`, mb: 18 },
  'dmg-arm': { file: `VeodarDental_${VD_VERSION}_aarch64.dmg`, mb: 17 },
  'dmg-intel': { file: `VeodarDental_${VD_VERSION}_x64.dmg`, mb: 18 },
  deb: { file: `veodardental_${VD_VERSION}_amd64.deb`, mb: 22 },
  rpm: { file: `veodardental-${VD_VERSION}-1.x86_64.rpm`, mb: 16 },
  arch: { file: `veodardental-${VD_VERSION}-1-x86_64.pkg.tar.zst`, mb: 20 },
  appimage: { file: `veodardental_${VD_VERSION}_x86_64.AppImage`, mb: 21 },
  portable: { file: `VeodarDental-${VD_VERSION}-linux-x86_64.tar.gz`, mb: 22 },
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
        { title: 'A su galería', text: '«Importar» las trae y las ordena: periapicales, panorámicas, TAC, fotos y modelos 3D.' },
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
          'Un visor rápido para la consulta: radiografías, TAC en tres planos y modelos 3D',
        ],
      },
    },
    devicesTitle: 'Los aparatos que se conectan',
    devices: [
      { title: 'Radiovisiógrafo (RVG)', text: 'Periapicales y aletas de mordida, con las piezas a las que corresponden.' },
      { title: 'Ortopantomógrafo', text: 'Panorámicas y telerradiografías.' },
      { title: 'TAC / CBCT', text: 'Estudios DICOM en vista axial, coronal y sagital.' },
      { title: 'Cámara intraoral', text: 'Fotos para el plan de tratamiento y para enseñárselas al paciente.' },
      { title: 'Escáner intraoral', text: 'Modelos 3D en STL que se giran y se miden en milímetros.' },
    ],
    vendors: 'Trae enlaces de partida para los programas de Carestream, Acteon, Planmeca y Dentsply Sirona, y cualquier otro se añade con su ruta y sus parámetros. En la instalación se ajustan a los aparatos de tu clínica y se prueban con ellos.',
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
        points: ['«Importar» recoge lo que el aparato ha dejado en la carpeta del paciente', 'Cada imagen con su fecha, sus piezas y el aparato del que viene'],
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
    text: 'Es gratuito, sin licencia ni límite de puestos. Se instala en un momento y se abre con una clínica de ejemplo, con pacientes, citas y facturas inventados: entra como Dirección con la contraseña inicial 0000, que te pedirá cambiar.',
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
    { q: '¿Qué aparatos de rayos se pueden conectar?', a: 'Los que se manejan con el programa de su fabricante: radiovisiógrafos, ortopantomógrafos, TAC, cámaras y escáneres intraorales. Ese programa sigue haciendo las tomas y enseñándolas con su visor; VeodarDental lo abre con el paciente ya puesto, por parámetros o con el fichero puente IMCONECT.ini, y recoge las imágenes que deja en su carpeta. Antes de instalarlo comprobamos cómo se conecta cada aparato de tu clínica.' },
    { q: '¿Sustituye al visor de mi TAC?', a: 'No. El TAC se sigue viendo, midiendo y planificando con el programa de su fabricante, que se abre desde la ficha con un botón. El visor de VeodarDental es para echar un vistazo en la consulta: abre los estudios DICOM sin comprimir, y si un TAC los guarda comprimidos (JPEG o JPEG 2000), los deja para el visor del fabricante.' },
    { q: '¿Cuánto cuesta?', a: 'El programa es gratuito: se descarga y se usa sin licencia, sin límite de puestos ni de pacientes. Lo que se paga, si lo quieres, es nuestro trabajo: la instalación, el paso desde tu programa actual, el servidor y el soporte. Te lo damos por escrito después de la demostración, con lo que entra y lo que no.' },
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
    points: ['Agenda y odontograma', 'VERI*FACTU', 'Sin internet'],
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
        { title: 'Into their gallery', text: '“Import” brings them in and sorts them: periapicals, panoramics, CT scans, photos and 3D models.' },
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
          'A quick viewer for the surgery: X-rays, CT in three planes and 3D models',
        ],
      },
    },
    devicesTitle: 'The devices that connect',
    devices: [
      { title: 'Intraoral sensor (RVG)', text: 'Periapicals and bitewings, with the teeth they belong to.' },
      { title: 'Panoramic unit', text: 'Panoramic and cephalometric X-rays.' },
      { title: 'CT / CBCT', text: 'DICOM studies in axial, coronal and sagittal views.' },
      { title: 'Intraoral camera', text: 'Photos for the treatment plan and to show the patient.' },
      { title: 'Intraoral scanner', text: '3D models in STL that you can turn and measure in millimeters.' },
    ],
    vendors: 'It comes with starting links for the programs of Carestream, Acteon, Planmeca and Dentsply Sirona, and any other is added with its path and parameters. At installation they are adjusted to your clinic’s devices and tested with them.',
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
        points: ['“Import” collects what the device left in the patient’s folder', 'Each image with its date, its teeth and the device it came from'],
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
    text: 'It is free, with no license and no limit on workstations. It installs in a moment and opens with an example clinic, with invented patients, appointments and invoices: sign in as Dirección (management) with the initial password 0000, which it will ask you to change.',
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
    { q: 'Which X-ray devices can be connected?', a: 'Those run by their maker’s program: intraoral sensors, panoramic units, CT scanners, intraoral cameras and scanners. That program still takes the images and shows them in its viewer; VeodarDental opens it with the patient already set, through parameters or the IMCONECT.ini bridge file, and collects the images it saves in their folder. Before installing, we check how each of your clinic’s devices connects.' },
    { q: 'Does it replace my CT scanner’s viewer?', a: 'No. The CT scan is still viewed, measured and planned in its maker’s program, which opens from the record with one button. VeodarDental’s viewer is for a quick look in the surgery: it opens uncompressed DICOM studies, and if a scanner stores them compressed (JPEG or JPEG 2000), it leaves them to the maker’s viewer.' },
    { q: 'How much does it cost?', a: 'The program is free: you download it and use it with no license and no limit on workstations or patients. What you pay for, if you want it, is our work: installation, moving from your current program, the server and support. We put it in writing after the demo, with what is included and what is not.' },
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
    points: ['Schedule and odontogram', 'VERI*FACTU', 'Offline'],
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
  },
};

export const vdFor = (lang: Lang): VdText => (lang === 'en' ? en : es);
export const vdTexts = { es, en };
