"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Check, Copy, FileDown } from "lucide-react";
import Form from "@/components/contact/Form";
import { RunningHead } from "@/components/paper/PageHead";
import { Underline, Bulb, Spiral, CoffeeRing } from "@/components/paper/Doodles";
import Tape from "@/components/paper/Tape";
import Stamp from "@/components/paper/Stamp";
import { CONTACT } from "@/components/paper/pages";

// Three.js only loads on tablet/desktop: fetched and parsed in idle time after
// the page settles, mounted as this page approaches — never mid-scroll.
const loadScene = () => import("./NotebookScene");
const NotebookScene = dynamic(loadScene, { ssr: false });

function ContactSlip() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  const rows = [
    { k: "github", v: "anishsingh234", href: CONTACT.github },
    { k: "linkedin", v: "in/anish-ai", href: CONTACT.linkedin },
  ];

  return (
    <div className="drop">
      <div className="paper torn-bottom relative px-6 sm:px-8 pt-8 pb-12 [--r:-1.5deg]">
        <Tape at="top" w={86} rotate={2} />
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-bebas text-[2rem] leading-none text-ink">Contact slip</h3>
          <Stamp rotate={8} className="text-base text-pen-deep" decorative>
            Say hi
          </Stamp>
        </div>

        <dl className="mt-5 space-y-4">
          <div className="border-b border-dotted border-ink/35 pb-3">
            <dt className="font-caveat text-2xl leading-none text-cobalt">email</dt>
            <dd className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href={`mailto:${CONTACT.email}`} className="pen-link break-all font-serif text-[1.08rem] text-ink">
                {CONTACT.email}
              </a>
              <button
                type="button"
                onClick={copy}
                className="paper paper-sticky min-h-9 inline-flex items-center gap-1.5 px-2.5 type-label text-[0.66rem] [--r:2deg]"
              >
                {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <span role="status" className="sr-only">
                {copied ? "Email address copied" : ""}
              </span>
            </dd>
          </div>
          {rows.map((r) => (
            <div key={r.k} className="border-b border-dotted border-ink/35 pb-3">
              <dt className="font-caveat text-2xl leading-none text-cobalt">{r.k}</dt>
              <dd className="mt-1">
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="pen-link inline-flex items-center gap-1 font-serif text-[1.08rem] text-ink">
                  {r.v}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </dd>
            </div>
          ))}
          <div>
            <dt className="font-caveat text-2xl leading-none text-cobalt">resume</dt>
            <dd className="mt-2">
              <a
                href={CONTACT.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="paper paper-sticky lift inline-flex min-h-11 items-center gap-2 px-4 type-label text-[0.72rem] [--r:-1deg]"
              >
                <FileDown className="size-4" aria-hidden="true" />
                Download PDF
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default function Contact() {
  const sceneRef = useRef(null);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches || !sceneRef.current) return;
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500));
    const cancelIdle = window.cancelIdleCallback || clearTimeout;
    const idleId = idle(() => loadScene(), { timeout: 5000 });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowScene(true);
          io.disconnect();
        }
      },
      { rootMargin: "1200px 0px" }
    );
    io.observe(sceneRef.current);
    return () => {
      cancelIdle(idleId);
      io.disconnect();
    };
  }, []);

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative px-4 sm:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
      <div className="mx-auto max-w-[1240px]">
        <RunningHead page="09" flag="yellow" />

        <div className="mt-12 lg:mt-16 grid gap-10 lg:grid-cols-12 items-center">
          <div data-reveal className="lg:col-span-6 relative">
            <h2
              id="contact-title"
              className="font-caveat font-bold text-ivory leading-[0.85] -rotate-2 text-[clamp(4.4rem,11vw,8.4rem)]"
            >
              One last page.
            </h2>
            <Underline draw className="mt-1 h-5 w-[min(100%,27rem)] text-pen" />
            <p className="mt-8 font-bebas uppercase leading-[0.95] text-ivory text-[clamp(2.2rem,4.6vw,3.5rem)]">
              Have an idea? <span className="text-marker">Let’s build it.</span>
            </p>
            <p className="mt-5 max-w-[34rem] font-serif text-[1.12rem] leading-[1.7] text-ivory/80">
              Got an idea worth building, a tough problem, or just want to talk shop about web and AI? My inbox is
              open.
            </p>
            <Bulb draw className="hidden sm:block absolute -top-4 right-2 lg:right-10 h-16 w-12 text-marker rotate-12 [--d:0.9s]" />
          </div>

          {/* The notebook, left open on the desk */}
          <div data-reveal className="relative lg:col-span-6 [--d:0.1s]">
            <CoffeeRing className="pointer-events-none absolute -left-6 -bottom-4 size-40 opacity-80 hidden md:block" />
            <div ref={sceneRef} aria-hidden="true" className="relative hidden md:block aspect-[4/3] w-full">
              {showScene && <NotebookScene className="absolute inset-0" />}
            </div>
            <Spiral draw className="hidden md:block absolute right-4 -top-2 size-12 text-ivory/40 [--d:0.6s]" />
          </div>
        </div>

        <div className="mt-14 lg:mt-10 grid gap-12 lg:gap-16 lg:grid-cols-12 items-start">
          <div data-reveal className="lg:col-span-5">
            <ContactSlip />
          </div>

          <div data-reveal className="lg:col-span-7 [--d:0.1s]">
            <div className="paper paper-lined relative px-6 pl-[4.2rem] sm:pl-20 pr-6 sm:pr-10 pt-8 pb-10 [--r:0.8deg] [--line:2rem] [--line-start:0.6rem] [--margin:3rem] sm:[--margin:3.6rem]">
              <Tape at="tr" w={80} />
              <h3 className="font-caveat text-[2.2rem] leading-[2rem] text-ink">Dear Anish,</h3>
              <div className="mt-6">
                <Form />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
