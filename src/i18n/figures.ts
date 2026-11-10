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
