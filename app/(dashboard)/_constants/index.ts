import { Building2, Compass, MessagesSquare, Archive, Users, type LucideIcon } from "lucide-react";

export interface SidebarLink {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Pages reached from this item that should keep it highlighted. */
  alsoActiveOn?: string[];
}

// Only the dashboard has a page so far; the other entries are placeholders.
export const SIDEBAR_LINKS: SidebarLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: Compass, alsoActiveOn: ["/class"] },
  { label: "Discussion", href: "#", icon: Users },
  { label: "Community", href: "#", icon: MessagesSquare },
  { label: "Resource Vault", href: "#", icon: Archive },
  { label: "Coworking Lab", href: "#", icon: Building2 },
];
