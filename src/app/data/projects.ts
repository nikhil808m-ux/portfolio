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
    category: "Fintech \u2022 UX Case Study",
    description: "Reducing transaction anxiety by integrating balance visibility directly into the 'Payment Successful' screen. A simple fix for a massive user pain point.",
    imageUrl: "https://images.unsplash.com/photo-1726137065519-c9a1b9eca951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwYXltZW50JTIwYXBwJTIwaW50ZXJmYWNlJTIwZmludGVjaHxlbnwxfHx8fDE3NzIzMDcyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2024",
    tags: ["Behavioral Design", "Micro-interactions", "User Research"],
    status: "published"
  },
  {
    slug: "localai-manager",
    title: "local/ai",
    category: "Mobile App \u2022 Product Design",
    description: "A privacy-first AI chat app that runs entirely on-device. No accounts, no cloud, just your thoughts staying where they belong.",
    imageUrl: "/case-study/localai-manager/b6f2dd4b5e84f60e05686ff034f11c912be0fe01.png",
    year: "2024",
    tags: ["Product Design", "UI UX", "AI"],
    status: "published"
  },
  {
    slug: "nirmaan-financial",
    title: "Nirmaan Financial",
    category: "SaaS \u2022 Dashboard Design",
    description: "A financial runway simulator for early-stage founders. Turning dry spreadsheets into an engaging, interactive dashboard that tells a story.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1080&auto=format&fit=crop",
    year: "2023",
    tags: ["Data Visualization", "SaaS", "Dashboard UI"],
    status: "published"
  },
  {
    slug: "fluxkey-console",
    title: "FluxKey Console",
    category: "Industrial Design \u2022 Haptics",
    description: "A programmable macro interface with a haptic smart dial. Exploring how physical controls can enhance digital workflows.",
    imageUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1080&auto=format&fit=crop",
    year: "2023",
    tags: ["Industrial Design", "Prototyping", "Interaction Design"],
    status: "published"
  }
];