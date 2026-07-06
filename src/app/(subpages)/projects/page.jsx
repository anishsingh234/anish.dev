"use client";
import { projectsData } from "../../data";
import ProjectList from "@/components/projects";

export default function ProjectsPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#111018] font-sans">
      {/* Paper texture overlay */}
      <svg className="pointer-events-none fixed inset-0 z-[1] w-full h-full opacity-[0.15] mix-blend-overlay">
        <filter id="projects-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#projects-noise)" />
      </svg>
      
      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6">
        <ProjectList projects={projectsData} />
      </div>
    </div>
  );
}
