import { iso, lineOnTop, pathOf } from '../iso-kit.mjs';
import { tr, ease, helpers, lerp, polar, span, type Factory, type Proj, type Vec3 } from './runtime';

const CYCLE = 12.6;
const PLUG = (i: number): [number, number] => [0.6 + i * 1.05, 0.6 + i * 1.05 + 0.85];
const LAUNCH = 7.5;
const RESET = 11.3;
const OLD = ['/inicio.php', '/servicios.html', '/blog?p=12', '/contacto.htm', '/tienda/cat-3', '/quienes-somos.asp'];
const NEW = ['/', '/servicios/', '/blog/ia-facturas/', '/contacto/', '/tienda/sillas/', '/estudio/'];

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const cables = h.q('[data-part="cables"]');
  const needleEl = h.q('[data-part="needle"]');
  const count = h.q<SVGTextElement>('[data-part="count"]');
  const broken = h.q<SVGTextElement>('[data-part="broken"]');
  const liveLamp = h.q('[data-part="live"]');
  const lamps = new Map(h.qa<SVGCircleElement>('[data-lamp]').map((el) => [el.dataset.lamp!, el]));
  const G = M.gauge;
  const n = M.xs.length as number;
  let needle = 0.78;
  let needleV = 0;

  // A patch cable as a sagging curve from the old jack to wherever its plug is.
  const cable = (i: number, f: number) => {
    const p0: Vec3 = [M.xs[i], M.fy + 1.5, M.zOld];
    const target: Vec3 = [M.xs[M.perm[i]], M.fy + 1.5, M.zNew];
    const parked: Vec3 = [M.xs[i], M.fy + 9, M.zOld - 13];
    const e = ease(f);
    const end: Vec3 = [lerp(parked[0], target[0], e), lerp(parked[1], target[1], e) + Math.sin(e * Math.PI) * 8, lerp(parked[2], target[2], e)];
    const sag = 6 + e * 12;
    const c0: Vec3 = [p0[0], p0[1] + 12 + e * 6, p0[2] - 4 - e * 10];
    const c1: Vec3 = [end[0], end[1] + 10 + e * 6, end[2] - sag];
    const pts: Vec3[] = [];
    for (let k = 0; k <= 22; k++) {
      const t = k / 22;
      const u = 1 - t;
      pts.push([0, 1, 2].map((d) => u * u * u * p0[d] + 3 * u * u * t * c0[d] + 3 * u * t * t * c1[d] + t * t * t * end[d]) as Vec3);
    }
    return pts;
  };
  const lamp = (key: string, color: string) => {
    const el = lamps.get(key);
    if (el && el.style.fill !== color) el.style.fill = color;
  };

  const apply = (t: number, dt: number) => {
    const u = t % CYCLE;
    const back = u >= RESET ? 1 - ease(span(u, RESET, RESET + 0.8)) : 1;
    let html = '';
    let done = 0;
    let active = -1;
    for (let i = 0; i < n; i++) {
      const [a, b] = PLUG(i);
      const f = Math.min(span(u, a, b), back);
      if (u >= a && u < b) active = i;
      const plugged = f >= 1;
      if (plugged) done += 1;
      // Lamps: red blink while an old URL has no destination, steady once patched.
      const blink = Math.floor(t * 3.2) % 2 === 0;
      lamp(`old-${i}`, plugged ? '#ff5a1f' : blink ? '#e5484d' : 'var(--anatomy-faint)');
      lamp(`new-${M.perm[i]}`, plugged ? '#ff5a1f' : 'var(--anatomy-faint)');
      if (f <= 0) continue;
      const pts = cable(i, f);
      const d = pathOf(pts.map((p) => iso(p, P)));
      const on = i === active ? ' data-on' : '';
      html += `<g class="veo-cable"${on}><path class="veo-cable-edge" d="${d}"/><path class="veo-cable-core" d="${d}"/></g>`;
      const [ex, ey] = iso(pts[pts.length - 1], P);
      html += `<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="2.7" fill="var(--anatomy-paper)" stroke="var(--anatomy-hi)" stroke-width="1"/>`;
      // After launch, visits ride each cable from the old address to the new one.
      if (u >= LAUNCH && u < RESET && plugged) {
        const phase = ((u - LAUNCH) * 0.7 + i * 0.37) % 1;
        const idx = Math.min(pts.length - 1, Math.floor(phase * pts.length));
        const [bx, by] = iso(pts[idx], P);
        html += `<circle class="veo-bead" cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="2"/>`;
      }
    }
    cables.innerHTML = html;

    const label = `301 · ${done}/${n}`;
    if (count.textContent !== label) count.textContent = label;
    const rest = n - done;
    const note = rest ? tr(`${rest} sin destino`, `${rest} unmapped`) : tr('0 enlaces rotos', '0 broken links');
    if (broken.textContent !== note) broken.textContent = note;
    const launched = u >= LAUNCH && u < RESET;
    h.on(liveLamp, launched);

    // Traffic: steady before, a small kick at launch, then it settles a touch higher.
    const target = launched ? 0.84 : 0.78;
    if (dt > 0) {
      needleV += (60 * (target - needle) - 2 * Math.sqrt(60) * 0.45 * needleV) * dt;
      needle += needleV * dt;
    } else needle = target;
    const a = G.from + needle * G.span;
    needleEl.innerHTML = `<path class="iso-line" data-tone="lit" data-free="end" style="stroke-width:1.7px" d="${lineOnTop(polar(G.x, G.y, 3, a + Math.PI), polar(G.x, G.y, G.r - 3.6, a), G.top, P)}"/>`;

    h.say(
      u >= RESET
        ? tr('Siguiente migración', 'Next migration')
        : launched
          ? tr('Lanzado · 6 de 6 redirigidas · el tráfico no cae', 'Launched · 6 of 6 redirected · traffic holds')
          : active >= 0
            ? `301 · ${OLD[active]} → ${NEW[active]}`
            : done === n
              ? tr('Mapa completo · 0 enlaces rotos · listo para lanzar', 'Map complete · 0 broken links · ready to launch')
              : tr(`${rest} URL antiguas sin destino: serían 404`, `${rest} old URLs with no destination: they'd be 404s`),
    );
  };
  return { apply, still: 4.4 };
};

export default create;
