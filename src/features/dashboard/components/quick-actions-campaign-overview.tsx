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
  templatesCount?: number;
  totalMessagesSent?: number;
  campaignsCount?: number;
  contactsCount?: number;
  groupsCount?: number;
}

export function QuickActionsCampaignOverview({
  handleActionClick,
  handleSyncData,
  isLoading,
  campaignOverview,
  templatesCount = 0,
  totalMessagesSent = 0,
  campaignsCount = 0,
  contactsCount = 0,
  groupsCount = 0,
}: QuickActionsCampaignOverviewProps) {
  const actions = [
    {
      id: "create-contact",
      title: "Create Contact",
      subtitle: isLoading
        ? "Loading..."
        : !contactsCount
          ? "No Contacts"
          : `${contactsCount} Total Contact${contactsCount === 1 ? "" : "s"}`,
      icon: UserPlus,
      iconColor: "var(--accent-purple)",
      iconGrad: "linear-gradient(135deg, var(--accent-purple-25) 0%, var(--accent-purple-5) 100%)",
      iconBorder: "var(--accent-purple-30)",
    },
    {
      id: "create-group",
      title: "Create Group",
      subtitle: isLoading
        ? "Loading..."
        : !groupsCount
          ? "No Active Groups"
          : `${groupsCount} Active Group${groupsCount === 1 ? "" : "s"}`,
      icon: UserPlus,
      iconColor: "var(--accent-green)",
      iconGrad: "linear-gradient(135deg, var(--accent-green-25) 0%, var(--accent-green-5) 100%)",
      iconBorder: "var(--accent-green-30)",
    },
    {
      id: "create-campaign",
      title: "Create Campaign",
      subtitle: isLoading
        ? "Loading..."
        : !campaignsCount
          ? "No Campaigns"
          : `${campaignsCount} Total Campaign${campaignsCount === 1 ? "" : "s"}`,
      icon: Megaphone,
      iconColor: "var(--accent-blue)",
      iconGrad: "linear-gradient(135deg, var(--accent-blue-25) 0%, var(--accent-blue-5) 100%)",
      iconBorder: "var(--accent-blue-30)",
    },
    {
      id: "send-message",
      title: "Send Message",
      subtitle: isLoading
        ? "Loading..."
        : !totalMessagesSent
          ? "No Messages Sent"
          : `${totalMessagesSent} Message${totalMessagesSent === 1 ? "" : "s"} Sent`,
      icon: Send,
      iconColor: "var(--accent-orange)",
      iconGrad: "linear-gradient(135deg, var(--accent-orange-25) 0%, var(--accent-orange-5) 100%)",
      iconBorder: "var(--accent-orange-30)",
    },
    {
      id: "sync-templates",
      title: "Sync Templates",
      subtitle: isLoading
        ? "Loading..."
        : !templatesCount
          ? "No Templates"
          : `${templatesCount} Template${templatesCount === 1 ? "" : "s"} Available`,
      icon: Files,
      iconColor: "var(--accent-purple)",
      iconGrad: "linear-gradient(135deg, var(--accent-purple-25) 0%, var(--accent-purple-5) 100%)",
      iconBorder: "var(--accent-purple-30)",
    },
    {
      id: "view-reports",
      title: "View Reports",
      subtitle: isLoading
        ? "Loading..."
        : !campaignsCount
          ? "No Campaign Reports"
          : `${campaignsCount} Campaign Report${campaignsCount === 1 ? "" : "s"}`,
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
      textColor: "var(--status-running-text)",
      bgClass: "var(--status-running-bg)",
      borderClass: "var(--status-running-border)",
      glowColor: "var(--status-running-glow)",
    },
    {
      id: "completed",
      title: "Completed",
      value: campaignOverview.completed,
      footer: `${campaignOverview.completed} Dispatched`,
      icon: CheckCircle2,
      textColor: "var(--status-completed-text)",
      bgClass: "var(--status-completed-bg)",
      borderClass: "var(--status-completed-border)",
      glowColor: "var(--status-completed-glow)",
    },
    {
      id: "scheduled",
      title: "Scheduled",
      value: campaignOverview.scheduled,
      footer: `${campaignOverview.scheduled} Queued`,
      icon: Calendar,
      textColor: "var(--status-scheduled-text)",
      bgClass: "var(--status-scheduled-bg)",
      borderClass: "var(--status-scheduled-border)",
      glowColor: "var(--status-scheduled-glow)",
    },
    {
      id: "failed",
      title: "Failed",
      value: campaignOverview.failed,
      footer: `${campaignOverview.failed} Halted`,
      icon: XCircle,
      textColor: "var(--status-failed-text)",
      bgClass: "var(--status-failed-bg)",
      borderClass: "var(--status-failed-border)",
      glowColor: "var(--status-failed-glow)",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-[16px] w-full select-none">
      {/* LEFT CARD (Quick Actions) */}
      <div
        className="w-full lg:w-[62%] h-auto lg:h-[260px] rounded-[16px] border border-stats-card-border px-[24px] pb-[24px] pt-[28px] flex flex-col justify-between"
        style={{
          background: "var(--stats-card-bg)",
          boxShadow: "var(--stats-card-shadow)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-[4px] items-start">
          <h2 className="text-[28px] font-bold text-foreground font-sans leading-none tracking-tight">
            Quick Actions
          </h2>
          <span className="text-[13px] text-muted-foreground font-sans">
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
                  className="w-[150px] h-[112px] min-h-[105px] max-h-[115px] rounded-[14px] px-[12px] flex flex-col items-center justify-center text-center cursor-pointer quick-action-btn gap-[10px]"
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
                        filter: `drop-shadow(0 0 4px ${act.iconColor})`,
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-[4px] w-full">
                    <span className="text-[15px] font-semibold text-foreground font-sans leading-none whitespace-nowrap">
                      {act.title.split(" ")[0]} {act.title.split(" ")[1] || ""}
                    </span>
                    <span className="text-[12px] text-muted-foreground font-sans leading-none whitespace-nowrap">
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
        className="w-full lg:w-[38%] h-auto lg:h-[260px] rounded-[16px] border border-stats-card-border p-[24px] flex flex-col justify-between"
        style={{
          background: "var(--stats-card-bg)",
          boxShadow: "var(--stats-card-shadow)",
        }}
      >
        {/* Header with Refresh button */}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col gap-[4px] items-start">
            <h2 className="text-[28px] font-bold text-foreground font-sans leading-none tracking-tight">
              Campaign Overview
            </h2>
            <span className="text-[13px] text-muted-foreground font-sans">
              Operational summary
            </span>
          </div>

          <button
            onClick={handleSyncData}
            className="w-[40px] h-[40px] rounded-[12px] bg-secondary border border-border flex items-center justify-center shrink-0 cursor-pointer hover:bg-secondary/80 hover:border-border/80 transition-all duration-300"
          >
            <RefreshCw
              size={18}
              className={`text-foreground/80 ${isLoading ? "animate-spin text-accent-purple" : ""}`}
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
                    <span className="text-[48px] font-bold text-foreground font-sans leading-none">
                      {status.value}
                    </span>
                    <IconComp
                      size={20}
                      strokeWidth={2}
                      style={{
                        color: status.textColor,
                        filter: `drop-shadow(0 0 3px ${status.glowColor})`,
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
          <button className="text-[14px] font-semibold text-accent-purple hover:underline cursor-pointer flex items-center gap-1 font-sans leading-none">
            <span>View all campaign dispatches</span>
            <span className="translate-y-[0.5px]">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
