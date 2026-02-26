import { SectionScaffold } from "@/components/sections/SectionScaffold";

type TestRunnerPlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function TestRunnerPlaceholder({ title = "Test Runner", subtitle = "Question-by-question interface placeholder.", ctaLabel = "", ctaHref = "" }: TestRunnerPlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
