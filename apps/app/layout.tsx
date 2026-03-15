import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { generateRootCSS } from "@/lib/tokens";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Renge — Proportion as a First Principle",
  description:
    "A design system built on natural mathematics. PHI. Fibonacci. The ratios that appear in every living thing.",
  openGraph: {
    title: "Renge — Proportion as a First Principle",
    description:
      "A design system built on natural mathematics. PHI. Fibonacci. The ratios that appear in every living thing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate token CSS server-side — inject as style tag
  const tokenCSS = generateRootCSS("ocean");

  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${outfit.variable}`}
      data-profile="ocean"
      suppressHydrationWarning
    >
      <head>
        <style
          dangerouslySetInnerHTML={{ __html: tokenCSS }}
          data-renge-tokens
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
