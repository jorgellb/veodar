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

// `lod: "thumb"` draws the same machine for a card-sized picture: the solids stay,
// with fewer facets, and what cannot be seen at that size is left out (seams, bevels,
// screws, dots, ticks, knurls and any line marked `fine` or toned "faint").
export function kitFor(P, { lod = "full" } = {}) {
  const thumb = lod === "thumb";
  const at = (point) => k.iso(point, P);
  const S = (paths, style) => k.solidSvg(paths, style);
  const L = (d, style = {}) => {
    if (!d || (thumb && (style.fine || style.tone === "faint"))) return "";
    const { fine, ...rest } = style;
    return k.lineSvg(d, rest);
  };
  const D = (points, style = {}) => {
    if (!points.length || (thumb && !style.keep)) return "";
    const { keep, ...rest } = style;
    return k.dotsSvg(points, rest);
  };
  const slab = (plan, z, h, tone, { steps = 4, bevel = 0.5, crease, lit, seam, className, inner = "" } = {}) =>
    S(k.slabOf(plan, z, h, P, thumb ? Math.min(steps, 3) : steps, thumb ? 0 : bevel), {
      tone,
      crease,
      lit,
      className,
      inner: (seam === undefined ? "" : L(k.sideSeam(plan, seam, P, steps), { tone: "faint" })) + inner,
    });
  const cyl = (x, y, r, z, h, tone, { steps = 28, bevel = 0, crease, lit, inner, className } = {}) =>
    S(k.cylinder(x, y, r, z, h, P, thumb ? Math.max(12, Math.round(steps / 2)) : steps, thumb ? 0 : bevel), { tone, crease, lit, inner, className });
  const screws = (points, z, r = 1.7, size = 0.55) => [
    L(points.map(([x, y]) => k.ring(x, y, r, z, P, 14)).join(""), { tone: "lo", fine: true }),
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
    out.push(L(k.planOutline(k.insetPlan(plate, 5), 0, P), { tone: "lo", fine: true }));
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
    out.push(L(t.minor, { tone: "lo", fine: true }), L(t.major, { tone: "mid", fine: true }));
    return out.join("");
  };

  // Label plate with an engraved line and rule lines.
  const label = (plan, text) => {
    const out = [slab(plan, 0, 0.8, "lo", { steps: 3, bevel: 0, crease: "none" })];
    out.push(L(k.planOutline(k.insetPlan(plan, 1.5), 0.8, P, 3), { tone: "faint" }));
    if (text) out.push(k.faceTextSvg(k.topMatrix([plan.x + 3.6, plan.y + 5.6], 0.8, P), text, { size: 2.7, tone: "hi" }));
    out.push(L(k.lineOnTop([plan.x + 3.6, plan.y + plan.d - 4], [plan.x + plan.w * 0.62, plan.y + plan.d - 4], 0.8, P), { tone: "lo", free: true, fine: true }));
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
      L(k.knurl(x, y, r, z + 0.8, top, Math.round(r * 6), P), { tone: "lo", fine: true }),
      L(k.lineOnTop([x, y], p, top, P), { tone: "hi" }),
      D([at([x, y, top])], { size: 0.45 }),
    ].join("");
  };

  // Lamp: a bezel ring and a lens that the page lights with data-on.
  const lamp = (x, y, z, r = 2.4, part, on = false) =>
    [
      cyl(x, y, r + 1, z, 1, "mid", { steps: 22 }),
      `<g data-part="${part}" class="veo-lamp"${on ? ' data-on=""' : ""}>${cyl(x, y, r, z + 1, 1.8, "hi", { steps: 22, crease: "lo" })}</g>`,
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

  // Three stacked platters: the drawing every figure uses for "a database".
  const platters = (x, y, r, z, { count = 3, h = 7, gap = 1.3, part } = {}) => {
    const out = [];
    for (let i = 0; i < count; i++) {
      const z0 = z + i * (h + gap);
      if (i) out.push(cyl(x, y, r - 2, z0 - gap, gap, "lo", { steps: 40 }));
      out.push(cyl(x, y, r, z0, h, "hi", { steps: 48, bevel: 0.5, crease: "lo", inner: L(k.sideArc(x, y, r, z0 + h / 2, P, 32), { tone: "faint" }) }));
      out.push(D([at([x + r * 0.62, y + r * 0.78, z0 + h / 2])], { size: 0.6, tone: i === 1 ? "hi" : "mid" }));
    }
    const top = z + count * h + (count - 1) * gap;
    if (part) out.push(`<g data-part="${part}" class="veo-lamp">${cyl(x, y, 1.9, top, 1.6, "hi", { steps: 16, crease: "lo" })}</g>`);
    return out.join("");
  };
  // A cable lying on the plate (or wherever its points are): the page lights it with data-on.
  const cable = (points, part) => {
    const d = k.pathOf(points.map(at));
    return `<g class="veo-cable"${part ? ` data-part="${part}"` : ""}><path class="veo-cable-edge" d="${d}"/><path class="veo-cable-core" d="${d}"/></g>`;
  };
  // A soft shadow under one module drawn on its own.
  const shadow = (plan, z = 0) => `<path class="iso-halo" d="${k.haloOf(plan, z - 3, 5, P)}"/>`;
  /** Picks what to draw at each level of detail. */
  const pick = (full, small = "") => (thumb ? small : full);

  // A phone standing on its lower edge with its glass toward +y. `ui` is drawn on the
  // glass in the glass's own units (x to the right, y down; it measures w − 2.6 by
  // h − 2.6). `kind` is one of the two families of handset: "a" has round corners and
  // a pill at the top, "b" squarer corners and a dot. No maker's mark on either.
  const handset = ({ x, y, z = 0, w = 28, h = 54, t = 3.4 }, ui = "", { kind = "a", tone = "hi", attrs = "", lit = false } = {}) => {
    const gw = w - 2.6;
    const gh = h - 2.6;
    const cut = thumb
      ? ""
      : kind === "a"
        ? `<rect class="scr-f" data-t="mid" x="${gw / 2 - 3.2}" y="1.5" width="6.4" height="1.9" rx=".95"/>`
        : `<circle class="scr-f" data-t="mid" cx="${gw / 2}" cy="2.5" r=".95"/>`;
    return (
      slab({ x, y, w, d: t, r: kind === "a" ? 1.6 : 1.1 }, z, h, tone, { steps: 3, bevel: 0.4, crease: "lo", lit }) +
      faceY(x + 1.3, y + t, z + h - 1.3, screen(gw, gh, cut + ui, kind === "a" ? 3.4 : 1.8), attrs)
    );
  };
  // The same phone lying on its back: `plan` is its outline, the glass looks up and
  // measures plan.w − 2.6 by plan.d − 2.6 (x along +x, y along +y).
  const handsetFlat = (plan, z, ui = "", { kind = "a", tone = "hi", attrs = "", h = 3.4 } = {}) =>
    slab({ ...plan, r: kind === "a" ? 5 : 3 }, z, h, tone, { steps: 6, bevel: 0.5, crease: "lo", seam: z + h / 2 }) +
    top(plan.x + 1.3, plan.y + 1.3, z + h + 0.02, screen(plan.w - 2.6, plan.d - 2.6, ui, kind === "a" ? 4 : 2.2), attrs);

  return { at, S, L, D, slab, cyl, screws, byDepth, slot, base, ruler, label, knob, lamp, top, faceY, faceX, screen, platters, cable, shadow, pick, thumb, handset, handsetFlat };
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

// A ring around a point, tilted and turned, split into the half behind the point and
// the half in front of it (the same sum the page runs to spin it: runtime.ts, gyroRing).
export function gyroRing(center, radius, tilt, turn, P, steps = 64) {
  const { sinA, cosA, sinE, cosE } = k.cameraOf(P);
  const view = [cosA * cosE, sinA * cosE, sinE];
  const front = [];
  const back = [];
  let run = [];
  let near = null;
  const [ct, st, cz, sz] = [Math.cos(tilt), Math.sin(tilt), Math.cos(turn), Math.sin(turn)];
  for (let i = 0; i <= steps; i++) {
    const th = (i / steps) * Math.PI * 2;
    const x0 = radius * Math.cos(th);
    const y0 = radius * Math.sin(th) * ct;
    const z0 = radius * Math.sin(th) * st;
    const rel = [x0 * cz - y0 * sz, x0 * sz + y0 * cz, z0];
    const isNear = rel[0] * view[0] + rel[1] * view[1] + rel[2] * view[2] > 0;
    const flat = k.iso([center[0] + rel[0], center[1] + rel[1], center[2] + rel[2]], P);
    if (near === null) near = isNear;
    if (isNear !== near) {
      run.push(flat);
      (near ? front : back).push(k.pathOf(run));
      run = [flat];
      near = isNear;
      continue;
    }
    run.push(flat);
  }
  if (run.length > 1) (near ? front : back).push(k.pathOf(run));
  return { front: front.join(""), back: back.join("") };
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

// Styles for the small drawings. They are shown as images (a thumbnail on a card, one
// module beside its service), so they cannot use the page's stylesheet and carry this
// instead: the light theme of src/styles/anatomy-iso.css, reduced to what they use.
const SMALL_CSS =
  "svg{--p:#fbf8f1;--f:#fffdf8;--t:#fffefb;--s0:#cdc3ae;--s1:#dad1bf;--s2:#e7e0d1;--s3:#f2ede3;--hi:#1d1a36;--mid:#77718b;--lo:#aaa2b3;--faint:#d6d0d6;--acc:#ff5a1f}" +
  "path,circle,rect{vector-effect:non-scaling-stroke}" +
  ".iso-fill{fill:var(--p)}.iso-top{fill:var(--t)}.iso-shade[data-shade='0']{fill:var(--s0)}.iso-shade[data-shade='1']{fill:var(--s1)}.iso-shade[data-shade='2']{fill:var(--s2)}.iso-shade[data-shade='3']{fill:var(--s3)}" +
  ".iso-solid[data-lit]>.iso-top{fill:#ffe9de}.iso-solid[data-lit]>.iso-shade{fill:#ffd3bf}.iso-solid[data-lit]>.iso-edge{stroke:var(--acc)}" +
  ".iso-halo{fill:#6f6450;filter:blur(9px);opacity:.3;transform:translateY(3px)}" +
  ".iso-line{fill:none;stroke:var(--lo);stroke-width:.72px;stroke-linecap:round;stroke-linejoin:round}.iso-line[data-tone='hi']{stroke:var(--hi)}.iso-line[data-tone='mid']{stroke:var(--mid)}.iso-line[data-tone='faint']{stroke:var(--faint)}.iso-line[data-tone='lit']{stroke:var(--acc)}.iso-line[data-dashed]{stroke-dasharray:3 3}" +
  ".iso-wire-end{fill:var(--p);stroke:var(--lo);stroke-width:.72px}.iso-wire[data-tone='mid'] .iso-wire-end{stroke:var(--mid)}.iso-wire[data-tone='hi'] .iso-wire-end{stroke:var(--hi)}" +
  ".iso-dots circle{fill:#2e2b4a;opacity:.32}.iso-dots[data-tone='hi'] circle{opacity:.85}.iso-dots[data-tone='mid'] circle{opacity:.45}.iso-dots[data-tone='lo'] circle{opacity:.22}" +
  ".ui-s{fill:none;stroke:var(--mid);stroke-width:.72px;stroke-linecap:round;stroke-linejoin:round}.ui-s[data-t='hi']{stroke:var(--hi)}.ui-s[data-t='lo']{stroke:var(--lo)}.ui-s[data-t='acc']{stroke:var(--acc);stroke-width:1.3px}.ui-f{fill:var(--s1)}.ui-f[data-t='hi']{fill:var(--hi)}.ui-f[data-t='paper']{fill:#fffefb}.ui-f[data-t='acc']{fill:var(--acc)}" +
  ".scr{fill:#16142c;stroke:var(--hi);stroke-width:.8px}.scr-bezel{fill:none;stroke:#f4f0e61f;stroke-width:.6px}.scr-s{fill:none;stroke:#f4f0e6;stroke-opacity:.55;stroke-width:.75px;stroke-linecap:round;stroke-linejoin:round}.scr-s[data-t='dim']{stroke-opacity:.24}.scr-s[data-t='hi']{stroke-opacity:.95}.scr-s[data-t='acc']{stroke:var(--acc);stroke-opacity:1;stroke-width:1.3px}.scr-f{fill:#f4f0e6;fill-opacity:.14}.scr-f[data-t='hi']{fill-opacity:.9}.scr-f[data-t='mid']{fill-opacity:.4}.scr-f[data-t='acc']{fill:var(--acc);fill-opacity:1}" +
  ".veo-cable{fill:none;stroke-linecap:round;stroke-linejoin:round}.veo-cable-edge{stroke:var(--hi);stroke-width:3.4px}.veo-cable-core{stroke:var(--s2);stroke-width:2.2px}.veo-cable[data-on] .veo-cable-core{stroke:var(--acc)}.veo-cable[data-on] .veo-cable-edge{stroke:#8a2a06}" +
  ".veo-dark .iso-top,.veo-dark .iso-fill{fill:#16142c}.veo-dark .iso-shade{fill:#0e0c20}.veo-on-dark .iso-line{stroke:#f4f0e6;stroke-opacity:.3}" +
  ".veo-lamp[data-on] :is(.iso-fill,.iso-top,.iso-shade){fill:var(--acc)}.veo-lamp[data-on] .iso-edge{stroke:#a8350b}.veo-lamp[data-tone='ok'][data-on] :is(.iso-fill,.iso-top,.iso-shade){fill:#2fb37a}" +
  ".veo-glass .iso-top,.veo-glass .iso-fill{fill:#eef3fb}.veo-glass .iso-shade{fill:#dbe4f3}" +
  ".veo-bead{fill:var(--acc);stroke:#fff;stroke-width:.8px}.veo-trace[data-on] .iso-line{stroke:var(--acc);stroke-width:1.3px}" +
  ".ai-orb{stroke:#a8350b;stroke-width:.8px}.ai-ring{fill:none;stroke:var(--hi);stroke-width:1.4px;stroke-linecap:round}.ai-ring[data-back]{stroke-opacity:.35}.ai-ring[data-acc]{stroke:var(--acc)}";

// A drawing that stands on its own: no text (it would need translating), no hooks for
// the live script, its own styles and a tight frame around what it shows. It is XML,
// read as an image, so every attribute needs a value. `coarse` rounds the outlines to
// whole units, which a card-sized picture cannot tell apart and weighs a third less.
function smallSvg(body, [x0, y0, x1, y1], { coarse = false } = {}) {
  let clean = (Array.isArray(body) ? body.join("") : body)
    .replace(/<text\b[^>]*>[^<]*<\/text>/g, "")
    .replace(/ data-(?:part|item|x|y|z|moves|line|level|step|bead|free)(?:="[^"]*")?/g, "")
    .replace(/ (data-[a-z-]+)(?=[ >/])/g, ' $1=""')
    .replace(/<g>\s*<\/g>/g, "");
  if (coarse) clean = clean.replace(/(<path class="iso-[^"]*"[^>]*? d=")([^"]+)"/g, (all, open, d) => `${open}${d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n))))}"`);
  const round = (v) => Math.round(v * 10) / 10;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${round(x0)} ${round(y0)} ${round(x1 - x0)} ${round(y1 - y0)}"><style>${SMALL_CSS}</style>${clean}</svg>`;
}

/** Screen box of a set of world points, with a margin. */
export function frameOf(points, P, pad = 10) {
  const flat = points.map((point) => k.iso(point, P));
  const xs = flat.map(([x]) => x);
  const ys = flat.map(([, y]) => y);
  return [Math.min(...xs) - pad, Math.min(...ys) - pad, Math.max(...xs) + pad, Math.max(...ys) + pad];
}

/**
 * Writes a figure. `thumb` (the whole scene at the "thumb" level of detail) and `parts`
 * ({ name: { body, frame } }, one module each) are optional: they become the small
 * drawings in src/generated/small/, served as images by /figures/small/<name>.svg.
 */
export function save(name, { width, height, label, body, motion, thumb, parts = {} }) {
  const svg = k.figureSvg({ width, height, label, body, className: `fig-${name}` });
  writeFileSync(join(OUT, `${name}.svg`), svg);
  writeFileSync(join(OUT, `${name}.json`), JSON.stringify(motion));
  const sizes = [`${name}.svg ${(svg.length / 1024).toFixed(0)} KB`];
  if (thumb || Object.keys(parts).length) mkdirSync(join(OUT, "small"), { recursive: true });
  if (thumb) {
    const small = smallSvg(thumb, [0, 0, width, height], { coarse: true });
    writeFileSync(join(OUT, "small", `${name}.svg`), small);
    sizes.push(`thumb ${(small.length / 1024).toFixed(0)} KB`);
  }
  for (const [part, { body: partBody, frame }] of Object.entries(parts)) {
    const small = smallSvg(partBody, frame);
    writeFileSync(join(OUT, "small", `${name}--${part}.svg`), small);
    sizes.push(`${part} ${(small.length / 1024).toFixed(0)} KB`);
  }
  console.log(`wrote ${sizes.join(" · ")}`);
}
