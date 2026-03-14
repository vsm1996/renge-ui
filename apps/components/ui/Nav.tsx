"use client";

import { motion } from "framer-motion";
import { PHI } from "@/lib/phi";
import { ProfileToggle } from "./ProfileToggle";

export function Nav() {
  return (
    <motion.nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--renge-space-3) var(--renge-space-5)",
        borderBottom: "1px solid transparent",
      }}
    >
      {/* Logo mark */}
      <a
        href="#"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--renge-space-2)",
          textDecoration: "none",
          color: "var(--renge-color-fg)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
          <rect
            x="1"
            y="1"
            width={12.36}
            height={12.36 / PHI}
            fill="none"
            stroke="var(--renge-color-accent)"
            strokeWidth="1"
          />
        </svg>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--renge-font-size-lg)",
          letterSpacing: "-0.01em",
        }}>
          Renge
        </span>
      </a>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-5)" }}>
        {[
          { label: "Philosophy", href: "#philosophy" },
          { label: "Tokens", href: "#tokens" },
          { label: "Components", href: "/docs" },
          { label: "Start", href: "#start" },
        ].map(({ label, href }) => (
          <a
            key={href}
            href={href}
            style={{
              fontSize: "var(--renge-font-size-sm)",
              color: "var(--renge-color-fg-muted)",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.04em",
              transition: "color 200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--renge-color-fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--renge-color-fg-muted)")}
          >
            {label}
          </a>
        ))}
        <ProfileToggle />
      </div>
    </motion.nav>
  );
}
