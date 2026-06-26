<script setup lang="ts">
import { computed, ref } from 'vue'

export type SelectSize = 'sm' | 'md' | 'lg'
export type SelectState = 'default' | 'error' | 'success'

export interface SelectProps {
  modelValue?: string
  size?: SelectSize
  state?: SelectState
  fullWidth?: boolean
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<SelectProps>(), {
  size: 'md',
  state: 'default',
  fullWidth: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const sizeStyles: Record<SelectSize, Record<string, string>> = {
  sm: {
    padding: 'var(--renge-space-1) var(--renge-space-5) var(--renge-space-1) var(--renge-space-2)',
    fontSize: 'var(--renge-font-size-sm)',
  },
  md: {
    padding: 'var(--renge-space-2) var(--renge-space-5) var(--renge-space-2) var(--renge-space-3)',
    fontSize: 'var(--renge-font-size-base)',
  },
  lg: {
    padding: 'var(--renge-space-2) var(--renge-space-6) var(--renge-space-2) var(--renge-space-4)',
    fontSize: 'var(--renge-font-size-base)',
  },
}

const stateColor: Record<SelectState, string> = {
  default: 'var(--renge-color-border)',
  error: 'var(--renge-color-danger)',
  success: 'var(--renge-color-success)',
}

const chevronSvg =
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath d=\'M2 4l4 4 4-4\' fill=\'none\' stroke=\'%23888\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")'

const selectRef = ref<HTMLSelectElement>()

const computedStyle = computed(() => ({
  ...sizeStyles[props.size],
  display: 'block',
  width: props.fullWidth ? '100%' : undefined,
  background: `${chevronSvg} no-repeat right var(--renge-space-2) center, var(--renge-color-bg)`,
  color: 'var(--renge-color-fg)',
  border: `1px solid ${stateColor[props.state]}`,
  borderRadius: 'var(--renge-radius-2)',
  outline: 'none',
  appearance: 'none',
  WebkitAppearance: 'none',
  cursor: 'pointer',
  transition: 'border-color var(--renge-duration-1) var(--renge-easing-ease-out)',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}))

const handleFocus = (e: FocusEvent) => {
  const el = e.currentTarget as HTMLSelectElement
  el.style.outline = '2px solid var(--renge-color-border-focus)'
  el.style.outlineOffset = '2px'
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  const el = e.currentTarget as HTMLSelectElement
  el.style.outline = 'none'
  emit('blur', e)
}
</script>

<template>
  <select
    ref="selectRef"
    :style="computedStyle"
    :value="modelValue"
    :disabled="disabled"
    v-bind="$attrs"
    @input="(e) => emit('update:modelValue', (e.target as HTMLSelectElement).value)"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <option v-if="placeholder" value="" disabled hidden>
      {{ placeholder }}
    </option>
    <slot />
  </select>
</template>
