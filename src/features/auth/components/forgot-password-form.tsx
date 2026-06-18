"use client";

import { motion } from "framer-motion";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { AuthHeader } from "./auth-header";
import { FormFieldWrapper } from "./form-field-wrapper";
import { SubmitButton } from "./submit-button";
import { useForgotPassword } from "../hooks/use-forgot-password";
import { TRUST_INDICATORS } from "../constants/auth-constants";

export function ForgotPasswordForm() {
  const { form, onSubmit, isLoading } = useForgotPassword();
  const { register, formState: { errors } } = form;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full"
    >
      <div className="mb-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Login</span>
        </Link>
      </div>

      <AuthHeader 
        title="Forgot Password?" 
        subtitle="Enter your email address and we'll send you a password reset link." 
      />

      {/* Core Form */}
      <form onSubmit={onSubmit} className="flex flex-col mt-6" noValidate>
        
        {/* Email Address */}
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
            disabled={isLoading}
            autoComplete="email"
            className={`w-full h-[52px] px-4 rounded-xl border bg-background text-[16px] font-medium text-foreground placeholder-muted-foreground placeholder-opacity-100 focus:outline-none transition-all disabled:bg-secondary disabled:text-muted-foreground ${
              errors.email
                ? "border-destructive focus:ring-2 focus:ring-destructive/20 focus:border-destructive"
                : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
            }`}
          />
        </FormFieldWrapper>

        <SubmitButton 
          isLoading={isLoading} 
          loadingText="Sending..."
          className="mt-8"
        >
          Send Reset Link
        </SubmitButton>

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
