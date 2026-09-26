"use client";

import { useEffect } from "react";

// One observer for the whole page: marks [data-reveal] elements with
// data-inview the first time they enter the viewport. CSS does the rest.
// A data attribute (not a class) so React re-renders never wipe it.
export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-inview", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );

    document
      .querySelectorAll("[data-reveal]:not([data-inview])")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
