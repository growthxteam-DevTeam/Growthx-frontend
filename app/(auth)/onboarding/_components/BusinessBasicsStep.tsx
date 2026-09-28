"use client";

import { useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FrameworkT } from "@/types/global";

import {
  AVERAGE_REVENUE_OPTIONS,
  FULL_TIME_COMMITMENT_OPTIONS,
  OPERATING_DURATION_OPTIONS,
} from "../_constants";
import type { BusinessBasicsValues } from "../_types";

interface BusinessBasicsStepProps {
  form: UseFormReturn<BusinessBasicsValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
}

// Four screens under one tab: the tab only advances ("who-you-are") once
// every field on this schema is filled, not after the first question.
type BusinessBasicsScreen =
  | "description"
  | "operating-duration"
  | "average-revenue"
  | "full-time-commitment";

const RadioCardGroup = ({
  value,
  onChange,
  options,
  layout = "list",
}: {
  value?: string;
  onChange: (value: string) => void;
  options: FrameworkT[];
  layout?: "list" | "grid";
}) => (
  <div className={layout === "grid" ? "grid gap-4 sm:grid-cols-2" : "flex flex-col gap-4"}>
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={cn(
          "rounded-md border px-6 py-4 text-sm font-medium transition-colors",
          layout === "grid" ? "text-center" : "text-left",
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

const BusinessBasicsStep = ({ form, onSubmit, isSubmitting }: BusinessBasicsStepProps) => {
  const [screen, setScreen] = useState<BusinessBasicsScreen>("description");

  const goToOperatingDuration = async () => {
    const isValid = await form.trigger("businessDescription");
    if (isValid) setScreen("operating-duration");
  };

  const goToAverageRevenue = async () => {
    const isValid = await form.trigger("operatingDuration");
    if (isValid) setScreen("average-revenue");
  };

  const goToFullTimeCommitment = async () => {
    const isValid = await form.trigger("averageRevenue");
    if (isValid) setScreen("full-time-commitment");
  };

  if (screen === "operating-duration") {
    return (
      <div className="rounded-xl border border-border bg-white p-8">
        <h2 className="font-serif text-2xl font-bold text-primary">
          How long have you been operating?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          From the date you started building or selling, not your official registration date.
        </p>

        <div className="mt-8">
          <CustomFormField
            fieldType={FormFieldType.RADIO}
            control={form.control}
            name="operatingDuration"
            render={(field) => {
              const { value, onChange } = field as { value?: string; onChange: (value: string) => void };
              return <RadioCardGroup value={value} onChange={onChange} options={OPERATING_DURATION_OPTIONS} />;
            }}
          />

          <div className="mt-10 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setScreen("description")}
              className="h-11! gap-2 rounded-md border-primary px-6 text-sm font-medium text-primary hover:bg-transparent"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>

            <SubmitButton type="button" clickFn={goToAverageRevenue} className="flex w-fit items-center px-6">
              Continue
              <span className="flex size-5 items-center justify-center rounded bg-white/20">
                <ArrowRight className="size-3.5" />
              </span>
            </SubmitButton>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "average-revenue") {
    return (
      <div className="rounded-xl border border-border bg-white p-8">
        <h2 className="font-serif text-2xl font-bold text-primary">What is your average revenue?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This helps us match you with the right cohort peers.
        </p>

        <div className="mt-8">
          <CustomFormField
            fieldType={FormFieldType.RADIO}
            control={form.control}
            name="averageRevenue"
            render={(field) => {
              const { value, onChange } = field as { value?: string; onChange: (value: string) => void };
              return <RadioCardGroup value={value} onChange={onChange} options={AVERAGE_REVENUE_OPTIONS} />;
            }}
          />

          <div className="mt-10 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setScreen("operating-duration")}
              className="h-11! gap-2 rounded-md border-primary px-6 text-sm font-medium text-primary hover:bg-transparent"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>

            <SubmitButton
              type="button"
              clickFn={goToFullTimeCommitment}
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
  }

  if (screen === "full-time-commitment") {
    return (
      <div className="rounded-xl border border-border bg-white p-8">
        <h2 className="font-serif text-2xl font-bold text-primary">
          Are you working on this business full-time?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          There&apos;s no wrong answer, we just need to understand your situation to set the right
          expectations.
        </p>

        <form onSubmit={onSubmit} className="mt-8">
          <CustomFormField
            fieldType={FormFieldType.RADIO}
            control={form.control}
            name="fullTimeCommitment"
            render={(field) => {
              const { value, onChange } = field as { value?: string; onChange: (value: string) => void };
              return (
                <RadioCardGroup
                  value={value}
                  onChange={onChange}
                  options={FULL_TIME_COMMITMENT_OPTIONS}
                  layout="grid"
                />
              );
            }}
          />

          <div className="mt-10 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setScreen("average-revenue")}
              className="h-11! gap-2 rounded-md border-primary px-6 text-sm font-medium text-primary hover:bg-transparent"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>

            <SubmitButton
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
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white p-8">
      <h2 className="font-serif text-2xl font-bold text-primary">
        What does your business do, and whom does it serve?
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Write in plain language, imagine explaining it to a smart friend who has never heard of it
      </p>

      <div className="mt-8">
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="businessDescription"
          placeholder="We help small logistic companies in Lagos..."
          variant="min-h-40 bg-gray-50"
        />

        <SubmitButton
          type="button"
          clickFn={goToOperatingDuration}
          className="ml-auto mt-10 flex w-fit items-center px-6"
        >
          Continue
          <span className="flex size-5 items-center justify-center rounded bg-white/20">
            <ArrowRight className="size-3.5" />
          </span>
        </SubmitButton>
      </div>
    </div>
  );
};

export default BusinessBasicsStep;
