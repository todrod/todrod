import type { ReactNode } from "react";
import { LayoutFrame } from "@/components/layouts/LayoutFrame";

type CommerceAProps = {
  header: ReactNode;
  sidebar?: ReactNode;
  aside?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function CommerceA({ header, sidebar, aside, footer, children }: CommerceAProps) {
  return <LayoutFrame mode="sidebar-left" header={header} sidebar={sidebar} aside={aside} footer={footer}>{children}</LayoutFrame>;
}
