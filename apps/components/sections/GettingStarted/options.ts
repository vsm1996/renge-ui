export const OPTIONS = [
  {
    id: "twv4",
    label: "Tailwind v4",
    description: "One plugin line. All tokens baked into your stylesheet at build time — no runtime injection, no flash.",
    code: `# Install
pnpm add @renge-ui/tailwind

# globals.css
@import "tailwindcss";
@plugin "@renge-ui/tailwind/plugin";

# layout.tsx (or any root element)
<html data-profile="ocean">

# Use the utilities — all Tailwind variants work (hover:, md:, dark:, etc.)
<div class="bg-renge-bg text-renge-fg p-renge-5 rounded-renge-2">
  <button class="bg-renge-accent hover:bg-renge-accent-hover
                 text-renge-fg-inverse px-renge-4 py-renge-3
                 rounded-renge-full duration-renge-2 ease-renge-ease-out
                 transition-colors">
    Click me
  </button>
</div>

# Switch profiles at runtime — no rebuild needed
document.documentElement.setAttribute("data-profile", "twilight");
document.documentElement.setAttribute("data-mode", "dark");`,
  },
  {
    id: "twv3",
    label: "Tailwind v3",
    description: "Preset for Tailwind v3 — extends theme with renge-* suffixed utilities. Requires token CSS injected separately.",
    code: `# Install
pnpm add @renge-ui/tailwind @renge-ui/tokens

# tailwind.config.ts
import rengePreset from "@renge-ui/tailwind";
import type { Config } from "tailwindcss";

export default {
  presets: [rengePreset],
  content: ["./src/**/*.{ts,tsx}"],
} satisfies Config;

# app/layout.tsx — inject token CSS server-side (no flash)
import { RengeStylesheet } from "@renge-ui/react";

export default function RootLayout({ children }) {
  return (
    <html data-profile="ocean">
      <head>
        <RengeStylesheet />
      </head>
      <body>{children}</body>
    </html>
  );
}

# Same utility classes as v4
<div class="bg-renge-bg text-renge-fg p-renge-5 rounded-renge-2">`,
  },
  {
    id: "css",
    label: "CSS",
    description: "Static stylesheet — import once, no runtime injection, no hydration errors. Framework agnostic.",
    code: `# Install
pnpm add @renge-ui/tokens

# Import the pre-built stylesheet once in your root
import '@renge-ui/tokens/renge.css';  // JS/TS
@import '@renge-ui/tokens/renge.css'; // plain CSS

# Activate a color profile on <html>
<html data-profile="ocean">            # light (default)
<html data-profile="ocean" data-mode="dark">  # dark

# Available profiles: ocean · earth · twilight · fire · void · leaf
# System prefers-color-scheme respected automatically — no attribute needed.

# — Advanced: programmatic config —
# Use createRengeTheme() when you need a custom base unit or selector.
import { createRengeTheme } from "@renge-ui/tokens";

const { css } = createRengeTheme({ profile: "earth", mode: "dark" });
// Inject css string however you need — <style> tag, SSR, etc.`,
  },
  {
    id: "next",
    label: "Next.js",
    description: "Import renge.css in your root layout — one line, no flash, no dangerouslySetInnerHTML.",
    code: `// app/layout.tsx
import '@renge-ui/tokens/renge.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-profile="ocean">
      <body>{children}</body>
    </html>
  );
}

// Switch profiles at runtime — no rebuild needed
document.documentElement.setAttribute("data-profile", "twilight");
document.documentElement.setAttribute("data-mode", "dark");

// — Advanced: server-generated CSS for a specific user —
import { createRengeTheme } from "@renge-ui/tokens";

const { css } = createRengeTheme({ profile: "earth" });
// Inline as a <style> tag or pass to a style sheet endpoint`,
  },
  {
    id: "vars",
    label: "rengeVars",
    description: "Typed CSS variable references — no string construction, full IDE autocomplete.",
    code: `import { createRengeTheme, rengeVars } from "@renge-ui/tokens";

// Use rengeVars anywhere you need a CSS var() string
const cardStyle = {
  background: rengeVars.color.bg,          // "var(--renge-color-bg)"
  padding:    rengeVars.space[4],           // "var(--renge-space-4)"
  borderRadius: rengeVars.radius[2],        // "var(--renge-radius-2)"
  fontSize:   rengeVars.fontSize.base,      // "var(--renge-font-size-base)"
  transition: \`all \${rengeVars.duration[2]} \${rengeVars.easing.out}\`,
};

// Map Renge tokens to your system's variable names — no guessing needed
const theme = createRengeTheme({ profile: "earth", mode: "light" });
const aliases = [
  ["--color-primary",  rengeVars.color.accent],
  ["--color-bg",       rengeVars.color.bg],
  ["--color-text",     rengeVars.color.fg],
  ["--color-error",    rengeVars.color.danger],
].map(([k, v]) => \`  \${k}: \${v};\`).join("\\n");

document.head.insertAdjacentHTML("beforeend",
  \`<style>\${theme.css}\\n:root {\\n\${aliases}\\n}</style>\`
);`,
  },
] as const;
