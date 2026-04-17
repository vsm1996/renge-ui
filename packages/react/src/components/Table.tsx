// packages/react/src/components/Table.tsx
//
// Data table primitives. Row padding follows Fibonacci spacing.
// Zebra striping uses bg-subtle at every other row.

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export interface TableProps extends ComponentPropsWithoutRef<'table'> {
  /** Apply zebra striping to alternating rows */
  striped?: boolean;
  /** Show outer border */
  bordered?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  function Table({ striped = false, bordered = false, style, children, ...props }, ref) {
    return (
      <div
        style={{
          overflowX: 'auto',
          borderRadius: 'var(--renge-radius-2)',
          border: bordered ? '1px solid var(--renge-color-border-subtle)' : undefined,
        }}
      >
        <table
          ref={ref}
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 'var(--renge-font-size-base)',
            color: 'var(--renge-color-fg)',
            fontFamily: 'inherit',
            ...style,
          }}
          data-striped={striped ? 'true' : undefined}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

export const TableHead = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'thead'>>(
  function TableHead({ style, children, ...props }, ref) {
    return (
      <thead
        ref={ref}
        style={{
          background: 'var(--renge-color-bg-subtle)',
          borderBottom: '2px solid var(--renge-color-border)',
          ...style,
        }}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

export const TableBody = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'tbody'>>(
  function TableBody({ style, children, ...props }, ref) {
    return (
      <tbody
        ref={ref}
        style={{ ...style }}
        {...props}
      >
        {children}
      </tbody>
    );
  }
);

export const TableFoot = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'tfoot'>>(
  function TableFoot({ style, children, ...props }, ref) {
    return (
      <tfoot
        ref={ref}
        style={{
          borderTop: '2px solid var(--renge-color-border)',
          background: 'var(--renge-color-bg-subtle)',
          ...style,
        }}
        {...props}
      >
        {children}
      </tfoot>
    );
  }
);

export interface TableRowProps extends ComponentPropsWithoutRef<'tr'> {
  /** Manual row index for striping when not using CSS nth-child */
  index?: number;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ index, style, children, ...props }, ref) {
    const isEven = index !== undefined && index % 2 === 1;
    return (
      <tr
        ref={ref}
        style={{
          background: isEven ? 'var(--renge-color-bg-subtle)' : undefined,
          borderBottom: '1px solid var(--renge-color-border-subtle)',
          transition: 'background var(--renge-duration-1) var(--renge-easing-ease-out)',
          ...style,
        }}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

export const TableHeader = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'th'>>(
  function TableHeader({ style, children, ...props }, ref) {
    return (
      <th
        ref={ref}
        style={{
          padding: 'var(--renge-space-2) var(--renge-space-4)',
          textAlign: 'left',
          fontSize: 'var(--renge-font-size-sm)',
          fontWeight: 600,
          color: 'var(--renge-color-fg-subtle)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          ...style,
        }}
        {...props}
      >
        {children}
      </th>
    );
  }
);

export interface TableCellProps extends ComponentPropsWithoutRef<'td'> {
  /** Muted styling for secondary data */
  muted?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({ muted = false, style, children, ...props }, ref) {
    return (
      <td
        ref={ref}
        style={{
          padding: 'var(--renge-space-3) var(--renge-space-4)',
          color: muted ? 'var(--renge-color-fg-muted)' : 'var(--renge-color-fg)',
          fontSize: 'var(--renge-font-size-base)',
          verticalAlign: 'middle',
          ...style,
        }}
        {...props}
      >
        {children}
      </td>
    );
  }
);
