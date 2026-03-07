import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContent } from "@/content/site";
import { getLabAccessPath } from "@/lib/lab-access";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/12 bg-[radial-gradient(circle_at_10%_10%,rgba(56,189,248,0.25),transparent_45%),radial-gradient(circle_at_95%_80%,rgba(20,184,166,0.22),transparent_45%),rgba(9,12,20,0.8)] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.45)] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            <Badge className="border-cyan-300/35 bg-cyan-500/15 text-cyan-100">Professional Portfolio</Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{siteContent.meta.name}</h1>
            <p className="max-w-2xl text-lg text-zinc-100">Product engineer building dependable digital systems and experiences.</p>
            <p className="max-w-2xl text-muted-foreground">
              Focused on web platforms, applied AI workflows, and long-term product quality.
            </p>
            <Button asChild className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
              <Link href="/lab">Browse Lab Projects</Link>
            </Button>
          </div>
          <Card className="border-white/15 bg-black/30 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">At a Glance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-zinc-100">
                Production-minded development across applications, internal tools, and user-facing products.
              </p>
              <p className="text-sm text-muted-foreground">
                This site presents a structured portfolio of shipped work, experiments, and design systems.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="lab-projects" className="space-y-5 rounded-3xl border border-white/12 bg-card/60 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Lab Projects</h2>
            <p className="text-sm text-muted-foreground">
              Prototypes are now grouped here with page previews so each project is easier to scan.
            </p>
          </div>
          <Button asChild variant="outline" className="border-white/20 bg-black/20">
            <Link href="/lab">View All Lab Projects</Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden border-cyan-300/30 bg-cyan-500/10">
            <Image
              src="/images/lab/echo-bootcamp.png"
              alt="Bootcamp suite page preview"
              width={1440}
              height={900}
              className="h-44 w-full object-cover"
            />
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Bootcamp Suite</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-zinc-200">Echo and cath lab exam-prep apps grouped in one place for faster access.</p>
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
            <Image
              src="/images/lab/tca-lab.png"
              alt="TCA Lab page preview"
              width={1440}
              height={900}
              className="h-44 w-full object-cover"
            />
            <CardHeader className="pb-2">
              <CardTitle className="text-base">TCA Lab Site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-zinc-200">Clinical service lab site with patient flows, forms, and service navigation.</p>
              <Button asChild size="sm" className="bg-teal-400 text-slate-950 hover:bg-teal-300">
                <Link href={getLabAccessPath("tca-lab")}>Open TCA Lab</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-violet-300/30 bg-violet-500/10">
            <Image
              src="/images/lab/template-builder.png"
              alt="Template builder page preview"
              width={1440}
              height={900}
              className="h-44 w-full object-cover"
            />
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Template Builder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-zinc-200">Build generated page starters by combining layout, palette, and goals.</p>
              <Button asChild size="sm" className="bg-violet-400 text-slate-950 hover:bg-violet-300">
                <Link href={getLabAccessPath("template-builder")}>Open Builder</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-rose-300/30 bg-rose-500/10">
            <Image
              src="/images/lab/heart-to-heart.png"
              alt="Heart to Heart page preview"
              width={1440}
              height={900}
              className="h-44 w-full object-cover"
            />
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Heart to Heart</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-zinc-200">Podcast landing concept for Dr. Hadi with mobile-first experience cues.</p>
              <Button asChild size="sm" className="bg-rose-400 text-slate-950 hover:bg-rose-300">
                <Link href={getLabAccessPath("heart-to-heart")}>Open Prototype</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-pink-300/30 bg-pink-500/10">
            <Image
              src="/images/lab/festival-app.png"
              alt="Festival app page preview"
              width={1440}
              height={900}
              className="h-44 w-full object-cover"
            />
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Festival App</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-zinc-200">Volunteer signup and festival operations system with live admin workflows.</p>
              <Button asChild size="sm" className="bg-pink-400 text-slate-950 hover:bg-pink-300">
                <Link href={getLabAccessPath("festival-app")}>Open App</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
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
