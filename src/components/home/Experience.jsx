import PageHead from "@/components/paper/PageHead";
import Stamp from "@/components/paper/Stamp";
import { CheckBox, ArrowCurve } from "@/components/paper/Doodles";

const ENTRIES = [
  {
    year: "2026",
    period: "Jul 2026 — present",
    role: "Full Stack Developer",
    org: "Exponent Solutions",
    where: "Gurugram · Onsite",
    stamp: "Current",
    bullets: [
      "Raised a client site’s mobile Lighthouse score from ~50 to 95 in a performance sprint",
      "Cut its mobile load time from 25–28s to under 10s",
      "Fixed a hydration double-fetch across 8–10 client hooks and an LCP regression from SSR device detection",
      "Migrated to next/image, compressed a 586MB gallery to WebP (<300KB each) and trimmed framer-motion across 123 files — CLS 0, Speed Index under 3s",
      "Built a LazyAutoplayVideo component on IntersectionObserver, removing ~36MB from initial page load",
      "Designed a 4-level SEO CMS (Global / Event / Location / LocationEvent) with a TipTap editor for non-technical staff",
      "Built QR waiver and RFID wallet top-up systems, and architected an end-to-end Purchase QR Redemption flow",
      "Delivered a pixel-perfect Next.js/Tailwind site and dynamic zone pages for edutainment clients",
    ],
    tech: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "TipTap"],
    margin: "Lighthouse 50 → 95",
  },
  {
    year: "2025",
    period: "Nov 2025 — Jul 2026",
    role: "Full Stack Developer Intern",
    org: "Exponent Solutions",
    where: "Remote",
    stamp: "Hired",
    bullets: [
      "Developed and deployed 3+ full-stack applications serving 3,000+ users",
      "Built a RAG-based AI chatbot using LLMs and vector embeddings",
      "Designed scalable REST APIs and optimized MongoDB queries",
      "Improved frontend performance with a reusable component architecture",
    ],
    tech: ["Next.js", "React", "Node.js", "MongoDB", "LLMs", "RAG"],
    margin: "3,000+ real users",
  },
  {
    year: "2022",
    period: "Aug 2022 — Jun 2026",
    role: "B.Tech — Computer Science (AI & ML)",
    org: "Uttarakhand Technical University",
    where: "Dehradun, India",
    stamp: "Class of ’26",
    bullets: [
      "Specialization in Artificial Intelligence & Machine Learning",
      "350+ DSA problems solved on LeetCode",
      "Built production AI SaaS projects alongside coursework",
    ],
    margin: "most of the projects happened here",
  },
  {
    year: "2021",
    period: "2021 — 2022",
    role: "Class 12 — Science (PCM)",
    org: "Kendriya Vidyalaya",
    where: "Patna, India",
    stamp: "Done",
    bullets: [],
  },
];

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative px-4 sm:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
      <div className="mx-auto max-w-[1240px]">
        <PageHead id="experience-title" page="07" flag="mint" title="The log" note="what I’ve learned — dated, ticked off" />

        <div data-reveal className="relative mx-auto mt-14 lg:mt-20 max-w-[820px]">
          {/* Legal pad: glued binding strip, then the yellow sheet. */}
          <div className="paper paper-legal relative !shadow-[var(--lift-2)] [--r:-0.5deg] [--line-start:3.5rem]">
            <div
              aria-hidden="true"
              className="h-10 bg-[#6d1f2e] [background-image:var(--grain-light)] shadow-[0_3px_4px_rgb(0_0_0/0.25)] flex items-center justify-around px-10"
            >
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1 w-9 bg-[#c7c7cf] shadow-[0_1px_0_rgb(0_0_0/0.5)]" />
              ))}
            </div>

            <ol className="pl-[4.4rem] pr-5 sm:pr-10 pt-8 pb-10">
              {ENTRIES.map((e, idx) => (
                <li key={e.role} data-reveal className={`relative ${idx > 0 ? "mt-12" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-bebas text-[2.6rem] leading-none text-ink">{e.year}</span>
                    <span className="h-px flex-1 bg-ink/40" aria-hidden="true" />
                    <span className="font-mono text-[0.74rem] uppercase tracking-wider text-ink/75">{e.period}</span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <div>
                      <h3 className="font-bebas text-[clamp(1.9rem,3.6vw,2.5rem)] leading-[0.95] text-ink">{e.role}</h3>
                      <p className="mt-1 font-serif text-[1.08rem] italic text-ink/85">
                        {e.org}
                        <span className="not-italic font-mono text-[0.72rem] uppercase tracking-wider text-ink/65"> · {e.where}</span>
                      </p>
                    </div>
                    <Stamp rotate={idx % 2 ? 6 : -8} className="text-[1.35rem] text-pen-deep" decorative>
                      {e.stamp}
                    </Stamp>
                  </div>

                  {e.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 font-serif text-[1.02rem] leading-snug text-ink/90">
                      {e.bullets.map((b, i) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <CheckBox className="mt-0.5 size-5 shrink-0 text-ink/80" style={{ "--d": `${0.25 + i * 0.18}s` }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {e.tech && (
                    <p className="mt-4 font-mono text-[0.76rem] text-ink/75">
                      <span className="font-bold text-ink">stack: </span>
                      {e.tech.join(" / ")}
                    </p>
                  )}

                  {e.margin && (
                    <p
                      aria-hidden="true"
                      className="hidden xl:flex items-center gap-2 absolute top-16 left-[calc(100%+3.5rem)] w-56 font-caveat text-[1.5rem] leading-tight text-ivory/75 rotate-[-3deg]"
                    >
                      <ArrowCurve draw className="h-8 w-12 shrink-0 -scale-x-100 rotate-[200deg] text-marker/80" />
                      {e.margin}
                    </p>
                  )}
                </li>
              ))}
            </ol>

            <div className="border-t-2 border-dashed border-ink/30 mx-5 sm:mx-10 ml-[4.4rem] py-5 flex flex-wrap items-end justify-between gap-4">
              <p className="font-mono text-[0.76rem] uppercase tracking-wider text-ink/80">
                EOF — to be continued
              </p>
              <p className="font-caveat text-3xl text-ink -rotate-3">— A.K.S.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
