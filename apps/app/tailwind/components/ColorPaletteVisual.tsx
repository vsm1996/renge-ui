export function ColorPaletteVisual() {
  const colors = [
    { name: "accent", class: "bg-accent" },
    { name: "success", class: "bg-success" },
    { name: "warning", class: "bg-warning" },
    { name: "danger", class: "bg-danger" },
    { name: "info", class: "bg-info" },
    { name: "neutral", class: "bg-neutral" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "var(--renge-space-4)" }}>
      {colors.map(color => (
        <div key={color.name} style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
          <div style={{
            width: "100%",
            height: "80px",
            borderRadius: "var(--renge-radius-2)",
            background: `var(--renge-color-${color.name})`,
            border: "1px solid var(--renge-color-border-subtle)",
          }} />
          <div>
            <div style={{ fontSize: "var(--renge-font-size-xs)", fontWeight: 600, color: "var(--renge-color-fg)" }}>
              {color.name}
            </div>
            <div style={{ fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-fg-muted)", fontFamily: "monospace" }}>
              bg-{color.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
