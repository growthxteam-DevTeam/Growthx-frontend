import type { LucideIcon } from "lucide-react";

export interface ActionCardConfig {
  title: string;
  description: string;
  buttonLabel: string;
  icon: LucideIcon;
  comingSoon?: boolean;
}

export interface CredibilityStep {
  label: string;
  complete: boolean;
}
