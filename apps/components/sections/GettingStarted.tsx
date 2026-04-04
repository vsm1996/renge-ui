"use client";
import { EASE_OUT } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: EASE_OUT },
  }),
};

// ============================================================================
// Code block
// ============================================================================

function CodeBlock({ code }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: "relative",
      background: "var(--renge-color-bg-inverse)",
      borderRadius: "var(--renge-radius-2)",
      padding: "var(--renge-space-5)",
      border: "1px solid var(--renge-color-border)",
      overflow: "auto",
    }}>
      <button
        onClick={copy}
        aria-label="Copy code"
        style={{
          position: "absolute",
          top: "var(--renge-space-3)",
          right: "var(--renge-space-3)",
          padding: "var(--renge-space-1) var(--renge-space-3)",
          background: copied ? "var(--renge-color-accent)" : "transparent",
          border: `1px solid var(--renge-color-border)`,
          borderRadius: "var(--renge-radius-full)",
          color: copied ? "var(--renge-color-fg-inverse)" : "var(--renge-color-fg-inverse)",
          fontSize: "var(--renge-font-size-xs)",
          fontFamily: "var(--font-body)",
          cursor: "pointer",
          transition: "all 200ms var(--renge-easing-ease-out)",
          opacity: 0.7,
          letterSpacing: "0.04em",
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre style={{ margin: 0, overflow: "auto" }}>
        <code style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "var(--renge-font-size-sm)",
          color: "var(--renge-color-fg-inverse)",
          lineHeight: "var(--renge-line-height-base)",
          whiteSpace: "pre",
        }}>
          {code}
        </code>
      </pre>
    </div>
  );
}

// ============================================================================
// Install option tabs
// ============================================================================

const OPTIONS = [
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
    lang: "tsx",
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
    lang: "tsx",
  },
  {
    id: "css",
    label: "CSS",
    description: "CSS custom properties — framework agnostic.",
    code: `import { createRengeTheme } from "@renge-ui/tokens";

const theme = createRengeTheme({ profile: "ocean" });

// Inject into your document
const style = document.createElement("style");
style.textContent = theme.css;
document.head.appendChild(style);`,
    lang: "ts",
  },
  {
    id: "next",
    label: "Next.js",
    description: "Server-side injection via RengeStylesheet — no flash, no useInsertionEffect.",
    code: `// app/layout.tsx
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

// Or generate the CSS manually for full control:
import { createRengeTheme } from "@renge-ui/tokens";

const theme = createRengeTheme({ profile: "ocean" });
// theme.css — complete :root { --renge-* } block`,
    lang: "tsx",
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
    lang: "ts",
  },
];

export function GettingStarted() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useBreakpoint();
  const [activeOption, setActiveOption] = useState("twv4");

  const active = OPTIONS.find((o) => o.id === activeOption) ?? OPTIONS[0];

  return (
    <section
      ref={ref}
      id="start"
      style={{
        padding: `var(--renge-space-8) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
        background: "var(--renge-color-bg-subtle)",
        borderTop: "1px solid var(--renge-color-border-subtle)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
          style={{ marginBottom: "var(--renge-space-7)" }}
        >
          <p style={{
            fontSize: "var(--renge-font-size-xs)",
            color: "var(--renge-color-accent)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            margin: 0,
            marginBottom: "var(--renge-space-3)",
          }}>
            Get started
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4vw, 56px)",
            color: "var(--renge-color-fg)",
            fontWeight: 400,
            margin: 0,
            marginBottom: "var(--renge-space-5)",
            letterSpacing: "-0.02em",
          }}>
            Install and consume.
          </h2>
          <CodeBlock code="pnpm add @renge-ui/tailwind @renge-ui/tokens" lang="bash" />
        </motion.div>

        {/* Option tabs */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.15}
          variants={fadeUp}
        >
          <div style={{
            display: "flex",
            gap: "var(--renge-space-2)",
            marginBottom: "var(--renge-space-4)",
            flexWrap: "wrap",
          }}>
            {OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => setActiveOption(o.id)}
                style={{
                  padding: "var(--renge-space-2) var(--renge-space-4)",
                  borderRadius: "var(--renge-radius-full)",
                  border: `1px solid ${o.id === activeOption ? "var(--renge-color-accent)" : "var(--renge-color-border)"}`,
                  background: o.id === activeOption ? "var(--renge-color-accent-subtle)" : "transparent",
                  color: o.id === activeOption ? "var(--renge-color-accent)" : "var(--renge-color-fg-muted)",
                  fontSize: "var(--renge-font-size-sm)",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                  transition: "all 200ms var(--renge-easing-ease-out)",
                  letterSpacing: "0.04em",
                }}
              >
                {o.label}
              </button>
            ))}
          </div>

          <p style={{
            fontSize: "var(--renge-font-size-sm)",
            color: "var(--renge-color-fg-muted)",
            fontFamily: "var(--font-body)",
            margin: 0,
            marginBottom: "var(--renge-space-4)",
          }}>
            {active.description}
          </p>
          <CodeBlock code={active.code} lang={active.lang} />
        </motion.div>
      </div>
    </section>
  );
}
