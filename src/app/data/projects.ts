// src/app/data/projects.ts

export interface Project {
  slug: string;           // URL-safe ID, e.g. "upi-balance"
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  imageObjectPosition?: string; // e.g. "bottom right" for specific alignment
  year: string;
  tags: string[];
  status: "published" | "coming-soon"; // "coming-soon" shows card but disables link
}

export const projects: Project[] = [
  {
    slug: "upi-balance",
    title: "The Lost Reflection",
    category: "Fintech • Behavioral UX",
    description: "Reducing transaction anxiety by adding balance visibility to the ‘Payment Successful’ screen. A simple intervention for a common but overlooked problem.",
    imageUrl: "https://images.unsplash.com/photo-1726137065519-c9a1b9eca951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwYXltZW50JTIwYXBwJTIwaW50ZXJmYWNlJTIwZmludGVjaHxlbnwxfHx8fDE3NzIzMDcyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2026",
    tags: ["Behavioral UX", "Interaction Design"],
    status: "published"
  },
  {
    slug: "localai-manager",
    title: "local/ai",
    category: "Mobile App \u2022 Product Design",
    description: "A privacy-first AI chat app that runs entirely on-device. No accounts, no cloud, just your thoughts staying where they belong.",
    imageUrl: "/localai.jpeg",
    imageObjectPosition: "bottom right",
    year: "2026",
    tags: ["Product Design", "UI UX", "AI"],
    status: "published"
  },
  {
    slug: "nirmaan-financial",
    title: "Nirmaan Financial",
    category: "SaaS \u2022 Dashboard Design",
    description: "A financial runway simulator for early-stage founders. Turning dry spreadsheets into an engaging, interactive dashboard that tells a story.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1080&auto=format&fit=crop",
    year: "2026",
    tags: ["Data Visualization", "SaaS", "Dashboard UI"],
    status: "published"
  },
  {
    slug: "fluxkey-console",
    title: "FluxKey Console",
    category: "Industrial Design \u2022 Haptics",
    description: "A programmable macro interface with a haptic smart dial. Exploring how physical controls can enhance digital workflows.",
    imageUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1080&auto=format&fit=crop",
    year: "2026",
    tags: ["Industrial Design", "Prototyping", "Interaction Design"],
    status: "published"
  }
];