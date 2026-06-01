"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { ProfileToggle } from "./ProfileToggle";
import { Lotus } from "./Lotus";

const TOP_LINKS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Example",    href: "/oakland" },
  { label: "Start",      href: "#start" },
];

const DOCS_LINKS = [
  { label: "Tokens",     href: "/#tokens",     desc: "@renge-ui/tokens — CSS custom properties" },
  { label: "Tailwind",   href: "/tailwind",    desc: "@renge-ui/tailwind — Utility classes" },
  { label: "Components", href: "/components",  desc: "@renge-ui/react — React components" },
  { label: "System",     href: "/system",      desc: "Token API · Animations · Patterns" },
];

export function Nav() {
  const isMobile    = useBreakpoint();
  const pathname    = usePathname();
  const isHome      = pathname === "/";
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [docsOpen, setDocsOpen]     = useState(false);
  const [mobileDocsOpen, setMobileDocsOpen] = useState(false);
  const docsRef = useRef<HTMLDivElement>(null);

  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  // Close docs dropdown when clicking outside
  useEffect(() => {
    if (!docsOpen) return;
    const handler = (e: MouseEvent) => {
      if (docsRef.current && !docsRef.current.contains(e.target as Node)) {
        setDocsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [docsOpen]);

  const showBlur = scrolled || menuOpen;

  const linkStyle = {
    fontSize: "var(--renge-font-size-sm)",
    color: "var(--renge-color-fg-subtle)",
    textDecoration: "none",
    fontFamily: "var(--font-body)",
    letterSpacing: "0.04em",
    transition: "color 200ms",
  } as const;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
      <motion.nav
        animate={{
          background: showBlur
            ? "color-mix(in oklch, var(--renge-color-bg) 82%, transparent)"
            : "transparent",
          borderBottomColor: showBlur ? "var(--renge-color-border-subtle)" : "transparent",
          backdropFilter: showBlur ? "blur(14px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3, ease: [0.382, 1, 0.618, 1] }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `var(--renge-space-3) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
          borderBottom: "1px solid transparent",
          background: "transparent",
          backdropFilter: "blur(0px)",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-2)", textDecoration: "none", color: "var(--renge-color-fg)" }}>
          <Lotus size={26} animate={false} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", letterSpacing: "-0.01em" }}>
            Renge
          </span>
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-5)" }}>

            {/* Docs dropdown */}
            <div ref={docsRef} style={{ position: "relative" }}>
              <button
                onClick={() => setDocsOpen(o => !o)}
                style={{
                  ...linkStyle,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--renge-space-1)",
                  padding: 0,
                  color: docsOpen ? "var(--renge-color-fg)" : "var(--renge-color-fg-subtle)",
                }}
              >
                Docs
                <svg
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                  style={{ transform: docsOpen ? "rotate(180deg)" : "none", transition: "transform 200ms" }}
                >
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <AnimatePresence>
                {docsOpen && (
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
                        onClick={() => setDocsOpen(false)}
                        style={{
                          display: "block",
                          padding: "var(--renge-space-3) var(--renge-space-3)",
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

            {/* Top-level links */}
            {TOP_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={resolveHref(href)}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--renge-color-fg)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--renge-color-fg-subtle)")}
              >
                {label}
              </a>
            ))}

            <ProfileToggle />
          </div>
        )}

        {/* Mobile: hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "var(--renge-space-2)", color: "var(--renge-color-fg)", display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.25 }} style={{ display: "block", width: 20, height: 1, background: "currentColor", transformOrigin: "center" }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} style={{ display: "block", width: 14, height: 1, background: "currentColor" }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.25 }} style={{ display: "block", width: 20, height: 1, background: "currentColor", transformOrigin: "center" }} />
          </button>
        )}
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.382, 1, 0.618, 1] }}
            style={{ overflow: "hidden", background: "color-mix(in oklch, var(--renge-color-bg) 92%, transparent)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}
          >
            <div style={{ display: "flex", flexDirection: "column", padding: "var(--renge-space-4)", gap: "var(--renge-space-1)" }}>

              {/* Mobile docs section */}
              <button
                onClick={() => setMobileDocsOpen(o => !o)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "var(--renge-font-size-base)",
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
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: mobileDocsOpen ? "rotate(180deg)" : "none", transition: "transform 200ms", color: "var(--renge-color-fg-subtle)" }}>
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <AnimatePresence>
                {mobileDocsOpen && (
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
                        onClick={() => { setMenuOpen(false); setMobileDocsOpen(false); }}
                        style={{
                          display: "block",
                          fontSize: "var(--renge-font-size-base)",
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
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: "var(--renge-font-size-base)",
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
    </div>
  );
}
