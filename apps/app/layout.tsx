import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { generateRootCSS, generateAllProfilesCSS, generateMobileSpacingCSS } from "@/lib/tokens";
import { FloatingControls } from "@/components/ui/FloatingControls";
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

const siteUrl = "https://renge-ui.vercel.app";

export const metadata: Metadata = {
  title: "Renge — Proportion as a First Principle",
  description:
    "A design system built on natural mathematics. PHI. Fibonacci. The ratios that appear in every living thing.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Renge — Proportion as a First Principle",
    description:
      "A design system built on natural mathematics. PHI. Fibonacci. The ratios that appear in every living thing.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/images/renge-ui.png`,
        width: 1200,
        height: 630,
        alt: "Renge — Proportion as a First Principle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renge — Proportion as a First Principle",
    description:
      "A design system built on natural mathematics. PHI. Fibonacci. The ratios that appear in every living thing.",
    images: [`${siteUrl}/images/renge-ui.png`],
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
  // Mobile spacing override — baseUnit 4 at ≤768px to prevent horizontal overflow
  const mobileCSS = generateMobileSpacingCSS();

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
        <style
          dangerouslySetInnerHTML={{ __html: mobileCSS }}
          data-renge-mobile
        />
        {/* Restore persisted profile + mode + scale before first paint — prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var r=document.documentElement;var p=localStorage.getItem('renge-profile');var validP=['ocean','earth','twilight','fire','void','leaf'];if(p&&validP.indexOf(p)!==-1)r.setAttribute('data-profile',p);var m=localStorage.getItem('renge-mode');if(m==='light'||m==='dark')r.setAttribute('data-mode',m)}catch(e){}})();(function(){try{var base=parseFloat(localStorage.getItem('renge-scale')||'');if(isNaN(base)||base<2||base>8)return;var PHI=1.6180339887498949;var TM=16/6;var r=document.documentElement;var FIB=[1,2,3,5,8,13,21,34,55,89];r.style.setProperty('--renge-space-0','0px');FIB.forEach(function(f,i){r.style.setProperty('--renge-space-'+(i+1),(f*base)+'px');});var TS=[{k:'xs',e:-2},{k:'sm',e:-1},{k:'base',e:0},{k:'lg',e:1},{k:'xl',e:2},{k:'2xl',e:3},{k:'3xl',e:4},{k:'4xl',e:5}];var FM={xs:11,sm:13};var tb=base*TM;TS.forEach(function(s){var size=tb*Math.pow(PHI,s.e);var min=FM[s.k]||0;r.style.setProperty('--renge-font-size-'+s.k,Math.max(size,min).toFixed(4)+'px');});}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        {children}
        <FloatingControls />
        <Analytics />
      </body>
    </html>
  );
}
