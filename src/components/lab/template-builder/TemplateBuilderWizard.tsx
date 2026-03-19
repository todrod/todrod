"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { goals } from "@/data/goals";
import { layouts } from "@/data/layouts";
import { palettes } from "@/data/palettes";
import { fontPairings, getDefaultFontPairing } from "@/data/fontPairings";
import { uiStyleOptions, getDefaultUIStyle } from "@/data/uiStyleOptions";
import { getRulesForGoal } from "@/data/uiReasoningRules";
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

const mustHaveOptions: Array<{ id: TemplateBuilderMustHave; label: string; icon: string }> = [
  { id: "booking", label: "Booking", icon: "📅" },
  { id: "pricing", label: "Pricing", icon: "💳" },
  { id: "testimonials", label: "Reviews", icon: "⭐" },
  { id: "faq", label: "FAQ", icon: "❓" },
  { id: "gallery", label: "Gallery", icon: "🖼" },
  { id: "team", label: "Team", icon: "👥" },
  { id: "forms", label: "Forms", icon: "📝" },
  { id: "map", label: "Map", icon: "📍" },
  { id: "docs", label: "Docs", icon: "📄" },
  { id: "schedule", label: "Schedule", icon: "🗓" },
];

const layoutsByType = layouts.reduce<Record<string, LayoutTemplate[]>>((acc, layout) => {
  const group = acc[layout.type] ?? [];
  group.push(layout);
  acc[layout.type] = group;
  return acc;
}, {});

const layoutTypeLabels: Record<string, string> = {
  landing: "Landing Pages",
  dashboard: "Dashboards",
  content: "Content & Blog",
  commerce: "E-Commerce",
  app: "Web Apps",
  exam: "Exam & Learning",
};

// Group palettes: curated vs industry
const curatedPalettes = palettes.filter((p) => !p.id.startsWith("pro-"));
const industryPalettes = palettes.filter((p) => p.id.startsWith("pro-"));

// Smart palette suggestion from goal
const goalToPaletteHint: Record<string, string> = {
  "medical-office": "pro-medical-clinic",
  "saas-app": "pro-saas-general",
  "landing": "pro-service-landing-page",
  "ecommerce": "pro-e-commerce",
  "portfolio": "pro-portfolio-personal",
  "blog-docs": "pro-knowledge-base-documentation",
  "podcast": "pro-podcast-platform",
  "agency": "pro-creative-agency",
  "restaurant": "pro-restaurant-food-service",
  "nonprofit": "pro-non-profit-charity",
  "event": "pro-event-management",
  "real-estate": "pro-real-estate-property",
  "course-platform": "pro-online-course-e-learning",
  "exam-module": "pro-online-course-e-learning",
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children, count }: { children: React.ReactNode; count?: number }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">{children}</p>
      {count !== undefined && (
        <span className="rounded-full bg-zinc-800 px-1.5 py-0.5 text-[9px] font-semibold text-zinc-500">{count}</span>
      )}
    </div>
  );
}

function Divider() {
  return <div className="my-1 border-t border-white/[0.06]" />;
}

function StyledSelect({
  value,
  onChange,
  children,
  accent,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full appearance-none rounded-lg border px-3 py-2 text-[13px] outline-none transition cursor-pointer ${
        accent
          ? "border-cyan-400/30 bg-cyan-400/5 text-cyan-100 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/15"
          : "border-white/10 bg-zinc-900 text-zinc-200 hover:border-white/20 focus:border-zinc-600 focus:ring-1 focus:ring-white/8"
      }`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2352525b'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
        backgroundSize: "8px",
        paddingRight: "28px",
      }}
    >
      {children}
    </select>
  );
}

function PaletteStrip({ palette }: { palette: Palette | undefined }) {
  if (!palette) return null;
  const { primary, accent, secondary, background, surface, text } = palette.tokens;
  const colors = [primary, accent, secondary, surface, background, text];
  return (
    <div className="mt-2 overflow-hidden rounded-md" style={{ height: 6 }}>
      <div className="flex h-full">
        {colors.map((c, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}

function CompletionDot({ done }: { done: boolean }) {
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${done ? "bg-emerald-400" : "bg-zinc-700"}`}
    />
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

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

  const init = getInitialSelection();
  const [goalId, setGoalId] = useState<string>(() => init.goalId);
  const [layoutId, setLayoutId] = useState<string>(() => init.layoutId);
  const [paletteId, setPaletteId] = useState<string>(() => init.paletteId);
  const [fontPairingId, setFontPairingId] = useState<string>(() => getDefaultFontPairing(init.goalId).id);
  const [uiStyleId, setUiStyleId] = useState<string>(() => getDefaultUIStyle(init.goalId).id);
  const [brief, setBrief] = useState<TemplateBrief>(() => getInitialBrief());
  const [savedDrafts, setSavedDrafts] = useState(() => getInitialDrafts());
  const [saveMessage, setSaveMessage] = useState("");
  const [draftsOpen, setDraftsOpen] = useState(false);

  const isClientReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!isClientReady) return;
    saveSelection({ paletteId, layoutId, goalId });
    updateUrlFromSelection({ paletteId, layoutId, goalId });
  }, [isClientReady, paletteId, layoutId, goalId]);

  useEffect(() => {
    if (!isClientReady) return;
    saveBrief(brief);
  }, [isClientReady, brief]);

  const handleGoalChange = (newGoalId: string) => {
    setGoalId(newGoalId);
    setFontPairingId(getDefaultFontPairing(newGoalId).id);
    setUiStyleId(getDefaultUIStyle(newGoalId).id);
    // Auto-suggest palette from goal hint
    const hint = goalToPaletteHint[newGoalId];
    if (hint && palettes.some((p) => p.id === hint)) {
      setPaletteId(hint);
    }
  };

  const palette = palettes.find((item) => item.id === paletteId);
  const layout = layouts.find((item) => item.id === layoutId);
  const goal = goals.find((item) => item.id === goalId);
  const fontPairing = fontPairings.find((item) => item.id === fontPairingId);
  const uiStyle = uiStyleOptions.find((item) => item.id === uiStyleId);

  // UI reasoning insight for active goal
  const reasoning = goalId ? getRulesForGoal(goalId)[0] : undefined;

  const canGenerate = Boolean(paletteId && layoutId && goalId);
  const completionCount = [goalId, layoutId, paletteId].filter(Boolean).length;

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
    window.setTimeout(() => setSaveMessage(""), 2500);
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
    setGoalId(""); setLayoutId(""); setPaletteId("");
    setBrief(defaultTemplateBrief);
    setFontPairingId(fontPairings[0]!.id);
    setUiStyleId(uiStyleOptions[0]!.id);
    clearSelection();
    saveBrief(defaultTemplateBrief);
    router.replace("/lab/template-builder");
  };

  if (!isClientReady) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-[#09090f]">
        <div className="rounded-xl border border-white/8 bg-zinc-950 px-6 py-5 text-sm text-zinc-500">
          Loading builder…
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#09090f]">

      {/* ── Left panel ─────────────────────────────────────────────────────── */}
      <div className="flex w-[300px] flex-shrink-0 flex-col overflow-y-auto border-r border-white/[0.07] bg-[#0d0d12]">

        {/* ── Panel header ─────────────────────────────────────────────── */}
        <div className="border-b border-white/[0.07] px-5 pt-5 pb-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-[13px] font-semibold tracking-tight text-zinc-100">Template Builder</h1>
              <p className="mt-0.5 text-[11px] text-zinc-600">Powered by ui-ux-pro-max</p>
            </div>
            <Link
              href="/lab/template-builder/gallery"
              className="rounded-md border border-white/10 px-2.5 py-1 text-[10px] font-medium text-zinc-400 transition hover:border-white/20 hover:text-zinc-200"
            >
              Gallery
            </Link>
          </div>

          {/* Progress row */}
          <div className="mb-3 flex items-center gap-2">
            {["Goal", "Layout", "Palette"].map((label, i) => (
              <div key={label} className="flex items-center gap-1.5">
                {i > 0 && <div className="h-px w-3 bg-zinc-800" />}
                <CompletionDot done={i < completionCount} />
                <span className={`text-[10px] ${i < completionCount ? "text-zinc-400" : "text-zinc-700"}`}>{label}</span>
              </div>
            ))}
            {completionCount === 3 && (
              <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold text-emerald-300">
                Ready
              </span>
            )}
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={openResult}
            disabled={!canGenerate}
            className="w-full rounded-lg bg-cyan-400 py-2.5 text-[13px] font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-25"
          >
            {canGenerate ? "Continue to Result →" : "Select goal, layout & palette"}
          </button>

          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={saveCurrentDraft}
              disabled={!goalId}
              className="flex-1 rounded-lg border border-white/10 py-1.5 text-[11px] text-zinc-400 transition hover:border-white/20 hover:text-zinc-200 disabled:opacity-25"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="flex-1 rounded-lg border border-white/10 py-1.5 text-[11px] text-zinc-400 transition hover:border-white/20 hover:text-zinc-200"
            >
              Reset
            </button>
          </div>
          {saveMessage && (
            <p className="mt-2 text-center text-[10px] text-emerald-400">{saveMessage}</p>
          )}
        </div>

        {/* ── Controls ─────────────────────────────────────────────────── */}
        <div className="flex-1 space-y-0 px-5 py-5">

          {/* Goal */}
          <div className="mb-4">
            <SectionLabel>Site Goal</SectionLabel>
            <StyledSelect value={goalId} onChange={handleGoalChange} accent={!goalId}>
              <option value="">— Choose your site type —</option>
              {(goals as Goal[]).map((g) => (
                <option key={g.id} value={g.id}>{g.label}</option>
              ))}
            </StyledSelect>
            {goal && (
              <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-600">{goal.description}</p>
            )}
            {reasoning && (
              <div className="mt-2 rounded-md border border-violet-400/15 bg-violet-400/[0.05] px-2.5 py-2">
                <p className="text-[10px] font-semibold text-violet-400/80">Recommended pattern</p>
                <p className="mt-0.5 text-[10px] text-zinc-500">{reasoning.pattern}</p>
              </div>
            )}
          </div>

          <Divider />

          {/* Layout */}
          <div className="mb-4 mt-4">
            <SectionLabel>Layout Structure</SectionLabel>
            <StyledSelect value={layoutId} onChange={setLayoutId} accent={!layoutId && !!goalId}>
              <option value="">— Choose a layout —</option>
              {Object.entries(layoutsByType).map(([type, items]) => (
                <optgroup key={type} label={layoutTypeLabels[type] ?? type}>
                  {items.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </optgroup>
              ))}
            </StyledSelect>
            {layout && (
              <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-600">{layout.description}</p>
            )}
          </div>

          <Divider />

          {/* Color Palette */}
          <div className="mb-4 mt-4">
            <SectionLabel count={palettes.length}>Color Palette</SectionLabel>
            <StyledSelect value={paletteId} onChange={setPaletteId} accent={!paletteId && !!layoutId}>
              <option value="">— Choose a palette —</option>
              <optgroup label={`Curated (${curatedPalettes.length})`}>
                {curatedPalettes.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </optgroup>
              <optgroup label={`Industry (${industryPalettes.length})`}>
                {industryPalettes.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </optgroup>
            </StyledSelect>
            {palette ? (
              <div>
                <PaletteStrip palette={palette} />
                <div className="mt-1.5 flex items-center justify-between">
                  <p className="text-[10px] text-zinc-600">{palette.description}</p>
                  <div className="flex gap-1">
                    {[palette.tokens.primary, palette.tokens.accent, palette.tokens.secondary].map((c) => (
                      <div key={c} className="h-3.5 w-3.5 rounded-full border border-white/10" style={{ backgroundColor: c }} title={c} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              reasoning && (
                <p className="mt-1.5 text-[10px] text-zinc-600">Mood: {reasoning.colorMood}</p>
              )
            )}
          </div>

          <Divider />

          {/* UI Style */}
          <div className="mb-4 mt-4">
            <SectionLabel count={uiStyleOptions.length}>UI Style</SectionLabel>
            <StyledSelect value={uiStyleId} onChange={setUiStyleId}>
              {uiStyleOptions.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </StyledSelect>
            {uiStyle && (
              <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-600">{uiStyle.description}</p>
            )}
          </div>

          {/* Typography */}
          <div className="mb-4">
            <SectionLabel count={fontPairings.length}>Typography</SectionLabel>
            <StyledSelect value={fontPairingId} onChange={setFontPairingId}>
              {fontPairings.map((fp) => (
                <option key={fp.id} value={fp.id}>{fp.name}</option>
              ))}
            </StyledSelect>
            {fontPairing && (
              <div className="mt-2 flex items-center justify-between rounded-md border border-white/[0.06] bg-zinc-900/50 px-3 py-2">
                <div>
                  <p className="text-[11px] font-semibold text-zinc-300">{fontPairing.headingFont}</p>
                  <p className="text-[10px] text-zinc-600">{fontPairing.bodyFont}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-widest text-zinc-700">Heading</p>
                  <p className="text-[9px] uppercase tracking-widest text-zinc-700">Body</p>
                </div>
              </div>
            )}
          </div>

          <Divider />

          {/* Idea Notes */}
          <div className="mb-4 mt-4">
            <SectionLabel>Project Notes</SectionLabel>
            <textarea
              value={brief.idea}
              onChange={(e) => setBrief((c) => ({ ...c, idea: e.target.value }))}
              placeholder="Describe your project in a sentence or two…"
              rows={2}
              className="w-full resize-none rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-[13px] text-zinc-200 placeholder-zinc-700 outline-none transition focus:border-zinc-600 focus:ring-1 focus:ring-white/8"
            />
          </div>

          {/* Must-Have Sections */}
          <div className="mb-4">
            <SectionLabel>Sections to Include</SectionLabel>
            <div className="grid grid-cols-2 gap-1.5">
              {mustHaveOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleMustHave(opt.id)}
                  className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] transition ${
                    brief.mustHaves.includes(opt.id)
                      ? "border-cyan-400/30 bg-cyan-400/8 text-cyan-200"
                      : "border-white/8 text-zinc-500 hover:border-white/15 hover:text-zinc-300"
                  }`}
                >
                  <span className="text-[10px]">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <Divider />

          {/* Saved Drafts */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setDraftsOpen((v) => !v)}
              className="flex w-full items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 transition hover:text-zinc-300"
            >
              <span>Saved Drafts</span>
              <span className="flex items-center gap-1.5">
                {savedDrafts.length > 0 && (
                  <span className="rounded-full bg-zinc-800 px-1.5 text-[9px] text-zinc-400">{savedDrafts.length}</span>
                )}
                <span>{draftsOpen ? "▲" : "▼"}</span>
              </span>
            </button>
            {draftsOpen && (
              <div className="mt-2 space-y-1.5">
                {savedDrafts.length === 0 ? (
                  <p className="py-3 text-center text-[11px] text-zinc-700">No drafts saved yet.</p>
                ) : (
                  savedDrafts.map((draft) => (
                    <div key={draft.id} className="rounded-lg border border-white/[0.06] bg-zinc-900/50 px-3 py-2.5">
                      <p className="text-[12px] font-medium text-zinc-300">{draft.name}</p>
                      <p className="mt-0.5 text-[10px] text-zinc-600">{new Date(draft.savedAt).toLocaleDateString()}</p>
                      <div className="mt-2 flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => loadDraft(draft.id)}
                          className="rounded border border-cyan-400/25 px-2 py-1 text-[10px] text-cyan-300 transition hover:border-cyan-400/50"
                        >
                          Load
                        </button>
                        <button
                          type="button"
                          onClick={() => removeDraft(draft.id)}
                          className="rounded border border-white/8 px-2 py-1 text-[10px] text-zinc-500 transition hover:border-rose-400/30 hover:text-rose-400"
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

          <div className="pb-4" />
        </div>
      </div>

      {/* ── Right panel: Live preview ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">

        {/* Toolbar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.07] bg-[#09090f]/95 px-6 py-3 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">Live Preview</span>
            {goal && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium text-zinc-300">
                {goal.label}
              </span>
            )}
            {uiStyle && (
              <span className="rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-2.5 py-0.5 text-[10px] font-medium text-violet-300">
                {uiStyle.name}
              </span>
            )}
            {fontPairing && (
              <span className="rounded-full border border-amber-500/20 bg-amber-500/[0.06] px-2.5 py-0.5 text-[10px] font-medium text-amber-300">
                {fontPairing.headingFont}
              </span>
            )}
            {palette && (
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.tokens.primary }} />
                <span className="text-[10px] font-medium text-zinc-400">{palette.name}</span>
              </span>
            )}
          </div>
          {canGenerate && (
            <button
              type="button"
              onClick={openResult}
              className="rounded-lg bg-cyan-400 px-4 py-1.5 text-[12px] font-semibold text-black transition hover:bg-cyan-300"
            >
              Continue to Result →
            </button>
          )}
        </div>

        {/* Workspace */}
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
