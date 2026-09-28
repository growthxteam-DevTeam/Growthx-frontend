"use client";

import { ArrowRight } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { SelectItem } from "@/components/ui/select";

import { GENDER_OPTIONS } from "../_constants";
import type { PersonalInfoValues } from "../_types";
import RequiredLabel from "./RequiredLabel";

interface PersonalInfoStepProps {
  form: UseFormReturn<PersonalInfoValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
}

const PersonalInfoStep = ({ form, onSubmit, isSubmitting }: PersonalInfoStepProps) => {
  return (
    <div className="rounded-xl border border-border bg-white p-8">
      <h2 className="font-serif text-2xl font-bold text-primary">Personal Information</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Update your personal details for the application
      </p>

      <form onSubmit={onSubmit} className="mt-8">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="title"
            label="Title"
            placeholder="Mr"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="surname"
            label={<RequiredLabel>Surname</RequiredLabel>}
            placeholder="Rowe"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="firstName"
            label={<RequiredLabel>First Name</RequiredLabel>}
            placeholder="Smith"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="businessName"
            label={<RequiredLabel>Business Name</RequiredLabel>}
            placeholder="smithrowe LTD"
          />

          <CustomFormField
            fieldType={FormFieldType.DATE}
            control={form.control}
            name="dateOfBirth"
            label={<RequiredLabel>Date of Birth</RequiredLabel>}
            dateFormat="dd/MM/yyyy"
            placeholder="dd/mm/yyyy"
          />

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="gender"
            label={<RequiredLabel>Gender</RequiredLabel>}
            placeholder="select"
          >
            {GENDER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <SubmitButton isLoading={isSubmitting} loadingText="Saving..." className="mt-10 w-fit px-6">
          Continue
          <span className="flex size-5 items-center justify-center rounded bg-white/20">
            <ArrowRight className="size-3.5" />
          </span>
        </SubmitButton>
      </form>
    </div>
  );
};

export default PersonalInfoStep;
