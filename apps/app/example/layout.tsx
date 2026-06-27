import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Example — Renge",
  description: "A real interface built with Renge tokens. Every spacing, color, and radius value is mathematically derived.",
  openGraph: {
    title: "Example — Renge",
    description: "A real interface built entirely with Renge tokens.",
    url: "https://renge-ui.vercel.app/example",
  },
  alternates: { canonical: "https://renge-ui.vercel.app/example" },
};

export default function ExampleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
