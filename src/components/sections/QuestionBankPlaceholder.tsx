import { SectionScaffold } from "@/components/sections/SectionScaffold";

type QuestionBankPlaceholderProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function QuestionBankPlaceholder({ title = "Question Bank", subtitle = "Organize and filter exam questions by category.", ctaLabel = "", ctaHref = "" }: QuestionBankPlaceholderProps) {
  return <SectionScaffold title={title} subtitle={subtitle} ctaLabel={ctaLabel || undefined} ctaHref={ctaHref || undefined} />;
}
