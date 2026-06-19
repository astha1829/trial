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
      iconColor: "var(--accent-purple)",
      glowColor: "var(--accent-purple)",
      iconGrad: "linear-gradient(135deg, var(--accent-purple-25) 0%, var(--accent-purple-5) 100%)",
      iconBorder: "var(--accent-purple-30)",
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
      iconColor: "var(--accent-green)",
      glowColor: "var(--accent-green)",
      iconGrad: "linear-gradient(135deg, var(--accent-green-25) 0%, var(--accent-green-5) 100%)",
      iconBorder: "var(--accent-green-30)",
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
      iconColor: "var(--accent-blue)",
      glowColor: "var(--accent-blue)",
      iconGrad: "linear-gradient(135deg, var(--accent-blue-25) 0%, var(--accent-blue-5) 100%)",
      iconBorder: "var(--accent-blue-30)",
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
      iconColor: "var(--accent-orange)",
      glowColor: "var(--accent-purple)", // Purple Glow for templates bottom line
      iconGrad: "linear-gradient(135deg, var(--accent-orange-25) 0%, var(--accent-orange-5) 100%)",
      iconBorder: "var(--accent-orange-30)",
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
      iconColor: "var(--accent-red)",
      glowColor: "var(--accent-red)",
      iconGrad: "linear-gradient(135deg, var(--accent-red-25) 0%, var(--accent-red-5) 100%)",
      iconBorder: "var(--accent-red-30)",
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
              className="relative h-[120px] rounded-[16px] border border-stats-card-border p-[22px] flex flex-row items-center gap-[20px] overflow-hidden hover:-translate-y-[2px] transition-transform duration-300 select-none"
              style={{
                background: "var(--stats-card-bg)",
                boxShadow: "var(--stats-card-shadow)",
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
                    filter: `drop-shadow(0 0 5px ${card.iconColor})`,
                  }}
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-start justify-between h-full py-[2px] flex-1">
                <span 
                  className="text-[14px] font-medium font-sans leading-none tracking-normal"
                  style={{ color: "var(--stats-card-label-text)" }}
                >
                  {card.label}
                </span>
                <span 
                  className="text-[42px] font-bold font-sans leading-none my-[2px]"
                  style={{ color: "var(--stats-card-value-text)" }}
                >
                  {card.value}
                </span>
                <div className="text-[13px] font-medium font-sans leading-none">
                  {card.trend.value === "No change" ? (
                    <span style={{ color: "var(--stats-card-trend-text)" }}>No change</span>
                  ) : (
                    <>
                      <span className="text-accent-green">{card.trend.value}</span>
                      <span className="ml-1" style={{ color: "var(--stats-card-trend-text)" }}>
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
