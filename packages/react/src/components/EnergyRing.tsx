/**
 * EnergyRing
 *
 * Circular SVG ring that shows an energy/progress level.
 * Self-similar at every size — a fractal component.
 * The small version is a precise mathematical miniature of the large.
 *
 * Stroke width, gap, and label scale by PHI with the ring size.
 * When pulse=true, the ring breathes at a rate tuned to the energy level.
 */

import { forwardRef, useEffect, type ComponentPropsWithoutRef } from "react";

// ============================================================================
// Keyframe injection (module-level, runs once)
// ============================================================================

const KEYFRAMES = `
@keyframes rengeRingPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.382; }
}
`;

if (typeof document !== "undefined") {
  const id = "__renge-ring-keyframes__";
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

export type EnergyRingSize = "sm" | "md" | "lg" | "xl";
export type EnergyRingRate = "rest" | "active" | "fire";
export type EnergyRingColor = "accent" | "success" | "warning" | "danger";

export interface EnergyRingProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Energy level 0–100 */
  value: number;
  size?: EnergyRingSize;
  /** Color channel — maps to semantic token */
  color?: EnergyRingColor;
  /** Whether to animate a breathing pulse */
  pulse?: boolean;
  /** Pulse speed — rest=slow, active=medium, fire=fast */
  rate?: EnergyRingRate;
  /** Center label. Defaults to "{value}%" */
  label?: string | null;
}

// ============================================================================
// Size config — each step is prev × φ
// sm:32 → md:52 → lg:84 → xl:136 (Fibonacci×4, approximating φ growth)
// ============================================================================

const SIZE_CONFIG: Record<EnergyRingSize, { diameter: number; stroke: number; fontSize: string }> = {
  sm: { diameter: 32,  stroke: 3, fontSize: "var(--renge-font-size-xs)" },
  md: { diameter: 52,  stroke: 4, fontSize: "var(--renge-font-size-xs)" },
  lg: { diameter: 84,  stroke: 5, fontSize: "var(--renge-font-size-sm)" },
  xl: { diameter: 136, stroke: 6, fontSize: "var(--renge-font-size-base)" },
};

const PULSE_DURATION: Record<EnergyRingRate, string> = {
  rest:   "var(--renge-duration-7)",   // 2100ms — slow, resting breath
  active: "var(--renge-duration-5)",   // 800ms  — normal active pulse
  fire:   "var(--renge-duration-4)",   // 500ms  — intense, rapid
};

// ============================================================================
// Component
// ============================================================================

export const EnergyRing = forwardRef<HTMLDivElement, EnergyRingProps>(
  function EnergyRing(
    {
      value,
      size = "md",
      color = "accent",
      pulse = false,
      rate = "active",
      label,
      style,
      ...props
    },
    ref
  ) {
    const { diameter, stroke, fontSize } = SIZE_CONFIG[size];
    const radius = (diameter - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const clampedValue = Math.min(100, Math.max(0, value));
    const offset = circumference * (1 - clampedValue / 100);
    const center = diameter / 2;

    const colorVar = `var(--renge-color-${color})`;
    const colorSubtleVar = `var(--renge-color-${color}-subtle)`;

    const pulseStyle = pulse
      ? {
          animation: `rengeRingPulse ${PULSE_DURATION[rate]} var(--renge-easing-ease-in-out) infinite`,
        }
      : {};

    const showLabel = label !== null && (size === "lg" || size === "xl");
    const labelText = label !== undefined ? label : `${clampedValue}%`;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: `${diameter}px`,
          height: `${diameter}px`,
          position: "relative",
          flexShrink: 0,
          ...style,
        }}
        {...props}
      >
        <svg
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
          style={{ position: "absolute", top: 0, left: 0, ...pulseStyle }}
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colorSubtleVar}
            strokeWidth={stroke}
          />
          {/* Fill — rotated so 0% starts at top */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colorVar}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: `${center}px ${center}px`,
              transition: `stroke-dashoffset var(--renge-duration-5) var(--renge-easing-ease-out)`,
            }}
          />
        </svg>
        {showLabel && (
          <span
            style={{
              fontSize,
              color: colorVar,
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            {labelText}
          </span>
        )}
      </div>
    );
  }
);
