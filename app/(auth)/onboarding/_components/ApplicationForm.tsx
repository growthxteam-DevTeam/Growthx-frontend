"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assertNever } from "@/lib/utils";

import { APPLICATION_META, ONBOARDING_TABS } from "../_constants";
import { getOnboardingProgress } from "../_lib/progress";
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
  const t = useTranslations("Onboarding");
  const progress = getOnboardingProgress(activeTab);
  const tabScrollerRef = useRef<HTMLDivElement>(null);
  // Thumb size and position of the scroll hint under the tabs, as percentages of its track.
  const [tabScroll, setTabScroll] = useState({ size: 100, offset: 0 });

  const updateTabScroll = useCallback(() => {
    const scroller = tabScrollerRef.current;
    if (!scroller) return;

    const { scrollLeft, scrollWidth, clientWidth } = scroller;
    const size = scrollWidth > 0 ? (clientWidth / scrollWidth) * 100 : 100;
    const maxScroll = scrollWidth - clientWidth;
    setTabScroll({ size, offset: maxScroll > 0 ? (scrollLeft / maxScroll) * (100 - size) : 0 });
  }, []);

  // On phones the tab row scrolls sideways, so keep the active tab in view as the flow advances.
  useEffect(() => {
    tabScrollerRef.current
      ?.querySelector<HTMLElement>('[data-slot="tabs-trigger"][data-active]')
      ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeTab]);

  // The observer also fires once on observe, which gives the hint its initial size.
  useEffect(() => {
    const scroller = tabScrollerRef.current;
    if (!scroller) return;

    const observer = new ResizeObserver(updateTabScroll);
    observer.observe(scroller);
    if (scroller.firstElementChild) observer.observe(scroller.firstElementChild);
    return () => observer.disconnect();
  }, [updateTabScroll]);

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
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-16">
      <div className="onboarding-form rounded-2xl border border-border bg-card p-5 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
            {t("form.title", { program: APPLICATION_META.programTitle })}
          </h1>

          <div className="flex w-40 items-center gap-3">
            <div className="relative min-w-0 flex-1">
              <Progress value={progress} className="w-full" />
              <span
                className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary"
                style={{ left: `calc(${progress}% - 3px)` }}
              />
            </div>
            <span className="shrink-0 text-sm font-semibold text-foreground">{progress}%</span>
          </div>
        </div>

        <div className="mt-4 space-y-1 text-sm">
          <p>
            <span className="text-muted-foreground">{t("form.applicationNumber")} </span>
            <span className="font-semibold text-primary">{APPLICATION_META.applicationNumber}</span>
          </p>
          <p>
            <span className="text-muted-foreground">{t("form.cohort")} </span>
            <span className="font-semibold text-primary">{APPLICATION_META.cohortLabel}</span>
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm sm:gap-x-16">
          <p>
            <span className="text-muted-foreground">{t("form.programFee")} </span>
            <span className="font-semibold text-primary">{APPLICATION_META.programFee}</span>
          </p>
          <p>
            <span className="text-muted-foreground">{t("form.deadline")} </span>
            <span className="font-semibold text-primary">{APPLICATION_META.deadline}</span>
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => onActiveTabChange(value as (typeof ONBOARDING_TABS)[number]["id"])}
          className="mt-8"
        >
          <div
            ref={tabScrollerRef}
            onScroll={updateTabScroll}
            className="-mx-5 -my-1 overflow-x-auto px-5 py-1 [scrollbar-width:none] sm:mx-0 sm:my-0 sm:overflow-visible sm:p-0 [&::-webkit-scrollbar]:hidden"
          >
            <TabsList
              variant="default"
              className="h-auto w-max flex-nowrap justify-start gap-2 bg-transparent p-0 group-data-horizontal/tabs:h-auto sm:w-full sm:flex-wrap sm:justify-between"
            >
              {ONBOARDING_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  disabled={!tab.enabled}
                  className="h-auto flex-none rounded-lg border-0 px-3.5 py-2 text-sm font-semibold text-muted-foreground data-active:bg-primary data-active:text-primary-foreground hover:data-active:text-primary-foreground data-active:shadow-none sm:px-4"
                >
                  {t(`tabs.${tab.id}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabScroll.size < 100 && (
            <div aria-hidden className="relative mt-2 h-1 rounded-full bg-muted sm:hidden">
              <div
                className="absolute inset-y-0 rounded-full bg-primary/50"
                style={{ width: `${tabScroll.size}%`, left: `${tabScroll.offset}%` }}
              />
            </div>
          )}

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
