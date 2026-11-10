// English for the isometric figures. The SVGs are generated once in Spanish
// (iso/fig-*.mjs); on English pages their accessible label and the words drawn
// inside them are swapped from this table at render time.
import type { Lang } from './index';

type FigureText = { label: string; texts?: Record<string, string> };

const en: Record<string, FigureText> = {
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
