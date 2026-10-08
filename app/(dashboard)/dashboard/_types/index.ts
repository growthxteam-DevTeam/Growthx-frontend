import type { LucideIcon } from "lucide-react";

export interface ActionCardConfig {
  title: string;
  description: string;
  buttonLabel: string;
  icon: LucideIcon;
  /** When set, the button navigates here; otherwise it does nothing yet. */
  href?: string;
  comingSoon?: boolean;
}

export interface CredibilityStep {
  label: string;
  complete: boolean;
}
