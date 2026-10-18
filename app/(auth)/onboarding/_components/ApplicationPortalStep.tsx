"use client";

import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { SelectItem } from "@/components/ui/select";

import { COHORT_OPTIONS, PROGRAM_OPTIONS } from "../_constants";
import { useOptions } from "../_hooks/useOptions";
import type { ApplicationPortalValues } from "../_types";
import RequiredLabel from "./RequiredLabel";

interface ApplicationPortalStepProps {
  form: UseFormReturn<ApplicationPortalValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
}

const ApplicationPortalStep = ({ form, onSubmit, isSubmitting }: ApplicationPortalStepProps) => {
  const t = useTranslations("Onboarding.portal");
  const toOptions = useOptions();
  const programOptions = toOptions(PROGRAM_OPTIONS);
  const cohortOptions = toOptions(COHORT_OPTIONS);

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="text-center font-serif text-4xl font-bold text-primary">{t("title")}</h1>

      <form onSubmit={onSubmit} className="onboarding-form mt-10 rounded-2xl border border-border bg-white p-10 shadow-sm">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="fullName"
            label={<RequiredLabel>{t("fullName")}</RequiredLabel>}
            placeholder={t("fullNamePlaceholder")}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label={<RequiredLabel>{t("email")}</RequiredLabel>}
            placeholder={t("emailPlaceholder")}
          />

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="program"
            label={<RequiredLabel>{t("program")}</RequiredLabel>}
            placeholder={t("programPlaceholder")}
            options={programOptions}
          >
            {programOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="cohort"
            label={t("cohort")}
            placeholder={t("cohortPlaceholder")}
            options={cohortOptions}
          >
            {cohortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <SubmitButton
          isLoading={isSubmitting}
          loadingText={t("submitting")}
          className="mx-auto mt-10 block w-full max-w-xs"
        >
          {t("submit")}
        </SubmitButton>
      </form>
    </div>
  );
};

export default ApplicationPortalStep;
