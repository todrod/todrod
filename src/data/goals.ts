import type { Goal } from "@/lib/templateBuilder/types";

export const goals: Goal[] = [
  { id: "medical-office", label: "Medical Office", description: "Professional clinic website with services, providers, and clear contact paths.", tags: ["healthcare", "trust", "appointments"] },
  { id: "podcast", label: "Podcast", description: "Podcast hub with episode browsing, highlights, and subscribe CTA.", tags: ["media", "episodes", "community"] },
  { id: "exam-module", label: "Exam Module", description: "Study platform layout with runner, question bank, and progress placeholders.", tags: ["education", "assessment", "analytics"] },
  { id: "ecommerce", label: "Ecommerce", description: "Starter storefront with product rails and checkout placeholders.", tags: ["products", "checkout", "conversion"] },
  { id: "saas-app", label: "SaaS / App", description: "Product marketing + onboarding and docs placeholders.", tags: ["saas", "features", "pricing"] },
  { id: "landing", label: "Landing Page", description: "Fast campaign page focused on value proposition and CTA.", tags: ["marketing", "launch", "cta"] },
  { id: "portfolio", label: "Portfolio", description: "Project showcase with case-study sections and contact point.", tags: ["personal", "projects", "case-study"] },
  { id: "blog-docs", label: "Blog / Docs", description: "Documentation and article-first structure with search placeholders.", tags: ["docs", "articles", "knowledge-base"] },
  { id: "agency", label: "Creative Agency", description: "Service-led agency site with process and proof sections.", tags: ["agency", "services", "showcase"] },
  { id: "restaurant", label: "Restaurant / Cafe", description: "Menu-forward site with booking and featured dishes.", tags: ["food", "booking", "local"] },
  { id: "nonprofit", label: "Nonprofit", description: "Mission, impact, donation, and volunteering-focused structure.", tags: ["nonprofit", "impact", "community"] },
  { id: "event", label: "Event / Conference", description: "Agenda, speakers, and registration-driven event landing.", tags: ["event", "registration", "schedule"] },
  { id: "real-estate", label: "Real Estate", description: "Listing and lead-gen starter for real estate businesses.", tags: ["real-estate", "listings", "lead-gen"] },
  { id: "course-platform", label: "Course Platform", description: "Education site with curriculum, instructors, and enrollment CTA.", tags: ["education", "courses", "enrollment"] },
];
