"use client";

import React from "react";
import { FolderOpen, Layers, Users } from "lucide-react";

interface GroupEntry {
  id: string;
  name: string;
  count: number;
  time: string;
}

interface AiCopilotProps {
  groups: any[];
  contacts: any[];
}

export function AiCopilot({ groups = [], contacts = [] }: AiCopilotProps) {
  const fallbackGroups: GroupEntry[] = [
    {
      id: "fallback-g1",
      name: "Office",
      count: 0,
      time: "Just now"
    }
  ];

  const dynamicGroups: GroupEntry[] = groups.slice(0, 4).map((g) => {
    const count = contacts.filter((c) => c.group_ids?.includes(g.id) || c.group_id === g.id).length;
    return {
      id: g.id || String(Math.random()),
      name: g.title || g.name || "Untitled Group",
      count,
      time: "Just now"
    };
  });

  const displayGroups = dynamicGroups.length > 0 ? dynamicGroups : fallbackGroups;

  const group = displayGroups[0];

  return (
    <div
      className="w-full h-full rounded-[16px] border border-[rgba(255,255,255,0.06)] p-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between"
      style={{
        background: "linear-gradient(180deg, rgba(10, 18, 40, 0.98), rgba(5, 12, 28, 0.98))",
      }}
    >
      <div className="flex-1 flex flex-col gap-[20px]">
        {/* Header */}
        <div className="flex items-start justify-between select-none">
          <div className="flex flex-col gap-[4px]">
            <h2 className="text-[26px] font-bold text-white font-sans leading-[1.2]">
              Recently Created Groups
            </h2>
            <p className="text-[13px] font-normal text-[rgba(255,255,255,0.65)] font-sans">
              Audience segments and groups
            </p>
          </div>
          <a
            href="/groups"
            className="text-[14px] font-semibold text-[#8B5CF6] hover:underline font-sans mt-[4px]"
          >
            View All
          </a>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col gap-[12px]">
          {/* Top Group Card */}
          {group && (
            <div
              className="w-full h-[68px] rounded-[12px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] px-[16px] flex items-center justify-between gap-[10px] hover:bg-[rgba(255,255,255,0.04)] transition-colors shrink-0"
            >
              <div className="flex items-center gap-[12px] min-w-0">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-[#10D876]/10 border border-[#10D876]/20 text-[#10D876] flex items-center justify-center shrink-0">
                  <Layers size={18} />
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="text-[16px] font-semibold text-white truncate font-sans leading-none">
                    {group.name}
                  </span>
                  <span className="text-[13px] text-[rgba(255,255,255,0.70)] truncate font-sans mt-[4px] leading-none">
                    {group.count} contact{group.count === 1 ? "" : "s"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-[12px] shrink-0">
                <span
                  className="text-[12px] font-bold font-sans flex items-center justify-center px-[14px] h-[26px] rounded-full"
                  style={{
                    backgroundColor: "rgba(16, 216, 118, 0.15)",
                    color: "#10D876",
                  }}
                >
                  ACTIVE
                </span>
                <span className="text-[13px] text-[rgba(255,255,255,0.55)] font-sans">
                  {group.time}
                </span>
              </div>
            </div>
          )}

          {/* Empty State Card */}
          <div className="flex-1 flex flex-col items-center justify-center text-center p-[24px] rounded-[12px] bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.05)] gap-[16px]">
            <Users size={38} className="text-[rgba(255,255,255,0.45)]" />
            <div className="flex flex-col gap-[8px]">
              <h4 className="text-[18px] font-semibold text-white font-sans leading-none">
                Groups indexer loaded.
              </h4>
              <p className="text-[14px] text-[rgba(255,255,255,0.60)] font-sans leading-[1.6]">
                Checked active audience tables. Ready to partition contacts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
