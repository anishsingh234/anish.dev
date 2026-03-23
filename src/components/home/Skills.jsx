"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain, Layout, Server, Database, Code2, Wrench,
} from "lucide-react";
import { FadeUp, SectionLabel } from "./SharedComponents";

const categories = [
  {
    id: "ai",
    title: "AI / ML",
    fullTitle: "AI & Machine Learning",
    icon: Brain,
    description: "The core of what I build — agents, pipelines, and intelligent systems at production scale.",
    count: "12",
    featured: true,
    skills: [
      { name: "LLMs",                tag: "Core",      level: 95 },
      { name: "Prompt Engineering",  tag: "Core",      level: 92 },
      { name: "RAG Pipelines",       tag: "Core",      level: 90 },
      { name: "LangChain",           tag: "Framework", level: 88 },
      { name: "Tool Calling",        tag: "Core",      level: 88 },
      { name: "Vercel AI SDK",       tag: "SDK",       level: 85 },
      { name: "Vector Databases",    tag: "Infra",     level: 82 },
      { name: "Pinecone",            tag: "Infra",     level: 80 },
      { name: "CrewAI",              tag: "Framework", level: 78 },
      { name: "Multi-Agent Systems", tag: "Emerging",  level: 75 },
      { name: "Hugging Face",        tag: "Platform",  level: 72 },
      { name: "Ollama",              tag: "Local",     level: 70 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    fullTitle: "Frontend",
    icon: Layout,
    description: "Building responsive, high-performance interfaces that feel great to use.",
    count: "06",
    skills: [
      { name: "React.js",     tag: "Core",      level: 95 },
      { name: "Next.js",      tag: "Framework", level: 93 },
      { name: "Tailwind CSS", tag: "Styling",   level: 90 },
      { name: "React Native", tag: "Mobile",    level: 72 },
      { name: "Expo",         tag: "Mobile",    level: 68 },
      { name: "Three.js",     tag: "3D",        level: 55 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    fullTitle: "Backend",
    icon: Server,
    description: "Designing scalable APIs and server-side systems that integrate seamlessly with AI.",
    count: "05",
    skills: [
      { name: "REST APIs",  tag: "Architecture", level: 95 },
      { name: "Node.js",    tag: "Runtime",      level: 92 },
      { name: "Express.js", tag: "Framework",    level: 88 },
      { name: "FastAPI",    tag: "Framework",    level: 78 },
      { name: "GraphQL",    tag: "Query",        level: 65 },
    ],
  },
  {
    id: "database",
    title: "Database",
    fullTitle: "Database",
    icon: Database,
    description: "Efficient data modelling, query optimization, and scalable storage design.",
    count: "03",
    skills: [
      { name: "MongoDB",    tag: "NoSQL", level: 90 },
      { name: "Prisma ORM", tag: "ORM",   level: 82 },
      { name: "MySQL",      tag: "SQL",   level: 75 },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    fullTitle: "Languages",
    icon: Code2,
    description: "Strong fundamentals in algorithms, data structures, and system design.",
    count: "08",
    skills: [
      { name: "JavaScript", tag: "Primary", level: 95 },
      { name: "HTML",       tag: "Markup",  level: 95 },
      { name: "TypeScript", tag: "Primary", level: 93 },
      { name: "CSS",        tag: "Styling", level: 90 },
      { name: "Python",     tag: "Primary", level: 88 },
      { name: "C++",        tag: "DSA",     level: 80 },
      { name: "SQL",        tag: "Query",   level: 78 },
      { name: "C",          tag: "Systems", level: 72 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    fullTitle: "Tools & Platforms",
    icon: Wrench,
    description: "Day-to-day development, deployment, and workflow tooling.",
    count: "06",
    skills: [
      { name: "Git",        tag: "VCS",      level: 95 },
      { name: "VS Code",    tag: "Editor",   level: 95 },
      { name: "GitHub",     tag: "Platform", level: 92 },
      { name: "Vercel",     tag: "Deploy",   level: 88 },
      { name: "Postman",    tag: "API",      level: 85 },
      { name: "Clerk Auth", tag: "Auth",     level: 82 },
    ],
  },
];

const panelVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  exit:    { opacity: 0, y: -4, transition: { duration: 0.12 } },
};

export default function Skills() {
  const [active, setActive] = useState("ai");
  const current = categories.find((c) => c.id === active);

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 scroll-mt-20 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <FadeUp className="mb-10 sm:mb-14">
          <SectionLabel>My Tech Stack</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-white mb-4 leading-tight tracking-tight">
            Tools I architect with
          </h2>
          <p className="text-white/40 max-w-md leading-relaxed text-[14px] font-inter">
            Technologies I rely on to ship production AI systems, full-stack
            products, and everything in between.
          </p>
        </FadeUp>

        {/* ── MOBILE: horizontal chip strip ── */}
        <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-none -mx-4 px-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-[7px] rounded-full border text-[12px] font-medium font-inter transition-all duration-200 cursor-pointer
                  ${isActive
                    ? "bg-purple-500/15 border-purple-500/40 text-purple-300"
                    : "bg-white/[0.03] border-white/[0.08] text-white/40"
                  }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                {cat.title}
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded
                    ${isActive
                      ? "bg-purple-500/20 text-purple-400/70"
                      : "bg-white/[0.05] text-white/20"
                    }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── DESKTOP: sidebar + panel grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0">

          {/* Desktop left nav — hidden on mobile */}
          <nav className="relative hidden lg:flex flex-col gap-0.5">
            <div className="absolute right-0 top-0 bottom-0 w-px bg-white/[0.07]" />
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`group relative flex items-center gap-2.5 px-3 py-2.5 pr-5 rounded-none text-left transition-colors duration-200 cursor-pointer w-full
                    ${isActive ? "text-white" : "text-white/35 hover:text-white/60"}`}
                >
                  {isActive && (
                    <span className="absolute right-[-1px] top-1 bottom-1 w-[2px] rounded-full bg-purple-500/90" />
                  )}
                  <span className={`flex items-center justify-center w-[30px] h-[30px] rounded-lg border transition-colors duration-200 shrink-0
                    ${isActive
                      ? "bg-purple-500/12 border-purple-500/25"
                      : "bg-white/[0.04] border-white/[0.07]"
                    }`}>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-purple-300/90" : "text-white/45 group-hover:text-white/65"}`} />
                  </span>
                  <span className="text-[13px] font-medium font-inter">{cat.title}</span>
                  <span className={`ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded
                    ${isActive
                      ? "text-purple-400/60 bg-purple-500/10"
                      : "text-white/20 bg-white/[0.04]"
                    }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right panel — shared between mobile and desktop */}
          <div className="lg:pl-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Panel header */}
                <div className="mb-5 lg:mb-6">
                  <h3 className="text-[20px] lg:text-[22px] font-space font-bold text-white tracking-tight mb-1.5">
                    {current.fullTitle}
                  </h3>
                  <p className="text-[13px] text-white/35 leading-relaxed max-w-sm font-inter">
                    {current.description}
                  </p>
                </div>

                {current.featured && (
                  <p className="flex items-center gap-2 text-[11px] text-purple-400/55 font-mono mb-5 uppercase tracking-wider">
                    <span className="w-4 h-px bg-purple-500/40 inline-block" />
                    Primary specialization
                  </p>
                )}

                {/* Skills list */}
                <div className="flex flex-col">
                  {current.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center justify-between py-[11px] lg:py-[13px] border-b border-white/[0.055] first:border-t first:border-white/[0.055]"
                    >
                      {/* Left: dot + name */}
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/[0.12] group-hover:bg-purple-500/70 transition-colors duration-200 shrink-0" />
                        <span className="text-[13px] lg:text-[15px] font-medium text-white/60 group-hover:text-white transition-colors duration-200 tracking-[-0.01em] font-inter truncate">
                          {skill.name}
                        </span>
                      </div>

                      {/* Right: tag + bar + percentage (mobile shows percentage, desktop hides it) */}
                      <div className="flex items-center gap-2.5 lg:gap-3.5 flex-shrink-0">
                        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[.06em] hidden sm:inline">
                          {skill.tag}
                        </span>
                        <div className="w-14 lg:w-20 h-[2px] rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-purple-500/50 group-hover:bg-purple-500/75 transition-colors duration-200"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        {/* Percentage — visible on mobile only */}
                        <span className="text-[10px] font-mono text-white/20 w-[26px] text-right lg:hidden">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Stats */}
            <div className="flex gap-0 mt-8 pt-5 border-t border-white/[0.06]">
              {[
                { n: "40+", l: "Technologies" },
                { n: "12+", l: "Projects shipped" },
                { n: "4+",  l: "AI systems built" },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className={`flex flex-col gap-1 flex-1 ${i !== 0 ? "pl-4 border-l border-white/[0.06]" : ""} ${i !== 2 ? "pr-4" : ""}`}
                >
                  <span className="text-[20px] lg:text-[22px] font-bold text-white font-mono tracking-[-0.03em]">{s.n}</span>
                  <span className="text-[10px] lg:text-[11px] text-white/30 tracking-[.04em] uppercase">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}