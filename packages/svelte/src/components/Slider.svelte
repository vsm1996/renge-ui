<script lang="ts">
  export let showPhiMarkers = false;
  export let label: string | undefined = undefined;
  export let showValue = false;
  export let value: number | string | undefined = undefined;
  export let defaultValue: number | string | undefined = undefined;
  export let min = 0;
  export let max = 100;
  export let style = '';

  let internalValue = value ?? defaultValue ?? min;

  $: if (value !== undefined) internalValue = value;

  const numMin = Number(min);
  const numMax = Number(max);
  const numVal = Number(internalValue);

  const phi382 = numMin + (numMax - numMin) * 0.382;
  const phi618 = numMin + (numMax - numMin) * 0.618;

  const containerStyle = `
    display: flex;
    flex-direction: column;
    gap: var(--renge-space-2);
    ${style}
  `;

  const headerStyle = `
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const labelStyle = `
    font-size: var(--renge-font-size-sm);
    color: var(--renge-color-fg-subtle);
  `;

  const valueStyle = `
    font-size: var(--renge-font-size-sm);
    color: var(--renge-color-accent);
    font-variant-numeric: tabular-nums;
  `;

  const sliderContainerStyle = `
    position: relative;
  `;

  const sliderStyle = `
    width: 100%;
  `;

  const phiMarkersStyle = `
    position: relative;
    margin-top: var(--renge-space-1);
    height: 8px;
    pointer-events: none;
  `;

  const getPhiMarkerPosition = (point: number): number => {
    return ((point - numMin) / (numMax - numMin)) * 100;
  };
</script>

<style>
  :global(.renge-slider) {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    cursor: pointer;
    background: transparent;
    outline: none;
  }

  :global(.renge-slider::-webkit-slider-runnable-track) {
    height: 4px;
    background: var(--renge-color-border);
    border-radius: var(--renge-radius-full);
  }

  :global(.renge-slider::-webkit-slider-thumb) {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    margin-top: -7px;
    border-radius: var(--renge-radius-full);
    background: var(--renge-color-accent);
    border: 2px solid var(--renge-color-bg);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transition: box-shadow var(--renge-duration-1) var(--renge-easing-ease-out);
  }

  :global(.renge-slider::-webkit-slider-thumb:hover) {
    box-shadow: 0 0 0 4px var(--renge-color-accent-subtle);
  }

  :global(.renge-slider::-moz-range-track) {
    height: 4px;
    background: var(--renge-color-border);
    border-radius: var(--renge-radius-full);
  }

  :global(.renge-slider::-moz-range-thumb) {
    width: 18px;
    height: 18px;
    border-radius: var(--renge-radius-full);
    background: var(--renge-color-accent);
    border: 2px solid var(--renge-color-bg);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  :global(.renge-slider:focus-visible::-webkit-slider-thumb) {
    box-shadow: 0 0 0 3px var(--renge-color-border-focus);
  }

  @media (hover: none) and (pointer: coarse) {
    :global(.renge-slider::-webkit-slider-thumb) {
      width: 28px;
      height: 28px;
      margin-top: -12px;
    }

    :global(.renge-slider::-moz-range-thumb) {
      width: 28px;
      height: 28px;
    }
  }
</style>

<div style={containerStyle} {...$$restProps}>
  {#if label || showValue}
    <div style={headerStyle}>
      {#if label}
        <span style={labelStyle}>{label}</span>
      {/if}
      {#if showValue}
        <span style={valueStyle}>{numVal}</span>
      {/if}
    </div>
  {/if}

  <div style={sliderContainerStyle}>
    <input
      type="range"
      class="renge-slider"
      bind:value={internalValue}
      {min}
      {max}
      style={sliderStyle}
      on:change
      on:input
    />

    {#if showPhiMarkers}
      <div style={phiMarkersStyle}>
        {#each [phi382, phi618] as point}
          <div
            style="
              position: absolute;
              left: {getPhiMarkerPosition(point)}%;
              top: 0;
              transform: translateX(-50%);
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2px;
            "
          >
            <div style="width: 1px; height: 6px; background: var(--renge-color-accent); opacity: 0.5;" />
            <span style="font-size: 9px; color: var(--renge-color-fg-muted); line-height: 1;">
              {point === phi382 ? 'φ⁻¹' : 'φ⁻²'}
            </span>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
