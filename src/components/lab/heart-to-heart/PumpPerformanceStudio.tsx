"use client";

import { useMemo, useState } from "react";

type TrackKey = "recovery" | "endurance" | "symptomControl" | "imaging";

const trackLabels: Record<TrackKey, string> = {
  recovery: "Recovery",
  endurance: "Endurance",
  symptomControl: "Symptom Control",
  imaging: "Imaging",
};

export function PumpPerformanceStudio() {
  const [sleepHours, setSleepHours] = useState(7);
  const [hydration, setHydration] = useState(6);
  const [stress, setStress] = useState(4);
  const [movement, setMovement] = useState(5);

  const score = useMemo(() => {
    const sleepScore = Math.min(100, (sleepHours / 9) * 100);
    const hydrationScore = (hydration / 10) * 100;
    const stressScore = 100 - (stress / 10) * 100;
    const movementScore = (movement / 10) * 100;

    return Math.max(
      0,
      Math.min(100, Math.round(sleepScore * 0.25 + hydrationScore * 0.2 + stressScore * 0.3 + movementScore * 0.25)),
    );
  }, [sleepHours, hydration, stress, movement]);

  const insights = useMemo(() => {
    const list: string[] = [];
    if (sleepHours < 6.5) list.push("Sleep is the largest opportunity this week. Aim for 7-8 hours.");
    if (hydration < 6) list.push("Hydration is low; increase fluids to support exercise tolerance.");
    if (stress > 6) list.push("Stress load is high; consider breathing and short recovery blocks.");
    if (movement < 5) list.push("Movement is low; use brief daily walking sessions to build consistency.");
    if (list.length === 0) list.push("Great baseline this week. Keep the routine and focus on consistency.");
    return list.slice(0, 2);
  }, [sleepHours, hydration, stress, movement]);

  const trackFocus = useMemo(() => {
    const weights: Record<TrackKey, number> = {
      recovery: (10 - stress) + sleepHours,
      endurance: movement + hydration,
      symptomControl: stress + (10 - hydration),
      imaging: (10 - movement) + (10 - sleepHours / 1.2),
    };
    return (Object.keys(weights) as TrackKey[])
      .sort((a, b) => weights[b] - weights[a])
      .slice(0, 2)
      .map((key) => trackLabels[key]);
  }, [sleepHours, hydration, stress, movement]);

  const scoreTone = score >= 75 ? "Excellent" : score >= 55 ? "Solid" : "Needs Focus";
  const gaugeColor = score >= 75 ? "#22c55e" : score >= 55 ? "#f59e0b" : "#f43f5e";

  const generateEpisodePlanPdf = () => {
    const now = new Date();
    const dateLabel = now.toLocaleDateString();
    const planHtml = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Heart-to-Heart Weekly Episode Plan</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif; margin: 32px; color: #1f2937; }
            h1 { margin: 0 0 4px; font-size: 28px; }
            h2 { margin: 24px 0 8px; font-size: 18px; }
            .muted { color: #4b5563; font-size: 13px; }
            .score { margin-top: 12px; padding: 12px 16px; border-radius: 10px; border: 1px solid #d1d5db; background: #f9fafb; }
            .score strong { color: ${gaugeColor}; }
            ul { margin: 8px 0 0 20px; }
            li { margin: 6px 0; }
            .box { margin-top: 14px; padding: 12px 16px; border-radius: 10px; border: 1px solid #d1d5db; background: #ffffff; }
            .footer { margin-top: 28px; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 12px; }
          </style>
        </head>
        <body>
          <h1>Heart-to-Heart Weekly Episode Plan</h1>
          <div class="muted">Generated on ${dateLabel} • Protecting the Pump with Dr. Hadi</div>
          <div class="score">
            <div><strong>Pump Score: ${score}</strong> (${scoreTone})</div>
            <div class="muted">Suggested Track Focus: ${trackFocus.join(" + ")}</div>
          </div>
          <h2>Current Inputs</h2>
          <div class="box">
            <ul>
              <li>Sleep: ${sleepHours} hours</li>
              <li>Hydration: ${hydration} / 10</li>
              <li>Stress Load: ${stress} / 10</li>
              <li>Daily Movement: ${movement} / 10</li>
            </ul>
          </div>
          <h2>Smart Insights</h2>
          <div class="box">
            <ul>
              ${insights.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <h2>Recommended Episode Segment Focus</h2>
          <div class="box">
            <ul>
              <li>Primary Focus: ${trackFocus[0] ?? "Recovery"}</li>
              <li>Secondary Focus: ${trackFocus[1] ?? "Endurance"}</li>
              <li>Action Step: Pick one small habit to improve this week and review in next episode.</li>
            </ul>
          </div>
          <div class="footer">
            Educational simulation only. This document is not medical advice and does not replace clinical evaluation.
          </div>
          <script>
            window.onload = () => { window.print(); };
          </script>
        </body>
      </html>
    `;

    const win = window.open("", "_blank", "noopener,noreferrer,width=900,height=700");
    if (!win) return;
    win.document.open();
    win.document.write(planHtml);
    win.document.close();
  };

  return (
    <section className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 rounded-3xl border border-sky-200/30 bg-[linear-gradient(145deg,rgba(56,189,248,0.18),rgba(0,0,0,0.25))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-sky-100/85">Interactive Studio</p>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Pump Performance Snapshot</h2>
          <p className="mt-1 text-sm text-white/85">Move the sliders to generate a personalized content focus and coaching summary.</p>
        </div>
        <div className="hidden rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white/80 sm:block">
          Educational only
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 rounded-2xl border border-white/20 bg-black/20 p-4">
          <SliderControl label="Sleep (hours)" value={sleepHours} min={4} max={9} step={0.5} onChange={setSleepHours} />
          <SliderControl label="Hydration" value={hydration} min={1} max={10} step={1} onChange={setHydration} />
          <SliderControl label="Stress Load" value={stress} min={1} max={10} step={1} onChange={setStress} />
          <SliderControl label="Daily Movement" value={movement} min={1} max={10} step={1} onChange={setMovement} />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/20 bg-black/20 p-4">
            <p className="text-sm font-semibold text-white/90">Weekly Pump Score</p>
            <div className="mt-3 flex items-center gap-4">
              <div
                className="grid h-28 w-28 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(${gaugeColor} ${score * 3.6}deg, rgba(255,255,255,0.15) 0deg)`,
                }}
              >
                <div className="grid h-20 w-20 place-items-center rounded-full bg-[#0f172a] text-center">
                  <p className="text-2xl font-black leading-none">{score}</p>
                  <p className="text-[10px] uppercase tracking-wide text-white/75">score</p>
                </div>
              </div>
              <div>
                <p className="text-lg font-bold">{scoreTone}</p>
                <p className="text-sm text-white/80">Recommended episode track:</p>
                <p className="mt-1 text-sm font-semibold text-sky-100">{trackFocus.join(" + ")}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-black/20 p-4">
            <p className="text-sm font-semibold text-white/90">Your Smart Insights</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-white/85">
              {insights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button
              type="button"
              onClick={generateEpisodePlanPdf}
              className="mt-4 rounded-xl bg-[#f43f5e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Generate My Episode Plan (PDF)
            </button>
            <p className="mt-3 text-xs text-white/70">
              This simulator is educational and not medical advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-white/90">{label}</span>
        <span className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-white/85">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#f43f5e]"
      />
    </label>
  );
}
