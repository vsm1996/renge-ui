"use client";

import { FIBONACCI } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { SectionLabel, SubheadingH3 } from "./shared";

export function SpacingShowcase() {
  const isMobile = useBreakpoint();
  const fibSteps = FIBONACCI.slice(0, 8).map((fib, i) => ({
    step: i + 1,
    px: fib * 4,
    fib,
  }));

  return (
    <div>
      <SectionLabel>Tokens / Spacing</SectionLabel>
      <SubheadingH3>Fibonacci spacing.</SubheadingH3>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-3)" }}>
        {fibSteps.map(({ step, px, fib }) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-4)" }}>
            <div style={{
              width: 28,
              fontSize: "var(--renge-font-size-sm)",
              color: "var(--renge-color-fg-subtle)",
              fontFamily: "var(--font-mono, monospace)",
              flexShrink: 0,
              letterSpacing: "0.04em",
            }}>
              {step}
            </div>
            <div style={{
              width: Math.min(px, isMobile ? 120 : 280),
              height: 8,
              background: "var(--renge-color-accent)",
              borderRadius: "var(--renge-radius-full)",
              opacity: 0.5 + (step / 10) * 0.5,
              flexShrink: 0,
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{
                fontSize: "var(--renge-font-size-sm)",
                color: "var(--renge-color-fg-subtle)",
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.04em",
              }}>
                {fib} × 4 = {px}px
              </span>
              <span style={{
                fontSize: "var(--renge-font-size-sm)",
                color: "var(--renge-color-fg-subtle)",
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.02em",
                opacity: 0.7,
              }}>
                space[{step}] · --renge-space-{step}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
