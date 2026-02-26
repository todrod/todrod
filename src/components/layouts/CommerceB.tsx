import type { ReactNode } from "react";
import { LayoutFrame } from "@/components/layouts/LayoutFrame";

type CommerceBProps = {
  header: ReactNode;
  sidebar?: ReactNode;
  aside?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function CommerceB({ header, sidebar, aside, footer, children }: CommerceBProps) {
  return <LayoutFrame mode="single" header={header} sidebar={sidebar} aside={aside} footer={footer}>{children}</LayoutFrame>;
}
