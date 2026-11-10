import { iso, pathOf } from '../iso-kit.mjs';
import { helpers, type Factory, type Proj, type Vec3 } from './runtime';

const CYCLE = 9.6;
const STEPS = ['Un ejemplo real', 'Un alcance escrito', 'Un primer corte usable', 'Operar y medir'];
const TRIGGER = (i: number) => 0.8 + i * 2.2;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const pinsEl = h.q('[data-part="pins"]');
  const gearEl = h.q('[data-part="gear"]');
  const levers = M.tracks.map((_: number, i: number) => [...h.q(`[data-part="lever-${i}"]`).children] as SVGGElement[]);
  const lamps = M.tracks.map((_: number, i: number) => h.q(`[data-part="step-${i}"]`));
  const { y: ay, z: az } = M.axis;
  const R = M.R;
  const omega = (Math.PI * 2) / CYCLE;
  const phase = M.tracks.map((_: number, i: number) => M.roll.a + omega * TRIGGER(i));
  const a = (M.P.azimuth * Math.PI) / 180;
  const e = (M.P.elevation * Math.PI) / 180;
  const vy = Math.sin(a) * Math.cos(e);
  const vz = Math.sin(e);
  const shown = new Array(M.tracks.length).fill(0);
  let lastStep = -1;

  const wrap = (v: number) => Math.atan2(Math.sin(v), Math.cos(v));
  const pt = (x: number, r: number, al: number): Vec3 => [x, ay + r * Math.sin(al), az + r * Math.cos(al)];

  const apply = (t: number) => {
    const u = t % CYCLE;
    // Current step: the last pin that passed.
    let step = M.tracks.length - 1;
    for (let i = 0; i < M.tracks.length; i++) if (u >= TRIGGER(i)) step = i;

    // Pins on the visible side of the drum.
    let pins = '';
    const holes: string[] = [];
    M.tracks.forEach((x: number, i: number) => {
      for (let k = 0; k < 24; k++) {
        const al = phase[i] - omega * u + (k / 24) * Math.PI * 2;
        const f = Math.sin(al) * vy + Math.cos(al) * vz;
        if (f <= 0.12 || k === 0) continue;
        const [hx, hy] = iso(pt(x, R, al), P);
        holes.push(`<circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r=".55" opacity="${Math.min(1, (f - 0.12) * 3).toFixed(2)}"/>`);
      }
    });
    pins += `<g fill="var(--anatomy-mid)">${holes.join('')}</g>`;
    M.tracks.forEach((x: number, i: number) => {
      const al = phase[i] - omega * u;
      if (Math.sin(al) * vy + Math.cos(al) * vz <= 0.05) return;
      const [x0, y0] = iso(pt(x, R, al), P);
      const [x1, y1] = iso(pt(x, R + M.pin, al), P);
      const ink = i === step ? '#ff5a1f' : 'var(--anatomy-hi)';
      pins += `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${ink}" stroke-width="3.4" stroke-linecap="round"/>`;
      pins += `<circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="1.6" fill="var(--anatomy-paper)" stroke="${ink}" stroke-width=".8"/>`;
    });
    pinsEl.innerHTML = pins;

    // Rollers ride up over their pin.
    M.tracks.forEach((_: number, i: number) => {
      const d = Math.abs(wrap(phase[i] - omega * u - M.roll.a));
      const s = Math.max(0, 1 - d / 0.26);
      const lift = s * s * (3 - 2 * s);
      const level = Math.round(lift * (M.levels - 1));
      if (level !== shown[i]) {
        levers[i][shown[i]].style.display = 'none';
        levers[i][level].style.display = '';
        shown[i] = level;
      }
    });

    lamps.forEach((el: Element, i: number) => h.on(el, i === step));
    if (step !== lastStep) {
      lastStep = step;
      root.dispatchEvent(new CustomEvent('figure:step', { detail: step, bubbles: true }));
    }

    // Gear teeth and spokes turn with the drum (gear ratio 1:1 on the face).
    const g = M.gear;
    const beta = omega * u * 3;
    const teeth: string[] = [];
    for (let k = 0; k < 28; k++) {
      const b = beta + (k / 28) * Math.PI * 2;
      teeth.push(pathOf([iso([g.x, g.y + (g.r - 2.2) * Math.sin(b), g.z + (g.r - 2.2) * Math.cos(b)], P), iso([g.x, g.y + (g.r - 0.3) * Math.sin(b), g.z + (g.r - 0.3) * Math.cos(b)], P)]));
    }
    const spokes: string[] = [];
    for (let k = 0; k < 4; k++) {
      const b = beta + (k / 4) * Math.PI * 2;
      spokes.push(pathOf([iso([g.x, g.y + 2.4 * Math.sin(b), g.z + 2.4 * Math.cos(b)], P), iso([g.x, g.y + (g.r - 3.4) * Math.sin(b), g.z + (g.r - 3.4) * Math.cos(b)], P)]));
    }
    gearEl.innerHTML = `<path class="iso-line" data-tone="lo" d="${teeth.join('')}"/><path class="iso-line" data-tone="mid" d="${spokes.join('')}"/>`;

    h.say(`Paso ${String(step + 1).padStart(2, '0')} · ${STEPS[step]}`);
  };
  return { apply, still: TRIGGER(1) + 0.05 };
};

export default create;
