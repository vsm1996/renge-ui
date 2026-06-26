import { Stack } from "@renge-ui/react";

const NAV_SECTIONS = [
  { label: "Token System", items: [
    { id: "installation", label: "Getting Started" },
    { id: "spacing", label: "Spacing" },
    { id: "typography", label: "Typography" },
    { id: "colors", label: "Colors" },
    { id: "radius", label: "Border Radius" },
    { id: "zindex", label: "Z-Index" },
    { id: "motion", label: "Motion" },
    { id: "other", label: "Other Categories" },
  ]},
  { label: "Integration", items: [
    { id: "frameworks", label: "Framework Support" },
  ]},
];

export function TokensSidebar() {
  return (
    <aside style={{ width: 180, flexShrink: 0, position: "sticky", top: "calc(52px + var(--renge-space-4))" }}>
      <div style={{ height: "calc(100vh - 52px - var(--renge-space-4))", overflowY: "auto", display: "flex", flexDirection: "column", gap: "var(--renge-space-5)", paddingBottom: "var(--renge-space-5)" }}>
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, margin: 0, marginBottom: "var(--renge-space-2)" }}>
              {section.label}
            </p>
            <Stack gap="1">
              {section.items.map(item => (
                <a key={item.id} href={`#${item.id}`} style={{
                  display: "block",
                  padding: "var(--renge-space-1) var(--renge-space-3)",
                  borderRadius: "var(--renge-radius-1)",
                  fontSize: "var(--renge-font-size-base)",
                  fontFamily: "var(--font-body)",
                  color: "var(--renge-color-fg-subtle)",
                  background: "transparent",
                  textDecoration: "none",
                  transition: `all var(--renge-duration-2) var(--renge-easing-ease-out)`,
                }}>
                  {item.label}
                </a>
              ))}
            </Stack>
          </div>
        ))}

        <div style={{ paddingTop: "var(--renge-space-4)", borderTop: "1px solid var(--renge-color-border-subtle)", display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
          <a href="/" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Home →</a>
          <a href="/components" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Components →</a>
          <a href="/tailwind" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Tailwind →</a>
        </div>
      </div>
    </aside>
  );
}
