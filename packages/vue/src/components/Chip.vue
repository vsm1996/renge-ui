<script setup lang="ts">
interface ChipProps {
  variant?: 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  onDismiss?: () => void;
}

const props = withDefaults(defineProps<ChipProps>(), {
  variant: 'neutral',
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

const colors = colorVars(props.variant);

const chipStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--renge-space-2)',
  padding: 'var(--renge-space-2) var(--renge-space-3)',
  fontSize: 'var(--renge-font-size-sm)',
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 'var(--renge-radius-full)',
  border: `1px solid ${colors.borderColor}`,
  background: colors.background,
  color: colors.color,
};

const dismissBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  color: 'inherit',
  fontSize: 'var(--renge-font-size-sm)',
  lineHeight: 1,
  opacity: 0.7,
};
</script>

<template>
  <span :style="chipStyle" v-bind="$attrs">
    <slot />
    <button
      v-if="onDismiss"
      :style="dismissBtnStyle"
      aria-label="Dismiss"
      @click="onDismiss"
    >
      ×
    </button>
  </span>
</template>
