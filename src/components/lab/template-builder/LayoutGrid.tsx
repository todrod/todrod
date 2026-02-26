"use client";

import { CardSelect } from "@/components/lab/template-builder/CardSelect";
import { MiniPreview } from "@/components/lab/template-builder/MiniPreview";
import type { LayoutTemplate, Palette } from "@/lib/templateBuilder/types";

export function LayoutGrid({
  items,
  selectedId,
  onSelect,
  palette,
  styleIntensity = "minimal",
}: {
  items: LayoutTemplate[];
  selectedId?: string;
  onSelect: (id: string) => void;
  palette?: Palette;
  styleIntensity?: "minimal" | "bold" | "editorial";
}) {
  return (
    <div role="radiogroup" aria-label="Layout options" className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <CardSelect
          key={item.id}
          id={item.id}
          selected={selectedId === item.id}
          onSelect={onSelect}
          title={item.name}
          description={item.description}
          tags={item.tags}
          preview={<MiniPreview blocks={item.previewBlocks} layoutType={item.type} palette={palette} styleIntensity={styleIntensity} />}
        />
      ))}
    </div>
  );
}
