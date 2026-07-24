import type { Metadata } from "next";
import { PETAL_COMPOSITIONS_FLOOR, PETAL_CATEGORIES } from "@/lib/site-facts";

const lede = `${PETAL_COMPOSITIONS_FLOOR}+ semantic token compositions across ${PETAL_CATEGORIES} categories.`;

export const metadata: Metadata = {
  title: "Petals — Renge",
  description: `${lede} Pre-made token combinations for typography, spacing, forms, overlays, navigation, and more.`,
  openGraph: {
    title: "Petals — Renge",
    description: lede,
    url: "https://renge-ui.vercel.app/petals",
  },
  twitter: {
    card: "summary_large_image",
    title: "Petals — Renge",
    description: `${lede} Pre-made token combinations for typography, spacing, forms, overlays, navigation, and more.`,
  },
  alternates: { canonical: "https://renge-ui.vercel.app/petals" },
};

export default function PetalsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
