"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import { useAppDispatch } from "@/redux/app/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";

import { loginSchema } from "../_constants";
import type { LoginValues } from "../_types";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  // Never log these values — they include the password.
  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const { data } = await login(values).unwrap();
      dispatch(
        setCredentials({
          token: data.accessToken,
          user: { ...data.user, role: { title: "Applicant" } },
        }),
      );
      toast.success("Welcome back");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Something went wrong logging you in. Please try again."));
    }
  });

  return {
    form,
    onSubmit,
    isSubmitting: isLoading,
    showPassword,
    toggleShowPassword: () => setShowPassword((prev) => !prev),
  };
};
