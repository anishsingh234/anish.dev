"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, CheckCircle2, ArrowUpRight } from "lucide-react";
import Form from "@/components/contact/Form";
import { EASE } from "./SharedComponents";

const socials = [
  {
    label: "GitHub",
    sub: "anishsingh234",
    href: "https://github.com/anishsingh234",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    sub: "linkedin.com/in/anish-ai",
    href: "https://linkedin.com/in/anish-ai",
    icon: <Linkedin className="w-[15px] h-[15px]" />,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("anishsingh210204@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 border-t border-white/[0.06] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <p className="text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase mb-4">
            ◆ &nbsp; Contact
          </p>
          <h2
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
          >
            Let&apos;s
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)" }}
            >
              Connect.
            </span>
          </h2>
        </motion.div>

        {/* ── Two column body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: info + socials ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            <p className="text-[15px] text-white/40 leading-[1.85] font-light max-w-md">
              I&apos;m actively looking for{" "}
              <span className="text-white/70 font-medium">Full-Stack / AI Engineering</span>{" "}
              opportunities. If you have an exciting role or project — let&apos;s talk.
            </p>

            {/* Email block */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono text-white/20 tracking-[0.25em] uppercase">
                Email
              </span>
              <div className="flex items-center gap-4">
                <span className="text-[15px] font-semibold text-white/65 tracking-tight">
                  anishsingh210204@gmail.com
                </span>
                <motion.button
                  onClick={copyEmail}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-white/[0.1] rounded-full text-[10px] font-mono text-white/35 hover:text-white hover:border-white/25 transition-all tracking-widest uppercase"
                >
                  {copied ? (
                    <><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Copied</>
                  ) : (
                    <><Mail className="w-3 h-3" /> Copy</>
                  )}
                </motion.button>
              </div>
            </div>

            <div className="h-px bg-white/[0.07]" />

            {/* Social rows */}
            <div className="flex flex-col gap-0">
              {socials.map(({ label, sub, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center justify-between py-4 border-b border-white/[0.06] hover:border-white/[0.13] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl border border-white/[0.07] bg-white/[0.02] flex items-center justify-center text-white/40 group-hover:text-white/70 group-hover:border-white/[0.15] group-hover:bg-white/[0.04] transition-all">
                      {icon}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-semibold text-white/55 group-hover:text-white/85 transition-colors tracking-tight">
                        {label}
                      </span>
                      <span className="text-[10px] font-mono text-white/22 tracking-wide">
                        {sub}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/15 group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </motion.a>
              ))}
              <div className="h-px bg-white/[0.06]" />
            </div>

            {/* Availability note */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-mono text-white/25 tracking-widest uppercase">
                Available for full-time roles · Jun 2026
              </span>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="border border-white/[0.07] rounded-2xl p-7 sm:p-8 bg-white/[0.02]"
          >
            <p className="text-[10px] font-mono text-white/20 tracking-[0.25em] uppercase mb-6">
              Send a message
            </p>
            <Form />
          </motion.div>

        </div>
      </div>
    </section>
  );
}