import type { Metadata } from "next";
import { TemplateBuilderWizard } from "@/components/lab/template-builder/TemplateBuilderWizard";

export const metadata: Metadata = {
  title: "Template Builder",
  description: "Visually combine palette, layout, and goal to generate starter templates.",
};

export default function TemplateBuilderPage() {
  return (
    <div className="w-full">
      <TemplateBuilderWizard />
    </div>
  );
}
