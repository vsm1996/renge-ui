<script setup lang="ts">
import { inject, computed } from 'vue'

export interface TabPanelProps {
  value: string
}

const props = defineProps<TabPanelProps>()

const ctx = inject<any>('tabs', null)
const isActive = computed(() => ctx?.active === props.value)
</script>

<template>
  <div
    v-if="isActive"
    role="tabpanel"
    :id="`tabpanel-${value}`"
    :aria-labelledby="`tab-${value}`"
    :style="{
      paddingTop: 'var(--renge-space-4)',
    }"
  >
    <slot />
  </div>
</template>
