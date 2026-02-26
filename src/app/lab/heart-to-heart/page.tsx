import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PumpPerformanceStudio } from "@/components/lab/heart-to-heart/PumpPerformanceStudio";
import { SymptomEpisodeMatcher } from "@/components/lab/heart-to-heart/SymptomEpisodeMatcher";

export const metadata: Metadata = {
  title: "Heart-to-Heart with Dr. Hadi",
  description: "A premium podcast landing concept for Protecting the Pump with Dr. Hadi Mahmaljy.",
};

const episodeChapters = [
  { time: "00:40", title: "Why this podcast exists" },
  { time: "06:10", title: "How high-tech cardiology changes outcomes" },
  { time: "14:55", title: "PET CT, POTS, and practical patient guidance" },
  { time: "24:05", title: "Food as medicine: Mediterranean fundamentals" },
];

const featureCards = [
  {
    title: "PET CT Imaging",
    copy: "See perfusion and viability with precision when standard testing is not enough.",
  },
  {
    title: "Vein Clinic",
    copy: "Structured venous evaluation with modern minimally invasive treatment pathways.",
  },
  {
    title: "POTS Syndrome",
    copy: "Real-world autonomic care strategies focused on function, stamina, and symptom relief.",
  },
  {
    title: "Advanced Echo Lab",
    copy: "High-fidelity echocardiography workflows for structural, valvular, and hemodynamic insight.",
  },
];

const setupQuestions = [
  "What is a common office win we should use as the opening hook?",
  "Which future guests should we tease in Episode 1?",
  "First recipe segment: Mediterranean Salmon with Quinoa or Greek Grilled Chicken?",
  "Which Tampa/Plant City location should we mention for a personal touch?",
];

export default function HeartToHeartLabPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-[#f43f5e]/25 blur-3xl" />
          <div className="absolute right-0 top-32 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="absolute bottom-16 left-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative space-y-8">
          <header className="animate-in fade-in-0 slide-in-from-top-2 duration-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="border-white/35 bg-white/15 text-white">Podcast Lab</Badge>
              <Badge className="border-[#f43f5e]/50 bg-[#f43f5e]/20 text-white">Mobile First</Badge>
            </div>
            <Link href="/lab" className="text-sm text-white/80 underline-offset-4 hover:text-white hover:underline">
              Back to Lab
            </Link>
          </header>

          <section className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 grid gap-6 rounded-3xl border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(244,63,94,0.26))] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/75">Heart-to-Heart with Dr. Hadi</p>
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Protecting the Pump</h1>
              <p className="max-w-2xl text-lg text-white/90 sm:text-xl">The High-Tech Heart Podcast</p>
              <p className="max-w-2xl text-sm text-white/80 sm:text-base">
                A high-performance cardiology podcast blending advanced diagnostics, practical patient education, and real clinic stories.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <Card className="border-white/20 bg-black/20 text-white">
                  <CardContent className="p-4">
                    <p className="text-2xl font-bold">Top 1%</p>
                    <p className="text-xs text-white/70">Cardio-focused podcast concept</p>
                  </CardContent>
                </Card>
                <Card className="border-white/20 bg-black/20 text-white">
                  <CardContent className="p-4">
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-xs text-white/70">Core advanced clinical pillars</p>
                  </CardContent>
                </Card>
                <Card className="border-white/20 bg-black/20 text-white">
                  <CardContent className="p-4">
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-xs text-white/70">Mission: better patient outcomes</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#latest-episode"
                  className="rounded-xl bg-[#f43f5e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  Play Episode 1
                </a>
                <a
                  href="#ask"
                  className="rounded-xl border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Ask Dr. Hadi
                </a>
                <a
                  href="#platforms"
                  className="rounded-xl border border-sky-200/45 bg-sky-400/15 px-5 py-2.5 text-sm font-semibold text-sky-100 transition hover:bg-sky-400/25"
                >
                  Subscribe
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/25 bg-white/10 p-3 backdrop-blur">
              <p className="mb-2 text-sm font-semibold text-white/90">Official Artwork</p>
              <div className="overflow-hidden rounded-xl border border-white/25 bg-white">
                <Image
                  src="/images/heart-to-heart-dr-hadi.jpg"
                  alt="Heart-to-Heart with Dr. Hadi podcast art"
                  width={896}
                  height={1152}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          <section id="latest-episode" className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 rounded-3xl border border-white/20 bg-white p-6 text-[#0f172a]">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3">
                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Episode 1: The Vision</h2>
                <p className="text-sm text-[#0f172a]/75">
                  A polished player section ready for YouTube/Spotify embed links, complete with chapter markers and CTAs.
                </p>
                <div className="rounded-2xl border border-[#0f172a]/15 bg-[#f7fafb] p-4">
                  <div className="flex items-center justify-between text-xs text-[#0f172a]/70">
                    <span>Now Playing</span>
                    <span>32:10</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-[#0f172a]/15">
                    <div className="h-2 w-[42%] rounded-full bg-[#f43f5e]" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="rounded-lg bg-[#f43f5e] px-4 py-2 text-sm font-semibold text-white hover:bg-red-500">
                      ▶ Play
                    </button>
                    <button className="rounded-lg border border-[#0f172a]/20 px-4 py-2 text-sm font-semibold hover:bg-[#0f172a]/5">
                      + Add to Queue
                    </button>
                    <button className="rounded-lg border border-[#0f172a]/20 px-4 py-2 text-sm font-semibold hover:bg-[#0f172a]/5">
                      Share
                    </button>
                  </div>
                </div>
              </div>

              <Card className="border-[#0f172a]/15 bg-[#f7fafb] text-[#0f172a]">
                <CardHeader>
                  <CardTitle className="text-base">Chapter Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {episodeChapters.map((chapter) => (
                    <div key={chapter.time} className="flex items-start gap-3 rounded-lg border border-[#0f172a]/12 bg-white p-2.5">
                      <span className="rounded-md bg-[#0f172a] px-2 py-1 text-xs font-semibold text-white">{chapter.time}</span>
                      <p className="text-sm font-medium">{chapter.title}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 space-y-4">
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">The Tech Suite</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {featureCards.map((item) => (
                <Card key={item.title} className="border-white/20 bg-white/10 text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-[#f43f5e]/55">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-white/85">{item.copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <PumpPerformanceStudio />
          <SymptomEpisodeMatcher />

          <section className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <Card className="border-white/20 bg-white/10 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-black">Fuel for the Pump</CardTitle>
                <p className="text-sm text-white/80">Mediterranean nutrition segment for practical weekly habits.</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-lg font-semibold text-[#f43f5e]">Recipe of the Week: Lemon-Herb Grilled Salmon</p>
                <p className="text-sm text-white/85">
                  Cardio-supportive meal with omega-3 rich protein, anti-inflammatory herbs, and simple prep for busy schedules.
                </p>
              </CardContent>
            </Card>

            <Card id="platforms" className="border-white/20 bg-black/20 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-black">Subscribe Everywhere</CardTitle>
                <p className="text-sm text-white/80">Launch links can be connected when channels go live.</p>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2">
                <button className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-left text-sm font-semibold hover:bg-white/20">
                  Spotify
                </button>
                <button className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-left text-sm font-semibold hover:bg-white/20">
                  YouTube
                </button>
                <button className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-left text-sm font-semibold hover:bg-white/20">
                  Instagram
                </button>
                <button className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-left text-sm font-semibold hover:bg-white/20">
                  Apple Podcasts
                </button>
              </CardContent>
            </Card>
          </section>

          <section id="ask" className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 rounded-3xl border border-[#f43f5e]/60 bg-[#f43f5e]/20 p-6">
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Ask Dr. Hadi</h2>
            <p className="mt-2 text-sm text-white/90">Send non-urgent podcast questions and topics to:</p>
            <a
              href="mailto:hadiheartdoc@gmail.com"
              className="mt-4 inline-block rounded-xl bg-white px-5 py-2.5 text-base font-semibold text-[#0f172a] transition hover:bg-zinc-100"
            >
              hadiheartdoc@gmail.com
            </a>
            <div className="mt-5 flex flex-wrap gap-2">
              {["PET CT explained", "POTS patient tips", "What is stress echo?", "Mediterranean diet basics"].map((topic) => (
                <span key={topic} className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white/90">
                  {topic}
                </span>
              ))}
            </div>
          </section>

          <section className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 grid gap-4 rounded-3xl border border-white/20 bg-white/10 p-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">Scan to Subscribe</h3>
              <p className="mt-2 text-sm text-white/80">Use the QR code in the podcast artwork.</p>
              <div className="mt-3 max-w-[260px] overflow-hidden rounded-xl border border-white/30 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
                <Image
                  src="/images/heart-to-heart-dr-hadi.jpg"
                  alt="Heart-to-Heart podcast art with QR code"
                  width={896}
                  height={1152}
                  className="h-auto w-full object-cover object-bottom"
                />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Episode 1 Setup Questions</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-white/85">
                {setupQuestions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>
          </section>

          <footer className="rounded-xl border border-white/20 bg-black/25 px-4 py-3 text-xs text-white/75">
            The content provided is for educational purposes only and does not constitute medical advice.
          </footer>
        </div>
      </div>
    </main>
  );
}
