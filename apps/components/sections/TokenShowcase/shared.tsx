"use client";

import { EASE_OUT } from "@/lib/phi";

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: EASE_OUT },
  }),
};

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: "var(--renge-font-size-sm)",
      color: "var(--renge-color-accent)",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      fontFamily: "var(--font-body)",
      margin: 0,
      marginBottom: "var(--renge-space-3)",
    }}>
      {children}
    </p>
  );
}

export function SubheadingH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontFamily: "var(--font-display)",
      fontSize: "var(--renge-font-size-xl)",
      color: "var(--renge-color-fg)",
      fontWeight: 400,
      margin: 0,
      marginBottom: "var(--renge-space-5)",
      letterSpacing: "-0.01em",
    }}>
      {children}
    </h3>
  );
}
