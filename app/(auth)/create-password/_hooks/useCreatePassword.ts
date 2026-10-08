"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import { useCreatePasswordMutation } from "@/redux/features/applications/applicationsApi";

import { PASSWORD_REQUIREMENTS, createPasswordSchema } from "../_constants";
import type { CreatePasswordValues } from "../_types";

export const useCreatePassword = (initialGsCode: string) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordCreated, setIsPasswordCreated] = useState(false);

  const [createPassword, { isLoading }] = useCreatePasswordMutation();

  const form = useForm<CreatePasswordValues>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      gsCode: initialGsCode,
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({ control: form.control, name: "password" });
  const requirements = PASSWORD_REQUIREMENTS.map((requirement) => ({
    label: requirement.label,
    met: requirement.pattern.test(password),
  }));

  // Never log these values — they include the password.
  const onSubmit = form.handleSubmit(async ({ gsCode, password: newPassword }) => {
    try {
      await createPassword({ gsCode, password: newPassword }).unwrap();
      setIsPasswordCreated(true);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Something went wrong creating your password. Please try again."));
    }
  });

  return {
    form,
    onSubmit,
    isSubmitting: isLoading,
    isPasswordCreated,
    requirements,
    showPassword,
    toggleShowPassword: () => setShowPassword((prev) => !prev),
    showConfirmPassword,
    toggleShowConfirmPassword: () => setShowConfirmPassword((prev) => !prev),
  };
};
