import { createContext } from 'react';
import type { RengeTheme } from '@renge-ui/tokens';

export interface RengeContextValue {
  theme: RengeTheme;
  profile: string;
  mode: string;
}

export const RengeContext = createContext<RengeContextValue | null>(null);
