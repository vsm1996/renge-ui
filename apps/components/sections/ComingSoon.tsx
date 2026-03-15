"use client";
import { EASE_OUT } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: EASE_OUT },
  }),
};

export function ComingSoon() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useBreakpoint();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

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
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
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
            fontSize: "var(--renge-font-size-xs)",
            color: "var(--renge-color-accent)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "var(--renge-space-5)",
          }}
        >
          Coming soon
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
          @renge/react
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
          React components built on the token system.
          Proportional. Accessible. Composable.
        </motion.p>

        <motion.form
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.3}
          variants={fadeUp}
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "var(--renge-space-2)",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {submitted ? (
            <p style={{
              fontSize: "var(--renge-font-size-base)",
              color: "var(--renge-color-accent)",
              fontFamily: "var(--font-body)",
              margin: 0,
            }}>
              You will hear from us.
            </p>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  padding: "var(--renge-space-3) var(--renge-space-4)",
                  borderRadius: "var(--renge-radius-full)",
                  border: "1px solid var(--renge-color-border)",
                  background: "var(--renge-color-bg-subtle)",
                  color: "var(--renge-color-fg)",
                  fontSize: "var(--renge-font-size-base)",
                  fontFamily: "var(--font-body)",
                  width: isMobile ? "100%" : "auto",
                  minWidth: isMobile ? "auto" : 240,
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "var(--renge-space-3) var(--renge-space-5)",
                  borderRadius: "var(--renge-radius-full)",
                  border: "none",
                  background: "var(--renge-color-accent)",
                  color: "var(--renge-color-fg-inverse)",
                  fontSize: "var(--renge-font-size-base)",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  transition: "background 200ms var(--renge-easing-ease-out)",
                }}
              >
                Notify me
              </button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
