<script setup lang="ts">
import { computed } from 'vue'

export interface TableRowProps {
  index?: number
}

const props = defineProps<TableRowProps>()

const isEven = computed(() => props.index !== undefined && props.index % 2 === 1)
</script>

<template>
  <tr
    :style="{
      background: isEven ? 'var(--renge-color-bg-subtle)' : 'transparent',
      borderBottom: '1px solid var(--renge-color-border-subtle)',
      transition: 'background var(--renge-duration-1) var(--renge-easing-ease-out)',
    }"
    v-bind="$attrs"
  >
    <slot />
  </tr>
</template>
