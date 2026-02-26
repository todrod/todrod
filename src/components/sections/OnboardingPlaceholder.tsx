import { SectionScaffold } from "@/components/sections/SectionScaffold";

type OnboardingPlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function OnboardingPlaceholder({ title = "Onboarding", subtitle = "Guide users through setup milestones.", ctaLabel = "", ctaHref = "" }: OnboardingPlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
