// packages/react/src/components/Accordion.tsx
//
// Expandable sections with natural easing. The expand icon rotates at
// the golden angle (137.5°... simplified to 180° for clear affordance).
// Accordion manages open state; AccordionItem is a single expandable row.

import {
  forwardRef,
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type CSSProperties,
} from 'react';

// ─── Context ─────────────────────────────────────────────────────────────────

interface AccordionCtx {
  openIds: Set<string>;
  toggle: (id: string) => void;
  multiple: boolean;
}

const AccordionContext = createContext<AccordionCtx | null>(null);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AccordionProps extends ComponentPropsWithoutRef<'div'> {
  /** Allow multiple items open simultaneously */
  multiple?: boolean;
  defaultOpen?: string | string[];
}

export interface AccordionItemProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
  disabled?: boolean;
}

// ─── Accordion ───────────────────────────────────────────────────────────────

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion({ multiple = false, defaultOpen, style, children, ...props }, ref) {
    const initialOpen = new Set<string>(
      defaultOpen ? (Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]) : []
    );
    const [openIds, setOpenIds] = useState<Set<string>>(initialOpen);

    const toggle = (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!multiple) next.clear();
          next.add(id);
        }
        return next;
      });
    };

    return (
      <AccordionContext.Provider value={{ openIds, toggle, multiple }}>
        <div
          ref={ref}
          style={{
            border: '1px solid var(--renge-color-border-subtle)',
            borderRadius: 'var(--renge-radius-2)',
            overflow: 'hidden',
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

// ─── AccordionItem ────────────────────────────────────────────────────────────

export function AccordionItem({ id, title, children, style, disabled = false }: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  const isOpen = ctx?.openIds.has(id) ?? false;
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        borderBottom: '1px solid var(--renge-color-border-subtle)',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {/* Trigger */}
      <button
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
        id={`accordion-trigger-${id}`}
        disabled={disabled}
        onClick={() => !disabled && ctx?.toggle(id)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--renge-space-3) var(--renge-space-4)',
          background: 'transparent',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: 'var(--renge-font-size-base)',
          color: 'var(--renge-color-fg)',
          fontFamily: 'inherit',
          textAlign: 'left',
          transition: `background var(--renge-duration-1) var(--renge-easing-ease-out)`,
        }}
        onMouseEnter={(e) => {
          if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = 'var(--renge-color-bg-subtle)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
        }}
      >
        <span style={{ fontWeight: 500 }}>{title}</span>
        {/* Chevron rotates 180° on open */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: `transform var(--renge-duration-3) var(--renge-easing-spring)`,
            color: 'var(--renge-color-fg-muted)',
          }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Panel — animates height using Fibonacci durations */}
      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-trigger-${id}`}
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          transition: `height var(--renge-duration-4) var(--renge-easing-ease-in-out)`,
        }}
      >
        <div
          ref={contentRef}
          style={{
            padding: 'var(--renge-space-1) var(--renge-space-4) var(--renge-space-4)',
            color: 'var(--renge-color-fg-subtle)',
            fontSize: 'var(--renge-font-size-base)',
            lineHeight: 'var(--renge-line-height-base)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
