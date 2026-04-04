// packages/react/src/index.ts

// Provider & hooks
export { RengeProvider, useRenge, useRengeTheme } from './provider';
export type { RengeProviderProps } from './provider';
export { RengeStylesheet } from './stylesheet';
export type { RengeStylesheetProps } from './stylesheet';

// Components
export {
  Stack,
  Grid,
  Text,
  Heading,
  Card,
  Button,
  Divider,
  Section,
  // Atoms
  Badge,
  Avatar,
  Spinner,
  Progress,
  Input,
  Chip,
  // Molecules
  Alert,
  FormField,
  Stat,
  // Organisms
  Navbar,
  // State Components
  EnergyRing,
  Pulse,
  FlowField,
} from './components';
export type {
  EnergyRingProps, EnergyRingSize, EnergyRingRate, EnergyRingColor,
  PulseProps, PulseRate, PulseColor, PulseSize,
  FlowFieldProps, FlowEnergy, FlowColor,
  BadgeProps, BadgeVariant, BadgeSize,
  AvatarProps, AvatarSize, AvatarShape,
  SpinnerProps, SpinnerSize, SpinnerColor,
  ProgressProps, ProgressColor, ProgressSize,
  InputProps, InputSize, InputState,
  ChipProps, ChipVariant,
  AlertProps, AlertStatus,
  FormFieldProps,
  StatProps, TrendDirection,
  NavbarProps,
} from './components';

// Re-export tokens for convenience
export { createRengeTheme, PHI, FIBONACCI, GOLDEN_ANGLE, ANIMATION_NAMES } from '@renge-ui/tokens';
export type { RengeThemeConfig, RengeTheme, ProfileName, ProfileMode, ProfileVariant, AnimationName } from '@renge-ui/tokens';