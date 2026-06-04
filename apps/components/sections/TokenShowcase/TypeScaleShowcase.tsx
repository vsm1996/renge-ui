"use client";

import { PHI } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { SectionLabel, SubheadingH3 } from "./shared";

const typeSteps = [
  { key: "xs",   label: "xs",   exp: -0.5,  isDisplay: false },
  { key: "sm",   label: "sm",   exp: -0.25, isDisplay: false },
  { key: "base", label: "base", exp:  0,    isDisplay: false },
  { key: "lg",   label: "lg",   exp:  1,    isDisplay: false },
  { key: "xl",   label: "xl",   exp:  2,    isDisplay: false },
  { key: "2xl",  label: "2xl",  exp:  3,    isDisplay: true  },
  { key: "3xl",  label: "3xl",  exp:  4,    isDisplay: true  },
  { key: "4xl",  label: "4xl",  exp:  5,    isDisplay: true  },
];

export function TypeScaleShowcase() {
  const isMobile = useBreakpoint();
  const steps = isMobile ? typeSteps.slice(0, 6) : typeSteps;

  return (
    <div>
      <SectionLabel>Tokens / Typography</SectionLabel>
      <SubheadingH3>PHI type scale.</SubheadingH3>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-3)" }}>
        {steps.slice().reverse().map(({ key, label, exp, isDisplay }) => {
          const px = (16 * Math.pow(PHI, exp)).toFixed(2);
          return (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "var(--renge-space-4)",
                borderBottom: "1px solid var(--renge-color-border-subtle)",
                paddingBottom: "var(--renge-space-2)",
              }}
            >
              <span style={{
                fontFamily: isDisplay ? "var(--font-display)" : "var(--font-body)",
                fontSize: `var(--renge-font-size-${key})`,
                color: "var(--renge-color-fg)",
                lineHeight: `var(--renge-line-height-${key})`,
                flex: 1,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}>
                {isDisplay
                  ? "Proportion."
                  : "The ratios that appear in living things."}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}>
                <code style={{
                  fontSize: "var(--renge-font-size-sm)",
                  color: "var(--renge-color-accent)",
                  fontFamily: "var(--font-mono, monospace)",
                  letterSpacing: "0.04em",
                }}>
                  {label} · {px}px
                </code>
                <code style={{
                  fontSize: "var(--renge-font-size-sm)",
                  color: "var(--renge-color-fg-subtle)",
                  fontFamily: "var(--font-mono, monospace)",
                  letterSpacing: "0.02em",
                  opacity: 0.7,
                }}>
                  fontSize.{label}
                </code>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
