"use client";

import { Check, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useResetPassword } from "../_hooks/useResetPassword";

interface ResetPasswordFormProps {
  token: string;
}

const FieldLabelText = ({ title }: { title: string }) => (
  <span className="text-base font-bold text-primary">{title}</span>
);

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const {
    form,
    onSubmit,
    isSubmitting,
    requirements,
    showPassword,
    toggleShowPassword,
    showConfirmPassword,
    toggleShowConfirmPassword,
  } = useResetPassword(token);
  const t = useTranslations("ResetPassword");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="rounded-2xl border border-border bg-card px-6 py-12">
        {/* Opened without the emailed link: nothing to submit, so send them to request a new one. */}
        {!token ? (
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 text-center">
            <h1 className="font-serif text-2xl font-bold text-primary">{t("invalidTitle")}</h1>
            <p className="text-xs text-muted-foreground">{t("invalidMessage")}</p>
            <Link
              href="/forgot-password"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-2 w-full")}
            >
              {t("requestNew")}
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="font-serif text-3xl font-bold text-primary">{t("title")}</h1>
              <p className="mt-2 text-xs text-muted-foreground">{t("subtitle")}</p>
            </div>

            <form onSubmit={onSubmit} className="mx-auto mt-10 flex w-full max-w-md flex-col gap-6">
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
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
