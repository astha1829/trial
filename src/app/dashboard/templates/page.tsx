import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";
import { TemplatesClient } from "@/features/templates/components/templates-client";

export const metadata = {
  title: "Templates Registry | Nexus CRM",
  description: "Manage and synchronize WhatsApp Business templates on Nexus CRM.",
};

export default function TemplatesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <TemplatesClient />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
