<script setup lang="ts">
import { ref, provide, watch } from 'vue'

export interface TabsProps {
  defaultTab?: string
  value?: string
  onChange?: (id: string) => void
}

const props = withDefaults(defineProps<TabsProps>(), {
  defaultTab: '',
})

const internalActive = ref(props.defaultTab)

const isControlled = props.value !== undefined
const active = isControlled ? props.value! : internalActive.value

const setActive = (id: string) => {
  if (!isControlled) internalActive.value = id
  props.onChange?.(id)
}

watch(
  () => props.value,
  (val) => {
    if (val !== undefined) internalActive.value = val
  }
)

provide('tabs', { active, setActive })
</script>

<template>
  <div :style="{ display: 'flex', flexDirection: 'column' }" v-bind="$attrs">
    <slot />
  </div>
</template>
