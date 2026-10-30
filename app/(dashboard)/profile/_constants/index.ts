import { CREDIBILITY } from "../../dashboard/_constants";

// TODO: placeholder content from the design. Preferences, consent and visibility have no settings
// endpoint yet, so changes only live in the page; the cohort number is not part of the login response.
// All visible text lives in the `Dashboard.profile` messages.
export const PROFILE = {
  cohortNumber: 4,
  badgeProgress: CREDIBILITY.progress,
  /** Masked on purpose: the real password is never available to the client. */
  passwordMask: "••••••••••••",
};

export type TextSize = "default" | "large" | "extraLarge";
export const TEXT_SIZES: TextSize[] = ["default", "large", "extraLarge"];

export type ProfileVisibility = "allFounders" | "myCohort" | "onlyMe";
export const PROFILE_VISIBILITIES: ProfileVisibility[] = ["allFounders", "myCohort", "onlyMe"];

export type PreferenceToggleId =
  | "captions"
  | "screenReader"
  | "highContrast"
  | "reduceMotion"
  | "dyslexiaFont"
  | "extendedQuiz";

/** Rows of "Accessibility and learning preferences", in display order (the text size select sits third). */
export const PREFERENCE_ROWS: ({ kind: "toggle"; id: PreferenceToggleId } | { kind: "textSize" })[] = [
  { kind: "toggle", id: "captions" },
  { kind: "toggle", id: "screenReader" },
  { kind: "textSize" },
  { kind: "toggle", id: "highContrast" },
  { kind: "toggle", id: "reduceMotion" },
  { kind: "toggle", id: "dyslexiaFont" },
  { kind: "toggle", id: "extendedQuiz" },
];

export const DEFAULT_PREFERENCES: Record<PreferenceToggleId, boolean> = {
  captions: true,
  screenReader: false,
  highContrast: false,
  reduceMotion: false,
  dyslexiaFont: false,
  extendedQuiz: false,
};
