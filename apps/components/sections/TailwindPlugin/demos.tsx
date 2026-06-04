"use client";

export function StackDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-2)", width: "100%", maxWidth: 180 }}>
      {["Item 1", "Item 2", "Item 3"].map(label => (
        <div key={label} style={{
          padding: "var(--renge-space-2) var(--renge-space-3)",
          background: "var(--renge-color-accent-subtle)",
          borderRadius: "var(--renge-radius-2)",
          fontSize: "var(--renge-font-size-sm)",
          color: "var(--renge-color-accent)",
          fontFamily: "var(--font-body)",
        }}>
          {label}
        </div>
      ))}
    </div>
  );
}

export function GridDemo() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "var(--renge-space-2)",
      width: "100%",
    }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{
          height: 32,
          background: i % 3 === 0
            ? "var(--renge-color-accent-subtle)"
            : "var(--renge-color-bg-muted)",
          borderRadius: "var(--renge-radius-2)",
          border: "1px solid var(--renge-color-border-subtle)",
        }} />
      ))}
    </div>
  );
}

export function AspectDemo() {
  const items = [
    { w: 40, h: 40, label: "1:1",  accent: false },
    { w: 64, h: 40, label: "1:φ",  accent: true  },
    { w: 71, h: 40, label: "16:9", accent: false },
  ];
  return (
    <div style={{ display: "flex", gap: "var(--renge-space-3)", alignItems: "flex-end" }}>
      {items.map(({ w, h, label, accent }) => (
        <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--renge-space-2)" }}>
          <div style={{
            width: w,
            height: h,
            background: accent ? "var(--renge-color-accent-subtle)" : "var(--renge-color-bg-muted)",
            borderRadius: "var(--renge-radius-2)",
            border: `1px solid ${accent ? "var(--renge-color-accent)" : "var(--renge-color-border)"}`,
          }} />
          <span style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "var(--renge-font-size-sm)",
            color: accent ? "var(--renge-color-accent)" : "var(--renge-color-fg-muted)",
          }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

const CONTAINER_WIDTHS = [
  { label: "sm", px: 524  },
  { label: "md", px: 847  },
  { label: "lg", px: 1371 },
  { label: "xl", px: 2218 },
];

export function ContainerDemo() {
  const maxPx = CONTAINER_WIDTHS[CONTAINER_WIDTHS.length - 1].px;
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
      {CONTAINER_WIDTHS.map(({ label, px }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-3)" }}>
          <span style={{
            width: 24,
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "var(--renge-font-size-sm)",
            color: "var(--renge-color-fg-muted)",
            flexShrink: 0,
          }}>
            {label}
          </span>
          <div style={{
            height: 10,
            width: `${(px / maxPx) * 100}%`,
            background: label === "lg" ? "var(--renge-color-accent)" : "var(--renge-color-bg-muted)",
            borderRadius: "var(--renge-radius-full)",
            border: label === "lg" ? "none" : "1px solid var(--renge-color-border-subtle)",
          }} />
          <span style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "var(--renge-font-size-sm)",
            color: label === "lg" ? "var(--renge-color-accent)" : "var(--renge-color-fg-muted)",
            flexShrink: 0,
          }}>
            {px}px
          </span>
        </div>
      ))}
    </div>
  );
}
