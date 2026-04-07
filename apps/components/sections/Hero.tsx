"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GOLDEN_ANGLE, EASE_OUT } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { Lotus } from "@/components/ui/Lotus";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  }),
};

function LotusBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useBreakpoint();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.07, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        x: "-50%",
        y,
        opacity,
        pointerEvents: "none",
      }}
    >
      <Lotus size={isMobile ? 360 : 700} animate />
    </motion.div>
  );
}

export function Hero() {
  const isMobile = useBreakpoint();

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: `var(--renge-space-7) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
        overflow: "hidden",
      }}
    >
      {/* Background lotus — parallax, low opacity */}
      <LotusBackground />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--renge-space-6)",
          textAlign: "center",
          maxWidth: isMobile ? "100%" : 720,
        }}
      >
        {/* Lotus — the geometry before the words */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
        >
          <Lotus size={isMobile ? 200 : 300} animate />

          {/* Golden angle label */}
          <p
            style={{
              marginTop: "var(--renge-space-3)",
              fontSize: "var(--renge-font-size-sm)",
              color: "var(--renge-color-accent)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.12em",
              opacity: 0.7,
            }}
          >
            φ° = {GOLDEN_ANGLE.toFixed(3)}°
          </p>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile ? "clamp(36px, 9vw, 56px)" : "clamp(48px, 6vw, 80px)",
            lineHeight: 1.15,
            color: "var(--renge-color-fg)",
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Proportion as a first principle.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.35}
          variants={fadeUp}
          style={{
            fontSize: isMobile ? "var(--renge-font-size-base)" : "var(--renge-font-size-lg)",
            color: "var(--renge-color-fg-subtle)",
            lineHeight: "var(--renge-line-height-lg)",
            maxWidth: 560,
            margin: 0,
            fontFamily: "var(--font-body)",
          }}
        >
          Renge is a design system built on natural mathematics.
          PHI. Fibonacci. The ratios that appear in every living thing.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.5}
          variants={fadeUp}
        >
          <a
            href="#tokens"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--renge-space-2)",
              padding: "var(--renge-space-3) var(--renge-space-5)",
              borderRadius: "var(--renge-radius-full)",
              border: "1px solid var(--renge-color-accent)",
              color: "var(--renge-color-accent)",
              fontSize: "var(--renge-font-size-sm)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "all 300ms var(--renge-easing-ease-out)",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "var(--renge-color-accent)";
              el.style.color = "var(--renge-color-fg-inverse)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.color = "var(--renge-color-accent)";
            }}
          >
            Explore the system
            <span aria-hidden>↓</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: "absolute",
            bottom: "var(--renge-space-6)",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "var(--renge-font-size-sm)",
            color: "var(--renge-color-fg-muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
          }}
        >
          φ° = {GOLDEN_ANGLE.toFixed(3)}°
        </motion.div>
      </div>
    </section>
  );
}
