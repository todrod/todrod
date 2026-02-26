import { SectionScaffold } from "@/components/sections/SectionScaffold";

type ExamDashboardPlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function ExamDashboardPlaceholder({ title = "Exam Dashboard", subtitle = "Overview cards for attempts and progress.", ctaLabel = "", ctaHref = "" }: ExamDashboardPlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
