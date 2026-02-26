import { SectionScaffold } from "@/components/sections/SectionScaffold";

type DocsShellPlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function DocsShellPlaceholder({ title = "Docs Shell", subtitle = "Two-column documentation shell.", ctaLabel = "", ctaHref = "" }: DocsShellPlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
