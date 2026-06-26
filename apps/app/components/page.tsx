"use client";

import { useState } from "react";
import { Stack, Text, Heading } from "@renge-ui/react";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { ComponentSection, Demo, CodeBlock } from "@/components/ui/DocPrimitives";
import { useBreakpoint } from "@/lib/useBreakpoint";

export default function ComponentsPage() {
  const isMobile = useBreakpoint();
  const [rating, setRating] = useState(0);
  const [numberValue, setNumberValue] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Setup", description: "Configure your profile" },
    { label: "Tokens", description: "Explore the design tokens" },
    { label: "Components", description: "Build with components" },
    { label: "Deploy", description: "Ship your project" },
  ];

  return (
    <ProfileProvider>
      <Nav />
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: `calc(52px + var(--renge-space-8)) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"} var(--renge-space-9)`,
        display: "flex",
        flexDirection: "column",
        gap: "var(--renge-space-9)",
      }}>

        {/* Hero */}
        <header style={{ paddingBottom: "var(--renge-space-7)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>
          <p style={{
            fontSize: "var(--renge-font-size-sm)",
            color: "var(--renge-color-accent)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            margin: 0,
            marginBottom: "var(--renge-space-3)",
          }}>
            @renge-ui/react
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 72px)",
            color: "var(--renge-color-fg)",
            fontWeight: 400,
            margin: 0,
            marginBottom: "var(--renge-space-5)",
            letterSpacing: "-0.02em",
          }}>
            60+ component primitives.
          </h1>
          <p style={{
            fontSize: "var(--renge-font-size-lg)",
            color: "var(--renge-color-fg-subtle)",
            fontFamily: "var(--font-body)",
            lineHeight: "var(--renge-line-height-lg)",
            margin: 0,
            marginBottom: "var(--renge-space-6)",
            maxWidth: 560,
          }}>
            All consuming Renge tokens via inline styles. Zero CSS-in-JS runtime, no class names, no specificity battles. Fully typed with TypeScript.
          </p>
          <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
            <CodeBlock code={`pnpm add @renge-ui/react`} />
          </Stack>
        </header>

        {/* Input & Selection */}
        <ComponentSection
          id="input-selection"
          title="Input & Selection"
          description="Form inputs and multi-choice controls"
        >
          <Stack gap="6">
            {/* NumberInput */}
            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>NumberInput</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Controlled number input with increment/decrement buttons.
              </Text>
              <Demo label="Example">
                <div style={{ display: "inline-flex", alignItems: "stretch", border: "1px solid var(--renge-color-border)", borderRadius: "var(--renge-radius-2)" }}>
                  <button type="button" onClick={() => setNumberValue(Math.max(0, numberValue - 1))} style={{ padding: "var(--renge-space-2)", background: "var(--renge-color-bg)", border: "none", cursor: "pointer", color: "var(--renge-color-fg)" }}>−</button>
                  <input type="number" value={numberValue} onChange={(e) => setNumberValue(parseInt(e.target.value) || 0)} style={{ padding: "var(--renge-space-2) var(--renge-space-3)", border: "none", background: "var(--renge-color-bg)", color: "var(--renge-color-fg)", textAlign: "center", minWidth: "80px" }} />
                  <button type="button" onClick={() => setNumberValue(numberValue + 1)} style={{ padding: "var(--renge-space-2)", background: "var(--renge-color-bg)", border: "none", cursor: "pointer", color: "var(--renge-color-fg)" }}>+</button>
                </div>
              </Demo>
              <CodeBlock code={`<NumberInput
  value={count}
  onChange={setCount}
  min={0}
  max={100}
  step={1}
/>`} />
            </div>

            {/* Combobox */}
            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>Combobox</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Searchable dropdown with filtering — richer than native select.
              </Text>
              <Demo label="Example">
                <input
                  type="text"
                  placeholder="Search frameworks..."
                  style={{
                    padding: "var(--renge-space-2) var(--renge-space-3)",
                    border: "1px solid var(--renge-color-border)",
                    borderRadius: "var(--renge-radius-2)",
                    backgroundColor: "var(--renge-color-bg)",
                    color: "var(--renge-color-fg)",
                    width: "300px",
                  }}
                />
              </Demo>
              <CodeBlock code={`<Combobox
  options={[
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
  ]}
  value={selected}
  onChange={setSelected}
  placeholder="Search frameworks..."
/>`} />
            </div>

            {/* TagInput */}
            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>TagInput</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Controlled tag entry. Press Enter to add tags.
              </Text>
              <Demo label="Example">
                <div style={{ padding: "var(--renge-space-2)", border: "1px solid var(--renge-color-border)", borderRadius: "var(--renge-radius-2)", background: "var(--renge-color-bg)", display: "flex", flexWrap: "wrap", gap: "var(--renge-space-2)", width: "400px" }}>
                  {tags.map((tag) => (
                    <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: "var(--renge-space-1)", background: "var(--renge-color-accent)", color: "var(--renge-color-bg)", padding: "var(--renge-space-1) var(--renge-space-2)", borderRadius: "var(--renge-radius-1)", fontSize: "var(--renge-font-size-sm)" }}>
                      {tag}
                      <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer", padding: 0 }}>×</button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Add tags..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.currentTarget as HTMLInputElement).value) {
                        const value = (e.currentTarget as HTMLInputElement).value.trim();
                        if (!tags.includes(value)) {
                          setTags([...tags, value]);
                          (e.currentTarget as HTMLInputElement).value = "";
                        }
                      }
                    }}
                    style={{ flex: 1, minWidth: "100px", border: "none", background: "transparent", outline: "none", color: "var(--renge-color-fg)" }}
                  />
                </div>
              </Demo>
              <CodeBlock code={`<TagInput
  tags={tags}
  onChange={setTags}
  placeholder="Add tags..."
/>`} />
            </div>

            {/* DatePicker */}
            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>DatePicker</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Calendar-based date picker with month/year navigation.
              </Text>
              <Demo label="Example">
                <input type="date" defaultValue="2026-06-26" style={{ padding: "var(--renge-space-2) var(--renge-space-3)", border: "1px solid var(--renge-color-border)", borderRadius: "var(--renge-radius-2)", background: "var(--renge-color-bg)", color: "var(--renge-color-fg)" }} />
              </Demo>
              <CodeBlock code={`<DatePicker
  value={date}
  onChange={setDate}
  min="2024-01-01"
  max="2025-12-31"
/>`} />
            </div>

            {/* MultiSelect */}
            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>MultiSelect</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Select multiple values from a list.
              </Text>
              <Demo label="Example">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--renge-space-4)" }}>
                  {["Design", "Development", "Testing", "Documentation"].map((opt) => (
                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-2)", cursor: "pointer" }}>
                      <input type="checkbox" />
                      <span style={{ fontSize: "var(--renge-font-size-sm)" }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </Demo>
              <CodeBlock code={`<MultiSelect
  options={options}
  values={selected}
  onChange={setSelected}
/>`} />
            </div>
          </Stack>
        </ComponentSection>

        {/* Popovers & Menus */}
        <ComponentSection
          id="popovers-menus"
          title="Popovers & Menus"
          description="Floating content and interactive menus"
        >
          <Stack gap="6">
            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>Popover</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Positioned floating content — richer than Tooltip, appears on click.
              </Text>
              <Demo label="Example">
                <button style={{ padding: "var(--renge-space-2) var(--renge-space-3)", background: "var(--renge-color-accent)", color: "var(--renge-color-bg)", border: "none", borderRadius: "var(--renge-radius-2)", cursor: "pointer", fontWeight: 500 }}>Open Popover</button>
              </Demo>
              <CodeBlock code={`<Popover
  trigger={<Button>Open</Button>}
  content={<div>Popover content</div>}
  side="bottom"
/>`} />
            </div>

            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>DropdownMenu</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Menu with trigger + items. Closes on selection.
              </Text>
              <Demo label="Example">
                <button style={{ padding: "var(--renge-space-2) var(--renge-space-3)", background: "var(--renge-color-accent)", color: "var(--renge-color-bg)", border: "none", borderRadius: "var(--renge-radius-2)", cursor: "pointer", fontWeight: 500 }}>Menu</button>
              </Demo>
              <CodeBlock code={`<DropdownMenu
  trigger={<Button>Menu</Button>}
  items={[
    { label: 'Edit', onClick: () => {} },
    { label: 'Delete', onClick: () => {} },
  ]}
/>`} />
            </div>

            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>CommandPalette</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Keyboard-first command menu. Navigate with arrows, Enter to select.
              </Text>
              <Demo label="Example">
                <button style={{ padding: "var(--renge-space-2) var(--renge-space-3)", background: "var(--renge-color-accent)", color: "var(--renge-color-bg)", border: "none", borderRadius: "var(--renge-radius-2)", cursor: "pointer", fontWeight: 500 }}>Open Command Palette (Ctrl+K)</button>
              </Demo>
              <CodeBlock code={`<CommandPalette
  isOpen={open}
  onClose={() => setOpen(false)}
  items={[
    { id: '1', label: 'Save', description: 'Ctrl+S' },
    { id: '2', label: 'Open', description: 'Ctrl+O' },
  ]}
  placeholder="Type a command..."
/>`} />
            </div>

            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>ContextMenu</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Right-click context menu with items.
              </Text>
              <Demo label="Example">
                <div style={{ padding: "var(--renge-space-4)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)", textAlign: "center", color: "var(--renge-color-fg-muted)" }}>Right-click me</div>
              </Demo>
              <CodeBlock code={`<ContextMenu items={[
  { label: 'Copy', onClick: handleCopy },
  { label: 'Paste', onClick: handlePaste },
]}>
  <div>Right-click target</div>
</ContextMenu>`} />
            </div>

            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>HoverCard</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Hover-triggered floating content. Similar to Popover but for hover.
              </Text>
              <Demo label="Example">
                <button style={{ padding: "var(--renge-space-2) var(--renge-space-3)", background: "var(--renge-color-bg-subtle)", border: "1px solid var(--renge-color-border-subtle)", borderRadius: "var(--renge-radius-2)", cursor: "pointer" }}>Hover me</button>
              </Demo>
              <CodeBlock code={`<HoverCard
  trigger={<Button>Hover me</Button>}
  content={<div>Card content</div>}
/>`} />
            </div>
          </Stack>
        </ComponentSection>

        {/* Drawers & Overlays */}
        <ComponentSection
          id="drawers"
          title="Drawers & Overlays"
          description="Slide-in panels and modal content"
        >
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>Drawer</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
              Slide-in panel from any edge. Locks scroll on body while open.
            </Text>
            <Demo label="Example">
              <button style={{ padding: "var(--renge-space-2) var(--renge-space-3)", background: "var(--renge-color-accent)", color: "var(--renge-color-bg)", border: "none", borderRadius: "var(--renge-radius-2)", cursor: "pointer", fontWeight: 500 }}>Open Drawer</button>
            </Demo>
            <CodeBlock code={`<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  side="right"
>
  Drawer content
</Drawer>`} />
          </div>
        </ComponentSection>

        {/* Progress & Steps */}
        <ComponentSection
          id="progress"
          title="Progress & Steps"
          description="Process indicators and step navigation"
        >
          <div>
            <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>Stepper</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
              Multi-step process indicator. Click to navigate.
            </Text>
            <Demo label="Example">
              <div style={{ display: "flex", gap: "var(--renge-space-4)", alignItems: "flex-start", width: "100%", overflowX: "auto" }}>
                {steps.map((step, idx) => (
                  <div key={idx} style={{ flex: 1, cursor: "pointer", minWidth: "100px", display: "flex", flexDirection: "column", gap: "var(--renge-space-2)", opacity: idx <= currentStep ? 1 : 0.5 }} onClick={() => setCurrentStep(idx)}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: idx <= currentStep ? "var(--renge-color-accent)" : "var(--renge-color-bg-subtle)", color: idx <= currentStep ? "var(--renge-color-bg)" : "var(--renge-color-fg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--renge-font-size-sm)", fontWeight: 600 }}>
                        {idx <= currentStep ? "✓" : idx + 1}
                      </div>
                    </div>
                    <div style={{ fontSize: "var(--renge-font-size-sm)", fontWeight: 600, color: "var(--renge-color-fg)" }}>{step.label}</div>
                  </div>
                ))}
              </div>
            </Demo>
            <CodeBlock code={`<Stepper
  steps={steps}
  currentStep={current}
  onStepChange={setCurrent}
/>`} />
          </div>
        </ComponentSection>

        {/* Display & Content */}
        <ComponentSection
          id="display"
          title="Display & Content"
          description="Content display and visualization components"
        >
          <Stack gap="6">
            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>CodeBlock</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Display code in styled pre/code blocks. Supports inline and block modes.
              </Text>
              <Demo label="Example">
                <pre style={{ background: "var(--renge-color-bg-inverse)", padding: "var(--renge-space-3)", borderRadius: "var(--renge-radius-1)", fontSize: "var(--renge-font-size-xs)", margin: 0 }}>
                  <code style={{ color: "var(--renge-color-fg-inverse)" }}>const x = 42;</code>
                </pre>
              </Demo>
              <CodeBlock code={`<CodeBlock code={\`const x = 42;\`} />`} />
            </div>

            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>Rating</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Star rating input. Click to select rating.
              </Text>
              <Demo label="Example">
                <div style={{ display: "inline-flex", gap: "var(--renge-space-2)" }}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <button key={idx} type="button" onClick={() => setRating(idx + 1)} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "var(--renge-font-size-2xl)" }}>
                      {idx < rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </Demo>
              <CodeBlock code={`<Rating value={rating} onChange={setRating} max={5} />`} />
            </div>

            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>KBD</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Display keyboard shortcuts in styled kbd elements.
              </Text>
              <Demo label="Example">
                <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "monospace" }}>
                  {["Ctrl", "K"].map((key, idx) => (
                    <span key={idx}>
                      {idx > 0 && <span style={{ margin: "0 4px" }}>+</span>}
                      <span style={{ display: "inline-block", minWidth: "24px", height: "24px", lineHeight: "24px", textAlign: "center", background: "var(--renge-color-bg-subtle)", border: "1px solid var(--renge-color-border)", borderRadius: "var(--renge-radius-1)", padding: "0 var(--renge-space-1)", fontSize: "var(--renge-font-size-xs)", fontWeight: 600 }}>
                        {key}
                      </span>
                    </span>
                  ))}
                </div>
              </Demo>
              <CodeBlock code={`<KBD keys={['Ctrl', 'K']} />`} />
            </div>

            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>ScrollArea</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Custom scrollbar styling with smooth scroll behavior.
              </Text>
              <Demo label="Example">
                <div style={{ width: "300px", height: "150px", border: "1px solid var(--renge-color-border-subtle)", borderRadius: "var(--renge-radius-2)", overflow: "auto", padding: "var(--renge-space-3)" }}>
                  <div style={{ color: "var(--renge-color-fg-muted)", fontSize: "var(--renge-font-size-sm)" }}>
                    {Array.from({ length: 20 }).map((_, i) => <div key={i}>Item {i + 1}</div>)}
                  </div>
                </div>
              </Demo>
              <CodeBlock code={`<ScrollArea style={{ height: 300 }}>
  {/* Long content */}
</ScrollArea>`} />
            </div>
          </Stack>
        </ComponentSection>

        {/* Accessibility */}
        <ComponentSection
          id="accessibility"
          title="Accessibility Utilities"
          description="Tools for building inclusive, accessible interfaces"
        >
          <Stack gap="6">
            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>VisuallyHidden</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Screen reader-only content. Hidden from visual display but available to assistive technology.
              </Text>
              <CodeBlock code={`<VisuallyHidden>
  Screen reader only content
</VisuallyHidden>`} />
            </div>

            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>SkipLink</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Keyboard-accessible skip-to-main-content link. Appears on focus for keyboard navigation.
              </Text>
              <CodeBlock code={`<SkipLink href="#main" label="Skip to main content" />`} />
            </div>
          </Stack>
        </ComponentSection>

        {/* Summary */}
        <div style={{ padding: "var(--renge-space-6)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-3)", border: "1px solid var(--renge-color-border-subtle)" }}>
          <Heading level={2} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>Full Reference</Heading>
          <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
            All 60+ components are fully typed with TypeScript, support standard HTML props, and use Renge tokens exclusively. See the <a href="/react" style={{ color: "var(--renge-color-accent)", textDecoration: "underline" }}>@renge-ui/react README</a> for complete API documentation.
          </Text>
        </div>

      </div>
    </ProfileProvider>
  );
}
