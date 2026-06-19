"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signupSchema, SignupSchemaType } from "../schemas/signup.schema";
import { registerUser } from "../services/auth.service";
import { showPromiseToast } from "@/lib/toast-helper";

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupSchemaType) => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const registerPromise = registerUser(data).then((res) => {
        if (!res.success) {
          throw new Error(res.error || "Signup failed");
        }
        return res;
      });

      await showPromiseToast(registerPromise, {
        loadingText: "Creating client account...",
        successMessage: (res) => res.message || "Client registered successfully",
        errorMessage: (err) => err.message || "Registration failed",
      });

      setIsSuccess(true);
      
      
      form.reset({
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
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
