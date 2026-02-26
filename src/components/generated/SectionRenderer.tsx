import type { BlueprintSection, SectionDefinition } from "@/lib/templateBuilder/types";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Services } from "@/components/sections/Services";
import { Providers } from "@/components/sections/Providers";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { LocationPlaceholder } from "@/components/sections/LocationPlaceholder";
import { EpisodeList } from "@/components/sections/EpisodeList";
import { EpisodeDetailPlaceholder } from "@/components/sections/EpisodeDetailPlaceholder";
import { SubscribeCTA } from "@/components/sections/SubscribeCTA";
import { Newsletter } from "@/components/sections/Newsletter";
import { AboutHost } from "@/components/sections/AboutHost";
import { ExamDashboardPlaceholder } from "@/components/sections/ExamDashboardPlaceholder";
import { TestRunnerPlaceholder } from "@/components/sections/TestRunnerPlaceholder";
import { QuestionBankPlaceholder } from "@/components/sections/QuestionBankPlaceholder";
import { AnalyticsPlaceholder } from "@/components/sections/AnalyticsPlaceholder";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { ProductDetailPlaceholder } from "@/components/sections/ProductDetailPlaceholder";
import { CartPlaceholder } from "@/components/sections/CartPlaceholder";
import { CheckoutPlaceholder } from "@/components/sections/CheckoutPlaceholder";
import { Pricing } from "@/components/sections/Pricing";
import { OnboardingPlaceholder } from "@/components/sections/OnboardingPlaceholder";
import { DocsPlaceholder } from "@/components/sections/DocsPlaceholder";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { BlogArticlePlaceholder } from "@/components/sections/BlogArticlePlaceholder";
import { DocsShellPlaceholder } from "@/components/sections/DocsShellPlaceholder";

const map: Record<string, (props: Record<string, string | undefined>) => React.JSX.Element> = {
  hero: Hero,
  features: Features,
  services: Services,
  providers: Providers,
  testimonials: Testimonials,
  faq: FAQ,
  contact: Contact,
  "location-placeholder": LocationPlaceholder,
  "episode-list": EpisodeList,
  "episode-detail": EpisodeDetailPlaceholder,
  "subscribe-cta": SubscribeCTA,
  newsletter: Newsletter,
  "about-host": AboutHost,
  "exam-dashboard": ExamDashboardPlaceholder,
  "test-runner": TestRunnerPlaceholder,
  "question-bank": QuestionBankPlaceholder,
  analytics: AnalyticsPlaceholder,
  "product-grid": ProductGrid,
  "product-detail": ProductDetailPlaceholder,
  cart: CartPlaceholder,
  checkout: CheckoutPlaceholder,
  pricing: Pricing,
  onboarding: OnboardingPlaceholder,
  docs: DocsPlaceholder,
  "projects-grid": ProjectsGrid,
  "blog-article": BlogArticlePlaceholder,
  "docs-shell": DocsShellPlaceholder,
};

export function SectionRenderer({
  sections,
  definitions,
}: {
  sections: BlueprintSection[];
  definitions: SectionDefinition[];
}) {
  return (
    <div className="space-y-6">
      {sections.map((section, index) => {
        const def = definitions.find((item) => item.id === section.sectionId);
        const Component = map[section.sectionId];
        if (!def || !Component) return null;
        const props = { ...def.defaultProps, ...section.props };
        return <Component key={`${section.sectionId}-${index}`} {...props} />;
      })}
    </div>
  );
}
