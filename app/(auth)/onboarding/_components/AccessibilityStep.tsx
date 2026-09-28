"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ACCESSIBILITY_OPTIONS } from "../_constants";
import type { AccessibilitySupportValues } from "../_types";

interface AccessibilityStepProps {
  form: UseFormReturn<AccessibilitySupportValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  onBack: () => void;
}

const AccessibilityStep = ({ form, onSubmit, isSubmitting, onBack }: AccessibilityStepProps) => {
  return (
    <div className="rounded-xl border border-border bg-white p-8">
      <h2 className="font-serif text-2xl font-bold text-primary">
        Do you have any accessibility needs we should know about?
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        This has no bearing on your acceptance into the program, it only help us to support you.
      </p>

      <form onSubmit={onSubmit} className="mt-8">
        <CustomFormField
          fieldType={FormFieldType.RADIO}
          control={form.control}
          name="hasAccessibilityNeeds"
          render={(field) => {
            const { value, onChange } = field as { value?: string; onChange: (value: string) => void };
            return (
              <div className="grid gap-4 sm:grid-cols-2">
                {ACCESSIBILITY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={cn(
                      "rounded-md border px-6 py-4 text-center text-sm font-medium transition-colors",
                      value === option.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground hover:border-primary/40",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            );
          }}
        />

        <div className="mt-10 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-11! gap-2 rounded-md border-primary px-6 text-sm font-medium text-primary hover:bg-transparent"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          <SubmitButton isLoading={isSubmitting} loadingText="Saving..." className="flex w-fit items-center px-6">
            Continue
            <span className="flex size-5 items-center justify-center rounded bg-white/20">
              <ArrowRight className="size-3.5" />
            </span>
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default AccessibilityStep;
