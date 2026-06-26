import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface CodeBlockProps extends ComponentPropsWithoutRef<'pre'> {
  code?: string;
  language?: string;
  inline?: boolean;
}

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ code, language, inline = false, children, ...props }, ref) => {
    if (inline) {
      return (
        <code
          style={{
            background: 'var(--renge-color-bg-subtle)',
            color: 'var(--renge-color-accent)',
            padding: '0.125em 0.25em',
            borderRadius: 'var(--renge-radius-1)',
            fontFamily: 'monospace',
            fontSize: '0.9em',
          }}
          {...(props as any)}
        >
          {code || children}
        </code>
      );
    }

    return (
      <pre
        ref={ref}
        style={{
          background: 'var(--renge-color-bg-subtle)',
          color: 'var(--renge-color-fg)',
          padding: 'var(--renge-space-4)',
          borderRadius: 'var(--renge-radius-2)',
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: 'var(--renge-font-size-sm)',
          lineHeight: 'var(--renge-line-height-sm)',
        }}
        {...props}
      >
        <code>{code || children}</code>
      </pre>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';
