import { goals } from "@/data/goals";
import { layouts } from "@/data/layouts";
import { palettes } from "@/data/palettes";
import { sections } from "@/data/sections";
import { getBlueprintSections } from "@/lib/templateBuilder/blueprint";
import { paletteToCssVars } from "@/lib/templateBuilder/theme";
import type { GeneratedTemplateConfig, TemplateSelection } from "@/lib/templateBuilder/types";

export function resolveSelection(selection: TemplateSelection) {
  const palette = palettes.find((item) => item.id === selection.paletteId);
  const layout = layouts.find((item) => item.id === selection.layoutId);
  const goal = goals.find((item) => item.id === selection.goalId);

  if (!palette || !layout || !goal) return null;

  const blueprintSections = getBlueprintSections(goal.id);

  return {
    palette,
    layout,
    goal,
    sectionDefinitions: sections,
    blueprintSections,
    themeJson: {
      id: palette.id,
      name: palette.name,
      tokens: palette.tokens,
      cssVars: paletteToCssVars(palette),
    },
    layoutJson: {
      id: layout.id,
      name: layout.name,
      type: layout.type,
      regions: layout.regions,
    },
    blueprintJson: {
      goalId: goal.id,
      goalLabel: goal.label,
      sections: blueprintSections,
    },
  };
}

export function toGeneratedTemplateConfig(selection: TemplateSelection, slug: string, createdAt: string): GeneratedTemplateConfig {
  return {
    slug,
    createdAt,
    selection,
    sections: getBlueprintSections(selection.goalId),
  };
}
