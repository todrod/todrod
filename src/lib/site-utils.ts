import type { ProjectStatus } from "@/content/site";

export function formatDate(input: string): string {
  const date = new Date(`${input}T00:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function statusBadgeClass(status: ProjectStatus): string {
  switch (status) {
    case "Active":
      return "bg-blue-500/15 text-blue-300 border-blue-400/30";
    case "Iterating":
      return "bg-amber-500/15 text-amber-300 border-amber-400/30";
    case "Paused":
      return "bg-zinc-500/20 text-zinc-300 border-zinc-400/30";
    case "Shipped":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-400/30";
    default:
      return "bg-zinc-500/20 text-zinc-300 border-zinc-400/30";
  }
}
