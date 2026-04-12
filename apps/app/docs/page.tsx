"use client";

import { useState } from "react";
import Link from "next/link";
import { useBreakpoint } from "@/lib/useBreakpoint";
import {
  Stack, Grid, Section,
  Text, Heading, Divider,
  Button, Input, FormField,
  Card, Badge, Chip, Avatar, Stat,
  Alert, Spinner, Progress,
  Navbar,
  EnergyRing, Pulse, FlowField,
} from "@renge-ui/react";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";

// ============================================================================
// Shared primitives
// ============================================================================

function PropRow({ name, type, defaultVal, desc }: { name: string; type: string; defaultVal?: string; desc: string }) {
  return (
    <tr>
      <td style={{ padding: "var(--renge-space-3) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{name}</td>
      <td style={{ padding: "var(--renge-space-3) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{type}</td>
      <td style={{ padding: "var(--renge-space-3) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{defaultVal ?? "—"}</td>
      <td style={{ padding: "var(--renge-space-3) var(--renge-space-4)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{desc}</td>
    </tr>
  );
}

function PropsTable({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--renge-color-bg-subtle)" }}>
            {["Prop", "Type", "Default", "Description"].map(h => (
              <th key={h} style={{ padding: "var(--renge-space-2) var(--renge-space-4)", textAlign: "left", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Demo({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div>
      {label && (
        <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0, marginBottom: "var(--renge-space-2)" }}>{label}</p>
      )}
      <div style={{ padding: "var(--renge-space-6)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)", display: "flex", flexWrap: "wrap", gap: "var(--renge-space-4)", alignItems: "flex-start" }}>
        {children}
      </div>
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <div style={{ background: "var(--renge-color-bg-inverse)", borderRadius: "var(--renge-radius-2)", padding: "var(--renge-space-4)", overflowX: "auto" }}>
      <pre style={{ margin: 0 }}>
        <code style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-inverse)", lineHeight: 1.7 }}>{children}</code>
      </pre>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: "var(--renge-space-4)", borderRadius: "var(--renge-radius-2)", background: "var(--renge-color-accent-subtle)", borderLeft: "3px solid var(--renge-color-accent)" }}>
      <Text size="sm" color="fg-subtle">{children}</Text>
    </div>
  );
}

function ComponentSection({ id, title, description, children }: { id: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: "var(--renge-space-7)" }}>
      <Stack gap="5">
        <div>
          <Heading level={2} size="xl" style={{ marginBottom: "var(--renge-space-2)" }}>{title}</Heading>
          <Text as="p" color="fg-subtle" style={{ margin: 0 }}>{description}</Text>
        </div>
        {children}
      </Stack>
    </section>
  );
}

// ============================================================================
// Sidebar nav
// ============================================================================

const NAV_SECTIONS = [
  {
    label: "Layout", items: [
      { id: "stack", label: "Stack" },
      { id: "grid", label: "Grid" },
      { id: "section", label: "Section" },
    ]
  },
  {
    label: "Typography", items: [
      { id: "heading", label: "Heading" },
      { id: "text", label: "Text" },
      { id: "divider", label: "Divider" },
    ]
  },
  {
    label: "Inputs", items: [
      { id: "button", label: "Button" },
      { id: "input", label: "Input" },
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
    ]
  },
  {
    label: "Feedback", items: [
      { id: "alert", label: "Alert" },
      { id: "spinner", label: "Spinner" },
      { id: "progress", label: "Progress" },
    ]
  },
  {
    label: "Navigation", items: [
      { id: "navbar", label: "Navbar" },
    ]
  },
  {
    label: "Data viz", items: [
      { id: "energyring", label: "EnergyRing" },
      { id: "pulse", label: "Pulse" },
      { id: "flowfield", label: "FlowField" },
    ]
  },
  {
    label: "System", items: [
      { id: "tokens", label: "Token API" },
      { id: "animations", label: "Animations" },
      { id: "patterns", label: "Patterns" },
    ]
  },
];

function Sidebar({ active }: { active: string }) {
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

// ============================================================================
// Component docs
// ============================================================================

function StackDocs() {
  return (
    <ComponentSection id="stack" title="Stack" description="Flexbox container. Composes vertical and horizontal layouts using Fibonacci spacing tokens.">
      <Demo label="Vertical (default)">
        <Stack gap="4" style={{ width: "100%" }}>
          {["Item 1", "Item 2", "Item 3"].map(label => (
            <div key={label} style={{ height: 40, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)", display: "flex", alignItems: "center", paddingInline: "var(--renge-space-3)" }}>
              <Text size="sm" color="accent">{label}</Text>
            </div>
          ))}
        </Stack>
      </Demo>
      <Demo label="Horizontal + justify between">
        <Stack direction="horizontal" justify="between" style={{ width: "100%" }}>
          <Text size="sm" color="accent" weight="medium">Left</Text>
          <Text size="sm" color="fg-subtle">Center</Text>
          <Text size="sm" color="accent" weight="medium">Right</Text>
        </Stack>
      </Demo>
      <Demo label="Horizontal + align center">
        <Stack direction="horizontal" gap="3" align="center">
          <div style={{ width: 40, height: 56, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)" }} />
          <div style={{ width: 60, height: 32, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)" }} />
          <div style={{ width: 32, height: 48, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)" }} />
        </Stack>
      </Demo>
      <Code>{`<Stack gap="4">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</Stack>

<Stack direction="horizontal" justify="between">
  <Text>Left</Text>
  <Text>Right</Text>
</Stack>

{/* Flex wrap via style prop */}
<Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
  <Badge>one</Badge>
  <Badge>two</Badge>
  <Badge>three</Badge>
</Stack>`}</Code>
      <PropsTable>
        <PropRow name="gap" type='"0" – "10"' defaultVal='"3"' desc="Gap between children — Fibonacci spacing step (e.g. step 4 = 20px)." />
        <PropRow name="direction" type='"vertical" | "horizontal"' defaultVal='"vertical"' desc="flex-direction: column or row." />
        <PropRow name="align" type='"start" | "center" | "end" | "stretch"' defaultVal='"stretch"' desc="align-items value." />
        <PropRow name="justify" type='"start" | "center" | "end" | "between" | "around"' defaultVal='"start"' desc="justify-content value." />
        <PropRow name="as" type="ElementType" defaultVal='"div"' desc="Rendered HTML element (div, ul, nav, etc.)." />
      </PropsTable>
    </ComponentSection>
  );
}

function GridDocs() {
  return (
    <ComponentSection id="grid" title="Grid" description="CSS grid container with Fibonacci gap tokens. Accepts a number of equal columns or a custom template string.">
      <Demo label="3-column equal grid">
        <Grid columns={3} gap="3" style={{ width: "100%" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ height: 48, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Text size="sm" color="accent">{i + 1}</Text>
            </div>
          ))}
        </Grid>
      </Demo>
      <Demo label="Golden ratio split (1fr 1.618fr)">
        <Grid columns="1fr 1.618fr" gap="4" style={{ width: "100%" }}>
          <div style={{ height: 56, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Text size="sm" color="fg-subtle">1</Text>
          </div>
          <div style={{ height: 56, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Text size="sm" color="fg-subtle">φ</Text>
          </div>
        </Grid>
      </Demo>
      <Code>{`<Grid columns={3} gap="3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Grid>

{/* Custom template — e.g. golden ratio split */}
<Grid columns="1fr 1.618fr" gap="4">
  <div>Narrow</div>
  <div>Wide (φ)</div>
</Grid>

{/* Per-axis gaps */}
<Grid columns={2} gapX="5" gapY="3">
  ...
</Grid>`}</Code>
      <PropsTable>
        <PropRow name="columns" type="number | string" defaultVal="1" desc="Number of equal columns, or a CSS grid-template-columns string." />
        <PropRow name="rows" type="number | string" defaultVal="—" desc="Row count or grid-template-rows string." />
        <PropRow name="gap" type='"0" – "6"' defaultVal='"3"' desc="Gap between all cells." />
        <PropRow name="gapX" type='"0" – "6"' defaultVal="—" desc="Column gap — overrides gap." />
        <PropRow name="gapY" type='"0" – "6"' defaultVal="—" desc="Row gap — overrides gap." />
        <PropRow name="align" type='"start" | "center" | "end" | "stretch"' defaultVal='"stretch"' desc="align-items value." />
        <PropRow name="justify" type='"start" | "center" | "end" | "stretch"' defaultVal='"stretch"' desc="justify-items value." />
      </PropsTable>
    </ComponentSection>
  );
}

function SectionDocs() {
  return (
    <ComponentSection id="section" title="Section" description="Page section wrapper with max-width constraint and automatic horizontal centering.">
      <Demo label="Centered with md max-width">
        <div style={{ width: "100%", border: "1px dashed var(--renge-color-border)", borderRadius: "var(--renge-radius-2)" }}>
          <Section maxWidth="md" paddingY="5" paddingX="4" style={{ background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)" }}>
            <Text color="accent" size="sm">maxWidth="md" — 768px, centered</Text>
          </Section>
        </div>
      </Demo>
      <Code>{`<Section maxWidth="lg" paddingY="8" paddingX="5">
  <Heading>Page content</Heading>
  <Text>Body copy sits inside the max-width container.</Text>
</Section>

{/* Full-bleed with internal constraint */}
<div style={{ background: "var(--renge-color-bg-subtle)" }}>
  <Section maxWidth="xl" paddingY="7">
    <Heading>Wide section</Heading>
  </Section>
</div>`}</Code>
      <PropsTable>
        <PropRow name="maxWidth" type='"sm" | "md" | "lg" | "xl" | "full" | "none"' defaultVal='"lg"' desc="sm=640px · md=768px · lg=1024px · xl=1280px · full=100% · none=unset." />
        <PropRow name="paddingX" type='"0" – "8"' defaultVal='"4"' desc="Horizontal padding." />
        <PropRow name="paddingY" type='"0" – "8"' defaultVal='"6"' desc="Vertical padding." />
        <PropRow name="padding" type='"0" – "8"' defaultVal="—" desc="Sets both axes at once. Overrides paddingX and paddingY." />
        <PropRow name="center" type="boolean" defaultVal="true" desc="Applies margin-inline: auto to center the container." />
        <PropRow name="animation" type="AnimationName" defaultVal="—" desc="Renge animation token." />
        <PropRow name="as" type="ElementType" defaultVal='"section"' desc="Rendered HTML element." />
      </PropsTable>
    </ComponentSection>
  );
}

function HeadingDocs() {
  return (
    <ComponentSection id="heading" title="Heading" description="Semantic heading using the PHI-derived type scale. Level maps to h1–h6 and sets a proportional default size.">
      <Demo label="Levels 1–4 with default sizing">
        <Stack gap="4" style={{ width: "100%" }}>
          {([1, 2, 3, 4] as const).map(level => (
            <div key={level} style={{ display: "flex", alignItems: "baseline", gap: "var(--renge-space-4)" }}>
              <Heading key={level} level={level}>Level {level} heading</Heading>
              <Text size="sm" color="fg-subtle" style={{ flexShrink: 0 }}>h{level} → {["3xl", "2xl", "xl", "lg"][level - 1]}</Text>
            </div>
          ))}
        </Stack>
      </Demo>
      <Demo label="Color variants">
        <Stack gap="3">
          <Heading level={3} color="fg">Default — var(--renge-color-fg)</Heading>
          <Heading level={3} color="fg-subtle">Subtle — var(--renge-color-fg-subtle)</Heading>
          <Heading level={3} color="accent">Accent — var(--renge-color-accent)</Heading>
        </Stack>
      </Demo>
      <Code>{`<Heading level={1}>The golden ratio.</Heading>
<Heading level={2} color="accent">Section title</Heading>

{/* Override the default size for a level */}
<Heading level={3} size="2xl">Larger h3</Heading>

{/* PHI-derived line heights apply automatically */}
{/* h1/h2 → display (1.236), h3/h4 → heading (1.382) */}`}</Code>
      <PropsTable>
        <PropRow name="level" type="1 | 2 | 3 | 4 | 5 | 6" defaultVal="2" desc="Semantic HTML level (h1–h6). Also sets the default size." />
        <PropRow name="size" type='"lg" | "xl" | "2xl" | "3xl" | "4xl"' defaultVal="level-mapped" desc="Override the default size. h1→3xl, h2→2xl, h3→xl, h4/5/6→lg." />
        <PropRow name="color" type='"fg" | "fg-subtle" | "accent"' defaultVal='"fg"' desc="Text color semantic token." />
        <PropRow name="animation" type="AnimationName" defaultVal="—" desc="Renge animation token." />
      </PropsTable>
    </ComponentSection>
  );
}

function TextDocs() {
  return (
    <ComponentSection id="text" title="Text" description="Inline or block text element with full access to the PHI type scale, color tokens, and weight options.">
      <Demo label="Size scale">
        <Stack gap="3" style={{ width: "100%" }}>
          {(["2xl", "xl", "lg", "base", "sm", "xs"] as const).map(size => (
            <div key={size} style={{ display: "flex", alignItems: "baseline", gap: "var(--renge-space-4)" }}>
              <Text size={size}>The ratio that appears in every living thing.</Text>
              <Text size="sm" color="fg-subtle" style={{ flexShrink: 0 }}>{size}</Text>
            </div>
          ))}
        </Stack>
      </Demo>
      <Demo label="Colors + weights">
        <Stack gap="2">
          {(["fg", "fg-subtle", "fg-muted", "accent", "success", "warning", "danger"] as const).map(color => (
            <Text key={color} size="sm" color={color}>{color}</Text>
          ))}
        </Stack>
        <Stack gap="2">
          {(["normal", "medium", "semibold", "bold"] as const).map(weight => (
            <Text key={weight} size="sm" weight={weight}>weight="{weight}"</Text>
          ))}
        </Stack>
      </Demo>
      <Code>{`<Text size="lg" color="fg-subtle">Natural proportion.</Text>
<Text as="p" weight="medium" size="base">
  Fibonacci spacing.
</Text>
<Text size="sm" color="accent" weight="semibold">
  PHI = 1.618033...
</Text>

{/* Block-level text */}
<Text as="p" size="base" color="fg-subtle">
  Paragraph text using the base size — 16px, line-height 1.618 (φ).
</Text>`}</Code>
      <PropsTable>
        <PropRow name="size" type='"xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl"' defaultVal='"base"' desc="Font size token. Steps derived from PHI: base × φ^n." />
        <PropRow name="color" type='"fg" | "fg-subtle" | "fg-muted" | "accent" | "success" | "warning" | "danger"' defaultVal='"fg"' desc="Text color semantic token." />
        <PropRow name="weight" type='"normal" | "medium" | "semibold" | "bold"' defaultVal='"normal"' desc="Font weight: 400 / 500 / 600 / 700." />
        <PropRow name="align" type='"left" | "center" | "right"' defaultVal="—" desc="Text alignment." />
        <PropRow name="animation" type="AnimationName" defaultVal="—" desc="Renge animation token." />
        <PropRow name="as" type="ElementType" defaultVal='"span"' desc="Rendered HTML element." />
      </PropsTable>
    </ComponentSection>
  );
}

function DividerDocs() {
  return (
    <ComponentSection id="divider" title="Divider" description="Horizontal or vertical rule rendered as an <hr>. Uses border color tokens for consistent visual weight.">
      <Demo label="Horizontal variants">
        <Stack gap="4" style={{ width: "100%" }}>
          <Text size="sm">Above — default (border-subtle)</Text>
          <Divider />
          <Text size="sm">Between sections</Text>
          <Divider color="border" spacing="2" />
          <Text size="sm">Below — stronger border, tighter spacing</Text>
        </Stack>
      </Demo>
      <Demo label="Vertical">
        <Stack direction="horizontal" align="stretch" style={{ height: 60 }}>
          <Text size="sm" color="fg-subtle">Left content</Text>
          <Divider orientation="vertical" spacing="4" />
          <Text size="sm" color="fg-subtle">Right content</Text>
        </Stack>
      </Demo>
      <Code>{`<Divider />
<Divider color="border" spacing="2" />
<Divider orientation="vertical" spacing="4" />`}</Code>
      <PropsTable>
        <PropRow name="orientation" type='"horizontal" | "vertical"' defaultVal='"horizontal"' desc="Horizontal: 1px height, full width. Vertical: 1px width, full height." />
        <PropRow name="spacing" type='"0" – "6"' defaultVal='"3"' desc="Margin around the rule (marginBlock or marginInline)." />
        <PropRow name="color" type='"border" | "border-subtle"' defaultVal='"border-subtle"' desc="Line color token." />
      </PropsTable>
    </ComponentSection>
  );
}

function ButtonDocs() {
  return (
    <ComponentSection id="button" title="Button" description="Action element. Every variant, size, and color combination resolves to a CSS variable — no hardcoded values.">
      <Demo label="Variants">
        <Stack direction="horizontal" gap="3" align="center" style={{ flexWrap: "wrap" }}>
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </Stack>
      </Demo>
      <Demo label="Sizes">
        <Stack direction="horizontal" gap="3" align="center" style={{ flexWrap: "wrap" }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Stack>
      </Demo>
      <Demo label="Color schemes">
        <Stack direction="horizontal" gap="3" align="center" style={{ flexWrap: "wrap" }}>
          <Button colorScheme="accent">Accent</Button>
          <Button colorScheme="success">Success</Button>
          <Button colorScheme="danger">Danger</Button>
        </Stack>
        <Stack direction="horizontal" gap="3" align="center" style={{ flexWrap: "wrap" }}>
          <Button variant="outline" colorScheme="accent">Accent outline</Button>
          <Button variant="outline" colorScheme="danger">Danger outline</Button>
          <Button variant="ghost" colorScheme="success">Ghost success</Button>
        </Stack>
      </Demo>
      <Demo label="Full width + disabled">
        <Stack gap="3" style={{ width: "100%" }}>
          <Button fullWidth>Full width</Button>
          <Button fullWidth disabled style={{ opacity: 0.4, cursor: "not-allowed" }}>Disabled</Button>
        </Stack>
      </Demo>
      <Code>{`<Button variant="solid" size="md" colorScheme="accent">
  Continue
</Button>

<Button variant="outline" colorScheme="danger" size="sm">
  Delete
</Button>

<Button variant="ghost" colorScheme="success">
  Confirm
</Button>

{/* Disabled state — native HTML attribute */}
<Button disabled style={{ opacity: 0.4, cursor: "not-allowed" }}>
  Unavailable
</Button>

{/* Extends all native button props */}
<Button onClick={handleSubmit} type="submit" fullWidth>
  Submit form
</Button>`}</Code>
      <PropsTable>
        <PropRow name="variant" type='"solid" | "outline" | "ghost"' defaultVal='"solid"' desc="Solid fills with colorScheme bg, outline shows border, ghost is text-only." />
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="sm: space-1/2 · md: space-2/4 · lg: space-3/5 padding." />
        <PropRow name="colorScheme" type='"accent" | "danger" | "success"' defaultVal='"accent"' desc="Which semantic color set to apply across all variants." />
        <PropRow name="fullWidth" type="boolean" defaultVal="false" desc="Stretches button to 100% container width." />
        <PropRow name="animation" type="AnimationName" defaultVal="—" desc="Renge animation token applied as CSS animation." />
        <PropRow name="disabled" type="boolean" defaultVal="—" desc="Native HTML attribute — style opacity via style prop." />
      </PropsTable>
    </ComponentSection>
  );
}

function InputDocs() {
  return (
    <ComponentSection id="input" title="Input" description="Text input with Renge sizing and validation state styling. Focus ring is handled with inline event handlers to stay in-system.">
      <Demo label="States">
        <Stack gap="3" style={{ minWidth: 260, width: "100%" }}>
          <Input placeholder="Default" fullWidth />
          <Input placeholder="Error state" state="error" fullWidth />
          <Input placeholder="Success state" state="success" fullWidth />
        </Stack>
      </Demo>
      <Demo label="Sizes">
        <Stack direction="horizontal" gap="3" align="center" style={{ flexWrap: "wrap" }}>
          <Input placeholder="sm" size="sm" />
          <Input placeholder="md (default)" size="md" />
          <Input placeholder="lg" size="lg" />
        </Stack>
      </Demo>
      <Code>{`<Input placeholder="Enter value" size="md" />
<Input state="error" placeholder="Invalid input" fullWidth />
<Input state="success" defaultValue="Confirmed" fullWidth />

{/* Controlled */}
<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Controlled input"
  fullWidth
/>`}</Code>
      <Callout>
        The native HTML <code>size</code> attribute (a number controlling character width) is excluded to avoid collision with Renge&apos;s <code>size</code> prop. Use <code>style={`{{ width: "..." }}`}</code> or <code>fullWidth</code> for sizing.
      </Callout>
      <PropsTable>
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Controls padding and font size." />
        <PropRow name="state" type='"default" | "error" | "success"' defaultVal='"default"' desc="Sets border color to the corresponding semantic token." />
        <PropRow name="fullWidth" type="boolean" defaultVal="false" desc="Stretches input to 100% container width." />
      </PropsTable>
    </ComponentSection>
  );
}

function FormFieldDocs() {
  return (
    <ComponentSection id="formfield" title="FormField" description="Wraps any input with a label, optional helper text, and error text. Error overrides helper when both are present.">
      <Demo label="States">
        <Stack gap="5" style={{ minWidth: 280, width: "100%" }}>
          <FormField label="Email address" htmlFor="email-demo" helperText="We'll never share your email.">
            <Input id="email-demo" placeholder="you@example.com" fullWidth />
          </FormField>
          <FormField label="Username" htmlFor="user-demo" required errorText="Username is already taken.">
            <Input id="user-demo" defaultValue="renge" state="error" fullWidth />
          </FormField>
          <FormField label="API key" htmlFor="api-demo" helperText="Read-only. Regenerate from settings.">
            <Input id="api-demo" defaultValue="sk-renge-..." state="success" fullWidth readOnly />
          </FormField>
        </Stack>
      </Demo>
      <Code>{`<FormField
  label="Email"
  htmlFor="email"
  helperText="We'll never share this."
>
  <Input id="email" type="email" fullWidth />
</FormField>

<FormField
  label="Username"
  htmlFor="username"
  required
  errorText="Username already taken."
>
  <Input id="username" state="error" fullWidth />
</FormField>`}</Code>
      <PropsTable>
        <PropRow name="label" type="string" defaultVal="—" desc="Label text rendered in a <label> element." />
        <PropRow name="htmlFor" type="string" defaultVal="—" desc="Links the label to an input via its id." />
        <PropRow name="helperText" type="string" defaultVal="—" desc="Muted hint text below the input." />
        <PropRow name="errorText" type="string" defaultVal="—" desc="Danger-colored error text. Overrides helperText when both are set." />
        <PropRow name="required" type="boolean" defaultVal="—" desc="Appends a red asterisk to the label." />
      </PropsTable>
    </ComponentSection>
  );
}

function CardDocs() {
  return (
    <ComponentSection id="card" title="Card" description="Surface container with three visual variants. Padding and radius are token-driven.">
      <Demo label="Variants">
        <Card variant="elevated" style={{ minWidth: 160 }}>
          <Text size="sm" weight="medium">Elevated</Text>
          <Text size="sm" color="fg-subtle">Shadow on bg</Text>
        </Card>
        <Card variant="outlined" style={{ minWidth: 160 }}>
          <Text size="sm" weight="medium">Outlined</Text>
          <Text size="sm" color="fg-subtle">Border visible</Text>
        </Card>
        <Card variant="filled" style={{ minWidth: 160 }}>
          <Text size="sm" weight="medium">Filled</Text>
          <Text size="sm" color="fg-subtle">bg-subtle surface</Text>
        </Card>
      </Demo>
      <Demo label="Padding scale">
        <Stack direction="horizontal" gap="4" align="start" style={{ flexWrap: "wrap" }}>
          {(["2", "4", "6"] as const).map(p => (
            <Card key={p} variant="outlined" padding={p}>
              <Text size="sm" color="fg-subtle">padding="{p}"</Text>
            </Card>
          ))}
        </Stack>
      </Demo>
      <Code>{`<Card variant="elevated" padding="5" radius="3">
  <Heading level={3}>Card title</Heading>
  <Text color="fg-subtle">Supporting copy goes here.</Text>
</Card>

<Card variant="outlined" padding="4">
  <Stack gap="3">
    <Badge variant="success">Active</Badge>
    <Heading level={3}>Status card</Heading>
  </Stack>
</Card>`}</Code>
      <PropsTable>
        <PropRow name="variant" type='"elevated" | "outlined" | "filled"' defaultVal='"elevated"' desc="elevated: drop shadow · outlined: border · filled: bg-subtle background." />
        <PropRow name="padding" type='"0" – "6"' defaultVal='"4"' desc="Internal padding using Fibonacci spacing tokens." />
        <PropRow name="radius" type='"none" | "1" – "5" | "full"' defaultVal='"3"' desc="Border radius token (radius-3 = 12px by default)." />
        <PropRow name="animation" type="AnimationName" defaultVal="—" desc="Renge animation token." />
      </PropsTable>
    </ComponentSection>
  );
}

function BadgeDocs() {
  return (
    <ComponentSection id="badge" title="Badge" description="Compact inline label for status, category, or count. Six semantic variants map directly to the color token system.">
      <Demo label="Variants">
        <Stack direction="horizontal" gap="2" style={{ flexWrap: "wrap" }}>
          {(["neutral", "accent", "success", "warning", "danger", "info"] as const).map(v => (
            <Badge key={v} variant={v}>{v}</Badge>
          ))}
        </Stack>
      </Demo>
      <Demo label="Sizes">
        <Stack direction="horizontal" gap="3" align="center">
          <Badge size="sm">sm — compact</Badge>
          <Badge size="md">md — default</Badge>
          <Badge size="lg">lg — prominent</Badge>
        </Stack>
      </Demo>
      <Code>{`<Badge variant="success">Published</Badge>
<Badge variant="warning" size="sm">Beta</Badge>
<Badge variant="danger">Deprecated</Badge>
<Badge variant="info">New</Badge>
<Badge variant="accent" size="lg">Featured</Badge>`}</Code>
      <PropsTable>
        <PropRow name="variant" type='"neutral" | "accent" | "success" | "warning" | "danger" | "info"' defaultVal='"neutral"' desc="Determines background and text color via semantic token pairs (e.g. success-subtle + success)." />
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Controls padding and font size." />
      </PropsTable>
    </ComponentSection>
  );
}

function ChipDocs() {
  const [chips, setChips] = useState(["Design system", "PHI", "Fibonacci", "Proportional"]);
  return (
    <ComponentSection id="chip" title="Chip" description="Dismissible tag with the same semantic color variants as Badge. Provide onDismiss to render a close button.">
      <Demo label="Variants">
        <Stack direction="horizontal" gap="2" style={{ flexWrap: "wrap" }}>
          {(["neutral", "accent", "success", "warning", "danger"] as const).map(v => (
            <Chip key={v} variant={v}>{v}</Chip>
          ))}
        </Stack>
      </Demo>
      <Demo label="Dismissible (live demo)">
        <Stack direction="horizontal" gap="2" style={{ flexWrap: "wrap" }}>
          {chips.map(c => (
            <Chip key={c} variant="accent" onDismiss={() => setChips(prev => prev.filter(x => x !== c))}>
              {c}
            </Chip>
          ))}
          {chips.length === 0 && <Text size="sm" color="fg-subtle">All dismissed. Refresh to reset.</Text>}
        </Stack>
      </Demo>
      <Code>{`{/* Static */}
<Chip variant="accent">Design system</Chip>

{/* Dismissible */}
<Chip variant="neutral" onDismiss={() => removeTag(id)}>
  Removable
</Chip>

{/* Dynamic tag list */}
{tags.map(tag => (
  <Chip
    key={tag.id}
    variant="accent"
    onDismiss={() => removeTag(tag.id)}
  >
    {tag.label}
  </Chip>
))}`}</Code>
      <PropsTable>
        <PropRow name="variant" type='"neutral" | "accent" | "success" | "warning" | "danger" | "info"' defaultVal='"neutral"' desc="Color semantic — same token mapping as Badge." />
        <PropRow name="onDismiss" type="() => void" defaultVal="—" desc="When provided, renders a × button. Call your own state removal logic here." />
      </PropsTable>
    </ComponentSection>
  );
}

function AvatarDocs() {
  return (
    <ComponentSection id="avatar" title="Avatar" description="User avatar with image or initials fallback. Sizes follow the Fibonacci sequence × 4px.">
      <Demo label="Sizes — Fibonacci × 4px">
        <Stack direction="horizontal" gap="4" align="center" style={{ flexWrap: "wrap" }}>
          {(["1", "2", "3", "4", "5"] as const).map(size => (
            <Stack key={size} gap="1" align="center">
              <Avatar size={size} initials="RG" />
              <Text size="sm" color="fg-subtle">{["20", "32", "52", "84", "136"][+size - 1]}px</Text>
            </Stack>
          ))}
        </Stack>
      </Demo>
      <Demo label="Shapes + image">
        <Stack direction="horizontal" gap="4" align="center">
          <Stack gap="1" align="center">
            <Avatar initials="PH" size="3" />
            <Text size="sm" color="fg-subtle">circle</Text>
          </Stack>
          <Stack gap="1" align="center">
            <Avatar initials="FB" size="3" shape="square" />
            <Text size="sm" color="fg-subtle">square</Text>
          </Stack>
          <Stack gap="1" align="center">
            <Avatar src="https://api.dicebear.com/9.x/shapes/svg?seed=renge" alt="Renge" size="3" />
            <Text size="sm" color="fg-subtle">image</Text>
          </Stack>
        </Stack>
      </Demo>
      <Code>{`{/* Initials fallback */}
<Avatar initials="RG" size="3" />

{/* Image with initials fallback */}
<Avatar
  src="/user.jpg"
  alt="Profile photo"
  initials="RG"
  size="4"
/>

{/* Square shape */}
<Avatar initials="FB" shape="square" size="3" />`}</Code>
      <Callout>
        Avatar sizes are Fibonacci numbers × 4px: <strong>20 · 32 · 52 · 84 · 136</strong>. Consecutive ratios converge toward φ — each size is ≈1.618× the previous.
      </Callout>
      <PropsTable>
        <PropRow name="src" type="string" defaultVal="—" desc="Image URL. Takes priority over initials if provided." />
        <PropRow name="alt" type="string" defaultVal="—" desc="Image alt text and aria-label for the avatar." />
        <PropRow name="initials" type="string" defaultVal="—" desc="Up to 2 characters, displayed when src is absent or fails to load." />
        <PropRow name="size" type='"1" | "2" | "3" | "4" | "5"' defaultVal='"3"' desc="20 / 32 / 52 / 84 / 136 px — Fibonacci[3–7] × 4." />
        <PropRow name="shape" type='"circle" | "square"' defaultVal='"circle"' desc="circle: full border-radius · square: radius-3 (12px)." />
      </PropsTable>
    </ComponentSection>
  );
}

function StatDocs() {
  return (
    <ComponentSection id="stat" title="Stat" description="Key metric display. Trend badges are color-coded via success/danger tokens. Value renders at 3xl — designed to be read at a glance.">
      <Demo label="Metrics">
        <Stat value="φ" label="Golden ratio" />
        <Stat value="1.618" label="PHI (exact)" caption="(1 + √5) / 2" />
        <Stat value="89" label="Fibonacci step 10" trend="up" trendValue="+34" caption="from step 9 (55)" />
        <Stat value="13ms" label="Duration 4" trend="down" trendValue="-2ms" caption="vs last build" />
        <Stat value="106" label="Tests passing" trend="up" trendValue="+1" />
      </Demo>
      <Code>{`<Stat value="φ" label="Golden ratio" />

<Stat
  value="89"
  label="Fibonacci step"
  trend="up"
  trendValue="+34"
  caption="from step 9"
/>

<Stat
  value="0ms"
  label="Build time delta"
  trend="neutral"
  trendValue="no change"
/>`}</Code>
      <PropsTable>
        <PropRow name="value" type="string | number" defaultVal="—" desc="Primary metric — rendered at font-size-3xl." />
        <PropRow name="label" type="string" defaultVal="—" desc="Small label above the value." />
        <PropRow name="trend" type='"up" | "down" | "neutral"' defaultVal="—" desc="up=success · down=danger · neutral=fg-muted. Requires trendValue to render the badge." />
        <PropRow name="trendValue" type="string" defaultVal="—" desc="Change amount shown in the trend badge (e.g. '+34', '-2ms')." />
        <PropRow name="caption" type="string" defaultVal="—" desc="Muted caption rendered below the value row." />
      </PropsTable>
    </ComponentSection>
  );
}

function AlertDocs() {
  return (
    <ComponentSection id="alert" title="Alert" description="Contextual banner with left-border accent and semantic status. Renders with role=&quot;alert&quot; for screen reader compatibility.">
      <Demo label="All statuses">
        <Stack gap="3" style={{ width: "100%" }}>
          <Alert status="info" title="PHI is irrational">The golden ratio cannot be expressed as a simple fraction.</Alert>
          <Alert status="success" title="Build succeeded">All 106 tests passed. Zero regressions.</Alert>
          <Alert status="warning" title="High variance">Variance above 0.1 may affect visual consistency across themes.</Alert>
          <Alert status="danger" title="Token not found">--renge-color-unknown is undefined in this profile.</Alert>
        </Stack>
      </Demo>
      <Demo label="Without title">
        <Stack gap="3" style={{ width: "100%" }}>
          <Alert status="info">Informational message without a title.</Alert>
          <Alert status="warning">Variance is set to 0.08 — slight organic drift is active.</Alert>
        </Stack>
      </Demo>
      <Code>{`<Alert status="info" title="Note">
  Informational context.
</Alert>

<Alert status="success" title="Deployed">
  Production build complete.
</Alert>

<Alert status="danger" title="Error">
  Something went wrong.
</Alert>

{/* No title — body only */}
<Alert status="warning">
  Approaching rate limit.
</Alert>`}</Code>
      <PropsTable>
        <PropRow name="status" type='"info" | "success" | "warning" | "danger"' defaultVal='"info"' desc="Sets left-border color and background using semantic token pairs." />
        <PropRow name="title" type="string" defaultVal="—" desc="Bold heading inside the alert. Optional — body renders alone if omitted." />
      </PropsTable>
    </ComponentSection>
  );
}

function SpinnerDocs() {
  return (
    <ComponentSection id="spinner" title="Spinner" description="Animated loading indicator. The CSS keyframe (rengeSpinnerSpin) is injected once at module load — no runtime overhead per instance.">
      <Demo label="Sizes">
        <Stack direction="horizontal" gap="6" align="center">
          <Stack gap="2" align="center">
            <Spinner size="sm" />
            <Text size="sm" color="fg-subtle">sm · 16px</Text>
          </Stack>
          <Stack gap="2" align="center">
            <Spinner size="md" />
            <Text size="sm" color="fg-subtle">md · 24px</Text>
          </Stack>
          <Stack gap="2" align="center">
            <Spinner size="lg" />
            <Text size="sm" color="fg-subtle">lg · 32px</Text>
          </Stack>
        </Stack>
      </Demo>
      <Demo label="Colors">
        <Stack direction="horizontal" gap="6" align="center">
          <Stack gap="2" align="center">
            <Spinner color="accent" />
            <Text size="sm" color="fg-subtle">accent</Text>
          </Stack>
          <Stack gap="2" align="center">
            <Spinner color="fg" />
            <Text size="sm" color="fg-subtle">fg</Text>
          </Stack>
          <Stack gap="2" align="center">
            <Spinner color="fg-muted" />
            <Text size="sm" color="fg-subtle">fg-muted</Text>
          </Stack>
        </Stack>
      </Demo>
      <Code>{`<Spinner size="md" color="accent" label="Loading tokens" />
<Spinner size="sm" color="fg-subtle" />

{/* In a button */}
<Button variant="outline" disabled>
  <Stack direction="horizontal" gap="2" align="center">
    <Spinner size="sm" color="accent" />
    <span>Saving...</span>
  </Stack>
</Button>`}</Code>
      <PropsTable>
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="16 / 24 / 32 px diameter." />
        <PropRow name="color" type='"accent" | "fg" | "fg-muted"' defaultVal='"accent"' desc="Spinner ring color token." />
        <PropRow name="label" type="string" defaultVal='"Loading"' desc="aria-label for screen readers." />
      </PropsTable>
    </ComponentSection>
  );
}

function ProgressDocs() {
  return (
    <ComponentSection id="progress" title="Progress" description="Linear progress bar. Value is clamped 0–100. Track and fill colors reference semantic tokens.">
      <Demo label="PHI-derived values">
        <Stack gap="4" style={{ width: "100%", minWidth: 280 }}>
          <Stack gap="1">
            <Text size="sm" color="fg-subtle">61.8% — 1/φ</Text>
            <Progress value={61.8} label="PHI progress" />
          </Stack>
          <Stack gap="1">
            <Text size="sm" color="fg-subtle">38.2% — 1/φ²</Text>
            <Progress value={38.2} color="success" />
          </Stack>
          <Stack gap="1">
            <Text size="sm" color="fg-subtle">80% — warning</Text>
            <Progress value={80} color="warning" size="lg" />
          </Stack>
          <Stack gap="1">
            <Text size="sm" color="fg-subtle">20% — danger, no radius</Text>
            <Progress value={20} color="danger" size="sm" radius="none" />
          </Stack>
        </Stack>
      </Demo>
      <Code>{`<Progress value={61.8} color="accent" />
<Progress value={100} color="success" size="lg" />
<Progress value={30} color="danger" radius="none" />

{/* Controlled */}
<Progress
  value={uploadProgress}
  color="accent"
  size="md"
  label="Upload progress"
/>`}</Code>
      <PropsTable>
        <PropRow name="value" type="number" defaultVal="—" desc="0–100 fill percentage. Values outside range are clamped." />
        <PropRow name="color" type='"accent" | "success" | "warning" | "danger"' defaultVal='"accent"' desc="Fill color semantic token." />
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Track height: 4 / 8 / 12 px." />
        <PropRow name="radius" type='"none" | "full"' defaultVal='"full"' desc="Track border radius." />
        <PropRow name="label" type="string" defaultVal="—" desc="aria-label for accessibility." />
      </PropsTable>
    </ComponentSection>
  );
}

function NavbarDocs() {
  return (
    <ComponentSection id="navbar" title="Navbar" description="Navigation container. Composes with Stack to build any nav layout. Pass sticky to get fixed-top positioning.">
      <Demo label="Basic navigation">
        <div style={{ width: "100%", border: "1px solid var(--renge-color-border-subtle)", borderRadius: "var(--renge-radius-2)", overflow: "hidden" }}>
          <Navbar>
            <Stack direction="horizontal" gap="4" align="center" justify="between" style={{ width: "100%" }}>
              <Text weight="semibold">Renge</Text>
              <Stack direction="horizontal" gap="4" align="center">
                <Text size="sm" color="fg-subtle">Docs</Text>
                <Text size="sm" color="fg-subtle">GitHub</Text>
                <Badge variant="accent" size="sm">v0.1</Badge>
              </Stack>
            </Stack>
          </Navbar>
        </div>
      </Demo>
      <Demo label="With border off">
        <div style={{ width: "100%", border: "1px solid var(--renge-color-border-subtle)", borderRadius: "var(--renge-radius-2)", overflow: "hidden" }}>
          <Navbar border={false} style={{ background: "var(--renge-color-bg-inverse)" }}>
            <Stack direction="horizontal" gap="4" align="center" justify="between" style={{ width: "100%" }}>
              <Text weight="semibold" color="fg-subtle">Dark nav</Text>
              <Stack direction="horizontal" gap="4">
                <Text size="sm" color="fg-subtle">Link</Text>
              </Stack>
            </Stack>
          </Navbar>
        </div>
      </Demo>
      <Code>{`{/* Basic */}
<Navbar>
  <Stack direction="horizontal" justify="between" style={{ width: "100%" }}>
    <Text weight="semibold">Brand</Text>
    <Stack direction="horizontal" gap="4">
      <a href="/docs">Docs</a>
      <a href="/github">GitHub</a>
    </Stack>
  </Stack>
</Navbar>

{/* Sticky top */}
<Navbar sticky>
  <Stack direction="horizontal" justify="between" style={{ width: "100%" }}>
    <Text weight="semibold">Brand</Text>
    <ProfileToggle />
  </Stack>
</Navbar>`}</Code>
      <PropsTable>
        <PropRow name="sticky" type="boolean" defaultVal="false" desc="position: sticky, top: 0, z-index: 100." />
        <PropRow name="border" type="boolean" defaultVal="true" desc="Renders a 1px bottom border using border-subtle token." />
        <PropRow name="height" type="string" defaultVal='"56px"' desc="min-height of the bar." />
        <PropRow name="paddingX" type='"0" – "8"' defaultVal='"5"' desc="Horizontal padding." />
      </PropsTable>
    </ComponentSection>
  );
}

// ============================================================================
// System docs — tokens, animations, patterns
// ============================================================================

function TokensDocs() {
  return (
    <ComponentSection id="tokens" title="Token API" description="@renge-ui/tokens exports two ways to consume tokens: createRengeTheme() for generating CSS, and rengeVars for typed CSS variable references.">
      <Callout>
        Every component in this library references CSS custom properties — never hardcoded values. Switch profiles by swapping which theme block is injected. No component re-renders required.
      </Callout>

      {/* createRengeTheme */}
      <Stack gap="3">
        <Heading level={3} size="lg">createRengeTheme(config?)</Heading>
        <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
          Generates a complete token set from mathematical first principles. Returns CSS ready to inject and a JS vars map.
        </Text>
        <Code>{`import { createRengeTheme } from "@renge-ui/tokens";

const theme = createRengeTheme({
  profile:    "ocean",   // 'ocean' | 'earth' | 'twilight' | 'fire' | 'void' | 'leaf'
  mode:       "light",   // 'light' | 'dark'
  baseUnit:   4,         // Spacing multiplier in px — try 6 for denser UIs
  typeBase:   16,        // Root font size in px
  scaleRatio: 1.618,     // Typography scale ratio (φ = golden ratio)
  variance:   0,         // 0–1 tolerance drift (0 = exact math, deterministic)
  selector:   ":root",   // CSS selector to wrap the variables in
});

// theme.css   — full :root { --renge-* ... } string, ready to inject
// theme.vars  — Record<string, string> of every --renge-* variable
// theme.config — resolved config with all defaults applied`}</Code>
      </Stack>

      {/* rengeVars */}
      <Stack gap="3">
        <Heading level={3} size="lg">rengeVars</Heading>
        <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
          A statically typed object of CSS variable references. No runtime dependency — use it anywhere you need a <code>var(--renge-*)</code> string with IDE autocomplete.
        </Text>
        <Code>{`import { rengeVars } from "@renge-ui/tokens";

// Color (22 semantic tokens, profile-reactive)
rengeVars.color.bg            // "var(--renge-color-bg)"
rengeVars.color.bgSubtle      // "var(--renge-color-bg-subtle)"
rengeVars.color.fg            // "var(--renge-color-fg)"
rengeVars.color.accent        // "var(--renge-color-accent)"
rengeVars.color.danger        // "var(--renge-color-danger)"
rengeVars.color.borderFocus   // "var(--renge-color-border-focus)"

// Spacing (Fibonacci × baseUnit, steps 0–10)
rengeVars.space[0]   // "var(--renge-space-0)"  → 0px
rengeVars.space[3]   // "var(--renge-space-3)"  → 12px (Fib[3] × 4)
rengeVars.space[5]   // "var(--renge-space-5)"  → 32px

// Typography (PHI scale, 8 steps)
rengeVars.fontSize.base  // "var(--renge-font-size-base)"
rengeVars.fontSize.lg    // "var(--renge-font-size-lg)"
rengeVars.lineHeight.base // "var(--renge-line-height-base)"

// Motion (Fibonacci × 100ms, steps 0–9)
rengeVars.duration[2]    // "var(--renge-duration-2)"  → 200ms
rengeVars.duration[5]    // "var(--renge-duration-5)"  → 800ms
rengeVars.easing.out     // "var(--renge-easing-ease-out)"
rengeVars.easing.spring  // "var(--renge-easing-spring)"

// Radius (Fibonacci × baseUnit, steps none/1–5/full)
rengeVars.radius[2]      // "var(--renge-radius-2)"   → 8px
rengeVars.radius.full    // "var(--renge-radius-full)" → pill`}</Code>
      </Stack>

      {/* Integration pattern */}
      <Stack gap="3">
        <Heading level={3} size="lg">Integrating with another system</Heading>
        <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
          Use <code>rengeVars</code> to map Renge tokens to your own CSS variable names. This is the recommended pattern for adopting Renge alongside an existing design system.
        </Text>
        <Code>{`import { createRengeTheme, rengeVars } from "@renge-ui/tokens";

const theme = createRengeTheme({ profile: "earth", mode: "light" });

// Map semantic Renge tokens → your system's variable names
const aliases: [string, string][] = [
  // Backgrounds
  ["--color-bg-primary",   rengeVars.color.bg],
  ["--color-bg-secondary", rengeVars.color.bgSubtle],
  ["--color-surface",      rengeVars.color.bgMuted],
  // Foreground
  ["--color-text",         rengeVars.color.fg],
  ["--color-text-muted",   rengeVars.color.fgSubtle],
  // Interactive
  ["--color-primary",      rengeVars.color.accent],
  ["--color-primary-hover",rengeVars.color.accentHover],
  // Status
  ["--color-error",        rengeVars.color.danger],
  ["--color-success",      rengeVars.color.success],
  ["--color-warning",      rengeVars.color.warning],
  // Spacing bridge
  ["--space-sm",           rengeVars.space[2]],
  ["--space-md",           rengeVars.space[4]],
  ["--space-lg",           rengeVars.space[5]],
];

const aliasCSS = \`:root {\n\${aliases.map(([k, v]) => \`  \${k}: \${v};\`).join("\\n")}\n}\`;

// Inject Renge base vars first, then your aliases on top
document.head.insertAdjacentHTML("beforeend",
  \`<style>\${theme.css}\\n\${aliasCSS}</style>\`
);`}</Code>
      </Stack>

      {/* Semantic color table */}
      <Stack gap="3">
        <Heading level={3} size="lg">All 22 semantic color tokens</Heading>
        <div style={{ overflowX: "auto", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--renge-color-bg-subtle)" }}>
                {["rengeVars key", "CSS variable", "Role"].map(h => (
                  <th key={h} style={{ padding: "var(--renge-space-2) var(--renge-space-4)", textAlign: "left", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["color.bg",            "--renge-color-bg",             "Page background"],
                ["color.bgSubtle",      "--renge-color-bg-subtle",      "Slightly elevated surface"],
                ["color.bgMuted",       "--renge-color-bg-muted",       "Muted surface"],
                ["color.bgInverse",     "--renge-color-bg-inverse",     "Inverted background"],
                ["color.fg",            "--renge-color-fg",             "Primary text"],
                ["color.fgSubtle",      "--renge-color-fg-subtle",      "Secondary text"],
                ["color.fgMuted",       "--renge-color-fg-muted",       "Placeholder / disabled"],
                ["color.fgInverse",     "--renge-color-fg-inverse",     "Text on inverse bg"],
                ["color.border",        "--renge-color-border",         "Default divider"],
                ["color.borderSubtle",  "--renge-color-border-subtle",  "Hairline divider"],
                ["color.borderFocus",   "--renge-color-border-focus",   "Keyboard focus ring"],
                ["color.accent",        "--renge-color-accent",         "Primary interactive"],
                ["color.accentHover",   "--renge-color-accent-hover",   "Hover state"],
                ["color.accentSubtle",  "--renge-color-accent-subtle",  "Tinted background"],
                ["color.success",       "--renge-color-success",        "Positive outcome"],
                ["color.successSubtle", "--renge-color-success-subtle", "Success tint bg"],
                ["color.warning",       "--renge-color-warning",        "Caution"],
                ["color.warningSubtle", "--renge-color-warning-subtle", "Warning tint bg"],
                ["color.danger",        "--renge-color-danger",         "Error / destructive"],
                ["color.dangerSubtle",  "--renge-color-danger-subtle",  "Danger tint bg"],
                ["color.info",          "--renge-color-info",           "Informational"],
                ["color.infoSubtle",    "--renge-color-info-subtle",    "Info tint bg"],
              ].map(([key, cssVar, role]) => (
                <tr key={key}>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{key}</td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{cssVar}</td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Stack>
    </ComponentSection>
  );
}

function AnimationsDocs() {
  return (
    <ComponentSection id="animations" title="Animations" description="15 named animations derived from the token system. Apply via the animation prop on any component that accepts it.">
      <Demo label="Available tokens">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "var(--renge-space-3)", width: "100%" }}>
          {[
            "vortex-reveal", "helix-rise", "sacred-fade", "spiral-in",
            "morph-fade-in", "bloom", "pulse", "vibrate",
            "wave", "breathe", "fall", "float",
            "float-wave", "pulse-color-shift", "swelling",
          ].map(name => (
            <div key={name} style={{ padding: "var(--renge-space-2) var(--renge-space-3)", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)", background: "var(--renge-color-bg)" }}>
              <Text size="sm" style={{ fontFamily: "var(--font-mono, monospace)" }}>{name}</Text>
            </div>
          ))}
        </div>
      </Demo>
      <Demo label="Live examples">
        <Heading level={3} animation="breathe">breathe</Heading>
        <Text size="lg" animation="float">float</Text>
        <span style={{ animation: "var(--renge-animation-pulse)" }}><Badge variant="accent">pulse</Badge></span>
        <Card variant="outlined" padding="3" animation="bloom">
          <Text size="sm">bloom</Text>
        </Card>
      </Demo>
      <Code>{`{/* On any component that accepts animation prop */}
<Heading level={2} animation="breathe">
  Living proportion.
</Heading>

<Badge variant="accent" animation="pulse">
  New
</Badge>

<Card animation="bloom">
  <Text>Enters with bloom effect</Text>
</Card>

{/* Via CSS variable directly */}
<div style={{ animation: "var(--renge-animation-float)" }}>
  Floats gently.
</div>`}</Code>
      <Callout>
        Animation CSS variables are injected into the document by <code>createRengeTheme()</code>. All 15 <code>@keyframes</code> blocks are included in the theme output — no separate import needed. Durations reference Fibonacci-derived <code>--renge-duration-*</code> tokens.
      </Callout>
    </ComponentSection>
  );
}

function EnergyRingDocs() {
  return (
    <ComponentSection id="energyring" title="EnergyRing" description="Circular SVG ring showing an energy or progress level. Stroke width and label scale by PHI with the ring size — self-similar at every size.">
      <Demo label="Sizes">
        <Stack direction="horizontal" gap="5" align="center">
          <EnergyRing value={72} size="sm" />
          <EnergyRing value={72} size="md" />
          <EnergyRing value={72} size="lg" />
          <EnergyRing value={72} size="xl" />
        </Stack>
      </Demo>
      <Demo label="Colors">
        <Stack direction="horizontal" gap="5" align="center">
          <EnergyRing value={65} size="lg" color="accent" />
          <EnergyRing value={80} size="lg" color="success" />
          <EnergyRing value={45} size="lg" color="warning" />
          <EnergyRing value={30} size="lg" color="danger" />
        </Stack>
      </Demo>
      <Demo label="Pulse rates">
        <Stack direction="horizontal" gap="5" align="center">
          <Stack gap="2" align="center">
            <EnergyRing value={50} size="lg" pulse rate="rest" />
            <Text size="sm" color="fg-subtle">rest</Text>
          </Stack>
          <Stack gap="2" align="center">
            <EnergyRing value={50} size="lg" pulse rate="active" />
            <Text size="sm" color="fg-subtle">active</Text>
          </Stack>
          <Stack gap="2" align="center">
            <EnergyRing value={50} size="lg" pulse rate="fire" />
            <Text size="sm" color="fg-subtle">fire</Text>
          </Stack>
        </Stack>
      </Demo>
      <Code>{`<EnergyRing value={72} />
<EnergyRing value={72} size="xl" color="success" />
<EnergyRing value={50} size="lg" pulse rate="active" />
<EnergyRing value={88} size="xl" label="88%" color="warning" />`}</Code>
      <PropsTable>
        <PropRow name="value" type="number" desc="Energy level 0–100." />
        <PropRow name="size" type='"sm" | "md" | "lg" | "xl"' defaultVal='"md"' desc="Ring diameter — sm:32px → xl:136px, each step ≈ φ growth." />
        <PropRow name="color" type='"accent" | "success" | "warning" | "danger"' defaultVal='"accent"' desc="Color channel — maps to semantic token." />
        <PropRow name="pulse" type="boolean" defaultVal="false" desc="Enable breathing animation." />
        <PropRow name="rate" type='"rest" | "active" | "fire"' defaultVal='"active"' desc="Pulse speed — rest=2100ms, active=800ms, fire=500ms." />
        <PropRow name="label" type="string | null" defaultVal='"{value}%"' desc="Center label (shown at lg/xl only). Pass null to hide." />
      </PropsTable>
    </ComponentSection>
  );
}

function PulseDocs() {
  return (
    <ComponentSection id="pulse" title="Pulse" description="A breathing dot — the minimal alive indicator. Scales to φ at peak. Rate maps to energy states with Fibonacci-derived durations.">
      <Demo label="Sizes">
        <Stack direction="horizontal" gap="5" align="center">
          <Pulse size="sm" />
          <Pulse size="md" />
          <Pulse size="lg" />
        </Stack>
      </Demo>
      <Demo label="Colors + rates">
        <Stack direction="horizontal" gap="5" align="center">
          <Stack gap="2" align="center">
            <Pulse color="accent" rate="rest" size="lg" />
            <Text size="sm" color="fg-subtle">rest</Text>
          </Stack>
          <Stack gap="2" align="center">
            <Pulse color="success" rate="active" size="lg" />
            <Text size="sm" color="fg-subtle">active</Text>
          </Stack>
          <Stack gap="2" align="center">
            <Pulse color="danger" rate="fire" size="lg" />
            <Text size="sm" color="fg-subtle">fire</Text>
          </Stack>
        </Stack>
      </Demo>
      <Demo label="With ripple">
        <Stack direction="horizontal" gap="5" align="center">
          <Pulse color="accent" size="lg" ripple />
          <Pulse color="success" size="lg" ripple rate="fire" />
        </Stack>
      </Demo>
      <Demo label="Inline status indicator">
        <Stack direction="horizontal" gap="2" align="center">
          <Pulse color="success" size="sm" />
          <Text size="sm">System online</Text>
        </Stack>
      </Demo>
      <Code>{`<Pulse />
<Pulse size="lg" color="success" rate="fire" />
<Pulse size="lg" color="accent" ripple />

{/* Status indicator */}
<Stack direction="horizontal" gap="2" align="center">
  <Pulse color="success" size="sm" />
  <Text size="sm">System online</Text>
</Stack>`}</Code>
      <PropsTable>
        <PropRow name="rate" type='"rest" | "active" | "fire"' defaultVal='"active"' desc="Breath speed — rest=2100ms (~29bpm), active=800ms, fire=500ms." />
        <PropRow name="color" type='"accent" | "success" | "warning" | "danger" | "fg-muted"' defaultVal='"accent"' desc="Dot color channel." />
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Dot diameter — 6px / 10px / 16px (fractal scale)." />
        <PropRow name="ripple" type="boolean" defaultVal="false" desc="Show expanding ripple ring behind the dot." />
      </PropsTable>
    </ComponentSection>
  );
}

function FlowFieldDocs() {
  return (
    <ComponentSection id="flowfield" title="FlowField" description="A living phyllotaxis dot field. Each dot is placed at a golden-angle position and pulses with a delay derived from its spiral index — energy flows outward along the golden spiral.">
      <Demo label="Energy levels">
        <Stack direction="horizontal" gap="5" align="center" style={{ flexWrap: "wrap" }}>
          {(["void", "rest", "active", "fire"] as const).map(energy => (
            <Stack key={energy} gap="2" align="center">
              <FlowField energy={energy} size={120} count={89} />
              <Text size="sm" color="fg-subtle">{energy}</Text>
            </Stack>
          ))}
        </Stack>
      </Demo>
      <Demo label="Colors">
        <Stack direction="horizontal" gap="5" align="center">
          <FlowField energy="active" color="accent" size={120} count={89} />
          <FlowField energy="active" color="fg-subtle" size={120} count={89} />
          <FlowField energy="active" color="fg-subtle" size={120} count={89} />
        </Stack>
      </Demo>
      <Code>{`<FlowField />
<FlowField energy="fire" size={300} count={144} />
<FlowField energy="rest" color="fg-subtle" size={200} />

{/* As a decorative background element */}
<div style={{ position: "relative" }}>
  <FlowField energy="void" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
  <YourContent />
</div>`}</Code>
      <PropsTable>
        <PropRow name="energy" type='"void" | "rest" | "active" | "fire"' defaultVal='"active"' desc="Controls density, opacity, and pulse rate. void=sparse/slow, fire=dense/fast." />
        <PropRow name="count" type="number" defaultVal="144" desc="Maximum dot count at full energy. Actual count scales with energy density." />
        <PropRow name="size" type="number" defaultVal="400" desc="Container width and height in px." />
        <PropRow name="color" type='"accent" | "fg-muted" | "fg-subtle"' defaultVal='"accent"' desc="Dot color channel." />
      </PropsTable>
    </ComponentSection>
  );
}

function PatternsDocs() {
  return (
    <ComponentSection id="patterns" title="Patterns" description="Common composition patterns using @renge-ui/react components.">
      <Demo label="Status card">
        <Card variant="outlined" padding="5" style={{ minWidth: 240 }}>
          <Stack gap="4">
            <Stack direction="horizontal" justify="between" align="center">
              <Heading level={3} size="lg">Build status</Heading>
              <Badge variant="success">Passing</Badge>
            </Stack>
            <Stack gap="2">
              <Stack direction="horizontal" justify="between">
                <Text size="sm" color="fg-subtle">Tests</Text>
                <Text size="sm" weight="medium">106 / 106</Text>
              </Stack>
              <Progress value={100} color="success" size="sm" />
            </Stack>
            <Divider spacing="0" />
            <Text size="sm" color="fg-subtle">Last run 2 minutes ago</Text>
          </Stack>
        </Card>
      </Demo>
      <Demo label="Form with validation">
        <Stack gap="5" style={{ minWidth: 280, width: "100%", maxWidth: 360 }}>
          <FormField label="Email" htmlFor="pat-email" helperText="Used for login and notifications.">
            <Input id="pat-email" type="email" placeholder="you@example.com" fullWidth />
          </FormField>
          <FormField label="Password" htmlFor="pat-pass" required errorText="Must be at least 12 characters.">
            <Input id="pat-pass" type="password" state="error" placeholder="••••••••••••" fullWidth />
          </FormField>
          <Stack direction="horizontal" gap="3" justify="end">
            <Button variant="ghost" colorScheme="accent">Cancel</Button>
            <Button variant="solid" colorScheme="accent">Save changes</Button>
          </Stack>
        </Stack>
      </Demo>
      <Demo label="Metric grid">
        <Grid columns={3} gap="3" style={{ width: "100%" }}>
          <Card variant="filled" padding="3">
            <Stat value="φ" label="Scale ratio" />
          </Card>
          <Card variant="filled" padding="3">
            <Stat value="89" label="Fibonacci 10" trend="up" trendValue="+34" />
          </Card>
          <Card variant="filled" padding="3">
            <Stat value="106" label="Tests" trend="up" trendValue="+1" />
          </Card>
        </Grid>
      </Demo>
      <Code>{`{/* Every component uses only CSS custom properties */}
{/* Switch profiles and all colors update instantly */}
import { createRengeTheme } from "@renge-ui/tokens";

const theme = createRengeTheme({ profile: "twilight" });
// Inject theme.css and all components adapt — no re-render.`}</Code>
      <Callout>
        All 21 components use only <code>var(--renge-*)</code> CSS custom properties. Switch color profiles by injecting a new theme block — no component re-renders required.
      </Callout>
    </ComponentSection>
  );
}

// ============================================================================
// Page
// ============================================================================

export default function DocsPage() {
  const [activeSection] = useState("stack");
  const isMobile = useBreakpoint();

  return (
    <ProfileProvider>
      <Nav />

      {/* Layout */}
      <div style={{ maxWidth: 1260, margin: "0 auto", paddingLeft: isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)", paddingRight: isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)", paddingTop: "calc(52px + var(--renge-space-7))", paddingBottom: "var(--renge-space-8)", display: "flex", gap: "var(--renge-space-8)", alignItems: "flex-start" }}>

        {/* Sidebar — hidden on mobile */}
        {!isMobile && <Sidebar active={activeSection} />}

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--renge-space-8)" }}>

          {/* Page header */}
          <div style={{ paddingBottom: "var(--renge-space-6)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>
            <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0, marginBottom: "var(--renge-space-3)" }}>@renge-ui/react</p>
            <Heading level={1} size="3xl" style={{ marginBottom: "var(--renge-space-4)", fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.02em" }}>Components</Heading>
            <Text as="p" size="lg" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-5)", maxWidth: 560 }}>
              21 components built on the token system. Proportional. Accessible. Composable. No class names — every style references a Renge CSS variable.
            </Text>
            <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
              <Code>{"pnpm add @renge-ui/tokens @renge-ui/react"}</Code>
            </Stack>
            <Stack direction="horizontal" gap="3" style={{ marginTop: "var(--renge-space-4)", flexWrap: "wrap" }}>
              <Badge variant="neutral">forwardRef</Badge>
              <Badge variant="neutral">inline styles</Badge>
              <Badge variant="neutral">CSS custom properties</Badge>
              <Badge variant="neutral">no class names</Badge>
              <Badge variant="neutral">profile-reactive</Badge>
            </Stack>
          </div>

          {/* Layout */}
          <StackDocs />
          <GridDocs />
          <SectionDocs />

          {/* Typography */}
          <HeadingDocs />
          <TextDocs />
          <DividerDocs />

          {/* Inputs */}
          <ButtonDocs />
          <InputDocs />
          <FormFieldDocs />

          {/* Display */}
          <CardDocs />
          <BadgeDocs />
          <ChipDocs />
          <AvatarDocs />
          <StatDocs />

          {/* Feedback */}
          <AlertDocs />
          <SpinnerDocs />
          <ProgressDocs />

          {/* Navigation */}
          <NavbarDocs />

          {/* Data viz */}
          <EnergyRingDocs />
          <PulseDocs />
          <FlowFieldDocs />

          {/* System */}
          <TokensDocs />
          <AnimationsDocs />
          <PatternsDocs />
        </main>
      </div>
    </ProfileProvider>
  );
}
