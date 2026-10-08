"use client";

import { Eye, EyeOff, Mail } from "lucide-react";
import Link from "next/link";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";

import { useLogin } from "../_hooks/useLogin";

const FieldLabelText = ({ title }: { title: string }) => (
  <span className="text-base font-bold text-primary">{title}</span>
);

const LoginForm = () => {
  const { form, onSubmit, isSubmitting, showPassword, toggleShowPassword } = useLogin();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="rounded-2xl border border-border bg-white px-6 py-12">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-primary">Welcome back</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            Log in to your Growth Space account to continue your journey.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mx-auto mt-10 flex w-full max-w-md flex-col gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            type="email"
            placeholder="name@example.com"
            label={<FieldLabelText title="Email Address" />}
            leftIcon={<Mail className="size-4 text-muted-foreground" />}
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

          <div className="flex items-center justify-between">
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="rememberMe"
              label="Remember me"
            />
            {/* TODO: no password-reset flow exists yet. */}
            <Link href="#" className="shrink-0 text-xs font-medium text-primary hover:opacity-80">
              Forgot password?
            </Link>
          </div>

          <SubmitButton isLoading={isSubmitting} loadingText="Logging in..." className="w-full">
            Log in
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
