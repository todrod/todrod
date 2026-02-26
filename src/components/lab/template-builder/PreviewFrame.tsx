"use client";

import type { CSSProperties, ReactNode } from "react";
import type { Palette } from "@/lib/templateBuilder/types";
import { paletteToCssVars } from "@/lib/templateBuilder/theme";

export function PreviewFrame({
  palette,
  dark,
  children,
}: {
  palette?: Palette;
  dark: boolean;
  children: ReactNode;
}) {
  const style = (palette ? (paletteToCssVars(palette) as unknown as CSSProperties) : undefined);

  return (
    <div
      style={style}
      className={`rounded-2xl border p-4 ${dark ? "bg-zinc-950/60 border-white/10" : "bg-zinc-100 border-zinc-300"}`}
    >
      {children}
    </div>
  );
}
