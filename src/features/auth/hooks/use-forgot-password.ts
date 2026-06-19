"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "../schemas/forgot-password.schema";
import { authMockService } from "../services/auth.mock.service";
import { showPromiseToast } from "@/lib/toast-helper";

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    setIsLoading(true);
    try {
      const resetPromise = authMockService.forgotPassword(data).then((res) => {
        if (!res.success) {
          throw new Error(res.error || "Unable to send password reset link. Please try again.");
        }
        return res;
      });

      await showPromiseToast(resetPromise, {
        loadingText: "Sending password reset link...",
        successMessage: (res) => res.message || "Password reset link sent",
        errorMessage: (err) => err.message || "Unable to send password reset link. Please try again.",
      });

      setIsSuccess(true);
      form.reset({ email: "" });
    } catch (err) {
      
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    isSuccess,
  };
}
