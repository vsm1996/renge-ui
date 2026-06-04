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
      <div className="flex flex-col gap-renge-3">
        {fibSteps.map(({ step, px, fib }) => (
          <div key={step} className="flex items-center gap-renge-4">
            <span
              className="text-renge-sm text-renge-fg-subtle flex-shrink-0"
              style={{
                width: 28,
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.04em",
              }}
            >
              {step}
            </span>
            <div
              className="bg-renge-accent rounded-renge-full flex-shrink-0"
              style={{
                width: Math.min(px, isMobile ? 120 : 280),
                height: 8,
                opacity: 0.5 + (step / 10) * 0.5,
              }}
            />
            <div className="flex flex-col" style={{ gap: 2 }}>
              <code
                className="text-renge-sm text-renge-fg-subtle"
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  letterSpacing: "0.04em",
                }}
              >
                {fib} × 4 = {px}px
              </code>
              <code
                className="text-renge-sm text-renge-fg-subtle"
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  letterSpacing: "0.02em",
                  opacity: 0.7,
                }}
              >
                space[{step}] · --renge-space-{step}
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
