import { ForgotPasswordPayload, ForgotPasswordResponse } from "../types/auth.types";

export const authMockService = {
  forgotPassword: async (payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (payload.email.toLowerCase() === "error@example.com") {
      return {
        success: false,
        error: "Unable to send password reset link. Please try again.",
      };
    }

    return {
      success: true,
      message: "Password reset link sent",
    };
  },
};
