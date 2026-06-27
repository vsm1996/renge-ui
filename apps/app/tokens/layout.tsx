import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tokens — Renge",
  description: "The complete Renge token reference. PHI, Fibonacci, and phyllotaxis made into CSS custom properties.",
  openGraph: {
    title: "Tokens — Renge",
    description: "Complete CSS custom property reference — spacing, color, typography, motion, radius, and layout.",
    url: "https://renge-ui.vercel.app/tokens",
  },
  alternates: { canonical: "https://renge-ui.vercel.app/tokens" },
};

export default function TokensLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
