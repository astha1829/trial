"use client";

import { motion } from "framer-motion";

import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { AuthHeader } from "./auth-header";
import { FormFieldWrapper } from "./form-field-wrapper";
import { PasswordField } from "./password-field";
import { SubmitButton } from "./submit-button";
import { useLogin } from "../hooks/use-login";
import { TRUST_INDICATORS } from "../constants/auth-constants";

export function LoginForm() {
  const { form, onSubmit, isLoading, isSuccess } = useLogin();
  const { register, formState: { errors } } = form;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full"
    >
      <AuthHeader 
        title="Welcome Back" 
        subtitle="Access your CRM account and continue managing customers, conversations, and automation." 
      />



      {/* Core Form */}
      <form onSubmit={onSubmit} className="flex flex-col mt-6 select-none" noValidate>
        <div className="space-y-6">
          <FormFieldWrapper
            label="Work Email Address"
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

          <FormFieldWrapper
            label="Password"
            htmlFor="password"
            error={errors.password?.message}
          >
            <PasswordField
              {...register("password")}
              id="password"
              placeholder="Enter your password"
              disabled={isLoading}
              autoComplete="current-password"
              error={!!errors.password}
            />
          </FormFieldWrapper>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between text-sm mt-5 select-none">
          <label className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer font-medium transition-colors">
            <input
              type="checkbox"
              disabled={isLoading}
              className="h-4.5 w-4.5 rounded border-border text-primary focus:ring-primary/25 transition-all accent-primary cursor-pointer"
            />
            <span>Remember me</span>
          </label>
          
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton isLoading={isLoading} loadingText="Signing In..." className="mt-8">
          Sign In
        </SubmitButton>

        {/* Redirect/Create Account Promotion */}
        <p className="text-center text-sm text-muted-foreground select-none mt-4">
          Don&apos;t have a Nexus CRM account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            Create an account
          </Link>
        </p>

        {/* Trust Badges - Horizontal pill badges below button */}
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