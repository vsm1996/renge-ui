"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PHI, EASE_OUT, FIBONACCI } from "@/lib/phi";
import { ProfileToggle } from "@/components/ui/ProfileToggle";

// ============================================================================
// Helpers
// ============================================================================

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: EASE_OUT },
  }),
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: "var(--renge-font-size-xs)",
      color: "var(--renge-color-accent)",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      fontFamily: "var(--font-body)",
      margin: 0,
      marginBottom: "var(--renge-space-3)",
    }}>
      {children}
    </p>
  );
}

function SubheadingH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontFamily: "var(--font-display)",
      fontSize: "var(--renge-font-size-2xl)",
      color: "var(--renge-color-fg)",
      fontWeight: 400,
      margin: 0,
      marginBottom: "var(--renge-space-5)",
      letterSpacing: "-0.01em",
    }}>
      {children}
    </h3>
  );
}

// ============================================================================
// Color showcase
// ============================================================================

const semanticColors = [
  { key: "bg", label: "bg" },
  { key: "bg-subtle", label: "bg-subtle" },
  { key: "bg-muted", label: "bg-muted" },
  { key: "fg", label: "fg" },
  { key: "fg-subtle", label: "fg-subtle" },
  { key: "fg-muted", label: "fg-muted" },
  { key: "border", label: "border" },
  { key: "accent", label: "accent" },
  { key: "accent-hover", label: "accent-hover" },
  { key: "accent-subtle", label: "accent-subtle" },
];

function ColorShowcase() {
  return (
    <div>
      <SectionLabel>Tokens / Color</SectionLabel>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "var(--renge-space-5)",
        flexWrap: "wrap",
        gap: "var(--renge-space-3)",
      }}>
        <SubheadingH3>Color profiles.</SubheadingH3>
        <ProfileToggle />
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "var(--renge-space-3)",
      }}>
        {semanticColors.map(({ key, label }) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-1)" }}>
            <div style={{
              height: 60,
              borderRadius: "var(--renge-radius-2)",
              background: `var(--renge-color-${key})`,
              border: "1px solid var(--renge-color-border-subtle)",
              transition: "background 600ms var(--renge-easing-ease-in-out)",
            }} />
            <p style={{
              fontSize: "var(--renge-font-size-xs)",
              color: "var(--renge-color-fg-muted)",
              fontFamily: "var(--font-mono, monospace)",
              margin: 0,
              letterSpacing: "0.04em",
            }}>
              --renge-color-{label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Spacing showcase
// ============================================================================

function SpacingShowcase() {
  const fibSteps = FIBONACCI.slice(0, 8).map((fib, i) => ({
    step: i + 1,
    px: fib * 4,
    fib,
  }));

  return (
    <div>
      <SectionLabel>Tokens / Spacing</SectionLabel>
      <SubheadingH3>Fibonacci spacing.</SubheadingH3>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-3)" }}>
        {fibSteps.map(({ step, px, fib }) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-4)" }}>
            <div style={{
              width: 48,
              fontSize: "var(--renge-font-size-xs)",
              color: "var(--renge-color-fg-muted)",
              fontFamily: "var(--font-mono, monospace)",
              flexShrink: 0,
              letterSpacing: "0.04em",
            }}>
              {step}
            </div>
            <div style={{
              width: px,
              maxWidth: "calc(100% - 120px)",
              height: 8,
              background: "var(--renge-color-accent)",
              borderRadius: "var(--renge-radius-full)",
              opacity: 0.5 + (step / 10) * 0.5,
              flexShrink: 0,
            }} />
            <div style={{
              fontSize: "var(--renge-font-size-xs)",
              color: "var(--renge-color-fg-muted)",
              fontFamily: "var(--font-mono, monospace)",
              letterSpacing: "0.04em",
            }}>
              {fib} × 4 = {px}px
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Typography showcase
// ============================================================================

const typeSteps = [
  { key: "xs", label: "xs", exp: -2 },
  { key: "sm", label: "sm", exp: -1 },
  { key: "base", label: "base", exp: 0 },
  { key: "lg", label: "lg", exp: 1 },
  { key: "xl", label: "xl", exp: 2 },
  { key: "2xl", label: "2xl", exp: 3 },
  { key: "3xl", label: "3xl", exp: 4 },
  { key: "4xl", label: "4xl", exp: 5 },
];

function TypeScaleShowcase() {
  return (
    <div>
      <SectionLabel>Tokens / Typography</SectionLabel>
      <SubheadingH3>PHI type scale.</SubheadingH3>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-3)" }}>
        {typeSteps.slice().reverse().map(({ key, label, exp }) => {
          const px = (16 * Math.pow(PHI, exp)).toFixed(2);
          return (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "var(--renge-space-4)",
                borderBottom: "1px solid var(--renge-color-border-subtle)",
                paddingBottom: "var(--renge-space-2)",
              }}
            >
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: `var(--renge-font-size-${key})`,
                color: "var(--renge-color-fg)",
                lineHeight: `var(--renge-line-height-${key})`,
                flex: 1,
              }}>
                {key === "4xl" || key === "3xl" ? "Proportion." : "The ratios that appear in living things."}
              </span>
              <span style={{
                fontSize: "var(--renge-font-size-xs)",
                color: "var(--renge-color-fg-muted)",
                fontFamily: "var(--font-mono, monospace)",
                flexShrink: 0,
                letterSpacing: "0.04em",
              }}>
                {label} · {px}px · φ^{exp}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// Motion showcase
// ============================================================================

const easings: { key: string; label: string; curve: [number, number, number, number] }[] = [
  { key: "ease-out", label: "ease-out", curve: [0.22, 1, 0.36, 1] },
  { key: "ease-in", label: "ease-in", curve: [0.55, 0.055, 0.675, 0.19] },
  { key: "ease-in-out", label: "ease-in-out", curve: [0.65, 0, 0.35, 1] },
  { key: "spring", label: "spring", curve: [0.175, 0.885, 0.32, 1.275] },
];

function MotionShowcase() {
  return (
    <div>
      <SectionLabel>Tokens / Motion</SectionLabel>
      <SubheadingH3>Natural easing.</SubheadingH3>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-4)" }}>
        {easings.map(({ key, label, curve }) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-4)" }}>
            <div style={{
              width: 100,
              fontSize: "var(--renge-font-size-xs)",
              color: "var(--renge-color-fg-muted)",
              fontFamily: "var(--font-mono, monospace)",
              flexShrink: 0,
              letterSpacing: "0.04em",
            }}>
              {label}
            </div>
            <div style={{ flex: 1, position: "relative", height: 32 }}>
              <motion.div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  translateY: "-50%",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--renge-color-accent)",
                }}
                animate={{ x: "calc(100vw - 200px)" }}
                transition={{
                  duration: 1.5,
                  ease: curve,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.5,
                }}
              />
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 1,
                background: "var(--renge-color-border-subtle)",
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Radius showcase
// ============================================================================

const radiusSteps = [
  { key: "1", px: 4, fib: 1 },
  { key: "2", px: 8, fib: 2 },
  { key: "3", px: 12, fib: 3 },
  { key: "4", px: 20, fib: 5 },
  { key: "5", px: 32, fib: 8 },
  { key: "full", px: 9999, fib: null },
];

function RadiusShowcase() {
  return (
    <div>
      <SectionLabel>Tokens / Radius</SectionLabel>
      <SubheadingH3>Border radius.</SubheadingH3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--renge-space-5)", alignItems: "flex-end" }}>
        {radiusSteps.map(({ key, px, fib }) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--renge-space-2)" }}>
            <div style={{
              width: 56,
              height: 56,
              background: "var(--renge-color-accent-subtle)",
              border: "1px solid var(--renge-color-accent)",
              borderRadius: key === "full" ? "var(--renge-radius-full)" : `var(--renge-radius-${key})`,
            }} />
            <div style={{
              fontSize: "var(--renge-font-size-xs)",
              color: "var(--renge-color-fg-muted)",
              fontFamily: "var(--font-mono, monospace)",
              textAlign: "center",
              letterSpacing: "0.04em",
            }}>
              <div>{key}</div>
              <div>{fib ? `${px}px` : "pill"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Main section
// ============================================================================

export function TokenShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="tokens"
      style={{
        padding: "var(--renge-space-8) var(--renge-space-5)",
        background: "var(--renge-color-bg)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
          style={{ marginBottom: "var(--renge-space-7)", textAlign: "center" }}
        >
          <SectionLabel>The system</SectionLabel>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, var(--renge-font-size-3xl))",
            color: "var(--renge-color-fg)",
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            Every token derived. Nothing arbitrary.
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-8)" }}>
          {[ColorShowcase, SpacingShowcase, TypeScaleShowcase, MotionShowcase, RadiusShowcase].map(
            (Component, i) => (
              <motion.div
                key={i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0.1 + i * 0.08}
                variants={fadeUp}
              >
                <Component />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
