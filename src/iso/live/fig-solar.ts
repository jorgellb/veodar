import { iso, lineOnTop, pathOf, segment } from '../iso-kit.mjs';
import { fmt, tr, ease, helpers, lerp, span, type Factory, type Proj, type Vec3 } from './runtime';

// One day on the bench. Output per row = nominal × irradiance × cos(incidence);
// the third row fails at midday and is repaired after the work order.
const DAY = [0.6, 12.4];
const NOMINAL = 125; // kW per row
const LIMIT = 55; // tracker range, degrees
const FAULT = { row: 2, from: 5.0, detect: 5.5, print: [5.7, 6.7], fix: 9.4 };
const RESET = 13.2;
const CYCLE = 14;
const DEG = Math.PI / 180;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const { track: TRACK, arc: ARC, met: MET, dial: DIAL } = M;
  const panels = TRACK.xs.map((_: number, i: number) => h.q(`[data-panel="${i}"]`));
  const faults = TRACK.xs.map((_: number, i: number) => h.q(`[data-part="fault${i}"]`));
  const sun = h.q('[data-part="sun"]');
  const cups = h.q('[data-part="cups"]');
  const needle = h.q('[data-part="needle"]');
  const order = h.q('[data-part="order"]');
  const alarmLamp = h.q('[data-part="alarmlamp"]');
  const kwText = h.q<SVGTextElement>('[data-part="kw"]');
  const alarmRow = h.q('[data-part="alarmrow"]');
  const alarmText = h.q<SVGTextElement>('[data-part="alarm"]');
  const bars = h.qa('[data-bar]');
  const setText = (el: SVGTextElement, text: string) => {
    if (el.textContent !== text) el.textContent = text;
  };

  const panelSvg = (x: number, a: number, glint: number, broken: boolean) => {
    const zc = TRACK.z + 1.6;
    const p = (w: number, y: number, down = 0): number[] => iso([x + w * Math.cos(a) + Math.sin(a) * down, y, zc + w * Math.sin(a) - Math.cos(a) * down], P);
    const y0 = TRACK.y0 - 2;
    const y1 = TRACK.y1 + 2;
    const top = [p(-9, y0), p(9, y0), p(9, y1), p(-9, y1)];
    const end = [p(-9, y1), p(9, y1), p(9, y1, 1), p(-9, y1, 1)];
    const side = [p(9, y0), p(9, y1), p(9, y1, 1), p(9, y0, 1)];
    let grid = '';
    for (let y = y0 + 6.5; y < y1 - 1; y += 6.5) grid += pathOf([p(-9, y), p(9, y)]);
    for (const w of [-3, 3]) grid += pathOf([p(w, y0), p(w, y1)]);
    const shine = glint > 0.02 ? `<path d="${pathOf([p(0, y0 + 3), p(0, y1 - 3)])}" stroke="#ff8a5c" stroke-opacity="${glint.toFixed(2)}" stroke-width="2.2" stroke-linecap="round" fill="none"/>` : '';
    return (
      `<path d="${pathOf(side, true)}" fill="#2c2950" stroke="var(--anatomy-hi)" stroke-width=".7" vector-effect="non-scaling-stroke"/>` +
      `<path d="${pathOf(end, true)}" fill="#24213f" stroke="var(--anatomy-hi)" stroke-width=".7" vector-effect="non-scaling-stroke"/>` +
      `<path d="${pathOf(top, true)}" fill="#1b1937" stroke="${broken ? '#e5484d' : 'var(--anatomy-hi)'}" stroke-width="${broken ? 1.3 : 0.8}" vector-effect="non-scaling-stroke"/>` +
      `<path d="${grid}" stroke="#f4f0e6" stroke-opacity=".2" stroke-width=".6" fill="none" vector-effect="non-scaling-stroke"/>` +
      shine
    );
  };

  let panelKey = '';
  let orderKey = '';
  const apply = (t: number) => {
    const u = t % CYCLE;
    const day = span(u, DAY[0], DAY[1]);
    const s = lerp(ARC.from, ARC.to, day) * DEG; // sun angle on the rail
    const up = Math.min(span(u, DAY[0] - 0.4, DAY[0] + 0.4), 1 - span(u, DAY[1], DAY[1] + 0.6));
    const irr = Math.max(0, Math.sin(s)) ** 1.2 * up;
    const ideal = s - Math.PI / 2;
    const angle = Math.max(-LIMIT * DEG, Math.min(LIMIT * DEG, ideal));
    const stow = u >= DAY[1] ? ease(span(u, DAY[1], DAY[1] + 0.8)) : u < DAY[0] ? 1 - ease(span(u, 0, DAY[0])) : 0;
    const a = lerp(angle, 0, stow);
    const cosInc = Math.max(0, Math.cos(ideal - a));
    const broken = u >= FAULT.from && u < FAULT.fix;
    const detected = u >= FAULT.detect && u < FAULT.fix;

    // Output per row and in total.
    const rows = TRACK.xs.map((_: number, i: number) => (broken && i === FAULT.row ? 0 : NOMINAL * irr * cosInc));
    const total = rows.reduce((x: number, y: number) => x + y, 0);

    // Panels.
    const glint = irr * Math.pow(cosInc, 40);
    const key = `${a.toFixed(3)}|${glint.toFixed(2)}|${broken}`;
    if (key !== panelKey) {
      panelKey = key;
      panels.forEach((el: Element, i: number) => (el.innerHTML = panelSvg(TRACK.xs[i], a, broken && i === FAULT.row ? 0 : glint, detected && i === FAULT.row)));
    }
    faults.forEach((el: Element, i: number) => h.on(el, detected && i === FAULT.row && Math.floor(u * 3) % 2 === 0, 'data-err'));

    // The lamp on its rail, with a soft glow and a few rays toward the array.
    const sp: Vec3 = [ARC.cx + Math.cos(s) * ARC.r, ARC.y + 3.4, ARC.cz + Math.sin(s) * ARC.r];
    const [sx, sy] = iso(sp, P);
    const rays = TRACK.xs.map((x: number) => segment(sp, [x, -20, TRACK.z + 2], P)).join('');
    sun.innerHTML =
      `<path class="iso-line" data-tone="mid" d="${segment([sp[0], ARC.y, sp[2]], sp, P)}"/>` +
      (up > 0.01 ? `<path d="${rays}" stroke="#ff5a1f" stroke-opacity="${(0.18 * irr).toFixed(2)}" stroke-width=".8" fill="none" vector-effect="non-scaling-stroke"/>` : '') +
      `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="16" fill="#ff5a1f" opacity="${(0.14 * up).toFixed(2)}"/>` +
      `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="5" fill="${up > 0.05 ? '#ffb48a' : 'var(--anatomy-paper)'}" stroke="${up > 0.05 ? '#ff5a1f' : 'var(--anatomy-hi)'}" stroke-width="1.2" class="${up > 0.05 ? 'veo-glow' : ''}"/>`;

    // Anemometer cups.
    const spin = t * 5.5;
    const hub: Vec3 = [MET.x, MET.y, 40];
    let arms = '';
    let dots = '';
    for (let k = 0; k < 3; k++) {
      const q = spin + (k * 2 * Math.PI) / 3;
      const tip: Vec3 = [MET.x + Math.cos(q) * 4.4, MET.y + Math.sin(q) * 4.4, 40];
      arms += segment(hub, tip, P);
      const [cx, cy] = iso(tip, P);
      dots += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="1.3" fill="var(--anatomy-paper)" stroke="var(--anatomy-hi)" stroke-width=".7"/>`;
    }
    const [hx, hy] = iso(hub, P);
    cups.innerHTML = `<path class="iso-line" data-tone="hi" d="${segment([MET.x, MET.y, 39.2], hub, P)}${arms}"/>${dots}<circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r=".9" fill="var(--anatomy-hi)"/>`;

    // Inverter screen, alarm and the work order.
    setText(kwText, String(Math.round(total)));
    bars.forEach((el, i) => {
      const f = rows[i] / NOMINAL;
      el.setAttribute('y', (15 - 8 * f).toFixed(2));
      el.setAttribute('height', Math.max(0.3, 8 * f).toFixed(2));
      el.setAttribute('data-t', detected && i === FAULT.row ? 'acc' : 'hi');
    });
    alarmRow.setAttribute('data-t', detected ? 'acc' : '');
    setText(alarmText, detected ? tr('S3 · 0 A · OT 0217', 'S3 · 0 A · WO 0217') : u >= FAULT.fix && u < RESET ? tr('OT 0217 cerrada', 'WO 0217 closed') : '');
    h.on(alarmLamp, detected && Math.floor(u * 3) % 2 === 0, 'data-err');
    const feed = u >= RESET ? 0 : ease(span(u, FAULT.print[0], FAULT.print[1])) * (1 - ease(span(u, FAULT.fix + 0.6, FAULT.fix + 1.2)));
    const ok = feed.toFixed(2);
    if (ok !== orderKey) {
      orderKey = ok;
      const p = M.paper;
      const topZ = p.z + feed * 14;
      const quad = [iso([p.x0, p.y, p.z], P), iso([p.x1, p.y, p.z], P), iso([p.x1, p.y, topZ], P), iso([p.x0, p.y, topZ], P)];
      let marks = '';
      [11.5, 8.5, 5.5].forEach((z, i) => {
        if (topZ - p.z > z + 0.5) marks += segment([p.x0 + 1.4, p.y, topZ - z + 1], [p.x0 + 1.4 + [7, 5, 6][i], p.y, topZ - z + 1], P);
      });
      order.innerHTML = feed > 0.02 ? `<path d="${pathOf(quad, true)}" fill="#fffefb" stroke="var(--anatomy-mid)" stroke-width=".7"/>${marks ? `<path class="iso-line" data-tone="hi" d="${marks}"/>` : ''}` : '';
    }

    // Dial: total output, 0–500 kW.
    const na = DIAL.from + DIAL.span * Math.min(1, total / 500);
    const tip = [DIAL.x + Math.sin(na) * (DIAL.r - 3), DIAL.y - Math.cos(na) * (DIAL.r - 3)];
    const [tx, ty] = iso([tip[0], tip[1], DIAL.z + 0.1], P);
    needle.innerHTML = `<path class="iso-line" data-tone="lit" style="stroke-width:1.5px" d="${lineOnTop([DIAL.x, DIAL.y], tip, DIAL.z + 0.1, P)}"/><circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="1" fill="#ff5a1f"/>`;

    const deg = Math.round(a / DEG);
    if (u >= RESET || u >= DAY[1]) h.say(tr('Anochece · 1 avería resuelta', 'Dusk · 1 fault fixed'));
    else if (u < DAY[0]) h.say(tr('Amanece · seguidores al este', 'Dawn · trackers facing east'));
    else if (detected) h.say(tr(`S3 caída · OT 0217 · ${Math.round(total)} kW`, `S3 down · WO 0217 · ${Math.round(total)} kW`));
    else if (u >= FAULT.fix && u < FAULT.fix + 2.4) h.say(tr('OT 0217 cerrada · S3 en marcha', 'WO 0217 closed · S3 running'));
    else h.say(tr(`${Math.round(total)} kW · seguidores ${fmt(Math.abs(deg), 0)}° ${deg >= 0 ? 'este' : 'oeste'}`, `${Math.round(total)} kW · trackers ${Math.abs(deg)}° ${deg >= 0 ? 'east' : 'west'}`));
  };
  return { apply, still: 7.4 };
};

export default create;
