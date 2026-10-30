import { Download, Upload } from "lucide-react";

import type { AssignmentCardConfig, ClassModule, PreviousClass } from "../_types";

// TODO: placeholder content — replace with API data once class endpoints exist. Its text lives in the
// `Dashboard.class` translation messages.
export const CURRENT_CLASS = {
  // Also the discussion thread key: every class gets its own comment thread.
  id: "week-4-pricing-your-product",
  presenter: "Tunde Adelakun",
  durationMinutes: 12,
  // Swap for the class recording. youtube.com/watch, youtu.be and /embed links all work.
  videoUrl: "https://www.youtube.com/watch?v=qgYuwG6JZq8",
};

// Program names stay in English in every language.
export const CLASS_INTRO_PROGRAM = "Zero to Launch";

export const MODULES: ClassModule[] = [
  { id: "introduction", minutes: 10 },
  { id: "welcome", minutes: 10 },
  { id: "makeMost", minutes: 10 },
  { id: "pricing", minutes: 10 },
  { id: "pricing", minutes: 10 },
];

export const PREVIOUS_CLASSES: PreviousClass[] = [
  { week: 1, peersJoined: 23, daysAgo: 2, videoUrl: "https://www.youtube.com/watch?v=qgYuwG6JZq8" },
  { week: 2, peersJoined: 23, daysAgo: 2, videoUrl: "https://www.youtube.com/watch?v=mkeo6Ff3798" },
  { week: 3, peersJoined: 19, daysAgo: 3, videoUrl: "https://www.youtube.com/watch?v=AYRYu3DgVk8" },
];

export const ASSIGNMENT_CARDS: AssignmentCardConfig[] = [
  { id: "submission", primaryIcon: Upload, secondaryIcon: Download, locked: false },
  { id: "peerReview", primaryIcon: Download, primaryVariant: "outline", secondaryIcon: Download, locked: false },
  { id: "finalProject", primaryIcon: Upload, secondaryIcon: Download, locked: true },
];
