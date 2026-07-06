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
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-[#111018]/90 font-sans opacity-0"
    >
      {/* ── Heavy Physical Clipboard / Folder ── */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[90vh] flex flex-col bg-[#E8E6E1] text-[#111018] shadow-[20px_30px_60px_rgba(0,0,0,0.8)] border-t-[12px] border-t-[#232132]"
        style={{ 
          clipPath: "polygon(0 0, 100% 0, 99.5% 100%, 0.5% 100%)",
          opacity: 0 
        }}
      >
        
        {/* Metal Clipboard Clip (Visual detail) */}
        <div className="absolute -top-[24px] left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-400 rounded-t-md shadow-lg border-b-4 border-gray-500 z-10 pointer-events-none flex items-center justify-center">
           <div className="w-16 h-2 bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b-4 border-black/20 flex-shrink-0 bg-white/50">
          <div className="flex flex-col gap-1 min-w-0">
            <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-red-600">
              DOCUMENT ID: {blog.id || "SYS-REQ-01"}
            </p>
            <h2 className="text-xl font-black uppercase tracking-tight truncate max-w-[480px]">
              {blog.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            {/* Open in new tab (Stamp) */}
            <a
              href={blog.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#232132] text-white font-mono text-[10px] font-bold tracking-widest uppercase shadow-[3px_4px_0_rgba(0,0,0,0.4)] hover:translate-y-1 hover:shadow-[1px_2px_0_rgba(0,0,0,0.4)] transition-all"
              style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0 98%)" }}
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </a>

            {/* Download (Stamp) */}
            <a
              href={blog.pdf}
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-700 text-white font-mono text-[10px] font-bold tracking-widest uppercase shadow-[3px_4px_0_rgba(0,0,0,0.4)] hover:translate-y-1 hover:shadow-[1px_2px_0_rgba(0,0,0,0.4)] transition-all"
              style={{ clipPath: "polygon(0 2%, 98% 0, 100% 98%, 2% 100%)" }}
            >
              <Download className="w-4 h-4" />
              Save
            </a>

            {/* Close */}
            <button
              onClick={handleClose}
              className="w-10 h-10 bg-red-600 text-white flex items-center justify-center font-bold shadow-[3px_4px_0_rgba(0,0,0,0.4)] hover:translate-y-1 hover:shadow-[1px_2px_0_rgba(0,0,0,0.4)] transition-all ml-2"
              style={{ clipPath: "polygon(10% 0, 100% 10%, 90% 100%, 0 90%)" }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-gray-200 border-x-4 border-black/10">
          <iframe
            src={`${blog.pdf}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            className="w-full h-full"
            title={blog.title}
            style={{ border: "none" }}
          />
        </div>

        {/* Footer (Physical Stamp Bar) */}
        <div className="flex items-center gap-4 px-6 py-4 border-t-4 border-black/20 flex-shrink-0 bg-white/50">
          <span className="font-mono text-xs font-bold text-[#111018]/60 uppercase tracking-widest bg-black/10 px-3 py-1 border border-black/20 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
            DATE: {blog.date}
          </span>
          <div className="flex gap-2 ml-auto">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] font-bold px-2 py-1 bg-[#111018] text-white uppercase tracking-widest"
                style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0 98%)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}