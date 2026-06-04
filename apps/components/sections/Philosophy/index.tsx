"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { Container, Grid, Stack } from "@renge-ui/react";
import { PhiViz, FibViz, PhyllotaxisViz } from "./visualizations";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  }),
};

const principles = [
  {
    id: "phi",
    symbol: "φ",
    title: "PHI",
    subtitle: "1.618033...",
    body: "The golden ratio appears in nautilus shells, sunflower spirals, galaxy arms. We built the spacing scale from it.",
    Viz: PhiViz,
  },
  {
    id: "fibonacci",
    symbol: "∑",
    title: "Fibonacci",
    subtitle: "1, 1, 2, 3, 5, 8, 13...",
    body: "The sequence that generates PHI. Every Renge size step follows it. Growth that feels inevitable.",
    Viz: FibViz,
  },
  {
    id: "phyllotaxis",
    symbol: "⊙",
    title: "Phyllotaxis",
    subtitle: "137.508°",
    body: "The golden angle. Nature's solution to optimal packing — the logic behind leaves on a stem, seeds in a sunflower.",
    Viz: PhyllotaxisViz,
  },
];

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const isMobile = useBreakpoint();

  return (
    <section
      ref={ref}
      id="philosophy"
      style={{
        padding: `var(--renge-space-8) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
        background: "var(--renge-color-bg-subtle)",
        borderTop: "1px solid var(--renge-color-border-subtle)",
        borderBottom: "1px solid var(--renge-color-border-subtle)",
      }}
    >
      <Container px="0" size="md">
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
            fontSize: "clamp(var(--renge-font-size-xl), 4vw, var(--renge-font-size-2xl))",
            color: "var(--renge-color-fg)",
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            Why natural mathematics?
          </h2>
        </motion.div>

        <Grid
          columns={`repeat(auto-fit, minmax(${isMobile ? "100%" : "272px"}, 1fr))`}
          gap="5"
        >
          {principles.map((p, i) => (
            <motion.div
              key={p.id}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.1 + i * 0.12}
              variants={fadeUp}
            >
              <Stack
                direction="vertical"
                gap="4"
                style={{
                  padding: "var(--renge-space-6)",
                  background: "var(--renge-color-bg)",
                  border: "1px solid var(--renge-color-border-subtle)",
                  borderRadius: "var(--renge-radius-2)",
                  height: "100%",
                }}
              >
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--renge-font-size-3xl)",
                  color: "var(--renge-color-accent)",
                  lineHeight: 1,
                  opacity: 0.6,
                }}>
                  {p.symbol}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(var(--renge-font-size-lg), 3vw, var(--renge-font-size-xl))",
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
                <div style={{ minHeight: 60 }}>
                  <p.Viz />
                </div>
                <p style={{
                  fontSize: "var(--renge-font-size-base)",
                  color: "var(--renge-color-fg-subtle)",
                  lineHeight: "var(--renge-line-height-base)",
                  margin: 0,
                  fontFamily: "var(--font-body)",
                }}>
                  {p.body}
                </p>
              </Stack>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
