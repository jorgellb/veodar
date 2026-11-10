import { iso, lineOnTop, pathOf, segment, slabOf, solidSvg, translateAlong } from '../iso-kit.mjs';
import { tr, ease, helpers, lerp, span, type Factory, type Proj, type Vec3 } from './runtime';

// One cancelled appointment, start to finish: the slot is freed, offered,
// confirmed, refilled from the waitlist, the consent is signed and filed.
const T = {
  cancel: [0.8, 1.8],
  drop: [1.8, 2.2],
  offer: [2.4, 3.2],
  accept: 4.2,
  reply: [4.4, 5.2],
  advance: [5.4, 6.8],
  consent: 7.4,
  sign: [8.0, 9.2],
  signed: 9.3,
  file: [9.5, 10.2],
  open: [10.4, 10.9],
  print: [10.4, 11.2],
  close: [11.6, 12.1],
};
const RESET = 14.2;
const CYCLE = 15;

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
  const slot = h.q('[data-card="slot"]');
  const wait = [0, 1, 2].map((i) => h.q(`[data-card="w${i}"]`));
  const leds = h.qa('[data-led]');
  const beads = h.q('[data-part="beads"]');
  const drawer = h.q('[data-part="drawer"]');
  const key = h.q('[data-part="key"]');
  const access = h.q('[data-part="access"]');
  const log = h.q('[data-part="log"]');
  const title = h.q<SVGTextElement>('[data-part="title"]');
  const sub = h.q<SVGTextElement>('[data-part="sub"]');
  const doc = h.q('[data-part="doc"]');
  const sig = h.q('[data-part="sig"]');
  const chip = h.q('[data-part="chip"]');
  const chipText = h.q<SVGTextElement>('[data-part="chiptext"]');
  const routes = M.routes as Record<'offer' | 'file', Route>;
  const { rz: RZ, card: CARD, waitX: WAIT_X, rail: RAIL, tray: TRAY, cab: CAB } = M;
  leds.forEach((el) => el.setAttribute('data-t', 'hi'));

  const setText = (el: SVGTextElement, text: string) => {
    if (el.textContent !== text) el.textContent = text;
  };
  const place = (el: Element, x: number, dz: number, alpha: number) => {
    el.setAttribute('transform', translateAlong(P, [x, 0, dz]));
    el.setAttribute('opacity', alpha.toFixed(2));
  };

  let drawerKey = '';
  let logKey = '';
  let beadKey = '';
  const apply = (t: number) => {
    const u = t % CYCLE;
    const life = Math.min(1, u / 0.4) * (1 - span(u, RESET, RESET + 0.5));

    // The cancelled card leaves along the rail and drops into the tray.
    const slide = ease(span(u, T.cancel[0], T.cancel[1]));
    const fall = span(u, T.drop[0], T.drop[1]);
    const gone = 1 - span(u, T.drop[1], T.drop[1] + 0.4);
    place(slot, lerp(CARD.x, RAIL.x1 - 2, slide) + (TRAY.x - (RAIL.x1 - 2)) * fall, (TRAY.z - RZ) * fall * fall, Math.min(life, gone));

    // The waitlist moves up one place once the patient has accepted.
    wait.forEach((el, i) => {
      const a = ease(span(u, T.advance[0] + i * 0.18, T.advance[1] + i * 0.18));
      const to = i === 0 ? CARD.x : WAIT_X[i - 1];
      place(el, lerp(WAIT_X[i], to, a), 0, life);
    });

    // Row lights: the free slot blinks until it is filled again.
    const free = u >= T.cancel[0] + 0.2 && u < T.advance[1];
    leds[3].setAttribute('data-t', free ? (Math.floor(u * 3) % 2 ? 'acc' : '') : 'hi');

    // Pulses: offer to the phone, the reply back, the signed document to the cabinet.
    const pulses: Vec3[] = [];
    const f1 = span(u, T.offer[0], T.offer[1]);
    if (f1 > 0 && f1 < 1) pulses.push(pointAt(routes.offer, f1));
    const f2 = span(u, T.reply[0], T.reply[1]);
    if (f2 > 0 && f2 < 1) pulses.push(pointAt(routes.offer, 1 - f2));
    const f3 = span(u, T.file[0], T.file[1]);
    if (f3 > 0 && f3 < 1) pulses.push(pointAt(routes.file, f3));
    const bk = pulses.map((p) => p.map((v) => v.toFixed(1)).join()).join(';');
    if (bk !== beadKey) {
      beadKey = bk;
      beads.innerHTML = pulses
        .map((p) => {
          const [x, y] = iso(p, P);
          return `<circle class="veo-bead" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.9"/>`;
        })
        .join('');
    }

    // The patient's phone.
    const resetting = u >= RESET;
    let chipLabel = '';
    let chipOn = false;
    if (resetting || u < T.offer[1]) {
      setText(title, tr('Sin avisos', 'No alerts'));
      setText(sub, '');
    } else if (u < T.accept) {
      setText(title, tr('Hueco libre', 'Slot open'));
      setText(sub, tr('Hoy 10:30', 'Today 10:30'));
      chipLabel = tr('Aceptar', 'Accept');
    } else if (u < T.consent) {
      setText(title, tr('Confirmada', 'Confirmed'));
      setText(sub, tr('Hoy 10:30 ✓', 'Today 10:30 ✓'));
      chipLabel = tr('Aceptada', 'Accepted');
      chipOn = true;
    } else {
      setText(title, tr('Consentimiento', 'Consent form'));
      setText(sub, tr('Hoy 10:30', 'Today 10:30'));
      chipLabel = u >= T.signed ? tr('Firmado ✓', 'Signed ✓') : tr('Firmar', 'Sign');
      chipOn = u >= T.signed;
    }
    setText(chipText, chipLabel);
    chip.setAttribute('opacity', chipLabel ? '1' : '0');
    chip.setAttribute('data-t', chipOn ? 'acc' : '');
    doc.setAttribute('opacity', !resetting && u >= T.consent ? '1' : '0');
    sig.setAttribute('stroke-dashoffset', (1 - span(u, T.sign[0], T.sign[1])).toFixed(3));

    // The cabinet: key in, light on, middle drawer out and back, one line printed.
    const using = !resetting && u >= T.file[1] && u < T.close[1] + 0.2;
    key.setAttribute('opacity', using ? '1' : '.25');
    h.on(access, using);
    const o = 12 * (ease(span(u, T.open[0], T.open[1])) - ease(span(u, T.close[0], T.close[1])));
    const dk = o.toFixed(2);
    if (dk !== drawerKey) {
      drawerKey = dk;
      const x0 = CAB.x + 2;
      const w = CAB.w - 4;
      const front = CAB.front + o;
      let svg = '';
      if (o > 0.05) {
        svg += solidSvg(slabOf({ x: x0 + 1.4, y: CAB.front - 0.4, w: w - 2.8, d: o + 0.4, r: 0.3 }, CAB.z0 + 1, CAB.z1 - CAB.z0 - 2.6, P, 1, 0), { tone: 'mid', crease: 'lo' });
        let tabs = '';
        for (let y = CAB.front + 2; y < front - 1; y += 2.6) tabs += lineOnTop([x0 + 3, y], [x0 + w - 3, y], CAB.z1 - 1.6, P);
        if (tabs) svg += `<path class="iso-line" data-tone="lo" d="${tabs}"/>`;
      }
      svg += solidSvg(slabOf({ x: x0, y: front, w, d: 1.2, r: 0.4 }, CAB.z0, CAB.z1 - CAB.z0, P, 2, 0.3), { tone: 'hi', crease: 'lo' });
      svg += solidSvg(slabOf({ x: x0 + w / 2 - 5, y: front + 1.2, w: 10, d: 1.2, r: 0.5 }, CAB.z0 + 1.6, 1.6, P, 2, 0.2), { tone: 'mid' });
      svg += `<path class="iso-line" data-tone="mid" d="${pathOf(
        [
          [x0 + w / 2 - 4, CAB.z1 - 2],
          [x0 + w / 2 + 4, CAB.z1 - 2],
          [x0 + w / 2 + 4, CAB.z1 - 5],
          [x0 + w / 2 - 4, CAB.z1 - 5],
        ].map(([x, z]) => iso([x, front + 1.2, z], P)),
        true,
      )}"/>`;
      drawer.innerHTML = svg;
    }

    // Access log: one line per opening, printed as the drawer comes out.
    const feed = resetting ? 0 : ease(span(u, T.print[0], T.print[1]));
    const lk = feed.toFixed(2);
    if (lk !== logKey) {
      logKey = lk;
      const p = M.log;
      const topZ = p.z + feed * 12;
      const quad = [iso([p.x0, p.y, p.z], P), iso([p.x1, p.y, p.z], P), iso([p.x1, p.y, topZ], P), iso([p.x0, p.y, topZ], P)];
      let marks = '';
      [10, 7].forEach((z, i) => {
        if (topZ - p.z > z + 0.5) marks += segment([p.x0 + 1.4, p.y, topZ - z + 1], [p.x0 + 1.4 + [6.6, 4.6][i], p.y, topZ - z + 1], P);
      });
      log.innerHTML = feed > 0.02 ? `<path d="${pathOf(quad, true)}" fill="#fffefb" stroke="var(--anatomy-mid)" stroke-width=".7"/>${marks ? `<path class="iso-line" data-tone="hi" d="${marks}"/>` : ''}` : '';
    }

    if (resetting) h.say(tr('Nuevo día · agenda completa', 'New day · schedule full'));
    else if (u < T.cancel[0]) h.say(tr('Agenda de hoy · 5 citas · 3 en espera', 'Today · 5 appointments · 3 waiting'));
    else if (u < T.offer[0]) h.say(tr('10:30 cancelada · hueco libre', '10:30 cancelled · slot open'));
    else if (u < T.accept) h.say(tr('Hueco ofrecido al #1 de la lista', 'Slot offered to #1 on the waitlist'));
    else if (u < T.advance[1]) h.say(tr('#1 acepta · 10:30 ocupada otra vez', '#1 accepts · 10:30 filled again'));
    else if (u < T.signed) h.say(tr('Consentimiento enviado al móvil', 'Consent form sent to the phone'));
    else if (u < T.file[1]) h.say(tr('Consentimiento firmado · al expediente', 'Consent signed · to the record'));
    else h.say(tr('Expediente abierto con llave · acceso registrado', 'Record opened with a key · access logged'));
  };
  return { apply, still: 10.8 };
};

export default create;
