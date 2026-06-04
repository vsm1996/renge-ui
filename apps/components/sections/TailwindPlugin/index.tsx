"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { Container } from "@renge-ui/react";
import { UtilityCard } from "./UtilityCard";
import { StackDemo, GridDemo, AspectDemo, ContainerDemo } from "./demos";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: EASE_OUT },
  }),
};

const utilities = [
  {
    label: "Stack",
    cls: "stack / stack-h",
    description: "Flex column or row. Compose with gap-renge-* from the Fibonacci spacing scale.",
    Demo: StackDemo,
  },
  {
    label: "Container",
    cls: "container-renge-{sm|md|lg|xl}",
    description: "Centered max-width wrapper. Widths follow 200px × φⁿ — each tier is φ times the previous.",
    Demo: ContainerDemo,
  },
  {
    label: "Grid",
    cls: "grid-cols-renge-{2|3|4|6|12}",
    description: "Base-6 column set with 12-column extension. Auto-fit/fill variants use Fibonacci min-widths.",
    Demo: GridDemo,
  },
  {
    label: "Aspect ratio",
    cls: "aspect-renge-{square|golden|vertical|video}",
    description: "golden = φ ≈ 1.618 (34:21 Fibonacci). vertical = 1/φ. Ratios are CSS custom properties.",
    Demo: AspectDemo,
  },
];

const utilityList = [
  ["stack / stack-h",      "flex direction"],
  ["flex-renge-row/col",   "flex + gap defaults"],
  ["container-renge-*",    "φⁿ max-widths"],
  ["grid-cols-renge-*",    "base-6 columns"],
  ["grid-cols-auto-fit-*", "Fibonacci min-widths"],
  ["aspect-renge-*",       "φ-derived ratios"],
] as const;

export function TailwindPlugin() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useBreakpoint();

  return (
    <section
      ref={ref}
      id="tailwind"
      style={{
        padding: `var(--renge-space-8) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
      }}
      className="bg-renge-bg border-t border-renge-border-subtle"
    >
      <Container px="0" size="lg">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
          className="mb-renge-7"
        >
          <p style={{
            fontFamily: "var(--font-body)",
            letterSpacing: "0.2em",
          }} className="text-renge-sm text-renge-accent uppercase m-0 mb-renge-3">
            @renge-ui/tailwind
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(var(--renge-font-size-xl), 4vw, var(--renge-font-size-2xl))",
            letterSpacing: "-0.02em",
          }} className="text-renge-fg font-normal m-0 mb-renge-5">
            Layout without compromise.
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            maxWidth: "var(--renge-container-sm)",
          }} className="text-renge-lg text-renge-fg-subtle leading-renge-lg m-0">
            One plugin line. Every layout primitive derives from the same mathematical
            foundation as every spacing, color, and motion token.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.15}
          variants={fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "var(--renge-space-4)",
            marginBottom: "var(--renge-space-7)",
          }}
        >
          {utilities.map((u, i) => (
            <motion.div
              key={u.cls}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.15 + i * 0.07}
              variants={fadeUp}
            >
              <UtilityCard label={u.label} cls={u.cls} description={u.description}>
                <u.Demo />
              </UtilityCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.45}
          variants={fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
            gap: "var(--renge-space-5)",
            alignItems: "start",
          }}
        >
          <div className="bg-renge-bg-inverse rounded-renge-3 p-renge-5 border border-renge-border overflow-auto">
            <pre className="m-0">
              <code style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                lineHeight: "1.8",
              }} className="text-renge-sm text-renge-fg-inverse block">{`/* globals.css — one line */
@plugin "@renge-ui/tailwind/plugin";

/* HTML — activate a color profile */
<html data-profile="ocean" data-mode="light">

/* All Tailwind variants work */
<div class="container-renge-lg px-renge-5">
  <div class="stack gap-renge-6">
    <div class="grid grid-cols-renge-3 gap-renge-4
                md:grid-cols-auto-fit-renge-sm">
      <div class="aspect-renge-golden bg-renge-bg-subtle
                  rounded-renge-3" />
    </div>
  </div>
</div>`}</code>
            </pre>
          </div>

          <div className="flex flex-col gap-renge-4">
            <div>
              <p style={{
                fontFamily: "var(--font-body)",
                letterSpacing: "0.08em",
              }} className="text-renge-sm text-renge-fg-muted uppercase m-0 mb-renge-2">
                Install
              </p>
              <div className="bg-renge-bg-inverse rounded-renge-2 px-renge-4 py-renge-3 border border-renge-border">
                <code style={{
                  fontFamily: "var(--font-mono, monospace)",
                }} className="text-renge-sm text-renge-fg-inverse whitespace-nowrap">
                  pnpm add @renge-ui/tailwind
                </code>
              </div>
            </div>

            <div className="p-renge-4 bg-renge-bg-subtle rounded-renge-2 border border-renge-border-subtle flex flex-col gap-renge-2">
              {utilityList.map(([cls, note]) => (
                <div key={cls} className="flex justify-between gap-renge-4">
                  <code style={{
                    fontFamily: "var(--font-mono, monospace)",
                  }} className="text-renge-sm text-renge-accent">
                    {cls}
                  </code>
                  <span style={{
                    fontFamily: "var(--font-body)",
                  }} className="text-renge-sm text-renge-fg-muted whitespace-nowrap">
                    {note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
