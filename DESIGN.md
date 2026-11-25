---
name: Priti Travels Hub
description: Cinematic domestic Indian tours and bespoke concierge travel template — "Discover Incredible India, One Journey at a Time."
colors:
  midnight-navy: "#0B1220"
  midnight-deep: "#070C16"
  navy-elevated: "#121D32"
  saffron-sunset: "#FF9933"
  warm-gold: "#F4B942"
  warm-gold-muted: "#CFB278"
  off-white-ivory: "#F7F3EC"
  emerald-india: "#138808"
typography:
  display:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "clamp(56px, 6.8vw, 94px)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.02em"
  editorial-accent:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.25rem, 2.4vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0px"
  sm: "10px"
  md: "16px"
  pill: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.saffron-sunset}"
    textColor: "{colors.midnight-navy}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "rgba(11, 18, 32, 0.55)"
    textColor: "{colors.off-white-ivory}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
---

# Design System: Priti Travels Hub

## Overview

**Creative North Star: "70mm Travel Documentary Meets Heritage Concierge"**

Priti Travels Hub alternates deep twilight cinema chapters with sun-warmed editorial ivory spreads. Every region is introduced as a full-bleed moving frame rather than a cramped package brochure: monumental condensed display lettering locks onto the left horizon while sharp, borderless regional destination frames open behind the deck when selected.

**Key Characteristics:**
- Deep midnight navy (`#0B1220`) nocturnal atmosphere paired with warm off-white (`#F7F3EC`) editorial chapters.
- Condensed uppercase display headlines (`Bebas Neue`) paired with `Playfair Display` italic accents and clean `Inter` body text.
- Subtle 70mm film grain, directional legibility scrims, and GPU-composited `clip-path` reveals.

## Colors

The palette balances nocturnal cinema contrast with Indian saffron, gold, and sparing emerald accents.

### Primary
- **Sunset Saffron** (#FF9933): Primary CTAs (`Plan My Trip`, `Find Trips`, `Enquire Now`), active route strokes, and key pricing callouts.
- **Warm Gold** (#F4B942): Location labels, italic editorial accents, star ratings, and focus rings.

### Secondary
- **India Emerald** (#138808): Sparingly used on WhatsApp concierge actions, verified inclusion checkmarks, and Indian tricolor footer dots.

### Neutral
- **Midnight Navy** (#0B1220): Primary dark ground, hero scrims, dark narrative bands, and dark-on-light primary buttons.
- **Midnight Deep** (#070C16): Footer ground, scrollbar track, and modal backdrop overlays.
- **Navy Elevated** (#121D32): Elevated spotlight cards, testimonial containers, and modal fields.
- **Off-White Ivory** (#F7F3EC): Alternating editorial section ground and primary text on dark grounds.

### Named Rules
**The Alternating Rhythm Rule.** Dark midnight navy chapters and warm ivory editorial chapters alternate across the scroll to give photography breathing room and prevent visual fatigue.

## Typography

**Display Font:** Bebas Neue (sans-serif fallback)
**Editorial Accent Font:** Playfair Display italic (Georgia fallback)
**Body Font:** Inter (system-ui sans-serif fallback)

**Character:** Monumental, tall condensed display caps convey cinema poster authority while italic serif pairings soften section titles into luxury travel magazine headlines.

### Hierarchy
- **Display** (400, `clamp(56px, 6.8vw, 94px)`, 0.90): Hero destination title (`UDAIPUR`, `KERALA`, etc.).
- **Section Headline** (400, `3rem–3.75rem`, 1.0): Section titles combining `Bebas Neue` with `Playfair Display` italic accents.
- **Body** (400, `1rem`, 1.5, max 65ch): Editorial descriptions, inclusions, and traveller testimonials.
- **Label** (600, `0.75rem`, `0.12em` uppercase): Regional tags, category pills, and form field captions.

## Layout

Desktop hero preserves a `1376 / 768` widescreen composition with the Quick Search Bar straddling the lower `91.93%` horizon into the `#F7F3EC` ground below; downstream chapters sit in `max-w-[1320px]` centered containers with generous `96px–112px` vertical cadence. Mobile (`< 1024px`) reflows the hero into a vertical editorial stack with horizontally scrollable destination frames.

## Elevation & Depth

Depth is achieved via directional dark scrims over full-bleed photography, frosted midnight-navy glass docks (`backdrop-blur-xl`), and wide, soft ambient drop shadows (`0 24px 48px rgba(7, 12, 22, 0.55)`) rather than hard borders.

## Shapes

- **Hero Destination Cards:** Sharp `0px` rectangular frames with zero outer borders (`rounded-none`), floating above the hero backdrop.
- **Editorial Content Cards:** Softly rounded `16px` (`rounded-2xl`) containers for Popular Destinations, Packages, Experiences, and Testimonials.
- **Controls & Pills:** Full `9999px` pill geometry for primary CTAs, outline triggers, and regional filter chips.

## Components

### Buttons
- **Shape:** Full pill (`9999px`).
- **Primary:** Sunset Saffron (`#FF9933`) background with Midnight Navy (`#0B1220`) semibold text (`12px 24px` padding).
- **Hover / Focus:** Transitions smoothly (`200ms cubic-bezier(0.23, 1, 0.32, 1)`) to Warm Gold (`#F4B942`) with a `2px` saffron focus outline.
- **Outline:** Translucent Midnight Navy (`rgba(11,18,32,0.55)`) with `1.5px` crisp ivory border (`#F5F5F5`).

### Cards / Containers
- **Hero Carousel Cards:** Uniform sharp rectangular frames (`0px` radius), zero border, subtle `translateY(-6px)` pointer-gated hover lift, expanding behind neighboring cards via GPU `clip-path` when clicked.
- **Package Tilt Cards:** `16px` radius ivory/white surface with pointer-driven 3D perspective tilt and radial glare sheen.

### Inputs / Fields
- **Style:** Frosted dark glass search dock (`rgba(18, 25, 39, 0.92)` with subtle `rgba(255,255,255,0.25)` perimeter stroke) and `12px` rounded modal inputs.

## Do's and Don'ts

### Do:
- **Do** keep hero destination cards borderless, sharp (`0px`), and equal-sized, advancing the carousel only after the behind-card `clip-path` reveal completes.
- **Do** preserve `prefers-reduced-motion` fallbacks and the static SVG India map fallback for non-WebGL contexts.

### Don't:
- **Don't** add vertical decorative stripes, eyebrow kickers above headings, or borders onto hero destination cards.
- **Don't** hardcode destination copy or image URLs inside components; store all editable data in `src/data/travelData.ts`.
