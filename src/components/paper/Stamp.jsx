// A rubber stamp that slams onto the page when it scrolls into view.
export default function Stamp({ children, rotate = -8, delay, className = "", decorative = false }) {
  const style = { "--r": `${rotate}deg` };
  if (delay !== undefined) style["--d"] = `${delay}s`;
  return (
    <span
      data-reveal="stamp"
      aria-hidden={decorative || undefined}
      className={`stamp ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
