<script setup lang="ts">
import { ref } from 'vue'

export interface NumberInputProps {
  value?: number
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<NumberInputProps>(), {
  step: 1,
})

const emit = defineEmits<{
  change: [value: number]
}>()

const minBtnBg = ref('var(--renge-color-bg)')
const maxBtnBg = ref('var(--renge-color-bg)')

const handleIncrement = () => {
  const newValue = (props.value ?? 0) + props.step
  if (props.max === undefined || newValue <= props.max) {
    emit('change', newValue)
  }
}

const handleDecrement = () => {
  const newValue = (props.value ?? 0) - props.step
  if (props.min === undefined || newValue >= props.min) {
    emit('change', newValue)
  }
}

const handleInputChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  emit('change', input.valueAsNumber)
}
</script>

<template>
  <div
    :style="{
      display: 'inline-flex',
      alignItems: 'stretch',
      borderRadius: 'var(--renge-radius-2)',
      border: '1px solid var(--renge-color-border)',
    }"
    v-bind="$attrs"
  >
    <button
      type="button"
      :style="{
        padding: 'var(--renge-space-2)',
        background: minBtnBg,
        border: 'none',
        color: 'var(--renge-color-fg)',
        cursor: 'pointer',
        transition: 'background var(--renge-duration-1)',
        fontSize: 'var(--renge-font-size-sm)',
      }"
      @click="handleDecrement"
      @mouseenter="minBtnBg = 'var(--renge-color-bg-subtle)'"
      @mouseleave="minBtnBg = 'var(--renge-color-bg)'"
    >
      −
    </button>
    <input
      type="number"
      :value="value ?? ''"
      :min="min"
      :max="max"
      :step="step"
      :style="{
        flex: 1,
        minWidth: '80px',
        padding: 'var(--renge-space-2) var(--renge-space-3)',
        border: 'none',
        backgroundColor: 'var(--renge-color-bg)',
        color: 'var(--renge-color-fg)',
        fontSize: 'var(--renge-font-size-base)',
        textAlign: 'center',
      }"
      @change="handleInputChange"
    />
    <button
      type="button"
      :style="{
        padding: 'var(--renge-space-2)',
        background: maxBtnBg,
        border: 'none',
        color: 'var(--renge-color-fg)',
        cursor: 'pointer',
        transition: 'background var(--renge-duration-1)',
        fontSize: 'var(--renge-font-size-sm)',
      }"
      @click="handleIncrement"
      @mouseenter="maxBtnBg = 'var(--renge-color-bg-subtle)'"
      @mouseleave="maxBtnBg = 'var(--renge-color-bg)'"
    >
      +
    </button>
  </div>
</template>
