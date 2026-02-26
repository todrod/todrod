"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { goals } from "@/data/goals";
import { layouts } from "@/data/layouts";
import { palettes } from "@/data/palettes";
import { templateIdeas } from "@/data/templateIdeas";
import { GoalGrid } from "@/components/lab/template-builder/GoalGrid";
import { LayoutGrid } from "@/components/lab/template-builder/LayoutGrid";
import { PaletteGrid } from "@/components/lab/template-builder/PaletteGrid";
import { PreviewFrame } from "@/components/lab/template-builder/PreviewFrame";
import { SearchBar } from "@/components/lab/template-builder/SearchBar";
import { Stepper } from "@/components/lab/template-builder/Stepper";
import { SummaryPanel } from "@/components/lab/template-builder/SummaryPanel";
import { clearSelection, loadSelection, saveSelection } from "@/lib/templateBuilder/storage";
import { readSelectionFromQuery, updateUrlFromSelection } from "@/lib/templateBuilder/query";
import type { Goal, LayoutTemplate, Palette } from "@/lib/templateBuilder/types";

type WizardStep = 1 | 2 | 3 | 4;
type StyleIntensity = "minimal" | "bold" | "editorial";
type SmartVariant = {
  id: string;
  paletteId: string;
  layoutId: string;
  goalId: string;
  reason: string;
};
const layoutTypeFilters = ["all", "landing", "dashboard", "content", "commerce", "app", "exam"] as const;
type LayoutTypeFilter = (typeof layoutTypeFilters)[number];
const goalCategoryFilters = ["all", "medical", "creator", "business", "commerce", "education", "content", "events"] as const;
type GoalCategoryFilter = (typeof goalCategoryFilters)[number];

export function TemplateBuilderWizard() {
  const router = useRouter();

  const getInitialSelection = () => {
    if (typeof window === "undefined") return { paletteId: "", layoutId: "", goalId: "" };
    const fromQuery = readSelectionFromQuery(new URLSearchParams(window.location.search));
    const fromStorage = loadSelection();
    const nextPalette = fromQuery.paletteId ?? fromStorage.paletteId ?? "";
    const nextLayout = fromQuery.layoutId ?? fromStorage.layoutId ?? "";
    const nextGoal = fromQuery.goalId ?? fromStorage.goalId ?? "";
    return {
      paletteId: palettes.some((item) => item.id === nextPalette) ? nextPalette : "",
      layoutId: layouts.some((item) => item.id === nextLayout) ? nextLayout : "",
      goalId: goals.some((item) => item.id === nextGoal) ? nextGoal : "",
    };
  };

  const [step, setStep] = useState<WizardStep>(1);
  const [search, setSearch] = useState("");
  const [paletteId, setPaletteId] = useState<string>(() => getInitialSelection().paletteId);
  const [layoutId, setLayoutId] = useState<string>(() => getInitialSelection().layoutId);
  const [goalId, setGoalId] = useState<string>(() => getInitialSelection().goalId);
  const [previewTheme, setPreviewTheme] = useState(true);
  const [previewDark, setPreviewDark] = useState(true);
  const [styleIntensity, setStyleIntensity] = useState<StyleIntensity>("minimal");
  const [layoutTypeFilter, setLayoutTypeFilter] = useState<LayoutTypeFilter>("all");
  const [goalCategoryFilter, setGoalCategoryFilter] = useState<GoalCategoryFilter>("all");
  const [smartVariants, setSmartVariants] = useState<SmartVariant[]>([]);

  useEffect(() => {
    const selection = { paletteId, layoutId, goalId };
    saveSelection(selection);
    updateUrlFromSelection(selection);
  }, [paletteId, layoutId, goalId]);

  const palette = palettes.find((item) => item.id === paletteId);
  const layout = layouts.find((item) => item.id === layoutId);
  const goal = goals.find((item) => item.id === goalId);

  const filterCards = <T extends { name?: string; label?: string; description: string; tags: string[] }>(items: T[]) => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => {
      const label = item.name ?? item.label ?? "";
      return [label, item.description, item.tags.join(" ")].join(" ").toLowerCase().includes(q);
    });
  };

  const intensityTags: Record<StyleIntensity, string[]> = {
    minimal: ["minimal", "neutral", "professional", "light", "clean", "enterprise", "docs"],
    bold: ["bold", "dark", "creative", "premium", "campaign", "conversion", "startup", "event"],
    editorial: ["editorial", "content", "blog", "docs", "knowledge", "story", "portfolio"],
  };

  const scoreByIntensity = (tags: string[]) =>
    tags.reduce((acc, tag) => {
      const lower = tag.toLowerCase();
      return intensityTags[styleIntensity].some((token) => lower.includes(token)) ? acc + 1 : acc;
    }, 0);

  const sortByIntensity = <T extends { tags: string[] }>(items: T[]) =>
    [...items].sort((a, b) => scoreByIntensity(b.tags) - scoreByIntensity(a.tags));

  const paletteItems = sortByIntensity(filterCards<Palette>(palettes));
  const layoutItems = sortByIntensity(filterCards<LayoutTemplate>(layouts)).filter((item) =>
    layoutTypeFilter === "all" ? true : item.type === layoutTypeFilter,
  );
  const goalItems = sortByIntensity(filterCards<Goal>(goals)).filter((item) => {
    if (goalCategoryFilter === "all") return true;
    const text = `${item.label} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
    if (goalCategoryFilter === "medical") return /medical|clinic|health/.test(text);
    if (goalCategoryFilter === "creator") return /podcast|portfolio|agency|creator/.test(text);
    if (goalCategoryFilter === "business") return /saas|app|real-estate|office|nonprofit/.test(text);
    if (goalCategoryFilter === "commerce") return /commerce|ecommerce|store|restaurant/.test(text);
    if (goalCategoryFilter === "education") return /exam|course|education/.test(text);
    if (goalCategoryFilter === "content") return /docs|blog|content/.test(text);
    if (goalCategoryFilter === "events") return /event|conference/.test(text);
    return true;
  });

  const conceptItems = sortByIntensity(templateIdeas).filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return `${item.name} ${item.description} ${item.tags.join(" ")}`.toLowerCase().includes(q);
  });

  const canNext = step === 1 ? Boolean(paletteId) : step === 2 ? Boolean(layoutId) : step === 3 ? Boolean(goalId) : true;

  const goNext = () => setStep((prev) => (prev < 4 ? ((prev + 1) as WizardStep) : prev));
  const goBack = () => setStep((prev) => (prev > 1 ? ((prev - 1) as WizardStep) : prev));

  const resetAll = () => {
    setPaletteId("");
    setLayoutId("");
    setGoalId("");
    setSearch("");
    setStyleIntensity("minimal");
    setLayoutTypeFilter("all");
    setGoalCategoryFilter("all");
    setSmartVariants([]);
    setStep(1);
    clearSelection();
    router.replace("/lab/template-builder");
  };

  const openResult = () => {
    if (!paletteId || !layoutId || !goalId) return;
    router.push(`/lab/template-builder/result?palette=${paletteId}&layout=${layoutId}&goal=${goalId}`);
  };

  const applyConcept = (conceptId: string) => {
    const concept = templateIdeas.find((item) => item.id === conceptId);
    if (!concept) return;
    setPaletteId(concept.selection.paletteId);
    setLayoutId(concept.selection.layoutId);
    setGoalId(concept.selection.goalId);
    setStep(1);
  };

  const surpriseMe = () => {
    const randomFrom = <T,>(items: T[]): T | undefined => {
      if (items.length === 0) return undefined;
      return items[Math.floor(Math.random() * items.length)];
    };

    const pickPalette = randomFrom(paletteItems);
    const pickLayout = randomFrom(layoutItems);
    const pickGoal = randomFrom(goalItems);

    if (!pickPalette || !pickLayout || !pickGoal) return;

    setPaletteId(pickPalette.id);
    setLayoutId(pickLayout.id);
    setGoalId(pickGoal.id);
    setStep(4);
  };

  const generateSmartVariants = () => {
    const palettePool = paletteItems.slice(0, 12);
    const layoutPool = layoutItems.slice(0, 12);
    const goalPool = goalItems.slice(0, 12);
    if (palettePool.length === 0 || layoutPool.length === 0 || goalPool.length === 0) {
      setSmartVariants([]);
      return;
    }

    const weightedPick = <T,>(items: T[]): T => {
      const total = items.reduce((sum, _, index) => sum + (items.length - index), 0);
      let cursor = Math.random() * total;
      for (let index = 0; index < items.length; index += 1) {
        cursor -= items.length - index;
        if (cursor <= 0) return items[index];
      }
      return items[0];
    };

    const variants: SmartVariant[] = [];
    const seen = new Set<string>();
    let attempts = 0;
    while (variants.length < 3 && attempts < 60) {
      attempts += 1;
      const p = weightedPick(palettePool);
      const l = weightedPick(layoutPool);
      const g = weightedPick(goalPool);
      const key = `${p.id}|${l.id}|${g.id}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const reasonBits = [
        styleIntensity === "bold"
          ? "High-impact look for attention and conversion"
          : styleIntensity === "editorial"
            ? "Content-forward visual rhythm for readability"
            : "Clean, production-safe structure for fast launch",
        layoutTypeFilter !== "all" ? `layout filtered to ${layoutTypeFilter}` : null,
        goalCategoryFilter !== "all" ? `goal tuned for ${goalCategoryFilter}` : null,
      ].filter(Boolean);

      variants.push({
        id: `smart-${p.id}-${l.id}-${g.id}`,
        paletteId: p.id,
        layoutId: l.id,
        goalId: g.id,
        reason: reasonBits.join(" • "),
      });
    }

    setSmartVariants(variants);
  };

  const applySmartVariant = (variant: SmartVariant) => {
    setPaletteId(variant.paletteId);
    setLayoutId(variant.layoutId);
    setGoalId(variant.goalId);
    setStep(4);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Stepper current={step} />
        <div className="flex items-center gap-2">
          <Link href="/lab/template-builder/gallery" className="rounded-md border border-white/15 px-3 py-2 text-xs hover:border-cyan-300/60">
            Gallery
          </Link>
          <button type="button" onClick={resetAll} className="rounded-md border border-white/15 px-3 py-2 text-xs hover:border-rose-300/70">
            Reset
          </button>
        </div>
      </div>

      <PreviewFrame palette={previewTheme ? palette : undefined} dark={previewDark}>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold">Template Builder</h1>
              <p className="text-sm text-[color-mix(in_srgb,var(--tb-text,#ddd),#fff_35%)]">
                Choose a palette, layout, and goal to generate a reusable starter.
              </p>
            </div>
            <div className="flex gap-2 text-xs">
              <button type="button" onClick={() => setPreviewTheme((v) => !v)} className="rounded-md border border-white/20 px-3 py-2">
                {previewTheme ? "Theme Preview: On" : "Theme Preview: Off"}
              </button>
              <button type="button" onClick={() => setPreviewDark((v) => !v)} className="rounded-md border border-white/20 px-3 py-2">
                {previewDark ? "Dark" : "Light"}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-black/20 p-2">
            <span className="px-2 text-xs text-[color-mix(in_srgb,var(--tb-text,#ddd),#fff_30%)]">Style Intensity</span>
            {(["minimal", "bold", "editorial"] as StyleIntensity[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setStyleIntensity(level)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  styleIntensity === level ? "border-cyan-300/70 bg-cyan-300/15 text-cyan-100" : "border-white/20 text-zinc-300 hover:border-cyan-300/55"
                }`}
              >
                {level === "minimal" ? "Minimal" : level === "bold" ? "Bold" : "Editorial"}
              </button>
            ))}
            <button
              type="button"
              onClick={surpriseMe}
              className="ml-auto rounded-full border border-cyan-300/55 bg-cyan-300/15 px-3 py-1 text-xs text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/25"
            >
              Surprise Me
            </button>
            <button
              type="button"
              onClick={generateSmartVariants}
              className="rounded-full border border-violet-300/55 bg-violet-300/15 px-3 py-1 text-xs text-violet-100 transition hover:border-violet-200 hover:bg-violet-300/25"
            >
              Generate 3 Smart Variants
            </button>
          </div>

          <SummaryPanel palette={palette} layout={layout} goal={goal} />

          {step < 4 ? <SearchBar value={search} onChange={setSearch} placeholder="Search by name, description, or tag" /> : null}

          {step < 4 ? (
            <section className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold">Quick Start Concepts</h2>
                  <p className="text-xs text-[color-mix(in_srgb,var(--tb-text,#ddd),#fff_35%)]">
                    One click applies a curated palette + layout + goal combo.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {conceptItems.slice(0, 8).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => applyConcept(item.id)}
                    className="group rounded-xl border border-white/15 bg-card/65 p-3 text-left transition hover:-translate-y-0.5 hover:border-cyan-300/60"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-zinc-100">{item.name}</span>
                      <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-zinc-300">apply</span>
                    </div>
                    <p className="text-xs text-zinc-400">{item.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span key={`${item.id}-${tag}`} className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-zinc-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {step < 4 && smartVariants.length > 0 ? (
            <section className="space-y-3 rounded-xl border border-violet-300/25 bg-violet-500/10 p-4">
              <div>
                <h2 className="text-base font-semibold">Smart Variants</h2>
                <p className="text-xs text-[color-mix(in_srgb,var(--tb-text,#ddd),#fff_35%)]">Auto-generated combinations tuned to your current filters and style intensity.</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {smartVariants.map((variant) => {
                  const vPalette = palettes.find((item) => item.id === variant.paletteId);
                  const vLayout = layouts.find((item) => item.id === variant.layoutId);
                  const vGoal = goals.find((item) => item.id === variant.goalId);
                  if (!vPalette || !vLayout || !vGoal) return null;
                  return (
                    <div key={variant.id} className="rounded-xl border border-white/15 bg-card/70 p-3">
                      <p className="text-sm font-semibold">{vGoal.label}</p>
                      <p className="text-xs text-zinc-400">{vLayout.name} • {vPalette.name}</p>
                      <p className="mt-2 text-[11px] text-zinc-400">{variant.reason}</p>
                      <button
                        type="button"
                        onClick={() => applySmartVariant(variant)}
                        className="mt-3 rounded-md bg-[var(--tb-primary,#22d3ee)] px-3 py-1.5 text-xs font-semibold text-black hover:opacity-90"
                      >
                        Use This Variant
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {step === 1 ? (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Step 1: Pick Color Scheme</h2>
              <p className="text-sm text-[color-mix(in_srgb,var(--tb-text,#ddd),#fff_35%)]">Choose a palette that defines tone and contrast.</p>
              <PaletteGrid items={paletteItems} selectedId={paletteId} onSelect={setPaletteId} styleIntensity={styleIntensity} />
            </section>
          ) : null}

          {step === 2 ? (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Step 2: Pick Layout Template</h2>
              <p className="text-sm text-[color-mix(in_srgb,var(--tb-text,#ddd),#fff_35%)]">Select the shell structure for your generated starter.</p>
              <div className="flex flex-wrap gap-2">
                {layoutTypeFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setLayoutTypeFilter(filter)}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      layoutTypeFilter === filter ? "border-cyan-300/70 bg-cyan-300/15 text-cyan-100" : "border-white/20 text-zinc-300 hover:border-cyan-300/55"
                    }`}
                  >
                    {filter === "all" ? "All Layouts" : filter[0].toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
              <LayoutGrid items={layoutItems} selectedId={layoutId} onSelect={setLayoutId} palette={palette} styleIntensity={styleIntensity} />
            </section>
          ) : null}

          {step === 3 ? (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Step 3: Pick Project Goal</h2>
              <p className="text-sm text-[color-mix(in_srgb,var(--tb-text,#ddd),#fff_35%)]">Goal maps to a recommended section blueprint.</p>
              <div className="flex flex-wrap gap-2">
                {goalCategoryFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setGoalCategoryFilter(filter)}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      goalCategoryFilter === filter ? "border-cyan-300/70 bg-cyan-300/15 text-cyan-100" : "border-white/20 text-zinc-300 hover:border-cyan-300/55"
                    }`}
                  >
                    {filter === "all" ? "All Goals" : filter[0].toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
              <GoalGrid items={goalItems} selectedId={goalId} onSelect={setGoalId} styleIntensity={styleIntensity} />
            </section>
          ) : null}

          {step === 4 ? (
            <section className="space-y-3 rounded-xl border border-white/10 bg-card/60 p-4">
              <h2 className="text-lg font-semibold">Step 4: Result + Generate</h2>
              <p className="text-sm text-[color-mix(in_srgb,var(--tb-text,#ddd),#fff_35%)]">Review your selections and generate a working template.</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={openResult} className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-black hover:opacity-90">
                  Continue to Result
                </button>
              </div>
            </section>
          ) : null}

          <div className="flex items-center justify-between pt-2">
            <button type="button" onClick={goBack} disabled={step === 1} className="rounded-md border border-white/20 px-4 py-2 text-sm disabled:opacity-50">
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={step === 4 || !canNext}
              className="rounded-md bg-[var(--tb-primary,#22d3ee)] px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </PreviewFrame>
    </div>
  );
}
