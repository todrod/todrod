import { goals } from "@/data/goals";
import { layouts } from "@/data/layouts";
import { palettes } from "@/data/palettes";
import { templateIdeas } from "@/data/templateIdeas";
import { getGoalStyleMeta } from "@/data/uiStyles";
import type {
  Goal,
  LayoutTemplate,
  Palette,
  RecommendedDirection,
  TemplateBrief,
  TemplateBuilderMustHave,
  TemplateBuilderStyleIntensity,
} from "@/lib/templateBuilder/types";

const tonePaletteTags: Record<TemplateBrief["tone"], string[]> = {
  clean: ["minimal", "light", "professional", "neutral"],
  premium: ["premium", "dark", "office", "agency"],
  bold: ["bold", "dark", "conversion", "campaign", "creative"],
  editorial: ["editorial", "docs", "content", "blog"],
  playful: ["bright", "creator", "podcast", "friendly"],
  clinical: ["medical", "professional", "trust", "light"],
};

const toneLayoutTags: Record<TemplateBrief["tone"], string[]> = {
  clean: ["landing", "marketing", "docs"],
  premium: ["showcase", "split", "conversion"],
  bold: ["creative", "conversion", "showcase", "funnel"],
  editorial: ["editorial", "blog", "docs", "content"],
  playful: ["split", "marketing", "showcase", "event"],
  clinical: ["landing", "marketing", "knowledge"],
};

const goalLayoutTypes: Record<string, Array<LayoutTemplate["type"]>> = {
  "medical-office": ["landing", "content"],
  podcast: ["content", "landing"],
  "exam-module": ["exam", "dashboard", "app"],
  ecommerce: ["commerce", "landing"],
  "saas-app": ["app", "landing", "dashboard"],
  landing: ["landing"],
  portfolio: ["content", "landing"],
  "blog-docs": ["content"],
  agency: ["landing", "content"],
  restaurant: ["landing", "commerce"],
  nonprofit: ["landing", "content"],
  event: ["landing"],
  "real-estate": ["commerce", "landing"],
  "course-platform": ["app", "content", "exam"],
};

const goalPaletteTags: Record<string, string[]> = {
  "medical-office": ["medical", "professional", "trust", "friendly"],
  podcast: ["creator", "podcast", "bold"],
  "exam-module": ["dashboard", "product", "neutral"],
  ecommerce: ["commerce", "conversion", "premium"],
  "saas-app": ["saas", "product", "futuristic", "premium"],
  landing: ["landing", "conversion", "modern"],
  portfolio: ["portfolio", "creative", "editorial"],
  "blog-docs": ["docs", "content", "editorial"],
  agency: ["agency", "premium", "creative"],
  restaurant: ["food", "local", "bright"],
  nonprofit: ["nonprofit", "wellness", "community"],
  event: ["event", "campaign", "bold"],
  "real-estate": ["office", "professional", "premium"],
  "course-platform": ["education", "light", "product"],
};

const featureLayoutTags: Record<TemplateBuilderMustHave, string[]> = {
  booking: ["landing", "registration", "schedule", "split"],
  pricing: ["conversion", "funnel", "marketing", "store"],
  testimonials: ["landing", "marketing", "showcase"],
  faq: ["docs", "content", "landing"],
  gallery: ["showcase", "creative", "bento"],
  team: ["showcase", "landing", "content"],
  forms: ["landing", "marketing", "lead-gen"],
  map: ["lead-gen", "listings", "local"],
  docs: ["docs", "content", "knowledge"],
  schedule: ["schedule", "event", "education"],
};

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function hasTagMatch(tags: string[], tokens: string[]) {
  const normalizedTags = tags.map((tag) => normalize(tag));
  return tokens.reduce((score, token) => (normalizedTags.some((tag) => tag.includes(normalize(token))) ? score + 1 : score), 0);
}

function styleIntensityScore(tags: string[], styleIntensity: TemplateBuilderStyleIntensity) {
  const styleTokens: Record<TemplateBuilderStyleIntensity, string[]> = {
    minimal: ["minimal", "neutral", "professional", "clean", "light"],
    bold: ["bold", "dark", "conversion", "campaign", "creative"],
    editorial: ["editorial", "docs", "content", "story", "blog"],
  };

  return hasTagMatch(tags, styleTokens[styleIntensity]);
}

function scorePalette(palette: Palette, goalId: string, brief: TemplateBrief, styleIntensity: TemplateBuilderStyleIntensity) {
  let score = 0;
  score += hasTagMatch(palette.tags, goalPaletteTags[goalId] || []) * 7;
  score += hasTagMatch(palette.tags, tonePaletteTags[brief.tone]) * 6;
  score += styleIntensityScore(palette.tags, styleIntensity) * 4;
  if (brief.tone === "clinical" && /clinical|care|rose-clinic|sunrise-care|clinical-navy/.test(palette.id)) score += 8;
  if (brief.tone === "premium" && /carbon-gold|olive-stone|ocean-depth/.test(palette.id)) score += 7;
  if (brief.tone === "playful" && /berry-pop|sunset-market|aqua-sky/.test(palette.id)) score += 7;
  return score;
}

function scoreLayout(layout: LayoutTemplate, goalId: string, brief: TemplateBrief, styleIntensity: TemplateBuilderStyleIntensity) {
  let score = 0;
  score += (goalLayoutTypes[goalId] || []).includes(layout.type) ? 18 : 0;
  score += hasTagMatch(layout.tags, toneLayoutTags[brief.tone]) * 5;
  score += styleIntensityScore(layout.tags, styleIntensity) * 3;
  score += brief.mustHaves.reduce((sum, feature) => sum + hasTagMatch(layout.tags, featureLayoutTags[feature]) * 4, 0);
  score += brief.layoutPreference !== "auto" && layout.type === brief.layoutPreference ? 18 : 0;
  if (brief.mustHaves.includes("map") && layout.id === "real-estate-a") score += 10;
  if (brief.mustHaves.includes("schedule") && /event|course|exam/.test(layout.id)) score += 10;
  if (brief.mustHaves.includes("booking") && /split-hero|landing|event/.test(layout.id)) score += 7;
  return score;
}

function buildGeneratedDirection(
  goal: Goal,
  palette: Palette,
  layout: LayoutTemplate,
  rank: number,
): RecommendedDirection {
  const strength: RecommendedDirection["strength"] = rank % 3 === 0 ? "best" : rank % 3 === 1 ? "safe" : "expressive";
  const visualMode: NonNullable<RecommendedDirection["visualMode"]> =
    strength === "best" ? "recommended" : strength === "safe" ? "conservative" : "distinctive";
  const familyPrefix =
    layout.type === "landing"
      ? "Conversion"
      : layout.type === "dashboard"
        ? "Operations"
        : layout.type === "content"
          ? "Editorial"
          : layout.type === "commerce"
            ? "Commerce"
            : layout.type === "app"
              ? "Product"
              : "Assessment";

  return {
    id: `generated-${goal.id}-${layout.id}-${palette.id}-${strength}`,
    paletteId: palette.id,
    layoutId: layout.id,
    goalId: goal.id,
    title: `${familyPrefix} ${layout.name}`,
    reason: `${goal.label} translated into a ${layout.type} direction with ${palette.name} as the starting visual system.`,
    notes: [`${layout.name} structure`, `${palette.name} style pack`, `${goal.label} flow`],
    source: "generated",
    strength,
    visualMode,
  };
}

function uniqueBySelection(items: RecommendedDirection[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.goalId}|${item.layoutId}|${item.paletteId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildRecommendedDirections(input: {
  goalId: string;
  brief: TemplateBrief;
  styleIntensity: TemplateBuilderStyleIntensity;
}): RecommendedDirection[] {
  const goal = goals.find((item) => item.id === input.goalId);
  if (!goal) return [];

  const curatedCandidates: Array<{ direction: RecommendedDirection; score: number } | null> = templateIdeas
    .filter((idea) => idea.selection.goalId === input.goalId)
    .map((idea) => {
      const palette = palettes.find((item) => item.id === idea.selection.paletteId);
      const layout = layouts.find((item) => item.id === idea.selection.layoutId);
      if (!palette || !layout) return null;

      const score =
        scorePalette(palette, input.goalId, input.brief, input.styleIntensity) +
        scoreLayout(layout, input.goalId, input.brief, input.styleIntensity) +
        hasTagMatch(idea.tags, input.brief.mustHaves) * 5 +
        hasTagMatch(idea.tags, tonePaletteTags[input.brief.tone]) * 4;

      return {
        direction: {
          id: `curated-${idea.id}`,
          paletteId: palette.id,
          layoutId: layout.id,
          goalId: input.goalId,
          title: idea.name,
          reason: idea.description,
          notes: [`${layout.name} layout`, `${palette.name} palette`, `${goal.label} starter`],
          source: "curated" as const,
          strength: "best" as const,
          visualMode: "recommended" as const,
        },
        score,
      };
    });

  const curated = curatedCandidates
    .filter((item): item is { direction: RecommendedDirection; score: number } => item !== null)
    .sort((left, right) => right.score - left.score)
    .map((item) => item.direction);

  const rankedLayouts = [...layouts]
    .map((layout) => ({ layout, score: scoreLayout(layout, input.goalId, input.brief, input.styleIntensity) }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 6);

  const rankedPalettes = [...palettes]
    .map((palette) => ({ palette, score: scorePalette(palette, input.goalId, input.brief, input.styleIntensity) }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 6);

  const generatedPool: Array<{ direction: RecommendedDirection; score: number }> = [];

  for (const layoutEntry of rankedLayouts) {
    for (const paletteEntry of rankedPalettes) {
      const rankBoost = generatedPool.length;
      generatedPool.push({
        direction: buildGeneratedDirection(goal, paletteEntry.palette, layoutEntry.layout, rankBoost),
        score: layoutEntry.score + paletteEntry.score - rankBoost,
      });
    }
  }

  const generated = generatedPool
    .sort((left, right) => right.score - left.score)
    .map((item) => item.direction);

  const combined = uniqueBySelection([...curated, ...generated]).slice(0, 6);

  if (combined[0]) {
    combined[0].strength = "best";
    combined[0].visualMode = "recommended";
  }
  if (combined[1]) {
    combined[1].strength = "safe";
    combined[1].visualMode = "conservative";
  }
  if (combined[2]) {
    combined[2].strength = "expressive";
    combined[2].visualMode = "distinctive";
  }

  const styleMeta = getGoalStyleMeta(input.goalId);
  if (styleMeta) {
    for (const direction of combined) {
      direction.styleMeta = styleMeta;
    }
  }

  return combined;
}
