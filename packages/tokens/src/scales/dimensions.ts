import { FIBONACCI } from "../constants";

export interface DimensionScale {
  width: Record<string, string>;
  height: Record<string, string>;
  minWidth: Record<string, string>;
  maxWidth: Record<string, string>;
}

export function createDimensionScale(baseUnit: number = 4): DimensionScale {
  // Helper: Fibonacci-based sizing.
  // calc-based so the base unit is a runtime variable:
  //   calc(<fib> * var(--renge-base-unit, <unit>px))
  const fibonacciScaled = (unit: number): Record<string, string> => {
    const scale: Record<string, string> = { "0": "0px" };
    FIBONACCI.forEach((fib, i) => {
      scale[String(i + 1)] = `calc(${fib} * var(--renge-base-unit, ${unit}px))`;
    });
    return scale;
  };

  return {
    width: {
      auto: "auto",
      full: "100%",
      screen: "100vw",
      sm: "var(--renge-container-sm)",
      md: "var(--renge-container-md)",
      lg: "var(--renge-container-lg)",
      xl: "var(--renge-container-xl)",
      max: "var(--renge-container-full)",
    },
    height: {
      auto: "auto",
      full: "100%",
      screen: "100vh",
      ...fibonacciScaled(baseUnit),
    },
    minWidth: {
      "0": "0px",
      auto: "auto",
      ...fibonacciScaled(baseUnit),
    },
    maxWidth: {
      none: "none",
      full: "100%",
      ...fibonacciScaled(baseUnit),
    },
  };
}
