import { SectionScaffold } from "@/components/sections/SectionScaffold";

type ProductDetailPlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function ProductDetailPlaceholder({ title = "Product Detail", subtitle = "Single product view placeholder.", ctaLabel = "", ctaHref = "" }: ProductDetailPlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
