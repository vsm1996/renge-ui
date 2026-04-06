/**
 * build-css.mjs
 *
 * Generates dist/renge.css — a static stylesheet containing all Renge tokens.
 * Runs after tsup via onSuccess, importing from the already-built dist/.
 *
 * Output structure:
 *   :root                                        — spacing, type, motion, radius, palette, animations
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

const theme = createRengeTheme();
const baseVars = {};

for (const [key, value] of Object.entries(theme.vars)) {
  if (
    key.startsWith("--renge-space-") ||
    key.startsWith("--renge-font-size-") ||
    key.startsWith("--renge-line-height-") ||
    key.startsWith("--renge-radius-") ||
    key.startsWith("--renge-duration-") ||
    key.startsWith("--renge-easing-") ||
    key.startsWith("--renge-size-") ||
    key.startsWith("--renge-animation-") ||
    key.startsWith("--renge-palette-")
  ) {
    baseVars[key] = value;
  }
}

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
