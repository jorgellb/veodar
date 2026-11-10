// Rebuilds every figure: `npm run figures`.
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const builds = ["plant.mjs", ...readdirSync(here).filter((name) => name.startsWith("fig-") && name.endsWith(".mjs")).sort()];
for (const name of builds) await import(pathToFileURL(join(here, name)).href);
