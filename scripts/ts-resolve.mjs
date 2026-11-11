// Lets `node --test` import the site's TypeScript data modules the way Astro does:
// "../i18n" finds ../i18n/index.ts and "./pages" finds ./pages.ts. Node already runs
// .ts files by stripping their types; it only lacks this lookup.
import { registerHooks } from 'node:module';

const TAILS = ['.ts', '/index.ts', '.mjs', '.js'];

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (!specifier.startsWith('.')) throw error;
      for (const tail of TAILS) {
        try {
          return nextResolve(specifier + tail, context);
        } catch {
          // Try the next spelling.
        }
      }
      throw error;
    }
  },
});
