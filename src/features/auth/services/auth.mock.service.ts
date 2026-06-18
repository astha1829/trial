import { SignUpPayload, SignUpResponse, LoginPayload, LoginResponse, ForgotPasswordPayload, ForgotPasswordResponse } from "../types/auth.types";

const isBrowser = typeof window !== "undefined";
const MOCK_USERS_KEY = "crm_mock_users";
const AUTH_TOKEN_KEY = "crm_auth_token";
const CURRENT_USER_KEY = "crm_current_user";

// Helper to fetch users list from localStorage
function getStoredUsers(): any[] {
  if (!isBrowser) return [];
  const stored = localStorage.getItem(MOCK_USERS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

// Helper to save users list to localStorage
function saveUsers(users: any[]) {
  if (!isBrowser) return;
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

// Automatically create default user test@example.com / 123456 on load
function initializeDefaultUser() {
  if (!isBrowser) return;
  const users = getStoredUsers();
  const defaultEmail = "test@example.com";
  const hasDefault = users.some(
    (u) => u.email.toLowerCase() === defaultEmail.toLowerCase()
  );
  if (!hasDefault) {
    users.push({
      email: defaultEmail,
      password: "123456",
      createdAt: new Date().toISOString(),
    });
    saveUsers(users);
  }
}

// Initialize default user
initializeDefaultUser();

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

  logout: () => {
    if (!isBrowser) return;
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  },
};
