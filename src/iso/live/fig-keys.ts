import { iso, pathOf, segment, translateAlong } from '../iso-kit.mjs';
import { ease, helpers, lerp, span, type Factory, type Proj, type Vec3 } from './runtime';

const EVENT = 4.6;
const USES = [0, 1, 2, 3];
const ACCESS = ['lectura de pedidos', 'alta de oportunidades', 'bandeja de soporte', 'copias de seguridad'];

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const hangs = M.xs.map((_: number, i: number) => h.q(`[data-part="hang-${i}"]`));
  const mover = h.q('[data-part="mover"]');
  const moverKey = h.q('[data-part="mover-key"]');
  const lampOpen = h.q('[data-part="open"]');
  const lampPrint = h.q('[data-part="print"]');
  const paperEl = h.q('[data-part="paper"]');
  const sys = h.q<SVGTextElement>('[data-part="sys"]');
  const sys2 = h.q<SVGTextElement>('[data-part="sys2"]');
  const svg = root.querySelector('svg')!;
  const clipId = `keys-clip-${Math.random().toString(36).slice(2, 7)}`;
  const [sx, sy] = iso([M.slot.x, M.slot.y, M.slot.z], P);
  const vb = svg.viewBox.baseVal;
  svg.insertAdjacentHTML('afterbegin', `<defs><clipPath id="${clipId}"><rect x="${vb.x}" y="${vb.y}" width="${vb.width}" height="${(sy - vb.y + 0.4).toFixed(1)}"/></clipPath></defs>`);
  void sx;

  const hz = M.hookZ;
  const rest = (x: number): Vec3 => [x, 0, 0];
  const lineH = 3;

  const paper = (lines: number) => {
    const p = M.paper;
    const top = p.z + 4 + lines * lineH;
    const quad = [iso([p.x0, p.y, p.z], P), iso([p.x1, p.y, p.z], P), iso([p.x1, p.y, top], P), iso([p.x0, p.y, top], P)];
    let marks = '';
    for (let i = 0; i < lines; i++) {
      const z = top - 2.6 - i * lineH;
      const len = [17, 12, 19, 14][i % 4];
      marks += segment([p.x0 + 2.4, p.y, z], [p.x0 + 2.4 + len, p.y, z], P);
    }
    return `<path class="iso-fill" d="${pathOf(quad, true)}" style="fill:#fffefb"/><path class="iso-line" data-tone="mid" d="${pathOf(quad, true)}"/>${marks ? `<path class="iso-line" data-tone="hi" data-free="end" d="${marks}"/>` : ''}`;
  };
  let paperLines = -1;

  const apply = (t: number) => {
    const n = Math.floor(t / EVENT);
    const u = t - n * EVENT;
    const which = USES[n % USES.length];
    const x = M.xs[which];
    // Path: hook → out → above the slot → in → out → back.
    const hook: Vec3 = [x, 0, 0];
    const outPt: Vec3 = [x, 12, 2];
    const above: Vec3 = [M.slot.x, M.slot.y - M.keyY, M.slot.z - (hz - 30) + 8];
    const inside: Vec3 = [M.slot.x, M.slot.y - M.keyY, M.slot.z - (hz - 30) - 5];
    const mix = (a: Vec3, b: Vec3, f: number): Vec3 => [lerp(a[0], b[0], f), lerp(a[1], b[1], f), lerp(a[2], b[2], f)];
    let p: Vec3 = hook;
    let text = `Llave ${M.names[which]} · sale del cuadro`;
    if (u < 0.6) p = mix(hook, outPt, ease(span(u, 0, 0.6)));
    else if (u < 1.6) {
      const f = ease(span(u, 0.6, 1.6));
      p = mix(outPt, above, f);
      p[2] += Math.sin(f * Math.PI) * 10;
    } else if (u < 2.0) p = mix(above, inside, ease(span(u, 1.6, 2.0)));
    else if (u < 2.9) {
      p = inside;
      text = `Abre: ${ACCESS[which]} · solo esa puerta`;
    } else if (u < 3.3) p = mix(inside, above, ease(span(u, 2.9, 3.3)));
    else if (u < 4.3) {
      const f = ease(span(u, 3.3, 4.3));
      p = mix(above, outPt, f);
      p[2] += Math.sin(f * Math.PI) * 10;
      text = `Vuelve al gancho · acceso registrado`;
    } else {
      p = mix(outPt, hook, ease(span(u, 4.3, 4.6)));
      text = `Vuelve al gancho · acceso registrado`;
    }
    const away = u > 0.02 && u < 4.58;
    hangs.forEach((el: SVGGElement, i: number) => (el.style.display = i === which && away ? 'none' : ''));
    mover.style.display = away ? '' : 'none';
    moverKey.setAttribute('transform', translateAlong(P, [p[0] - rest(0)[0], p[1], p[2]]));
    if (u > 1.55 && u < 3.35) mover.setAttribute('clip-path', `url(#${clipId})`);
    else mover.removeAttribute('clip-path');
    h.on(lampOpen, u > 2.0 && u < 2.9);
    const inLock = u > 2.0 && u < 2.9;
    const line1 = inLock ? `${String(M.names[which]).toUpperCase()} ABIERTO` : 'BLOQUEADO';
    const line2 = inLock ? ACCESS[which] : 'sin llave no hay acceso';
    if (sys.textContent !== line1) sys.textContent = line1;
    if (sys2.textContent !== line2) sys2.textContent = line2;
    h.on(lampPrint, u > 2.2 && u < 2.7);

    // Paper grows a line per access and is torn off after four.
    const lines = (n % 4) + (u > 2.4 ? 1 : 0);
    if (lines !== paperLines) {
      paperLines = lines;
      paperEl.innerHTML = paper(lines);
    }
    h.say(text);
  };
  return { apply, still: 2.4 };
};

export default create;
