"use client";

import { ProfileProvider } from "./ProfileToggle";
import { Nav } from "./Nav";
import { useBreakpoint } from "@/lib/useBreakpoint";

export function DocPageLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const isMobile = useBreakpoint();

  return (
    <ProfileProvider>
      <Nav />
      <div style={{
        maxWidth: 1260,
        margin: "0 auto",
        padding: `calc(52px + var(--renge-space-8)) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"} var(--renge-space-9)`,
        display: "flex",
        gap: "var(--renge-space-8)",
        alignItems: "flex-start",
        overflowX: "clip",
      }}>
        {!isMobile && sidebar}
        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--renge-space-9)" }}>
          {children}
        </main>
      </div>
    </ProfileProvider>
  );
}
