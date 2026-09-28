import { z } from "zod";

import type { FrameworkT } from "@/types/global";

export const applicationPortalSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  email: z.email("Enter a valid email address").trim(),
  program: z.string().min(1, "Select a program"),
  cohort: z.string().optional(),
});

// TODO: placeholder values — swap for the real program/cohort list.
export const PROGRAM_OPTIONS: FrameworkT[] = [
  { label: "Product Design", value: "product-design" },
  { label: "Software Engineering", value: "software-engineering" },
  { label: "Data Analytics", value: "data-analytics" },
];

export const COHORT_OPTIONS: FrameworkT[] = [
  { label: "Cohort 1 (Jan 2026)", value: "cohort-1" },
  { label: "Cohort 2 (Apr 2026)", value: "cohort-2" },
];

export const personalInfoSchema = z.object({
  title: z.string().optional(),
  surname: z.string().trim().min(1, "Surname is required"),
  firstName: z.string().trim().min(1, "First name is required"),
  businessName: z.string().trim().min(1, "Business name is required"),
  dateOfBirth: z.date({ error: "Date of birth is required" }),
  gender: z.string().min(1, "Select a gender"),
});

// TODO: placeholder values — swap for the real options list.
export const GENDER_OPTIONS: FrameworkT[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Prefer not to say", value: "undisclosed" },
];

export const businessBasicsSchema = z.object({
  businessDescription: z.string().trim().min(10, "Tell us more about your business"),
  operatingDuration: z.enum(
    ["less-than-6-months", "6-months-to-1-year", "1-3-years", "3-5-years", "more-than-5-years"],
    { error: "Select how long you've been operating" },
  ),
  averageRevenue: z.enum(
    ["no-revenue-yet", "early-revenue", "growing-revenue", "significant-revenue"],
    { error: "Select your average revenue" },
  ),
  fullTimeCommitment: z.enum(["full-time", "not-yet"], { error: "Select an option" }),
});

export const OPERATING_DURATION_OPTIONS: FrameworkT[] = [
  { label: "Less than 6 months", value: "less-than-6-months" },
  { label: "6 months to 1 year", value: "6-months-to-1-year" },
  { label: "1-3 years", value: "1-3-years" },
  { label: "3-5 years", value: "3-5-years" },
  { label: "More than 5 years", value: "more-than-5-years" },
];

export const AVERAGE_REVENUE_OPTIONS: FrameworkT[] = [
  { label: "No revenue yet, but have paying interest or pilots", value: "no-revenue-yet" },
  { label: "Early revenue (under ₦500k/month)", value: "early-revenue" },
  { label: "Growing revenue (₦500k – ₦5m/month)", value: "growing-revenue" },
  { label: "Significant revenue (above ₦5m/month)", value: "significant-revenue" },
];

export const FULL_TIME_COMMITMENT_OPTIONS: FrameworkT[] = [
  { label: "Yes, Full-Time", value: "full-time" },
  { label: "Not Yet, planning to be", value: "not-yet" },
];

export const whoYouAreSchema = z.object({
  challengeAndSkillGap: z.string().trim().min(10, "Tell us more — both the win and the gap"),
  cohortMotivation: z.string().trim().min(10, "Tell us more about why now and what outcome you want"),
});

export const accessibilitySupportSchema = z.object({
  hasAccessibilityNeeds: z.enum(["yes", "no"], { error: "Please select an option" }),
});

export const ACCESSIBILITY_OPTIONS: FrameworkT[] = [
  { label: "Yes, I have accessibility needs", value: "yes" },
  { label: "No, I don't have accessibility needs", value: "no" },
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

export type OnboardingTabId =
  | "personal-info"
  | "business-basics"
  | "who-you-are"
  | "accessibility-support"
  | "submit";

export interface OnboardingTabConfig {
  id: OnboardingTabId;
  label: string;
  progress: number;
  /** false until that tab's design and fields are known. */
  enabled: boolean;
}

export const ONBOARDING_TABS: OnboardingTabConfig[] = [
  { id: "personal-info", label: "Personal info", progress: 15, enabled: true },
  { id: "business-basics", label: "Business Basics", progress: 25, enabled: true },
  { id: "who-you-are", label: "Who You Are", progress: 65, enabled: true },
  { id: "accessibility-support", label: "Accessibility & Support", progress: 95, enabled: true },
  { id: "submit", label: "Submit", progress: 65, enabled: true },
];
