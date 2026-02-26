import { SectionScaffold } from "@/components/sections/SectionScaffold";

type ContactProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Contact({ title = "Contact", subtitle = "Make it easy for visitors to reach you.", ctaLabel = "Contact Us", ctaHref = "#" }: ContactProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
