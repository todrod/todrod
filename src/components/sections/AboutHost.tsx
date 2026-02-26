import { SectionScaffold } from "@/components/sections/SectionScaffold";

type AboutHostProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function AboutHost({ title = "About the Host", subtitle = "Short host bio and credentials.", ctaLabel = "", ctaHref = "" }: AboutHostProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
