import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vue — Renge",
  description: "Renge for Vue 3. useRengeTheme composable, switchProfile, switchMode — full design token integration with Composition API.",
  openGraph: {
    title: "Vue — Renge",
    description: "useRengeTheme composable and token integration for Vue 3.",
    url: "https://renge-ui.vercel.app/vue",
  },
  alternates: { canonical: "https://renge-ui.vercel.app/vue" },
};

export default function VueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
