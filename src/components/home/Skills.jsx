"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─── Paste or import your EASE constant ───────────────────────────────────────
const EASE = [0.25, 0.1, 0.25, 1];

// ─── Devicon CDN icon classes ─────────────────────────────────────────────────
const GROUPS = [
  {
    cmd: "skills --category ai",
    label: "AI / ML",
    comment: "## Primary Specialization ──────────────────────────────",
    rows: [
      {
        hi: true,
        skills: [
          { name: "LLMs",              icon: "devicon-jupyter-plain"        },
          { name: "RAG Pipelines",     icon: "devicon-azure-plain"          },
          { name: "Prompt Engineering",icon: "devicon-bash-plain"           },
          { name: "Tool Calling",      icon: "devicon-python-plain"         },
        ],
      },
      {
        hi: true,
        skills: [
          { name: "LangChain",         icon: "devicon-python-plain"         },
          { name: "CrewAI",            icon: "devicon-python-plain"         },
          { name: "Multi-Agent",       icon: "devicon-kubernetes-plain"     },
          { name: "Vercel AI SDK",     icon: "devicon-vercel-plain"         },
        ],
      },
      {
        hi: false,
        skills: [
          { name: "Pinecone",          icon: "devicon-postgresql-plain"     },
          { name: "Hugging Face",      icon: "devicon-python-plain"         },
          { name: "Ollama",            icon: "devicon-linux-plain"          },
        ],
      },
    ],
    accent: "purple",
  },
  {
    cmd: "skills --category frontend",
    label: "Frontend",
    comment: "## Frontend ────────────────────────────────────────────",
    rows: [
      {
        hi: true,
        skills: [
          { name: "React.js",          icon: "devicon-react-original"       },
          { name: "Next.js",           icon: "devicon-nextjs-plain"         },
          { name: "Tailwind CSS",      icon: "devicon-tailwindcss-plain"    },
          { name: "TypeScript",        icon: "devicon-typescript-plain"     },
        ],
      },
      {
        hi: false,
        skills: [
          { name: "Framer Motion",     icon: "devicon-figma-plain"          },
          { name: "React Native",      icon: "devicon-react-original"       },
          { name: "Expo",              icon: "devicon-androidstudio-plain"  },
          { name: "Three.js",          icon: "devicon-threejs-original"     },
        ],
      },
    ],
    accent: "blue",
  },
  {
    cmd: "skills --category backend",
    label: "Backend",
    comment: "## Backend ─────────────────────────────────────────────",
    rows: [
      {
        hi: true,
        skills: [
          { name: "Node.js",           icon: "devicon-nodejs-plain"         },
          { name: "Express.js",        icon: "devicon-express-original"     },
          { name: "FastAPI",           icon: "devicon-fastapi-plain"        },
          { name: "REST APIs",         icon: "devicon-swagger-plain"        },
        ],
      },
      {
        hi: false,
        skills: [
          { name: "GraphQL",           icon: "devicon-graphql-plain"        },
          { name: "WebSockets",        icon: "devicon-nodejs-plain"         },
        ],
      },
    ],
    accent: "green",
  },
  {
    cmd: "skills --category database",
    label: "Database",
    comment: "## Database ────────────────────────────────────────────",
    rows: [
      {
        hi: true,
        skills: [
          { name: "MongoDB",           icon: "devicon-mongodb-plain"        },
          { name: "Prisma ORM",        icon: "devicon-prisma-original"      },
          { name: "MySQL",             icon: "devicon-mysql-plain"          },
          { name: "Supabase",          icon: "devicon-supabase-plain"       },
          { name: "Redis",             icon: "devicon-redis-plain"          },
        ],
      },
    ],
    accent: "green",
  },
  {
    cmd: "skills --category languages",
    label: "Languages",
    comment: "## Languages ───────────────────────────────────────────",
    rows: [
      {
        hi: true,
        skills: [
          { name: "JavaScript",        icon: "devicon-javascript-plain"     },
          { name: "TypeScript",        icon: "devicon-typescript-plain"     },
          { name: "Python",            icon: "devicon-python-plain"         },
        ],
      },
      {
        hi: false,
        skills: [
          { name: "C++",               icon: "devicon-cplusplus-plain"      },
          { name: "SQL",               icon: "devicon-azuresqldatabase-plain"},
          { name: "HTML",              icon: "devicon-html5-plain"          },
          { name: "CSS",               icon: "devicon-css3-plain"           },
          { name: "C",                 icon: "devicon-c-plain"              },
        ],
      },
    ],
    accent: "purple",
  },
  {
    cmd: "skills --category tools",
    label: "Tools",
    comment: "## Tools & Platforms ───────────────────────────────────",
    rows: [
      {
        hi: true,
        skills: [
          { name: "Git",               icon: "devicon-git-plain"            },
          { name: "GitHub",            icon: "devicon-github-original"      },
          { name: "Vercel",            icon: "devicon-vercel-plain"         },
          { name: "VS Code",           icon: "devicon-vscode-plain"         },
        ],
      },
      {
        hi: false,
        skills: [
          { name: "Postman",           icon: "devicon-postman-plain"        },
          { name: "Clerk Auth",        icon: "devicon-nodejs-plain"         },
          { name: "Figma",             icon: "devicon-figma-plain"          },
        ],
      },
    ],
    accent: "blue",
  },
];

// ─── Accent colour maps ───────────────────────────────────────────────────────
const ACCENT = {
  purple: {
    hi:     "text-purple-300/90",
    lo:     "text-purple-200/45",
    hiIcon: "text-purple-300/85",
    loIcon: "text-purple-300/40",
  },
  blue: {
    hi:     "text-blue-300/90",
    lo:     "text-blue-200/45",
    hiIcon: "text-blue-300/85",
    loIcon: "text-blue-300/40",
  },
  green: {
    hi:     "text-emerald-300/85",
    lo:     "text-emerald-200/45",
    hiIcon: "text-emerald-300/80",
    loIcon: "text-emerald-300/40",
  },
};

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text, speed = 22, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone]           = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!text) return;
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, speed, delay]);

  return { displayed, done };
}

// ─── Single group block ───────────────────────────────────────────────────────
function GroupBlock({ group, show }) {
  const { displayed: typedCmd, done: cmdDone } = useTypewriter(
    show ? `$ ${group.cmd}` : "",
    22,
    80
  );
  const colors = ACCENT[group.accent];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      className="mb-1"
    >
      {/* Prompt line */}
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span className="font-mono text-[12px] text-purple-400/70">anish</span>
        <span className="font-mono text-[12px] text-white/58">@portfolio</span>
        <span className="font-mono text-[12px] text-white/75">{typedCmd}</span>
        {!cmdDone && show && (
          <span className="inline-block w-[7px] h-[13px] bg-purple-400/60 animate-pulse" />
        )}
      </div>

      {/* Output */}
      {cmdDone && (
        <motion.div
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="pl-4 border-l border-white/[0.05] ml-1 mb-4"
        >
          <p className="font-mono text-[10px] text-white/68 mb-2 leading-relaxed tracking-wide">
            {group.comment}
          </p>

          {group.rows.map((row, ri) => (
            <div key={ri} className="flex flex-wrap gap-x-5 gap-y-2 mb-2">
              {row.skills.map((skill, si) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: ri * 0.07 + si * 0.035, duration: 0.25 }}
                  className={`flex items-center gap-1.5 cursor-default select-none transition-all duration-150 hover:brightness-125 ${
                    row.hi ? colors.hi : colors.lo
                  }`}
                >
                  {/* Devicon */}
                  <i
                    className={`${skill.icon} text-[15px] leading-none ${
                      row.hi ? colors.hiIcon : colors.loIcon
                    }`}
                  />
                  <span className="font-mono text-[12px] sm:text-[13px] font-medium">
                    {skill.name}
                  </span>
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Skills() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [started,      setStarted]      = useState(false);
  const sectionRef = useRef(null);

  // Trigger on scroll-into-view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  // Stagger groups
  useEffect(() => {
    if (!started || visibleCount >= GROUPS.length) return;
    const timer = setTimeout(
      () => setVisibleCount((v) => v + 1),
      visibleCount === 0 ? 500 : 950
    );
    return () => clearTimeout(timer);
  }, [started, visibleCount]);

  return (
    <>
      {/* ── Devicon CDN ── */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />

      <section
        id="skills"
        ref={sectionRef}
        className="py-24 sm:py-32 scroll-mt-20 border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-end justify-between mb-14 flex-wrap gap-6"
          >
            <div>
              <p className="text-[10px] font-mono text-white/58 tracking-[0.3em] uppercase mb-4">
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
                  style={{ WebkitTextStroke: "1.5px rgba(167,139,250,0.45)" }}
                >
                  Architect With
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-8">
              {[
                { val: "40+",  label: "Technologies" },
                { val: "350+", label: "DSA Solved"   },
                { val: "5+",   label: "AI Systems"   },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-end">
                  <span className="text-2xl font-black text-white/75 leading-none tracking-tight">
                    {val}
                  </span>
                  <span className="text-[9px] font-mono text-white/58 tracking-widest uppercase mt-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Terminal ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="rounded-2xl border border-white/[0.08] overflow-hidden"
            style={{ background: "#0E0B1A", boxShadow: "0 40px 80px rgba(0,0,0,0.55)" }}
          >
            {/* Title bar */}
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/55"    />
                <div className="w-3 h-3 rounded-full bg-yellow-500/55" />
                <div className="w-3 h-3 rounded-full bg-green-500/55"  />
              </div>
              <span className="font-mono text-[11px] text-white/52 tracking-widest">
                anish@portfolio — skills
              </span>
              <div className="w-16" />
            </div>

            {/* Body */}
            <div className="px-6 py-7 sm:px-8">

              {/* Welcome banner */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: started ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="mb-5"
              >
                <p className="font-mono text-[11px] text-white/52 leading-relaxed">
                  Welcome. Type{" "}
                  <span className="text-purple-400/50">skills --help</span>{" "}
                  for all commands.
                </p>
                <p className="font-mono text-[10px] text-white/[0.12] mt-1 tracking-wider">
                  ────────────────────────────────────────────────────
                </p>
              </motion.div>

              {/* List-all command */}
              {started && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-5"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[12px] text-purple-400/70">anish</span>
                    <span className="font-mono text-[12px] text-white/58">@portfolio</span>
                    <span className="font-mono text-[12px] text-white/75">$ skills --list --all</span>
                  </div>
                  <p className="font-mono text-[10px] text-white/52 pl-4 border-l border-white/[0.05] ml-1 mt-1 mb-4">
                    Listing all skill categories...
                  </p>
                </motion.div>
              )}

              {/* Groups */}
              {GROUPS.map((group, i) => (
                <GroupBlock
                  key={group.cmd}
                  group={group}
                  show={started && visibleCount > i}
                />
              ))}

              {/* Final blinking cursor */}
              {visibleCount >= GROUPS.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 mt-2 pt-3 border-t border-white/[0.05]"
                >
                  <span className="font-mono text-[12px] text-purple-400/70">anish</span>
                  <span className="font-mono text-[12px] text-white/58">@portfolio</span>
                  <span className="inline-block w-[7px] h-[13px] bg-purple-400/55 animate-pulse ml-0.5" />
                </motion.div>
              )}

            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}