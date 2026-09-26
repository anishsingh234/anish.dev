"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, X, ArrowUpRight, Github, Linkedin, Mail, FileText } from "lucide-react";
import { projectsData } from "@/app/data";
import { PAGES, CONTACT } from "@/components/paper/pages";
import { Squiggle } from "@/components/paper/Doodles";
import Tape from "@/components/paper/Tape";

/* ─── Handwritten local time, IST — updates each half minute ─────────────── */
function DeskClock({ className = "" }) {
  const [stamp, setStamp] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setStamp(fmt.format(new Date()).replace(",", " ·").toLowerCase());
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className={`font-caveat text-lg leading-none whitespace-nowrap ${className}`}>
      {stamp && (
        <>
          <span className="sr-only">Local time for Anish: </span>
          {stamp} <span className="text-graphite">ist</span>
        </>
      )}
    </span>
  );
}

/* ─── Scroll to a section on the home page, or route there ──────────────── */
function useGoToSection() {
  const pathname = usePathname();
  const router = useRouter();
  return useCallback(
    (id) => {
      const el = pathname === "/" && document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
      } else {
        router.push(`/#${id}`);
      }
    },
    [pathname, router]
  );
}

/* ─── Desktop: a torn paper strip with index tabs peeking out beneath it ── */
function PaperStrip({ active, onSearch }) {
  const go = useGoToSection();
  return (
    <nav aria-label="Primary" className="hidden lg:flex flex-col items-center fixed top-3 left-1/2 -translate-x-1/2 z-[100]">
      {/* the strip itself */}
      <div className="drop relative z-10">
        <Tape at="tl" w={60} rotate={-32} />
        <Tape at="tr" w={60} rotate={30} />
        <div className="paper torn-bottom flex items-center gap-5 pl-3 pr-5 pt-2.5 pb-4 [--r:-0.4deg]">
          <Link
            href="/"
            className="bg-ink text-ivory font-bebas text-2xl leading-none px-2.5 pt-1.5 pb-1 -rotate-3 hover:rotate-0 transition-transform shadow-[var(--lift-0)]"
            aria-label="Anish Singh — home"
          >
            AK.
          </Link>
          <p className="font-caveat text-[1.35rem] leading-none text-ink whitespace-nowrap">
            anish’s working notebook
            <Squiggle className="block h-2 w-24 text-pen" />
          </p>

          <button
            type="button"
            onClick={onSearch}
            className="paper paper-sticky lift ml-6 ring-1 ring-ink/20 flex min-h-9 items-center gap-2 px-3 type-label text-[0.68rem] text-ink [--r:2deg]"
          >
            <Search className="size-3.5" aria-hidden="true" />
            Search
            <kbd className="font-mono text-[0.64rem] border border-ink/30 px-1">⌘K</kbd>
          </button>

          <DeskClock className="border-l border-ink/15 pl-4 text-ink" />
        </div>
      </div>

      {/* index tabs, tucked under the torn edge; the current page hangs lower */}
      <ul className="relative z-0 -mt-5 flex self-stretch items-start justify-between px-2">
        {PAGES.map((p, i) => {
          const isActive = active === p.id;
          return (
            <li key={p.id}>
              <a
                href={`/#${p.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(p.id);
                }}
                aria-current={isActive ? "location" : undefined}
                className={`flag-${p.flag} block bg-[var(--flag)] text-[var(--flag-ink,#111)] px-2.5 pt-6 pb-1.5 type-label text-[0.68rem] shadow-[var(--lift-1)] ring-1 ring-ink/15 transition-transform duration-300 ease-[var(--ease-paper)] hover:translate-y-0.5 ${
                  isActive ? "translate-y-2" : "-translate-y-1"
                }`}
                style={{ rotate: `${[-1.5, 1, -0.5, 1.5, -1, 0.8, -0.8][i]}deg` }}
              >
                {p.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ─── Mobile: three paper chips, and a notebook index page as the menu ──── */
function MobileBar({ active, onSearch }) {
  const [open, setOpen] = useState(false);
  const go = useGoToSection();
  const menuBtn = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    if (!open) return;
    const opener = menuBtn.current;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  const chip =
    "paper min-h-11 px-3 inline-flex items-center gap-1.5 type-label text-[0.7rem] active:translate-y-px";

  return (
    <>
      <header className="lg:hidden fixed inset-x-0 top-0 z-[120] flex items-center justify-between px-4 pt-3 pb-6 pointer-events-none bg-gradient-to-b from-desk via-desk/80 to-transparent">
        <Link
          href="/"
          aria-label="Anish Singh — home"
          className="pointer-events-auto bg-ink text-ivory font-bebas text-[1.65rem] leading-none px-2.5 pt-1.5 pb-1 -rotate-3 shadow-[var(--lift-1)] ring-1 ring-ivory/10"
        >
          AK.
        </Link>
        <div className="pointer-events-auto flex items-center gap-2">
          <button type="button" onClick={onSearch} className={`${chip} [--r:1.5deg]`}>
            <Search className="size-3.5" aria-hidden="true" />
            Search
          </button>
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="notebook-index"
            className={`${chip} paper-sticky [--r:-2deg]`}
          >
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              <span className="block h-[2px] w-3.5 bg-ink" />
              <span className="block h-[2px] w-2.5 bg-ink" />
              <span className="block h-[2px] w-3.5 bg-ink" />
            </span>
            Menu
          </button>
        </div>
      </header>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[150] bg-desk/85 backdrop-blur-[2px] overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            id="notebook-index"
            role="dialog"
            aria-modal="true"
            aria-label="Notebook index"
            className="paper paper-lined mx-3 mt-3 mb-8 pb-8 [--r:-0.6deg] [--line:2.75rem] [--line-start:4.4rem] animate-[fade-up_0.45s_var(--ease-out)_both]"
          >
            <Tape at="top" w={90} rotate={2} />
            <div className="flex items-start justify-between pl-[3.6rem] pr-4 pt-5 h-[4.4rem]">
              <p className="font-caveat text-4xl leading-none text-ink">Index</p>
              <button
                ref={closeBtn}
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-11 px-3 inline-flex items-center gap-1 type-label text-[0.7rem] text-pen-deep"
              >
                <X className="size-4" aria-hidden="true" />
                Close
              </button>
            </div>

            <nav aria-label="Sections">
              <ul>
                {PAGES.map((p) => (
                  <li key={p.id}>
                    <a
                      href={`/#${p.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        requestAnimationFrame(() => go(p.id));
                      }}
                      aria-current={active === p.id ? "location" : undefined}
                      className="flex items-end gap-2 h-[2.75rem] pl-[3.6rem] pr-5 text-ink"
                    >
                      <span className="font-bebas text-[2rem] leading-[1.15]">{p.label}</span>
                      <span className="flex-1 mb-2.5 border-b-2 border-dotted border-ink/30" aria-hidden="true" />
                      <span className={`flag flag-${p.flag} mb-2 !text-[0.66rem]`}>p. {p.page}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 pl-[3.6rem] pr-5 grid grid-cols-2 gap-3">
              {[
                { label: "GitHub", href: CONTACT.github, Icon: Github, ext: true },
                { label: "LinkedIn", href: CONTACT.linkedin, Icon: Linkedin, ext: true },
                { label: "Email", href: `mailto:${CONTACT.email}`, Icon: Mail },
                { label: "Resume", href: CONTACT.resume, Icon: FileText, ext: true, hot: true },
              ].map(({ label, href, Icon, ext, hot }) => (
                <a
                  key={label}
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`paper ${hot ? "paper-sticky" : "paper-kraft"} min-h-11 px-3 flex items-center gap-2 type-label text-[0.7rem]`}
                  style={{ "--r": `${label.length % 2 ? -1.2 : 1}deg` }}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── ⌘K: an index card that finds pages, projects and contact routes ───── */
function IndexCard({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const itemRefs = useRef([]);
  const go = useGoToSection();

  const entries = useMemo(
    () => [
      ...PAGES.map((p) => ({ group: "Pages", label: p.label, meta: `p. ${p.page}`, section: p.id })),
      ...projectsData
        .filter((p) => !/dsa|mini/i.test(p.tag))
        .map((p) => ({
          group: "Projects",
          label: p.name,
          meta: p.tag,
          href: p.demoLink || p.GithubLink,
          external: true,
        })),
      { group: "Elsewhere", label: "Full project archive", meta: "/projects", href: "/projects" },
      { group: "Elsewhere", label: "Resume (PDF)", meta: "download", href: CONTACT.resume, external: true },
      { group: "Elsewhere", label: "GitHub", meta: "anishsingh234", href: CONTACT.github, external: true },
      { group: "Elsewhere", label: "Email", meta: CONTACT.email, href: `mailto:${CONTACT.email}` },
    ],
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) => `${e.label} ${e.meta}`.toLowerCase().includes(q));
  }, [entries, query]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    setQuery("");
    setCursor(0);
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => previous?.focus?.();
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  if (!open) return null;

  const activate = (entry) => {
    onClose();
    if (entry.section) go(entry.section);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") return onClose();
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (cursor + (e.key === "ArrowDown" ? 1 : -1) + results.length) % Math.max(results.length, 1);
      setCursor(next);
      itemRefs.current[next]?.scrollIntoView({ block: "nearest" });
    }
    if (e.key === "Enter" && results[cursor]) {
      e.preventDefault();
      itemRefs.current[cursor]?.click();
    }
  };

  let lastGroup = null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center px-3 pt-[12vh] bg-desk/80 backdrop-blur-[2px]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="index-card-title"
        onKeyDown={onKeyDown}
        className="paper w-full max-w-xl [--r:-0.8deg] animate-[fade-up_0.35s_var(--ease-out)_both]"
      >
        <Tape at="top" w={110} rotate={-2} />
        <div className="px-5 pt-6 pb-3 border-b-2 border-pen/60">
          <p id="index-card-title" className="flex items-baseline justify-between type-label text-graphite">
            <span>Index card — find anything</span>
            <kbd className="font-mono text-[0.68rem] border border-ink/25 px-1.5">esc</kbd>
          </p>
          <label className="mt-3 flex items-center gap-3">
            <Search className="size-5 text-graphite shrink-0" aria-hidden="true" />
            <span className="sr-only">Search pages and projects</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              role="combobox"
              aria-expanded="true"
              aria-controls="index-results"
              aria-activedescendant={results[cursor] ? `index-item-${cursor}` : undefined}
              placeholder="Try “RAG”, “HealSync”, “resume”…"
              className="w-full bg-transparent font-serif text-xl text-ink placeholder:text-graphite/70 outline-none py-1"
            />
          </label>
        </div>

        <ul id="index-results" role="listbox" aria-label="Results" className="max-h-[52vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-5 py-8 font-caveat text-2xl text-graphite">
              Nothing filed under “{query}”. Try a project name or a skill.
            </li>
          )}
          {results.map((entry, i) => {
            const header = entry.group !== lastGroup ? entry.group : null;
            lastGroup = entry.group;
            const ItemTag = entry.section ? "button" : "a";
            const linkProps = entry.section
              ? { type: "button" }
              : {
                  href: entry.href,
                  ...(entry.external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
                };
            return (
              <li key={`${entry.group}-${entry.label}`} role="presentation">
                {header && (
                  <p className="px-5 pt-3 pb-1 type-label text-[0.66rem] text-graphite" aria-hidden="true">
                    {header}
                  </p>
                )}
                <ItemTag
                  {...linkProps}
                  id={`index-item-${i}`}
                  role="option"
                  aria-selected={i === cursor}
                  tabIndex={-1}
                  ref={(el) => (itemRefs.current[i] = el)}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => activate(entry)}
                  className={`w-full flex items-center justify-between gap-4 px-5 py-2.5 text-left transition-colors ${
                    i === cursor ? "bg-marker/70" : ""
                  }`}
                >
                  <span className="font-serif text-lg text-ink">{entry.label}</span>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-graphite truncate">
                    {entry.meta}
                    {entry.external && <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />}
                  </span>
                </ItemTag>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ─── Navbar ───────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Highlight whichever page occupies the middle of the viewport.
  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    PAGES.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] paper px-4 py-2 type-label"
      >
        Skip to content
      </a>
      <PaperStrip active={active} onSearch={openSearch} />
      <MobileBar active={active} onSearch={openSearch} />
      <IndexCard open={searchOpen} onClose={closeSearch} />
    </>
  );
}
