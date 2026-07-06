"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
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
  { label: "Animations",  href: "/animations",  id: "animations"  },
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
    <span className="font-mono text-xs text-[#111018] font-bold tracking-[0.2em] tabular-nums">
      {time}
    </span>
  );
}

/* ─── DESKTOP TABS (DOSSIER FOLDERS) ──────────────────────────────────────── */
function DossierTabs({ activeSection, pathname, onSearchOpen }) {
  const navRef = useRef(null);
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection to collapse or shrink tabs slightly
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: scrolled ? -10 : 0,
      duration: 0.4,
      ease: "power2.out"
    });
  }, [scrolled]);

  return (
    <nav
      ref={navRef}
      className="hidden lg:flex fixed top-0 left-1/2 -translate-x-1/2 z-[100] items-end justify-center gap-1 font-sans"
    >
      {/* Brand Tab */}
      <Link href="/" className="relative group flex items-end">
        <div 
          className="bg-[#111018] text-white px-4 pt-3 pb-2 transition-transform duration-300 group-hover:translate-y-2"
          style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)" }}
        >
          <span className="font-black text-lg tracking-tighter">AK.</span>
        </div>
      </Link>

      {/* Nav Tabs */}
      {navItems.slice(0, 8).map((item, i) => {
        const isActive = item.id ? activeSection === item.id : isHome && !activeSection;
        // Alternate colors for tabs
        const bgColors = ["bg-[#E8E6E1]", "bg-[#D3D1C8]", "bg-[#C4C2B9]"];
        const bgColor = isActive ? "bg-purple-600 text-white" : `${bgColors[i % 3]} text-[#111018]`;
        
        return (
          <Link key={item.label} href={item.href} className="relative group flex items-end cursor-pointer">
            <div 
              className={`${bgColor} px-5 pt-3 pb-2 transition-transform duration-300 transform group-hover:translate-y-2 shadow-sm font-mono text-xs font-bold uppercase tracking-wider`}
              style={{ clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0 100%)" }}
            >
              {item.label}
              
              {isActive && (
                <div className="absolute bottom-1 left-2 w-[calc(100%-16px)] h-[3px] bg-red-500 transform rotate-[-2deg]" />
              )}
            </div>
          </Link>
        );
      })}

      {/* Search Tab */}
      <button onClick={onSearchOpen} className="relative group flex items-end ml-4">
        <div 
          className="bg-[#232132] text-white px-4 pt-3 pb-2 transition-transform duration-300 group-hover:translate-y-2 flex items-center gap-2"
          style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)" }}
        >
          <Search className="w-4 h-4" />
          <kbd className="text-[10px] font-mono tracking-widest border border-white/20 px-1 py-0.5">⌘K</kbd>
        </div>
      </button>

      {/* Clock Tab */}
      <div className="relative group flex items-end ml-4 pointer-events-none">
        <div 
          className="bg-white px-4 pt-3 pb-2"
          style={{ clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0 100%)" }}
        >
          <LiveClock />
        </div>
      </div>
    </nav>
  );
}


/* ─── COMMAND PALETTE (ARCHIVE CARD) ──────────────────────────────────────── */
function ArchiveSearch({ open, onClose, onNavigate }) {
  const [query, setQuery] = useState("");
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const inputRef = useRef(null);
  const itemsRef = useRef([]);

  const filtered = navItems.filter((n) =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    // Drop down physics like a giant physical card
    gsap.set(cardRef.current, { transformPerspective: 1200 });
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
      .fromTo(
        cardRef.current,
        { rotationX: -90, transformOrigin: "top center", opacity: 0 },
        { rotationX: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.15"
      );
    setTimeout(() => inputRef.current?.focus(), 100);

    return () => tl.kill();
  }, [open]);

  // Stagger items
  useEffect(() => {
    if (!open) return;
    const items = itemsRef.current.filter(Boolean);
    gsap.fromTo(
      items,
      { opacity: 0, x: -20, rotationZ: () => Math.random() * 4 - 2 },
      { opacity: 1, x: 0, rotationZ: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, [filtered.length, open]);

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

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(cardRef.current, { rotationX: -90, transformOrigin: "top center", opacity: 0, duration: 0.4, ease: "power2.in" })
      .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4 font-sans"
      onClick={handleClose}
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[#111018]/80 backdrop-blur-sm" />
      
      {/* Giant Paper Card */}
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#E8E6E1] text-[#111018] shadow-[15px_20px_40px_rgba(0,0,0,0.6)]"
        style={{ 
          clipPath: "polygon(1% 0, 99% 1%, 100% 99%, 0 100%)",
          opacity: 0 
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
                  ref={(el) => (itemsRef.current[i] = el)}
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
  const containerRef = useRef(null);
  const flap1 = useRef(null);
  const flap2 = useRef(null);
  const flap3 = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    
    gsap.set([flap1.current, flap2.current, flap3.current], { transformPerspective: 1200 });
    
    const tl = gsap.timeline();
    // Reveal container
    tl.to(containerRef.current, { opacity: 1, duration: 0.1, zIndex: 150 });
    
    // Unfold top flap down
    tl.fromTo(flap1.current, 
      { rotationX: 90, transformOrigin: "top center" },
      { rotationX: 0, duration: 0.6, ease: "power3.out" }
    );
    // Unfold middle flap down from top flap
    tl.fromTo(flap2.current,
      { rotationX: 90, transformOrigin: "top center" },
      { rotationX: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );
    // Unfold bottom flap
    tl.fromTo(flap3.current,
      { rotationX: 90, transformOrigin: "top center" },
      { rotationX: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    return () => tl.kill();
  }, [open]);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(flap3.current, { rotationX: 90, transformOrigin: "top center", duration: 0.4, ease: "power2.in" })
      .to(flap2.current, { rotationX: 90, transformOrigin: "top center", duration: 0.4, ease: "power2.in" }, "-=0.2")
      .to(flap1.current, { rotationX: 90, transformOrigin: "top center", duration: 0.4, ease: "power2.in" }, "-=0.2")
      .to(containerRef.current, { opacity: 0, duration: 0.1 });
  }, [onClose]);

  return (
    <>
      {/* Mobile Trigger Button (Glued to top right) */}
      <button
        onClick={() => open ? handleClose() : null}
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
          handleClose();
          setTimeout(onSearchOpen, 500);
        }}
        className={`lg:hidden fixed top-4 right-20 z-[140] w-14 h-14 flex items-center justify-center bg-[#E8E6E1] text-[#111018] shadow-lg transition-transform ${open && 'hidden'}`}
        style={{ clipPath: "polygon(5% 0, 95% 5%, 100% 95%, 0 100%)" }}
      >
        <Search className="w-6 h-6" />
      </button>


      {/* Container overlay */}
      <div 
        ref={containerRef}
        className="lg:hidden fixed inset-0 bg-[#0A0812]/90 flex flex-col pt-10 px-4 pointer-events-none opacity-0"
      >
        <div className="pointer-events-auto h-full overflow-y-auto pb-20">
          
          {/* Flap 1 (Top) */}
          <div ref={flap1} className="w-full bg-[#E8E6E1] text-[#111018] p-6 shadow-xl mb-[-2px] border-b-2 border-black/20" style={{ clipPath: "polygon(1% 0, 99% 0, 100% 100%, 0 100%)" }}>
            <p className="font-mono text-xs font-bold text-red-600 tracking-widest uppercase mb-6">Directory</p>
            <div className="flex flex-col gap-4">
              {navItems.slice(0, 4).map((item) => (
                <Link key={item.label} href={item.href} onClick={handleClose} className="text-3xl font-black uppercase tracking-tighter">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Flap 2 (Middle) */}
          <div ref={flap2} className="w-full bg-[#D3D1C8] text-[#111018] p-6 shadow-xl mb-[-2px] border-b-2 border-black/20" style={{ clipPath: "polygon(0 0, 100% 0, 99% 100%, 1% 100%)" }}>
            <div className="flex flex-col gap-4">
              {navItems.slice(4).map((item) => (
                <Link key={item.label} href={item.href} onClick={handleClose} className="text-3xl font-black uppercase tracking-tighter">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Flap 3 (Bottom) */}
          <div ref={flap3} className="w-full bg-[#232132] text-white p-6 shadow-xl pb-10" style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)" }}>
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
          {/* Desktop — Dossier Tabs */}
          <DossierTabs
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