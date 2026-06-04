"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PHI, EASE_OUT } from "@/lib/phi";

export function PhiInterstitial() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <div
      ref={ref}
      style={{
        background: "var(--renge-color-bg-inverse)",
        padding: "var(--renge-space-6) var(--renge-space-5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "var(--renge-space-3)",
        overflow: "hidden",
      }}
    >
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 0.6, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--renge-font-size-xs)",
          color: "var(--renge-color-fg-inverse)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        The golden ratio
      </motion.p>

      {/* Large φ */}
      <motion.span
        initial={{ opacity: 0, scale: 0.92 }}
        animate={inView ? { opacity: 0.9, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.1, ease: EASE_OUT }}
        style={{
          display: "block",
          fontFamily: "var(--font-display)",
          fontSize: "var(--renge-font-size-4xl)",
          color: "var(--renge-color-fg-inverse)",
        }}
      >
        φ
      </motion.span>

      {/* Decimal value */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.6, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "var(--renge-font-size-sm)",
          color: "var(--renge-color-fg-inverse)",
          letterSpacing: "0.14em",
          margin: 0,
        }}
      >
        = {PHI.toFixed(8)}
      </motion.p>
    </div>
  );
}
