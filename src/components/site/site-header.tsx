import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          todrod
        </Link>
        <div className="flex items-center gap-2">
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
