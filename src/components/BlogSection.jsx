"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { blogs } from "@/data/blogs";
import PDFModal from "@/components/PDFModal";
import PageHead from "@/components/paper/PageHead";
import Tape from "@/components/paper/Tape";
import { Star, Squiggle } from "@/components/paper/Doodles";

const TILT = [-1.4, 1.1];

function Clipping({ blog, index, onOpen }) {
  const titleId = `clip-${blog.id}`;
  return (
    <article aria-labelledby={titleId} className="drop lift group" style={{ "--rh": `${-TILT[index] / 1.5}deg` }}>
      <div
        className="paper torn-bottom relative px-5 sm:px-7 pt-7 pb-10"
        style={{ "--r": `${TILT[index]}deg`, "--paper": "#ebe5d5" }}
      >
        <Tape at={index ? "tr" : "tl"} w={76} />
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink/75">
          <span>The notebook · no. {String(blog.id).padStart(2, "0")}</span>
          <span>{blog.date}</span>
        </div>

        <div className="relative mt-4 aspect-[16/9] overflow-hidden bg-desk">
          <Image
            src={blog.cover}
            alt=""
            fill
            sizes="(max-width: 768px) 92vw, 44vw"
            className="object-cover grayscale contrast-[1.15] sepia-[0.15] transition-[filter] duration-700 group-hover:grayscale-0 group-hover:sepia-0"
          />
        </div>

        <h3 id={titleId} className="mt-4 font-serif font-bold text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.1] text-ink text-balance">
          <button type="button" onClick={() => onOpen(blog)} className="text-left hover:text-pen-deep transition-colors">
            {blog.title}
          </button>
        </h3>
        <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-wider text-graphite">
          {blog.readTime} · {blog.tags.join(" · ")}
        </p>

        <p className="mt-4 font-serif text-[0.98rem] leading-[1.6] text-ink/85 sm:columns-2 sm:gap-6 text-justify hyphens-auto [&::first-letter]:float-left [&::first-letter]:mr-1.5 [&::first-letter]:font-bebas [&::first-letter]:text-[3.2rem] [&::first-letter]:leading-[0.8]">
          {blog.excerpt}
        </p>

        <button
          type="button"
          onClick={() => onOpen(blog)}
          className="mt-5 inline-flex min-h-11 items-center gap-2 type-label text-[0.72rem] text-ink pen-link"
        >
          <BookOpen className="size-4" aria-hidden="true" />
          Read the clipping<span className="sr-only">: {blog.title}</span>
        </button>
      </div>
    </article>
  );
}

export default function BlogSection() {
  const [activeBlog, setActiveBlog] = useState(null);
  const featured = blogs.filter((b) => b.featured);

  return (
    <>
      <section id="writing" aria-labelledby="writing-title" className="relative px-4 sm:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="relative">
            <PageHead id="writing-title" page="08" flag="ivory" title="Clippings" note="things I sat down and wrote properly" />
            <div data-reveal className="hidden sm:block absolute right-[8%] top-24 [--d:0.4s]">
              <Star draw className="size-12 text-marker rotate-12" />
            </div>
          </div>

          <div data-reveal className="mt-14 lg:mt-20 grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16 items-start">
            {featured.map((blog, i) => (
              <div key={blog.id} className={i === 1 ? "md:mt-14" : ""}>
                <Clipping blog={blog} index={i} onOpen={setActiveBlog} />
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-5">
            <Link href="/blog" className="paper paper-ink lift inline-flex min-h-12 items-center gap-2.5 px-5 type-label text-[0.74rem] [--r:-1deg]">
              All clippings
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Squiggle className="hidden sm:block h-5 w-40 text-ivory/30" />
          </div>
        </div>
      </section>

      {activeBlog && <PDFModal blog={activeBlog} onClose={() => setActiveBlog(null)} />}
    </>
  );
}
