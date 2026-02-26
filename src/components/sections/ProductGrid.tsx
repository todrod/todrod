import { SectionScaffold } from "@/components/sections/SectionScaffold";

type ProductGridProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function ProductGrid({ title = "Products", subtitle = "Grid-based product browsing component.", ctaLabel = "", ctaHref = "" }: ProductGridProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
