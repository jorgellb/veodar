import { iso, radialTicks, translateAlong } from '../iso-kit.mjs';
import { ease, helpers, span, type Factory, type Proj, type Vec3 } from './runtime';

const CYCLE = 11.5;
const SCAN: [number, number] = [0.7, 6.6];
const HOLD = 9.9;
const SPIN = 0.85;

// Icosahedron: unit vertices and outward-wound faces.
const PHI = (1 + Math.sqrt(5)) / 2;
const NORM = Math.hypot(1, PHI);
const VERTS: Vec3[] = (
  [
    [-1, PHI, 0],
    [1, PHI, 0],
    [-1, -PHI, 0],
    [1, -PHI, 0],
    [0, -1, PHI],
    [0, 1, PHI],
    [0, -1, -PHI],
    [0, 1, -PHI],
    [PHI, 0, -1],
    [PHI, 0, 1],
    [-PHI, 0, -1],
    [-PHI, 0, 1],
  ] as Vec3[]
).map(([x, y, z]) => [x / NORM, -z / NORM, y / NORM]); // quarter turn about x: an edge on top, winding kept
const FACES = [
  [0, 11, 5],
  [0, 5, 1],
  [0, 1, 7],
  [0, 7, 10],
  [0, 10, 11],
  [1, 5, 9],
  [5, 11, 4],
  [11, 10, 2],
  [10, 7, 6],
  [7, 1, 8],
  [3, 9, 4],
  [3, 4, 2],
  [3, 2, 6],
  [3, 6, 8],
  [3, 8, 9],
  [4, 9, 5],
  [2, 4, 11],
  [6, 2, 10],
  [8, 6, 7],
  [9, 8, 1],
];
const EDGES: [number, number][] = [];
for (const f of FACES)
  for (let i = 0; i < 3; i++) {
    const a = f[i];
    const b = f[(i + 1) % 3];
    if (a < b) EDGES.push([a, b]);
  }

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const objectEl = h.q('[data-part="object"]');
  const beam = h.q('[data-part="beam"]');
  const ticks = h.q('[data-part="ticks"]');
  const head = h.q('[data-part="head"]');
  const laser = h.q('[data-part="laser"]');
  const mesh = h.q('[data-part="mesh"]');
  const facesText = h.q<SVGTextElement>('[data-part="faces"]');
  const lampScan = h.q('[data-part="scan"]');
  const lampDone = h.q('[data-part="done"]');
  const O = M.obj;
  const T = M.table;
  const Vw = M.view;
  const a = (P.azimuth * Math.PI) / 180;
  const e = (P.elevation * Math.PI) / 180;
  const view: Vec3 = [Math.cos(a) * Math.cos(e), Math.sin(a) * Math.cos(e), Math.sin(e)];
  const light: Vec3 = [-Math.sin(a) * 0.74, Math.cos(a) * 0.74, 0.67];
  const zMin = O.z - O.r - 1;
  const zMax = O.z + O.r + 1;
  const dot = (p: Vec3, q: Vec3) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
  const fmt = (p: number[]) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

  const apply = (t: number) => {
    const u = t % CYCLE;
    const theta = t * SPIN;
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    const world = VERTS.map(([x, y, z]): Vec3 => [O.x + (x * c - y * s) * O.r, O.y + (x * s + y * c) * O.r, O.z + z * O.r]);
    const scanning = u >= SCAN[0] && u < SCAN[1];
    const zs = u < SCAN[0] ? zMin : u < SCAN[1] ? zMin + (zMax - zMin) * ((u - SCAN[0]) / (SCAN[1] - SCAN[0])) : zMax;
    const cleared = u >= HOLD;
    const level = cleared ? zMin : zs;

    // The solid: visible faces, shaded by how they face the light; scanned faces take a tint.
    let faces = '';
    let cut = '';
    let nearest: { d: number; p: Vec3 } | null = null;
    let scanned = 0;
    for (const f of FACES) {
      const [A, B, C] = [world[f[0]], world[f[1]], world[f[2]]];
      const n: Vec3 = [
        (B[1] - A[1]) * (C[2] - A[2]) - (B[2] - A[2]) * (C[1] - A[1]),
        (B[2] - A[2]) * (C[0] - A[0]) - (B[0] - A[0]) * (C[2] - A[2]),
        (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]),
      ];
      const len = Math.hypot(n[0], n[1], n[2]) || 1;
      const unit: Vec3 = [n[0] / len, n[1] / len, n[2] / len];
      const below = Math.max(A[2], B[2], C[2]) <= level;
      if (below) scanned += 1;
      if (dot(unit, view) <= 0) continue;
      const lit = (dot(unit, light) + 1) / 2;
      const tone = unit[2] > 0.72 ? 'var(--anatomy-top)' : `var(--anatomy-shade-${Math.max(0, Math.min(3, Math.floor(lit * 4)))})`;
      const d = `M${fmt(iso(A, P))}L${fmt(iso(B, P))}L${fmt(iso(C, P))}Z`;
      faces += `<path d="${d}" fill="${tone}" stroke="var(--anatomy-hi)" stroke-width=".75" stroke-linejoin="round"/>`;
      if (below && !cleared) faces += `<path d="${d}" fill="#ff5a1f" fill-opacity=".13"/>`;
      // Where the laser plane crosses this face.
      if (scanning) {
        const hit: Vec3[] = [];
        for (const [p, q] of [
          [A, B],
          [B, C],
          [C, A],
        ] as [Vec3, Vec3][]) {
          if ((p[2] - zs) * (q[2] - zs) < 0) {
            const k = (zs - p[2]) / (q[2] - p[2]);
            hit.push([p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k, zs]);
          }
        }
        if (hit.length === 2) {
          cut += `M${fmt(iso(hit[0], P))}L${fmt(iso(hit[1], P))}`;
          const mid: Vec3 = [(hit[0][0] + hit[1][0]) / 2, (hit[0][1] + hit[1][1]) / 2, zs];
          const dist = Math.hypot(mid[0] - M.tower.x, mid[1] - M.tower.y);
          if (!nearest || dist < nearest.d) nearest = { d: dist, p: mid };
        }
      }
    }
    if (cut) faces += `<path class="veo-glow" d="${cut}" fill="none" stroke="#ff5a1f" stroke-width="1.8" stroke-linecap="round"/>`;
    objectEl.innerHTML = faces;

    // Laser head rides at the scan height; the beam reaches the nearest lit point.
    const headZ = cleared ? zMin + (zMax - zMin) * (1 - ease(span(u, HOLD, CYCLE - 0.3))) : zs;
    head.setAttribute('transform', translateAlong(P, [0, 0, headZ - M.tower.rest]));
    h.on(laser, scanning);
    if (scanning && nearest) {
      const from = iso([M.tower.x, M.tower.y, zs], P);
      const to = iso((nearest as { p: Vec3 }).p, P);
      beam.innerHTML = `<path d="M${fmt(from)}L${fmt(to)}" stroke="#ff5a1f" stroke-width="1" stroke-opacity=".75" fill="none"/>`;
    } else beam.innerHTML = '';

    // Table ticks turn with the solid.
    const tk = radialTicks(T.x, T.y, T.r - 1, 36, 3, T.z, [1.4, 3], P, theta);
    ticks.innerHTML = `<path class="iso-line" data-tone="lo" d="${tk.minor}"/><path class="iso-line" data-tone="mid" d="${tk.major}"/>`;

    // Monitor: the mesh, only as far as the laser has gone.
    const B0 = 0.6;
    const tilt = 0.36;
    const proj = ([x, y, z]: Vec3) => {
      const rx = (x - O.x) * Math.cos(B0) - (y - O.y) * Math.sin(B0);
      const ry = (x - O.x) * Math.sin(B0) + (y - O.y) * Math.cos(B0);
      return [Vw.cx + rx * Vw.s, Vw.cy - ((z - O.z) * Math.cos(tilt) - ry * Math.sin(tilt)) * Vw.s];
    };
    let wire = '';
    for (const [i, j] of EDGES) {
      let p = world[i];
      let q = world[j];
      if (p[2] > q[2]) [p, q] = [q, p];
      if (p[2] > level) continue;
      if (q[2] > level) {
        const k = (level - p[2]) / (q[2] - p[2]);
        q = [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k, level];
      }
      wire += `M${fmt(proj(p))}L${fmt(proj(q))}`;
    }
    let dots = '';
    for (const p of world) if (p[2] <= level) dots += `<circle class="scr-f" data-t="hi" cx="${proj(p)[0].toFixed(1)}" cy="${proj(p)[1].toFixed(1)}" r=".8"/>`;
    const fade = cleared ? 1 - span(u, HOLD, HOLD + 0.5) : 1;
    let html = `<g opacity="${(cleared ? fade : 1).toFixed(2)}"><path class="scr-s" data-t="hi" d="${cleared ? '' : wire}"/>${cleared ? '' : dots}</g>`;
    if (scanning) {
      const y = Vw.cy - (zs - O.z) * Math.cos(tilt) * Vw.s;
      html += `<path class="scr-s scr-glow" data-t="acc" d="M${(Vw.cx - 24).toFixed(1)} ${y.toFixed(1)}h48"/>`;
    }
    mesh.innerHTML = html;
    const label = `caras ${String(cleared ? 0 : scanned).padStart(2, '0')}/20`;
    if (facesText.textContent !== label) facesText.textContent = label;
    h.on(lampScan, scanning);
    h.on(lampDone, u >= SCAN[1] && !cleared);

    h.say(
      scanning
        ? `Escaneando · ${Math.round(((zs - zMin) / (zMax - zMin)) * 100)} % · ${scanned} de 20 caras`
        : cleared
          ? 'Pieza nueva en el plato'
          : u < SCAN[0]
            ? 'Pieza en el plato · láser listo'
            : 'Malla completa · 20 caras · gira a 60 fps',
    );
  };
  return { apply, still: 4.2 };
};

export default create;
