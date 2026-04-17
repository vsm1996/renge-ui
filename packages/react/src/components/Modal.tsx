// packages/react/src/components/Modal.tsx
//
// Portal-based modal dialog. The overlay fades in; the dialog enters
// with bloom spring easing — the same opening motion as a flower.
// Max width follows space-9 (220px × φ ≈ 356px) for a harmonious frame.

'use client';

import {
  useEffect,
  useState,
  useRef,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';

// ─── Keyframes ───────────────────────────────────────────────────────────────

if (typeof document !== 'undefined') {
  const id = '__renge-modal-kf__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
@keyframes rengeOverlayIn  { from { opacity: 0; } to { opacity: 1; } }
@keyframes rengeOverlayOut { from { opacity: 1; } to { opacity: 0; } }
@keyframes rengeModalIn  {
  0%   { opacity: 0; transform: scale(0.9) translateY(var(--renge-space-3)); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes rengeModalOut {
  0%   { opacity: 1; transform: scale(1) translateY(0); }
  100% { opacity: 0; transform: scale(0.95) translateY(var(--renge-space-2)); }
}`;
    document.head.appendChild(s);
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: ModalSize;
  /** Close modal when overlay is clicked — default true */
  closeOnOverlayClick?: boolean;
  /** Close on Escape key — default true */
  closeOnEsc?: boolean;
  style?: CSSProperties;
}

export interface ModalHeaderProps { children: ReactNode; style?: CSSProperties; }
export interface ModalBodyProps   { children: ReactNode; style?: CSSProperties; }
export interface ModalFooterProps { children: ReactNode; style?: CSSProperties; }

// ─── Size map (Fibonacci-derived widths) ─────────────────────────────────────

const SIZE_MAX: Record<ModalSize, string> = {
  sm:   '380px',   // ~space-10 / φ
  md:   '520px',   // harmonic midpoint
  lg:   '720px',   // space-10 × 2
  xl:   '960px',
  full: '100vw',
};

// ─── Modal ────────────────────────────────────────────────────────────────────

export function Modal({
  open,
  onClose,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  style,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setExiting(false);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else if (visible) {
      setExiting(true);
      const t = setTimeout(() => {
        setVisible(false);
        setExiting(false);
        document.body.style.overflow = '';
      }, 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, closeOnEsc, onClose]);

  // Focus trap
  useEffect(() => {
    if (open) {
      const prev = document.activeElement as HTMLElement;
      dialogRef.current?.focus();
      return () => prev?.focus();
    }
  }, [open]);

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--renge-space-4)',
      }}
    >
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={() => closeOnOverlayClick && onClose()}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(2px)',
          animation: exiting
            ? `rengeOverlayOut var(--renge-duration-3) var(--renge-easing-ease-in) forwards`
            : `rengeOverlayIn var(--renge-duration-3) var(--renge-easing-ease-out) both`,
        }}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: SIZE_MAX[size],
          maxHeight: '90vh',
          background: 'var(--renge-color-bg)',
          borderRadius: 'var(--renge-radius-3)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          outline: 'none',
          animation: exiting
            ? `rengeModalOut var(--renge-duration-2) var(--renge-easing-ease-in) forwards`
            : `rengeModalIn var(--renge-duration-4) var(--renge-easing-spring) both`,
          ...style,
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

export function ModalHeader({ children, style }: ModalHeaderProps) {
  return (
    <div
      style={{
        padding: 'var(--renge-space-4) var(--renge-space-5)',
        borderBottom: '1px solid var(--renge-color-border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function ModalBody({ children, style }: ModalBodyProps) {
  return (
    <div
      style={{
        padding: 'var(--renge-space-5)',
        overflowY: 'auto',
        flex: 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function ModalFooter({ children, style }: ModalFooterProps) {
  return (
    <div
      style={{
        padding: 'var(--renge-space-3) var(--renge-space-5)',
        borderTop: '1px solid var(--renge-color-border-subtle)',
        display: 'flex',
        gap: 'var(--renge-space-2)',
        justifyContent: 'flex-end',
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
