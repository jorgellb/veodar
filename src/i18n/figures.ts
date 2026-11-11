// English for the isometric figures. The SVGs are generated once in Spanish
// (iso/fig-*.mjs); on English pages their accessible label and the words drawn
// inside them are swapped from this table at render time.
import type { Lang } from './index';

type FigureText = { label: string; texts?: Record<string, string> };

const en: Record<string, FigureText> = {
  // ── Technology scenes ──
  cartridge: {
    label:
      'An assembly bench on a plate: at the back, a website made of three stacked modules; in front, its admin panel; on the right, a feature cartridge riding a rail toward a side connector. When it docks, the new block appears on the site and the panel shows it as active.',
    texts: { 'PLUGIN · A MEDIDA': 'CUSTOM · PLUGIN' },
  },
  pagepress: {
    label:
      'A page press on a plate: a tray with sheets of content, a bed each sheet travels along, a head that comes down to compose it and, at the far end, the stack of finished pages next to the screen that shows them. A side module lights up only when the page carries an interactive part.',
    texts: { 'CONTENIDO · HTML': 'CONTENT · HTML' },
  },
  instruments: {
    label:
      'An instrument desk on a plate: three screens in a row, filters, list and the detail of one record, wired to the same state hub. In front, a knurled wheel with three positions changes that state and the three screens update at once.',
    texts: { 'ESTADO · COMPARTIDO': 'SHARED · STATE' },
  },
  storeys: {
    label:
      'A terraced model on a plate: a technical base with the server and the database; above it, the public level with a storefront; and higher up, the private level, reached by stairs closed off by a gate with its reader. A riser runs from each level down to the base: the public request is served from the storefront and the private one does not pass the gate until the reader has checked the session.',
    texts: { 'SERVIDOR · DATOS': 'SERVER · DATA', PÚBLICO: 'PUBLIC', PRIVADO: 'PRIVATE' },
  },
  switchboard: {
    label:
      'A switchboard on a plate: a panel of jacks over a desk with three plugs, whose cords run to three systems: a database, a customer card file and a mail tray. The message line comes in from the left; in front, a tray holds the pending jobs. Each message is checked at the board and leaves on the cord of its system, or waits its turn in the tray.',
    texts: { 'MENSAJES · COLA': 'MESSAGES · QUEUE' },
  },
  tabulator: {
    label:
      'A data sorter on a plate: on the left, a pile of spreadsheets and a box of cards; both feed a belt that passes under a cleaning station, with a brush roller, and a matching station, with a reader. Repeated cards drop into a bin and the rest stack up as an ordered report next to a counter. A timer starts each run.',
    texts: { REGISTROS: 'RECORDS', DUPLICADOS: 'DUPLICATES', 'LIMPIAR · CRUZAR · ORDENAR': 'CLEAN · MATCH · SORT' },
  },
  archive: {
    label:
      'An archive and a core on a plate: on the left, a box of hanging folders; in the middle, a core with a glowing orb between two rings; on the right, a screen with the answer and its numbered references; in front, a console with a review push button. The query raises the folders it needs, the core prepares the answer citing those sources and a person lets it through with the button.',
    texts: { 'RESPUESTA · CON FUENTES': 'ANSWER · WITH SOURCES' },
  },
  chipslot: {
    label:
      'A web page laid out as a board: its header and text are printed on it, and on top sit a calculator, a three-field form and an empty socket. A small module drops into the socket and joins the two: the calculator works out the figure, the form flags the missing field and the result shows on a screen.',
    texts: { 'MÓDULO · JS': 'MODULE · JS' },
  },
  workbench: {
    label:
      "Veodar's workbench: four modules wait at the back, content, interface, connections and data, and in front there is a bed with four bays. Each project pulls forward the modules it needs and lights the links between the ones left side by side: sometimes two, sometimes three, sometimes all four.",
    texts: { CONTENIDO: 'CONTENT', INTERFAZ: 'INTERFACE', CONEXIONES: 'CONNECTIONS', DATOS: 'DATA', 'ENSAMBLAJE · POR PROYECTO': 'ASSEMBLY · PER PROJECT' },
  },
  // ── Mobile technology scenes ──
  twinbench: {
    label:
      'A twin-output bench on a plate: at the back, a console with its keyboard and, beside it, a monitor; in front, a bridge with two cables running to two docks, each with a standing phone and a small module of its own. What is typed at the console runs down to the bridge and reaches both phones at once, and they show the same screen with the controls of their system; the monitor shows the same logic on the web.',
    texts: { 'Parte 0142': 'Report 0142', 'UN CÓDIGO · DOS SISTEMAS': 'ONE CODE · TWO SYSTEMS' },
  },
  dispatch: {
    label:
      "A shipping dock on a plate: on the left, a build machine with a hopper the project goes into; a belt runs from it to a turntable that sends things two ways. One continues on another belt, passes under the review arch and ends on the store shelf, from which a phone lying on its dock installs it. The other runs down a direct cable to that same phone. In front, the team's test phone gets every build before anyone else.",
    texts: { PRUEBA: 'TEST', 'Mi app': 'My app', 'COMPILAR · PUBLICAR · ACTUALIZAR': 'BUILD · PUBLISH · UPDATE' },
  },
  fixture: {
    label:
      'A test bench on a plate: a phone lying in its cradle with three probes around it: a lens on an arm, which tries the camera; a coil with a tag, which tries NFC; and a ring on a foot, which reads a face. What the app saves travels along a cable to a tablet on its stand and to a watch on its charging puck. In front, a press seals the build before it is published.',
    texts: { 'Inspección 27': 'Inspection 27', 'CÁMARA · NFC · BIOMETRÍA': 'CAMERA · NFC · BIOMETRICS' },
  },
  composer: {
    label:
      'A screen composer on a plate: at the back, a case of loose pieces, a button, a switch, a row, and a state unit with a window and a slider; in front, an old one-piece plate with one block already replaced and a frame where the pieces make up a screen. On the right, a standing phone and a widget. Moving the slider changes the value and the pieces in the frame rearrange themselves; the phone and the widget show the same.',
    texts: { ESTADO: 'STATE', Pedidos: 'Orders', 'ESTADO · VISTA': 'STATE · VIEW' },
  },
  fleet: {
    label:
      'A device fleet station on a plate: at the back, a rack with a phone, a warehouse handheld with its scanner head and a tablet, each with its lamp; on the left, the console that hands them the version. In front, a box with two wheels under glass and a tray of jobs: the background mechanism, wired to a database. On the right, a scanner over a barcode and a printer with a label coming out.',
    texts: { 'PARQUE · SEGUNDO PLANO': 'FLEET · BACKGROUND' },
  },
  stretcher: {
    label:
      'An extending frame on a plate: a bed with a fixed jaw and a moving one, with the screen between them; a crank on the left moves the jaw and, in front, a rule marks three widths: compact, medium and expanded. As it widens, the screen rearranges: one column, then list and detail, then a side menu as well. Behind, a needle meter shows the width, and a theme unit holds the brand colors. On the right, an old panel comes in through an adapter.',
    texts: { COMPACTO: 'COMPACT', MEDIO: 'MEDIUM', AMPLIO: 'EXPANDED', 'DISEÑO ADAPTABLE': 'ADAPTIVE LAYOUT' },
  },
  cardvault: {
    label:
      'Data drawers on a plate: a phone lying on a cabinet of three drawers, reports, customers and photos, one of them open with its cards on edge. On the left, a journal with a paper strip where every change is noted; on one side, a lock with its key. On the right, a tray with the pending changes, a track, a barrier and, beyond it, the office database: when the connection returns the barrier lifts and the changes cross.',
    texts: { 'Parte 0142': 'Report 0142', PARTES: 'REPORTS', CLIENTES: 'CUSTOMERS', FOTOS: 'PHOTOS', 'GUARDAR · BUSCAR · SINCRONIZAR': 'SAVE · SEARCH · SYNC' },
  },
  annunciator: {
    label:
      "A notification board on a plate: on the left, a console with three event keys and, in front, an audience selector; in the middle, two relays with aerials, one for each family of phones; on the right, three phones standing on a dock. When a key is pressed, the alert passes through the relays and lights a banner on the screen of the two phones that allowed it; the third, with no permission, gets it in the app's inbox, a tray in front of it. A tap on the banner opens the order.",
    texts: { DESTINO: 'AUDIENCE', 'EVENTO · PERMISO · PANTALLA': 'EVENT · PERMISSION · SCREEN' },
  },
  configurator: {
    label:
      'A product configurator: a modular cabinet grows from one to three modules and gains a second height, doors and a finish as four controls move; a screen recalculates the price and at the end the quote is printed.',
    texts: { presupuesto: 'quote', 'MÓDULOS': 'MODULES', ALTURAS: 'HEIGHTS', PUERTAS: 'DOORS', ACABADO: 'FINISH', '1 mód · 1 alt': '1 mod · 1 high' },
  },
  fieldphone: {
    label:
      'A phone on a test stand fills in job reports; a spring plunger taps Send. With signal the report flies to the office server; without it, it waits in a queue tray and leaves when the mast transmits again.',
    texts: { 'Parte 0142': 'Report 0142', 'Avería · Almacén 2': 'Fault · Warehouse 2', ENVIAR: 'SEND', '0142 recibido': '0142 received' },
  },
  keys: {
    label:
      'A key cabinet on a plate: five hooks with one key each; a key leaves its hook, enters the lock of the system box, a printer logs the access and the key returns; the sealed admin key never leaves.',
    texts: { BLOQUEADO: 'LOCKED', 'sin llave no hay acceso': 'no key, no access', CREDENCIALES: 'CREDENTIALS' },
  },
  moviola: {
    label:
      'An editing table: on the board, a timeline with three clips — pain, moment, promise — plus voice-over and subtitles, and a playhead that crosses it; a monitor plays the scene under the playhead while the reels and the wheel turn.',
    texts: { dolor: 'pain', momento: 'moment', promesa: 'promise' },
  },
  nexus: {
    label:
      "Veodar's workshop: on the left, an island with the company's systems — ERP, CRM, documents and email; in the middle, an AI core with a glowing orb between two rings and a human-confirmation button; on the right, another island with what gets built — a website, an agent, a desktop station and a mobile app. Each island has a strip of four sockets where the page's fibers plug in, and floor cables carry each task from a system to the core and from the core to a product.",
  },
  patchbay: {
    label:
      'A patch bay with two rows of six sockets: old URLs on top and new ones below. A patch cable joins each old URL to its destination; sockets without a cable blink red, and with all six in place the site launches and the traffic gauge does not drop.',
    texts: { 'URL ANTIGUAS': 'OLD URLS', 'URL NUEVAS': 'NEW URLS', 'TRÁFICO ORGÁNICO': 'ORGANIC TRAFFIC', 'EN VIVO': 'LIVE', '6 sin destino': '6 unmapped' },
  },
  plant: {
    label:
      'A triage line on a plate: a loader drops cards onto a belt, a reader head with a lens scores them, a dial gauge shows the confidence against a red threshold, a carriage takes them to one of four trays and, if the confidence falls short, a spring stamp reviews them before filing.',
  },
  plotter: {
    label:
      'A gantry plotter draws the layout of a web page on a sheet with a twelve-column grid: navigation, headline, text, button, image and three cards, stroke by stroke.',
    texts: { 'REJILLA · 12 COL': 'GRID · 12 COL' },
  },
  pneumatic: {
    label:
      'A pneumatic tube system on a plate: a browser terminal, an API station with a latency clock and a three-platter database, joined by glass tubes; a capsule carries the request there and the response back.',
  },
  press: {
    label:
      'A stamping press: a business card, a letterhead and an app icon pass one after another under the piston and come out with the same mark at their size; in front, five color chips and a type plate are the brand tokens.',
  },
  qcline: {
    label:
      'A production line on a plate: bushings drop from a hopper onto a belt, pass under a vision camera that measures their diameter, and a pneumatic pusher sends the one outside tolerance to the red bin; a signal tower and the shift panel keep count and OEE.',
    texts: { 'LÍNEA 2 · TURNO': 'LINE 2 · SHIFT' },
  },
  sorter: {
    label:
      'A parcel sorter on a plate: boxes come through a strip curtain onto a roller conveyor, pass under an arch that reads their label, and a swing arm sends each one down a chute into the roll cage for its route; a board counts parcels per route and shows each departure time.',
    texts: { RUTA: 'ROUTE', BULTOS: 'PARCELS', SALIDA: 'DEPARTS' },
  },
  shelf: {
    label:
      'A store shelf on a plate with eight units of the same product: a sale at the register and an online order take units from the same shelf; each sale travels along the sync line to the stock display, which drops once per sale, and at the minimum a printer issues the restock proposal.',
    texts: {
      'mín 3': 'min 3',
      'TPV · CAJA 1': 'POS · TILL 1',
      'Venta 0087': 'Sale 0087',
      'TIENDA ONLINE': 'ONLINE STORE',
      'Pedido —': 'Order —',
      Pagar: 'Pay',
      '4,90': '4.90',
    },
  },
  frontdesk: {
    label:
      'A front-desk scheduling board on a plate: each row is a time with its card. When the 10:30 appointment is cancelled, its card leaves on the right, the slot is offered on the patient’s phone and, once confirmed, the first card of the waitlist, queued on the same rail, slides in. The consent form is signed on the phone and filed in a cabinet that only opens with a key and prints every access.',
    texts: { AGENDA: 'SCHEDULE', 'LISTA DE ESPERA →': 'WAITLIST →', CLÍNICA: 'CLINIC', 'Sin avisos': 'No alerts' },
  },
  claims: {
    label:
      'A rotary policy card file on a plate: a claim comes out of the mail unit onto a reader, its policy number turns the drum to that policy’s card, a comparator lights its three checks —in force, cover and deductible— and the claim goes into the files folder, or to the review tray when a check fails.',
    texts: { VIGENTE: 'IN FORCE', COBERTURA: 'COVER', FRANQUICIA: 'DEDUCTIBLE', 'PÓLIZA': 'POLICY', ENTRADA: 'INBOX', EXPEDIENTES: 'CLAIM FILES', 'REVISIÓN': 'REVIEW' },
  },
  balance: {
    label:
      'A reconciliation balance on a plate: a printer issues each bank transaction and its invoice comes off the tray; both are weighed on a beam balance. Equal amounts leave the beam level and the pair is posted to the ledger; a difference tips the beam and the pair goes to review.',
    texts: { 'CONCILIACIÓN': 'RECONCILIATION', MOV: 'TXN', FRA: 'INV', DIF: 'DIFF', 'BANCO · API': 'BANK · API', FACTURAS: 'INVOICES', 'LIBRO MAYOR': 'LEDGER', 'REVISIÓN': 'REVIEW' },
  },
  crane: {
    label:
      'A tower crane on a plate lifts three slabs from a stack onto a building under construction; after each slab the next floor’s columns rise, and the site office screen adds up structural progress and the amount billed, and flags the buyer portal as updated.',
    texts: { ESTRUCTURA: 'STRUCTURE', 'CERT.': 'BILLED', 'CASETA DE OBRA': 'SITE OFFICE', 'PROMOCIÓN': 'NEW HOMES', 'VENTA SOBRE PLANO': 'NOW SELLING OFF-PLAN' },
  },
  solar: {
    label:
      'A solar test bench on a plate: a lamp travels along an arc rail like the sun and four single-axis trackers turn to face it; each row reports its output to the inverter. When one row stops producing, the alarm lights, a work order prints and the dial shows total output dropping until the row is repaired.',
    texts: { 'PLANTA · INVERSOR': 'PLANT · INVERTER' },
  },
  attendance: {
    label:
      'An attendance bench on a plate: each session a reader runs over four student cards and each student present raises their glass tube one step. After the last session, students above the 75% minimum get a printed certificate, and the one below it lights a red lamp and the tutor is notified.',
    texts: { ASISTENCIA: 'ATTENDANCE', CERTIFICADOS: 'CERTIFICATES', 'MÍN 75 %': 'MIN 75%', 'SESIÓN 0/8': 'SESSION 0/8' },
  },
  deadlines: {
    label:
      'A deadline belt on a plate: case files ride carriers along a rail marked in business days; each working day the belt moves one slot toward today, and over the weekend it does not move. A printer issues a court notice, its deadline is counted in business days and its file joins the belt; files that reach today are stamped as filed and drop into the box.',
    texts: {
      'AGENDA DE PLAZOS': 'DEADLINE CALENDAR',
      'HOY · LUN': 'TODAY · MON',
      'HÁBIL': 'WORKDAY',
      NOTIFICACIONES: 'COURT NOTICES',
      HOY: 'TODAY',
      'DÍAS HÁBILES': 'BUSINESS DAYS',
      PRESENTADOS: 'FILED',
      L: 'M',
      M: 'T',
      X: 'W',
      J: 'T',
      V: 'F',
      D: 'S',
    },
  },
  grader: {
    label:
      'A fruit grader on a plate: oranges from a grower’s bin roll along two rails that spread apart; each one sinks as the gap widens and drops through where the gap is wider than it is, into the crate for its size. A camera reads each piece and an air jet blows the blemished one off. The screen keeps the lot traced to grower and field.',
    texts: {
      'TRAZABILIDAD · LOTE 0412': 'TRACEABILITY · LOT 0412',
      'SOCIO 118 · PARC. 7': 'GROWER 118 · FIELD 7',
      'SOCIO 118': 'GROWER 118',
      'PARCELA 7': 'FIELD 7',
      'CAL 1': 'SIZE 1',
      'CAL 2': 'SIZE 2',
      'CAL 3': 'SIZE 3',
      'DESTRÍO': 'CULLS',
    },
  },
  hotel: {
    label:
      'A hotel model on a plate: the twenty rooms on the façade light up when occupied. Bookings arrive through three channels on a channel manager; each one lights a room and the availability shown on every channel drops together. A checkout goes to housekeeping and returns to sale once marked clean, and the guest’s phone gets answers and online check-in.',
    texts: { 'DISPONIBLES · UN INVENTARIO': 'AVAILABLE · ONE INVENTORY', 'RECEPCIÓN': 'FRONT DESK' },
  },
  radar: {
    label:
      "A radar on a plate: a console with a round screen, range rings and a rotating sweep, and a mast with a bar antenna turning in step; the echoes are the websites that answer a search, and Veodar's moves closer to the center with every sweep.",
  },
  relays: {
    texts: { 'AGENTE · MCP': 'AGENT · MCP' },
    label:
      "A relay board on a plate: five relays on a rail, one per agent tool, with a permission bridge on top; a key powers the rail, the relays with permission close their armature and light their lamp, and the one without a bridge stays locked.",
  },
  scanner: {
    label:
      'A 3D scanner: an icosahedron spins on a turntable while a laser plane sweeps it from bottom to top; a monitor rebuilds the same part as a mesh in real time, face by face.',
    texts: { 'malla · tiempo real': 'mesh · real time', 'caras 00/20': 'faces 00/20' },
  },
  sequencer: {
    label:
      'A cam programmer on a plate: a drum with four tracks of pins turns, driven by a motor and a gear; each pin lifts the roller of a microswitch and lights the lamp for its step.',
    texts: { 'PROCESO · 4': 'PROCESS · 4' },
  },
  telegraph: {
    label:
      'A Morse key on a plate: a lever on trunnions with a spring and a knob, a contact underneath, a signal lamp that flashes with every press and a recorder that prints dots and dashes on a moving tape.',
  },
  workstation: {
    label:
      'A desktop workstation: a monitor with a drawings application, a keyboard, a local disk whose platter spins and a knife switch acting as the network. With the switch open, changes are saved to the disk; when it closes, they travel along the cable to the socket.',
    texts: { 'Planos · pieza 14-B': 'Drawings · part 14-B', 'Al día': 'Up to date', 'v2.4 · firmada': 'v2.4 · signed', '44,0': '44.0' },
  },
  zoetrope: {
    label:
      'A zoetrope driven by a motor and a belt: the drum holds twelve frames of a bouncing ball; a screen plays them with squash and stretch next to their easing curve, and a track of keyframes keeps time.',
    texts: { 'vista previa · 24 fps': 'preview · 24 fps', '12 FOTOGRAMAS': '12 FRAMES' },
  },
};

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The figure's SVG in a language: Spanish as generated, English with label and drawn words swapped. */
export function localizeSvg(svg: string, name: string, lang: Lang): string {
  if (lang === 'es') return svg;
  const text = en[name];
  if (!text) return svg;
  let out = svg.replace(/aria-label="[^"]*"/, `aria-label="${escape(text.label)}"`);
  if (text.texts) {
    out = out.replace(/(<text\b[^>]*>)([^<]*)(<\/text>)/g, (all, open, inner, close) =>
      inner in text.texts! ? `${open}${text.texts![inner]}${close}` : all,
    );
  }
  return out;
}
