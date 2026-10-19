import { Download, Upload } from "lucide-react";

import type { AssignmentCardConfig, ClassModule, PreviousClass } from "../_types";

// TODO: placeholder content — replace with API data once class endpoints exist.
export const CURRENT_CLASS = {
  // Also the discussion thread key: every class gets its own comment thread.
  id: "week-4-pricing-your-product",
  title: "Week 4: Pricing your product",
  presenter: "Tunde Adelakun",
  duration: "12 min",
  // Swap for the class recording. youtube.com/watch, youtu.be and /embed links all work.
  videoUrl: "https://www.youtube.com/watch?v=qgYuwG6JZq8",
};

// Shown over the video until the learner presses "Join Class".
export const CLASS_INTRO = {
  program: "Zero to Launch",
  message: "The next class is how to write a pitch deck, it started 5 mins ago",
  buttonLabel: "Join Class",
};

// Shown over the video when it finishes playing.
export const CLASS_COMPLETE = {
  title: "Lesson complete",
  message: "Check what you learned with a short quiz.",
  quizLabel: "Take Quiz",
  replayLabel: "Replay Lesson",
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
    meta: "23 peers joined · 2 days ago",
    videoUrl: "https://www.youtube.com/watch?v=qgYuwG6JZq8",
  },
  {
    title: "Week 2: Pricing your product",
    meta: "23 peers joined · 2 days ago",
    videoUrl: "https://www.youtube.com/watch?v=mkeo6Ff3798",
  },
  {
    title: "Week 3: Pricing your product",
    meta: "19 peers joined · 3 days ago",
    videoUrl: "https://www.youtube.com/watch?v=AYRYu3DgVk8",
  },
];

export const ASSIGNMENT_CARDS: AssignmentCardConfig[] = [
  {
    title: "Assignment Submission",
    description: "Please review the instructions and upload your assignment when ready. Submission is open.",
    primaryLabel: "Upload Assignment",
    primaryIcon: Upload,
    secondaryLabel: "Download Instructions",
    secondaryIcon: Download,
    locked: false,
  },
  {
    title: "Peer Review",
    description: "Please review your peers' assignment and grade them based on the grading criteria provided.",
    primaryLabel: "Download Peer Assignment",
    primaryIcon: Download,
    primaryVariant: "outline",
    secondaryLabel: "Download Grading Criteria",
    secondaryIcon: Download,
    locked: false,
  },
  {
    title: "Final Project",
    description: "Please review the instructions and upload your assignment when ready. Submission is open.",
    primaryLabel: "Upload Assignment",
    primaryIcon: Upload,
    secondaryLabel: "Download Instructions",
    secondaryIcon: Download,
    locked: true,
  },
];

