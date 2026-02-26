import { SectionScaffold } from "@/components/sections/SectionScaffold";

type LocationPlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function LocationPlaceholder({ title = "Location", subtitle = "Drop in your office address and map embed.", ctaLabel = "", ctaHref = "" }: LocationPlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
