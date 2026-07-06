"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
        relative pl-4 py-2.5
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
        <span className={isDarkText ? "font-bold text-[#111018]/80" : "font-bold text-white/80"}>
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

// ── Main component ───────────────────────────────────────────────
export default function Projects() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    // Animate the header SVG line
    gsap.fromTo(
      ".header-drawn-line path",
      { strokeDasharray: 500, strokeDashoffset: 500 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      }
    );

    // Scale down previous cards as new ones stack on top
    const cards = gsap.utils.toArray(".project-card");
    
    // Entrance flip animation
    cards.forEach((card) => {
      gsap.set(card, { transformPerspective: 1000 });
      gsap.from(card, {
        opacity: 0,
        rotationX: -90,
        transformOrigin: "top center",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        }
      });
    });

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return; // Last card doesn't scale down
      gsap.to(card, {
        scale: 0.95,
        opacity: 0.5,
        scrollTrigger: {
          trigger: cards[i + 1],
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section id="projects" ref={containerRef} className="relative py-20 sm:py-28 bg-[#111018] font-sans">
      
      {/* Paper texture background (consistent with Hero) */}
      <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.15] mix-blend-overlay z-0">
        <filter id="projects-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#projects-noise)" />
      </svg>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
          <div className="relative">
            <h2
              className="font-black text-white leading-none tracking-tight inline-block relative"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: "-0.035em" }}
            >
              Selected
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px #E8E6E1" }}>
                Projects
              </span>
            </h2>
            {/* Hand-drawn SVG underline */}
            <svg className="header-drawn-line absolute -bottom-6 left-0 w-[120%] h-8 overflow-visible" viewBox="0 0 200 20" fill="none">
              <path d="M0,10 Q50,0 100,10 T200,10" stroke="#A78BFA" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          <Link
            href="/projects"
            className="group paper-card flex items-center gap-2 font-bold text-[#111018] bg-[#E8E6E1] px-6 py-3 transition-transform hover:scale-105"
            style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0 98%)", boxShadow: "4px 6px 12px rgba(0,0,0,0.3)" }}
          >
            View Archive
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* ── Stacked Cards Container ── */}
        <div className="relative">
          {featuredProjects.map((project, i) => {
            const isDarkText = project.textColor === "text-[#111018]";
            
            return (
              <div
                key={project.id}
                className={`project-card sticky w-full mb-16 rounded-sm border-t-8 ${project.accentColor} ${project.bgColor} ${project.textColor}`}
                // Offset top position slightly for a true stacking effect
                style={{ 
                  top: `calc(5vh + ${i * 1.5}rem)`, 
                  boxShadow: "0 -15px 40px rgba(0,0,0,0.6)",
                  clipPath: i % 2 === 0 
                    ? "polygon(0 0, 100% 1%, 99% 100%, 1% 99%)" 
                    : "polygon(1% 0, 99% 1%, 100% 100%, 0 99%)"
                }}
              >
                <div className="p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                  
                  {/* Meta / Info Column */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className={`font-black text-6xl opacity-10 font-mono tracking-tighter ${isDarkText ? "text-black" : "text-white"}`}>
                          _{project.index}
                        </span>
                        {project.demo && <LiveBadge />}
                      </div>

                      <span className={`font-mono uppercase tracking-[0.2em] font-bold text-xs ${isDarkText ? "text-[#111018]/60" : "text-white/60"}`}>
                        {project.tag}
                      </span>
                      
                      <h3 className="font-black text-4xl sm:text-5xl tracking-tight mt-1 mb-5">
                        {project.name}
                      </h3>

                      <div className="flex flex-col gap-4">
                        <StoryBlock label="The Problem" text={project.problem} isDarkText={isDarkText} />
                        <StoryBlock label="The Solution" text={project.solution} isDarkText={isDarkText} />
                      </div>
                    </div>

                    <div className="mt-6">
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className={`font-mono text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 border ${
                              isDarkText ? "border-[#111018]/20 bg-[#111018]/5" : "border-white/20 bg-white/5"
                            }`}
                            style={{ clipPath: "polygon(5% 0, 100% 5%, 95% 100%, 0 95%)" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="flex items-center gap-4 flex-wrap">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-transform hover:-translate-y-1 ${
                              isDarkText ? "bg-[#111018] text-white" : "bg-white text-[#111018]"
                            }`}
                            style={{ boxShadow: "4px 6px 12px rgba(0,0,0,0.2)" }}
                          >
                            View Live
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 font-bold text-sm border-2 border-transparent hover:underline opacity-80 hover:opacity-100 transition-opacity"
                          >
                            <Github className="w-4 h-4" />
                            Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className="flex-1 flex items-center justify-center mt-8 lg:mt-0">
                    <div 
                      className="relative w-full aspect-[16/10] bg-[#111018]/10 p-2 sm:p-4 transform rotate-2 transition-transform hover:rotate-0 duration-500"
                      style={{ boxShadow: "8px 12px 25px rgba(0,0,0,0.4)" }}
                    >
                      {/* "Tape" accent */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-md rotate-[-3deg] z-20" style={{ boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }} />
                      
                      <div className="relative w-full h-full overflow-hidden border-2 border-black/10 bg-[#0D0A1A]">
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
          })}
        </div>

      </div>
    </section>
  );
}