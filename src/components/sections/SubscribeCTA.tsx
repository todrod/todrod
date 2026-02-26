import { SectionScaffold } from "@/components/sections/SectionScaffold";

type SubscribeCTAProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function SubscribeCTA({ title = "Subscribe", subtitle = "Follow on your favorite platform.", ctaLabel = "Subscribe Now", ctaHref = "#" }: SubscribeCTAProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
