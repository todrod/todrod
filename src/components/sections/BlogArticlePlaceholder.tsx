import { SectionScaffold } from "@/components/sections/SectionScaffold";

type BlogArticlePlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function BlogArticlePlaceholder({ title = "Article", subtitle = "Longform content block placeholder.", ctaLabel = "", ctaHref = "" }: BlogArticlePlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
