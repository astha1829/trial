import { GroupsClient } from "@/features/groups/components/groups-client";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";

export const metadata = {
  title: "Groups | Nexus CRM",
  description: "Segment your contacts to streamline marketing campaigns, broadcasts, and automations.",
};

export default function GroupsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <GroupsClient />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
