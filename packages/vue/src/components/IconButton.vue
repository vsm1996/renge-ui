<script setup lang="ts">
import { computed, ref } from 'vue'

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type IconButtonVariant = 'solid' | 'outline' | 'ghost'
export type IconButtonColorScheme = 'accent' | 'danger' | 'success' | 'neutral'

export interface IconButtonProps {
  size?: IconButtonSize
  variant?: IconButtonVariant
  colorScheme?: IconButtonColorScheme
  animation?: string
}

const props = withDefaults(defineProps<IconButtonProps>(), {
  size: 'md',
  variant: 'ghost',
  colorScheme: 'neutral',
})

const SIZE_PX: Record<IconButtonSize, number> = {
  xs: 20,
  sm: 32,
  md: 40,
  lg: 52,
  xl: 84,
}

const ICON_SIZE: Record<IconButtonSize, number> = {
  xs: 10,
  sm: 14,
  md: 18,
  lg: 22,
  xl: 32,
}

const px = computed(() => SIZE_PX[props.size])

const colorToken = computed(() =>
  props.colorScheme === 'neutral'
    ? 'var(--renge-color-fg-subtle)'
    : `var(--renge-color-${props.colorScheme})`
)

const variantStyles = computed(() => {
  switch (props.variant) {
    case 'solid':
      return {
        background:
          props.colorScheme === 'neutral'
            ? 'var(--renge-color-bg-subtle)'
            : `var(--renge-color-${props.colorScheme})`,
        color:
          props.colorScheme === 'neutral'
            ? 'var(--renge-color-fg)'
            : 'var(--renge-color-fg-inverse)',
        border: 'none',
      }
    case 'outline':
      return {
        background: 'transparent',
        color: colorToken.value,
        border: `1px solid ${colorToken.value}`,
      }
    case 'ghost':
      return {
        background: 'transparent',
        color: colorToken.value,
        border: 'none',
      }
  }
})

const computedStyle = computed(() => ({
  width: `${px.value}px`,
  height: `${px.value}px`,
  borderRadius: 'var(--renge-radius-full)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
  transition: 'all var(--renge-duration-2) var(--renge-easing-ease-out)',
  fontSize: `${ICON_SIZE[props.size]}px`,
  lineHeight: 1,
  animation: props.animation
    ? `var(--renge-animation-${props.animation})`
    : undefined,
  ...variantStyles.value,
}))

const isGhost = computed(() => props.variant === 'ghost')

const handleMouseEnter = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLButtonElement
  if (isGhost.value) {
    el.style.background = 'var(--renge-color-bg-subtle)'
  }
}

const handleMouseLeave = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLButtonElement
  if (isGhost.value) {
    el.style.background = 'transparent'
  }
}
</script>

<template>
  <button
    :style="computedStyle"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </button>
</template>
