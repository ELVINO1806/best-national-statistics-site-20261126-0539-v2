// NusaStat hand-in program.
//
// Copies the site (app/) and its screenshots (screenshots/) from this
// repository into the output directory, then writes dossier.json there with
// buildDossier from vendor/makefun-frontend.ts.
//
// Output directory: MAKEFUN_OUTPUT_DIR when set, otherwise /output.
// Node 22, standard library only.

import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Gate caps for this bounty: text at most 163840 bytes, at most 4 screenshots
// of at most 262144 bytes each, app at most 993 files and 16777216 bytes.
const caps = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216
};

mkdirSync(outDir, { recursive: true });
cpSync(join(repoRoot, "app"), join(outDir, "app"), { recursive: true });
cpSync(join(repoRoot, "screenshots"), join(outDir, "screenshots"), { recursive: true });

const dossier = buildDossier(outDir, caps);
writeFileSync(join(outDir, "dossier.json"), dossier);
console.log(`dossier.json written: ${dossier.length} bytes`);
