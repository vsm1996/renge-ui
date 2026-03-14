"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Stack, Grid, Section,
  Text, Heading, Divider,
  Button, Input, FormField,
  Card, Badge, Chip, Avatar, Stat,
  Alert, Spinner, Progress,
  Navbar,
} from "@renge/react";
import { ProfileProvider, ProfileToggle } from "@/components/ui/ProfileToggle";

// ============================================================================
// Shared primitives
// ============================================================================

function PropRow({ name, type, defaultVal, desc }: { name: string; type: string; defaultVal?: string; desc: string }) {
  return (
    <tr>
      <td style={{ padding: "var(--renge-space-3) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-accent)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{name}</td>
      <td style={{ padding: "var(--renge-space-3) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-fg-muted)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{type}</td>
      <td style={{ padding: "var(--renge-space-3) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-fg-muted)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{defaultVal ?? "—"}</td>
      <td style={{ padding: "var(--renge-space-3) var(--renge-space-4)", fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{desc}</td>
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
              <th key={h} style={{ padding: "var(--renge-space-2) var(--renge-space-4)", textAlign: "left", fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-fg-muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Demo({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: "var(--renge-space-6)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)", display: "flex", flexWrap: "wrap", gap: "var(--renge-space-4)", alignItems: "flex-start" }}>
      {children}
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <div style={{ background: "var(--renge-color-bg-inverse)", borderRadius: "var(--renge-radius-2)", padding: "var(--renge-space-4)", overflowX: "auto" }}>
      <pre style={{ margin: 0 }}>
        <code style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-fg-inverse)", lineHeight: 1.7 }}>{children}</code>
      </pre>
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
  { label: "Layout", items: [
    { id: "stack", label: "Stack" },
    { id: "grid", label: "Grid" },
    { id: "section", label: "Section" },
  ]},
  { label: "Typography", items: [
    { id: "heading", label: "Heading" },
    { id: "text", label: "Text" },
    { id: "divider", label: "Divider" },
  ]},
  { label: "Inputs", items: [
    { id: "button", label: "Button" },
    { id: "input", label: "Input" },
    { id: "formfield", label: "FormField" },
  ]},
  { label: "Display", items: [
    { id: "card", label: "Card" },
    { id: "badge", label: "Badge" },
    { id: "chip", label: "Chip" },
    { id: "avatar", label: "Avatar" },
    { id: "stat", label: "Stat" },
  ]},
  { label: "Feedback", items: [
    { id: "alert", label: "Alert" },
    { id: "spinner", label: "Spinner" },
    { id: "progress", label: "Progress" },
  ]},
  { label: "Navigation", items: [
    { id: "navbar", label: "Navbar" },
  ]},
];

function Sidebar({ active }: { active: string }) {
  return (
    <aside style={{ width: 200, flexShrink: 0, position: "sticky", top: "var(--renge-space-7)", height: "fit-content", display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
      {NAV_SECTIONS.map(section => (
        <div key={section.label}>
          <p style={{ fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-body)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, margin: 0, marginBottom: "var(--renge-space-2)" }}>
            {section.label}
          </p>
          <Stack gap="1">
            {section.items.map(item => (
              <a key={item.id} href={`#${item.id}`} style={{
                display: "block",
                padding: "var(--renge-space-1) var(--renge-space-3)",
                borderRadius: "var(--renge-radius-1)",
                fontSize: "var(--renge-font-size-sm)",
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
    </aside>
  );
}

// ============================================================================
// Component demos
// ============================================================================

function StackDocs() {
  return (
    <ComponentSection id="stack" title="Stack" description="Flex container for composing vertical and horizontal layouts using Renge spacing tokens.">
      <Demo>
        <Stack gap="4" style={{ width: "100%" }}>
          <div style={{ height: 40, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)", display: "flex", alignItems: "center", paddingInline: "var(--renge-space-3)" }}><Text size="sm" color="accent">Item 1</Text></div>
          <div style={{ height: 40, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)", display: "flex", alignItems: "center", paddingInline: "var(--renge-space-3)" }}><Text size="sm" color="accent">Item 2</Text></div>
          <div style={{ height: 40, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)", display: "flex", alignItems: "center", paddingInline: "var(--renge-space-3)" }}><Text size="sm" color="accent">Item 3</Text></div>
        </Stack>
        <Stack direction="horizontal" gap="3" align="center">
          <div style={{ width: 40, height: 40, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)" }} />
          <div style={{ width: 60, height: 40, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)" }} />
          <div style={{ width: 32, height: 40, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)" }} />
        </Stack>
      </Demo>
      <Code>{`<Stack gap="4" direction="vertical">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

<Stack direction="horizontal" gap="3" align="center">
  <div>Left</div>
  <div>Right</div>
</Stack>`}</Code>
      <PropsTable>
        <PropRow name="gap" type="SpaceKey" defaultVal='"3"' desc="Gap between children — Fibonacci spacing step." />
        <PropRow name="direction" type='"vertical" | "horizontal"' defaultVal='"vertical"' desc="Flex direction." />
        <PropRow name="align" type='"start" | "center" | "end" | "stretch"' defaultVal='"stretch"' desc="align-items value." />
        <PropRow name="justify" type='"start" | "center" | "end" | "between" | "around"' defaultVal='"start"' desc="justify-content value." />
        <PropRow name="as" type="ElementType" defaultVal='"div"' desc="Rendered HTML element." />
      </PropsTable>
    </ComponentSection>
  );
}

function GridDocs() {
  return (
    <ComponentSection id="grid" title="Grid" description="CSS grid container with Fibonacci gap tokens.">
      <Demo>
        <Grid columns={3} gap="3" style={{ width: "100%" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ height: 48, background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Text size="sm" color="accent">{i + 1}</Text>
            </div>
          ))}
        </Grid>
      </Demo>
      <Code>{`<Grid columns={3} gap="3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Grid>

// Custom template
<Grid columns="1fr 2fr" gap="4">
  <div>Narrow</div>
  <div>Wide</div>
</Grid>`}</Code>
      <PropsTable>
        <PropRow name="columns" type="number | string" defaultVal="1" desc="Number of equal columns, or a CSS grid-template-columns string." />
        <PropRow name="rows" type="number | string" defaultVal="—" desc="Number of rows or template string." />
        <PropRow name="gap" type="SpaceKey" defaultVal='"3"' desc="Gap between all cells." />
        <PropRow name="gapX" type="SpaceKey" defaultVal="—" desc="Column gap (overrides gap)." />
        <PropRow name="gapY" type="SpaceKey" defaultVal="—" desc="Row gap (overrides gap)." />
      </PropsTable>
    </ComponentSection>
  );
}

function SectionDocs() {
  return (
    <ComponentSection id="section" title="Section" description="Page section wrapper with max-width constraint and centered layout.">
      <Demo>
        <div style={{ width: "100%", border: "1px dashed var(--renge-color-border)", borderRadius: "var(--renge-radius-2)" }}>
          <Section maxWidth="md" paddingY="5" paddingX="4" style={{ background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)" }}>
            <Text color="accent">maxWidth="md" — centered content</Text>
          </Section>
        </div>
      </Demo>
      <Code>{`<Section maxWidth="lg" paddingY="8" paddingX="5">
  <Heading>Page content</Heading>
</Section>`}</Code>
      <PropsTable>
        <PropRow name="maxWidth" type='"sm" | "md" | "lg" | "xl" | "full" | "none"' defaultVal='"lg"' desc="Max width constraint." />
        <PropRow name="paddingX" type="SpaceKey" defaultVal='"4"' desc="Horizontal padding." />
        <PropRow name="paddingY" type="SpaceKey" defaultVal='"6"' desc="Vertical padding." />
        <PropRow name="padding" type="SpaceKey" defaultVal="—" desc="Override both axes at once." />
        <PropRow name="center" type="boolean" defaultVal="true" desc="Auto margin-inline for centering." />
        <PropRow name="as" type="ElementType" defaultVal='"section"' desc="Rendered HTML element." />
      </PropsTable>
    </ComponentSection>
  );
}

function HeadingDocs() {
  return (
    <ComponentSection id="heading" title="Heading" description="Semantic heading using the PHI-derived type scale. Level maps to h1–h6.">
      <Demo>
        <Stack gap="4">
          {([1, 2, 3, 4] as const).map(level => (
            <Heading key={level} level={level}>Level {level} heading</Heading>
          ))}
        </Stack>
      </Demo>
      <Code>{`<Heading level={1}>The golden ratio</Heading>
<Heading level={2} color="accent">Section title</Heading>
<Heading level={3} size="2xl">Custom size</Heading>`}</Code>
      <PropsTable>
        <PropRow name="level" type="1 | 2 | 3 | 4 | 5 | 6" defaultVal="2" desc="HTML heading level (h1–h6)." />
        <PropRow name="size" type='"lg" | "xl" | "2xl" | "3xl" | "4xl"' defaultVal="level-mapped" desc="Override the default size for that level." />
        <PropRow name="color" type='"fg" | "fg-subtle" | "accent"' defaultVal='"fg"' desc="Text color token." />
        <PropRow name="animation" type="AnimationName" defaultVal="—" desc="Renge animation token." />
      </PropsTable>
    </ComponentSection>
  );
}

function TextDocs() {
  return (
    <ComponentSection id="text" title="Text" description="Inline or block text element. Renders as <span> by default.">
      <Demo>
        <Stack gap="3">
          {(["xs", "sm", "base", "lg", "xl"] as const).map(size => (
            <Text key={size} size={size}>{size} — The ratio that appears in every living thing.</Text>
          ))}
          <Stack direction="horizontal" gap="4" align="center">
            {(["fg", "fg-subtle", "fg-muted", "accent"] as const).map(color => (
              <Text key={color} color={color} size="sm">{color}</Text>
            ))}
          </Stack>
        </Stack>
      </Demo>
      <Code>{`<Text size="lg" color="fg-subtle">Natural proportion.</Text>
<Text as="p" weight="medium">Fibonacci spacing.</Text>
<Text size="xs" color="accent">PHI = 1.618</Text>`}</Code>
      <PropsTable>
        <PropRow name="size" type='"xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl"' defaultVal='"base"' desc="Font size token." />
        <PropRow name="color" type='"fg" | "fg-subtle" | "fg-muted" | "accent" | "success" | "warning" | "danger"' defaultVal='"fg"' desc="Text color token." />
        <PropRow name="weight" type='"normal" | "medium" | "semibold" | "bold"' defaultVal='"normal"' desc="Font weight." />
        <PropRow name="align" type='"left" | "center" | "right"' defaultVal="—" desc="Text alignment." />
        <PropRow name="as" type="ElementType" defaultVal='"span"' desc="Rendered HTML element." />
      </PropsTable>
    </ComponentSection>
  );
}

function DividerDocs() {
  return (
    <ComponentSection id="divider" title="Divider" description="Horizontal or vertical rule using border color tokens.">
      <Demo>
        <Stack gap="4" style={{ width: "100%" }}>
          <Text size="sm">Above</Text>
          <Divider />
          <Text size="sm">Between — default (border-subtle)</Text>
          <Divider color="border" spacing="2" />
          <Text size="sm">Below — border, tighter spacing</Text>
        </Stack>
        <Stack direction="horizontal" align="stretch" style={{ height: 60 }}>
          <Text size="sm">Left</Text>
          <Divider orientation="vertical" spacing="4" />
          <Text size="sm">Right</Text>
        </Stack>
      </Demo>
      <Code>{`<Divider />
<Divider orientation="vertical" spacing="4" />
<Divider color="border" spacing="2" />`}</Code>
      <PropsTable>
        <PropRow name="orientation" type='"horizontal" | "vertical"' defaultVal='"horizontal"' desc="Rule direction." />
        <PropRow name="spacing" type="SpaceKey" defaultVal='"3"' desc="Margin around the rule." />
        <PropRow name="color" type='"border" | "border-subtle"' defaultVal='"border-subtle"' desc="Line color token." />
      </PropsTable>
    </ComponentSection>
  );
}

function ButtonDocs() {
  return (
    <ComponentSection id="button" title="Button" description="Action element with variant, size, and color scheme props.">
      <Demo>
        <Stack direction="horizontal" gap="3" align="center" style={{ flexWrap: "wrap" }}>
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </Stack>
        <Stack direction="horizontal" gap="3" align="center" style={{ flexWrap: "wrap" }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Stack>
        <Stack direction="horizontal" gap="3" align="center" style={{ flexWrap: "wrap" }}>
          <Button colorScheme="accent">Accent</Button>
          <Button colorScheme="success">Success</Button>
          <Button colorScheme="danger">Danger</Button>
        </Stack>
      </Demo>
      <Code>{`<Button variant="solid" size="md" colorScheme="accent">
  Continue
</Button>

<Button variant="outline" colorScheme="danger">
  Delete
</Button>

<Button variant="ghost" fullWidth>
  Cancel
</Button>`}</Code>
      <PropsTable>
        <PropRow name="variant" type='"solid" | "outline" | "ghost"' defaultVal='"solid"' desc="Visual style." />
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Padding and font size." />
        <PropRow name="colorScheme" type='"accent" | "danger" | "success"' defaultVal='"accent"' desc="Color set to apply." />
        <PropRow name="fullWidth" type="boolean" defaultVal="false" desc="Stretch to container width." />
        <PropRow name="animation" type="AnimationName" defaultVal="—" desc="Renge animation token." />
      </PropsTable>
    </ComponentSection>
  );
}

function InputDocs() {
  return (
    <ComponentSection id="input" title="Input" description="Text input with size and validation state support.">
      <Demo>
        <Stack gap="3" style={{ minWidth: 260 }}>
          <Input placeholder="Default state" fullWidth />
          <Input placeholder="Error state" state="error" fullWidth />
          <Input placeholder="Success state" state="success" fullWidth />
          <Stack direction="horizontal" gap="3">
            <Input placeholder="sm" size="sm" />
            <Input placeholder="lg" size="lg" />
          </Stack>
        </Stack>
      </Demo>
      <Code>{`<Input placeholder="Enter value" size="md" />
<Input state="error" placeholder="Invalid input" fullWidth />
<Input state="success" defaultValue="Valid" />`}</Code>
      <PropsTable>
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Padding and font size." />
        <PropRow name="state" type='"default" | "error" | "success"' defaultVal='"default"' desc="Border color and validation state." />
        <PropRow name="fullWidth" type="boolean" defaultVal="false" desc="Stretch to container width." />
      </PropsTable>
    </ComponentSection>
  );
}

function FormFieldDocs() {
  return (
    <ComponentSection id="formfield" title="FormField" description="Label + input wrapper with helper and error text slots.">
      <Demo>
        <Stack gap="5" style={{ minWidth: 280 }}>
          <FormField label="Email address" htmlFor="email-demo" helperText="We'll never share your email.">
            <Input id="email-demo" placeholder="you@example.com" fullWidth />
          </FormField>
          <FormField label="Username" htmlFor="user-demo" required errorText="Username is already taken.">
            <Input id="user-demo" defaultValue="renge" state="error" fullWidth />
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

<FormField label="Username" required errorText="Already taken.">
  <Input state="error" fullWidth />
</FormField>`}</Code>
      <PropsTable>
        <PropRow name="label" type="string" defaultVal="—" desc="Label text." />
        <PropRow name="htmlFor" type="string" defaultVal="—" desc="Links label to input id." />
        <PropRow name="helperText" type="string" defaultVal="—" desc="Muted hint below the input." />
        <PropRow name="errorText" type="string" defaultVal="—" desc="Danger text — overrides helperText." />
        <PropRow name="required" type="boolean" defaultVal="—" desc="Shows a required asterisk." />
      </PropsTable>
    </ComponentSection>
  );
}

function CardDocs() {
  return (
    <ComponentSection id="card" title="Card" description="Surface container with variant, padding, and radius props.">
      <Demo>
        <Card variant="elevated" style={{ minWidth: 180 }}>
          <Text size="sm" weight="medium">Elevated</Text>
          <Text size="xs" color="fg-muted">Default variant</Text>
        </Card>
        <Card variant="outlined" style={{ minWidth: 180 }}>
          <Text size="sm" weight="medium">Outlined</Text>
          <Text size="xs" color="fg-muted">Border visible</Text>
        </Card>
        <Card variant="filled" style={{ minWidth: 180 }}>
          <Text size="sm" weight="medium">Filled</Text>
          <Text size="xs" color="fg-muted">bg-subtle background</Text>
        </Card>
      </Demo>
      <Code>{`<Card variant="elevated" padding="5" radius="3">
  <Heading level={3}>Card title</Heading>
  <Text color="fg-subtle">Card content.</Text>
</Card>`}</Code>
      <PropsTable>
        <PropRow name="variant" type='"elevated" | "outlined" | "filled"' defaultVal='"elevated"' desc="Surface style." />
        <PropRow name="padding" type="SpaceKey" defaultVal='"4"' desc="Internal padding." />
        <PropRow name="radius" type='"none" | "1"–"5" | "full"' defaultVal='"3"' desc="Border radius token." />
        <PropRow name="animation" type="AnimationName" defaultVal="—" desc="Renge animation token." />
      </PropsTable>
    </ComponentSection>
  );
}

function BadgeDocs() {
  return (
    <ComponentSection id="badge" title="Badge" description="Small status label with semantic color variants.">
      <Demo>
        <Stack direction="horizontal" gap="2" style={{ flexWrap: "wrap" }}>
          {(["neutral", "accent", "success", "warning", "danger", "info"] as const).map(v => (
            <Badge key={v} variant={v}>{v}</Badge>
          ))}
        </Stack>
        <Stack direction="horizontal" gap="2" align="center">
          <Badge size="sm">sm</Badge>
          <Badge size="md">md</Badge>
          <Badge size="lg">lg</Badge>
        </Stack>
      </Demo>
      <Code>{`<Badge variant="success">Published</Badge>
<Badge variant="warning" size="sm">Beta</Badge>
<Badge variant="danger">Error</Badge>`}</Code>
      <PropsTable>
        <PropRow name="variant" type='"neutral" | "accent" | "success" | "warning" | "danger" | "info"' defaultVal='"neutral"' desc="Color semantic." />
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Padding and font size." />
      </PropsTable>
    </ComponentSection>
  );
}

function ChipDocs() {
  return (
    <ComponentSection id="chip" title="Chip" description="Dismissible tag with the same color variants as Badge.">
      <Demo>
        <Stack direction="horizontal" gap="2" style={{ flexWrap: "wrap" }}>
          {(["neutral", "accent", "success", "warning", "danger"] as const).map(v => (
            <Chip key={v} variant={v}>{v}</Chip>
          ))}
        </Stack>
        <Stack direction="horizontal" gap="2" style={{ flexWrap: "wrap" }}>
          <Chip variant="accent" onDismiss={() => {}}>Dismissible</Chip>
          <Chip variant="success" onDismiss={() => {}}>Tag</Chip>
        </Stack>
      </Demo>
      <Code>{`<Chip variant="accent">Design system</Chip>
<Chip variant="neutral" onDismiss={() => removeTag(id)}>
  Removable
</Chip>`}</Code>
      <PropsTable>
        <PropRow name="variant" type='"neutral" | "accent" | "success" | "warning" | "danger" | "info"' defaultVal='"neutral"' desc="Color semantic." />
        <PropRow name="onDismiss" type="() => void" defaultVal="—" desc="When provided, renders a × dismiss button." />
      </PropsTable>
    </ComponentSection>
  );
}

function AvatarDocs() {
  return (
    <ComponentSection id="avatar" title="Avatar" description="Image or initials avatar with Fibonacci-scaled sizes.">
      <Demo>
        <Stack direction="horizontal" gap="3" align="center">
          {(["1", "2", "3", "4", "5"] as const).map(size => (
            <Avatar key={size} size={size} initials="RG" />
          ))}
        </Stack>
        <Stack direction="horizontal" gap="3" align="center">
          <Avatar initials="PH" size="3" />
          <Avatar initials="FB" size="3" shape="square" />
          <Avatar src="https://api.dicebear.com/9.x/shapes/svg?seed=renge" alt="Renge" size="3" />
        </Stack>
      </Demo>
      <Code>{`<Avatar initials="RG" size="3" />
<Avatar initials="PH" shape="square" size="4" />
<Avatar src="/photo.jpg" alt="Profile" size="3" />`}</Code>
      <PropsTable>
        <PropRow name="src" type="string" defaultVal="—" desc="Image URL. Takes priority over initials." />
        <PropRow name="alt" type="string" defaultVal="—" desc="Alt text / aria-label." />
        <PropRow name="initials" type="string" defaultVal="—" desc="Up to 2 chars displayed when no src." />
        <PropRow name="size" type='"1" | "2" | "3" | "4" | "5"' defaultVal='"3"' desc="20 / 32 / 52 / 84 / 136 px — Fibonacci × 4." />
        <PropRow name="shape" type='"circle" | "square"' defaultVal='"circle"' desc="Full radius or radius-3." />
      </PropsTable>
    </ComponentSection>
  );
}

function StatDocs() {
  return (
    <ComponentSection id="stat" title="Stat" description="Key metric display with optional trend indicator.">
      <Demo>
        <Stat value="1.618" label="Golden ratio" />
        <Stat value="89" label="Fibonacci step 10" trend="up" trendValue="+34" caption="from step 9" />
        <Stat value="13ms" label="Duration 4" trend="down" trendValue="-2ms" />
      </Demo>
      <Code>{`<Stat value="1.618" label="Golden ratio" />
<Stat
  value="89"
  label="Fibonacci step"
  trend="up"
  trendValue="+34"
  caption="from previous step"
/>`}</Code>
      <PropsTable>
        <PropRow name="value" type="string | number" defaultVal="—" desc="The primary metric value." />
        <PropRow name="label" type="string" defaultVal="—" desc="Label above the value." />
        <PropRow name="trend" type='"up" | "down" | "neutral"' defaultVal="—" desc="Trend direction — controls badge color." />
        <PropRow name="trendValue" type="string" defaultVal="—" desc="Trend amount text shown next to the value." />
        <PropRow name="caption" type="string" defaultVal="—" desc="Muted caption below." />
      </PropsTable>
    </ComponentSection>
  );
}

function AlertDocs() {
  return (
    <ComponentSection id="alert" title="Alert" description="Contextual banner with left-border accent and semantic status.">
      <Demo>
        <Stack gap="3" style={{ width: "100%" }}>
          <Alert status="info" title="PHI is irrational">The golden ratio cannot be expressed as a simple fraction.</Alert>
          <Alert status="success" title="Build succeeded">All 105 tests passed.</Alert>
          <Alert status="warning">Variance above 0.1 may affect visual consistency.</Alert>
          <Alert status="danger" title="Token not found">--renge-color-unknown is undefined.</Alert>
        </Stack>
      </Demo>
      <Code>{`<Alert status="info" title="Note">
  Informational message.
</Alert>

<Alert status="danger" title="Error">
  Something went wrong.
</Alert>`}</Code>
      <PropsTable>
        <PropRow name="status" type='"info" | "success" | "warning" | "danger"' defaultVal='"info"' desc="Sets border and background color." />
        <PropRow name="title" type="string" defaultVal="—" desc="Bold heading inside the alert." />
      </PropsTable>
    </ComponentSection>
  );
}

function SpinnerDocs() {
  return (
    <ComponentSection id="spinner" title="Spinner" description="Animated loading indicator. Keyframes injected once at module load.">
      <Demo>
        <Stack direction="horizontal" gap="5" align="center">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </Stack>
        <Stack direction="horizontal" gap="5" align="center">
          <Spinner color="accent" label="Loading tokens" />
          <Spinner color="fg" />
          <Spinner color="fg-muted" />
        </Stack>
      </Demo>
      <Code>{`<Spinner size="md" color="accent" label="Loading" />
<Spinner size="lg" color="fg" />`}</Code>
      <PropsTable>
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="16 / 24 / 32 px." />
        <PropRow name="color" type='"accent" | "fg" | "fg-muted"' defaultVal='"accent"' desc="Spinner track color." />
        <PropRow name="label" type="string" defaultVal='"Loading"' desc="aria-label for accessibility." />
      </PropsTable>
    </ComponentSection>
  );
}

function ProgressDocs() {
  return (
    <ComponentSection id="progress" title="Progress" description="Linear progress bar. Value is clamped 0–100.">
      <Demo>
        <Stack gap="4" style={{ width: "100%", minWidth: 280 }}>
          <Progress value={61.8} label="PHI progress" />
          <Progress value={38.2} color="success" />
          <Progress value={80} color="warning" size="lg" />
          <Progress value={20} color="danger" size="sm" radius="none" />
        </Stack>
      </Demo>
      <Code>{`<Progress value={61.8} color="accent" />
<Progress value={100} color="success" size="lg" />
<Progress value={30} color="danger" radius="none" />`}</Code>
      <PropsTable>
        <PropRow name="value" type="number" defaultVal="—" desc="0–100 percentage fill." />
        <PropRow name="color" type='"accent" | "success" | "warning" | "danger"' defaultVal='"accent"' desc="Fill color token." />
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Track height: 4 / 8 / 12 px." />
        <PropRow name="radius" type='"none" | "full"' defaultVal='"full"' desc="Track border radius." />
        <PropRow name="label" type="string" defaultVal="—" desc="aria-label for accessibility." />
      </PropsTable>
    </ComponentSection>
  );
}

function NavbarDocs() {
  return (
    <ComponentSection id="navbar" title="Navbar" description="Horizontal navigation container with optional sticky positioning.">
      <Demo>
        <div style={{ width: "100%", border: "1px solid var(--renge-color-border-subtle)", borderRadius: "var(--renge-radius-2)", overflow: "hidden" }}>
          <Navbar>
            <Stack direction="horizontal" gap="4" align="center" justify="between" style={{ width: "100%" }}>
              <Text weight="semibold">Renge</Text>
              <Stack direction="horizontal" gap="4">
                <Text size="sm" color="fg-muted">Docs</Text>
                <Text size="sm" color="fg-muted">GitHub</Text>
              </Stack>
            </Stack>
          </Navbar>
        </div>
      </Demo>
      <Code>{`<Navbar sticky border>
  <Stack direction="horizontal" justify="between" style={{ width: "100%" }}>
    <Text weight="semibold">Brand</Text>
    <Stack direction="horizontal" gap="4">
      <a href="/docs">Docs</a>
    </Stack>
  </Stack>
</Navbar>`}</Code>
      <PropsTable>
        <PropRow name="sticky" type="boolean" defaultVal="false" desc="position: sticky, top: 0, z-index: 100." />
        <PropRow name="border" type="boolean" defaultVal="true" desc="Bottom border (border-subtle)." />
        <PropRow name="height" type="string" defaultVal='"56px"' desc="Min-height of the bar." />
        <PropRow name="paddingX" type="SpaceKey" defaultVal='"5"' desc="Horizontal padding." />
      </PropsTable>
    </ComponentSection>
  );
}

// ============================================================================
// Page
// ============================================================================

export default function DocsPage() {
  const [activeSection] = useState("stack");

  return (
    <ProfileProvider>
      {/* Top nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "var(--renge-color-bg)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--renge-space-5)", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Stack direction="horizontal" gap="5" align="center">
            <Link href="/" style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", textDecoration: "none", letterSpacing: "-0.01em" }}>Renge</Link>
            <span style={{ color: "var(--renge-color-border)", fontSize: "var(--renge-font-size-sm)" }}>/</span>
            <Text size="sm" color="fg-muted">Components</Text>
          </Stack>
          <Stack direction="horizontal" gap="4" align="center">
            <Link href="/#tokens" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", textDecoration: "none" }}>Tokens</Link>
            <Link href="/#start" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", textDecoration: "none" }}>Install</Link>
            <ProfileToggle />
          </Stack>
        </div>
      </div>

      {/* Layout */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--renge-space-5)", paddingTop: "calc(52px + var(--renge-space-7))", paddingBottom: "var(--renge-space-8)", display: "flex", gap: "var(--renge-space-8)", alignItems: "flex-start" }}>

        {/* Sidebar */}
        <Sidebar active={activeSection} />

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--renge-space-8)" }}>
          {/* Page header */}
          <div style={{ paddingBottom: "var(--renge-space-6)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>
            <p style={{ fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-accent)", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0, marginBottom: "var(--renge-space-3)" }}>@renge/react</p>
            <Heading level={1} size="3xl" style={{ marginBottom: "var(--renge-space-4)", fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.02em" }}>Components</Heading>
            <Text as="p" size="lg" color="fg-subtle" style={{ margin: 0, maxWidth: 560 }}>
              18 components built on the token system. Proportional. Accessible. No class names — every style references a Renge CSS variable.
            </Text>
          </div>

          {/* All sections */}
          <StackDocs />
          <GridDocs />
          <SectionDocs />
          <HeadingDocs />
          <TextDocs />
          <DividerDocs />
          <ButtonDocs />
          <InputDocs />
          <FormFieldDocs />
          <CardDocs />
          <BadgeDocs />
          <ChipDocs />
          <AvatarDocs />
          <StatDocs />
          <AlertDocs />
          <SpinnerDocs />
          <ProgressDocs />
          <NavbarDocs />
        </main>
      </div>
    </ProfileProvider>
  );
}
