<script setup lang="ts">
export type SpaceKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

export interface NavbarProps {
  sticky?: boolean
  border?: boolean
  height?: string
  paddingX?: SpaceKey
}

withDefaults(defineProps<NavbarProps>(), {
  sticky: false,
  border: true,
  height: '56px',
  paddingX: '5',
})
</script>

<template>
  <nav
    :style="{
      display: 'flex',
      alignItems: 'center',
      minHeight: height,
      padding: `0 var(--renge-space-${paddingX})`,
      background: 'var(--renge-color-bg)',
      borderBottom: border ? '1px solid var(--renge-color-border-subtle)' : undefined,
      position: sticky ? 'sticky' : undefined,
      top: sticky ? 0 : undefined,
      zIndex: sticky ? 100 : undefined,
      boxSizing: 'border-box',
    }"
    v-bind="$attrs"
  >
    <slot />
  </nav>
</template>
