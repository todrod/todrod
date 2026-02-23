import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/content/site";
import { formatDate } from "@/lib/site-utils";
import { StatusBadge } from "@/components/site/status-badge";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="border-white/10 bg-card/70">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg">{project.name}</CardTitle>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-sm text-muted-foreground">{project.oneLiner}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Updated {formatDate(project.updatedAt)}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white/10 text-zinc-200">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button asChild size="sm">
          <Link href={`/projects/${project.slug}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
