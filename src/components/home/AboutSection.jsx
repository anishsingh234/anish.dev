import { ArrowUpRight, Mail } from "lucide-react";
import { RunningHead } from "@/components/paper/PageHead";
import { Underline, CircleScribble } from "@/components/paper/Doodles";
import Tape from "@/components/paper/Tape";
import { CONTACT } from "@/components/paper/pages";

const IDENTITIES = [
  { text: "Full Stack Developer", circled: true },
  { text: "AI Engineer", circled: true },
  { text: "Builder" },
  { text: "Explorer" },
];

// Line items from the real record — nothing here is decorative filler.
const RECEIPT = [
  { item: "Projects built", qty: "12+" },
  { item: "AI SaaS shipped", qty: "5+" },
  { item: "DSA problems solved", qty: "350+" },
  { item: "Production experience", qty: "6mo+", note: "Exponent Solutions · 3,000+ users" },
  { item: "B.Tech CS (AI & ML)", qty: "’26", note: "UTU Dehradun" },
];

// Fixed bar widths so the barcode renders identically on server and client.
const BARS = [3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2];

function Receipt() {
  let x = 0;
  return (
    <div className="drop">
      <div className="paper paper-receipt zigzag w-[17.5rem] px-5 pt-7 pb-8 font-mono text-[0.78rem] leading-[1.55] text-ink [--r:3deg]">
        <p className="text-center font-bold tracking-[0.2em]">ANISH SINGH</p>
        <p className="text-center text-[0.68rem] tracking-[0.18em] text-graphite">RECEIPT OF WORK · NO. AKS-26</p>
        <p className="my-2 overflow-hidden whitespace-nowrap text-graphite" aria-hidden="true">
          - - - - - - - - - - - - - - - - - - - -
        </p>
        <dl>
          {RECEIPT.map(({ item, qty, note }) => (
            <div key={item} className="py-0.5">
              <div className="flex items-baseline gap-2">
                <dt className="uppercase">{item}</dt>
                <span className="flex-1 border-b border-dotted border-ink/35 translate-y-[-3px]" aria-hidden="true" />
                <dd className="font-bold tabular-nums">{qty}</dd>
              </div>
              {note && <p className="pl-3 text-[0.7rem] text-graphite">{note}</p>}
            </div>
          ))}
        </dl>
        <p className="my-2 overflow-hidden whitespace-nowrap text-graphite" aria-hidden="true">
          = = = = = = = = = = = = = = = = = = = =
        </p>
        <div className="flex justify-between font-bold">
          <span>NOW</span>
          <span className="hl">FULL STACK DEVELOPER</span>
        </div>
        <div className="flex justify-between">
          <span>AT</span>
          <span>EXPONENT SOLUTIONS</span>
        </div>

        <svg viewBox="0 0 120 30" className="mt-4 h-9 w-full" aria-hidden="true">
          {BARS.map((w, i) => {
            const rect = <rect key={i} x={x} y="0" width={w * 1.4} height="30" fill={i % 2 ? "transparent" : "#111"} />;
            x += w * 1.4 + 0.6;
            return rect;
          })}
        </svg>
        <p className="mt-2 text-center font-caveat text-lg text-graphite">thanks for scrolling this far</p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative px-4 sm:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <RunningHead page="01" flag="kraft" />

        <div className="relative mt-14 lg:mt-20 lg:pr-24">
          {/* The open notebook: two pages sharing a spine. */}
          <div data-reveal className="grid md:grid-cols-2 shadow-[var(--lift-2)] md:rotate-[-0.6deg]">
            {/* ── Left page: lined, handwritten ── */}
            <div className="paper paper-lined relative !shadow-none px-6 pl-[4.2rem] sm:pl-20 pt-8 pb-12 [--line:2.25rem] [--line-start:0.4rem] [--margin:3rem] sm:[--margin:3.6rem]">
              <span
                aria-hidden="true"
                className="hidden md:block absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/25 to-transparent"
              />
              <h2
                id="about-title"
                className="relative inline-block font-caveat font-bold text-ink leading-[0.9] -rotate-2 text-[clamp(4rem,9vw,6.5rem)]"
              >
                Who am I?
                <Underline draw className="absolute -bottom-2 left-0 h-4 w-full text-pen [--d:0.5s]" />
              </h2>

              <ul className="mt-10 font-caveat text-[1.6rem] sm:text-[1.85rem] leading-[2.25rem] text-ink">
                {IDENTITIES.map(({ text, circled }, i) => (
                  <li key={text} className="flex items-center gap-3">
                    <span className="font-mono text-sm text-graphite">{String(i + 1).padStart(2, "0")}</span>
                    <span className="relative">
                      {text}
                      {circled && (
                        <CircleScribble
                          draw
                          className="absolute -inset-x-3 -inset-y-1 h-[calc(100%+0.5rem)] w-[calc(100%+1.5rem)] text-pen/80"
                          strokeWidth={1.8}
                        />
                      )}
                    </span>
                  </li>
                ))}
                <li className="flex flex-wrap items-center gap-x-3 text-graphite">
                  <span className="font-mono text-sm">05</span>
                  <span className="strike">just a CRUD-app dev</span>
                  <span className="text-pen-deep text-2xl -rotate-3">nope.</span>
                </li>
              </ul>

              <p className="mt-10 max-w-[18rem] font-caveat text-2xl leading-[2.25rem] text-cobalt rotate-[-1.5deg]">
                Patna → Dehradun → Gurugram.
                <br />
                B.Tech AI &amp; ML, class of ’26.
              </p>
            </div>

            {/* ── Right page: a torn bio sheet pasted in ── */}
            <div className="paper paper-cream relative !shadow-none px-5 sm:px-10 pt-10 pb-12">
              <span
                aria-hidden="true"
                className="hidden md:block absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/20 to-transparent"
              />
              <div className="drop relative">
                <Tape at="top" w={88} rotate={-3} />
                <div className="paper torn-bottom px-6 sm:px-8 pt-8 pb-10 [--r:0.8deg] font-serif text-[1.07rem] sm:text-[1.13rem] leading-[1.7] text-ink/90">
                  <p>
                    I’m a <strong className="font-bold text-ink">full-stack developer</strong> who builds production-grade web
                    applications with Next.js, React, Node.js and modern databases — then makes them intelligent.
                  </p>
                  <p className="mt-4">
                    What sets me apart is layering <span className="hl hl-draw">AI capabilities on solid engineering</span>: LLMs,
                    RAG pipelines, agents and multi-agent workflows that actually work in production.
                  </p>
                  <p className="mt-4">
                    I think in systems, ship fast, and care about code quality and the person using the thing. Whether it’s a
                    scalable backend, a careful UI, or an LLM inside a product, I can{" "}
                    <span className="hl hl-draw [--hl-d:0.7s]">own the entire stack</span> and deliver.
                  </p>
                  <p className="mt-4">
                    Right now: Full Stack Developer at{" "}
                    <strong className="font-bold text-ink">Exponent Solutions</strong> in Gurugram, B.Tech AI &amp; ML,
                    class of ’26.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="paper paper-ink lift inline-flex min-h-12 items-center gap-2.5 px-5 type-label text-[0.76rem] [--r:-1deg]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email me
                </a>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pen-link inline-flex items-center gap-1.5 min-h-11 font-serif text-lg text-ink"
                >
                  LinkedIn
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Receipt stapled over the corner ── */}
          <div className="relative mt-12 flex justify-center lg:-mt-28 lg:justify-end lg:-mr-16">
            <div data-reveal className="drift relative [--drift:24px] [--d:0.2s]">
              <Receipt />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
