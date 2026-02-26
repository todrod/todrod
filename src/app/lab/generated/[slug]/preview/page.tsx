import { notFound } from "next/navigation";
import { GeneratedTemplateView } from "@/components/generated/GeneratedTemplateView";
import { readGeneratedTemplate } from "@/lib/templateBuilder/manifest";

export default async function GeneratedTemplatePreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = await readGeneratedTemplate(slug);

  if (!config) notFound();

  return <GeneratedTemplateView config={config} previewMode />;
}
