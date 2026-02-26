"use client";

import type { Palette, LayoutType, MiniPreviewBlock } from "@/lib/templateBuilder/types";

function colorWithAlpha(hex: string, alpha: string) {
  if (!hex.startsWith("#")) return hex;
  return `${hex}${alpha}`;
}

export function MiniPreview({
  blocks,
  layoutType,
  palette,
  styleIntensity = "minimal",
}: {
  blocks: MiniPreviewBlock[];
  layoutType: LayoutType;
  palette?: Palette;
  styleIntensity?: "minimal" | "bold" | "editorial";
}) {
  const bg = palette?.tokens.background ?? "#0b1220";
  const surface = palette?.tokens.surface ?? "#142235";
  const primary = palette?.tokens.primary ?? "#22d3ee";
  const text = palette?.tokens.text ?? "#e6f0ff";
  const border = palette?.tokens.border ?? "#284260";

  const isBold = styleIntensity === "bold";
  const isEditorial = styleIntensity === "editorial";

  return (
    <div
      className={`relative h-32 w-full overflow-hidden rounded-lg border ${isBold ? "shadow-[0_24px_48px_rgba(34,211,238,0.24)]" : "shadow-[0_16px_34px_rgba(0,0,0,0.35)]"}`}
      style={{ backgroundColor: bg, borderColor: colorWithAlpha(border, "A0") }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 8% 12%, rgba(255,255,255,0.14), transparent 36%), radial-gradient(circle at 90% 82%, rgba(255,255,255,0.1), transparent 42%)",
        }}
      />
      <div className="flex h-5 items-center gap-1 border-b px-2" style={{ borderColor: colorWithAlpha(border, "A0"), backgroundColor: colorWithAlpha(surface, "D0") }}>
        <span className="size-1.5 rounded-full bg-rose-300/70" />
        <span className="size-1.5 rounded-full bg-amber-300/70" />
        <span className="size-1.5 rounded-full bg-emerald-300/70" />
        <div className="ml-2 h-2 w-24 rounded-full" style={{ backgroundColor: colorWithAlpha(text, "33") }} />
      </div>

      <div className="absolute left-[6%] top-[24%] h-[8%] w-[42%] rounded-full" style={{ backgroundColor: colorWithAlpha(primary, isBold ? "8A" : "62") }} />
      <div className="absolute left-[6%] top-[35%] h-[5%] w-[28%] rounded-full" style={{ backgroundColor: colorWithAlpha(text, isEditorial ? "42" : "2E") }} />

      {blocks.map((block) => (
        <div
          key={block.id}
          className="absolute rounded-sm border"
          style={{
            left: `${block.x}%`,
            top: `${Math.max(20, block.y)}%`,
            width: `${block.w}%`,
            height: `${Math.max(8, block.h - 1)}%`,
            borderColor: colorWithAlpha(border, "A0"),
            backgroundColor: /header|topbar/.test(block.id)
              ? colorWithAlpha(primary, isBold ? "6A" : "46")
              : /hero/.test(block.id)
                ? `linear-gradient(135deg, ${colorWithAlpha(primary, isBold ? "66" : "44")}, ${colorWithAlpha(surface, isEditorial ? "F5" : "E8")})`
                : colorWithAlpha(surface, "E6"),
          }}
        >
          <div className="p-1">
            <div className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: colorWithAlpha(text, "2E") }} />
            {block.h > 15 ? (
              <div className="mt-1 space-y-0.5">
                <div className="h-1 w-5/6 rounded-full" style={{ backgroundColor: colorWithAlpha(text, "26") }} />
                <div className="h-1 w-2/3 rounded-full" style={{ backgroundColor: colorWithAlpha(text, "20") }} />
                <div className="mt-1 flex gap-1">
                  <span className="h-1.5 w-6 rounded-full" style={{ backgroundColor: colorWithAlpha(primary, "70") }} />
                  <span className="h-1.5 w-4 rounded-full" style={{ backgroundColor: colorWithAlpha(text, "30") }} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}

      <div className="pointer-events-none absolute bottom-1 right-1 rounded-full px-2 py-0.5 text-[9px] font-medium tracking-wide" style={{ backgroundColor: colorWithAlpha(primary, "44"), color: text }}>
        {layoutType}
      </div>
    </div>
  );
}
