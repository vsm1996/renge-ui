import { Stack } from "@renge-ui/react";

export type SidebarSection = {
  label: string;
  items: { id: string; label: string }[];
};

export function DocSidebar({
  sections,
  footerLinks = [],
}: {
  sections: SidebarSection[];
  footerLinks?: { href: string; label: string }[];
}) {
  return (
    <aside style={{ width: 180, flexShrink: 0, position: "sticky", top: "calc(52px + var(--renge-space-4))" }}>
      <div style={{ height: "calc(100vh - 52px - var(--renge-space-4))", overflowY: "auto", display: "flex", flexDirection: "column", gap: "var(--renge-space-5)", paddingBottom: "var(--renge-space-5)" }}>
        {sections.map(section => (
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

        {footerLinks.length > 0 && (
          <div style={{ paddingTop: "var(--renge-space-4)", borderTop: "1px solid var(--renge-color-border-subtle)", display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
            {footerLinks.map(link => (
              <a key={link.href} href={link.href} style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-body)", textDecoration: "none" }}>
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
