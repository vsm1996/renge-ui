<script lang="ts">
  interface Step {
    label: string;
    description?: string;
  }

  export let steps: Step[] = [];
  export let currentStep = 0;
  let className = '';
  export { className as class };

  function handleStepClick(idx: number) {
    currentStep = idx;
  }
</script>

<div
  class={className}
  style="
    display: flex;
    gap: var(--renge-space-4);
    align-items: flex-start;
  "
  {...$$restProps}
>
  {#each steps as step, idx}
    <div
      style="
        flex: 1;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: var(--renge-space-2);
        opacity: {idx <= currentStep ? 1 : 0.5};
      "
      on:click={() => handleStepClick(idx)}
      role="button"
      tabindex="0"
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleStepClick(idx);
        }
      }}
    >
      <div style="display: flex; align-items: center; gap: var(--renge-space-2);">
        <div
          style="
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: {idx <= currentStep
            ? 'var(--renge-color-accent)'
            : 'var(--renge-color-bg-subtle)'};
            color: {idx <= currentStep
            ? 'var(--renge-color-bg)'
            : 'var(--renge-color-fg)'};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--renge-font-size-sm);
            font-weight: 600;
          "
        >
          {idx <= currentStep ? '✓' : idx + 1}
        </div>
        {#if idx < steps.length - 1}
          <div
            style="
              flex: 1;
              height: 2px;
              background: {idx < currentStep
              ? 'var(--renge-color-accent)'
              : 'var(--renge-color-border-subtle)'};
              transition: background var(--renge-duration-2);
            "
          />
        {/if}
      </div>
      <div>
        <div
          style="
            font-size: var(--renge-font-size-sm);
            font-weight: 600;
            color: var(--renge-color-fg);
          "
        >
          {step.label}
        </div>
        {#if step.description}
          <div
            style="
              font-size: var(--renge-font-size-xs);
              color: var(--renge-color-fg-muted);
            "
          >
            {step.description}
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>
