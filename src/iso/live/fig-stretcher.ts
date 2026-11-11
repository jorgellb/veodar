// Jetpack Compose: the crank widens the frame and, at each mark of the rule, the same
// screen rearranges; then the theme changes and every piece takes the new colour.
import { tr, along, ease, fade, helpers, ride, shift, span, type Factory, type Proj } from './runtime';

const CYCLE = 15;
const GREEN = '#2fb37a';

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const bead = h.q('[data-bead]');
  const q = <E extends Element = SVGGElement>(name: string) => h.q<E>(`[data-part="${name}"]`);
  const [compact, medium, expanded] = M.widths as number[];
  const glass = q<SVGRectElement>('glass');
  const jaw = q('jaw');
  const layouts = [0, 1, 2].map((i) => q(`lay-${i}`));
  const zones = [0, 1, 2].map((i) => q(`zone-${i}`));
  const swatches = [0, 1, 2].map((i) => q(`sw-${i}`));
  const branded = h.qa<SVGElement>('[data-brand]');
  const crank = q('crank');
  const needle = q('needle');
  const route = along(M.theme);
  const wires = { theme: q('theme-line'), old: [q('old-a'), q('old-b')] };
  const adapter = q('adapt');
  const [nx, ny] = M.needle as number[];
  const [cx, cy] = M.crank as number[];

  const apply = (t: number) => {
    const u = t % CYCLE;
    // The width between the jaws.
    const width =
      u < 2.6
        ? compact
        : u < 6.4
          ? compact + (medium - compact) * ease(span(u, 2.6, 3.6))
          : u < 12.6
            ? medium + (expanded - medium) * ease(span(u, 6.4, 7.6))
            : expanded + (compact - expanded) * ease(span(u, 12.6, 13.8));
    glass.setAttribute('width', width.toFixed(1));
    shift(jaw, P, [width - compact, 0, 0]);
    crank.setAttribute('transform', `rotate(${((width - compact) * 14).toFixed(1)} ${cx} ${cy})`);
    needle.setAttribute('transform', `rotate(${(-50 + ((width - compact) / (expanded - compact)) * 100).toFixed(1)} ${nx} ${ny})`);
    // The arrangement: it changes once the screen has reached each width.
    fade(layouts[0], u < 3.6 ? 1 : u < 13.5 ? 1 - span(u, 3.6, 4) : span(u, 13.5, 13.8));
    fade(layouts[1], u < 3.6 ? 0 : u < 7.6 ? span(u, 3.6, 4) : 1 - span(u, 7.6, 8));
    fade(layouts[2], u < 7.6 ? 0 : u < 12.6 ? span(u, 7.6, 8) : 1 - span(u, 12.6, 12.9));
    const size = u < 3.6 || u >= 12.9 ? 0 : u < 7.6 ? 1 : 2;
    zones.forEach((lamp, i) => h.on(lamp, i === size));
    // The old panel, let in through the adapter.
    const old = u >= 8.4 && u < 10.2;
    h.on(adapter, old);
    wires.old.forEach((wire) => h.on(wire, old));
    // The theme: the other cartridge comes up and every branded piece follows.
    const other = u < 13.8 ? ease(span(u, 10.4, 10.9)) : 0;
    shift(swatches[0], P, [0, 0, 4 * (1 - other)]);
    shift(swatches[1], P, [0, 0, 4 * other]);
    ride(bead, route, span(u, 10.7, 11.5));
    h.on(wires.theme, u >= 10.7 && u < 11.9);
    const green = u >= 11.5 && u < 13.8;
    branded.forEach((el) => (el.style.fill = green ? GREEN : ''));
    h.say(
      u < 2.6 || u >= 13.8
        ? tr('Compacto · una columna', 'Compact · one column')
        : u < 3.6 || (u >= 6.4 && u < 7.6)
          ? tr('La manivela ensancha el bastidor', 'The crank widens the frame')
          : u < 6.4
            ? tr('Medio · lista y detalle', 'Medium · list and detail')
            : u < 8.4
              ? tr('Amplio · menú lateral, lista y detalle', 'Expanded · side menu, list and detail')
              : u < 10.4
                ? tr('El panel antiguo entra por el adaptador', 'The old panel comes in through the adapter')
                : u < 12.6
                  ? tr('Otro tema · las mismas piezas', 'Another theme · the same pieces')
                  : tr('Vuelve al ancho de un móvil', 'Back to phone width'),
    );
  };
  return { apply, still: 5 };
};

export default create;
