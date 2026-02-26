import { SectionScaffold } from "@/components/sections/SectionScaffold";

type EpisodeDetailPlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function EpisodeDetailPlaceholder({ title = "Episode Detail", subtitle = "Template for show notes and transcript.", ctaLabel = "", ctaHref = "" }: EpisodeDetailPlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
