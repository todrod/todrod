import Link from "next/link";
import { Button } from "@/components/ui/button";
import { echoBootcampHref } from "@/lib/urls";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/lab", label: "Lab" },
  { href: "/log", label: "Log" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          todrod
        </Link>
        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            asChild
            size="sm"
            className="bg-cyan-500 text-slate-950 shadow-[0_0_18px_rgba(6,182,212,0.45)] transition hover:bg-cyan-400"
          >
            <a href={echoBootcampHref}>Echo Bootcamp</a>
          </Button>
        </div>
        <nav aria-label="Primary mobile" className="flex items-center gap-1 sm:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-2 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
