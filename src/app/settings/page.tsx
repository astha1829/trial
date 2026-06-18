import { SettingsForm } from "@/features/settings/components/settings-form";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";

export const metadata = {
  title: "Settings | Nexus CRM",
  description: "Configure your primary communication and Meta routing parameters.",
};

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <SettingsForm />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
