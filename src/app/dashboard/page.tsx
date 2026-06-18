import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";
import { DashboardClient } from "@/features/dashboard/components/dashboard-client";

export const metadata = {
  title: "Workspace Dashboard | Nexus CRM",
  description: "Access campaign details, sync customer segments, templates, and view system logs on Nexus CRM.",
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardClient />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
