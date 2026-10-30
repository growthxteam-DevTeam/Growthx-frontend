import { Building2, Compass, MessagesSquare, Archive, Users, type LucideIcon } from "lucide-react";

export interface SidebarLink {
  /** Key under the `Sidebar` translation namespace. */
  labelKey: "dashboard" | "discussion" | "community" | "resourceVault" | "coworkingLab";
  href: string;
  icon: LucideIcon;
  /** Pages reached from this item that should keep it highlighted. */
  alsoActiveOn?: string[];
}

// Only the dashboard, discussion forum, community and resource vault pages exist so far; the rest are placeholders.
export const SIDEBAR_LINKS: SidebarLink[] = [
  { labelKey: "dashboard", href: "/dashboard", icon: Compass, alsoActiveOn: ["/class"] },
  { labelKey: "discussion", href: "/discussion", icon: Users },
  { labelKey: "community", href: "/community", icon: MessagesSquare, alsoActiveOn: ["/community"] },
  { labelKey: "resourceVault", href: "/resource-vault", icon: Archive },
  { labelKey: "coworkingLab", href: "#", icon: Building2 },
];

// Settings shared by every comment thread (class page, discussion forum).
export const DISCUSSION_PAGE_SIZE = 5;
export const DISCUSSION_POLL_INTERVAL_MS = 15_000;
