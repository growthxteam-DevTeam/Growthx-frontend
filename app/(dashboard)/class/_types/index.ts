import type { LucideIcon } from "lucide-react";

export interface ClassModule {
  title: string;
  meta: string;
}

export interface PreviousClass {
  title: string;
  meta: string;
  videoUrl: string;
}

export interface AssignmentCardConfig {
  title: string;
  description: string;
  primaryLabel: string;
  primaryIcon: LucideIcon;
  secondaryLabel: string;
  secondaryIcon: LucideIcon;
  /** Locked cards render greyed out until their stage opens. */
  locked: boolean;
}
