import { Check } from "lucide-react";

import type { ApplicationRecord } from "@/redux/features/applications/applicationsApi";
import type { FrameworkT } from "@/types/global";

import { AVERAGE_REVENUE_OPTIONS, OPERATING_DURATION_OPTIONS } from "../_constants";

interface ApplicationSubmittedStepProps {
  application: ApplicationRecord;
}

const ACCESSIBILITY_LABELS: Record<ApplicationRecord["accessibilitySupport"]["hasAccessibilityNeeds"], string> = {
  yes: "Has accessibility needs",
  no: "No accessibility needs",
};

const FULL_TIME_LABELS: Record<ApplicationRecord["businessBasics"]["fullTimeCommitment"], string> = {
  "full-time": "Yes",
  "not-yet": "Not yet",
};

const labelFor = (options: FrameworkT[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

const ApplicationSubmittedStep = ({ application }: ApplicationSubmittedStepProps) => {
  const { businessBasics, whoYouAre, accessibilitySupport } = application;

  const summaryRows = [
    { label: "Business", value: businessBasics.businessDescription },
    { label: "Operating", value: labelFor(OPERATING_DURATION_OPTIONS, businessBasics.operatingDuration) },
    { label: "Revenue", value: labelFor(AVERAGE_REVENUE_OPTIONS, businessBasics.averageRevenue) },
    { label: "Accessibility", value: ACCESSIBILITY_LABELS[accessibilitySupport.hasAccessibilityNeeds] },
    { label: "Full-time", value: FULL_TIME_LABELS[businessBasics.fullTimeCommitment] },
    { label: "Key Outcome", value: whoYouAre.cohortMotivation },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="rounded-2xl border border-border bg-white p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-24 items-center justify-center rounded-full bg-emerald-50">
            <Check className="size-10 text-emerald-600" strokeWidth={3} />
          </div>

          <h1 className="mt-6 font-serif text-3xl font-bold text-primary">Application Submitted</h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            We review every application personally. If selected, you will hear from us within 5 business days with
            guidance on next steps.
          </p>
        </div>

        <div className="mt-10 divide-y divide-border rounded-xl bg-[#f5f4fc]">
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
