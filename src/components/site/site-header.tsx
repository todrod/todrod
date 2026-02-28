import Link from "next/link";
import { Button } from "@/components/ui/button";
import { echoBootcampHref, festivalAppHref } from "@/lib/urls";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          todrod
        </Link>
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="bg-cyan-500 text-slate-950 shadow-[0_0_18px_rgba(6,182,212,0.45)] transition hover:bg-cyan-400"
          >
            <a href={echoBootcampHref}>Echo Bootcamp</a>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-rose-400 text-slate-950 shadow-[0_0_18px_rgba(251,113,133,0.4)] transition hover:bg-rose-300"
          >
            <a href={festivalAppHref}>Festival App</a>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-white/20 bg-black/20">
            <a href="https://www.thegoofytrooper.com" target="_blank" rel="noreferrer">
              The Goofy Trooper
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
