import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";
import { GroupsClient } from "@/features/groups/components/groups-client";

export const metadata = {
  title: "Contact Groups | Nexus CRM",
  description: "Create and segment contact groups on Nexus CRM.",
};

export default function GroupsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <GroupsClient />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
