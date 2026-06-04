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
      className="bg-renge-bg-subtle border-t border-b border-renge-border-subtle"
      style={{
        padding: `var(--renge-space-8) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
      }}
    >
      <Container px="0" size="lg">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
          className="mb-renge-7 text-center"
        >
          <p
            className="text-renge-xs text-renge-accent uppercase mb-renge-3"
            style={{
              letterSpacing: "0.2em",
              fontFamily: "var(--font-body)",
            }}
          >
            The argument
          </p>
          <h2
            className="text-renge-fg font-normal m-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--renge-font-size-xl), 4vw, var(--renge-font-size-2xl))",
              letterSpacing: "-0.02em",
            }}
          >
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
                className="p-renge-6 bg-renge-bg border border-renge-border-subtle rounded-renge-2"
                style={{ height: "100%" }}
              >
                <p
                  aria-hidden="true"
                  className="text-renge-3xl text-renge-accent leading-none opacity-60 m-0"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.symbol}
                </p>
                <div>
                  <h3
                    className="text-renge-fg font-normal m-0 mb-renge-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(var(--renge-font-size-lg), 3vw, var(--renge-font-size-xl))",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-renge-sm text-renge-accent m-0"
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {p.subtitle}
                  </p>
                </div>
                <div style={{ minHeight: 60 }}>
                  <p.Viz />
                </div>
                <p
                  className="text-renge-base text-renge-fg-subtle leading-renge-base m-0"
                  style={{ fontFamily: "var(--font-body)" }}
                >
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
