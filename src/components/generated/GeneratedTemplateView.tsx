import Link from "next/link";
import { goals } from "@/data/goals";
import { layouts } from "@/data/layouts";
import { palettes } from "@/data/palettes";
import { sections } from "@/data/sections";
import { LayoutShell } from "@/components/generated/LayoutShell";
import { SectionRenderer } from "@/components/generated/SectionRenderer";
import { ThemeRoot } from "@/components/generated/ThemeRoot";
import type { GeneratedTemplateConfig } from "@/lib/templateBuilder/types";

export function GeneratedTemplateView({
  config,
  previewMode = false,
}: {
  config: GeneratedTemplateConfig;
  previewMode?: boolean;
}) {
  const palette = palettes.find((item) => item.id === config.selection.paletteId);
  const layout = layouts.find((item) => item.id === config.selection.layoutId);
  const goal = goals.find((item) => item.id === config.selection.goalId);

  if (!palette || !layout || !goal) {
    return (
      <div className="mx-auto max-w-3xl p-8">
        <p className="rounded-lg border border-rose-400/40 bg-rose-500/10 p-4 text-sm text-rose-100">
          Template config references missing palette/layout/goal entries.
        </p>
      </div>
    );
  }

  const subtitle = previewMode
    ? `${goal.label} • ${layout.name} • ${palette.name} (Preview)`
    : `${goal.label} • ${layout.name} • ${palette.name}`;

  return (
    <ThemeRoot palette={palette}>
      <LayoutShell layout={layout} title={`Generated: ${goal.label}`} subtitle={subtitle}>
        <div className="mb-4 flex flex-wrap gap-2">
          <Link href="/lab/template-builder/gallery" className="rounded-md border border-[var(--tb-border)] px-3 py-1.5 text-xs hover:opacity-90">
            Gallery
          </Link>
          <Link href={`/lab/template-builder/export?slug=${config.slug}`} className="rounded-md bg-[var(--tb-primary)] px-3 py-1.5 text-xs font-semibold text-black hover:opacity-90">
            Export Starter ZIP
          </Link>
          {!previewMode ? (
            <Link href={`/lab/generated/${config.slug}/preview`} className="rounded-md border border-[var(--tb-border)] px-3 py-1.5 text-xs hover:opacity-90">
              Preview Mode
            </Link>
          ) : (
            <Link href={`/lab/generated/${config.slug}`} className="rounded-md border border-[var(--tb-border)] px-3 py-1.5 text-xs hover:opacity-90">
              Full Mode
            </Link>
          )}
        </div>
        <SectionRenderer sections={config.sections} definitions={sections} />
      </LayoutShell>
    </ThemeRoot>
  );
}
