"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { Download, Search, X, Github, ArrowUpRight, Mail } from "lucide-react";

/* ─── NAV DATA ────────────────────────────────────────────────────────────── */
const navItems = [
  { label: "Home",        href: "/",            id: null          },
  { label: "Projects",    href: "/#projects",   id: "projects"    },
  { label: "Animations",  href: "/animations",  id: "animations"  },
  { label: "Blog",        href: "/#blog",       id: "blog"        },
  { label: "Skills",      href: "/#skills",     id: "skills"      },
  { label: "Experience",  href: "/#experience", id: "experience"  },
  { label: "About",       href: "/#about",      id: "about"       },
  { label: "Why Hire Me", href: "/#why-hire-me", id: "why-hire-me" },
  { label: "Contact",     href: "/#contact",    id: "contact"     },
];

/* ─── LIVE CLOCK ──────────────────────────────────────────────────────────── */
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
    <span className="font-mono text-[10px] text-purple-300/50 tracking-widest tabular-nums">
      {time}
    </span>
  );
}

/* ─── MAGNETIC BUTTON WRAPPER ─────────────────────────────────────────────── */
function MagneticWrap({ children, className = "", strength = 0.35 }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.4, ease: "power3.out" });
  };

  const handleLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

/* ─── COMMAND PALETTE (GSAP) ──────────────────────────────────────────────── */
function CommandPalette({ open, onClose, onNavigate }) {
  const [query, setQuery] = useState("");
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
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
    // Animate in
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
      .fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.92, y: -30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.7)" },
        "-=0.15"
      );
    setTimeout(() => inputRef.current?.focus(), 100);

    return () => tl.kill();
  }, [open]);

  // Stagger items when filtered list changes
  useEffect(() => {
    if (!open) return;
    const items = itemsRef.current.filter(Boolean);
    gsap.fromTo(
      items,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: "power2.out" }
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
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to(panelRef.current, { opacity: 0, scale: 0.95, y: -20, duration: 0.25, ease: "power2.in" })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4"
      onClick={handleClose}
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl border border-purple-400/[0.12] bg-[#0E0B1A]/95 backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(139,92,246,0.25)] overflow-hidden"
        style={{ opacity: 0 }}
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-purple-400/[0.08]">
          <Search className="w-4 h-4 text-purple-300/40 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Navigate to..."
            className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/30 outline-none font-mono tracking-wide"
          />
          <div className="flex items-center gap-1.5">
            <kbd className="text-[9px] font-mono text-purple-300/30 border border-purple-400/[0.1] rounded px-1.5 py-0.5">
              ESC
            </kbd>
          </div>
        </div>

        {/* Results */}
        <div className="py-2 max-h-72 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-white/30 py-8 font-mono">
              Nothing found
            </p>
          ) : (
            filtered.map((item, i) => (
              <button
                key={item.label}
                ref={(el) => (itemsRef.current[i] = el)}
                onClick={() => {
                  onNavigate(item);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-purple-400/[0.06] transition-colors text-left group"
              >
                <span className="text-[10px] font-mono text-purple-300/30 w-5 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-white/65 group-hover:text-white/90 transition-colors font-medium">
                  {item.label}
                </span>
                <ArrowUpRight className="w-3 h-3 text-purple-300/20 ml-auto group-hover:text-purple-300/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 border-t border-purple-400/[0.06] flex items-center gap-4">
          <span className="text-[9px] font-mono text-white/20 tracking-wider">
            ↑↓ navigate
          </span>
          <span className="text-[9px] font-mono text-white/20 tracking-wider">
            ↵ select
          </span>
          <span className="text-[9px] font-mono text-white/20 tracking-wider">
            esc close
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── FLOATING NAV PILL (DESKTOP) ─────────────────────────────────────────── */
function FloatingNav({ activeSection, pathname, onSearchOpen }) {
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const itemRefs = useRef([]);
  const glowRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  // Entrance animation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { y: -80, opacity: 0 });
    gsap.to(nav, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.3,
      ease: "power4.out",
    });

    // Stagger children
    const items = itemRefs.current.filter(Boolean);
    gsap.fromTo(
      items,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, delay: 0.6, ease: "power3.out" }
    );
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate scroll state
  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
      borderColor: scrolled ? "rgba(167,139,250,0.12)" : "rgba(167,139,250,0.06)",
      boxShadow: scrolled
        ? "0 8px 40px -12px rgba(139,92,246,0.2), 0 0 0 1px rgba(167,139,250,0.06)"
        : "0 4px 20px -8px rgba(0,0,0,0.3)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [scrolled]);

  // Move active pill indicator
  useEffect(() => {
    const activeIdx = navItems.findIndex((item) =>
      item.id ? activeSection === item.id : isHome && !activeSection
    );
    const el = itemRefs.current[activeIdx];
    if (el && pillRef.current) {
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement.getBoundingClientRect();
      gsap.to(pillRef.current, {
        x: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      });
    }
  }, [activeSection, isHome]);

  // Glow follow mouse
  const handleNavMouseMove = (e) => {
    if (!glowRef.current || !navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    gsap.to(glowRef.current, {
      x: x - 60,
      opacity: 0.6,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleNavMouseLeave = () => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" });
  };

  // Only show first 5 items in the pill, rest go into "more" if needed
  const visibleItems = navItems.slice(0, 6);
  const moreItems = navItems.slice(6);

  return (
    <nav
      ref={navRef}
      className="hidden lg:flex fixed top-5 left-1/2 -translate-x-1/2 z-[100] items-center gap-0.5 px-2 py-2 rounded-2xl border border-purple-400/[0.06] bg-[#0E0B1A]/80 backdrop-blur-xl"
      style={{ opacity: 0 }}
      onMouseMove={handleNavMouseMove}
      onMouseLeave={handleNavMouseLeave}
    >
      {/* Mouse-following glow */}
      <div
        ref={glowRef}
        className="absolute top-0 w-[120px] h-full rounded-2xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, transparent 70%)",
          opacity: 0,
        }}
      />

      {/* Active pill indicator */}
      <div
        ref={pillRef}
        className="absolute top-[6px] h-[calc(100%-12px)] rounded-xl bg-purple-400/[0.08] border border-purple-400/[0.1] pointer-events-none"
        style={{ opacity: 0, width: 0 }}
      />

      {/* Logo */}
      <MagneticWrap strength={0.3}>
        <Link
          href="/"
          className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl mr-1 group"
        >
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-[#0E0B1A] font-black text-[10px]">AK</span>
          </div>
          <span className="text-[11px] font-bold text-white/70 group-hover:text-white transition-colors hidden xl:block">
            Anish
          </span>
        </Link>
      </MagneticWrap>

      {/* Divider */}
      <div className="w-px h-5 bg-purple-400/[0.1] mx-1" />

      {/* Nav items */}
      <div className="relative flex items-center gap-0.5">
        {visibleItems.map((item, i) => {
          const isActive = item.id
            ? activeSection === item.id
            : isHome && !activeSection;

          return (
            <MagneticWrap key={item.label} strength={0.2}>
              <Link
                ref={(el) => (itemRefs.current[i] = el)}
                href={item.href}
                onMouseEnter={() => {
                  setHoveredIdx(i);
                  const el = itemRefs.current[i];
                  if (el) {
                    gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" });
                  }
                }}
                onMouseLeave={() => {
                  setHoveredIdx(-1);
                  const el = itemRefs.current[i];
                  if (el) {
                    gsap.to(el, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
                  }
                }}
                className={`relative px-3 py-1.5 rounded-xl text-[11.5px] font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? "text-white"
                    : "text-white/45 hover:text-white/80"
                }`}
              >
                {item.label}
                {item.id === "animations" && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-purple-400/50" />
                )}
              </Link>
            </MagneticWrap>
          );
        })}

        {/* More dropdown */}
        {moreItems.length > 0 && <MoreMenu items={moreItems} activeSection={activeSection} />}
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-purple-400/[0.1] mx-1" />

      {/* Search */}
      <MagneticWrap strength={0.3}>
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-white/35 hover:text-white/65 hover:bg-purple-400/[0.06] transition-all"
        >
          <Search className="w-3.5 h-3.5" />
          <kbd className="text-[9px] font-mono text-purple-300/25 border border-purple-400/[0.1] rounded px-1.5 py-0.5 hidden xl:block">
            ⌘K
          </kbd>
        </button>
      </MagneticWrap>

      {/* Clock */}
      <div className="hidden xl:flex items-center px-2">
        <LiveClock />
      </div>
    </nav>
  );
}

/* ─── MORE DROPDOWN ───────────────────────────────────────────────────────── */
function MoreMenu({ items, activeSection }) {
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);
  const btnRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (!open || !dropRef.current) return;

    gsap.fromTo(
      dropRef.current,
      { opacity: 0, y: -8, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(2)" }
    );

    const els = itemRefs.current.filter(Boolean);
    gsap.fromTo(
      els,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, delay: 0.1, ease: "power2.out" }
    );
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!dropRef.current?.contains(e.target) && !btnRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11.5px] font-medium text-white/40 hover:text-white/70 transition-colors"
      >
        More
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          ref={dropRef}
          className="absolute top-full right-0 mt-3 py-2 min-w-[180px] rounded-xl border border-purple-400/[0.1] bg-[#0E0B1A]/95 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(139,92,246,0.2)]"
          style={{ opacity: 0 }}
        >
          {items.map((item, i) => {
            const isActive = item.id ? activeSection === item.id : false;
            return (
              <Link
                key={item.label}
                ref={(el) => (itemRefs.current[i] = el)}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-medium transition-colors ${
                  isActive
                    ? "text-white bg-purple-400/[0.08]"
                    : "text-white/50 hover:text-white/80 hover:bg-purple-400/[0.04]"
                }`}
              >
                <span className="text-[9px] font-mono text-purple-300/25 w-4 tabular-nums">
                  {String(i + 7).padStart(2, "0")}
                </span>
                {item.label}
                {isActive && (
                  <span className="ml-auto w-1 h-1 rounded-full bg-purple-400/60" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── MOBILE NAV ──────────────────────────────────────────────────────────── */
function MobileNav({
  open,
  onClose,
  activeSection,
  onSearchOpen,
}) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const itemRefs = useRef([]);
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const lineRefs = useRef([]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const tl = gsap.timeline();

    // Overlay fade
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    // Panel slide up
    tl.fromTo(
      panelRef.current,
      { y: "100%", borderRadius: "32px 32px 0 0" },
      { y: "0%", borderRadius: "0px", duration: 0.6, ease: "power4.out" },
      "-=0.2"
    );

    // Header fade
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        "-=0.3"
      );
    }

    // Horizontal lines
    const lines = lineRefs.current.filter(Boolean);
    tl.fromTo(
      lines,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" },
      "-=0.3"
    );

    // Nav items — cinematic stagger
    const items = itemRefs.current.filter(Boolean);
    tl.fromTo(
      items,
      { opacity: 0, x: -40, skewX: -3 },
      {
        opacity: 1,
        x: 0,
        skewX: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      },
      "-=0.5"
    );

    // Footer
    if (footerRef.current) {
      tl.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        "-=0.2"
      );
    }

    return () => tl.kill();
  }, [open]);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });

    const items = itemRefs.current.filter(Boolean);
    tl.to(items, {
      opacity: 0,
      x: 30,
      duration: 0.25,
      stagger: 0.03,
      ease: "power2.in",
    });

    tl.to(
      panelRef.current,
      { y: "100%", duration: 0.45, ease: "power3.in" },
      "-=0.1"
    );

    tl.to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="lg:hidden fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        style={{ opacity: 0 }}
      />

      {/* Full-screen panel */}
      <div
        ref={panelRef}
        className="lg:hidden fixed inset-0 z-[160] bg-[#0E0B1A] flex flex-col overflow-hidden"
        style={{ transform: "translateY(100%)" }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          className="flex items-center justify-between px-6 py-5 border-b border-purple-400/[0.06]"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <span className="text-[#0E0B1A] font-black text-[10px]">AK</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-white/80">Anish Kumar</span>
              <span className="text-[9px] font-mono text-purple-300/40 tracking-widest">
                NAVIGATION
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-purple-400/[0.1] text-white/50 hover:text-white/80 hover:border-purple-400/[0.25] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search bar in mobile */}
        <div className="px-6 py-3">
          <button
            onClick={() => {
              handleClose();
              setTimeout(onSearchOpen, 500);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-purple-400/[0.08] bg-purple-400/[0.03] text-white/30 hover:border-purple-400/[0.15] transition-all"
          >
            <Search className="w-4 h-4" />
            <span className="text-[12px] font-mono">Search sections...</span>
            <kbd className="ml-auto text-[9px] font-mono text-purple-300/25 border border-purple-400/[0.1] rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Nav items — full height list */}
        <nav className="flex-1 overflow-y-auto px-6 py-2">
          {navItems.map((item, i) => {
            const isActive = item.id
              ? activeSection === item.id
              : false;

            return (
              <div key={item.label}>
                <div
                  ref={(el) => (lineRefs.current[i] = el)}
                  className="h-px bg-purple-400/[0.06] origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
                <Link
                  ref={(el) => (itemRefs.current[i] = el)}
                  href={item.href}
                  onClick={handleClose}
                  className={`flex items-center justify-between py-4 group ${
                    isActive ? "text-white" : "text-white/50"
                  }`}
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-purple-300/25 w-5 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[22px] font-bold tracking-tight transition-colors duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-white/55 group-hover:text-white/85"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-purple-400/60" />
                    )}
                    <ArrowUpRight
                      className="w-4 h-4 text-purple-300/15 group-hover:text-purple-300/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>
                </Link>
              </div>
            );
          })}
          <div
            ref={(el) => (lineRefs.current[navItems.length] = el)}
            className="h-px bg-purple-400/[0.06] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </nav>

        {/* Footer */}
        <div
          ref={footerRef}
          className="px-6 py-5 border-t border-purple-400/[0.06] space-y-4"
          style={{ opacity: 0 }}
        >
          {/* Social + Resume */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/anishsingh234"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-purple-400/[0.1] text-white/40 hover:text-white/70 hover:border-purple-400/[0.25] transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/anish-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-purple-400/[0.1] text-white/40 hover:text-white/70 hover:border-purple-400/[0.25] transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:contact@anish.dev"
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-purple-400/[0.1] text-white/40 hover:text-white/70 hover:border-purple-400/[0.25] transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="/resume.pdf"
              download="Anish_Kumar_Resume.pdf"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-purple-400/[0.12] bg-purple-400/[0.05] text-[11px] font-mono text-purple-300/60 hover:text-white hover:border-purple-400/[0.3] transition-all tracking-wider uppercase"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
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
        </div>
      </div>
    </>
  );
}

/* ─── MOBILE TOP BAR ──────────────────────────────────────────────────────── */
function MobileTopBar({ onMenuOpen, onSearchOpen }) {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power4.out" }
    );
  }, []);

  return (
    <header
      ref={barRef}
      className="lg:hidden fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 h-14 border-b border-purple-400/[0.06] bg-[#0E0B1A]/90 backdrop-blur-xl"
      style={{ opacity: 0 }}
    >
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
          <span className="text-[#0E0B1A] font-black text-[10px]">AK</span>
        </div>
        <span className="text-[13px] font-bold text-white/75">Anish Kumar</span>
      </Link>

      <div className="flex items-center gap-2.5">
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-1.5 px-2.5 py-1.5 border border-purple-400/[0.1] rounded-lg text-white/40 hover:text-white/65 transition-all"
        >
          <Search className="w-3.5 h-3.5" />
          <kbd className="text-[9px] font-mono tracking-wider text-purple-300/30">⌘K</kbd>
        </button>
        <button
          onClick={onMenuOpen}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-purple-400/[0.1] text-white/55 hover:text-white/70 transition-all"
        >
          <div className="flex flex-col gap-[5px]">
            <span className="block w-[18px] h-[1.5px] bg-current rounded-full" />
            <span className="block w-[13px] h-[1.5px] bg-current rounded-full" />
            <span className="block w-[18px] h-[1.5px] bg-current rounded-full" />
          </div>
        </button>
      </div>
    </header>
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
          {/* Desktop — Floating pill navbar */}
          <FloatingNav
            activeSection={activeSection}
            pathname={pathname}
            onSearchOpen={() => setPaletteOpen(true)}
          />

          {/* Mobile — Top bar */}
          <MobileTopBar
            onMenuOpen={() => setMobileOpen(true)}
            onSearchOpen={() => setPaletteOpen(true)}
          />

          {/* Mobile — Full screen nav overlay */}
          <MobileNav
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            activeSection={activeSection}
            onSearchOpen={() => setPaletteOpen(true)}
          />
        </>
      )}

      {/* Command palette — always available via ⌘K */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={(item) => router.push(item.href)}
      />
    </>
  );
}