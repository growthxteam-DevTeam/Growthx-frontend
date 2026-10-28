import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import type { ApplicationRecord } from "@/redux/features/applications/applicationsApi";
import type { FrameworkT } from "@/types/global";

import { AVERAGE_REVENUE_OPTIONS, OPERATING_DURATION_OPTIONS } from "../_constants";
import { useOptions } from "../_hooks/useOptions";

interface ApplicationSubmittedStepProps {
  application: ApplicationRecord;
}

const labelFor = (options: FrameworkT[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

const ApplicationSubmittedStep = ({ application }: ApplicationSubmittedStepProps) => {
  const { businessBasics, whoYouAre, accessibilitySupport } = application;
  const t = useTranslations("Onboarding.submitted");
  const toOptions = useOptions();

  const summaryRows = [
    { label: t("rows.business"), value: businessBasics.businessDescription },
    {
      label: t("rows.operating"),
      value: labelFor(toOptions(OPERATING_DURATION_OPTIONS), businessBasics.operatingDuration),
    },
    {
      label: t("rows.revenue"),
      value: labelFor(toOptions(AVERAGE_REVENUE_OPTIONS), businessBasics.averageRevenue),
    },
    {
      label: t("rows.accessibility"),
      value: t(`accessibility.${accessibilitySupport.hasAccessibilityNeeds}`),
    },
    { label: t("rows.fullTime"), value: t(`fullTime.${businessBasics.fullTimeCommitment}`) },
    { label: t("rows.keyOutcome"), value: whoYouAre.cohortMotivation },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-16">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-24 items-center justify-center rounded-full bg-emerald-50">
            <Check className="size-10 text-emerald-600" strokeWidth={3} />
          </div>

          <h1 className="mt-6 font-serif text-2xl font-bold text-primary sm:text-3xl">{t("title")}</h1>
          <p className="mt-3 max-w-md text-muted-foreground">{t("description")}</p>
        </div>

        <div className="mt-10 divide-y divide-border rounded-xl bg-tint">
          {summaryRows.map((row) => (
            <div key={row.label} className="grid grid-cols-[1fr_2fr] gap-4 px-6 py-5">
              <p className="font-serif text-lg font-bold text-primary">{row.label}</p>
              <p className="line-clamp-2 text-muted-foreground">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationSubmittedStep;
