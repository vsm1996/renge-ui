<script lang="ts">
  import { setContext } from 'svelte';

  export let value = '';
  export let defaultValue = '';
  export let name = '';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;
  export let gap: '1' | '2' | '3' | '4' | '5' = '3';
  export let direction: 'vertical' | 'horizontal' = 'vertical';
  export let style = '';

  let internalValue = defaultValue;
  const isControlled = value !== '';

  const handleChange = (v: string) => {
    if (!isControlled) internalValue = v;
  };

  const currentValue = isControlled ? value : internalValue;

  setContext('radio-group', {
    value: currentValue,
    onChange: handleChange,
    name,
    size,
    disabled,
  });

  const groupStyle = `
    display: flex;
    flex-direction: ${direction === 'vertical' ? 'column' : 'row'};
    ${direction === 'horizontal' ? 'flex-wrap: wrap;' : ''}
    gap: var(--renge-space-${gap});
    ${style}
  `;
</script>

<div role="radiogroup" style={groupStyle} {...$$restProps}>
  <slot />
</div>
