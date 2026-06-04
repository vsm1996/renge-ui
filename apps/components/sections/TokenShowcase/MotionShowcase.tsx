"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionLabel, SubheadingH3 } from "./shared";

const easings: { key: string; label: string; curve: [number, number, number, number] }[] = [
  { key: "ease-out",    label: "ease-out",    curve: [0.22, 1, 0.36, 1] },
  { key: "ease-in",     label: "ease-in",     curve: [0.55, 0.055, 0.675, 0.19] },
  { key: "ease-in-out", label: "ease-in-out", curve: [0.65, 0, 0.35, 1] },
  { key: "spring",      label: "spring",      curve: [0.175, 0.885, 0.32, 1.275] },
];

function EasingRow({ label, curve }: { label: string; curve: [number, number, number, number] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(300);

  useEffect(() => {
    if (!trackRef.current) return;
    const obs = new ResizeObserver((entries) => {
      setTrackWidth(entries[0].contentRect.width);
    });
    obs.observe(trackRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-4)" }}>
      <div style={{
        width: "auto",
        fontSize: "var(--renge-font-size-sm)",
        color: "var(--renge-color-fg-subtle)",
        fontFamily: "var(--font-mono, monospace)",
        flexShrink: 0,
        letterSpacing: "0.04em",
      }}>
        {label}
      </div>
      <div ref={trackRef} style={{ flex: 1, position: "relative", height: 32 }}>
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            translateY: "-50%",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--renge-color-accent)",
          }}
          animate={{ x: trackWidth - 8 }}
          transition={{
            duration: 1.5,
            ease: curve,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
        />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "var(--renge-color-border-subtle)",
        }} />
      </div>
    </div>
  );
}

export function MotionShowcase() {
  return (
    <div>
      <SectionLabel>Tokens / Motion</SectionLabel>
      <SubheadingH3>Natural easing.</SubheadingH3>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-4)", width: "100%" }}>
        {easings.map(({ key, label, curve }) => (
          <EasingRow key={key} label={label} curve={curve} />
        ))}
      </div>
    </div>
  );
}
