// packages/react/src/components/Toast.tsx
//
// Portal-based toast notification system.
// Toasts enter with helix-rise spring easing, exit with sacred-fade.
// Max 5 toasts visible (Fibonacci number).
//
// Usage:
//   const { toast } = useToast();
//   toast({ title: 'Saved', status: 'success' });

'use client';

import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

// ─── Keyframes ───────────────────────────────────────────────────────────────

if (typeof document !== 'undefined') {
  const id = '__renge-toast-kf__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
@keyframes rengeToastIn {
  0%   { transform: translateX(120%); opacity: 0; }
  100% { transform: translateX(0);    opacity: 1; }
}
@keyframes rengeToastOut {
  0%   { transform: translateX(0);    opacity: 1; max-height: 80px; margin-bottom: var(--renge-space-2); }
  100% { transform: translateX(120%); opacity: 0; max-height: 0;    margin-bottom: 0; }
}`;
    document.head.appendChild(s);
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastStatus = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface ToastOptions {
  title: string;
  description?: string;
  status?: ToastStatus;
  /** Duration in ms — default 5000 (Fib-derived: 3400+1600≈5000) */
  duration?: number;
  /** Pass null to make it persist until dismissed */
  id?: string;
}

interface ToastItem extends ToastOptions {
  id: string;
  exiting: boolean;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}

// ─── Status colors ───────────────────────────────────────────────────────────

const statusConfig: Record<ToastStatus, { border: string; icon: string; label: string }> = {
  default: { border: 'var(--renge-color-border)',         icon: '○', label: '' },
  success: { border: 'var(--renge-color-success)',         icon: '✓', label: 'Success' },
  warning: { border: 'var(--renge-color-warning)',         icon: '⚠', label: 'Warning' },
  danger:  { border: 'var(--renge-color-danger)',          icon: '✕', label: 'Error' },
  info:    { border: 'var(--renge-color-info)',            icon: 'ℹ', label: 'Info' },
};

const iconColor: Record<ToastStatus, string> = {
  default: 'var(--renge-color-fg-muted)',
  success: 'var(--renge-color-success)',
  warning: 'var(--renge-color-warning)',
  danger:  'var(--renge-color-danger)',
  info:    'var(--renge-color-info)',
};

// ─── ToastProvider ────────────────────────────────────────────────────────────

let counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 400);
  }, []);

  const toast = useCallback((options: ToastOptions): string => {
    const id = options.id ?? `toast-${++counter}`;
    const duration = options.duration ?? 5000;

    setToasts((prev) => {
      // Max 5 toasts (Fibonacci number) — remove oldest if needed
      const next = [{ ...options, id, status: options.status ?? 'default', exiting: false }, ...prev];
      return next.slice(0, 5);
    });

    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }

    return id;
  }, [dismiss]);

  const portal = mounted
    ? createPortal(
        <div
          role="region"
          aria-label="Notifications"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: 'var(--renge-space-5)',
            right: 'var(--renge-space-5)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: 'var(--renge-space-2)',
            maxWidth: '380px',
            width: 'calc(100vw - var(--renge-space-7))',
            pointerEvents: 'none',
          }}
        >
          {toasts.map((t) => (
            <ToastCard key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
          ))}
        </div>,
        document.body
      )
    : null;

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {portal}
    </ToastContext.Provider>
  );
}

// ─── Individual toast card ────────────────────────────────────────────────────

function ToastCard({ toast: t, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const cfg = statusConfig[t.status ?? 'default'];

  return (
    <div
      role="alert"
      style={{
        background: 'var(--renge-color-bg)',
        border: `1px solid var(--renge-color-border)`,
        borderLeft: `3px solid ${cfg.border}`,
        borderRadius: 'var(--renge-radius-2)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        padding: 'var(--renge-space-3) var(--renge-space-4)',
        display: 'flex',
        gap: 'var(--renge-space-3)',
        alignItems: 'flex-start',
        pointerEvents: 'all',
        animation: t.exiting
          ? `rengeToastOut var(--renge-duration-3) var(--renge-easing-ease-in) forwards`
          : `rengeToastIn var(--renge-duration-3) var(--renge-easing-spring) both`,
      }}
    >
      {/* Status icon */}
      <span
        aria-hidden="true"
        style={{
          fontSize: 'var(--renge-font-size-base)',
          color: iconColor[t.status ?? 'default'],
          lineHeight: 1,
          marginTop: '2px',
          flexShrink: 0,
        }}
      >
        {cfg.icon}
      </span>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 500, fontSize: 'var(--renge-font-size-base)', color: 'var(--renge-color-fg)' }}>
          {t.title}
        </p>
        {t.description && (
          <p style={{ margin: 'var(--renge-space-1) 0 0', fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-subtle)', lineHeight: 'var(--renge-line-height-sm)' }}>
            {t.description}
          </p>
        )}
      </div>

      {/* Dismiss */}
      <button
        aria-label="Dismiss"
        onClick={onDismiss}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--renge-color-fg-muted)',
          padding: 0,
          lineHeight: 1,
          fontSize: 'var(--renge-font-size-base)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 20,
          height: 20,
          borderRadius: 'var(--renge-radius-1)',
        }}
      >
        ×
      </button>
    </div>
  );
}
