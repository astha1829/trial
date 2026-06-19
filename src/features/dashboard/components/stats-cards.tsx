"use client";

import React from "react";
import { 
  Users, 
  UsersRound, 
  Megaphone, 
  FileText, 
  Send 
} from "lucide-react";

interface StatsCardsProps {
  totalContacts: number;
  totalGroups: number;
  totalCampaigns: number;
  totalTemplates: number;
  totalMessagesSent: number;
}

export function StatsCards({
  totalContacts,
  totalGroups,
  totalCampaigns,
  totalTemplates,
  totalMessagesSent,
}: StatsCardsProps) {
  const cards = [
    {
      id: "contacts",
      label: "Total Contacts",
      value: totalContacts,
      trend: {
        value: "↑ 12.4%",
        label: "vs last week",
        isPositive: true,
      },
      icon: Users,
      iconColor: "#8B5CF6",
      glowColor: "#8B5CF6",
      iconGrad: "linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.05) 100%)",
      iconBorder: "rgba(139, 92, 246, 0.3)",
    },
    {
      id: "groups",
      label: "Total Groups",
      value: totalGroups,
      trend: {
        value: "↑ 4.1%",
        label: "vs last week",
        isPositive: true,
      },
      icon: UsersRound,
      iconColor: "#10D876",
      glowColor: "#10D876",
      iconGrad: "linear-gradient(135deg, rgba(16, 216, 118, 0.25) 0%, rgba(16, 216, 118, 0.05) 100%)",
      iconBorder: "rgba(16, 216, 118, 0.3)",
    },
    {
      id: "campaigns",
      label: "Total Campaigns",
      value: totalCampaigns,
      trend: {
        value: "↑ 8.2%",
        label: "vs last week",
        isPositive: true,
      },
      icon: Megaphone,
      iconColor: "#3B82F6",
      glowColor: "#3B82F6",
      iconGrad: "linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0.05) 100%)",
      iconBorder: "rgba(59, 130, 246, 0.3)",
    },
    {
      id: "templates",
      label: "Total Templates",
      value: totalTemplates,
      trend: {
        value: "No change",
        label: "",
        isPositive: false,
      },
      icon: FileText,
      iconColor: "#F59E0B",
      glowColor: "#8B5CF6", // Purple Glow for templates bottom line
      iconGrad: "linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0.05) 100%)",
      iconBorder: "rgba(245, 158, 11, 0.3)",
    },
    {
      id: "messages",
      label: "Messages Sent",
      value: totalMessagesSent,
      trend: {
        value: "↑ 15.3%",
        label: "vs last week",
        isPositive: true,
      },
      icon: Send,
      iconColor: "#FF4D7A",
      glowColor: "#FF4D7A",
      iconGrad: "linear-gradient(135deg, rgba(255, 77, 122, 0.25) 0%, rgba(255, 77, 122, 0.05) 100%)",
      iconBorder: "rgba(255, 77, 122, 0.3)",
    },
  ];

  return (
    <div className="w-full overflow-x-auto pb-2 -mb-2 scrollbar-none lg:overflow-x-visible lg:pb-0 lg:mb-0">
      <div className="grid grid-cols-5 gap-[16px] min-w-[1020px] lg:min-w-0">
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="relative h-[120px] rounded-[16px] border border-[rgba(255,255,255,0.06)] p-[22px] flex flex-row items-center gap-[20px] overflow-hidden hover:-translate-y-[2px] transition-transform duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.35)] select-none"
              style={{
                background: "linear-gradient(180deg, rgba(10, 18, 40, 0.98), rgba(5, 12, 28, 0.98))",
              }}
            >
              {/* Top-Left Icon Container */}
              <div
                className="w-[48px] h-[48px] rounded-[14px] shrink-0 flex items-center justify-center"
                style={{
                  background: card.iconGrad,
                  border: `1px solid ${card.iconBorder}`,
                }}
              >
                <IconComponent
                  size={22}
                  strokeWidth={2}
                  style={{
                    color: card.iconColor,
                    filter: `drop-shadow(0 0 5px ${card.iconColor}80)`,
                  }}
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-start justify-between h-full py-[2px] flex-1">
                <span className="text-[14px] font-medium text-[rgba(255,255,255,0.9)] font-sans leading-none tracking-normal">
                  {card.label}
                </span>
                <span className="text-[42px] font-bold text-white font-sans leading-none my-[2px]">
                  {card.value}
                </span>
                <div className="text-[13px] font-medium font-sans leading-none">
                  {card.trend.value === "No change" ? (
                    <span className="text-[rgba(255,255,255,0.55)]">No change</span>
                  ) : (
                    <>
                      <span className="text-[#10D876]">{card.trend.value}</span>
                      <span className="text-[rgba(255,255,255,0.55)] ml-1">
                        {card.trend.label}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Thin Glowing Accent Line at the Bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  backgroundColor: card.glowColor,
                  boxShadow: `0 -1px 8px ${card.glowColor}, 0 0 2px ${card.glowColor}`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
