import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tailwind — Renge",
  description: "DaisyUI-level plug-and-play Tailwind utilities for the Renge token system. One @plugin directive, full coverage.",
  openGraph: {
    title: "Tailwind — Renge",
    description: "Full Tailwind utility coverage for Renge tokens. @plugin and done.",
    url: "https://renge-ui.vercel.app/tailwind",
  },
  alternates: { canonical: "https://renge-ui.vercel.app/tailwind" },
};

export default function TailwindLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
