"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Search, X, Github, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

const EASE = [0.16, 1, 0.3, 1];

const navItems = [
  { label: "Home",        href: "/",             id: null        },
  { label: "Projects",    href: "/#projects",    id: "projects"  },
  { label: "Blog",        href: "/#blog",        id: "blog"      },
  { label: "Skills",      href: "/#skills",      id: "skills"    },
  { label: "Experience",  href: "/#experience",  id: "experience"},
  { label: "About",       href: "/#about",       id: "about"     },
  { label: "Why Hire Me", href: "/#why-hire-me", id: "why-hire-me"},
  { label: "Contact",     href: "/#contact",     id: "contact"   },
];

// ── Command Palette ───────────────────────────────────────────
function CommandPalette({ open, onClose, onNavigate }) {
  const [query, setQuery] = useState("");
  const filtered = navItems.filter((n) =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        open ? onClose() : null;
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] px-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Palette box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0D0F18] shadow-2xl overflow-hidden"
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.07]">
            <Search className="w-4 h-4 text-white/30 shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sections..."
              className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/25 outline-none font-mono tracking-wide"
            />
            <kbd className="text-[10px] font-mono text-white/20 border border-white/[0.08] rounded px-1.5 py-0.5">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="py-2 max-h-64 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-center text-sm text-white/25 py-6 font-mono">
                No results found
              </p>
            ) : (
              filtered.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => { onNavigate(item); onClose(); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors text-left group"
                >
                  <span className="text-[10px] font-mono text-white/20 w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-white/55 group-hover:text-white/85 transition-colors tracking-tight font-medium">
                    {item.label}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-white/15 ml-auto group-hover:text-white/40" />
                </button>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Live clock ────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    fmt();
    const t = setInterval(fmt, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-[10px] text-white/25 tracking-widest tabular-nums">
      {time}
    </span>
  );
}

// ── Main Navbar ───────────────────────────────────────────────
export default function Navbar() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  // ⌘K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Active section tracking
  useEffect(() => {
    if (!isHome) return;
    const ids = navItems.map((n) => n.id).filter(Boolean);
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const ob = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      ob.observe(el);
      return ob;
    });
    return () => observers.forEach((ob) => ob?.disconnect());
  }, [isHome]);

  // Lock scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavigate = (item) => {
    if (isHome && item.id) {
      const el = document.getElementById(item.id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (e, item) => {
    if (isHome && item.id) {
      e.preventDefault();
      setMobileOpen(false);
      setTimeout(() => {
        const el = document.getElementById(item.id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* ── DESKTOP: Left sidebar ── */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
        className="hidden lg:flex fixed top-0 left-0 h-screen w-[220px] z-[100] flex-col border-r border-white/[0.06] bg-[#080A10]/90 backdrop-blur-xl"
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/[0.06]">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <span className="text-[#080A10] font-black text-[11px] leading-none tracking-tight">AK</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-white/80 group-hover:text-white transition-colors leading-tight">
                Anish Kumar
              </span>
              <span className="text-[9px] font-mono text-white/25 tracking-wider">
                @portfolio
              </span>
            </div>
          </Link>
        </div>

        {/* Search / ⌘K */}
        <div className="px-4 py-3 border-b border-white/[0.06]">
          <button
            onClick={() => setPaletteOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all group"
          >
            <Search className="w-3.5 h-3.5 text-white/25 group-hover:text-white/45" />
            <span className="flex-1 text-left text-[11px] font-mono text-white/22 group-hover:text-white/40 tracking-wide">
              Search...
            </span>
            <kbd className="text-[9px] font-mono text-white/18 border border-white/[0.07] rounded px-1.5 py-0.5 tracking-wider">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto py-3">
          <p className="px-5 text-[9px] font-mono text-white/18 tracking-[0.25em] uppercase mb-2">
            Sections
          </p>
          <nav className="flex flex-col gap-0.5 px-2">
            {navItems.map((item) => {
              const isActive = item.id
                ? activeSection === item.id
                : pathname === "/" && !activeSection;
              return (
                <a
                  key={item.label}
                  href={isHome && item.id ? `#${item.id}` : item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-white/[0.06] text-white"
                      : "text-white/35 hover:text-white/70 hover:bg-white/[0.03]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-white rounded-full"
                    />
                  )}
                  <span className="text-[9px] font-mono text-white/15 w-4 shrink-0">
                    {String(navItems.indexOf(item) + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom: clock + links */}
        <div className="border-t border-white/[0.06] px-5 py-4 flex flex-col gap-3">
          {/* Clock */}
          <div className="flex items-center justify-between">
            <LiveClock />
            <div className="flex items-center gap-1.5 px-2 py-1 border border-emerald-500/20 bg-emerald-500/[0.06] rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[8px] font-mono text-emerald-400/75 tracking-widest uppercase">
                Open
              </span>
            </div>
          </div>

        
         {/* Links row: GitHub + Music + Resume Download */}
<div className="flex items-center gap-2">
  {/* GitHub */}
  <a
    href="https://github.com/anishsingh234"
    target="_blank"
    rel="noopener noreferrer"
    title="GitHub"
    className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.07] text-white/30 hover:text-white/65 hover:border-white/[0.18] transition-all"
  >
    <Github className="w-3.5 h-3.5" />
  </a>

  {/* Music */}
  <button
    title="Now Playing"
    className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.07] text-white/30 hover:text-white/65 hover:border-white/[0.18] transition-all"
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  </button>

  {/* Resume Download */}
  <a
    href="/resume.pdf"
    download="Anish_Kumar_Singh_Resume.pdf"
    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 border border-white/[0.08] rounded-lg text-[10px] font-mono text-white/30 hover:text-white/65 hover:border-white/[0.18] transition-all tracking-widest uppercase"
  >
    <Download className="w-3 h-3" />
    Resume
  </a>
</div>
        </div>
      </motion.aside>

      {/* ── MOBILE: Top bar ── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="lg:hidden fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 h-14 border-b border-white/[0.06] bg-[#080A10]/90 backdrop-blur-xl"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
            <span className="text-[#080A10] font-black text-[10px]">AK</span>
          </div>
          <span className="text-[13px] font-bold text-white/75">Anish Kumar</span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-white/[0.08] rounded-lg text-white/30 hover:text-white/60 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="text-[9px] font-mono tracking-wider">⌘K</kbd>
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.08] text-white/45 hover:text-white/70 transition-all"
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <rect width="14" height="1.5" rx="0.75" fill="currentColor"/>
              <rect y="4.25" width="10" height="1.5" rx="0.75" fill="currentColor"/>
              <rect y="8.5" width="14" height="1.5" rx="0.75" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </motion.header>

      {/* ── MOBILE: Bottom drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[160] bg-[#0D0F18] border-t border-white/[0.1] rounded-t-2xl overflow-hidden"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/[0.12]" />
              </div>

              {/* Header row */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                <p className="text-[9px] font-mono text-white/20 tracking-[0.3em] uppercase">
                  Navigation
                </p>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/[0.08] text-white/30 hover:text-white/60"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Nav items */}
              <div className="px-4 py-3 grid grid-cols-2 gap-1.5">
                {navItems.map((item, i) => {
                  const isActive = item.id ? activeSection === item.id : false;
                  return (
                    <motion.a
                      key={item.label}
                      href={isHome && item.id ? `#${item.id}` : item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.25 }}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[12px] font-medium transition-all ${
                        isActive
                          ? "border-white/20 bg-white/[0.06] text-white"
                          : "border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white/70"
                      }`}
                    >
                      <span className="text-[9px] font-mono text-white/15">
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      {item.label}
                    </motion.a>
                  );
                })}
              </div>

              {/* Bottom row */}
              <div className="px-5 py-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400/70 tracking-widest uppercase">
                    Open to work
                  </span>
                </div>
                <LiveClock />
              </div>

              {/* Safe area spacer */}
              <div className="h-6" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Desktop content offset */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          main, #__next > div > main {
            margin-left: 220px;
          }
        }
      `}</style>
    </>
  );
}