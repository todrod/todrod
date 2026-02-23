import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteContent } from "@/content/site";
import { formatDate } from "@/lib/site-utils";
import { ProjectCard } from "@/components/site/project-card";
import { echoBootcampHref } from "@/lib/urls";

export default function HomePage() {
  const featuredProjects = siteContent.projects.slice(0, 4);
  const labPreview = siteContent.lab.slice(0, 4);
  const logPreview = [...siteContent.log]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/12 bg-[radial-gradient(circle_at_10%_10%,rgba(56,189,248,0.25),transparent_45%),radial-gradient(circle_at_95%_80%,rgba(20,184,166,0.22),transparent_45%),rgba(9,12,20,0.8)] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.45)] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            <Badge className="border-cyan-300/35 bg-cyan-500/15 text-cyan-100">Studio Dashboard</Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{siteContent.meta.name}</h1>
            <p className="max-w-2xl text-lg text-zinc-100">{siteContent.meta.tagline}</p>
            <p className="max-w-2xl text-muted-foreground">{siteContent.meta.subline}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                <a href={echoBootcampHref}>Launch Echo Bootcamp</a>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-black/20">
                <Link href="/projects">Browse Projects</Link>
              </Button>
            </div>
          </div>
          <Card className="border-white/15 bg-black/30 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Live Focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-zinc-100">Cardiac sonography study workflows, practical tools, and production shipping.</p>
              <Separator className="bg-white/10" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-white/12 bg-white/5 p-3">
                  <p className="text-muted-foreground">Projects</p>
                  <p className="mt-1 text-2xl font-semibold">{siteContent.projects.length}</p>
                </div>
                <div className="rounded-lg border border-white/12 bg-white/5 p-3">
                  <p className="text-muted-foreground">Lab Tests</p>
                  <p className="mt-1 text-2xl font-semibold">{siteContent.lab.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-cyan-400/30 bg-cyan-500/10">
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
        <Card className="border-white/10 bg-card/70 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Current Build Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Improving clinical learning UX, tightening deployment reliability, and shipping tools that reduce prep time.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">What I&apos;m building right now</h2>
          <Button asChild variant="outline" className="border-white/15 bg-transparent">
            <Link href="/projects">All projects</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">The Lab</h2>
          <Button asChild variant="outline" className="border-white/15 bg-transparent">
            <Link href="/lab">View lab</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {labPreview.map((item) => (
            <Card key={`${item.title}-${item.date}`} className="border-white/10 bg-card/70">
              <CardHeader className="space-y-2 pb-3">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
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
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">Build Log</h2>
          <Button asChild variant="outline" className="border-white/15 bg-transparent">
            <Link href="/log">View log</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {logPreview.map((entry) => (
            <Card key={`${entry.title}-${entry.date}`} className="border-white/10 bg-card/70">
              <CardHeader className="space-y-2 pb-3">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-base">{entry.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{formatDate(entry.date)}</p>
                </div>
                <p className="text-sm text-muted-foreground">{entry.body}</p>
              </CardHeader>
              <CardContent className="pt-0">
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
      </section>

      <section className="grid gap-6 rounded-3xl border border-white/12 bg-card/60 p-6 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          {siteContent.meta.about.map((line) => (
            <p key={line} className="text-muted-foreground">
              {line}
            </p>
          ))}
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Get in touch</h3>
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-500">
            <a href={siteContent.meta.contact.email}>Email me</a>
          </Button>
          <div className="flex flex-wrap gap-2">
            {siteContent.meta.contact.socials.map((social) => (
              <Button key={social.label} asChild variant="outline" className="border-white/15 bg-transparent">
                <a href={social.href}>{social.label}</a>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
