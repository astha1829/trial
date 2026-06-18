import { CreateCampaignForm } from "@/features/campaigns/components/create-campaign-form";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";

export const metadata = {
  title: "Create Campaign | Nexus CRM",
  description: "Configure your campaign parameters and scheduling.",
};

export default function CreateCampaignPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <CreateCampaignForm />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
