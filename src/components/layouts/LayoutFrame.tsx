import type { ReactNode } from "react";

type LayoutFrameProps = {
  header?: ReactNode;
  sidebar?: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  mode: "single" | "split" | "sidebar-left" | "sidebar-right" | "three";
};

export function LayoutFrame({ header, sidebar, aside, footer, children, mode }: LayoutFrameProps) {
  if (mode === "single") {
    return (
      <div className="min-h-screen bg-[var(--tb-background)] text-[var(--tb-text)]">
        {header}
        <div className="mx-auto max-w-6xl p-6">{children}</div>
        {footer}
      </div>
    );
  }

  if (mode === "split") {
    return (
      <div className="min-h-screen bg-[var(--tb-background)] text-[var(--tb-text)]">
        {header}
        <div className="mx-auto grid max-w-6xl gap-6 p-6 lg:grid-cols-[2fr_1fr]">
          <div>{children}</div>
          <div>{aside}</div>
        </div>
        {footer}
      </div>
    );
  }

  if (mode === "sidebar-left") {
    return (
      <div className="min-h-screen bg-[var(--tb-background)] text-[var(--tb-text)]">
        {header}
        <div className="mx-auto grid max-w-7xl gap-6 p-6 lg:grid-cols-[260px_1fr]">
          <aside>{sidebar}</aside>
          <div>{children}</div>
        </div>
        {footer}
      </div>
    );
  }

  if (mode === "sidebar-right") {
    return (
      <div className="min-h-screen bg-[var(--tb-background)] text-[var(--tb-text)]">
        {header}
        <div className="mx-auto grid max-w-7xl gap-6 p-6 lg:grid-cols-[1fr_280px]">
          <div>{children}</div>
          <aside>{aside}</aside>
        </div>
        {footer}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--tb-background)] text-[var(--tb-text)]">
      {header}
      <div className="mx-auto grid max-w-7xl gap-6 p-6 lg:grid-cols-[230px_1fr_280px]">
        <aside>{sidebar}</aside>
        <div>{children}</div>
        <aside>{aside}</aside>
      </div>
      {footer}
    </div>
  );
}
