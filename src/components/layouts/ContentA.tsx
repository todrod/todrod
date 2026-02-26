import type { ReactNode } from "react";
import { LayoutFrame } from "@/components/layouts/LayoutFrame";

type ContentAProps = {
  header: ReactNode;
  sidebar?: ReactNode;
  aside?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function ContentA({ header, sidebar, aside, footer, children }: ContentAProps) {
  return <LayoutFrame mode="split" header={header} sidebar={sidebar} aside={aside} footer={footer}>{children}</LayoutFrame>;
}
