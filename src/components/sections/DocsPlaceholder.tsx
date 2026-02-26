import { SectionScaffold } from "@/components/sections/SectionScaffold";

type DocsPlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function DocsPlaceholder({ title = "Documentation", subtitle = "Entry point to guides and API docs.", ctaLabel = "", ctaHref = "" }: DocsPlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
