"use client";

import ToastNotification from "@/components/shared/ToastNotification";
import { assertNever } from "@/lib/utils";

import { useOnboarding } from "../_hooks/useOnboarding";
import ApplicationForm from "./ApplicationForm";
import ApplicationPortalStep from "./ApplicationPortalStep";
import ApplicationSubmittedStep from "./ApplicationSubmittedStep";

const OnboardingWizard = () => {
  const {
    wizardStep,
    activeTab,
    setActiveTab,
    goToPreviousTab,
    submittedApplication,
    portalForm,
    onSubmitPortal,
    isPortalSubmitting,
    personalInfoForm,
    onSubmitPersonalInfo,
    isPersonalInfoSubmitting,
    businessBasicsForm,
    onSubmitBusinessBasics,
    isBusinessBasicsSubmitting,
    whoYouAreForm,
    onSubmitWhoYouAre,
    isWhoYouAreSubmitting,
    accessibilitySupportForm,
    onSubmitAccessibilitySupport,
    isAccessibilitySupportSubmitting,
    submitStepForm,
    onSubmitApplication,
    isSubmitStepSubmitting,
  } = useOnboarding();

  switch (wizardStep) {
    case "portal":
      return (
        <ApplicationPortalStep form={portalForm} onSubmit={onSubmitPortal} isSubmitting={isPortalSubmitting} />
      );

    case "application":
      return (
        <ApplicationForm
          activeTab={activeTab}
          onActiveTabChange={setActiveTab}
          onBack={goToPreviousTab}
          personalInfoForm={personalInfoForm}
          onSubmitPersonalInfo={onSubmitPersonalInfo}
          isPersonalInfoSubmitting={isPersonalInfoSubmitting}
          businessBasicsForm={businessBasicsForm}
          onSubmitBusinessBasics={onSubmitBusinessBasics}
          isBusinessBasicsSubmitting={isBusinessBasicsSubmitting}
          whoYouAreForm={whoYouAreForm}
          onSubmitWhoYouAre={onSubmitWhoYouAre}
          isWhoYouAreSubmitting={isWhoYouAreSubmitting}
          accessibilitySupportForm={accessibilitySupportForm}
          onSubmitAccessibilitySupport={onSubmitAccessibilitySupport}
          isAccessibilitySupportSubmitting={isAccessibilitySupportSubmitting}
          submitStepForm={submitStepForm}
          onSubmitApplication={onSubmitApplication}
          isSubmitStepSubmitting={isSubmitStepSubmitting}
        />
      );

    case "success":
      // wizardStep only ever becomes "success" right after a successful
      // submitApplication call, which sets submittedApplication in the same
      // breath — this guard is just to satisfy the type checker.
      return submittedApplication ? (
        <>
          <ToastNotification
            title="Application submitted"
            description="We'll review it and be in touch within 5 business days."
            type="success"
          />
          <ApplicationSubmittedStep application={submittedApplication} />
        </>
      ) : null;

    default:
      // Compile-time guard: TS errors here if a new OnboardingWizardStep
      // member is added without a case above.
      return assertNever(wizardStep);
  }
};

export default OnboardingWizard;
