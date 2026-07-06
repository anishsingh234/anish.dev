"use client";
import { useRef, useEffect } from "react";
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
function ProjectCard({ project, index }) {
  const isDarkText = project.textColor === "text-[#111018]";
  const cardRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // 3D Parallax Hover Effect on the image container
    const xTo = gsap.quickTo(imageRef.current, "rotationY", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(imageRef.current, "rotationX", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e) => {
      if (!imageContainerRef.current) return;
      const rect = imageContainerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to center of container (-1 to 1)
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      // Max rotation in degrees
      const maxRotation = 12;
      xTo(x * maxRotation);
      yTo(-y * maxRotation); // Invert Y for natural tilt feeling
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const imgContainer = imageContainerRef.current;
    if (imgContainer) {
      imgContainer.addEventListener("mousemove", handleMouseMove);
      imgContainer.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (imgContainer) {
        imgContainer.removeEventListener("mousemove", handleMouseMove);
        imgContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className={`project-card sticky w-full mb-16 rounded-sm border-t-8 ${project.accentColor} ${project.bgColor} ${project.textColor}`}
      style={{
        top: `calc(5vh + ${index * 1.5}rem)`,
        boxShadow: "0 -15px 40px rgba(0,0,0,0.6)",
        clipPath:
          index % 2 === 0
            ? "polygon(0 0, 100% 1%, 99% 100%, 1% 99%)"
            : "polygon(1% 0, 99% 1%, 100% 100%, 0 99%)",
        transformOrigin: "top center", // Ensures scaling happens from the top edge
      }}
    >
      <div className="p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Meta / Info Column */}
        <div ref={contentRef} className="card-content flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span
                className={`card-index font-black text-6xl opacity-10 font-mono tracking-tighter ${isDarkText ? "text-black" : "text-white"}`}
              >
                _{project.index}
              </span>
              {project.demo && <div className="card-badge"><LiveBadge /></div>}
            </div>

            <span
              className={`card-tag font-mono uppercase tracking-[0.2em] font-bold text-xs ${isDarkText ? "text-[#111018]/60" : "text-white/60"}`}
            >
              {project.tag}
            </span>

            <h3 className="card-title font-black text-4xl sm:text-5xl tracking-tight mt-1 mb-5">
              {project.name}
            </h3>

            <div className="flex flex-col gap-4">
              <div className="card-story">
                <StoryBlock
                  label="The Problem"
                  text={project.problem}
                  isDarkText={isDarkText}
                />
              </div>
              <div className="card-story">
                <StoryBlock
                  label="The Solution"
                  text={project.solution}
                  isDarkText={isDarkText}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            {/* Tech Stack */}
            <div className="card-tech flex flex-wrap gap-2 mb-4">
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

            {/* CTAs */}
            <div className="card-ctas flex items-center gap-4 flex-wrap">
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
                  style={{
                    boxShadow: "4px 6px 12px rgba(0,0,0,0.2)",
                  }}
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

        {/* Image Column */}
        <div 
          ref={imageContainerRef}
          className="card-image-col flex-1 flex items-center justify-center mt-8 lg:mt-0 w-full"
          style={{ perspective: "1000px" }}
        >
          <div
            ref={imageRef}
            className="relative w-full aspect-[16/10] bg-[#111018]/10 p-2 sm:p-4 transition-transform duration-200 ease-out"
            style={{ 
              boxShadow: "8px 12px 25px rgba(0,0,0,0.4)",
              transformStyle: "preserve-3d" // Required for nested 3D elements
            }}
          >
            {/* "Tape" accent pop out */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-md rotate-[-3deg] z-20"
              style={{ 
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transform: "translateZ(40px)" // Pops out more during tilt
              }}
            />

            <div 
              className="relative w-full h-full overflow-hidden border-2 border-black/10 bg-[#0D0A1A]"
              style={{ transform: "translateZ(20px)" }} // Image slightly popped out
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
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Header line draw animation
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
        },
      );

      const cards = gsap.utils.toArray(".project-card");

      // 2. Cinematic Entrance & Stagger for each card
      cards.forEach((card) => {
        // Query elements within the card for staggered reveal
        const contentElems = card.querySelectorAll(".card-index, .card-badge, .card-tag, .card-title, .card-story, .card-tech, .card-ctas");
        const imageCol = card.querySelector(".card-image-col");

        // Set initial state for entrance
        gsap.set(card, { y: 100, opacity: 0 });
        gsap.set(contentElems, { y: 30, opacity: 0 });
        gsap.set(imageCol, { x: 50, opacity: 0, scale: 0.9 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          },
        });

        tl.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(contentElems, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1, // Stagger reveal
          ease: "back.out(1.2)",
        }, "-=0.4")
        .to(imageCol, {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.6");
      });

      // 3. Stacking depth (scale down + blur + darken as cards stack up)
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Last card doesn't stack behind anything
        
        // We use the next card as the trigger to squish the current card
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.4,
          filter: "blur(4px)",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 85%", // Starts squishing when the NEXT card is 85% down
            end: "top 20%",   // Finishes squishing when the NEXT card reaches 20% down
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-20 sm:py-28 bg-[#111018] font-sans"
    >
      {/* Paper texture background */}
      <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.15] mix-blend-overlay z-0">
        <filter id="projects-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#projects-noise)" />
      </svg>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6"
        >
          <div className="relative">
            <h2
              className="font-black text-white leading-none tracking-tight inline-block relative"
              style={{
                fontSize: "clamp(3rem, 8vw, 6rem)",
                letterSpacing: "-0.035em",
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
            {/* Hand-drawn SVG underline */}
            <svg
              className="header-drawn-line absolute -bottom-6 left-0 w-[120%] h-8 overflow-visible"
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

        {/* ── Stacked Cards Container ── */}
        <div className="relative">
          {featuredProjects.map((project, i) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={i} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
