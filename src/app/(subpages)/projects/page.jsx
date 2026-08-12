// page.jsx — Server Component: exports metadata and renders the Client Component.
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata = {
  title: "Projects | Anish Singh — Full Stack Developer & AI Engineer",
  description:
    "Selected projects by Anish Singh: AI chatbots, RAG pipelines, and full-stack healthcare platforms built with Next.js, LLMs, and MongoDB — shipped to production, used by real users.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Anish Singh",
    description:
      "AI SaaS, RAG systems, and full-stack platforms built with Next.js, LLMs, and MongoDB.",
    url: "https://anish-ai.vercel.app/projects",
    siteName: "Anish Singh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Anish Singh",
    description:
      "AI SaaS, RAG systems, and full-stack platforms built with Next.js, LLMs, and MongoDB.",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
