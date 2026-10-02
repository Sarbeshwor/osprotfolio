// All site content lives here. Add a project by appending to `projects`.

export type VisualKind = "contours" | "bookings" | "toolpath";

// A project shows either a generated `visual` or, for live products, a `preview` screenshot (public/projects).
export type Project = {
  index: string;
  title: string;
  description: string;
  stack: string[];
  visual?: VisualKind;
  preview?: string;
  href?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "AgriSense",
    description: "AI-powered agriculture planning and decision-support system.",
    stack: ["TypeScript", "OpenAI", "Prisma", "React"],
    preview: "/projects/agrisense.jpg",
    href: "https://github.com/rayhannn2003/Cive_Voders_AgriSense",
    note: "Winner — IUT 12th ICT Fest, Agentic AI Hackathon",
  },
  {
    index: "02",
    title: "CNC Handwriting Machine",
    description:
      "A physical machine capable of reproducing handwriting through robotic motion and G-code.",
    stack: ["ATmega32", "ESP32", "CNC", "G-code"],
    preview: "/projects/cnc.jpg",
  },
  {
    index: "03",
    title: "BADHAN RMS",
    description:
      "National blood management system. 180+ units update their data and download reports through it.",
    stack: [],
    preview: "/projects/badhan.jpg",
    href: "https://rms.badhan.org/login/",
  },
  {
    index: "04",
    title: "RentAndRooms",
    description: "Property and channel management platform for the UK market.",
    stack: ["Laravel", "React", "PostgreSQL", "APIs"],
    preview: "/projects/rentandrooms.jpg",
    href: "https://rentandrooms.co.uk/home",
  },
];

export const experience = [
  {
    period: "2026 — Present",
    place: "RentAndRooms",
    role: "Full-Stack Developer",
    summary:
      "Building and maintaining property management and channel-management systems.",
  },
  {
    period: "2024 — 2026",
    place: "Independent",
    role: "Projects & Research",
    summary:
      "AI agents, agriculture decision-support, and a handwriting CNC machine built from scratch.",
  },
];

export const capabilities = [
  { title: "AI Systems", items: "Agents · RAG · automation" },
  { title: "Full-Stack", items: "Web apps · APIs · databases" },
  { title: "Automation", items: "Workflows · integrations · tools" },
  { title: "Hardware", items: "Robotics · embedded systems · CNC" },
];

// TODO: replace the email and LinkedIn placeholders before publishing.
export const links = {
  email: "hello@example.com",
  github: "https://github.com/Sarbeshwor",
  linkedin: "https://www.linkedin.com/in/your-handle",
};
