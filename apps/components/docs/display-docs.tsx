"use client";

// Display Docs — component documentation.

import { useState } from "react";
import {
  Card, Badge, Chip, Avatar, Stat, Tooltip, Skeleton, Stack, Text, Button,
} from "@renge-ui/react";
import { PropRow, PropsTable, Demo, Code, Callout, ComponentSection } from "@/components/ui/DocPrimitives";

export function CardDocs() {
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


export function BadgeDocs() {
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


export function ChipDocs() {
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


export function AvatarDocs() {
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


export function StatDocs() {
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


export function TooltipDocs() {
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


export function SkeletonDocs() {
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
