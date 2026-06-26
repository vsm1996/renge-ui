<script setup lang="ts">
import { computed } from 'vue'

export type SizeKey = 'sm' | 'md' | 'lg'
export type Variant = 'solid' | 'outline' | 'ghost'
export type ColorScheme = 'accent' | 'danger' | 'success'

export interface ButtonProps {
  size?: SizeKey
  variant?: Variant
  colorScheme?: ColorScheme
  fullWidth?: boolean
  animation?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  variant: 'solid',
  colorScheme: 'accent',
  fullWidth: false,
})

const sizeStyles: Record<SizeKey, Record<string, string>> = {
  sm: {
    padding: 'var(--renge-space-1) var(--renge-space-2)',
    fontSize: 'var(--renge-font-size-sm)',
  },
  md: {
    padding: 'var(--renge-space-2) var(--renge-space-4)',
    fontSize: 'var(--renge-font-size-base)',
  },
  lg: {
    padding: 'var(--renge-space-3) var(--renge-space-5)',
    fontSize: 'var(--renge-font-size-lg)',
  },
}

const getVariantStyles = (): Record<string, string> => {
  switch (props.variant) {
    case 'solid':
      return {
        backgroundColor: `var(--renge-color-${props.colorScheme})`,
        color: 'var(--renge-color-fg-inverse)',
        border: 'none',
      }
    case 'outline':
      return {
        backgroundColor: 'transparent',
        color: `var(--renge-color-${props.colorScheme})`,
        border: `1px solid var(--renge-color-${props.colorScheme})`,
      }
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: `var(--renge-color-${props.colorScheme})`,
        border: 'none',
      }
  }
}

const computedStyle = computed(() => ({
  ...sizeStyles[props.size],
  ...getVariantStyles(),
  borderRadius: 'var(--renge-radius-2)',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all var(--renge-duration-2) var(--renge-easing-ease-out)',
  width: props.fullWidth ? '100%' : undefined,
  animation: props.animation ? `var(--renge-animation-${props.animation})` : undefined,
}))
</script>

<template>
  <button :style="computedStyle" v-bind="$attrs">
    <slot />
  </button>
</template>
