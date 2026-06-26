<script setup lang="ts">
interface BadgeProps {
  variant?: 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'neutral',
  size: 'md',
});

const colorVars = (variant: string) => {
  if (variant === 'neutral') {
    return {
      background: 'var(--renge-color-bg-subtle)',
      color: 'var(--renge-color-fg-muted)',
      borderColor: 'var(--renge-color-border-subtle)',
    };
  }
  return {
    background: `var(--renge-color-${variant}-subtle)`,
    color: `var(--renge-color-${variant})`,
    borderColor: `var(--renge-color-${variant})`,
  };
};

const sizeStyles = {
  sm: { padding: 'var(--renge-space-1) var(--renge-space-2)', fontSize: 'var(--renge-font-size-xs)' },
  md: { padding: 'var(--renge-space-1) var(--renge-space-3)', fontSize: 'var(--renge-font-size-xs)' },
  lg: { padding: 'var(--renge-space-2) var(--renge-space-3)', fontSize: 'var(--renge-font-size-sm)' },
};

const colors = colorVars(props.variant);

const badgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  lineHeight: 1,
  fontWeight: 500,
  borderRadius: 'var(--renge-radius-full)',
  border: `1px solid ${colors.borderColor}`,
  background: colors.background,
  color: colors.color,
  ...sizeStyles[props.size],
};
</script>

<template>
  <span :style="badgeStyle" v-bind="$attrs">
    <slot />
  </span>
</template>
