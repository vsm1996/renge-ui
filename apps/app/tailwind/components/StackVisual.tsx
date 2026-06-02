export function StackVisual() {
  return (
    <div style={{ display: "flex", gap: "var(--renge-space-6)", alignItems: "flex-start", flexWrap: "wrap" }}>
      <div>
        <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-mono, monospace)", margin: "0 0 var(--renge-space-2)" }}>stack</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
          {["Item 1", "Item 2", "Item 3"].map(l => (
            <div key={l} style={{ padding: "var(--renge-space-2) var(--renge-space-4)", background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", fontFamily: "var(--font-body)" }}>{l}</div>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-mono, monospace)", margin: "0 0 var(--renge-space-2)" }}>stack-h</p>
        <div style={{ display: "flex", flexDirection: "row", gap: "var(--renge-space-2)" }}>
          {["A", "B", "C"].map(l => (
            <div key={l} style={{ padding: "var(--renge-space-2) var(--renge-space-4)", background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", fontFamily: "var(--font-body)" }}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
