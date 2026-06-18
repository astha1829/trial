export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message?: string;
  error?: string;
  token?: string;
  user?: {
    email: string;
  };
};

export type SignUpPayload = {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
  companyName?: string;
  terms?: boolean;
};

export type SignUpResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
  message?: string;
  error?: string;
};