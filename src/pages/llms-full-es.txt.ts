import type { APIRoute } from 'astro';
import { llmsFull } from '../data/llms-full';

// The whole site in Spanish as one Markdown document.
export const GET: APIRoute = () => new Response(llmsFull('es'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
