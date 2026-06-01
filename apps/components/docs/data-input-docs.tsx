"use client";

// Data Input Docs — component documentation.

import { useState } from "react";
import {
  Button, Input, Select, Checkbox, Radio, RadioGroup, Switch, Textarea, Slider,
  FormField, Stack, Text, Badge, IconButton, ButtonGroup, CopyButton, Card,
} from "@renge-ui/react";
import { PHI } from "@renge-ui/tokens";
import { PropRow, PropsTable, Demo, Code, Callout, ComponentSection } from "@/components/ui/DocPrimitives";

export function ButtonDocs() {
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


export function InputDocs() {
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


export function FormFieldDocs() {
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


export function SelectDocs() {
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


export function CheckboxDocs() {
  const [checked, setChecked] = useState(false);
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


export function RadioDocs() {
  const [size, setSize] = useState("md");
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


export function SwitchDocs() {
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


export function TextareaDocs() {
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


export function SliderDocs() {
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


export function IconButtonDocs() {
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


export function ButtonGroupDocs() {
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


export function CopyButtonDocs() {
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

// ============================================================================
// Page
// ============================================================================
