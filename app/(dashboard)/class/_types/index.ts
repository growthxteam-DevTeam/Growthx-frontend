import type { LucideIcon } from "lucide-react";

export interface ClassModule {
  title: string;
  meta: string;
}

export interface CurrentClass {
  id: string;
  title: string;
  presenter: string;
  duration: string;
  videoUrl: string;
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
  /** Defaults to the filled "default" button style. */
  primaryVariant?: "default" | "outline";
  secondaryLabel: string;
  secondaryIcon: LucideIcon;
  /** Locked cards render greyed out until their stage opens. */
  locked: boolean;
}
