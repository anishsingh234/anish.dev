import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ArrowRight } from "lucide-react";
import { projectsData } from "@/app/data";
import PageHead from "@/components/paper/PageHead";
import Tape from "@/components/paper/Tape";
import Stamp from "@/components/paper/Stamp";
import { PaperClip, CheckBox } from "@/components/paper/Doodles";

const byId = (id) => projectsData.find((p) => p.id === id);

/* ── Shared bits ───────────────────────────────────────────────────────── */
function ProjectLinks({ project, className = "" }) {
  const { name, demoLink, GithubLink } = project;
  const link = "pen-link inline-flex min-h-11 items-center gap-1.5 type-label text-[0.72rem]";
  return (
    <div className={`flex flex-wrap items-center gap-x-6 ${className}`}>
      {demoLink && (
        <a href={demoLink} target="_blank" rel="noopener noreferrer" className={link}>
          Live<span className="sr-only"> site for {name}</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      )}
      {GithubLink && (
        <a href={GithubLink} target="_blank" rel="noopener noreferrer" className={link}>
          <Github className="size-4" aria-hidden="true" />
          GitHub<span className="sr-only"> repository for {name}</span>
        </a>
      )}
    </div>
  );
}

function Title({ project, className = "", children }) {
  const href = project.demoLink || project.GithubLink;
  return (
    <h3 className={`font-bebas uppercase leading-[0.9] ${className}`}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-pen-deep transition-colors">
        {children || project.name}
      </a>
    </h3>
  );
}

function ScribbleNote({ className = "" }) {
  return (
    <span aria-hidden="true" className={`scribble-note pointer-events-none absolute font-caveat text-2xl text-pen ${className}`}>
      open project ↗
    </span>
  );
}

function Print({ src, alt, className = "", tilt = 1.5 }) {
  return (
    <div className={`relative bg-white p-2 pb-2.5 shadow-[var(--lift-1)] ${className}`} style={{ rotate: `${tilt}deg` }}>
      <div className="relative aspect-[16/10] overflow-hidden bg-desk">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 92vw, 40vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

// Catalog number set as a figure caption, beneath the work rather than above its title.
const Caption = ({ n, children, className = "" }) => (
  <p className={`font-mono text-[0.68rem] tracking-wider ${className}`}>
    <span className="font-bold">Fig. {n}</span> — {children}
  </p>
);

const Stack = ({ items, className = "" }) => (
  <p className={`font-mono text-[0.74rem] leading-relaxed ${className}`}>
    <span className="sr-only">Built with: </span>
    {items.join(" / ")}
  </p>
);

/* ── Artifacts ─────────────────────────────────────────────────────────── */

// ChatSathi — a printed spec sheet with the screenshot taped on.
function SpecSheet({ p }) {
  return (
    <article id="work-chatsathi" aria-label={p.name} className="paper lift dog-ear relative px-6 sm:px-9 pt-8 pb-7 [--r:-0.8deg]">
      <Tape at="tl" w={80} />
      <ScribbleNote className="right-8 -top-9 -rotate-3" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <Title project={p} className="text-[clamp(2.8rem,5vw,4.2rem)] text-ink" />
        </div>
        <Stamp rotate={9} className="mt-2 text-xl text-pen-deep" decorative>
          Live
        </Stamp>
      </div>
      <p className="mt-3 max-w-[36rem] font-serif text-[1.05rem] leading-[1.65] text-ink/85">{p.description}</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-[1.25fr_1fr] items-start">
        <div className="relative">
          <Tape at="top" w={64} rotate={3} />
          <Print src="/projects/chatsathi.png" alt="Screenshot of the ChatSathi app" tilt={-1.2} />
          <Caption n="05.1" className="mt-3 text-graphite">{p.tag}</Caption>
        </div>
        <ul className="font-mono text-[0.78rem] uppercase tracking-wide text-ink">
          {["AI chatbot SaaS", "Multi-tenant", "Gemini 2.5 Flash", "Embeddable script"].map((s) => (
            <li key={s} className="flex items-center gap-2 border-b border-dashed border-ink/25 py-1.5">
              <span className="size-1.5 shrink-0 bg-pen" aria-hidden="true" />
              {s}
            </li>
          ))}
          <li className="pt-3 normal-case font-caveat text-[1.4rem] tracking-normal text-cobalt">
            one &lt;script&gt; tag, any website
          </li>
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-3 border-t border-ink/15 pt-4">
        <Stack items={p.techStack} className="text-graphite max-w-md" />
        <ProjectLinks project={p} />
      </div>
    </article>
  );
}

// HopeBridge — a research sheet on graph paper, screenshot paper-clipped on.
function ResearchSheet({ p }) {
  return (
    <article id="work-hopebridge" aria-label={p.name} className="paper paper-graph lift relative px-6 sm:px-8 pt-8 pb-7 [--r:1.2deg] [--rh:-1.6deg]">
      <ScribbleNote className="left-6 -top-9 rotate-2" />
      <PaperClip className="absolute -top-8 left-10 h-20 w-7 -rotate-6 z-10" />
      <Title project={p} className="text-[clamp(2.6rem,4.4vw,3.8rem)] text-ink" />
      <Print src="/projects/hopebridge.png" alt="Screenshot of the HopeBridge app" tilt={0.8} className="mt-4" />
      <Caption n="05.2" className="mt-3 text-graphite">{p.tag}</Caption>
      <p className="mt-5 font-serif text-[1.02rem] leading-[1.65] text-ink/85">{p.description}</p>
      <ul data-reveal className="mt-4 space-y-1.5 font-serif text-[0.98rem] text-ink">
        {["RAG pipeline — LLMs + vector embeddings", "Semantic search with Pinecone + LangChain", "Cited, document-grounded answers"].map((s, i) => (
          <li key={s} className="flex items-start gap-2.5">
            <CheckBox className="mt-0.5 size-5 shrink-0 text-ink" style={{ "--d": `${0.2 + i * 0.2}s` }} />
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-3 font-caveat text-[1.4rem] text-pen-deep -rotate-1">cited answers &gt; confident guesses</p>
      <div className="mt-4 border-t border-ink/15 pt-3">
        <Stack items={p.techStack} className="text-graphite" />
        <ProjectLinks project={p} className="mt-1" />
      </div>
    </article>
  );
}

// HealSync — a blueprint with an engineering title block.
function Blueprint({ p }) {
  const rows = [
    ["Project", p.name],
    ["Type", p.tag],
    ["Scale", "100+ concurrent users"],
    ["Stack", p.techStack.slice(0, 3).join(" · ")],
  ];
  return (
    <article id="work-healsync" aria-label={p.name} className="paper paper-blueprint lift relative px-6 sm:px-9 pt-8 pb-7 [--r:-0.5deg]">
      <Tape at="tr" w={80} />
      <ScribbleNote className="right-10 -top-9 -rotate-2 !text-marker" />
      <div className="grid gap-7 md:grid-cols-[1.35fr_1fr] items-start">
        <div>
          <Title project={p} className="text-[clamp(2.8rem,5vw,4.2rem)] text-white" />
          <div className="mt-4 border border-[#dce7f2]/40 p-2">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src="/projects/healsync.png" alt="Screenshot of the HealSync app" fill sizes="(max-width: 768px) 92vw, 45vw" className="object-cover object-top" />
            </div>
          </div>
          <Caption n="05.3" className="mt-3 text-[#dce7f2]/75">drawing · sheet 1 of 1</Caption>
        </div>
        <div className="flex flex-col h-full">
          <p className="font-serif text-[1.04rem] leading-[1.65] text-[#dce7f2]">{p.description}</p>
          <ul className="mt-4 space-y-1.5 font-mono text-[0.76rem] text-[#dce7f2]/85">
            {p.bullets.slice(0, 3).map((b) => (
              <li key={b} className="flex gap-2">
                <span aria-hidden="true">—</span>
                {b}
              </li>
            ))}
          </ul>
          <dl className="mt-6 md:mt-auto border border-[#dce7f2]/50 font-mono text-[0.72rem] uppercase">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[5.5rem_1fr] border-b border-[#dce7f2]/30 last:border-b-0">
                <dt className="border-r border-[#dce7f2]/30 px-2 py-1.5 text-[#dce7f2]/65">{k}</dt>
                <dd className="px-2 py-1.5 text-white">{v}</dd>
              </div>
            ))}
          </dl>
          <ProjectLinks project={p} className="mt-3 text-white [&_a]:decoration-marker" />
        </div>
      </div>
    </article>
  );
}

// Wizora — a kraft card, stamped.
function KraftCard({ p }) {
  return (
    <article id="work-wizora" aria-label={p.name} className="paper paper-kraft lift relative px-6 pt-8 pb-6 [--r:2deg] [--rh:-1.5deg]">
      <Tape at="top" w={70} rotate={-4} />
      <ScribbleNote className="left-4 -top-9 -rotate-3" />
      <Title project={p} className="text-[3.4rem] text-[#1e140a]" />
      <p className="mt-2 font-caveat text-[1.6rem] leading-tight text-pen-deep -rotate-1">wish pages that move.</p>
      <p className="mt-3 font-serif text-[1rem] leading-[1.6] text-[#2a1d10]">{p.description}</p>
      <Caption n="05.4" className="mt-3 text-[#5a3d1c]">{p.tag}</Caption>
      <div className="mt-5 flex items-center justify-between gap-3">
        <ProjectLinks project={p} className="text-[#1e140a]" />
        <Stamp rotate={-10} className="text-lg text-[#1e140a]" decorative>
          Micro-SaaS
        </Stamp>
      </div>
    </article>
  );
}

// Trip Bandhu — a sticky note written in a hurry.
function StickyNote({ p }) {
  return (
    <article id="work-trip-bandhu" aria-label={p.name} className="paper paper-sticky lift relative px-6 pt-7 pb-5 [--r:-3deg] [--rh:2.5deg]">
      <Tape at="top" w={60} rotate={5} />
      <Title project={p} className="text-[2.6rem] text-ink" />
      <p className="mt-1 font-caveat text-[1.55rem] leading-[1.15] text-ink">
        LLM-planned trips, tailored to <span className="underline decoration-pen decoration-2 underline-offset-2">budget</span> &amp;
        preferences. live sync via ConvexDB.
      </p>
      <Caption n="05.5" className="mt-3 text-ink/75">{p.tag}</Caption>
      <ProjectLinks project={p} className="text-ink" />
    </article>
  );
}

// AI Diet Planner (NutriMate) — itemised on a receipt, fittingly.
function DietReceipt({ p }) {
  return (
    <article id="work-nutrimate" aria-label={`${p.name} (NutriMate)`} className="drop lift [--rh:-2deg]">
      <div className="paper paper-receipt zigzag px-6 pt-7 pb-8 font-mono text-[0.78rem] text-ink [--r:2.5deg]">
        <Title project={p} className="text-center text-[2.6rem] text-ink">
          NutriMate
        </Title>
        <p className="text-center text-[0.72rem] text-graphite">{p.name}</p>
        <p className="my-2 overflow-hidden whitespace-nowrap text-graphite" aria-hidden="true">- - - - - - - - - - - - - - - - -</p>
        <ul>
          {p.bullets.map((b) => (
            <li key={b} className="py-1 leading-snug">
              1 × {b}
            </li>
          ))}
        </ul>
        <p className="my-2 overflow-hidden whitespace-nowrap text-graphite" aria-hidden="true">= = = = = = = = = = = = = = = = =</p>
        <p className="leading-relaxed">
          <span className="font-bold">STACK </span>
          {p.techStack.join(", ")}
        </p>
        <ProjectLinks project={p} className="mt-2 justify-center" />
        <Caption n="05.6" className="mt-2 text-center text-graphite">{p.tag}</Caption>
      </div>
    </article>
  );
}

// Everything else — an index card, and the way into the full archive.
function IndexCard({ projects, dsa }) {
  return (
    <aside aria-label="More projects" className="paper paper-lined relative px-6 pl-16 pt-7 pb-6 [--r:0.6deg] [--line:2.25rem] [--line-start:1.1rem] [--margin:2.6rem]">
      <Tape at="tl" w={70} />
      <p className="font-caveat text-[2rem] leading-[2.25rem] text-ink">also on the bench</p>
      <ul className="font-serif text-[1.02rem] leading-[2.25rem] text-ink">
        {projects.map((p) => (
          <li key={p.id} className="flex items-baseline justify-between gap-3">
            <a href={p.GithubLink} target="_blank" rel="noopener noreferrer" className="pen-link truncate">
              {p.name}
            </a>
            <span className="shrink-0 font-mono text-[0.7rem] uppercase text-graphite">{p.tag.split("·")[1]?.trim()}</span>
          </li>
        ))}
        <li className="flex items-baseline justify-between gap-3">
          <a href={dsa.GithubLink} target="_blank" rel="noopener noreferrer" className="pen-link">
            LeetCode solutions
          </a>
          <span className="shrink-0 font-mono text-[0.7rem] uppercase text-graphite">350+ solved</span>
        </li>
      </ul>
      <Link
        href="/projects"
        className="paper paper-ink lift mt-6 inline-flex min-h-12 items-center gap-2.5 px-5 type-label text-[0.74rem] [--r:-1.5deg]"
      >
        Open the full archive
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </aside>
  );
}

export default function Workbench() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative px-3 sm:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="px-1 sm:px-0">
          <PageHead id="projects-title" page="05" flag="pen" title="The Workbench" note="everything I’ve shipped, laid out on the desk" />
        </div>

        {/* The cutting mat everything is laid out on. */}
        <div className="relative mt-12 lg:mt-16 rounded-[14px] bg-[#23473d] px-3 sm:px-8 lg:px-12 pt-16 pb-12 lg:pb-16 shadow-[var(--lift-2)] [background-image:var(--grain-light),linear-gradient(rgb(214_236_223/0.13)_1px,transparent_1px),linear-gradient(90deg,rgb(214_236_223/0.13)_1px,transparent_1px),linear-gradient(rgb(214_236_223/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(214_236_223/0.06)_1px,transparent_1px)] [background-size:auto,120px_120px,120px_120px,24px_24px,24px_24px]">
          {/* ruler along the top edge */}
          <div aria-hidden="true" className="absolute inset-x-4 top-3 h-6 [background-image:repeating-linear-gradient(90deg,rgb(214_236_223/0.55)_0_1px,transparent_1px_24px),repeating-linear-gradient(90deg,rgb(214_236_223/0.55)_0_1px,transparent_1px_120px)] [background-size:auto_8px,auto_16px] bg-no-repeat" />
          <p aria-hidden="true" className="absolute right-5 top-8 font-mono text-[0.62rem] tracking-[0.3em] text-[#d6ecdf]/55">
            SELF-HEALING · CM
          </p>

          <div className="grid gap-x-8 gap-y-14 lg:grid-cols-12 items-start">
            <div data-reveal className="lg:col-span-7">
              <SpecSheet p={byId(1)} />
            </div>
            <div data-reveal className="lg:col-span-5 lg:mt-20 [--d:0.1s]">
              <ResearchSheet p={byId(2)} />
            </div>

            <div data-reveal className="lg:col-span-4 lg:-mt-10">
              <KraftCard p={byId(16)} />
            </div>
            <div data-reveal className="lg:col-span-8 [--d:0.1s]">
              <Blueprint p={byId(5)} />
            </div>

            <div data-reveal className="lg:col-span-3 sm:max-w-sm lg:mt-6">
              <StickyNote p={byId(3)} />
            </div>
            <div data-reveal className="lg:col-span-4 sm:max-w-sm lg:-mt-4 [--d:0.1s]">
              <DietReceipt p={byId(4)} />
            </div>
            <div data-reveal className="lg:col-span-5 lg:mt-10 [--d:0.2s]">
              <IndexCard projects={[byId(6), byId(7), byId(8)]} dsa={byId(9)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
