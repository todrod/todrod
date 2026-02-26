import { SectionScaffold } from "@/components/sections/SectionScaffold";

type ServicesProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Services({ title = "Services", subtitle = "Structured service cards with descriptions.", ctaLabel = "", ctaHref = "" }: ServicesProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
