// Hand-drawn marks. Every path uses pathLength="1" so adding the `draw` class
// makes it ink itself in when its section scrolls into view (see globals.css).

function Svg({ viewBox, className = "", draw = false, strokeWidth = 2.2, preserve, style, children }) {
  return (
    <svg
      viewBox={viewBox}
      className={`${draw ? "draw " : ""}${className}`}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio={preserve}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function ArrowCurve(props) {
  return (
    <Svg viewBox="0 0 120 80" {...props}>
      <path pathLength="1" d="M6 14C38 4 86 10 106 56" />
      <path pathLength="1" d="M91 50l16 9 3-18" />
    </Svg>
  );
}

export function ArrowLoop(props) {
  return (
    <Svg viewBox="0 0 140 90" {...props}>
      <path pathLength="1" d="M8 72C30 22 70 10 76 40c4 22-24 24-18 0 6-22 46-24 70-2" />
      <path pathLength="1" d="M114 29l15 9-11 14" />
    </Svg>
  );
}

export function ArrowDown(props) {
  return (
    <Svg viewBox="0 0 40 84" {...props}>
      <path pathLength="1" d="M20 4c-4 22 4 44-1 70" />
      <path pathLength="1" d="M8 61l11 14 11-13" />
    </Svg>
  );
}

export function Underline(props) {
  return (
    <Svg viewBox="0 0 300 22" preserve="none" strokeWidth={3} {...props}>
      <path pathLength="1" d="M4 12c56-6 116 3 176-3s90-2 116 2" />
      <path pathLength="1" d="M26 17c64-4 144 1 232-4" />
    </Svg>
  );
}

export function CircleScribble(props) {
  return (
    <Svg viewBox="0 0 200 80" preserve="none" {...props}>
      <path
        pathLength="1"
        d="M100 8C40 6 8 22 10 42c2 24 60 34 110 30s74-22 70-40C186 14 140 4 82 12"
      />
    </Svg>
  );
}

/* ── Margin doodles: the things a pen does while its owner is thinking ── */

export function Star(props) {
  return (
    <Svg viewBox="0 0 48 48" {...props}>
      <path pathLength="1" d="M24 5l5 13 14 1-11 9 4 14-12-8-12 8 4-14-11-9 14-1z" />
    </Svg>
  );
}

export function Squiggle(props) {
  return (
    <Svg viewBox="0 0 160 24" preserve="none" {...props}>
      <path pathLength="1" d="M4 14c10-12 18 10 28 0s18-12 28 0 18 10 28 0 18-12 28 0 18 10 28-2" />
    </Svg>
  );
}

export function Spiral(props) {
  return (
    <Svg viewBox="0 0 64 64" {...props}>
      <path
        pathLength="1"
        d="M33 32c0-3 4-3 4 0 0 5-8 5-8 0 0-7 12-7 12 0 0 10-16 10-16 0 0-13 20-13 20 0 0 16-24 16-24 0"
      />
    </Svg>
  );
}

export function Bulb(props) {
  return (
    <Svg viewBox="0 0 56 72" {...props}>
      <path pathLength="1" d="M20 48c0-8-10-12-10-24a18 18 0 0136 0c0 12-10 16-10 24z" />
      <path pathLength="1" d="M20 55h16M22 61h12M26 67h4" />
      <path pathLength="1" d="M4 10l5 4M52 10l-5 4M28 0v4" />
    </Svg>
  );
}

// A ring left by a mug — ink, not a vector, so it stays soft and uneven.
export function CoffeeRing({ className = "" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <circle cx="60" cy="60" r="48" fill="none" stroke="#6b4a2b" strokeOpacity="0.28" strokeWidth="5" strokeDasharray="190 6 60 4" />
      <circle cx="61" cy="59" r="44" fill="none" stroke="#6b4a2b" strokeOpacity="0.12" strokeWidth="2" />
    </svg>
  );
}

export function PaperClip({ className = "" }) {
  return (
    <svg
      viewBox="0 0 28 76"
      className={className}
      fill="none"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9 22v36a5 5 0 0010 0V14a8 8 0 00-16 0v46a11 11 0 0022 0V24" stroke="#9a9aa4" />
      <path d="M11 22v34" stroke="#d9d9e0" strokeWidth="0.8" />
    </svg>
  );
}

// A ruled checkbox whose tick is written in when its row reveals.
export function CheckBox({ checked = true, className = "", style }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`draw ${className}`}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="4" width="17" height="16" strokeWidth="1.4" />
      {checked && <path pathLength="1" d="M6 12l4 5 11-14" strokeWidth="2.6" className="text-pen" stroke="currentColor" />}
    </svg>
  );
}
