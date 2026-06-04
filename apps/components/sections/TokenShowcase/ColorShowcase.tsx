"use client";

import { ProfileToggle } from "@/components/ui/ProfileToggle";
import { SectionLabel, SubheadingH3 } from "./shared";

const colorGroups = [
  {
    label: "Background",
    tokens: [
      { key: "bg",         jsKey: "bg",         desc: "Page background" },
      { key: "bg-subtle",  jsKey: "bgSubtle",   desc: "Slightly elevated surface" },
      { key: "bg-muted",   jsKey: "bgMuted",    desc: "Muted surface, less emphasis" },
      { key: "bg-inverse", jsKey: "bgInverse",  desc: "Inverted — dark in light mode" },
    ],
  },
  {
    label: "Foreground",
    tokens: [
      { key: "fg",         jsKey: "fg",         desc: "Primary text" },
      { key: "fg-subtle",  jsKey: "fgSubtle",   desc: "Secondary text" },
      { key: "fg-muted",   jsKey: "fgMuted",    desc: "Placeholder, disabled text" },
      { key: "fg-inverse", jsKey: "fgInverse",  desc: "Text on inverted background" },
    ],
  },
  {
    label: "Border",
    tokens: [
      { key: "border",       jsKey: "border",      desc: "Default dividers" },
      { key: "border-subtle", jsKey: "borderSubtle", desc: "Hairline, low-emphasis" },
      { key: "border-focus", jsKey: "borderFocus",  desc: "Keyboard focus ring" },
    ],
  },
  {
    label: "Interactive",
    tokens: [
      { key: "accent",        jsKey: "accent",       desc: "Primary interactive color" },
      { key: "accent-hover",  jsKey: "accentHover",  desc: "Hover state" },
      { key: "accent-subtle", jsKey: "accentSubtle", desc: "Tinted background" },
    ],
  },
  {
    label: "Status",
    tokens: [
      { key: "success",         jsKey: "success",        desc: "Positive outcome" },
      { key: "success-subtle",  jsKey: "successSubtle",  desc: "Success tint background" },
      { key: "warning",         jsKey: "warning",        desc: "Caution required" },
      { key: "warning-subtle",  jsKey: "warningSubtle",  desc: "Warning tint background" },
      { key: "danger",          jsKey: "danger",         desc: "Error or destructive" },
      { key: "danger-subtle",   jsKey: "dangerSubtle",   desc: "Danger tint background" },
      { key: "info",            jsKey: "info",           desc: "Informational" },
      { key: "info-subtle",     jsKey: "infoSubtle",     desc: "Info tint background" },
    ],
  },
];

export function ColorShowcase() {
  return (
    <div>
      <SectionLabel>Tokens / Color</SectionLabel>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "var(--renge-space-5)",
        flexWrap: "wrap",
        gap: "var(--renge-space-3)",
      }}>
        <SubheadingH3>Color profiles.</SubheadingH3>
        <ProfileToggle />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-6)" }}>
        {colorGroups.map(({ label, tokens }) => (
          <div key={label}>
            <p style={{
              fontSize: "var(--renge-font-size-sm)",
              color: "var(--renge-color-fg-subtle)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              margin: 0,
              marginBottom: "var(--renge-space-3)",
            }}>
              {label}
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "var(--renge-space-3)",
            }}>
              {tokens.map(({ key, jsKey }) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-1)" }}>
                  <div style={{
                    height: 52,
                    borderRadius: "var(--renge-radius-2)",
                    background: `var(--renge-color-${key})`,
                    border: "1px solid var(--renge-color-border-subtle)",
                    transition: "background 600ms var(--renge-easing-ease-in-out)",
                  }} />
                  <p style={{
                    fontSize: "var(--renge-font-size-sm)",
                    color: "var(--renge-color-fg-subtle)",
                    fontFamily: "var(--font-mono, monospace)",
                    margin: 0,
                    letterSpacing: "0.04em",
                  }}>
                    color.{jsKey}
                  </p>
                  <p style={{
                    fontSize: "var(--renge-font-size-sm)",
                    color: "var(--renge-color-fg-subtle)",
                    fontFamily: "var(--font-mono, monospace)",
                    margin: 0,
                    letterSpacing: "0.02em",
                    opacity: 0.7,
                  }}>
                    --renge-color-{key}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
