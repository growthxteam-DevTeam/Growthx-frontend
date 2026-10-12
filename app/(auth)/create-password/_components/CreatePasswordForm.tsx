"use client";

import { Check, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

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
    requirements,
    showPassword,
    toggleShowPassword,
    showConfirmPassword,
    toggleShowConfirmPassword,
  } = useCreatePassword(gsCode);
  const t = useTranslations("CreatePassword");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="rounded-2xl border border-border bg-white px-6 py-12">
        <div className="text-center">
          <p className="font-serif text-lg font-bold text-primary">{t("congrats")}</p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-primary">{t("title")}</h1>
          <p className="mt-2 text-xs text-muted-foreground">{t("subtitle")}</p>
        </div>

        <form onSubmit={onSubmit} className="mx-auto mt-10 flex w-full max-w-md flex-col gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="gsCode"
            type="text"
            label={<FieldLabelText title={t("gsCode")} hint={t("gsCodeHint")} />}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="password"
            type={showPassword ? "text" : "password"}
            label={<FieldLabelText title={t("password")} />}
            rightIcon={
              <button
                type="button"
                onClick={toggleShowPassword}
                aria-label={showPassword ? t("hidePassword") : t("showPassword")}
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
            label={<FieldLabelText title={t("confirmPassword")} />}
            rightIcon={
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                aria-label={showConfirmPassword ? t("hidePassword") : t("showPassword")}
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
          />

          <div>
            <p className="text-[10px] text-muted-foreground">{t("requirementsTitle")}</p>
            <ul className="mt-3 space-y-0.5">
              {requirements.map((requirement) => (
                <li
                  key={requirement.key}
                  className={cn(
                    "flex items-center gap-1 text-[10px]",
                    requirement.met ? "text-emerald-600" : "text-muted-foreground",
                  )}
                >
                  <Check className={cn("size-3", !requirement.met && "opacity-30")} />
                  {t(`requirements.${requirement.key}`)}
                </li>
              ))}
            </ul>
          </div>

          <SubmitButton isLoading={isSubmitting} loadingText={t("submitting")} className="mx-auto w-fit px-6">
            {t("submit")}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default CreatePasswordForm;
