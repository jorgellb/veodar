// Escáner 3D: a solid turns on a table while a laser plane climbs it; the
// monitor rebuilds the same solid as a live mesh, face by face. The object,
// the laser cut and the mesh are all drawn in the page from one geometry.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 470;
const PLATE = { x: -106, y: -58, w: 212, d: 116, r: 10 };
const TABLE = { x: -34, y: 8, r: 30, z: 7.4 };
const OBJ = { r: 19, z: TABLE.z + 17.2 };
const TOWER = { x: 44, y: 40, top: 60, rest: 14 };
const MON = { x: 16, y: -46, w: 80, d: 5, r: 2.5, z0: 16, h: 54 };
const SCR = { x: MON.x + 3, y: MON.y + MON.d, z: MON.z0 + MON.h - 3, w: MON.w - 6, h: MON.h - 6 };

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [MON.x, MON.y, MON.z0 + MON.h + 2], [MON.x + MON.w, MON.y, MON.z0 + MON.h + 2]], W, H, {
  pad: 22,
  azimuth: 48,
  elevation: 30,
});
const { at, S, L, D, slab, cyl, screws, base, label, lamp, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// Monitor at the back.
const mx = MON.x + MON.w / 2;
out.push(cyl(mx, MON.y + 2, 13, 0, 1.8, "lo", { steps: 40 }));
out.push(cyl(mx, MON.y + 2, 10, 1.8, 1.6, "mid", { steps: 40, bevel: 0.4 }));
out.push(slab({ x: mx - 3.5, y: MON.y - 1, w: 7, d: 4, r: 1 }, 3.4, MON.z0 - 1, "mid", { steps: 2, bevel: 0.3 }));
out.push(slab(MON, MON.z0, MON.h, "hi", { steps: 4, bevel: 0.6, crease: "lo" }));
const ui = [
  `<text class="scr-t" data-t="dim" x="3" y="5" font-size="2.6">malla · tiempo real</text>`,
  `<g data-part="mesh"></g>`,
  `<text class="scr-t" data-part="faces" x="3" y="${SCR.h - 3}" font-size="3">caras 00/20</text>`,
  `<text class="scr-t" data-t="acc" data-part="fps" x="${SCR.w - 3}" y="${SCR.h - 3}" font-size="3" text-anchor="end">60 fps</text>`,
];
out.push(faceY(SCR.x, SCR.y, SCR.z, screen(SCR.w, SCR.h, ui.join(""), 1.6)));
out.push(k.wireSvg(at([mx + 10, MON.y + 2, 1]), at([TOWER.x, TOWER.y - 6, 2]), { via: [at([mx + 22, MON.y + 2, 0.6]), at([mx + 22, TOWER.y - 14, 0.6]), at([TOWER.x, TOWER.y - 14, 0.6])], tone: "lo", size: 1 }));

// Turntable: knurled base and the turning plate; ticks and the solid are live.
out.push(cyl(TABLE.x, TABLE.y, TABLE.r + 4, 0, 5, "mid", { steps: 72, bevel: 0.6, inner: L(k.knurl(TABLE.x, TABLE.y, TABLE.r + 4, 1.2, 5, 96, P, 0.3), { tone: "lo" }) }));
out.push(cyl(TABLE.x, TABLE.y, TABLE.r, 5, TABLE.z - 5, "hi", { steps: 72, bevel: 0.5, crease: "lo" }));
out.push(L(k.ring(TABLE.x, TABLE.y, TABLE.r - 6, TABLE.z, P, 64), { tone: "faint" }));
out.push(`<g data-part="ticks"></g>`);
out.push(`<path class="iso-halo" d="${k.ring(TABLE.x, TABLE.y, 11, TABLE.z, P, 32)}" style="filter:blur(4px);opacity:.45"/>`);
out.push(`<g data-part="object"></g><g data-part="beam"></g>`);

// Laser tower with a head that climbs.
out.push(cyl(TOWER.x, TOWER.y, 8, 0, 2, "lo", { steps: 32 }));
out.push(cyl(TOWER.x, TOWER.y, 5.6, 2, 3, "mid", { steps: 32, bevel: 0.4 }));
out.push(cyl(TOWER.x, TOWER.y, 2.4, 5, TOWER.top - 5, "mid", { steps: 16, crease: "none", inner: L([20, 36, 52].map((z) => k.sideArc(TOWER.x, TOWER.y, 2.4, z, P, 12)).join(""), { tone: "faint" }) }));
out.push(cyl(TOWER.x, TOWER.y, 3.6, TOWER.top, 2, "mid", { steps: 20 }));
const head = { x: TOWER.x - 8, y: TOWER.y - 7, w: 14, d: 12, r: 2 };
out.push(
  `<g data-part="head">${slab(head, TOWER.rest - 4, 8, "hi", { steps: 3, bevel: 0.5, crease: "lo", seam: TOWER.rest })}${D([at([head.x, head.y + 4, TOWER.rest])], {
    size: 0.9,
    tone: "hi",
  })}<g data-part="laser" class="veo-lamp">${cyl(head.x + 3, head.y + 3, 1.5, TOWER.rest + 4, 1.2, "hi", { steps: 14, crease: "lo" })}</g></g>`,
);

// Controller.
const box = { x: -100, y: 30, w: 44, d: 20, r: 2.4 };
out.push(slab(box, 0, 9, "mid", { steps: 3, bevel: 0.5, seam: 3 }));
out.push(lamp(box.x + 8, box.y + 10, 9, 1.8, "scan"));
out.push(lamp(box.x + 17, box.y + 10, 9, 1.8, "done"));
out.push(D([0, 1, 2].map((i) => at([box.x + 27 + i * 4.4, box.y + 10, 9])), { size: 0.6, tone: "mid" }));
out.push(...screws(k.corners(box, 2.6), 9, 0.8, 0.4));
out.push(label({ x: -44, y: 45, w: 62, d: 11, r: 1 }, "THREE.JS · WEBGPU"));

save("scanner", {
  width: W,
  height: H,
  label:
    "Un escáner 3D: un icosaedro gira sobre un plato mientras el plano de un láser lo recorre de abajo arriba; un monitor reconstruye la misma pieza como malla en tiempo real, cara a cara.",
  body: out,
  motion: {
    P,
    table: TABLE,
    obj: { x: TABLE.x, y: TABLE.y, z: OBJ.z, r: OBJ.r },
    tower: { x: head.x, y: head.y + 4, rest: TOWER.rest },
    view: { cx: SCR.w / 2, cy: SCR.h / 2 + 1, s: 0.86 },
  },
});
