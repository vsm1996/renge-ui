"use client";

// Layout Docs — component documentation.

import {
  Stack, Grid, Section, Container, AspectRatio, Spacer, Text, Heading, Badge,
} from "@renge-ui/react";
import { PHI } from "@renge-ui/tokens";
import { PropRow, PropsTable, Demo, Code, Callout, ComponentSection } from "@/components/ui/DocPrimitives";

export function StackDocs() {
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


export function GridDocs() {
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


export function SectionDocs() {
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


export function ContainerDocs() {
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


export function AspectRatioDocs() {
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


export function SpacerDocs() {
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
