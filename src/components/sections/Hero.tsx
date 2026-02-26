import { SectionScaffold } from "@/components/sections/SectionScaffold";

type HeroProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Hero({ title = "Launch with confidence", subtitle = "A polished starter page built from your selections.", ctaLabel = "Get Started", ctaHref = "#" }: HeroProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
