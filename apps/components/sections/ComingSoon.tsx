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

const COMPONENTS = [
  "Stack", "Grid", "Section",
  "Text", "Heading", "Divider",
  "Button", "Input", "FormField",
  "Card", "Badge", "Chip",
  "Avatar", "Stat", "Alert",
  "Spinner", "Progress", "Navbar",
  "EnergyRing", "Pulse", "FlowField",
];

export function ComingSoon() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useBreakpoint();

  return (
    <section
      ref={ref}
      id="react"
      style={{
        padding: `var(--renge-space-8) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
        background: "var(--renge-color-bg)",
        borderTop: "1px solid var(--renge-color-border-subtle)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
          style={{
            display: "inline-block",
            padding: "var(--renge-space-2) var(--renge-space-4)",
            background: "var(--renge-color-accent-subtle)",
            borderRadius: "var(--renge-radius-full)",
            fontSize: "var(--renge-font-size-sm)",
            color: "var(--renge-color-accent)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "var(--renge-space-5)",
          }}
        >
          Available now
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.1}
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile ? "clamp(28px, 8vw, 48px)" : "clamp(32px, 4vw, 56px)",
            color: "var(--renge-color-fg)",
            fontWeight: 400,
            margin: 0,
            marginBottom: "var(--renge-space-4)",
            letterSpacing: "-0.02em",
          }}
        >
          @renge-ui/react
        </motion.h2>

        <motion.p
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.2}
          variants={fadeUp}
          style={{
            fontSize: "var(--renge-font-size-lg)",
            color: "var(--renge-color-fg-subtle)",
            lineHeight: "var(--renge-line-height-lg)",
            margin: 0,
            marginBottom: "var(--renge-space-6)",
            fontFamily: "var(--font-body)",
          }}
        >
          21 React components built on the token system.
          Proportional. Accessible. Composable.
        </motion.p>

        {/* Component chip grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.25}
          variants={fadeUp}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--renge-space-2)",
            justifyContent: "center",
            marginBottom: "var(--renge-space-7)",
          }}
        >
          {COMPONENTS.map((name) => (
            <span
              key={name}
              style={{
                padding: "var(--renge-space-1) var(--renge-space-3)",
                borderRadius: "var(--renge-radius-full)",
                border: "1px solid var(--renge-color-border)",
                fontSize: "var(--renge-font-size-sm)",
                color: "var(--renge-color-fg-muted)",
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.02em",
                background: "var(--renge-color-bg-subtle)",
              }}
            >
              {name}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.35}
          variants={fadeUp}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "var(--renge-space-3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a
            href="/docs"
            style={{
              padding: "var(--renge-space-3) var(--renge-space-6)",
              borderRadius: "var(--renge-radius-full)",
              border: "none",
              background: "var(--renge-color-accent)",
              color: "var(--renge-color-fg-inverse)",
              fontSize: "var(--renge-font-size-base)",
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "background 200ms var(--renge-easing-ease-out)",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--renge-color-accent-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--renge-color-accent)")}
          >
            View components
          </a>
          <a
            href="https://www.npmjs.com/package/@renge-ui/react"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "var(--renge-space-3) var(--renge-space-6)",
              borderRadius: "var(--renge-radius-full)",
              border: "1px solid var(--renge-color-border)",
              background: "transparent",
              color: "var(--renge-color-fg-muted)",
              fontSize: "var(--renge-font-size-base)",
              fontFamily: "var(--font-mono, monospace)",
              cursor: "pointer",
              letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "border-color 200ms var(--renge-easing-ease-out), color 200ms var(--renge-easing-ease-out)",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--renge-color-accent)";
              e.currentTarget.style.color = "var(--renge-color-fg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--renge-color-border)";
              e.currentTarget.style.color = "var(--renge-color-fg-muted)";
            }}
          >
            pnpm add @renge-ui/react
          </a>
        </motion.div>
      </div>
    </section>
  );
}
