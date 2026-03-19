"use client";

const defaultLabels = ["Color", "Layout", "Goal", "Result"];

export function Stepper({
  current,
  labels = defaultLabels,
}: {
  current: 1 | 2 | 3 | 4;
  labels?: string[];
}) {
  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Template builder steps">
      {labels.map((label, i) => {
        const step = (i + 1) as 1 | 2 | 3 | 4;
        const active = step === current;
        const complete = step < current;
        return (
          <li key={label} className="rounded-lg border border-white/10 bg-card/60 p-2 text-center text-xs">
            <div className={`mx-auto mb-1 flex size-6 items-center justify-center rounded-full text-[11px] font-semibold ${active ? "bg-cyan-400 text-black" : complete ? "bg-emerald-400 text-black" : "bg-white/10 text-zinc-300"}`}>
              {step}
            </div>
            <p className={active ? "text-zinc-100" : "text-zinc-400"}>{label}</p>
          </li>
        );
      })}
    </ol>
  );
}
