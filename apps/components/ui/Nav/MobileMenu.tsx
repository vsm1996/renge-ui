"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TOP_LINKS, DOCS_LINKS } from "./links";
import { ProfileToggle } from "../ProfileToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  resolveHref: (href: string) => string;
}

export function MobileMenu({ isOpen, onClose, resolveHref }: MobileMenuProps) {
  const [docsOpen, setDocsOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.382, 1, 0.618, 1] }}
          style={{
            overflow: "hidden",
            background: "color-mix(in oklch, var(--renge-color-bg) 92%, transparent)",
            backdropFilter: "blur(14px)",
            borderBottom: "1px solid var(--renge-color-border-subtle)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", padding: "var(--renge-space-4)", gap: "var(--renge-space-1)" }}>
            <button
              onClick={() => setDocsOpen(o => !o)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "var(--renge-font-size-sm)",
                color: "var(--renge-color-fg-subtle)",
                fontFamily: "var(--font-body)",
                padding: "var(--renge-space-3) 0",
                background: "none",
                border: "none",
                borderBottom: "1px solid var(--renge-color-border-subtle)",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
              }}
            >
              Docs
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                style={{ transform: docsOpen ? "rotate(180deg)" : "none", transition: "transform 200ms", color: "var(--renge-color-fg-subtle)" }}
              >
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <AnimatePresence>
              {docsOpen && (
                <motion.div
                  key="mobile-docs"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  {DOCS_LINKS.map(({ label, href }) => (
                    <a
                      key={href}
                      href={href}
                      onClick={() => { onClose(); setDocsOpen(false); }}
                      style={{
                        display: "block",
                        fontSize: "var(--renge-font-size-sm)",
                        color: "var(--renge-color-fg-subtle)",
                        textDecoration: "none",
                        fontFamily: "var(--font-body)",
                        padding: "var(--renge-space-2) var(--renge-space-4)",
                        borderBottom: "1px solid var(--renge-color-border-subtle)",
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {TOP_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={resolveHref(href)}
                onClick={onClose}
                style={{
                  fontSize: "var(--renge-font-size-sm)",
                  color: "var(--renge-color-fg-subtle)",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  padding: "var(--renge-space-3) 0",
                  borderBottom: "1px solid var(--renge-color-border-subtle)",
                  transition: "color 150ms",
                }}
              >
                {label}
              </a>
            ))}

            <div style={{ paddingTop: "var(--renge-space-3)" }}>
              <ProfileToggle />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
