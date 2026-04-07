/**
 * FlowField
 *
 * A living phyllotaxis dot field. Energy flows through it.
 * Each dot is placed at a golden-angle position (phyllotaxis),
 * and pulses with a delay derived from its spiral index — creating
 * a wave that propagates outward from the center along the golden spiral.
 *
 * Energy level controls density, opacity, and pulse rate.
 * This is the Feng Shui principle made literal: intentional energetic
 * movement through digital space, governed by natural mathematics.
 */

import { forwardRef, useMemo, type ComponentPropsWithoutRef } from "react";
import { phyllotaxis } from "@renge-ui/tokens";

// ============================================================================
// Keyframe injection (module-level)
// ============================================================================

const KEYFRAMES = `
@keyframes rengeFlowPulse {
  0%, 100% { opacity: var(--ff-base-opacity); r: var(--ff-base-r); }
  50%       { opacity: var(--ff-peak-opacity); r: var(--ff-peak-r); }
}
`;

if (typeof document !== "undefined") {
  const id = "__renge-flow-keyframes__";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = KEYFRAMES;
    document.head.appendChild(style);
  }
}

// ============================================================================
// Types
// ============================================================================

export type FlowEnergy = "void" | "rest" | "active" | "fire";
export type FlowColor = "accent" | "fg-muted" | "fg-subtle";

export interface FlowFieldProps extends ComponentPropsWithoutRef<"div"> {
  /** Total dot count at full energy. Actual count scales with energy. */
  count?: number;
  /** Size of the field container in px */
  size?: number;
  /** Energy level — controls density, opacity, and pulse rate */
  energy?: FlowEnergy;
  /** Color channel */
  color?: FlowColor;
}

// ============================================================================
// Energy config
// Each energy state maps to a natural feel:
//   void   = near-empty, barely breathing — like space before creation
//   rest   = gentle, slow — seeds waiting in soil
//   active = alive, circulating — a flowering field in wind
//   fire   = intense, fast — sparks rising from embers
// ============================================================================

const ENERGY_CONFIG: Record<FlowEnergy, {
  density: number;       // fraction of total count to show
  baseOpacity: number;   // dot opacity at rest phase
  peakOpacity: number;   // dot opacity at pulse peak
  baseR: number;         // dot radius at rest (px)
  peakR: number;         // dot radius at pulse peak (px)
  duration: string;      // CSS var for animation duration
}> = {
  void:   { density: 0.2,  baseOpacity: 0.06, peakOpacity: 0.15, baseR: 1.0, peakR: 1.4,  duration: "var(--renge-duration-8)" },  // 3400ms
  rest:   { density: 0.45, baseOpacity: 0.12, peakOpacity: 0.28, baseR: 1.2, peakR: 1.8,  duration: "var(--renge-duration-6)" },  // 1300ms
  active: { density: 0.72, baseOpacity: 0.22, peakOpacity: 0.55, baseR: 1.4, peakR: 2.2,  duration: "var(--renge-duration-5)" },  // 800ms
  fire:   { density: 1.0,  baseOpacity: 0.35, peakOpacity: 0.82, baseR: 1.6, peakR: 2.618,duration: "var(--renge-duration-4)" },  // 500ms
};

// ============================================================================
// Component
// ============================================================================

export const FlowField = forwardRef<HTMLDivElement, FlowFieldProps>(
  function FlowField(
    {
      count = 144,
      size = 400,
      energy = "active",
      color = "accent",
      style,
      ...props
    },
    ref
  ) {
    const cfg = ENERGY_CONFIG[energy];
    const visibleCount = Math.round(count * cfg.density);
    const colorVar = `var(--renge-color-${color})`;

    // Generate phyllotaxis points, centered in container
    const points = useMemo(() => {
      const spread = size / (2 * Math.sqrt(count)); // scale spread to container
      return phyllotaxis({ count, spread, scale: 1 });
    }, [count, size]);

    return (
      <div
        ref={ref}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          // CSS vars for SVG animation — set at container level
          ["--ff-base-opacity" as string]: String(cfg.baseOpacity),
          ["--ff-peak-opacity" as string]: String(cfg.peakOpacity),
          ["--ff-base-r" as string]: `${cfg.baseR}px`,
          ["--ff-peak-r" as string]: `${cfg.peakR}px`,
          ...style,
        }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
          aria-hidden="true"
          style={{ display: "block" }}
        >
          {points.slice(0, visibleCount).map((pt) => {
            // Delay = index / count × full duration cycle
            // Creates a wave that travels along the golden spiral
            const delayFraction = pt.index / visibleCount;
            const delayMs = delayFraction * 2100; // spread over ~2100ms max

            return (
              <circle
                key={pt.index}
                cx={pt.x}
                cy={pt.y}
                r={cfg.baseR}
                fill={colorVar}
                style={{
                  animation: `rengeFlowPulse ${cfg.duration} var(--renge-easing-ease-in-out) ${delayMs.toFixed(0)}ms infinite`,
                }}
              />
            );
          })}
        </svg>
      </div>
    );
  }
);
