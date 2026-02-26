"use client";

import type { ReactNode } from "react";

type CardSelectProps = {
  id: string;
  selected: boolean;
  onSelect: (id: string) => void;
  title: string;
  description: string;
  tags: string[];
  preview?: ReactNode;
};

export function CardSelect({ id, selected, onSelect, title, description, tags, preview }: CardSelectProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(id)}
      className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 ${
        selected
          ? "border-cyan-300/70 bg-cyan-500/15 shadow-[0_16px_44px_rgba(34,211,238,0.25)]"
          : "border-white/10 bg-card/65 shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:border-cyan-300/45 hover:shadow-[0_18px_42px_rgba(34,211,238,0.18)]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.16),transparent_45%),radial-gradient(circle_at_100%_100%,rgba(45,212,191,0.12),transparent_50%)] opacity-80" />
      <div className="pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-cyan-300/10 blur-2xl transition group-hover:bg-cyan-300/20" />
      <div className="relative">
      {preview ? <div className="mb-3">{preview}</div> : null}
      <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
      <p className="mt-1 text-xs text-zinc-400">{description}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span key={`${id}-${tag}`} className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-zinc-300">
            {tag}
          </span>
        ))}
      </div>
      </div>
    </button>
  );
}
