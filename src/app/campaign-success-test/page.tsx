"use client";

import { CampaignSuccessCard } from "@/features/campaigns/components/campaign-success-card";
import { CampaignAnalyticsStats } from "@/features/campaigns/components/campaign-analytics-stats";

export default function CampaignSuccessTestPage() {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] p-8 md:p-16 flex flex-col gap-16 font-sans">

      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-800">1. Campaign Success Summary Card</h2>
        <CampaignSuccessCard />
      </div>

      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-800">2. Campaign Analytics Stats Section</h2>
        {}
        <div className="w-full overflow-x-auto pb-8">
          <div className="min-w-[1200px]">
            <CampaignAnalyticsStats />
          </div>
        </div>
      </div>

    </div>
  );
}
