"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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

  try { localStorage.setItem(SCALE_KEY, String(base)); } catch {}
}

export function ScaleControl() {
  const [base, setBase] = useState(DEFAULT_BASE);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const stored = parseFloat(localStorage.getItem(SCALE_KEY) ?? "");
      if (!isNaN(stored) && stored >= MIN_BASE && stored <= MAX_BASE) {
        setBase(stored);
        applyScale(stored);
      }
    } catch {}
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setBase(val);
    // Throttle CSS writes to one per animation frame for smooth dragging
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      applyScale(val);
      rafRef.current = null;
    });
  }, []);

  const reset = useCallback(() => {
    setBase(DEFAULT_BASE);
    // Clear inline overrides so the server-rendered values restore
    const root = document.documentElement;
    const spacing = createSpacingScale(DEFAULT_BASE);
    const radius = createRadiusScale(DEFAULT_BASE);
    const fractal = createFractalScale(DEFAULT_BASE);
    for (const k of Object.keys(spacing)) root.style.removeProperty(`--renge-space-${k}`);
    for (const k of Object.keys(radius)) root.style.removeProperty(`--renge-radius-${k}`);
    for (const k of Object.keys(fractal)) root.style.removeProperty(`--renge-size-${k}`);
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

/**
 * Inline script content to restore scale before first paint.
 * Call from layout.tsx <script> tag.
 */
export const SCALE_RESTORE_SCRIPT = `(function(){
  try {
    var base = parseFloat(localStorage.getItem('${SCALE_KEY}') || '${DEFAULT_BASE}');
    if (isNaN(base) || base < ${MIN_BASE} || base > ${MAX_BASE}) return;
    var FIB = [1,2,3,5,8,13,21,34,55,89];
    var PHI = 1.6180339887;
    var r = document.documentElement;
    FIB.forEach(function(f,i){ r.style.setProperty('--renge-space-'+(i+1), (f*base)+'px'); });
    r.style.setProperty('--renge-space-0','0px');
    // Radius (same Fib steps, clamped)
    [0,4,8,12,20,32].forEach(function(v,i){
      r.style.setProperty('--renge-radius-'+[1,2,3,4,5][i] || 'none', (v ? Math.round(FIB[i]*base/4*4)+'px' : '0px'));
    });
    r.style.setProperty('--renge-radius-full','9999px');
  } catch(e){}
})()`;
