"use client";

import { useState } from "react";
import { Stack, Text, Slider } from "@renge-ui/react";
import { A, R } from "./data";
import { PaneContent } from "./PaneContent";
import { useSlider } from "./useSlider";

export function ComparisonSlider() {
  const [pos, setPos] = useState(50);
  const { containerRef, startDrag } = useSlider(pos, setPos);
  const merged = pos;

  return (
    <Stack gap="4">
      {/* Visual comparison area */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          overflow: "hidden",
          cursor: "col-resize",
          userSelect: "none",
          WebkitUserSelect: "none",
          borderRadius: "var(--renge-radius-3)",
          border: "1px solid var(--renge-color-border)",
          boxShadow: "0 4px 32px oklch(0% 0 0 / 0.06)",
        }}
        onMouseDown={(e) => startDrag(e.clientX)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      >
        {/* Base layer: Renge (always full width) */}
        <div style={{ width: "100%", pointerEvents: "none" }}>
          <PaneContent t={R} />
        </div>

        {/* Overlay: Arbitrary (clipped to left of slider) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(0 ${100 - merged}% 0 0)`,
            pointerEvents: "none",
          }}
        >
          <PaneContent t={A} />
        </div>

        {/* Arbitrary label */}
        <div
          style={{
            position: "absolute",
            top: "var(--renge-space-4)",
            left: "var(--renge-space-4)",
            pointerEvents: "none",
            opacity: merged > 12 ? 1 : 0,
            transition: "opacity 180ms",
          }}
        >
          <div
            style={{
              background: "rgba(10,10,10,0.55)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "#fff",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: "9999px",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Arbitrary
          </div>
        </div>

        {/* Renge label */}
        <div
          style={{
            position: "absolute",
            top: "var(--renge-space-4)",
            right: "var(--renge-space-4)",
            pointerEvents: "none",
            opacity: merged < 88 ? 1 : 0,
            transition: "opacity 180ms",
          }}
        >
          <div
            style={{
              background: "var(--renge-color-accent)",
              color: "var(--renge-color-bg)",
              fontSize: "var(--renge-font-size-sm)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "var(--renge-space-1) var(--renge-space-3)",
              borderRadius: "var(--renge-radius-full)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
            }}
          >
            Renge
          </div>
        </div>

        {/* Divider line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${merged}%`,
            width: 2,
            background: "#fff",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 0 16px rgba(0,0,0,0.12)",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          {/* Drag handle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 2px 16px rgba(0,0,0,0.16), 0 0 0 2px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "col-resize",
              pointerEvents: "all",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M6 9H12M6 9L4 7M6 9L4 11M12 9L14 7M12 9L14 11"
                stroke="#888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Renge Slider control — also drives the comparison */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-4)" }}>
        <Text
          style={{
            color: "var(--renge-color-fg-muted)",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-body)",
            minWidth: "60px",
          }}
        >
          Arbitrary
        </Text>
        <div style={{ flex: 1 }}>
          <Slider
            min={0}
            max={100}
            value={merged}
            showPhiMarkers
            onChange={(e) => setPos(Number(e.target.value))}
          />
        </div>
        <Text
          style={{
            color: "var(--renge-color-accent)",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-body)",
            minWidth: "60px",
            textAlign: "right",
          }}
        >
          Renge
        </Text>
      </div>

      {/* PHI marker labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "var(--renge-space-5)",
        }}
      >
        {[
          { pct: 38.2, label: "38.2% — φ⁻²" },
          { pct: 61.8, label: "61.8% — φ⁻¹" },
        ].map(({ pct, label }) => (
          <button
            key={pct}
            onClick={() => setPos(pct)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "var(--renge-space-2)",
              padding: 0,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background:
                  Math.abs(merged - pct) < 1
                    ? "var(--renge-color-accent)"
                    : "var(--renge-color-border)",
                transition: "background 200ms",
                flexShrink: 0,
              }}
            />
            <Text
              size="sm"
              style={{
                color:
                  Math.abs(merged - pct) < 1
                    ? "var(--renge-color-accent)"
                    : "var(--renge-color-fg-muted)",
                fontFamily: "'JetBrains Mono', monospace",
                transition: "color 200ms",
              }}
            >
              {label}
            </Text>
          </button>
        ))}
      </div>
    </Stack>
  );
}
