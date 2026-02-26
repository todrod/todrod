import { SectionScaffold } from "@/components/sections/SectionScaffold";

type FeaturesProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Features({ title = "Key Features", subtitle = "Clear value points your visitors can scan quickly.", ctaLabel = "", ctaHref = "" }: FeaturesProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
