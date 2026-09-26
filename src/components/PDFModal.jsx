"use client";

import { useEffect, useCallback, useRef } from "react";
import { X, ExternalLink, Download } from "lucide-react";
import { gsap } from "gsap";

export default function PDFModal({ blog, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  const handleClose = useCallback(() => {
    // Reverse animation
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { rotationX: -90, transformOrigin: "top center", opacity: 0, duration: 0.4, ease: "power2.in" })
      .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    
    // Entrance animation (Clipboard dropping down)
    if (overlayRef.current && modalRef.current) {
      gsap.set(modalRef.current, { transformPerspective: 1200 });
      const tl = gsap.timeline();
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
        .fromTo(modalRef.current, 
          { rotationX: -90, transformOrigin: "top center", opacity: 0 },
          { rotationX: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)" },
          "-=0.1"
        );
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!blog) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-8 bg-desk/90 opacity-0"
    >
      {/* A clipboard holding the article */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="paper relative w-full max-w-5xl h-[90vh] flex flex-col !shadow-[var(--lift-3)] border-t-[14px] border-t-[#6b4f2c]"
        style={{ opacity: 0 }}
      >
        <div
          aria-hidden="true"
          className="absolute -top-[26px] left-1/2 -translate-x-1/2 w-32 h-7 bg-gradient-to-b from-[#c9c9d1] to-[#8d8d97] rounded-t-md shadow-[var(--lift-1)] flex items-center justify-center"
        >
          <div className="w-16 h-2 bg-[#5d5d66] rounded-full" />
        </div>

        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b-2 border-ink/15 shrink-0">
          <div className="min-w-0">
            <p className="font-mono text-[0.68rem] font-bold tracking-[0.2em] uppercase text-pen-deep">
              Clipping · {blog.date}
            </p>
            <h2 id="pdf-modal-title" className="font-bebas text-2xl sm:text-3xl leading-none text-ink truncate">
              {blog.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={blog.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="paper paper-ink min-h-11 inline-flex items-center gap-2 px-3 sm:px-4 type-label text-[0.68rem] [--r:-1deg]"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Open</span>
              <span className="sr-only sm:hidden">Open in new tab</span>
            </a>
            <a
              href={blog.pdf}
              download
              className="paper paper-sticky min-h-11 inline-flex items-center gap-2 px-3 sm:px-4 type-label text-[0.68rem] [--r:1deg]"
            >
              <Download className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Save</span>
              <span className="sr-only sm:hidden">Download PDF</span>
            </a>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close article"
              className="size-11 inline-flex items-center justify-center text-pen-deep hover:bg-pen/10 transition-colors"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-[#d9d6cd]">
          <iframe
            src={`${blog.pdf}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            className="w-full h-full"
            title={blog.title}
            style={{ border: "none" }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 px-5 sm:px-6 py-3 border-t-2 border-ink/15 shrink-0 font-mono text-[0.7rem] uppercase tracking-wider text-graphite">
          <span>{blog.readTime}</span>
          <span aria-hidden="true">·</span>
          {blog.tags.map((tag) => (
            <span key={tag} className="text-ink">#{tag.replace(/\s+/g, "")}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
