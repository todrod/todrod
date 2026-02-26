import "server-only";

import JSZip from "jszip";
import { layouts } from "@/data/layouts";
import { palettes } from "@/data/palettes";
import { goals } from "@/data/goals";
import { sections } from "@/data/sections";
import { getBlueprintSections } from "@/lib/templateBuilder/blueprint";
import { paletteToCssVars } from "@/lib/templateBuilder/theme";
import type { GeneratedTemplateConfig } from "@/lib/templateBuilder/types";

export async function buildTemplateZip(config: GeneratedTemplateConfig): Promise<Buffer> {
  const zip = new JSZip();

  const palette = palettes.find((p) => p.id === config.selection.paletteId);
  const layout = layouts.find((l) => l.id === config.selection.layoutId);
  const goal = goals.find((g) => g.id === config.selection.goalId);

  if (!palette || !layout || !goal) {
    throw new Error("Invalid generated template config");
  }

  const sectionDefs = getBlueprintSections(goal.id)
    .map((s) => sections.find((def) => def.id === s.sectionId))
    .filter((def): def is NonNullable<typeof def> => Boolean(def));

  const themeJson = {
    id: palette.id,
    name: palette.name,
    tokens: palette.tokens,
    cssVars: paletteToCssVars(palette),
  };

  const layoutJson = {
    id: layout.id,
    name: layout.name,
    type: layout.type,
    regions: layout.regions,
  };

  const blueprintJson = {
    goalId: goal.id,
    goalLabel: goal.label,
    sections: config.sections,
  };

  const templateJson = {
    ...config,
    palette: { id: palette.id, name: palette.name },
    layout: { id: layout.id, name: layout.name },
    goal: { id: goal.id, label: goal.label },
  };

  zip.file("data/theme.json", JSON.stringify(themeJson, null, 2));
  zip.file("data/layout.json", JSON.stringify(layoutJson, null, 2));
  zip.file("data/blueprint.json", JSON.stringify(blueprintJson, null, 2));
  zip.file("data/template.json", JSON.stringify(templateJson, null, 2));

  zip.file(
    "app/page.tsx",
    `export default function Page() {\n  return (\n    <main style={{ padding: 24 }}>\n      <h1>${goal.label} Starter</h1>\n      <p>Replace this page with your app shell and section renderer.</p>\n    </main>\n  );\n}\n`,
  );

  const sectionDir = zip.folder("components/sections");
  for (const section of sectionDefs) {
    sectionDir?.file(
      `${section.componentName}.tsx`,
      `export function ${section.componentName}() {\n  return (\n    <section style={{ padding: '24px 0' }}>\n      <h2>${section.label}</h2>\n      <p>${section.description}</p>\n    </section>\n  );\n}\n`,
    );
  }

  const layoutDir = zip.folder("components/layouts");
  layoutDir?.file(
    `${layout.name.replace(/\s+/g, "")}.tsx`,
    `import type { ReactNode } from "react";\n\nexport function ${layout.name.replace(/\s+/g, "")}({ children }: { children: ReactNode }) {\n  return <div>{children}</div>;\n}\n`,
  );

  zip.file(
    "README.md",
    `# Generated Template\n\nThis starter was exported from Todrod Template Builder.\n\n## Selection\n- Palette: ${palette.name}\n- Layout: ${layout.name}\n- Goal: ${goal.label}\n\n## Included\n- data/theme.json\n- data/layout.json\n- data/blueprint.json\n- data/template.json\n- app/page.tsx\n- components/sections/*\n- components/layouts/*\n`,
  );

  return zip.generateAsync({ type: "nodebuffer" });
}
