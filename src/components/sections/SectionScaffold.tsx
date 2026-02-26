import { Button } from "@/components/ui/button";

type SectionScaffoldProps = {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function SectionScaffold({ title, subtitle, ctaLabel, ctaHref }: SectionScaffoldProps) {
  return (
    <section className="rounded-xl border border-[var(--tb-border)] bg-[var(--tb-surface)]/80 p-6">
      <h2 className="text-2xl font-semibold text-[var(--tb-text)]">{title}</h2>
      <p className="mt-2 text-sm text-[color-mix(in_srgb,var(--tb-text),#fff_35%)]">{subtitle}</p>
      {ctaLabel && ctaHref ? (
        <div className="mt-4">
          <Button asChild className="bg-[var(--tb-primary)] text-black hover:opacity-90">
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      ) : null}
    </section>
  );
}
