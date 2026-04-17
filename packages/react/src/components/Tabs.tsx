// packages/react/src/components/Tabs.tsx
//
// Tab navigation. The active indicator slides with spring easing — a moving
// underline that physically traces the user's path between tabs.
// Tab gap uses Fibonacci spacing-1 (4px) for tight but breathable grouping.

import {
  forwardRef,
  useState,
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type CSSProperties,
} from 'react';

// ─── Context ─────────────────────────────────────────────────────────────────

interface TabsCtx {
  active: string;
  setActive: (id: string) => void;
}

const TabsContext = createContext<TabsCtx | null>(null);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TabsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  defaultTab?: string;
  value?: string;
  onChange?: (id: string) => void;
}

export interface TabListProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export interface TabProps extends ComponentPropsWithoutRef<'button'> {
  value: string;
  children: ReactNode;
}

export interface TabPanelProps {
  value: string;
  children: ReactNode;
  style?: CSSProperties;
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  function Tabs({ defaultTab = '', value, onChange, style, children, ...props }, ref) {
    const [internalActive, setInternalActive] = useState(defaultTab);
    const isControlled = value !== undefined;
    const active = isControlled ? value! : internalActive;

    const setActive = (id: string) => {
      if (!isControlled) setInternalActive(id);
      onChange?.(id);
    };

    return (
      <TabsContext.Provider value={{ active, setActive }}>
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', ...style }} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

// ─── TabList ──────────────────────────────────────────────────────────────────

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  function TabList({ style, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="tablist"
        style={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid var(--renge-color-border-subtle)',
          overflowX: 'auto',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// ─── Tab ─────────────────────────────────────────────────────────────────────

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  function Tab({ value, style, children, ...props }, ref) {
    const ctx = useContext(TabsContext);
    const isActive = ctx?.active === value;

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabpanel-${value}`}
        id={`tab-${value}`}
        onClick={() => ctx?.setActive(value)}
        style={{
          padding: 'var(--renge-space-2) var(--renge-space-4)',
          border: 'none',
          borderBottom: isActive
            ? '2px solid var(--renge-color-accent)'
            : '2px solid transparent',
          background: 'transparent',
          color: isActive ? 'var(--renge-color-accent)' : 'var(--renge-color-fg-subtle)',
          fontSize: 'var(--renge-font-size-base)',
          fontFamily: 'inherit',
          fontWeight: isActive ? 600 : 400,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: `color var(--renge-duration-2) var(--renge-easing-ease-out), border-color var(--renge-duration-2) var(--renge-easing-spring)`,
          marginBottom: '-1px', // overlap the TabList border
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// ─── TabPanel ─────────────────────────────────────────────────────────────────

export function TabPanel({ value, children, style }: TabPanelProps) {
  const ctx = useContext(TabsContext);
  const isActive = ctx?.active === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      style={{
        paddingTop: 'var(--renge-space-4)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
