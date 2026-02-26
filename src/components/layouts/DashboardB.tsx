import type { ReactNode } from "react";
import { LayoutFrame } from "@/components/layouts/LayoutFrame";

type DashboardBProps = {
  header: ReactNode;
  sidebar?: ReactNode;
  aside?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function DashboardB({ header, sidebar, aside, footer, children }: DashboardBProps) {
  return <LayoutFrame mode="sidebar-right" header={header} sidebar={sidebar} aside={aside} footer={footer}>{children}</LayoutFrame>;
}
