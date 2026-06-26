<script setup lang="ts">
import { computed, inject } from 'vue'
import { PHI } from '@renge-ui/tokens'

export type RadioSize = 'sm' | 'md' | 'lg'

export interface RadioProps {
  value: string
  label?: string
  size?: RadioSize
  disabled?: boolean
}

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
})

const emit = defineEmits<{
  change: [event: Event]
}>()

const ctx = inject<any>('radio-group', null)

const size = computed(() => props.size ?? ctx?.size ?? 'md')
const disabled = computed(() => props.disabled ?? ctx?.disabled ?? false)
const isChecked = computed(() => ctx && ctx.value.value === props.value)

const OUTER_PX: Record<RadioSize, number> = { sm: 16, md: 20, lg: 24 }
const FONT: Record<RadioSize, string> = {
  sm: 'var(--renge-font-size-sm)',
  md: 'var(--renge-font-size-base)',
  lg: 'var(--renge-font-size-base)',
}

const outer = computed(() => OUTER_PX[size.value])
const inner = computed(() => Math.round(outer.value / PHI))

const labelStyle = computed(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--renge-space-2)',
  cursor: disabled.value ? 'not-allowed' : 'pointer',
  opacity: disabled.value ? 0.5 : 1,
}))

const circleStyle = computed(() => ({
  width: `${outer.value}px`,
  height: `${outer.value}px`,
  minWidth: `${outer.value}px`,
  borderRadius: 'var(--renge-radius-full)',
  border: isChecked.value
    ? '2px solid var(--renge-color-accent)'
    : '2px solid var(--renge-color-border)',
  background: 'var(--renge-color-bg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all var(--renge-duration-2) var(--renge-easing-spring)',
  flexShrink: 0,
}))

const innerDotStyle = computed(() => ({
  width: isChecked.value ? `${inner.value}px` : 0,
  height: isChecked.value ? `${inner.value}px` : 0,
  borderRadius: 'var(--renge-radius-full)',
  background: 'var(--renge-color-accent)',
  transition: 'all var(--renge-duration-2) var(--renge-easing-spring)',
}))

const textStyle = computed(() => ({
  fontSize: FONT[size.value],
  color: disabled.value ? 'var(--renge-color-fg-muted)' : 'var(--renge-color-fg)',
  lineHeight: 'var(--renge-line-height-base)',
  userSelect: 'none',
}))

const handleChange = () => {
  if (!disabled.value && ctx) {
    ctx.value.value = props.value
  }
}
</script>

<template>
  <label :style="labelStyle" v-bind="$attrs">
    <input
      type="radio"
      :value="props.value"
      :name="ctx?.name"
      :checked="isChecked"
      :disabled="disabled"
      style="position: absolute; opacity: 0; width: 0; height: 0; margin: 0"
      @change="(e) => {
        handleChange();
        emit('change', e);
      }"
    />
    <span :style="circleStyle" aria-hidden="true">
      <span :style="innerDotStyle" />
    </span>
    <span v-if="label" :style="textStyle">
      {{ label }}
    </span>
  </label>
</template>
