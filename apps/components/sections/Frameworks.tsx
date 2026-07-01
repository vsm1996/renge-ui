"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@renge-ui/react";
import { EASE_OUT } from "@/lib/phi";
import { useBreakpoint } from "@/lib/useBreakpoint";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: EASE_OUT },
  }),
};

const FRAMEWORKS = [
  {
    name: "React",
    pkg: "@renge-ui/react",
    install: "pnpm add @renge-ui/react",
    href: "/components",
    docLabel: "View components →",
    count: "44 components",
    detail: "forwardRef. Inline tokens. No class names.",
    icon: (
      <svg viewBox="0 0 48 48" width={36} height={36} fill="none" aria-hidden>
        <ellipse cx="24" cy="24" rx="22" ry="8.5" stroke="currentColor" strokeWidth="2" fill="none" />
        <ellipse cx="24" cy="24" rx="22" ry="8.5" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="22" ry="8.5" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(120 24 24)" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Vue",
    pkg: "@renge-ui/vue",
    install: "pnpm add @renge-ui/vue",
    href: "/vue",
    docLabel: "View composables →",
    count: "Composables + components",
    detail: "useRenge, useProfile, useTokens.",
    icon: (
      <svg viewBox="0 0 48 48" width={36} height={36} fill="none" aria-hidden>
        <path d="M24 40L4 8h8l12 20 12-20h8L24 40z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
        <path d="M24 28L14 12h5l5 9 5-9h5L24 28z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Svelte",
    pkg: "@renge-ui/svelte",
    install: "pnpm add @renge-ui/svelte",
    href: "/svelte",
    docLabel: "View stores →",
    count: "Stores + actions",
    detail: "rengeStore, profileStore, token actions.",
    icon: (
      <svg viewBox="0 0 48 48" width={36} height={36} fill="none" aria-hidden>
        <path d="M36 8c3 4 2 10-2 15L20 38c-4 5-11 6-15 2-3-4-2-10 2-15L21 10c4-5 11-6 15-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
        <path d="M28 14c2 3 1 7-2 11L18 36c-3 4-8 5-11 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
    ),
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      style={{
        width: "100%",
        padding: "var(--renge-space-2) var(--renge-space-3)",
        borderRadius: "var(--renge-radius-2)",
        border: "1px solid var(--renge-color-border-subtle)",
        background: "var(--renge-color-bg-muted)",
        color: copied ? "var(--renge-color-accent)" : "var(--renge-color-fg-muted)",
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "var(--renge-font-size-xs)",
        letterSpacing: "0.02em",
        cursor: "pointer",
        textAlign: "left" as const,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "var(--renge-space-2)",
        transition: "color 150ms, border-color 150ms",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--renge-color-accent-subtle)"; }}
      onMouseLeave={(e) => { if (!copied) e.currentTarget.style.borderColor = "var(--renge-color-border-subtle)"; }}
    >
      <span>{text}</span>
      <span style={{ flexShrink: 0, fontSize: "10px", opacity: 0.7 }}>{copied ? "copied" : "copy"}</span>
    </button>
  );
}

export function Frameworks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useBreakpoint();

  return (
    <section
      ref={ref}
      id="frameworks"
      style={{
        background: "var(--renge-color-bg-subtle)",
        borderTop: "1px solid var(--renge-color-border-subtle)",
        padding: `var(--renge-space-8) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
      }}
    >
      <Container px="0">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--renge-space-7)" }}>
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            variants={fadeUp}
            style={{
              display: "inline-block",
              padding: "var(--renge-space-1) var(--renge-space-4)",
              borderRadius: "var(--renge-radius-full)",
              background: "var(--renge-color-accent-subtle)",
              color: "var(--renge-color-accent)",
              fontSize: "var(--renge-font-size-xs)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              marginBottom: "var(--renge-space-5)",
            }}
          >
            Available now
          </motion.div>

          <motion.h2
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "clamp(28px, 8vw, 44px)" : "clamp(32px, 3.5vw, 52px)",
              letterSpacing: "-0.02em",
              color: "var(--renge-color-fg)",
              fontWeight: 400,
              margin: "0 0 var(--renge-space-4) 0",
            }}
          >
            One system. Every framework.
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.2}
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--renge-font-size-lg)",
              lineHeight: "var(--renge-line-height-lg)",
              color: "var(--renge-color-fg-muted)",
              margin: "0 auto",
              maxWidth: "52ch",
            }}
          >
            The same tokens, petals, and mathematical proportions — wherever you build.
          </motion.p>
        </div>

        {/* Framework cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "var(--renge-space-4)",
          }}
        >
          {FRAMEWORKS.map((fw, i) => (
            <motion.div
              key={fw.name}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.25 + i * 0.1}
              variants={fadeUp}
              style={{
                padding: "var(--renge-space-5)",
                borderRadius: "var(--renge-radius-3)",
                border: "1px solid var(--renge-color-border-subtle)",
                background: "var(--renge-color-bg)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--renge-space-4)",
              }}
            >
              {/* Icon + name */}
              <div style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-3)" }}>
                <div style={{ color: "var(--renge-color-accent)", flexShrink: 0 }}>
                  {fw.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-2xl)", color: "var(--renge-color-fg)", lineHeight: 1, fontWeight: 400 }}>
                    {fw.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-accent)", marginTop: 4 }}>
                    {fw.pkg}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-1)" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg)", fontWeight: 500 }}>
                  {fw.count}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)" }}>
                  {fw.detail}
                </div>
              </div>

              {/* Install */}
              <CopyButton text={fw.install} />

              {/* Doc link */}
              <a
                href={fw.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--renge-font-size-sm)",
                  color: "var(--renge-color-accent)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "opacity 150ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                {fw.docLabel}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Tailwind callout */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.55}
          variants={fadeUp}
          style={{
            marginTop: "var(--renge-space-5)",
            padding: "var(--renge-space-4) var(--renge-space-5)",
            borderRadius: "var(--renge-radius-3)",
            border: "1px solid var(--renge-color-border-subtle)",
            background: "var(--renge-color-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap" as const,
            gap: "var(--renge-space-4)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-1)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400 }}>
              Using Tailwind?
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)" }}>
              One plugin. Full utility coverage. v3 preset and v4 plugin both available.
            </div>
          </div>
          <div style={{ display: "flex", gap: "var(--renge-space-3)", alignItems: "center", flexWrap: "wrap" as const }}>
            <CopyButton text="pnpm add @renge-ui/tailwind" />
            <a
              href="/tailwind"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--renge-font-size-sm)",
                color: "var(--renge-color-accent)",
                textDecoration: "none",
                whiteSpace: "nowrap" as const,
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              View docs →
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
