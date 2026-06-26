export function TypographyVisual() {
  const sizes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"];
  const sizeLabels: Record<string, string> = {
    xs: "10px", sm: "13px", base: "16px", lg: "26px", xl: "42px", "2xl": "68px", "3xl": "110px", "4xl": "177px"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-4)" }}>
      {sizes.map(size => (
        <div key={size}>
          <div style={{ fontSize: `var(--renge-font-size-${size})`, color: "var(--renge-color-fg)", lineHeight: "var(--renge-line-height-base)" }}>
            text-{size} ({sizeLabels[size]})
          </div>
          <div style={{ fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-fg-muted)" }}>
            Demonstrates the PHI ratio scale in typography
          </div>
        </div>
      ))}
    </div>
  );
}
