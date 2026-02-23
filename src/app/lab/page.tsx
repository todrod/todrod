import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContent } from "@/content/site";
import { formatDate } from "@/lib/site-utils";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experiments and prototypes from Todd Rodriguez.",
};

export default function LabPage() {
  const lab = [...siteContent.lab].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">The Lab</h1>
        <p className="text-muted-foreground">Small experiments and prototypes I use to test ideas quickly.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {lab.map((item) => (
          <Card key={`${item.title}-${item.date}`} className="border-white/10 bg-card/70">
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/10 text-zinc-200">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
