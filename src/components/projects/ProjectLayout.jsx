"use client";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

// ── Status badge ─────────────────────────────────────────────────────────
const STATUS_CFG = {
  completed: {
    cls: "bg-emerald-500 text-white",
    label: "CLOSED",
  },
  "always working": {
    cls: "bg-amber-500 text-black",
    label: "ACTIVE",
  },
  "in progress": {
    cls: "bg-blue-600 text-white",
    label: "IN PROGRESS",
  },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CFG[status?.toLowerCase()] ?? {
    cls: "bg-[#111018] text-white",
    label: status,
  };
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase shadow-sm transform -rotate-2 ${cfg.cls}`}
      style={{ clipPath: "polygon(5% 0, 100% 5%, 95% 100%, 0 95%)" }}
    >
      {cfg.label}
    </div>
  );
};

// ── Card ────────────────────────────────────────────────────────────────
const ProjectLayout = ({
  name,
  tag,
  featured,
  description,
  bullets,
  status,
  techStack = [],
  GithubLink,
  demoLink,
}) => {
  return (
    <div className="relative group h-full flex flex-col">
      {/* ── Case File Folder Base ── */}
      <div 
        className="relative flex flex-col h-full bg-[#E8E6E1] text-[#111018] p-6 sm:p-8 shadow-[8px_12px_20px_rgba(0,0,0,0.5)] border-t-8 border-t-[#232132] transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[12px_18px_30px_rgba(0,0,0,0.6)]"
        style={{ clipPath: "polygon(0 0, 100% 1%, 99% 100%, 1% 99%)" }}
      >
        
        {/* Tape at top */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 rotate-[-3deg] shadow-sm pointer-events-none" />

        {/* ─ Header: tag + Featured badge ─ */}
        <div className="flex items-start justify-between gap-3 mb-6 relative z-10">
          <div className="min-w-0">
            {tag && (
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-red-600 mb-2 border-b-2 border-red-600/30 inline-block pb-1">
                {tag}
              </p>
            )}
            {/* Title */}
            <h3 className="text-2xl font-black uppercase tracking-tight leading-none mt-1">
              {name}
            </h3>
          </div>

          {/* Featured Stamp */}
          {featured && (
            <div className="absolute top-2 right-0 opacity-40 transform rotate-12 pointer-events-none select-none border-4 border-red-600 text-red-600 font-bold uppercase tracking-widest p-1 text-sm font-mono">
              PRIORITY
            </div>
          )}
        </div>

        {/* ─ Status ─ */}
        <div className="mb-6">
          <StatusBadge status={status} />
        </div>

        {/* ─ Description ─ */}
        <div className="p-4 bg-white/50 border border-black/10 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.05)] mb-6 font-serif italic text-sm leading-relaxed text-[#111018]/80">
          "{description}"
        </div>

        {/* ─ Bullet points ─ */}
        {bullets && bullets.length > 0 && (
          <ul className="space-y-3 mb-8">
            {bullets.slice(0, 4).map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-[#111018]/90 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-purple-700 mt-[2px] shrink-0" />
                <span className="leading-snug">{b}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex-1" />

        {/* ─ Tech badges (Typewriter stamped) ─ */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest mr-1 mt-1 text-[#111018]/50">Tech:</span>
            {techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#111018] text-white border border-[#111018]"
                style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0 98%)" }}
              >
                {tech}
              </span>
            ))}
            {techStack.length > 5 && (
              <span className="px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-transparent border border-[#111018]/30 text-[#111018]">
                +{techStack.length - 5}
              </span>
            )}
          </div>
        )}

        {/* ─ Action buttons ─ */}
        {(demoLink || GithubLink) && (
          <div className="flex gap-4 pt-6 border-t-2 border-black/10">
            {/* Live Demo — physical stamp button */}
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 group/btn flex items-center justify-center gap-2 px-4 py-3 bg-purple-700 text-white font-mono text-[11px] font-bold uppercase tracking-widest shadow-[4px_6px_0_#111018] hover:translate-y-1 hover:shadow-[2px_3px_0_#111018] transition-all"
                style={{ clipPath: "polygon(2% 0, 98% 2%, 100% 98%, 0 100%)" }}
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>Launch</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            )}

            {/* GitHub — stark outline button */}
            {GithubLink && (
              <a
                href={GithubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`group/gh flex items-center justify-center gap-2 px-4 py-3 bg-transparent border-2 border-[#111018] text-[#111018] font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-[#111018] hover:text-white transition-colors ${
                  demoLink ? "" : "flex-1"
                }`}
                style={{ clipPath: "polygon(0 2%, 100% 0, 98% 100%, 2% 98%)" }}
              >
                <Github className="w-4 h-4 shrink-0 group-hover/gh:scale-110 transition-transform" />
                <span>Source</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectLayout;
