"use client";

import { SectionLabel, SubheadingH3 } from "./shared";

const radiusSteps = [
  { key: "1",    px: 4,    fib: 1    },
  { key: "2",    px: 8,    fib: 2    },
  { key: "3",    px: 12,   fib: 3    },
  { key: "4",    px: 20,   fib: 5    },
  { key: "5",    px: 32,   fib: 8    },
  { key: "full", px: 9999, fib: null },
];

export function RadiusShowcase() {
  return (
    <div>
      <SectionLabel>Tokens / Radius</SectionLabel>
      <SubheadingH3>Border radius.</SubheadingH3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--renge-space-5)", alignItems: "flex-end" }}>
        {radiusSteps.map(({ key, px, fib }) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--renge-space-2)" }}>
            <div style={{
              width: key === "full" ? 120 : 72,
              height: 72,
              background: "var(--renge-color-accent-subtle)",
              border: "1px solid var(--renge-color-accent)",
              borderRadius: key === "full" ? "var(--renge-radius-full)" : `var(--renge-radius-${key})`,
            }} />
            <div style={{
              fontSize: "var(--renge-font-size-sm)",
              color: "var(--renge-color-fg-subtle)",
              fontFamily: "var(--font-mono, monospace)",
              textAlign: "center",
              letterSpacing: "0.04em",
            }}>
              <div>radius.{key}</div>
              <div style={{ opacity: 0.7 }}>{fib ? `${px}px` : "pill"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
