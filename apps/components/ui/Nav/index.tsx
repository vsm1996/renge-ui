"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { Container } from "@renge-ui/react";
import { ProfileToggle } from "../ProfileToggle";
import { Lotus } from "../Lotus";
import { DocsDropdown } from "./DocsDropdown";
import { MobileMenu } from "./MobileMenu";
import { TOP_LINKS } from "./links";

const linkStyle = {
  fontSize: "var(--renge-font-size-sm)",
  color: "var(--renge-color-fg-subtle)",
  textDecoration: "none",
  fontFamily: "var(--font-body)",
  letterSpacing: "0.04em",
  transition: "color 200ms",
} as const;

export function Nav() {
  const isMobile = useBreakpoint();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);

  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const showBlur = scrolled || menuOpen;

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
          borderBottom: "1px solid transparent",
          background: "transparent",
          backdropFilter: "blur(0px)",
        }}
      >
        <Container size="md" px={isMobile ? "4" : "5"} style={{ paddingTop: "var(--renge-space-3)", paddingBottom: "var(--renge-space-3)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-2)", textDecoration: "none", color: "var(--renge-color-fg)" }}>
            <Lotus size={26} animate={false} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", letterSpacing: "-0.01em" }}>
              Renge
            </span>
          </a>

          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "var(--renge-space-5)" }}>
              <DocsDropdown
                isOpen={docsOpen}
                onToggle={() => setDocsOpen(o => !o)}
                onClose={() => setDocsOpen(false)}
              />
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
        </Container>
      </motion.nav>

      <MobileMenu
        isOpen={isMobile && menuOpen}
        onClose={() => setMenuOpen(false)}
        resolveHref={resolveHref}
      />
    </div>
  );
}
