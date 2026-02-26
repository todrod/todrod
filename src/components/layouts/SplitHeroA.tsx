import type { ReactNode } from "react";
import { LayoutFrame } from "@/components/layouts/LayoutFrame";

export function SplitHeroA({ header, sidebar, aside, footer, children }: { header: ReactNode; sidebar?: ReactNode; aside?: ReactNode; footer: ReactNode; children: ReactNode }) {
  return <LayoutFrame mode="split" header={header} sidebar={sidebar} aside={aside} footer={footer}>{children}</LayoutFrame>;
}
