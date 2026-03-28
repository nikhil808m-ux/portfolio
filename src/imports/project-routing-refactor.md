# Figma Make Prompt — Routing & Project Management Refactor

Paste this entire prompt into Figma Make as a single instruction.

---

## THE PROMPT

I need you to refactor my portfolio's routing and project management system. Do NOT change any visual design, animations, styling, or layout. Only change the architecture and data flow as described below.

---

### 1. Create a central project registry file

Create a new file at `src/app/data/projects.ts`. This is the single source of truth for all projects. Every time I want to add or edit a project, I only touch this file.

```ts
// src/app/data/projects.ts

export interface Project {
  slug: string;           // URL-safe ID, e.g. "upi-balance"
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  year: string;
  tags: string[];
  status: "published" | "coming-soon"; // "coming-soon" shows card but disables link
}

export const projects: Project[] = [
  {
    slug: "upi-balance",
    title: "UPI Balance Visibility",
    category: "Fintech • UX Case Study",
    description: "Reducing transaction anxiety by integrating balance visibility directly into the 'Payment Successful' screen. A simple fix for a massive user pain point.",
    imageUrl: "https://images.unsplash.com/photo-1726137065519-c9a1b9eca951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwYXltZW50JTIwYXBwJTIwaW50ZXJmYWNlJTIwZmludGVjaHxlbnwxfHx8fDE3NzIzMDcyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2024",
    tags: ["Behavioral Design", "Micro-interactions", "User Research"],
    status: "published"
  },
  {
    slug: "localai-manager",
    title: "LocalAI Manager",
    category: "Desktop App • Visual Design",
    description: "Making powerful AI tools accessible to non-technical creatives. Transforming complex terminal commands into a friendly, drag-and-drop interface.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1080&auto=format&fit=crop",
    year: "2024",
    tags: ["Product Design", "Visual Systems", "Accessibility"],
    status: "published"
  },
  {
    slug: "nirmaan-financial",
    title: "Nirmaan Financial",
    category: "SaaS • Dashboard Design",
    description: "A financial runway simulator for early-stage founders. Turning dry spreadsheets into an engaging, interactive dashboard that tells a story.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1080&auto=format&fit=crop",
    year: "2023",
    tags: ["Data Visualization", "SaaS", "Dashboard UI"],
    status: "coming-soon"
  },
  {
    slug: "fluxkey-console",
    title: "FluxKey Console",
    category: "Industrial Design • Haptics",
    description: "A programmable macro interface with a haptic smart dial. Exploring how physical controls can enhance digital workflows.",
    imageUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1080&auto=format&fit=crop",
    year: "2023",
    tags: ["Industrial Design", "Prototyping", "Interaction Design"],
    status: "coming-soon"
  }
];
```

---

### 2. Update `Home.tsx` to use the registry

In `src/app/components/Home.tsx`, remove the hardcoded `projects` array entirely. Replace it with an import from the registry:

```ts
import { projects } from '../../data/projects';
```

The `projects.map(...)` call in the JSX stays exactly the same — just pass `slug` and `status` as additional props to `ProjectCard`.

---

### 3. Update `ProjectCard.tsx`

Add two new props to the `ProjectProps` interface:

```ts
slug: string;
status: "published" | "coming-soon";
```

Wrap the entire card's outer `motion.div` with conditional linking:

- If `status === "published"`: wrap with `<Link to={"/case-studies/" + slug}>` (import Link from `"react-router"`)
- If `status === "coming-soon"`: render without a Link, and add a small pill badge that says `"Coming Soon"` in `text-[10px] font-mono uppercase tracking-widest text-stone-400` positioned absolute at the top-right of the header strip. Do not disable or grey out the card — it should look and animate normally, just not be clickable.

---

### 4. Update `routes.ts` to auto-generate from the registry

Replace the static `routes.ts` with a dynamic version that reads from the registry:

```ts
// src/app/routes.ts
import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./components/Home";
import { projects } from "./data/projects";
import { lazy, Suspense } from "react";

// Only build routes for published projects
const publishedProjects = projects.filter(p => p.status === "published");

const caseStudyRoutes = publishedProjects.map((project) => ({
  path: `case-studies/${project.slug}`,
  element: (
    <Suspense fallback={<CaseStudyLoadingScreen />}>
      {lazy(() => import(`./components/case-studies/${project.slug}/index.tsx`))}
    </Suspense>
  ),
}));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      ...caseStudyRoutes,
    ],
  },
]);
```

Also create the `CaseStudyLoadingScreen` component inline in `routes.ts` — a minimal full-screen div with the `NM.` logo centered and a subtle fade animation, matching the stone-50 background and stone-900 text from the existing theme. No spinner — just the logo pulsing gently.

---

### 5. Create the case study folder convention

Create a placeholder folder and file so the pattern is established and I know exactly what to do when I add a new case study:

Create `src/app/components/case-studies/upi-balance/index.tsx` with this exact content:

```tsx
// src/app/components/case-studies/upi-balance/index.tsx
// 
// CASE STUDY PAGE — UPI Balance Visibility
// Replace this file's contents with your exported Figma Make case study component.
// The component must have a default export.
// Root.tsx wraps this automatically with: Cursor, Header, NoiseOverlay, CursorProvider.
// You do NOT need to import or re-add those in your case study.
//
// SCROLL NOTE: Root.tsx uses snap-y snap-mandatory. Add className="snap-none" to your
// outermost div to allow free scrolling within the case study.

import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function UPICaseStudy() {
  return (
    <div className="snap-none min-h-screen bg-stone-50 px-6 md:px-12 py-32">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors mb-16 group"
      >
        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
        Back to Work
      </Link>
      <h1 className="text-5xl font-display font-medium text-stone-900 tracking-tight">
        UPI Balance Visibility
      </h1>
      <p className="mt-4 text-stone-400 font-mono text-sm">
        — Replace this placeholder with your Figma Make case study export.
      </p>
    </div>
  );
}
```

---

### 6. Update `Root.tsx` — handle snap-scroll for case studies

In `Root.tsx`, the scroll container currently has `snap-y snap-mandatory` hardcoded. Change it so the snap classes are only applied on the home route (`/`), and removed on all other routes.

Import `useLocation` (already imported) and do:

```tsx
const { pathname } = useLocation();
const isHome = pathname === "/";
```

Then on the scroll container div, conditionally apply:
```tsx
className={`h-screen w-full overflow-y-auto overflow-x-hidden relative ${isHome ? "snap-y snap-mandatory" : "snap-none"} scroll-smooth bg-stone-50 text-stone-900 font-sans selection:bg-stone-200 selection:text-stone-900 cursor-none`}
```

---

### 7. Update `Header.tsx` — show a back button on case study pages

In `Header.tsx`, import `useLocation` from `"react-router"`. If the current path starts with `/case-studies/`, replace the nav links (Work, About, Contact) with a single animated back button:

```tsx
<Link to="/" className="...back button styles matching existing nav link aesthetic...">
  ← Index
</Link>
```

Style it like the existing nav links: `text-xs font-mono tracking-widest uppercase text-stone-500 hover:text-stone-900`. Keep the Magnetic wrapper and cursor interaction.

---

## HOW TO ADD A NEW CASE STUDY (summary for me to follow later)

After this refactor, adding a new project is a 3-step process:

**Step 1 — Register it** in `src/app/data/projects.ts`:
```ts
{
  slug: "my-new-project",
  title: "My New Project",
  // ...fill in fields
  status: "coming-soon" // start as coming-soon, switch to "published" when ready
}
```

**Step 2 — Drop in the page** from your Figma Make case study export:
- Take the main page component from your case study zip
- Place it at `src/app/components/case-studies/my-new-project/index.tsx`
- Make sure it has a `export default` 
- Add `className="snap-none"` to the outermost div
- Copy any unique sub-components into the same folder

**Step 3 — Flip to published**:
```ts
status: "published" // route is now live, card is now clickable
```

That's it. No touching routes.ts, no touching Home.tsx, no touching ProjectCard.tsx.