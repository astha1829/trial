"use client";

import { motion } from "framer-motion";

import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import { AuthHeader } from "./auth-header";
import { FormFieldWrapper } from "./form-field-wrapper";
import { PasswordField } from "./password-field";
import { SubmitButton } from "./submit-button";
import { useSignup } from "../hooks/use-signup";
import { TRUST_INDICATORS } from "../constants/auth-constants";

export function SignupForm() {
  const { form, onSubmit, isLoading, isSuccess } = useSignup();
  const { register, watch, formState: { errors } } = form;

  const passwordValue = watch("password", "");
  const confirmPasswordValue = watch("confirmPassword", "");
  const passwordsMatch = passwordValue === confirmPasswordValue;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full"
    >
      <AuthHeader 
        title="Create Your Account" 
        subtitle="Create your CRM workspace and get started." 
      />



      {/* Core Form */}
      <form onSubmit={onSubmit} className="flex flex-col mt-6 select-none" noValidate>
        <div className="space-y-6">
          <FormFieldWrapper
            label="Email Address"
            htmlFor="email"
            error={errors.email?.message}
          >
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="name@company.com"
              disabled={isLoading || isSuccess}
              autoComplete="email"
              className={`w-full h-[52px] px-4 rounded-xl border bg-background text-[16px] font-medium text-foreground placeholder-muted-foreground placeholder-opacity-100 focus:outline-none transition-all disabled:bg-secondary disabled:text-muted-foreground ${
                errors.email
                  ? "border-destructive focus:ring-2 focus:ring-destructive/20 focus:border-destructive"
                  : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              }`}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Password"
            htmlFor="password"
            error={errors.password?.message}
          >
            <PasswordField
              {...register("password")}
              id="password"
              placeholder="Enter your password"
              disabled={isLoading || isSuccess}
              autoComplete="new-password"
              error={!!errors.password}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Confirm Password"
            htmlFor="confirmPassword"
            error={errors.confirmPassword?.message}
          >
            <PasswordField
              {...register("confirmPassword")}
              id="confirmPassword"
              placeholder="Confirm your password"
              disabled={isLoading || isSuccess}
              autoComplete="new-password"
              error={!!errors.confirmPassword}
            />

            {/* Live Password Match Validation */}
            {passwordValue && confirmPasswordValue && (
              <div className="mt-2.5 text-xs font-semibold select-none animate-fade-in transition-colors">
                {passwordsMatch ? (
                  <span className="text-emerald-500 flex items-center gap-1.5 transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Passwords match
                  </span>
                ) : (
                  <span className="text-destructive flex items-center gap-1.5 transition-colors">
                    <XCircle className="h-4 w-4 text-destructive" />
                    Passwords do not match
                  </span>
                )}
              </div>
            )}
          </FormFieldWrapper>
        </div>

        <SubmitButton isLoading={isLoading} loadingText="Creating Account..." className="mt-8" disabled={isSuccess}>
          Create Account
        </SubmitButton>

        {/* Redirect back to Login */}
        <p className="text-center text-sm text-muted-foreground select-none mt-4 transition-colors">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            Sign In
          </Link>
        </p>

        {/* Trust Badges */}
        <div className="border-t border-border pt-6 mt-8 transition-colors">
          <div className="flex items-center justify-center gap-2 px-1 flex-wrap">
            {TRUST_INDICATORS.map((badge, i) => (
              <span 
                key={i} 
                className="px-3 py-1 rounded-full bg-secondary border border-border text-foreground text-xs font-semibold shadow-sm transition-colors"
              >
                {badge.text}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wider mt-4 select-none transition-colors">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Protected by Enterprise Security</span>
          </div>
        </div>
      </form>


    </motion.div>
  );
}
