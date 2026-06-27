import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Petals — Renge",
  description: "100 semantic token compositions across 13 categories. Pre-made token combinations for typography, spacing, forms, overlays, navigation, and more.",
  openGraph: {
    title: "Petals — Renge",
    description: "100 semantic token compositions across 13 categories.",
    url: "https://renge-ui.vercel.app/petals",
  },
  alternates: { canonical: "https://renge-ui.vercel.app/petals" },
};

export default function PetalsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
