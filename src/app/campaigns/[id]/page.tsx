import { CampaignDetails } from "@/features/campaigns/components/campaign-details";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";

export const metadata = {
  title: "Campaign Details | Nexus CRM",
  description: "Monitor and track your WhatsApp campaign delivery.",
};

export default async function CampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <CampaignDetails id={resolvedParams.id} />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
