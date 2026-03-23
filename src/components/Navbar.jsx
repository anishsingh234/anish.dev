"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const EASE = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navItems = ["Projects", "Skills", "Experience", "About", "Contact"];

  // Helper to construct link depending on if we are home or on a subpage
  const getHref = (item) => {
    const id = item.toLowerCase();
    return isHome ? `#${id}` : `/#${id}`;
  };

  const handleNavClick = (e, item) => {
    const id = item.toLowerCase();
    if (isHome) {
      e.preventDefault();
      // Close menu first, then scroll after animation settles
      setMobileOpen(false);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    } else {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-[#05050A]/85 backdrop-blur-md sm:backdrop-blur-2xl border-b border-white/[0.05] shadow-[inset_0_-1px_0_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.3)]"
          : "bg-[#05050A]/40 backdrop-blur-sm sm:backdrop-blur-lg border-b border-white/[0.02]"
      }`}
    >
      <nav
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        {/* Logo */}
        <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shrink-0"
          >
            <span className="text-background font-bold text-sm leading-none">AK</span>
          </motion.div>
          <span className="font-semibold text-foreground/80 group-hover:text-foreground transition-colors text-sm hidden sm:block">
            Anish Kumar Singh
          </span>
        </Link>

        {/* Desktop Nav links */}
        <div className="hidden md:flex items-center">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={getHref(item)}
              onClick={(e) => handleNavClick(e, item)}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.15, ease: EASE }}
              className="px-3 py-2 text-sm text-foreground/50 hover:text-foreground/90 rounded-md transition-colors duration-150"
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0"
            />
            <span className="text-[10px] font-medium text-emerald-400 whitespace-nowrap">Open to work</span>
          </div>

          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-accent/10 hover:bg-accent/20 text-accent border border-accent/25 rounded-lg transition-colors duration-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span>
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-foreground/70 hover:text-foreground hover:bg-white/[0.1] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="md:hidden overflow-hidden bg-[#05050A]/95 backdrop-blur-2xl border-b border-white/[0.05]"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={getHref(item)}
                  onClick={(e) => handleNavClick(e, item)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="px-4 py-3 text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-white/[0.04] rounded-xl transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.06] px-4">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-emerald-400">Open to Work</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
