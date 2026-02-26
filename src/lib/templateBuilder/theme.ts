import type { Palette } from "@/lib/templateBuilder/types";
import type { CSSProperties } from "react";

export type CssVarMap = Record<`--tb-${string}`, string>;

export function paletteToCssVars(palette: Palette): CssVarMap {
  return {
    "--tb-primary": palette.tokens.primary,
    "--tb-secondary": palette.tokens.secondary,
    "--tb-accent": palette.tokens.accent,
    "--tb-background": palette.tokens.background,
    "--tb-surface": palette.tokens.surface,
    "--tb-text": palette.tokens.text,
    "--tb-muted": palette.tokens.muted,
    "--tb-border": palette.tokens.border,
  };
}

export function paletteStyle(palette: Palette): CSSProperties {
  const vars = paletteToCssVars(palette);
  return vars as unknown as CSSProperties;
}
