"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./SharedComponents";

const categories = [
  {
    id: "ai",
    label: "AI / ML",
    index: "01",
    description: "Agents, pipelines & intelligent systems at production scale.",
    skills: [
      { name: "LLMs",                tier: "Core"      },
      { name: "RAG Pipelines",       tier: "Core"      },
      { name: "Prompt Engineering",  tier: "Core"      },
      { name: "Tool Calling",        tier: "Core"      },
      { name: "LangChain",           tier: "Framework" },
      { name: "Vercel AI SDK",       tier: "SDK"       },
      { name: "CrewAI",              tier: "Framework" },
      { name: "Multi-Agent Systems", tier: "Emerging"  },
      { name: "Vector Databases",    tier: "Infra"     },
      { name: "Pinecone",            tier: "Infra"     },
      { name: "Hugging Face",        tier: "Platform"  },
      { name: "Ollama",              tier: "Local"     },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    index: "02",
    description: "Responsive, high-performance interfaces that feel great.",
    skills: [
      { name: "React.js",      tier: "Core"      },
      { name: "Next.js",       tier: "Framework" },
      { name: "Tailwind CSS",  tier: "Styling"   },
      { name: "Framer Motion", tier: "Animation" },
      { name: "TypeScript",    tier: "Language"  },
      { name: "React Native",  tier: "Mobile"    },
      { name: "Expo",          tier: "Mobile"    },
      { name: "Three.js",      tier: "3D"        },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    index: "03",
    description: "Scalable APIs & server-side systems built for AI integration.",
    skills: [
      { name: "Node.js",    tier: "Runtime"      },
      { name: "Express.js", tier: "Framework"    },
      { name: "FastAPI",    tier: "Framework"    },
      { name: "REST APIs",  tier: "Architecture" },
      { name: "GraphQL",    tier: "Query"        },
      { name: "WebSockets", tier: "Realtime"     },
    ],
  },
  {
    id: "data",
    label: "Data & DB",
    index: "04",
    description: "Efficient data modelling, storage & query optimization.",
    skills: [
      { name: "MongoDB",    tier: "NoSQL" },
      { name: "MySQL",      tier: "SQL"   },
      { name: "Prisma ORM", tier: "ORM"   },
      { name: "Supabase",   tier: "BaaS"  },
      { name: "Redis",      tier: "Cache" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    index: "05",
    description: "Strong fundamentals in algorithms, data structures & systems.",
    skills: [
      { name: "JavaScript", tier: "Primary" },
      { name: "TypeScript", tier: "Primary" },
      { name: "Python",     tier: "Primary" },
      { name: "C++",        tier: "DSA"     },
      { name: "SQL",        tier: "Query"   },
      { name: "HTML",       tier: "Markup"  },
      { name: "CSS",        tier: "Styling" },
      { name: "C",          tier: "Systems" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    index: "06",
    description: "Dev, deployment, and workflow tooling for shipping fast.",
    skills: [
      { name: "Git",        tier: "VCS"      },
      { name: "GitHub",     tier: "Platform" },
      { name: "Vercel",     tier: "Deploy"   },
      { name: "Postman",    tier: "API"      },
      { name: "Clerk Auth", tier: "Auth"     },
      { name: "VS Code",    tier: "Editor"   },
      { name: "Figma",      tier: "Design"   },
    ],
  },
];

const tierColor = {
  Core:         "text-purple-300/80  border-purple-400/20  bg-purple-500/[0.08]",
  Framework:    "text-blue-300/70    border-blue-400/20    bg-blue-500/[0.07]",
  SDK:          "text-blue-300/60    border-blue-400/15    bg-blue-500/[0.05]",
  Emerging:     "text-emerald-300/70 border-emerald-400/20 bg-emerald-500/[0.07]",
  Infra:        "text-amber-300/65   border-amber-400/18   bg-amber-500/[0.06]",
  Platform:     "text-white/45       border-white/10       bg-white/[0.04]",
  Local:        "text-white/35       border-white/08       bg-white/[0.03]",
  Primary:      "text-purple-300/75  border-purple-400/20  bg-purple-500/[0.08]",
  Language:     "text-blue-300/65    border-blue-400/18    bg-blue-500/[0.06]",
  Animation:    "text-pink-300/65    border-pink-400/18    bg-pink-500/[0.06]",
  Mobile:       "text-cyan-300/65    border-cyan-400/18    bg-cyan-500/[0.06]",
  "3D":         "text-white/40       border-white/10       bg-white/[0.04]",
  Runtime:      "text-emerald-300/65 border-emerald-400/18 bg-emerald-500/[0.06]",
  Architecture: "text-white/40       border-white/10       bg-white/[0.04]",
  Query:        "text-amber-300/65   border-amber-400/18   bg-amber-500/[0.06]",
  Realtime:     "text-cyan-300/60    border-cyan-400/15    bg-cyan-500/[0.05]",
  NoSQL:        "text-emerald-300/65 border-emerald-400/18 bg-emerald-500/[0.06]",
  SQL:          "text-blue-300/60    border-blue-400/15    bg-blue-500/[0.05]",
  ORM:          "text-white/40       border-white/10       bg-white/[0.04]",
  BaaS:         "text-emerald-300/60 border-emerald-400/15 bg-emerald-500/[0.05]",
  Cache:        "text-red-300/60     border-red-400/15     bg-red-500/[0.05]",
  DSA:          "text-amber-300/65   border-amber-400/18   bg-amber-500/[0.06]",
  Markup:       "text-white/35       border-white/08       bg-white/[0.03]",
  Styling:      "text-pink-300/60    border-pink-400/15    bg-pink-500/[0.05]",
  Systems:      "text-white/35       border-white/08       bg-white/[0.03]",
  VCS:          "text-orange-300/60  border-orange-400/15  bg-orange-500/[0.05]",
  Deploy:       "text-blue-300/65    border-blue-400/18    bg-blue-500/[0.06]",
  API:          "text-white/40       border-white/10       bg-white/[0.04]",
  Auth:         "text-purple-300/60  border-purple-400/15  bg-purple-500/[0.05]",
  Editor:       "text-white/35       border-white/08       bg-white/[0.03]",
  Design:       "text-pink-300/60    border-pink-400/15    bg-pink-500/[0.05]",
};

function SkillChip({ skill, i }) {
  const color = tierColor[skill.tier] ?? "text-white/35 border-white/08 bg-white/[0.03]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: i * 0.035, ease: "easeOut" }}
      className={`group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04] ${color}`}
    >
      <span className="text-[13px] font-medium text-white/70 group-hover:text-white transition-colors tracking-tight">
        {skill.name}
      </span>
      <span className="text-[9px] font-mono tracking-widest uppercase opacity-60 shrink-0">
        {skill.tier}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("ai");
  const current = categories.find((c) => c.id === active);

  return (
    <section
      id="skills"
      className="py-24 sm:py-32 scroll-mt-20 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-end justify-between mb-16 flex-wrap gap-6"
        >
          <div>
            <p className="text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase mb-4">
              ◆ &nbsp; Tech Stack
            </p>
            <h2
              className="font-black text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              Tools I
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)" }}
              >
                Architect With
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-8">
            {[
              { val: "40+", label: "Technologies" },
              { val: "12+", label: "Projects" },
              { val: "5+",  label: "AI Systems" },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-end">
                <span className="text-2xl font-black text-white/80 leading-none tracking-tight">
                  {val}
                </span>
                <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-0">

          {/* ── Left nav ── */}
          <div className="relative">
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-white/[0.07]" />

            {/* Mobile tabs */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none -mx-6 px-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-bold font-mono tracking-widest uppercase transition-all ${
                    active === cat.id
                      ? "bg-white text-[#080A10] border-white"
                      : "border-white/[0.1] text-white/35 hover:text-white/60"
                  }`}
                >
                  <span className="text-[9px] opacity-50">{cat.index}.</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex flex-col pr-8">
              {categories.map((cat) => {
                const isActive = active === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActive(cat.id)}
                    className={`group relative flex items-center gap-4 py-4 text-left w-full transition-colors duration-200 border-b border-white/[0.05] last:border-0 cursor-pointer`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        className="absolute right-[-33px] top-3 bottom-3 w-[2px] bg-white rounded-full"
                      />
                    )}
                    <span className={`text-[11px] font-mono shrink-0 transition-colors ${isActive ? "text-white/30" : "text-white/12 group-hover:text-white/22"}`}>
                      {cat.index}.
                    </span>
                    <span className={`text-[15px] font-bold transition-colors tracking-tight ${isActive ? "text-white" : "text-white/30 group-hover:text-white/55"}`}>
                      {cat.label}
                    </span>
                    <span className={`ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors ${isActive ? "text-white/50 border-white/20 bg-white/[0.06]" : "text-white/15 border-white/[0.06]"}`}>
                      {String(cat.skills.length).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ── Right panel ── */}
          <div className="lg:pl-12 pt-0 lg:pt-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {/* Panel header */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-[11px] font-mono text-white/15 tracking-widest">
                      _{current.index}.
                    </span>
                    <h3
                      className="font-black text-white leading-none tracking-tight"
                      style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.03em" }}
                    >
                      {current.label}
                    </h3>
                  </div>
                  <p className="text-[13px] text-white/35 leading-relaxed max-w-md font-light">
                    {current.description}
                  </p>
                </div>

                {/* Chip grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                  {current.skills.map((skill, i) => (
                    <SkillChip key={skill.name} skill={skill} i={i} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}