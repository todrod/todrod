import type { TemplateSelection } from "@/lib/templateBuilder/types";

const KEY = "template-builder-selection-v1";

export function saveSelection(selection: Partial<TemplateSelection>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(selection));
}

export function loadSelection(): Partial<TemplateSelection> {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as Partial<TemplateSelection>;
    return parsed;
  } catch {
    return {};
  }
}

export function clearSelection(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
