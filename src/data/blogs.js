// src/data/blogs.js
// Place your PDFs in /public/blogs/ and cover images in /public/blogs/covers/

export const blogs = [
  {
    id: 1,
    slug: "create-first-ai-agent-for-free",
    title: "Create Our First AI Agent, for FREE!",
    excerpt:
      "A deep dive into how agents differ from LLMs, how tool calling works, and how to build your first AI agent using a naive Python approach with Ollama — no API key needed.",
    cover:"https://res.cloudinary.com/dunujr4jp/image/upload/v1774273417/Gemini_Generated_Image_rimvjcrimvjcrimv_fhslbh.png", // add your cover image here
    pdf: "/blogs/Create_Our_First_AI_Agent__for_FREE-anish.pdf",
    date: "March 2026",
    readTime: "7 min read",
    tags: ["AI Agents", "LLMs", "Python", "Ollama"],
    featured: true,
  },
  {
    id: 2,
    slug: "open-source-thrives-on-github",
    title: "Open Source Thrives on GitHub",
    excerpt:
      "Exploring why GitHub became the global home of open source — from its collaboration model and transparency principles to network effects and its role as a developer career engine.",
   cover:"https://res.cloudinary.com/dunujr4jp/image/upload/v1774273415/Gemini_Generated_Image_lhrh8vlhrh8vlhrh_p0sg5x.png", // add your cover image here
    pdf: "/blogs/Open_Source_Thrives_on_GitHub-anish.pdf",
    date: "February 2026",
    readTime: "5 min read",
    tags: ["Open Source", "GitHub", "Developer Tools"],
    featured: true,
  },
];