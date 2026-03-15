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
    id: "css",
    label: "CSS",
    description: "CSS custom properties — framework agnostic.",
    code: `import { createRengeTheme } from "@renge/tokens";

const theme = createRengeTheme({ profile: "ocean" });

// Inject into your document
const style = document.createElement("style");
style.textContent = theme.css;
document.head.appendChild(style);`,
    lang: "ts",
  },
  {
    id: "js",
    label: "JavaScript",
    description: "Typed tokens for direct consumption.",
    code: `import {
  PHI,
  FIBONACCI,
  createRengeTheme,
  profiles,
} from "@renge/tokens";

const theme = createRengeTheme({ profile: "earth" });
// theme.vars — Record<string, string>
// theme.css  — full :root { ... } block`,
    lang: "ts",
  },
  {
    id: "next",
    label: "Next.js",
    description: "Server-side injection — no flash.",
    code: `// app/layout.tsx
import { createRengeTheme } from "@renge/tokens";

export default function RootLayout({ children }) {
  const theme = createRengeTheme({ profile: "ocean" });
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: theme.css }} />
      </head>
      <body>{children}</body>
    </html>
  );
}`,
    lang: "tsx",
  },
];

export function GettingStarted() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useBreakpoint();
  const [activeOption, setActiveOption] = useState("css");

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
          <CodeBlock code="pnpm add @renge/tokens" lang="bash" />
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
