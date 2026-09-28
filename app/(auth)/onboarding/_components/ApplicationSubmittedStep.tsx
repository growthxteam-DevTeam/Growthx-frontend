import { Check } from "lucide-react";

import type { ApplicationRecord } from "@/redux/features/applications/applicationsApi";

interface ApplicationSubmittedStepProps {
  application: ApplicationRecord;
}

const ACCESSIBILITY_LABELS: Record<ApplicationRecord["hasAccessibilityNeeds"], string> = {
  yes: "Has accessibility needs",
  no: "No accessibility needs",
};

const ApplicationSubmittedStep = ({ application }: ApplicationSubmittedStepProps) => {
  // TODO: "Operating", "Revenue", "Full-time" and "Key Outcome" aren't
  // collected by any step yet — add rows here once those fields/screens
  // are designed.
  const summaryRows = [
    { label: "Business", value: application.businessDescription },
    { label: "Accessibility", value: ACCESSIBILITY_LABELS[application.hasAccessibilityNeeds] },
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
            We review every application personally. If selected, you will hear from us within 5
            business days with guidance on next steps.
          </p>
        </div>

        <div className="mt-10 divide-y divide-border rounded-xl bg-[#f5f4fc]">
          {summaryRows.map((row) => (
            <div key={row.label} className="grid grid-cols-[1fr_2fr] gap-4 px-6 py-5">
              <p className="font-serif text-lg font-bold text-primary">{row.label}</p>
              <p className="text-muted-foreground">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationSubmittedStep;
