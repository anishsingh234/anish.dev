"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading from "@/components/_ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GROUPS = [
  {
    label: "AI / ML",
    color: "#E8E6E1", // light paper
    textColor: "text-[#111018]",
    skills: [
      { name: "LLMs", icon: "devicon-jupyter-plain", hi: true },
      { name: "RAG Pipelines", icon: "devicon-azure-plain", hi: true },
      { name: "Prompt Engineering", icon: "devicon-bash-plain", hi: true },
      { name: "LangChain", icon: "devicon-python-plain", hi: true },
      { name: "CrewAI", icon: "devicon-python-plain", hi: true },
      { name: "Multi-Agent", icon: "devicon-kubernetes-plain", hi: false },
      { name: "Vercel AI SDK", icon: "devicon-vercel-plain", hi: true },
      { name: "Pinecone", icon: "devicon-postgresql-plain", hi: false },
      { name: "Hugging Face", icon: "devicon-python-plain", hi: false },
      { name: "Ollama", icon: "devicon-linux-plain", hi: false },
    ],
  },
  {
    label: "Frontend",
    color: "#232132", // dark paper
    textColor: "text-white",
    skills: [
      { name: "React.js", icon: "devicon-react-original", hi: true },
      { name: "Next.js", icon: "devicon-nextjs-plain", hi: true },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain", hi: true },
      { name: "TypeScript", icon: "devicon-typescript-plain", hi: true },
      { name: "Framer Motion", icon: "devicon-figma-plain", hi: false },
      { name: "React Native", icon: "devicon-react-original", hi: false },
      { name: "Expo", icon: "devicon-androidstudio-plain", hi: false },
      { name: "Three.js", icon: "devicon-threejs-original", hi: false },
      { name: "GSAP", icon: "devicon-javascript-plain", hi: true },
    ],
  },
  {
    label: "Backend",
    color: "#1E1A2D", // dark paper
    textColor: "text-white",
    skills: [
      { name: "Node.js", icon: "devicon-nodejs-plain", hi: true },
      { name: "Express.js", icon: "devicon-express-original", hi: true },
      { name: "FastAPI", icon: "devicon-fastapi-plain", hi: true },
      { name: "REST APIs", icon: "devicon-swagger-plain", hi: true },
      { name: "GraphQL", icon: "devicon-graphql-plain", hi: false },
      { name: "WebSockets", icon: "devicon-nodejs-plain", hi: false },
    ],
  },
  {
    label: "Database",
    color: "#E8E6E1", // light paper
    textColor: "text-[#111018]",
    skills: [
      { name: "MongoDB", icon: "devicon-mongodb-plain", hi: true },
      { name: "Prisma ORM", icon: "devicon-prisma-original", hi: true },
      { name: "MySQL", icon: "devicon-mysql-plain", hi: false },
      { name: "Supabase", icon: "devicon-supabase-plain", hi: true },
      { name: "Redis", icon: "devicon-redis-plain", hi: false },
    ],
  },
  {
    label: "Languages",
    color: "#232132", // dark paper
    textColor: "text-white",
    skills: [
      { name: "JavaScript", icon: "devicon-javascript-plain", hi: true },
      { name: "TypeScript", icon: "devicon-typescript-plain", hi: true },
      { name: "Python", icon: "devicon-python-plain", hi: true },
      { name: "C++", icon: "devicon-cplusplus-plain", hi: false },
      { name: "SQL", icon: "devicon-azuresqldatabase-plain", hi: false },
      { name: "C", icon: "devicon-c-plain", hi: false },
    ],
  },
  {
    label: "Tools",
    color: "#1E1A2D", // dark paper
    textColor: "text-white",
    skills: [
      { name: "Git", icon: "devicon-git-plain", hi: true },
      { name: "GitHub", icon: "devicon-github-original", hi: true },
      { name: "Vercel", icon: "devicon-vercel-plain", hi: true },
      { name: "VS Code", icon: "devicon-vscode-plain", hi: true },
      { name: "Postman", icon: "devicon-postman-plain", hi: false },
      { name: "Clerk Auth", icon: "devicon-nodejs-plain", hi: false },
      { name: "Figma", icon: "devicon-figma-plain", hi: false },
    ],
  },
];

// Helper to generate a random rotation between -5 and 5 degrees
const getRandomRotation = () => Math.random() * 10 - 5;

// The SVG Marker Circle
const RedMarker = () => (
  <svg
    className="marker-circle absolute -inset-2 w-[calc(100%+1rem)] h-[calc(100%+1rem)] pointer-events-none z-10"
    viewBox="0 0 100 40"
    preserveAspectRatio="none"
  >
    <path
      d="M10,20 C10,5 90,5 90,20 C90,35 10,35 10,20 C10,10 90,10 90,20"
      fill="none"
      stroke="#EF4444"
      strokeWidth="3"
      strokeLinecap="round"
      className="opacity-80"
    />
  </svg>
);

export default function Skills() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // 1. Description note entrance
      gsap.from(".skills-desc-note", {
        x: -40,
        opacity: 0,
        rotationZ: 5,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      // 2. Folder and Stickers Animation
      const folders = gsap.utils.toArray(".skill-folder");

      folders.forEach((folder, index) => {
        const tab = folder.querySelector(".folder-tab");
        const stickers = folder.querySelectorAll(".skill-sticker");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: folder,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Folder container slides up
        tl.from(folder, {
          y: 100,
          opacity: 0,
          rotationZ: index % 2 === 0 ? -2 : 2,
          duration: 0.8,
          ease: "power3.out",
        })
          // Tab pops out from behind the body
          .from(
            tab,
            {
              yPercent: 100,
              opacity: 0,
              duration: 0.5,
              ease: "back.out(2)",
            },
            "-=0.4",
          )
          // Stickers get slapped onto the folder
          .from(
            stickers,
            {
              scale: 0,
              opacity: 0,
              rotationZ: () => Math.random() * 40 - 20, // start with extreme random rotation
              duration: 0.5,
              stagger: 0.05,
              ease: "back.out(2)",
            },
            "-=0.3",
          );
      });
    },
    { scope: sectionRef },
  );

  return (
    <>
      <section
        id="skills"
        ref={sectionRef}
        className="relative bg-transparent font-sans overflow-hidden border-t-2 border-white/5"
      >
        {/* ── Intro Header ── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-10 relative z-10 overflow-hidden sm:overflow-visible">
          
          <SectionHeading
            eyebrow="Tech Arsenal"
            title="The"
            accent="Dossier"
            className="mb-8"
          />

          <p className="skills-desc-note text-white/80 font-sans max-w-xl text-lg bg-black/40 p-4 border-l-4 border-purple-500 rounded-r-lg relative transform -rotate-1 shadow-lg">
            <span className="absolute -top-3 left-6 w-12 h-4 bg-white/20 backdrop-blur-sm rotate-3 shadow-sm" />
            A comprehensive collection of the tools, languages, and frameworks I use to build intelligent systems and scalable web applications.
          </p>
        </div>

        {/* ── Skill Folders Grid ── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GROUPS.map((group, i) => {
              const isDark = group.textColor === "text-[#111018]";
              return (
                <div key={group.label} className="skill-folder relative">
                  {/* Folder Tab */}
                  <div
                    className="folder-tab w-48 h-12 flex items-center justify-center relative z-0"
                    style={{
                      backgroundColor: group.color,
                      clipPath: "polygon(0 100%, 10% 0, 90% 0, 100% 100%)",
                      boxShadow: "0 -5px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    <span
                      className={`font-mono text-xs font-bold uppercase tracking-widest ${group.textColor}`}
                    >
                      {group.label}
                    </span>
                  </div>

                  {/* Folder Body */}
                  <div
                    className="folder-body w-full rounded-b-xl rounded-tr-xl p-8 relative z-10"
                    style={{
                      backgroundColor: group.color,
                      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                      clipPath: "polygon(0 0, 100% 0, 99% 100%, 1% 99%)",
                    }}
                  >
                    {/* Top Secret Stamp */}
                    <div className="absolute top-4 right-4 opacity-30 transform rotate-12 pointer-events-none select-none border-4 border-red-500 text-red-500 font-bebas tracking-[0.2em] p-1 text-xl">
                      CONFIDENTIAL
                    </div>

                    <h3
                      className={`text-4xl font-bebas tracking-wide mb-6 ${group.textColor}`}
                    >
                      {group.label}
                    </h3>

                    {/* Stickers Container */}
                    <div className="flex flex-wrap gap-3 justify-start">
                      {group.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className={`skill-sticker relative flex items-center gap-2 px-3 py-2 shadow-lg transition-transform hover:scale-110 hover:z-50 cursor-default ${
                            isDark
                              ? "bg-[#111018] text-white border-2 border-white/10"
                              : "bg-white text-[#111018] border-2 border-black/10"
                          }`}
                          style={{
                            transform: `rotate(${getRandomRotation()}deg)`,
                            clipPath: "polygon(2% 2%, 98% 0, 100% 98%, 0 100%)",
                          }}
                        >
                          <i className={`${skill.icon} text-xl`} />
                          <span className="font-mono text-sm font-bold select-none">
                            {skill.name}
                          </span>

                          {/* Red Marker for highlighted skills */}
                          {skill.hi && <RedMarker />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
