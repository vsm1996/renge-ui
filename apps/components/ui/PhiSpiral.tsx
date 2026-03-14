"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface PhiSpiralProps {
  size?: number;
  opacity?: number;
  strokeColor?: string;
  className?: string;
  animate?: boolean;
}

/**
 * Golden spiral built from quarter-circle arcs in nested PHI rectangles.
 * Each arc radius = previous × PHI.
 */
export function PhiSpiral({
  size = 600,
  opacity = 0.08,
  strokeColor = "currentColor",
  className = "",
  animate = true,
}: PhiSpiralProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView && animate) {
      controls.start("visible");
    }
  }, [inView, animate, controls]);

  // Build the spiral path from golden rectangles
  // Start with a unit square, build up via PHI
  const cx = size / 2;
  const cy = size / 2;

  // Golden spiral: sequence of quarter-circle arcs
  // Each arc radius = fib[n] * baseUnit
  const baseUnit = size / 40;
  const fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34];
  const arcs: string[] = [];

  // Centers for each arc — they shift based on direction
  // Standard golden spiral: NE → NW → SW → SE rotation
  const directions = [
    { dx: 1, dy: 0, sweep: 1, startAngle: 180, endAngle: 270 },
    { dx: 0, dy: -1, sweep: 1, startAngle: 270, endAngle: 360 },
    { dx: -1, dy: 0, sweep: 1, startAngle: 0, endAngle: 90 },
    { dx: 0, dy: 1, sweep: 1, startAngle: 90, endAngle: 180 },
  ];

  let x = cx;
  let y = cy;

  fibs.forEach((fib, i) => {
    const r = fib * baseUnit;
    const dir = directions[i % 4];

    const startRad = (dir.startAngle * Math.PI) / 180;
    const endRad = (dir.endAngle * Math.PI) / 180;

    const x1 = x + r * Math.cos(startRad);
    const y1 = y + r * Math.sin(startRad);
    const x2 = x + r * Math.cos(endRad);
    const y2 = y + r * Math.sin(endRad);

    arcs.push(`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`);

    // Advance center for next arc
    x += dir.dx * r * (i % 4 < 2 ? 1 : -1);
    y += dir.dy * r * (i % 4 < 2 ? 1 : -1);
  });

  const pathData = arcs.join(" ");

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      {animate ? (
        <motion.path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 3, ease: "easeOut" },
            },
          }}
        />
      ) : (
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1}
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
