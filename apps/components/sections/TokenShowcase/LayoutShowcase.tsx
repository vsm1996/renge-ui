"use client";

import { PHI } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { SectionLabel, SubheadingH3 } from "./shared";

const containerSteps = [
  { key: "sm", px: 524,  exp: 2 },
  { key: "md", px: 847,  exp: 3 },
  { key: "lg", px: 1371, exp: 4 },
  { key: "xl", px: 2218, exp: 5 },
];

const aspectSteps = [
  { key: "square",   ratio: 1,       label: "1",    note: "1:1" },
  { key: "golden",   ratio: PHI,     label: "φ",    note: "1:φ" },
  { key: "vertical", ratio: 1 / PHI, label: "1/φ",  note: "φ:1 portrait" },
  { key: "video",    ratio: 16 / 9,  label: "16/9", note: "widescreen" },
  { key: "classic",  ratio: 4 / 3,   label: "4/3",  note: "legacy" },
];

const SUPERSCRIPTS: Record<number, string> = { 2: "²", 3: "³", 4: "⁴", 5: "⁵" };

export function LayoutShowcase() {
  const isMobile = useBreakpoint(1400);
  const maxPx = containerSteps[containerSteps.length - 1].px;
  const baseH = isMobile ? 36 : 48;

  return (
    <div>
      <SectionLabel>Tokens / Layout</SectionLabel>
      <SubheadingH3>PHI-derived dimensions.</SubheadingH3>

      <p style={{
        fontSize: "var(--renge-font-size-sm)",
        color: "var(--renge-color-fg-subtle)",
        fontFamily: "var(--font-body)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontWeight: 600,
        margin: 0,
        marginBottom: "var(--renge-space-4)",
      }}>
        Container widths — 200px × φⁿ
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-3)", marginBottom: "var(--renge-space-7)" }}>
        {containerSteps.map(({ key, px, exp }) => (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              gap: "var(--renge-space-4)",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <div style={{
              width: 28,
              fontSize: "var(--renge-font-size-sm)",
              color: "var(--renge-color-fg-subtle)",
              fontFamily: "var(--font-mono, monospace)",
              flexShrink: 0,
              letterSpacing: "0.04em",
            }}>
              {key}
            </div>
            <div style={{ flex: isMobile ? undefined : 1, minWidth: 0, width: isMobile ? "100%" : undefined }}>
              <div style={{
                width: `${(px / maxPx) * 100}%`,
                height: 8,
                background: key === "lg" ? "var(--renge-color-accent)" : "var(--renge-color-accent-subtle)",
                borderRadius: "var(--renge-radius-full)",
                border: key === "lg" ? "none" : "1px solid var(--renge-color-accent)",
                opacity: key === "lg" ? 1 : 0.6 + (exp - 2) * 0.1,
                transition: "width 500ms var(--renge-easing-ease-out)",
              }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}>
              <span style={{
                fontSize: "var(--renge-font-size-sm)",
                color: "var(--renge-color-fg-subtle)",
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.04em",
              }}>
                200 × φ{SUPERSCRIPTS[exp]} = {px}px
              </span>
              <span style={{
                fontSize: "var(--renge-font-size-sm)",
                color: "var(--renge-color-fg-subtle)",
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.02em",
                opacity: 0.7,
              }}>
                container.{key} · --renge-container-{key}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p style={{
        fontSize: "var(--renge-font-size-sm)",
        color: "var(--renge-color-fg-subtle)",
        fontFamily: "var(--font-body)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontWeight: 600,
        margin: 0,
        marginBottom: "var(--renge-space-4)",
      }}>
        Aspect ratios — φ-derived
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--renge-space-5)", alignItems: "flex-end" }}>
        {aspectSteps.map(({ key, ratio, label, note }) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--renge-space-2)" }}>
            <div style={{
              width: Math.round(baseH * ratio),
              height: baseH,
              background: key === "golden" ? "var(--renge-color-accent-subtle)" : "var(--renge-color-bg-muted)",
              border: `1px solid ${key === "golden" ? "var(--renge-color-accent)" : "var(--renge-color-border)"}`,
              borderRadius: "var(--renge-radius-2)",
            }} />
            <div style={{
              fontSize: "var(--renge-font-size-sm)",
              color: "var(--renge-color-fg-subtle)",
              fontFamily: "var(--font-mono, monospace)",
              textAlign: "center",
              letterSpacing: "0.04em",
            }}>
              <div style={{ color: key === "golden" ? "var(--renge-color-accent)" : undefined }}>{label}</div>
              <div style={{ opacity: 0.7 }}>{note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
