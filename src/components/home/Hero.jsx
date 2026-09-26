import { ArrowRight, FileDown, Paperclip } from "lucide-react";
import Tape from "@/components/paper/Tape";
import { ArrowCurve, ArrowDown, PaperClip, Star, Spiral, Squiggle } from "@/components/paper/Doodles";
import { CONTACT } from "@/components/paper/pages";

// Each letter is cut from a different sheet. Rotations are deliberately uneven.
const LETTERS = [
  { ch: "A", stock: "", ink: "text-ink", r: -5 },
  { ch: "N", stock: "paper-sticky", ink: "text-ink", r: 3, tape: 8 },
  { ch: "I", stock: "paper-ink ring-1 ring-ivory/15", ink: "text-ivory", r: -2 },
  { ch: "S", stock: "paper-kraft", ink: "text-[#2a1d10]", r: 4.5 },
  { ch: "H", stock: "", ink: "text-ink", r: -3, tape: -10 },
];

const FILE_CARD = [
  ["File", "A. K. Singh"],
  ["Role", "Full stack + AI"],
  ["Grad", "B.Tech AI & ML ’26"],
  ["Now", "Exponent Solutions"],
];

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-4 sm:px-8 pt-24 lg:pt-40 pb-6"
    >
      {/* Margin doodles — what the pen did while the name was being cut out. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <Star className="hero-draw drift absolute left-[14%] top-[22%] size-10 text-marker/80 -rotate-12 [--d:1.2s] [--drift:24px]" />
        <Spiral className="hero-draw drift absolute right-[17%] top-[17%] size-12 text-ivory/35 [--d:1.4s] [--drift:36px]" />
        <Squiggle className="hero-draw absolute left-[16%] bottom-[30%] h-5 w-36 text-pen/60 [--d:1.6s]" />
        <Star className="hero-draw absolute right-[26%] bottom-[20%] size-6 text-ivory/40 rotate-12 [--d:1.8s]" />
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-10 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        {/* ── Left margin: typed index card (xl+) ── */}
        <aside
          aria-label="Quick facts"
          className="hero-fade hidden xl:block justify-self-start [--d:1.05s]"
        >
          <div className="paper relative w-52 px-5 pt-7 pb-5 [--r:-3deg] lift border-t-[6px] border-cobalt/70">
            <PaperClip className="absolute -top-7 right-6 h-16 w-6 rotate-6" />
            <dl className="font-mono text-[0.78rem] leading-7 text-ink">
              {FILE_CARD.map(([k, v]) => (
                <div key={k} className="flex gap-3 border-b border-dashed border-ink/20">
                  <dt className="w-14 shrink-0 uppercase tracking-wider text-graphite">{k}</dt>
                  <dd className="truncate">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-caveat text-xl text-pen-deep -rotate-2">don’t delete this card</p>
          </div>
        </aside>

        {/* ── The name ── */}
        <div className="relative flex flex-col items-center text-center">
          {/* The torn graph sheet the letters were pasted onto. */}
          <div
            aria-hidden="true"
            className="drop hero-fade absolute -z-10 hidden md:block -left-[7%] -top-[9%] w-[62%] h-[46%] [--d:0.05s]"
          >
            <div className="paper paper-graph torn-bottom h-full w-full [--r:-4deg]" />
          </div>
          <h1 id="hero-title">
            <span className="sr-only">Anish Singh — Full Stack Developer and AI Engineer</span>
            <span aria-hidden="true" className="flex items-end justify-center gap-[clamp(0.35rem,1.2vw,1rem)]">
              {LETTERS.map((l, i) => (
                <span
                  key={l.ch}
                  className={`hero-letter paper lift ${l.stock} ${l.ink} relative grid place-items-center font-bebas leading-none w-[clamp(3.7rem,15vw,9.6rem)] h-[clamp(4.9rem,19vw,12.2rem)] pt-[0.08em] text-[clamp(3.6rem,14vw,10.4rem)] xl:w-[min(9.6rem,10vw)] xl:h-[min(12.2rem,12.6vw)] xl:text-[min(10.4rem,9.2vw)]`}
                  style={{ "--r": `${l.r}deg`, "--i": i, "--rh": `${-l.r / 2}deg` }}
                >
                  {l.tape !== undefined && <Tape at="top" w={54} rotate={l.tape} className="hidden sm:block" />}
                  {l.ch}
                </span>
              ))}
            </span>

            <span
              aria-hidden="true"
              className="hero-stamp inked mt-3 sm:mt-5 block font-bebas leading-[0.9] text-pen tracking-[0.22em] pl-[0.22em] text-[clamp(3.4rem,11vw,8.2rem)] [--d:0.45s]"
              style={{ rotate: "-1.5deg" }}
            >
              SINGH
            </span>
          </h1>

          <p className="hero-fade mt-4 sm:mt-6 type-label text-[0.72rem] sm:text-[0.82rem] tracking-[0.2em] text-ivory/85 [--d:0.7s]">
            Full Stack Developer <span className="text-pen" aria-hidden="true">·</span>
            <span className="sr-only">and</span> AI Engineer
          </p>
          <p className="hero-fade mt-2 font-serif italic text-xl sm:text-2xl text-ivory [--d:0.8s]">
            Building useful things with code &amp; AI.
          </p>

          <div className="hero-fade mt-8 flex w-full max-w-sm sm:max-w-none items-center justify-center gap-3 sm:gap-5 [--d:0.9s]">
            <a
              href="#projects"
              className="paper lift relative flex-1 sm:flex-none inline-flex min-h-12 items-center justify-center gap-2.5 px-4 sm:px-7 type-label text-[0.78rem] [--r:-1.2deg]"
            >
              <Tape at="top" w={46} rotate={-4} />
              View my work
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={CONTACT.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="paper paper-sticky lift flex-1 sm:flex-none inline-flex min-h-12 items-center justify-center gap-2.5 px-4 sm:px-7 type-label text-[0.78rem] [--r:1.8deg]"
            >
              <FileDown className="size-4" aria-hidden="true" />
              Resume
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          </div>
        </div>

        {/* ── Right margin: sticky note + pen arrow into the name (xl+) ── */}
        <div aria-hidden="true" className="relative hidden xl:flex flex-col items-end justify-self-end">
          <div className="hero-fade paper paper-sticky lift w-48 px-5 pt-6 pb-5 [--r:3deg] [--d:1.1s]">
            <Tape at="top" w={60} rotate={6} />
            <p className="font-caveat text-[1.7rem] leading-[1.05] text-ink">
              idea
              <br />→ prototype
              <br />→ <span className="hl">product</span>
            </p>
          </div>
          <ArrowCurve className="hero-draw absolute -left-24 top-[62%] h-16 w-28 -scale-x-100 rotate-[8deg] text-ivory/75 [--d:1.4s]" />
        </div>
      </div>

      {/* ── Mobile negative space: one note, one strip of tape ── */}
      <div aria-hidden="true" className="relative flex-1 min-h-28 xl:hidden">
        <div className="hero-fade absolute left-[6%] top-[30%] [--d:1.05s]">
          <div className="paper paper-sticky px-4 py-2.5 [--r:-3deg]">
            <Tape at="top" w={44} rotate={3} />
            <p className="font-caveat text-xl leading-[1.1] text-ink">idea → prototype → product</p>
          </div>
        </div>
      </div>

      {/* ── Page furniture ── */}
      <div className="mx-auto mt-6 grid w-full max-w-[1400px] grid-cols-[1fr_auto_1fr] items-end gap-4">
        <p className="hidden sm:block type-label text-[0.68rem] font-normal text-ivory/55">p. 00 — cover</p>
        <a
          href="#about"
          className="hero-fade col-start-2 flex flex-col items-center text-ivory/80 hover:text-ivory transition-colors [--d:1.2s]"
        >
          <span className="font-caveat text-xl -rotate-2">scroll to explore</span>
          <ArrowDown className="hero-draw h-10 w-5 [--d:1.5s]" />
        </a>
        <p className="hidden sm:flex justify-self-end items-center gap-2 type-label text-[0.68rem] text-ivory/70">
          <Paperclip className="size-3.5 text-marker" aria-hidden="true" />
          Full Stack Developer · Exponent Solutions
        </p>
      </div>
    </section>
  );
}
