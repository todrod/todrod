"use client";

import { CardSelect } from "@/components/lab/template-builder/CardSelect";
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
    <div role="radiogroup" aria-label="Color scheme options" className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <CardSelect
          key={item.id}
          id={item.id}
          selected={selectedId === item.id}
          onSelect={onSelect}
          title={item.name}
          description={item.description}
          tags={item.tags}
          preview={<PaletteSwatch palette={item} styleIntensity={styleIntensity} />}
        />
      ))}
    </div>
  );
}
