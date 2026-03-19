"use client";

import type { LayoutTemplate, Palette, TemplateBuilderStyleIntensity } from "@/lib/templateBuilder/types";

function c(hex: string, alpha: string) {
  return hex.startsWith("#") ? `${hex}${alpha}` : hex;
}

// ─── Block content renderers ────────────────────────────────────────────────

function NavContent({ primary, text, surface, border, accent, bg }: {
  primary: string; text: string; surface: string; border: string; accent: string; bg: string;
}) {
  return (
    <div className="flex h-full items-center justify-between px-2.5">
      <div className="flex items-center gap-1.5">
        <div className="size-3.5 rounded-full" style={{ background: `linear-gradient(135deg, ${primary}, ${accent})` }} />
        <div className="h-2 w-10 rounded-full" style={{ backgroundColor: c(text, "44") }} />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-7 rounded-full" style={{ backgroundColor: c(text, "28") }} />
        <div className="h-1.5 w-7 rounded-full" style={{ backgroundColor: c(text, "28") }} />
        <div className="h-1.5 w-7 rounded-full" style={{ backgroundColor: c(text, "28") }} />
      </div>
      <div className="rounded-full px-2.5 py-1" style={{ backgroundColor: c(primary, "CC"), minWidth: 32, height: 16 }} />
    </div>
  );
}

function HeroContent({ primary, text, accent, surface, bg, isSplit }: {
  primary: string; text: string; accent: string; surface: string; bg: string; isSplit?: boolean;
}) {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-3 py-2">
      <div className="h-1.5 w-12 rounded-full" style={{ backgroundColor: c(primary, "60") }} />
      <div className="h-3 w-4/5 rounded-md" style={{ backgroundColor: c(text, "52") }} />
      <div className="h-2.5 w-3/5 rounded-md" style={{ backgroundColor: c(text, "44") }} />
      <div className="mt-1 h-1.5 w-full rounded-full" style={{ backgroundColor: c(text, "22") }} />
      <div className="h-1.5 w-5/6 rounded-full" style={{ backgroundColor: c(text, "18") }} />
      <div className="mt-1 flex gap-2">
        <div className="h-4 w-14 rounded-full" style={{ backgroundColor: c(primary, "DD") }} />
        <div className="h-4 w-12 rounded-full border" style={{ borderColor: c(text, "44"), backgroundColor: "transparent" }} />
      </div>
    </div>
  );
}

function MediaContent({ primary, accent, surface, bg }: {
  primary: string; accent: string; surface: string; bg: string;
}) {
  return (
    <div
      className="h-full w-full rounded-lg"
      style={{
        background: `linear-gradient(135deg, ${c(primary, "44")} 0%, ${c(accent, "38")} 60%, ${c(surface, "F0")} 100%)`,
      }}
    >
      <div className="flex h-full flex-col items-center justify-center gap-2 opacity-50">
        <div className="size-8 rounded-2xl" style={{ background: `linear-gradient(135deg, ${primary}, ${accent})` }} />
        <div className="h-1.5 w-12 rounded-full" style={{ backgroundColor: c(primary, "80") }} />
      </div>
    </div>
  );
}

function SidebarContent({ primary, text, surface, border, accent }: {
  primary: string; text: string; surface: string; border: string; accent: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1 px-2 py-2">
      <div className="mb-1 h-1.5 w-12 rounded-full" style={{ backgroundColor: c(text, "40") }} />
      {[true, false, false, false, false].map((active, i) => (
        <div
          key={i}
          className="flex items-center gap-1.5 rounded-md px-1.5 py-1"
          style={{ backgroundColor: active ? c(primary, "22") : "transparent" }}
        >
          <div className="size-2 rounded-full" style={{ backgroundColor: active ? primary : c(text, "30") }} />
          <div
            className="h-1.5 rounded-full"
            style={{
              width: [44, 36, 48, 32, 40][i] ?? 36,
              backgroundColor: active ? c(text, "55") : c(text, "28"),
            }}
          />
        </div>
      ))}
      <div className="mt-1 h-px w-full" style={{ backgroundColor: c(border, "66") }} />
      {[0, 1, 2].map((i) => (
        <div key={`sub-${i}`} className="flex items-center gap-1.5 px-3 py-0.5">
          <div className="h-1.5 rounded-full" style={{ width: [28, 36, 22][i] ?? 28, backgroundColor: c(text, "20") }} />
        </div>
      ))}
    </div>
  );
}

function TocContent({ primary, text, border }: {
  primary: string; text: string; border: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1 px-2 py-2">
      <div className="mb-0.5 h-1.5 w-10 rounded-full" style={{ backgroundColor: c(text, "38") }} />
      {[true, false, false, false].map((active, i) => (
        <div key={i} className="flex items-center gap-1.5 py-0.5">
          <div className="h-1" style={{ width: 1, backgroundColor: active ? primary : c(border, "88") }} />
          <div
            className="h-1.5 rounded-full"
            style={{
              width: [40, 32, 48, 28][i] ?? 36,
              backgroundColor: active ? primary : c(text, "28"),
            }}
          />
        </div>
      ))}
    </div>
  );
}

function ArticleContent({ primary, text, border, surface }: {
  primary: string; text: string; border: string; surface: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1 px-2.5 py-2">
      <div className="h-2.5 w-3/4 rounded-md" style={{ backgroundColor: c(text, "50") }} />
      <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: c(text, "22") }} />
      <div className="h-1.5 w-5/6 rounded-full" style={{ backgroundColor: c(text, "1E") }} />
      <div className="h-1.5 w-4/5 rounded-full" style={{ backgroundColor: c(text, "1E") }} />
      <div className="mt-1 h-2 w-1/2 rounded-md" style={{ backgroundColor: c(text, "40") }} />
      <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: c(text, "1C") }} />
      <div className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: c(text, "18") }} />
    </div>
  );
}

function ContentFeatureCards({ primary, text, surface, border, accent }: {
  primary: string; text: string; surface: string; border: string; accent: string;
}) {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-2 py-2">
      <div className="h-2 w-1/2 rounded-md mx-auto" style={{ backgroundColor: c(text, "40") }} />
      <div className="flex gap-1.5 mt-1">
        {[primary, accent, c(primary, "AA")].map((color, i) => (
          <div
            key={i}
            className="flex-1 rounded-lg border p-1.5"
            style={{ borderColor: c(border, "88"), backgroundColor: c(surface, "E8") }}
          >
            <div className="size-3 rounded-full mb-1" style={{ backgroundColor: c(color, "CC") }} />
            <div className="h-1.5 w-full rounded-full mb-0.5" style={{ backgroundColor: c(text, "44") }} />
            <div className="h-1 w-3/4 rounded-full" style={{ backgroundColor: c(text, "22") }} />
            <div className="h-1 w-5/6 rounded-full mt-0.5" style={{ backgroundColor: c(text, "1A") }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsContent({ primary, text, surface, border, accent }: {
  primary: string; text: string; surface: string; border: string; accent: string;
}) {
  return (
    <div className="flex h-full flex-col justify-start gap-1 px-2 py-1.5">
      <div className="flex gap-1.5">
        {[primary, accent, c(text, "44")].map((color, i) => (
          <div
            key={i}
            className="flex-1 rounded-lg border overflow-hidden"
            style={{ borderColor: c(border, "88") }}
          >
            <div className="h-8" style={{ background: `linear-gradient(135deg, ${c(color, "44")}, ${c(surface, "F0")})` }} />
            <div className="p-1">
              <div className="h-1.5 w-full rounded-full mb-0.5" style={{ backgroundColor: c(text, "44") }} />
              <div className="h-1.5 w-2/3 rounded-full mb-1" style={{ backgroundColor: c(primary, "88") }} />
              <div className="h-3 w-full rounded-full" style={{ backgroundColor: c(primary, "CC") }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListingsContent({ primary, text, surface, border, accent }: {
  primary: string; text: string; surface: string; border: string; accent: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1.5 px-2 py-2">
      {[primary, accent].map((color, i) => (
        <div key={i} className="flex gap-1.5 rounded-lg border p-1" style={{ borderColor: c(border, "88"), backgroundColor: c(surface, "E8") }}>
          <div className="w-8 rounded-md flex-shrink-0" style={{ background: `linear-gradient(135deg, ${c(color, "55")}, ${c(surface, "F0")})` }} />
          <div className="flex-1 py-0.5">
            <div className="h-1.5 w-4/5 rounded-full mb-0.5" style={{ backgroundColor: c(text, "44") }} />
            <div className="h-1.5 w-2/3 rounded-full" style={{ backgroundColor: c(primary, "77") }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MapContent({ primary, text, surface, border }: {
  primary: string; text: string; surface: string; border: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg" style={{ backgroundColor: c(surface, "D4") }}>
      {/* Grid lines */}
      {[20, 40, 60, 80].map((pct) => (
        <div key={`h${pct}`} className="absolute left-0 right-0 h-px" style={{ top: `${pct}%`, backgroundColor: c(border, "55") }} />
      ))}
      {[25, 50, 75].map((pct) => (
        <div key={`v${pct}`} className="absolute top-0 bottom-0 w-px" style={{ left: `${pct}%`, backgroundColor: c(border, "55") }} />
      ))}
      {/* Map pin */}
      <div className="absolute size-3 rounded-full border-2" style={{ top: "35%", left: "50%", borderColor: primary, backgroundColor: c(primary, "44") }} />
      <div className="absolute size-5 rounded-full opacity-30" style={{ top: "28%", left: "44%", backgroundColor: c(primary, "44") }} />
    </div>
  );
}

function FiltersContent({ primary, text, border, surface }: {
  primary: string; text: string; border: string; surface: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1 px-2 py-2">
      <div className="h-1.5 w-14 rounded-full mb-1" style={{ backgroundColor: c(text, "40") }} />
      {[true, false, true, false].map((checked, i) => (
        <div key={i} className="flex items-center gap-1.5 py-0.5">
          <div
            className="size-2.5 rounded"
            style={{ backgroundColor: checked ? c(primary, "CC") : "transparent", border: `1px solid ${c(border, "AA")}` }}
          />
          <div className="h-1.5 rounded-full" style={{ width: [36, 44, 28, 40][i] ?? 36, backgroundColor: c(text, "28") }} />
        </div>
      ))}
      <div className="mt-1">
        <div className="h-1.5 w-16 rounded-full mb-1" style={{ backgroundColor: c(text, "30") }} />
        <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: c(border, "AA") }}>
          <div className="h-full rounded-full" style={{ width: "60%", backgroundColor: primary }} />
        </div>
      </div>
    </div>
  );
}

function FeaturesContent({ primary, text, surface, border, accent }: {
  primary: string; text: string; surface: string; border: string; accent: string;
}) {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-2 py-2">
      <div className="flex gap-2">
        {[primary, accent, c(primary, "99")].map((color, i) => (
          <div key={i} className="flex-1">
            <div className="size-4 rounded-lg mb-1" style={{ backgroundColor: c(color, "CC") }} />
            <div className="h-1.5 w-full rounded-full mb-0.5" style={{ backgroundColor: c(text, "44") }} />
            <div className="h-1 w-5/6 rounded-full mb-0.5" style={{ backgroundColor: c(text, "22") }} />
            <div className="h-1 w-3/4 rounded-full" style={{ backgroundColor: c(text, "1A") }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingContent({ primary, text, surface, border, accent }: {
  primary: string; text: string; surface: string; border: string; accent: string;
}) {
  return (
    <div className="flex h-full flex-col justify-center gap-1 px-2 py-2">
      <div className="flex gap-1.5">
        {[
          { color: c(surface, "EE"), label: "Starter", featured: false },
          { color: c(primary, "18"), label: "Pro", featured: true },
        ].map(({ color, label, featured }, i) => (
          <div
            key={i}
            className="flex-1 rounded-lg border p-1.5"
            style={{ borderColor: featured ? c(primary, "88") : c(border, "66"), backgroundColor: color }}
          >
            <div className="h-1.5 w-2/3 rounded-full mb-0.5" style={{ backgroundColor: c(text, "44") }} />
            <div className="h-2.5 w-1/2 rounded-md mb-1" style={{ backgroundColor: featured ? primary : c(text, "40") }} />
            {[0, 1, 2].map((j) => (
              <div key={j} className="flex items-center gap-1 mb-0.5">
                <div className="size-1.5 rounded-full" style={{ backgroundColor: c(primary, "88") }} />
                <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: c(text, "20") }} />
              </div>
            ))}
            <div className="mt-1 h-3.5 w-full rounded-full" style={{ backgroundColor: featured ? c(primary, "DD") : c(border, "AA") }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProofContent({ primary, text, surface, border }: {
  primary: string; text: string; surface: string; border: string;
}) {
  return (
    <div className="flex h-full items-center gap-2 px-2 py-1.5">
      <div className="flex gap-0.5 flex-shrink-0">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="size-2 rounded-full" style={{ backgroundColor: i < 4 ? primary : c(primary, "44") }} />
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <div className="h-1.5 w-full rounded-full mb-0.5" style={{ backgroundColor: c(text, "28") }} />
        <div className="h-1.5 w-4/5 rounded-full" style={{ backgroundColor: c(text, "20") }} />
      </div>
      <div className="size-5 rounded-full flex-shrink-0" style={{ backgroundColor: c(primary, "44") }} />
    </div>
  );
}

function ScheduleContent({ primary, text, border, surface }: {
  primary: string; text: string; border: string; surface: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1 px-2 py-2">
      <div className="h-1.5 w-10 rounded-full mb-1" style={{ backgroundColor: c(primary, "80") }} />
      {[true, false, false, false].map((active, i) => (
        <div key={i} className="flex items-center gap-1.5 py-0.5">
          <div className="h-1.5 w-7 rounded-full flex-shrink-0" style={{ backgroundColor: c(primary, active ? "CC" : "44") }} />
          <div
            className="flex-1 h-1.5 rounded-full"
            style={{ backgroundColor: c(text, active ? "44" : "22") }}
          />
        </div>
      ))}
    </div>
  );
}

function WorkspaceContent({ primary, text, surface, border, accent }: {
  primary: string; text: string; surface: string; border: string; accent: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1.5 px-2 py-2">
      <div className="flex items-center gap-1 mb-1">
        <div className="h-2 w-6 rounded" style={{ backgroundColor: c(surface, "EE"), border: `1px solid ${c(border, "88")}` }} />
        <div className="h-2 w-6 rounded" style={{ backgroundColor: c(surface, "EE"), border: `1px solid ${c(border, "88")}` }} />
        <div className="h-2 w-6 rounded" style={{ backgroundColor: c(surface, "EE"), border: `1px solid ${c(border, "88")}` }} />
        <div className="ml-auto h-2 w-10 rounded-full" style={{ backgroundColor: c(primary, "33") }} />
      </div>
      <div className="flex gap-1.5 flex-1">
        <div className="flex-1 rounded-md border" style={{ borderColor: c(border, "77"), backgroundColor: c(surface, "E0") }}>
          <div className="p-1">
            <div className="h-1.5 w-3/4 rounded-full mb-0.5" style={{ backgroundColor: c(text, "40") }} />
            <div className="h-1 w-full rounded-full mb-0.5" style={{ backgroundColor: c(text, "20") }} />
            <div className="h-1 w-5/6 rounded-full" style={{ backgroundColor: c(text, "18") }} />
          </div>
        </div>
        <div className="w-12 rounded-md border" style={{ borderColor: c(border, "77"), backgroundColor: c(primary, "12") }}>
          <div className="p-1">
            <div className="h-1.5 w-full rounded-full mb-0.5" style={{ backgroundColor: c(primary, "66") }} />
            <div className="h-1 w-4/5 rounded-full" style={{ backgroundColor: c(text, "22") }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BentoContent({ primary, text, surface, border, accent, index }: {
  primary: string; text: string; surface: string; border: string; accent: string; index: number;
}) {
  const colors = [primary, accent, c(primary, "BB"), c(accent, "BB")];
  const color = colors[index % colors.length] ?? primary;
  return (
    <div
      className="h-full w-full rounded-lg"
      style={{ background: `linear-gradient(135deg, ${c(color, "30")}, ${c(surface, "F0")})` }}
    >
      <div className="flex h-full flex-col justify-between p-2">
        <div className="size-4 rounded-lg" style={{ backgroundColor: c(color, "BB") }} />
        <div>
          <div className="h-1.5 w-4/5 rounded-full mb-0.5" style={{ backgroundColor: c(text, "44") }} />
          <div className="h-1 w-2/3 rounded-full" style={{ backgroundColor: c(text, "22") }} />
        </div>
      </div>
    </div>
  );
}

function FeatureHeroContent({ primary, text, surface, border, accent }: {
  primary: string; text: string; surface: string; border: string; accent: string;
}) {
  return (
    <div
      className="relative h-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${c(primary, "28")} 0%, ${c(accent, "20")} 100%)` }}
    >
      <div className="absolute inset-0 flex flex-col justify-center px-3 py-2">
        <div className="h-1.5 w-16 rounded-full mb-1" style={{ backgroundColor: c(primary, "77") }} />
        <div className="h-3 w-3/4 rounded-md mb-1" style={{ backgroundColor: c(text, "55") }} />
        <div className="h-1.5 w-1/2 rounded-full" style={{ backgroundColor: c(text, "30") }} />
      </div>
    </div>
  );
}

function StatusBar({ primary, text, surface, border }: {
  primary: string; text: string; surface: string; border: string;
}) {
  return (
    <div className="flex h-full items-center gap-2 px-2.5" style={{ backgroundColor: c(surface, "EE") }}>
      <div className="size-1.5 rounded-full" style={{ backgroundColor: primary }} />
      <div className="h-1.5 w-16 rounded-full" style={{ backgroundColor: c(text, "28") }} />
      <div className="ml-auto flex gap-1.5">
        <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: c(text, "22") }} />
        <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: c(text, "22") }} />
      </div>
    </div>
  );
}

function QuestionContent({ primary, text, surface, border, accent }: {
  primary: string; text: string; surface: string; border: string; accent: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1.5 px-2.5 py-2">
      <div className="h-1.5 w-16 rounded-full mb-1" style={{ backgroundColor: c(primary, "66") }} />
      <div className="h-2 w-5/6 rounded-md" style={{ backgroundColor: c(text, "48") }} />
      <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: c(text, "22") }} />
      <div className="mt-1 space-y-1">
        {[true, false, false, false].map((selected, i) => (
          <div key={i} className="flex items-center gap-1.5 rounded-md p-1" style={{ backgroundColor: selected ? c(primary, "18") : "transparent" }}>
            <div className="size-2.5 rounded-full border" style={{ borderColor: selected ? primary : c(border, "AA"), backgroundColor: selected ? c(primary, "CC") : "transparent" }} />
            <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: c(text, selected ? "44" : "24") }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RailContent({ primary, text, surface, border }: {
  primary: string; text: string; surface: string; border: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1 px-2 py-2">
      <div className="h-1.5 w-10 rounded-full mb-1" style={{ backgroundColor: c(text, "38") }} />
      <div className="h-6 w-full rounded-lg" style={{ background: `conic-gradient(${primary} 65%, ${c(border, "AA")} 0)` }} />
      <div className="mt-1 space-y-0.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="size-1.5 rounded-full" style={{ backgroundColor: i === 0 ? primary : c(border, "88") }} />
            <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: c(text, i === 0 ? "40" : "22") }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterContent({ primary, text, surface, border, muted }: {
  primary: string; text: string; surface: string; border: string; muted: string;
}) {
  return (
    <div className="flex h-full items-center justify-between px-2.5">
      <div className="flex items-center gap-1">
        <div className="size-2.5 rounded-full" style={{ backgroundColor: c(primary, "88") }} />
        <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: c(text, "33") }} />
      </div>
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-0.5">
            <div className="h-1 w-8 rounded-full" style={{ backgroundColor: c(text, "30") }} />
            <div className="h-1 w-6 rounded-full" style={{ backgroundColor: c(text, "20") }} />
            <div className="h-1 w-7 rounded-full" style={{ backgroundColor: c(text, "20") }} />
          </div>
        ))}
      </div>
      <div className="h-1 w-12 rounded-full" style={{ backgroundColor: c(text, "20") }} />
    </div>
  );
}

function CaseRailContent({ primary, text, surface, border, accent }: {
  primary: string; text: string; surface: string; border: string; accent: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1.5 px-1.5 py-2">
      <div className="h-1.5 w-10 rounded-full mb-0.5" style={{ backgroundColor: c(text, "38") }} />
      {[primary, accent].map((color, i) => (
        <div key={i} className="rounded-lg border p-1.5" style={{ borderColor: c(border, "77"), backgroundColor: c(color, "14") }}>
          <div className="h-5 w-full rounded-md mb-1" style={{ backgroundColor: c(color, "33") }} />
          <div className="h-1.5 w-4/5 rounded-full" style={{ backgroundColor: c(text, "38") }} />
        </div>
      ))}
    </div>
  );
}

function StoriesContent({ primary, text, surface, border, accent }: {
  primary: string; text: string; surface: string; border: string; accent: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1 px-1.5 py-2">
      <div className="h-1.5 w-10 rounded-full mb-0.5" style={{ backgroundColor: c(text, "38") }} />
      {[primary, accent, c(primary, "88")].slice(0, 2).map((color, i) => (
        <div key={i} className="flex gap-1.5 rounded-lg border p-1" style={{ borderColor: c(border, "77"), backgroundColor: c(surface, "E8") }}>
          <div className="w-6 h-6 rounded-md flex-shrink-0" style={{ backgroundColor: c(color, "44") }} />
          <div className="flex-1">
            <div className="h-1.5 w-4/5 rounded-full mb-0.5" style={{ backgroundColor: c(text, "38") }} />
            <div className="h-1 w-2/3 rounded-full" style={{ backgroundColor: c(text, "22") }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function TrendingContent({ primary, text, surface, border }: {
  primary: string; text: string; surface: string; border: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1 px-2 py-2">
      <div className="h-1.5 w-12 rounded-full mb-1" style={{ backgroundColor: c(primary, "77") }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded flex-shrink-0 text-center" style={{ backgroundColor: c(primary, i === 0 ? "DD" : "33"), fontSize: 6, lineHeight: "12px", color: text }}>
            {i + 1}
          </div>
          <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: c(text, i === 0 ? "44" : "22") }} />
        </div>
      ))}
    </div>
  );
}

// ─── Block type resolver ────────────────────────────────────────────────────

function renderBlockContent(
  id: string,
  index: number,
  tokens: { primary: string; secondary: string; accent: string; background: string; surface: string; text: string; muted: string; border: string },
) {
  const { primary, secondary, accent, background: bg, surface, text, muted, border } = tokens;

  if (/^(header|topbar)$/.test(id)) return <NavContent {...{ primary, text, surface, border, accent, bg }} />;
  if (/^hero$/.test(id)) return <HeroContent {...{ primary, text, accent, surface, bg }} />;
  if (/^(hero-left|hero-copy)$/.test(id)) return <HeroContent {...{ primary, text, accent, surface, bg }} isSplit />;
  if (/^(hero-right|hero-media)$/.test(id)) return <MediaContent {...{ primary, accent, surface, bg }} />;
  if (/^(sidebar|docs-nav|curriculum)$/.test(id)) return <SidebarContent {...{ primary, text, surface, border, accent }} />;
  if (/^(toc|aside)$/.test(id)) return <TocContent {...{ primary, text, border }} />;
  if (/^(article|lesson|main)$/.test(id)) return <ArticleContent {...{ primary, text, border, surface }} />;
  if (/^content$/.test(id)) return <ContentFeatureCards {...{ primary, text, surface, border, accent }} />;
  if (/^products$/.test(id)) return <ProductsContent {...{ primary, text, surface, border, accent }} />;
  if (/^listings$/.test(id)) return <ListingsContent {...{ primary, text, surface, border, accent }} />;
  if (/^map$/.test(id)) return <MapContent {...{ primary, text, surface, border }} />;
  if (/^filters$/.test(id)) return <FiltersContent {...{ primary, text, border, surface }} />;
  if (/^features$/.test(id)) return <FeaturesContent {...{ primary, text, surface, border, accent }} />;
  if (/^pricing$/.test(id)) return <PricingContent {...{ primary, text, surface, border, accent }} />;
  if (/^proof$/.test(id)) return <ProofContent {...{ primary, text, surface, border }} />;
  if (/^schedule$/.test(id)) return <ScheduleContent {...{ primary, text, border, surface }} />;
  if (/^workspace$/.test(id)) return <WorkspaceContent {...{ primary, text, surface, border, accent }} />;
  if (/^(bento-[a-z])$/.test(id)) return <BentoContent {...{ primary, text, surface, border, accent, index }} />;
  if (/^feature$/.test(id)) return <FeatureHeroContent {...{ primary, text, surface, border, accent }} />;
  if (/^status$/.test(id)) return <StatusBar {...{ primary, text, surface, border }} />;
  if (/^question$/.test(id)) return <QuestionContent {...{ primary, text, surface, border, accent }} />;
  if (/^rail$/.test(id)) return <RailContent {...{ primary, text, surface, border }} />;
  if (/^footer$/.test(id)) return <FooterContent {...{ primary, text, surface, border, muted }} />;
  if (/^case-rail$/.test(id)) return <CaseRailContent {...{ primary, text, surface, border, accent }} />;
  if (/^stories$/.test(id)) return <StoriesContent {...{ primary, text, surface, border, accent }} />;
  if (/^highlights$/.test(id)) return <StoriesContent {...{ primary, text, surface, border, accent }} />;
  if (/^trending$/.test(id)) return <TrendingContent {...{ primary, text, surface, border }} />;

  // Fallback
  return (
    <div className="flex h-full flex-col justify-between p-2">
      <div className="h-1.5 w-2/3 rounded-full" style={{ backgroundColor: c(text, "26") }} />
      <span className="self-start rounded-full px-2 py-0.5 text-[7px] uppercase tracking-[0.1em]"
        style={{ backgroundColor: c(bg, "CC"), color: c(text, "CC") }}>
        {id.replace(/-/g, " ")}
      </span>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export function RichLayoutPreview({
  layout,
  palette,
  styleIntensity = "minimal",
  mode = "recommended",
  height = 208,
}: {
  layout: LayoutTemplate;
  palette?: Palette;
  styleIntensity?: TemplateBuilderStyleIntensity;
  mode?: "recommended" | "conservative" | "distinctive";
  height?: number;
}) {
  const tokens = {
    primary: palette?.tokens.primary ?? "#22d3ee",
    secondary: palette?.tokens.secondary ?? "#1d4ed8",
    accent: palette?.tokens.accent ?? "#2dd4bf",
    background: palette?.tokens.background ?? "#0b1220",
    surface: palette?.tokens.surface ?? "#142235",
    text: palette?.tokens.text ?? "#e6f0ff",
    muted: palette?.tokens.muted ?? "#93a4bf",
    border: palette?.tokens.border ?? "#284260",
  };

  const { primary, background: bg, surface, text, border } = tokens;

  const glow =
    mode === "distinctive"
      ? `0 30px 82px ${c(primary, "40")}`
      : mode === "conservative"
        ? `0 16px 34px rgba(0,0,0,0.18)`
        : styleIntensity === "bold"
          ? `0 28px 70px ${c(primary, "30")}`
          : styleIntensity === "editorial"
            ? `0 22px 60px ${c(text, "16")}`
            : `0 20px 50px rgba(0,0,0,0.28)`;

  return (
    <div
      className="relative overflow-hidden rounded-[20px] border"
      style={{
        borderColor: c(border, "99"),
        background: `linear-gradient(180deg, ${bg}, ${c(surface, "F4")})`,
        boxShadow: glow,
      }}
    >
      {/* Ambient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            mode === "distinctive"
              ? `radial-gradient(circle at 12% 14%, ${c(primary, "30")}, transparent 28%), radial-gradient(circle at 88% 80%, ${c(text, "12")}, transparent 34%)`
              : "radial-gradient(circle at 12% 14%, rgba(255,255,255,0.10), transparent 32%), radial-gradient(circle at 88% 80%, rgba(255,255,255,0.06), transparent 34%)",
        }}
      />

      {/* Chrome bar */}
      <div className="relative flex items-center justify-between border-b px-3 py-2" style={{ borderColor: c(border, "88"), backgroundColor: c(surface, "C8") }}>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-rose-300/70" />
          <span className="size-2 rounded-full bg-amber-300/70" />
          <span className="size-2 rounded-full bg-emerald-300/70" />
          <span className="ml-2 text-[9px] uppercase tracking-[0.18em]" style={{ color: c(text, "AA") }}>
            {layout.type}
          </span>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em]"
          style={{ backgroundColor: c(primary, "24"), color: text }}
        >
          {layout.name}
        </span>
      </div>

      {/* Layout blocks */}
      <div className="relative p-1.5" style={{ height }}>
        {layout.previewBlocks.map((block, index) => (
          <div
            key={block.id}
            className="absolute overflow-hidden rounded-lg border"
            style={{
              left: `calc(${block.x}% + 4px)`,
              top: `calc(${Math.max(0, block.y)}% + 4px)`,
              width: `calc(${block.w}% - 8px)`,
              height: `calc(${Math.max(9, block.h)}% - 8px)`,
              borderColor: c(border, "77"),
              backgroundColor: /hero|feature|workspace|main|article|products|stories|listings|lesson|question/.test(block.id)
                ? mode === "distinctive"
                  ? `linear-gradient(135deg, ${c(primary, "28")}, ${c(surface, "F0")})`
                  : c(surface, "EC")
                : /sidebar|rail|map|toc|aside|docs-nav|curriculum|filters/.test(block.id)
                  ? c(surface, "F4")
                  : c(surface, "E8"),
            }}
          >
            {renderBlockContent(block.id, index, tokens)}
          </div>
        ))}
      </div>
    </div>
  );
}
