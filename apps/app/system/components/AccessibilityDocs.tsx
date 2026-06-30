"use client";

import { Stack, Text, Heading, Badge, Anchor } from "@renge-ui/react";

export function AccessibilityDocs() {
  const wcagCriteria = [
    {
      criterion: "1.4.3: Contrast (Minimum)",
      level: "AA",
      status: "✅",
      description: "All text and interactive elements across light and dark modes meet the 4.5:1 minimum contrast ratio.",
      implementation: "All 6 profiles (Ocean, Earth, Leaf, Twilight, Fire, Void) verified in both modes. fgMuted values adjusted: fire/twilight light L≤46%; void dark raised from L=40% to L=58%. Validate combinations with WebAIM Contrast Checker.",
    },
    {
      criterion: "2.5.5: Target Size",
      level: "AA",
      status: "⚠️",
      description: "Full-size interactive elements (Button md/lg, Input, Select) meet 44×44px. Compact inline variants may fall below.",
      implementation: "Full-size components meet WCAG 2.1 target. Compact variants (Button sm, Badge, CopyButton) are sized for context — WCAG 2.2 (2.5.8) relaxes this to 24×24px minimum.",
    },
    {
      criterion: "2.4.7: Focus Visible",
      level: "AA",
      status: "✅",
      description: "All keyboard-interactive elements display a visible focus indicator.",
      implementation: "Focus ring: 3px glow via box-shadow using --renge-color-accent at 25–28% opacity. Hidden inputs (Radio, Checkbox, Switch) show ring on visual indicator via CSS sibling selector. All overlay triggers (Drawer, Modal, DropdownMenu, Popover) return focus to trigger on close.",
    },
    {
      criterion: "1.4.1: Use of Color",
      level: "A",
      status: "✅",
      description: "Status and states are never communicated by color alone.",
      implementation: "Multi-modal indicators throughout: borders, outlines, checkmarks, icons, text labels.",
    },
    {
      criterion: "1.3.1: Info & Relationships",
      level: "A",
      status: "✅",
      description: "Page structure properly identified with semantic HTML.",
      implementation: "H1 page title, logical heading hierarchy, semantic landmarks (main, nav). Form fields associated with labels via FormField.",
    },
    {
      criterion: "2.3.3: Animation from Interactions",
      level: "AA",
      status: "✅",
      description: "Animations respect prefers-reduced-motion.",
      implementation: "@media (prefers-reduced-motion) disables all transitions and SVG transforms site-wide.",
    },
    {
      criterion: "4.1.2: Name, Role, Value",
      level: "A",
      status: "✅",
      description: "All interactive elements have accessible names, roles, and states.",
      implementation: "aria-label, aria-expanded, aria-haspopup, aria-checked, aria-selected, aria-current, aria-modal, role attributes throughout all interactive components.",
    },
    {
      criterion: "2.4.1: Bypass Blocks",
      level: "A",
      status: "✅",
      description: "Skip link to main content visible on focus.",
      implementation: "SkipLink component shows on :focus, focuses #main element.",
    },
    {
      criterion: "2.1.1: Keyboard",
      level: "A",
      status: "✅",
      description: "All functionality is operable via keyboard alone.",
      implementation: "Every interactive component implements the ARIA keyboard patterns defined in the table below. Overlay components (Modal, Drawer) trap focus. Menus support arrow-key navigation.",
    },
  ];

  const keyboardPatterns = [
    { component: "Button / IconButton", keys: "Enter, Space", behavior: "Activate" },
    { component: "Tabs", keys: "← → Arrow, Home, End", behavior: "Navigate between tabs (roving tabindex)" },
    { component: "RadioGroup", keys: "↑ ↓ ← → Arrow", behavior: "Select next/previous radio (roving tabindex)" },
    { component: "Rating", keys: "← → Arrow, Home, End", behavior: "Decrease/increase value; Home = 0, End = max" },
    { component: "Accordion", keys: "Enter, Space", behavior: "Toggle panel open/closed" },
    { component: "Modal", keys: "Esc, Tab, Shift+Tab", behavior: "Close on Esc; Tab cycles through focusable elements; focus returns to trigger on close" },
    { component: "Drawer", keys: "Esc, Tab, Shift+Tab", behavior: "Close on Esc; focus trap within panel; focus returns to trigger on close" },
    { component: "DropdownMenu", keys: "Enter/Space to open, ↑ ↓ Arrow, Home, End, Esc", behavior: "Open/close; arrow keys navigate items; Esc closes and returns focus to trigger" },
    { component: "Popover", keys: "Enter/Space to toggle, Esc", behavior: "Toggle open/close; Esc closes and returns focus to trigger" },
    { component: "Combobox", keys: "↑ ↓ Arrow, Enter, Esc, Home, End", behavior: "Arrow keys navigate filtered list; Enter selects highlighted; Esc closes; focus stays on input" },
    { component: "MultiSelect", keys: "Enter/Space to open, ↑ ↓ Arrow, Enter on option, Esc", behavior: "Open/close; arrow keys navigate options; Enter/Space toggles selection; Esc closes" },
    { component: "ContextMenu", keys: "Esc, ↑ ↓ Arrow", behavior: "Esc closes; arrow keys navigate menu items when open" },
    { component: "Checkbox / Switch", keys: "Space", behavior: "Toggle checked state" },
    { component: "Select", keys: "↑ ↓ Arrow, Enter, Esc", behavior: "Native browser behavior (delegated to <select>)" },
    { component: "Slider", keys: "← → Arrow, Home, End", behavior: "Decrease/increase value (native <input type=range>)" },
    { component: "NumberInput", keys: "↑ ↓ Arrow (on input)", behavior: "Increment/decrement value via native number input" },
    { component: "Stepper", keys: "Enter, Space", behavior: "Navigate to step when onStepChange is provided" },
    { component: "Pagination", keys: "Tab, Enter, Space", behavior: "Tab between page buttons; Enter/Space activates" },
    { component: "TagInput", keys: "Enter or , to add, Backspace to remove last", behavior: "Add tag on Enter or comma; remove last tag on Backspace when input is empty" },
    { component: "Tooltip", keys: "Focus / Blur", behavior: "Show on focus; hide on blur" },
  ];

  const profiles = [
    { name: "Ocean", key: "ocean", light: "Sky-blue on near-white. The default.", dark: "Bright sky-blue accent on deep teal-blue." },
    { name: "Earth", key: "earth", light: "Amber on warm cream — parchment and ochre.", dark: "Amber-ochre on deep soil brown." },
    { name: "Leaf", key: "leaf", light: "Forest green on near-white. Cool, alive.", dark: "Vivid leaf green on dark forest floor." },
    { name: "Twilight", key: "twilight", light: "Sunset pink-orange accent on periwinkle dusk.", dark: "Amber horizon on deep inky indigo." },
    { name: "Fire", key: "fire", light: "Burning ember red-orange on near-white.", dark: "Bright orange accent on near-black charcoal." },
    { name: "Void", key: "void", light: "Dark cool grey on pure near-white. Minimal.", dark: "Moonlight grey on the void (near-black)." },
  ];

  return (
    <Stack gap="6" id="accessibility">
      <div>
        <Heading level={2} style={{ fontSize: "var(--renge-font-size-2xl)", marginBottom: "var(--renge-space-3)" }}>
          Accessibility
        </Heading>
        <Text size="base" style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.7 }}>
          Renge components and tokens are built to WCAG 2.1 Level AA accessibility standards. Every interactive component meets or exceeds the Web Content Accessibility Guidelines, ensuring interfaces built with Renge are usable by everyone.
        </Text>
      </div>

      {/* Color contrast + profiles */}
      <div style={{ paddingTop: "var(--renge-space-2)" }}>
        <Heading level={3} style={{ fontSize: "var(--renge-font-size-lg)", marginBottom: "var(--renge-space-2)" }}>
          Color Contrast — All 6 Profiles
        </Heading>
        <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.7, marginBottom: "var(--renge-space-4)" }}>
          Ensuring sufficient contrast between foreground and background hues is vital for users with low vision or color deficiencies.
          All 6 profiles meet WCAG AA (4.5:1 minimum for text, 3:1 for large text and UI elements) in both light and dark modes.
          Use a tool like{" "}
          <Anchor href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">
            WebAIM's Contrast Checker
          </Anchor>{" "}
          to validate specific color combinations in your application.
        </Text>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "var(--renge-space-3)" }}>
          {profiles.map((p) => (
            <div
              key={p.key}
              style={{
                padding: "var(--renge-space-3) var(--renge-space-4)",
                border: "1px solid var(--renge-color-border-subtle)",
                borderRadius: "var(--renge-radius-2)",
                background: "var(--renge-color-bg-subtle)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-2)", marginBottom: "var(--renge-space-2)" }}>
                <Text size="sm" style={{ fontWeight: 600 }}>{p.name}</Text>
                <Badge variant="neutral">AA ✅</Badge>
              </div>
              <Text size="xs" style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.5, margin: 0 }}>
                <strong>Light:</strong> {p.light}
              </Text>
              <Text size="xs" style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.5, margin: 0 }}>
                <strong>Dark:</strong> {p.dark}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* WCAG checklist */}
      <div style={{ paddingTop: "var(--renge-space-4)" }}>
        <Heading level={3} style={{ fontSize: "var(--renge-font-size-lg)", marginBottom: "var(--renge-space-4)" }}>
          WCAG 2.1 Compliance Checklist
        </Heading>
        <Stack gap="3">
          {wcagCriteria.map((criterion, idx) => (
            <div
              key={idx}
              style={{
                padding: "var(--renge-space-4)",
                border: "1px solid var(--renge-color-border-subtle)",
                borderRadius: "var(--renge-radius-2)",
                background: "var(--renge-color-bg-subtle)",
              }}
            >
              <Stack gap="2">
                <div style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-3)", flexWrap: "wrap" }}>
                  <Text size="sm" style={{ fontWeight: 600, fontFamily: "var(--font-body)" }}>
                    {criterion.criterion}
                  </Text>
                  <Badge variant="neutral">{criterion.level}</Badge>
                  <span style={{ fontSize: "var(--renge-font-size-lg)", marginLeft: "auto" }}>
                    {criterion.status}
                  </span>
                </div>
                <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)" }}>
                  {criterion.description}
                </Text>
                <Text size="xs" style={{ color: "var(--renge-color-fg-muted)", fontStyle: "italic" }}>
                  <strong>Implementation:</strong> {criterion.implementation}
                </Text>
              </Stack>
            </div>
          ))}
        </Stack>
      </div>

      {/* Component features */}
      <div style={{ paddingTop: "var(--renge-space-4)" }}>
        <Heading level={3} style={{ fontSize: "var(--renge-font-size-lg)", marginBottom: "var(--renge-space-4)" }}>
          Component-Level Features
        </Heading>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "var(--renge-space-4)" }}>
          {[
            {
              title: "Touch Targets",
              body: "Full-size buttons, links, and inputs enforce a 44×44px minimum touch target. Compact variants are sized for context (WCAG 2.2 minimum is 24×24px).",
            },
            {
              title: "Color Contrast",
              body: "All text across light and dark modes meets WCAG AA (4.5:1) across all 6 color profiles. Validate your specific combinations using WebAIM's Contrast Checker.",
            },
            {
              title: "Keyboard Navigation",
              body: "Every interactive component implements ARIA keyboard patterns. Overlays (Modal, Drawer) trap focus. Menus support arrow-key navigation. All triggers return focus on close.",
            },
            {
              title: "Screen Reader Support",
              body: "Proper ARIA labels, roles, and live regions throughout. aria-expanded, aria-haspopup, aria-selected, aria-current, aria-modal, and aria-live used correctly.",
            },
            {
              title: "Motion Preferences",
              body: "All animations and transitions respect prefers-reduced-motion. Users who prefer reduced motion experience instant, flicker-free interactions.",
            },
            {
              title: "Semantic HTML",
              body: "Components use correct semantic elements. Interactive controls are buttons or links. Form fields are associated with labels. Page landmarks are properly structured.",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                padding: "var(--renge-space-4)",
                border: "1px solid var(--renge-color-border-subtle)",
                borderRadius: "var(--renge-radius-2)",
                background: "var(--renge-color-bg)",
              }}
            >
              <Heading level={4} style={{ fontSize: "var(--renge-font-size-base)", marginBottom: "var(--renge-space-2)" }}>
                {card.title}
              </Heading>
              <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)" }}>
                {card.body}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard patterns */}
      <div style={{ paddingTop: "var(--renge-space-4)" }}>
        <Heading level={3} style={{ fontSize: "var(--renge-font-size-lg)", marginBottom: "var(--renge-space-4)" }}>
          Keyboard Patterns
        </Heading>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--renge-font-size-sm)" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--renge-color-border)", background: "var(--renge-color-bg-subtle)" }}>
                <th style={{ padding: "var(--renge-space-2) var(--renge-space-3)", textAlign: "left", fontWeight: 600, color: "var(--renge-color-fg-subtle)" }}>Component</th>
                <th style={{ padding: "var(--renge-space-2) var(--renge-space-3)", textAlign: "left", fontWeight: 600, color: "var(--renge-color-fg-subtle)" }}>Keys</th>
                <th style={{ padding: "var(--renge-space-2) var(--renge-space-3)", textAlign: "left", fontWeight: 600, color: "var(--renge-color-fg-subtle)" }}>Behavior</th>
              </tr>
            </thead>
            <tbody>
              {keyboardPatterns.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--renge-color-border-subtle)" }}>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-3)", color: "var(--renge-color-fg)", fontWeight: 500, whiteSpace: "nowrap" }}>{row.component}</td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-3)" }}>
                    <code style={{ fontFamily: "monospace", fontSize: "var(--renge-font-size-xs)", background: "var(--renge-color-bg-muted)", padding: "2px 6px", borderRadius: "var(--renge-radius-1)", color: "var(--renge-color-fg)" }}>{row.keys}</code>
                  </td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-3)", color: "var(--renge-color-fg-subtle)" }}>{row.behavior}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
          padding: "var(--renge-space-5)",
          border: "2px solid var(--renge-color-accent)",
          borderRadius: "var(--renge-radius-2)",
          background: "color-mix(in oklch, var(--renge-color-accent) 5%, transparent)",
        }}
      >
        <Stack gap="3">
          <Heading level={3} style={{ fontSize: "var(--renge-font-size-lg)", margin: 0 }}>
            WCAG 2.1 Level AA
          </Heading>
          <Text size="base" style={{ margin: 0, color: "var(--renge-color-fg-subtle)" }}>
            Renge components meet WCAG 2.1 Level AA. All 6 color profiles (Ocean, Earth, Leaf, Twilight, Fire, Void) pass 4.5:1 contrast in both light and dark modes. All interactive components implement proper ARIA patterns and keyboard navigation. Interfaces built with Renge are accessible to users with disabilities by default.
          </Text>
        </Stack>
      </div>
    </Stack>
  );
}
