"use client";

import { motion } from "framer-motion";
import { PHI, GOLDEN_ANGLE, EASE_OUT } from "@/lib/phi";

/**
 * Lotus flower — top-down view.
 *
 * Mathematical structure:
 *   • Two concentric petal rings: 8 outer + 5 inner = 13 total (Fibonacci)
 *   • Ring radii scale by 1/φ:  r_inner = r_outer / φ
 *   • Petal dimensions scale by 1/φ between rings
 *   • Inner ring starting angle offset by GOLDEN_ANGLE (137.508°) — phyllotaxis
 *   • Receptacle seed holes: 13 arranged in a ring (Fibonacci)
 *   • Stamen dots: 21 arranged in a ring (Fibonacci)
 *
 * All colors are CSS custom properties → reactive to profile changes.
 */

const EASE = EASE_OUT;

/**
 * Lotus petal — elongated with a pointed tip, matching real lotus anatomy.
 * Base at (0, 0), tip at (0, −h). Widest at ~48% of height.
 */
function petalPath(w: number, h: number): string {
  const hw = w / 2;
  return [
    "M 0 0",
    // left edge: swell outward to widest point then taper inward to pointed tip
    `C ${-hw * 0.65} ${-h * 0.1}   ${-hw * 1.0} ${-h * 0.43}  ${-hw * 0.76} ${-h * 0.7}`,
    `C ${-hw * 0.45} ${-h * 0.86}  ${-hw * 0.14} ${-h * 0.97}  0 ${-h}`,
    // right edge mirrored
    `C ${hw * 0.14} ${-h * 0.97}   ${hw * 0.45} ${-h * 0.86}   ${hw * 0.76} ${-h * 0.7}`,
    `C ${hw * 1.0} ${-h * 0.43}    ${hw * 0.65} ${-h * 0.1}    0 0`,
    "Z",
  ].join(" ");
}

/** Central midrib — subtle vein line from near-base to near-tip */
function midribPath(h: number): string {
  return `M 0 ${-h * 0.06} C 0 ${-h * 0.38} 0 ${-h * 0.65} 0 ${-h * 0.91}`;
}

interface LotusProps {
  size?: number;
  animate?: boolean;
  style?: React.CSSProperties;
}

export function Lotus({ size = 400, animate = true, style }: LotusProps) {
  const cx = size / 2;
  const cy = size / 2;
  const half = size / 2;

  // ── ring geometry — all proportions scale by φ ────────────────────────────
  const outerBaseR = half * 0.30; // outer petal bases sit on this ring
  const innerBaseR = outerBaseR / PHI; // inner ring radius = outer / φ

  const outerW = half * 0.28; // outer petal width at widest
  const outerH = half * 0.62; // outer petal height (base → tip)
  const innerW = outerW / PHI; // inner petal width = outer / φ
  const innerH = outerH / PHI; // inner petal height = outer / φ

  // ── ring angles — inner ring offset by golden angle (phyllotaxis) ──────────
  const outerStart = -90; // first outer petal points straight up
  const innerStart = -90 + GOLDEN_ANGLE; // inner ring rotated by φ°

  // ── petal arrays ───────────────────────────────────────────────────────────
  const outerPetals = Array.from({ length: 8 }, (_, i) => ({
    angleDeg: outerStart + i * 45, // 360° / 8 = 45° spacing
    baseR: outerBaseR,
    w: outerW,
    h: outerH,
    fill: "var(--renge-color-accent-subtle)",
    fillOpacity: 0.62,
    strokeOpacity: 0.24,
    midribOpacity: 0.18,
    delay: i * 0.07,
  }));

  const innerPetals = Array.from({ length: 5 }, (_, i) => ({
    angleDeg: innerStart + i * 72, // 360° / 5 = 72° spacing
    baseR: innerBaseR,
    w: innerW,
    h: innerH,
    fill: "var(--renge-color-accent)",
    fillOpacity: 0.82,
    strokeOpacity: 0.38,
    midribOpacity: 0.28,
    delay: 0.42 + i * 0.09,
  }));

  // ── center ─────────────────────────────────────────────────────────────────
  const receptacleR = half * 0.115;
  const stamenRingR = half * 0.172;
  const seedRingR = receptacleR * 0.63;
  const SEED_COUNT = 13; // Fibonacci
  const STAMEN_COUNT = 21; // Fibonacci

  // ── render helper ──────────────────────────────────────────────────────────
  type Petal = (typeof outerPetals)[0];
  function renderPetal(p: Petal, key: string) {
    const rad = (p.angleDeg * Math.PI) / 180;
    const bx = cx + p.baseR * Math.cos(rad);
    const by = cy + p.baseR * Math.sin(rad);
    const rotDeg = p.angleDeg + 90; // align tip outward from centre

    return (
      <g key={key} transform={`translate(${bx}, ${by}) rotate(${rotDeg})`}>
        {/* Petal body */}
        <motion.path
          d={petalPath(p.w, p.h)}
          fill={p.fill}
          fillOpacity={p.fillOpacity}
          stroke="var(--renge-color-accent)"
          strokeWidth={0.65}
          strokeOpacity={p.strokeOpacity}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          initial={animate ? { scaleY: 0, opacity: 0 } : undefined}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            scaleY: { duration: 0.95, delay: p.delay, ease: EASE },
            opacity: { duration: 0.45, delay: p.delay },
          }}
        />
        {/* Midrib vein */}
        <motion.path
          d={midribPath(p.h)}
          fill="none"
          stroke="var(--renge-color-accent)"
          strokeWidth={0.5}
          strokeOpacity={p.midribOpacity}
          strokeLinecap="round"
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          initial={animate ? { scaleY: 0, opacity: 0 } : undefined}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            scaleY: { duration: 0.95, delay: p.delay + 0.1, ease: EASE },
            opacity: { duration: 0.4, delay: p.delay + 0.1 },
          }}
        />
      </g>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
      style={style}
    >
      {/* Outer ring (8 petals) — rendered first, sits behind inner ring */}
      {outerPetals.map((p, i) => renderPetal(p, `outer-${i}`))}

      {/* Inner ring (5 petals) — rendered on top, more upright */}
      {innerPetals.map((p, i) => renderPetal(p, `inner-${i}`))}

      {/* Stamens — 21 dots (Fibonacci) in a ring around the receptacle */}
      {Array.from({ length: STAMEN_COUNT }, (_, i) => {
        const a = (i / STAMEN_COUNT) * 2 * Math.PI - Math.PI / 2;
        const scx = cx + stamenRingR * Math.cos(a);
        const scy = cy + stamenRingR * Math.sin(a);
        return (
          <motion.g
            key={`stamen-${i}`}
            style={{ transformBox: "fill-box", transformOrigin: `${scx}px ${scy}px` }}
            initial={animate ? { scale: 0, opacity: 0 } : undefined}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.84 + i * 0.018, ease: EASE }}
          >
            <circle cx={scx} cy={scy} r={half * 0.009} fill="var(--renge-color-accent)" fillOpacity={0.65} />
          </motion.g>
        );
      })}

      {/* Receptacle disc */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: `${cx}px ${cy}px` }}
        initial={animate ? { scale: 0 } : undefined}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.78, ease: EASE }}
      >
        <circle cx={cx} cy={cy} r={receptacleR} fill="var(--renge-color-accent)" fillOpacity={0.9} />
      </motion.g>

      {/* Seed holes — 13 (Fibonacci) punched into the receptacle */}
      {Array.from({ length: SEED_COUNT }, (_, i) => {
        const a = (i / SEED_COUNT) * 2 * Math.PI - Math.PI / 2;
        const scx = cx + seedRingR * Math.cos(a);
        const scy = cy + seedRingR * Math.sin(a);
        return (
          <motion.g
            key={`seed-${i}`}
            style={{ transformBox: "fill-box", transformOrigin: `${scx}px ${scy}px` }}
            initial={animate ? { scale: 0 } : undefined}
            animate={{ scale: 1 }}
            transition={{ duration: 0.28, delay: 0.88 + i * 0.026, ease: EASE }}
          >
            <circle cx={scx} cy={scy} r={half * 0.017} fill="var(--renge-color-bg)" fillOpacity={0.75} />
          </motion.g>
        );
      })}

      {/* Centre seed */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: `${cx}px ${cy}px` }}
        initial={animate ? { scale: 0 } : undefined}
        animate={{ scale: 1 }}
        transition={{ duration: 0.28, delay: 1.05, ease: EASE }}
      >
        <circle cx={cx} cy={cy} r={half * 0.017} fill="var(--renge-color-bg)" fillOpacity={0.7} />
      </motion.g>
    </svg>
  );
}
