"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ProfileProvider, ProfileToggle } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { Stack, Grid, Section, Text, Heading, Card, Badge, Divider } from "@renge-ui/react";

// ============================================================================
// Data
// ============================================================================

const PARKS = [
  {
    name: "Redwood Regional Park",
    type: "Forest",
    elevation: "1,619 ft peak",
    description: "A cathedral of second-growth coast redwoods. The tallest trees in the East Bay canopy reach 150 feet. Streams run cold year-round beneath them.",
    plants: ["coast-redwood", "sword-fern", "bay-laurel", "redwood-sorrel"],
  },
  {
    name: "Joaquin Miller Park",
    type: "Woodland",
    elevation: "960 ft",
    description: "Named for the poet. Mixed eucalyptus and native oak-bay woodland on the lower Oakland hills. Madrone peels its bark every summer like clockwork.",
    plants: ["coast-live-oak", "bay-laurel", "madrone", "toyon"],
  },
  {
    name: "Lake Merritt",
    type: "Urban Tidal Lagoon",
    elevation: "Sea level",
    description: "A saltwater tidal lagoon at the heart of the city. The oldest official wildlife refuge in North America, designated 1870. Migratory birds stop here on the Pacific Flyway.",
    plants: ["cattail", "tule", "pickleweed", "willow"],
  },
  {
    name: "MLK Regional Shoreline",
    type: "Estuary & Salt Marsh",
    elevation: "Sea level",
    description: "Where the San Leandro Bay meets the Oakland estuary. Restored salt marsh and mudflat. The tide moves through pickleweed and cordgrass twice daily.",
    plants: ["pickleweed", "cordgrass", "alkali-heath", "gumplant"],
  },
  {
    name: "Leona Canyon",
    type: "Riparian Canyon",
    elevation: "600 ft",
    description: "A hidden creek corridor through the lower Oakland hills. Coast live oaks form a closed canopy over the stream. Rare within the urban grid.",
    plants: ["coast-live-oak", "california-buckeye", "sticky-monkeyflower", "mugwort"],
  },
];

const PLANTS: {
  id: string;
  name: string;
  latin: string;
  habitat: "forest" | "woodland" | "marsh" | "estuary" | "riparian";
  season: string;
  description: string;
  note: string;
}[] = [
  {
    id: "coast-redwood",
    name: "Coast Redwood",
    latin: "Sequoia sempervirens",
    habitat: "forest",
    season: "Evergreen",
    description: "The world's tallest living organism. In Redwood Regional, the second-growth stand rose from stumps after the 1850s logging — the rings of recovery visible in bark two feet thick.",
    note: "Fog drip from the canopy adds 30–40% to annual water input on dry summer days.",
  },
  {
    id: "coast-live-oak",
    name: "Coast Live Oak",
    latin: "Quercus agrifolia",
    habitat: "woodland",
    season: "Evergreen",
    description: "The structural species of Oakland's hills. Curved limbs build living architecture. Acorns fed the Ohlone for thousands of years. The city is named, in part, for these trees.",
    note: "A single mature tree can support 500+ species of insects, birds, and mammals.",
  },
  {
    id: "bay-laurel",
    name: "California Bay Laurel",
    latin: "Umbellularia californica",
    habitat: "woodland",
    season: "Evergreen",
    description: "Crush a leaf and the volatile oils release immediately — sharp, medicinal, unmistakable. Grows wherever water collects in the hills. The scent is Oakland's forest breath.",
    note: "Also called Oregon myrtle or headache tree. The oils are strong enough to cause headaches in enclosed spaces.",
  },
  {
    id: "california-poppy",
    name: "California Poppy",
    latin: "Eschscholzia californica",
    habitat: "woodland",
    season: "February – June",
    description: "The state flower. Opens with the sun, closes at dusk. On the East Bay hillsides, a week after the first warm rain, entire slopes turn orange without announcement.",
    note: "Self-seeds aggressively. Spreads on disturbed soil, which is why it follows roads and trails.",
  },
  {
    id: "tule",
    name: "Tule",
    latin: "Schoenoplectus acutus",
    habitat: "marsh",
    season: "Perennial",
    description: "The defining plant of California's wetlands. Grows in standing water to six feet. The Ohlone built tule reed boats to cross the Bay. Dense stands shelter nesting birds from sight and sound.",
    note: "\"Tule fog\" — California's winter ground fog — is named for the wetland marshes where it forms.",
  },
  {
    id: "pickleweed",
    name: "Pickleweed",
    latin: "Salicornia pacifica",
    habitat: "estuary",
    season: "Perennial",
    description: "The most salt-tolerant vascular plant in the Bay. Stores excess salt in the tips of its succulent segments — the tips turn red in autumn and drop off, taking the salt with them.",
    note: "Edible and salty, historically eaten raw or pickled. The red color in fall is a natural salt-ejection response.",
  },
  {
    id: "cordgrass",
    name: "Pacific Cordgrass",
    latin: "Spartina foliosa",
    habitat: "estuary",
    season: "Perennial",
    description: "Grows in the intertidal zone where almost nothing else can — flooded twice daily by saltwater. Its roots stabilize the mudflat, building new marsh from sediment over decades.",
    note: "Native cordgrass is now threatened by invasive Atlantic cordgrass, which spreads faster and outcompetes it.",
  },
  {
    id: "cattail",
    name: "Broad-Leaf Cattail",
    latin: "Typha latifolia",
    habitat: "marsh",
    season: "Perennial",
    description: "At Lake Merritt's margins, stands of cattail form a border between water and path. The brown seed heads burst in late summer into drifting cotton. Every part has a traditional use.",
    note: "One of the most productive plant species on earth — generates 6–8 tons of biomass per acre per year.",
  },
  {
    id: "toyon",
    name: "Toyon",
    latin: "Heteromeles arbutifolia",
    habitat: "woodland",
    season: "Berries: November – February",
    description: "Called the California holly. Red berries in winter against dark evergreen leaves. Hollywood, California takes its name from the toyon that once covered its hillsides. Oakland's hills hold it still.",
    note: "Berries are toxic raw but edible when cooked — Ohlone used them roasted or fermented.",
  },
  {
    id: "sticky-monkeyflower",
    name: "Sticky Monkeyflower",
    latin: "Diplacus aurantiacus",
    habitat: "riparian",
    season: "March – September",
    description: "Bright orange flowers on gummy stems. Found on rocky, dry slopes and creek edges. One of the last plants blooming on Oakland hillsides as summer drags on.",
    note: "The sticky resin on its leaves may deter insects from feeding on it — or may trap them as a passive trap.",
  },
  {
    id: "sword-fern",
    name: "Western Sword Fern",
    latin: "Polystichum munitum",
    habitat: "forest",
    season: "Evergreen",
    description: "The understory of Redwood Regional is carpeted in it. Each frond grows to four feet. In the deep shade of the redwood canopy, it is often the only green at eye level.",
    note: "Can live 500+ years. The oldest known plant in a study was still producing new fronds at 538 years.",
  },
  {
    id: "madrone",
    name: "Pacific Madrone",
    latin: "Arbutus menziesii",
    habitat: "woodland",
    season: "Flowers: April – May",
    description: "The only tree in North America that peels. Smooth, cool, terracotta-orange bark beneath. Grows on dry ridges where little else can tolerate the soil. A tree that looks like it's always midway through transformation.",
    note: "Notoriously difficult to transplant — will not survive if the roots are disturbed. Grows only where it chooses.",
  },
];

const HABITAT_COLORS: Record<string, string> = {
  forest: "var(--renge-color-accent)",
  woodland: "var(--renge-color-success)",
  marsh: "var(--renge-color-info)",
  estuary: "var(--renge-color-accent-hover)",
  riparian: "var(--renge-color-accent)",
};

const HABITAT_LABELS: Record<string, string> = {
  forest: "Forest",
  woodland: "Woodland",
  marsh: "Freshwater Marsh",
  estuary: "Salt Marsh / Estuary",
  riparian: "Riparian",
};

// Golden angle: 360° / φ² ≈ 137.5077640500378°
// The angle between successive leaves on a stem — nature's solution to maximal sunlight exposure.
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// ============================================================================
// Animation helpers
// ============================================================================

// Round to 2 decimal places — prevents hydration mismatches from floating-point
// differences between Node.js and browser (e.g. Math.sin(Math.PI) = 1.22e-16, not 0)
const f = (n: number) => Math.round(n * 100) / 100;

function FadeIn({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.382, 0, 0.168, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 1400;
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

// ============================================================================
// Phyllotaxis Flora Map
// ============================================================================

// 55 total positions (Fibonacci) — the spiral needs density to be visible.
// 14 plants are spread evenly across these positions; the rest are background dots.
const PHYLLOTAXIS_TOTAL = 55;
const PLANT_POSITIONS: number[] = PLANTS.map((_, i) =>
  Math.round((i * (PHYLLOTAXIS_TOTAL - 1)) / (PLANTS.length - 1))
);

function PhyllotaxisFlora() {
  const [hovered, setHovered] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-60px 0px" });

  const SCALE = 13.5; // scale × √n → max radius at n=54: ~99px

  // Pre-compute all 55 positions
  const allDots = Array.from({ length: PHYLLOTAXIS_TOTAL }, (_, n) => {
    const r = SCALE * Math.sqrt(n + 1);
    const theta = n * GOLDEN_ANGLE;
    const plantIdx = PLANT_POSITIONS.indexOf(n);
    const plant = plantIdx !== -1 ? PLANTS[plantIdx] : null;
    return { n, x: f(r * Math.cos(theta)), y: f(r * Math.sin(theta)), plant };
  });

  const hoveredPlant = hovered ? PLANTS.find((p) => p.id === hovered) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--renge-space-4)" }}>
      <div style={{ position: "relative" }}>
        <svg
          ref={svgRef}
          viewBox="-106 -106 212 212"
          style={{ width: 320, height: 320 }}
        >
          {allDots.map(({ n, x, y, plant }) =>
            plant ? (
              // Plant dot — colored, larger, interactive
              <motion.circle
                key={`plant-${plant.id}`}
                cx={x}
                cy={y}
                r={7}
                fill={HABITAT_COLORS[plant.habitat]}
                initial={{ opacity: 0 }}
                animate={
                  inView
                    ? { opacity: hovered && hovered !== plant.id ? 0.15 : 0.9 }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.4, delay: n * 0.018, ease: [0.382, 0, 0.168, 1] }}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(plant.id)}
                onMouseLeave={() => setHovered(null)}
              />
            ) : (
              // Background dot — small, neutral, shows the spiral structure
              <motion.circle
                key={`bg-${n}`}
                cx={x}
                cy={y}
                r={2.5}
                fill="var(--renge-color-border)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.45 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: n * 0.018 }}
              />
            )
          )}
        </svg>

        {hoveredPlant && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none",
              background: "color-mix(in oklch, var(--renge-color-bg) 96%, transparent)",
              backdropFilter: "blur(8px)",
              borderRadius: "var(--renge-radius-2)",
              padding: "var(--renge-space-2) var(--renge-space-3)",
              border: "1px solid var(--renge-color-border-subtle)",
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg)", fontWeight: 500 }}>
              {hoveredPlant.name}
            </div>
            <div style={{ fontStyle: "italic", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)" }}>
              {hoveredPlant.latin}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "var(--renge-space-4)", flexWrap: "wrap", justifyContent: "center" }}>
        {(Object.entries(HABITAT_LABELS) as [string, string][]).map(([key, label]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-2)" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: HABITAT_COLORS[key], flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SVG Illustrations
// ============================================================================

// Botanical plant illustrations — thin-stroke, single-color, respond to CSS vars
const PLANT_SVGS: Record<string, React.FC<{ size?: number }>> = {
  "coast-redwood": ({ size = 80 }) => (
    <svg viewBox="0 0 60 100" width={size} height={size * 100/60} fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" strokeLinejoin="round">
      {/* Trunk */}
      <line x1="30" y1="100" x2="30" y2="10" />
      <line x1="28" y1="100" x2="28" y2="40" />
      <line x1="32" y1="100" x2="32" y2="40" />
      {/* Branch tiers bottom → top, each narrower */}
      <polyline points="6,82 30,68 54,82" /><polyline points="6,82 8,76" /><polyline points="54,82 52,76" />
      <polyline points="10,70 30,58 50,70" /><polyline points="10,70 12,65" /><polyline points="50,70 48,65" />
      <polyline points="14,58 30,48 46,58" />
      <polyline points="17,47 30,38 43,47" />
      <polyline points="20,36 30,28 40,36" />
      <polyline points="23,26 30,19 37,26" />
      {/* Crown */}
      <polyline points="26,18 30,10 34,18" />
      {/* Root flare */}
      <path d="M28,100 Q22,96 18,100" /><path d="M32,100 Q38,96 42,100" />
    </svg>
  ),
  "sword-fern": ({ size = 80 }) => (
    <svg viewBox="0 0 80 80" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={0.7} strokeLinecap="round">
      {/* Multiple arching fronds from base */}
      {[
        { cx: 40, cy: 75, dx: -30, dy: -50 },
        { cx: 40, cy: 75, dx: -15, dy: -55 },
        { cx: 40, cy: 75, dx:   0, dy: -60 },
        { cx: 40, cy: 75, dx:  15, dy: -55 },
        { cx: 40, cy: 75, dx:  30, dy: -50 },
      ].map(({ cx, cy, dx, dy }, i) => {
        const ex = cx + dx, ey = cy + dy;
        const mx = cx + dx * 0.5 + (i < 2 ? -8 : i > 2 ? 8 : 0), my = cy + dy * 0.5;
        return (
          <g key={i}>
            <path d={`M${cx},${cy} Q${mx},${my} ${ex},${ey}`} />
            {/* Pinnae along rachis */}
            {[0.2,0.35,0.5,0.65,0.8].map((t) => {
              const px = cx + dx * t + (dx * 0.5 + (i < 2 ? -8 : i > 2 ? 8 : 0) - dx * 0.5) * 2 * t * (1-t);
              const py = cy + dy * t;
              const angle = Math.atan2(dy, dx) + Math.PI/2;
              const pl = 6 * t;
              return (
                <g key={t}>
                  <line x1={f(px)} y1={f(py)} x2={f(px + Math.cos(angle)*pl)} y2={f(py + Math.sin(angle)*pl)} />
                  <line x1={f(px)} y1={f(py)} x2={f(px - Math.cos(angle)*pl)} y2={f(py - Math.sin(angle)*pl)} />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  ),
  "bay-laurel": ({ size = 80 }) => (
    <svg viewBox="0 0 70 90" width={size} height={size * 90/70} fill="none" stroke="currentColor" strokeWidth={0.75} strokeLinecap="round">
      {/* Trunk */}
      <line x1="35" y1="90" x2="35" y2="55" />
      {/* Main branches */}
      <path d="M35,70 Q20,55 10,45" />
      <path d="M35,65 Q25,50 20,38" />
      <path d="M35,70 Q50,55 60,45" />
      <path d="M35,65 Q48,52 52,40" />
      <path d="M35,60 Q35,45 35,30" />
      {/* Leaf clusters — oval leaves */}
      {[
        [10,42],[12,36],[18,34],[22,36],
        [20,35],[22,29],[26,26],
        [60,42],[58,36],[52,37],[50,33],
        [52,37],[50,31],[46,28],
        [33,28],[35,22],[37,28],[31,24],[39,24],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={4} ry={6.5} transform={`rotate(${(i*37)%60 - 30},${x},${y})`} />
      ))}
    </svg>
  ),
  "california-poppy": ({ size = 80 }) => (
    <svg viewBox="0 0 70 90" width={size} height={size * 90/70} fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round">
      {/* Stems — slender and curved */}
      <path d="M35,90 Q33,75 32,60 Q31,50 35,38" />
      <path d="M35,85 Q28,72 22,62 Q18,55 19,44" />
      <path d="M35,80 Q44,68 50,58 Q54,50 51,40" />
      {/* Open cup flowers — 4 petals */}
      {[
        { cx: 35, cy: 32, r: 10 },
        { cx: 19, cy: 38, r: 8 },
        { cx: 51, cy: 34, r: 8 },
      ].map(({ cx, cy, r }, fi) => (
        <g key={fi}>
          {[0,90,180,270].map((a) => {
            const rad = (a * Math.PI) / 180;
            const px = f(cx + Math.cos(rad) * r * 0.4);
            const py = f(cy + Math.sin(rad) * r * 0.4);
            const ex = f(cx + Math.cos(rad) * r);
            const ey = f(cy + Math.sin(rad) * r);
            const cx1 = f(cx + Math.cos(rad - 0.6) * r * 0.9);
            const cy1 = f(cy + Math.sin(rad - 0.6) * r * 0.9);
            const cx2 = f(cx + Math.cos(rad+0.6)*r*0.9);
            const cy2 = f(cy + Math.sin(rad+0.6)*r*0.9);
            return <path key={a} d={`M${px},${py} Q${cx1},${cy1} ${ex},${ey} Q${cx2},${cy2} ${px},${py}`} />;
          })}
          {/* Center */}
          <circle cx={cx} cy={cy} r={2} />
        </g>
      ))}
      {/* Feathery leaves */}
      <path d="M34,65 Q28,60 24,62" />
      <path d="M34,65 Q30,58 28,54" />
      <path d="M36,62 Q42,57 46,59" />
    </svg>
  ),
  "tule": ({ size = 80 }) => (
    <svg viewBox="0 0 70 100" width={size} height={size * 100/70} fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round">
      {/* Multiple vertical stems */}
      {[18,26,35,44,52].map((x, i) => (
        <g key={x}>
          <path d={`M${x},100 Q${x + (i%2===0?2:-2)},70 ${x + (i%3-1)*3},${15 + i*4}`} />
          {/* Seed head — cylindrical */}
          <ellipse cx={x + (i%3-1)*3} cy={10 + i*4} rx={3} ry={6} />
          {/* Bract spike above */}
          <line x1={x + (i%3-1)*3} y1={4 + i*4} x2={x + (i%3-1)*3 + 2} y2={-2 + i*4} />
        </g>
      ))}
      {/* Water line */}
      <path d="M5,88 Q17,85 30,88 Q43,91 55,88 Q62,86 68,88" strokeDasharray="3,2" opacity={0.5} />
    </svg>
  ),
  "pickleweed": ({ size = 80 }) => (
    <svg viewBox="0 0 80 80" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={0.9} strokeLinecap="round">
      {/* Succulent segmented branches */}
      {/* Main stems */}
      <path d="M40,80 Q38,70 38,60" />
      <path d="M40,80 Q44,70 44,60" />
      {/* Left branch system */}
      <path d="M38,60 Q32,52 28,44" />
      <path d="M38,60 Q36,50 38,40" />
      {/* Right branch system */}
      <path d="M44,60 Q50,52 54,44" />
      <path d="M44,60 Q46,50 44,40" />
      {/* Segments — rounded cylinders along each branch */}
      {[
        {x:38,y:60},{x:36,y:54},{x:34,y:48},{x:31,y:43},{x:29,y:38},
        {x:38,y:52},{x:38,y:46},{x:38,y:40},{x:38,y:34},
        {x:44,y:60},{x:46,y:54},{x:49,y:48},{x:52,y:43},{x:54,y:38},
        {x:44,y:52},{x:44,y:46},{x:44,y:40},{x:44,y:34},
      ].map(({ x, y }, i) => (
        <ellipse key={i} cx={x} cy={y} rx={3.5} ry={4} />
      ))}
      {/* Red tip segments (autumn) — shown as small filled marks */}
      {[{x:29,y:35},{x:38,y:30},{x:54,y:35},{x:44,y:30}].map(({ x, y }, i) => (
        <ellipse key={`tip-${i}`} cx={x} cy={y} rx={3} ry={3.5} opacity={0.5} />
      ))}
      {/* Ground line */}
      <line x1="15" y1="80" x2="65" y2="80" opacity={0.3} />
    </svg>
  ),
  "cattail": ({ size = 80 }) => (
    <svg viewBox="0 0 60 100" width={size} height={size * 100/60} fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round">
      {/* Three stems */}
      {[18,30,42].map((x, i) => (
        <g key={x}>
          <path d={`M${x},100 Q${x + (i-1)*3},75 ${x},${14 + i*6}`} />
          {/* Brown cylindrical seed head */}
          <rect x={x - 4} y={10 + i*6} width={8} height={22} rx={4} opacity={0.8} />
          {/* Thin spike above */}
          <line x1={x} y1={10 + i*6} x2={x} y2={4 + i*3} />
          {/* Leaf blades */}
          <path d={`M${x-2},80 Q${x - 12 + i*4},60 ${x - 8 + i*2},40`} />
          <path d={`M${x+2},80 Q${x + 14 - i*4},55 ${x + 10 - i*2},35`} />
        </g>
      ))}
      {/* Water */}
      <path d="M5,92 Q20,89 35,92 Q50,95 58,92" strokeDasharray="2,2" opacity={0.4} />
    </svg>
  ),
  "coast-live-oak": ({ size = 80 }) => (
    <svg viewBox="0 0 100 90" width={size} height={size * 90/100} fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round">
      {/* Trunk */}
      <path d="M50,90 Q48,75 46,60 Q44,50 50,44" />
      <line x1="52" y1="90" x2="52" y2="65" />
      {/* Characteristically curved limbs */}
      <path d="M48,65 Q30,58 15,65 Q8,70 5,80" />
      <path d="M48,60 Q35,48 25,42 Q18,38 15,30" />
      <path d="M50,55 Q40,42 38,28" />
      <path d="M52,65 Q70,58 85,65 Q92,70 95,80" />
      <path d="M52,60 Q65,48 75,42 Q82,38 85,30" />
      <path d="M50,52 Q62,40 65,26" />
      {/* Canopy — small spiky oak leaves */}
      {[
        [5,77],[12,68],[20,58],[16,46],[26,38],[28,26],[38,24],
        [50,25],[62,24],[72,26],[74,38],[84,46],[80,58],[88,68],[95,77],
        [22,52],[32,42],[40,32],[48,20],[56,20],[64,30],[72,42],[78,52],
      ].map(([x,y], i) => (
        <path key={i} d={`M${x},${y} l2,-3 l1,3 l3,0 l-2,2 l1,3 l-3,-1 l-3,1 l1,-3 l-2,-2 z`} transform={`rotate(${i*47%360},${x},${y})`} />
      ))}
    </svg>
  ),
  "toyon": ({ size = 80 }) => (
    <svg viewBox="0 0 80 90" width={size} height={size * 90/80} fill="none" stroke="currentColor" strokeWidth={0.75} strokeLinecap="round">
      {/* Trunk */}
      <path d="M40,90 Q39,75 38,60" />
      {/* Branches */}
      <path d="M38,68 Q25,58 16,50" /><path d="M38,62 Q28,50 24,38" />
      <path d="M40,65 Q40,52 40,38" />
      <path d="M38,68 Q52,58 62,50" /><path d="M38,62 Q50,50 54,38" />
      {/* Holly-like leaves — oval with serrated hint */}
      {[
        [14,48],[18,42],[22,36],[26,32],[24,46],
        [38,35],[40,28],[42,35],
        [62,48],[58,42],[54,36],[50,32],[52,46],
      ].map(([x,y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={4.5} ry={7} transform={`rotate(${(i*40)%70 - 35},${x},${y})`} />
        </g>
      ))}
      {/* Berry clusters — small circles */}
      {[
        [16,44],[18,40],[20,42],
        [38,30],[40,26],[42,30],[36,28],
        [62,44],[60,40],[58,42],
      ].map(([x,y], i) => (
        <circle key={`b${i}`} cx={x} cy={y} r={2.5} />
      ))}
    </svg>
  ),
  "sticky-monkeyflower": ({ size = 80 }) => (
    <svg viewBox="0 0 70 90" width={size} height={size * 90/70} fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round">
      {/* Stems */}
      <path d="M35,90 Q33,75 34,60 Q35,48 33,36" />
      <path d="M35,80 Q44,68 50,56 Q54,46 52,34" />
      <path d="M35,75 Q26,63 22,52 Q19,43 22,33" />
      {/* Tubular flowers — monkey face shape */}
      {[
        { cx: 32, cy: 30 },
        { cx: 52, cy: 28 },
        { cx: 22, cy: 27 },
      ].map(({ cx, cy }, i) => (
        <g key={i}>
          {/* Tube */}
          <path d={`M${cx-4},${cy+10} Q${cx-5},${cy+2} ${cx},${cy-2} Q${cx+5},${cy+2} ${cx+4},${cy+10}`} />
          {/* Upper lobes */}
          <path d={`M${cx-3},${cy+2} Q${cx-8},${cy-5} ${cx-6},${cy-10} Q${cx-2},${cy-8} ${cx},${cy-2}`} />
          <path d={`M${cx+3},${cy+2} Q${cx+8},${cy-5} ${cx+6},${cy-10} Q${cx+2},${cy-8} ${cx},${cy-2}`} />
          {/* Lower lip */}
          <path d={`M${cx-4},${cy+4} Q${cx},${cy+12} ${cx+4},${cy+4}`} />
          {/* Throat dots */}
          <circle cx={cx-1} cy={cy+4} r={1} />
          <circle cx={cx+1} cy={cy+6} r={0.8} />
        </g>
      ))}
      {/* Leaves — opposite, lance-shaped */}
      {[{x:33,y:55},{x:35,y:45},{x:34,y:68}].map(({x,y}, i) => (
        <g key={`l${i}`}>
          <ellipse cx={x-8} cy={y} rx={7} ry={3} transform={`rotate(-30,${x-8},${y})`} />
          <ellipse cx={x+8} cy={y} rx={7} ry={3} transform={`rotate(30,${x+8},${y})`} />
        </g>
      ))}
    </svg>
  ),
  "madrone": ({ size = 80 }) => (
    <svg viewBox="0 0 80 90" width={size} height={size * 90/80} fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round">
      {/* Trunk — smooth, slightly sinuous */}
      <path d="M40,90 Q38,78 37,65 Q36,55 40,48" />
      {/* Peeling bark indication */}
      <path d="M38,85 Q35,82 36,78" strokeDasharray="2,1.5" />
      <path d="M41,80 Q44,77 43,72" strokeDasharray="2,1.5" />
      {/* Branches */}
      <path d="M38,62 Q25,54 16,46" />
      <path d="M39,56 Q28,46 24,34" />
      <path d="M40,52 Q40,40 40,28" />
      <path d="M42,62 Q56,54 64,46" />
      <path d="M41,56 Q52,46 56,34" />
      {/* Leaves — lance-shaped, glossy looking */}
      {[
        [14,44],[18,38],[22,32],[26,28],[28,22],
        [38,25],[40,18],[42,25],
        [64,44],[60,38],[56,32],[52,28],[50,22],
      ].map(([x,y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={5} ry={8} transform={`rotate(${(i*55)%80-40},${x},${y})`} />
      ))}
      {/* Flower/berry clusters */}
      {[[16,42],[40,16],[64,42]].map(([x,y],i)=>(
        <g key={`fl${i}`}>
          {[0,60,120,180,240,300].map(a=>{
            const r=5, rad=a*Math.PI/180;
            return <circle key={a} cx={f(x+Math.cos(rad)*r)} cy={f(y+Math.sin(rad)*r)} r={1.5} />;
          })}
        </g>
      ))}
    </svg>
  ),
  "cordgrass": ({ size = 80 }) => (
    <svg viewBox="0 0 70 90" width={size} height={size * 90/70} fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round">
      {/* Multiple grass blades — upright, slightly arching */}
      {[12,20,28,35,42,50,58].map((x, i) => {
        const arch = (i%2===0 ? 1 : -1) * 4;
        const h = 30 + (i%3)*12;
        return (
          <g key={x}>
            <path d={`M${x},90 Q${x+arch},${60} ${x+arch*0.5},${90-h}`} />
            {/* Seed spike */}
            <path d={`M${x+arch*0.5},${90-h} Q${x+arch*0.5+2},${90-h-8} ${x+arch*0.5},${90-h-14}`}
              strokeWidth={1.2} />
            {/* Leaf blade off main stem */}
            <path d={`M${x},${70} Q${x+arch*2},${55} ${x+arch*1.5},${45}`} />
          </g>
        );
      })}
      {/* Mudflat / tidal water line */}
      <path d="M5,88 Q20,85 35,88 Q50,91 65,88" strokeDasharray="3,2" opacity={0.45} />
    </svg>
  ),
};

// Park landscape SVGs
const PARK_SVGS: Record<string, React.FC> = {
  "Redwood Regional Park": () => (
    <svg viewBox="0 0 280 120" width="100%" style={{ display: "block" }} fill="none" stroke="currentColor" strokeWidth={0.7} strokeLinecap="round">
      {/* Sky suggestion */}
      <rect x={0} y={0} width={280} height={120} fill="currentColor" opacity={0.03} rx={8} />
      {/* Ground */}
      <path d="M0,95 Q70,88 140,92 Q210,96 280,90" fill="currentColor" fillOpacity={0.04} />
      {/* Distant ridge */}
      <path d="M0,80 Q40,65 80,70 Q120,75 140,60 Q160,45 200,55 Q240,65 280,55" opacity={0.2} />
      {/* Redwood silhouettes — tall spires */}
      {[30,55,80,105,130,155,175,200,225,248].map((x, i) => {
        const h = 50 + (i%3)*18;
        const w = 6 + (i%2)*2;
        return (
          <g key={x} opacity={0.7 + (i%3)*0.1}>
            <line x1={x} y1={95} x2={x} y2={95-h} strokeWidth={w*0.15} />
            {/* Tiered branch silhouette */}
            {[0.25,0.4,0.55,0.7,0.82,0.9,0.96].map((t) => {
              const y = 95 - h * t;
              const span = w * (1-t) * 1.8;
              return <line key={t} x1={x-span} y1={y} x2={x+span} y2={y} strokeWidth={0.6} />;
            })}
          </g>
        );
      })}
      {/* Fern understory */}
      {[20,60,100,140,180,220,260].map((x,i)=>(
        <path key={x} d={`M${x},95 Q${x-8},88 ${x-14},82 M${x},95 Q${x+8},87 ${x+12},80`} opacity={0.3} />
      ))}
      {/* Light rays through canopy */}
      {[70,140,210].map((x,i)=>(
        <line key={x} x1={x} y1={15} x2={x+10} y2={95} strokeDasharray="3,8" opacity={0.08} strokeWidth={8} />
      ))}
    </svg>
  ),
  "Joaquin Miller Park": () => (
    <svg viewBox="0 0 280 120" width="100%" style={{ display: "block" }} fill="none" stroke="currentColor" strokeWidth={0.7} strokeLinecap="round">
      <rect x={0} y={0} width={280} height={120} fill="currentColor" opacity={0.03} rx={8} />
      {/* Rolling hills */}
      <path d="M0,85 Q30,65 70,72 Q110,78 140,60 Q170,42 210,58 Q250,74 280,62" fill="currentColor" fillOpacity={0.04} />
      <path d="M0,95 Q60,88 120,92 Q180,96 240,90 Q260,88 280,91" fill="currentColor" fillOpacity={0.06} />
      {/* Oak silhouettes — spreading canopy */}
      {[
        {x:40, y:72, r:22},
        {x:95, y:65, r:18},
        {x:145, y:58, r:25},
        {x:200, y:65, r:20},
        {x:250, y:70, r:17},
      ].map(({x,y,r},i) => (
        <g key={x}>
          {/* Trunk */}
          <path d={`M${x},95 Q${x-2},${y+r*0.3} ${x},${y+r*0.1}`} strokeWidth={1.2} />
          {/* Canopy blob — oak-shaped */}
          <path d={`M${x},${y-r} Q${x+r},${y-r*0.8} ${x+r},${y} Q${x+r},${y+r*0.5} ${x},${y+r*0.4} Q${x-r},${y+r*0.5} ${x-r},${y} Q${x-r},${y-r*0.8} ${x},${y-r}`} opacity={0.65} />
          {/* Internal leaf texture */}
          <path d={`M${x-r*0.5},${y-r*0.3} Q${x},${y-r*0.7} ${x+r*0.5},${y-r*0.2}`} opacity={0.3} />
          <path d={`M${x-r*0.4},${y+r*0.1} Q${x},${y-r*0.2} ${x+r*0.4},${y+r*0.2}`} opacity={0.25} />
        </g>
      ))}
      {/* Madrone — smooth lighter trunk */}
      {[120,230].map((x,i)=>(
        <g key={`m${x}`}>
          <path d={`M${x},95 Q${x+3},80 ${x-2},65`} strokeWidth={0.9} strokeDasharray="0" />
          <path d={`M${x-2},65 Q${x-15},55 ${x-20},45`} />
          <path d={`M${x-2},65 Q${x+12},55 ${x+16},46`} />
          <ellipse cx={x-20} cy={40} rx={10} ry={7} opacity={0.5} />
          <ellipse cx={x+16} cy={41} rx={9} ry={6} opacity={0.5} />
        </g>
      ))}
      {/* Wildflowers */}
      {[50,90,160,220].map((x,i)=>(
        <g key={`f${x}`}>
          <line x1={x} y1={95} x2={x} y2={88} strokeWidth={0.5} />
          <circle cx={x} cy={87} r={2} opacity={0.6} />
        </g>
      ))}
    </svg>
  ),
  "Lake Merritt": () => (
    <svg viewBox="0 0 280 120" width="100%" style={{ display: "block" }} fill="none" stroke="currentColor" strokeWidth={0.7} strokeLinecap="round">
      <rect x={0} y={0} width={280} height={120} fill="currentColor" opacity={0.03} rx={8} />
      {/* Lake shape — oval */}
      <ellipse cx={140} cy={72} rx={110} ry={38} fill="currentColor" fillOpacity={0.05} />
      {/* Water ripple lines */}
      {[0.3,0.55,0.75,0.9].map((t,i)=>(
        <ellipse key={i} cx={140} cy={72} rx={110*t} ry={38*t} opacity={0.12 + i*0.05} />
      ))}
      {/* Cattail fringe along shore */}
      {[30,45,60,75,195,210,225,240].map((x,i)=>{
        const y = f(i < 4 ? 78+Math.sin(i)*4 : 75+Math.cos(i)*3);
        return (
          <g key={x}>
            <line x1={x} y1={95} x2={x} y2={y} />
            <rect x={x-2.5} y={y-6} width={5} height={10} rx={2.5} opacity={0.7} />
            <line x1={x} y1={y-6} x2={x} y2={y-12} />
          </g>
        );
      })}
      {/* City skyline silhouette */}
      {[
        {x:100,h:18},{x:108,h:28},{x:116,h:22},{x:125,h:35},{x:134,h:25},
        {x:142,h:40},{x:150,h:28},{x:158,h:22},{x:165,h:30},{x:172,h:18},
      ].map(({x,h},i)=>(
        <rect key={x} x={x-4} y={28-h} width={8} height={h} opacity={0.1} rx={1} fill="currentColor" stroke="none" />
      ))}
      {/* Heron */}
      <path d="M170,60 Q172,56 175,58 Q173,54 170,52 Q168,54 167,58 Q169,57 170,60" opacity={0.4} />
      {/* Light on water */}
      {[80,130,180].map((x,i)=>(
        <line key={x} x1={x} y1={55} x2={x+5} y2={65} strokeDasharray="1,4" opacity={0.15} strokeWidth={3} />
      ))}
    </svg>
  ),
  "MLK Regional Shoreline": () => (
    <svg viewBox="0 0 280 120" width="100%" style={{ display: "block" }} fill="none" stroke="currentColor" strokeWidth={0.7} strokeLinecap="round">
      <rect x={0} y={0} width={280} height={120} fill="currentColor" opacity={0.03} rx={8} />
      {/* Flat marsh — low horizon */}
      <path d="M0,75 Q70,72 140,74 Q210,76 280,72" opacity={0.15} />
      {/* Bay water fill */}
      <path d="M0,78 Q140,72 280,76 L280,120 L0,120 Z" fill="currentColor" fillOpacity={0.04} />
      {/* Bay water ripples */}
      {[10,25,40,55,70].map((y,i)=>(
        <path key={y} d={`M20,${78+y} Q80,${75+y} 140,${78+y} Q200,${81+y} 260,${77+y}`} opacity={0.08+i*0.02} />
      ))}
      {/* Salt marsh — pickleweed low flat plants */}
      {Array.from({length:22},(_, i)=>{
        const x = 8 + i*12 + (i%3)*4;
        const y = 72 + (i%4)*2;
        return (
          <g key={i}>
            <path d={`M${x},${y+5} Q${x-3},${y+2} ${x-2},${y}`} />
            <path d={`M${x},${y+5} Q${x+3},${y+2} ${x+2},${y}`} />
            <path d={`M${x},${y+5} Q${x},${y+1} ${x},${y-1}`} />
          </g>
        );
      })}
      {/* Distant East Bay hills */}
      <path d="M0,52 Q30,40 70,45 Q110,50 140,38 Q170,26 210,35 Q240,42 280,36" opacity={0.1} />
      {/* Birds over bay */}
      {[80,140,200].map((x,i)=>(
        <path key={x} d={`M${x},${30+i*5} Q${x+4},${27+i*5} ${x+8},${30+i*5}`} opacity={0.3} />
      ))}
      {/* Distant shipping container cranes — Oakland landmark */}
      {[200,220,238].map((x,i)=>(
        <g key={x} opacity={0.12}>
          <line x1={x} y1={68} x2={x} y2={28} />
          <line x1={x-12} y1={32} x2={x+8} y2={32} />
          <line x1={x-12} y1={32} x2={x-12} y2={40} />
          <line x1={x+8} y1={32} x2={x+8} y2={44} />
        </g>
      ))}
    </svg>
  ),
  "Leona Canyon": () => (
    <svg viewBox="0 0 280 120" width="100%" style={{ display: "block" }} fill="none" stroke="currentColor" strokeWidth={0.7} strokeLinecap="round">
      <rect x={0} y={0} width={280} height={120} fill="currentColor" opacity={0.03} rx={8} />
      {/* Canyon walls */}
      <path d="M0,30 Q20,35 40,50 Q60,65 70,95" fill="currentColor" fillOpacity={0.06} />
      <path d="M280,25 Q260,32 240,48 Q220,64 210,95" fill="currentColor" fillOpacity={0.06} />
      {/* Rock strata lines */}
      {[35,45,55].map((y,i)=>(
        <path key={y} d={`M${10+i*5},${y} Q${50},${y+5} ${80},${y+2}`} opacity={0.2} />
      ))}
      {[30,42,52].map((y,i)=>(
        <path key={`r${y}`} d={`M${270-i*5},${y} Q${230},${y+5} ${200},${y+2}`} opacity={0.2} />
      ))}
      {/* Creek at canyon floor */}
      <path d="M60,95 Q90,85 120,90 Q150,95 180,88 Q210,82 220,95" strokeWidth={1.5} opacity={0.4} />
      <path d="M62,97 Q92,88 122,93 Q152,97 182,91 Q212,85 222,97" opacity={0.15} strokeDasharray="4,3" />
      {/* Oak canopy over creek */}
      {[85,115,145,170,198].map((x,i)=>(
        <g key={x}>
          <path d={`M${x},95 Q${x-1},80 ${x},70`} strokeWidth={0.9} />
          <path d={`M${x},70 Q${x-20},60 ${x-25},50 M${x},70 Q${x+18},58 ${x+22},48`} />
          {/* Spreading canopy */}
          <path d={`M${x-26},48 Q${x-10},38 ${x+24},46`} />
          <path d={`M${x-26},48 Q${x-15},55 ${x-10},60 M${x+24},46 Q${x+12},55 ${x+8},62`} opacity={0.5} />
        </g>
      ))}
      {/* Canyon bottom vegetation */}
      {[70,100,130,160,195,215].map((x,i)=>(
        <g key={`v${x}`} opacity={0.4}>
          <path d={`M${x},95 Q${x-5},87 ${x-8},80`} />
          <path d={`M${x},95 Q${x+4},87 ${x+6},82`} />
        </g>
      ))}
      {/* Dappled light spots */}
      {[90,140,185].map((x,i)=>(
        <ellipse key={x} cx={x} cy={88} rx={8} ry={4} opacity={0.06} fill="currentColor" stroke="none" />
      ))}
    </svg>
  ),
};

// ============================================================================
// Plant Card
// ============================================================================

function PlantCard({ plant }: { plant: (typeof PLANTS)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const PlantSVG = PLANT_SVGS[plant.id];

  return (
    <Card
      style={{
        cursor: "pointer",
        transition: "box-shadow 300ms var(--renge-easing-ease-out), transform 300ms var(--renge-easing-ease-out)",
      }}
      onClick={() => setExpanded((v) => !v)}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 32px oklch(0% 0 0 / 0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "";
      }}
    >
      <Stack gap="3">
        {/* Illustration header */}
        {PlantSVG && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--renge-space-4) var(--renge-space-3) var(--renge-space-3)",
              background: "var(--renge-color-bg-subtle)",
              borderRadius: "var(--renge-radius-2)",
              color: "var(--renge-color-accent)",
              minHeight: 100,
            }}
          >
            <PlantSVG size={72} />
          </div>
        )}
        <Stack gap="2" direction="horizontal" align="center" style={{ justifyContent: "space-between" }}>
          <Stack gap="1">
            <Text
              size="sm"
              style={{ fontFamily: "var(--font-body)", color: "var(--renge-color-fg-subtle)", fontStyle: "italic" }}
            >
              {plant.latin}
            </Text>
            <Heading
              level={3}
              style={{ fontSize: "var(--renge-font-size-lg)", lineHeight: 1.2 }}
            >
              {plant.name}
            </Heading>
          </Stack>
          <motion.span
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "var(--renge-radius-full)",
              border: "1px solid var(--renge-color-border)",
              color: "var(--renge-color-fg-subtle)",
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            +
          </motion.span>
        </Stack>

        <Stack gap="2" direction="horizontal" style={{ flexWrap: "wrap" }}>
          <Badge
            style={{
              background: `color-mix(in oklch, ${HABITAT_COLORS[plant.habitat]} 12%, transparent)`,
              color: HABITAT_COLORS[plant.habitat],
              border: `1px solid color-mix(in oklch, ${HABITAT_COLORS[plant.habitat]} 30%, transparent)`,
            }}
          >
            {HABITAT_LABELS[plant.habitat]}
          </Badge>
          <Badge variant="neutral">{plant.season}</Badge>
        </Stack>

        <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.6 }}>
          {plant.description}
        </Text>

        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.382, 0, 0.168, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div
            style={{
              borderTop: "1px solid var(--renge-color-border-subtle)",
              paddingTop: "var(--renge-space-3)",
              marginTop: "var(--renge-space-1)",
            }}
          >
            <Text
              size="sm"
              style={{
                color: "var(--renge-color-fg-subtle)",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              {plant.note}
            </Text>
          </div>
        </motion.div>
      </Stack>
    </Card>
  );
}

// ============================================================================
// Park Card
// ============================================================================

function ParkCard({ park }: { park: (typeof PARKS)[0] }) {
  const ParkSVG = PARK_SVGS[park.name];

  return (
    <Card
      style={{
        background: "var(--renge-color-bg-subtle)",
        border: "1px solid var(--renge-color-border-subtle)",
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Landscape illustration */}
      {ParkSVG && (
        <div
          style={{
            color: "var(--renge-color-accent)",
            borderBottom: "1px solid var(--renge-color-border-subtle)",
            lineHeight: 0,
          }}
        >
          <ParkSVG />
        </div>
      )}
      <Stack gap="3" style={{ padding: "var(--renge-space-4)" }}>
        <Stack gap="1">
          <Stack gap="2" direction="horizontal" align="center" style={{ justifyContent: "space-between" }}>
            <Badge variant="neutral" style={{ fontSize: "var(--renge-font-size-sm)" }}>
              {park.type}
            </Badge>
            <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)" }}>
              {park.elevation}
            </Text>
          </Stack>
          <Heading level={3} style={{ fontSize: "var(--renge-font-size-xl)" }}>
            {park.name}
          </Heading>
        </Stack>
        <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.65 }}>
          {park.description}
        </Text>
      </Stack>
    </Card>
  );
}

// ============================================================================
// Page
// ============================================================================

export default function OaklandPage() {
  const forestPlants = PLANTS.filter((p) => p.habitat === "forest");
  const woodlandPlants = PLANTS.filter((p) => p.habitat === "woodland");
  const wetlandPlants = PLANTS.filter((p) => p.habitat === "marsh" || p.habitat === "estuary");
  const riparianPlants = PLANTS.filter((p) => p.habitat === "riparian");

  return (
    <ProfileProvider defaultProfile="leaf">
      <Nav />
      <main>
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <Section
          style={{
            minHeight: "100svh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: "var(--renge-space-7)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background ratio mark */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <svg
              viewBox="0 0 800 494"
              style={{
                width: "min(80vw, 700px)",
                opacity: 0.04,
                color: "var(--renge-color-accent)",
              }}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.5}
            >
              {/* PHI rectangle 1:1.618 */}
              <rect x="100" y="47" width="600" height="370.9" />
              {/* Square partition */}
              <line x1="470.9" y1="47" x2="470.9" y2="417.9" />
              {/* Nested golden rectangle */}
              <rect x="470.9" y="47" width="229.1" height="141.5" />
              {/* Fibonacci spiral approximation */}
              <path d="M470.9,47 Q700,47 700,188.5 Q700,417.9 470.9,417.9 Q100,417.9 100,235.4 Q100,47 312.5,47" />
            </svg>
          </div>

          <Stack gap="5" style={{ maxWidth: "52rem", position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.382, 0, 0.168, 1], delay: 0.2 }}
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
                Oakland, California — 37.8044° N, 122.2712° W
              </Text>
              <Heading
                level={1}
                style={{
                  fontSize: "clamp(var(--renge-font-size-3xl), 6vw, var(--renge-font-size-4xl))",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                The living city.
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.382, 0, 0.168, 1], delay: 0.5 }}
            >
              <Text
                size="lg"
                style={{
                  color: "var(--renge-color-fg-subtle)",
                  lineHeight: 1.65,
                  maxWidth: "38rem",
                }}
              >
                Coast redwood and salt marsh. Oak woodland and tidal estuary.
                Within the city limits of Oakland, California, a full spectrum
                of native plant communities persists — unchanged in type if not
                in scale from what the Ohlone people lived among for 3,000 years.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Stack gap="4" direction="horizontal" style={{ flexWrap: "wrap" }}>
                {[
                  { value: 52, label: "parks & open spaces", suffix: "" },
                  { value: 7700, label: "acres of open space", suffix: "+" },
                  { value: 12, label: "plant communities", suffix: "" },
                ].map((stat) => (
                  <Stack key={stat.label} gap="1">
                    <Text
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--renge-font-size-3xl)",
                        color: "var(--renge-color-accent)",
                        lineHeight: 1,
                      }}
                    >
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </Text>
                    <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {stat.label}
                    </Text>
                  </Stack>
                ))}
              </Stack>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <ProfileToggle />
            </motion.div>
          </Stack>
        </Section>

        {/* ── Parks ─────────────────────────────────────────────────────────── */}
        <Section style={{ paddingTop: "var(--renge-space-7)", paddingBottom: "var(--renge-space-7)" }}>
          <Stack gap="6">
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
                  The landscape
                </Text>
                <Heading
                  level={2}
                  style={{ fontSize: "var(--renge-font-size-3xl)", letterSpacing: "-0.02em" }}
                >
                  Five places to know.
                </Heading>
                <Text style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.7 }}>
                  Oakland sits on a gradient from salt marsh to ridge. In 20 minutes
                  you can walk from tidal estuary to old-growth redwood corridor.
                  Each zone has its own light, its own smell, its own biology.
                </Text>
              </Stack>
            </FadeIn>

            <Grid columns="repeat(auto-fill, minmax(280px, 1fr))" gap="4">
              {PARKS.map((park, i) => (
                <FadeIn key={park.name} delay={i * 0.08}>
                  <ParkCard park={park} />
                </FadeIn>
              ))}
            </Grid>
          </Stack>
        </Section>

        <Divider />

        {/* ── Phyllotaxis ───────────────────────────────────────────────────── */}
        <Section style={{ paddingTop: "var(--renge-space-7)", paddingBottom: "var(--renge-space-7)" }}>
          <Stack gap="6" align="center" style={{ textAlign: "center" }}>
            <Stack gap="3" style={{ maxWidth: "36rem" }}>
              <Text
                size="sm"
                style={{
                  color: "var(--renge-color-accent)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-body)",
                }}
              >
                Phyllotaxis
              </Text>
              <Heading level={2} style={{ fontSize: "var(--renge-font-size-3xl)", letterSpacing: "-0.02em" }}>
                137.5°.
              </Heading>
              <Text style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.7 }}>
                The golden angle. Every plant that has solved the problem of sunlight arrives
                at this exact rotation between successive leaves. It emerges from PHI —
                the same ratio that generates every step in Renge&apos;s spacing scale.
              </Text>
              <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.6 }}>
                14 native plants from Oakland, arranged by the golden angle. Hover to identify.
              </Text>
            </Stack>
            <PhyllotaxisFlora />
          </Stack>
        </Section>

        <Divider />

        {/* ── Forest ────────────────────────────────────────────────────────── */}
        <Section style={{ paddingTop: "var(--renge-space-7)", paddingBottom: "var(--renge-space-6)" }}>
          <Stack gap="6">
            <FadeIn>
              <Stack gap="2" style={{ maxWidth: "40rem" }}>
                <Stack gap="2" direction="horizontal" align="center">
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--renge-color-accent)",
                      flexShrink: 0,
                    }}
                  />
                  <Text
                    size="sm"
                    style={{
                      color: "var(--renge-color-accent)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Redwood Regional
                  </Text>
                </Stack>
                <Heading level={2} style={{ fontSize: "var(--renge-font-size-2xl)", letterSpacing: "-0.02em" }}>
                  The forest floor.
                </Heading>
                <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.7 }}>
                  Second-growth coast redwoods rose from logged stumps beginning in the 1880s.
                  The canopy now closes overhead. In summer, fog drip through the canopy
                  delivers water when no rain falls for months.
                </Text>
              </Stack>
            </FadeIn>
            <Grid columns="repeat(auto-fill, minmax(300px, 1fr))" gap="4">
              {forestPlants.map((plant, i) => (
                <FadeIn key={plant.id} delay={i * 0.1}>
                  <PlantCard plant={plant} />
                </FadeIn>
              ))}
            </Grid>
          </Stack>
        </Section>

        {/* ── Woodland ──────────────────────────────────────────────────────── */}
        <Section style={{ paddingTop: "var(--renge-space-6)", paddingBottom: "var(--renge-space-6)" }}>
          <Stack gap="6">
            <FadeIn>
              <Stack gap="2" style={{ maxWidth: "40rem" }}>
                <Stack gap="2" direction="horizontal" align="center">
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--renge-color-success)",
                      flexShrink: 0,
                    }}
                  />
                  <Text
                    size="sm"
                    style={{
                      color: "var(--renge-color-success)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Joaquin Miller & the hills
                  </Text>
                </Stack>
                <Heading level={2} style={{ fontSize: "var(--renge-font-size-2xl)", letterSpacing: "-0.02em" }}>
                  Oak, bay, madrone.
                </Heading>
                <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.7 }}>
                  The oak-bay woodland is the dominant natural community of the East Bay hills.
                  Three tree species — coast live oak, California bay laurel, and Pacific madrone —
                  form a closed canopy on almost every north-facing slope.
                </Text>
              </Stack>
            </FadeIn>
            <Grid columns="repeat(auto-fill, minmax(300px, 1fr))" gap="4">
              {woodlandPlants.map((plant, i) => (
                <FadeIn key={plant.id} delay={i * 0.07}>
                  <PlantCard plant={plant} />
                </FadeIn>
              ))}
            </Grid>
          </Stack>
        </Section>

        {/* ── Wetlands ──────────────────────────────────────────────────────── */}
        <Section
          style={{
            paddingTop: "var(--renge-space-6)",
            paddingBottom: "var(--renge-space-6)",
            background: "var(--renge-color-bg-subtle)",
          }}
        >
          <Stack gap="6">
            <FadeIn>
              <Stack gap="2" style={{ maxWidth: "42rem" }}>
                <Stack gap="2" direction="horizontal" align="center">
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--renge-color-info)",
                      flexShrink: 0,
                    }}
                  />
                  <Text
                    size="sm"
                    style={{
                      color: "var(--renge-color-info)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Lake Merritt · MLK Shoreline · San Leandro Bay
                  </Text>
                </Stack>
                <Heading level={2} style={{ fontSize: "var(--renge-font-size-2xl)", letterSpacing: "-0.02em" }}>
                  Where the bay begins.
                </Heading>
                <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.7 }}>
                  The tidal marshes of San Leandro Bay once stretched unbroken for miles.
                  What remains is fragmented but alive. Salt marsh and freshwater wetland
                  persist side by side — pickleweed and cordgrass in the tidal zone,
                  cattail and tule in the fresh water above the tidal reach.
                </Text>
              </Stack>
            </FadeIn>

            {/* Tidal rhythm visual */}
            <FadeIn>
              <div
                style={{
                  borderRadius: "var(--renge-radius-3)",
                  border: "1px solid var(--renge-color-border-subtle)",
                  padding: "var(--renge-space-5)",
                  background: "var(--renge-color-bg)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Text
                  size="sm"
                  style={{
                    color: "var(--renge-color-fg-subtle)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "var(--renge-space-4)",
                  }}
                >
                  Tidal rhythm — San Francisco Bay (approximate)
                </Text>
                <TidalRhythm />
              </div>
            </FadeIn>

            <Grid columns="repeat(auto-fill, minmax(300px, 1fr))" gap="4">
              {wetlandPlants.map((plant, i) => (
                <FadeIn key={plant.id} delay={i * 0.09}>
                  <PlantCard plant={plant} />
                </FadeIn>
              ))}
            </Grid>
          </Stack>
        </Section>

        {/* ── Riparian ──────────────────────────────────────────────────────── */}
        <Section style={{ paddingTop: "var(--renge-space-6)", paddingBottom: "var(--renge-space-7)" }}>
          <Stack gap="6">
            <FadeIn>
              <Stack gap="2" style={{ maxWidth: "40rem" }}>
                <Stack gap="2" direction="horizontal" align="center">
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--renge-color-accent)",
                      flexShrink: 0,
                    }}
                  />
                  <Text
                    size="sm"
                    style={{
                      color: "var(--renge-color-accent)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Leona Canyon & creek corridors
                  </Text>
                </Stack>
                <Heading level={2} style={{ fontSize: "var(--renge-font-size-2xl)", letterSpacing: "-0.02em" }}>
                  Along the water line.
                </Heading>
                <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)", lineHeight: 1.7 }}>
                  Wherever Oakland's streams still run open — not culverted, not piped —
                  a narrow band of riparian plants holds the bank. The sticky monkeyflower
                  blooms on dry rocks above the waterline. Mugwort fills every gap.
                </Text>
              </Stack>
            </FadeIn>
            <Grid columns="repeat(auto-fill, minmax(300px, 1fr))" gap="4">
              {riparianPlants.map((plant, i) => (
                <FadeIn key={plant.id} delay={i * 0.1}>
                  <PlantCard plant={plant} />
                </FadeIn>
              ))}
            </Grid>
          </Stack>
        </Section>

        {/* ── Closing ───────────────────────────────────────────────────────── */}
        <Section
          style={{
            paddingTop: "var(--renge-space-7)",
            paddingBottom: "var(--renge-space-8)",
            textAlign: "center",
          }}
        >
          <FadeIn>
            <Stack gap="5" align="center">
              <svg
                viewBox="0 0 120 120"
                style={{ width: 64, height: 64, opacity: 0.25, color: "var(--renge-color-accent)" }}
              >
                {/* True phyllotaxis — 21 points at the golden angle */}
                {Array.from({ length: 21 }, (_, n) => {
                  const r = 9.5 * Math.sqrt(n + 1);
                  const theta = n * GOLDEN_ANGLE;
                  return (
                    <circle
                      key={n}
                      cx={f(60 + r * Math.cos(theta))}
                      cy={f(60 + r * Math.sin(theta))}
                      r={2}
                      fill="currentColor"
                    />
                  );
                })}
              </svg>
              <Heading
                level={2}
                style={{
                  fontSize: "clamp(var(--renge-font-size-2xl), 4vw, var(--renge-font-size-3xl))",
                  letterSpacing: "-0.02em",
                  maxWidth: "28rem",
                }}
              >
                A city built on living systems.
              </Heading>
              <Text
                style={{
                  color: "var(--renge-color-fg-subtle)",
                  lineHeight: 1.7,
                  maxWidth: "36rem",
                }}
              >
                The proportion in a sword fern frond. The rhythm of the tide
                through pickleweed. The spiral of an oak canopy filling in over
                a logged ridge. Natural systems follow the same mathematics
                that Renge is built on. The same ratios. The same intervals.
                The same recursive logic at every scale.
              </Text>
              <Link href="/" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    padding: "var(--renge-space-3) var(--renge-space-5)",
                    borderRadius: "var(--renge-radius-full)",
                    border: "1px solid var(--renge-color-accent)",
                    background: "transparent",
                    color: "var(--renge-color-accent)",
                    fontSize: "var(--renge-font-size-sm)",
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                    transition: "all 300ms var(--renge-easing-ease-out)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--renge-color-accent-subtle)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Explore the system →
                </button>
              </Link>
            </Stack>
          </FadeIn>
        </Section>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--renge-color-border-subtle)",
          padding: "var(--renge-space-5)",
          textAlign: "center",
        }}
      >
        <Text size="sm" style={{ color: "var(--renge-color-fg-subtle)", letterSpacing: "0.08em" }}>
          Built with Renge · Proportion as a first principle · 1 : 1.618
        </Text>
      </footer>
    </ProfileProvider>
  );
}

// ============================================================================
// Tidal Rhythm visualization
// ============================================================================

function TidalRhythm() {
  const width = 600;
  const height = 80;
  const ticks = 48; // 48 half-hours = 24 hours

  // Mixed semidiurnal tide (approximate SF Bay): two unequal highs per day
  const waterLevel = (t: number): number => {
    const primary = Math.sin((t / ticks) * 2 * Math.PI * 2) * 0.6;
    const secondary = Math.sin((t / ticks) * 2 * Math.PI * 2 + 1.1) * 0.35;
    const diurnal = Math.sin((t / ticks) * 2 * Math.PI) * 0.15;
    return primary + secondary + diurnal;
  };

  const pts = Array.from({ length: ticks + 1 }, (_, i) => {
    const x = f((i / ticks) * width);
    const level = waterLevel(i);
    const y = f(height / 2 - (level / 1.2) * (height * 0.4));
    return `${x},${y}`;
  });

  // Pickleweed zone
  const pickleweedY = height * 0.38;
  // Tule/cattail zone
  const tuleY = height * 0.28;

  return (
    <div style={{ position: "relative" }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        preserveAspectRatio="none"
      >
        {/* Zone labels */}
        <text x={4} y={pickleweedY - 4} fontSize="8" fill="var(--renge-color-fg-subtle)" fontFamily="var(--font-body)">
          pickleweed zone
        </text>
        <text x={4} y={tuleY - 4} fontSize="8" fill="var(--renge-color-fg-subtle)" fontFamily="var(--font-body)">
          tule / freshwater
        </text>

        {/* Zone bands */}
        <rect
          x={0}
          y={pickleweedY}
          width={width}
          height={4}
          fill="var(--renge-color-success)"
          opacity={0.2}
        />
        <rect
          x={0}
          y={tuleY}
          width={width}
          height={4}
          fill="var(--renge-color-info)"
          opacity={0.2}
        />

        {/* Water fill */}
        <path
          d={`M 0,${height} L ${pts[0].split(",")[0]},${pts[0].split(",")[1]} ${pts.slice(1).map((p) => `L ${p}`).join(" ")} L ${width},${height} Z`}
          fill="var(--renge-color-accent)"
          opacity={0.08}
        />

        {/* Water line */}
        <polyline
          points={pts.join(" ")}
          fill="none"
          stroke="var(--renge-color-accent)"
          strokeWidth={1.5}
          opacity={0.6}
        />

        {/* Hour ticks */}
        {Array.from({ length: 13 }, (_, i) => i * 2).map((hour) => {
          const x = (hour / ticks) * width;
          return (
            <g key={hour}>
              <line x1={x} y1={height - 12} x2={x} y2={height - 4} stroke="var(--renge-color-border)" strokeWidth={0.5} />
              <text x={x} y={height} fontSize="7" fill="var(--renge-color-fg-subtle)" textAnchor="middle" fontFamily="var(--font-body)">
                {hour === 0 ? "12am" : hour === 12 ? "12pm" : hour < 12 ? `${hour}am` : `${hour - 12}pm`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
