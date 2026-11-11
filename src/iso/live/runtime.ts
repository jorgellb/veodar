import { cameraOf, depthOf, iso, pathOf, towardViewer, translateAlong } from '../iso-kit.mjs';

export type Vec3 = [number, number, number];
export type Proj = { origin: [number, number]; scale: number; azimuth: number; elevation: number };
export type Live = { apply: (t: number, dt: number) => void; still?: number };
export type Factory = (root: HTMLElement, M: any) => Live;

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const ease = (v: number) => {
  const t = clamp01(v);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
export const easeOut = (v: number) => 1 - Math.pow(1 - clamp01(v), 3);
export const span = (u: number, a: number, b: number) => clamp01((u - a) / (b - a));
/** Bump: 0 → 1 → 0 over [a, b] with eased edges of width `edge`. */
export const pulse = (u: number, a: number, b: number, edge = 0.15) =>
  Math.min(ease((u - a) / edge), ease((b - u) / edge));
/** True on English pages (<html lang="en">). */
export const isEn = () => typeof document !== 'undefined' && document.documentElement.lang === 'en';
/** Pick the Spanish or English string for the page. */
export const tr = (es: string, en: string) => (isEn() ? en : es);
/** A number with the page's decimal separator: 0,80 in Spanish, 0.80 in English. */
export const fmt = (v: number, digits = 2) => (isEn() ? v.toFixed(digits) : v.toFixed(digits).replace('.', ','));
export const polar = (cx: number, cy: number, r: number, a: number): [number, number] => [cx + Math.sin(a) * r, cy - Math.cos(a) * r];

/** A point along a polyline of screen points, by length: `at(0)` is its start, `at(1)` its end. */
export function along(points: number[][]) {
  const acc = [0];
  for (let i = 1; i < points.length; i++) acc.push(acc[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
  const total = acc[acc.length - 1] || 1;
  return (f: number): [number, number] => {
    const s = clamp01(f) * total;
    let i = 1;
    while (i < acc.length - 1 && acc[i] < s) i++;
    const t = (s - acc[i - 1]) / (acc[i] - acc[i - 1] || 1);
    return [points[i - 1][0] + (points[i][0] - points[i - 1][0]) * t, points[i - 1][1] + (points[i][1] - points[i - 1][1]) * t];
  };
}
/** Puts a bead on a route while `f` is between 0 and 1, and hides it otherwise. */
export function ride(bead: Element | undefined, at: (f: number) => [number, number], f: number, back = false) {
  if (!bead) return;
  if (f <= 0 || f >= 1) return bead.setAttribute('opacity', '0');
  const [x, y] = at(back ? 1 - ease(f) : ease(f));
  bead.setAttribute('opacity', '1');
  bead.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
}
/** Moves a group by a world offset (the drawing itself stays where it was built). */
export const shift = (el: Element | null | undefined, P: Proj, by: Vec3) => el?.setAttribute('transform', translateAlong(P, by));
export const fade = (el: Element | null | undefined, value: number) => el?.setAttribute('opacity', clamp01(value).toFixed(2));
export const write = (el: Element | null | undefined, text: string) => {
  if (el && el.textContent !== text) el.textContent = text;
};

/** A ring around a point, tilted and turned, as the half behind the point and the half in front (iso/lib.mjs draws the still one). */
export function gyroRing(center: Vec3, radius: number, tilt: number, turn: number, P: Proj, steps = 56) {
  const { sinA, cosA, sinE, cosE } = cameraOf(P);
  const view = [cosA * cosE, sinA * cosE, sinE];
  const front: string[] = [];
  const back: string[] = [];
  let run: number[][] = [];
  let near: boolean | null = null;
  const [ct, st, cz, sz] = [Math.cos(tilt), Math.sin(tilt), Math.cos(turn), Math.sin(turn)];
  for (let i = 0; i <= steps; i++) {
    const th = (i / steps) * Math.PI * 2;
    const x0 = radius * Math.cos(th);
    const y0 = radius * Math.sin(th) * ct;
    const z0 = radius * Math.sin(th) * st;
    const rel = [x0 * cz - y0 * sz, x0 * sz + y0 * cz, z0];
    const isNear = rel[0] * view[0] + rel[1] * view[1] + rel[2] * view[2] > 0;
    const flat = iso([center[0] + rel[0], center[1] + rel[1], center[2] + rel[2]], P);
    if (near === null) near = isNear;
    if (isNear !== near) {
      run.push(flat);
      (near ? front : back).push(pathOf(run));
      run = [flat];
      near = isNear;
      continue;
    }
    run.push(flat);
  }
  if (run.length > 1) (near ? front : back).push(pathOf(run));
  return { front: front.join(''), back: back.join('') };
}

export function coilZ(z0: number, z1: number, cx: number, cy: number, radius: number, turns: number, P: Proj) {
  const count = Math.max(12, Math.round(turns * 18));
  const [vx, vy] = towardViewer(P);
  const back: string[] = [];
  const front: string[] = [];
  let run: number[][] = [];
  let near: boolean | null = null;
  for (let i = 0; i <= count; i++) {
    const share = i / count;
    const angle = share * turns * Math.PI * 2;
    const flat = iso([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle), z0 + (z1 - z0) * share], P);
    const facing = Math.cos(angle) * vx + Math.sin(angle) * vy > 0;
    if (near === null) near = facing;
    if (facing !== near) {
      run.push(flat);
      (near ? front : back).push(pathOf(run));
      run = [flat];
      near = facing;
      continue;
    }
    run.push(flat);
  }
  if (run.length > 1) (near ? front : back).push(pathOf(run));
  return { back: back.join(''), front: front.join('') };
}

export function helpers(root: HTMLElement, P: Proj) {
  const q = <E extends Element = SVGGElement>(sel: string) => root.querySelector<E>(sel)!;
  const qa = <E extends Element = SVGGElement>(sel: string) => [...root.querySelectorAll<E>(sel)];
  const status = root.querySelector<HTMLElement>('[data-status]');
  const say = (text: string) => {
    if (status && status.textContent !== text) status.textContent = text;
  };
  const on = (el: Element | null | undefined, value: boolean, attr = 'data-on') => {
    if (!el) return;
    if (value) el.setAttribute(attr, '');
    else el.removeAttribute(attr);
  };
  const stack = root.querySelector<SVGGElement>('[data-stack]');
  const items = stack ? ([...stack.children] as SVGGElement[]) : [];
  let order = '';
  const sort = (keys: Map<Element, Vec3>) => {
    if (!stack) return;
    const scored = items.map((el) => ({
      el,
      d: depthOf(keys.get(el) ?? [Number(el.dataset.x), Number(el.dataset.y), Number(el.dataset.z)], P),
    }));
    scored.sort((a, b) => a.d - b.d);
    const next = scored.map((s) => s.el.dataset.item).join(',');
    if (next === order) return;
    order = next;
    for (const s of scored) stack.appendChild(s.el);
  };
  const moving = (name: string) => items.find((el) => el.dataset.moves === name)!;
  const keyOf = (el: SVGGElement): Vec3 => [Number(el.dataset.x), Number(el.dataset.y), Number(el.dataset.z)];
  return { q, qa, say, on, sort, moving, keyOf };
}

/** Drives a figure: runs only while visible, holds a still frame under reduced motion. */
export function drive(root: HTMLElement, live: Live) {
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let clock = 0;
  let last = 0;
  let frame = 0;
  let visible = false;
  const tick = (now: number) => {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    clock += dt;
    live.apply(clock, dt);
    frame = visible && !still.matches && document.visibilityState === 'visible' ? requestAnimationFrame(tick) : 0;
  };
  const run = () => {
    if (frame || still.matches || !visible || document.visibilityState !== 'visible') return;
    last = 0;
    frame = requestAnimationFrame(tick);
  };
  const rest = () => {
    clock = live.still ?? 0;
    live.apply(clock, 0);
  };
  if (still.matches) rest();
  else live.apply(0, 0);
  still.addEventListener('change', () => (still.matches ? rest() : run()));
  document.addEventListener('visibilitychange', run);
  new IntersectionObserver(
    (entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      run();
    },
    { rootMargin: '80px' },
  ).observe(root);
}
