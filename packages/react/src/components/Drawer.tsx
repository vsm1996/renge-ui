'use client';

import { forwardRef, type ReactNode, useEffect, useRef, useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { createPortal } from 'react-dom';

const FOCUSABLE_SELECTORS = [
  'a[href]', 'button:not(:disabled)', 'input:not(:disabled)',
  'select:not(:disabled)', 'textarea:not(:disabled)',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

if (typeof document !== 'undefined') {
  const id = '__renge-drawer-kf__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
@keyframes rengeDrawerRight  { from { transform: translateX(100%);  } to { transform: translateX(0); } }
@keyframes rengeDrawerLeft   { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes rengeDrawerTop    { from { transform: translateY(-100%); } to { transform: translateY(0); } }
@keyframes rengeDrawerBottom { from { transform: translateY(100%);  } to { transform: translateY(0); } }`;
    document.head.appendChild(s);
  }
}

export interface DrawerProps extends ComponentPropsWithoutRef<'div'> {
  isOpen?: boolean;
  onClose?: () => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
  children?: ReactNode;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ isOpen, onClose, side = 'right', children, style, ...props }, ref) => {
    const [mounted, setMounted] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
      if (!isOpen) return;
      document.body.style.overflow = 'hidden';

      const prev = document.activeElement as HTMLElement | null;
      const el = panelRef.current;
      const firstFocusable = el?.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
      (firstFocusable ?? el)?.focus();

      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') { onClose?.(); return; }
        if (e.key !== 'Tab' || !el) return;
        const nodes = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
        if (!nodes.length) { e.preventDefault(); return; }
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || active === el) { e.preventDefault(); last.focus(); }
        } else {
          if (active === last || active === el) { e.preventDefault(); first.focus(); }
        }
      };

      document.addEventListener('keydown', handler, true);
      return () => {
        document.removeEventListener('keydown', handler, true);
        document.body.style.overflow = '';
        prev?.focus();
      };
    }, [isOpen, onClose]);

    if (!mounted || !isOpen) return null;

    const isHorizontal = side === 'left' || side === 'right';
    const borderRadius: Record<string, string> = {
      right:  'var(--renge-radius-3) 0 0 var(--renge-radius-3)',
      left:   '0 var(--renge-radius-3) var(--renge-radius-3) 0',
      top:    '0 0 var(--renge-radius-3) var(--renge-radius-3)',
      bottom: 'var(--renge-radius-3) var(--renge-radius-3) 0 0',
    };

    return createPortal(
      <div role="presentation" style={{ position: 'fixed', inset: 0, zIndex: 9000 }}>
        <div
          aria-hidden="true"
          onClick={onClose}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.5)' }}
        />
        <div
          ref={(node) => {
            (panelRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          style={{
            position: 'absolute',
            [side]: 0,
            top: isHorizontal || side === 'top' ? 0 : undefined,
            bottom: isHorizontal || side === 'bottom' ? 0 : undefined,
            width: isHorizontal ? undefined : '100%',
            height: isHorizontal ? '100%' : undefined,
            maxWidth: isHorizontal ? '80vw' : undefined,
            maxHeight: !isHorizontal ? '80vh' : undefined,
            background: 'var(--renge-color-bg)',
            borderRadius: borderRadius[side],
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            overflow: 'auto',
            outline: 'none',
            animation: `rengeDrawer${side.charAt(0).toUpperCase() + side.slice(1)} var(--renge-duration-4) var(--renge-easing-ease-out)`,
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

Drawer.displayName = 'Drawer';
