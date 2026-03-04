import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Market War Radar — AI Founder Intelligence Engine",
  description:
    "Real-time intelligence dashboard monitoring global pain signals, clustering market problems, and generating validated startup opportunities for asymmetric founder advantage.",
  keywords: ["startup intelligence", "market signals", "pain point analysis", "AI founder tool"],
  openGraph: {
    title: "Market War Radar",
    description: "AI-powered founder intelligence engine for asymmetric startup advantage.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#060A16" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} font-heading`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
