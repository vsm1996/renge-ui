import type { Metadata } from "next";
import { COMPONENT_COUNT_FLOOR } from "@/lib/site-facts";

const lede = `${COMPONENT_COUNT_FLOOR}+ React component primitives built on Renge tokens.`;

export const metadata: Metadata = {
  title: "Components — Renge",
  description: `${lede} Zero CSS-in-JS runtime, no class names, no specificity battles.`,
  openGraph: {
    title: "Components — Renge",
    description: lede,
    url: "https://renge-ui.vercel.app/components",
  },
  twitter: {
    card: "summary_large_image",
    title: "Components — Renge",
    description: `${lede} Zero CSS-in-JS runtime, no class names, no specificity battles.`,
  },
  alternates: { canonical: "https://renge-ui.vercel.app/components" },
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
