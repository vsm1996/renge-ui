"use client";

import { useCallback, useEffect, useRef } from "react";

export function useSlider(pos: number, setPos: (v: number) => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(8, Math.min(clientX - rect.left, rect.width - 8));
      setPos((x / rect.width) * 100);
    },
    [setPos]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current) update(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (dragging.current) {
        e.preventDefault();
        update(e.touches[0].clientX);
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [update]);

  const startDrag = useCallback(
    (clientX: number) => {
      dragging.current = true;
      update(clientX);
    },
    [update]
  );

  return { containerRef, startDrag };
}
