"use client";

import { Stack, Text, Heading, Badge } from "@renge-ui/react";

export function AccessibilityDocs() {
  const wcagCriteria = [
    {
      criterion: "1.4.3: Contrast",
      level: "AA",
      status: "✅",
      description: "All text on light backgrounds meets 4.5:1 contrast ratio minimum",
      implementation: "Color tokens (earth, twilight, fire, void, leaf) updated with verified contrast ratios",
    },
    {
      criterion: "2.5.5: Target Size",
      level: "AA",
      status: "✅",
      description: "All interactive elements sized 44×44px minimum",
      implementation: "Button, input, and link components enforce minHeight: 44px",
    },
    {
      criterion: "2.4.7: Focus Visible",
      level: "AA",
      status: "✅",
      description: "All keyboard-interactive elements have visible focus indicators",
      implementation: "Focus ring: 2px solid --renge-color-border-focus with 2px offset",
    },
    {
      criterion: "1.4.1: Use of Color",
      level: "A",
      status: "✅",
      description: "Status/states never indicated by color alone",
      implementation: "Multi-modal indicators: borders, outlines, checkmarks, icons, text",
    },
    {
      criterion: "1.3.1: Info & Relationships",
      level: "A",
      status: "✅",
      description: "Page structure properly identified with semantic HTML",
      implementation: "H1 page title, logical heading hierarchy, proper use of <main>, <nav>",
    },
    {
      criterion: "2.3.3: Animation",
      level: "AA",
      status: "✅",
      description: "Animations respect prefers-reduced-motion",
      implementation: "@media (prefers-reduced-motion) disables all animations and SVG transforms",
    },
    {
      criterion: "4.1.2: Name, Role, Value",
      level: "A",
      status: "✅",
      description: "All interactive elements have accessible names and labels",
      implementation: "aria-label, aria-current, aria-live, role attributes throughout",
    },
    {
      criterion: "2.4.1: Bypass Blocks",
      level: "A",
      status: "✅",
      description: "Skip link to main content visible on focus",
      implementation: "SkipLink component shows on :focus, focuses #main element",
    },
  ];

  return (
    <Stack gap="6" id="accessibility">
      <div>
        <Heading level={2} style={{ fontSize: "var(--renge-font-size-2xl)", marginBottom: "var(--renge-space-3)" }}>
          Accessibility
        </Heading>
        <Text size="base" style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.7 }}>
          Renge components and tokens are built to WCAG 2.1 Level AA accessibility standards. Every component meets or exceeds the Web Content Accessibility Guidelines, ensuring your interfaces are usable by everyone.
        </Text>
      </div>

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

      <div style={{ paddingTop: "var(--renge-space-4)" }}>
        <Heading level={3} style={{ fontSize: "var(--renge-font-size-lg)", marginBottom: "var(--renge-space-4)" }}>
          Component-Level Features
        </Heading>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "var(--renge-space-4)" }}>
          <div
            style={{
              padding: "var(--renge-space-4)",
              border: "1px solid var(--renge-color-border-subtle)",
              borderRadius: "var(--renge-radius-2)",
              background: "var(--renge-color-bg)",
            }}
          >
            <Heading level={4} style={{ fontSize: "var(--renge-font-size-base)", marginBottom: "var(--renge-space-2)" }}>
              Touch Targets
            </Heading>
            <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)" }}>
              All buttons, links, and inputs enforce a 44×44px minimum touch target size for accessibility on mobile and touch devices.
            </Text>
          </div>

          <div
            style={{
              padding: "var(--renge-space-4)",
              border: "1px solid var(--renge-color-border-subtle)",
              borderRadius: "var(--renge-radius-2)",
              background: "var(--renge-color-bg)",
            }}
          >
            <Heading level={4} style={{ fontSize: "var(--renge-font-size-base)", marginBottom: "var(--renge-space-2)" }}>
              Color Contrast
            </Heading>
            <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)" }}>
              All text on light backgrounds meets WCAG AA contrast (4.5:1 minimum). Component states visible without relying on color alone.
            </Text>
          </div>

          <div
            style={{
              padding: "var(--renge-space-4)",
              border: "1px solid var(--renge-color-border-subtle)",
              borderRadius: "var(--renge-radius-2)",
              background: "var(--renge-color-bg)",
            }}
          >
            <Heading level={4} style={{ fontSize: "var(--renge-font-size-base)", marginBottom: "var(--renge-space-2)" }}>
              Keyboard Navigation
            </Heading>
            <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)" }}>
              All interactive elements are keyboard accessible. Focus indicators are clearly visible. Skip links enable efficient navigation.
            </Text>
          </div>

          <div
            style={{
              padding: "var(--renge-space-4)",
              border: "1px solid var(--renge-color-border-subtle)",
              borderRadius: "var(--renge-radius-2)",
              background: "var(--renge-color-bg)",
            }}
          >
            <Heading level={4} style={{ fontSize: "var(--renge-font-size-base)", marginBottom: "var(--renge-space-2)" }}>
              Screen Reader Support
            </Heading>
            <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)" }}>
              Proper ARIA labels, roles, and semantic HTML. Animated content announces via aria-live. Page structure clear with heading hierarchy.
            </Text>
          </div>

          <div
            style={{
              padding: "var(--renge-space-4)",
              border: "1px solid var(--renge-color-border-subtle)",
              borderRadius: "var(--renge-radius-2)",
              background: "var(--renge-color-bg)",
            }}
          >
            <Heading level={4} style={{ fontSize: "var(--renge-font-size-base)", marginBottom: "var(--renge-space-2)" }}>
              Motion Preferences
            </Heading>
            <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)" }}>
              All animations and transitions respect the prefers-reduced-motion media query. Users who prefer reduced motion experience instant, flicker-free interactions.
            </Text>
          </div>

          <div
            style={{
              padding: "var(--renge-space-4)",
              border: "1px solid var(--renge-color-border-subtle)",
              borderRadius: "var(--renge-radius-2)",
              background: "var(--renge-color-bg)",
            }}
          >
            <Heading level={4} style={{ fontSize: "var(--renge-font-size-base)", marginBottom: "var(--renge-space-2)" }}>
              Semantic HTML
            </Heading>
            <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)" }}>
              Components use proper semantic HTML elements. Page landmarks properly structured. Form fields associated with labels.
            </Text>
          </div>
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
            ✨ 100% WCAG 2.1 Level AA Compliant
          </Heading>
          <Text size="base" style={{ margin: 0, color: "var(--renge-color-fg-subtle)" }}>
            Every Renge component meets all WCAG 2.1 Level AA success criteria. Your application built with Renge will be accessible to users with disabilities, and compliant with legal accessibility requirements (ADA, AODA, Equality Act 2010, etc.).
          </Text>
        </Stack>
      </div>
    </Stack>
  );
}
