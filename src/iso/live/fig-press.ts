import { lineOnTop, translateAlong } from '../iso-kit.mjs';
import { ease, helpers, lerp, polar, pulse, span, type Factory, type Proj } from './runtime';

const TURN = 3.5;
const NAMES: Record<string, string> = {
  card: 'Tarjeta de visita · marca a 12 mm',
  letter: 'Papel de carta · marca a 18 mm',
  icon: 'Icono de app · marca a 1024 px',
};

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const pieces = (M.pieces as { name: string; out: [number, number] }[]).map((p) => {
    const el = h.q(`[data-piece="${p.name}"]`);
    return { ...p, el, mark: el.querySelector('[data-mark]')! };
  });
  const ram = h.q('[data-part="ram"]');
  const wheel = h.q('[data-part="wheel"]');
  const lamp = h.q('[data-part="press"]');
  const ring = h.q('[data-part="chip-ring"]');
  const Wl = M.wheel;
  const total = TURN * pieces.length;

  const apply = (t: number) => {
    const u = t % total;
    const turn = Math.floor(u / TURN);
    const v = u - turn * TURN;

    // Ram: down, dwell, up.
    const down = v < 1.0 ? 0 : v < 1.35 ? ease((v - 1.0) / 0.35) : v < 1.65 ? 1 : 1 - ease((v - 1.65) / 0.4);
    ram.setAttribute('transform', translateAlong(P, [0, 0, -M.ram.travel * Math.max(0, down)]));
    h.on(lamp, down > 0.96);
    ring.setAttribute('opacity', pulse(v, 1.2, 2.0, 0.2).toFixed(2));
    let spokes = '';
    for (let j = 0; j < 4; j++) {
      const a = down * 2.4 + (j * Math.PI) / 2;
      spokes += lineOnTop(polar(Wl.x, Wl.y, 2.4, a), polar(Wl.x, Wl.y, Wl.r, a), Wl.z, P);
    }
    wheel.innerHTML = `<path class="iso-line" data-tone="mid" d="${spokes}"/>`;

    pieces.forEach((piece, i) => {
      // Time since this piece last started its turn.
      const age = (u - i * TURN + total) % total;
      let x = M.feed[0];
      let y = 0;
      let alpha = 1;
      let stamped = age >= 1.35;
      if (age < 0.85) {
        x = lerp(M.feed[0], M.feed[1], ease(age / 0.85));
        alpha = span(age, 0, 0.18);
      } else if (age < 2.05) x = M.feed[1];
      else if (age < 2.95) {
        const f = ease((age - 2.05) / 0.9);
        x = lerp(M.feed[1], piece.out[0], f);
        y = lerp(0, piece.out[1], f);
      } else {
        x = piece.out[0];
        y = piece.out[1];
        // Rest in the out tray until just before its next turn.
        alpha = 1 - span(age, total - 0.45, total - 0.1);
      }
      piece.el.setAttribute('transform', translateAlong(P, [x, y, 0]));
      piece.el.setAttribute('opacity', alpha.toFixed(2));
      piece.mark.setAttribute('opacity', stamped ? '1' : '0');
    });

    const current = pieces[turn];
    h.say(v >= 1.0 && v < 2.05 ? 'Estampando · color.acento #FF5A1F' : NAMES[current.name]);
  };
  return { apply, still: TURN + 1.5 };
};

export default create;
