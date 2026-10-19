import type { LucideIcon } from "lucide-react";

export interface ResourceItem {
  id: string;
  sourceLabel: string;
  sourceIcon: LucideIcon;
  /** Right-aligned label on the first row: a read/watch time or a file type. */
  typeBadge: string;
  title: string;
  /** Shows the "Recommended for you" line. */
  recommended?: boolean;
  tag: string;
}
