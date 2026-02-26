import { blueprints } from "@/data/blueprints";
import type { BlueprintSection } from "@/lib/templateBuilder/types";

export function getBlueprintSections(goalId: string): BlueprintSection[] {
  return blueprints.find((b) => b.goalId === goalId)?.sections ?? [];
}
