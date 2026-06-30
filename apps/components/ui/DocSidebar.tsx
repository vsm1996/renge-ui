"use client";

import { Stack } from "@renge-ui/react";
import { useEffect, useState } from "react";

export type SidebarSection = {
  label: string;
  items: { id: string; label: string }[];
};

export function DocSidebar({
  sections,
  footerLinks = [],
}: {
  sections: SidebarSection[];
  footerLinks?: { href: string; label: string }[];
}) {
  const allIds = sections.flatMap(s => s.items.map(i => i.id));
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const visible = new Map<string, number>();

    allIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
          if (visible.size > 0) {
            // pick the one with the highest ratio, or earliest in list if tied
            let best = "";
            let bestRatio = -1;
            for (const aid of allIds) {
              const r = visible.get(aid) ?? -1;
              if (r > bestRatio) { bestRatio = r; best = aid; }
            }
            setActiveId(best);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allIds.join(",")]);

  return (
    <aside style={{ width: 180, flexShrink: 0, position: "sticky", top: "calc(52px + var(--renge-space-4))" }}>
      <div style={{ height: "calc(100vh - 52px - var(--renge-space-4))", overflowY: "auto", display: "flex", flexDirection: "column", gap: "var(--renge-space-5)", paddingBottom: "var(--renge-space-5)" }}>
        {sections.map(section => (
          <div key={section.label}>
            <p style={{ fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, margin: 0, marginBottom: "var(--renge-space-2)" }}>
              {section.label}
            </p>
            <Stack gap="1">
              {section.items.map(item => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    data-sidebar-link=""
                    data-active={isActive ? "true" : undefined}
                    style={{
                      display: "block",
                      padding: "var(--renge-space-1) var(--renge-space-3)",
                      borderRadius: "var(--renge-radius-1)",
                      fontSize: "var(--renge-font-size-sm)",
                      fontFamily: "var(--font-body)",
                      color: isActive ? "var(--renge-color-accent)" : "var(--renge-color-fg-subtle)",
                      background: isActive ? "var(--renge-color-accent-subtle)" : "transparent",
                      textDecoration: "none",
                      fontWeight: isActive ? 500 : undefined,
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </Stack>
          </div>
        ))}

        {footerLinks.length > 0 && (
          <div style={{ paddingTop: "var(--renge-space-4)", borderTop: "1px solid var(--renge-color-border-subtle)", display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
            {footerLinks.map(link => (
              <a key={link.href} href={link.href} data-sidebar-footer-link="" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-body)", textDecoration: "none" }}>
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
