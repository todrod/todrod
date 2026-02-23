import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContent } from "@/content/site";
import { formatDate } from "@/lib/site-utils";
import { StatusBadge } from "@/components/site/status-badge";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return siteContent.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = siteContent.projects.find((item) => item.slug === slug);
  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.name,
    description: project.oneLiner,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = siteContent.projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <Button asChild variant="ghost" className="px-0 text-muted-foreground hover:bg-transparent">
          <Link href="/projects">← Back to projects</Link>
        </Button>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-muted-foreground">{project.oneLiner}</p>
          <p className="text-sm text-muted-foreground">Updated {formatDate(project.updatedAt)}</p>
        </div>
      </div>

      <Card className="border-white/10 bg-card/70">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/10 text-zinc-200">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.links.demo ? (
              <Button asChild className="bg-blue-600 text-white hover:bg-blue-500">
                <a href={project.links.demo} target="_blank" rel="noreferrer">
                  Live demo
                </a>
              </Button>
            ) : null}
            {project.links.repo ? (
              <Button asChild variant="outline" className="border-white/15 bg-transparent">
                <a href={project.links.repo} target="_blank" rel="noreferrer">
                  Repository
                </a>
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {project.next ? (
        <Card className="border-white/10 bg-card/70">
          <CardHeader>
            <CardTitle>What I&apos;m doing next</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{project.next}</p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
