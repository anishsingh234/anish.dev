// Masking tape. `at` picks a corner/edge preset from globals.css; `w` and
// `rotate` nudge each strip so no two pieces are stuck down identically.
export default function Tape({ at = "top", w, rotate, className = "" }) {
  const style = {};
  if (w) style["--w"] = `${w}px`;
  if (rotate !== undefined) style["--tr"] = `${rotate}deg`;
  return <span aria-hidden="true" className={`tape tape-${at} ${className}`} style={style} />;
}
