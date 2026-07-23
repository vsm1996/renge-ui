/**
 * build-css.mjs
 *
 * Generates dist/renge.css — a static stylesheet containing all Renge tokens.
 * Runs after tsup via onSuccess, importing from the already-built dist/.
 *
 * Output structure:
 *   :root                                        — spacing, type, motion, radius, palette, animations
 *                                                  + default profile (ocean light) semantic colors
 *   @media prefers-color-scheme: dark            — default profile dark, when no data-profile is set
 *   [data-profile="X"]                           — light color vars for each profile
 *   [data-profile="X"][data-mode="dark"]         — explicit dark
 *   @media prefers-color-scheme: dark            — system dark preference
 *
 * Usage in any framework (no React required):
 *   import "@renge-ui/tokens/renge.css"    // Next.js, Vite, etc.
 *   @import "@renge-ui/tokens/renge.css";  // plain CSS
 */

import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const outFile = resolve(distDir, "renge.css");

// Import from the freshly-built ESM output
const {
  createRengeTheme,
  profiles,
  createSemanticColorVars,
  createAnimationKeyframesCSS,
} = await import(resolve(distDir, "index.mjs"));

// ─── Helpers ─────────────────────────────────────────────────────────────────

function varsToBlock(vars, indent = "  ") {
  return Object.entries(vars)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([k, v]) => `${indent}${k}: ${v};`)
    .join("\n");
}

// ─── 1. Base vars (:root) ─────────────────────────────────────────────────────

// The default profile whose semantic colors seed :root, so var(--renge-color-*)
// resolves with zero JS and no data-profile attribute. Must match
// createRengeTheme()'s defaults (see src/theme.ts).
const DEFAULT_PROFILE = "ocean";

const theme = createRengeTheme();
const baseVars = {};

// Inject EVERY non-color token — spacing, type, radius, motion, shadow,
// z-index, width/height/min/max, size, container, aspect, palette, animation, …
// Semantic colors are seeded per-profile below (see §DEFAULT_PROFILE and the
// per-profile blocks). A hand-maintained allowlist here previously omitted
// whole categories (shadow, z-index, w/h/min/max), so petals referencing them
// rendered incomplete on a plain-CSS import. "Everything but color" stays
// complete as tokens are added.
for (const [key, value] of Object.entries(theme.vars)) {
  if (key.startsWith("--renge-color-")) continue;
  baseVars[key] = value;
}

// Seed :root with the default profile's semantic colors so the color system
// works on plain CSS import — no data-profile attribute, no JS required.
// [data-profile="X"] blocks below override these (equal specificity, later in
// source order) the moment a profile attribute is set.
const defaultLightVars = createSemanticColorVars(profiles[DEFAULT_PROFILE].light);
const defaultDarkVars = createSemanticColorVars(profiles[DEFAULT_PROFILE].dark);
Object.assign(baseVars, defaultLightVars);

const lines = [];

lines.push("/* @renge-ui/tokens — generated stylesheet */");
lines.push("/* Import once in your root layout — no React, no dangerouslySetInnerHTML */");
lines.push("/*   Next.js:  import '@renge-ui/tokens/renge.css' in app/layout.tsx   */");
lines.push("/*   CSS:      @import '@renge-ui/tokens/renge.css';                   */");
lines.push("");

lines.push(":root {");
lines.push(varsToBlock(baseVars));
lines.push("}");
lines.push("");

// Default profile follows the system dark preference until an explicit
// data-profile is set (at which point the per-profile blocks below take over).
lines.push("@media (prefers-color-scheme: dark) {");
lines.push("  :root:not([data-profile]) {");
lines.push(varsToBlock(defaultDarkVars, "    "));
lines.push("  }");
lines.push("}");
lines.push("");

// ─── 2. Animation keyframes ───────────────────────────────────────────────────

const keyframes = createAnimationKeyframesCSS();
if (keyframes) {
  lines.push("/* Animation Keyframes */");
  lines.push(keyframes);
  lines.push("");
}

// ─── 3. Profile color vars ────────────────────────────────────────────────────

lines.push("/* ─── Color Profiles ────────────────────────────────────────────── */");
lines.push("/* Set data-profile on <html> to activate:                           */");
lines.push("/*   <html data-profile=\"ocean\">                    ← light           */");
lines.push("/*   <html data-profile=\"ocean\" data-mode=\"dark\">  ← explicit dark    */");
lines.push("/* System dark preference is also respected automatically.            */");
lines.push("");

for (const name of Object.keys(profiles)) {
  const variant = profiles[name];
  const lightVars = createSemanticColorVars(variant.light);
  const darkVars  = createSemanticColorVars(variant.dark);

  lines.push(`/* ${name} ─────────────────── */`);

  lines.push(`[data-profile="${name}"] {`);
  lines.push(varsToBlock(lightVars));
  lines.push("}");
  lines.push("");

  lines.push(`[data-profile="${name}"][data-mode="dark"] {`);
  lines.push(varsToBlock(darkVars));
  lines.push("}");
  lines.push("");

  lines.push(`@media (prefers-color-scheme: dark) {`);
  lines.push(`  [data-profile="${name}"]:not([data-mode="light"]) {`);
  lines.push(varsToBlock(darkVars, "    "));
  lines.push("  }");
  lines.push("}");
  lines.push("");
}

// ─── Write ────────────────────────────────────────────────────────────────────

mkdirSync(distDir, { recursive: true });
writeFileSync(outFile, lines.join("\n"), "utf8");
console.log(`✓ dist/renge.css written`);
