import type { ReactNode } from "react";
import { LayoutFrame } from "@/components/layouts/LayoutFrame";

type LandingBProps = {
  header: ReactNode;
  sidebar?: ReactNode;
  aside?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function LandingB({ header, sidebar, aside, footer, children }: LandingBProps) {
  return <LayoutFrame mode="split" header={header} sidebar={sidebar} aside={aside} footer={footer}>{children}</LayoutFrame>;
}
