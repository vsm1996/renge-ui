<script setup lang="ts">
import { ref, provide } from 'vue'

export interface AccordionProps {
  multiple?: boolean
  value?: string | string[]
}

const props = withDefaults(defineProps<AccordionProps>(), {
  multiple: false,
})

const openIds = ref<Set<string>>(
  new Set(Array.isArray(props.value) ? props.value : props.value ? [props.value] : [])
)

function toggle(id: string) {
  const newIds = new Set(openIds.value)
  if (newIds.has(id)) {
    newIds.delete(id)
  } else {
    if (!props.multiple) {
      newIds.clear()
    }
    newIds.add(id)
  }
  openIds.value = newIds
}

provide('accordion', { openIds, toggle })
</script>

<template>
  <div
    :style="{
      border: '1px solid var(--renge-color-border-subtle)',
      borderRadius: 'var(--renge-radius-2)',
    }"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
