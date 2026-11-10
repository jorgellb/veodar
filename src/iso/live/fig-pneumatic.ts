import { iso, lineOnTop, pathOf } from '../iso-kit.mjs';
import { tr, ease, helpers, polar, span, type Factory, type Proj, type Vec3 } from './runtime';

// Phases in seconds: [route or station, start, end].
const LEGS: [number, number, number][] = [
  [0, 0.2, 1.6],
  [1, 2.1, 3.3],
  [2, 4.0, 5.2],
  [3, 5.7, 7.0],
];
const CYCLE = 9;
const CAP_LEN = 9;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const caps = M.routes.map((_: unknown, i: number) => h.q(`[data-part="cap-${i}"]`));
  const lines = h.qa('[data-line]');
  const needle = h.q('[data-part="needle"]');
  const apiLamp = h.q('[data-part="api-lamp"]');
  const dbLamp = h.q('[data-part="db-lamp"]');
  const g = M.gauge;

  const lengths = (M.routes as Vec3[][]).map((pts) => {
    const acc = [0];
    for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1], pts[i][2] - pts[i - 1][2]));
    return acc;
  });
  const sub = (r: number, from: number, to: number) => {
    const pts = M.routes[r] as Vec3[];
    const acc = lengths[r];
    const pick: Vec3[] = [];
    const lerpAt = (s: number): Vec3 => {
      let i = 1;
      while (i < acc.length - 1 && acc[i] < s) i++;
      const t = (s - acc[i - 1]) / (acc[i] - acc[i - 1] || 1);
      const a = pts[i - 1];
      const b = pts[i];
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    };
    pick.push(lerpAt(from));
    for (let i = 0; i < acc.length; i++) if (acc[i] > from && acc[i] < to) pick.push(pts[i]);
    pick.push(lerpAt(to));
    return pathOf(pick.map((p) => iso(p, P)));
  };

  let needleV = 0;
  let needleX = 0;
  const apply = (t: number, dt: number) => {
    const u = t % CYCLE;
    let text = tr('En espera', 'Idle');
    LEGS.forEach(([r, a, b], i) => {
      const total = lengths[r][lengths[r].length - 1];
      if (u >= a && u <= b) {
        const head = ease(span(u, a, b)) * (total + CAP_LEN);
        const from = Math.max(0, head - CAP_LEN);
        const to = Math.min(total, head);
        caps[r].setAttribute('d', to > from + 0.2 ? sub(r, from, to) : '');
      } else caps[r].setAttribute('d', '');
      if (u >= a && u < b) text = (tr('es', 'en') === 'en'
          ? ['GET /api/orders/142 → API', 'SELECT … FROM orders WHERE id = 142', '1 row · 6 ms → API', '200 OK · JSON 1.2 KB → browser']
          : ['GET /api/pedidos/142 → API', 'SELECT … FROM pedidos WHERE id = 142', '1 fila · 6 ms → API', '200 OK · JSON 1,2 KB → navegador'])[i];
    });
    const atApi = (u > 1.6 && u < 2.1) || (u > 5.2 && u < 5.7);
    const atDb = u > 3.3 && u < 4.0;
    if (u > 1.6 && u < 2.1) text = tr('API: sesión válida, permiso de lectura', 'API: valid session, read permission');
    if (atDb) text = tr('Base de datos: índice por id', 'Database: index by id');
    if (u > 5.2 && u < 5.7) text = tr('API: respuesta firmada', 'API: signed response');
    if (u >= 7.0) text = tr('Pintado en pantalla · 48 ms en total', 'Painted on screen · 48 ms in total');
    h.on(apiLamp, atApi);
    h.on(dbLamp, atDb);
    // Screen fills line by line once the response lands.
    lines.forEach((el, i) => el.setAttribute('opacity', (ease(span(u, 7.0 + i * 0.18, 7.3 + i * 0.18)) * (1 - span(u, 8.6, 8.95))).toFixed(3)));
    // Latency gauge: elapsed ms of the round trip (48 ms full scale 60).
    const ms = u < 0.2 ? 0 : u < 7 ? (48 * (u - 0.2)) / 6.8 : u < 8.6 ? 48 : 0;
    const target = ms / 60;
    if (dt > 0) {
      needleV += (90 * (target - needleX) - 2 * Math.sqrt(90) * 0.7 * needleV) * dt;
      needleX += needleV * dt;
    } else needleX = target;
    const a = -0.75 * Math.PI + Math.max(0, Math.min(1.02, needleX)) * 1.5 * Math.PI;
    needle.innerHTML = `<path class="iso-line" data-tone="lit" data-free="end" style="stroke-width:1.5px" d="${lineOnTop(polar(g.x, g.y, 1.8, a + Math.PI), polar(g.x, g.y, g.r - 0.6, a), g.top, P)}"/>`;
    h.say(text);
  };
  return { apply, still: 2.6 };
};

export default create;
