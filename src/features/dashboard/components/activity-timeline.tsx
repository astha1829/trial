"use client";

import React, { useState, useEffect } from "react";
import { Play, CheckCircle2, Calendar, XCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CampaignEvent {
  id: string;
  name: string;
  description: string;
  time: string;
  status: "Running" | "Completed" | "Scheduled" | "Failed";
}

export function ActivityTimeline() {
  const [events, setEvents] = useState<CampaignEvent[]>([
    {
      id: "evt-1",
      name: "Summer Flash Sale",
      description: "Dispatching discount codes to active segments.",
      time: "2 mins ago",
      status: "Running"
    },
    {
      id: "evt-2",
      name: "Welcome Series v2",
      description: "Successfully processed email sequence for new signups.",
      time: "1 hour ago",
      status: "Completed"
    },
    {
      id: "evt-3",
      name: "Dormant Reactivation",
      description: "Trigger set for dormant accounts engagement sweep.",
      time: "3 hours ago",
      status: "Scheduled"
    },
    {
      id: "evt-4",
      name: "Weekly Newsletter",
      description: "Dispatch stalled. SMS gateway timed out during transit.",
      time: "5 hours ago",
      status: "Failed"
    }
  ]);

  // Simulate live campaigns stream updates
  useEffect(() => {
    const liveCampaigns = [
      {
        name: "Holiday Promo Stream",
        description: "Scheduled dispatch trigger for Winter tags.",
        status: "Scheduled" as const
      },
      {
        name: "Product Update Announcement",
        description: "Completed sending notification letters to users.",
        status: "Completed" as const
      },
      {
        name: "Feedback Survey",
        description: "Executing campaign response collection pipeline.",
        status: "Running" as const
      }
    ];

    const interval = setInterval(() => {
      const randomCamp = liveCampaigns[Math.floor(Math.random() * liveCampaigns.length)];
      const newEvent: CampaignEvent = {
        id: `evt-live-${Date.now()}`,
        name: randomCamp.name,
        description: randomCamp.description,
        time: "Just now",
        status: randomCamp.status
      };

      setEvents(prev => [newEvent, ...prev.slice(0, 3)]);
    }, 16000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (status: string) => {
    switch (status) {
      case "Running": return <Play className="w-3.5 h-3.5 text-blue-400" />;
      case "Completed": return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case "Scheduled": return <Calendar className="w-3.5 h-3.5 text-purple-400" />;
      default: return <XCircle className="w-3.5 h-3.5 text-rose-400" />;
    }
  };

  const getColor = (status: string) => {
    switch (status) {
      case "Running": return "text-blue-400 bg-blue-500/10 border-blue-500/25";
      case "Completed": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/25";
      case "Scheduled": return "text-purple-400 bg-purple-500/10 border-purple-500/25";
      default: return "text-rose-400 bg-rose-500/10 border-rose-500/25";
    }
  };

  return (
    <div className="w-full h-full rounded-[24px] border border-border bg-card dark:bg-card dark:bg-card/60 dark:backdrop-blur-xl p-6 shadow-sm dark:shadow-2xl flex flex-col justify-between transition-colors duration-300">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-foreground tracking-wide flex items-center gap-2 transition-colors">
              <Clock className="w-4.5 h-4.5 text-blue-400" />
              Recent Campaigns
            </h2>
            <p className="text-[11px] text-muted-foreground transition-colors">Live campaign dispatch timeline.</p>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
        </div>

        {/* Timeline body with dashed indicators */}
        <div className="relative pl-6 flex flex-col gap-6">
          <div className="absolute left-[11px] top-1 bottom-1 w-[1px] border-l border-dashed border-border transition-colors" />

          <AnimatePresence initial={false}>
            {events.map((event) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -10, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 10, height: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col"
              >
                {/* Connector dot indicator */}
                <div 
                  className={`absolute -left-[27px] top-0 flex h-6.5 w-6.5 items-center justify-center rounded-lg border text-center shrink-0 ${getColor(event.status)}`}
                >
                  {getIcon(event.status)}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-foreground leading-relaxed line-clamp-1 transition-colors">{event.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0 whitespace-nowrap transition-colors">{event.time}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground leading-normal mt-0.5 transition-colors">{event.description}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

