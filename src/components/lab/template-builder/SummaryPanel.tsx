"use client";

import type { Goal, LayoutTemplate, Palette } from "@/lib/templateBuilder/types";

export function SummaryPanel({
  palette,
  layout,
  goal,
}: {
  palette?: Palette;
  layout?: LayoutTemplate;
  goal?: Goal;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="rounded-xl border border-white/10 bg-card/60 p-4">
        <p className="text-xs uppercase tracking-wide text-zinc-400">Palette</p>
        <p className="mt-2 text-sm font-semibold">{palette?.name ?? "Not selected"}</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-card/60 p-4">
        <p className="text-xs uppercase tracking-wide text-zinc-400">Layout</p>
        <p className="mt-2 text-sm font-semibold">{layout?.name ?? "Not selected"}</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-card/60 p-4">
        <p className="text-xs uppercase tracking-wide text-zinc-400">Goal</p>
        <p className="mt-2 text-sm font-semibold">{goal?.label ?? "Not selected"}</p>
      </div>
    </div>
  );
}
