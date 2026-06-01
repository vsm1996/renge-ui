"use client";

import { useState } from "react";
import { Stack, Text, Heading, Badge, ToastProvider } from "@renge-ui/react";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { Code } from "@/components/ui/DocPrimitives";
import { StackDocs, GridDocs, SectionDocs, ContainerDocs, AspectRatioDocs, SpacerDocs } from "@/components/docs/layout-docs";
import { HeadingDocs, TextDocs, DividerDocs, AnchorDocs } from "@/components/docs/typography-docs";
import {
  ButtonDocs, InputDocs, FormFieldDocs, SelectDocs, CheckboxDocs, RadioDocs,
  SwitchDocs, TextareaDocs, SliderDocs, IconButtonDocs, ButtonGroupDocs, CopyButtonDocs,
} from "@/components/docs/data-input-docs";
import { CardDocs, BadgeDocs, ChipDocs, AvatarDocs, StatDocs, TooltipDocs, SkeletonDocs } from "@/components/docs/display-docs";
import { TableDocs, AccordionDocs, TimelineDocs } from "@/components/docs/data-display-docs";
import { AlertDocs, SpinnerDocs, ProgressDocs, ToastDocs, ModalDocs } from "@/components/docs/feedback-docs";
import { NavbarDocs, TabsDocs, BreadcrumbDocs, PaginationDocs } from "@/components/docs/navigation-docs";
import { EnergyRingDocs, PulseDocs, FlowFieldDocs } from "@/components/docs/data-viz-docs";

// ─── Sidebar nav ─────────────────────────────────────────────────────────────

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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [activeSection] = useState("stack");
  const isMobile = useBreakpoint();

  return (
    <ToastProvider>
    <ProfileProvider>
      <Nav />

      <div style={{ maxWidth: 1260, margin: "0 auto", paddingLeft: isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)", paddingRight: isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)", paddingTop: "calc(52px + var(--renge-space-7))", paddingBottom: "var(--renge-space-8)", display: "flex", gap: "var(--renge-space-8)", alignItems: "flex-start" }}>

        {!isMobile && <Sidebar active={activeSection} />}

        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--renge-space-8)" }}>

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

        </main>
      </div>
    </ProfileProvider>
    </ToastProvider>
  );
}
