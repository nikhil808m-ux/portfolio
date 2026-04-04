# PROJECT CONTEXT: Nikhil Manoj Portfolio (V3.0)

This document provides a comprehensive overview of the design system, technical architecture, and recent evolution of the Nikhil Manoj Portfolio website for future AI context.

## 1. Project Identity
- **Goal:** A high-end, high-performance personal portfolio for a Product Designer with skills in UI, UX, and coding.
- **Typography:**
  - `Inter` (Sans-serif) for body copy.
  - `Space Grotesk` (Display) for headings.
  - `JetBrains Mono` for technical/labels.
  - `IBM Plex Mono` & `IBM Plex Sans` (specifically for the Local AI case study).
- **Tone:** Minimal, technical, premium, tactile (using grain/noise textures), and motion-heavy.
- **Domain:** `nikhilmanoj.me`
- **Deployment:** Vercel (auto-deploys from `main` branch).

## 2. Tech Stack
- **Framework:** React / Vite
- **Styling:** Tailwind CSS (Modern/Vibrant colors, HSL palettes).
- **Animation:** `motion/react` (Framer Motion).
- **Navigation:** `react-router` (v7+).
- **Icons:** `lucide-react` & `react-icons`.

## 3. Design System & Aesthetics
- **Grain Overlay:** A persistent noise texture applied globally for a tactile feel.
  - *Optimization:* Replaced expensive SVG `feTurbulence` filter with a tiled base64 PNG for Safari performance.
- **Cursor System:** A 2-part custom cursor (Dot + Blob).
  - *Behavior:* Dot follows instantly; Blob follows with a spring delay.
  - *Blending:* Uses `mix-blend-mode: difference` on the parent container `z-[9999]`.
- **Navigation Philosophy:** "Magnetic" menu items, smooth section scrolling via hashes (`#work`, `#about`, `#contact`).

## 4. Major Components
- **Case Studies:** Structured as full-width, edge-to-edge layouts (`snap-none`).
  - **UPI Balance Visibility:** Restructured from a Figma Make export. Features 13 sections, SVG illustrations, and persistent footer navigation.
- **Footer Navigation:** `CaseStudyFooter` component dynamically finds the next/prev project from `src/app/data/projects.ts` and allows seamless "All Work" navigation back to the home page's work section.

## 5. Technical Highlights & Optimizations
- **Safari Support:** Avoided expensive backdrop-blurs and complex SVG filters. Optimized stacking contexts by being careful with `translate3d` near `mix-blend-mode`.
- **Routing:** `Root.tsx` handles scroll resets on route changes but implements a **Hash Listener** to manually scroll into view if a URL contains a section ID (e.g., navigating from a case study back to `/#work`).
- **Footer:** Inverted the case study footer to a minimal light theme (white bg, charcoal text) to match the case study aesthetics.

## 6. Directory Structure
- `/src/app/components/`: Core UI components (Magnetic, Header, Cursor, etc.).
- `/src/app/components/case-studies/`: Self-contained folders for each project.
- `/src/app/data/`: Centralized content like `projects.ts`.
- `/src/app/routes.tsx`: Centralized routing logic.

## 7. Recent Dev History (March 2026)
1. **Figma Migration:** Successfully migrated the UPI Balance case study from a Figma export, adding missing prototype sections and SVG illustrations.
2. **Navigation Unified:** Converted all menu and footer links to use `Link` component with root-relative hashes.
3. **Cursor Polish:** Balanced the blend modes to work across both Home (dark/light sections) and Case Studies (light-only sections).
4. **Local Branding:** Updated contact details to `hello@nikhilmanoj.me` and location to **Bengaluru, India**.
5. **Dedicated About Page:** Extracted the inline about section into a new `/about` route. It features a unified two-column bio layout, a vertical Journey Timeline, and a custom full-width charcoal dark footer with resume links.
6. **UPI Case Study Refinement**: Performed a structured copy overhaul across the Hero, Thought Experiment, Observed Behavior, and Cash vs UPI sections to improve storytelling and scanability.
7. **AI Reference Manifests**: Generated detailed `.md` reference files for all case studies containing typography, layout, and image metadata to support future AI-assisted edits.
8. **Portfolio Copy Refinement:** Refined Hero copy to focus on designing clear interfaces, shortened Selected Works introduction, and updated UPI case study headers for a stronger behavioral design focus.
9. **Local AI Prototype Integration (April 2026):** Embedded the interactive Local AI chat prototype securely into its case study with appropriate iframe/design scaling overrides.
10. **Global Safari Scroll Optimization (April 2026):** Fixed severe Safari scroll lag on large hardware layers by removing `translateZ` and `will-change` from `localai-manager/index.tsx`, avoiding VRAM limits.
11. **Vercel Routing Fix (April 2026):** Added `vercel.json` to properly rewrite all SPA routes to `index.html`, eliminating 404s on page reloads across all case studies.

---
*Generated: April 4, 2026. Keep this updated after major architectural shifts.*
