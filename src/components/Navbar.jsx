"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, X, Github, ArrowUpRight, Mail, Download } from "lucide-react";

/* ─── NAV DATA ────────────────────────────────────────────────────────────── */
const navItems = [
  { label: "Home",        href: "/",            id: null          },
  { label: "Projects",    href: "/#projects",   id: "projects"    },
  { label: "Why Hire Me", href: "/#why-hire-me", id: "why-hire-me" },
  { label: "Skills",      href: "/#skills",     id: "skills"      },
  { label: "Experience",  href: "/#experience", id: "experience"  },
  { label: "About",       href: "/#about",      id: "about"       },
  { label: "Contact",     href: "/#contact",    id: "contact"     },
];

/* ─── LIVE CLOCK (TYPEWRITER STYLE) ───────────────────────────────────────── */
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
    <span className="font-mono text-sm text-[#111018] font-bold tracking-[0.2em] tabular-nums">
      {time}
    </span>
  );
}

/* ─── DESKTOP NAV (TORN PARCHMENT STRIP) ──────────────────────────────────────── */
function TornStripNav({ activeSection, pathname, onSearchOpen }) {
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection to float down slightly or add shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="hidden lg:flex fixed top-0 left-1/2 -translate-x-1/2 z-[100] font-sans items-center"
      style={{ transform: `translateX(-50%) translateY(${scrolled ? 10 : 20}px)`, transition: "transform 0.4s ease" }}
    >
      {/* Tape holding it up */}
      <div className="absolute -top-3 left-10 w-12 h-6 bg-white/40 rotate-[-15deg] shadow-sm pointer-events-none z-10" />
      <div className="absolute -top-4 right-10 w-16 h-6 bg-white/30 rotate-[8deg] shadow-sm pointer-events-none z-10" />

      {/* The Torn Strip Background */}
      <div 
        className="relative flex items-center gap-1 sm:gap-2 px-6 py-4 bg-[#E8E6E1] text-[#111018] shadow-[8px_12px_0_rgba(0,0,0,0.8)] border border-[#111018]/10"
        style={{ 
          // Super jagged edges simulating a torn strip of paper
          clipPath: "polygon(1% 4%, 4% 1%, 8% 3%, 12% 0%, 15% 4%, 20% 1%, 25% 3%, 30% 0%, 35% 4%, 40% 1%, 45% 3%, 50% 0%, 55% 4%, 60% 1%, 65% 3%, 70% 0%, 75% 4%, 80% 1%, 85% 3%, 90% 0%, 95% 4%, 98% 1%, 100% 5%, 98% 95%, 95% 98%, 90% 96%, 85% 99%, 80% 96%, 75% 99%, 70% 96%, 65% 99%, 60% 96%, 55% 99%, 50% 96%, 45% 99%, 40% 96%, 35% 99%, 30% 96%, 25% 99%, 20% 96%, 15% 99%, 12% 96%, 8% 99%, 4% 96%, 0% 98%)"
        }}
      >
        {/* Brand */}
        <Link href="/" className="mr-6 group">
          <span className="font-black text-2xl tracking-tighter bg-[#111018] text-[#E8E6E1] px-3 py-1.5 rotate-[-2deg] inline-block shadow-[2px_3px_0_rgba(0,0,0,0.5)] group-hover:rotate-0 transition-transform">
            AK.
          </span>
        </Link>

        {/* Links */}
        {navItems.slice(1, 8).map((item) => {
          const isActive = item.id ? activeSection === item.id : isHome && !activeSection;
          
          return (
            <Link key={item.label} href={item.href} className="relative group px-4 py-2 cursor-pointer">
              <span className="relative z-10 font-mono text-xs sm:text-[13px] font-bold uppercase tracking-widest text-[#111018] group-hover:text-red-600 transition-colors">
                {item.label}
              </span>
              
              {/* Sharpie marker underline for active state */}
              {isActive && (
                <div className="absolute -bottom-0.5 left-0 w-full h-[4px] bg-red-600 rotate-[-2deg] opacity-80" />
              )}
            </Link>
          );
        })}

        {/* Search Tab */}
        <button onClick={onSearchOpen} className="group flex items-center gap-2 ml-4 px-4 py-2 border-l-2 border-black/20 pl-8">
          <Search className="w-4 h-4 text-[#111018] group-hover:text-red-600 transition-colors" />
          <kbd className="text-[11px] font-mono font-bold tracking-widest bg-black/10 px-2 py-0.5 border border-black/20">⌘K</kbd>
        </button>

        {/* Clock Tab */}
        <div className="ml-2 pointer-events-none px-4 py-2 border-l-2 border-black/20 pl-8">
          <LiveClock />
        </div>
      </div>
    </nav>
  );
}


/* ─── COMMAND PALETTE (ARCHIVE CARD) ──────────────────────────────────────── */
function ArchiveSearch({ open, onClose, onNavigate }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const filtered = navItems.filter((n) =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4 font-sans"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#111018]/80 backdrop-blur-sm" />
      
      {/* Giant Paper Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#E8E6E1] text-[#111018] shadow-[15px_20px_40px_rgba(0,0,0,0.6)]"
        style={{ 
          clipPath: "polygon(1% 0, 99% 1%, 100% 99%, 0 100%)",
        }}
      >
        {/* Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/50 backdrop-blur-sm rotate-[2deg] shadow-sm" />
        
        {/* Header/Input */}
        <div className="p-8 border-b-4 border-black/20">
          <p className="font-mono text-xs text-red-600 font-bold tracking-widest uppercase mb-4 border-b-2 border-red-600 pb-1 inline-block">
            ARCHIVE SEARCH DIRECTORY
          </p>
          <div className="flex items-center gap-4 bg-white/50 px-4 py-3 border-2 border-black/80 shadow-[inset_2px_4px_6px_rgba(0,0,0,0.1)]">
            <Search className="w-6 h-6 text-black/40" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="TYPE DESTINATION..."
              className="flex-1 bg-transparent text-xl font-bold font-mono text-[#111018] placeholder:text-[#111018]/30 outline-none uppercase tracking-wide"
            />
            <kbd className="text-xs font-mono font-bold bg-[#111018] text-white px-2 py-1">ESC</kbd>
          </div>
        </div>

        {/* Results */}
        <div className="py-4 px-4 max-h-96 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-[#111018]/40 py-10 font-mono font-bold uppercase tracking-widest">
              NO RECORDS FOUND.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => {
                    onNavigate(item);
                    onClose();
                  }}
                  className="group relative flex items-center justify-between p-4 bg-white/40 border-2 border-black/10 hover:border-black/50 transition-colors text-left"
                  style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0 98%)" }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-[#111018]/40 font-bold tabular-nums">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span className="font-bold text-lg text-[#111018] uppercase tracking-wide group-hover:translate-x-2 transition-transform">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-black/30 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


/* ─── MOBILE NAV (THE UNFOLDING MAP) ──────────────────────────────────────── */
function MobileNav({ open, onClose, onMenuOpen, activeSection, onSearchOpen }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Mobile Trigger Button (Glued to top right) */}
      <button
        onClick={() => open ? onClose() : null}
        className={`lg:hidden fixed top-4 right-4 z-[160] w-14 h-14 flex items-center justify-center bg-[#111018] text-white shadow-lg transition-transform ${!open && 'hidden'}`}
        style={{ clipPath: "polygon(10% 0, 100% 10%, 90% 100%, 0 90%)" }}
      >
        <X className="w-8 h-8" />
      </button>

      <button
        onClick={() => !open ? onMenuOpen() : null}
        className={`lg:hidden fixed top-4 right-4 z-[140] w-14 h-14 flex items-center justify-center bg-purple-600 text-white shadow-lg transition-transform ${open ? 'hidden' : ''}`}
        style={{ clipPath: "polygon(0 10%, 90% 0, 100% 90%, 10% 100%)" }}
      >
        <div className="flex flex-col gap-[6px]">
          <span className="block w-6 h-1 bg-white" />
          <span className="block w-4 h-1 bg-white" />
          <span className="block w-6 h-1 bg-white" />
        </div>
      </button>

      <button
        onClick={() => {
          onClose();
          setTimeout(onSearchOpen, 500);
        }}
        className={`lg:hidden fixed top-4 right-20 z-[140] w-14 h-14 flex items-center justify-center bg-[#E8E6E1] text-[#111018] shadow-lg transition-transform ${open && 'hidden'}`}
        style={{ clipPath: "polygon(5% 0, 95% 5%, 100% 95%, 0 100%)" }}
      >
        <Search className="w-6 h-6" />
      </button>


      {/* Container overlay */}
      {open && (
        <div 
          className="lg:hidden fixed inset-0 bg-[#0A0812]/90 flex flex-col pt-10 px-4 z-[150]"
        >
          <div className="h-full overflow-y-auto pb-20">
            
            {/* Flap 1 (Top) */}
            <div className="w-full bg-[#E8E6E1] text-[#111018] p-6 shadow-xl mb-[-2px] border-b-2 border-black/20" style={{ clipPath: "polygon(1% 0, 99% 0, 100% 100%, 0 100%)" }}>
              <p className="font-mono text-xs font-bold text-red-600 tracking-widest uppercase mb-6">Directory</p>
              <div className="flex flex-col gap-4">
                {navItems.slice(0, 4).map((item) => (
                  <Link key={item.label} href={item.href} onClick={onClose} className="text-3xl font-black uppercase tracking-tighter">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Flap 2 (Middle) */}
            <div className="w-full bg-[#D3D1C8] text-[#111018] p-6 shadow-xl mb-[-2px] border-b-2 border-black/20" style={{ clipPath: "polygon(0 0, 100% 0, 99% 100%, 1% 100%)" }}>
              <div className="flex flex-col gap-4">
                {navItems.slice(4).map((item) => (
                  <Link key={item.label} href={item.href} onClick={onClose} className="text-3xl font-black uppercase tracking-tighter">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Flap 3 (Bottom) */}
            <div className="w-full bg-[#232132] text-white p-6 shadow-xl pb-10" style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)" }}>
               <p className="font-mono text-xs font-bold text-emerald-400 tracking-widest uppercase mb-6">Network</p>
               <div className="flex flex-col gap-4">
                 <a href="https://github.com/anishsingh234" className="flex items-center gap-4 text-xl font-bold uppercase"><Github/> Github</a>
                 <a href="https://linkedin.com/in/anish-ai" className="flex items-center gap-4 text-xl font-bold uppercase"><ArrowUpRight/> LinkedIn</a>
                 <a href="mailto:contact@anish.dev" className="flex items-center gap-4 text-xl font-bold uppercase"><Mail/> Email</a>
                 <a href="/resume.pdf" className="flex items-center gap-4 text-xl font-bold uppercase text-purple-400 mt-4"><Download/> Resume</a>
               </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}


/* ─── MAIN NAVBAR EXPORT ──────────────────────────────────────────────────── */
export default function Navbar() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const isAnimations = pathname === "/animations";

  // Cmd+K shortcut
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // Section observer
  useEffect(() => {
    if (!isHome) return;
    const ids = navItems.map((n) => n.id).filter(Boolean);
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const ob = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      ob.observe(el);
      return ob;
    });
    return () => observers.forEach((ob) => ob?.disconnect());
  }, [isHome]);

  return (
    <>
      {/* Hide nav chrome on pages with their own navigation (e.g. Animation Studio) */}
      {!isAnimations && (
        <>
          {/* Desktop — Torn Strip */}
          <TornStripNav
            activeSection={activeSection}
            pathname={pathname}
            onSearchOpen={() => setPaletteOpen(true)}
          />

          {/* Mobile — Unfolding Map */}
          <MobileNav
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            onMenuOpen={() => setMobileOpen(true)}
            activeSection={activeSection}
            onSearchOpen={() => setPaletteOpen(true)}
          />
        </>
      )}

      {/* Command palette — The Archive Card */}
      <ArchiveSearch
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={(item) => router.push(item.href)}
      />
    </>
  );
}