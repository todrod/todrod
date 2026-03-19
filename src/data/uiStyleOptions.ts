import { goalStyleMeta } from "@/data/uiStyles";

export type UIStyleOption = {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  bestFor: string[];
};

export const uiStyleOptions: UIStyleOption[] = [
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    description: "Frosted glass surfaces, backdrop blur, translucent layers",
    keywords: ["glass", "blur", "modern", "depth"],
    bestFor: ["saas-app", "landing"],
  },
  {
    id: "minimal-flat",
    name: "Minimalism & Flat",
    description: "Clean white space, no decoration, high contrast typography",
    keywords: ["minimal", "clean", "white space", "functional"],
    bestFor: ["saas-app", "exam-module", "blog-docs"],
  },
  {
    id: "soft-ui",
    name: "Soft UI",
    description: "Gentle depth, soft shadows, calm rounded forms, WCAG-friendly",
    keywords: ["soft", "calm", "wellness", "rounded"],
    bestFor: ["medical-office", "nonprofit", "course-platform"],
  },
  {
    id: "hero-centric",
    name: "Hero-Centric",
    description: "Bold above-fold hero, CTA-first, trust signals below",
    keywords: ["hero", "cta", "conversion", "landing"],
    bestFor: ["landing", "podcast", "event"],
  },
  {
    id: "editorial",
    name: "Editorial Swiss",
    description: "Content-led rhythm, Swiss grid, strong typographic hierarchy",
    keywords: ["editorial", "grid", "typography", "print"],
    bestFor: ["blog-docs", "agency"],
  },
  {
    id: "bold-vibrant",
    name: "Vibrant & Block",
    description: "High-energy blocks, saturated color, engagement-first design",
    keywords: ["bold", "vibrant", "block", "energetic"],
    bestFor: ["ecommerce", "podcast", "event"],
  },
  {
    id: "motion-driven",
    name: "Motion-Driven",
    description: "Storytelling through scroll, smooth transitions, kinetic feel",
    keywords: ["motion", "scroll", "animation", "storytelling"],
    bestFor: ["portfolio", "agency", "event"],
  },
  {
    id: "aurora-ui",
    name: "Aurora UI",
    description: "Gradient mesh backgrounds, glowing accents, iridescent surfaces",
    keywords: ["gradient", "aurora", "glow", "colorful"],
    bestFor: ["agency", "saas-app"],
  },
  {
    id: "trust-authority",
    name: "Trust & Authority",
    description: "Professional structure, data credibility, subdued palette",
    keywords: ["trust", "authority", "professional", "b2b"],
    bestFor: ["real-estate", "landing"],
  },
  {
    id: "claymorphism",
    name: "Claymorphism",
    description: "3D clay-like elements, friendly depth, bright saturated fills",
    keywords: ["clay", "3d", "playful", "friendly"],
    bestFor: ["course-platform", "nonprofit"],
  },
  {
    id: "dark-oled",
    name: "Dark Mode (OLED)",
    description: "Pure blacks, neon accents, high contrast for night-first apps",
    keywords: ["dark", "oled", "neon", "high contrast"],
    bestFor: ["saas-app", "podcast"],
  },
  {
    id: "warm-vibrant",
    name: "Vibrant & Warm",
    description: "Warm earth tones, appetite colors, social and local feel",
    keywords: ["warm", "earthy", "social", "local"],
    bestFor: ["restaurant", "nonprofit"],
  },
  {
    id: "bento-grid",
    name: "Bento Grid",
    description: "Asymmetric card layouts, flexible magazine-style grid",
    keywords: ["bento", "grid", "cards", "asymmetric"],
    bestFor: ["portfolio", "blog-docs"],
  },
  {
    id: "accessible-ethical",
    name: "Accessible & Ethical",
    description: "WCAG AAA contrast, readable at any size, inclusive design",
    keywords: ["accessible", "wcag", "inclusive", "readable"],
    bestFor: ["medical-office", "exam-module", "nonprofit"],
  },
];

export function getDefaultUIStyle(goalId: string): UIStyleOption {
  const meta = goalStyleMeta.find((item) => item.goalId === goalId);
  if (meta) {
    const byName = uiStyleOptions.find((s) =>
      meta.styleName.toLowerCase().includes(s.name.toLowerCase()) ||
      s.name.toLowerCase().includes(meta.styleName.split(" ")[0]?.toLowerCase() ?? ""),
    );
    if (byName) return byName;
    const byGoal = uiStyleOptions.find((s) => s.bestFor.includes(goalId));
    if (byGoal) return byGoal;
  }
  return uiStyleOptions[0]!;
}
