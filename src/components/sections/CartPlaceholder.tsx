import { SectionScaffold } from "@/components/sections/SectionScaffold";

type CartPlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CartPlaceholder({ title = "Cart", subtitle = "Cart and quantity update placeholder.", ctaLabel = "", ctaHref = "" }: CartPlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
