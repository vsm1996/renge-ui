<script setup lang="ts">
import { inject, computed } from 'vue'

export interface TabProps {
  value: string
}

const props = defineProps<TabProps>()

const ctx = inject<any>('tabs', null)
const isActive = computed(() => ctx?.active === props.value)

const handleClick = () => {
  ctx?.setActive(props.value)
}
</script>

<template>
  <button
    role="tab"
    :aria-selected="isActive"
    :aria-controls="`tabpanel-${value}`"
    :id="`tab-${value}`"
    :style="{
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
      marginBottom: '-1px',
    }"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
