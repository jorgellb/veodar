// The small drawings of the technology scenes (src/generated/small/): where each one
// is served and how big it is, so the page can reserve its box before it loads.
const svgs = import.meta.glob<string>('../generated/small/*.svg', { query: '?raw', import: 'default', eager: true });

export type SmallFigure = { src: string; width: number; height: number };

/** The thumbnail of a scene, or one of its modules: `smallFigure('cartridge', 'socket')`. */
export function smallFigure(figure: string, part?: string): SmallFigure {
  const name = part ? `${figure}--${part}` : figure;
  const svg = svgs[`../generated/small/${name}.svg`];
  if (!svg) throw new Error(`Dibujo sin generar: ${name} (npm run figures)`);
  const [, , width, height] = (svg.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 760 470').split(' ').map(Number);
  return { src: `/figures/small/${name}.svg`, width: Math.round(width), height: Math.round(height) };
}
