import type { ReactNode } from "react";
import { LayoutFrame } from "@/components/layouts/LayoutFrame";

type AppAProps = {
  header: ReactNode;
  sidebar?: ReactNode;
  aside?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function AppA({ header, sidebar, aside, footer, children }: AppAProps) {
  return <LayoutFrame mode="single" header={header} sidebar={sidebar} aside={aside} footer={footer}>{children}</LayoutFrame>;
}
