"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { EASE } from "./SharedComponents";


export const featuredProjects = [
  {
    id: 1,
    index: "01",
    name: "ChatSathi",
    tag: "AI · SaaS Platform",
    image: "/projects/chatsathi.png?v=1",
    accent: "from-indigo-500/20 via-violet-500/10 to-transparent",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    problem:
      "Customer support is expensive and slow, and traditional chatbots are rigid and hard to deploy for small businesses.",
    solution:
      "Multi-tenant AI chatbot platform enabling businesses to deploy custom assistants via embeddable scripts.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Gemini API", "Tailwind CSS"],
    github: "https://github.com/anishsingh234/ChatSathi",
    demo: "https://chat-sathi.vercel.app/",
  },
  {
    id: 2,
    index: "02",
    name: "HopeBridge",
    tag: "AI · RAG System",
    image: "/projects/hopebridge.png?v=1",
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    problem:
      "Patients struggle to find reliable, localized medical information amidst a sea of generic healthcare articles.",
    solution:
      "AI-powered medical assistant delivering source-grounded cancer insights using RAG architecture.",
    tech: ["Next.js", "Vercel AI SDK", "Gemini 2.5 Flash", "LangChain", "Vector DB"],
    github: "https://github.com/anishsingh234/HopeBridge",
    demo: "https://try-hope-bridge.vercel.app/",
  },
  {
    id: 3,
    index: "03",
    name: "HealSync",
    tag: "Full Stack · Healthcare",
    image: "/projects/healsync.png?v=1",
    accent: "from-blue-500/20 via-indigo-500/10 to-transparent",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    problem:
      "Coordinating healthcare appointments and managing patient records across different platforms is fragmented and inefficient.",
    solution:
      "Full-stack healthcare platform enabling unified appointment booking and real-time consultations.",
    tech: ["Next.js", "MongoDB", "Prisma ORM", "Clerk Auth", "Tailwind CSS"],
    github: "https://github.com/anishsingh234/HealSync",
    demo: "https://heal-sync-amber.vercel.app/",
  },
];

// ── Live dot ─────────────────────────────────────────────────
function LiveBadge() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
      </span>
      <span
        className="font-mono text-emerald-400/55 uppercase tracking-widest"
        style={{ fontSize: "8px" }}
      >
        Live
      </span>
    </div>
  );
}

// ── Image panel ───────────────────────────────────────────────
function ProjectImage({ project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.07] group-hover:border-white/[0.13] transition-colors duration-500 bg-[#0D0A1A]"
    >
      {/* Ambient glow behind image */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-60`}
      />

      {/* Blurred background layer */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt=""
          fill
          unoptimized
          className="object-cover blur-2xl opacity-25 scale-110 saturate-150"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Main image */}
      <Image
        src={project.image}
        alt={project.name}
        fill
        unoptimized
        className="object-contain p-3 sm:p-5 z-10 group-hover:scale-[1.04] transition-transform duration-700 ease-out drop-shadow-2xl"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(6,4,14,0.65)_100%)] z-20 pointer-events-none" />

      {/* Corner URL tag */}
      <div className="hidden sm:block absolute bottom-3.5 right-4 z-30 font-mono text-white/18 uppercase tracking-widest" style={{ fontSize: "8px" }}>
        {project.demo?.replace("https://", "")}
      </div>
    </motion.div>
  );
}

// ── Story block (problem / solution) ─────────────────────────
function StoryBlock({ label, text, variant }) {
  const isProblem = variant === "problem";
  return (
    <div
      className={`
        relative pl-4 py-2.5
        border-l-[1.5px]
        ${isProblem ? "border-white/[0.08]" : "border-white/[0.08]"}
        hover:border-white/[0.18] transition-colors duration-300
      `}
    >
      {/* subtle bg strip */}
      <div className="absolute inset-0 bg-white/[0.012] pointer-events-none" />

      <p
        className="font-mono uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5"
        style={{ fontSize: "9px" }}
      >
        <span
          className={`inline-block w-1 h-1 rounded-full ${
            isProblem ? "bg-rose-500/50" : "bg-emerald-500/50"
          }`}
        />
        <span className={isProblem ? "text-rose-400/70" : "text-emerald-400/70"}>
          {label}
        </span>
      </p>
      <p
        className={`text-[12px] sm:text-[12.5px] font-light leading-relaxed ${
          isProblem ? "text-white/42" : "text-white/70"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

// ── Single project row ────────────────────────────────────────
function ProjectRow({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: EASE, delay: index * 0.07 }}
      className="group"
    >
      {/* Row top border */}
      <div className="h-px bg-white/[0.06] group-hover:bg-white/[0.11] transition-colors duration-500" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 py-10 sm:py-12 lg:py-16">

        {/* ── Meta column ── */}
        <div
          className={`min-w-0 flex flex-col justify-between gap-5 sm:gap-7 ${
            isEven
              ? "order-1 pr-0 lg:pr-14"
              : "order-1 lg:order-2 lg:pl-14 lg:pr-0"
          }`}
        >
          {/* Index + tag row */}
          <div className="flex items-start justify-between gap-3">
            <span
              className="font-black text-white/[0.055] leading-none select-none"
              style={{
                fontSize: "clamp(2.6rem, 12vw, 6.5rem)",
                letterSpacing: "-0.05em",
              }}
            >
              _{project.index}.
            </span>

            <div className="flex flex-col items-end gap-2 text-right max-w-[65%] sm:max-w-none">
              <span
                className="font-mono text-white/40 uppercase tracking-[0.2em] break-words"
                style={{ fontSize: "9px" }}
              >
                {project.tag}
              </span>
              <LiveBadge />
            </div>
          </div>

          {/* Project name */}
          <h3
            className="font-black text-white leading-none tracking-tight group-hover:text-white/90 transition-colors"
            style={{
              fontSize: "clamp(1.7rem, 8vw, 3.6rem)",
              letterSpacing: "-0.035em",
            }}
          >
            {project.name}
          </h3>

          {/* Problem → Solution */}
          <div className="flex flex-col gap-3 max-w-full sm:max-w-sm lg:max-w-md">
            <StoryBlock label="The Problem" text={project.problem} variant="problem" />
            <StoryBlock label="The Solution" text={project.solution} variant="solution" />
          </div>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-white/38 uppercase tracking-widest border border-white/[0.07] rounded-full px-3 py-1 hover:border-white/[0.18] hover:text-white/65 transition-all duration-200"
                style={{ fontSize: "9.5px", letterSpacing: "0.12em" }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group/btn w-full sm:w-auto justify-center flex items-center gap-1.5 px-5 py-2.5 bg-white text-[#0A071A] text-[11px] font-medium rounded-full transition-opacity hover:opacity-88"
              >
                View Live
                <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto justify-center flex items-center gap-1.5 px-5 py-2.5 border border-white/[0.1] text-white/55 hover:text-white hover:border-white/25 text-[11px] font-medium rounded-full transition-all duration-200"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </motion.a>
            )}
          </div>
        </div>

        {/* ── Image column ── */}
        <div className={`relative mt-2 sm:mt-4 lg:mt-0 ${isEven ? "order-2" : "order-2 lg:order-1"}`}>
          <ProjectImage project={project} />
        </div>
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="py-14 sm:py-18 lg:py-22 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-end justify-between mb-10 sm:mb-14 flex-wrap gap-5"
        >
          <div>
            {/* Eyebrow */}
            <p
              className="font-mono text-white/32 tracking-[0.3em] uppercase mb-5 flex items-center gap-2"
              style={{ fontSize: "10px" }}
            >
              <span className="inline-block w-5 h-px bg-white/20" />
              Selected Work
            </p>

            {/* Headline */}
            <h2
              className="font-black text-white leading-none tracking-tight"
              style={{
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                letterSpacing: "-0.035em",
              }}
            >
              What I've
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(167,139,250,0.38)" }}
              >
                Built
              </span>
            </h2>
          </div>

          <Link
            href="/projects"
            className="group flex items-center gap-2 font-mono text-white/38 hover:text-white transition-colors border-b border-white/[0.08] hover:border-white/25 pb-0.5"
            style={{ fontSize: "11px", letterSpacing: "0.05em" }}
          >
            View all
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Project list */}
        <div>
          {featuredProjects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
          <div className="h-px bg-white/[0.06]" />
        </div>

      </div>
    </section>
  );
}