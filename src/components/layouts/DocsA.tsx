import type { ReactNode } from "react";
import { LayoutFrame } from "@/components/layouts/LayoutFrame";

type DocsAProps = {
  header: ReactNode;
  sidebar?: ReactNode;
  aside?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function DocsA({ header, sidebar, aside, footer, children }: DocsAProps) {
  return <LayoutFrame mode="sidebar-left" header={header} sidebar={sidebar} aside={aside} footer={footer}>{children}</LayoutFrame>;
}
