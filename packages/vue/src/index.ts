/**
 * @renge-ui/vue
 *
 * Vue 3 composables and components for the Renge design system.
 * Provides theme context and 124 design system components.
 *
 * Components can be imported directly:
 * - import { Button, Stack, Modal } from '@renge-ui/vue'
 */

// Composables
export { useRengeTheme, useRengeInject } from "./composables/useRengeTheme";
export type { RengeThemeState, RengeThemeContext } from "./composables/useRengeTheme";

// Layout & Display (Batch 1)
export { default as Stack } from "./components/Stack.vue";
export { default as Grid } from "./components/Grid.vue";
export { default as Container } from "./components/Container.vue";
export { default as Section } from "./components/Section.vue";
export { default as AspectRatio } from "./components/AspectRatio.vue";
export { default as Spacer } from "./components/Spacer.vue";
export { default as Text } from "./components/Text.vue";
export { default as Heading } from "./components/Heading.vue";
export { default as Divider } from "./components/Divider.vue";
export { default as Anchor } from "./components/Anchor.vue";
export { default as Card } from "./components/Card.vue";
export { default as Badge } from "./components/Badge.vue";
export { default as Avatar } from "./components/Avatar.vue";
export { default as Chip } from "./components/Chip.vue";
export { default as Stat } from "./components/Stat.vue";
export { default as Alert } from "./components/Alert.vue";
export { default as KBD } from "./components/KBD.vue";
export { default as VisuallyHidden } from "./components/VisuallyHidden.vue";
export { default as SkipLink } from "./components/SkipLink.vue";

// Form Inputs (Batch 2)
export { default as Button } from "./components/Button.vue";
export { default as IconButton } from "./components/IconButton.vue";
export { default as Input } from "./components/Input.vue";
export { default as Select } from "./components/Select.vue";
export { default as Textarea } from "./components/Textarea.vue";
export { default as Checkbox } from "./components/Checkbox.vue";
export { default as Switch } from "./components/Switch.vue";
export { default as RadioGroup } from "./components/RadioGroup.vue";
export { default as Radio } from "./components/Radio.vue";
export { default as Slider } from "./components/Slider.vue";

// Interactive & Groups (Batch 3)
export { default as ButtonGroup } from "./components/ButtonGroup.vue";
export { default as ButtonGroupItem } from "./components/ButtonGroupItem.vue";
export { default as CopyButton } from "./components/CopyButton.vue";
export { default as FormField } from "./components/FormField.vue";
export { default as Rating } from "./components/Rating.vue";
export { default as NumberInput } from "./components/NumberInput.vue";
export { default as TagInput } from "./components/TagInput.vue";
export { default as Stepper } from "./components/Stepper.vue";
export { default as Pagination } from "./components/Pagination.vue";

// Navigation & Data Display (Batch 4)
export { default as Navbar } from "./components/Navbar.vue";
export { default as Breadcrumb } from "./components/Breadcrumb.vue";
export { default as BreadcrumbItem } from "./components/BreadcrumbItem.vue";
export { default as Tabs } from "./components/Tabs.vue";
export { default as TabList } from "./components/TabList.vue";
export { default as Tab } from "./components/Tab.vue";
export { default as TabPanel } from "./components/TabPanel.vue";
export { default as Table } from "./components/Table.vue";
export { default as TableHead } from "./components/TableHead.vue";
export { default as TableBody } from "./components/TableBody.vue";
export { default as TableRow } from "./components/TableRow.vue";
export { default as TableHeader } from "./components/TableHeader.vue";
export { default as TableCell } from "./components/TableCell.vue";
export { default as TableFoot } from "./components/TableFoot.vue";

// Data Display & Animation (Batch 5)
export { default as Accordion } from "./components/Accordion.vue";
export { default as AccordionItem } from "./components/AccordionItem.vue";
export { default as Skeleton } from "./components/Skeleton.vue";

// Overlays & Floating (Batch 6)
export { default as Modal } from "./components/Modal.vue";
export { default as ModalHeader } from "./components/ModalHeader.vue";
export { default as ModalBody } from "./components/ModalBody.vue";
export { default as ModalFooter } from "./components/ModalFooter.vue";
export { default as Toast } from "./components/Toast.vue";
export { default as ToastProvider } from "./components/ToastProvider.vue";

// Re-export tokens for convenience
export { rengeVars } from "@renge-ui/tokens";
export type { RengeVars } from "@renge-ui/tokens";
export { PHI, GOLDEN_ANGLE, FIBONACCI } from "@renge-ui/tokens";
