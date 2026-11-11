import type { APIRoute } from 'astro';
import { llmsFull } from '../data/llms-full';

// The whole site in English as one Markdown document (llmstxt.org's "llms-full.txt").
export const GET: APIRoute = () => new Response(llmsFull('en'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
