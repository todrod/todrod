import { SectionScaffold } from "@/components/sections/SectionScaffold";

type ProjectsGridProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function ProjectsGrid({ title = "Projects", subtitle = "Showcase projects with outcomes and links.", ctaLabel = "", ctaHref = "" }: ProjectsGridProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
