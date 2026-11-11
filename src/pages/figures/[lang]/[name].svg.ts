import type { APIRoute } from 'astro';
import { LANGS, type Lang } from '../../../i18n';
import { localizeSvg } from '../../../i18n/figures';

// Each isometric figure as its own file, in both languages. Figures below the first
// screen are not inlined in the page: Figure.astro fetches them from here when they
// come near the viewport, which keeps the HTML light.
const svgs = import.meta.glob<string>('../../../generated/*.svg', { query: '?raw', import: 'default', eager: true });
const names = Object.keys(svgs).map((path) => path.split('/').pop()!.replace('.svg', ''));

export function getStaticPaths() {
  return LANGS.flatMap((lang) => names.map((name) => ({ params: { lang, name } })));
}

export const GET: APIRoute = ({ params }) => {
  const name = params.name!;
  const svg = localizeSvg(svgs[`../../../generated/${name}.svg`], name, params.lang as Lang);
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
};
