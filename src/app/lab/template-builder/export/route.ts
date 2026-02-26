import { NextResponse } from "next/server";
import { buildTemplateZip } from "@/lib/templateBuilder/export";
import { readGeneratedTemplate } from "@/lib/templateBuilder/manifest";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const config = await readGeneratedTemplate(slug);
  if (!config) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  const zip = await buildTemplateZip(config);

  return new NextResponse(new Uint8Array(zip), {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${slug}.zip"`,
    },
  });
}
