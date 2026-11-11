import type { APIRoute } from 'astro';

// The small drawings of the technology scenes: the thumbnail of each one (shown on
// its card) and its modules on their own (shown beside each service). They carry no
// text and their own styles, so one file serves both languages and can be used as an
// image, which the browser loads only when it comes near the screen.
const svgs = import.meta.glob<string>('../../../generated/small/*.svg', { query: '?raw', import: 'default', eager: true });
const names = Object.keys(svgs).map((path) => path.split('/').pop()!.replace('.svg', ''));

export function getStaticPaths() {
  return names.map((name) => ({ params: { name } }));
}

export const GET: APIRoute = ({ params }) =>
  new Response(svgs[`../../../generated/small/${params.name}.svg`], { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
