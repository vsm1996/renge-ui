"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { Container } from "@renge-ui/react";
import { fadeUp, SectionLabel } from "./shared";
import { ColorShowcase } from "./ColorShowcase";
import { SpacingShowcase } from "./SpacingShowcase";
import { TypeScaleShowcase } from "./TypeScaleShowcase";
import { MotionShowcase } from "./MotionShowcase";
import { RadiusShowcase } from "./RadiusShowcase";
import { LayoutShowcase } from "./LayoutShowcase";

const showcases = [
  ColorShowcase,
  SpacingShowcase,
  TypeScaleShowcase,
  MotionShowcase,
  RadiusShowcase,
  LayoutShowcase,
];

export function TokenShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useBreakpoint();

  return (
    <section
      ref={ref}
      id="tokens"
      style={{
        padding: `var(--renge-space-8) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
        background: "var(--renge-color-bg)",
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
          <SectionLabel>The system</SectionLabel>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile
              ? "clamp(var(--renge-font-size-lg), 7vw, var(--renge-font-size-xl))"
              : "clamp(var(--renge-font-size-xl), 4vw, var(--renge-font-size-2xl))",
            color: "var(--renge-color-fg)",
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            Every token derived. Nothing arbitrary.
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-8)" }}>
          {showcases.map((Showcase, i) => (
            <motion.div
              key={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.1 + i * 0.08}
              variants={fadeUp}
            >
              <Showcase />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
