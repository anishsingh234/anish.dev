// page.jsx — Server Component: exports metadata and renders the Client Component.
import ProjectsPageClient from "./ProjectsPageClient";

const PAGE_TITLE = "Projects";
const PAGE_DESCRIPTION =
  "Selected projects by Anish Singh: AI chatbots, RAG pipelines, and full-stack healthcare platforms built with Next.js, LLMs, and MongoDB — shipped to production, used by real users.";

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `${PAGE_TITLE} | Anish Singh`,
    description: PAGE_DESCRIPTION,
    url: "https://anish-ai.vercel.app/projects",
    siteName: "Anish Singh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | Anish Singh`,
    description: PAGE_DESCRIPTION,
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
