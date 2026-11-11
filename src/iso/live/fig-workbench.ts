// The workbench: three projects in turn, each pulling forward the modules it needs.
import { lineOnTop } from '../iso-kit.mjs';
import { tr, ease, helpers, lerp, polar, shift, span, type Factory, type Proj } from './runtime';

const STEP = 4.6;
const PROJECTS = [
  [1, 1, 0, 0],
  [0, 1, 1, 1],
  [1, 1, 1, 1],
];
const ANGLES = [-0.9, 0, 0.9];

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const modules = [0, 1, 2, 3].map((i) => h.q(`[data-part="mod-${i}"]`));
  const links = [0, 1, 2].map((i) => h.q(`[data-part="link-${i}"]`));
  const pointer = h.q<SVGPathElement>('[data-part="sel"]');
  const K = M.knob;
  const names = [tr('contenido', 'content'), tr('interfaz', 'interface'), tr('conexiones', 'connections'), tr('datos', 'data')];

  const apply = (t: number) => {
    const u = t % (STEP * PROJECTS.length);
    const n = Math.floor(u / STEP);
    const v = u % STEP;
    const now = PROJECTS[n];
    const before = PROJECTS[(n + PROJECTS.length - 1) % PROJECTS.length];
    const move = ease(span(v, 0.3, 1.5));
    modules.forEach((module, i) => shift(module, P, [0, M.travel * lerp(before[i], now[i], ease(span(v, 0.3 + i * 0.12, 1.4 + i * 0.12))), 0]));
    links.forEach((link, i) => h.on(link, v > 1.9 && now[i] === 1 && now[i + 1] === 1));
    const angle = lerp(ANGLES[(n + 2) % 3], ANGLES[n], move);
    pointer.setAttribute('d', lineOnTop([K.x, K.y], polar(K.x, K.y, K.r, angle), K.z, P));
    const used = names.filter((_, i) => now[i]).join(' + ');
    h.say(v < 1.9 ? tr(`Proyecto ${'ABC'[n]} · se monta`, `Project ${'ABC'[n]} · being assembled`) : tr(`Proyecto ${'ABC'[n]} · ${used}`, `Project ${'ABC'[n]} · ${used}`));
  };
  return { apply, still: STEP + 3 };
};

export default create;
