"use client";

import { getProfile } from "@renge-ui/tokens";
import type { SemanticColorMap } from "@renge-ui/tokens";
import { ProfileToggle, useProfile } from "@/components/ui/ProfileToggle";
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
  const { profile, mode } = useProfile();
  const colorValues: SemanticColorMap = getProfile(profile, mode);

  return (
    <div>
      <SectionLabel>Tokens / Color</SectionLabel>
      <div className="flex items-center justify-between mb-renge-5 flex-wrap gap-renge-3">
        <SubheadingH3>Color profiles.</SubheadingH3>
        <ProfileToggle />
      </div>
      <div className="flex flex-col gap-renge-6">
        {colorGroups.map(({ label, tokens }) => (
          <div key={label}>
            <h4
              className="text-renge-sm text-renge-fg-subtle uppercase font-semibold m-0 mb-renge-3"
              style={{
                fontFamily: "var(--font-body)",
                letterSpacing: "0.1em",
              }}
            >
              {label}
            </h4>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "var(--renge-space-3)",
            }}>
              {tokens.map(({ key, jsKey }) => {
                const oklchValue = colorValues[jsKey as keyof SemanticColorMap] ?? "";
                return (
                  <div key={key} className="flex flex-col gap-renge-1">
                    <div
                      className="rounded-renge-2 border border-renge-border-subtle"
                      style={{
                        height: 52,
                        background: `var(--renge-color-${key})`,
                        transition: "background 600ms var(--renge-easing-ease-in-out)",
                      }}
                    />
                    <code
                      className="text-renge-sm text-renge-fg-subtle m-0"
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      color.{jsKey}
                    </code>
                    <code
                      className="text-renge-sm text-renge-fg-subtle m-0"
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        letterSpacing: "0.02em",
                        opacity: 0.7,
                      }}
                    >
                      --renge-color-{key}
                    </code>
                    {oklchValue && (
                      <code
                        className="text-renge-sm m-0"
                        style={{
                          fontFamily: "var(--font-mono, monospace)",
                          letterSpacing: "0.02em",
                          opacity: 0.5,
                          fontSize: "0.72em",
                        }}
                      >
                        {oklchValue}
                      </code>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
