import { forwardRef, ReactNode, useEffect } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface DrawerProps extends ComponentPropsWithoutRef<'div'> {
  isOpen?: boolean;
  onClose?: () => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
  children?: ReactNode;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ isOpen, onClose, side = 'right', children, ...props }, ref) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    const isVertical = side === 'top' || side === 'bottom';
    const position = {
      left: side === 'left' ? 0 : undefined,
      right: side === 'right' ? 0 : undefined,
      top: side === 'top' ? 0 : undefined,
      bottom: side === 'bottom' ? 0 : undefined,
    };

    return (
      <>
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
          }}
        />
        <div
          ref={ref}
          style={{
            position: 'fixed',
            ...position,
            [isVertical ? 'width' : 'height']: isVertical ? '100%' : 'auto',
            [isVertical ? 'maxHeight' : 'maxWidth']: isVertical ? '80vh' : '80vw',
            background: 'var(--renge-color-bg)',
            borderRadius: side === 'right' ? 'var(--renge-radius-3) 0 0 var(--renge-radius-3)' :
                         side === 'left' ? '0 var(--renge-radius-3) var(--renge-radius-3) 0' :
                         side === 'top' ? '0 0 var(--renge-radius-3) var(--renge-radius-3)' :
                         'var(--renge-radius-3) var(--renge-radius-3) 0 0',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            zIndex: 50,
            overflow: 'auto',
            animation: isVertical
              ? `slide${side === 'top' ? 'Down' : 'Up'} var(--renge-duration-4) var(--renge-easing-ease-out)`
              : `slide${side === 'right' ? 'Left' : 'Right'} var(--renge-duration-4) var(--renge-easing-ease-out)`,
          }}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

Drawer.displayName = 'Drawer';
