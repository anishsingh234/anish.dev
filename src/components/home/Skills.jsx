import PageHead from "@/components/paper/PageHead";
import Tape from "@/components/paper/Tape";
import { ArrowCurve, PaperClip } from "@/components/paper/Doodles";

// `daily` = reached for on most projects; highlighted on the sheet.
const GROUPS = [
  {
    label: "AI / ML",
    sheet: "paper paper-graph",
    place: "lg:col-span-5 lg:row-span-2",
    r: -1.2,
    tape: "tl",
    skills: [
      ["LLMs", true], ["RAG pipelines", true], ["Prompt engineering", true], ["LangChain", true],
      ["CrewAI", true], ["Vercel AI SDK", true], ["Multi-agent systems"], ["Pinecone"], ["Hugging Face"], ["Ollama"],
    ],
    note: "the part I get most excited about",
  },
  {
    label: "Frontend",
    sheet: "paper paper-lined [--margin:2.2rem] [--line:2rem] [--line-start:3.9rem]",
    place: "lg:col-span-4",
    r: 1,
    tape: "top",
    skills: [
      ["React", true], ["Next.js", true], ["TypeScript", true], ["Tailwind CSS", true], ["GSAP", true],
      ["Framer Motion"], ["React Native"], ["Expo"], ["Three.js"],
    ],
  },
  {
    label: "Backend",
    sheet: "paper",
    place: "lg:col-span-3 lg:mt-8",
    r: -2,
    clip: true,
    skills: [["Node.js", true], ["Express", true], ["FastAPI", true], ["REST APIs", true], ["GraphQL"], ["WebSockets"]],
  },
  {
    label: "Data",
    sheet: "paper paper-kraft",
    place: "lg:col-span-3",
    r: 1.8,
    tape: "tr",
    skills: [["MongoDB", true], ["Prisma ORM", true], ["Supabase", true], ["PostgreSQL"], ["MySQL"], ["Redis"]],
  },
  {
    label: "Languages",
    sheet: "paper paper-ink",
    place: "lg:col-span-4 lg:-mt-4",
    r: -0.8,
    tape: "top",
    skills: [["JavaScript", true], ["TypeScript", true], ["Python", true], ["C++"], ["SQL"], ["C"]],
  },
];

const TOOLS = ["Git", "GitHub", "Vercel", "VS Code", "Postman", "Clerk Auth", "Figma"];

// Real links between tools and the projects they power.
const CONNECTIONS = [
  { tools: "LangChain + Pinecone + FastAPI", project: "HopeBridge", href: "#work-hopebridge" },
  { tools: "Gemini API", project: "ChatSathi & NutriMate", href: "#work-chatsathi" },
  { tools: "Prisma + MongoDB", project: "HealSync", href: "#work-healsync" },
];

function Sheet({ group, index }) {
  const dark = group.sheet.includes("paper-ink");
  return (
    <div data-reveal className={group.place} style={{ "--d": `${index * 0.08}s` }}>
      <section
        aria-labelledby={`skills-${index}`}
        className={`${group.sheet} lift relative h-full px-6 pt-7 pb-6`}
        style={{ "--r": `${group.r}deg` }}
      >
        {group.tape && <Tape at={group.tape} w={70} />}
        {group.clip && <PaperClip className="absolute -top-7 right-6 h-16 w-6 rotate-12" />}
        <h3
          id={`skills-${index}`}
          className={`font-bebas text-[2.1rem] leading-none tracking-wide ${dark ? "text-marker" : "text-ink"}`}
        >
          {group.label}
        </h3>
        <ul
          className={`mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.86rem] ${dark ? "text-ivory" : "text-ink"}`}
        >
          {group.skills.map(([name, daily]) => (
            <li key={name}>
              {daily ? (
                <span className={dark ? "bg-marker px-1.5 py-0.5 text-ink" : "hl hl-draw"}>
                  {name}
                  <span className="sr-only"> (daily)</span>
                </span>
              ) : (
                <span className="opacity-80">{name}</span>
              )}
            </li>
          ))}
        </ul>
        {group.note && (
          <p className="mt-6 font-caveat text-[1.45rem] leading-tight text-pen-deep -rotate-1">{group.note}</p>
        )}
      </section>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative px-4 sm:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
      <div className="mx-auto max-w-[1240px]">
        <PageHead
          id="skills-title"
          page="06"
          flag="cobalt"
          title="Tools I actually use"
          note="highlighted = what I reach for every day"
        />

        <div className="mt-14 lg:mt-20 grid gap-8 lg:gap-10 lg:grid-cols-12 items-start">
          {GROUPS.map((g, i) => (
            <Sheet key={g.label} group={g} index={i} />
          ))}
        </div>

        {/* Tools on a receipt-strip, plus margin notes tracing tools to projects. */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 items-start">
          <div data-reveal className="lg:col-span-4">
            <div className="drop">
              <div className="paper paper-receipt zigzag px-6 pt-6 pb-7 font-mono text-[0.82rem] text-ink [--r:-1.5deg]">
                <h3 className="font-bold tracking-[0.2em]">TOOLS · DAILY KIT</h3>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                  {TOOLS.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-graphite" aria-hidden="true">·</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div data-reveal className="lg:col-span-8 [--d:0.15s]">
            <p className="font-caveat text-2xl text-ivory/70">where these actually show up →</p>
            <ul className="mt-4 grid gap-5 sm:grid-cols-3">
              {CONNECTIONS.map((c, i) => (
                <li key={c.project} className="relative" style={{ rotate: `${[-2, 1.5, -1][i]}deg` }}>
                  <ArrowCurve draw className="h-8 w-14 text-marker/80 rotate-[70deg] ml-4" style={{ "--d": `${0.3 + i * 0.2}s` }} />
                  <p className="font-mono text-[0.78rem] uppercase tracking-wider text-ivory/70">{c.tools}</p>
                  <a href={c.href} className="pen-link mt-1 inline-block font-caveat text-[1.9rem] leading-none text-marker">
                    {c.project}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
