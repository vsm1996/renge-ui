"use client";

import { motion } from "framer-motion";
import { PHI, GOLDEN_ANGLE, EASE_OUT } from "@/lib/phi";

const EASE = EASE_OUT;

// All bloom animations finish around 1.5s — continuous motion starts after
const BLOOM_END = 1.6;

// Counter-rotating ring periods — φ ratio between them (mathematically intentional)
const OUTER_PERIOD = 90;           // clockwise, 90s per revolution
const INNER_PERIOD = 90 / PHI;    // counterclockwise, ~55.6s per revolution

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
 * Motion:
 *   • Outer ring rotates clockwise at OUTER_PERIOD s/rev
 *   • Inner ring rotates counterclockwise at INNER_PERIOD s/rev (φ faster)
 *   • Each petal breathes with a staggered scaleX oscillation (breeze)
 *   • All continuous motion begins after the bloom animation completes
 */

/**
 * Lotus petal — elongated with a pointed tip, matching real lotus anatomy.
 * Base at (0, 0), tip at (0, −h). Widest at ~48% of height.
 */
function petalPath(w: number, h: number): string {
  const hw = w / 2;
  return [
    "M 0 0",
    `C ${-hw * 0.65} ${-h * 0.1}   ${-hw * 1.0} ${-h * 0.43}  ${-hw * 0.76} ${-h * 0.7}`,
    `C ${-hw * 0.45} ${-h * 0.86}  ${-hw * 0.14} ${-h * 0.97}  0 ${-h}`,
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
  const outerBaseR = half * 0.30;
  const innerBaseR = outerBaseR / PHI;

  const outerW = half * 0.28;
  const outerH = half * 0.62;
  const innerW = outerW / PHI;
  const innerH = outerH / PHI;

  // ── ring angles — inner ring offset by golden angle (phyllotaxis) ──────────
  const outerStart = -90;
  const innerStart = -90 + GOLDEN_ANGLE;

  // ── petal arrays ───────────────────────────────────────────────────────────
  const outerPetals = Array.from({ length: 8 }, (_, i) => ({
    angleDeg: outerStart + i * 45,
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
    angleDeg: innerStart + i * 72,
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
  const SEED_COUNT = 13;
  const STAMEN_COUNT = 21;

  // ── render helper ──────────────────────────────────────────────────────────
  type Petal = (typeof outerPetals)[0];
  function renderPetal(p: Petal, key: string) {
    const rad = (p.angleDeg * Math.PI) / 180;
    const bx = cx + p.baseR * Math.cos(rad);
    const by = cy + p.baseR * Math.sin(rad);
    const rotDeg = p.angleDeg + 90;

    // Breeze phase staggered by petal angle so the ripple moves around the flower
    const breezeDelay = BLOOM_END + ((p.angleDeg + 90) / 360) * 3.5;
    const breezeDuration = 5.5 + (p.delay * 0.6); // slight duration variation

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
          animate={{
            scaleY: 1,
            opacity: 1,
            ...(animate ? { scaleX: [1, 1.18, 0.88, 1.12, 0.94, 1] } : {}),
          }}
          transition={{
            scaleY: { duration: 0.95, delay: p.delay, ease: EASE },
            opacity: { duration: 0.45, delay: p.delay },
            scaleX: {
              duration: breezeDuration,
              delay: breezeDelay,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror",
            },
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
      {/* Outer ring (8 petals) — slow clockwise rotation */}
      <motion.g
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        animate={animate ? { rotate: 360 } : undefined}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: OUTER_PERIOD,
            ease: "linear",
            delay: BLOOM_END,
          },
        }}
      >
        {outerPetals.map((p, i) => renderPetal(p, `outer-${i}`))}
      </motion.g>

      {/* Inner ring (5 petals) — counterclockwise, φ-ratio faster */}
      <motion.g
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        animate={animate ? { rotate: -360 } : undefined}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: INNER_PERIOD,
            ease: "linear",
            delay: BLOOM_END,
          },
        }}
      >
        {innerPetals.map((p, i) => renderPetal(p, `inner-${i}`))}
      </motion.g>

      {/* Fixed center — stamens, receptacle, seeds stay still */}

      {/* Stamens — 21 dots (Fibonacci) */}
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

      {/* Seed holes — 13 (Fibonacci) */}
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
