import { AuthLayout } from "../../../features/auth/components/auth-layout";
import { ForgotPasswordForm } from "../../../features/auth/components/forgot-password-form";

export const metadata = {
  title: "Forgot Password | Nexus CRM",
  description: "Reset your Nexus CRM password and continue managing customer relationships.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
