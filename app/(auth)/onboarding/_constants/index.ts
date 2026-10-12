import { z } from "zod";

// `labelKey` is a key under the `Onboarding.options` messages namespace; `value` is sent to the backend.
export interface OptionConfig {
  value: string;
  labelKey: string;
}

export const applicationPortalSchema = z.object({
  fullName: z.string().trim().min(2, "fullNameRequired"),
  email: z.email("emailInvalid").trim(),
  program: z.string().min(1, "programRequired"),
  cohort: z.string().optional(),
});

export const PROGRAM_OPTIONS: OptionConfig[] = [
  { labelKey: "program.zero-to-launch", value: "zero-to-launch" },
  { labelKey: "program.build-for-funding", value: "build-for-funding" },
  { labelKey: "program.scale-your-sales", value: "scale-your-sales" },
  { labelKey: "program.price-for-profit", value: "price-for-profit" },
  { labelKey: "program.lead-your-team", value: "lead-your-team" },
];

export const COHORT_OPTIONS: OptionConfig[] = [
  { labelKey: "cohort.cohort-1", value: "cohort-1" },
  { labelKey: "cohort.cohort-2", value: "cohort-2" },
  { labelKey: "cohort.cohort-3", value: "cohort-3" },
  { labelKey: "cohort.cohort-4", value: "cohort-4" },
];

export const personalInfoSchema = z.object({
  title: z.string().optional(),
  surname: z.string().trim().min(1, "surnameRequired"),
  firstName: z.string().trim().min(1, "firstNameRequired"),
  businessName: z.string().trim().min(1, "businessNameRequired"),
  dateOfBirth: z.date({ error: "dateOfBirthRequired" }),
  gender: z.string().min(1, "genderRequired"),
});

// TODO: placeholder values — swap for the real options list.
export const GENDER_OPTIONS: OptionConfig[] = [
  { labelKey: "gender.male", value: "male" },
  { labelKey: "gender.female", value: "female" },
  { labelKey: "gender.undisclosed", value: "undisclosed" },
];

export const businessBasicsSchema = z.object({
  businessDescription: z.string().trim().min(10, "businessDescriptionMin"),
  operatingDuration: z.enum(
    ["less-than-6-months", "6-months-to-1-year", "1-3-years", "3-5-years", "more-than-5-years"],
    { error: "operatingDurationRequired" },
  ),
  averageRevenue: z.enum(["no-revenue-yet", "early-revenue", "growing-revenue", "significant-revenue"], {
    error: "averageRevenueRequired",
  }),
  fullTimeCommitment: z.enum(["full-time", "not-yet"], { error: "optionRequired" }),
});

export const OPERATING_DURATION_OPTIONS: OptionConfig[] = [
  { labelKey: "operatingDuration.less-than-6-months", value: "less-than-6-months" },
  { labelKey: "operatingDuration.6-months-to-1-year", value: "6-months-to-1-year" },
  { labelKey: "operatingDuration.1-3-years", value: "1-3-years" },
  { labelKey: "operatingDuration.3-5-years", value: "3-5-years" },
  { labelKey: "operatingDuration.more-than-5-years", value: "more-than-5-years" },
];

export const AVERAGE_REVENUE_OPTIONS: OptionConfig[] = [
  { labelKey: "averageRevenue.no-revenue-yet", value: "no-revenue-yet" },
  { labelKey: "averageRevenue.early-revenue", value: "early-revenue" },
  { labelKey: "averageRevenue.growing-revenue", value: "growing-revenue" },
  { labelKey: "averageRevenue.significant-revenue", value: "significant-revenue" },
];

export const FULL_TIME_COMMITMENT_OPTIONS: OptionConfig[] = [
  { labelKey: "fullTimeCommitment.full-time", value: "full-time" },
  { labelKey: "fullTimeCommitment.not-yet", value: "not-yet" },
];

export const whoYouAreSchema = z.object({
  challengeAndSkillGap: z.string().trim().min(10, "challengeAndSkillGapMin"),
  cohortMotivation: z.string().trim().min(10, "cohortMotivationMin"),
});

export const ACCESSIBILITY_NEED_VALUES = [
  "vision",
  "hearing",
  "mobility",
  "cognitive",
  "speech",
  "other",
  "undisclosed",
] as const;

export const accessibilitySupportSchema = z
  .object({
    hasAccessibilityNeeds: z.enum(["yes", "no"], { error: "pleaseSelectOption" }),
    accessibilityNeed: z.enum(ACCESSIBILITY_NEED_VALUES).optional(),
  })
  .refine((values) => values.hasAccessibilityNeeds !== "yes" || !!values.accessibilityNeed, {
    message: "pleaseSelectOption",
    path: ["accessibilityNeed"],
  });

export const ACCESSIBILITY_NEED_OPTIONS: OptionConfig[] = [
  { labelKey: "accessibilityNeed.vision", value: "vision" },
  { labelKey: "accessibilityNeed.hearing", value: "hearing" },
  { labelKey: "accessibilityNeed.mobility", value: "mobility" },
  { labelKey: "accessibilityNeed.cognitive", value: "cognitive" },
  { labelKey: "accessibilityNeed.speech", value: "speech" },
  { labelKey: "accessibilityNeed.other", value: "other" },
  { labelKey: "accessibilityNeed.undisclosed", value: "undisclosed" },
];

export const ACCESSIBILITY_OPTIONS: OptionConfig[] = [
  { labelKey: "hasAccessibilityNeeds.yes", value: "yes" },
  { labelKey: "hasAccessibilityNeeds.no", value: "no" },
];

export const submitStepSchema = z.object({
  passportPhoto: z.instanceof(File).optional(),
});

export const PASSPORT_PHOTO_ACCEPT = ["image/jpeg", "image/png"];
export const PASSPORT_PHOTO_MAX_BYTES = 2 * 1024 * 1024; // 2 MB

// TODO: this is application metadata that should come from the step-1
// submission (and eventually an API) once that response shape is defined.
export const APPLICATION_META = {
  programTitle: "Zero to Launch Program",
  applicationNumber: "Z2LOB001",
  cohortLabel: "2026/2027 Batch A",
  programFee: "$150",
  deadline: "19/09/26",
};

export type OnboardingTabId = "personal-info" | "business-basics" | "who-you-are" | "accessibility-support" | "submit";

export interface OnboardingTabConfig {
  id: OnboardingTabId;
  progress: number;
  /** false until that tab's design and fields are known. */
  enabled: boolean;
}

export const ONBOARDING_TABS: OnboardingTabConfig[] = [
  { id: "personal-info", progress: 15, enabled: true },
  { id: "business-basics", progress: 25, enabled: true },
  { id: "who-you-are", progress: 65, enabled: true },
  { id: "accessibility-support", progress: 95, enabled: true },
  { id: "submit", progress: 65, enabled: true },
];
