"use client";
import ProjectLayout from "./ProjectLayout";
import { useState, useMemo, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// ── Filter config ─────────────────────────────────────────────────────────────
const FILTERS = [
  { label: "All",          value: "all" },
  { label: "AI / ML",      value: "ai" },
  { label: "Full Stack",   value: "fullstack" },
  { label: "DSA",          value: "dsa" },
  { label: "Mini",         value: "mini" },
];

const getCategory = (tag = "") => {
  const t = tag.toLowerCase();
  if (t.includes("ai") || t.includes("ml") || t.includes("rag") || t.includes("mobile")) return "ai";
  if (t.includes("full stack") || t.includes("enterprise") || t.includes("healthcare") ||
      t.includes("e-commerce") || t.includes("job")) return "fullstack";
  if (t.includes("dsa")) return "dsa";
  if (t.includes("mini")) return "mini";
  return "other";
};

export default function ProjectList({ projects }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const counts = useMemo(() => {
    const c = { all: projects.length, ai: 0, fullstack: 0, dsa: 0, mini: 0 };
    projects.forEach((p) => {
      const cat = getCategory(p.tag);
      if (c[cat] !== undefined) c[cat]++;
    });
    return c;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => getCategory(p.tag) === activeFilter);
  }, [activeFilter, projects]);

  useGSAP(() => {
    // Initial entrance animation
    const tl = gsap.timeline();
    tl.fromTo(".page-header", 
      { y: 30, opacity: 0, rotationZ: -2 }, 
      { y: 0, opacity: 1, rotationZ: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(".filter-tab",
      { y: 20, opacity: 0, rotationZ: () => Math.random() * 10 - 5 },
      { y: 0, opacity: 1, rotationZ: (i) => i % 2 === 0 ? 1 : -1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(".project-card-wrapper",
      { y: 50, opacity: 0, rotationX: -30, transformPerspective: 1000 },
      { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.2"
    );
  }, { scope: containerRef });

  // Shuffle animation on filter change
  useGSAP(() => {
    if (!gridRef.current) return;
    
    // Quick flutter out and in for the filtered cards
    const cards = gsap.utils.toArray(".project-card-wrapper");
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { y: -30, opacity: 0, rotationZ: () => Math.random() * 10 - 5, transformPerspective: 1000, rotationX: 20 },
      { y: 0, opacity: 1, rotationZ: 0, rotationX: 0, duration: 0.5, stagger: 0.05, ease: "back.out(1.2)" }
    );
  }, { dependencies: [activeFilter], scope: containerRef });

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <section className="page-header pt-10 pb-12 text-center relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#232132] text-white shadow-md transform -rotate-1 border border-black/20" style={{ clipPath: "polygon(5% 0, 100% 2%, 95% 100%, 0 98%)" }}>
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest">Case Files Archive</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black mb-6 text-white uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,0.8)]" style={{ WebkitTextStroke: "1px black" }}>
          Evidence <span className="text-[#E8E6E1]" style={{ WebkitTextStroke: "0px" }}>Board.</span>
        </h1>

        <p className="text-sm font-mono text-[#E8E6E1]/80 max-w-xl mx-auto leading-relaxed border-b border-[#E8E6E1]/20 pb-4">
          Production-grade AI systems, full-stack platforms, and open-source
          tools. All records declassified and ready for review.
        </p>
      </section>

      {/* ── Filter tabs ───────────────────────────────────────────────────── */}
      <section className="mb-12 relative z-20">
        <div className="flex flex-wrap justify-center gap-4">
          {FILTERS.map(({ label, value }, i) => {
            const isActive = activeFilter === value;
            return (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={`filter-tab relative px-6 py-3 font-mono font-bold uppercase text-xs sm:text-sm shadow-md transition-transform hover:-translate-y-1 ${
                  isActive
                    ? "bg-red-600 text-white z-10"
                    : "bg-[#E8E6E1] text-[#111018] hover:bg-white z-0"
                }`}
                style={{ 
                  clipPath: i % 2 === 0 ? "polygon(0 0, 100% 5%, 98% 100%, 2% 95%)" : "polygon(2% 0, 98% 5%, 100% 100%, 0 95%)",
                }}
              >
                {/* Tape on active */}
                {isActive && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/40 rotate-[10deg] shadow-sm" />
                )}
                
                <span className="relative z-10 flex items-center gap-2">
                  {label}
                  <span className={`text-[10px] ${ isActive ? "text-white/70" : "text-black/50" }`}>
                    [{counts[value] ?? 0}]
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Projects grid ─────────────────────────────────────────────────── */}
      <section className="pb-20">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card-wrapper h-full">
               <ProjectLayout {...project} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block px-8 py-6 bg-[#232132] text-white border-2 border-red-500 transform rotate-1 shadow-xl" style={{ clipPath: "polygon(0 0, 100% 2%, 98% 100%, 2% 98%)" }}>
              <p className="font-mono text-xl font-bold uppercase tracking-widest text-red-500">
                [NO RECORDS FOUND IN THIS CATEGORY]
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: projects.length, label: "Total Files" },
            { value: projects.filter((p) => p.status?.toLowerCase() === "completed").length, label: "Closed Cases" },
            { value: projects.filter((p) => p.featured).length, label: "Priority" },
            { value: new Set(projects.flatMap((p) => p.techStack || [])).size, label: "Tech Systems" },
          ].map(({ value, label }, i) => (
            <div 
              key={label} 
              className="relative flex flex-col items-center justify-center p-6 bg-[#E8E6E1] text-[#111018] shadow-[5px_8px_15px_rgba(0,0,0,0.3)]"
              style={{ 
                clipPath: "polygon(0 0, 100% 2%, 98% 100%, 2% 98%)",
                transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`
              }}
            >
              {/* Pin */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-600 shadow-sm" />
              
              <p className="text-4xl font-black mt-2 font-mono">
                {value}
              </p>
              <p className="text-xs font-mono font-bold uppercase tracking-widest mt-2 opacity-60 text-center">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}