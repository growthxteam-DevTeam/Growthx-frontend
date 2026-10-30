import type { LucideIcon } from "lucide-react";

export interface ActionCardConfig {
  /** Key under `Dashboard.home.cards` in the translation files. */
  id: "nextClass" | "modules" | "peers" | "coworking";
  icon: LucideIcon;
  /** When set, the button navigates here; otherwise it does nothing yet. */
  href?: string;
  /** Small pill in the card's top-right corner; its text is `cards.<id>.badge`. */
  badgeTone?: "warning" | "success";
}

export type CredibilityStepStatus = "complete" | "current" | "locked";

export interface CredibilityStep {
  /** Key under `Dashboard.home.credibility.steps`. */
  id: "curriculum" | "project" | "peerReview";
  status: CredibilityStepStatus;
}
