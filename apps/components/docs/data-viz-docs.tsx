"use client";

// Data Viz Docs — component documentation.

import {
  EnergyRing, Pulse, FlowField, Stack, Text,
} from "@renge-ui/react";
import { PropRow, PropsTable, Demo, Code, ComponentSection } from "@/components/ui/DocPrimitives";

export function EnergyRingDocs() {
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


export function PulseDocs() {
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


export function FlowFieldDocs() {
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
