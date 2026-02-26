import { SectionScaffold } from "@/components/sections/SectionScaffold";

type TestimonialsProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Testimonials({ title = "What people say", subtitle = "Short trust-building quotes from clients.", ctaLabel = "", ctaHref = "" }: TestimonialsProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
