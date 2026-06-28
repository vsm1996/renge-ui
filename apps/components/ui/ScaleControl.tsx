"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createSpacingScale, createRadiusScale, createFractalScale } from "@renge-ui/tokens";

const SCALE_KEY = "renge-scale";
const DEFAULT_BASE = 6;
const MIN_BASE = 2;
const MAX_BASE = 8;
const APPLY_DEBOUNCE_MS = 60;

// Maintain the typeBase:baseUnit ratio from @renge-ui/tokens defaults (16 / 6)
const TYPE_MULTIPLIER = 16 / 6;
const PHI = 1.6180339887498948482;

// Inlined from packages/tokens/src/scales/typography.ts — keeps ScaleControl
// self-contained so exponent changes hot-reload without a package rebuild.
const TYPE_STEPS = [
  { key: "xs",   exp: -0.5  },
  { key: "sm",   exp: -0.25 },
  { key: "base", exp:  0    },
  { key: "lg",   exp:  1    },
  { key: "xl",   exp:  2    },
  { key: "2xl",  exp:  3    },
  { key: "3xl",  exp:  4    },
  { key: "4xl",  exp:  5    },
] as const;

// Accessibility floor — honor the PHI math, then clamp to readable minimums
const FONT_FLOOR: Partial<Record<string, number>> = { xs: 11, sm: 13 };

function applyScale(base: number) {
  const root = document.documentElement;
  const spacing = createSpacingScale(base);
  const radius = createRadiusScale(base);
  const fractal = createFractalScale(base);
  const typeBase = base * TYPE_MULTIPLIER;

  for (const [k, v] of Object.entries(spacing)) {
    root.style.setProperty(`--renge-space-${k}`, v);
  }
  for (const [k, v] of Object.entries(radius)) {
    root.style.setProperty(`--renge-radius-${k}`, v);
  }
  for (const [k, v] of Object.entries(fractal)) {
    root.style.setProperty(`--renge-size-${k}`, v);
  }
  for (const { key, exp } of TYPE_STEPS) {
    const px = typeBase * Math.pow(PHI, exp);
    const min = FONT_FLOOR[key];
    const final = min !== undefined ? Math.max(px, min) : px;
    root.style.setProperty(`--renge-font-size-${key}`, `${final.toFixed(4)}px`);
  }
}

function clearScale() {
  const root = document.documentElement;
  const spacing = createSpacingScale(DEFAULT_BASE);
  const radius = createRadiusScale(DEFAULT_BASE);
  const fractal = createFractalScale(DEFAULT_BASE);
  for (const k of Object.keys(spacing)) root.style.removeProperty(`--renge-space-${k}`);
  for (const k of Object.keys(radius)) root.style.removeProperty(`--renge-radius-${k}`);
  for (const k of Object.keys(fractal)) root.style.removeProperty(`--renge-size-${k}`);
  for (const { key } of TYPE_STEPS) root.style.removeProperty(`--renge-font-size-${key}`);
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;
function persistScale(base: number) {
  if (saveTimer !== null) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      if (base === DEFAULT_BASE) {
        localStorage.removeItem(SCALE_KEY);
      } else {
        localStorage.setItem(SCALE_KEY, String(base));
      }
    } catch { }
    saveTimer = null;
  }, 300);
}

export function ScaleControl() {
  const [base, setBase] = useState(DEFAULT_BASE);
  const applyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const stored = parseFloat(localStorage.getItem(SCALE_KEY) ?? "");
      if (!isNaN(stored) && stored >= MIN_BASE && stored <= MAX_BASE && stored !== DEFAULT_BASE) {
        setBase(stored);
        applyScale(stored);
      }
    } catch { }
  }, []);

  const scheduleApply = useCallback((val: number) => {
    if (applyTimer.current !== null) clearTimeout(applyTimer.current);
    applyTimer.current = setTimeout(() => {
      if (val === DEFAULT_BASE) clearScale();
      else applyScale(val);
      applyTimer.current = null;
    }, APPLY_DEBOUNCE_MS);
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setBase(val);
    scheduleApply(val);
    persistScale(val);
  }, [scheduleApply]);

  const reset = useCallback(() => {
    if (applyTimer.current !== null) clearTimeout(applyTimer.current);
    setBase(DEFAULT_BASE);
    clearScale();
    if (saveTimer !== null) clearTimeout(saveTimer);
    try { localStorage.removeItem(SCALE_KEY); } catch { }
  }, []);

  const isDefault = base === DEFAULT_BASE;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "12px 18px",
        borderRadius: "16px",
        border: "1px solid var(--renge-color-border)",
        background: "color-mix(in oklch, var(--renge-color-bg) 92%, transparent)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 6px 32px oklch(0% 0 0 / 0.10)",
        minWidth: "200px",
      }}
      title={`Spacing scale — base unit: ${base}px`}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span
          style={{
            fontSize: "13px",
            fontFamily: "var(--font-body)",
            color: "var(--renge-color-fg-subtle)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          Scale
        </span>

        <input
          type="range"
          min={MIN_BASE}
          max={MAX_BASE}
          step={0.1}
          value={base}
          onChange={onChange}
          aria-label="Spacing scale base unit"
          style={{
            flex: 1,
            height: 4,
            accentColor: "var(--renge-color-accent)",
            cursor: "pointer",
          }}
        />

        <span
          style={{
            fontSize: "14px",
            fontFamily: "var(--font-body, monospace)",
            color: "var(--renge-color-accent)",
            minWidth: "2.5ch",
            textAlign: "right",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {base.toFixed(1)}
        </span>
      </div>

      <button
        onClick={reset}
        title="Reset to default"
        disabled={isDefault ? true : false}
        data-scale-reset=""
        style={{
          width: "100%",
          padding: "4px 0",
          borderRadius: "8px",
          border: "1px solid var(--renge-color-border)",
          background: isDefault ? 'var(--renge-color-bg-subtle)' : 'transparent',
          color: isDefault ? 'var(--renge-color-fg-muted)' : "var(--renge-color-fg-subtle)",
          fontSize: "12px",
          fontFamily: "var(--font-body)",
          cursor: isDefault ? "unset" : "pointer",
          lineHeight: 1.5,
        }}
      >
        reset
      </button>
    </div >
  );
}
