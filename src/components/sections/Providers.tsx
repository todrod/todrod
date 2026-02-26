import { SectionScaffold } from "@/components/sections/SectionScaffold";

type ProvidersProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Providers({ title = "Team", subtitle = "Meet the professionals behind this project.", ctaLabel = "", ctaHref = "" }: ProvidersProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
