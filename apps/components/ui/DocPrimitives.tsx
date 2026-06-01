"use client";

// Shared documentation UI primitives.
// Used by: /components, /system, /tailwind pages and doc category modules.

import { useState } from "react";
import { Text, Heading, Stack } from "@renge-ui/react";

// ─── Props table ──────────────────────────────────────────────────────────────

export function PropRow({ name, type, defaultVal, desc }: {
  name: string;
  type: string;
  defaultVal?: string;
  desc: string;
}) {
  return (
    <tr>
      <td style={{ padding: "var(--renge-space-3) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{name}</td>
      <td style={{ padding: "var(--renge-space-3) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{type}</td>
      <td style={{ padding: "var(--renge-space-3) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{defaultVal ?? "—"}</td>
      <td style={{ padding: "var(--renge-space-3) var(--renge-space-4)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{desc}</td>
    </tr>
  );
}

export function PropsTable({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--renge-color-bg-subtle)" }}>
            {["Prop", "Type", "Default", "Description"].map(h => (
              <th key={h} style={{ padding: "var(--renge-space-2) var(--renge-space-4)", textAlign: "left", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

// ─── Utility table (class / value / css output) ───────────────────────────────

export function UtilityTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--renge-color-bg-subtle)" }}>
            {["Class", "Value / Derivation", "CSS output"].map(h => (
              <th key={h} style={{ padding: "var(--renge-space-2) var(--renge-space-4)", textAlign: "left", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([cls, val, css]) => (
            <tr key={cls}>
              <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{cls}</td>
              <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{val}</td>
              <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{css}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Demo block ───────────────────────────────────────────────────────────────

export function Demo({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div>
      {label && (
        <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0, marginBottom: "var(--renge-space-2)" }}>{label}</p>
      )}
      <div style={{ padding: "var(--renge-space-4)", background: "var(--renge-color-bg-subtle)", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)", display: "flex", flexWrap: "wrap", gap: "var(--renge-space-4)", alignItems: "flex-start", overflowX: "auto", minWidth: 0 }}>
        {children}
      </div>
    </div>
  );
}

// ─── Code blocks ─────────────────────────────────────────────────────────────

// Simple inline code — no copy button, used in component prop tables and callouts.
export function Code({ children }: { children: string }) {
  return (
    <div style={{ background: "var(--renge-color-bg-inverse)", borderRadius: "var(--renge-radius-2)", padding: "var(--renge-space-4)", overflowX: "auto" }}>
      <pre style={{ margin: 0 }}>
        <code style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-inverse)", lineHeight: 1.7 }}>{children}</code>
      </pre>
    </div>
  );
}

// Full code block with copy button — used in Getting Started and Tailwind pages.
export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "relative", background: "var(--renge-color-bg-inverse)", borderRadius: "var(--renge-radius-2)", padding: "var(--renge-space-5)", border: "1px solid var(--renge-color-border)", overflow: "auto" }}>
      <button
        onClick={copy}
        aria-label="Copy code"
        style={{ position: "absolute", top: "var(--renge-space-3)", right: "var(--renge-space-3)", padding: "var(--renge-space-1) var(--renge-space-3)", background: copied ? "var(--renge-color-accent)" : "transparent", border: "1px solid var(--renge-color-border)", borderRadius: "var(--renge-radius-full)", color: "var(--renge-color-fg-inverse)", fontSize: "var(--renge-font-size-sm)", fontFamily: "var(--font-body)", cursor: "pointer", transition: "all 200ms", opacity: 0.7, letterSpacing: "0.04em" }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre style={{ margin: 0 }}>
        <code style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-inverse)", lineHeight: "1.8", display: "block" }}>
          {code}
        </code>
      </pre>
    </div>
  );
}

// ─── Callout ──────────────────────────────────────────────────────────────────

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: "var(--renge-space-4)", borderRadius: "var(--renge-radius-2)", background: "var(--renge-color-accent-subtle)", borderLeft: "3px solid var(--renge-color-accent)" }}>
      <Text size="sm" color="fg-subtle">{children}</Text>
    </div>
  );
}

// ─── Section wrappers ─────────────────────────────────────────────────────────

// Component-level section with scroll target — used in /components and /system.
export function ComponentSection({ id, title, description, children }: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ scrollMarginTop: "var(--renge-space-7)" }}>
      <Stack gap="5">
        <div>
          <Heading level={2} size="xl" style={{ marginBottom: "var(--renge-space-2)" }}>{title}</Heading>
          <Text as="p" color="fg-subtle" style={{ margin: 0 }}>{description}</Text>
        </div>
        {children}
      </Stack>
    </section>
  );
}

// Page-level section with accent label — used in /tailwind and /system top-level layout.
export function DocSection({ id, label, title, description, children }: {
  id: string;
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ scrollMarginTop: "calc(52px + var(--renge-space-5))" }}>
      <SectionLabel>{label}</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 40px)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", lineHeight: "var(--renge-line-height-base)", margin: 0, marginBottom: "var(--renge-space-6)", maxWidth: 600 }}>
        {description}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-6)" }}>
        {children}
      </div>
    </section>
  );
}

// ─── Label ────────────────────────────────────────────────────────────────────

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-body)", margin: 0, marginBottom: "var(--renge-space-3)" }}>
      {children}
    </p>
  );
}
