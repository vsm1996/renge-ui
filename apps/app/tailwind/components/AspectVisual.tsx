import { PHI } from "@/lib/phi";

const STEPS = [
  { key: "square",   ratio: 1,       label: "1:1",  note: "square" },
  { key: "golden",   ratio: PHI,     label: "1:φ",  note: "golden" },
  { key: "vertical", ratio: 1 / PHI, label: "φ:1",  note: "portrait" },
  { key: "video",    ratio: 16 / 9,  label: "16:9", note: "video" },
  { key: "classic",  ratio: 4 / 3,   label: "4:3",  note: "classic" },
];

const BASE_H = 52;

export function AspectVisual() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--renge-space-5)", alignItems: "flex-end" }}>
      {STEPS.map(({ key, ratio, label, note }) => (
        <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--renge-space-2)" }}>
          <div style={{ width: Math.round(BASE_H * ratio), height: BASE_H, background: key === "golden" ? "var(--renge-color-accent-subtle)" : "var(--renge-color-bg-subtle)", border: `1px solid ${key === "golden" ? "var(--renge-color-accent)" : "var(--renge-color-border)"}`, borderRadius: "var(--renge-radius-2)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "var(--renge-font-size-sm)", color: key === "golden" ? "var(--renge-color-accent)" : "var(--renge-color-fg-subtle)", fontFamily: "var(--font-mono, monospace)" }}>{label}</div>
            <div style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-mono, monospace)", opacity: 0.7 }}>{note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
