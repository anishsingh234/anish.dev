// page.jsx — place at:
// src/app/(subpages)/yield/privacy-policy/page.jsx
//
// This is a Server Component — it exports metadata and renders the Client Component.

import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata = {
  title: "Privacy Policy · Yield",
  description:
    "Learn how Yield collects, uses, and protects your financial data. Your privacy is our priority.",
  openGraph: {
    title: "Privacy Policy · Yield",
    description: "Learn how Yield protects your financial data and privacy.",
    url: "https://anish-ai.vercel.app/privacy-policy",
    siteName: "Yield",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy · Yield",
    description: "Learn how Yield protects your financial data and privacy.",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}