"use client";

import { MailCheck, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useForgotPassword } from "../_hooks/useForgotPassword";

const FieldLabelText = ({ title }: { title: string }) => (
  <span className="text-base font-bold text-primary">{title}</span>
);

const ForgotPasswordForm = () => {
  const { form, onSubmit, isSubmitting, sentTo } = useForgotPassword();
  const t = useTranslations("ForgotPassword");

  return (
    <div className="mx-auto my-auto w-full max-w-3xl px-6 py-6">
      <div className="onboarding-form rounded-2xl border border-border bg-card px-6 py-8">
        {sentTo ? (
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 text-center">
            <MailCheck className="size-10 text-primary" />
            <h1 className="font-serif text-2xl font-bold text-primary">{t("sentTitle")}</h1>
            <p className="text-xs text-muted-foreground">{t("sentMessage", { email: sentTo })}</p>
            <Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-2 w-full")}>
              {t("backToLogin")}
            </Link>
          </div>
        ) : (
          <>
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

              <SubmitButton isLoading={isSubmitting} loadingText={t("submitting")} className="w-full">
                {t("submit")}
              </SubmitButton>

              <Link
                href="/login"
                className="text-center text-xs font-medium text-primary hover:opacity-80"
              >
                {t("backToLogin")}
              </Link>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
