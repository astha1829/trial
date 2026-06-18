import { CampaignList } from "@/features/campaigns/components/campaign-list";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";

export const metadata = {
  title: "Campaigns | Nexus CRM",
  description: "Create, monitor and track WhatsApp campaign delivery.",
};

export default function CampaignsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <CampaignList />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
