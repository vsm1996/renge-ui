/**
 * Pulse
 *
 * A breathing dot — the minimal alive indicator.
 * Scales up to φ at peak and fades to 1/φ² opacity at rest.
 * Rate maps naturally to energy states: rest → active → fire.
 *
 * The small version has the exact same proportional logic as the large.
 * Only the scale changes. The rhythm is the same. This is the fractal property.
 */

import { forwardRef, type ComponentPropsWithoutRef } from "react";

// ============================================================================
// Keyframe injection
// ============================================================================

const KEYFRAMES = `
@keyframes rengePulseBreathe {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.618);
    opacity: 0.382;
  }
}
@keyframes rengePulseRipple {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(2.618); opacity: 0; }
}
`;

if (typeof document !== "undefined") {
  const id = "__renge-pulse-keyframes__";
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

export type PulseRate = "rest" | "active" | "fire";
export type PulseColor = "accent" | "success" | "warning" | "danger" | "fg-muted";
export type PulseSize = "sm" | "md" | "lg";

export interface PulseProps extends ComponentPropsWithoutRef<"span"> {
  /** Energy rate — determines breath speed */
  rate?: PulseRate;
  color?: PulseColor;
  size?: PulseSize;
  /** Show expanding ripple ring */
  ripple?: boolean;
}

// ============================================================================
// Config — sizes follow fractal scale (approx φ growth: 6 → 10 → 16px)
// ============================================================================

const SIZE_PX: Record<PulseSize, number> = {
  sm: 6,
  md: 10,
  lg: 16,
};

// Durations map to heart-rate analogy via Fibonacci × 100ms
// rest=2100ms (~29bpm, meditating), active=800ms (~75bpm), fire=500ms (~120bpm)
const RATE_DURATION: Record<PulseRate, string> = {
  rest:   "var(--renge-duration-7)",   // 2100ms
  active: "var(--renge-duration-5)",   // 800ms
  fire:   "var(--renge-duration-4)",   // 500ms
};

// ============================================================================
// Component
// ============================================================================

export const Pulse = forwardRef<HTMLSpanElement, PulseProps>(
  function Pulse(
    {
      rate = "active",
      color = "accent",
      size = "md",
      ripple = false,
      style,
      ...props
    },
    ref
  ) {
    const diameter = SIZE_PX[size];
    const duration = RATE_DURATION[rate];
    const colorVar = `var(--renge-color-${color})`;

    return (
      <span
        ref={ref}
        aria-hidden="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: `${diameter}px`,
          height: `${diameter}px`,
          flexShrink: 0,
          ...style,
        }}
        {...props}
      >
        {/* Ripple ring */}
        {ripple && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "9999px",
              backgroundColor: colorVar,
              animation: `rengePulseRipple ${duration} var(--renge-easing-ease-out) infinite`,
            }}
          />
        )}
        {/* Core dot */}
        <span
          style={{
            width: `${diameter}px`,
            height: `${diameter}px`,
            borderRadius: "9999px",
            backgroundColor: colorVar,
            display: "block",
            animation: `rengePulseBreathe ${duration} var(--renge-easing-ease-in-out) infinite`,
          }}
        />
      </span>
    );
  }
);
