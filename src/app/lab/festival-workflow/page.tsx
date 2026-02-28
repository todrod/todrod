import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { festivalAppHref, festivalAppRepoHref } from "@/lib/urls";

export const metadata: Metadata = {
  title: "Festival Workflow",
  description: "Operational workflow for the St. Clement Strawberry Festival volunteer scheduler.",
};

const workflowPhases = [
  {
    title: "1) Intake",
    detail: "Volunteer submits profile, availability, ranked preferences, and acknowledgements.",
    checkpoints: ["18+ DOB validation", "Required capability acknowledgements", "Email verification state"],
  },
  {
    title: "2) Qualification",
    detail: "System computes role eligibility and admin verifies training/approval lists.",
    checkpoints: ["Supervisor trained + approved", "Gender-restricted role constraints", "Heavy/cash/outdoor capability flags"],
  },
  {
    title: "3) Auto-Assignment",
    detail: "Run constrained-first auto-fill for selected date/shift using preference + seniority.",
    checkpoints: ["No overlapping conflicts", "Booth day/night same-day block", "Assigned-by audit trail"],
  },
  {
    title: "4) Manual Board Review",
    detail: "Admin drag/drop board for cleanup, with explicit force-assign override reasons.",
    checkpoints: ["Eligibility color cues", "Locked assignments", "Override reason logging"],
  },
  {
    title: "5) Day-of Execution",
    detail: "Print rosters, emergency sheets, and run check-in flow by shift.",
    checkpoints: ["Role-based roster exports", "Emergency contact sheet", "Captain mode check-in tracking"],
  },
];

export default function FestivalWorkflowPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <Badge className="border-pink-300/40 bg-pink-500/15 text-pink-100">Lab Workflow</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">St. Clement Festival App Workflow</h1>
        <p className="text-muted-foreground">
          End-to-end operating flow used to run volunteer staffing from signup through day-of shift execution.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={festivalAppHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-pink-400"
          >
            Open Festival App
          </a>
          <a
            href={festivalAppRepoHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/20 px-3 py-2 text-sm hover:border-pink-300/60"
          >
            Open Repo
          </a>
          <Link href="/lab" className="rounded-md border border-white/20 px-3 py-2 text-sm hover:border-cyan-300/60">
            Back to Lab
          </Link>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {workflowPhases.map((phase) => (
          <Card key={phase.title} className="border-white/10 bg-card/70">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">{phase.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{phase.detail}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {phase.checkpoints.map((item) => (
                <p key={item} className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-xs text-zinc-200">
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
