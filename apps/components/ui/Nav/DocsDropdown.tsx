"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DOCS_LINKS } from "./links";

interface DocsDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function DocsDropdown({ isOpen, onToggle, onClose }: DocsDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={onToggle}
        style={{
          fontSize: "var(--renge-font-size-sm)",
          color: isOpen ? "var(--renge-color-fg)" : "var(--renge-color-fg-subtle)",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "var(--renge-space-1)",
          padding: 0,
          fontFamily: "var(--font-body)",
          letterSpacing: "0.04em",
          transition: "color 200ms",
        }}
      >
        Docs
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 200ms" }}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="docs-dropdown"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: [0.382, 1, 0.618, 1] }}
            style={{
              position: "absolute",
              top: "calc(100% + var(--renge-space-3))",
              right: 0,
              minWidth: 240,
              background: "color-mix(in oklch, var(--renge-color-bg) 96%, transparent)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--renge-color-border-subtle)",
              borderRadius: "var(--renge-radius-3)",
              padding: "var(--renge-space-2)",
              boxShadow: "0 8px 32px color-mix(in oklch, var(--renge-color-bg-inverse) 10%, transparent)",
            }}
          >
            {DOCS_LINKS.map(({ label, href, desc }) => (
              <a
                key={href}
                href={href}
                onClick={onClose}
                style={{
                  display: "block",
                  padding: "var(--renge-space-3)",
                  borderRadius: "var(--renge-radius-2)",
                  textDecoration: "none",
                  transition: "background 150ms",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--renge-color-bg-subtle)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg)", fontFamily: "var(--font-body)", marginBottom: 2 }}>
                  {label}
                </div>
                <div style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.02em" }}>
                  {desc}
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
