import { createRengeTheme } from '@renge-ui/tokens';
import type { RengeThemeConfig } from '@renge-ui/tokens';

export interface RengeStylesheetProps {
  config?: RengeThemeConfig;
}

/**
 * SSR-safe style injection — renders a <style> tag with all Renge token CSS.
 * Use this in your root layout instead of RengeProvider's injectCSS prop.
 *
 * Next.js App Router:
 * ```tsx
 * // app/layout.tsx
 * import { RengeStylesheet } from '@renge-ui/react';
 * export default function Layout({ children }) {
 *   return (
 *     <html>
 *       <head><RengeStylesheet /></head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 */
export function RengeStylesheet({ config }: RengeStylesheetProps) {
  const theme = createRengeTheme(config);
  return (
    <style
      dangerouslySetInnerHTML={{ __html: theme.css }}
      data-renge-tokens
    />
  );
}
