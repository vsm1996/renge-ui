<script setup lang="ts">
interface Step {
  label: string
  description?: string
}

export interface StepperProps {
  steps: Step[]
  currentStep?: number
}

const props = withDefaults(defineProps<StepperProps>(), {
  currentStep: 0,
})

const emit = defineEmits<{
  'step-change': [step: number]
}>()
</script>

<template>
  <div>
    <div
      :style="{
        display: 'flex',
        gap: 'var(--renge-space-4)',
        alignItems: 'flex-start',
      }"
    >
      <div
        v-for="(step, idx) in props.steps"
        :key="idx"
        :style="{
          flex: 1,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--renge-space-2)',
          opacity: idx <= currentStep ? 1 : 0.5,
        }"
        role="button"
        tabindex="0"
        @click="emit('step-change', idx)"
        @keydown="(e) => {
          if (e.key === 'Enter' || e.key === ' ') emit('step-change', idx)
        }"
      >
        <div :style="{ display: 'flex', alignItems: 'center', gap: 'var(--renge-space-2)' }">
          <div
            :style="{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background:
                idx <= currentStep
                  ? 'var(--renge-color-accent)'
                  : 'var(--renge-color-bg-subtle)',
              color:
                idx <= currentStep
                  ? 'var(--renge-color-bg)'
                  : 'var(--renge-color-fg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--renge-font-size-sm)',
              fontWeight: 600,
            }"
          >
            {{ idx <= currentStep ? '✓' : idx + 1 }}
          </div>
          <div
            v-if="idx < steps.length - 1"
            :style="{
              flex: 1,
              height: '2px',
              background:
                idx < currentStep
                  ? 'var(--renge-color-accent)'
                  : 'var(--renge-color-border-subtle)',
              transition: 'background var(--renge-duration-2)',
            }"
          />
        </div>
        <div>
          <div
            :style="{
              fontSize: 'var(--renge-font-size-sm)',
              fontWeight: 600,
              color: 'var(--renge-color-fg)',
            }"
          >
            {{ step.label }}
          </div>
          <div
            v-if="step.description"
            :style="{
              fontSize: 'var(--renge-font-size-xs)',
              color: 'var(--renge-color-fg-muted)',
            }"
          >
            {{ step.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
