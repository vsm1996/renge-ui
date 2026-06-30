"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PHI, EASE_OUT, FIBONACCI } from "@/lib/phi";

export function PhiViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-2)", animation: inView ? "var(--renge-animation-breathe)" : undefined }}>
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

export function FibViz() {
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

export function PhyllotaxisViz() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const GOLDEN_ANGLE = 137.508;
  const n = 60;
  const size = 80;
  const points = Array.from({ length: n }, (_, i) => {
    const idx = i + 1;
    const r = Math.sqrt(idx / n) * size;
    const theta = (idx * GOLDEN_ANGLE * Math.PI) / 180;
    const round = (v: number) => Math.round(v * 1e4) / 1e4;
    return { x: round(size + r * Math.cos(theta)), y: round(size + r * Math.sin(theta)), delay: i * 0.015 };
  });

  return (
    <svg ref={ref} width={size * 2} height={size * 2} viewBox={`0 0 ${size * 2} ${size * 2}`} style={{ display: "block", margin: "0 auto", animation: inView ? "var(--renge-animation-float-wave)" : undefined }}>
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
