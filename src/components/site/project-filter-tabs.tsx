"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/site/project-card";
import type { Project, ProjectStatus } from "@/content/site";

type ProjectFilterTabsProps = {
  projects: Project[];
  statuses: ProjectStatus[];
};

export function ProjectFilterTabs({ projects, statuses }: ProjectFilterTabsProps) {
  const [active, setActive] = useState<"All" | ProjectStatus>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((project) => project.status === active);
  }, [active, projects]);

  return (
    <div className="space-y-6">
      <Tabs value={active} onValueChange={(value) => setActive(value as "All" | ProjectStatus)}>
        <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          <TabsTrigger value="All" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            All
          </TabsTrigger>
          {statuses.map((status) => (
            <TabsTrigger
              key={status}
              value={status}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {status}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
