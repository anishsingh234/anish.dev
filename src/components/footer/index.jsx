"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/#experience" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/anishsingh234",
      label: "github",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/anish-ai",
      label: "linkedin",
    },
    {
      icon: Mail,
      href: "mailto:anishsingh210204@gmail.com",
      label: "email",
    },
  ];

  const techStack = ["next.js", "tailwind", "framer", "vercel"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className="relative border-t border-white/[0.04] bg-background overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8"
      >
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-14 mb-12">

          {/* Branding Column */}
          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            {/* Logo + Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-[11px] font-medium text-white tracking-wider">
                  AK
                </span>
              </div>
              <span className="text-[15px] font-semibold text-foreground tracking-[-0.3px]">
                Anish Kumar Singh
              </span>
            </div>

            {/* Tagline */}
            <p className="text-[13px] text-foreground/35 leading-[1.75] max-w-[280px] font-light">
              Full-Stack Developer &amp; AI Engineer. Building production-grade
              systems at the intersection of LLMs, RAG, and scalable
              architecture.
            </p>

            {/* Open to Work Status */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/[0.07] border border-emerald-500/20 rounded-full px-3 py-[5px] w-fit">
              <span className="relative flex h-[6px] w-[6px] flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-emerald-400" />
              </span>
              <span className="font-mono text-[11px] text-emerald-400 tracking-[0.3px]">
                open_to_work · full-time roles
              </span>
            </div>
          </motion.div>

          {/* Navigate Column */}
          <motion.div variants={itemVariants} className="md:col-start-2">
            <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-foreground/20 mb-5 font-medium">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[13.5px] text-foreground/30 hover:text-foreground/80 transition-colors duration-200"
                  >
                    <span className="w-0 h-px bg-blue-500 transition-all duration-200 group-hover:w-3 opacity-0 group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Column */}
          <motion.div variants={itemVariants}>
            <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-foreground/20 mb-5 font-medium">
              Connect
            </p>
            <div className="flex flex-col gap-[10px]">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.15 }}
                    className="group inline-flex items-center gap-[10px] px-3 py-2 rounded-lg border border-white/[0.05] bg-transparent hover:border-blue-500/20 hover:bg-blue-500/[0.04] transition-all duration-200 w-fit"
                  >
                    <Icon className="w-[14px] h-[14px] text-foreground/25 group-hover:text-foreground/60 transition-colors duration-200" />
                    <span className="font-mono text-[12.5px] text-foreground/25 group-hover:text-foreground/60 transition-colors duration-200 tracking-[0.2px]">
                      {social.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="relative mb-7">
          <div className="h-px bg-white/[0.05]" />
          <div className="absolute left-0 top-0 w-20 h-px bg-gradient-to-r from-blue-500/60 to-transparent" />
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          {/* Copyright */}
          <p className="font-mono text-[11.5px] text-foreground/20 tracking-[0.2px]">
            © {currentYear}{" "}
            <span className="text-foreground/30">Anish Kumar Singh.</span>{" "}
            All rights reserved.
          </p>

          {/* Built With Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[11px] text-foreground/15 tracking-[0.3px]">
              built with
            </span>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] px-[7px] py-[2px] rounded border border-white/[0.06] bg-white/[0.02] text-foreground/20 tracking-[0.3px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll to Top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        suppressHydrationWarning
        whileHover={{ scale: 1.05, borderColor: "rgba(59,130,246,0.25)" }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-9 h-9 rounded-lg bg-background/80 border border-white/[0.07] hidden md:flex items-center justify-center text-foreground/25 hover:text-foreground/60 transition-colors duration-200 backdrop-blur-sm"
      >
        <svg
          className="w-[14px] h-[14px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;