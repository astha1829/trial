import React from "react";
import { Template } from "../types";

interface TemplatesMetricsProps {
  templates: Template[];
}

export function TemplatesMetrics({ templates }: TemplatesMetricsProps) {
  const total = templates.length;
  const approved = templates.filter((t) => t.status.toLowerCase() === "approved").length;
  const marketing = templates.filter((t) => t.category.toLowerCase() === "marketing").length;
  const utility = templates.filter((t) => t.category.toLowerCase() === "utility").length;

  
  const lastSyncDate = templates.reduce((latest, t) => {
    if (!t.last_synced) return latest;
    const d = new Date(t.last_synced);
    return d > latest ? d : latest;
  }, new Date());

  const lastSyncString = templates.some(t => t.last_synced) 
    ? lastSyncDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : "Just Now";

  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card/60 backdrop-blur-xl p-5 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-wrap items-center gap-x-10 gap-y-4 relative overflow-hidden group transition-colors">
      {}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/5 blur-[80px] pointer-events-none rounded-full" />
      
      {}
      <div className="flex items-center gap-3 relative z-10">
        <div className="h-8 w-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)] dark:shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest transition-colors">Total Templates</span>
          <span className="text-xl font-black text-foreground leading-tight transition-colors">{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="h-8 w-[1px] bg-border hidden sm:block relative z-10 transition-colors" />

      {}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest transition-colors">Approved</span>
          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-tight">{approved.toLocaleString()}</span>
        </div>
      </div>

      <div className="h-8 w-[1px] bg-border hidden sm:block relative z-10 transition-colors" />

      {}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest transition-colors">Marketing</span>
          <span className="text-xl font-black text-purple-600 dark:text-purple-400 leading-tight">{marketing.toLocaleString()}</span>
        </div>
      </div>

      <div className="h-8 w-[1px] bg-border hidden sm:block relative z-10 transition-colors" />

      {}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest transition-colors">Utility</span>
          <span className="text-xl font-black text-amber-600 dark:text-amber-400 leading-tight">{utility.toLocaleString()}</span>
        </div>
      </div>

      <div className="h-8 w-[1px] bg-border hidden sm:block relative z-10 ml-auto transition-colors" />

      {}
      <div className="flex items-center gap-3 relative z-10 sm:ml-auto">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest transition-colors">Last Sync</span>
          <span className="text-sm font-bold text-foreground mt-1 flex items-center gap-1.5 transition-colors">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            {lastSyncString}
          </span>
        </div>
      </div>
    </div>
  );
}
