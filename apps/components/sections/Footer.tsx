"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PHI, EASE_OUT } from "@/lib/phi";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <footer
      ref={ref}
      style={{
        padding: "var(--renge-space-7) var(--renge-space-5)",
        background: "var(--renge-color-fg-subtle)",
        color: "var(--renge-color-fg-inverse)",
        borderTop: "1px solid var(--renge-color-border)",
      }}
    >
      <div style={{
        maxWidth: 1080,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "var(--renge-space-6)",
      }}>
        {/* Top row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "var(--renge-space-5)",
          }}
        >
          {/* Brand */}
          <div>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--renge-font-size-2xl)",
              margin: 0,
              marginBottom: "var(--renge-space-2)",
              letterSpacing: "-0.02em",
              opacity: 0.9,
            }}>
              Renge
            </p>
            <p style={{
              fontSize: "var(--renge-font-size-sm)",
              fontFamily: "var(--font-body)",
              margin: 0,
              opacity: 0.5,
              letterSpacing: "0.04em",
            }}>
              Part of the Soka Labs ecosystem.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "var(--renge-space-5)", alignItems: "center" }}>
            <a
              href="https://github.com/vsm1996/renge-ui"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "var(--renge-font-size-sm)",
                fontFamily: "var(--font-body)",
                color: "var(--renge-color-fg-inverse)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "opacity 200ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
            >
              GitHub
            </a>
            <a
              href="#start"
              style={{
                fontSize: "var(--renge-font-size-sm)",
                fontFamily: "var(--font-body)",
                color: "var(--renge-color-fg-inverse)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "opacity 200ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
            >
              Docs
            </a>
          </div>
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, background: "currentColor", opacity: 0.1 }} />

        {/* Bottom row — closing argument */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--renge-space-4)",
          }}
        >
          <p style={{
            fontSize: "var(--renge-font-size-sm)",
            fontFamily: "var(--font-body)",
            margin: 0,
            opacity: 0.4,
            letterSpacing: "0.08em",
          }}>
            Built with Renge.
          </p>

          {/* The closing PHI statement */}
          <div style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "var(--renge-font-size-sm)",
            opacity: 0.5,
            letterSpacing: "0.06em",
            textAlign: "right",
          }}>
            φ = {PHI.toFixed(10)}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
