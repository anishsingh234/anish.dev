import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import Chapters from "@/components/home/Chapters";
import Workbench from "@/components/home/Workbench";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import BlogSection from "@/components/BlogSection";
import Contact from "@/components/home/Contact";
import Footer from "@/components/footer";
import RevealObserver from "@/components/paper/RevealObserver";
import { projectsData } from "@/app/data";

// Shipped work as structured data, so search results can list the projects.
const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects by Anish Singh",
  itemListElement: projectsData
    .filter((p) => p.featured)
    .map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.name,
        description: p.description,
        applicationCategory: "WebApplication",
        url: p.demoLink || p.GithubLink,
        author: { "@id": "https://anish-ai.vercel.app/#person" },
      },
    })),
};

// The notebook, page by page: cover → who I am → how I build / use AI / ship →
// the workbench → tools → the log → clippings → one last page.
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <Navbar />
      <main id="main" className="w-full overflow-x-clip">
        <Hero />
        <AboutSection />
        <Chapters />
        <Workbench />
        <Skills />
        <Experience />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
