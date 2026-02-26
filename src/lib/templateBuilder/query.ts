import type { TemplateSelection } from "@/lib/templateBuilder/types";

export function readSelectionFromQuery(searchParams: URLSearchParams): Partial<TemplateSelection> {
  const paletteId = searchParams.get("palette") ?? undefined;
  const layoutId = searchParams.get("layout") ?? undefined;
  const goalId = searchParams.get("goal") ?? undefined;
  return { paletteId, layoutId, goalId };
}

export function updateUrlFromSelection(selection: Partial<TemplateSelection>): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);

  if (selection.paletteId) url.searchParams.set("palette", selection.paletteId);
  else url.searchParams.delete("palette");

  if (selection.layoutId) url.searchParams.set("layout", selection.layoutId);
  else url.searchParams.delete("layout");

  if (selection.goalId) url.searchParams.set("goal", selection.goalId);
  else url.searchParams.delete("goal");

  window.history.replaceState({}, "", url.toString());
}
