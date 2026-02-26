import type { ReactNode } from "react";
import { LayoutFrame } from "@/components/layouts/LayoutFrame";

type DashboardAProps = {
  header: ReactNode;
  sidebar?: ReactNode;
  aside?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function DashboardA({ header, sidebar, aside, footer, children }: DashboardAProps) {
  return <LayoutFrame mode="sidebar-left" header={header} sidebar={sidebar} aside={aside} footer={footer}>{children}</LayoutFrame>;
}
