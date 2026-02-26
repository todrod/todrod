import { SectionScaffold } from "@/components/sections/SectionScaffold";

type FAQProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function FAQ({ title = "Frequently Asked Questions", subtitle = "Answers to common questions in one place.", ctaLabel = "", ctaHref = "" }: FAQProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
