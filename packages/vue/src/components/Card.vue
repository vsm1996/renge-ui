<script setup lang="ts">
interface CardProps {
  padding?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  radius?: 'none' | '1' | '2' | '3' | '4' | '5' | 'full';
  variant?: 'elevated' | 'outlined' | 'filled';
  animation?: string;
}

const props = withDefaults(defineProps<CardProps>(), {
  padding: '4',
  radius: '3',
  variant: 'elevated',
});

const variantStyles = {
  elevated: {
    backgroundColor: 'var(--renge-color-bg)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
  },
  outlined: {
    backgroundColor: 'var(--renge-color-bg)',
    border: '1px solid var(--renge-color-border)',
  },
  filled: {
    backgroundColor: 'var(--renge-color-bg-subtle)',
  },
};

const cardStyle = {
  padding: `var(--renge-space-${props.padding})`,
  borderRadius: `var(--renge-radius-${props.radius})`,
  ...variantStyles[props.variant],
  animation: props.animation ? `var(--renge-animation-${props.animation})` : undefined,
};
</script>

<template>
  <div :style="cardStyle" v-bind="$attrs">
    <slot />
  </div>
</template>
