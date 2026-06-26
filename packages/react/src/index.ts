// packages/react/src/index.ts

// Provider & hooks
export { RengeProvider } from './provider';
export type { RengeProviderProps } from './provider';
export { useRenge } from './hooks';
export { useRengeTheme, useRengeVar, useRengeVarValue } from './hooks';
export type { RengeThemeHookReturn, Mode } from './hooks/useRengeTheme';
export { RengeStylesheet } from './stylesheet';
export type { RengeStylesheetProps } from './stylesheet';

// Components — re-export everything from the components barrel
export {
  // Layout
  Stack, Grid, Section, Container, AspectRatio, Spacer,
  // Typography
  Text, Heading, Divider, Anchor,
  // Surfaces
  Card,
  // Action
  Button, IconButton, ButtonGroup, ButtonGroupItem, CopyButton,
  // Data Input
  Input, Select, Checkbox, Radio, RadioGroup, Switch, Textarea, Slider,
  // Data Display
  Badge, Avatar, Chip, Stat,
  Table, TableHead, TableBody, TableFoot, TableRow, TableHeader, TableCell,
  Tooltip, Accordion, AccordionItem, Timeline, TimelineItem, Skeleton,
  // Feedback
  Alert, Spinner, Progress, ToastProvider, useToast, Modal, ModalHeader, ModalBody, ModalFooter,
  // Navigation
  Navbar, Tabs, TabList, Tab, TabPanel, Breadcrumb, BreadcrumbItem, Pagination,
  // Form Molecules
  FormField,
  // Data Viz
  EnergyRing, Pulse, FlowField,
  // High-Priority Components
  Combobox, Popover, DropdownMenu, Drawer, NumberInput, DatePicker,
  // Medium-Priority Components
  CommandPalette, MultiSelect, TagInput, Stepper, CodeBlock, ScrollArea,
  // Lower-Priority Components
  HoverCard, ContextMenu, Rating, KBD, VisuallyHidden, SkipLink,
} from './components';

export type {
  // Data Viz
  EnergyRingProps, EnergyRingSize, EnergyRingRate, EnergyRingColor,
  PulseProps, PulseRate, PulseColor, PulseSize,
  FlowFieldProps, FlowEnergy, FlowColor,
  // Display atoms
  BadgeProps, BadgeVariant, BadgeSize,
  AvatarProps, AvatarSize, AvatarShape,
  SpinnerProps, SpinnerSize, SpinnerColor,
  ProgressProps, ProgressColor, ProgressSize,
  ChipProps, ChipVariant,
  StatProps, TrendDirection,
  // Feedback
  AlertProps, AlertStatus,
  ToastOptions, ToastStatus,
  ModalProps, ModalSize, ModalHeaderProps, ModalBodyProps, ModalFooterProps,
  // Form molecules
  FormFieldProps,
  // Data Input
  InputProps, InputSize, InputState,
  SelectProps, SelectSize, SelectState,
  CheckboxProps, CheckboxSize,
  RadioProps, RadioGroupProps, RadioSize,
  SwitchProps, SwitchSize,
  TextareaProps, TextareaSize, TextareaState,
  SliderProps,
  // Data Display
  TableProps, TableRowProps, TableCellProps,
  TooltipProps, TooltipPlacement,
  AccordionProps, AccordionItemProps,
  TimelineProps, TimelineItemProps, TimelineItemStatus,
  SkeletonProps, SkeletonVariant,
  // Navigation
  NavbarProps,
  TabsProps, TabListProps, TabProps, TabPanelProps,
  BreadcrumbProps, BreadcrumbItemProps,
  PaginationProps,
  AnchorProps, AnchorVariant,
  // Layout
  ContainerProps, ContainerSize,
  AspectRatioProps,
  SpacerProps, SpacerSize,
  // Action
  IconButtonProps, IconButtonSize, IconButtonVariant, IconButtonColorScheme,
  ButtonGroupProps, ButtonGroupItemProps,
  CopyButtonProps,
  // High-Priority Components
  ComboboxProps,
  PopoverProps,
  DropdownMenuProps,
  DrawerProps,
  NumberInputProps,
  DatePickerProps,
  // Medium-Priority Components
  CommandPaletteProps, CommandItem,
  MultiSelectProps,
  TagInputProps,
  StepperProps,
  CodeBlockProps,
  ScrollAreaProps,
  // Lower-Priority Components
  HoverCardProps,
  ContextMenuProps, ContextMenuItem,
  RatingProps,
  KBDProps,
  VisuallyHiddenProps,
  SkipLinkProps,
} from './components';

// Re-export tokens for convenience
export { createRengeTheme, PHI, FIBONACCI, GOLDEN_ANGLE, ANIMATION_NAMES } from '@renge-ui/tokens';
export type { RengeThemeConfig, RengeTheme, ProfileName, ProfileMode, ProfileVariant, AnimationName } from '@renge-ui/tokens';