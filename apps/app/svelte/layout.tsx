import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Svelte — Renge",
  description: "Renge for Svelte. Theme stores, switchProfile, switchMode — full design token integration for Svelte 4+ and SvelteKit.",
  openGraph: {
    title: "Svelte — Renge",
    description: "Theme stores and token integration for Svelte 4+ and SvelteKit.",
    url: "https://renge-ui.vercel.app/svelte",
  },
  alternates: { canonical: "https://renge-ui.vercel.app/svelte" },
};

export default function SvelteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
