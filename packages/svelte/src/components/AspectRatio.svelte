<script lang="ts">
  import { PHI } from '@renge-ui/tokens';

  export let ratio: number = PHI;
  export let style = '';

  const paddingBottom = `${(1 / ratio) * 100}%`;

  const outerStyle = `position: relative; width: 100%; padding-bottom: ${paddingBottom};`;
  const innerStyle = `position: absolute; inset: 0; width: 100%; height: 100%;`;
</script>

<div style="{outerStyle} {style}" {...$$restProps}>
  <div style={innerStyle}>
    <slot />
  </div>
</div>
