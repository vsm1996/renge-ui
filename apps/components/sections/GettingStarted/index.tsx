"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { Container, Stack } from "@renge-ui/react";
import { CodeBlock } from "./CodeBlock";
import { OPTIONS } from "./options";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: EASE_OUT },
  }),
};

export function GettingStarted() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useBreakpoint();
  const [activeOption, setActiveOption] = useState("twv4");

  const active = OPTIONS.find((o) => o.id === activeOption) ?? OPTIONS[0];

  return (
    <section
      ref={ref}
      id="start"
      style={{
        padding: `var(--renge-space-8) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
        background: "var(--renge-color-bg-subtle)",
        borderTop: "1px solid var(--renge-color-border-subtle)",
      }}
    >
      <Container size="md" px="0">
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
            Get started
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(var(--renge-font-size-xl), 4vw, var(--renge-font-size-2xl))",
            color: "var(--renge-color-fg)",
            fontWeight: 400,
            margin: 0,
            marginBottom: "var(--renge-space-5)",
            letterSpacing: "-0.02em",
          }}>
            Install and consume.
          </h2>
          <CodeBlock code="pnpm add @renge-ui/tokens" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.15}
          variants={fadeUp}
        >
          <Stack
            direction="horizontal"
            gap="2"
            style={{ flexWrap: "wrap", marginBottom: "var(--renge-space-4)" }}
          >
            {OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => setActiveOption(o.id)}
                style={{
                  padding: "var(--renge-space-2) var(--renge-space-4)",
                  borderRadius: "var(--renge-radius-full)",
                  border: `1px solid ${o.id === activeOption ? "var(--renge-color-accent)" : "var(--renge-color-border)"}`,
                  background: o.id === activeOption ? "var(--renge-color-accent-subtle)" : "transparent",
                  color: o.id === activeOption ? "var(--renge-color-accent)" : "var(--renge-color-fg-subtle)",
                  fontSize: "var(--renge-font-size-sm)",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                  transition: "all 200ms var(--renge-easing-ease-out)",
                  letterSpacing: "0.04em",
                }}
              >
                {o.label}
              </button>
            ))}
          </Stack>

          <p style={{
            fontSize: "var(--renge-font-size-sm)",
            color: "var(--renge-color-fg-subtle)",
            fontFamily: "var(--font-body)",
            margin: 0,
            marginBottom: "var(--renge-space-4)",
          }}>
            {active.description}
          </p>
          <CodeBlock code={active.code} />
        </motion.div>
      </Container>
    </section>
  );
}
