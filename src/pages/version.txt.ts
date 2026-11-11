import type { APIRoute } from 'astro';

// The commit this build was made from. The IndexNow workflow reads it to know when
// veodar.com is already serving the commit it was started for (scripts/indexnow.mjs).
// Node's `process`, typed here because the project carries no Node typings.
const env = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};

export const GET: APIRoute = () => new Response(`${env.VERCEL_GIT_COMMIT_SHA ?? 'local'}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
