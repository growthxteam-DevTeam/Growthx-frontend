import type { LucideIcon } from "lucide-react";

export interface ActionCardConfig {
  title: string;
  description: string;
  buttonLabel: string;
  icon: LucideIcon;
  /** When set, the button navigates here; otherwise it does nothing yet. */
  href?: string;
  /** Small pill in the card's top-right corner, e.g. "Coming Soon" or "In 5 mins". */
  badge?: { label: string; tone: "warning" | "success" };
}

export interface CredibilityStep {
  label: string;
  complete: boolean;
}
