"use client";

import { useState } from "react";
import { Stack, Text, Heading } from "@renge-ui/react";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { ComponentSection, Demo, CodeBlock } from "@/components/ui/DocPrimitives";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { Sidebar } from "./Sidebar";

export default function ComponentsPage() {
  const isMobile = useBreakpoint();
  const [rating, setRating] = useState(0);
  const [numberValue, setNumberValue] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Setup", description: "Configure" },
    { label: "Tokens", description: "Explore" },
    { label: "Components", description: "Build" },
    { label: "Deploy", description: "Ship" },
  ];

  return (
    <ProfileProvider>
      <Nav />
      <div style={{ maxWidth: 1260, margin: "0 auto", paddingLeft: isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)", paddingRight: isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)", paddingTop: "calc(52px + var(--renge-space-7))", paddingBottom: "var(--renge-space-8)", display: "flex", gap: "var(--renge-space-8)", alignItems: "flex-start", overflowX: "clip" }}>

        {!isMobile && <Sidebar active="layout" />}

        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--renge-space-8)" }}>

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
              All consuming Renge tokens via inline styles. Zero CSS-in-JS runtime, no class names, no specificity battles.
            </p>
            <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
              <CodeBlock code={`pnpm add @renge-ui/react`} />
            </Stack>
          </header>

          {/* Layout */}
          <ComponentSection id="layout" title="Layout" description="Container and grid components for page structure">
            <Stack gap="6">
              {["Stack", "Grid", "Section", "Container", "AspectRatio", "Spacer"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "Stack" && "Flexbox layout container with gap and alignment controls"}
                    {comp === "Grid" && "CSS Grid layout container with responsive columns"}
                    {comp === "Section" && "Page section with max-width constraint and auto-centering"}
                    {comp === "Container" && "Max-width wrapper for centering content"}
                    {comp === "AspectRatio" && "Constrains children to a fixed aspect ratio (default: PHI)"}
                    {comp === "Spacer" && "Empty spacer that occupies a token-sized gap"}
                  </Text>
                  <Demo label="Example">
                    <div style={{ padding: "var(--renge-space-3)", background: "var(--renge-color-accent)", opacity: 0.3, borderRadius: "var(--renge-radius-1)", minWidth: "100px", minHeight: "40px" }} />
                  </Demo>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Typography */}
          <ComponentSection id="typography" title="Typography" description="Text and heading components">
            <Stack gap="6">
              {["Text", "Heading", "Anchor", "Divider"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "Text" && "Inline or block text with token-driven sizing"}
                    {comp === "Heading" && "Semantic heading with automatic size defaults per level"}
                    {comp === "Anchor" && "Styled link with underline and color variants"}
                    {comp === "Divider" && "Visual separator with orientation and spacing"}
                  </Text>
                  <Demo label="Example">
                    <div style={{ color: "var(--renge-color-fg)" }}>
                      {comp === "Text" && "Sample text"}
                      {comp === "Heading" && <h2>Heading</h2>}
                      {comp === "Anchor" && <a style={{ color: "var(--renge-color-accent)" }} href="#123">Link</a>}
                      {comp === "Divider" && <hr style={{ border: "none", borderTop: "1px solid var(--renge-color-border)" }} />}
                    </div>
                  </Demo>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Surfaces */}
          <ComponentSection id="surfaces" title="Surfaces" description="Container components for content">
            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>Card</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Content container with elevated, outlined, or filled variants
              </Text>
              <Demo label="Example">
                <div style={{ padding: "var(--renge-space-4)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-3)", border: "1px solid var(--renge-color-border-subtle)", maxWidth: "300px" }}>
                  <div style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg)" }}>Card content</div>
                </div>
              </Demo>
              <CodeBlock code={`<Card variant="elevated" padding="4" radius="3">
  Content
</Card>`} />
            </div>
          </ComponentSection>

          {/* Interactive */}
          <ComponentSection id="interactive" title="Interactive" description="Buttons and interactive controls">
            <Stack gap="6">
              {["Button", "IconButton", "ButtonGroup", "CopyButton"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "Button" && "Primary action button with size and variant options"}
                    {comp === "IconButton" && "Square button for icon-only actions"}
                    {comp === "ButtonGroup" && "Groups related buttons with flush borders"}
                    {comp === "CopyButton" && "Button that copies value to clipboard with confirmation"}
                  </Text>
                  <Demo label="Example">
                    <button style={{ padding: "var(--renge-space-2) var(--renge-space-3)", background: "var(--renge-color-accent)", color: "var(--renge-color-bg)", border: "none", borderRadius: "var(--renge-radius-2)", cursor: "pointer", fontWeight: 500 }}>
                      {comp}
                    </button>
                  </Demo>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Form Inputs */}
          <ComponentSection id="form-inputs" title="Form Inputs" description="Text and value input controls">
            <Stack gap="6">
              {["Input", "Select", "Textarea", "Checkbox", "Radio", "RadioGroup", "Switch", "Slider"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "Input" && "Text input with size and state variants"}
                    {comp === "Select" && "Styled native select element"}
                    {comp === "Textarea" && "Multi-line text input"}
                    {comp === "Checkbox" && "Checkbox with label and indeterminate state"}
                    {comp === "Radio" && "Single-choice radio button"}
                    {comp === "RadioGroup" && "Group of radio buttons"}
                    {comp === "Switch" && "Toggle switch with label options"}
                    {comp === "Slider" && "Range input with optional PHI markers"}
                  </Text>
                  <Demo label="Example">
                    <input type="text" placeholder="Sample input" style={{ padding: "var(--renge-space-2) var(--renge-space-3)", border: "1px solid var(--renge-color-border)", borderRadius: "var(--renge-radius-2)", background: "var(--renge-color-bg)", color: "var(--renge-color-fg)" }} />
                  </Demo>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Advanced Inputs */}
          <ComponentSection id="advanced-inputs" title="Advanced Inputs" description="Complex input components">
            <Stack gap="6">
              {["Combobox", "MultiSelect", "TagInput", "NumberInput", "DatePicker"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "Combobox" && "Searchable dropdown with filtering"}
                    {comp === "MultiSelect" && "Select multiple values from a list"}
                    {comp === "TagInput" && "Controlled tag entry with add/remove"}
                    {comp === "NumberInput" && "Number input with increment/decrement buttons"}
                    {comp === "DatePicker" && "Calendar-based date picker"}
                  </Text>
                  <Demo label="Example">
                    <input type="text" placeholder="Search..." style={{ padding: "var(--renge-space-2) var(--renge-space-3)", border: "1px solid var(--renge-color-border)", borderRadius: "var(--renge-radius-2)", background: "var(--renge-color-bg)", color: "var(--renge-color-fg)", maxWidth: "200px" }} />
                  </Demo>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Data Display */}
          <ComponentSection id="data-display" title="Data Display" description="Components for displaying data">
            <Stack gap="6">
              {["Badge", "Avatar", "Chip", "Stat"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "Badge" && "Label badge with semantic color variants"}
                    {comp === "Avatar" && "User avatar with fallback initials"}
                    {comp === "Chip" && "Small inline tag — dismissible or selectable"}
                    {comp === "Stat" && "Metric display with optional trend indicator"}
                  </Text>
                  <Demo label="Example">
                    <span style={{ display: "inline-block", background: "var(--renge-color-accent)", color: "var(--renge-color-bg)", padding: "var(--renge-space-1) var(--renge-space-2)", borderRadius: "var(--renge-radius-1)", fontSize: "var(--renge-font-size-sm)" }}>Badge</span>
                  </Demo>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Tables & Lists */}
          <ComponentSection id="tables-lists" title="Tables & Lists" description="Components for displaying structured data">
            <Stack gap="6">
              {["Table", "Tooltip", "Accordion", "Timeline", "Skeleton"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "Table" && "Data table with striped and hoverable variants"}
                    {comp === "Tooltip" && "Floating label shown on hover/focus"}
                    {comp === "Accordion" && "Collapsible sections with optional multiple open"}
                    {comp === "Timeline" && "Vertical sequence of events with status"}
                    {comp === "Skeleton" && "Loading placeholder with shape variants"}
                  </Text>
                  <Demo label="Example">
                    <div style={{ padding: "var(--renge-space-2)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-1)" }}>Sample</div>
                  </Demo>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Navigation */}
          <ComponentSection id="navigation" title="Navigation" description="Components for navigation and routing">
            <Stack gap="6">
              {["Navbar", "Tabs", "Breadcrumb", "Pagination"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "Navbar" && "Navigation bar with sticky positioning"}
                    {comp === "Tabs" && "Accessible tab interface with controlled value"}
                    {comp === "Breadcrumb" && "Breadcrumb trail with custom separators"}
                    {comp === "Pagination" && "Page number controls"}
                  </Text>
                  <Demo label="Example">
                    <div style={{ padding: "var(--renge-space-2)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-1)", textAlign: "center" }}>Navigation</div>
                  </Demo>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Feedback & Status */}
          <ComponentSection id="feedback" title="Feedback & Status" description="Components for user feedback and status">
            <Stack gap="6">
              {["Alert", "Spinner", "Progress", "Toast", "Modal"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "Alert" && "Alert message with status-driven color"}
                    {comp === "Spinner" && "Loading indicator"}
                    {comp === "Progress" && "Progress bar with value"}
                    {comp === "Toast" && "Toast notification system"}
                    {comp === "Modal" && "Accessible dialog rendered via portal"}
                  </Text>
                  <Demo label="Example">
                    <div style={{ padding: "var(--renge-space-2)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-1)" }}>Status</div>
                  </Demo>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Popovers & Menus */}
          <ComponentSection id="popovers-menus" title="Popovers & Menus" description="Floating content and interactive menus">
            <Stack gap="6">
              {["Popover", "DropdownMenu", "CommandPalette", "ContextMenu", "HoverCard"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "Popover" && "Positioned floating content on click"}
                    {comp === "DropdownMenu" && "Menu with trigger and items"}
                    {comp === "CommandPalette" && "Keyboard-first command menu"}
                    {comp === "ContextMenu" && "Right-click context menu"}
                    {comp === "HoverCard" && "Hover-triggered floating content"}
                  </Text>
                  <Demo label="Example">
                    <button style={{ padding: "var(--renge-space-2) var(--renge-space-3)", background: "var(--renge-color-accent)", color: "var(--renge-color-bg)", border: "none", borderRadius: "var(--renge-radius-2)", cursor: "pointer", fontSize: "var(--renge-font-size-sm)" }}>Open</button>
                  </Demo>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Drawers & Overlays */}
          <ComponentSection id="drawers" title="Drawers & Overlays" description="Slide-in panels and overlay content">
            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>Drawer</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Slide-in panel from any edge with backdrop
              </Text>
              <Demo label="Example">
                <button style={{ padding: "var(--renge-space-2) var(--renge-space-3)", background: "var(--renge-color-accent)", color: "var(--renge-color-bg)", border: "none", borderRadius: "var(--renge-radius-2)", cursor: "pointer" }}>Open Drawer</button>
              </Demo>
              <CodeBlock code={`<Drawer isOpen={open} onClose={() => setOpen(false)} side="right">
  Content
</Drawer>`} />
            </div>
          </ComponentSection>

          {/* Progress & Steps */}
          <ComponentSection id="progress" title="Progress & Steps" description="Process indicators and step navigation">
            <div>
              <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>Stepper</Heading>
              <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Multi-step process indicator
              </Text>
              <Demo label="Example">
                <div style={{ display: "flex", gap: "var(--renge-space-4)" }}>
                  {steps.map((step, idx) => (
                    <div key={idx} style={{ textAlign: "center" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: idx === currentStep ? "var(--renge-color-accent)" : "var(--renge-color-bg-subtle)", color: idx === currentStep ? "var(--renge-color-bg)" : "var(--renge-color-fg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--renge-font-size-sm)", fontWeight: 600, margin: "0 auto" }}>
                        {idx + 1}
                      </div>
                      <div style={{ fontSize: "var(--renge-font-size-xs)", marginTop: "var(--renge-space-1)" }}>{step.label}</div>
                    </div>
                  ))}
                </div>
              </Demo>
              <CodeBlock code={`<Stepper steps={steps} currentStep={current} onStepChange={setCurrent} />`} />
            </div>
          </ComponentSection>

          {/* Display & Content */}
          <ComponentSection id="display" title="Display & Content" description="Content display and visualization">
            <Stack gap="6">
              {["CodeBlock", "Rating", "KBD", "ScrollArea"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "CodeBlock" && "Styled code display block"}
                    {comp === "Rating" && "Star rating input"}
                    {comp === "KBD" && "Keyboard shortcut display"}
                    {comp === "ScrollArea" && "Custom scrollbar styling"}
                  </Text>
                  <Demo label="Example">
                    {comp === "Rating" && (
                      <div style={{ display: "inline-flex", gap: "var(--renge-space-2)" }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span key={i} style={{ cursor: "pointer", fontSize: "var(--renge-font-size-lg)" }}>★</span>
                        ))}
                      </div>
                    )}
                    {comp !== "Rating" && (
                      <div style={{ padding: "var(--renge-space-2)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-1)" }}>{comp}</div>
                    )}
                  </Demo>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Accessibility */}
          <ComponentSection id="accessibility" title="Accessibility Utilities" description="Tools for building inclusive interfaces">
            <Stack gap="6">
              {["VisuallyHidden", "SkipLink"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "VisuallyHidden" && "Screen reader-only content"}
                    {comp === "SkipLink" && "Keyboard-accessible skip link"}
                  </Text>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Data Visualization */}
          <ComponentSection id="data-viz" title="Data Visualization" description="Animated and interactive visualizations">
            <Stack gap="6">
              {["EnergyRing", "Pulse", "FlowField"].map(comp => (
                <div key={comp}>
                  <Heading level={3} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>{comp}</Heading>
                  <Text as="p" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-4)" }}>
                    {comp === "EnergyRing" && "Animated pulsing ring indicator"}
                    {comp === "Pulse" && "Pulsing animation wrapper"}
                    {comp === "FlowField" && "Animated flow-field canvas visualization"}
                  </Text>
                  <CodeBlock code={`<${comp} />`} />
                </div>
              ))}
            </Stack>
          </ComponentSection>

          {/* Summary */}
          <div style={{ padding: "var(--renge-space-6)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-3)", border: "1px solid var(--renge-color-border-subtle)" }}>
            <Heading level={2} size="lg" style={{ marginBottom: "var(--renge-space-3)" }}>Full Reference</Heading>
            <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
              All 60+ components are fully typed with TypeScript, support standard HTML props, and use Renge tokens exclusively. See the <a href="https://www.npmjs.com/package/@renge-ui/react" style={{ color: "var(--renge-color-accent)", textDecoration: "underline" }} target="_blank" rel="noopener noreferrer">@renge-ui/react npm package</a> or <a href="https://github.com/vsm1996/renge-ui/blob/main/packages/react/README.md" style={{ color: "var(--renge-color-accent)", textDecoration: "underline" }} target="_blank" rel="noopener noreferrer">GitHub README</a> for complete API documentation.
            </Text>
          </div>

        </main>
      </div>
    </ProfileProvider>
  );
}
