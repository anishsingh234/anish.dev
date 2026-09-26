import { Underline } from "./Doodles";

export function RunningHead({ page, flag, tone = "dark" }) {
  return (
    <div
      className={`running-head ${
        tone === "light" ? "!text-ink/80 !border-ink/20" : tone === "strong" ? "!text-ivory !border-ivory/30" : ""
      }`}
    >
      <span>Anish Singh — working notebook</span>
      <span className={`flag flag-${flag}`}>p. {page}</span>
    </div>
  );
}

// Top of a notebook page: running head with the page's index flag, then the
// page title with a pen underline that inks itself in, and an optional margin
// note in pencil.
export default function PageHead({ id, page, flag, title, note, className = "" }) {
  return (
    <header className={className}>
      <RunningHead page={page} flag={flag} />

      <div data-reveal className="relative mt-10 sm:mt-14 inline-block">
        <h2
          id={id}
          className="font-bebas uppercase leading-[0.88] tracking-[0.01em] text-ivory text-balance"
          style={{ fontSize: "clamp(3.25rem, 8vw, 6rem)" }}
        >
          {title}
        </h2>
        <Underline draw className="-mt-1 h-3 sm:h-4 w-[min(100%,22rem)] text-pen" />
        {note && (
          <p className="mt-3 font-caveat text-2xl sm:text-[1.7rem] leading-tight text-ivory/75 -rotate-1">
            {note}
          </p>
        )}
      </div>
    </header>
  );
}
