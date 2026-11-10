import { iso, pathOf, segment, translateAlong } from '../iso-kit.mjs';
import { tr, ease, helpers, lerp, span, type Factory, type Proj, type Vec3 } from './runtime';

// One product, one stock. Sales alternate between the register and the online
// store; each one is counted once, when its pulse reaches the display.
const START = 8;
const MIN = 3;
const SALES: { ch: 'pos' | 'web'; at: number }[] = [
  { ch: 'pos', at: 0.6 },
  { ch: 'web', at: 2.5 },
  { ch: 'pos', at: 4.4 },
  { ch: 'web', at: 6.3 },
  { ch: 'pos', at: 8.2 },
];
const TAKE = [3, 2, 1, 0, 7]; // shelf slot each sale empties
const RESTOCK = 11.6; // the proposal is approved; units go back on the shelf
const RESET = 14;
const CYCLE = 14.8;

// Timings inside one sale.
const POS = { fly: [0, 0.9], wire: [0.9, 1.5], up: [1.5, 1.85] };
const WEB = { wire: [0.15, 0.75], up: [0.75, 1.05], fly: [1.05, 1.95] };
const countedAt = (s: (typeof SALES)[number]) => s.at + (s.ch === 'pos' ? POS.up[1] : WEB.up[1]);
const LOW_AT = countedAt(SALES[SALES.length - 1]);
const PRINT = [LOW_AT + 0.3, LOW_AT + 1.3];

type Route = Vec3[];
const lengthOf = (r: Route) => r.slice(1).reduce((sum, p, i) => sum + Math.hypot(p[0] - r[i][0], p[1] - r[i][1], p[2] - r[i][2]), 0);
const pointAt = (r: Route, f: number): Vec3 => {
  let left = lengthOf(r) * Math.max(0, Math.min(1, f));
  for (let i = 1; i < r.length; i++) {
    const a = r[i - 1];
    const b = r[i];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    if (left <= len) {
      const t = len ? left / len : 0;
      return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
    }
    left -= len;
  }
  return r[r.length - 1];
};

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const slots = h.qa('[data-slot]');
  const fly = h.q('[data-part="fly"]');
  const beads = h.q('[data-part="beads"]');
  const stockText = h.q<SVGTextElement>('[data-part="stock"]');
  const minText = h.q<SVGTextElement>('[data-part="min"]');
  const segs = h.qa('[data-seg]');
  const reorder = h.q('[data-part="reorder"]');
  const sync = h.q('[data-part="sync"]');
  const print = h.q('[data-part="print"]');
  const paper = h.q('[data-part="paper"]');
  const ticket = h.q<SVGTextElement>('[data-part="ticket"]');
  const cardOk = h.q('[data-part="cardok"]');
  const order = h.q<SVGTextElement>('[data-part="order"]');
  const paid = h.q('[data-part="paid"]');
  const paidText = h.q<SVGTextElement>('[data-part="paidtext"]');
  const cartonLabel = h.q<SVGTextElement>('[data-part="cartonlabel"] text');
  const slotAt = M.slots as { x: number; y: number; z: number }[];
  const PROD = M.prod as { w: number; d: number; h: number };
  const routes = M.routes as Record<'pos' | 'web' | 'up', Route>;

  const setText = (el: SVGTextElement | null, text: string) => {
    if (el && el.textContent !== text) el.textContent = text;
  };

  // Path of a unit from its shelf slot to the bag or the carton.
  const flight = (slot: number, ch: 'pos' | 'web', f: number): Vec3 => {
    const s = slotAt[slot];
    const from: Vec3 = [s.x + PROD.w / 2, s.y + PROD.d / 2, s.z];
    const out: Vec3 = [from[0], -28, from[2] + 1];
    const dest = ch === 'pos' ? M.bag : M.carton;
    const to: Vec3 = [dest.x, dest.y, dest.z];
    if (f < 0.25) {
      const a = ease(f / 0.25);
      return [from[0], lerp(from[1], out[1], a), lerp(from[2], out[2], a)];
    }
    const b = ease((f - 0.25) / 0.75);
    return [lerp(out[0], to[0], b), lerp(out[1], to[1], b), lerp(out[2], to[2], b) + Math.sin(Math.PI * b) * 16];
  };

  let paperKey = '';
  let beadKey = '';
  const apply = (t: number) => {
    const u = t % CYCLE;
    const resetting = u >= RESET;

    // Stock from the model: every sale counted, plus the restock as it lands.
    const sold = resetting ? 0 : SALES.filter((s) => u >= countedAt(s)).length;
    const back = resetting ? 0 : TAKE.filter((_, i) => u >= RESTOCK + i * 0.18).length;
    const stock = START - sold + back;
    setText(stockText, String(stock));
    const low = stock <= MIN && !resetting;
    segs.forEach((el, i) => el.setAttribute('data-t', i < stock ? (low ? 'acc' : 'hi') : ''));
    setText(minText, low || (u >= LOW_AT && u < RESTOCK + 1 && !resetting) ? tr('REPONER 5', 'RESTOCK 5') : tr('mín 3', 'min 3'));
    h.on(reorder, u >= LOW_AT && u < RESTOCK && Math.floor(u * 3) % 2 === 0);

    // Shelf slots: emptied as each unit is picked, refilled by the restock.
    slots.forEach((el, i) => {
      const k = TAKE.indexOf(i);
      if (k < 0) return el.setAttribute('opacity', '1');
      const sale = SALES[k];
      const pick = sale.at + (sale.ch === 'pos' ? POS.fly[0] : WEB.fly[0]);
      const refill = RESTOCK + k * 0.18;
      const gone = !resetting && u >= pick && u < refill;
      const coming = ease(span(u, refill, refill + 0.3));
      el.setAttribute('opacity', gone ? '0' : u >= refill && !resetting ? coming.toFixed(2) : '1');
      el.setAttribute('transform', u >= refill && !resetting && coming < 1 ? translateAlong(P, [0, 0, (1 - coming) * 6]) : '');
    });

    // The unit in flight, the pulses on the wire and the screens.
    let flying = false;
    const pulses: Vec3[] = [];
    let syncOn = false;
    let posCount = 0;
    let webCount = 0;
    let lastSale = -1;
    SALES.forEach((sale, k) => {
      const s = u - sale.at;
      if (resetting || s < 0) return;
      lastSale = k;
      if (sale.ch === 'pos') posCount++;
      else webCount++;
      const T = sale.ch === 'pos' ? POS : WEB;
      const f = span(s, T.fly[0], T.fly[1]);
      if (f > 0 && f < 1) {
        flying = true;
        const at = flight(TAKE[k], sale.ch, f);
        fly.setAttribute('transform', translateAlong(P, at));
        fly.setAttribute('opacity', Math.min(1, (1 - f) * 6).toFixed(2));
      }
      const w = span(s, T.wire[0], T.wire[1]);
      const up = span(s, T.up[0], T.up[1]);
      if (w > 0 && w < 1) pulses.push(pointAt(routes[sale.ch], w));
      if (up > 0 && up < 1) pulses.push(pointAt(routes.up, up));
      if ((w > 0.85 && w < 1) || (up > 0 && up < 0.2)) syncOn = true;
    });
    if (!flying) fly.setAttribute('opacity', '0');
    h.on(sync, syncOn);

    const key = pulses.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(';');
    if (key !== beadKey) {
      beadKey = key;
      beads.innerHTML = pulses
        .map((p) => {
          const [x, y] = iso(p, P);
          return `<circle class="veo-bead" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.9"/>`;
        })
        .join('');
    }

    const last = lastSale >= 0 ? SALES[lastSale] : null;
    setText(ticket, `${tr('Venta', 'Sale')} ${String(86 + Math.max(1, posCount)).padStart(4, '0')}`);
    h.on(cardOk, !!last && last.ch === 'pos' && u - last.at < 1.6);
    const ordering = !!last && last.ch === 'web' && u - last.at < 2.2;
    const orderNo = 1042 + Math.max(1, webCount);
    setText(order, webCount ? `${tr('Pedido', 'Order')} #${orderNo}` : `${tr('Pedido', 'Order')} —`);
    paid.setAttribute('data-t', ordering ? 'acc' : '');
    setText(paidText, ordering ? tr('Pagado', 'Paid') : tr('Pagar', 'Pay'));
    setText(cartonLabel, `#${orderNo}`);

    // Restock proposal printed once the minimum is reached.
    const feed = resetting ? 0 : u >= RESTOCK + 1.2 ? Math.max(0, 1 - span(u, RESTOCK + 1.2, RESTOCK + 1.6)) : ease(span(u, PRINT[0], PRINT[1]));
    h.on(print, feed > 0.02 && u < RESTOCK);
    const pk = feed.toFixed(2);
    if (pk !== paperKey) {
      paperKey = pk;
      const p = M.paper;
      const topZ = p.z + feed * 15;
      const quad = [iso([p.x0, p.y, p.z], P), iso([p.x1, p.y, p.z], P), iso([p.x1, p.y, topZ], P), iso([p.x0, p.y, topZ], P)];
      let marks = '';
      [12.5, 9.5, 6.5].forEach((z, i) => {
        if (topZ - p.z > z + 0.5) marks += segment([p.x0 + 1.6, p.y, topZ - z + 1], [p.x0 + 1.6 + [7, 5, 6][i], p.y, topZ - z + 1], P);
      });
      paper.innerHTML = feed > 0.02 ? `<path d="${pathOf(quad, true)}" fill="#fffefb" stroke="var(--anatomy-mid)" stroke-width=".7"/>${marks ? `<path class="iso-line" data-tone="hi" d="${marks}"/>` : ''}` : '';
    }

    if (resetting) h.say(tr('Nuevo día · stock 8', 'New day · stock 8'));
    else if (u >= RESTOCK) h.say(tr(`Reposición aprobada · stock ${stock}`, `Restock approved · stock ${stock}`));
    else if (u >= LOW_AT) h.say(tr('Stock 3 = mínimo · reposición propuesta: 5 uds', 'Stock 3 = minimum · restock proposed: 5 units'));
    else if (!last) h.say(tr('Ref 2041 · stock 8 · tienda y web', 'Ref 2041 · stock 8 · store and web'));
    else if (last.ch === 'pos') h.say(tr(`Venta en tienda · stock ${stock}`, `In-store sale · stock ${stock}`));
    else h.say(tr(`Pedido online #${orderNo} · stock ${stock}`, `Online order #${orderNo} · stock ${stock}`));
  };
  return { apply, still: 7.1 };
};

export default create;
