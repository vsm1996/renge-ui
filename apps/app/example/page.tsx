"use client";

import { motion } from "framer-motion";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { Section, Stack, Text, Heading, Divider } from "@renge-ui/react";
import { ComparisonSlider } from "./components/ComparisonSlider";
import { FadeIn } from "./components/FadeIn";
import { DiffTable } from "./components/DiffTable";

export default function OaklandPage() {
  return (
    <ProfileProvider defaultProfile="leaf">
      <Nav />
      <main>
        {/* ── Intro ──────────────────────────────────────────────────────── */}
        <Section
          style={{
            paddingTop: "var(--renge-space-7)",
            paddingBottom: "var(--renge-space-5)",
          }}
        >
          <Stack gap="5" style={{ maxWidth: "44rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.382, 0, 0.168, 1], delay: 0.1 }}
            >
              <Text
                size="sm"
                style={{
                  color: "var(--renge-color-accent)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-body)",
                  marginBottom: "var(--renge-space-3)",
                }}
              >
                The difference
              </Text>
              <Heading
                level={1}
                style={{
                  fontSize: "clamp(var(--renge-font-size-2xl), 4vw, var(--renge-font-size-3xl))",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                What proportion feels like.
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.382, 0, 0.168, 1], delay: 0.3 }}
            >
              <Text
                style={{
                  color: "var(--renge-color-fg-subtle)",
                  lineHeight: 1.7,
                }}
              >
                Same content. Same structure. One side uses arbitrary values —
                spacing, type sizes, and colors that feel reasonable when you first
                write them. The other uses Renge&apos;s token system, derived from
                PHI and the Fibonacci sequence.{" "}
                <span
                  style={{
                    color: "var(--renge-color-fg-muted)",
                    fontStyle: "italic",
                  }}
                >
                  Drag the slider.
                </span>
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Stack gap="3" direction="horizontal" style={{ flexWrap: "wrap" }}>
                {[
                  { label: "Arbitrary", desc: "16px gaps · Georgia · #4a9a6a · line-height 1.5" },
                  { label: "Renge", desc: "PHI-derived spacing · DM Serif Display · OKLCH · φ line-height" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--renge-space-2)",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background:
                          item.label === "Renge"
                            ? "var(--renge-color-accent)"
                            : "var(--renge-color-fg-muted)",
                        flexShrink: 0,
                      }}
                    />
                    <Text
                      style={{ color: "var(--renge-color-fg-muted)" }}
                    >
                      <strong
                        style={{ color: "var(--renge-color-fg)", fontWeight: 600 }}
                      >
                        {item.label}:
                      </strong>{" "}
                      {item.desc}
                    </Text>
                  </div>
                ))}
              </Stack>
            </motion.div>
          </Stack>
        </Section>

        {/* ── Comparison slider ──────────────────────────────────────────── */}
        <Section
          style={{
            paddingTop: 0,
            paddingBottom: "var(--renge-space-7)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.382, 0, 0.168, 1], delay: 0.5 }}
          >
            <ComparisonSlider />
          </motion.div>
        </Section>

        <Divider />

        {/* ── What changed ───────────────────────────────────────────────── */}
        <Section
          style={{
            paddingTop: "var(--renge-space-7)",
            paddingBottom: "var(--renge-space-8)",
          }}
        >
          <Stack gap="7">
            <FadeIn>
              <Stack gap="3" style={{ maxWidth: "40rem" }}>
                <Text
                  size="sm"
                  style={{
                    color: "var(--renge-color-accent)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  The specifics
                </Text>
                <Heading
                  level={2}
                  style={{
                    fontSize: "var(--renge-font-size-2xl)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  What actually changed.
                </Heading>
                <Text
                  style={{
                    color: "var(--renge-color-fg-subtle)",
                    lineHeight: 1.7,
                  }}
                >
                  Many of the values are close. Some are identical. The
                  difference isn&apos;t any single number — it&apos;s that every
                  number in the Renge system has a reason. Each token is derived
                  from the same mathematical root. That coherence is what you
                  feel before you can articulate it.
                </Text>
              </Stack>
            </FadeIn>

            <FadeIn delay={0.1}>
              <DiffTable />
            </FadeIn>

            {/* The argument */}
            <FadeIn delay={0.15}>
              <div
                style={{
                  borderLeft: "2px solid var(--renge-color-accent)",
                  paddingLeft: "var(--renge-space-5)",
                  maxWidth: "40rem",
                }}
              >
                <Text
                  style={{
                    color: "var(--renge-color-fg-subtle)",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                  }}
                >
                  The arbitrary values are not wrong. A developer who writes{" "}
                  <code
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.9em",
                      color: "var(--renge-color-fg-muted)",
                      fontStyle: "normal",
                    }}
                  >
                    gap: 16px
                  </code>{" "}
                  and{" "}
                  <code
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.9em",
                      color: "var(--renge-color-fg-muted)",
                      fontStyle: "normal",
                    }}
                  >
                    line-height: 1.5
                  </code>{" "}
                  is making reasonable choices. The Renge values aren&apos;t
                  dramatically different. They are{" "}
                  <em>systematically</em> different. Every step relates to every
                  other step by the same ratio — the ratio that appears in nautilus
                  shells, sunflower spirals, galaxy arms. That relationship
                  produces coherence you feel before you understand it.
                </Text>
              </div>
            </FadeIn>

            {/* Footer note */}
            <FadeIn delay={0.2}>
              <Stack gap="3" direction="horizontal" align="center">
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "var(--renge-color-border-subtle)",
                  }}
                />
                <Text
                  size="xs"
                  style={{
                    color: "var(--renge-color-fg-muted)",
                    letterSpacing: "0.08em",
                    fontFamily: "var(--font-body)",
                    whiteSpace: "nowrap",
                  }}
                >
                  1 : 1.618033...
                </Text>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "var(--renge-color-border-subtle)",
                  }}
                />
              </Stack>
            </FadeIn>
          </Stack>
        </Section>
      </main>

      <footer
        style={{
          borderTop: "1px solid var(--renge-color-border-subtle)",
          padding: "var(--renge-space-5)",
          textAlign: "center",
        }}
      >
        <Text
          size="xs"
          style={{
            color: "var(--renge-color-fg-muted)",
            letterSpacing: "0.08em",
          }}
        >
          Built with Renge · Proportion as a first principle · 1 : 1.618
        </Text>
      </footer>
    </ProfileProvider>
  );
}
