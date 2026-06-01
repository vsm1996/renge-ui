"use client";
import { EASE_OUT } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: EASE_OUT },
  }),
};

// ─── Layout utility showcase cards ──────────────────────────────────────────

function UtilityCard({
  label,
  cls,
  description,
  children,
}: {
  label: string;
  cls: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      background: "var(--renge-color-bg)",
      border: "1px solid var(--renge-color-border-subtle)",
      borderRadius: "var(--renge-radius-3)",
      overflow: "hidden",
    }}>
      {/* Visual demo area */}
      <div style={{
        padding: "var(--renge-space-5)",
        minHeight: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--renge-color-bg-subtle)",
        borderBottom: "1px solid var(--renge-color-border-subtle)",
      }}>
        {children}
      </div>

      {/* Label + description */}
      <div style={{ padding: "var(--renge-space-4)" }}>
        <p style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "var(--renge-font-size-sm)",
          color: "var(--renge-color-accent)",
          margin: 0,
          marginBottom: "var(--renge-space-2)",
          letterSpacing: "0.02em",
        }}>
          {cls}
        </p>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--renge-font-size-sm)",
          color: "var(--renge-color-fg-subtle)",
          margin: 0,
          lineHeight: "var(--renge-line-height-base)",
        }}>
          {label} — {description}
        </p>
      </div>
    </div>
  );
}

// ─── Mini visual demos ────────────────────────────────────────────────────────

function StackDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-2)", width: "100%", maxWidth: 180 }}>
      {["Item 1", "Item 2", "Item 3"].map(label => (
        <div key={label} style={{
          padding: "var(--renge-space-2) var(--renge-space-3)",
          background: "var(--renge-color-accent-subtle)",
          borderRadius: "var(--renge-radius-2)",
          fontSize: "var(--renge-font-size-sm)",
          color: "var(--renge-color-accent)",
          fontFamily: "var(--font-body)",
        }}>
          {label}
        </div>
      ))}
    </div>
  );
}

function GridDemo() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "var(--renge-space-2)",
      width: "100%",
    }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{
          height: 32,
          background: i % 3 === 0
            ? "var(--renge-color-accent-subtle)"
            : "var(--renge-color-bg-muted)",
          borderRadius: "var(--renge-radius-2)",
          border: "1px solid var(--renge-color-border-subtle)",
        }} />
      ))}
    </div>
  );
}

function AspectDemo() {
  return (
    <div style={{ display: "flex", gap: "var(--renge-space-3)", alignItems: "flex-end" }}>
      {/* 1:1 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--renge-space-2)" }}>
        <div style={{
          width: 40, height: 40,
          background: "var(--renge-color-bg-muted)",
          borderRadius: "var(--renge-radius-2)",
          border: "1px solid var(--renge-color-border)",
        }} />
        <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)" }}>1:1</span>
      </div>
      {/* golden 1:φ */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--renge-space-2)" }}>
        <div style={{
          width: 64, height: 40,
          background: "var(--renge-color-accent-subtle)",
          borderRadius: "var(--renge-radius-2)",
          border: "1px solid var(--renge-color-accent)",
        }} />
        <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)" }}>1:φ</span>
      </div>
      {/* 16:9 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--renge-space-2)" }}>
        <div style={{
          width: 71, height: 40,
          background: "var(--renge-color-bg-muted)",
          borderRadius: "var(--renge-radius-2)",
          border: "1px solid var(--renge-color-border)",
        }} />
        <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)" }}>16:9</span>
      </div>
    </div>
  );
}

function ContainerDemo() {
  const WIDTHS = [
    { label: "sm", px: 524 },
    { label: "md", px: 847 },
    { label: "lg", px: 1371 },
    { label: "xl", px: 2218 },
  ];
  const maxPx = WIDTHS[WIDTHS.length - 1].px;
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
      {WIDTHS.map(({ label, px }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-3)" }}>
          <span style={{
            width: 24,
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "var(--renge-font-size-sm)",
            color: "var(--renge-color-fg-muted)",
            flexShrink: 0,
          }}>
            {label}
          </span>
          <div style={{
            height: 10,
            width: `${(px / maxPx) * 100}%`,
            background: label === "lg"
              ? "var(--renge-color-accent)"
              : "var(--renge-color-bg-muted)",
            borderRadius: "var(--renge-radius-full)",
            border: label === "lg"
              ? "none"
              : "1px solid var(--renge-color-border-subtle)",
          }} />
          <span style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "var(--renge-font-size-sm)",
            color: label === "lg" ? "var(--renge-color-accent)" : "var(--renge-color-fg-muted)",
            flexShrink: 0,
          }}>
            {px}px
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function TailwindPlugin() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useBreakpoint();

  const utilities = [
    {
      label: "Stack",
      cls: "stack / stack-h",
      description: "Flex column or row. Compose with gap-renge-* from the Fibonacci spacing scale.",
      demo: <StackDemo />,
    },
    {
      label: "Container",
      cls: "container-renge-{sm|md|lg|xl}",
      description: "Centered max-width wrapper. Widths follow 200px × φⁿ — each tier is φ times the previous.",
      demo: <ContainerDemo />,
    },
    {
      label: "Grid",
      cls: "grid-cols-renge-{2|3|4|6|12}",
      description: "Base-6 column set with 12-column extension. Auto-fit/fill variants use Fibonacci min-widths.",
      demo: <GridDemo />,
    },
    {
      label: "Aspect ratio",
      cls: "aspect-renge-{square|golden|vertical|video}",
      description: "golden = φ ≈ 1.618 (34:21 Fibonacci). vertical = 1/φ. Ratios are CSS custom properties.",
      demo: <AspectDemo />,
    },
  ];

  return (
    <section
      ref={ref}
      id="tailwind"
      style={{
        padding: `var(--renge-space-8) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
        background: "var(--renge-color-bg)",
        borderTop: "1px solid var(--renge-color-border-subtle)",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
          style={{ marginBottom: "var(--renge-space-7)" }}
        >
          <p style={{
            fontSize: "var(--renge-font-size-sm)",
            color: "var(--renge-color-accent)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            margin: 0,
            marginBottom: "var(--renge-space-3)",
          }}>
            @renge-ui/tailwind
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
            Layout without compromise.
          </h2>
          <p style={{
            fontSize: "var(--renge-font-size-lg)",
            color: "var(--renge-color-fg-subtle)",
            lineHeight: "var(--renge-line-height-lg)",
            margin: 0,
            maxWidth: 560,
            fontFamily: "var(--font-body)",
          }}>
            One plugin line. Every layout primitive derives from the same mathematical
            foundation as every spacing, color, and motion token.
          </p>
        </motion.div>

        {/* Utility cards */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.15}
          variants={fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "var(--renge-space-4)",
            marginBottom: "var(--renge-space-7)",
          }}
        >
          {utilities.map((u, i) => (
            <motion.div
              key={u.cls}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.15 + i * 0.07}
              variants={fadeUp}
            >
              <UtilityCard label={u.label} cls={u.cls} description={u.description}>
                {u.demo}
              </UtilityCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Code snippet + install */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.45}
          variants={fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
            gap: "var(--renge-space-5)",
            alignItems: "start",
          }}
        >
          {/* Code block */}
          <div style={{
            background: "var(--renge-color-bg-inverse)",
            borderRadius: "var(--renge-radius-3)",
            padding: "var(--renge-space-5)",
            border: "1px solid var(--renge-color-border)",
            overflow: "auto",
          }}>
            <pre style={{ margin: 0 }}>
              <code style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: "var(--renge-font-size-sm)",
                color: "var(--renge-color-fg-inverse)",
                lineHeight: "1.8",
                display: "block",
              }}>{`/* globals.css — one line */
@plugin "@renge-ui/tailwind/plugin";

/* HTML — activate a color profile */
<html data-profile="ocean" data-mode="light">

/* All Tailwind variants work */
<div class="container-renge-lg px-renge-5">
  <div class="stack gap-renge-6">
    <div class="grid grid-cols-renge-3 gap-renge-4
                md:grid-cols-auto-fit-renge-sm">
      <div class="aspect-renge-golden bg-renge-bg-subtle
                  rounded-renge-3" />
    </div>
  </div>
</div>`}</code>
            </pre>
          </div>

          {/* Install + link */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--renge-space-4)",
          }}>
            <div>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--renge-font-size-sm)",
                color: "var(--renge-color-fg-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: 0,
                marginBottom: "var(--renge-space-2)",
              }}>
                Install
              </p>
              <div style={{
                background: "var(--renge-color-bg-inverse)",
                borderRadius: "var(--renge-radius-2)",
                padding: "var(--renge-space-3) var(--renge-space-4)",
                border: "1px solid var(--renge-color-border)",
              }}>
                <code style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "var(--renge-font-size-sm)",
                  color: "var(--renge-color-fg-inverse)",
                  whiteSpace: "nowrap",
                }}>
                  pnpm add @renge-ui/tailwind
                </code>
              </div>
            </div>

            <div style={{
              padding: "var(--renge-space-4)",
              background: "var(--renge-color-bg-subtle)",
              borderRadius: "var(--renge-radius-2)",
              border: "1px solid var(--renge-color-border-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--renge-space-2)",
            }}>
              {[
                ["stack / stack-h", "flex direction"],
                ["flex-renge-row/col", "flex + gap defaults"],
                ["container-renge-*", "φⁿ max-widths"],
                ["grid-cols-renge-*", "base-6 columns"],
                ["grid-cols-auto-fit-*", "Fibonacci min-widths"],
                ["aspect-renge-*", "φ-derived ratios"],
              ].map(([cls, note]) => (
                <div key={cls} style={{ display: "flex", justifyContent: "space-between", gap: "var(--renge-space-4)" }}>
                  <code style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "var(--renge-font-size-sm)",
                    color: "var(--renge-color-accent)",
                  }}>
                    {cls}
                  </code>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--renge-font-size-sm)",
                    color: "var(--renge-color-fg-muted)",
                    whiteSpace: "nowrap",
                  }}>
                    {note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
