import { SectionScaffold } from "@/components/sections/SectionScaffold";

type NewsletterProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Newsletter({ title = "Newsletter", subtitle = "Capture audience updates with a simple signup.", ctaLabel = "", ctaHref = "" }: NewsletterProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
