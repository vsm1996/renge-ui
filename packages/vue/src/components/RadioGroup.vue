<script setup lang="ts">
import { computed, provide, ref, type CSSProperties } from 'vue'

export type RadioSize = 'sm' | 'md' | 'lg'

export interface RadioGroupProps {
  modelValue?: string
  name: string
  size?: RadioSize
  disabled?: boolean
  gap?: '1' | '2' | '3' | '4' | '5'
  direction?: 'vertical' | 'horizontal'
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  size: 'md',
  disabled: false,
  gap: '3',
  direction: 'vertical',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const internalValue = ref(props.modelValue ?? '')

const current = computed({
  get: () => (props.modelValue !== undefined ? props.modelValue : internalValue.value),
  set: (v) => {
    if (props.modelValue === undefined) {
      internalValue.value = v
    }
    emit('update:modelValue', v)
    emit('change', v)
  },
})

const wrapperStyle = computed<CSSProperties>(() => ({
  display: 'flex',
  flexDirection: props.direction === 'vertical' ? 'column' : 'row',
  flexWrap: props.direction === 'horizontal' ? 'wrap' : undefined,
  gap: `var(--renge-space-${props.gap})`,
}))

provide('radio-group', {
  value: current,
  name: props.name,
  size: props.size,
  disabled: props.disabled,
})
</script>

<template>
  <div :role="'radiogroup'" :style="wrapperStyle" v-bind="$attrs">
    <slot />
  </div>
</template>
