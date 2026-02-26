import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ResultClient } from "@/components/lab/template-builder/ResultClient";
import { resolveSelection } from "@/lib/templateBuilder/resolve";
import type { TemplateSelection } from "@/lib/templateBuilder/types";

export const metadata: Metadata = {
  title: "Template Builder Result",
};

export default async function TemplateBuilderResultPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const selection: TemplateSelection = {
    paletteId: typeof params.palette === "string" ? params.palette : "",
    layoutId: typeof params.layout === "string" ? params.layout : "",
    goalId: typeof params.goal === "string" ? params.goal : "",
  };

  if (!selection.paletteId || !selection.layoutId || !selection.goalId) {
    redirect("/lab/template-builder");
  }

  const resolved = resolveSelection(selection);
  if (!resolved) {
    redirect("/lab/template-builder");
  }

  const templateJson = {
    selection,
    generatedAt: new Date().toISOString(),
    theme: resolved.themeJson,
    layout: resolved.layoutJson,
    blueprint: resolved.blueprintJson,
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <ResultClient
        selection={selection}
        palette={resolved.palette}
        layout={resolved.layout}
        goal={resolved.goal}
        themeJson={JSON.stringify(resolved.themeJson, null, 2)}
        layoutJson={JSON.stringify(resolved.layoutJson, null, 2)}
        blueprintJson={JSON.stringify(resolved.blueprintJson, null, 2)}
        templateJson={JSON.stringify(templateJson, null, 2)}
      />
    </div>
  );
}
