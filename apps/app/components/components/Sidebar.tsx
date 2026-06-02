import { Stack } from "@renge-ui/react";

export const NAV_SECTIONS = [
  {
    label: "Layout", items: [
      { id: "stack", label: "Stack" },
      { id: "grid", label: "Grid" },
      { id: "section", label: "Section" },
      { id: "container", label: "Container" },
      { id: "aspectratio", label: "AspectRatio" },
      { id: "spacer", label: "Spacer" },
    ]
  },
  {
    label: "Typography", items: [
      { id: "heading", label: "Heading" },
      { id: "text", label: "Text" },
      { id: "divider", label: "Divider" },
      { id: "anchor", label: "Anchor" },
    ]
  },
  {
    label: "Data Input", items: [
      { id: "button", label: "Button" },
      { id: "iconbutton", label: "IconButton" },
      { id: "buttongroup", label: "ButtonGroup" },
      { id: "copybutton", label: "CopyButton" },
      { id: "input", label: "Input" },
      { id: "select", label: "Select" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio", label: "Radio" },
      { id: "switch", label: "Switch" },
      { id: "textarea", label: "Textarea" },
      { id: "slider", label: "Slider" },
      { id: "formfield", label: "FormField" },
    ]
  },
  {
    label: "Display", items: [
      { id: "card", label: "Card" },
      { id: "badge", label: "Badge" },
      { id: "chip", label: "Chip" },
      { id: "avatar", label: "Avatar" },
      { id: "stat", label: "Stat" },
      { id: "tooltip", label: "Tooltip" },
      { id: "skeleton", label: "Skeleton" },
    ]
  },
  {
    label: "Data Display", items: [
      { id: "table", label: "Table" },
      { id: "accordion", label: "Accordion" },
      { id: "timeline", label: "Timeline" },
    ]
  },
  {
    label: "Feedback", items: [
      { id: "alert", label: "Alert" },
      { id: "spinner", label: "Spinner" },
      { id: "progress", label: "Progress" },
      { id: "toast", label: "Toast" },
      { id: "modal", label: "Modal" },
    ]
  },
  {
    label: "Navigation", items: [
      { id: "navbar", label: "Navbar" },
      { id: "tabs", label: "Tabs" },
      { id: "breadcrumb", label: "Breadcrumb" },
      { id: "pagination", label: "Pagination" },
    ]
  },
  {
    label: "Data viz", items: [
      { id: "energyring", label: "EnergyRing" },
      { id: "pulse", label: "Pulse" },
      { id: "flowfield", label: "FlowField" },
    ]
  },
];

export function Sidebar({ active }: { active: string }) {
  return (
    <aside style={{ width: 200, flexShrink: 0, position: "sticky", top: "calc(52px + var(--renge-space-4))" }}>
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
      </div>
    </aside>
  );
}
