// page.js — Server Component: exports metadata and renders the Client Component.
import BlogPageClient from "./BlogPageClient";

const PAGE_TITLE = "Blog";
const PAGE_DESCRIPTION =
  "Technical writing from Anish Singh: architecture decisions, tradeoffs, and lessons learned building AI systems, RAG pipelines, and full-stack products in production.";

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `${PAGE_TITLE} | Anish Singh`,
    description: PAGE_DESCRIPTION,
    url: "https://anish-ai.vercel.app/blog",
    siteName: "Anish Singh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | Anish Singh`,
    description: PAGE_DESCRIPTION,
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
