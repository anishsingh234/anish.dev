"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

export const featuredProjects = [
  {
    id: 1,
    index: "01",
    name: "ChatSathi",
    tag: "AI · SaaS Platform",
    image: "/projects/chatsathi.png?v=1",
    bgColor: "bg-[#E8E6E1]",
    textColor: "text-[#111018]",
    accentColor: "border-indigo-500",
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
    bgColor: "bg-[#232132]",
    textColor: "text-white",
    accentColor: "border-emerald-500",
    problem:
      "Patients struggle to find reliable, localized medical information amidst a sea of generic healthcare articles.",
    solution:
      "AI-powered medical assistant delivering source-grounded cancer insights using RAG architecture.",
    tech: [
      "Next.js",
      "Vercel AI SDK",
      "Gemini 2.5 Flash",
      "LangChain",
      "Vector DB",
    ],
    github: "https://github.com/anishsingh234/HopeBridge",
    demo: "https://try-hope-bridge.vercel.app/",
  },
  {
    id: 3,
    index: "03",
    name: "HealSync",
    tag: "Full Stack · Healthcare",
    image: "/projects/healsync.png?v=1",
    bgColor: "bg-[#1E1A2D]",
    textColor: "text-white",
    accentColor: "border-blue-500",
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
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
      </span>
      <span
        className="font-mono text-emerald-600 font-bold uppercase tracking-widest"
        style={{ fontSize: "9px" }}
      >
        Live
      </span>
    </div>
  );
}

// ── Story block (problem / solution) ─────────────────────────
function StoryBlock({ label, text, isDarkText }) {
  const isProblem = label === "The Problem";
  return (
    <div
      className={`
        story-block relative pl-4 py-2.5
        border-l-[2px]
        ${isDarkText ? "border-[#111018]/20" : "border-white/20"}
      `}
    >
      <p
        className="font-mono uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5"
        style={{ fontSize: "10px" }}
      >
        <span
          className={`inline-block w-1.5 h-1.5 ${
            isProblem ? "bg-rose-500" : "bg-emerald-500"
          }`}
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
        <span
          className={
            isDarkText
              ? "font-bold text-[#111018]/80"
              : "font-bold text-white/80"
          }
        >
          {label}
        </span>
      </p>
      <p
        className={`text-[13px] sm:text-[14px] font-medium leading-relaxed font-serif ${
          isDarkText ? "text-[#111018]/70" : "text-white/70"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

// ── Project Card Sub-Component ───────────────────────────────
function ProjectCard({ project }) {
  const isDarkText = project.textColor === "text-[#111018]";
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: yPct * -24, rotateY: xPct * 24 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      className={`relative w-full rounded-sm border-t-8 ${project.accentColor} ${project.bgColor} ${project.textColor}`}
      style={{
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      }}
    >
      <div className="p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Meta / Info Column */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span
                className={`font-bebas text-7xl opacity-10 tracking-wide select-none ${isDarkText ? "text-black" : "text-white"}`}
              >
                _{project.index}
              </span>
              {project.demo && <LiveBadge />}
            </div>

            <div>
              <span
                className={`font-mono uppercase tracking-[0.2em] font-bold text-xs ${isDarkText ? "text-[#111018]/60" : "text-white/60"}`}
              >
                {project.tag}
              </span>
            </div>

            <h3
              className="font-bebas text-5xl sm:text-6xl tracking-wide mt-1 mb-5"
            >
              {project.name}
            </h3>

            <div className="flex flex-col gap-4">
              <div>
                <StoryBlock
                  label="The Problem"
                  text={project.problem}
                  isDarkText={isDarkText}
                />
              </div>
              <div>
                <StoryBlock
                  label="The Solution"
                  text={project.solution}
                  isDarkText={isDarkText}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className={`font-mono text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 border ${
                    isDarkText
                      ? "border-[#111018]/20 bg-[#111018]/5"
                      : "border-white/20 bg-white/5"
                  }`}
                  style={{
                    clipPath: "polygon(5% 0, 100% 5%, 95% 100%, 0 95%)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all duration-300 ${
                    isDarkText
                      ? "bg-[#111018] text-white hover:bg-black"
                      : "bg-white text-[#111018] hover:bg-gray-200 text-black"
                  }`}
                  style={{ boxShadow: "4px 6px 12px rgba(0,0,0,0.2)" }}
                >
                  View Live
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 font-bold text-sm border-2 border-transparent hover:border-current transition-all duration-300 opacity-80 hover:opacity-100"
                >
                  <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Source
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Image Column with CSS 3D Hover */}
        <div
          ref={cardRef}
          className="flex-1 flex items-center justify-center mt-8 lg:mt-0 w-full"
          style={{ perspective: 1200 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.15s ease-out",
            }}
            className="relative w-full aspect-[16/10] bg-[#111018]/10 p-2 sm:p-4 shadow-2xl"
          >
            {/* "Tape" accent pop out */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-md rotate-[-3deg] z-20 shadow-md"
              style={{ transform: "translateZ(40px)" }}
            />

            <div
              className="relative w-full h-full overflow-hidden border-2 border-black/10 bg-[#0D0A1A]"
              style={{ transform: "translateZ(20px)" }}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                unoptimized
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 bg-transparent font-sans overflow-hidden border-t-2 border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* ── Header ── */}
        <div
          className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6"
        >
          <div className="relative">
            <h2
              className="font-bebas text-white leading-none tracking-wide inline-block relative"
              style={{
                fontSize: "clamp(4rem, 10vw, 8rem)",
              }}
            >
              Selected
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2px #E8E6E1" }}
              >
                Projects
              </span>
            </h2>
            {/* Static SVG underline */}
            <svg
              className="absolute -bottom-6 left-0 w-[120%] h-8 overflow-visible"
              viewBox="0 0 200 20"
              fill="none"
            >
              <path
                d="M0,10 Q50,0 100,10 T200,10"
                stroke="#A78BFA"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <Link
            href="/projects"
            className="group paper-card flex items-center gap-2 font-bold text-[#111018] bg-[#E8E6E1] px-6 py-3 transition-transform hover:scale-105"
            style={{
              clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0 98%)",
              boxShadow: "4px 6px 12px rgba(0,0,0,0.3)",
            }}
          >
            View Archive
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* ── Cards Container ── */}
        <div className="relative flex flex-col gap-12">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
