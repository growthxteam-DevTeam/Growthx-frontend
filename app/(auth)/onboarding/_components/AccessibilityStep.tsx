"use client";

import { useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ACCESSIBILITY_NEED_OPTIONS, ACCESSIBILITY_OPTIONS } from "../_constants";
import { useOptions } from "../_hooks/useOptions";
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
  const t = useTranslations("Onboarding.accessibility");
  const tc = useTranslations("Onboarding.common");
  const toOptions = useOptions();

  const handleChoiceContinue = async () => {
    const isValid = await form.trigger("hasAccessibilityNeeds");
    if (!isValid) return;

    if (form.getValues("hasAccessibilityNeeds") === "yes") {
      setScreen("need");
      return;
    }

    form.setValue("accessibilityNeed", undefined);
    form.setValue("accessibilityNotes", undefined);
    await onSubmit();
  };

  if (screen === "need") {
    return (
      <div className="onboarding-form rounded-xl border border-border bg-card p-5 sm:p-8">
        <h2 className="font-serif text-2xl font-bold text-primary">{t("need.title")}</h2>

        <form onSubmit={onSubmit} className="mt-8">
          <CustomFormField
            fieldType={FormFieldType.RADIO}
            control={form.control}
            name="accessibilityNeed"
            render={(field) => {
              const { value, onChange } = field as { value?: string; onChange: (value: string) => void };
              return (
                <div className="flex flex-col gap-4">
                  {toOptions(ACCESSIBILITY_NEED_OPTIONS).map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onChange(option.value)}
                      className={cn(
                        "w-full rounded-md border px-4 py-3 text-left text-sm transition-colors",
                        value === option.value
                          ? "border-primary bg-field font-semibold text-primary"
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

          <div className="mt-8">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="accessibilityNotes"
              label={<span className="sm:whitespace-nowrap">{t("need.notesLabel")}</span>}
              placeholder={t("need.notesPlaceholder")}
              variant="min-h-40 bg-field"
            />
          </div>

          <div className="mt-10 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setScreen("choice")}
              className="h-11! gap-2 rounded-md border-primary px-6 text-sm font-medium text-primary hover:bg-transparent"
            >
              <ArrowLeft className="size-4" />
              {tc("back")}
            </Button>

            <SubmitButton isLoading={isSubmitting} loadingText={tc("saving")} className="flex w-fit items-center px-6">
              {tc("continue")}
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
    <div className="onboarding-form rounded-xl border border-border bg-card p-5 sm:p-8">
      <h2 className="font-serif text-2xl font-bold text-primary">{t("choice.title")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("choice.description")}</p>

      <div className="mt-8">
        <CustomFormField
          fieldType={FormFieldType.RADIO}
          control={form.control}
          name="hasAccessibilityNeeds"
          render={(field) => {
            const { value, onChange } = field as { value?: string; onChange: (value: string) => void };
            return (
              <div className="grid gap-4 sm:grid-cols-2">
                {toOptions(ACCESSIBILITY_OPTIONS).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={cn(
                      "rounded-md border px-6 py-4 text-center text-sm font-medium transition-colors",
                      value === option.value
                        ? "border-primary bg-field text-primary"
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
            {tc("back")}
          </Button>

          <SubmitButton
            type="button"
            clickFn={handleChoiceContinue}
            isLoading={isSubmitting}
            loadingText={tc("saving")}
            className="flex w-fit items-center px-6"
          >
            {tc("continue")}
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
