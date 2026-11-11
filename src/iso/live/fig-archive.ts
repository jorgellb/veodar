// IA generativa: a query, the folders it needs, an answer with its references and a
// person who lets it through. Every third query finds nothing, and says so.
import { tr, along, ease, fade, gyroRing, helpers, pulse, ride, shift, span, type Factory, type Proj, type Vec3 } from './runtime';

const CYCLE = 11;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const docs = [h.q('[data-part="doc-0"]'), h.q('[data-part="doc-1"]')];
  const ringsBack = h.q('[data-part="rings-back"]');
  const ringsFront = h.q('[data-part="rings-front"]');
  const halo = h.q('[data-part="halo"]');
  const lines = h.qa('[data-ans]');
  const refs = h.qa('[data-ref]').map((el) => el.querySelector('rect')!);
  const none = h.q('[data-part="none"]');
  const button = h.q('[data-part="button"]');
  const wait = h.q('[data-part="rv-wait"]');
  const ok = h.q('[data-part="rv-ok"]');
  const wires = { docs: h.q('[data-part="wire-docs"]'), answer: h.q('[data-part="wire-answer"]'), review: h.q('[data-part="wire-review"]') };
  const beads = h.qa('[data-bead]');
  const toCore = along(M.docs);
  const toScreen = along(M.answer);
  const toReview = along(M.review);
  const C = M.core.c as Vec3;
  let spin = 0;

  const apply = (t: number, dt: number) => {
    const u = t % CYCLE;
    const found = Math.floor(t / CYCLE) % 3 !== 2;
    // Folders: only the ones the query needs come up.
    const lift = found ? ease(span(u, 0.8, 1.6)) * (1 - ease(span(u, 9.6, 10.4))) : 0;
    docs.forEach((doc, i) => shift(doc, P, [0, 0, M.rise * lift * (i ? 0.8 : 1)]));
    beads.forEach((bead) => bead.setAttribute('opacity', '0'));
    if (found) beads.forEach((bead, i) => ride(bead, toCore, span(u, 1.6 + i * 0.3, 2.5 + i * 0.3)));
    h.on(wires.docs, found && u > 1.6 && u < 2.9);
    // The core works: the rings speed up and the orb brightens.
    const working = found ? pulse(u, 2.5, 5, 0.5) : pulse(u, 1, 3.4, 0.5);
    spin += dt * (0.5 + 2.4 * working);
    const a = gyroRing(C, M.core.rings[0], 1.08, spin + 0.5, P);
    const b = gyroRing(C, M.core.rings[1], -0.86, -spin * 0.72 + 1.7, P);
    ringsBack.innerHTML = `<path class="ai-ring" data-back d="${a.back}"/><path class="ai-ring" data-back data-acc d="${b.back}"/>`;
    ringsFront.innerHTML = `<path class="ai-ring" d="${a.front}"/><path class="ai-ring" data-acc d="${b.front}"/>`;
    fade(halo, 0.55 + 0.45 * working);
    // The answer, line by line, and the documents it cites.
    const writeAt = found ? 5 : 3.4;
    if (u >= writeAt - 0.8 && u < writeAt) ride(beads[0], toScreen, span(u, writeAt - 0.8, writeAt));
    h.on(wires.answer, u >= writeAt - 0.8 && u < writeAt + 0.4);
    lines.forEach((line, i) => fade(line, found ? span(u, 5 + i * 0.25, 5.2 + i * 0.25) * (1 - span(u, 10.3, 10.7)) : 0));
    refs.forEach((ref, i) => {
      const cited = found && u >= 5.9 + i * 0.3 && u < 10.3;
      ref.setAttribute('data-t', cited ? 'acc' : '');
      ref.classList.toggle('scr-glow', cited);
    });
    fade(none, found ? 0 : span(u, 3.4, 3.7) * (1 - span(u, 10.3, 10.7)));
    // Review: a person presses, or the query waits for one.
    const asked = found ? 6.4 : 3.8;
    if (u >= asked && u < asked + 0.7) ride(beads[1], toReview, span(u, asked, asked + 0.7));
    h.on(wires.review, u >= asked && u < asked + 1);
    const pressed = found ? pulse(u, 8.3, 8.9, 0.2) : 0;
    shift(button, P, [0, 0, -M.press * pressed]);
    h.on(wait, found ? u >= asked + 0.7 && u < 8.6 : u >= asked + 0.7 && u < 10.3);
    h.on(ok, found && u >= 8.6 && u < 10.3);
    h.say(
      !found
        ? u < 3.4
          ? tr('Consulta · buscando en el archivo', 'Query · searching the archive')
          : tr('Sin respuesta en los documentos · pasa a una persona', 'No answer in the documents · goes to a person')
        : u < 1.6
          ? tr('Consulta · salen las carpetas que hacen falta', 'Query · the folders it needs come up')
          : u < 5
            ? tr('El núcleo prepara la respuesta', 'The core prepares the answer')
            : u < 8.6
              ? tr('Respuesta con 2 referencias · pendiente de revisión', 'Answer with 2 references · awaiting review')
              : tr('Revisada por una persona · sale', 'Reviewed by a person · sent'),
    );
  };
  return { apply, still: 7 };
};

export default create;
