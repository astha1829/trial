import { TemplatesClient } from "@/features/templates/components/templates-client";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";

export const metadata = {
  title: "Templates | Nexus CRM",
  description: "Monitor performance, health, and test your WhatsApp Business templates.",
};

export default function TemplatesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <TemplatesClient />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
