"use client";

import { Eye, EyeOff, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useLogin } from "../_hooks/useLogin";

const FieldLabelText = ({ title }: { title: string }) => (
  <span className="text-base font-bold text-primary">{title}</span>
);

const LoginForm = () => {
  const { form, onSubmit, isSubmitting, showPassword, toggleShowPassword } = useLogin();
  const t = useTranslations("Login");

  return (
    <div className="mx-auto my-auto w-full max-w-3xl px-6 py-6">
      <div className="onboarding-form rounded-2xl border border-border bg-card px-6 py-8">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-primary">{t("title")}</h1>
          <p className="mt-2 text-xs text-muted-foreground">{t("subtitle")}</p>
        </div>

        <form onSubmit={onSubmit} className="mx-auto mt-6 flex w-full max-w-md flex-col gap-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            type="email"
            placeholder="name@example.com"
            label={<FieldLabelText title={t("email")} />}
            leftIcon={<Mail className="size-4 text-muted-foreground" />}
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

          <div className="flex items-center justify-between">
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="rememberMe"
              label={t("rememberMe")}
            />
            {/* TODO: no password-reset flow exists yet. */}
            <Link href="#" className="shrink-0 text-xs font-medium text-primary hover:opacity-80">
              {t("forgotPassword")}
            </Link>
          </div>

          <SubmitButton isLoading={isSubmitting} loadingText={t("submitting")} className="w-full">
            {t("submit")}
          </SubmitButton>

          <p className="text-center text-xs text-muted-foreground">{t("noAccount")}</p>
          <Link href="/onboarding" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "-mt-2 w-full")}>
            {t("apply")}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
