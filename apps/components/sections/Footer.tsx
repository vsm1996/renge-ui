"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PHI, EASE_OUT } from "@/lib/phi";
import { Container, Stack } from "@renge-ui/react";

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
      <Container px="0" style={{ maxWidth: 1080 }}>
        <Stack direction="vertical" gap="6">

        {/* Top row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <Stack direction="horizontal" justify="between" align="start" gap="5" style={{ flexWrap: "wrap" }}>
          {/* Brand */}
          <Stack direction="vertical" gap="2">
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--renge-font-size-2xl)",
              margin: 0,
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
          </Stack>

          {/* Links */}
          <Stack direction="horizontal" gap="5" align="center">
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
          </Stack>
          </Stack>
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, background: "currentColor", opacity: 0.1 }} />

        {/* Bottom row — closing argument */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Stack direction="horizontal" justify="between" align="center" gap="4" style={{ flexWrap: "wrap" }}>
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
          </Stack>
        </motion.div>
        </Stack>
      </Container>
    </footer>
  );
}
