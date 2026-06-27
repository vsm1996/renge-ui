import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Utils — Renge",
  description: "@renge-ui/test-utils — testing utilities for Renge design system integrations.",
  openGraph: {
    title: "Test Utils — Renge",
    description: "Testing utilities for Renge design system integrations.",
    url: "https://renge-ui.vercel.app/test-utils",
  },
  alternates: { canonical: "https://renge-ui.vercel.app/test-utils" },
};

export default function TestUtilsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
