"use client";

import { useState } from "react";
import { Stack, Text, Heading, Badge, ToastProvider } from "@renge-ui/react";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { Code } from "@/components/ui/DocPrimitives";
import { Sidebar } from "./components/Sidebar";
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
              <Heading level={1} style={{ marginBottom: "var(--renge-space-4)", fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.02em", fontSize: "clamp(var(--renge-font-size-xl), 7vw, var(--renge-font-size-3xl))", lineHeight: "var(--renge-line-height-3xl)", overflowWrap: "break-word" }}>Components</Heading>
              <Text as="p" size="lg" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-5)", maxWidth: 560 }}>
                44 components built on the token system. Proportional. Accessible. Composable. No class names — every style references a Renge CSS variable. 100% WCAG 2.1 AA compliant.
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
                <Badge variant="neutral">WCAG 2.1 AA</Badge>
                <Badge variant="neutral">44×44px touch targets</Badge>
                <Badge variant="neutral">4.5:1 contrast</Badge>
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
