"use client";

import type { UseFormReturn } from "react-hook-form";

import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assertNever } from "@/lib/utils";

import { APPLICATION_META, ONBOARDING_TABS } from "../_constants";
import type {
  AccessibilitySupportValues,
  BusinessBasicsValues,
  OnboardingTabId,
  PersonalInfoValues,
  SubmitStepValues,
  WhoYouAreValues,
} from "../_types";
import AccessibilityStep from "./AccessibilityStep";
import BusinessBasicsStep from "./BusinessBasicsStep";
import PersonalInfoStep from "./PersonalInfoStep";
import SubmitStep from "./SubmitStep";
import WhoYouAreStep from "./WhoYouAreStep";

interface ApplicationFormProps {
  activeTab: OnboardingTabId;
  onActiveTabChange: (tab: OnboardingTabId) => void;
  onBack: () => void;
  personalInfoForm: UseFormReturn<PersonalInfoValues>;
  onSubmitPersonalInfo: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPersonalInfoSubmitting: boolean;
  businessBasicsForm: UseFormReturn<BusinessBasicsValues>;
  onSubmitBusinessBasics: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isBusinessBasicsSubmitting: boolean;
  whoYouAreForm: UseFormReturn<WhoYouAreValues>;
  onSubmitWhoYouAre: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isWhoYouAreSubmitting: boolean;
  accessibilitySupportForm: UseFormReturn<AccessibilitySupportValues>;
  onSubmitAccessibilitySupport: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isAccessibilitySupportSubmitting: boolean;
  submitStepForm: UseFormReturn<SubmitStepValues>;
  onSubmitApplication: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitStepSubmitting: boolean;
}

const ApplicationForm = ({
  activeTab,
  onActiveTabChange,
  onBack,
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
}: ApplicationFormProps) => {
  const activeTabConfig = ONBOARDING_TABS.find((tab) => tab.id === activeTab) ?? ONBOARDING_TABS[0];

  // One case per OnboardingTabId. TS errors on this switch if a tab is added
  // to ONBOARDING_TABS without being handled here — the same exhaustiveness
  // guarantee a lookup map or if/else chain can't give for free.
  const renderTabContent = (tab: OnboardingTabId) => {
    switch (tab) {
      case "personal-info":
        return (
          <PersonalInfoStep
            form={personalInfoForm}
            onSubmit={onSubmitPersonalInfo}
            isSubmitting={isPersonalInfoSubmitting}
          />
        );

      case "business-basics":
        return (
          <BusinessBasicsStep
            form={businessBasicsForm}
            onSubmit={onSubmitBusinessBasics}
            isSubmitting={isBusinessBasicsSubmitting}
          />
        );

      case "who-you-are":
        return (
          <WhoYouAreStep
            form={whoYouAreForm}
            onSubmit={onSubmitWhoYouAre}
            isSubmitting={isWhoYouAreSubmitting}
            onBack={onBack}
          />
        );

      case "submit":
        return (
          <SubmitStep
            form={submitStepForm}
            onSubmit={onSubmitApplication}
            isSubmitting={isSubmitStepSubmitting}
            onBack={onBack}
          />
        );

      case "accessibility-support":
        return (
          <AccessibilityStep
            form={accessibilitySupportForm}
            onSubmit={onSubmitAccessibilitySupport}
            isSubmitting={isAccessibilitySupportSubmitting}
            onBack={onBack}
          />
        );

      default:
        return assertNever(tab);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="rounded-2xl border border-border bg-white p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-serif text-3xl font-bold text-primary">
            Application for {APPLICATION_META.programTitle}
          </h1>

          <div className="relative flex w-40 items-center gap-3">
            <Progress value={activeTabConfig.progress} className="w-full" />
            <span
              className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary"
              style={{ left: `calc(${activeTabConfig.progress}% - 3px)` }}
            />
            <span className="text-sm font-semibold text-foreground">
              {activeTabConfig.progress}%
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-1 text-sm">
          <p>
            <span className="text-muted-foreground">Application Number: </span>
            <span className="font-semibold text-primary">{APPLICATION_META.applicationNumber}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Cohort: </span>
            <span className="font-semibold text-primary">{APPLICATION_META.cohortLabel}</span>
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-16 gap-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Program fee (If selected): </span>
            <span className="font-semibold text-primary">{APPLICATION_META.programFee}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Deadline: </span>
            <span className="font-semibold text-primary">{APPLICATION_META.deadline}</span>
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => onActiveTabChange(value as (typeof ONBOARDING_TABS)[number]["id"])}
          className="mt-8"
        >
          <TabsList variant="default" className="h-auto w-fit flex-wrap justify-start gap-2 bg-transparent p-0">
            {ONBOARDING_TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                disabled={!tab.enabled}
                className="h-auto flex-none rounded-lg border-0 px-4 py-2 text-sm font-semibold text-muted-foreground data-active:bg-primary data-active:text-primary-foreground data-active:shadow-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {ONBOARDING_TABS.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              {renderTabContent(tab.id)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ApplicationForm;
