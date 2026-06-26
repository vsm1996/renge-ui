"use client";

// Typography Docs — component documentation.

import {
  Text, Heading, Divider, Anchor, Stack,
} from "@renge-ui/react";
import { PropRow, PropsTable, Demo, Code, ComponentSection } from "@/components/ui/DocPrimitives";

export function HeadingDocs() {
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


export function TextDocs() {
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


export function DividerDocs() {
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


export function AnchorDocs() {
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
