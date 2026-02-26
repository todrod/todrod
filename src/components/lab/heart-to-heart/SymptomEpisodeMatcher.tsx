"use client";

import { useMemo, useState } from "react";

type SymptomKey =
  | "chest-discomfort"
  | "shortness-of-breath"
  | "fatigue"
  | "palpitations"
  | "dizziness"
  | "leg-swelling"
  | "exercise-intolerance"
  | "brain-fog";

type EpisodeMatch = {
  episode: string;
  timestamp: string;
  reason: string;
  nextStep: string;
};

const symptomOptions: { id: SymptomKey; label: string }[] = [
  { id: "chest-discomfort", label: "Chest discomfort" },
  { id: "shortness-of-breath", label: "Shortness of breath" },
  { id: "fatigue", label: "Persistent fatigue" },
  { id: "palpitations", label: "Palpitations / racing heart" },
  { id: "dizziness", label: "Dizziness / near-fainting" },
  { id: "leg-swelling", label: "Leg swelling / heaviness" },
  { id: "exercise-intolerance", label: "Exercise intolerance" },
  { id: "brain-fog", label: "Brain fog / focus issues" },
];

const matchRules: Record<SymptomKey, EpisodeMatch> = {
  "chest-discomfort": {
    episode: "Episode 2: Ischemia & PET CT",
    timestamp: "08:20",
    reason: "Focuses on when advanced perfusion imaging can clarify symptoms that remain uncertain.",
    nextStep: "Track symptom timing, triggers, and duration to discuss at your next visit.",
  },
  "shortness-of-breath": {
    episode: "Episode 3: Echo Patterns That Matter",
    timestamp: "12:05",
    reason: "Covers structural and functional causes of breathlessness and how echo contributes.",
    nextStep: "Note any activity that triggers symptoms and how quickly recovery occurs.",
  },
  fatigue: {
    episode: "Episode 5: Fuel, Recovery, and Heart Performance",
    timestamp: "05:40",
    reason: "Connects sleep, recovery, and metabolic patterns with cardiovascular performance.",
    nextStep: "Log sleep and hydration for one week before follow-up.",
  },
  palpitations: {
    episode: "Episode 4: Rhythm Signals",
    timestamp: "09:15",
    reason: "Breaks down common rhythm complaints and what monitoring strategies are useful.",
    nextStep: "Capture frequency, duration, and associated symptoms (dizziness/chest pain).",
  },
  dizziness: {
    episode: "Episode 6: POTS and Autonomic Balance",
    timestamp: "06:55",
    reason: "Explains orthostatic symptoms and practical evaluation frameworks.",
    nextStep: "Record symptoms with posture changes and fluid intake patterns.",
  },
  "leg-swelling": {
    episode: "Episode 7: Vein Clinic Essentials",
    timestamp: "10:30",
    reason: "Reviews venous symptoms, ultrasound pathways, and treatment planning.",
    nextStep: "Track laterality, timing (morning/evening), and symptom progression.",
  },
  "exercise-intolerance": {
    episode: "Episode 8: Performance Metrics in Cardiology",
    timestamp: "07:10",
    reason: "Discusses why capacity drops and how to evaluate underlying contributors.",
    nextStep: "Log activity type, intensity, and recovery time.",
  },
  "brain-fog": {
    episode: "Episode 6: POTS and Autonomic Balance",
    timestamp: "18:40",
    reason: "Covers cognitive symptoms tied to autonomic dysfunction and daily-management tactics.",
    nextStep: "Track hydration, stress, sleep, and symptom windows.",
  },
};

export function SymptomEpisodeMatcher() {
  const [selected, setSelected] = useState<SymptomKey[]>([]);

  const toggleSymptom = (symptom: SymptomKey) => {
    setSelected((prev) => (prev.includes(symptom) ? prev.filter((item) => item !== symptom) : [...prev, symptom]));
  };

  const recommendations = useMemo(() => {
    if (selected.length === 0) return [];
    const uniqueEpisodes = new Map<string, EpisodeMatch>();
    selected.forEach((key) => {
      const match = matchRules[key];
      if (!uniqueEpisodes.has(match.episode)) uniqueEpisodes.set(match.episode, match);
    });
    return Array.from(uniqueEpisodes.values()).slice(0, 3);
  }, [selected]);

  return (
    <section className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 rounded-3xl border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.1),rgba(0,0,0,0.25))] p-6">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-sky-100/85">Smart Discovery</p>
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Symptom-to-Episode Match Tool</h2>
        <p className="mt-1 text-sm text-white/85">
          Select symptoms and get the best episode segment to start with.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-white/20 bg-black/20 p-4">
          <p className="mb-3 text-sm font-semibold text-white/90">What are you noticing?</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {symptomOptions.map((item) => {
              const active = selected.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleSymptom(item.id)}
                  className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                    active
                      ? "border-sky-300/70 bg-sky-300/20 text-sky-50"
                      : "border-white/20 bg-white/10 text-white/90 hover:border-sky-300/45 hover:bg-white/15"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 bg-black/20 p-4">
          <p className="mb-3 text-sm font-semibold text-white/90">Recommended Listening</p>
          {recommendations.length === 0 ? (
            <p className="text-sm text-white/70">Pick one or more symptoms to see personalized episode matches.</p>
          ) : (
            <div className="space-y-3">
              {recommendations.map((item) => (
                <div key={item.episode} className="rounded-xl border border-white/20 bg-white/10 p-3">
                  <p className="text-sm font-semibold text-white">{item.episode}</p>
                  <p className="mt-1 text-xs text-sky-100">Start at {item.timestamp}</p>
                  <p className="mt-2 text-sm text-white/85">{item.reason}</p>
                  <p className="mt-2 text-xs text-white/70">Next step: {item.nextStep}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs text-white/70">
        Educational only. This tool is not a diagnosis and does not replace medical evaluation. For urgent symptoms, seek immediate medical care.
      </p>
    </section>
  );
}
