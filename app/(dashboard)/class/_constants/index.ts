import { Download, Upload } from "lucide-react";

import type { AssignmentCardConfig, ClassModule, PreviousClass } from "../_types";

// TODO: placeholder content — replace with API data once class endpoints exist.
export const CURRENT_CLASS = {
  // Also the discussion thread key: every class gets its own comment thread.
  id: "week-1-pricing-your-product",
  title: "Week 1: Pricing your product",
  // Swap for the class recording. youtube.com/watch, youtu.be and /embed links all work.
  videoUrl: "https://www.youtube.com/watch?v=qgYuwG6JZq8",
};

export const MODULES: ClassModule[] = [
  { title: "Course Introduction", meta: "Video · 10 mins" },
  { title: "Welcome and Overview", meta: "Video · 10 mins" },
  { title: "How to make the most of this course", meta: "Video · 10 mins" },
  { title: "Pricing your product", meta: "Video · 10 mins" },
  { title: "Pricing your product", meta: "Video · 10 mins" },
];

export const PREVIOUS_CLASSES: PreviousClass[] = [
  {
    title: "Week 1: Pricing your product",
    meta: "Posted 2 days ago",
    videoUrl: "https://www.youtube.com/watch?v=qgYuwG6JZq8",
  },
  {
    title: "Week 2: Pricing your product",
    meta: "Posted 2 days ago",
    videoUrl: "https://www.youtube.com/watch?v=mkeo6Ff3798",
  },
  {
    title: "Week 3: Pricing your product",
    meta: "Posted 2 days ago",
    videoUrl: "https://www.youtube.com/watch?v=AYRYu3DgVk8",
  },
];

export const ASSIGNMENT_CARDS: AssignmentCardConfig[] = [
  {
    title: "Assignment Submission",
    description: "Please review the class and submit your assignment before the deadline.",
    primaryLabel: "Upload Assignment",
    primaryIcon: Upload,
    secondaryLabel: "Download Instructions",
    secondaryIcon: Download,
    locked: false,
  },
  {
    title: "Peer Review",
    description: "Review your peers' submissions once the assignment window has closed.",
    primaryLabel: "Review Peer Assignment",
    primaryIcon: Download,
    secondaryLabel: "Download Review Guide",
    secondaryIcon: Download,
    locked: true,
  },
  {
    title: "Final Project",
    description: "Submit your final project after completing the peer review stage.",
    primaryLabel: "Upload Project",
    primaryIcon: Upload,
    secondaryLabel: "Download Instructions",
    secondaryIcon: Download,
    locked: true,
  },
];

export const DISCUSSION_PAGE_SIZE = 5;
export const DISCUSSION_POLL_INTERVAL_MS = 15_000;
