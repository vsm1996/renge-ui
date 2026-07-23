"use client";

import { useState } from "react";
import {
  Stack, Grid, Text, Heading, Anchor,
  Card, Badge, Avatar, Chip, Stat, Alert,
  Button, IconButton, ButtonGroup,
  Input, Select, Textarea, Checkbox, Switch, Radio, RadioGroup, Slider,
  NumberInput, TagInput, Rating,
  Navbar, Breadcrumb, BreadcrumbItem, Tabs, TabList, Tab, TabPanel,
  Table, TableHead, TableBody, TableRow, TableHeader, TableCell,
  Accordion, AccordionItem, Skeleton,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Spinner, Progress, FormField, KBD, CopyButton,
  Pagination, Stepper, AspectRatio,
} from "@renge-ui/react";
import { ComponentSection, Demo, CodeBlock, PropsTable, PropRow, KeyboardTable, KeyboardRow } from "@/components/ui/DocPrimitives";
import { DocPageLayout } from "@/components/ui/DocPageLayout";
import { DocSidebar, type SidebarSection } from "@/components/ui/DocSidebar";

const COMPONENT_NAV: SidebarSection[] = [
  { label: "Components", items: [
    { id: "layout", label: "Layout" },
    { id: "typography", label: "Typography" },
    { id: "surfaces", label: "Surfaces" },
    { id: "interactive", label: "Interactive" },
    { id: "form-inputs", label: "Form Inputs" },
    { id: "advanced-inputs", label: "Advanced Inputs" },
    { id: "data-display", label: "Data Display" },
    { id: "tables-lists", label: "Tables & Lists" },
    { id: "navigation", label: "Navigation" },
    { id: "feedback", label: "Feedback & Status" },
    { id: "progress", label: "Progress & Steps" },
    { id: "drawers", label: "Drawers & Overlays" },
    { id: "display", label: "Display & Content" },
    { id: "accessibility", label: "Accessibility" },
  ]},
];

export default function ComponentsPage() {
  const [checkA, setCheckA] = useState(false);
  const [switchA, setSwitchA] = useState(false);
  const [radioVal, setRadioVal] = useState("opt1");
  const [sliderVal, setSliderVal] = useState(50);
  const [numVal, setNumVal] = useState(5);
  const [tags, setTags] = useState<string[]>(["renge", "design"]);
  const [rating, setRating] = useState(3);
  const [page, setPage] = useState(1);
  const [step, setStep] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const steps = [
    { label: "Install", description: "Add the package" },
    { label: "Configure", description: "Set up tokens" },
    { label: "Build", description: "Use components" },
    { label: "Ship", description: "Deploy" },
  ];

  return (
    <DocPageLayout sidebar={<DocSidebar sections={COMPONENT_NAV} footerLinks={[
      { href: "/", label: "Home" },
      { href: "/tailwind", label: "Tailwind" },
    ]} />}>

      {/* Hero */}
      <header style={{ paddingBottom: "var(--renge-space-7)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>
        <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-body)", margin: 0, marginBottom: "var(--renge-space-3)" }}>
          @renge-ui/react
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 72px)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-5)", letterSpacing: "-0.02em" }}>
          60+ component primitives.
        </h1>
        <p style={{ fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", lineHeight: "var(--renge-line-height-lg)", margin: 0, marginBottom: "var(--renge-space-6)", maxWidth: 560 }}>
          All consuming Renge tokens via inline styles. Zero CSS-in-JS runtime, no class names, no specificity battles.
        </p>
        <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
          <CodeBlock code={`pnpm add @renge-ui/react`} />
        </Stack>
      </header>

      {/* ── LAYOUT ──────────────────────────────────────────────────── */}
      <ComponentSection id="layout" title="Layout" description="Container and grid components for page structure.">
        <Stack gap="8">

          {/* Stack */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Stack</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Flexbox container with configurable direction, gap, and alignment.</Text>
            <Demo label="Horizontal / Vertical">
              <Stack direction="horizontal" gap="3">
                {["A", "B", "C"].map(l => <Badge key={l} variant="neutral">{l}</Badge>)}
              </Stack>
              <Stack direction="vertical" gap="2">
                {["X", "Y", "Z"].map(l => <Badge key={l} variant="accent">{l}</Badge>)}
              </Stack>
            </Demo>
            <CodeBlock code={`<Stack direction="horizontal" gap="3">
  <Badge>A</Badge>
  <Badge>B</Badge>
</Stack>

<Stack direction="vertical" gap="2" align="flex-start">
  <Button>Primary</Button>
  <Button variant="outline">Secondary</Button>
</Stack>`} />
            <PropsTable>
              <PropRow name="direction" type='"horizontal" | "vertical"' defaultVal='"vertical"' desc="Flex direction" />
              <PropRow name="gap" type='"1"–"8"' defaultVal='"4"' desc="Space between items (Renge space token)" />
              <PropRow name="align" type="string" defaultVal='"flex-start"' desc="align-items value" />
              <PropRow name="justify" type="string" defaultVal='"flex-start"' desc="justify-content value" />
              <PropRow name="wrap" type="boolean" defaultVal="false" desc="Allow items to wrap" />
            </PropsTable>
          </div>

          {/* Grid */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Grid</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>CSS Grid layout with configurable columns and gap.</Text>
            <Demo label="3-column grid">
              <Grid columns={3} gap="3" style={{ width: "100%" }}>
                {[1,2,3,4,5,6].map(n => (
                  <div key={n} style={{ padding: "var(--renge-space-3)", background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-1)", textAlign: "center", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)" }}>{n}</div>
                ))}
              </Grid>
            </Demo>
            <CodeBlock code={`<Grid columns={3} gap="4">
  <Card>One</Card>
  <Card>Two</Card>
  <Card>Three</Card>
</Grid>`} />
            <PropsTable>
              <PropRow name="columns" type="number | string" defaultVal="2" desc="Number of columns or a CSS grid-template-columns value" />
              <PropRow name="gap" type='"1"–"8"' defaultVal='"4"' desc="Gap between cells" />
            </PropsTable>
          </div>

          {/* AspectRatio */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>AspectRatio</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Constrains children to a fixed aspect ratio. Defaults to PHI (1.618).</Text>
            <Demo label="PHI ratio / 16:9">
              <div style={{ width: 160 }}>
                <AspectRatio>
                  <div style={{ background: "var(--renge-color-accent-subtle)", borderRadius: "var(--renge-radius-2)", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)" }}>φ 1:1.618</div>
                </AspectRatio>
              </div>
              <div style={{ width: 160 }}>
                <AspectRatio ratio={16/9}>
                  <div style={{ background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-2)", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)" }}>16:9</div>
                </AspectRatio>
              </div>
            </Demo>
            <CodeBlock code={`<AspectRatio>          {/* defaults to PHI = 1.618 */}
  <img src="..." />
</AspectRatio>

<AspectRatio ratio={16/9}>
  <video src="..." />
</AspectRatio>`} />
            <PropsTable>
              <PropRow name="ratio" type="number" defaultVal="1.618" desc="Width-to-height ratio. Defaults to PHI." />
            </PropsTable>
          </div>

        </Stack>
      </ComponentSection>

      {/* ── TYPOGRAPHY ──────────────────────────────────────────────── */}
      <ComponentSection id="typography" title="Typography" description="Text, headings, links, and separators.">
        <Stack gap="8">

          {/* Heading */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Heading</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Semantic heading elements with token-driven sizes independent of level.</Text>
            <Demo label="All sizes">
              <Stack gap="2">
                {(["4xl","3xl","2xl","xl","lg"] as const).map(size => (
                  <Heading key={size} level={2} size={size}>Heading {size}</Heading>
                ))}
              </Stack>
            </Demo>
            <CodeBlock code={`<Heading level={1} size="4xl">Display heading</Heading>
<Heading level={2} size="xl">Section title</Heading>
<Heading level={3} size="lg">Subsection</Heading>`} />
            <PropsTable>
              <PropRow name="level" type="1 | 2 | 3 | 4 | 5 | 6" defaultVal="2" desc="HTML heading element level (h1–h6)" />
              <PropRow name="size" type='"lg" | "xl" | "2xl" | "3xl" | "4xl"' defaultVal="maps to level" desc="Visual size — decoupled from semantic level" />
              <PropRow name="color" type="string" defaultVal='"fg"' desc="Token color alias" />
            </PropsTable>
          </div>

          {/* Text */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Text</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Inline or block text with token-driven sizing and color.</Text>
            <Demo label="Sizes & colors">
              <Stack gap="2">
                <Text size="xl" color="fg">Extra large text</Text>
                <Text size="base" color="fg-subtle">Base body text</Text>
                <Text size="sm" color="fg-muted">Small muted text</Text>
                <Text size="xs" color="accent">Extra small accent</Text>
              </Stack>
            </Demo>
            <CodeBlock code={`<Text size="lg" color="fg">Primary text</Text>
<Text size="sm" color="fg-subtle">Secondary text</Text>
<Text as="p" size="base">Block paragraph</Text>`} />
            <PropsTable>
              <PropRow name="as" type="ElementType" defaultVal='"span"' desc='HTML element to render ("p", "span", "label", etc.)' />
              <PropRow name="size" type='"xs" | "sm" | "base" | "lg" | "xl"' defaultVal='"base"' desc="Font size from the Renge type scale" />
              <PropRow name="color" type="string" defaultVal='"fg"' desc='Token color alias: "fg", "fg-subtle", "fg-muted", "accent"' />
              <PropRow name="weight" type="string" defaultVal="—" desc="Font weight override" />
            </PropsTable>
          </div>

          {/* Anchor */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Anchor</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Styled link with underline and color control.</Text>
            <Demo label="Variants">
              <Anchor href="#">Default link</Anchor>
              <Anchor href="#" variant="subtle">Subtle link</Anchor>
              <Anchor href="#" target="_blank" rel="noopener noreferrer">External link ↗</Anchor>
            </Demo>
            <CodeBlock code={`<Anchor href="/docs">Read the docs</Anchor>
<Anchor href="https://..." target="_blank" rel="noopener noreferrer">Open in new tab</Anchor>
<Anchor href="#section" variant="subtle">Subtle</Anchor>`} />
            <PropsTable>
              <PropRow name="href" type="string" defaultVal="—" desc="Link destination" />
              <PropRow name="variant" type='"default" | "subtle"' defaultVal='"default"' desc="Color and underline style" />
              <PropRow name="underline" type="boolean" defaultVal="false" desc="Always show underline (default: underline on hover)" />
            </PropsTable>
          </div>

        </Stack>
      </ComponentSection>

      {/* ── SURFACES ────────────────────────────────────────────────── */}
      <ComponentSection id="surfaces" title="Surfaces" description="Container components for grouping content.">
        <Stack gap="8">

          {/* Card */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Card</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Content container with elevated, outlined, or filled appearance.</Text>
            <Demo label="Variants">
              <Card variant="elevated" padding="4" style={{ minWidth: 160 }}>
                <Text size="sm" color="fg-subtle">elevated</Text>
                <Text>Card content</Text>
              </Card>
              <Card variant="outlined" padding="4" style={{ minWidth: 160 }}>
                <Text size="sm" color="fg-subtle">outlined</Text>
                <Text>Card content</Text>
              </Card>
              <Card variant="filled" padding="4" style={{ minWidth: 160 }}>
                <Text size="sm" color="fg-subtle">filled</Text>
                <Text>Card content</Text>
              </Card>
            </Demo>
            <CodeBlock code={`<Card variant="elevated" padding="4" radius="3">
  <Heading level={3} size="lg">Title</Heading>
  <Text color="fg-subtle">Description text here.</Text>
</Card>`} />
            <PropsTable>
              <PropRow name="variant" type='"elevated" | "outlined" | "filled"' defaultVal='"elevated"' desc="Visual style of the card surface" />
              <PropRow name="padding" type='"1"–"8"' defaultVal='"4"' desc="Inner padding (Renge space token)" />
              <PropRow name="radius" type='"1" | "2" | "3" | "full"' defaultVal='"2"' desc="Border radius" />
            </PropsTable>
          </div>

        </Stack>
      </ComponentSection>

      {/* ── INTERACTIVE ─────────────────────────────────────────────── */}
      <ComponentSection id="interactive" title="Interactive" description="Buttons and trigger controls.">
        <Stack gap="8">

          {/* Button */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Button</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Primary action trigger with variant, size, and state options.</Text>
            <Demo label="Variants">
              <Button variant="solid">Solid</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="solid" disabled>Disabled</Button>
            </Demo>
            <Demo label="Sizes">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </Demo>
            <Demo label="Color schemes">
              <Button colorScheme="accent">Accent</Button>
              <Button variant="outline">Default</Button>
              <Button colorScheme="danger">Danger</Button>
            </Demo>
            <CodeBlock code={`<Button variant="solid" size="md" colorScheme="accent">
  Save changes
</Button>

<Button variant="outline" size="sm">
  Cancel
</Button>

<Button variant="solid" colorScheme="danger" onClick={handleDelete}>
  Delete
</Button>`} />
            <PropsTable>
              <PropRow name="variant" type='"solid" | "outline" | "ghost"' defaultVal='"solid"' desc="Visual style" />
              <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Height and padding" />
              <PropRow name="colorScheme" type='"accent" | "danger" | "success"' defaultVal='"accent"' desc="Color token set applied to the button" />
              <PropRow name="fullWidth" type="boolean" defaultVal="false" desc="Stretch button to fill its container" />
              <PropRow name="disabled" type="boolean" defaultVal="false" desc="Prevents interaction, reduces opacity" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["Enter", "Space"]} action="Activate the button" />
              <KeyboardRow keys={["Tab"]} action="Move focus to next focusable element" />
              <KeyboardRow keys={["Shift", "Tab"]} action="Move focus to previous focusable element" />
            </KeyboardTable>
          </div>

          {/* IconButton */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>IconButton</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Square button for icon-only actions. Requires an aria-label.</Text>
            <Demo label="Sizes">
              <IconButton aria-label="Close" size="sm">✕</IconButton>
              <IconButton aria-label="Close" size="md">✕</IconButton>
              <IconButton aria-label="Close" size="lg">✕</IconButton>
            </Demo>
            <Demo label="Variants">
              <IconButton aria-label="Add" variant="solid">+</IconButton>
              <IconButton aria-label="Add" variant="outline">+</IconButton>
              <IconButton aria-label="Add" variant="ghost">+</IconButton>
            </Demo>
            <CodeBlock code={`<IconButton aria-label="Close dialog" size="md" variant="ghost">
  ✕
</IconButton>`} />
            <PropsTable>
              <PropRow name="aria-label" type="string" defaultVal="required" desc="Accessible label (no visible text)" />
              <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Square dimension" />
              <PropRow name="variant" type='"solid" | "outline" | "ghost"' defaultVal='"ghost"' desc="Visual style" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["Enter", "Space"]} action="Activate the button" />
            </KeyboardTable>
          </div>

          {/* CopyButton */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>CopyButton</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Copies a value to clipboard. Briefly shows a confirmation state.</Text>
            <Demo label="Example">
              <CopyButton value="pnpm add @renge-ui/react" label="Copy command" successLabel="Copied!" />
            </Demo>
            <CodeBlock code={`<CopyButton
  value="pnpm add @renge-ui/react"
  label="Copy"
  successLabel="Copied!"
  timeout={2100}
/>`} />
            <PropsTable>
              <PropRow name="value" type="string" defaultVal="required" desc="Text to copy to clipboard" />
              <PropRow name="label" type="string" defaultVal='"Copy"' desc="Button label in default state" />
              <PropRow name="successLabel" type="string" defaultVal='"Copied!"' desc="Label shown after successful copy" />
              <PropRow name="timeout" type="number" defaultVal="2100" desc="ms before reverting to default label" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["Enter", "Space"]} action="Copy text to clipboard" />
            </KeyboardTable>
          </div>

          {/* ButtonGroup */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>ButtonGroup</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Groups related buttons with flush, attached borders.</Text>
            <Demo label="Attached">
              <ButtonGroup attached>
                <Button variant="outline" size="sm">Day</Button>
                <Button variant="outline" size="sm">Week</Button>
                <Button variant="solid" size="sm">Month</Button>
              </ButtonGroup>
            </Demo>
            <Demo label="Detached">
              <ButtonGroup attached={false}>
                <Button variant="outline" size="sm">Bold</Button>
                <Button variant="outline" size="sm">Italic</Button>
                <Button variant="outline" size="sm">Underline</Button>
              </ButtonGroup>
            </Demo>
            <CodeBlock code={`<ButtonGroup attached>
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="solid">Month</Button>
</ButtonGroup>`} />
            <PropsTable>
              <PropRow name="attached" type="boolean" defaultVal="true" desc="When true, buttons share borders and have no gap" />
              <PropRow name="orientation" type='"horizontal" | "vertical"' defaultVal='"horizontal"' desc="Layout direction" />
            </PropsTable>
          </div>

        </Stack>
      </ComponentSection>

      {/* ── FORM INPUTS ─────────────────────────────────────────────── */}
      <ComponentSection id="form-inputs" title="Form Inputs" description="Text and value input controls.">
        <Stack gap="8">

          {/* Input */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Input</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Text input with size, state, and type variants. Pair with FormField for labels.</Text>
            <Demo label="Sizes">
              <Input size="sm" placeholder="Small" />
              <Input size="md" placeholder="Medium" />
              <Input size="lg" placeholder="Large" />
            </Demo>
            <Demo label="States">
              <Input placeholder="Default" />
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Error state" state="error" />
            </Demo>
            <CodeBlock code={`<FormField label="Email" htmlFor="email" required>
  <Input id="email" type="email" placeholder="you@example.com" />
</FormField>

<FormField label="Username" htmlFor="user" errorText="Username is taken">
  <Input id="user" state="error" value="taken_name" />
</FormField>`} />
            <PropsTable>
              <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Height and font size" />
              <PropRow name="state" type='"default" | "error" | "success"' defaultVal='"default"' desc="Visual validation state" />
              <PropRow name="fullWidth" type="boolean" defaultVal="false" desc="Stretches input to fill container" />
              <PropRow name="disabled" type="boolean" defaultVal="false" desc="Prevents interaction" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["Tab"]} action="Focus the input" />
              <KeyboardRow keys={["Enter"]} action="Submit enclosing form" />
            </KeyboardTable>
          </div>

          {/* Select */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Select</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Styled native select element.</Text>
            <Demo label="Sizes">
              <Select size="sm">
                <option>Option A</option>
                <option>Option B</option>
              </Select>
              <Select size="md">
                <option>Option A</option>
                <option>Option B</option>
              </Select>
              <Select size="lg">
                <option>Option A</option>
                <option>Option B</option>
              </Select>
            </Demo>
            <CodeBlock code={`<FormField label="Country" htmlFor="country">
  <Select id="country">
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
  </Select>
</FormField>`} />
            <PropsTable>
              <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Height and font size" />
              <PropRow name="fullWidth" type="boolean" defaultVal="false" desc="Stretches to fill container" />
              <PropRow name="disabled" type="boolean" defaultVal="false" desc="Prevents interaction" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["↑", "↓"]} action="Navigate between options" />
              <KeyboardRow keys={["Enter", "Space"]} action="Open dropdown / select focused option" />
              <KeyboardRow keys={["Escape"]} action="Close dropdown without selecting" />
            </KeyboardTable>
          </div>

          {/* Textarea */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Textarea</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Multi-line text input.</Text>
            <Demo label="Example">
              <Textarea placeholder="Write something…" rows={4} style={{ width: "100%" }} />
            </Demo>
            <CodeBlock code={`<FormField label="Message" htmlFor="msg">
  <Textarea id="msg" placeholder="Write something…" rows={4} />
</FormField>`} />
            <PropsTable>
              <PropRow name="rows" type="number" defaultVal="3" desc="Initial visible row count" />
              <PropRow name="resize" type='"none" | "vertical" | "both"' defaultVal='"vertical"' desc="CSS resize direction" />
              <PropRow name="state" type='"default" | "error"' defaultVal='"default"' desc="Validation state" />
            </PropsTable>
          </div>

          {/* Checkbox */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Checkbox</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Binary toggle with label, checked, and indeterminate states.</Text>
            <Demo label="States">
              <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
              <Checkbox label="Checked" checked={true} onChange={() => {}} />
              <Checkbox label="Disabled" checked={false} disabled onChange={() => {}} />
              <Checkbox label="Controlled" checked={checkA} onChange={() => setCheckA(p => !p)} />
            </Demo>
            <CodeBlock code={`const [agreed, setAgreed] = useState(false);

<Checkbox
  label="I agree to the terms"
  checked={agreed}
  onChange={() => setAgreed(p => !p)}
/>

{/* Indeterminate (partial selection) */}
<Checkbox
  label="Select all"
  checked={false}
  indeterminate
  onChange={handleSelectAll}
/>`} />
            <PropsTable>
              <PropRow name="label" type="string" defaultVal="—" desc="Visible label text" />
              <PropRow name="checked" type="boolean" defaultVal="false" desc="Controlled checked state" />
              <PropRow name="indeterminate" type="boolean" defaultVal="false" desc="Partial-selection state (renders a dash)" />
              <PropRow name="disabled" type="boolean" defaultVal="false" desc="Prevents interaction" />
              <PropRow name="onChange" type="() => void" defaultVal="—" desc="Called on user toggle" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["Space"]} action="Toggle checked / unchecked" />
            </KeyboardTable>
          </div>

          {/* Switch */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Switch</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Toggle switch with golden-ratio track proportions.</Text>
            <Demo label="States">
              <Switch label="Off" checked={false} onChange={() => {}} />
              <Switch label="On" checked={true} onChange={() => {}} />
              <Switch label="Controlled" checked={switchA} onChange={() => setSwitchA(p => !p)} />
              <Switch label="Disabled" checked={false} disabled onChange={() => {}} />
            </Demo>
            <CodeBlock code={`const [enabled, setEnabled] = useState(false);

<Switch
  label="Enable notifications"
  checked={enabled}
  onChange={() => setEnabled(p => !p)}
/>`} />
            <PropsTable>
              <PropRow name="label" type="string" defaultVal="—" desc="Visible label text" />
              <PropRow name="checked" type="boolean" defaultVal="false" desc="Controlled on/off state" />
              <PropRow name="disabled" type="boolean" defaultVal="false" desc="Prevents interaction" />
              <PropRow name="onChange" type="() => void" defaultVal="—" desc="Called on user toggle" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["Space"]} action="Toggle on / off" />
            </KeyboardTable>
          </div>

          {/* RadioGroup */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>RadioGroup / Radio</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Single-choice selection group. Inner dot sized at outer/PHI.</Text>
            <Demo label="Vertical group">
              <RadioGroup value={radioVal} onChange={setRadioVal} name="plan">
                <Radio value="opt1" label="Starter — Free" />
                <Radio value="opt2" label="Pro — $12/mo" />
                <Radio value="opt3" label="Enterprise — Custom" />
              </RadioGroup>
            </Demo>
            <CodeBlock code={`const [plan, setPlan] = useState("starter");

<RadioGroup value={plan} onChange={setPlan} name="plan">
  <Radio value="starter" label="Starter — Free" />
  <Radio value="pro" label="Pro — $12/mo" />
  <Radio value="enterprise" label="Enterprise — Custom" />
</RadioGroup>`} />
            <PropsTable>
              <PropRow name="name" type="string" defaultVal="required" desc="HTML name attribute shared by all radios in the group" />
              <PropRow name="value" type="string" defaultVal="—" desc="Currently selected value (controlled)" />
              <PropRow name="defaultValue" type="string" defaultVal="—" desc="Initial value (uncontrolled)" />
              <PropRow name="onChange" type="(value: string) => void" defaultVal="—" desc="Called when selection changes" />
              <PropRow name="direction" type='"vertical" | "horizontal"' defaultVal='"vertical"' desc="Layout direction" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["↑", "↓", "←", "→"]} action="Move selection through radio options" />
              <KeyboardRow keys={["Space"]} action="Select the focused radio" />
            </KeyboardTable>
          </div>

          {/* Slider */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Slider</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Range input. Current value: <strong>{sliderVal}</strong></Text>
            <Demo label="Controlled">
              <div style={{ width: "100%" }}>
                <Slider
                  min={0}
                  max={100}
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number((e.target as HTMLInputElement).value))}
                />
              </div>
            </Demo>
            <CodeBlock code={`const [value, setValue] = useState(50);

<Slider
  min={0}
  max={100}
  step={1}
  value={value}
  onChange={(e) => setValue(Number(e.target.value))}
/>`} />
            <PropsTable>
              <PropRow name="value" type="number" defaultVal="—" desc="Controlled value" />
              <PropRow name="min" type="number" defaultVal="0" desc="Minimum value" />
              <PropRow name="max" type="number" defaultVal="100" desc="Maximum value" />
              <PropRow name="step" type="number" defaultVal="1" desc="Increment step" />
              <PropRow name="onChange" type="(value: number) => void" defaultVal="—" desc="Called on change" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["←", "↓"]} action="Decrease value by one step" />
              <KeyboardRow keys={["→", "↑"]} action="Increase value by one step" />
              <KeyboardRow keys={["Home"]} action="Jump to minimum" />
              <KeyboardRow keys={["End"]} action="Jump to maximum" />
            </KeyboardTable>
          </div>

          {/* FormField */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>FormField</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Wrapper that adds a label, helper text, and error message to any input.</Text>
            <Demo label="With helper / error">
              <FormField label="Email" htmlFor="f-email" helperText="We'll never share your email.">
                <Input id="f-email" type="email" placeholder="you@example.com" />
              </FormField>
              <FormField label="Username" htmlFor="f-user" errorText="That username is taken." required>
                <Input id="f-user" state="error" defaultValue="john_doe" />
              </FormField>
            </Demo>
            <CodeBlock code={`<FormField
  label="Email"
  htmlFor="email"
  helperText="We'll never share this."
  required
>
  <Input id="email" type="email" />
</FormField>

<FormField label="Username" htmlFor="user" errorText="Already taken">
  <Input id="user" state="error" />
</FormField>`} />
            <PropsTable>
              <PropRow name="label" type="string" defaultVal="required" desc="Visible label text" />
              <PropRow name="htmlFor" type="string" defaultVal="—" desc="Links label to an input id" />
              <PropRow name="helperText" type="string" defaultVal="—" desc="Shown below input in muted color" />
              <PropRow name="errorText" type="string" defaultVal="—" desc="Shown below input in danger color; overrides helperText" />
              <PropRow name="required" type="boolean" defaultVal="false" desc="Appends a * marker to the label" />
            </PropsTable>
          </div>

        </Stack>
      </ComponentSection>

      {/* ── ADVANCED INPUTS ─────────────────────────────────────────── */}
      <ComponentSection id="advanced-inputs" title="Advanced Inputs" description="Complex multi-value input components.">
        <Stack gap="8">

          {/* NumberInput */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>NumberInput</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Number input with − / + stepper buttons. Current value: <strong>{numVal}</strong></Text>
            <Demo label="Controlled">
              <NumberInput value={numVal} min={0} max={20} onChange={setNumVal} />
            </Demo>
            <CodeBlock code={`const [qty, setQty] = useState(1);

<NumberInput
  value={qty}
  min={1}
  max={99}
  step={1}
  onChange={setQty}
/>`} />
            <PropsTable>
              <PropRow name="value" type="number" defaultVal="—" desc="Controlled value" />
              <PropRow name="min" type="number" defaultVal="—" desc="Lower bound (decrement button disables at min)" />
              <PropRow name="max" type="number" defaultVal="—" desc="Upper bound" />
              <PropRow name="step" type="number" defaultVal="1" desc="Increment amount" />
              <PropRow name="onChange" type="(value: number) => void" defaultVal="—" desc="Called on change" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["↑"]} action="Increment by step" />
              <KeyboardRow keys={["↓"]} action="Decrement by step" />
            </KeyboardTable>
          </div>

          {/* TagInput */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>TagInput</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Controlled tag entry. Press Enter or comma to add; Backspace to remove last.</Text>
            <Demo label="Controlled">
              <div style={{ width: "100%" }}>
                <TagInput tags={tags} onChange={setTags} placeholder="Add a tag…" />
              </div>
            </Demo>
            <CodeBlock code={`const [tags, setTags] = useState(["design", "system"]);

<TagInput
  tags={tags}
  onChange={setTags}
  placeholder="Add a tag…"
/>`} />
            <PropsTable>
              <PropRow name="tags" type="string[]" defaultVal="[]" desc="Controlled array of tag strings" />
              <PropRow name="onChange" type="(tags: string[]) => void" defaultVal="—" desc="Called on add or remove" />
              <PropRow name="placeholder" type="string" defaultVal='"Add tags…"' desc="Input placeholder text" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["Enter", ","]} action="Add current input text as a tag" />
              <KeyboardRow keys={["Backspace"]} action="Remove last tag when input is empty" />
            </KeyboardTable>
          </div>

          {/* Rating */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Rating</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Star rating input. Current: <strong>{rating} / 5</strong></Text>
            <Demo label="Controlled / Readonly">
              <Rating value={rating} max={5} onChange={setRating} />
              <Rating value={4} max={5} readonly />
            </Demo>
            <CodeBlock code={`const [stars, setStars] = useState(0);

<Rating value={stars} max={5} onChange={setStars} />

{/* Read-only display */}
<Rating value={4.0} max={5} readonly />`} />
            <PropsTable>
              <PropRow name="value" type="number" defaultVal="0" desc="Number of filled stars" />
              <PropRow name="max" type="number" defaultVal="5" desc="Total number of stars" />
              <PropRow name="readonly" type="boolean" defaultVal="false" desc="Disables interaction when true" />
              <PropRow name="onChange" type="(value: number) => void" defaultVal="—" desc="Called on star click" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["←"]} action="Decrease rating" />
              <KeyboardRow keys={["→"]} action="Increase rating" />
              <KeyboardRow keys={["Home"]} action="Set to minimum" />
              <KeyboardRow keys={["End"]} action="Set to maximum" />
            </KeyboardTable>
          </div>

        </Stack>
      </ComponentSection>

      {/* ── DATA DISPLAY ────────────────────────────────────────────── */}
      <ComponentSection id="data-display" title="Data Display" description="Components for displaying structured information.">
        <Stack gap="8">

          {/* Badge */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Badge</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Label badge with semantic color schemes.</Text>
            <Demo label="Variants (color)">
              <Badge variant="accent">Accent</Badge>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
            </Demo>
            <Demo label="Sizes">
              <Badge variant="accent" size="sm">Small</Badge>
              <Badge variant="accent" size="md">Medium</Badge>
              <Badge variant="accent" size="lg">Large</Badge>
            </Demo>
            <CodeBlock code={`<Badge variant="success">Verified</Badge>
<Badge variant="warning">Pending review</Badge>
<Badge variant="danger">Rejected</Badge>
<Badge variant="neutral" size="sm">Draft</Badge>`} />
            <PropsTable>
              <PropRow name="variant" type='"accent" | "neutral" | "success" | "warning" | "danger" | "info"' defaultVal='"neutral"' desc="Semantic color scheme" />
              <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Badge size" />
            </PropsTable>
          </div>

          {/* Avatar */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Avatar</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>User avatar with image support and initials fallback.</Text>
            <Demo label="Sizes & fallback">
              <Avatar initials="VM" size="2" />
              <Avatar initials="VM" size="3" />
              <Avatar initials="VM" size="4" />
              <Avatar src="https://github.com/github.png" alt="GitHub" size="3" />
            </Demo>
            <CodeBlock code={`{/* Initials fallback */}
<Avatar initials="VM" size="3" />

{/* With image */}
<Avatar src="/avatar.png" alt="Vanessa Martin" size="4" />

{/* Square shape */}
<Avatar initials="VM" size="3" shape="square" />`} />
            <PropsTable>
              <PropRow name="initials" type="string" defaultVal="—" desc="Text rendered as initials (max 2 chars); shown when no src" />
              <PropRow name="src" type="string" defaultVal="—" desc="Image URL; falls back to initials if omitted or fails" />
              <PropRow name="alt" type="string" defaultVal="—" desc="Alt text for image" />
              <PropRow name="size" type='"1" | "2" | "3" | "4" | "5"' defaultVal='"3"' desc="Diameter — Fibonacci steps (1=smallest, 5=largest)" />
              <PropRow name="shape" type='"circle" | "square"' defaultVal='"circle"' desc="Border radius shape" />
            </PropsTable>
          </div>

          {/* Stat */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Stat</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Metric display with optional label and trend indicator.</Text>
            <Demo label="Examples">
              <Stat label="Total Revenue" value="$84,240" trend="up" trendValue="+12% this month" />
              <Stat label="Active Users" value="3,481" trend="down" trendValue="-4% vs last week" />
              <Stat label="Uptime" value="99.98%" />
            </Demo>
            <CodeBlock code={`<Stat
  label="Monthly Revenue"
  value="$84,240"
  trend="up"
  trendValue="+12% this month"
/>`} />
            <PropsTable>
              <PropRow name="label" type="string" defaultVal="—" desc="Metric label above the value" />
              <PropRow name="value" type="string" defaultVal="—" desc="Primary metric value" />
              <PropRow name="trend" type='"up" | "down"' defaultVal="—" desc="Arrow direction for trend indicator" />
              <PropRow name="trendValue" type="string" defaultVal="—" desc="Trend description text" />
            </PropsTable>
          </div>

          {/* Alert */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Alert</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Status message with semantic color and optional title.</Text>
            <Demo label="Status variants">
              <Stack gap="3" style={{ width: "100%" }}>
                <Alert status="info" title="Heads up">This feature is in beta.</Alert>
                <Alert status="success" title="Saved">Your changes have been saved.</Alert>
                <Alert status="warning" title="Deprecation">This API is deprecated.</Alert>
                <Alert status="danger" title="Error">Something went wrong.</Alert>
              </Stack>
            </Demo>
            <CodeBlock code={`<Alert status="success" title="Published">
  Your post is now live.
</Alert>

<Alert status="danger" title="Failed to save">
  Please check your connection and try again.
</Alert>`} />
            <PropsTable>
              <PropRow name="status" type='"info" | "success" | "warning" | "error"' defaultVal='"info"' desc="Semantic status; controls icon and color" />
              <PropRow name="title" type="string" defaultVal="—" desc="Bold heading above the message" />
              <PropRow name="onClose" type="() => void" defaultVal="—" desc="If provided, renders a close button" />
            </PropsTable>
          </div>

        </Stack>
      </ComponentSection>

      {/* ── TABLES & LISTS ──────────────────────────────────────────── */}
      <ComponentSection id="tables-lists" title="Tables & Lists" description="Structured data display and expandable content.">
        <Stack gap="8">

          {/* Table */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Table</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Data table with bordered and striped variants.</Text>
            <Demo label="Example">
              <div style={{ width: "100%" }}>
                <Table bordered>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Package</TableHeader>
                      <TableHeader>Version</TableHeader>
                      <TableHeader>Status</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      ["@renge-ui/tokens", "2.8.2", "stable"],
                      ["@renge-ui/react", "3.9.0", "stable"],
                      ["@renge-ui/tailwind", "2.12.0", "stable"],
                      ["@renge-ui/petals", "1.2.0", "stable"],
                      ["@renge-ui/vue", "1.2.0", "stable"],
                      ["@renge-ui/svelte", "1.2.0", "stable"],
                      ["@renge-ui/test-utils", "1.1.0", "stable"],
                    ].map(([pkg, ver, status], i) => (
                      <TableRow key={i} index={i}>
                        <TableCell><code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--renge-font-size-sm)" }}>{pkg}</code></TableCell>
                        <TableCell muted>{ver}</TableCell>
                        <TableCell><Badge variant="success">{status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Demo>
            <CodeBlock code={`<Table bordered striped>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Status</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow index={0}>
      <TableCell>Alpha</TableCell>
      <TableCell><Badge variant="success">Active</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>`} />
            <PropsTable>
              <PropRow name="striped" type="boolean" defaultVal="false" desc="Alternates row backgrounds" />
              <PropRow name="bordered" type="boolean" defaultVal="false" desc="Adds outer border and radius" />
            </PropsTable>
          </div>

          {/* Accordion */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Accordion</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Collapsible sections. By default only one item can be open at a time.</Text>
            <Demo label="Example">
              <div style={{ width: "100%" }}>
                <Accordion>
                  <AccordionItem id="a1" title="What is Renge?">
                    A design system built on natural mathematics — PHI, Fibonacci, phyllotaxis.
                  </AccordionItem>
                  <AccordionItem id="a2" title="How do I install it?">
                    Run <code style={{ fontFamily: "var(--font-mono)" }}>pnpm add @renge-ui/react</code> and wrap your app in a provider.
                  </AccordionItem>
                  <AccordionItem id="a3" title="Does it support dark mode?">
                    Yes. All color tokens have light and dark variants toggled via the <code style={{ fontFamily: "var(--font-mono)" }}>data-mode</code> attribute.
                  </AccordionItem>
                </Accordion>
              </div>
            </Demo>
            <CodeBlock code={`<Accordion multiple>
  <AccordionItem id="q1" title="What is Renge?">
    A design system built on natural mathematics.
  </AccordionItem>
  <AccordionItem id="q2" title="How do I install?">
    pnpm add @renge-ui/react
  </AccordionItem>
</Accordion>`} />
            <PropsTable>
              <PropRow name="multiple" type="boolean" defaultVal="false" desc="Allow multiple items open simultaneously" />
              <PropRow name="value" type="string | string[]" defaultVal="—" desc="Controlled open item id(s)" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["Tab"]} action="Move focus between accordion headers" />
              <KeyboardRow keys={["Enter", "Space"]} action="Toggle the focused item open/closed" />
            </KeyboardTable>
          </div>

          {/* Skeleton */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Skeleton</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Animated loading placeholder. Use in place of content while data is fetching.</Text>
            <Demo label="Shapes">
              <Stack gap="3" style={{ width: "100%" }}>
                <Skeleton height="1.5rem" width="60%" />
                <Skeleton height="1rem" width="90%" />
                <Skeleton height="1rem" width="75%" />
                <Stack direction="horizontal" gap="3">
                  <Skeleton variant="circular" height="48px" width="48px" />
                  <Stack gap="2" style={{ flex: 1 }}>
                    <Skeleton height="1rem" width="50%" />
                    <Skeleton height="0.8rem" width="80%" />
                  </Stack>
                </Stack>
              </Stack>
            </Demo>
            <CodeBlock code={`{/* Text placeholder */}
<Skeleton variant="text" lines={3} />

{/* Avatar placeholder (circular) */}
<Skeleton variant="circular" height="48px" width="48px" />

{/* Card / image placeholder */}
<Skeleton variant="rectangular" height="200px" />`} />
            <PropsTable>
              <PropRow name="variant" type='"text" | "circular" | "rectangular"' defaultVal='"rectangular"' desc="Shape variant" />
              <PropRow name="width" type="string" defaultVal='"100%"' desc="CSS width value" />
              <PropRow name="height" type="string" defaultVal='"1rem"' desc="CSS height value" />
              <PropRow name="lines" type="number" defaultVal="3" desc="Line count when variant='text'" />
            </PropsTable>
          </div>

        </Stack>
      </ComponentSection>

      {/* ── NAVIGATION ──────────────────────────────────────────────── */}
      <ComponentSection id="navigation" title="Navigation" description="Routing, wayfinding, and page navigation components.">
        <Stack gap="8">

          {/* Navbar */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Navbar</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Navigation bar with sticky positioning and border control.</Text>
            <Demo label="Example">
              <div style={{ width: "100%", border: "1px solid var(--renge-color-border-subtle)", borderRadius: "var(--renge-radius-2)", overflow: "hidden" }}>
                <Navbar border height="48px" paddingX="4">
                  <Stack direction="horizontal" gap="4" style={{ width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    <Text weight="semibold">Renge</Text>
                    <Stack direction="horizontal" gap="3">
                      <Anchor href="#">Docs</Anchor>
                      <Anchor href="#">Components</Anchor>
                      <Button size="sm" variant="solid">Get Started</Button>
                    </Stack>
                  </Stack>
                </Navbar>
              </div>
            </Demo>
            <CodeBlock code={`<Navbar sticky border height="56px">
  <Stack direction="horizontal" justify="space-between" style={{ width: "100%" }}>
    <Logo />
    <Stack direction="horizontal" gap="4">
      <Anchor href="/docs">Docs</Anchor>
      <Button size="sm">Get Started</Button>
    </Stack>
  </Stack>
</Navbar>`} />
            <PropsTable>
              <PropRow name="sticky" type="boolean" defaultVal="false" desc="Pins to top on scroll (position: sticky)" />
              <PropRow name="border" type="boolean" defaultVal="true" desc="Shows bottom border" />
              <PropRow name="height" type="string" defaultVal='"56px"' desc="Bar height as CSS value" />
              <PropRow name="paddingX" type='"1"–"8"' defaultVal='"5"' desc="Horizontal padding" />
            </PropsTable>
          </div>

          {/* Tabs */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Tabs</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Accessible tab interface with controlled state and keyboard navigation.</Text>
            <Demo label="Example">
              <div style={{ width: "100%" }}>
                <Tabs defaultTab="overview">
                  <TabList>
                    <Tab value="overview">Overview</Tab>
                    <Tab value="usage">Usage</Tab>
                    <Tab value="api">API</Tab>
                  </TabList>
                  <TabPanel value="overview">
                    <Text color="fg-subtle">Overview content goes here.</Text>
                  </TabPanel>
                  <TabPanel value="usage">
                    <Text color="fg-subtle">Usage examples go here.</Text>
                  </TabPanel>
                  <TabPanel value="api">
                    <Text color="fg-subtle">Full API reference goes here.</Text>
                  </TabPanel>
                </Tabs>
              </div>
            </Demo>
            <CodeBlock code={`<Tabs defaultTab="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="api">API</Tab>
  </TabList>
  <TabPanel value="overview">
    Content for Overview tab.
  </TabPanel>
  <TabPanel value="api">
    Content for API tab.
  </TabPanel>
</Tabs>

{/* Controlled */}
<Tabs value={activeTab} onChange={setActiveTab}>
  ...
</Tabs>`} />
            <PropsTable>
              <PropRow name="defaultTab" type="string" defaultVal="—" desc="Initially active tab (uncontrolled)" />
              <PropRow name="value" type="string" defaultVal="—" desc="Active tab (controlled)" />
              <PropRow name="onChange" type="(id: string) => void" defaultVal="—" desc="Called when active tab changes" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["←", "→"]} action="Move focus between tab triggers" />
              <KeyboardRow keys={["Home"]} action="Focus the first tab" />
              <KeyboardRow keys={["End"]} action="Focus the last tab" />
              <KeyboardRow keys={["Tab"]} action="Move focus into the active tab panel" />
            </KeyboardTable>
          </div>

          {/* Breadcrumb */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Breadcrumb</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Breadcrumb trail marking the current location in a hierarchy.</Text>
            <Demo label="Example">
              <Breadcrumb>
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbItem href="/components">Components</BreadcrumbItem>
                <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
              </Breadcrumb>
            </Demo>
            <CodeBlock code={`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem current>Getting Started</BreadcrumbItem>
</Breadcrumb>`} />
            <PropsTable>
              <PropRow name="separator" type="ReactNode" defaultVal="›" desc="Custom separator between items" />
            </PropsTable>
          </div>

          {/* Pagination */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Pagination</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Page controls with ellipsis for large page counts. Current page: <strong>{page}</strong></Text>
            <Demo label="Controlled">
              <Pagination total={20} page={page} onChange={setPage} />
            </Demo>
            <CodeBlock code={`const [page, setPage] = useState(1);

<Pagination
  total={20}
  page={page}
  siblings={1}
  onChange={setPage}
/>`} />
            <PropsTable>
              <PropRow name="total" type="number" defaultVal="required" desc="Total number of pages" />
              <PropRow name="page" type="number" defaultVal="required" desc="Currently active page (controlled)" />
              <PropRow name="siblings" type="number" defaultVal="1" desc="Pages shown either side of the active page" />
              <PropRow name="onChange" type="(page: number) => void" defaultVal="—" desc="Called on page click" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["Tab"]} action="Move between page buttons" />
              <KeyboardRow keys={["Enter", "Space"]} action="Navigate to the focused page" />
            </KeyboardTable>
          </div>

        </Stack>
      </ComponentSection>

      {/* ── FEEDBACK & STATUS ───────────────────────────────────────── */}
      <ComponentSection id="feedback" title="Feedback & Status" description="Loading states, progress, and overlays.">
        <Stack gap="8">

          {/* Spinner */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Spinner</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Animated loading indicator.</Text>
            <Demo label="Sizes">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </Demo>
            <CodeBlock code={`<Spinner size="md" />

{/* With loading state */}
<Button disabled={isLoading}>
  {isLoading ? <Spinner size="sm" /> : "Submit"}
</Button>`} />
            <PropsTable>
              <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Spinner diameter" />
              <PropRow name="color" type="string" defaultVal='"accent"' desc="Token color" />
            </PropsTable>
          </div>

          {/* Progress */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Progress</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Horizontal progress bar with value and color scheme options.</Text>
            <Demo label="Values">
              <Stack gap="3" style={{ width: "100%" }}>
                <Progress value={25} color="accent" />
                <Progress value={61.8} color="success" />
                <Progress value={100} color="success" />
                <Progress value={38} color="warning" />
              </Stack>
            </Demo>
            <CodeBlock code={`<Progress value={61.8} color="accent" />
<Progress value={100} color="success" aria-label="Upload complete" />`} />
            <PropsTable>
              <PropRow name="value" type="number" defaultVal="0" desc="Progress percentage (0–100)" />
              <PropRow name="color" type='"accent" | "success" | "warning" | "danger"' defaultVal='"accent"' desc="Fill color" />
            </PropsTable>
          </div>

          {/* Modal */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Modal</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Accessible dialog rendered into a portal. Traps focus and locks scroll.</Text>
            <Demo label="Example">
              <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            </Demo>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="md">
              <ModalHeader>
                <Heading level={2} size="lg">Confirm deletion</Heading>
              </ModalHeader>
              <ModalBody>
                <Text color="fg-subtle">This action cannot be undone. Are you sure you want to delete this item?</Text>
              </ModalBody>
              <ModalFooter>
                <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="solid" colorScheme="danger" onClick={() => setModalOpen(false)}>Delete</Button>
              </ModalFooter>
            </Modal>
            <CodeBlock code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open modal</Button>

<Modal open={open} onClose={() => setOpen(false)} size="md">
  <ModalHeader>
    <Heading level={2} size="lg">Confirm deletion</Heading>
  </ModalHeader>
  <ModalBody>
    <Text>This action cannot be undone.</Text>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button colorScheme="danger" onClick={handleDelete}>Delete</Button>
  </ModalFooter>
</Modal>`} />
            <PropsTable>
              <PropRow name="open" type="boolean" defaultVal="false" desc="Controls visibility" />
              <PropRow name="onClose" type="() => void" defaultVal="—" desc="Called when backdrop clicked or Escape pressed" />
              <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Max-width of the dialog" />
            </PropsTable>
            <KeyboardTable>
              <KeyboardRow keys={["Tab"]} action="Move focus forward through dialog elements (trapped inside modal)" />
              <KeyboardRow keys={["Shift", "Tab"]} action="Move focus backward through dialog elements" />
              <KeyboardRow keys={["Escape"]} action="Close the modal" />
            </KeyboardTable>
          </div>

        </Stack>
      </ComponentSection>

      {/* ── PROGRESS & STEPS ────────────────────────────────────────── */}
      <ComponentSection id="progress" title="Progress & Steps" description="Multi-step flows and process indicators.">
        <div>
          <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Stepper</Heading>
          <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Horizontal step indicator for multi-step flows. Current step: <strong>{step + 1} / {steps.length}</strong></Text>
          <Demo label="Controlled">
            <div style={{ width: "100%" }}>
              <Stepper steps={steps} currentStep={step} onStepChange={setStep} />
              <Stack direction="horizontal" gap="3" style={{ marginTop: "var(--renge-space-5)" }}>
                <Button size="sm" variant="outline" disabled={step === 0} onClick={() => setStep(p => p - 1)}>Back</Button>
                <Button size="sm" disabled={step === steps.length - 1} onClick={() => setStep(p => p + 1)}>Next</Button>
              </Stack>
            </div>
          </Demo>
          <CodeBlock code={`const [step, setStep] = useState(0);

const steps = [
  { label: "Install", description: "Add the package" },
  { label: "Configure", description: "Set up tokens" },
  { label: "Build", description: "Use components" },
  { label: "Ship", description: "Deploy" },
];

<Stepper
  steps={steps}
  currentStep={step}
  onStepChange={setStep}
/>`} />
          <PropsTable>
            <PropRow name="steps" type="{ label: string; description?: string }[]" defaultVal="required" desc="Array of step objects" />
            <PropRow name="currentStep" type="number" defaultVal="0" desc="Zero-indexed active step" />
            <PropRow name="onStepChange" type="(step: number) => void" defaultVal="—" desc="Called when a step is clicked" />
          </PropsTable>
        </div>
      </ComponentSection>

      {/* ── DISPLAY & CONTENT ───────────────────────────────────────── */}
      <ComponentSection id="display" title="Display & Content" description="Utility display components.">
        <Stack gap="8">

          {/* KBD */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>KBD</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Keyboard shortcut indicator with monospace styling.</Text>
            <Demo label="Examples">
              <Stack direction="horizontal" gap="2" style={{ alignItems: "center" }}>
                <KBD>⌘</KBD><Text>+</Text><KBD>K</KBD>
              </Stack>
              <Stack direction="horizontal" gap="2" style={{ alignItems: "center" }}>
                <KBD>Ctrl</KBD><Text>+</Text><KBD>Shift</KBD><Text>+</Text><KBD>P</KBD>
              </Stack>
            </Demo>
            <CodeBlock code={`Press <KBD>⌘</KBD> + <KBD>K</KBD> to open search.`} />
          </div>

          {/* Chip */}
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>Chip</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Small inline tag — dismissible or selectable.</Text>
            <Demo label="Variants">
              <Chip>Default</Chip>
              <Chip variant="accent">Accent</Chip>
              <Chip variant="success">Success</Chip>
              <Chip variant="warning">Warning</Chip>
              <Chip onDismiss={() => {}}>Dismissible</Chip>
            </Demo>
            <CodeBlock code={`<Chip variant="accent">React</Chip>
<Chip variant="neutral" onDismiss={() => removeTag("design")}>Design</Chip>`} />
            <PropsTable>
              <PropRow name="variant" type='"neutral" | "accent" | "success" | "warning" | "danger" | "info"' defaultVal='"neutral"' desc="Semantic color scheme" />
              <PropRow name="onDismiss" type="() => void" defaultVal="—" desc="If provided, renders a × dismiss button" />
            </PropsTable>
          </div>

        </Stack>
      </ComponentSection>

      {/* ── ACCESSIBILITY ───────────────────────────────────────────── */}
      <ComponentSection id="accessibility" title="Accessibility Utilities" description="Components for building inclusive interfaces.">
        <Stack gap="6">
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>VisuallyHidden</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Renders content visually hidden but accessible to screen readers.</Text>
            <CodeBlock code={`<button aria-label="Close">
  <VisuallyHidden>Close dialog</VisuallyHidden>
  ✕
</button>`} />
          </div>
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-2)" }}>SkipLink</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>Keyboard-accessible link that appears on focus, allowing users to skip to main content.</Text>
            <CodeBlock code={`{/* Place at the very top of your layout */}
<SkipLink href="#main">Skip to main content</SkipLink>

<Navbar>…</Navbar>
<main id="main">…</main>`} />
          </div>
        </Stack>
      </ComponentSection>

      {/* Summary */}
      <div style={{ padding: "var(--renge-space-6)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-3)", border: "1px solid var(--renge-color-border-subtle)" }}>
        <Heading level={2} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>Full Reference</Heading>
        <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
          All 60+ components are fully typed with TypeScript, accept standard HTML props via spread, and use Renge tokens exclusively for styling. See{" "}
          <Anchor href="https://www.npmjs.com/package/@renge-ui/react" target="_blank" rel="noopener noreferrer">@renge-ui/react on npm</Anchor>{" "}or the{" "}
          <Anchor href="https://github.com/vsm1996/renge-ui/blob/main/packages/react/README.md" target="_blank" rel="noopener noreferrer">GitHub README</Anchor>{" "}for the complete API.
        </Text>
      </div>

    </DocPageLayout>
  );
}
