import { Stack } from "@renge-ui/react";

const NAV_SECTIONS = [
  { label: "Reference", items: [
    { id: "tokens",     label: "Token API" },
    { id: "animations", label: "Animations" },
    { id: "patterns",   label: "Patterns" },
  ]},
];

export function Sidebar({ active }: { active: string }) {
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
                  color: active === item.id ? "var(--renge-color-accent)" : "var(--renge-color-fg-subtle)",
                  background: active === item.id ? "var(--renge-color-accent-subtle)" : "transparent",
                  textDecoration: "none",
                  transition: "all 150ms",
                }}>
                  {item.label}
                </a>
              ))}
            </Stack>
          </div>
        ))}

        <div style={{ paddingTop: "var(--renge-space-4)", borderTop: "1px solid var(--renge-color-border-subtle)", display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
          <a href="/tailwind" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Tailwind →</a>
          <a href="/components" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Components →</a>
        </div>
      </div>
    </aside>
  );
}
