"use client";

import { useState } from "react";

export function CodeBlock({ code }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: "relative",
      background: "var(--renge-color-bg-inverse)",
      borderRadius: "var(--renge-radius-2)",
      padding: "var(--renge-space-5)",
      border: "1px solid var(--renge-color-border)",
      overflow: "auto",
    }}>
      <button
        onClick={copy}
        aria-label="Copy code"
        style={{
          position: "absolute",
          top: "var(--renge-space-3)",
          right: "var(--renge-space-3)",
          padding: "var(--renge-space-1) var(--renge-space-3)",
          background: copied ? "var(--renge-color-accent)" : "transparent",
          border: "1px solid var(--renge-color-border)",
          borderRadius: "var(--renge-radius-full)",
          color: "var(--renge-color-fg-inverse)",
          fontSize: "var(--renge-font-size-sm)",
          fontFamily: "var(--font-body)",
          cursor: "pointer",
          transition: "all 200ms var(--renge-easing-ease-out)",
          opacity: 0.7,
          letterSpacing: "0.04em",
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre style={{ margin: 0, overflow: "auto" }}>
        <code style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "var(--renge-font-size-sm)",
          color: "var(--renge-color-fg-inverse)",
          lineHeight: "var(--renge-line-height-base)",
          whiteSpace: "pre",
        }}>
          {code}
        </code>
      </pre>
    </div>
  );
}
