// Shared parts and plumbing for every Veodar figure build.
import { mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../src/iso/iso-kit.mjs";

export { k };
// lathe.mjs is read straight from the anatomy skill (read-only); only builds use it.
export const G = await import(join(homedir(), ".claude/skills/anatomy/kit/lathe.mjs"));

const HERE = dirname(fileURLToPath(import.meta.url));
export const OUT = join(HERE, "../src/generated");
mkdirSync(OUT, { recursive: true });

export function kitFor(P) {
  const at = (point) => k.iso(point, P);
  const S = (paths, style) => k.solidSvg(paths, style);
  const L = (d, style) => (d ? k.lineSvg(d, style) : "");
  const D = (points, style) => (points.length ? k.dotsSvg(points, style) : "");
  const slab = (plan, z, h, tone, { steps = 4, bevel = 0.5, crease, lit, seam, className, inner = "" } = {}) =>
    S(k.slabOf(plan, z, h, P, steps, bevel), {
      tone,
      crease,
      lit,
      className,
      inner: (seam === undefined ? "" : L(k.sideSeam(plan, seam, P, steps), { tone: "faint" })) + inner,
    });
  const cyl = (x, y, r, z, h, tone, { steps = 28, bevel = 0, crease, lit, inner } = {}) =>
    S(k.cylinder(x, y, r, z, h, P, steps, bevel), { tone, crease, lit, inner });
  const screws = (points, z, r = 1.7, size = 0.55) => [
    L(points.map(([x, y]) => k.ring(x, y, r, z, P, 14)).join(""), { tone: "lo" }),
    D(points.map(([x, y]) => at([x, y, z])), { size }),
  ];
  const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], a[2] ?? 0], P) - k.depthOf([b[0], b[1], b[2] ?? 0], P));

  // Rounded slot outline on a vertical face; `axis` is the face normal ("x" or "y").
  const slot = (axis, plane, a0, a1, z0, z1, r = 1.2) => {
    const pts = [];
    const corners = [
      [a1 - r, z1 - r, 0],
      [a0 + r, z1 - r, 0.25],
      [a0 + r, z0 + r, 0.5],
      [a1 - r, z0 + r, 0.75],
    ];
    for (const [ca, cz, turn] of corners) {
      for (let i = 0; i <= 4; i++) {
        const ang = (turn + i / 16) * Math.PI * 2;
        const a = ca + Math.cos(ang) * r;
        const zz = cz + Math.sin(ang) * r;
        pts.push(at(axis === "y" ? [a, plane, zz] : [plane, a, zz]));
      }
    }
    return k.pathOf(pts, true);
  };

  // Base plate on four feet with a groove, corner screws and an optional seam.
  const base = (plate, { z = -12, feet = 22, halo = true } = {}) => {
    const out = [];
    if (halo) out.push(`<path class="iso-halo" d="${k.haloOf(plate, z - 6, 14, P)}"/>`);
    for (const [x, y] of byDepth(k.corners(plate, feet))) {
      out.push(cyl(x, y, 7, z - 6, 1.6, "lo", { steps: 28 }));
      out.push(cyl(x, y, 5.3, z - 4.4, 4.4, "mid", { steps: 28 }));
    }
    out.push(slab(plate, z, -z, "mid", { steps: 8, bevel: 1.6, seam: z / 2 }));
    out.push(L(k.planOutline(k.insetPlan(plate, 5), 0, P), { tone: "lo" }));
    out.push(...screws(k.corners(plate, 10), 0, 2.1));
    return out.join("");
  };

  // Ruler strip with ticks rooted on its edge.
  const ruler = (strip, axis = "x", step = 4) => {
    const out = [slab(strip, 0, 0.6, "lo", { steps: 3, bevel: 0, crease: "none" })];
    const t =
      axis === "x"
        ? k.topTicks(strip.x + 3, strip.x + strip.w - 3, step, 5, strip.y + 0.8, 0.6, [2, 3.6], P)
        : k.topTicks(strip.y + 3, strip.y + strip.d - 3, step, 5, strip.x + 0.8, 0.6, [2, 3.6], P, "y");
    out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
    return out.join("");
  };

  // Label plate with an engraved line and rule lines.
  const label = (plan, text) => {
    const out = [slab(plan, 0, 0.8, "lo", { steps: 3, bevel: 0, crease: "none" })];
    out.push(L(k.planOutline(k.insetPlan(plan, 1.5), 0.8, P, 3), { tone: "faint" }));
    if (text) out.push(k.faceTextSvg(k.topMatrix([plan.x + 3.6, plan.y + 5.6], 0.8, P), text, { size: 2.7, tone: "hi" }));
    out.push(L(k.lineOnTop([plan.x + 3.6, plan.y + plan.d - 4], [plan.x + plan.w * 0.62, plan.y + plan.d - 4], 0.8, P), { tone: "lo", free: true }));
    out.push(D([at([plan.x + plan.w - 3, plan.y + plan.d / 2, 0.8])], { size: 0.45 }));
    return out.join("");
  };

  // Knurled knob with a pointer.
  const knob = (x, y, r, z, h, { pointer = 0.4 } = {}) => {
    const top = z + h;
    const p = [x + Math.sin(pointer) * (r - 0.8), y - Math.cos(pointer) * (r - 0.8)];
    return [
      cyl(x, y, r + 1.2, z, 0.8, "lo", { steps: 24 }),
      cyl(x, y, r, z + 0.8, h - 0.8, "mid", { steps: 28, bevel: 0.3 }),
      L(k.knurl(x, y, r, z + 0.8, top, Math.round(r * 6), P), { tone: "lo" }),
      L(k.lineOnTop([x, y], p, top, P), { tone: "hi" }),
      D([at([x, y, top])], { size: 0.45 }),
    ].join("");
  };

  // Lamp: a bezel ring and a lens that the page lights with data-on.
  const lamp = (x, y, z, r = 2.4, part) =>
    [
      cyl(x, y, r + 1, z, 1, "mid", { steps: 22 }),
      `<g data-part="${part}" class="veo-lamp">${cyl(x, y, r, z + 1, 1.8, "hi", { steps: 22, crease: "lo" })}</g>`,
    ].join("");

  // In-plane drawing: plain SVG in world units laid on a face. `top` uses local
  // x → world +x and y → world +y; `faceY` is the face looking at +y (x → +x,
  // y → down); `faceX` the face looking at +x (x → −y, y → down).
  const g = (matrix, inner, attrs = "") => `<g class="ui" transform="${matrix}"${attrs ? ` ${attrs}` : ""}>${inner}</g>`;
  const top = (x, y, z, inner, attrs) => g(k.topMatrix([x, y], z, P), inner, attrs);
  const faceY = (x, y, z, inner, attrs) => g(k.sideMatrix([x, y], z, P, "left"), inner, attrs);
  const faceX = (x, y, z, inner, attrs) => g(k.sideMatrix([x, y], z, P, "right"), inner, attrs);
  // A dark glass screen with a bezel line; content goes on top of it.
  const screen = (w, h, inner = "", r = 1.6) =>
    `<rect class="scr" width="${w}" height="${h}" rx="${r}"/><rect class="scr-bezel" x=".6" y=".6" width="${w - 1.2}" height="${h - 1.2}" rx="${Math.max(0, r - 0.5)}"/>${inner}`;

  return { at, S, L, D, slab, cyl, screws, byDepth, slot, base, ruler, label, knob, lamp, top, faceY, faceX, screen };
}

// Vertical coil spring split into back and front halves.
export function coilZ(z0, z1, cx, cy, radius, turns, P) {
  const count = Math.max(12, Math.round(turns * 18));
  const [vx, vy] = k.towardViewer(P);
  const back = [];
  const front = [];
  let run = [];
  let near = null;
  for (let i = 0; i <= count; i++) {
    const share = i / count;
    const angle = share * turns * Math.PI * 2;
    const flat = k.iso([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle), z0 + (z1 - z0) * share], P);
    const facing = Math.cos(angle) * vx + Math.sin(angle) * vy > 0;
    if (near === null) near = facing;
    if (facing !== near) {
      run.push(flat);
      (near ? front : back).push(k.pathOf(run));
      run = [flat];
      near = facing;
      continue;
    }
    run.push(flat);
  }
  if (run.length > 1) (near ? front : back).push(k.pathOf(run));
  return { back: back.join(""), front: front.join("") };
}

// Depth-sorted stack of items; each item keeps its key point for live re-sorting.
export function stackOf(P) {
  const items = [];
  const put = (key, svg, moves) => items.push({ key, svg, moves });
  const render = () =>
    [...items]
      .sort((a, b) => k.depthOf(a.key, P) - k.depthOf(b.key, P))
      .map(
        (it, i) =>
          `<g data-item="${i}" data-x="${it.key[0]}" data-y="${it.key[1]}" data-z="${it.key[2]}"${it.moves ? ` data-moves="${it.moves}"` : ""}>${it.svg}</g>`,
      )
      .join("");
  return { put, render };
}

export function save(name, { width, height, label, body, motion }) {
  const svg = k.figureSvg({ width, height, label, body, className: `fig-${name}` });
  writeFileSync(join(OUT, `${name}.svg`), svg);
  writeFileSync(join(OUT, `${name}.json`), JSON.stringify(motion));
  console.log(`wrote ${name}.svg (${(svg.length / 1024).toFixed(0)} KB)`);
}
