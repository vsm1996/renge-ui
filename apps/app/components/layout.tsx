import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components — Renge",
  description: "44 React component primitives built on Renge tokens. Zero CSS-in-JS runtime, no class names, no specificity battles.",
  openGraph: {
    title: "Components — Renge",
    description: "44 React component primitives built on Renge tokens.",
    url: "https://renge-ui.vercel.app/components",
  },
  alternates: { canonical: "https://renge-ui.vercel.app/components" },
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
