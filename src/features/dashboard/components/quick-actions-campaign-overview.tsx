"use client";

import React from "react";
import {
  UserPlus,
  Megaphone,
  Send,
  Files,
  BarChart3,
  Activity,
  CheckCircle2,
  Calendar,
  XCircle,
  RefreshCw,
} from "lucide-react";

interface QuickActionsCampaignOverviewProps {
  handleActionClick: (actionName: string) => void;
  handleSyncData: () => void;
  isLoading: boolean;
  campaignOverview: {
    running: number;
    completed: number;
    failed: number;
    scheduled: number;
  };
}

export function QuickActionsCampaignOverview({
  handleActionClick,
  handleSyncData,
  isLoading,
  campaignOverview,
}: QuickActionsCampaignOverviewProps) {
  const actions = [
    {
      id: "create-contact",
      title: "Create Contact",
      subtitle: "Add new contact",
      icon: UserPlus,
      iconColor: "#8B5CF6",
      iconGrad: "linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.05) 100%)",
      iconBorder: "rgba(139, 92, 246, 0.3)",
    },
    {
      id: "create-group",
      title: "Create Group",
      subtitle: "Segment contacts",
      icon: UserPlus,
      iconColor: "#10D876",
      iconGrad: "linear-gradient(135deg, rgba(16, 216, 118, 0.25) 0%, rgba(16, 216, 118, 0.05) 100%)",
      iconBorder: "rgba(16, 216, 118, 0.3)",
    },
    {
      id: "create-campaign",
      title: "Create Campaign",
      subtitle: "Launch campaign",
      icon: Megaphone,
      iconColor: "#3B82F6",
      iconGrad: "linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0.05) 100%)",
      iconBorder: "rgba(59, 130, 246, 0.3)",
    },
    {
      id: "send-message",
      title: "Send Message",
      subtitle: "Broadcast message",
      icon: Send,
      iconColor: "#F59E0B",
      iconGrad: "linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0.05) 100%)",
      iconBorder: "rgba(245, 158, 11, 0.3)",
    },
    {
      id: "sync-templates",
      title: "Sync Templates",
      subtitle: "Fetch latest layouts",
      icon: Files,
      iconColor: "#8B5CF6",
      iconGrad: "linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.05) 100%)",
      iconBorder: "rgba(139, 92, 246, 0.3)",
    },
    {
      id: "view-reports",
      title: "View Reports",
      subtitle: "Campaign analytics",
      icon: BarChart3,
      iconColor: "#06B6D4",
      iconGrad: "linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.05) 100%)",
      iconBorder: "rgba(6, 182, 212, 0.3)",
    },
  ];

  const statuses = [
    {
      id: "running",
      title: "Running",
      value: campaignOverview.running,
      footer: `${campaignOverview.running} Active`,
      icon: Activity,
      textColor: "#3B82F6",
      bgClass: "rgba(59, 130, 246, 0.08)",
      borderClass: "rgba(59, 130, 246, 0.15)",
    },
    {
      id: "completed",
      title: "Completed",
      value: campaignOverview.completed,
      footer: `${campaignOverview.completed} Dispatched`,
      icon: CheckCircle2,
      textColor: "#10D876",
      bgClass: "rgba(16, 216, 118, 0.08)",
      borderClass: "rgba(16, 216, 118, 0.15)",
    },
    {
      id: "scheduled",
      title: "Scheduled",
      value: campaignOverview.scheduled,
      footer: `${campaignOverview.scheduled} Queued`,
      icon: Calendar,
      textColor: "#F59E0B",
      bgClass: "rgba(245, 158, 11, 0.08)",
      borderClass: "rgba(245, 158, 11, 0.15)",
    },
    {
      id: "failed",
      title: "Failed",
      value: campaignOverview.failed,
      footer: `${campaignOverview.failed} Halted`,
      icon: XCircle,
      textColor: "#FF5D7A",
      bgClass: "rgba(255, 93, 122, 0.08)",
      borderClass: "rgba(255, 93, 122, 0.15)",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-[16px] w-full select-none">
      {/* LEFT CARD (Quick Actions) */}
      <div
        className="w-full lg:w-[62%] h-auto lg:h-[260px] rounded-[16px] border border-[rgba(255,255,255,0.06)] px-[24px] pb-[24px] pt-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between"
        style={{
          background: "linear-gradient(180deg, rgba(10, 18, 40, 0.98), rgba(5, 12, 28, 0.98))",
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-[4px] items-start">
          <h2 className="text-[28px] font-bold text-white font-sans leading-none tracking-tight">
            Quick Actions
          </h2>
          <span className="text-[13px] text-[rgba(255,255,255,0.60)] font-sans">
            Perform common CRM operations
          </span>
        </div>

        {/* Action Cards Row */}
        <div className="w-full overflow-x-auto pb-1 -mb-1 scrollbar-none">
          <div className="flex flex-row gap-[6px] min-w-[930px] justify-between">
            {actions.map((act) => {
              const IconComp = act.icon;
              return (
                <button
                  key={act.id}
                  onClick={() => handleActionClick(act.title)}
                  className="w-[150px] h-[112px] min-h-[105px] max-h-[115px] rounded-[14px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] px-[12px] flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 hover:border-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.05)] transition-all duration-300 gap-[10px]"
                >
                  <div
                    className="w-[50px] h-[50px] rounded-[12px] flex items-center justify-center shrink-0"
                    style={{
                      background: act.iconGrad,
                      border: `1px solid ${act.iconBorder}`,
                    }}
                  >
                    <IconComp
                      size={24}
                      strokeWidth={2}
                      style={{
                        color: act.iconColor,
                        filter: `drop-shadow(0 0 4px ${act.iconColor}60)`,
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-[4px] w-full">
                    <span className="text-[15px] font-semibold text-white font-sans leading-none whitespace-nowrap">
                      {act.title.split(" ")[0]} {act.title.split(" ")[1] || ""}
                    </span>
                    <span className="text-[12px] text-[rgba(255,255,255,0.55)] font-sans leading-none whitespace-nowrap">
                      {act.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT CARD (Campaign Overview) */}
      <div
        className="w-full lg:w-[38%] h-auto lg:h-[260px] rounded-[16px] border border-[rgba(255,255,255,0.06)] p-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between"
        style={{
          background: "linear-gradient(180deg, rgba(10, 18, 40, 0.98), rgba(5, 12, 28, 0.98))",
        }}
      >
        {/* Header with Refresh button */}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col gap-[4px] items-start">
            <h2 className="text-[28px] font-bold text-white font-sans leading-none tracking-tight">
              Campaign Overview
            </h2>
            <span className="text-[13px] text-[rgba(255,255,255,0.60)] font-sans">
              Operational summary
            </span>
          </div>

          <button
            onClick={handleSyncData}
            className="w-[40px] h-[40px] rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[rgba(255,255,255,0.06)] hover:border-white/10 transition-all duration-300"
          >
            <RefreshCw
              size={18}
              className={`text-white/80 ${isLoading ? "animate-spin text-[#8B5CF6]" : ""}`}
            />
          </button>
        </div>

        {/* Status Cards */}
        <div className="w-full overflow-x-auto pb-1 -mb-1 scrollbar-none">
          <div className="flex flex-row gap-[10px] min-w-[360px] justify-between">
            {statuses.map((status) => {
              const IconComp = status.icon;
              return (
                <div
                  key={status.id}
                  className="w-[115px] h-[125px] rounded-[14px] p-[18px] flex flex-col justify-center gap-[12px] shrink-0"
                  style={{
                    backgroundColor: status.bgClass,
                    border: `1px solid ${status.borderClass}`,
                  }}
                >
                  <span
                    className="text-[14px] font-semibold font-sans leading-none"
                    style={{ color: status.textColor }}
                  >
                    {status.title}
                  </span>
                  <div className="flex flex-row items-center justify-between w-full">
                    <span className="text-[48px] font-bold text-white font-sans leading-none">
                      {status.value}
                    </span>
                    <IconComp
                      size={20}
                      strokeWidth={2}
                      style={{
                        color: status.textColor,
                        filter: `drop-shadow(0 0 3px ${status.textColor}60)`,
                      }}
                    />
                  </div>
                  <span
                    className="text-[13px] font-medium font-sans leading-none"
                    style={{ color: status.textColor }}
                  >
                    {status.footer}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Link */}
        <div className="text-left mt-[4px]">
          <button className="text-[14px] font-semibold text-[#8B5CF6] hover:underline cursor-pointer flex items-center gap-1 font-sans leading-none">
            <span>View all campaign dispatches</span>
            <span className="translate-y-[0.5px]">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
