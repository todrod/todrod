import type {
  TemplateBrief,
  TemplateBuilderDraft,
  TemplateBuilderStyleIntensity,
  TemplateFavorite,
  TemplateSelection,
} from "@/lib/templateBuilder/types";

const KEY = "template-builder-selection-v1";
const BRIEF_KEY = "template-builder-brief-v1";
const DRAFTS_KEY = "template-builder-drafts-v1";

export const defaultTemplateBrief: TemplateBrief = {
  idea: "",
  audience: "",
  tone: "clean",
  mustHaves: [],
  layoutPreference: "auto",
};

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

export function saveBrief(brief: TemplateBrief): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BRIEF_KEY, JSON.stringify(brief));
}

export function loadBrief(): TemplateBrief {
  if (typeof window === "undefined") return defaultTemplateBrief;
  const raw = window.localStorage.getItem(BRIEF_KEY);
  if (!raw) return defaultTemplateBrief;

  try {
    const parsed = JSON.parse(raw) as Partial<TemplateBrief>;
    return {
      ...defaultTemplateBrief,
      ...parsed,
      mustHaves: Array.isArray(parsed.mustHaves) ? parsed.mustHaves : [],
    };
  } catch {
    return defaultTemplateBrief;
  }
}

export function loadDrafts(): TemplateBuilderDraft[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(DRAFTS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as TemplateBuilderDraft[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDraft(input: {
  brief: TemplateBrief;
  selection: TemplateSelection;
  styleIntensity: TemplateBuilderStyleIntensity;
  name: string;
}): TemplateBuilderDraft {
  const nextDraft: TemplateBuilderDraft = {
    id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: input.name,
    savedAt: new Date().toISOString(),
    brief: input.brief,
    selection: input.selection,
    styleIntensity: input.styleIntensity,
  };

  if (typeof window === "undefined") return nextDraft;

  const nextDrafts = [nextDraft, ...loadDrafts()].slice(0, 10);
  window.localStorage.setItem(DRAFTS_KEY, JSON.stringify(nextDrafts));
  return nextDraft;
}

export function deleteDraft(id: string): TemplateBuilderDraft[] {
  if (typeof window === "undefined") return [];
  const nextDrafts = loadDrafts().filter((item) => item.id !== id);
  window.localStorage.setItem(DRAFTS_KEY, JSON.stringify(nextDrafts));
  return nextDrafts;
}

const FAVORITES_KEY = "template-builder-favorites-v1";

export function loadFavorites(): TemplateFavorite[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(FAVORITES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as TemplateFavorite[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFavorite(input: Omit<TemplateFavorite, "id" | "savedAt">): TemplateFavorite {
  const next: TemplateFavorite = {
    id: `fav-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    savedAt: new Date().toISOString(),
    ...input,
  };
  if (typeof window === "undefined") return next;
  const nextFavs = [next, ...loadFavorites()].slice(0, 20);
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavs));
  return next;
}

export function deleteFavorite(id: string): TemplateFavorite[] {
  if (typeof window === "undefined") return [];
  const next = loadFavorites().filter((f) => f.id !== id);
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next;
}

export function isFavorited(
  goalId: string,
  layoutId: string,
  paletteId: string,
  uiStyleId: string,
  fontPairingId: string,
): boolean {
  return loadFavorites().some(
    (f) =>
      f.goalId === goalId &&
      f.layoutId === layoutId &&
      f.paletteId === paletteId &&
      f.uiStyleId === uiStyleId &&
      f.fontPairingId === fontPairingId,
  );
}
