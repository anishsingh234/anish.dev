// page.js — Server Component: exports metadata and renders the Client Component.
import BlogPageClient from "./BlogPageClient";

export const metadata = {
  title: "Blog | Anish Singh — Full Stack Developer & AI Engineer",
  description:
    "Technical writing from Anish Singh: architecture decisions, tradeoffs, and lessons learned building AI systems, RAG pipelines, and full-stack products in production.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Anish Singh",
    description:
      "Architecture decisions and lessons from building AI systems and full-stack products in production.",
    url: "https://anish-ai.vercel.app/blog",
    siteName: "Anish Singh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Anish Singh",
    description:
      "Architecture decisions and lessons from building AI systems and full-stack products in production.",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
