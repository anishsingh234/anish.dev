"use client";
import { motion, AnimatePresence } from "framer-motion";
import ProjectLayout from "./ProjectLayout";
import { useState, useMemo } from "react";
import { Sparkles } from "lucide-react";

// ── Animation variants ────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1];

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

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

// ── Component ─────────────────────────────────────────────────────────────────
const ProjectList = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState("all");

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

  return (
    <div className="w-full">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-24 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="max-w-2xl mx-auto"
        >
          {/* Label pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[11px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Portfolio Showcase
          </div>

          {/* Title */}
          <h1 className="text-4xl xs:text-5xl sm:text-6xl font-extrabold mb-4 leading-[1.05] tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Selected
            </span>{" "}
            <span className="text-white">Work</span>
          </h1>

          <p className="text-base text-white/45 max-w-lg mx-auto leading-relaxed">
            Production-grade AI systems, full-stack platforms, and open-source
            tools — built to ship and scale.
          </p>
        </motion.div>
      </section>

      {/* ── Filter tabs ───────────────────────────────────────────────────── */}
      <section className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {FILTERS.map(({ label, value }) => {
            const isActive = activeFilter === value;
            return (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-[0_0_22px_rgba(139,92,246,0.45)]"
                    : "text-white/50 bg-white/[0.04] border border-white/10 hover:text-white/80 hover:bg-white/[0.07] hover:border-white/20"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-active"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">
                  {label}
                  <span className={`ml-1.5 text-[11px] ${ isActive ? "opacity-70" : "opacity-40" }`}>
                    ({counts[value] ?? 0})
                  </span>
                </span>
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* ── Projects grid ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={gridVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <ProjectLayout key={project.id} {...project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-white/30 text-lg"
          >
            No projects in this category.
          </motion.p>
        )}
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.06]"
        >
          {[
            { value: projects.length, label: "Total Projects" },
            { value: projects.filter((p) => p.status?.toLowerCase() === "completed").length, label: "Completed" },
            { value: projects.filter((p) => p.featured).length, label: "Featured" },
            { value: new Set(projects.flatMap((p) => p.techStack || [])).size, label: "Technologies" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center justify-center py-6 bg-[#0a0a0f]">
              <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {value}
              </p>
              <p className="text-[11px] text-white/35 mt-1 font-medium tracking-wide">{label}</p>
            </div>
          ))}
        </motion.div>
      </section>

    </div>
  );
};


export default ProjectList;