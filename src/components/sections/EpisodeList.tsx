import { SectionScaffold } from "@/components/sections/SectionScaffold";

type EpisodeListProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function EpisodeList({ title = "Latest Episodes", subtitle = "A rolling list of episode highlights.", ctaLabel = "", ctaHref = "" }: EpisodeListProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
