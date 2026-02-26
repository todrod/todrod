import type { ReactNode } from "react";
import { LayoutFrame } from "@/components/layouts/LayoutFrame";

type ExamAProps = {
  header: ReactNode;
  sidebar?: ReactNode;
  aside?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function ExamA({ header, sidebar, aside, footer, children }: ExamAProps) {
  return <LayoutFrame mode="sidebar-right" header={header} sidebar={sidebar} aside={aside} footer={footer}>{children}</LayoutFrame>;
}
