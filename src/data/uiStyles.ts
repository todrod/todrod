// UI style metadata sourced from ui-ux-pro-max skill (products.csv + typography.csv)
// Maps each goal ID to a recommended style, pattern, and font pairing

export type GoalStyleMeta = {
  goalId: string;
  styleName: string;
  patternName: string;
  headingFont: string;
  bodyFont: string;
  fontPairingName: string;
  colorFocus: string;
  consideration: string;
};

export const goalStyleMeta: GoalStyleMeta[] = [
  {
    goalId: "medical-office",
    styleName: "Accessible & Soft UI",
    patternName: "Social Proof-Focused",
    headingFont: "Lora",
    bodyFont: "Raleway",
    fontPairingName: "Wellness Calm",
    colorFocus: "Calm blues + trust whites",
    consideration: "Trust-first design. Calm, clear calls-to-action.",
  },
  {
    goalId: "saas-app",
    styleName: "Glassmorphism + Flat Design",
    patternName: "Hero + Features + CTA",
    headingFont: "Space Grotesk",
    bodyFont: "DM Sans",
    fontPairingName: "Tech Startup",
    colorFocus: "Trust blue + accent contrast",
    consideration: "Balance modern feel with clarity. Focus on CTAs.",
  },
  {
    goalId: "landing",
    styleName: "Hero-Centric + Trust",
    patternName: "Hero-Centric Design",
    headingFont: "Poppins",
    bodyFont: "Open Sans",
    fontPairingName: "Modern Professional",
    colorFocus: "Brand primary + action accent",
    consideration: "Strong CTA above fold. Social proof below.",
  },
  {
    goalId: "ecommerce",
    styleName: "Vibrant & Block-based",
    patternName: "Feature-Rich Showcase",
    headingFont: "Outfit",
    bodyFont: "Work Sans",
    fontPairingName: "Geometric Modern",
    colorFocus: "Brand primary + success green",
    consideration: "High visual hierarchy. Engagement & conversions.",
  },
  {
    goalId: "portfolio",
    styleName: "Motion-Driven",
    patternName: "Storytelling-Driven",
    headingFont: "Syne",
    bodyFont: "Manrope",
    fontPairingName: "Fashion Forward",
    colorFocus: "Bold accent + neutral canvas",
    consideration: "Let work speak. Minimal copy, strong visuals.",
  },
  {
    goalId: "blog-docs",
    styleName: "Editorial Swiss",
    patternName: "Storytelling + Feature-Rich",
    headingFont: "Cormorant Garamond",
    bodyFont: "Libre Baskerville",
    fontPairingName: "Editorial Classic",
    colorFocus: "Warm paper + ink contrast",
    consideration: "Content-first rhythm. Clear hierarchy.",
  },
  {
    goalId: "podcast",
    styleName: "Bold Statement",
    patternName: "Hero-Centric Design",
    headingFont: "Bebas Neue",
    bodyFont: "Source Sans 3",
    fontPairingName: "Bold Statement",
    colorFocus: "Bold primary + vivid accent",
    consideration: "Personality over polish. Let voice and brand pop.",
  },
  {
    goalId: "agency",
    styleName: "Aurora UI + Motion",
    patternName: "Storytelling-Driven",
    headingFont: "Syne",
    bodyFont: "Manrope",
    fontPairingName: "Fashion Forward",
    colorFocus: "Gradient mesh + accent",
    consideration: "Craft and creativity front and center.",
  },
  {
    goalId: "restaurant",
    styleName: "Vibrant & Warm",
    patternName: "Social Proof-Focused",
    headingFont: "Playfair Display",
    bodyFont: "Inter",
    fontPairingName: "Classic Elegant",
    colorFocus: "Warm earth + appetite accent",
    consideration: "Lead with atmosphere and menu. Easy reservations.",
  },
  {
    goalId: "nonprofit",
    styleName: "Accessible & Ethical",
    patternName: "Social Proof-Focused",
    headingFont: "Lora",
    bodyFont: "Raleway",
    fontPairingName: "Wellness Calm",
    colorFocus: "Warm green + action CTA",
    consideration: "Mission above fold. Emotional storytelling + CTA.",
  },
  {
    goalId: "event",
    styleName: "Motion-Driven",
    patternName: "Hero-Centric Design",
    headingFont: "Bebas Neue",
    bodyFont: "Source Sans 3",
    fontPairingName: "Bold Statement",
    colorFocus: "High energy + dark backdrop",
    consideration: "Date and CTA always visible. Energy + urgency.",
  },
  {
    goalId: "real-estate",
    styleName: "Trust & Authority",
    patternName: "Feature-Rich Showcase",
    headingFont: "Poppins",
    bodyFont: "Open Sans",
    fontPairingName: "Modern Professional",
    colorFocus: "Trust navy + warm accent",
    consideration: "Listings, social proof, local expertise.",
  },
  {
    goalId: "course-platform",
    styleName: "Claymorphism + Micro-interactions",
    patternName: "Storytelling-Driven",
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Plus Jakarta Sans",
    fontPairingName: "Friendly SaaS",
    colorFocus: "Friendly primary + warm surface",
    consideration: "Progress, community, clear learning path.",
  },
  {
    goalId: "exam-module",
    styleName: "Minimal + Accessible",
    patternName: "Minimal & Direct",
    headingFont: "Lexend",
    bodyFont: "Source Sans 3",
    fontPairingName: "Corporate Trust",
    colorFocus: "Neutral + focus accent",
    consideration: "Distraction-free. Clear progress indicators.",
  },
];

export function getGoalStyleMeta(goalId: string): GoalStyleMeta | undefined {
  return goalStyleMeta.find((item) => item.goalId === goalId);
}
