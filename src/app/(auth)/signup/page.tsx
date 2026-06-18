import { AuthLayout } from "../../../features/auth/components/auth-layout";
import { SignupForm } from "../../../features/auth/components/signup-form";

export const metadata = {
  title: "Sign Up | Nexus CRM",
  description: "Create your Nexus CRM workspace and get started.",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
