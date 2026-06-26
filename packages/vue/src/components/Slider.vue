<script setup lang="ts">
import { computed, onMounted } from 'vue'

export interface SliderProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  showPhiMarkers?: boolean
  label?: string
  showValue?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  showPhiMarkers: false,
  showValue: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [event: Event]
  input: [event: Event]
}>()

const numMin = computed(() => Number(props.min))
const numMax = computed(() => Number(props.max))
const numVal = computed(() =>
  props.modelValue !== undefined ? Number(props.modelValue) : numMin.value
)

const phi382 = computed(() => numMin.value + (numMax.value - numMin.value) * 0.382)
const phi618 = computed(() => numMin.value + (numMax.value - numMin.value) * 0.618)

const phiMarkers = computed(() => [
  { point: phi382.value, label: 'φ⁻¹' },
  { point: phi618.value, label: 'φ⁻²' },
])

const markerStyle = (point: number) => ({
  position: 'absolute',
  left: `${((point - numMin.value) / (numMax.value - numMin.value)) * 100}%`,
  top: 0,
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2px',
})

const markerLine = {
  width: '1px',
  height: '6px',
  background: 'var(--renge-color-accent)',
  opacity: 0.5,
}

const markerLabel = {
  fontSize: '9px',
  color: 'var(--renge-color-fg-muted)',
  lineHeight: 1,
}

const wrapperStyle = computed(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--renge-space-2)',
}))

const labelRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const labelStyle = {
  fontSize: 'var(--renge-font-size-sm)',
  color: 'var(--renge-color-fg-subtle)',
}

const valueStyle = {
  fontSize: 'var(--renge-font-size-sm)',
  color: 'var(--renge-color-accent)',
  fontVariantNumeric: 'tabular-nums',
}

const sliderContainerStyle = {
  position: 'relative',
}

const handleChange = (e: Event) => {
  const target = e.currentTarget as HTMLInputElement
  emit('update:modelValue', Number(target.value))
  emit('change', e)
}

const handleInput = (e: Event) => {
  const target = e.currentTarget as HTMLInputElement
  emit('update:modelValue', Number(target.value))
  emit('input', e)
}

onMounted(() => {
  if (typeof document !== 'undefined') {
    const id = '__renge-slider-styles__'
    if (!document.getElementById(id)) {
      const s = document.createElement('style')
      s.id = id
      s.textContent = `
.renge-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  cursor: pointer;
  background: transparent;
  outline: none;
}
.renge-slider::-webkit-slider-runnable-track {
  height: 4px;
  background: var(--renge-color-border);
  border-radius: var(--renge-radius-full);
}
.renge-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  margin-top: -7px;
  border-radius: var(--renge-radius-full);
  background: var(--renge-color-accent);
  border: 2px solid var(--renge-color-bg);
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  transition: box-shadow var(--renge-duration-1) var(--renge-easing-ease-out);
}
.renge-slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 4px var(--renge-color-accent-subtle);
}
.renge-slider::-moz-range-track {
  height: 4px;
  background: var(--renge-color-border);
  border-radius: var(--renge-radius-full);
}
.renge-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: var(--renge-radius-full);
  background: var(--renge-color-accent);
  border: 2px solid var(--renge-color-bg);
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  cursor: pointer;
}
.renge-slider:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px var(--renge-color-border-focus);
}
@media (hover: none) and (pointer: coarse) {
  .renge-slider::-webkit-slider-thumb {
    width: 28px;
    height: 28px;
    margin-top: -12px;
  }
  .renge-slider::-moz-range-thumb {
    width: 28px;
    height: 28px;
  }
}`
      document.head.appendChild(s)
    }
  }
})
</script>

<template>
  <div :style="wrapperStyle" v-bind="$attrs">
    <div v-if="label || showValue" :style="labelRowStyle">
      <span v-if="label" :style="labelStyle">
        {{ label }}
      </span>
      <span v-if="showValue" :style="valueStyle">
        {{ numVal }}
      </span>
    </div>
    <div :style="sliderContainerStyle">
      <input
        type="range"
        class="renge-slider"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :disabled="disabled"
        @change="handleChange"
        @input="handleInput"
      />
      <div
        v-if="showPhiMarkers"
        style="
          position: relative;
          margin-top: var(--renge-space-1);
          height: 8px;
          pointer-events: none;
        "
      >
        <div
          v-for="marker in phiMarkers"
          :key="marker.point"
          :style="markerStyle(marker.point)"
        >
          <div :style="markerLine" />
          <span :style="markerLabel">
            {{ marker.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
