import { iso, slabOf, solidSvg } from '../iso-kit.mjs';
import { tr, ease, helpers, lerp, span, type Factory, type Proj, type Vec3 } from './runtime';

// One evening at the hotel. One inventory: every channel shows the same number.
const CHANNEL_NAMES = ['Booking.com', 'Expedia', 'Web'];
const FREE0 = [2, 8, 11, 14, 17, 19];
type Event = { t: number; kind: 'book' | 'out' | 'clean'; room: number; ch?: number };
const EVENTS: Event[] = [
  { t: 0.8, kind: 'book', ch: 0, room: 2 },
  { t: 2.4, kind: 'book', ch: 2, room: 11 },
  { t: 6.0, kind: 'out', room: 5 },
  { t: 7.0, kind: 'book', ch: 1, room: 19 },
  { t: 9.2, kind: 'clean', room: 5 },
];
const CHAT = { q: 4.0, a: 4.9, checkin: 10.4 };
const TRAVEL = 0.6; // booking pulse from the channel manager to the room
const RESET = 13.6;
const CYCLE = 14.4;
const roomNo = (i: number) => (Math.floor(i / 5) + 1) * 100 + (i % 5) + 1;

type Route = Vec3[];
const pointAt = (r: Route, f: number): Vec3 => {
  const lens = r.slice(1).map((p, i) => Math.hypot(p[0] - r[i][0], p[1] - r[i][1], p[2] - r[i][2]));
  let left = lens.reduce((a, b) => a + b, 0) * Math.max(0, Math.min(1, f));
  for (let i = 0; i < lens.length; i++) {
    if (left <= lens[i]) {
      const t = lens[i] ? left / lens[i] : 0;
      return [lerp(r[i][0], r[i + 1][0], t), lerp(r[i][1], r[i + 1][1], t), lerp(r[i][2], r[i + 1][2], t)];
    }
    left -= lens[i];
  }
  return r[r.length - 1];
};

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const { cm: CM } = M;
  const windows = h.qa('[data-room]');
  const chLamps = [0, 1, 2].map((i) => h.q(`[data-part="ch${i}"]`));
  const avail = [0, 1, 2].map((i) => h.q<SVGTextElement>(`[data-part="av${i}"]`));
  const cards = h.q('[data-part="cards"]');
  const sign = h.q('[data-part="sign"]');
  const clean = h.q('[data-part="clean"]');
  const q = h.q('[data-part="q"]');
  const a = h.q('[data-part="a"]');
  const ci = h.q('[data-part="ci"]');
  h.on(sign, true);
  const setText = (el: SVGTextElement, text: string) => {
    if (el.textContent !== text) el.textContent = text;
  };

  let cardKey = '';
  const apply = (t: number) => {
    const u = t % CYCLE;
    const resetting = u >= RESET;

    // Room states from the events so far.
    const occupied = new Set(Array.from({ length: 20 }, (_, i) => i).filter((i) => !FREE0.includes(i)));
    let cleaning = -1;
    let last: Event | null = null;
    for (const e of EVENTS) {
      if (resetting || u < e.t) continue;
      last = e;
      if (e.kind === 'book') {
        if (u >= e.t + TRAVEL) occupied.add(e.room);
      } else if (e.kind === 'out') {
        occupied.delete(e.room);
        cleaning = e.room;
      } else if (e.kind === 'clean') cleaning = -1;
    }
    const free = 20 - occupied.size - (cleaning >= 0 ? 1 : 0) - EVENTS.filter((e) => e.kind === 'book' && !resetting && u >= e.t && u < e.t + TRAVEL).length;
    const blink = Math.floor(u * 3) % 2 === 0;
    windows.forEach((el, i) => el.setAttribute('data-t', occupied.has(i) ? 'acc' : i === cleaning ? (blink ? 'paper' : 'hi') : 'hi'));
    avail.forEach((el) => setText(el, String(free)));
    h.on(clean, cleaning >= 0 ? blink : !!last && last.kind === 'clean' && u - last.t < 1.2);

    // Channel lamps, booking cards rising from their slot, pulses to the hotel.
    const live = EVENTS.filter((e) => e.kind === 'book' && !resetting && u >= e.t && u < e.t + 0.9);
    chLamps.forEach((el, i) => h.on(el, live.some((e) => e.ch === i)));
    const ck = live.map((e) => `${e.ch}:${(u - e.t).toFixed(2)}`).join(';');
    if (ck !== cardKey) {
      cardKey = ck;
      let svg = '';
      for (const e of live) {
        const s = u - e.t;
        const rise = ease(span(s, 0, 0.35));
        const x = CM.x + 6 + (e.ch ?? 0) * 11;
        svg += `<g opacity="${(1 - span(s, 0.5, 0.8)).toFixed(2)}">${solidSvg(slabOf({ x: x - 3, y: CM.y + 4.4, w: 6, d: 1.2, r: 0.3 }, CM.h - 2 + rise * 7, 6, P, 1, 0), { tone: 'hi', crease: 'lo', lit: true })}</g>`;
        const f = span(s, 0.1, 0.1 + TRAVEL);
        if (f > 0 && f < 1) {
          const [bx, by] = iso(pointAt(M.route, f), P);
          svg += `<circle class="veo-bead" cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="1.9"/>`;
        }
      }
      cards.innerHTML = svg;
    }

    // Guest phone.
    q.setAttribute('opacity', !resetting && u >= CHAT.q ? '1' : '0');
    a.setAttribute('opacity', !resetting && u >= CHAT.a ? '1' : '0');
    ci.setAttribute('opacity', !resetting && u >= CHAT.checkin ? '1' : '0');

    // Readout.
    if (resetting || !last) h.say(tr(`20 habitaciones · ${FREE0.length} libres en todos los canales`, `20 rooms · ${FREE0.length} free on every channel`));
    else if (u >= CHAT.checkin) h.say(tr('Check-in online · registro de viajeros listo', 'Online check-in · guest registration ready'));
    else if (u >= CHAT.q && u < CHAT.q + 1.8) h.say(tr('Pregunta en inglés · respondida', 'Guest question · answered'));
    else if (last.kind === 'book') h.say(tr(`${CHANNEL_NAMES[last.ch ?? 0]} · hab. ${roomNo(last.room)} · quedan ${free}`, `${CHANNEL_NAMES[last.ch ?? 0]} · room ${roomNo(last.room)} · ${free} left`));
    else if (last.kind === 'out') h.say(tr(`Salida hab. ${roomNo(last.room)} · a limpieza`, `Room ${roomNo(last.room)} checked out · to housekeeping`));
    else h.say(tr(`Hab. ${roomNo(last.room)} limpia · a la venta · quedan ${free}`, `Room ${roomNo(last.room)} clean · back on sale · ${free} left`));
  };
  return { apply, still: 7.4 };
};

export default create;
