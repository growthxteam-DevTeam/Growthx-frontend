"use client";

import { useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";

import type { WhoYouAreValues } from "../_types";

interface WhoYouAreStepProps {
  form: UseFormReturn<WhoYouAreValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  onBack: () => void;
}

// Two screens under one tab: the tab only advances ("accessibility-support")
// once both fields on this schema are filled, not after the first question.
type WhoYouAreScreen = "challenge" | "cohort-motivation";

const WhoYouAreStep = ({ form, onSubmit, isSubmitting, onBack }: WhoYouAreStepProps) => {
  const [screen, setScreen] = useState<WhoYouAreScreen>("challenge");
  const t = useTranslations("Onboarding.whoYouAre");
  const tc = useTranslations("Onboarding.common");

  const goToCohortMotivation = async () => {
    const isValid = await form.trigger("challengeAndSkillGap");
    if (isValid) setScreen("cohort-motivation");
  };

  if (screen === "cohort-motivation") {
    return (
      <div className="onboarding-form rounded-xl border border-border bg-card p-8">
        <h2 className="font-serif text-2xl font-bold text-primary">{t("motivation.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("motivation.description")}</p>

        <form onSubmit={onSubmit} className="mt-8">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cohortMotivation"
            placeholder={tc("textareaPlaceholder")}
            variant="min-h-40 bg-field"
          />

          <div className="mt-10 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setScreen("challenge")}
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
    <div className="onboarding-form rounded-xl border border-border bg-card p-8">
      <h2 className="font-serif text-2xl font-bold text-primary">{t("challenge.title")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("challenge.description")}</p>

      <div className="mt-8">
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="challengeAndSkillGap"
          placeholder={tc("textareaPlaceholder")}
          variant="min-h-40 bg-field"
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

          <SubmitButton type="button" clickFn={goToCohortMotivation} className="flex w-fit items-center px-6">
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

export default WhoYouAreStep;
