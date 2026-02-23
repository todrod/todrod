import type { Metadata } from "next";
import { projectStatuses, siteContent } from "@/content/site";
import { ProjectFilterTabs } from "@/components/site/project-filter-tabs";

export const metadata: Metadata = {
  title: "Projects",
  description: "Current and past projects by Todd Rodriguez.",
};

export default function ProjectsPage() {
  const projects = [...siteContent.projects].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">Filter by status to see what is active, iterating, paused, or shipped.</p>
      </header>
      <ProjectFilterTabs projects={projects} statuses={projectStatuses} />
    </div>
  );
}
