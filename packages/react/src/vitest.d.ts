// Registers @testing-library/jest-dom's matcher types (toBeInTheDocument,
// toBeChecked, toBeDisabled, …) on vitest's Assertion so `tsc --noEmit`
// typechecks the tests. The runtime equivalent lives in vitest-setup.ts.
import "@testing-library/jest-dom/vitest";
