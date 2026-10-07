"use client";

import { useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ACCESSIBILITY_NEED_OPTIONS, ACCESSIBILITY_OPTIONS } from "../_constants";
import type { AccessibilitySupportValues } from "../_types";

interface AccessibilityStepProps {
  form: UseFormReturn<AccessibilitySupportValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  onBack: () => void;
}

// Two screens under one tab: "need" only appears after answering "yes".
type AccessibilityScreen = "choice" | "need";

const AccessibilityStep = ({ form, onSubmit, isSubmitting, onBack }: AccessibilityStepProps) => {
  const [screen, setScreen] = useState<AccessibilityScreen>("choice");

  const handleChoiceContinue = async () => {
    const isValid = await form.trigger("hasAccessibilityNeeds");
    if (!isValid) return;

    if (form.getValues("hasAccessibilityNeeds") === "yes") {
      setScreen("need");
      return;
    }

    form.setValue("accessibilityNeed", undefined);
    await onSubmit();
  };

  if (screen === "need") {
    return (
      <div className="rounded-xl border border-border bg-white p-8">
        <h2 className="font-serif text-2xl font-bold text-primary">What is your accessibility need?</h2>

        <form onSubmit={onSubmit} className="mt-8">
          <CustomFormField
            fieldType={FormFieldType.RADIO}
            control={form.control}
            name="accessibilityNeed"
            render={(field) => {
              const { value, onChange } = field as { value?: string; onChange: (value: string) => void };
              return (
                <div className="flex flex-col gap-4">
                  {ACCESSIBILITY_NEED_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onChange(option.value)}
                      className={cn(
                        "w-full rounded-md border px-4 py-3 text-left text-sm transition-colors",
                        value === option.value
                          ? "border-primary bg-primary/5 font-semibold text-primary"
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
              onClick={() => setScreen("choice")}
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
  }

  return (
    <div className="rounded-xl border border-border bg-white p-8">
      <h2 className="font-serif text-2xl font-bold text-primary">
        Do you have any accessibility needs we should know about?
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        This has no bearing on your acceptance into the program, it only help us to support you.
      </p>

      <div className="mt-8">
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

          <SubmitButton
            type="button"
            clickFn={handleChoiceContinue}
            isLoading={isSubmitting}
            loadingText="Saving..."
            className="flex w-fit items-center px-6"
          >
            Continue
            <span className="flex size-5 items-center justify-center rounded bg-white/20">
              <ArrowRight className="size-3.5" />
            </span>
          </SubmitButton>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityStep;
