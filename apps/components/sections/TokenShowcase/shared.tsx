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
    <p
      className="text-renge-sm text-renge-accent uppercase m-0 mb-renge-3"
      style={{
        letterSpacing: "0.2em",
        fontFamily: "var(--font-body)",
      }}
    >
      {children}
    </p>
  );
}

export function SubheadingH3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-renge-xl text-renge-fg font-normal m-0 mb-renge-5"
      style={{
        fontFamily: "var(--font-display)",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h3>
  );
}
