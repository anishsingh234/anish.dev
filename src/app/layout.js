import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Analytics } from '@vercel/analytics/react';

import { Dancing_Script, Great_Vibes } from "next/font/google";
import { Bebas_Neue, Caveat, JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: "--font-bebas",
  display: 'swap',
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
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
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://anish-ai.vercel.app"),
  title: "Who I Actually Am | Anish Singh",
  description:
    "Full stack developer specializing in React, Next.js, Node.js, and AI/ML integration. Building modern web applications with clean code and great user experience.",
  keywords: [
    "Anish Singh",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "AI",
    "Machine Learning",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
    "anish-ai",
  ],
  authors: [{ name: "Anish Singh", url: "https://anish-ai.vercel.app" }],
  creator: "Anish Singh",
  publisher: "Anish Singh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Who I Actually Am | Anish Singh",
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
    title: "Who I Actually Am | Anish Singh",
    description: "Full stack developer specializing in React, Next.js, Node.js, and AI/ML integration.",
    images: ["/namaste-og.png"], 
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anish Singh",
  url: "https://anish-ai.vercel.app",
  jobTitle: "Full Stack Developer & AI Engineer",
  sameAs: [
    "https://github.com/anishsingh234",
    "https://linkedin.com/in/anish-ai",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "Artificial Intelligence",
    "Machine Learning",
    "RAG",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Devicon CDN — used by the Skills section's tech icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={clsx(
          spaceGrotesk.variable,
          dancingScript.variable,
          greatVibes.variable,
          bebas.variable,
          caveat.variable,
          jetbrainsMono.variable,
          "bg-background text-foreground font-sans paper-bg"
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}