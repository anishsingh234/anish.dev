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
    oneLiner:
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
    oneLiner:
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
    oneLiner:
      "Full-stack healthcare platform enabling appointment booking and real-time consultations.",
    tech: ["Next.js", "MongoDB", "Prisma ORM", "Clerk Auth", "Tailwind CSS"],
    github: "https://github.com/anishsingh234/HealSync",
    demo: "https://heal-sync-amber.vercel.app/",
  },
];

// ── Single project row ────────────────────────────────────────
function ProjectRow({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      className="group"
    >
      {/* Top border */}
      <div className="h-px bg-white/[0.07] group-hover:bg-white/[0.14] transition-colors duration-500" />

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 py-10 lg:py-14 ${isEven ? "" : ""}`}>

        {/* ── Left: meta + content ── */}
        <div className={`flex flex-col justify-between gap-8 pr-0 lg:pr-16 ${isEven ? "order-1" : "order-1 lg:order-2 lg:pl-16 lg:pr-0"}`}>

          {/* Index + tag row */}
          <div className="flex items-center justify-between">
            <span
              className="font-black text-white/[0.06] leading-none select-none"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)", letterSpacing: "-0.04em" }}
            >
              _{project.index}.
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-white/25 tracking-[0.2em] uppercase">
                {project.tag}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-[9px] font-mono text-emerald-400/60 uppercase tracking-widest">Live</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <h3
              className="font-black text-white leading-none tracking-tight mb-5 group-hover:text-white/90 transition-colors"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              {project.name}
            </h3>
            <p className="text-sm text-white/40 leading-relaxed max-w-sm font-light">
              {project.oneLiner}
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono text-white/30 tracking-widest uppercase border border-white/[0.07] rounded-full px-3 py-1 hover:border-white/20 hover:text-white/50 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex items-center gap-4">
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group/btn flex items-center gap-2 px-5 py-2.5 bg-white text-[#111318] text-xs font-bold rounded-full transition-all"
              >
                View Live
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 border border-white/[0.1] text-white/50 hover:text-white hover:border-white/25 text-xs font-bold rounded-full transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </motion.a>
            )}
          </div>
        </div>

        {/* ── Right: image ── */}
        <div className={`relative ${isEven ? "order-2" : "order-2 lg:order-1"}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.07] group-hover:border-white/[0.12] transition-colors duration-500 bg-[#0D0F18]"
          >
            {/* Blurred bg */}
            <div className="absolute inset-0">
              <Image
                src={project.image}
                alt=""
                fill
                unoptimized
                className="object-cover blur-2xl opacity-30 scale-110 saturate-150"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Main image */}
            <Image
              src={project.image}
              alt={project.name}
              fill
              unoptimized
              className="object-contain p-4 z-10 group-hover:scale-[1.03] transition-transform duration-700 ease-out drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(8,10,16,0.6)_100%)] z-20 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-end justify-between mb-16 flex-wrap gap-6"
        >
          <div>
            <p className="text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase mb-4">
              ◆ &nbsp; Selected Work
            </p>
            <h2
              className="font-black text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              What I've
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)" }}
              >
                Built
              </span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-sm font-bold text-white/30 hover:text-white transition-colors"
          >
            View all
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* ── Project rows ── */}
        <div>
          {featuredProjects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
          {/* Bottom border */}
          <div className="h-px bg-white/[0.07]" />
        </div>

      </div>
    </section>
  );
}