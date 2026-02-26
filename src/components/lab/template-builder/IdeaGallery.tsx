"use client";

import type { TemplateSelection } from "@/lib/templateBuilder/types";
import type { TemplateIdea } from "@/data/templateIdeas";

export function IdeaGallery({
  ideas,
  onApply,
}: {
  ideas: TemplateIdea[];
  onApply: (selection: TemplateSelection) => void;
}) {
  return (
    <section className="space-y-3 rounded-2xl border border-white/10 bg-card/50 p-4">
      <div>
        <h2 className="text-base font-semibold">Quick Start Concepts</h2>
        <p className="text-xs text-zinc-400">Apply a curated combination instantly, then tweak colors/layout/goal.</p>
      </div>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {ideas.map((idea) => (
          <button
            key={idea.id}
            type="button"
            onClick={() => onApply(idea.selection)}
            className="group rounded-xl border border-white/10 bg-black/20 p-3 text-left transition hover:border-cyan-300/50 hover:bg-cyan-500/10"
          >
            <p className="text-sm font-semibold text-zinc-100">{idea.name}</p>
            <p className="mt-1 line-clamp-2 text-xs text-zinc-400">{idea.description}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {idea.tags.slice(0, 3).map((tag) => (
                <span key={`${idea.id}-${tag}`} className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
