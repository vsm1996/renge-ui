export function GridVisual() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-4)" }}>
      {[2, 3, 4, 6].map(cols => (
        <div key={cols} style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-4)" }}>
          <code style={{ width: 32, fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-mono, monospace)", flexShrink: 0 }}>{cols}</code>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "var(--renge-space-1)" }}>
            {Array.from({ length: cols }).map((_, i) => (
              <div key={i} style={{ height: 16, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-1)", border: "1px solid var(--renge-color-accent)", opacity: 0.6 + (i / cols) * 0.4 }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
