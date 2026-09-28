"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSubmitApplicationMutation, type ApplicationRecord } from "@/redux/features/applications/applicationsApi";

import {
  ONBOARDING_TABS,
  accessibilitySupportSchema,
  applicationPortalSchema,
  businessBasicsSchema,
  personalInfoSchema,
  submitStepSchema,
  whoYouAreSchema,
} from "../_constants";
import type {
  AccessibilitySupportValues,
  ApplicationPortalValues,
  BusinessBasicsValues,
  OnboardingTabId,
  OnboardingWizardStep,
  PersonalInfoValues,
  SubmitStepValues,
  WhoYouAreValues,
} from "../_types";

// Extracts a displayable message from a NestJS ValidationPipe error response
// ({ message: string | string[] }) surfaced through RTK Query's error shape.
const getSubmitErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "data" in error) {
    const data = (error as { data?: unknown }).data;
    if (data && typeof data === "object" && "message" in data) {
      const message = (data as { message?: unknown }).message;
      if (Array.isArray(message)) return message.join(", ");
      if (typeof message === "string") return message;
    }
  }
  return "Something went wrong submitting your application. Please try again.";
};

export const useOnboarding = () => {
  const [wizardStep, setWizardStep] = useState<OnboardingWizardStep>("portal");
  const [activeTab, setActiveTab] = useState<OnboardingTabId>(ONBOARDING_TABS[0].id);
  const [submittedApplication, setSubmittedApplication] = useState<ApplicationRecord | null>(null);

  const [submitApplication, { isLoading: isSubmitStepSubmitting }] = useSubmitApplicationMutation();

  // Generic step-back: walks ONBOARDING_TABS' fixed order rather than
  // hardcoding a "previous tab" per step, so it stays correct as tabs are
  // added or reordered. Skips disabled tabs (e.g. "Accessibility & Support"
  // sits between "Who You Are" and "Submit" in the array but isn't designed
  // yet, so Back from Submit should land on "Who You Are", not on it).
  const goToPreviousTab = () => {
    const currentIndex = ONBOARDING_TABS.findIndex((tab) => tab.id === activeTab);
    for (let i = currentIndex - 1; i >= 0; i -= 1) {
      if (ONBOARDING_TABS[i].enabled) {
        setActiveTab(ONBOARDING_TABS[i].id);
        return;
      }
    }
  };

  const portalForm = useForm<ApplicationPortalValues>({
    resolver: zodResolver(applicationPortalSchema),
    defaultValues: {
      fullName: "",
      email: "",
      program: "",
      cohort: "",
    },
  });

  const onSubmitPortal = portalForm.handleSubmit((values) => {
    // No backend endpoint exists for this step on its own — its answers are
    // aggregated with every other step's and sent together in
    // onSubmitApplication, below.
    console.log("application portal answers", values);
    setWizardStep("application");
  });

  const personalInfoForm = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      title: "",
      surname: "",
      firstName: "",
      businessName: "",
      gender: "",
    },
  });

  const onSubmitPersonalInfo = personalInfoForm.handleSubmit((values) => {
    console.log("personal info answers", values);
    setActiveTab("business-basics");
  });

  const businessBasicsForm = useForm<BusinessBasicsValues>({
    resolver: zodResolver(businessBasicsSchema),
    defaultValues: {
      businessDescription: "",
    },
  });

  const onSubmitBusinessBasics = businessBasicsForm.handleSubmit((values) => {
    console.log("business basics answers", values);
    setActiveTab("who-you-are");
  });

  const whoYouAreForm = useForm<WhoYouAreValues>({
    resolver: zodResolver(whoYouAreSchema),
    defaultValues: {
      challengeAndSkillGap: "",
    },
  });

  const onSubmitWhoYouAre = whoYouAreForm.handleSubmit((values) => {
    console.log("who you are answers", values);
    setActiveTab("accessibility-support");
  });

  const accessibilitySupportForm = useForm<AccessibilitySupportValues>({
    resolver: zodResolver(accessibilitySupportSchema),
  });

  const onSubmitAccessibilitySupport = accessibilitySupportForm.handleSubmit((values) => {
    console.log("accessibility & support answers", values);
    setActiveTab("submit");
  });

  const submitStepForm = useForm<SubmitStepValues>({
    resolver: zodResolver(submitStepSchema),
    defaultValues: {
      passportPhoto: undefined,
    },
  });

  // The only step that actually talks to the backend: POST /applications
  // expects every step's answers in one multipart/form-data request, so they
  // are pulled together here rather than saved incrementally.
  const onSubmitApplication = submitStepForm.handleSubmit(async (values) => {
    const portal = portalForm.getValues();
    const personalInfo = personalInfoForm.getValues();
    const businessBasics = businessBasicsForm.getValues();
    const whoYouAre = whoYouAreForm.getValues();
    const accessibilitySupport = accessibilitySupportForm.getValues();

    const formData = new FormData();
    formData.append("fullName", portal.fullName);
    formData.append("email", portal.email);
    formData.append("program", portal.program);
    if (portal.cohort) formData.append("cohort", portal.cohort);

    if (personalInfo.title) formData.append("title", personalInfo.title);
    formData.append("surname", personalInfo.surname);
    formData.append("firstName", personalInfo.firstName);
    formData.append("businessName", personalInfo.businessName);
    formData.append("dateOfBirth", personalInfo.dateOfBirth.toISOString());
    formData.append("gender", personalInfo.gender);

    formData.append("businessDescription", businessBasics.businessDescription);
    formData.append("operatingDuration", businessBasics.operatingDuration);
    formData.append("averageRevenue", businessBasics.averageRevenue);
    formData.append("fullTimeCommitment", businessBasics.fullTimeCommitment);
    formData.append("challengeAndSkillGap", whoYouAre.challengeAndSkillGap);
    formData.append("cohortMotivation", whoYouAre.cohortMotivation);
    formData.append("hasAccessibilityNeeds", accessibilitySupport.hasAccessibilityNeeds);

    if (values.passportPhoto) formData.append("passportPhoto", values.passportPhoto);

    try {
      const { data: application } = await submitApplication(formData).unwrap();
      setSubmittedApplication(application);
      setWizardStep("success");
    } catch (error) {
      toast.error(getSubmitErrorMessage(error));
    }
  });

  return {
    wizardStep,
    activeTab,
    setActiveTab,
    goToPreviousTab,
    submittedApplication,
    portalForm,
    onSubmitPortal,
    isPortalSubmitting: portalForm.formState.isSubmitting,
    personalInfoForm,
    onSubmitPersonalInfo,
    isPersonalInfoSubmitting: personalInfoForm.formState.isSubmitting,
    businessBasicsForm,
    onSubmitBusinessBasics,
    isBusinessBasicsSubmitting: businessBasicsForm.formState.isSubmitting,
    whoYouAreForm,
    onSubmitWhoYouAre,
    isWhoYouAreSubmitting: whoYouAreForm.formState.isSubmitting,
    accessibilitySupportForm,
    onSubmitAccessibilitySupport,
    isAccessibilitySupportSubmitting: accessibilitySupportForm.formState.isSubmitting,
    submitStepForm,
    onSubmitApplication,
    isSubmitStepSubmitting,
  };
};
