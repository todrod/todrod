import type { ReactNode, CSSProperties } from "react";
import { paletteToCssVars } from "@/lib/templateBuilder/theme";
import type { Palette } from "@/lib/templateBuilder/types";

export function ThemeRoot({ palette, children }: { palette: Palette; children: ReactNode }) {
  const style = paletteToCssVars(palette) as unknown as CSSProperties;

  return (
    <div style={style} className="bg-[var(--tb-background)] text-[var(--tb-text)]">
      {children}
    </div>
  );
}
