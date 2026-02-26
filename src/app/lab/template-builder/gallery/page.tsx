import type { Metadata } from "next";
import Link from "next/link";
import { deleteTemplateAction } from "@/app/lab/template-builder/actions";
import { readManifest } from "@/lib/templateBuilder/manifest";

export const metadata: Metadata = {
  title: "Template Gallery",
};

export default async function TemplateBuilderGalleryPage() {
  const manifest = await readManifest();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Generated Template Gallery</h1>
        <p className="text-muted-foreground">Open, export, or delete generated templates.</p>
        <Link href="/lab/template-builder" className="text-sm text-cyan-300 hover:text-cyan-200">← Back to Builder</Link>
      </header>

      {manifest.templates.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-card/60 p-4 text-sm text-zinc-300">No generated templates yet.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {manifest.templates.map((item) => (
            <article key={item.slug} className="rounded-xl border border-white/10 bg-card/60 p-4">
              <p className="text-xs text-zinc-400">{new Date(item.createdAt).toLocaleString()}</p>
              <h2 className="mt-1 text-sm font-semibold">{item.slug}</h2>
              <ul className="mt-2 space-y-1 text-xs text-zinc-300">
                <li>Palette: {item.paletteName}</li>
                <li>Layout: {item.layoutName}</li>
                <li>Goal: {item.goalLabel}</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/lab/generated/${item.slug}`} className="rounded-md border border-white/20 px-3 py-1.5 text-xs hover:border-cyan-300/60">Open</Link>
                <a href={`/lab/template-builder/export?slug=${item.slug}`} className="rounded-md border border-white/20 px-3 py-1.5 text-xs hover:border-cyan-300/60">Export ZIP</a>
                <form action={deleteTemplateAction.bind(null, item.slug)}>
                  <button type="submit" className="rounded-md border border-rose-300/40 px-3 py-1.5 text-xs text-rose-200 hover:bg-rose-500/15">Delete</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
