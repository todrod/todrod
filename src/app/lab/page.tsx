import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContent } from "@/content/site";
import { formatDate } from "@/lib/site-utils";
import { festivalAppHref } from "@/lib/urls";

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

      <Card className="border-cyan-300/40 bg-cyan-500/10">
        <CardHeader className="space-y-2">
          <CardTitle className="text-base">Template Builder</CardTitle>
          <p className="text-sm text-muted-foreground">
            Visually pick palette, layout, and project goal, then generate reusable starter templates.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/lab/template-builder" className="rounded-md bg-cyan-400 px-3 py-2 text-sm font-semibold text-black hover:opacity-90">
              Open Builder
            </Link>
            <Link href="/lab/template-builder/gallery" className="rounded-md border border-white/20 px-3 py-2 text-sm hover:border-cyan-300/60">
              View Gallery
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-300/40 bg-red-500/10">
        <CardHeader className="space-y-2">
          <CardTitle className="text-base">Heart to Heart with Dr. Hadi</CardTitle>
          <p className="text-sm text-muted-foreground">
            Mobile-first podcast landing page concept for “Protecting the Pump.”
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/lab/heart-to-heart" className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400">
              Open Podcast Prototype
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="border-pink-300/40 bg-pink-500/10">
        <CardHeader className="space-y-2">
          <CardTitle className="text-base">Festival App</CardTitle>
          <p className="text-sm text-muted-foreground">
            Volunteer intake and admin scheduling system for St. Clement Strawberry Festival.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <a href={festivalAppHref} className="rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-pink-400">
              Open Festival App
            </a>
            <Link href="/lab/festival-app" className="rounded-md border border-white/20 px-3 py-2 text-sm hover:border-pink-300/60">
              Project Details
            </Link>
          </div>
        </CardContent>
      </Card>

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
              {"link" in item && item.link ? (
                <Link
                  href={item.link}
                  className="inline-flex rounded-md border border-white/20 px-3 py-1.5 text-xs hover:border-cyan-300/60"
                >
                  Open
                </Link>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
