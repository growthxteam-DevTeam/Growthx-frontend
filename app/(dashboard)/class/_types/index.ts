import type { LucideIcon } from "lucide-react";

export interface ClassModule {
  /** Key under `Dashboard.class.modules.items`. */
  id: "introduction" | "welcome" | "makeMost" | "pricing";
  minutes: number;
}

export interface PreviousClass {
  week: number;
  peersJoined: number;
  daysAgo: number;
  videoUrl: string;
}

export interface AssignmentCardConfig {
  /** Key under `Dashboard.class.assignments`. */
  id: "submission" | "peerReview" | "finalProject";
  primaryIcon: LucideIcon;
  /** Defaults to the filled "default" button style. */
  primaryVariant?: "default" | "outline";
  secondaryIcon: LucideIcon;
  /** Locked cards render greyed out until their stage opens. */
  locked: boolean;
}
