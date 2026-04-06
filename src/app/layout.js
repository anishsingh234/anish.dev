import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Footer from "@/components/footer";
import CustomCursor from "@/components/home/CustomCursor";
import StarBackground from "@/components/StarBackground";
import { Analytics } from '@vercel/analytics/react';

import { Dancing_Script, Great_Vibes } from "next/font/google";
import Preloader from "@/components/home/Preloader";
import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

// Configure Space Grotesk font

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata = {
  metadataBase: new URL("https://anish-ai.vercel.app"),
  title: "Who I Actually Am",
  description:
    "Full stack developer specializing in React, Next.js, Node.js, and AI/ML integration. Building modern web applications with clean code and great user experience.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Who I Actually Am",
    description: "Full stack developer specializing in React, Next.js, Node.js, and AI/ML integration. Building modern web applications with clean code and great user experience.",
    url: "https://anish-ai.vercel.app/", // Replace with your actual portfolio URL
    siteName: "Anish Singh",
    images: [
      {
        url: "/namaste-og.png", // Make sure you save the image you attached in the public folder as namaste-og.png
        width: 1200,
        height: 630,
        alt: "Anish Singh Portfolio Greeting",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Who I Actually Am",
    description: "Full stack developer specializing in React, Next.js, Node.js, and AI/ML integration.",
    images: ["/namaste-og.png"], 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={clsx(
          spaceGrotesk.variable,
          dancingScript.variable,
          greatVibes.variable,
          "bg-background text-foreground font-sans"
        )}
      >



      
        <Preloader />
        {children}
        <Analytics />
        <CustomCursor />
        <StarBackground />
      </body>
    </html>
  );
}