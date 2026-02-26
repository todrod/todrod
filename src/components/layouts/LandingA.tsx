import type { ReactNode } from "react";
import { LayoutFrame } from "@/components/layouts/LayoutFrame";

type LandingAProps = {
  header: ReactNode;
  sidebar?: ReactNode;
  aside?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function LandingA({ header, sidebar, aside, footer, children }: LandingAProps) {
  return <LayoutFrame mode="single" header={header} sidebar={sidebar} aside={aside} footer={footer}>{children}</LayoutFrame>;
}
