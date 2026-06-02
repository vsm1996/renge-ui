const STEPS = [
  { key: "sm", px: 524,  pct: 23.6, exp: "φ²" },
  { key: "md", px: 847,  pct: 38.2, exp: "φ³" },
  { key: "lg", px: 1371, pct: 61.8, exp: "φ⁴" },
  { key: "xl", px: 2218, pct: 100,  exp: "φ⁵" },
];

export function ContainerVisual() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-3)" }}>
      {STEPS.map(({ key, px, pct, exp }) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-4)" }}>
          <code style={{ width: 24, fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-mono, monospace)", flexShrink: 0 }}>{key}</code>
          <div style={{ flex: 1, background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-full)", height: 10, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: key === "lg" ? "var(--renge-color-accent)" : "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-full)", border: key === "lg" ? "none" : "1px solid var(--renge-color-accent)", opacity: key === "lg" ? 1 : 0.7 }} />
          </div>
          <span style={{ fontSize: "var(--renge-font-size-sm)", color: key === "lg" ? "var(--renge-color-accent)" : "var(--renge-color-fg-muted)", fontFamily: "var(--font-mono, monospace)", whiteSpace: "nowrap" }}>200 × {exp} = {px}px</span>
        </div>
      ))}
    </div>
  );
}
