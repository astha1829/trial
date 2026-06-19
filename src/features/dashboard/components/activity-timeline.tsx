"use client";

import React from "react";
import { Play, CheckCircle2, Calendar, XCircle, Clock, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CampaignEvent {
  id: string;
  name: string;
  description: string;
  time: string;
  status: "Running" | "Completed" | "Scheduled" | "Failed";
}

interface ActivityTimelineProps {
  campaigns: any[];
}

export function ActivityTimeline({ campaigns = [] }: ActivityTimelineProps) {
  const fallbackEvents: CampaignEvent[] = [
    {
      id: "fallback-1",
      name: "abc",
      description: "Template: hello_world • 3 recipients",
      time: "Jun 18\n10:45 PM",
      status: "Failed"
    },
    {
      id: "fallback-2",
      name: "Office Holiday",
      description: "Template: bulkify_ticket • 3 recipients",
      time: "Jun 17\n07:30 PM",
      status: "Completed"
    },
    {
      id: "fallback-3",
      name: "Demo 16jun",
      description: "Template: hello_world • 3 recipients",
      time: "Jun 16\n05:15 PM",
      status: "Completed"
    },
    {
      id: "fallback-4",
      name: "Hello World",
      description: "Template: bulkify_ticket • 3 recipients",
      time: "Jun 15\n11:20 AM",
      status: "Completed"
    }
  ];

  const sortedCampaigns = [...campaigns].sort(
    (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
  );

  const dynamicEvents: CampaignEvent[] = sortedCampaigns.slice(0, 4).map((campaign) => {
    let status: "Running" | "Completed" | "Scheduled" | "Failed" = "Scheduled";
    const s = campaign.status?.toLowerCase();
    if (s === "running") status = "Running";
    else if (s === "completed") status = "Completed";
    else if (s === "failed") status = "Failed";
    else if (s === "scheduled") status = "Scheduled";

    const date = campaign.created_at ? new Date(campaign.created_at) : null;
    let timeStr = "Unknown Date";
    if (date) {
      const datePart = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      const timePart = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      timeStr = `${datePart}\n${timePart}`;
    }

    return {
      id: campaign.campaign_id || campaign.id || String(Math.random()),
      name: campaign.title || campaign.name || "Untitled Campaign",
      description: `Template: ${campaign.template_name || "Unknown"} • ${campaign.total || 0} recipient${campaign.total === 1 ? "" : "s"}`,
      time: timeStr,
      status
    };
  });

  const events = dynamicEvents.length > 0 ? dynamicEvents : fallbackEvents;

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
              Recent Campaigns
            </h2>
            <p className="text-[13px] font-normal text-muted-foreground font-sans">
              Live campaign dispatch timeline
            </p>
          </div>
          <a
            href="/campaigns"
            className="text-[14px] font-semibold text-accent-purple hover:underline font-sans mt-[4px]"
          >
            View All
          </a>
        </div>

        {}
        <div className="relative flex flex-col gap-[20px]">
          <AnimatePresence initial={false}>
            {events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-row items-center gap-[12px]"
              >
                {}
                {idx < events.length - 1 && (
                  <div
                    className="absolute left-[14px] top-[14px] h-[calc(100%+20px)] w-0 border-l border-dashed z-0"
                    style={{
                      borderColor: event.status === "Failed" ? "var(--status-failed-border)" : "var(--status-completed-border)",
                    }}
                  />
                )}

                {}
                <div className="relative z-10 shrink-0">
                  {event.status === "Failed" ? (
                    <div
                      className="w-[28px] h-[28px] rounded-full flex items-center justify-center"
                      style={{
                        background: "var(--status-failed-bg)",
                        border: "1px solid var(--status-failed-border)",
                        boxShadow: "0 0 8px var(--status-failed-glow)",
                      }}
                    >
                      <X size={14} style={{ color: "var(--status-failed-text)" }} strokeWidth={3} />
                    </div>
                  ) : event.status === "Running" ? (
                    <div
                      className="w-[28px] h-[28px] rounded-full flex items-center justify-center"
                      style={{
                        background: "var(--status-running-bg)",
                        border: "1px solid var(--status-running-border)",
                        boxShadow: "0 0 8px var(--status-running-glow)",
                      }}
                    >
                      <Play size={12} style={{ color: "var(--status-running-text)" }} className="fill-current" />
                    </div>
                  ) : event.status === "Scheduled" ? (
                    <div
                      className="w-[28px] h-[28px] rounded-full flex items-center justify-center"
                      style={{
                        background: "var(--status-scheduled-bg)",
                        border: "1px solid var(--status-scheduled-border)",
                        boxShadow: "0 0 8px var(--status-scheduled-glow)",
                      }}
                    >
                      <Clock size={14} style={{ color: "var(--status-scheduled-text)" }} strokeWidth={2.5} />
                    </div>
                  ) : (
                    <div
                      className="w-[28px] h-[28px] rounded-full flex items-center justify-center"
                      style={{
                        background: "var(--status-completed-bg)",
                        border: "1px solid var(--status-completed-border)",
                        boxShadow: "0 0 8px var(--status-completed-glow)",
                      }}
                    >
                      <Check size={14} style={{ color: "var(--status-completed-text)" }} strokeWidth={3} />
                    </div>
                  )}
                </div>

                {}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <span className="text-[18px] font-semibold text-foreground font-sans leading-none">
                    {event.name}
                  </span>
                  <span className="text-[13px] text-muted-foreground font-sans mt-[4px] leading-none truncate">
                    {event.description}
                  </span>
                </div>

                {}
                <div className="text-right shrink-0 flex flex-col justify-center gap-[2px]">
                  {event.time.split("\n").map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[13px] font-medium font-sans leading-none text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
