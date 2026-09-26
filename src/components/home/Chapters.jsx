"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RunningHead } from "@/components/paper/PageHead";
import { CircleScribble, ArrowCurve } from "@/components/paper/Doodles";
import Tape from "@/components/paper/Tape";
import Stamp from "@/components/paper/Stamp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CHAPTERS = [
  { n: "01", label: "Developer", page: "02", tab: "bg-[#1b1a23] text-ivory" },
  { n: "02", label: "AI Engineer", page: "03", tab: "bg-cobalt text-white" },
  { n: "03", label: "Creator", page: "04", tab: "bg-marker text-ink" },
];

const STACK = [
  ["Next.js", "App Router & SSR"],
  ["TypeScript", "strict typing"],
  ["Node.js", "async services"],
  ["PostgreSQL", "schemas & ORM"],
  ["TailwindCSS", "custom tokens"],
];

const PRODUCTS = [
  { name: "ChatSathi", kind: "AI · SaaS", slug: "chatsathi", r: -6, stock: "paper" },
  { name: "HopeBridge", kind: "AI · RAG", slug: "hopebridge", r: 4, stock: "paper paper-cream" },
  { name: "HealSync", kind: "Full stack · Health", slug: "healsync", r: -2, stock: "paper paper-kraft" },
  { name: "Wizora", kind: "Micro-SaaS", slug: "wizora", r: 7, stock: "paper paper-ink" },
  { name: "Trip Bandhu", kind: "AI · Travel", slug: "trip-bandhu", r: -4, stock: "paper" },
  { name: "NutriMate", kind: "AI · Mobile", slug: "nutrimate", r: 3, stock: "paper paper-cream" },
];

function Watermark({ n, className }) {
  return (
    <span
      aria-hidden="true"
      className={`chapter-watermark pointer-events-none absolute left-4 md:left-12 top-10 md:top-16 font-bebas leading-none text-[34vw] md:text-[22vw] ${className}`}
    >
      {n}
    </span>
  );
}

/* ── Hand-drawn RAG flow on graph paper ─────────────────────────────────── */
const NODES = [
  { x: 24, y: 22, w: 190, label: "USER QUERY", sub: "what the person asks" },
  { x: 300, y: 22, w: 190, label: "EMBEDDING", sub: "text → vectors" },
  { x: 300, y: 150, w: 190, label: "VECTOR DB", sub: "similarity search" },
  { x: 24, y: 150, w: 190, label: "RETRIEVED", sub: "the relevant chunks" },
  { x: 24, y: 278, w: 190, label: "LLM", sub: "LangChain · CrewAI" },
  { x: 300, y: 278, w: 190, label: "RESPONSE", sub: "grounded, with sources" },
];

// A box drawn freehand: corners overshoot slightly, edges bow a little.
const wobbleBox = ({ x, y, w }, h = 70) =>
  `M${x + 3} ${y + 1} C${x + w * 0.4} ${y - 2} ${x + w * 0.7} ${y + 3} ${x + w + 2} ${y}` +
  ` C${x + w - 1} ${y + h * 0.4} ${x + w + 3} ${y + h * 0.7} ${x + w - 1} ${y + h + 1}` +
  ` C${x + w * 0.6} ${y + h + 3} ${x + w * 0.3} ${y + h - 2} ${x - 1} ${y + h}` +
  ` C${x + 2} ${y + h * 0.6} ${x - 2} ${y + h * 0.3} ${x + 5} ${y - 2}`;

function RagDiagram() {
  return (
    <svg
      viewBox="0 0 514 372"
      className="draw ink-layer w-full h-auto text-cobalt"
      role="img"
      aria-label="Retrieval-augmented generation flow: user query, embedding, vector database similarity search, retrieved context, LLM orchestrated with LangChain and CrewAI, grounded response with sources."
    >
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {NODES.map((n, i) => (
          <path key={n.label} pathLength="1" d={wobbleBox(n)} style={{ "--d": `${0.15 + i * 0.18}s` }} />
        ))}
        {/* arrows between the steps */}
        <path pathLength="1" d="M218 58c26-3 52 2 76-1m-12-9 12 9-12 8" style={{ "--d": "0.4s" }} />
        <path pathLength="1" d="M396 96c-3 16 2 32-1 50m-8-12 8 12 9-11" style={{ "--d": "0.6s" }} />
        <path pathLength="1" d="M296 186c-26 3-52-2-78 1m12-9-12 9 12 8" style={{ "--d": "0.8s" }} />
        <path pathLength="1" d="M118 224c3 16-2 32 1 50m-9-12 9 12 8-11" style={{ "--d": "1s" }} />
        <path pathLength="1" d="M218 314c26-3 52 2 76-1m-12-9 12 9-12 8" style={{ "--d": "1.2s" }} />
        {/* the question also rides along to the model */}
        <path
          pathLength="1"
          d="M20 70C-4 140-4 230 20 290"
          strokeDasharray="0.02 0.03"
          className="opacity-60"
          style={{ "--d": "1.3s" }}
        />
      </g>
      <g className="font-caveat" fill="currentColor">
        {NODES.map((n) => (
          <g key={n.label}>
            <text x={n.x + 14} y={n.y + 32} className="font-mono" fontSize="17" fontWeight="700" fill="#111">
              {n.label}
            </text>
            <text x={n.x + 14} y={n.y + 56} fontSize="20">
              {n.sub}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function Chapters() {
  const containerRef = useRef(null);
  const storyWrapRef = useRef(null);

  const goToChapter = (index) => {
    const st = ScrollTrigger.getById("storyScrollTrigger");
    if (!st) return;
    window.scrollTo({ top: st.start + (st.end - st.start) * (index / (CHAPTERS.length - 1)), behavior: "smooth" });
  };

  useGSAP(
    () => {
      const panels = gsap.utils.toArray(".story-panel");
      const total = panels.length;
      const mm = gsap.matchMedia();

      // Desktop: pinned horizontal scrub through the chapters.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => "+=" + storyWrapRef.current.offsetWidth * (total - 1);
        const tabs = containerRef.current.querySelectorAll(".chapter-tab");

        gsap.to(panels, {
          xPercent: -100 * (total - 1),
          ease: "none",
          scrollTrigger: {
            id: "storyScrollTrigger",
            trigger: storyWrapRef.current,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            // Non-directional: snap to the nearest chapter, so leftover momentum
            // (or a tab click's smooth scroll) never carries on to the next one.
            snap: { snapTo: 1 / (total - 1), directional: false, delay: 0.1, duration: { min: 0.2, max: 0.6 } },
            start: "top top",
            end: distance,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const active = Math.min(total - 1, Math.round(self.progress * (total - 1)));
              tabs.forEach((tab, i) => {
                tab.dataset.active = String(i === active);
                if (i === active) tab.setAttribute("aria-current", "step");
                else tab.removeAttribute("aria-current");
              });
            },
          },
        });

        // Background layer: numerals drift slower than the pages.
        gsap.to(".chapter-watermark", {
          xPercent: 35,
          ease: "none",
          scrollTrigger: { trigger: storyWrapRef.current, scrub: 1, start: "top top", end: distance },
        });

        // Middle layer: artifacts and notes move against the page a touch.
        gsap.to(".tech-artifact", {
          y: -18,
          ease: "none",
          scrollTrigger: { trigger: storyWrapRef.current, scrub: 1, start: "top top", end: distance },
        });
        gsap.to(".handwritten-scrap", {
          y: 12,
          rotation: (i) => (i % 2 === 0 ? -1.5 : 1.5),
          ease: "none",
          scrollTrigger: { trigger: storyWrapRef.current, scrub: 1, start: "top top", end: distance },
        });
      });

      // Mobile: natural vertical pages, each one's artifacts laid down in order.
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        panels.forEach((panel) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: panel, start: "top 78%", once: true },
          });
          const dossier = panel.querySelector(".main-dossier");
          const artifact = panel.querySelector(".tech-artifact");
          const notes = panel.querySelectorAll(".handwritten-scrap");
          if (dossier) tl.from(dossier, { opacity: 0, y: 36, duration: 0.7, ease: "power3.out" });
          if (artifact) tl.from(artifact, { opacity: 0, y: 26, duration: 0.6, ease: "power3.out" }, "-=0.35");
          if (notes.length)
            tl.from(notes, { opacity: 0, y: 12, rotation: -4, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.2");
        });
      });
    },
    { scope: containerRef }
  );

  const panelBase =
    "story-panel relative w-full shrink-0 overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 py-16 md:py-0 md:w-full md:h-screen flex flex-col md:justify-center";
  const grid = "relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-12 md:gap-8 lg:gap-12 md:pt-28 md:pb-16";

  return (
    <section id="chapters" ref={containerRef} aria-label="Chapters: developer, AI engineer, creator" className="relative">
      <div ref={storyWrapRef} className="relative flex flex-col md:h-screen md:flex-row md:flex-nowrap md:overflow-hidden">
        {/* ── Running order: divider tabs along the bottom edge (desktop) ── */}
        <nav aria-label="Chapters" className="hidden md:flex absolute bottom-0 inset-x-0 z-30 justify-center pointer-events-none">
          <ol className="pointer-events-auto flex items-start gap-1.5">
            {CHAPTERS.map((c, i) => (
              <li key={c.n}>
                <button
                  type="button"
                  onClick={() => goToChapter(i)}
                  data-active={i === 0 ? "true" : "false"}
                  aria-current={i === 0 ? "step" : undefined}
                  className={`chapter-tab ${c.tab} flex items-baseline gap-2 px-4 pt-2.5 pb-5 shadow-[var(--lift-1)] ring-1 ring-ink/15 type-label text-[0.7rem] transition duration-300 translate-y-2.5 opacity-75 hover:opacity-100 hover:translate-y-1.5 data-[active=true]:translate-y-0 data-[active=true]:opacity-100`}
                >
                  <span className="opacity-70">{c.n}</span>
                  {c.label}
                  <span className="ml-1 font-normal opacity-70">p.{c.page}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* ══ CHAPTER 01 — THE DEVELOPER · charcoal divider ══ */}
        <article aria-labelledby="ch1-title" className={`${panelBase} bg-desk-2`}>
          <Watermark n="01" className="text-ivory/[0.04]" />
          <div className="md:hidden mb-10"><RunningHead page="02" flag="ivory" /></div>

          <div className={grid}>
            <div className="main-dossier md:col-span-7 relative">
              <div className="paper paper-ink relative px-6 sm:px-9 pt-9 pb-12 [--r:-0.6deg] ring-1 ring-ivory/10">
                <Tape at="tl" w={70} />
                <h2 id="ch1-title" className="font-bebas uppercase leading-[0.9] text-ivory text-[clamp(3rem,min(6vw,9vh),5.2rem)]">
                  The Developer
                </h2>
                <p className="mt-5 max-w-[34rem] font-serif text-[1.05rem] lg:text-[1.15rem] leading-[1.7] text-ivory/85">
                  I build production-grade web applications. My foundation is{" "}
                  <span className="hl text-ink">Next.js, Node.js and React</span>. I treat code like a craft — clean
                  architecture, scalable systems and seamless user experiences.
                </p>
              </div>
              <div className="handwritten-scrap absolute -bottom-6 right-4 sm:right-10">
                <div className="paper paper-sticky px-4 py-2 [--r:-2.5deg]">
                  <Tape at="top" w={42} rotate={4} />
                  <p className="font-caveat text-xl text-ink">fast, accessible &amp; pixel-perfect.</p>
                </div>
              </div>
            </div>

            {/* Printed terminal sheet on tractor-feed paper */}
            <div className="tech-artifact md:col-span-5 relative mt-6 md:mt-0">
              <div data-reveal className="drop">
                <div className="paper paper-receipt tractor zigzag px-10 sm:px-12 pt-8 pb-9 font-mono text-[0.8rem] sm:text-[0.86rem] leading-[1.75] text-ink [--r:1.6deg] [--zz:14px]">
                  <p className="text-graphite">anish@desk:~/portfolio</p>
                  <p>
                    <span className="text-pen-deep font-bold">$</span> npm run build
                  </p>
                  <ul className="pl-4">
                    <li>✓ compiled</li>
                    <li>✓ optimized</li>
                    <li className="relative inline-block">
                      ✓ deployed
                      <CircleScribble draw className="absolute -inset-x-3 -inset-y-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1.5rem)] text-pen" strokeWidth={1.8} />
                    </li>
                  </ul>
                  <p className="mt-3">
                    <span className="text-pen-deep font-bold">$</span> stack --current
                  </p>
                  <dl className="pl-4">
                    {STACK.map(([tool, use]) => (
                      <div key={tool} className="flex items-baseline gap-2">
                        <dt className="font-bold">{tool}</dt>
                        <span className="flex-1 border-b border-dotted border-ink/30" aria-hidden="true" />
                        <dd className="text-graphite">{use}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <p aria-hidden="true" className="handwritten-scrap absolute -top-8 right-2 font-caveat text-2xl text-marker rotate-[-6deg]">
                ship it.
              </p>
            </div>
          </div>
        </article>

        {/* ══ CHAPTER 02 — THE AI ENGINEER · cobalt divider ══ */}
        <article aria-labelledby="ch2-title" className={`${panelBase} bg-[#1f3f99] [background-image:var(--grain-light)]`}>
          <Watermark n="02" className="text-white/[0.06]" />
          <div className="md:hidden mb-10"><RunningHead page="03" flag="cobalt" tone="strong" /></div>

          <div className={grid}>
            {/* Research-paper page */}
            <div className="main-dossier md:col-span-6 relative">
              <div className="paper paper-cream relative px-6 sm:px-9 pt-9 pb-10 [--r:0.5deg]">
                <Tape at="tr" w={70} />
                <h2 id="ch2-title" className="font-bebas uppercase leading-[0.9] text-ink text-[clamp(3rem,min(5.4vw,9vh),5rem)]">
                  The AI Engineer
                </h2>
                <p className="mt-5 font-serif text-[1.02rem] lg:text-[1.1rem] leading-[1.7] text-ink/85">
                  <strong className="font-bold italic text-ink">Abstract.</strong> Web dev alone wasn’t enough. I build{" "}
                  <span className="hl">intelligent systems</span> into my applications — from RAG pipelines and custom LLM
                  integrations to multi-agent workflows with LangChain and CrewAI — bridging AI research and practical
                  products.
                </p>
                <p className="mt-5 border-t border-ink/15 pt-3 font-mono text-[0.76rem] leading-relaxed text-graphite">
                  <span className="font-bold text-ink">Keywords — </span>
                  LLMs · RAG · LangChain · CrewAI · Vector DBs
                </p>
              </div>
              <p aria-hidden="true" className="handwritten-scrap mt-5 md:absolute md:-bottom-12 md:left-6 font-caveat text-2xl text-white/90 -rotate-2">
                retrieval first, generation second.
              </p>
            </div>

            {/* Hand-sketched architecture on graph paper */}
            <figure className="tech-artifact md:col-span-6 relative">
              <div data-reveal className="paper paper-graph relative px-4 sm:px-6 pt-6 pb-4 [--r:-1.4deg]">
                <Tape at="top" w={80} rotate={-2} />
                <RagDiagram />
                <figcaption className="mt-1 flex justify-between font-mono text-[0.72rem] text-graphite">
                  <span>Fig. 03.1 — a RAG pipeline, sketched</span>
                  <span className="font-caveat text-lg text-cobalt">HopeBridge runs on this</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </article>

        {/* ══ CHAPTER 03 — THE CREATOR · yellow divider ══ */}
        <article aria-labelledby="ch3-title" className={`${panelBase} bg-marker [background-image:var(--grain-dark)]`}>
          <Watermark n="03" className="text-ink/[0.07]" />
          <div className="md:hidden mb-10"><RunningHead page="04" flag="pen" tone="light" /></div>

          <div className={grid}>
            {/* Kraft product dossier */}
            <div className="main-dossier md:col-span-6 relative">
              <div className="paper paper-kraft relative px-6 sm:px-9 pt-9 pb-10 [--r:-0.8deg]">
                <Tape at="tl" w={70} />
                <h2 id="ch3-title" className="font-bebas uppercase leading-[0.9] text-[#1e140a] text-[clamp(3rem,min(5.4vw,9vh),5rem)]">
                  The Creator
                </h2>
                <p className="mt-5 font-serif text-[1.02rem] lg:text-[1.1rem] leading-[1.7] text-[#2a1d10]">
                  I don’t just write code; I ship products. I’ve launched <strong className="font-bold">5+ AI SaaS platforms</strong>{" "}
                  and keep iterating on user feedback. Now doing it every day as a Full Stack Developer at Exponent Solutions.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <Stamp rotate={-7} className="text-[2rem] sm:text-[2.4rem] text-pen-deep">5+ AI SaaS shipped</Stamp>
                  <span className="font-mono text-[0.72rem] uppercase tracking-wider text-[#5a3d1c]">Full Stack Dev · Exponent Solutions</span>
                </div>
              </div>
            </div>

            {/* Shipping tags — each one jumps to its sheet on the workbench */}
            <div className="tech-artifact md:col-span-6 relative">
              <p className="handwritten-scrap mb-4 font-caveat text-2xl text-ink -rotate-1">
                shipped &amp; tagged — pick one <ArrowCurve className="inline-block h-6 w-10 rotate-[30deg]" />
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
                {PRODUCTS.map((p) => (
                  <li key={p.slug} className="drop">
                    <a
                      href={`#work-${p.slug}`}
                      className={`${p.stock} lift relative block pl-8 pr-4 pt-4 pb-3 [clip-path:polygon(18px_0,100%_0,100%_100%,18px_100%,0_50%)]`}
                      style={{ "--r": `${p.r}deg`, "--rh": `${-p.r / 2}deg` }}
                    >
                      <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 size-2.5 rounded-full bg-marker ring-2 ring-black/25" />
                      <span className="block font-bebas text-[1.7rem] leading-none">{p.name}</span>
                      <span className="mt-1 block font-mono text-[0.66rem] uppercase tracking-wider opacity-70">{p.kind}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p aria-hidden="true" className="handwritten-scrap mt-6 font-caveat text-2xl text-ink rotate-1">
                idea → code → shipped.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
