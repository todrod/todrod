import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContent } from "@/content/site";
import { formatDate } from "@/lib/site-utils";
import { getLabAccessPath } from "@/lib/lab-access";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experiments and prototypes from Todd Rodriguez.",
};

export default function LabPage() {
  const lab = [...siteContent.lab].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-4">
        <Badge className="border-cyan-300/35 bg-cyan-500/15 text-cyan-100">Lab Directory</Badge>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">All Lab Projects</h1>
          <p className="max-w-2xl text-muted-foreground">
            Central place for prototypes, tools, and experiments. Open any project directly from its preview card.
          </p>
        </div>
      </header>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden border-cyan-300/30 bg-cyan-500/10">
          <Image src="/images/lab/echo-bootcamp.png" alt="Bootcamp suite preview" width={1440} height={900} className="h-44 w-full object-cover" />
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Bootcamp Suite</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-200">Echo and cath lab exam-prep apps grouped in one place for easier navigation.</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                <Link href={getLabAccessPath("echo-bootcamp")}>Open Echo</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-white/20 bg-black/20">
                <Link href={getLabAccessPath("cath-bootcamp")}>Open Cath Lab</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-teal-300/30 bg-teal-500/10">
          <Image src="/images/lab/tca-lab.png" alt="TCA Lab preview" width={1440} height={900} className="h-44 w-full object-cover" />
          <CardHeader className="pb-2">
            <CardTitle className="text-base">TCA Lab Site</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-200">Clinical service site with patient forms and service pages.</p>
            <Button asChild size="sm" className="bg-teal-400 text-slate-950 hover:bg-teal-300">
              <Link href={getLabAccessPath("tca-lab")}>Open TCA Lab</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-violet-300/30 bg-violet-500/10">
          <Image src="/images/lab/template-builder.png" alt="Template builder preview" width={1440} height={900} className="h-44 w-full object-cover" />
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Template Builder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-200">Generate site starters from layout, style, and goal selections.</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" className="bg-violet-400 text-slate-950 hover:bg-violet-300">
                <Link href={getLabAccessPath("template-builder")}>Open Builder</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-white/20 bg-black/20">
                <Link href="/lab/template-builder/gallery">Gallery</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-rose-300/30 bg-rose-500/10">
          <Image src="/images/lab/heart-to-heart.png" alt="Heart to Heart preview" width={1440} height={900} className="h-44 w-full object-cover" />
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Heart to Heart</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-200">Podcast landing page concept for Dr. Hadi.</p>
            <Button asChild size="sm" className="bg-rose-400 text-slate-950 hover:bg-rose-300">
              <Link href={getLabAccessPath("heart-to-heart")}>Open Prototype</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-pink-300/30 bg-pink-500/10">
          <Image src="/images/lab/festival-app.png" alt="Festival app preview" width={1440} height={900} className="h-44 w-full object-cover" />
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Festival App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-200">Volunteer signup and schedule tooling for festival operations.</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" className="bg-pink-400 text-slate-950 hover:bg-pink-300">
                <Link href={getLabAccessPath("festival-app")}>Open App</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-white/20 bg-black/20">
                <Link href="/lab/festival-app">Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-blue-300/30 bg-blue-500/10">
          <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-blue-950/80 to-indigo-950/80">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black text-white" style={{ background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)", boxShadow: "0 4px 20px rgba(37,99,235,0.5)" }}>♥</div>
              <span className="text-sm font-semibold text-blue-200">CardioAuth</span>
            </div>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">CardioAuth PA Assistant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-200">AI-powered prior authorization workflow for cardiology — from patient intake to submission-ready PA letters.</p>
            <Button asChild size="sm" className="bg-blue-500 text-white hover:bg-blue-400">
              <Link href="https://cardio-pa-todrods-projects.vercel.app" target="_blank" rel="noopener noreferrer">Open CardioAuth</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Recent Experiments</h2>
        <p className="text-sm text-muted-foreground">Smaller tests and notes from ongoing R&D work.</p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
