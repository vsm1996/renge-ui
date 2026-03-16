"use client";

import { useState, useEffect, useCallback } from "react";
import { createSpacingScale, createRadiusScale, createFractalScale } from "@renge/tokens";

const SCALE_KEY = "renge-scale";
const DEFAULT_BASE = 6;
const MIN_BASE = 2;
const MAX_BASE = 8;

function applyScale(base: number) {
  const root = document.documentElement;
  const spacing = createSpacingScale(base);
  const radius = createRadiusScale(base);
  const fractal = createFractalScale(base);

  for (const [k, v] of Object.entries(spacing)) {
    root.style.setProperty(`--renge-space-${k}`, v);
  }
  for (const [k, v] of Object.entries(radius)) {
    root.style.setProperty(`--renge-radius-${k}`, v);
  }
  for (const [k, v] of Object.entries(fractal)) {
    root.style.setProperty(`--renge-size-${k}`, v);
  }
}

function clearScale() {
  // Remove inline overrides so the stylesheet cascade (server-rendered default) takes over cleanly
  const root = document.documentElement;
  const spacing = createSpacingScale(DEFAULT_BASE);
  const radius = createRadiusScale(DEFAULT_BASE);
  const fractal = createFractalScale(DEFAULT_BASE);
  for (const k of Object.keys(spacing)) root.style.removeProperty(`--renge-space-${k}`);
  for (const k of Object.keys(radius)) root.style.removeProperty(`--renge-radius-${k}`);
  for (const k of Object.keys(fractal)) root.style.removeProperty(`--renge-size-${k}`);
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
    } catch {}
    saveTimer = null;
  }, 300);
}

export function ScaleControl() {
  const [base, setBase] = useState(DEFAULT_BASE);

  useEffect(() => {
    try {
      const stored = parseFloat(localStorage.getItem(SCALE_KEY) ?? "");
      if (!isNaN(stored) && stored >= MIN_BASE && stored <= MAX_BASE && stored !== DEFAULT_BASE) {
        setBase(stored);
        applyScale(stored);
      }
    } catch {}
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setBase(val);
    if (val === DEFAULT_BASE) {
      clearScale(); // removes inline overrides — stylesheet takes over, no cascade conflict
    } else {
      applyScale(val);
    }
    persistScale(val);
  }, []);

  const reset = useCallback(() => {
    setBase(DEFAULT_BASE);
    clearScale();
    if (saveTimer !== null) clearTimeout(saveTimer);
    try { localStorage.removeItem(SCALE_KEY); } catch {}
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
        alignItems: "center",
        gap: "12px",
        padding: "10px 20px",
        borderRadius: "9999px",
        border: "1px solid var(--renge-color-border)",
        background: "color-mix(in oklch, var(--renge-color-bg) 92%, transparent)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 6px 32px oklch(0% 0 0 / 0.10)",
      }}
      title={`Spacing scale — base unit: ${base}px`}
    >
      <span
        style={{
          fontSize: "13px",
          fontFamily: "var(--font-body)",
          color: "var(--renge-color-fg-muted)",
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
          width: 120,
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

      {!isDefault && (
        <button
          onClick={reset}
          title="Reset to default"
          style={{
            padding: "4px 12px",
            borderRadius: "9999px",
            border: "1px solid var(--renge-color-border)",
            background: "transparent",
            color: "var(--renge-color-fg-muted)",
            fontSize: "12px",
            fontFamily: "var(--font-body)",
            cursor: "pointer",
            lineHeight: 1.5,
            whiteSpace: "nowrap",
          }}
        >
          reset
        </button>
      )}
    </div>
  );
}
