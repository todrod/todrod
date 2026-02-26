import type { TemplateSelection } from "@/lib/templateBuilder/types";

export type TemplateIdea = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  selection: TemplateSelection;
};

export const templateIdeas: TemplateIdea[] = [
  { id: "idea-medical-trust", name: "Medical Trust", description: "Professional clinic-style site with calm visual hierarchy.", tags: ["office", "medical", "trust"], selection: { paletteId: "clinical-navy", layoutId: "landing-b", goalId: "medical-office" } },
  { id: "idea-podcast-studio", name: "Podcast Studio", description: "Creator-focused podcast hub with rich episode sections.", tags: ["podcast", "creator", "media"], selection: { paletteId: "berry-pop", layoutId: "magazine-a", goalId: "podcast" } },
  { id: "idea-ecom-luxe", name: "Ecom Luxe", description: "Premium storefront look with strong CTA contrast.", tags: ["ecommerce", "store", "premium"], selection: { paletteId: "carbon-gold", layoutId: "commerce-a", goalId: "ecommerce" } },
  { id: "idea-saas-launch", name: "SaaS Launch", description: "Sharp product-marketing stack with docs + pricing flow.", tags: ["saas", "launch", "conversion"], selection: { paletteId: "obsidian-cyan", layoutId: "app-a", goalId: "saas-app" } },
  { id: "idea-portfolio-creator", name: "Portfolio Creator", description: "High-impact portfolio with polished showcase rhythm.", tags: ["portfolio", "creative", "showcase"], selection: { paletteId: "violet-frost", layoutId: "agency-a", goalId: "portfolio" } },
  { id: "idea-event-impact", name: "Event Impact", description: "Registration-focused event layout with schedule rail.", tags: ["event", "conference", "registration"], selection: { paletteId: "ruby-night", layoutId: "event-a", goalId: "event" } },
  { id: "idea-real-estate-pro", name: "Real Estate Pro", description: "Listing-heavy lead generation structure.", tags: ["real-estate", "listings", "lead-gen"], selection: { paletteId: "ocean-depth", layoutId: "real-estate-a", goalId: "real-estate" } },
  { id: "idea-course-academy", name: "Course Academy", description: "Curriculum-driven learning platform starter.", tags: ["courses", "education", "platform"], selection: { paletteId: "arctic-glass", layoutId: "course-a", goalId: "course-platform" } },
  { id: "idea-nonprofit-story", name: "Nonprofit Story", description: "Mission-first storytelling with donation flow.", tags: ["nonprofit", "impact", "community"], selection: { paletteId: "sage-paper", layoutId: "landing-a", goalId: "nonprofit" } },
  { id: "idea-agency-bold", name: "Agency Bold", description: "Bold agency homepage with case study layout.", tags: ["agency", "services", "case-study"], selection: { paletteId: "deep-space", layoutId: "agency-a", goalId: "agency" } },
  { id: "idea-restaurant-vibe", name: "Restaurant Vibe", description: "Menu + booking flow with stylish hero.", tags: ["restaurant", "booking", "local"], selection: { paletteId: "sunset-market", layoutId: "split-hero-a", goalId: "restaurant" } },
  { id: "idea-docs-editorial", name: "Docs Editorial", description: "Readable docs/blog blend with modern structure.", tags: ["docs", "blog", "knowledge"], selection: { paletteId: "cobalt-paper", layoutId: "docs-a", goalId: "blog-docs" } },
  { id: "idea-portfolio-bento", name: "Portfolio Bento", description: "Visual-first grid for creators and product designers.", tags: ["portfolio", "design", "bento"], selection: { paletteId: "violet-frost", layoutId: "portfolio-bento", goalId: "portfolio" } },
  { id: "idea-saas-funnel", name: "SaaS Funnel", description: "Clean conversion funnel for B2B SaaS launches.", tags: ["saas", "funnel", "growth"], selection: { paletteId: "polar-night", layoutId: "saas-funnel-a", goalId: "saas-app" } },
];
