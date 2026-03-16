"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { ProfileToggle } from "./ProfileToggle";
import { Lotus } from "./Lotus";

const NAV_LINKS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Tokens", href: "#tokens" },
  { label: "Components", href: "/docs" },
  { label: "Example", href: "/oakland" },
  { label: "Start", href: "#start" },
];

export function Nav() {
  const isMobile = useBreakpoint();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Resolve hash links to absolute paths when not on the home page
  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const showBlur = scrolled || menuOpen;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <motion.nav
        animate={{
          background: showBlur
            ? "color-mix(in oklch, var(--renge-color-bg) 82%, transparent)"
            : "transparent",
          borderBottomColor: showBlur
            ? "var(--renge-color-border-subtle)"
            : "transparent",
          backdropFilter: showBlur ? "blur(14px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3, ease: [0.382, 1, 0.618, 1] }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `var(--renge-space-3) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"}`,
          borderBottom: "1px solid transparent",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--renge-space-2)",
            textDecoration: "none",
            color: "var(--renge-color-fg)",
          }}
        >
          <Lotus size={26} animate={false} />
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--renge-font-size-lg)",
            letterSpacing: "-0.01em",
          }}>
            Renge
          </span>
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-5)" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={resolveHref(href)}
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
        )}

        {/* Mobile: hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "var(--renge-space-2)",
              color: "var(--renge-color-fg)",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "flex-end",
            }}
          >
            {/* Animated hamburger — top bar shortens when open */}
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "block", width: 20, height: 1, background: "currentColor", transformOrigin: "center" }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: "block", width: 14, height: 1, background: "currentColor" }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "block", width: 20, height: 1, background: "currentColor", transformOrigin: "center" }}
            />
          </button>
        )}
      </motion.nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMobile && menuOpen && (
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
            <div style={{
              display: "flex",
              flexDirection: "column",
              padding: "var(--renge-space-4)",
              gap: "var(--renge-space-1)",
            }}>
              {NAV_LINKS.map(({ label, href }) => (
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
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--renge-color-fg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--renge-color-fg-subtle)")}
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
