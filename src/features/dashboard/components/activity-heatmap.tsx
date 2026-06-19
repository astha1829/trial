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
      className="w-full h-full rounded-[16px] border border-stats-card-border p-[24px] flex flex-col justify-between"
      style={{
        background: "var(--stats-card-bg)",
        boxShadow: "var(--stats-card-shadow)",
      }}
    >
      <div>
        {}
        <div className="flex items-start justify-between mb-[20px] select-none">
          <div className="flex flex-col gap-[4px]">
            <h2 className="text-[26px] font-bold text-foreground font-sans leading-[1.2]">
              Recently Created Contacts
            </h2>
            <p className="text-[13px] font-normal text-muted-foreground font-sans">
              Latest contacts added to the system
            </p>
          </div>
          <a
            href="/contacts"
            className="text-[14px] font-semibold text-accent-purple hover:underline font-sans mt-[4px]"
          >
            View All
          </a>
        </div>

        {}
        <div className="flex flex-col gap-[14px]">
          {displayContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between gap-[10px] p-[12px] h-[66px] rounded-[12px] bg-[var(--item-bg)] border border-[var(--item-border)] hover:bg-[var(--item-hover-bg)] transition-colors"
            >
              <div className="flex items-center gap-[12px] min-w-0">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-accent-purple/10 border border-accent-purple/20 text-accent-purple flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="text-[16px] font-semibold text-foreground truncate font-sans leading-none">
                    {contact.name}
                  </span>
                  <span className="text-[13px] text-muted-foreground truncate font-sans mt-[4px] leading-none">
                    {contact.detail}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground shrink-0">
                {contact.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
