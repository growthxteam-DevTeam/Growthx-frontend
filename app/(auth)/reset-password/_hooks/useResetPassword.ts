"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";

import { PASSWORD_REQUIREMENTS, resetPasswordSchema } from "../_constants";
import type { ResetPasswordValues } from "../_types";

export const useResetPassword = (token: string) => {
  const router = useRouter();
  const t = useTranslations("ResetPassword");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({ control: form.control, name: "password" });
  const requirements = PASSWORD_REQUIREMENTS.map((requirement) => ({
    key: requirement.key,
    met: requirement.pattern.test(password),
  }));

  // Never log these values — they include the password and the reset token.
  const onSubmit = form.handleSubmit(async ({ password: newPassword }) => {
    try {
      await resetPassword({ token, password: newPassword }).unwrap();
      toast.success(t("success"));
      router.push("/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("error")));
    }
  });

  return {
    form,
    onSubmit,
    isSubmitting: isLoading,
    requirements,
    showPassword,
    toggleShowPassword: () => setShowPassword((prev) => !prev),
    showConfirmPassword,
    toggleShowConfirmPassword: () => setShowConfirmPassword((prev) => !prev),
  };
};
