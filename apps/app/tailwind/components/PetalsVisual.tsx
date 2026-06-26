"use client";

export function PetalsVisual() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-6)" }}>
      {/* Typography Petal */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
        <div style={{ fontSize: "var(--renge-font-size-xs)", fontWeight: 600, color: "var(--renge-color-fg)" }}>
          petal-typography-displayLarge
        </div>
        <div style={{ fontSize: "var(--renge-font-size-3xl)", fontWeight: 400, lineHeight: "var(--renge-line-height-3xl)" }}>
          Large Display Heading
        </div>
      </div>

      {/* Button Petal */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
        <div style={{ fontSize: "var(--renge-font-size-xs)", fontWeight: 600, color: "var(--renge-color-fg)" }}>
          petal-interactive-buttonLarge
        </div>
        <button style={{
          padding: "var(--renge-space-3) var(--renge-space-5)",
          background: "var(--renge-color-accent)",
          color: "var(--renge-color-bg)",
          border: "none",
          borderRadius: "var(--renge-radius-2)",
          cursor: "pointer",
          fontWeight: 600,
        }}>
          Large Button
        </button>
      </div>

      {/* Card Petal */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
        <div style={{ fontSize: "var(--renge-font-size-xs)", fontWeight: 600, color: "var(--renge-color-fg)" }}>
          petal-cards-surfaceGenerous
        </div>
        <div style={{
          padding: "var(--renge-space-6)",
          background: "var(--renge-color-bg-subtle)",
          borderRadius: "var(--renge-radius-3)",
          border: "1px solid var(--renge-color-border-subtle)",
        }}>
          <div style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)" }}>
            Card with generous padding
          </div>
          <div style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", marginTop: "var(--renge-space-2)" }}>
            Semantic composition for consistent spacing
          </div>
        </div>
      </div>
    </div>
  );
}
