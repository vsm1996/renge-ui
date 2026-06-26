<script setup lang="ts">
export type SpaceKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

export interface ButtonGroupProps {
  orientation?: 'horizontal' | 'vertical'
  radius?: 'none' | '1' | '2' | '3' | 'full'
  attached?: boolean
}

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
  radius: '2',
  attached: true,
})
</script>

<template>
  <div
    role="group"
    data-button-group
    :style="{
      display: 'inline-flex',
      flexDirection: props.orientation === 'horizontal' ? 'row' : 'column',
      borderRadius: `var(--renge-radius-${props.radius})`,
      gap: props.attached ? '0' : 'var(--renge-space-1)',
    }"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
