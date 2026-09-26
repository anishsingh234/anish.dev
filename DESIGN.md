---
name: Anish Singh — Working Notebook
description: A developer's physical notebook left open on a charcoal desk; every section is a numbered page with pasted-in paper artifacts.
colors:
  desk: "#0d0c11"
  desk-2: "#161520"
  ivory: "#f1ede3"
  cream: "#e7dfc9"
  kraft: "#cdb28b"
  kraft-ink: "#2a1d10"
  graph: "#e8e9e4"
  receipt: "#f5f3ee"
  sticky: "#f5dc47"
  legal: "#f4e47c"
  blueprint: "#1c3553"
  blueprint-ink: "#dce7f2"
  paper-ink: "#1b1a23"
  ink: "#111111"
  graphite: "#4a4852"
  marker: "#f8dd2e"
  pen: "#e62d5b"
  pen-deep: "#b8163f"
  cobalt: "#2f5fd0"
  cobalt-divider: "#1f3f99"
  cutting-mat: "#23473d"
  flag-pen: "#c21a49"
  flag-mint: "#86d4b0"
typography:
  display:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(3.6rem, 14vw, 10.4rem)"
    fontWeight: 400
    lineHeight: 1
  headline:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(3.25rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0.01em"
  title:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 0.95
  body:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "1.08rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Courier Prime, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.12em"
  hand:
    fontFamily: "Caveat, cursive"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.1
rounded:
  none: "0px"
  mat: "14px"
spacing:
  gutter-mobile: "16px"
  gutter: "32px"
  section-top: "80px"
  section-top-lg: "112px"
  section-bottom: "64px"
  section-bottom-lg: "96px"
  rule: "2rem"
components:
  button-sticky:
    backgroundColor: "{colors.sticky}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "48px"
  button-ivory:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "48px"
  button-ink:
    backgroundColor: "{colors.paper-ink}"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  flag:
    backgroundColor: "{colors.marker}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "3.5px 17.6px 3.5px 8.8px"
  input-underline:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "6px 0"
  stamp:
    textColor: "{colors.pen-deep}"
    rounded: "{rounded.none}"
    padding: "0.28em 0.7em 0.18em"
---

# Design System: Anish Singh — Working Notebook

## Overview

**Creative North Star: "The Working Notebook"**

The site is one physical developer notebook left open on a charcoal desk under a lamp. Every section is a numbered page; every piece of content is a real paper artifact pasted, taped or clipped onto it: printouts on tractor-feed paper, thermal receipts, graph sheets, blueprints, kraft tags, sticky notes, a yellow legal pad. The desk is dark and quiet; the paper carries all the colour and all the reading.

Depth is physical, never digital. Paper rests on the desk with a contact shadow, sits a degree or two off square, and lifts toward the reader when handled. Marks on the paper are made by three inks with distinct jobs, plus a graphite pencil, and they ink themselves in as the page arrives. Motion is the motion of paper and pen: sheets settle, stamps slam, strokes draw, highlighter sweeps. Nothing glows, nothing is a pill, nothing is a rounded SaaS card.

The one three-dimensional object is the notebook itself, on the last page, turning to "one last page." It is a finale, not a pattern.

**Key Characteristics:**
- Charcoal desk with fibre grain and a lamp-light pool; every readable surface is a paper stock.
- Square-cut paper, small per-sheet rotations, soft two-part desk shadows (lift tokens).
- Three inks with fixed roles: marker yellow, pen magenta, cobalt.
- Four faces, four jobs: Bebas display, Spectral body, Courier Prime typed labels, Caveat handwriting.
- Page furniture everywhere: running heads, index flags, page numbers, Fig. captions.
- Scroll reveals via a data attribute; hand-drawn SVG doodles that draw themselves; full reduced-motion fallback.

## Colors

A dark desk and warm paper stocks, marked by three inks whose roles never swap.

### Primary
- **Marker Yellow** (`marker`): the highlighter. Text highlights (`.hl`), text selection, the Resume/primary sticky CTAs, the active item in the ⌘K list, index flag for Contact, doodle stars and bulbs on the desk. Means "look here" and "this is the action."

### Secondary
- **Pen Magenta** (`pen`): the editor's red pen. Page-title underlines, circle scribbles, checkbox ticks, the margin line on ruled and legal paper, link underlines, the text caret, and the dashed focus outline. Also SINGH in the hero, set on the desk.
- **Deep Pen** (`pen-deep`): pen magenta for small text on paper. Rubber stamps, form errors, terminal prompts, small handwritten notes on ivory. Plain `pen` fails contrast as small text on ivory; `pen-deep` passes.

### Tertiary
- **Cobalt** (`cobalt`): technical and AI ink. The hand-sketched RAG diagram, form field labels, handwritten keys on the contact slip, the hero file card's top edge, the Skills index flag, the notebook's cloth cover.
- **Cobalt Divider** (`cobalt-divider`): the full-bleed stock for chapter 02 (The AI Engineer). Deeper than cobalt ink so cream paper and white handwriting read on it.

### Neutral
- **Desk** (`desk`), **Desk 2** (`desk-2`): the page background and the chapter-01 charcoal divider. Body text on the desk is `ivory` at 75–85% opacity.
- **Ivory** (`ivory`): the default sheet, and the reading colour on the desk.
- **Cream** (`cream`), **Kraft** (`kraft`, text `kraft-ink`), **Graph** (`graph`), **Receipt** (`receipt`), **Sticky** (`sticky`), **Legal** (`legal`), **Blueprint** (`blueprint`, text `blueprint-ink`), **Ink sheet** (`paper-ink`): paper stocks, see Components.
- **Ink** (`ink`): text on every light stock. **Graphite** (`graphite`): secondary text, captions, metadata on paper.
- **Cutting Mat** (`cutting-mat`): the green self-healing mat under the Workbench.

### Index flag colours
Each page owns a flag colour, set once in the page registry and reused by the navbar tabs, the mobile index, ⌘K and the page's running head: About kraft, Chapters ink, Projects pen (`flag-pen`, white text), Skills cobalt (white text), Experience mint (`flag-mint`), Writing ivory, Contact yellow.

### Named Rules
**The Three Inks Rule.** Yellow highlights and calls to action; magenta edits, stamps, focuses and links; cobalt draws technical and AI material. Don't swap roles, and don't add a fourth ink.

**The Paper Carries Colour Rule.** The desk stays charcoal. Colour comes from paper stocks, flags and ink marks laid on it. The only full-bleed colour fields are the three chapter dividers.

**The Deep Pen Rule.** Magenta text smaller than display size on a light stock uses `pen-deep`.

## Typography

**Display Font:** Bebas Neue (with Impact)
**Body Font:** Spectral, 400/500/700 with italics (with Georgia)
**Label/Mono Font:** Courier Prime, 400/700 (with ui-monospace)
**Hand Font:** Caveat, 500/700 (cursive)

**Character:** Condensed poster capitals for anything cut out or stamped, a bookish serif for reading, a typewriter for anything printed or filed, and a quick hand for anything written in the margin. Each face stands for a different way of making a mark on paper.

### Hierarchy
- **Display** (400, clamp(3.6rem, 14vw, 10.4rem), 1): the hero name only, one letter per paper cutout.
- **Headline** (400, clamp(3.25rem, 8vw, 6rem), 0.88, uppercase): page titles through PageHead, always followed by the pen underline. Chapter titles run clamp(3rem, min(6vw, 9vh), 5.2rem) so they fit the pinned viewport.
- **Title** (400, clamp(1.9rem, 3.6vw, 2.5rem), 0.95): artifact and entry titles: project names, log roles, product tags.
- **Body** (Spectral 400, 1.02–1.15rem, 1.65–1.7): paragraphs on paper and desk, capped at about 34–36rem.
- **Label** (Courier Prime 700, 0.66–0.78rem, 0.12em, uppercase): buttons, flags, running heads, metadata, stack lists, captions (captions drop the uppercase).
- **Hand** (Caveat 500/700, 1.25–1.7rem; the contact title goes up to clamp(4.4rem, 11vw, 8.4rem)): margin notes, form labels, sticky notes, the desk clock, "open project" scribbles. Always slightly rotated.

### Named Rules
**The Four Jobs Rule.** Bebas is cut out or stamped, Spectral is read, Courier is printed or filed, Caveat is handwritten. Pick the face by how the mark would be made.

**The No-Kicker Rule.** No eyebrow or kicker text above headlines. A page opens with its running head (notebook title on the left, index flag with page number on the right), then the title. Catalog numbers sit under the work as figure captions.

**The Fig. Numbering Rule.** Figures are captioned in Courier as `Fig. <page>.<n> — description`, where `<page>` is the two-digit page number from the registry (Fig. 03.1 on page 03, Fig. 05.1–05.4 on page 05). Captions go below the figure, never above its title.

## Layout

Every section is a page: `px-4` (16px) on mobile and `px-8` (32px) from sm up, with 80px/64px top/bottom padding that grows to 112px/96px at lg. Text pages centre in a 1240px container; the Workbench widens to 1320px and the hero to 1400px. Each page opens with a running head, a 40–56px gap, the title block, then 48–80px before the content.

Inside a page the layout is a 12-column grid with deliberately staggered columns. Artifacts are offset vertically with negative and positive margins (for example `lg:mt-20`, `lg:-mt-10`) so sheets look laid down by hand, not slotted into a grid. Ruled and legal paper use a 2rem line (`--line`) with `--line-start` to put baselines on the rules.

Chapters are the one horizontal passage. At md+ with motion allowed they pin and scrub sideways through three full-viewport panels, snapping to the nearest chapter, with index tabs along the bottom edge. On mobile or under reduced motion they stack as normal vertical pages, each with its own running head. Mobile keeps two or three decorations per viewport. Margin notes and desk doodles appear from md or xl up.

Breakpoints are Tailwind's defaults plus `xs` 480px. The desktop paper-strip nav appears at lg; below lg the mobile bar takes over.

## Elevation & Depth

Depth is paper resting on a desk under one lamp. Every shadow has two parts: a tight contact shadow and a soft, offset cast shadow. There are four lift steps, applied by role. Hard offset shadows and glows don't exist in this world.

### Shadow Vocabulary
- **Lift 0** (`--lift-0`): small objects flat on the page, like the AK. monogram.
- **Lift 1** (`--lift-1`): the default for any `.paper` sheet, index tabs, and photo prints.
- **Lift 2** (`--lift-2`): a heavier stack or object: the legal pad, the About spread, the cutting mat, toasts.
- **Lift 3** (`--lift-3`): paper picked up. Only the hover/focus state of `.lift`, and modal sheets.
- **Drop** (`.drop` filter, two drop-shadows): the shadow for masked sheets (torn, zigzag, clipped tags). On hover it grows to a deeper drop-shadow.

### Named Rules
**The Drop Wrapper Rule.** A mask or clip-path (`.torn-top`, `.torn-bottom`, `.zigzag`, clip-path tags) cuts off the element's own box-shadow. Masked sheets therefore sit inside a `.drop` wrapper that casts a filter shadow. `.drop.lift` hover swaps to the deeper filter.

**The Handled Paper Rule.** `.lift` is the only hover elevation: the sheet rises 6px, turns by `--rh` (default +1.2°) and moves to lift 3, over 0.45s on `--ease-paper`. Tape on it lifts with it. It only runs on hover-capable devices, and `:focus-within` triggers it too.

## Shapes

Cut paper is rectangular with square corners (0 radius) everywhere. Silhouettes come from how paper actually gets cut or torn:

- **Torn edges** (`.torn-top`/`.torn-bottom`, 12px SVG tear) only where a sheet was torn off: the nav strip, the hero graph sheet, the contact slip, blog clippings.
- **Zigzag** (`.zigzag`, `--zz` tooth) only on thermal receipts and printouts.
- **Tractor-feed holes** (`.tractor`) on continuous printer paper.
- **Index flags** notch the right end with a 9px chevron cut. **Shipping tags** point on the left and carry a punched hole.
- **Dog-ear**: a 26px corner curls up when a `.dog-ear` sheet is handled.

Rotation is the other half of the shape language. Each sheet sets its own `--r`, usually between −3° and +3° (hero letters and tags go up to ±7°), and neighbouring sheets alternate direction. Tape strips set `--tr` and `--w` so no two are stuck down the same way. Rounded corners only belong to objects that are rounded in life: the cutting mat (`mat`, 14px), the clipboard clip.

## Components

### Buttons
Buttons are paper you pick up.
- **Shape:** square-cut `.paper` with a small rotation (−1.8° to +2°), at least 48px tall for primary actions and 44px for secondary ones.
- **Sticky (primary action):** sticky-note stock with ink label text. Used for Resume, Download PDF, Search, and Copy.
- **Ivory (work):** ivory sheet with a strip of tape on top. Used for "View my work".
- **Ink (commit):** `paper-ink` sheet with ivory label text. Used for "Send the letter" and the archive links.
- **Hover / Focus:** `.lift` (see Elevation). Focus shows the global 2px dashed pen outline offset 4px.

### Index Flags & Tabs
- **Flag:** a Courier label on a flag colour with a notched right end, reading `p. NN`. It sits at the right of every running head and in the mobile index.
- **Navbar tabs:** flag-coloured tabs tucked under the torn strip, each with its own rotation. The current page hangs 8px lower. **Chapter tabs:** the divider colour of each chapter (charcoal, cobalt, yellow); the active tab rises to full opacity.

### Paper Stocks (cards / containers)
Choose the stock by what the artifact would be in real life:
- **Ivory** (default): spec sheets, cards, contact slip, dialogs.
- **Cream:** research and abstract pages. **Kraft:** product dossiers, tags, the "if found" footer tag.
- **Graph:** diagrams, research sheets, the hero backing sheet. **Blueprint:** engineering drawings with a title block.
- **Receipt + zigzag (+ tractor):** terminal output, stats, anything itemised.
- **Lined** (red margin, pencil rules): letters and indexes, like the contact form and mobile menu. **Legal** (double magenta margin, cobalt rules, oxblood binding strip): the log.
- **Sticky:** short handwritten notes and primary CTAs. **Ink sheet:** a dark sheet for contrast on light fields, or a commit button.
- **Full-bleed stocks** are reserved for the chapter dividers, in order: charcoal (`desk-2`), `cobalt-divider`, `marker`. Each carries a giant faint watermark numeral.
- **Cutting mat:** the green gridded mat with a ruler that the Workbench artifacts sit on.
- **Padding:** 24–36px sides, 28–36px top. Photo prints sit on a white 8px border at lift 1.

### Inputs / Fields
- **Style:** written on the ruled letter. Transparent background, 2px ink/30 bottom rule only, Spectral 1.1rem. Labels are cobalt Caveat in the first person ("your name", "where I can reply").
- **Focus:** the bottom rule turns pen magenta, and the caret is pen.
- **Error:** Courier 0.72rem in `pen-deep`, linked through `aria-describedby`.

### Navigation
- **Desktop (lg+):** a torn ivory paper strip fixed top-centre and taped at both corners. It holds the AK. monogram (ink block, −3°), "anish's working notebook" in Caveat with a pen squiggle, a sticky Search ⌘K button, and a handwritten IST desk clock. The page index tabs hang beneath it.
- **Mobile:** the AK. block and two paper chips (Search, Menu on sticky). The menu is a full lined notebook index page with dotted leaders and page flags, and the contact routes as paper chips.
- **⌘K:** an ivory index card with a magenta rule under the query. The active result gets a marker highlight.

### Rubber Stamp
Bebas text inside a double border (3px border plus a 1.5px outline offset 3px), default −8°, 90% opacity, with a noise mask for uneven ink. It is revealed with `data-reveal="stamp"`, so it scales down from 1.7× and slams onto the page. Use `pen-deep` on light stocks. Decorative stamps get `aria-hidden`.

### Tape
Translucent masking tape (`rgb(228 218 188 / 0.74)` with grain) with serrated ends. Positions: `top`, `tl`, `tr`, `bl`, `br`. Tape is always decorative and not clickable, and it lifts with its sheet.

### Doodles
The hand-drawn vocabulary: curved, looped and down arrows, the double underline, circle scribble, star, squiggle, spiral, bulb, checkbox (pen tick), coffee ring and paper clip. Stroke doodles use `currentColor`, round caps, a 2.2 stroke, and `pathLength="1"` on every path. Adding `draw` makes them ink in when the parent reveals, staggered with `--d`. Hero doodles use `hero-draw` instead and animate on first paint. The coffee ring and paper clip are objects rather than pen strokes, so they never draw. Every doodle is `aria-hidden`.

### Reveal System
- **Mechanism:** a pre-paint boot script adds `.js` to `<html>`. Elements marked `data-reveal` start hidden (opacity 0, 22px down) only when `.js` is present, so visitors without JS see everything. One IntersectionObserver (`RevealObserver`, bottom margin −10%) sets `data-inview` once per element, and CSS does the rest. `--d` staggers the delay.
- **Why an attribute:** React re-renders rewrite `className` and would wipe a class added at runtime. A data attribute survives re-renders.
- **Variants:** `data-reveal="stamp"` (slam). Descendants that react to an in-view ancestor: `.draw` paths and `.hl-draw` highlighter sweeps.
- **Hero:** it never waits on JS. `.hero-letter` (letters drop in, staggered by `--i` × 75ms), `.hero-stamp`, `.hero-fade` and `.hero-draw` are pure CSS keyframes. Background doodles use `.drift`, a CSS scroll-timeline parallax that only runs where `animation-timeline` is supported and motion is allowed.

### Reduced Motion
Under `prefers-reduced-motion: reduce`, revealed elements show immediately, strokes and highlights are pre-drawn, and every animation and transition drops to 0.01ms. `.drift` is off. GSAP's pinned horizontal chapters and the mobile chapter timelines are gated on `no-preference`, so chapters stack vertically. The notebook opens already turned to the last page, with no cursor tilt and no scroll trigger.

### The Notebook (three.js)
A single scene on the last page: a cobalt cloth notebook with a magenta ribbon and a yellow pencil. The turning page shows canvas-drawn art in the real Caveat and Courier faces, and it turns as the section scrolls into place and tilts a few degrees toward the cursor. Constraints: loaded with `next/dynamic` (`ssr: false`); mounted only at `min-width: 768px` and only when an IntersectionObserver sees the section within 700px. It renders on demand (a frame only while tilt or turn is still settling), caps pixel ratio at 2, uses a `low-power` renderer, and disposes everything on unmount. If WebGL is missing it silently renders nothing, and the page must read fine without it. Don't add a second 3D object.

## Do's and Don'ts

### Do:
- **Do** put every readable block on a named paper stock, chosen by what the artifact would be in real life.
- **Do** give every sheet its own `--r` rotation (usually within ±3°) and alternate direction with neighbours.
- **Do** use `--lift-1` for resting paper, `--lift-2` for heavy stacks, and let only `.lift` hover reach `--lift-3`.
- **Do** wrap masked or clipped sheets (torn, zigzag, clip-path) in `.drop`.
- **Do** open each page with the running head and its registry flag, and caption figures as `Fig. <page>.<n> — …` below the work.
- **Do** reveal with `data-reveal` and stagger with `--d`. Put `pathLength="1"` on every drawable path.
- **Do** keep yellow for highlight and action, magenta for editing, stamps, focus and links, and cobalt for technical and AI drawings.
- **Do** use `pen-deep` for small magenta text on light paper.
- **Do** keep touch targets at 44px or more and the dashed pen focus outline visible.

### Don't:
- **Don't** use rounded cards, pill badges, glows, gradients on text, or dark SaaS panels. Round corners only on objects that are round in life (the mat, a clip).
- **Don't** add kicker or eyebrow labels above headlines. The running head and Fig. captions do that job.
- **Don't** use hard offset (neobrutalist) shadows. Depth is contact shadow plus soft cast shadow.
- **Don't** tear an edge that wasn't torn. Torn, zigzag and perforated edges belong to specific stocks.
- **Don't** reveal with a runtime-added class. React will strip it, so use the data attribute.
- **Don't** add a fourth ink colour or swap the roles of the three.
- **Don't** add another WebGL scene, or load three.js on mobile or before the last page approaches.
- **Don't** make the hero entrance wait on hydration or JS.
