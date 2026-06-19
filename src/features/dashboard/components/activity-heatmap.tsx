"use client";

import React from "react";
import { Phone, Users } from "lucide-react";

interface ContactEntry {
  id: string;
  name: string;
  detail: string;
  isPhone: boolean;
  time: string;
}

interface ActivityHeatmapProps {
  contacts: any[];
}

export function ActivityHeatmap({ contacts = [] }: ActivityHeatmapProps) {
  const fallbackContacts: ContactEntry[] = [
    {
      id: "fallback-c1",
      name: "Satish",
      detail: "8511692939",
      isPhone: true,
      time: "Just now"
    },
    {
      id: "fallback-c2",
      name: "Vivek",
      detail: "9924000429",
      isPhone: true,
      time: "5m ago"
    },
    {
      id: "fallback-c3",
      name: "Jignesh",
      detail: "9722120616",
      isPhone: true,
      time: "12m ago"
    }
  ];

  const sortedContacts = [...contacts].sort(
    (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
  );

  const dynamicContacts: ContactEntry[] = sortedContacts.slice(0, 4).map((c) => {
    const name = `${c.first_name || ""} ${c.last_name || ""}`.trim() || "Unknown Contact";
    const detail = c.mobile_number || c.email || "No details";
    const isPhone = !!c.mobile_number;

    let timeStr = "Recently";
    if (c.created_at) {
      const date = new Date(c.created_at);
      timeStr = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    }

    return {
      id: c.id,
      name,
      detail,
      isPhone,
      time: timeStr
    };
  });

  const displayContacts = dynamicContacts.length > 0 ? dynamicContacts : fallbackContacts;

  return (
    <div
      className="w-full h-full rounded-[16px] border border-[rgba(255,255,255,0.06)] p-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between"
      style={{
        background: "linear-gradient(180deg, rgba(10, 18, 40, 0.98), rgba(5, 12, 28, 0.98))",
      }}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-[20px] select-none">
          <div className="flex flex-col gap-[4px]">
            <h2 className="text-[26px] font-bold text-white font-sans leading-[1.2]">
              Recently Created Contacts
            </h2>
            <p className="text-[13px] font-normal text-[rgba(255,255,255,0.65)] font-sans">
              Latest contacts added to the system
            </p>
          </div>
          <a
            href="/contacts"
            className="text-[14px] font-semibold text-[#8B5CF6] hover:underline font-sans mt-[4px]"
          >
            View All
          </a>
        </div>

        {/* Contacts List */}
        <div className="flex flex-col gap-[14px]">
          {displayContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between gap-[10px] p-[12px] h-[66px] rounded-[12px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
            >
              <div className="flex items-center gap-[12px] min-w-0">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="text-[16px] font-semibold text-white truncate font-sans leading-none">
                    {contact.name}
                  </span>
                  <span className="text-[13px] text-[rgba(255,255,255,0.70)] truncate font-sans mt-[4px] leading-none">
                    {contact.detail}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[rgba(255,255,255,0.50)] font-sans shrink-0">
                {contact.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
