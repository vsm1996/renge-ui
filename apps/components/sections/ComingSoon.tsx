"use client";
import { EASE_OUT } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Stack } from "@renge-ui/react";

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
  "Select", "Checkbox", "Radio",
  "Switch", "Textarea", "Slider",
  "Table", "Tooltip", "Accordion",
  "Timeline", "Skeleton", "Tabs",
  "Breadcrumb", "Pagination", "Anchor",
  "Toast", "Modal", "AspectRatio",
  "Container", "Spacer", "IconButton",
  "ButtonGroup", "CopyButton",
];

export function ComingSoon() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useBreakpoint();

  return (
    <section
      ref={ref}
      id="react"
      className={`bg-renge-bg border-t border-renge-border-subtle text-center ${isMobile ? "px-renge-4" : "px-renge-5"} py-renge-8`}
    >
      <Container px="0" style={{ maxWidth: 640 }}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
          className="inline-block px-renge-4 py-renge-2 bg-renge-accent-subtle rounded-renge-full text-renge-sm text-renge-accent uppercase mb-renge-5"
          style={{ letterSpacing: "0.15em", fontFamily: "var(--font-body)" }}
        >
          <span style={{ display: "inline-block", animation: "var(--renge-animation-pulse)" }}>Available now</span>
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.1}
          variants={fadeUp}
          className="text-renge-fg font-normal m-0 mb-renge-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile ? "clamp(28px, 8vw, 48px)" : "clamp(32px, 4vw, 56px)",
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
          className="text-renge-lg text-renge-fg-subtle leading-renge-lg m-0 mb-renge-6"
          style={{ fontFamily: "var(--font-body)" }}
        >
          44 React components built on the token system.
          Proportional. Accessible. Composable.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.25}
          variants={fadeUp}
          className="flex flex-wrap gap-renge-2 justify-center mb-renge-7"
        >
          {COMPONENTS.map((name, i) => (
            <span
              key={name}
              className="px-renge-3 py-renge-1 rounded-renge-full border border-renge-border text-renge-sm text-renge-fg-subtle bg-renge-bg-subtle"
              style={{
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.02em",
                animation: "var(--renge-animation-float)",
                animationDelay: `${(i * 0.15) % 5.5}s`,
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
        >
          <Stack direction={isMobile ? "vertical" : "horizontal"} gap="3" justify="center" align="center">
            <a
              href="/components"
              className="px-renge-4 py-renge-3 rounded-renge-full bg-renge-accent text-renge-fg-inverse text-renge-base inline-block no-underline cursor-pointer"
              style={{
                fontFamily: "var(--font-body)",
                letterSpacing: "0.04em",
                transition: "background 200ms var(--renge-easing-ease-out)",
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
              className="px-renge-4 py-renge-3 rounded-renge-full border border-renge-border text-renge-fg-subtle text-renge-base inline-block no-underline cursor-pointer"
              style={{
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.04em",
                transition: "border-color 200ms var(--renge-easing-ease-out), color 200ms var(--renge-easing-ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--renge-color-accent)";
                e.currentTarget.style.color = "var(--renge-color-fg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--renge-color-border)";
                e.currentTarget.style.color = "var(--renge-color-fg-subtle)";
              }}
            >
              pnpm add @renge-ui/react
            </a>
          </Stack>
        </motion.div>
      </Container>
    </section>
  );
}
