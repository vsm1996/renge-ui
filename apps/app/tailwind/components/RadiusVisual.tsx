"use client";

export function RadiusVisual() {
  const radii = ["none", "1", "2", "3", "4", "5", "full"];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "var(--renge-space-4)" }}>
      {radii.map(radius => (
        <div key={radius} style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-2)", alignItems: "center" }}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "var(--renge-color-accent)",
            borderRadius: `var(--renge-radius-${radius})`,
          }} />
          <div style={{ fontSize: "var(--renge-font-size-xs)", fontWeight: 600, color: "var(--renge-color-fg)" }}>
            rounded-{radius}
          </div>
        </div>
      ))}
    </div>
  );
}
