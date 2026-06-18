import { AuthLayout } from "../../../features/auth/components/auth-layout";
import { LoginForm } from "../../../features/auth/components/login-form";

export const metadata = {
  title: "Login | Nexus CRM",
  description: "Access your Nexus CRM workspace and continue managing customers, conversations, and automation.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}