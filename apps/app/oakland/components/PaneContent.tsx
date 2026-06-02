import { PARKS, STATS, type StyleMap } from "./data";

export function PaneContent({ t }: { t: StyleMap }) {
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
