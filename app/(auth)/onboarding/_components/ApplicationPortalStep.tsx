"use client";

import type { UseFormReturn } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { SelectItem } from "@/components/ui/select";

import { COHORT_OPTIONS, PROGRAM_OPTIONS } from "../_constants";
import type { ApplicationPortalValues } from "../_types";
import RequiredLabel from "./RequiredLabel";

interface ApplicationPortalStepProps {
  form: UseFormReturn<ApplicationPortalValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
}

const ApplicationPortalStep = ({ form, onSubmit, isSubmitting }: ApplicationPortalStepProps) => {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="text-center font-serif text-4xl font-bold text-primary">
        Application Portal
      </h1>

      <form onSubmit={onSubmit} className="mt-10 rounded-2xl border border-border bg-[#f5f4fc] p-10">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="fullName"
            label={<RequiredLabel>Full Name</RequiredLabel>}
            placeholder="your name"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label={<RequiredLabel>Email address</RequiredLabel>}
            placeholder="your email"
          />

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="program"
            label={<RequiredLabel>Program</RequiredLabel>}
            placeholder="select"
          >
            {PROGRAM_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="cohort"
            label="Cohort"
            placeholder="choose"
          >
            {COHORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <SubmitButton
          isLoading={isSubmitting}
          loadingText="Starting..."
          className="mx-auto mt-10 block w-full max-w-xs"
        >
          Start Screening
        </SubmitButton>
      </form>
    </div>
  );
};

export default ApplicationPortalStep;
