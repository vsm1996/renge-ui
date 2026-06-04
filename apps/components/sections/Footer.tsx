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
      className="py-renge-7 px-renge-5 bg-renge-fg-subtle text-renge-fg-inverse border-t border-renge-border"
    >
      <Container px="0" size="lg">
        <Stack direction="vertical" gap="6">

        {/* Top row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <Stack direction="horizontal" justify="between" align="start" gap="5" className="flex-wrap">
          {/* Brand */}
          <Stack direction="vertical" gap="2">
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--renge-font-size-2xl)",
              letterSpacing: "-0.02em",
              opacity: 0.9,
            }} className="m-0">
              Renge
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              letterSpacing: "0.04em",
              opacity: 0.5,
            }} className="text-renge-sm m-0">
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
                fontFamily: "var(--font-body)",
                letterSpacing: "0.04em",
                transition: "opacity 200ms",
              }}
              className="text-renge-sm text-renge-fg-inverse no-underline"
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
            >
              GitHub
            </a>
            <a
              href="#start"
              style={{
                fontFamily: "var(--font-body)",
                letterSpacing: "0.04em",
                transition: "opacity 200ms",
              }}
              className="text-renge-sm text-renge-fg-inverse no-underline"
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
          <Stack direction="horizontal" justify="between" align="center" gap="4" className="flex-wrap">
          <p style={{
            fontFamily: "var(--font-body)",
            letterSpacing: "0.08em",
            opacity: 0.4,
          }} className="text-renge-sm m-0">
            Built with Renge.
          </p>

          {/* The closing PHI statement */}
          <div style={{
            fontFamily: "var(--font-mono, monospace)",
            opacity: 0.5,
            letterSpacing: "0.06em",
          }} className="text-renge-sm text-right">
            φ = {PHI.toFixed(10)}
          </div>
          </Stack>
        </motion.div>
        </Stack>
      </Container>
    </footer>
  );
}
