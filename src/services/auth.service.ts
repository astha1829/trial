import axios from "axios";
import { LoginPayload, SignUpPayload } from "@/features/auth/types/auth.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://bulkify.9brainz.com";
// Reusable axios instance
export const api = axios.create({
  baseURL: typeof window === "undefined" ? API_URL : "",
});

// Axios Request Interceptor: Automatically attach Bearer token from localStorage
api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Token utility methods
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", token);
  }
}

export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  error?: string;
  token?: string;
}

export interface SignUpResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Centralized login API method
export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await api.post("/api/v1/clients/login", payload);

    const { status, message, data } = response.data || {};

    if (status === true && data?.access_token) {
      // Store token in localStorage
      setToken(data.access_token);

      return {
        success: true,
        message: message || "Login successful",
        token: data.access_token,
      };
    } else {
      return {
        success: false,
        error: message || "Invalid credentials",
      };
    }
  } catch (error: any) {


    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData && typeof responseData.message === "string") {
        return {
          success: false,
          error: responseData.message,
        };
      }
      if (error.response?.status === 422 && responseData && Array.isArray(responseData.detail)) {
        const validationError = responseData.detail
          .map((err: any) => err.msg || "Invalid value")
          .join(", ");
        return {
          success: false,
          error: validationError,
        };
      }
      return {
        success: false,
        error: responseData?.message || `Server error (${error.response?.status || 'network error'})`,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error. Please try again.",
    };
  }
}

// Centralized registration API method
export async function registerUser(payload: SignUpPayload): Promise<SignUpResponse> {
  const apiPayload = {
    email: payload.email,
    password: payload.password,
    whatsapp_app_id: "",
    whatsapp_phone_id: "",
    whatsapp_token: "",
  };

  try {
    const response = await api.post("/api/v1/clients/register", apiPayload);

    const { status, message } = response.data || {};

    if (status === false) {
      return {
        success: false,
        error: message || "Registration failed.",
      };
    }

    return {
      success: true,
      message: message || "Client registered successfully",
    };
  } catch (error: any) {


    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (error.response?.status === 422 && responseData && Array.isArray(responseData.detail)) {
        const validationError = responseData.detail
          .map((err: any) => err.msg || "Invalid value")
          .join(", ");
        return {
          success: false,
          error: validationError,
        };
      }
      return {
        success: false,
        error: responseData?.message || `Server error (${error.response?.status || 'network error'})`,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error. Please try again.",
    };
  }
}
