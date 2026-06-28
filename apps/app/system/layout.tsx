import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System — Renge",
  description: "The full token API, animation scale, design patterns, and accessibility guide for the Renge design system.",
  openGraph: {
    title: "System — Renge",
    description: "Token API, animations, patterns, and WCAG 2.1 AA accessibility guide.",
    url: "https://renge-ui.vercel.app/system",
  },
  twitter: {
    card: "summary_large_image",
    title: "System — Renge",
    description: "The full token API, animation scale, design patterns, and accessibility guide for the Renge design system.",
  },
  alternates: { canonical: "https://renge-ui.vercel.app/system" },
};

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
