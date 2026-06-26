export function SpacingVisual() {
  const spacings = ["1", "2", "3", "4", "5", "6", "7", "8"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-6)" }}>
      {spacings.map(space => (
        <div key={space}>
          <div style={{ fontSize: "var(--renge-font-size-xs)", fontWeight: 600, color: "var(--renge-color-fg)", marginBottom: "var(--renge-space-2)" }}>
            gap-renge-{space}
          </div>
          <div style={{ display: "flex", gap: `var(--renge-space-${space})` }}>
            <div style={{ width: "40px", height: "40px", background: "var(--renge-color-accent)", borderRadius: "var(--renge-radius-2)" }} />
            <div style={{ width: "40px", height: "40px", background: "var(--renge-color-accent)", borderRadius: "var(--renge-radius-2)" }} />
            <div style={{ width: "40px", height: "40px", background: "var(--renge-color-accent)", borderRadius: "var(--renge-radius-2)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
