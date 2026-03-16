import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { generateRootCSS, generateAllProfilesCSS } from "@/lib/tokens";
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
  // Base scales (spacing, type, motion, radius) + ocean as :root default
  const tokenCSS = generateRootCSS("ocean");
  // All profile color overrides via [data-profile] selectors — no JS flash
  const profilesCSS = generateAllProfilesCSS();

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
        <style
          dangerouslySetInnerHTML={{ __html: profilesCSS }}
          data-renge-profiles
        />
        {/* Restore persisted profile before first paint — prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem('renge-profile');var valid=['ocean','earth','twilight','fire','void','leaf'];if(p&&valid.indexOf(p)!==-1){document.documentElement.setAttribute('data-profile',p)}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
