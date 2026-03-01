import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { festivalAppEmbedHref, festivalAppRepoHref } from "@/lib/urls";

export const metadata: Metadata = {
  title: "Festival App",
  description: "St. Clement Strawberry Festival volunteer scheduler in the Todrod Lab.",
};

const modules = [
  { name: "Volunteer Signup", detail: "Multi-step intake with availability, ranked preferences, and acknowledgements." },
  { name: "Admin Scheduler", detail: "Coverage calendar, role board, and manual drag/drop assignment controls." },
  { name: "Training & Approvals", detail: "Role-based eligibility management for trained/approved assignment gates." },
  { name: "Print + Day-of Ops", detail: "Roster exports, emergency contacts, and check-in flow for live operations." },
];

export default function FestivalAppPage() {
  const embedUrl = festivalAppEmbedHref.trim();
  const canEmbed = embedUrl.length > 0 && !embedUrl.includes("/lab/festival-app");

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <Badge className="border-pink-300/40 bg-pink-500/15 text-pink-100">Lab Project</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Festival App</h1>
        <p className="text-muted-foreground">
          St. Clement Strawberry Festival volunteer scheduler workspace.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/lab/festival-workflow" className="rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-pink-400">
            Open Workflow
          </Link>
          <a href={festivalAppRepoHref} target="_blank" rel="noreferrer" className="rounded-md border border-white/20 px-3 py-2 text-sm hover:border-pink-300/60">
            Open GitHub Repo
          </a>
          <Link href="/lab" className="rounded-md border border-white/20 px-3 py-2 text-sm hover:border-cyan-300/60">
            Back to Lab
          </Link>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {modules.map((module) => (
          <Card key={module.name} className="border-white/10 bg-card/70">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">{module.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{module.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-pink-300/40 bg-pink-500/10">
        <CardHeader className="space-y-2">
          <CardTitle className="text-base">Live Embedded App</CardTitle>
          <p className="text-sm text-muted-foreground">
            This panel embeds the running Festival App environment directly inside the Lab.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {canEmbed ? (
            <iframe
              src={embedUrl}
              title="Festival App Embed"
              className="h-[920px] w-full rounded-xl border border-white/20 bg-black/20"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="rounded-xl border border-white/20 bg-black/20 p-4 text-sm text-muted-foreground">
              Set <code className="rounded bg-black/40 px-1 py-0.5 text-zinc-100">NEXT_PUBLIC_FESTIVAL_APP_EMBED_URL</code> to
              your Festival App URL (for example your VPS host) to enable in-page embed.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
