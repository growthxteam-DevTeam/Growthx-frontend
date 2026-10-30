import { AlarmClockCheck, Building2, FileText, Handshake } from "lucide-react";

import type { ActionCardConfig, CredibilityStep } from "../_types";

// TODO: everything below is placeholder content from the design — replace with API data
// once program, schedule, announcement and progress endpoints exist.
export const PROGRAM = {
  // Program names stay in English in every language, like the onboarding's program options.
  title: "Zero to Launch",
  durationWeeks: 6,
  leader: "Sarah A.B",
  cohortMembers: 32,
};

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

export const SCHEDULE = {
  year: 2026,
  defaultMonth: 8,
  eventDates: [new Date(2026, 8, 9), new Date(2026, 8, 13), new Date(2026, 8, 24)],
};

export const TODO_ITEMS = [
  { id: 1, key: "quiz2", points: 20 },
  { id: 2, key: "peerReviewAssignment", points: 20 },
  { id: 3, key: "peerReviewWeek1", points: 20 },
  { id: 4, key: "peerReviewWeek1", points: 20 },
] as const;

export const CREDIBILITY = {
  progress: 40,
  steps: [
    { id: "curriculum", status: "current" },
    { id: "project", status: "locked" },
    { id: "peerReview", status: "locked" },
  ] as CredibilityStep[],
};
