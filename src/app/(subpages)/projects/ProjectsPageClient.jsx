"use client";
import { projectsData } from "../../data";
import ProjectList from "@/components/projects";

export default function ProjectsPageClient() {
  return (
    <div className="relative w-full min-h-screen bg-[#111018] font-sans">
      {/* Lightweight static noise texture — replaces expensive SVG feTurbulence filter */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3Oeli3teleVlZWQkJCLi4ubm5unp6edHR0teleeli3teleVlZWMjIx5eXlzc3Otra2jo6MAAAA4teleelTD/AAAAGnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC2fNK/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVRIie3NMQEAIAzAMMC/5+GAmw5rJM3OxhhsGAYRERERERERERERERERERERERERERERERERERERERERERERkT4f7B8BYQpDAAAAAElFTkSuQmCC")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6">
        <ProjectList projects={projectsData} />
      </div>
    </div>
  );
}
