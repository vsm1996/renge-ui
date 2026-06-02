"use client";

import { useBreakpoint } from "@/lib/useBreakpoint";
import { Heading, Text } from "@renge-ui/react";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { TokensDocs } from "./components/TokensDocs";
import { AnimationsDocs } from "./components/AnimationsDocs";
import { PatternsDocs } from "./components/PatternsDocs";
import { Sidebar } from "./components/Sidebar";

export default function SystemPage() {
  const isMobile = useBreakpoint();

  return (
    <ProfileProvider>
      <Nav />
      <div style={{ maxWidth: 1260, margin: "0 auto", paddingLeft: isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)", paddingRight: isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)", paddingTop: "calc(52px + var(--renge-space-7))", paddingBottom: "var(--renge-space-8)", display: "flex", gap: "var(--renge-space-8)", alignItems: "flex-start" }}>

        {!isMobile && <Sidebar active="tokens" />}

        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--renge-space-8)" }}>

          <div style={{ paddingBottom: "var(--renge-space-6)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>
            <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0, marginBottom: "var(--renge-space-3)" }}>@renge-ui/tokens</p>
            <Heading level={1} size="3xl" style={{ marginBottom: "var(--renge-space-4)", fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.02em" }}>System</Heading>
            <Text as="p" size="lg" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-5)", maxWidth: 560 }}>
              Token API reference, animation system, and composition patterns. The mathematical foundation made programmable.
            </Text>
          </div>

          <TokensDocs />
          <AnimationsDocs />
          <PatternsDocs />

        </main>
      </div>
    </ProfileProvider>
  );
}
