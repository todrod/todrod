"use client";

import { CardSelect } from "@/components/lab/template-builder/CardSelect";
import type { Goal } from "@/lib/templateBuilder/types";

function goalPreview(goal: Goal) {
  const text = `${goal.label} ${goal.tags.join(" ")}`.toLowerCase();
  const gradient = /medical|clinic/.test(text)
    ? "from-cyan-400/35 via-blue-400/15 to-emerald-300/30"
    : /podcast|creator|portfolio/.test(text)
      ? "from-fuchsia-400/35 via-violet-400/15 to-cyan-300/30"
      : /commerce|restaurant|store/.test(text)
        ? "from-amber-400/30 via-rose-400/15 to-orange-400/35"
        : /event|conference/.test(text)
          ? "from-rose-400/35 via-orange-400/15 to-fuchsia-300/30"
          : /course|exam|education/.test(text)
            ? "from-emerald-400/35 via-cyan-400/15 to-sky-300/30"
            : "from-slate-300/30 via-indigo-400/15 to-cyan-300/25";

  return (
    <div className={`relative h-28 overflow-hidden rounded-lg border border-white/15 bg-gradient-to-br ${gradient}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.2),transparent_38%)]" />
      <div className="absolute left-2 top-2 h-2 w-24 rounded-full bg-white/35" />
      <div className="absolute left-2 top-5 h-1.5 w-16 rounded-full bg-white/25" />
      <div className="absolute bottom-2 left-2 right-2 grid grid-cols-3 gap-1">
        <div className="h-8 rounded-md border border-white/20 bg-black/25" />
        <div className="h-8 rounded-md border border-white/20 bg-black/25" />
        <div className="h-8 rounded-md border border-white/20 bg-black/25" />
      </div>
    </div>
  );
}

export function GoalGrid({
  items,
  selectedId,
  onSelect,
  styleIntensity = "minimal",
}: {
  items: Goal[];
  selectedId?: string;
  onSelect: (id: string) => void;
  styleIntensity?: "minimal" | "bold" | "editorial";
}) {
  const previewClass = styleIntensity === "bold" ? "drop-shadow-[0_14px_30px_rgba(236,72,153,0.25)]" : "";

  return (
    <div role="radiogroup" aria-label="Goal options" className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <CardSelect
          key={item.id}
          id={item.id}
          selected={selectedId === item.id}
          onSelect={onSelect}
          title={item.label}
          description={item.description}
          tags={item.tags}
          preview={<div className={previewClass}>{goalPreview(item)}</div>}
        />
      ))}
    </div>
  );
}
