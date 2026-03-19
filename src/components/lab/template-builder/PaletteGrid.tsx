"use client";

import type { Palette } from "@/lib/templateBuilder/types";

function PaletteSwatch({ palette, styleIntensity = "minimal" }: { palette: Palette; styleIntensity?: "minimal" | "bold" | "editorial" }) {
  const isBold = styleIntensity === "bold";
  const isEditorial = styleIntensity === "editorial";

  return (
    <div
      className={`relative overflow-hidden rounded-lg border ${isBold ? "shadow-[0_20px_36px_rgba(0,0,0,0.42)]" : "shadow-[0_12px_24px_rgba(0,0,0,0.3)]"}`}
      style={{ borderColor: `${palette.tokens.border}99`, backgroundColor: palette.tokens.background }}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 size-16 rounded-full blur-xl" style={{ backgroundColor: `${palette.tokens.accent}${isBold ? "AA" : "66"}` }} />
      <div className="flex items-center justify-between px-2 py-1.5" style={{ backgroundColor: palette.tokens.surface }}>
        <span className="h-2 w-12 rounded-full" style={{ backgroundColor: `${palette.tokens.text}40` }} />
        <span className="h-2 w-7 rounded-full" style={{ backgroundColor: `${palette.tokens.primary}${isEditorial ? "55" : "66"}` }} />
      </div>
      <div className="space-y-1 p-2">
        <div className="h-2 w-5/6 rounded-full" style={{ backgroundColor: `${palette.tokens.text}2E` }} />
        <div className="h-2 w-2/3 rounded-full" style={{ backgroundColor: `${palette.tokens.text}22` }} />
        <div className="mt-2 flex gap-1">
          <span className="h-5 w-16 rounded-md" style={{ backgroundColor: palette.tokens.primary }} />
          <span className="h-5 w-12 rounded-md" style={{ backgroundColor: palette.tokens.accent }} />
          <span className="h-5 w-10 rounded-md" style={{ backgroundColor: palette.tokens.secondary }} />
        </div>
      </div>
    </div>
  );
}

function TokenDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-3 rounded-full border border-black/10" style={{ backgroundColor: color }} />
      <span className="text-[11px] uppercase tracking-[0.12em] text-zinc-400">{label}</span>
    </div>
  );
}

export function PaletteGrid({
  items,
  selectedId,
  onSelect,
  styleIntensity = "minimal",
}: {
  items: Palette[];
  selectedId?: string;
  onSelect: (id: string) => void;
  styleIntensity?: "minimal" | "bold" | "editorial";
}) {
  return (
    <div role="radiogroup" aria-label="Color scheme options" className="grid gap-3 xl:grid-cols-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="radio"
          aria-checked={selectedId === item.id}
          onClick={() => onSelect(item.id)}
          className={`rounded-[22px] border p-4 text-left transition ${
            selectedId === item.id
              ? "border-cyan-300/65 bg-cyan-300/8 shadow-[0_18px_50px_rgba(34,211,238,0.14)]"
              : "border-white/10 bg-card/55 hover:border-white/20"
          }`}
        >
          <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
            <PaletteSwatch palette={item} styleIntensity={styleIntensity} />

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">{item.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                    selectedId === item.id ? "bg-cyan-300/15 text-cyan-100" : "bg-white/5 text-zinc-400"
                  }`}
                >
                  {selectedId === item.id ? "Active" : "Select"}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <TokenDot color={item.tokens.primary} label="Primary" />
                <TokenDot color={item.tokens.accent} label="Accent" />
                <TokenDot color={item.tokens.surface} label="Surface" />
                <TokenDot color={item.tokens.background} label="Background" />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map((tag) => (
                  <span key={`${item.id}-${tag}`} className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
