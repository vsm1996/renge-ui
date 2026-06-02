"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { Section, Stack, Text, Heading, Divider, Slider } from "@renge-ui/react";

// ── Data ──────────────────────────────────────────────────────────────────────

const PARKS = [
  {
    name: "Redwood Regional Park",
    type: "Forest",
    elevation: "1,619 ft peak",
    description:
      "A cathedral of second-growth coast redwoods. The tallest trees in the East Bay canopy reach 150 feet. Streams run cold year-round beneath them.",
  },
  {
    name: "Joaquin Miller Park",
    type: "Woodland",
    elevation: "960 ft",
    description:
      "Named for the poet. Mixed eucalyptus and native oak-bay woodland. Madrone peels its bark every summer like clockwork.",
  },
  {
    name: "Lake Merritt",
    type: "Urban Tidal Lagoon",
    elevation: "Sea level",
    description:
      "A saltwater tidal lagoon at the heart of the city. The oldest official wildlife refuge in North America, designated 1870.",
  },
];

const STATS = [
  { value: "52", label: "parks & open spaces" },
  { value: "7,700+", label: "acres of open space" },
  { value: "12", label: "plant communities" },
];

const DIFF_ROWS = [
  {
    property: "Space between cards",
    arbitrary: "16px",
    renge: "var(--renge-space-4) = 30px",
    note: "5 × 6  (Fibonacci × base unit)",
  },
  {
    property: "Section padding-top",
    arbitrary: "48px",
    renge: "var(--renge-space-7) = 126px",
    note: "21 × 6  (Fibonacci × base unit)",
  },
  {
    property: "Card padding",
    arbitrary: "20px",
    renge: "var(--renge-space-4) = 20px",
    note: "same value, derived from the system",
  },
  {
    property: "Gap inside card",
    arbitrary: "12px",
    renge: "var(--renge-space-3) = 12px",
    note: "same value, derived from the system",
  },
  {
    property: "Eyebrow font-size",
    arbitrary: "11px",
    renge: "var(--renge-font-size-xs) ≈ 11px",
    note: "base × φ⁻²",
  },
  {
    property: "Body font-size",
    arbitrary: "14px",
    renge: "var(--renge-font-size-base) ≈ 13px",
    note: "base × φ⁻¹",
  },
  {
    property: "Heading font-size",
    arbitrary: "28px",
    renge: "var(--renge-font-size-2xl) ≈ 34px",
    note: "base × φ³",
  },
  {
    property: "Line height (body)",
    arbitrary: "1.5",
    renge: "1.618",
    note: "φ — the golden ratio",
  },
  {
    property: "Eyebrow letter-spacing",
    arbitrary: "0.08em",
    renge: "0.12em",
    note: "tuned to the type system",
  },
  {
    property: "Card border-radius",
    arbitrary: "8px",
    renge: "var(--renge-radius-3)",
    note: "from the radius scale",
  },
  {
    property: "Accent color",
    arbitrary: "#4a9a6a",
    renge: "oklch(…) via profile token",
    note: "perceptually uniform OKLCH",
  },
  {
    property: "Display typeface",
    arbitrary: "Georgia, serif",
    renge: "DM Serif Display",
    note: "chosen for PHI-proportioned letterforms",
  },
];

// ── Arbitrary style map (hardcoded, non-systematic) ───────────────────────────

const A = {
  fontDisplay: "Georgia, 'Times New Roman', serif",
  fontBody: "system-ui, -apple-system, 'Helvetica Neue', sans-serif",
  accent: "#4a9a6a",
  accentBg: "#e8f3ec",
  accentBorder: "#b8d9c4",
  fg: "#1c1c1c",
  fgMuted: "#6b7280",
  fgSubtle: "#555",
  bg: "#fafaf8",
  bgSubtle: "#f3f3f0",
  border: "#e0e0e0",
  tracking: "0.08em",
  spaceXs: "4px",
  spaceSm: "8px",
  spaceMd: "12px",
  spaceLg: "16px",
  spaceXl: "24px",
  space2xl: "32px",
  space3xl: "48px",
  space4xl: "64px",
  sizeXs: "11px",
  sizeSm: "14px",
  sizeMd: "15px",
  sizeLg: "17px",
  sizeXl: "20px",
  size2xl: "28px",
  size3xl: "36px",
  size4xl: "44px",
  radiusSm: "4px",
  radiusMd: "8px",
  radiusFull: "9999px",
  lineBase: 1.5,
  lineRelaxed: 1.6,
};

// ── Renge style map (token references) ───────────────────────────────────────

const R = {
  fontDisplay: "var(--font-display)",
  fontBody: "var(--font-body)",
  accent: "var(--renge-color-accent)",
  accentBg: "color-mix(in oklch, var(--renge-color-accent) 10%, transparent)",
  accentBorder: "color-mix(in oklch, var(--renge-color-accent) 25%, transparent)",
  fg: "var(--renge-color-fg)",
  fgMuted: "var(--renge-color-fg-muted)",
  fgSubtle: "var(--renge-color-fg-subtle)",
  bg: "var(--renge-color-bg)",
  bgSubtle: "var(--renge-color-bg-subtle)",
  border: "var(--renge-color-border-subtle)",
  tracking: "0.12em",
  spaceXs: "var(--renge-space-1)",
  spaceSm: "var(--renge-space-2)",
  spaceMd: "var(--renge-space-3)",
  spaceLg: "var(--renge-space-4)",
  spaceXl: "var(--renge-space-5)",
  space2xl: "var(--renge-space-6)",
  space3xl: "var(--renge-space-7)",
  space4xl: "var(--renge-space-8)",
  sizeXs: "var(--renge-font-size-xs)",
  sizeSm: "var(--renge-font-size-sm)",
  sizeMd: "var(--renge-font-size-base)",
  sizeLg: "var(--renge-font-size-lg)",
  sizeXl: "var(--renge-font-size-xl)",
  size2xl: "var(--renge-font-size-2xl)",
  size3xl: "var(--renge-font-size-3xl)",
  size4xl: "var(--renge-font-size-4xl)",
  radiusSm: "var(--renge-radius-1)",
  radiusMd: "var(--renge-radius-3)",
  radiusFull: "var(--renge-radius-full)",
  lineBase: 1.618,
  lineRelaxed: 1.7,
};

// ── Pane content (same structure, different tokens) ───────────────────────────

function PaneContent({ t }: { t: typeof A | typeof R }) {
  return (
    <div
      style={{
        background: t.bg,
        fontFamily: t.fontBody,
        padding: `${t.space3xl} ${t.space2xl}`,
        minHeight: "100%",
      }}
    >
      {/* Hero */}
      <div style={{ marginBottom: t.space3xl }}>
        <div
          style={{
            fontSize: t.sizeSm,
            color: t.accent,
            letterSpacing: t.tracking,
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: t.spaceSm,
            fontFamily: t.fontBody,
          }}
        >
          Oakland, California — 37.8044° N, 122.2712° W
        </div>

        <div
          style={{
            fontFamily: t.fontDisplay,
            fontSize: t.size2xl,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: t.fg,
            marginBottom: t.spaceLg,
            fontWeight: 400,
          }}
        >
          The living city.
        </div>

        <div
          style={{
            fontSize: t.sizeMd,
            color: t.fgSubtle,
            lineHeight: t.lineRelaxed,
            marginBottom: t.spaceXl,
            maxWidth: "480px",
          }}
        >
          Coast redwood and salt marsh. Oak woodland and tidal estuary. Within
          the city limits of Oakland, a full spectrum of native plant communities
          persists — unchanged in type if not in scale from what the Ohlone lived
          among for 3,000 years.
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: t.spaceXl, flexWrap: "wrap" }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: t.fontDisplay,
                  fontSize: t.size2xl,
                  color: t.accent,
                  lineHeight: 1,
                  fontWeight: 400,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: t.sizeSm,
                  color: t.fgMuted,
                  letterSpacing: t.tracking,
                  textTransform: "uppercase",
                  marginTop: t.spaceXs,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section heading */}
      <div style={{ marginBottom: t.spaceXl }}>
        <div
          style={{
            fontSize: t.sizeSm,
            color: t.accent,
            letterSpacing: t.tracking,
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: t.spaceSm,
            fontFamily: t.fontBody,
          }}
        >
          The landscape
        </div>
        <div
          style={{
            fontFamily: t.fontDisplay,
            fontSize: t.size2xl,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: t.fg,
            marginBottom: t.spaceMd,
            fontWeight: 400,
          }}
        >
          Five places to know.
        </div>
        <div
          style={{
            fontSize: t.sizeMd,
            color: t.fgSubtle,
            lineHeight: t.lineRelaxed,
            maxWidth: "440px",
          }}
        >
          Oakland sits on a gradient from salt marsh to ridge. In 20 minutes you
          can walk from tidal estuary to old-growth redwood corridor. Each zone
          has its own light, its own smell, its own biology.
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
          gap: t.spaceLg,
        }}
      >
        {PARKS.map((park) => (
          <div
            key={park.name}
            style={{
              background: t.bgSubtle,
              border: `1px solid ${t.border}`,
              borderRadius: t.radiusMd,
              padding: t.spaceLg,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "inline-block",
                fontSize: t.sizeSm,
                padding: `${t.spaceXs} ${t.spaceSm}`,
                borderRadius: t.radiusFull,
                background: t.accentBg,
                color: t.accent,
                marginBottom: t.spaceMd,
                border: `1px solid ${t.accentBorder}`,
                fontFamily: t.fontBody,
                fontWeight: 500,
              }}
            >
              {park.type}
            </div>
            <div
              style={{
                fontFamily: t.fontDisplay,
                fontSize: t.sizeLg,
                color: t.fg,
                lineHeight: 1.15,
                marginBottom: t.spaceSm,
                fontWeight: 400,
              }}
            >
              {park.name}
            </div>
            <div
              style={{
                fontSize: t.sizeSm,
                color: t.fgMuted,
                marginBottom: t.spaceMd,
              }}
            >
              {park.elevation}
            </div>
            <div
              style={{
                fontSize: t.sizeMd,
                color: t.fgSubtle,
                lineHeight: t.lineBase,
              }}
            >
              {park.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Comparison slider ─────────────────────────────────────────────────────────

function useSlider(pos: number, setPos: (v: number) => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(8, Math.min(clientX - rect.left, rect.width - 8));
      setPos((x / rect.width) * 100);
    },
    [setPos]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current) update(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (dragging.current) {
        e.preventDefault();
        update(e.touches[0].clientX);
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [update]);

  const startDrag = useCallback(
    (clientX: number) => {
      dragging.current = true;
      update(clientX);
    },
    [update]
  );

  return { containerRef, startDrag };
}

function ComparisonSlider() {
  const [pos, setPos] = useState(50);
  const { containerRef, startDrag } = useSlider(pos, setPos);
  const merged = pos;

  return (
    <Stack gap="4">
      {/* Visual comparison area */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          overflow: "hidden",
          cursor: "col-resize",
          userSelect: "none",
          WebkitUserSelect: "none",
          borderRadius: "var(--renge-radius-3)",
          border: "1px solid var(--renge-color-border)",
          boxShadow: "0 4px 32px oklch(0% 0 0 / 0.06)",
        }}
        onMouseDown={(e) => startDrag(e.clientX)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      >
        {/* Base layer: Renge (always full width) */}
        <div style={{ width: "100%", pointerEvents: "none" }}>
          <PaneContent t={R} />
        </div>

        {/* Overlay: Arbitrary (clipped to left of slider) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(0 ${100 - merged}% 0 0)`,
            pointerEvents: "none",
          }}
        >
          <PaneContent t={A} />
        </div>

        {/* Arbitrary label */}
        <div
          style={{
            position: "absolute",
            top: "var(--renge-space-4)",
            left: "var(--renge-space-4)",
            pointerEvents: "none",
            opacity: merged > 12 ? 1 : 0,
            transition: "opacity 180ms",
          }}
        >
          <div
            style={{
              background: "rgba(10,10,10,0.55)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "#fff",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: "9999px",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Arbitrary
          </div>
        </div>

        {/* Renge label */}
        <div
          style={{
            position: "absolute",
            top: "var(--renge-space-4)",
            right: "var(--renge-space-4)",
            pointerEvents: "none",
            opacity: merged < 88 ? 1 : 0,
            transition: "opacity 180ms",
          }}
        >
          <div
            style={{
              background: "var(--renge-color-accent)",
              color: "var(--renge-color-bg)",
              fontSize: "var(--renge-font-size-sm)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "var(--renge-space-1) var(--renge-space-3)",
              borderRadius: "var(--renge-radius-full)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
            }}
          >
            Renge
          </div>
        </div>

        {/* Divider line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${merged}%`,
            width: 2,
            background: "#fff",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 0 16px rgba(0,0,0,0.12)",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          {/* Drag handle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 2px 16px rgba(0,0,0,0.16), 0 0 0 2px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "col-resize",
              pointerEvents: "all",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M6 9H12M6 9L4 7M6 9L4 11M12 9L14 7M12 9L14 11"
                stroke="#888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Renge Slider control — also drives the comparison */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-4)" }}>
        <Text
          style={{
            color: "var(--renge-color-fg-muted)",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-body)",
            minWidth: "60px",
          }}
        >
          Arbitrary
        </Text>
        <div style={{ flex: 1 }}>
          <Slider
            min={0}
            max={100}
            value={merged}
            showPhiMarkers
            onChange={(e) => setPos(Number(e.target.value))}
          />
        </div>
        <Text
          style={{
            color: "var(--renge-color-accent)",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-body)",
            minWidth: "60px",
            textAlign: "right",
          }}
        >
          Renge
        </Text>
      </div>

      {/* PHI marker labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "var(--renge-space-5)",
        }}
      >
        {[
          { pct: 38.2, label: "38.2% — φ⁻²" },
          { pct: 61.8, label: "61.8% — φ⁻¹" },
        ].map(({ pct, label }) => (
          <button
            key={pct}
            onClick={() => setPos(pct)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "var(--renge-space-2)",
              padding: 0,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background:
                  Math.abs(merged - pct) < 1
                    ? "var(--renge-color-accent)"
                    : "var(--renge-color-border)",
                transition: "background 200ms",
                flexShrink: 0,
              }}
            />
            <Text
              size="sm"
              style={{
                color:
                  Math.abs(merged - pct) < 1
                    ? "var(--renge-color-accent)"
                    : "var(--renge-color-fg-muted)",
                fontFamily: "'JetBrains Mono', monospace",
                transition: "color 200ms",
              }}
            >
              {label}
            </Text>
          </button>
        ))}
      </div>
    </Stack>
  );
}

// ── Token diff table ──────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.382, 0, 0.168, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function DiffTable() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "var(--font-body)",
          fontSize: "var(--renge-font-size-base)",
        }}
      >
        <thead>
          <tr>
            {["Property", "Arbitrary", "Renge", "Why"].map((col, i) => (
              <th
                key={col}
                style={{
                  textAlign: "left",
                  padding: "var(--renge-space-2) var(--renge-space-3)",
                  fontSize: "var(--renge-font-size-sm)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--renge-color-fg-muted)",
                  borderBottom: "1px solid var(--renge-color-border)",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  paddingLeft: i === 0 ? 0 : undefined,
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DIFF_ROWS.map((row, i) => (
            <tr
              key={row.property}
              style={{
                borderBottom:
                  i < DIFF_ROWS.length - 1
                    ? "1px solid var(--renge-color-border-subtle)"
                    : "none",
              }}
            >
              <td
                style={{
                  padding: "var(--renge-space-3) var(--renge-space-3) var(--renge-space-3) 0",
                  color: "var(--renge-color-fg)",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {row.property}
              </td>
              <td
                style={{
                  padding: "var(--renge-space-3)",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "var(--renge-font-size-sm)",
                  color: "var(--renge-color-fg-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {row.arbitrary}
              </td>
              <td
                style={{
                  padding: "var(--renge-space-3)",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "var(--renge-font-size-sm)",
                  color: "var(--renge-color-accent)",
                  whiteSpace: "nowrap",
                }}
              >
                {row.renge}
              </td>
              <td
                style={{
                  padding: "var(--renge-space-3)",
                  color: "var(--renge-color-fg-muted)",
                  minWidth: "180px",
                  lineHeight: 1.5,
                }}
              >
                {row.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

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
