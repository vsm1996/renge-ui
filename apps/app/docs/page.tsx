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
  // Data Input
  Select, Checkbox, Radio, RadioGroup, Switch, Textarea, Slider,
  // Data Display
  Table, TableHead, TableBody, TableRow, TableHeader, TableCell,
  Tooltip, Accordion, AccordionItem, Timeline, TimelineItem, Skeleton,
  // Navigation
  Tabs, TabList, Tab, TabPanel, Breadcrumb, BreadcrumbItem, Pagination, Anchor,
  // Feedback
  ToastProvider, useToast, Modal, ModalHeader, ModalBody, ModalFooter,
  // Layout
  Container, AspectRatio, Spacer,
  // Action
  IconButton, ButtonGroup, CopyButton,
} from "@renge-ui/react";
import { PHI } from "@renge-ui/tokens";
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
      <div style={{ padding: "var(--renge-space-4)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)", display: "flex", flexWrap: "wrap", gap: "var(--renge-space-4)", alignItems: "flex-start", overflowX: "auto", minWidth: 0 }}>
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
        <Stack gap="3" style={{ width: "100%" }}>
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
        <Stack gap="5" style={{ width: "100%" }}>
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
        <Stack direction="horizontal" gap="6" align="center" style={{ flexWrap: "wrap" }}>
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
        <Stack direction="horizontal" gap="6" align="center" style={{ flexWrap: "wrap" }}>
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
        <Stack gap="4" style={{ width: "100%" }}>
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
        <Stack direction="horizontal" gap="5" align="center" style={{ flexWrap: "wrap" }}>
          <EnergyRing value={72} size="sm" />
          <EnergyRing value={72} size="md" />
          <EnergyRing value={72} size="lg" />
          <EnergyRing value={72} size="xl" />
        </Stack>
      </Demo>
      <Demo label="Colors">
        <Stack direction="horizontal" gap="5" align="center" style={{ flexWrap: "wrap" }}>
          <EnergyRing value={65} size="lg" color="accent" />
          <EnergyRing value={80} size="lg" color="success" />
          <EnergyRing value={45} size="lg" color="warning" />
          <EnergyRing value={30} size="lg" color="danger" />
        </Stack>
      </Demo>
      <Demo label="Pulse rates">
        <Stack direction="horizontal" gap="5" align="center" style={{ flexWrap: "wrap" }}>
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

// ============================================================================
// New component docs — Data Input
// ============================================================================

function SelectDocs() {
  return (
    <ComponentSection id="select" title="Select" description="Styled native select element. Chevron rendered as a background SVG — no extra DOM nodes. Sizing and state tokens match Input exactly.">
      <Demo label="Sizes">
        <Stack direction="horizontal" gap="3" align="center" style={{ flexWrap: "wrap" }}>
          <Select size="sm" defaultValue="sm"><option value="sm">Small</option></Select>
          <Select size="md" defaultValue="md"><option value="md">Medium</option></Select>
          <Select size="lg" defaultValue="lg"><option value="lg">Large</option></Select>
        </Stack>
      </Demo>
      <Demo label="States + placeholder">
        <Stack gap="3" style={{ width: "100%" }}>
          <Select placeholder="Select a profile…" fullWidth>
            <option value="ocean">Ocean</option>
            <option value="earth">Earth</option>
            <option value="twilight">Twilight</option>
          </Select>
          <Select state="error" defaultValue="bad" fullWidth>
            <option value="bad">Invalid selection</option>
          </Select>
          <Select state="success" defaultValue="ok" fullWidth>
            <option value="ok">Valid selection</option>
          </Select>
        </Stack>
      </Demo>
      <Code>{`<Select placeholder="Choose a profile…" fullWidth>
  <option value="ocean">Ocean</option>
  <option value="earth">Earth</option>
</Select>

<Select state="error" fullWidth>
  <option>Invalid</option>
</Select>

{/* Controlled */}
<Select value={profile} onChange={(e) => setProfile(e.target.value)}>
  <option value="ocean">Ocean</option>
  <option value="twilight">Twilight</option>
</Select>`}</Code>
      <PropsTable>
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Controls padding and font size — mirrors Input sizing." />
        <PropRow name="state" type='"default" | "error" | "success"' defaultVal='"default"' desc="Border color mapped to semantic state token." />
        <PropRow name="fullWidth" type="boolean" defaultVal="false" desc="Stretches to 100% container width." />
        <PropRow name="placeholder" type="string" defaultVal="—" desc="Renders a hidden disabled option as the default selection prompt." />
      </PropsTable>
    </ComponentSection>
  );
}

function CheckboxDocs() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  return (
    <ComponentSection id="checkbox" title="Checkbox" description="Custom-styled checkbox. The box and check geometry derive from Fibonacci spacing. The checkmark animates in with spring easing via a stroke-dashoffset draw.">
      <Demo label="States">
        <Stack gap="3">
          <Checkbox label="Unchecked (default)" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled checked" disabled defaultChecked />
        </Stack>
      </Demo>
      <Demo label="Sizes">
        <Stack gap="3">
          <Checkbox size="sm" label="Small — 16px box" defaultChecked />
          <Checkbox size="md" label="Medium — 20px box (default)" defaultChecked />
          <Checkbox size="lg" label="Large — 24px box" defaultChecked />
        </Stack>
      </Demo>
      <Demo label="Controlled">
        <Stack gap="3">
          <Checkbox
            label={`Controlled: ${checked ? "checked" : "unchecked"}`}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <Button size="sm" variant="outline" onClick={() => setChecked(v => !v)}>
            Toggle
          </Button>
        </Stack>
      </Demo>
      <Code>{`<Checkbox label="Accept terms" />
<Checkbox label="Remember me" defaultChecked />
<Checkbox label="Partially selected" indeterminate />

{/* Controlled */}
<Checkbox
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  label="I agree to the terms"
/>`}</Code>
      <PropsTable>
        <PropRow name="label" type="string" defaultVal="—" desc="Label rendered beside the checkbox." />
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Box size — 16 / 20 / 24 px (Fibonacci-aligned)." />
        <PropRow name="indeterminate" type="boolean" defaultVal="false" desc="Shows a dash instead of a checkmark — used for select-all states." />
        <PropRow name="disabled" type="boolean" defaultVal="false" desc="Reduces opacity and sets cursor:not-allowed." />
        <PropRow name="checked" type="boolean" defaultVal="—" desc="Controlled checked state." />
        <PropRow name="defaultChecked" type="boolean" defaultVal="false" desc="Uncontrolled initial value." />
      </PropsTable>
    </ComponentSection>
  );
}

function RadioDocs() {
  const [size, setSize] = useState("md");
  const [alignment, setAlignment] = useState("left");
  return (
    <ComponentSection id="radio" title="Radio + RadioGroup" description="Radio button group. The inner dot is sized at outer / φ — the golden proportion is visible in every interaction. RadioGroup manages shared name and value state.">
      <Demo label="Basic group">
        <RadioGroup name="profile-demo" defaultValue="ocean" gap="2">
          <Radio value="ocean" label="Ocean" />
          <Radio value="earth" label="Earth" />
          <Radio value="twilight" label="Twilight" />
        </RadioGroup>
      </Demo>
      <Demo label="Horizontal + sizes">
        <Stack gap="4">
          <RadioGroup name="size-demo" value={size} onChange={setSize} direction="horizontal" gap="4">
            <Radio value="sm" label="Small" size="sm" />
            <Radio value="md" label="Medium" size="md" />
            <Radio value="lg" label="Large" size="lg" />
          </RadioGroup>
          <Text size="sm" color="fg-subtle">Selected: {size}</Text>
        </Stack>
      </Demo>
      <Demo label="Disabled">
        <RadioGroup name="disabled-demo" defaultValue="a" disabled>
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
        </RadioGroup>
      </Demo>
      <Code>{`<RadioGroup
  name="theme"
  defaultValue="ocean"
  onChange={(value) => setTheme(value)}
>
  <Radio value="ocean" label="Ocean" />
  <Radio value="earth" label="Earth" />
  <Radio value="twilight" label="Twilight" />
</RadioGroup>

{/* Horizontal */}
<RadioGroup name="size" direction="horizontal" gap="4">
  <Radio value="sm" label="Small" />
  <Radio value="lg" label="Large" />
</RadioGroup>`}</Code>
      <PropsTable>
        <PropRow name="name" type="string" desc="(RadioGroup) Shared input name — required for accessibility." />
        <PropRow name="value" type="string" defaultVal="—" desc="(RadioGroup) Controlled selected value." />
        <PropRow name="defaultValue" type="string" defaultVal='""' desc="(RadioGroup) Uncontrolled initial value." />
        <PropRow name="onChange" type="(value: string) => void" defaultVal="—" desc="(RadioGroup) Called with the new value when selection changes." />
        <PropRow name="direction" type='"vertical" | "horizontal"' defaultVal='"vertical"' desc="(RadioGroup) Stack direction." />
        <PropRow name="disabled" type="boolean" defaultVal="false" desc="(RadioGroup) Disables all child radios." />
        <PropRow name="value" type="string" desc="(Radio) The value this radio represents." />
        <PropRow name="label" type="string" defaultVal="—" desc="(Radio) Label text." />
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal="inherited" desc="(Radio) Individual size override." />
      </PropsTable>
    </ComponentSection>
  );
}

function SwitchDocs() {
  const [on, setOn] = useState(false);
  return (
    <ComponentSection id="switch" title="Switch" description="Toggle switch. Track width:height ≈ φ:1 — the golden proportion. Thumb slides with spring easing. Works as a styled checkbox under the hood for full accessibility.">
      <Demo label="Sizes">
        <Stack gap="4">
          <Switch size="sm" label="Small — track 32×20px" />
          <Switch size="md" label="Medium — track 40×24px (default)" defaultChecked />
          <Switch size="lg" label="Large — track 48×28px" />
        </Stack>
      </Demo>
      <Demo label="Label positions + controlled">
        <Stack gap="4">
          <Switch label="Label on right (default)" />
          <Switch label="Label on left" labelPosition="left" />
          <Switch
            label={`Controlled: ${on ? "on" : "off"}`}
            checked={on}
            onChange={(e) => setOn(e.target.checked)}
          />
        </Stack>
      </Demo>
      <Code>{`<Switch label="Dark mode" />
<Switch label="Notifications" defaultChecked />

{/* Controlled */}
<Switch
  label="Feature flag"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>

{/* Label on left */}
<Switch label="Auto-save" labelPosition="left" />`}</Code>
      <PropsTable>
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="sm: 32×20px · md: 40×24px · lg: 48×28px. Track width≈φ×height." />
        <PropRow name="label" type="string" defaultVal="—" desc="Visible label text." />
        <PropRow name="labelPosition" type='"left" | "right"' defaultVal='"right"' desc="Label placement relative to the switch track." />
        <PropRow name="checked" type="boolean" defaultVal="—" desc="Controlled checked state." />
        <PropRow name="defaultChecked" type="boolean" defaultVal="false" desc="Uncontrolled initial state." />
        <PropRow name="disabled" type="boolean" defaultVal="false" desc="Dims and disables interaction." />
      </PropsTable>
    </ComponentSection>
  );
}

function TextareaDocs() {
  return (
    <ComponentSection id="textarea" title="Textarea" description="Multi-line text input. Min-height steps follow Fibonacci line counts — 3, 5, and 8 lines at sm/md/lg respectively.">
      <Demo label="Sizes">
        <Stack gap="3" style={{ width: "100%" }}>
          <Textarea size="sm" placeholder="Small — 3 lines min" fullWidth />
          <Textarea size="md" placeholder="Medium — 5 lines min (default)" fullWidth />
          <Textarea size="lg" placeholder="Large — 8 lines min" fullWidth />
        </Stack>
      </Demo>
      <Demo label="States + resize">
        <Stack gap="3" style={{ width: "100%" }}>
          <Textarea placeholder="Default" fullWidth />
          <Textarea state="error" placeholder="Error state" fullWidth />
          <Textarea state="success" placeholder="Success state" fullWidth />
          <Textarea resize="none" placeholder="resize: none" fullWidth />
        </Stack>
      </Demo>
      <Code>{`<Textarea placeholder="Describe your system…" fullWidth />

<Textarea
  size="lg"
  state="error"
  placeholder="Too long — 500 characters max"
  fullWidth
/>

{/* Controlled */}
<Textarea
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  resize="none"
  fullWidth
/>`}</Code>
      <PropsTable>
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Affects padding, font size, and minimum height (Fibonacci line counts: 3/5/8)." />
        <PropRow name="state" type='"default" | "error" | "success"' defaultVal='"default"' desc="Border color state — mirrors Input." />
        <PropRow name="fullWidth" type="boolean" defaultVal="false" desc="Stretches to 100% container width." />
        <PropRow name="resize" type='"none" | "vertical" | "horizontal" | "both"' defaultVal='"vertical"' desc="CSS resize property." />
      </PropsTable>
    </ComponentSection>
  );
}

function SliderDocs() {
  const [val, setVal] = useState(61.8);
  return (
    <ComponentSection id="slider" title="Slider" description="Range slider with optional φ markers. The golden section points (0.382 and 0.618 of the range) are marked as optional visual guides — the phi ratio embedded in every use.">
      <Demo label="Default + controlled">
        <Stack gap="4" style={{ width: "100%" }}>
          <Slider label="Scale ratio" showValue defaultValue={50} />
          <Slider
            label={`PHI-controlled: ${val.toFixed(1)}`}
            showValue
            value={val}
            min={0}
            max={100}
            step={0.1}
            onChange={(e) => setVal(parseFloat(e.target.value))}
          />
        </Stack>
      </Demo>
      <Demo label="φ markers at 0.382 and 0.618">
        <Slider
          label="Golden section markers"
          showValue
          defaultValue={61.8}
          showPhiMarkers
          style={{ width: "100%" }}
        />
      </Demo>
      <Code>{`<Slider label="Variance" showValue defaultValue={0} />

{/* PHI markers — shows golden section at 0.382 and 0.618 */}
<Slider
  label="Scale ratio"
  showPhiMarkers
  showValue
  min={1}
  max={2}
  step={0.001}
  defaultValue={1.618}
/>

{/* Controlled */}
<Slider
  value={scale}
  onChange={(e) => setScale(parseFloat(e.target.value))}
/>`}</Code>
      <PropsTable>
        <PropRow name="showPhiMarkers" type="boolean" defaultVal="false" desc="Renders tick marks at 0.382 and 0.618 of the range — the golden section points." />
        <PropRow name="label" type="string" defaultVal="—" desc="Label text shown above the track." />
        <PropRow name="showValue" type="boolean" defaultVal="false" desc="Displays current value to the right of the label." />
        <PropRow name="min / max / step" type="number" defaultVal="0 / 100 / 1" desc="Native range input attributes." />
      </PropsTable>
    </ComponentSection>
  );
}

// ============================================================================
// New component docs — Data Display
// ============================================================================

function TableDocs() {
  const plants = [
    { name: "Coast Live Oak", ratio: "1.618", fib: "89", habitat: "Woodland" },
    { name: "Blue Wild Rye", ratio: "1.382", fib: "55", habitat: "Riparian" },
    { name: "California Poppy", ratio: "1.236", fib: "34", habitat: "Grassland" },
    { name: "Sword Fern", ratio: "1.618", fib: "89", habitat: "Forest" },
    { name: "Toyon", ratio: "1.382", fib: "55", habitat: "Chaparral" },
  ];
  return (
    <ComponentSection id="table" title="Table" description="Data table primitives: Table, TableHead, TableBody, TableFoot, TableRow, TableHeader, TableCell. Row padding follows Fibonacci spacing. Header uses semantic uppercase styling.">
      <Demo label="Full table">
        <Table bordered style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableHeader>Plant</TableHeader>
              <TableHeader>φ Ratio</TableHeader>
              <TableHeader>Fibonacci</TableHeader>
              <TableHeader>Habitat</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {plants.map((p, i) => (
              <TableRow key={p.name} index={i}>
                <TableCell>{p.name}</TableCell>
                <TableCell><Badge variant="accent" size="sm">{p.ratio}</Badge></TableCell>
                <TableCell muted>{p.fib}</TableCell>
                <TableCell muted>{p.habitat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Demo>
      <Code>{`<Table bordered>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Value</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map((row, i) => (
      <TableRow key={row.id} index={i}>
        <TableCell>{row.name}</TableCell>
        <TableCell muted>{row.value}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}</Code>
      <PropsTable>
        <PropRow name="bordered" type="boolean" defaultVal="false" desc="(Table) Outer border on the container." />
        <PropRow name="striped" type="boolean" defaultVal="false" desc="(Table) Zebra-stripe via data-striped attribute." />
        <PropRow name="index" type="number" defaultVal="—" desc="(TableRow) 0-indexed position — even rows get bg-subtle." />
        <PropRow name="muted" type="boolean" defaultVal="false" desc="(TableCell) Renders in fg-muted for secondary data." />
      </PropsTable>
    </ComponentSection>
  );
}

function TooltipDocs() {
  return (
    <ComponentSection id="tooltip" title="Tooltip" description="Hover tooltip with spring entry animation. Offset uses space-1 (4px = Fibonacci×1) so the gap is always proportioned. Four placements available.">
      <Demo label="Placements">
        <Stack direction="horizontal" gap="5" align="center" style={{ flexWrap: "wrap", padding: "var(--renge-space-5) 0" }}>
          {(["top", "bottom", "left", "right"] as const).map(p => (
            <Tooltip key={p} content={`${p} tooltip`} placement={p}>
              <Badge variant="accent">{p}</Badge>
            </Tooltip>
          ))}
        </Stack>
      </Demo>
      <Demo label="Rich content">
        <Tooltip content={<Stack gap="1"><Text size="sm" style={{ color: "var(--renge-color-fg-inverse)" }}>PHI = 1.618…</Text><Text size="sm" style={{ color: "var(--renge-color-fg-inverse)", opacity: 0.7 }}>The golden ratio</Text></Stack>} placement="top">
          <Button size="sm" variant="outline">Hover me</Button>
        </Tooltip>
      </Demo>
      <Code>{`<Tooltip content="This is a tooltip" placement="top">
  <Button>Hover me</Button>
</Tooltip>

{/* Rich content */}
<Tooltip
  content={
    <Stack gap="1">
      <Text>PHI = 1.618…</Text>
      <Text size="sm" color="fg-subtle">The golden ratio</Text>
    </Stack>
  }
  placement="right"
>
  <Badge>φ</Badge>
</Tooltip>

{/* With delay */}
<Tooltip content="Appears after 500ms" delay={500}>
  <span>Hover</span>
</Tooltip>`}</Code>
      <PropsTable>
        <PropRow name="content" type="ReactNode" desc="Tooltip body — can be a string or any React element." />
        <PropRow name="placement" type='"top" | "bottom" | "left" | "right"' defaultVal='"top"' desc="Where the tooltip appears relative to its trigger." />
        <PropRow name="delay" type="number" defaultVal="0" desc="Milliseconds to delay before showing. Useful for reducing tooltip noise on fast mouse movements." />
      </PropsTable>
    </ComponentSection>
  );
}

function AccordionDocs() {
  return (
    <ComponentSection id="accordion" title="Accordion" description="Expandable sections. Height animates with ease-in-out at duration-4 (500ms). The chevron rotates 180° on open. Accordion manages which items are open; AccordionItem is a single row.">
      <Demo label="Single (default)">
        <Accordion defaultOpen="phi" style={{ width: "100%" }}>
          <AccordionItem id="phi" title="What is PHI?">
            The golden ratio — 1.618033… It appears in nautilus shells, sunflower spirals, galaxy arms. Renge builds its spacing scale from it.
          </AccordionItem>
          <AccordionItem id="fibonacci" title="What is the Fibonacci sequence?">
            1, 1, 2, 3, 5, 8, 13, 21… Each number is the sum of the two before it. The ratio of consecutive Fibonacci numbers converges toward φ.
          </AccordionItem>
          <AccordionItem id="phyllotaxis" title="What is phyllotaxis?">
            The pattern of leaves on a stem. Nature&apos;s solution to optimal packing — each leaf grows at the golden angle (137.5°) from the previous. The logic behind our grid.
          </AccordionItem>
        </Accordion>
      </Demo>
      <Demo label="Multiple open allowed">
        <Accordion multiple style={{ width: "100%" }}>
          <AccordionItem id="a" title="Open me">I can be open simultaneously with others.</AccordionItem>
          <AccordionItem id="b" title="Open me too" >Both panels can be open at once when multiple=true.</AccordionItem>
          <AccordionItem id="c" title="Disabled" disabled>This item is disabled.</AccordionItem>
        </Accordion>
      </Demo>
      <Code>{`<Accordion defaultOpen="phi">
  <AccordionItem id="phi" title="What is PHI?">
    The golden ratio — 1.618033…
  </AccordionItem>
  <AccordionItem id="fibonacci" title="Fibonacci sequence">
    1, 1, 2, 3, 5, 8, 13…
  </AccordionItem>
</Accordion>

{/* Multiple simultaneously open */}
<Accordion multiple>
  <AccordionItem id="one" title="Section 1">Content</AccordionItem>
  <AccordionItem id="two" title="Section 2">Content</AccordionItem>
</Accordion>`}</Code>
      <PropsTable>
        <PropRow name="multiple" type="boolean" defaultVal="false" desc="(Accordion) Allow multiple items open simultaneously." />
        <PropRow name="defaultOpen" type="string | string[]" defaultVal="—" desc="(Accordion) ID(s) of items open on mount." />
        <PropRow name="id" type="string" desc="(AccordionItem) Unique identifier used for open state tracking." />
        <PropRow name="title" type="ReactNode" desc="(AccordionItem) Trigger label." />
        <PropRow name="disabled" type="boolean" defaultVal="false" desc="(AccordionItem) Prevents expanding." />
      </PropsTable>
    </ComponentSection>
  );
}

function TimelineDocs() {
  return (
    <ComponentSection id="timeline" title="Timeline" description="Vertical event list. Dots are sized at space-3 (12px = Fibonacci×3). The connector gradient transitions from the item's status color to border-subtle — events flow forward in time.">
      <Demo label="Build history">
        <Timeline style={{ width: "100%", maxWidth: 480 }}>
          <TimelineItem
            title="Tokens — v2.2.4"
            description="Added animation scale. 15 named keyframes. All Fibonacci-derived durations."
            timestamp="Today"
            status="completed"
          />
          <TimelineItem
            title="React — v2.3.3"
            description="44 components. Added data input, display, navigation, feedback, layout, and action categories."
            timestamp="Today"
            status="active"
          />
          <TimelineItem
            title="Tailwind — v2.2.5"
            description="v4 plugin now injects animation vars and @keyframes blocks."
            timestamp="Today"
            status="completed"
          />
          <TimelineItem
            title="@renge-ui/vue"
            description="Vue 3 component port. Not started."
            timestamp="TBD"
            status="pending"
          />
        </Timeline>
      </Demo>
      <Code>{`<Timeline>
  <TimelineItem
    title="v1.0 released"
    description="First stable token system."
    timestamp="Jan 2025"
    status="completed"
  />
  <TimelineItem
    title="React components"
    description="21 components added."
    timestamp="Feb 2025"
    status="active"
  />
  <TimelineItem
    title="Vue port"
    description="Coming soon."
    timestamp="TBD"
    status="pending"
  />
</Timeline>`}</Code>
      <PropsTable>
        <PropRow name="title" type="ReactNode" desc="(TimelineItem) Event label." />
        <PropRow name="description" type="ReactNode" defaultVal="—" desc="(TimelineItem) Supporting copy below the title." />
        <PropRow name="timestamp" type="ReactNode" defaultVal="—" desc="(TimelineItem) Time label — aligned right." />
        <PropRow name="status" type='"completed" | "active" | "pending"' defaultVal='"pending"' desc="(TimelineItem) completed=success · active=accent · pending=border." />
        <PropRow name="icon" type="ReactNode" defaultVal="—" desc="(TimelineItem) Optional icon inside the dot (small — use 8–10px icons)." />
      </PropsTable>
    </ComponentSection>
  );
}

function SkeletonDocs() {
  return (
    <ComponentSection id="skeleton" title="Skeleton" description="Animated loading placeholder. Shimmer sweeps at duration-6 (1300ms — Fibonacci). Text variant: the last line is 61.8% wide (1/φ), creating a natural paragraph silhouette.">
      <Demo label="Variants">
        <Stack gap="5" style={{ width: "100%" }}>
          <Stack gap="2">
            <Text size="sm" color="fg-subtle">text (3 lines)</Text>
            <Skeleton variant="text" lines={3} />
          </Stack>
          <Stack gap="2">
            <Text size="sm" color="fg-subtle">rectangular</Text>
            <Skeleton variant="rectangular" height={80} />
          </Stack>
          <Stack direction="horizontal" gap="3" align="center">
            <Skeleton variant="circular" width={52} height={52} />
            <Stack gap="2" style={{ flex: 1 }}>
              <Skeleton variant="text" lines={2} />
            </Stack>
          </Stack>
        </Stack>
      </Demo>
      <Demo label="Card skeleton pattern">
        <Card variant="outlined" padding="4" style={{ width: "100%", maxWidth: 320 }}>
          <Stack gap="4">
            <Stack direction="horizontal" gap="3" align="center">
              <Skeleton variant="circular" width={40} height={40} />
              <Stack gap="1" style={{ flex: 1 }}>
                <Skeleton width="60%" height={12} />
                <Skeleton width="40%" height={12} />
              </Stack>
            </Stack>
            <Skeleton variant="rectangular" height={120} />
            <Skeleton variant="text" lines={2} />
          </Stack>
        </Card>
      </Demo>
      <Code>{`{/* Text — last line at 61.8% (1/φ) */}
<Skeleton variant="text" lines={3} />

{/* Rectangular */}
<Skeleton variant="rectangular" height={80} />

{/* Circular — avatar placeholder */}
<Skeleton variant="circular" width={52} height={52} />

{/* Custom dimensions */}
<Skeleton width="200px" height="120px" />

{/* No animation */}
<Skeleton animated={false} height={40} />`}</Code>
      <PropsTable>
        <PropRow name="variant" type='"text" | "circular" | "rectangular"' defaultVal='"rectangular"' desc="text: renders N lines with last at 61.8% width. circular: full border-radius." />
        <PropRow name="lines" type="number" defaultVal="3" desc="Number of lines (variant=text only)." />
        <PropRow name="width" type="string | number" defaultVal='"100%"' desc="Width — number treated as px." />
        <PropRow name="height" type="string | number" defaultVal="space-5" desc="Height — number treated as px." />
        <PropRow name="animated" type="boolean" defaultVal="true" desc="Enable shimmer sweep animation." />
      </PropsTable>
    </ComponentSection>
  );
}

// ============================================================================
// New component docs — Navigation
// ============================================================================

function TabsDocs() {
  return (
    <ComponentSection id="tabs" title="Tabs" description="Tab navigation with spring-eased active underline. Tabs manages open state; Tab registers a value; TabPanel renders conditionally.">
      <Demo label="Basic tabs">
        <Tabs defaultTab="phi" style={{ width: "100%" }}>
          <TabList>
            <Tab value="phi">PHI</Tab>
            <Tab value="fibonacci">Fibonacci</Tab>
            <Tab value="phyllotaxis">Phyllotaxis</Tab>
          </TabList>
          <TabPanel value="phi">
            <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
              φ = 1.618033… The golden ratio. Two quantities are in the golden ratio if their ratio equals the ratio of their sum to the larger quantity.
            </Text>
          </TabPanel>
          <TabPanel value="fibonacci">
            <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
              1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89… Consecutive ratios converge toward φ. Renge spacing, durations, and sizes all follow this sequence.
            </Text>
          </TabPanel>
          <TabPanel value="phyllotaxis">
            <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
              The arrangement of leaves on a stem. Each leaf grows at the golden angle (137.5°) from the previous — nature&apos;s optimal packing solution.
            </Text>
          </TabPanel>
        </Tabs>
      </Demo>
      <Code>{`<Tabs defaultTab="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="props">Props</Tab>
    <Tab value="examples">Examples</Tab>
  </TabList>
  <TabPanel value="overview">
    <Text>Overview content</Text>
  </TabPanel>
  <TabPanel value="props">
    <PropsTable>…</PropsTable>
  </TabPanel>
  <TabPanel value="examples">
    <Demo>…</Demo>
  </TabPanel>
</Tabs>

{/* Controlled */}
<Tabs value={activeTab} onChange={setActiveTab}>
  …
</Tabs>`}</Code>
      <PropsTable>
        <PropRow name="defaultTab" type="string" defaultVal='""' desc="(Tabs) ID of the tab active on mount." />
        <PropRow name="value" type="string" defaultVal="—" desc="(Tabs) Controlled active tab." />
        <PropRow name="onChange" type="(id: string) => void" defaultVal="—" desc="(Tabs) Called when active tab changes." />
        <PropRow name="value" type="string" desc="(Tab / TabPanel) The identifier shared between a Tab and its TabPanel." />
      </PropsTable>
    </ComponentSection>
  );
}

function BreadcrumbDocs() {
  return (
    <ComponentSection id="breadcrumb" title="Breadcrumb" description="Path navigation. Items are separated by a chevron. The current page is rendered in fg (not a link). All spacing uses space-1 (4px = Fibonacci×1).">
      <Demo label="Navigation path">
        <Breadcrumb>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
          <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
      </Demo>
      <Demo label="Longer path">
        <Breadcrumb>
          <BreadcrumbItem href="/">Renge</BreadcrumbItem>
          <BreadcrumbItem href="/packages">Packages</BreadcrumbItem>
          <BreadcrumbItem href="/packages/react">React</BreadcrumbItem>
          <BreadcrumbItem href="/packages/react/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
      </Demo>
      <Code>{`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem current>Current page</BreadcrumbItem>
</Breadcrumb>

{/* Custom separator */}
<Breadcrumb separator="/">
  <BreadcrumbItem href="/">usr</BreadcrumbItem>
  <BreadcrumbItem href="/local">local</BreadcrumbItem>
  <BreadcrumbItem current>bin</BreadcrumbItem>
</Breadcrumb>`}</Code>
      <PropsTable>
        <PropRow name="separator" type="ReactNode" defaultVal="chevron SVG" desc="(Breadcrumb) Custom separator element between items." />
        <PropRow name="href" type="string" defaultVal="—" desc="(BreadcrumbItem) Renders as a link. Omit for non-linked items." />
        <PropRow name="current" type="boolean" defaultVal="false" desc="(BreadcrumbItem) Marks as current page — renders in fg color with aria-current='page'." />
      </PropsTable>
    </ComponentSection>
  );
}

function PaginationDocs() {
  const [page, setPage] = useState(1);
  return (
    <ComponentSection id="pagination" title="Pagination" description="Page navigation. Shows at most siblings×2+5 pages — default sibling=1 (Fibonacci). Active page uses accent. Ellipsis replaces gaps greater than 2 pages.">
      <Demo label="Interactive">
        <Stack gap="3" align="center" style={{ width: "100%" }}>
          <Pagination total={20} page={page} onChange={setPage} />
          <Text size="sm" color="fg-subtle">Page {page} of 20</Text>
        </Stack>
      </Demo>
      <Demo label="Siblings = 2">
        <Pagination total={15} page={7} onChange={() => {}} siblings={2} />
      </Demo>
      <Code>{`const [page, setPage] = useState(1);

<Pagination
  total={20}
  page={page}
  onChange={setPage}
/>

{/* More siblings visible */}
<Pagination
  total={100}
  page={50}
  onChange={setPage}
  siblings={2}
/>`}</Code>
      <PropsTable>
        <PropRow name="total" type="number" desc="Total number of pages." />
        <PropRow name="page" type="number" desc="Current page (1-indexed)." />
        <PropRow name="onChange" type="(page: number) => void" desc="Called with the new page number when the user navigates." />
        <PropRow name="siblings" type="number" defaultVal="1" desc="Pages shown on each side of the active page before ellipsis truncation." />
      </PropsTable>
    </ComponentSection>
  );
}

function AnchorDocs() {
  return (
    <ComponentSection id="anchor" title="Anchor" description="Styled anchor element. Three variants for different contexts. Named Anchor (not Link) to avoid collision with Next.js's Link component.">
      <Demo label="Variants">
        <Stack gap="3">
          <Anchor href="#" variant="default">Default — accent color, underline on hover</Anchor>
          <Anchor href="#" variant="subtle">Subtle — fg-subtle, underline on hover</Anchor>
          <Anchor href="#" variant="plain">Plain — inherits parent color</Anchor>
          <Anchor href="#" underline>Underline always visible</Anchor>
        </Stack>
      </Demo>
      <Code>{`<Anchor href="/docs">Read the docs</Anchor>
<Anchor href="/github" variant="subtle">GitHub →</Anchor>

{/* Always underlined */}
<Anchor href="/privacy" underline>
  Privacy policy
</Anchor>

{/* In prose — inherits parent text color */}
<p>
  Built on <Anchor href="/phi" variant="plain">natural mathematics</Anchor>.
</p>`}</Code>
      <PropsTable>
        <PropRow name="variant" type='"default" | "subtle" | "plain"' defaultVal='"default"' desc="default=accent color · subtle=fg-subtle · plain=inherit." />
        <PropRow name="underline" type="boolean" defaultVal="false" desc="Shows underline at rest (not just on hover)." />
      </PropsTable>
    </ComponentSection>
  );
}

// ============================================================================
// New component docs — Feedback
// ============================================================================

function ToastDocs() {
  const { toast } = useToast();
  return (
    <ComponentSection id="toast" title="Toast" description="Portal-based notification system. Max 5 toasts visible (Fibonacci). Entries use spring easing; exits use ease-in. Wrap your app in ToastProvider and call useToast() anywhere.">
      <Demo label="Trigger toasts">
        <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Saved successfully", status: "success" })}>
            Success
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Update available", description: "A new version of Renge is ready.", status: "info" })}>
            Info
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Rate limit reached", description: "Try again in 60 seconds.", status: "warning" })}>
            Warning
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Build failed", description: "TypeScript error in Button.tsx:42.", status: "danger" })}>
            Danger
          </Button>
          <Button size="sm" variant="ghost" onClick={() => toast({ title: "Default notification" })}>
            Default
          </Button>
        </Stack>
      </Demo>
      <Code>{`// 1. Wrap app (or page) in ToastProvider
import { ToastProvider } from "@renge-ui/react";

export default function Layout({ children }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}

// 2. Use the hook anywhere inside
import { useToast } from "@renge-ui/react";

function SaveButton() {
  const { toast } = useToast();
  return (
    <Button onClick={() => {
      await save();
      toast({
        title: "Saved",
        description: "Your changes are live.",
        status: "success",
        duration: 3000,  // ms — default 5000
      });
    }}>
      Save
    </Button>
  );
}`}</Code>
      <Callout>
        Toast uses <code>createPortal</code> to render outside the DOM tree into <code>document.body</code>. Add <code>ToastProvider</code> once at the root — not per-page.
      </Callout>
      <PropsTable>
        <PropRow name="title" type="string" desc="(toast()) Required — primary message." />
        <PropRow name="description" type="string" defaultVal="—" desc="(toast()) Optional body text below the title." />
        <PropRow name="status" type='"default" | "success" | "warning" | "danger" | "info"' defaultVal='"default"' desc="(toast()) Determines left-border color and icon." />
        <PropRow name="duration" type="number" defaultVal="5000" desc="(toast()) Auto-dismiss after N ms. Set to 0 for persistent." />
        <PropRow name="id" type="string" defaultVal="auto" desc="(toast()) Custom ID — use to deduplicate or dismiss programmatically." />
      </PropsTable>
    </ComponentSection>
  );
}

function ModalDocs() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  return (
    <ComponentSection id="modal" title="Modal" description="Portal-based dialog. Overlay fades in; dialog opens with bloom spring easing. Closes on Escape key and overlay click by default. Focus is trapped inside while open.">
      <Demo label="Sizes">
        <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
          {(["sm", "md", "lg"] as const).map(s => (
            <Button key={s} size="sm" variant="outline" onClick={() => { setSize(s); setOpen(true); }}>
              {s} modal
            </Button>
          ))}
        </Stack>
      </Demo>
      <Modal open={open} onClose={() => setOpen(false)} size={size}>
        <ModalHeader>
          <Heading level={3} size="lg" style={{ margin: 0 }}>Natural proportion</Heading>
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)} style={{ fontSize: 18, lineHeight: 1, padding: "var(--renge-space-1)" }}>×</Button>
        </ModalHeader>
        <ModalBody>
          <Stack gap="4">
            <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
              φ = 1.618033… The golden ratio appears in nautilus shells, sunflower spirals, galaxy arms.
              Renge builds its entire token system from this single number.
            </Text>
            <Progress value={61.8} color="accent" />
            <Text size="sm" color="fg-subtle">61.8% — 1/φ</Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button size="sm" variant="solid" onClick={() => setOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
      <Code>{`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open modal</Button>

<Modal open={open} onClose={() => setOpen(false)} size="md">
  <ModalHeader>
    <Heading level={3}>Title</Heading>
    <Button variant="ghost" onClick={() => setOpen(false)}>×</Button>
  </ModalHeader>
  <ModalBody>
    <Text>Modal content goes here.</Text>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="solid" onClick={handleConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>`}</Code>
      <PropsTable>
        <PropRow name="open" type="boolean" desc="Controls whether the modal is visible." />
        <PropRow name="onClose" type="() => void" desc="Called when the modal should close (Escape key or overlay click)." />
        <PropRow name="size" type='"sm" | "md" | "lg" | "xl" | "full"' defaultVal='"md"' desc="Max width — sm:380px · md:520px · lg:720px · xl:960px · full:100vw." />
        <PropRow name="closeOnOverlayClick" type="boolean" defaultVal="true" desc="Whether clicking the backdrop closes the modal." />
        <PropRow name="closeOnEsc" type="boolean" defaultVal="true" desc="Whether Escape key closes the modal." />
      </PropsTable>
    </ComponentSection>
  );
}

// ============================================================================
// New component docs — Layout
// ============================================================================

function ContainerDocs() {
  return (
    <ComponentSection id="container" title="Container" description="Centered max-width wrapper. Max-widths follow Fibonacci-proportioned breakpoints: 520, 768, 1024, 1440. Horizontal padding defaults to space-5 (32px = Fibonacci×8×4).">
      <Demo label="Sizes (shown at reduced scale)">
        <Stack gap="3" style={{ width: "100%" }}>
          {([
            { size: "sm" as const, label: "sm — 520px" },
            { size: "md" as const, label: "md — 768px" },
            { size: "lg" as const, label: "lg — 1024px (default)" },
          ]).map(({ size, label }) => (
            <div key={size} style={{ border: "1px dashed var(--renge-color-border)", borderRadius: "var(--renge-radius-2)", padding: "var(--renge-space-2)" }}>
              <Container size={size} px="0" style={{ background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-1)", padding: "var(--renge-space-2)" }}>
                <Text size="sm" color="accent">{label}</Text>
              </Container>
            </div>
          ))}
        </Stack>
      </Demo>
      <Code>{`{/* Default: lg (1024px), px=5 */}
<Container>
  <Heading>Page content</Heading>
</Container>

{/* Narrow — article width */}
<Container size="sm" px="4">
  <Text>Prose text with narrow measure.</Text>
</Container>

{/* Custom padding */}
<Container size="xl" px="6">
  <Grid columns={3} gap="5">…</Grid>
</Container>`}</Code>
      <PropsTable>
        <PropRow name="size" type='"sm" | "md" | "lg" | "xl" | "full"' defaultVal='"lg"' desc="Max-width: 520 / 768 / 1024 / 1440 / 100%." />
        <PropRow name="px" type='"0" – "6"' defaultVal='"5"' desc="Horizontal padding — Fibonacci spacing token." />
      </PropsTable>
    </ComponentSection>
  );
}

function AspectRatioDocs() {
  return (
    <ComponentSection id="aspectratio" title="AspectRatio" description="Ratio-maintaining container. Default ratio = φ (1.618…) — the golden ratio. Any content inside fills the proportioned box. Uses padding-bottom technique for universal support.">
      <Demo label="Common ratios">
        <Grid columns={3} gap="4" style={{ width: "100%" }}>
          {[
            { ratio: PHI, label: "φ = 1.618" },
            { ratio: 16/9, label: "16/9" },
            { ratio: 1, label: "1:1" },
          ].map(({ ratio, label }) => (
            <div key={label}>
              <Text size="sm" color="fg-subtle" style={{ marginBottom: "var(--renge-space-1)" }}>{label}</Text>
              <AspectRatio ratio={ratio}>
                <div style={{ background: "var(--renge-color-accent-subtle)", border: "1px solid var(--renge-color-accent)", borderRadius: "var(--renge-radius-2)", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                  <Text size="sm" color="accent">{ratio.toFixed(3)}</Text>
                </div>
              </AspectRatio>
            </div>
          ))}
        </Grid>
      </Demo>
      <Code>{`import { PHI } from "@renge-ui/tokens";

{/* Default: PHI (golden ratio) */}
<AspectRatio>
  <img src="/photo.jpg" alt="…" style={{ objectFit: "cover" }} />
</AspectRatio>

{/* 16:9 video */}
<AspectRatio ratio={16/9}>
  <video src="/demo.mp4" controls />
</AspectRatio>

{/* Square */}
<AspectRatio ratio={1}>
  <div>…</div>
</AspectRatio>`}</Code>
      <PropsTable>
        <PropRow name="ratio" type="number" defaultVal="PHI (1.618…)" desc="Width-to-height ratio. Pass 16/9 for widescreen, 1 for square, PHI for golden ratio." />
      </PropsTable>
    </ComponentSection>
  );
}

function SpacerDocs() {
  return (
    <ComponentSection id="spacer" title="Spacer" description="Explicit whitespace element. All sizes map directly to Fibonacci spacing tokens — the visible grammar of the space between things.">
      <Demo label="Vertical spacers (rendered with borders for visibility)">
        <Stack style={{ width: "100%" }}>
          {(["2", "4", "6"] as const).map(size => (
            <div key={size}>
              <div style={{ height: 1, background: "var(--renge-color-border-subtle)", width: "100%" }} />
              <div style={{ position: "relative" }}>
                <Spacer size={size} />
                <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: "var(--renge-space-3)" }}>
                  <Badge variant="neutral" size="sm">space-{size}</Badge>
                </div>
              </div>
              <div style={{ height: 1, background: "var(--renge-color-border-subtle)", width: "100%" }} />
            </div>
          ))}
        </Stack>
      </Demo>
      <Code>{`<Heading>Section title</Heading>
<Spacer size="5" />
<Text>The proportion between the heading and the body text is deliberate.</Text>

{/* Horizontal spacer in flex layouts */}
<Stack direction="horizontal">
  <Text>Left</Text>
  <Spacer size="4" axis="horizontal" />
  <Text>Right</Text>
</Stack>`}</Code>
      <PropsTable>
        <PropRow name="size" type='"1" – "10"' defaultVal='"4"' desc="Fibonacci spacing step. size=4 = space-4 = 20px (Fibonacci 5 × 4px)." />
        <PropRow name="axis" type='"vertical" | "horizontal"' defaultVal='"vertical"' desc="vertical=height · horizontal=width (for use in flex rows)." />
      </PropsTable>
    </ComponentSection>
  );
}

// ============================================================================
// New component docs — Action
// ============================================================================

function IconButtonDocs() {
  return (
    <ComponentSection id="iconbutton" title="IconButton" description="Circular icon-only button. Sizes follow the fractal scale (Fibonacci × baseUnit): 20→32→40→52→84px. Each step is self-similar — a precise mathematical miniature or magnification of the base.">
      <Demo label="Sizes">
        <Stack direction="horizontal" gap="4" align="center">
          {(["xs", "sm", "md", "lg", "xl"] as const).map(size => (
            <Stack key={size} gap="2" align="center">
              <IconButton size={size} aria-label={`${size} icon button`} variant="outline">
                φ
              </IconButton>
              <Text size="sm" color="fg-subtle">{size}</Text>
            </Stack>
          ))}
        </Stack>
      </Demo>
      <Demo label="Variants + color schemes">
        <Stack direction="horizontal" gap="3" align="center" style={{ flexWrap: "wrap" }}>
          <IconButton aria-label="ghost neutral" variant="ghost">☰</IconButton>
          <IconButton aria-label="ghost accent" variant="ghost" colorScheme="accent">★</IconButton>
          <IconButton aria-label="outline" variant="outline">✕</IconButton>
          <IconButton aria-label="solid accent" variant="solid" colorScheme="accent">↑</IconButton>
          <IconButton aria-label="solid danger" variant="solid" colorScheme="danger">⚠</IconButton>
        </Stack>
      </Demo>
      <Code>{`{/* Basic icon button */}
<IconButton aria-label="Close" onClick={onClose}>
  ✕
</IconButton>

{/* With SVG icon */}
<IconButton
  aria-label="Settings"
  size="md"
  variant="ghost"
>
  <SettingsIcon />
</IconButton>

{/* Danger action */}
<IconButton
  aria-label="Delete item"
  colorScheme="danger"
  variant="outline"
>
  <TrashIcon />
</IconButton>`}</Code>
      <Callout>
        <code>aria-label</code> is required for icon-only buttons — there is no visible text to describe the action to screen readers.
      </Callout>
      <PropsTable>
        <PropRow name="aria-label" type="string" desc="Required. Accessible label for screen readers." />
        <PropRow name="size" type='"xs" | "sm" | "md" | "lg" | "xl"' defaultVal='"md"' desc="20/32/40/52/84px — fractal scale (Fibonacci × baseUnit)." />
        <PropRow name="variant" type='"solid" | "outline" | "ghost"' defaultVal='"ghost"' desc="Same variant model as Button." />
        <PropRow name="colorScheme" type='"accent" | "danger" | "success" | "neutral"' defaultVal='"neutral"' desc="Color channel. neutral uses fg-subtle." />
        <PropRow name="animation" type="AnimationName" defaultVal="—" desc="Renge animation token." />
      </PropsTable>
    </ComponentSection>
  );
}

function ButtonGroupDocs() {
  return (
    <ComponentSection id="buttongroup" title="ButtonGroup" description="Groups related buttons into a single visual unit. Use ButtonGroupItem to flatten border radii on touching edges — only outermost corners keep their curvature.">
      <Demo label="Attached group">
        <Stack gap="4">
          <ButtonGroup>
            <Button variant="outline" style={{ borderRadius: "var(--renge-radius-2) 0 0 var(--renge-radius-2)", borderRight: "none" }}>Left</Button>
            <Button variant="outline" style={{ borderRadius: 0 }}>Center</Button>
            <Button variant="outline" style={{ borderRadius: "0 var(--renge-radius-2) var(--renge-radius-2) 0" }}>Right</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="solid" colorScheme="accent" style={{ borderRadius: "var(--renge-radius-2) 0 0 var(--renge-radius-2)", borderRight: "none" }}>Bold</Button>
            <Button variant="outline" style={{ borderRadius: 0 }}>Italic</Button>
            <Button variant="outline" style={{ borderRadius: "0 var(--renge-radius-2) var(--renge-radius-2) 0" }}>Underline</Button>
          </ButtonGroup>
        </Stack>
      </Demo>
      <Code>{`<ButtonGroup>
  <Button
    variant="outline"
    style={{
      borderRadius: "var(--renge-radius-2) 0 0 var(--renge-radius-2)",
      borderRight: "none",
    }}
  >
    Left
  </Button>
  <Button variant="outline" style={{ borderRadius: 0 }}>
    Middle
  </Button>
  <Button
    variant="outline"
    style={{ borderRadius: "0 var(--renge-radius-2) var(--renge-radius-2) 0" }}
  >
    Right
  </Button>
</ButtonGroup>`}</Code>
      <PropsTable>
        <PropRow name="orientation" type='"horizontal" | "vertical"' defaultVal='"horizontal"' desc="Flex direction of the group." />
        <PropRow name="radius" type='"none" | "1" | "2" | "3" | "full"' defaultVal='"2"' desc="Radius applied to outer edges." />
      </PropsTable>
    </ComponentSection>
  );
}

function CopyButtonDocs() {
  return (
    <ComponentSection id="copybutton" title="CopyButton" description="Clipboard copy with visual feedback. Success state persists for 2100ms (duration-7 — a Fibonacci duration, long enough to read, short enough not to linger).">
      <Demo label="Copy values">
        <Stack direction="horizontal" gap="4" align="center" style={{ flexWrap: "wrap" }}>
          <CopyButton value="1.618033988749895" label="Copy PHI" />
          <CopyButton value="var(--renge-color-accent)" label="Copy CSS var" />
          <CopyButton value="pnpm add @renge-ui/tokens @renge-ui/react" label="Copy install" successLabel="Copied!" />
        </Stack>
      </Demo>
      <Demo label="In a code block">
        <Card variant="filled" padding="4" style={{ width: "100%" }}>
          <Stack direction="horizontal" justify="between" align="center">
            <code style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg)" }}>
              pnpm add @renge-ui/tokens @renge-ui/react
            </code>
            <CopyButton value="pnpm add @renge-ui/tokens @renge-ui/react" />
          </Stack>
        </Card>
      </Demo>
      <Code>{`<CopyButton value="text to copy" />
<CopyButton
  value={cssVar}
  label="Copy"
  successLabel="Copied!"
  timeout={2100}
  onCopy={(value) => console.log("Copied:", value)}
/>`}</Code>
      <PropsTable>
        <PropRow name="value" type="string" desc="Text written to the clipboard on click." />
        <PropRow name="label" type="string" defaultVal='"Copy"' desc="Button label at rest." />
        <PropRow name="successLabel" type="string" defaultVal='"Copied!"' desc="Label shown after a successful copy." />
        <PropRow name="timeout" type="number" defaultVal="2100" desc="How long to show success state in ms. Default 2100 = duration-7 (Fibonacci)." />
        <PropRow name="onCopy" type="(value: string) => void" defaultVal="—" desc="Callback fired after a successful copy." />
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
        <Stack gap="5" style={{ width: "100%", maxWidth: 360 }}>
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
        All 44 components use only <code>var(--renge-*)</code> CSS custom properties. Switch color profiles by injecting a new theme block — no component re-renders required.
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
    <ToastProvider>
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
              44 components built on the token system. Proportional. Accessible. Composable. No class names — every style references a Renge CSS variable.
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
          <ContainerDocs />
          <AspectRatioDocs />
          <SpacerDocs />

          {/* Typography */}
          <HeadingDocs />
          <TextDocs />
          <DividerDocs />
          <AnchorDocs />

          {/* Data Input */}
          <ButtonDocs />
          <IconButtonDocs />
          <ButtonGroupDocs />
          <CopyButtonDocs />
          <InputDocs />
          <SelectDocs />
          <CheckboxDocs />
          <RadioDocs />
          <SwitchDocs />
          <TextareaDocs />
          <SliderDocs />
          <FormFieldDocs />

          {/* Display */}
          <CardDocs />
          <BadgeDocs />
          <ChipDocs />
          <AvatarDocs />
          <StatDocs />
          <TooltipDocs />
          <SkeletonDocs />

          {/* Data Display */}
          <TableDocs />
          <AccordionDocs />
          <TimelineDocs />

          {/* Feedback */}
          <AlertDocs />
          <SpinnerDocs />
          <ProgressDocs />
          <ToastDocs />
          <ModalDocs />

          {/* Navigation */}
          <NavbarDocs />
          <TabsDocs />
          <BreadcrumbDocs />
          <PaginationDocs />

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
    </ToastProvider>
  );
}
