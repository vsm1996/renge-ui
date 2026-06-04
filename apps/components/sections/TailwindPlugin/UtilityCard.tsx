"use client";

export function UtilityCard({
  label,
  cls,
  description,
  children,
}: {
  label: string;
  cls: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      background: "var(--renge-color-bg)",
      border: "1px solid var(--renge-color-border-subtle)",
      borderRadius: "var(--renge-radius-3)",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "var(--renge-space-5)",
        minHeight: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--renge-color-bg-subtle)",
        borderBottom: "1px solid var(--renge-color-border-subtle)",
      }}>
        {children}
      </div>
      <div style={{ padding: "var(--renge-space-4)" }}>
        <p style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "var(--renge-font-size-sm)",
          color: "var(--renge-color-accent)",
          margin: 0,
          marginBottom: "var(--renge-space-2)",
          letterSpacing: "0.02em",
        }}>
          {cls}
        </p>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--renge-font-size-sm)",
          color: "var(--renge-color-fg-subtle)",
          margin: 0,
          lineHeight: "var(--renge-line-height-base)",
        }}>
          {label} — {description}
        </p>
      </div>
    </div>
  );
}
