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
      <div className="flex flex-wrap gap-renge-5 items-end">
        {radiusSteps.map(({ key, px, fib }) => (
          <div key={key} className="flex flex-col items-center gap-renge-2">
            <div
              className="bg-renge-accent-subtle"
              style={{
                width: key === "full" ? 120 : 72,
                height: 72,
                border: "1px solid var(--renge-color-accent)",
                borderRadius: key === "full" ? "var(--renge-radius-full)" : `var(--renge-radius-${key})`,
              }}
            />
            <div
              className="text-renge-sm text-renge-fg-subtle text-center"
              style={{
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.04em",
              }}
            >
              <div>radius.{key}</div>
              <div style={{ opacity: 0.7 }}>{fib ? `${px}px` : "pill"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
