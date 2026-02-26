import { SectionScaffold } from "@/components/sections/SectionScaffold";

type CheckoutPlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CheckoutPlaceholder({ title = "Checkout", subtitle = "Secure checkout placeholders and notes.", ctaLabel = "", ctaHref = "" }: CheckoutPlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
