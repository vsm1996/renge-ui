/**
 * @renge-ui/svelte
 *
 * Svelte 4 components and stores for the Renge design system.
 * Provides theme management and 124 design system components.
 *
 * Components can be imported directly:
 * - import { Button, Stack, Modal } from '@renge-ui/svelte'
 */

// Stores
export { profile, mode, switchProfile, switchMode, initializeTheme } from "./stores/theme";

// Layout & Display (Batch 1)
export { default as Stack } from "./components/Stack.svelte";
export { default as Grid } from "./components/Grid.svelte";
export { default as Container } from "./components/Container.svelte";
export { default as Section } from "./components/Section.svelte";
export { default as AspectRatio } from "./components/AspectRatio.svelte";
export { default as Spacer } from "./components/Spacer.svelte";
export { default as Text } from "./components/Text.svelte";
export { default as Heading } from "./components/Heading.svelte";
export { default as Divider } from "./components/Divider.svelte";
export { default as Anchor } from "./components/Anchor.svelte";
export { default as Card } from "./components/Card.svelte";
export { default as Badge } from "./components/Badge.svelte";
export { default as Avatar } from "./components/Avatar.svelte";
export { default as Chip } from "./components/Chip.svelte";
export { default as Stat } from "./components/Stat.svelte";
export { default as Alert } from "./components/Alert.svelte";
export { default as KBD } from "./components/KBD.svelte";
export { default as VisuallyHidden } from "./components/VisuallyHidden.svelte";
export { default as SkipLink } from "./components/SkipLink.svelte";

// Form Inputs (Batch 2)
export { default as Button } from "./components/Button.svelte";
export { default as IconButton } from "./components/IconButton.svelte";
export { default as Input } from "./components/Input.svelte";
export { default as Select } from "./components/Select.svelte";
export { default as Textarea } from "./components/Textarea.svelte";
export { default as Checkbox } from "./components/Checkbox.svelte";
export { default as Switch } from "./components/Switch.svelte";
export { default as RadioGroup } from "./components/RadioGroup.svelte";
export { default as Radio } from "./components/Radio.svelte";
export { default as Slider } from "./components/Slider.svelte";

// Interactive & Groups (Batch 3)
export { default as ButtonGroup } from "./components/ButtonGroup.svelte";
export { default as ButtonGroupItem } from "./components/ButtonGroupItem.svelte";
export { default as CopyButton } from "./components/CopyButton.svelte";
export { default as FormField } from "./components/FormField.svelte";
export { default as Rating } from "./components/Rating.svelte";
export { default as NumberInput } from "./components/NumberInput.svelte";
export { default as TagInput } from "./components/TagInput.svelte";
export { default as Stepper } from "./components/Stepper.svelte";
export { default as Pagination } from "./components/Pagination.svelte";

// Navigation & Data Display (Batch 4)
export { default as Navbar } from "./components/Navbar.svelte";
export { default as Breadcrumb } from "./components/Breadcrumb.svelte";
export { default as BreadcrumbItem } from "./components/BreadcrumbItem.svelte";
export { default as Tabs } from "./components/Tabs.svelte";
export { default as TabList } from "./components/TabList.svelte";
export { default as Tab } from "./components/Tab.svelte";
export { default as TabPanel } from "./components/TabPanel.svelte";
export { default as Table } from "./components/Table.svelte";
export { default as TableHead } from "./components/TableHead.svelte";
export { default as TableBody } from "./components/TableBody.svelte";
export { default as TableRow } from "./components/TableRow.svelte";
export { default as TableHeader } from "./components/TableHeader.svelte";
export { default as TableCell } from "./components/TableCell.svelte";
export { default as TableFoot } from "./components/TableFoot.svelte";

// Data Display & Animation (Batch 5)
export { default as Accordion } from "./components/Accordion.svelte";
export { default as AccordionItem } from "./components/AccordionItem.svelte";
export { default as Skeleton } from "./components/Skeleton.svelte";

// Overlays & Floating (Batch 6)
export { default as Modal } from "./components/Modal.svelte";
export { default as ModalHeader } from "./components/ModalHeader.svelte";
export { default as ModalBody } from "./components/ModalBody.svelte";
export { default as ModalFooter } from "./components/ModalFooter.svelte";
export { default as Toast } from "./components/Toast.svelte";
export { default as ToastProvider } from "./components/ToastProvider.svelte";

// Re-export tokens for convenience
export { rengeVars } from "@renge-ui/tokens";
export type { RengeVars } from "@renge-ui/tokens";
export { PHI, GOLDEN_ANGLE, FIBONACCI } from "@renge-ui/tokens";
