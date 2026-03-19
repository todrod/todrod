export type ThemeTokens = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
};

export type Palette = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  tokens: ThemeTokens;
};

export type LayoutType = "dashboard" | "content" | "commerce" | "landing" | "app" | "exam";

export type TemplateBuilderStyleIntensity = "minimal" | "bold" | "editorial";
export type TemplateBuilderTone = "clean" | "premium" | "bold" | "editorial" | "playful" | "clinical";
export type TemplateBuilderMustHave =
  | "booking"
  | "pricing"
  | "testimonials"
  | "faq"
  | "gallery"
  | "team"
  | "forms"
  | "map"
  | "docs"
  | "schedule";
export type TemplateBuilderLayoutPreference = LayoutType | "auto";

export type LayoutRegion = {
  id: string;
  label: string;
};

export type MiniPreviewBlock = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type LayoutTemplate = {
  id: string;
  name: string;
  type: LayoutType;
  description: string;
  tags: string[];
  regions: LayoutRegion[];
  previewBlocks: MiniPreviewBlock[];
};

export type Goal = {
  id: string;
  label: string;
  description: string;
  tags: string[];
};

export type SectionDefinition = {
  id: string;
  label: string;
  description: string;
  componentName: string;
  defaultProps: {
    title?: string;
    subtitle?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
};

export type BlueprintSection = {
  sectionId: string;
  variant?: string;
  props?: SectionDefinition["defaultProps"];
};

export type GoalBlueprint = {
  goalId: string;
  sections: BlueprintSection[];
};

export type TemplateSelection = {
  paletteId: string;
  layoutId: string;
  goalId: string;
};

export type TemplateBrief = {
  idea: string;
  audience: string;
  tone: TemplateBuilderTone;
  mustHaves: TemplateBuilderMustHave[];
  layoutPreference: TemplateBuilderLayoutPreference;
};

export type RecommendedDirectionStyleMeta = {
  styleName: string;
  patternName: string;
  headingFont: string;
  bodyFont: string;
  fontPairingName: string;
  colorFocus: string;
  consideration: string;
};

export type RecommendedDirection = {
  id: string;
  paletteId: string;
  layoutId: string;
  goalId: string;
  title: string;
  reason: string;
  notes: string[];
  source: "curated" | "generated";
  strength: "best" | "safe" | "expressive";
  visualMode?: "recommended" | "conservative" | "distinctive";
  styleMeta?: RecommendedDirectionStyleMeta;
};

export type GeneratedTemplateConfig = {
  slug: string;
  createdAt: string;
  selection: TemplateSelection;
  sections: BlueprintSection[];
};

export type TemplateManifestEntry = {
  slug: string;
  createdAt: string;
  paletteId: string;
  paletteName: string;
  layoutId: string;
  layoutName: string;
  goalId: string;
  goalLabel: string;
};

export type TemplateManifest = {
  templates: TemplateManifestEntry[];
};

export type TemplateBuilderDraft = {
  id: string;
  name: string;
  savedAt: string;
  brief: TemplateBrief;
  selection: TemplateSelection;
  styleIntensity: TemplateBuilderStyleIntensity;
};

export type TemplateFavorite = {
  id: string;
  name: string;
  savedAt: string;
  goalId: string;
  layoutId: string;
  paletteId: string;
  uiStyleId: string;
  fontPairingId: string;
};
