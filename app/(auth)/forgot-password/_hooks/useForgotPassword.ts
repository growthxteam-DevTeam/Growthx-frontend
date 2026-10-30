"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";

import { forgotPasswordSchema } from "../_constants";
import type { ForgotPasswordValues } from "../_types";

export const useForgotPassword = () => {
  const t = useTranslations("ForgotPassword");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  // Set to the submitted address once the request succeeds, which swaps the form for a "check your email" message.
  const [sentTo, setSentTo] = useState<string | null>(null);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await forgotPassword(values).unwrap();
      setSentTo(values.email);
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("error")));
    }
  });

  return {
    form,
    onSubmit,
    isSubmitting: isLoading,
    sentTo,
  };
};
