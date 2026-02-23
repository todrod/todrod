import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/content/site";
import { statusBadgeClass } from "@/lib/site-utils";

type StatusBadgeProps = {
  status: ProjectStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className={`border ${statusBadgeClass(status)}`}>
      {status}
    </Badge>
  );
}
