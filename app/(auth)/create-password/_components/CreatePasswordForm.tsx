"use client";

import { Check, Eye, EyeOff } from "lucide-react";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { cn } from "@/lib/utils";

import { useCreatePassword } from "../_hooks/useCreatePassword";

interface CreatePasswordFormProps {
  gsCode: string;
}

const FieldLabelText = ({ title, hint }: { title: string; hint?: string }) => (
  <span className="flex flex-col gap-1">
    <span className="text-base font-bold text-primary">{title}</span>
    {hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}
  </span>
);

const CreatePasswordForm = ({ gsCode }: CreatePasswordFormProps) => {
  const {
    form,
    onSubmit,
    isSubmitting,
    isPasswordCreated,
    requirements,
    showPassword,
    toggleShowPassword,
    showConfirmPassword,
    toggleShowConfirmPassword,
  } = useCreatePassword(gsCode);

  if (isPasswordCreated) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <div className="flex flex-col items-center rounded-2xl border border-border bg-white px-6 py-16 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-emerald-50">
            <Check className="size-8 text-emerald-600" strokeWidth={3} />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-bold text-primary">Password created</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your Growth Space account is now secured.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="rounded-2xl border border-border bg-white px-6 py-12">
        <div className="text-center">
          <p className="font-serif text-lg font-bold text-primary">Congratulations on your acceptance to the Cohort</p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-primary">Create password</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            Set a strong password to secure your Growth Space account.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mx-auto mt-10 flex w-full max-w-md flex-col gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="gsCode"
            type="text"
            label={<FieldLabelText title="Enter your GS Code" hint="This was sent to you in your acceptance email" />}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="password"
            type={showPassword ? "text" : "password"}
            label={<FieldLabelText title="Password" />}
            rightIcon={
              <button
                type="button"
                onClick={toggleShowPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            label={<FieldLabelText title="Confirm password" />}
            rightIcon={
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
          />

          <div>
            <p className="text-[10px] text-muted-foreground">Password requirements</p>
            <ul className="mt-3 space-y-0.5">
              {requirements.map((requirement) => (
                <li
                  key={requirement.label}
                  className={cn(
                    "flex items-center gap-1 text-[10px]",
                    requirement.met ? "text-emerald-600" : "text-muted-foreground",
                  )}
                >
                  <Check className={cn("size-3", !requirement.met && "opacity-30")} />
                  {requirement.label}
                </li>
              ))}
            </ul>
          </div>

          <SubmitButton isLoading={isSubmitting} loadingText="Creating..." className="mx-auto w-fit px-6">
            Create password
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default CreatePasswordForm;
