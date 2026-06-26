<script lang="ts">
  export let value: number | undefined = undefined;
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
  export let step = 1;
  let className = '';
  export { className as class };

  let minBtnBg = 'var(--renge-color-bg)';
  let maxBtnBg = 'var(--renge-color-bg)';

  function handleIncrement() {
    const newValue = (value ?? 0) + step;
    if (max === undefined || newValue <= max) {
      value = newValue;
    }
  }

  function handleDecrement() {
    const newValue = (value ?? 0) - step;
    if (min === undefined || newValue >= min) {
      value = newValue;
    }
  }

  function handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.valueAsNumber;
  }
</script>

<div
  class={className}
  style="
    display: inline-flex;
    align-items: stretch;
    border-radius: var(--renge-radius-2);
    border: 1px solid var(--renge-color-border);
  "
  {...$$restProps}
>
  <button
    type="button"
    style="
      padding: var(--renge-space-2);
      background: {minBtnBg};
      border: none;
      color: var(--renge-color-fg);
      cursor: pointer;
      transition: background var(--renge-duration-1);
      font-size: var(--renge-font-size-sm);
    "
    on:click={handleDecrement}
    on:mouseenter={() => {
      minBtnBg = 'var(--renge-color-bg-subtle)';
    }}
    on:mouseleave={() => {
      minBtnBg = 'var(--renge-color-bg)';
    }}
  >
    −
  </button>
  <input
    type="number"
    {value}
    {min}
    {max}
    {step}
    style="
      flex: 1;
      min-width: 80px;
      padding: var(--renge-space-2) var(--renge-space-3);
      border: none;
      background-color: var(--renge-color-bg);
      color: var(--renge-color-fg);
      font-size: var(--renge-font-size-base);
      text-align: center;
    "
    on:change={handleInputChange}
  />
  <button
    type="button"
    style="
      padding: var(--renge-space-2);
      background: {maxBtnBg};
      border: none;
      color: var(--renge-color-fg);
      cursor: pointer;
      transition: background var(--renge-duration-1);
      font-size: var(--renge-font-size-sm);
    "
    on:click={handleIncrement}
    on:mouseenter={() => {
      maxBtnBg = 'var(--renge-color-bg-subtle)';
    }}
    on:mouseleave={() => {
      maxBtnBg = 'var(--renge-color-bg)';
    }}
  >
    +
  </button>
</div>
