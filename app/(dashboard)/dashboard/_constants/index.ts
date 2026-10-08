import { AlarmClockCheck, Building2, FileText, Handshake } from "lucide-react";

import type { ActionCardConfig, CredibilityStep } from "../_types";

// TODO: everything below is placeholder content from the design — replace with API data
// once program, schedule, announcement and progress endpoints exist.
export const PROGRAM = {
  label: "Program",
  title: "Zero to Launch",
  duration: "6 weeks",
  leader: "Sarah A.B",
  cohortMembers: 32,
};

export const ACTION_CARDS: ActionCardConfig[] = [
  {
    title: "Next Class",
    description: "Your next class is: Business Acumen",
    buttonLabel: "Go to Class",
    icon: AlarmClockCheck,
    href: "/class",
  },
  {
    title: "My Modules",
    description: "Check out the modules for this program",
    buttonLabel: "Go to Modules",
    icon: FileText,
  },
  {
    title: "Meet your Peers",
    description: "Interact with other learners in this cohort, share ideas and build networks",
    buttonLabel: "Join",
    icon: Handshake,
  },
  {
    title: "Co-working Lab",
    description: "Check out the modules for this program",
    buttonLabel: "Request to Join",
    icon: Building2,
    comingSoon: true,
  },
];

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const SCHEDULE = {
  year: 2026,
  defaultMonth: 8,
  eventDates: [new Date(2026, 8, 9), new Date(2026, 8, 13), new Date(2026, 8, 24)],
};

export const ANNOUNCEMENT_MESSAGE =
  "The next open day will be happening in Kenya on 23/12/2026. Founders will have access to pitch to investors.";

export const CREDIBILITY = {
  title: "Your path to investor-ready credibility badge",
  progress: 15,
  steps: [
    { label: "Curriculum", complete: true },
    { label: "Project", complete: true },
    { label: "Peer review", complete: true },
  ] as CredibilityStep[],
  summary: {
    title: "Core curriculum complete",
    weeks: "Weeks 1 to 6",
    description: "All four weekly modules and live sessions completed.",
  },
};
