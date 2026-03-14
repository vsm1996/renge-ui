"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PHI, EASE_OUT, FIBONACCI } from "@/lib/phi";

// ============================================================================
// PHI visualization — animated golden ratio bars
// ============================================================================

function PhiViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
      {[1, PHI, PHI * PHI].map((ratio, i) => (
        <motion.div
          key={i}
          style={{
            height: 2,
            background: "var(--renge-color-accent)",
            transformOrigin: "left",
            opacity: 1 - i * 0.2,
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: ratio / (PHI * PHI) } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: i * 0.15, ease: EASE_OUT }}
        />
      ))}
      <div style={{
        display: "flex",
        gap: "var(--renge-space-5)",
        marginTop: "var(--renge-space-2)",
        fontSize: "var(--renge-font-size-xs)",
        color: "var(--renge-color-fg-muted)",
        fontFamily: "var(--font-body)",
        letterSpacing: "0.06em",
      }}>
        <span>1</span>
        <span>φ = 1.618</span>
        <span>φ² = 2.618</span>
      </div>
    </div>
  );
}

// ============================================================================
// Fibonacci sequence visualization
// ============================================================================

function FibViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const fibs = FIBONACCI.slice(0, 7);
  const max = fibs[fibs.length - 1];

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "flex-end", gap: "var(--renge-space-1)", height: 48 }}>
      {fibs.map((fib, i) => (
        <motion.div
          key={i}
          style={{
            flex: 1,
            height: Math.round((fib / max) * 48),
            background: "var(--renge-color-accent)",
            borderRadius: "var(--renge-radius-1) var(--renge-radius-1) 0 0",
            opacity: 0.3 + (i / fibs.length) * 0.7,
            transformOrigin: "bottom",
          }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: EASE_OUT }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Phyllotaxis visualization — sunflower dot pattern
// ============================================================================

function PhyllotaxisViz() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const GOLDEN_ANGLE = 137.508;
  const n = 60;
  const size = 80;
  const points = Array.from({ length: n }, (_, i) => {
    const r = Math.sqrt(i / n) * size;
    const theta = (i * GOLDEN_ANGLE * Math.PI) / 180;
    const round = (v: number) => Math.round(v * 1e4) / 1e4;
    return {
      x: round(size + r * Math.cos(theta)),
      y: round(size + r * Math.sin(theta)),
      delay: i * 0.015,
    };
  });

  return (
    <svg ref={ref} width={size * 2} height={size * 2} viewBox={`0 0 ${size * 2} ${size * 2}`} style={{ display: "block", margin: "0 auto" }}>
      {points.map((pt, i) => (
        <motion.circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r={1.5}
          fill="var(--renge-color-accent)"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.7, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: pt.delay, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

// ============================================================================
// Section
// ============================================================================

const principles = [
  {
    id: "phi",
    symbol: "φ",
    title: "PHI",
    subtitle: "1.618033...",
    body: "The golden ratio appears in nautilus shells, sunflower spirals, galaxy arms. We built the spacing scale from it.",
    viz: <PhiViz />,
  },
  {
    id: "fibonacci",
    symbol: "∑",
    title: "Fibonacci",
    subtitle: "1, 1, 2, 3, 5, 8, 13...",
    body: "The sequence that generates PHI. Every Renge size step follows it. Growth that feels inevitable.",
    viz: <FibViz />,
  },
  {
    id: "phyllotaxis",
    symbol: "⊙",
    title: "Phyllotaxis",
    subtitle: "137.508°",
    body: "The golden angle. Nature's solution to optimal packing — the logic behind leaves on a stem, seeds in a sunflower.",
    viz: <PhyllotaxisViz />,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  }),
};

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      id="philosophy"
      style={{
        padding: "var(--renge-space-8) var(--renge-space-5)",
        background: "var(--renge-color-bg-subtle)",
        borderTop: "1px solid var(--renge-color-border-subtle)",
        borderBottom: "1px solid var(--renge-color-border-subtle)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
          style={{ marginBottom: "var(--renge-space-7)", textAlign: "center" }}
        >
          <p style={{
            fontSize: "var(--renge-font-size-xs)",
            color: "var(--renge-color-accent)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            marginBottom: "var(--renge-space-3)",
          }}>
            The argument
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, var(--renge-font-size-3xl))",
            color: "var(--renge-color-fg)",
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            Why natural mathematics?
          </h2>
        </motion.div>

        {/* Three columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "var(--renge-space-5)",
        }}>
          {principles.map((p, i) => (
            <motion.div
              key={p.id}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.1 + i * 0.12}
              variants={fadeUp}
              style={{
                padding: "var(--renge-space-6)",
                background: "var(--renge-color-bg)",
                border: "1px solid var(--renge-color-border-subtle)",
                borderRadius: "var(--renge-radius-2)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--renge-space-4)",
              }}
            >
              {/* Symbol */}
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--renge-font-size-3xl)",
                color: "var(--renge-color-accent)",
                lineHeight: 1,
                opacity: 0.6,
              }}>
                {p.symbol}
              </div>

              {/* Title */}
              <div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--renge-font-size-xl)",
                  color: "var(--renge-color-fg)",
                  fontWeight: 400,
                  margin: 0,
                  marginBottom: "var(--renge-space-1)",
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontSize: "var(--renge-font-size-sm)",
                  color: "var(--renge-color-accent)",
                  fontFamily: "var(--font-mono, monospace)",
                  margin: 0,
                  letterSpacing: "0.05em",
                }}>
                  {p.subtitle}
                </p>
              </div>

              {/* Visualization */}
              <div style={{ minHeight: 60 }}>
                {p.viz}
              </div>

              {/* Body */}
              <p style={{
                fontSize: "var(--renge-font-size-base)",
                color: "var(--renge-color-fg-subtle)",
                lineHeight: "var(--renge-line-height-base)",
                margin: 0,
                fontFamily: "var(--font-body)",
              }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
