"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GOLDEN_ANGLE, EASE_OUT } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { Lotus } from "@/components/ui/Lotus";
import { Stack } from "@renge-ui/react";

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
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: "100svh",
        padding: `var(--renge-space-7) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
      }}
    >
      {/* Background lotus — parallax, low opacity */}
      <LotusBackground />

      {/* Content */}
      <Stack
        direction="vertical"
        align="center"
        gap="6"
        className="relative z-10 text-center w-full"
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
            className="mt-renge-3 text-renge-sm text-renge-accent opacity-70"
            style={{
              fontFamily: "var(--font-body)",
              letterSpacing: "0.12em",
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
          className="text-renge-fg font-normal m-0 w-full"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile
              ? "clamp(var(--renge-font-size-lg), 9vw, var(--renge-font-size-xl))"
              : "clamp(var(--renge-font-size-xl), 6vw, var(--renge-font-size-2xl))",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Proportion as a <br /> first principle.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.35}
          variants={fadeUp}
          className="text-renge-fg-subtle leading-renge-lg m-0"
          style={{
            fontSize: isMobile ? "var(--renge-font-size-base)" : "var(--renge-font-size-lg)",
            width: isMobile ? "100%" : "50%",
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
            className="inline-flex items-center gap-renge-2 py-renge-3 px-renge-5 rounded-renge-full border border-renge-accent text-renge-accent text-renge-sm no-underline uppercase"
            style={{
              fontFamily: "var(--font-body)",
              letterSpacing: "0.08em",
              transition: "all 300ms var(--renge-easing-ease-out)",
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
          className="absolute text-renge-sm text-renge-fg-subtle uppercase"
          style={{
            bottom: "var(--renge-space-6)",
            left: "50%",
            transform: "translateX(-50%)",
            letterSpacing: "0.15em",
            fontFamily: "var(--font-body)",
          }}
        >
          φ° = {GOLDEN_ANGLE.toFixed(3)}°
        </motion.div>
      </Stack>
    </section>
  );
}
