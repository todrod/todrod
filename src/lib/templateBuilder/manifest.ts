import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { GeneratedTemplateConfig, TemplateManifest, TemplateManifestEntry } from "@/lib/templateBuilder/types";

const generatedDir = path.join(process.cwd(), "src", "data", "generated");
const manifestPath = path.join(generatedDir, "templates-manifest.json");

const emptyManifest: TemplateManifest = { templates: [] };

export function getGeneratedDir(): string {
  return generatedDir;
}

export async function ensureGeneratedStore(): Promise<void> {
  await fs.mkdir(generatedDir, { recursive: true });
  try {
    await fs.access(manifestPath);
  } catch {
    await fs.writeFile(manifestPath, `${JSON.stringify(emptyManifest, null, 2)}\n`, "utf8");
  }
}

export async function readManifest(): Promise<TemplateManifest> {
  await ensureGeneratedStore();
  try {
    const data = await fs.readFile(manifestPath, "utf8");
    const parsed = JSON.parse(data) as TemplateManifest;
    if (!Array.isArray(parsed.templates)) return emptyManifest;
    return parsed;
  } catch {
    return emptyManifest;
  }
}

export async function writeManifest(manifest: TemplateManifest): Promise<void> {
  await ensureGeneratedStore();
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

export async function appendManifestEntry(entry: TemplateManifestEntry): Promise<void> {
  const manifest = await readManifest();
  const without = manifest.templates.filter((t) => t.slug !== entry.slug);
  without.unshift(entry);
  await writeManifest({ templates: without });
}

export async function removeManifestEntry(slug: string): Promise<void> {
  const manifest = await readManifest();
  const next = manifest.templates.filter((item) => item.slug !== slug);
  await writeManifest({ templates: next });
}

export async function writeGeneratedTemplate(config: GeneratedTemplateConfig): Promise<string> {
  await ensureGeneratedStore();
  const filePath = path.join(generatedDir, `${config.slug}.json`);
  await fs.writeFile(filePath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  return filePath;
}

export async function readGeneratedTemplate(slug: string): Promise<GeneratedTemplateConfig | null> {
  await ensureGeneratedStore();
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const filePath = path.join(generatedDir, `${safeSlug}.json`);
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data) as GeneratedTemplateConfig;
  } catch {
    return null;
  }
}

export async function deleteGeneratedTemplate(slug: string): Promise<void> {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const filePath = path.join(generatedDir, `${safeSlug}.json`);
  await removeManifestEntry(safeSlug);
  try {
    await fs.unlink(filePath);
  } catch {
    // ignore missing file
  }
}
