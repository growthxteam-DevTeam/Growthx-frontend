import { AlarmClockCheck, Building2, FileText, Handshake } from "lucide-react";

import type { ActionCardConfig, CredibilityStep } from "../_types";

// The program banner, calendar, announcements and to-do list come from GET /dashboard (see
// _hooks/useDashboardContent). TODO: the action cards and credibility progress below are still
// placeholder content from the design.
export const ACTION_CARDS: ActionCardConfig[] = [
  {
    id: "nextClass",
    icon: AlarmClockCheck,
    href: "/class",
    badgeTone: "warning",
  },
  { id: "modules", icon: FileText, href: "/class" },
  { id: "peers", icon: Handshake },
  { id: "coworking", icon: Building2, badgeTone: "success" },
];

export const CREDIBILITY = {
  progress: 40,
  steps: [
    { id: "curriculum", status: "current" },
    { id: "project", status: "locked" },
    { id: "peerReview", status: "locked" },
  ] as CredibilityStep[],
};
