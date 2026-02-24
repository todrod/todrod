import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContent } from "@/content/site";
import { cathBootcampHref, echoBootcampHref } from "@/lib/urls";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/12 bg-[radial-gradient(circle_at_10%_10%,rgba(56,189,248,0.25),transparent_45%),radial-gradient(circle_at_95%_80%,rgba(20,184,166,0.22),transparent_45%),rgba(9,12,20,0.8)] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.45)] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            <Badge className="border-cyan-300/35 bg-cyan-500/15 text-cyan-100">Studio Dashboard</Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{siteContent.meta.name}</h1>
            <p className="max-w-2xl text-lg text-zinc-100">{siteContent.meta.tagline}</p>
            <p className="max-w-2xl text-muted-foreground">{siteContent.meta.subline}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                <a href={echoBootcampHref}>Launch Echo Bootcamp</a>
              </Button>
              <Button asChild className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                <a href={cathBootcampHref}>Launch Cath Lab Bootcamp</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/25 bg-black/20 text-zinc-100 hover:border-cyan-300/60 hover:bg-cyan-500/20 hover:text-cyan-100"
              >
                <a href="https://www.thegoofytrooper.com" target="_blank" rel="noreferrer">
                  Visit The Goofy Trooper
                </a>
              </Button>
            </div>
          </div>
          <Card className="border-white/15 bg-black/30 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Focus Right Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-zinc-100">Echo training workflows, practical exam prep, and tool-driven learning.</p>
              <p className="text-sm text-muted-foreground">
                Keeping this page intentionally simple for now: one study app and one live product link.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-cyan-400/30 bg-cyan-500/10 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Echo Bootcamp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-200">Private echo exam prep with timed sessions and progress tracking.</p>
            <Button asChild size="sm" className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
              <a href={echoBootcampHref}>Go to Exam App</a>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-card/70 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">The Goofy Trooper</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Disney day-planning platform with practical park tools and dashboards.
            </p>
            <Button asChild size="sm" className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
              <a href="https://www.thegoofytrooper.com" target="_blank" rel="noreferrer">
                Open The Goofy Trooper
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 rounded-3xl border border-white/12 bg-card/60 p-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          {siteContent.meta.about.map((line) => (
            <p key={line} className="text-muted-foreground">
              {line}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
