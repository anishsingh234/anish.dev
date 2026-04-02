"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { EASE } from "../home/SharedComponents";

const navLinks = [
  { label: "Home",       href: "/"            },
  { label: "Projects",   href: "/projects"    },
  { label: "Experience", href: "/#experience" },
  { label: "About",      href: "/#about"      },
  { label: "Contact",    href: "/#contact"    },
];

const socialLinks = [
  { icon: Github,   href: "https://github.com/anishsingh234",          label: "github"   },
  { icon: Linkedin, href: "https://linkedin.com/in/anish-ai",           label: "linkedin" },
  { icon: Mail,     href: "mailto:anishsingh210204@gmail.com",          label: "email"    },
];

const techStack = ["next.js", "tailwind", "framer", "vercel"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] overflow-hidden bg-[#0E0B1A]">

      {/* ── Giant background name ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black text-white leading-none tracking-tight"
          style={{
            fontSize: "clamp(6rem, 22vw, 22rem)",
            letterSpacing: "-0.04em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
            lineHeight: 0.82,
          }}
        >
          ANISH
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-0">

        {/* ── Top row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-16"
        >
          {/* Branding */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-black text-white leading-none tracking-tight mb-2"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}>
                Anish Kumar Singh
              </p>
              <p className="text-[12px] font-mono text-white/68 tracking-widest uppercase">
                Full Stack Developer · AI Engineer
              </p>
            </div>
            <p className="text-[13px] text-white/58 leading-[1.75] max-w-[280px] font-light">
              Building production-grade systems at the intersection of LLMs,
              RAG, and scalable full-stack architecture.
            </p>
            {/* Availability */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-emerald-500/20 bg-emerald-500/[0.05] rounded-full w-fit">
              <span className="relative flex h-[6px] w-[6px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] text-emerald-400/80 tracking-widest uppercase">
                open_to_work · full-time roles
              </span>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-[9px] font-mono text-white/52 tracking-[0.25em] uppercase mb-5">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[13px] text-white/48 hover:text-white/70 transition-colors duration-200"
                  >
                    <span className="w-0 h-px bg-white/40 transition-all duration-200 group-hover:w-3 opacity-0 group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[9px] font-mono text-white/52 tracking-[0.25em] uppercase mb-5">
              Connect
            </p>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="group inline-flex items-center gap-3 text-white/68 hover:text-white/65 transition-colors w-fit"
                >
                  <Icon className="w-[13px] h-[13px]" />
                  <span className="font-mono text-[12px] tracking-widest">{label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-px bg-white/[0.06] mb-6" />

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6"
        >
          <p className="font-mono text-[11px] text-white/52 tracking-wide">
            © {year} Anish Kumar Singh. All rights reserved.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] text-white/68 tracking-wide">built with</span>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[9px] px-2 py-0.5 rounded-full border border-white/[0.07] text-white/58 tracking-widest"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Giant name spacer (keeps layout room) ── */}
        <div style={{ height: "clamp(5rem, 16vw, 16rem)" }} />
      </div>

      {/* ── Scroll to top ── */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        suppressHydrationWarning
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-9 h-9 rounded-full border border-white/[0.1] bg-[#0E0B1A]/80 hidden md:flex items-center justify-center text-white/68 hover:text-white/78 hover:border-white/25 transition-all backdrop-blur-sm"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  );
}