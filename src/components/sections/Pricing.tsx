import { SectionScaffold } from "@/components/sections/SectionScaffold";

type PricingProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Pricing({ title = "Pricing", subtitle = "Simple plans with key limits and CTA.", ctaLabel = "", ctaHref = "" }: PricingProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
