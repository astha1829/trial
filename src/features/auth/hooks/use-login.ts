"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, LoginSchemaType } from "../schemas/login.schema";
import { loginUser } from "../services/auth.service";
import { showPromiseToast } from "@/lib/toast-helper";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const loginPromise = loginUser(data).then((res) => {
        if (!res.success) {
          throw new Error(res.error || "Invalid credentials");
        }
        return res;
      });

      await showPromiseToast(loginPromise, {
        loadingText: "Authenticating client account...",
        successMessage: (res) => res.message || "Login successful",
        errorMessage: (err) => err.message || "Invalid credentials",
      });

      setIsSuccess(true);

      if (typeof window !== "undefined") {
        localStorage.setItem("user_email", data.email);
      }
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      // Error handled by toast
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