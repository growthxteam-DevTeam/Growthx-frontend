"use client";

import { useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
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

  const goToCohortMotivation = async () => {
    const isValid = await form.trigger("challengeAndSkillGap");
    if (isValid) setScreen("cohort-motivation");
  };

  if (screen === "cohort-motivation") {
    return (
      <div className="rounded-xl border border-border bg-white p-8">
        <h2 className="font-serif text-2xl font-bold text-primary">
          Why do you want to join this cohort now, what specific outcome would make it worth it for
          you?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Think about where you want your business to be in 6 months. What needs to be true?
        </p>

        <form onSubmit={onSubmit} className="mt-8">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cohortMotivation"
            placeholder="We help small logistic companies in Lagos..."
            variant="min-h-40 bg-gray-50"
          />

          <div className="mt-10 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setScreen("challenge")}
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
        What&apos;s the most impressive or difficult thing you&apos;ve done to build this business, and
        what&apos;s the one skill gap holding you back the most right now?
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Be specific on both sides. A real story of a challenge you pushed through, plus an honest read on
        what you don&apos;t yet know how to do, tells us far more than a list of achievements, and helps us
        match you with the right peers.
      </p>

      <div className="mt-8">
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="challengeAndSkillGap"
          placeholder="We help small logistic companies in Lagos..."
          variant="min-h-40 bg-gray-50"
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

          <SubmitButton type="button" clickFn={goToCohortMotivation} className="flex w-fit items-center px-6">
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

export default WhoYouAreStep;
