import { ringOf, extrude, solidSvg, translateAlong } from '../iso-kit.mjs';
import { ease, helpers, span, type Factory, type Proj } from './runtime';

const CYCLE = 11;
const FIRE = (i: number) => 1.4 + i * 1.6;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const arms = M.tools.map((_: string, i: number) => h.q(`[data-part="arm-${i}"]`));
  const lamps = M.tools.map((_: string, i: number) => h.q(`[data-part="lamp-${i}"]`));
  const coils = M.tools.map((_: string, i: number) => h.q(`[data-part="coil-${i}"]`));
  const beads = M.tools.map((_: string, i: number) => h.q(`[data-part="bead-${i}"]`));
  const master = h.q('[data-part="master"]');
  const cpu = h.q('[data-part="cpu"]');
  const keyEl = h.q('[data-part="key"]');
  const K = M.key;

  const rotated = (plan: { x: number; y: number; w: number; d: number; r: number }, a: number) =>
    ringOf(plan, 3).map(([px, py]: number[]) => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      return [K.x + px * c - py * s, K.y + px * s + py * c];
    });
  let lastAngle = NaN;
  const drawKey = (a: number) => {
    if (Math.abs(a - lastAngle) < 1e-3) return;
    lastAngle = a;
    const shaft = extrude(rotated({ x: -1.1, y: -5, w: 2.2, d: 5, r: 0.4 }, a), K.top, 1.2, P, { bevel: 0 });
    const bow = extrude(rotated({ x: -4.6, y: -13, w: 9.2, d: 8.4, r: 3 }, a), K.top, 2.4, P, { bevel: 0.4 });
    keyEl.innerHTML = solidSvg(shaft, { tone: 'mid' }) + solidSvg(bow, { tone: 'hi', crease: 'lo' });
  };

  const pointOn = (pts: number[][], f: number) => {
    const seg: number[] = [];
    let total = 0;
    for (let i = 1; i < pts.length; i++) {
      const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      seg.push(d);
      total += d;
    }
    let left = Math.max(0, Math.min(1, f)) * total;
    for (let i = 0; i < seg.length; i++) {
      if (left <= seg[i]) {
        const t = seg[i] ? left / seg[i] : 0;
        return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t];
      }
      left -= seg[i];
    }
    return pts[pts.length - 1];
  };

  const apply = (t: number) => {
    const u = t % CYCLE;
    const keyOn = ease(span(u, 0.3, 1.0)) * (1 - ease(span(u, 9.6, 10.2)));
    drawKey(-Math.PI / 2 + keyOn * (Math.PI / 2));
    const powered = u > 0.9 && u < 9.6;
    h.on(master, powered);

    let text = powered ? 'Llave girada: credencial activa' : u >= 9.6 ? 'Credencial revocada: el carril se apaga' : 'Sin credencial';
    let cpuOn = false;
    M.tools.forEach((tool: string, i: number) => {
      const s = FIRE(i);
      const travel = span(u, s, s + 0.5);
      const inFlight = u >= s && u < s + 0.55;
      beads[i].setAttribute('opacity', inFlight ? '1' : '0');
      if (inFlight) {
        const [x, y] = pointOn(M.wires[i], ease(travel));
        beads[i].setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
      }
      if (u >= s && u < s + 0.2) cpuOn = true;
      const allowed = M.allowed[i] && powered;
      const pull = allowed ? ease(span(u, s + 0.5, s + 0.68)) * (1 - ease(span(u, s + 1.3, s + 1.5))) : 0;
      arms[i].setAttribute('transform', translateAlong(P, [0, 0, -M.armDrop * pull]));
      h.on(lamps[i], allowed && u > s + 0.56 && u < s + 1.42);
      h.on(coils[i], allowed && u > s + 0.48 && u < s + 1.36);
      const blink = !M.allowed[i] && u > s + 0.5 && u < s + 1.4 && Math.floor((u - s - 0.5) / 0.22) % 2 === 0;
      h.on(lamps[i], blink, 'data-err');
      if (u >= s && u < s + 1.5) {
        if (u < s + 0.5) text = `Llamada: ${tool}()`;
        else text = M.allowed[i] ? `${tool} · permitido` : `${tool} · bloqueado, sin permiso`;
      }
    });
    h.on(cpu, cpuOn);
    h.say(text);
  };

  return { apply, still: FIRE(2) + 0.9 };
};

export default create;
