"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
  const containerRef = useRef(null);
  const scrollWrapRef = useRef(null);

  useGSAP(() => {
    // 1. Horizontal Scroll Pinning
    const folders = gsap.utils.toArray(".dossier-folder");
    
    gsap.to(folders, {
      xPercent: -100 * (folders.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: scrollWrapRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (folders.length - 1),
        start: "top top",
        end: () => "+=" + (scrollWrapRef.current.offsetWidth * 2), // Extend scroll distance
      }
    });

    // 2. Draw Red Markers when the folder comes into view
    folders.forEach((folder, i) => {
      // Find all markers in this specific folder
      const markers = folder.querySelectorAll(".marker-circle path");
      
      // Calculate when this specific folder is active during the scrub
      const startProgress = i / folders.length;
      const endProgress = (i + 1) / folders.length;
      
      gsap.fromTo(markers, 
        { strokeDasharray: 300, strokeDashoffset: 300 },
        {
          strokeDashoffset: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scrollWrapRef.current,
            start: () => `top+=${startProgress * 200}% top`,
            end: () => `top+=${endProgress * 200}% top`,
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <>
      {/* Devicon CDN */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

      <section ref={containerRef} id="skills" className="relative bg-transparent font-sans overflow-hidden border-t-2 border-white/5">
        
        {/* ── Intro Header ── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-10 relative z-10">
          <p className="text-2xl font-caveat text-purple-400 mb-2 transform -rotate-2">
            Tech Arsenal
          </p>
          <h2 className="font-bebas text-white leading-none tracking-wide mb-8" style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
            The <span className="text-transparent" style={{ WebkitTextStroke: "2px #A78BFA" }}>Dossier</span>
          </h2>
          <p className="text-white/80 font-sans max-w-xl text-lg bg-black/40 p-4 border-l-4 border-purple-500 rounded-r-lg">
            A comprehensive collection of the tools, languages, and frameworks I use to build intelligent systems and scalable web applications. Scroll to browse the files.
          </p>
        </div>

        {/* ── Scrollytelling Pinned Folders ── */}
        <div ref={scrollWrapRef} className="h-screen flex flex-nowrap overflow-hidden relative z-10 items-center bg-[#111018]/50">
          
          {GROUPS.map((group, i) => {
            const isDark = group.textColor === "text-[#111018]";
            return (
              <div key={group.label} className="dossier-folder w-screen h-[85vh] flex-shrink-0 flex items-center justify-center p-4 md:p-12 relative">
                
                {/* Background big index number */}
                <div className="absolute top-4 left-8 md:top-12 md:left-20 text-[15vw] font-black text-white/[0.02] pointer-events-none select-none z-0">
                  0{i + 1}
                </div>

                {/* The Manila Folder */}
                <div className="relative w-full max-w-5xl h-full mt-10 md:mt-0 z-10 flex flex-col">
                  
                  {/* Folder Tab */}
                  <div 
                    className="w-48 h-12 md:w-64 md:h-16 flex items-center justify-center"
                    style={{ 
                      backgroundColor: group.color,
                      clipPath: "polygon(0 100%, 10% 0, 90% 0, 100% 100%)",
                      boxShadow: "0 -5px 10px rgba(0,0,0,0.2)"
                    }}
                  >
                    <span className={`font-mono text-xs md:text-sm font-bold uppercase tracking-widest ${group.textColor}`}>
                      {group.label}
                    </span>
                  </div>
                  
                  {/* Folder Body */}
                  <div 
                    className={`flex-1 w-full rounded-b-xl rounded-tr-xl p-8 md:p-12 lg:p-16 relative`}
                    style={{ 
                      backgroundColor: group.color,
                      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                      clipPath: "polygon(0 0, 100% 0, 99% 100%, 1% 99%)"
                    }}
                  >
                    
                    {/* Top Secret Stamp */}
                    <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-30 transform rotate-12 pointer-events-none select-none border-4 border-red-500 text-red-500 font-bebas tracking-[0.2em] p-2 text-3xl md:text-5xl">
                      CONFIDENTIAL
                    </div>

                    <h3 className={`text-5xl md:text-7xl font-bebas tracking-wide mb-12 ${group.textColor}`}>
                      {group.label}
                    </h3>

                    {/* Stickers Container */}
                    <div className="flex flex-wrap gap-4 md:gap-6 justify-start">
                      {group.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className={`relative flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 shadow-lg transition-transform hover:scale-110 hover:z-50 cursor-default ${
                            isDark ? "bg-[#111018] text-white border-2 border-white/10" : "bg-white text-[#111018] border-2 border-black/10"
                          }`}
                          style={{ 
                            transform: `rotate(${getRandomRotation()}deg)`,
                            clipPath: "polygon(2% 2%, 98% 0, 100% 98%, 0 100%)"
                          }}
                        >
                          <i className={`${skill.icon} text-2xl md:text-3xl`} />
                          <span className="font-mono text-sm md:text-base font-bold select-none">
                            {skill.name}
                          </span>
                          
                          {/* Red Marker for highlighted skills */}
                          {skill.hi && <RedMarker />}
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </section>
    </>
  );
}