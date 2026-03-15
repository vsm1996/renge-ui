"use client";
import { useState, useEffect } from "react";

/**
 * SSR-safe breakpoint hook.
 * Returns true once mounted if viewport is <= breakpoint px.
 * Defaults to the standard mobile breakpoint (768px).
 */
export function useBreakpoint(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}
