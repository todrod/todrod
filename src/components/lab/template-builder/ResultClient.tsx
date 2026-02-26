"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CopyBlock } from "@/components/lab/template-builder/CopyBlock";
import { SummaryPanel } from "@/components/lab/template-builder/SummaryPanel";
import { generateTemplateAction } from "@/app/lab/template-builder/actions";
import type { Goal, LayoutTemplate, Palette, TemplateSelection } from "@/lib/templateBuilder/types";

type ResultClientProps = {
  selection: TemplateSelection;
  palette: Palette;
  layout: LayoutTemplate;
  goal: Goal;
  themeJson: string;
  layoutJson: string;
  blueprintJson: string;
  templateJson: string;
};

export function ResultClient(props: ResultClientProps) {
  const { selection, palette, layout, goal, themeJson, layoutJson, blueprintJson, templateJson } = props;
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const generate = () => {
    startTransition(async () => {
      const { slug } = await generateTemplateAction(selection);
      router.push(`/lab/generated/${slug}`);
    });
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Result + Generate</h1>
        <p className="text-muted-foreground">Review generated config blocks, then create a working template route.</p>
      </header>

      <SummaryPanel palette={palette} layout={layout} goal={goal} />

      <div className="grid gap-4 lg:grid-cols-2">
        <CopyBlock title="theme.json" value={themeJson} />
        <CopyBlock title="layout.json" value={layoutJson} />
        <CopyBlock title="blueprint.json" value={blueprintJson} />
        <CopyBlock title="template.json" value={templateJson} />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={generate}
          className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Generating..." : "Generate Working Template"}
        </button>
        <button
          type="button"
          onClick={() => router.push(`/lab/template-builder?palette=${selection.paletteId}&layout=${selection.layoutId}&goal=${selection.goalId}`)}
          className="rounded-md border border-white/20 px-4 py-2 text-sm"
        >
          Back to Builder
        </button>
      </div>
    </div>
  );
}
