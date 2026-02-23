import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContent } from "@/content/site";
import { formatDate } from "@/lib/site-utils";

export const metadata: Metadata = {
  title: "Build Log",
  description: "Short builder notes from current work and experiments.",
};

export default function LogPage() {
  const log = [...siteContent.log].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Build Log</h1>
        <p className="text-muted-foreground">Short notes from ongoing system, product, and workflow work.</p>
      </header>

      <div className="space-y-4">
        {log.map((entry) => (
          <Card key={`${entry.title}-${entry.date}`} className="border-white/10 bg-card/70">
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-lg">{entry.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{formatDate(entry.date)}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">{entry.body}</p>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
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
