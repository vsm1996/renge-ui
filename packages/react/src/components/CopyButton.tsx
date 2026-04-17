// packages/react/src/components/CopyButton.tsx
//
// Clipboard copy with visual feedback. The success state persists for
// duration-7 (2100ms — a Fibonacci duration, long enough to read but
// not so long it feels wrong).

'use client';

import { forwardRef, useState, type ComponentPropsWithoutRef } from 'react';

export interface CopyButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'onCopy'> {
  /** Text to copy to clipboard */
  value: string;
  /** Label at idle state */
  label?: string;
  /** Label after successful copy */
  successLabel?: string;
  /** How long to show success state in ms (default 2100 = Fibonacci duration-7) */
  timeout?: number;
  onCopy?: (value: string) => void;
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  function CopyButton(
    {
      value,
      label = 'Copy',
      successLabel = 'Copied!',
      timeout = 2100,
      onCopy,
      style,
      ...props
    },
    ref
  ) {
    const [copied, setCopied] = useState(false);

    const handleClick = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopy?.(value);
        setTimeout(() => setCopied(false), timeout);
      } catch (err) {
        // Fallback for non-secure contexts
        const el = document.createElement('textarea');
        el.value = value;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
      }
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        aria-label={copied ? successLabel : label}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--renge-space-1)',
          padding: 'var(--renge-space-1) var(--renge-space-3)',
          border: copied
            ? '1px solid var(--renge-color-success)'
            : '1px solid var(--renge-color-border)',
          borderRadius: 'var(--renge-radius-1)',
          background: copied ? 'var(--renge-color-success-subtle)' : 'var(--renge-color-bg-subtle)',
          color: copied ? 'var(--renge-color-success)' : 'var(--renge-color-fg-subtle)',
          fontSize: 'var(--renge-font-size-sm)',
          fontFamily: 'inherit',
          cursor: 'pointer',
          transition: `all var(--renge-duration-2) var(--renge-easing-spring)`,
          ...style,
        }}
        {...props}
      >
        {/* Icon */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {copied ? (
            <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <>
              <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M3 8H2a1 1 0 01-1-1V2a1 1 0 011-1h5a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </>
          )}
        </svg>
        {copied ? successLabel : label}
      </button>
    );
  }
);
