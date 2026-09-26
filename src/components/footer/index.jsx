import { ArrowUp } from "lucide-react";
import { CONTACT } from "@/components/paper/pages";
import { Squiggle } from "@/components/paper/Doodles";

// The back cover: a kraft return-address label, the sign-off, and a way up.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative px-4 sm:px-8 pt-16 pb-10">
      <div className="mx-auto max-w-[1240px] border-t border-ivory/15 pt-12">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] items-end">
          <div>
            <span className="inline-block bg-ink text-ivory font-bebas text-3xl leading-none px-3 pt-2 pb-1.5 -rotate-2 ring-1 ring-ivory/10 shadow-[var(--lift-1)]">
              AK.
            </span>
            <p className="mt-5 font-caveat text-[1.9rem] leading-[1.1] text-ivory/85">
              Built with curiosity,
              <br />
              code &amp; too many tabs.
            </p>
            <Squiggle className="mt-3 h-4 w-36 text-pen/70" />
          </div>

          <div className="paper paper-kraft w-full max-w-sm px-5 pt-4 pb-5 [--r:1.5deg]">
            <p className="type-label text-[0.66rem] text-[#5a3d1c]">If found, please return to</p>
            <p className="mt-2 font-caveat text-[1.7rem] leading-none text-[#1e140a]">Anish Kumar Singh</p>
            <a href={`mailto:${CONTACT.email}`} className="pen-link mt-1 inline-block break-all font-serif text-[1rem] text-[#1e140a]">
              {CONTACT.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.74rem] uppercase tracking-wider text-ivory/60">
          <p>© {year} Anish Singh</p>
          <nav aria-label="Elsewhere" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="pen-link min-h-11 inline-flex items-center hover:text-ivory">
              GitHub
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="pen-link min-h-11 inline-flex items-center hover:text-ivory">
              LinkedIn
            </a>
            <a href={CONTACT.resume} target="_blank" rel="noopener noreferrer" className="pen-link min-h-11 inline-flex items-center hover:text-ivory">
              Resume
            </a>
            <a href="#top" className="min-h-11 inline-flex items-center gap-1.5 text-marker hover:text-ivory">
              Back to the cover
              <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
