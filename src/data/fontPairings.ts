import { goalStyleMeta } from "@/data/uiStyles";

export type FontPairing = {
  id: string;
  name: string;
  headingFont: string;
  bodyFont: string;
  googleFontsUrl: string;
  mood: string[];
  bestFor: string[];
};

export const fontPairings: FontPairing[] = [
  {
    id: "tech-startup",
    name: "Tech Startup",
    headingFont: "Space Grotesk",
    bodyFont: "DM Sans",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap",
    mood: ["tech", "modern", "innovative", "bold"],
    bestFor: ["saas-app", "exam-module"],
  },
  {
    id: "modern-professional",
    name: "Modern Professional",
    headingFont: "Poppins",
    bodyFont: "Open Sans",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Open+Sans:wght@400;500;600&display=swap",
    mood: ["professional", "clean", "corporate"],
    bestFor: ["landing", "real-estate"],
  },
  {
    id: "wellness-calm",
    name: "Wellness Calm",
    headingFont: "Lora",
    bodyFont: "Raleway",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Raleway:wght@400;500;600&display=swap",
    mood: ["calm", "wellness", "warm", "trustworthy"],
    bestFor: ["medical-office", "nonprofit"],
  },
  {
    id: "fashion-forward",
    name: "Fashion Forward",
    headingFont: "Syne",
    bodyFont: "Manrope",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Manrope:wght@400;500;600&display=swap",
    mood: ["creative", "bold", "avant-garde"],
    bestFor: ["portfolio", "agency"],
  },
  {
    id: "editorial-classic",
    name: "Editorial Classic",
    headingFont: "Cormorant Garamond",
    bodyFont: "Libre Baskerville",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Libre+Baskerville:ital,wght@0,400;1,400&display=swap",
    mood: ["editorial", "literary", "refined"],
    bestFor: ["blog-docs"],
  },
  {
    id: "bold-statement",
    name: "Bold Statement",
    headingFont: "Bebas Neue",
    bodyFont: "Source Sans 3",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+3:wght@400;600&display=swap",
    mood: ["bold", "energetic", "loud"],
    bestFor: ["podcast", "event"],
  },
  {
    id: "classic-elegant",
    name: "Classic Elegant",
    headingFont: "Playfair Display",
    bodyFont: "Inter",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap",
    mood: ["elegant", "luxury", "timeless"],
    bestFor: ["restaurant"],
  },
  {
    id: "friendly-saas",
    name: "Friendly SaaS",
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Plus Jakarta Sans",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
    mood: ["friendly", "modern", "approachable"],
    bestFor: ["course-platform"],
  },
  {
    id: "corporate-trust",
    name: "Corporate Trust",
    headingFont: "Lexend",
    bodyFont: "Source Sans 3",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Source+Sans+3:wght@400;600&display=swap",
    mood: ["trustworthy", "accessible", "corporate"],
    bestFor: ["exam-module", "real-estate"],
  },
  {
    id: "geometric-modern",
    name: "Geometric Modern",
    headingFont: "Outfit",
    bodyFont: "Work Sans",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&display=swap",
    mood: ["geometric", "modern", "balanced"],
    bestFor: ["ecommerce"],
  },
  {
    id: "minimal-swiss",
    name: "Minimal Swiss",
    headingFont: "Inter",
    bodyFont: "Inter",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
    mood: ["minimal", "clean", "functional"],
    bestFor: ["saas-app", "landing"],
  },
  {
    id: "developer-mono",
    name: "Developer Mono",
    headingFont: "JetBrains Mono",
    bodyFont: "IBM Plex Sans",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap",
    mood: ["technical", "developer", "precise"],
    bestFor: ["blog-docs", "saas-app"],
  },
  {
    id: "soft-rounded",
    name: "Soft Rounded",
    headingFont: "Nunito",
    bodyFont: "Quicksand",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Quicksand:wght@400;500;600&display=swap",
    mood: ["soft", "friendly", "approachable"],
    bestFor: ["nonprofit", "course-platform"],
  },
  {
    id: "luxury-serif",
    name: "Luxury Serif",
    headingFont: "Cormorant",
    bodyFont: "Montserrat",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@400;500;600&display=swap",
    mood: ["luxury", "high-end", "sophisticated"],
    bestFor: ["portfolio", "restaurant"],
  },
  {
    id: "news-editorial",
    name: "News Editorial",
    headingFont: "Newsreader",
    bodyFont: "Roboto",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,700;1,400&family=Roboto:wght@400;500;700&display=swap",
    mood: ["news", "editorial", "journalistic"],
    bestFor: ["blog-docs", "podcast"],
  },
];

export function getDefaultFontPairing(goalId: string): FontPairing {
  const meta = goalStyleMeta.find((item) => item.goalId === goalId);
  if (meta) {
    const match = fontPairings.find(
      (fp) => fp.headingFont === meta.headingFont && fp.bodyFont === meta.bodyFont,
    );
    if (match) return match;
    const byGoal = fontPairings.find((fp) => fp.bestFor.includes(goalId));
    if (byGoal) return byGoal;
  }
  return fontPairings[0]!;
}
