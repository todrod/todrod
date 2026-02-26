"use server";

import { revalidatePath } from "next/cache";
import { goals } from "@/data/goals";
import { layouts } from "@/data/layouts";
import { palettes } from "@/data/palettes";
import { getBlueprintSections } from "@/lib/templateBuilder/blueprint";
import { appendManifestEntry, deleteGeneratedTemplate, writeGeneratedTemplate } from "@/lib/templateBuilder/manifest";
import { createTemplateSlug } from "@/lib/templateBuilder/slug";
import type { GeneratedTemplateConfig, TemplateSelection } from "@/lib/templateBuilder/types";

function validateSelection(selection: TemplateSelection) {
  const palette = palettes.find((item) => item.id === selection.paletteId);
  const layout = layouts.find((item) => item.id === selection.layoutId);
  const goal = goals.find((item) => item.id === selection.goalId);

  if (!palette || !layout || !goal) {
    throw new Error("Invalid selection");
  }

  return { palette, layout, goal };
}

export async function generateTemplateAction(selection: TemplateSelection): Promise<{ slug: string }> {
  const { palette, layout, goal } = validateSelection(selection);

  const createdAt = new Date().toISOString();
  const slug = createTemplateSlug(goal.id, layout.id, palette.id);

  const config: GeneratedTemplateConfig = {
    slug,
    createdAt,
    selection,
    sections: getBlueprintSections(goal.id),
  };

  await writeGeneratedTemplate(config);
  await appendManifestEntry({
    slug,
    createdAt,
    paletteId: palette.id,
    paletteName: palette.name,
    layoutId: layout.id,
    layoutName: layout.name,
    goalId: goal.id,
    goalLabel: goal.label,
  });

  revalidatePath("/lab/template-builder/gallery");
  revalidatePath(`/lab/generated/${slug}`);

  return { slug };
}

export async function deleteTemplateAction(slug: string): Promise<void> {
  await deleteGeneratedTemplate(slug);
  revalidatePath("/lab/template-builder/gallery");
}
