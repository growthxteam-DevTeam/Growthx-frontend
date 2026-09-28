import type { z } from "zod";

import type {
  accessibilitySupportSchema,
  applicationPortalSchema,
  businessBasicsSchema,
  personalInfoSchema,
  submitStepSchema,
  whoYouAreSchema,
} from "../_constants";

export type ApplicationPortalValues = z.infer<typeof applicationPortalSchema>;
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
export type BusinessBasicsValues = z.infer<typeof businessBasicsSchema>;
export type WhoYouAreValues = z.infer<typeof whoYouAreSchema>;
export type AccessibilitySupportValues = z.infer<typeof accessibilitySupportSchema>;
export type SubmitStepValues = z.infer<typeof submitStepSchema>;

export type OnboardingWizardStep = "portal" | "application" | "success";

export type { OnboardingTabId } from "../_constants";
