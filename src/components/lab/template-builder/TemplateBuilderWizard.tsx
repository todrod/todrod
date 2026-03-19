"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { goals } from "@/data/goals";
import { layouts } from "@/data/layouts";
import { palettes } from "@/data/palettes";
import { fontPairings, getDefaultFontPairing } from "@/data/fontPairings";
import { uiStyleOptions, getDefaultUIStyle } from "@/data/uiStyleOptions";
import { VirtualWorkspace } from "@/components/lab/template-builder/VirtualWorkspace";
import {
  clearSelection,
  defaultTemplateBrief,
  deleteDraft,
  loadBrief,
  loadDrafts,
  loadSelection,
  saveBrief,
  saveDraft,
  saveSelection,
} from "@/lib/templateBuilder/storage";
import { readSelectionFromQuery, updateUrlFromSelection } from "@/lib/templateBuilder/query";
import type {
  Goal,
  LayoutTemplate,
  Palette,
  TemplateBrief,
  TemplateBuilderMustHave,
} from "@/lib/templateBuilder/types";

const mustHaveOptions: Array<{ id: TemplateBuilderMustHave; label: string }> = [
  { id: "booking", label: "Booking" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "gallery", label: "Gallery" },
  { id: "team", label: "Team" },
  { id: "forms", label: "Forms" },
  { id: "map", label: "Map" },
  { id: "docs", label: "Docs" },
  { id: "schedule", label: "Schedule" },
];

const layoutsByType = layouts.reduce<Record<string, LayoutTemplate[]>>((acc, layout) => {
  const group = acc[layout.type] ?? [];
  group.push(layout);
  acc[layout.type] = group;
  return acc;
}, {});

const layoutTypeLabels: Record<string, string> = {
  landing: "Landing",
  dashboard: "Dashboard",
  content: "Content",
  commerce: "Commerce",
  app: "App",
  exam: "Exam",
};

// ─── Dropdown component ───────────────────────────────────────────────────────

function ControlLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
      {children}
    </p>
  );
}

function StyledSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none rounded-xl border border-white/12 bg-zinc-900/80 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 cursor-pointer"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2371717a'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "8px" }}
    >
      {children}
    </select>
  );
}

function ColorSwatches({ palette }: { palette: Palette | undefined }) {
  if (!palette) return null;
  return (
    <div className="mt-1.5 flex gap-1.5">
      {[palette.tokens.primary, palette.tokens.accent, palette.tokens.secondary, palette.tokens.background].map((color) => (
        <div
          key={color}
          className="h-5 w-5 rounded-full border border-white/15"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
      <span className="ml-1 text-[10px] text-zinc-500">{palette.name}</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

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

  const getInitialBrief = () => (typeof window === "undefined" ? defaultTemplateBrief : loadBrief());
  const getInitialDrafts = () => (typeof window === "undefined" ? [] : loadDrafts());

  const [goalId, setGoalId] = useState<string>(() => getInitialSelection().goalId);
  const [layoutId, setLayoutId] = useState<string>(() => getInitialSelection().layoutId);
  const [paletteId, setPaletteId] = useState<string>(() => getInitialSelection().paletteId);
  const [fontPairingId, setFontPairingId] = useState<string>(() => {
    const init = getInitialSelection().goalId;
    return getDefaultFontPairing(init).id;
  });
  const [uiStyleId, setUiStyleId] = useState<string>(() => {
    const init = getInitialSelection().goalId;
    return getDefaultUIStyle(init).id;
  });
  const [brief, setBrief] = useState<TemplateBrief>(() => getInitialBrief());
  const [savedDrafts, setSavedDrafts] = useState(() => getInitialDrafts());
  const [saveMessage, setSaveMessage] = useState("");
  const [draftsOpen, setDraftsOpen] = useState(false);

  const isClientReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Sync URL + storage
  useEffect(() => {
    if (!isClientReady) return;
    saveSelection({ paletteId, layoutId, goalId });
    updateUrlFromSelection({ paletteId, layoutId, goalId });
  }, [isClientReady, paletteId, layoutId, goalId]);

  useEffect(() => {
    if (!isClientReady) return;
    saveBrief(brief);
  }, [isClientReady, brief]);

  // Auto-update font/style when goal changes
  const handleGoalChange = (newGoalId: string) => {
    setGoalId(newGoalId);
    setFontPairingId(getDefaultFontPairing(newGoalId).id);
    setUiStyleId(getDefaultUIStyle(newGoalId).id);
  };

  const palette = palettes.find((item) => item.id === paletteId);
  const layout = layouts.find((item) => item.id === layoutId);
  const goal = goals.find((item) => item.id === goalId);
  const fontPairing = fontPairings.find((item) => item.id === fontPairingId);
  const uiStyle = uiStyleOptions.find((item) => item.id === uiStyleId);

  const canGenerate = Boolean(paletteId && layoutId && goalId);

  const openResult = () => {
    if (!canGenerate) return;
    router.push(`/lab/template-builder/result?palette=${paletteId}&layout=${layoutId}&goal=${goalId}`);
  };

  const toggleMustHave = (feature: TemplateBuilderMustHave) => {
    setBrief((current) => ({
      ...current,
      mustHaves: current.mustHaves.includes(feature)
        ? current.mustHaves.filter((item) => item !== feature)
        : [...current.mustHaves, feature],
    }));
  };

  const saveCurrentDraft = () => {
    if (!goal) return;
    const name = brief.idea.trim() || goal.label;
    const nextDraft = saveDraft({
      brief,
      selection: { paletteId, layoutId, goalId },
      styleIntensity: "minimal",
      name: name.slice(0, 48),
    });
    setSavedDrafts(loadDrafts());
    setSaveMessage(`Saved: ${nextDraft.name}`);
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const loadDraft = (id: string) => {
    const draft = savedDrafts.find((item) => item.id === id);
    if (!draft) return;
    setBrief(draft.brief);
    setGoalId(draft.selection.goalId);
    setPaletteId(draft.selection.paletteId);
    setLayoutId(draft.selection.layoutId);
    setFontPairingId(getDefaultFontPairing(draft.selection.goalId).id);
    setUiStyleId(getDefaultUIStyle(draft.selection.goalId).id);
  };

  const removeDraft = (id: string) => {
    setSavedDrafts(deleteDraft(id));
  };

  const resetAll = () => {
    setGoalId("");
    setLayoutId("");
    setPaletteId("");
    setBrief(defaultTemplateBrief);
    setFontPairingId(fontPairings[0]!.id);
    setUiStyleId(uiStyleOptions[0]!.id);
    clearSelection();
    saveBrief(defaultTemplateBrief);
    router.replace("/lab/template-builder");
  };

  if (!isClientReady) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-zinc-400">
          Loading template builder...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#09090f]">

      {/* ── Left panel ─────────────────────────────────────────────────── */}
      <div className="flex w-[280px] flex-shrink-0 flex-col overflow-y-auto border-r border-white/8 bg-zinc-950">

        {/* Header */}
        <div className="border-b border-white/8 px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-sm font-semibold text-zinc-100">Template Builder</h1>
            <Link href="/lab/template-builder/gallery" className="text-[10px] text-zinc-500 hover:text-zinc-300">
              Gallery
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={openResult}
              disabled={!canGenerate}
              className="w-full rounded-xl bg-cyan-400 py-2.5 text-sm font-semibold text-black disabled:opacity-35 disabled:cursor-not-allowed hover:opacity-90 transition"
            >
              Continue to Result →
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={saveCurrentDraft}
                disabled={!goalId}
                className="flex-1 rounded-xl border border-emerald-300/30 py-2 text-xs text-emerald-200 hover:border-emerald-300/60 disabled:opacity-30 transition"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="flex-1 rounded-xl border border-white/12 py-2 text-xs text-zinc-400 hover:border-white/25 transition"
              >
                Reset
              </button>
            </div>
            {saveMessage && <p className="text-center text-[10px] text-emerald-300">{saveMessage}</p>}
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-5 px-4 py-5">

          {/* Goal */}
          <div>
            <ControlLabel>Goal</ControlLabel>
            <StyledSelect value={goalId} onChange={handleGoalChange}>
              <option value="">— Select a goal —</option>
              {(goals as Goal[]).map((g) => (
                <option key={g.id} value={g.id}>{g.label}</option>
              ))}
            </StyledSelect>
            {goal && <p className="mt-1.5 text-[10px] text-zinc-500">{goal.description}</p>}
          </div>

          {/* UI Style */}
          <div>
            <ControlLabel>UI Style</ControlLabel>
            <StyledSelect value={uiStyleId} onChange={setUiStyleId}>
              {uiStyleOptions.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </StyledSelect>
            {uiStyle && <p className="mt-1.5 text-[10px] text-zinc-500">{uiStyle.description}</p>}
          </div>

          {/* Layout */}
          <div>
            <ControlLabel>Layout</ControlLabel>
            <StyledSelect value={layoutId} onChange={setLayoutId}>
              <option value="">— Select a layout —</option>
              {Object.entries(layoutsByType).map(([type, items]) => (
                <optgroup key={type} label={layoutTypeLabels[type] ?? type}>
                  {items.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </optgroup>
              ))}
            </StyledSelect>
            {layout && <p className="mt-1.5 text-[10px] text-zinc-500">{layout.description}</p>}
          </div>

          {/* Color Palette */}
          <div>
            <ControlLabel>Color Palette</ControlLabel>
            <StyledSelect value={paletteId} onChange={setPaletteId}>
              <option value="">— Select a palette —</option>
              {palettes.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </StyledSelect>
            <ColorSwatches palette={palette} />
          </div>

          {/* Font Pairing */}
          <div>
            <ControlLabel>Typography</ControlLabel>
            <StyledSelect value={fontPairingId} onChange={setFontPairingId}>
              {fontPairings.map((fp) => (
                <option key={fp.id} value={fp.id}>{fp.name}</option>
              ))}
            </StyledSelect>
            {fontPairing && (
              <div className="mt-1.5 space-y-0.5">
                <p className="text-[10px] text-zinc-400">
                  <span className="text-zinc-300">{fontPairing.headingFont}</span> · Heading
                </p>
                <p className="text-[10px] text-zinc-400">
                  <span className="text-zinc-300">{fontPairing.bodyFont}</span> · Body
                </p>
              </div>
            )}
          </div>

          {/* Idea notes */}
          <div>
            <ControlLabel>Idea Notes (optional)</ControlLabel>
            <input
              type="text"
              value={brief.idea}
              onChange={(e) => setBrief((c) => ({ ...c, idea: e.target.value }))}
              placeholder="Brief description of your project..."
              className="w-full rounded-xl border border-white/12 bg-zinc-900/80 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-cyan-400/60"
            />
          </div>

          {/* Must-Have Sections */}
          <div>
            <ControlLabel>Must-Have Sections</ControlLabel>
            <div className="flex flex-wrap gap-1.5">
              {mustHaveOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleMustHave(opt.id)}
                  className={`rounded-full border px-2.5 py-1 text-[10px] transition ${
                    brief.mustHaves.includes(opt.id)
                      ? "border-cyan-300/65 bg-cyan-300/14 text-cyan-100"
                      : "border-white/15 text-zinc-400 hover:border-white/25"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Saved Drafts */}
          <div>
            <button
              type="button"
              onClick={() => setDraftsOpen((v) => !v)}
              className="flex w-full items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 hover:text-zinc-200 transition"
            >
              <span>Saved Drafts ({savedDrafts.length})</span>
              <span>{draftsOpen ? "▲" : "▼"}</span>
            </button>
            {draftsOpen && (
              <div className="mt-2 space-y-2">
                {savedDrafts.length === 0 ? (
                  <p className="text-[10px] text-zinc-600">No drafts yet.</p>
                ) : (
                  savedDrafts.map((draft) => (
                    <div key={draft.id} className="rounded-xl border border-white/10 bg-zinc-900/60 p-2.5">
                      <p className="text-xs font-semibold text-zinc-200">{draft.name}</p>
                      <p className="mt-0.5 text-[10px] text-zinc-500">{new Date(draft.savedAt).toLocaleDateString()}</p>
                      <div className="mt-2 flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => loadDraft(draft.id)}
                          className="rounded-md border border-cyan-300/30 px-2 py-1 text-[10px] text-cyan-200 hover:border-cyan-300/60"
                        >
                          Load
                        </button>
                        <button
                          type="button"
                          onClick={() => removeDraft(draft.id)}
                          className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-zinc-400 hover:border-rose-300/50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Right panel: Virtual Workspace ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {/* Workspace toolbar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/8 bg-zinc-950/90 px-5 py-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">Live Preview</span>
            {goal && (
              <span className="rounded-full border border-white/12 bg-white/5 px-2 py-0.5 text-[10px] text-zinc-300">{goal.label}</span>
            )}
            {uiStyle && (
              <span className="rounded-full border border-violet-400/25 bg-violet-400/8 px-2 py-0.5 text-[10px] text-violet-300">{uiStyle.name}</span>
            )}
            {fontPairing && (
              <span className="rounded-full border border-amber-400/20 bg-amber-400/6 px-2 py-0.5 text-[10px] text-amber-300">{fontPairing.name}</span>
            )}
          </div>
          {canGenerate && (
            <button
              type="button"
              onClick={openResult}
              className="rounded-xl bg-cyan-400 px-4 py-1.5 text-xs font-semibold text-black hover:opacity-90 transition"
            >
              Continue to Result →
            </button>
          )}
        </div>

        {/* Workspace content */}
        <div className="min-h-full">
          <VirtualWorkspace
            palette={palette}
            layout={layout}
            goal={goal}
            fontPairing={fontPairing}
            mustHaves={brief.mustHaves}
          />
        </div>
      </div>

    </div>
  );
}
