import "./globals.css";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { Bebas_Neue, Caveat, Courier_Prime, Spectral } from "next/font/google";

// Four faces, four jobs: condensed display, editorial body, typed/printed
// labels and code, handwritten annotations.
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spectral = Spectral({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-spectral",
  display: "swap",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
  display: "swap",
});

const caveat = Caveat({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const SITE_URL = "https://anish-ai.vercel.app";
const SITE_TITLE = "Anish Singh — Full Stack Developer & AI Engineer";
const SITE_DESCRIPTION =
  "Anish Singh is a full stack developer and AI engineer building production web apps with Next.js, React and Node.js, plus RAG pipelines, LLM integrations and multi-agent systems. Full Stack Developer at Exponent Solutions.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Anish Singh — Portfolio",
  category: "technology",
  title: {
    default: SITE_TITLE,
    template: "%s | Anish Singh",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Anish Singh",
    "Anish Kumar Singh",
    "Full Stack Developer",
    "AI Engineer",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "RAG",
    "LLM",
    "LangChain",
    "Generative AI",
    "Software Engineer India",
    "Portfolio",
    "anish-ai",
  ],
  authors: [{ name: "Anish Singh", url: SITE_URL }],
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: "Anish Singh",
    images: [
      {
        url: "/namaste-og.png",
        width: 1200,
        height: 630,
        alt: "Anish Singh — Full Stack Developer & AI Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/namaste-og.png"],
  },
};

export const viewport = {
  themeColor: "#0D0C11",
};

// Site-wide structured data: who this is, and the site that represents them.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Anish Singh",
      alternateName: "Anish Kumar Singh",
      url: SITE_URL,
      image: `${SITE_URL}/namaste-og.png`,
      email: "mailto:anishsingh210204@gmail.com",
      jobTitle: "Full Stack Developer & AI Engineer",
      description: SITE_DESCRIPTION,
      worksFor: { "@type": "Organization", name: "Exponent Solutions" },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Uttarakhand Technical University",
        address: { "@type": "PostalAddress", addressLocality: "Dehradun", addressCountry: "IN" },
      },
      sameAs: ["https://github.com/anishsingh234", "https://linkedin.com/in/anish-ai"],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "FastAPI",
        "MongoDB",
        "Retrieval-Augmented Generation",
        "Large Language Models",
        "LangChain",
        "CrewAI",
        "Multi-agent systems",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Anish Singh",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

// Runs before first paint: marks JS as available so scroll reveals can start
// hidden without hiding anything from no-JS visitors.
const bootScript = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={clsx(
          bebas.variable,
          spectral.variable,
          courierPrime.variable,
          caveat.variable,
          "bg-desk text-ivory font-serif antialiased"
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
