import { SectionScaffold } from "@/components/sections/SectionScaffold";

type AnalyticsPlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function AnalyticsPlaceholder({ title = "Analytics", subtitle = "Visual summaries for trends and weak areas.", ctaLabel = "", ctaHref = "" }: AnalyticsPlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
