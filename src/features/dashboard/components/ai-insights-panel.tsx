"use client";

import React, { useState } from "react";
import { Megaphone, ArrowRight, Play, CheckCircle2, Calendar, XCircle, RefreshCw } from "lucide-react";

interface AiInsightsPanelProps {
  contacts: number;
  groups: number;
  templates: number;
  campaigns: number;
}

export function AiInsightsPanel({ contacts, groups, templates, campaigns }: AiInsightsPanelProps) {
  const [isSyncing, setIsSyncing] = useState(false);

  const campaignMetrics = [
    {
      id: "camp-run",
      title: "Running Campaigns",
      description: "3 campaigns actively transmitting messages. Node queues are processing at capacity.",
      metric: "3 Active",
      badgeColor: "text-blue-400 bg-blue-500/10 border border-blue-500/20"
    },
    {
      id: "camp-comp",
      title: "Completed Campaigns",
      description: "12 campaigns fully dispatched. Final average email and phone delivery rate is 98.4%.",
      metric: "12 Dispatched",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
    },
    {
      id: "camp-sch",
      title: "Scheduled Campaigns",
      description: "4 campaigns loaded in dispatch scheduler. Next target segment release in 2 hours.",
      metric: "4 Queued",
      badgeColor: "text-purple-400 bg-purple-500/10 border border-purple-500/20"
    },
    {
      id: "camp-fail",
      title: "Failed Campaigns",
      description: "1 campaign transmission aborted. Auto-retry trigger pending network verification.",
      metric: "1 Halted",
      badgeColor: "text-rose-400 bg-rose-500/10 border border-rose-500/20"
    }
  ];

  const handleRecalculate = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1200);
  };

  return (
    <div className="w-full h-full rounded-[24px] border border-border bg-card dark:bg-card dark:bg-card/60 dark:backdrop-blur-xl p-6 shadow-sm dark:shadow-2xl flex flex-col justify-between transition-colors duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Megaphone className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground tracking-wide flex items-center gap-2 transition-colors">
                Campaign Overview
              </h2>
              <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider transition-colors">Operational Summary</p>
            </div>
          </div>
          <button 
            onClick={handleRecalculate}
            disabled={isSyncing}
            className="flex items-center justify-center p-2 rounded-xl border border-border hover:border-border hover:bg-secondary transition-all text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-indigo-400" : ""}`} />
          </button>
        </div>

        {/* Narrative Campaign Execution Summary */}
        <div className="p-4 rounded-2xl bg-secondary/50 border border-border mb-4 transition-colors">
          <div className="flex items-start gap-3">
            <Play className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Queue Telemetry Analysis</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed transition-colors">
                Active campaign throughput is optimal. Dispatched pipelines are writing logs. Re-routing failed packets to fallback gateways.
              </p>
            </div>
          </div>
        </div>

        {/* Campaign Metrics list */}
        <div className="flex flex-col gap-2.5">
          {campaignMetrics.map((metric) => (
            <div 
              key={metric.id} 
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-secondary transition-colors border border-transparent hover:border-border group"
            >
              <div className="mt-1 shrink-0 flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-900/40 text-indigo-400">
                {metric.id === "camp-run" && <Play className="w-3.5 h-3.5 text-blue-400" />}
                {metric.id === "camp-comp" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {metric.id === "camp-sch" && <Calendar className="w-3.5 h-3.5 text-purple-400" />}
                {metric.id === "camp-fail" && <XCircle className="w-3.5 h-3.5 text-rose-400" />}
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{metric.title}</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed transition-colors">{metric.description}</p>
                </div>
                <div className={`px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold uppercase shrink-0 whitespace-nowrap self-start sm:self-center ${metric.badgeColor}`}>
                  {metric.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border transition-colors">
        <button className="flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors">
          View All Campaign Dispatches <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

