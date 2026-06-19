import React from "react";
import { Activity, ClipboardList } from "lucide-react";

export function TemplateActivityTimeline() {
  return (
    <div className="w-full flex flex-col h-full space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <Activity className="h-5 w-5 text-muted-foreground transition-colors" />
        <h3 className="text-[18px] font-bold text-foreground tracking-tight transition-colors">Recent Activity</h3>
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-secondary/40 p-8 min-h-[300px] transition-colors text-center relative overflow-hidden shadow-sm dark:shadow-none">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center max-w-sm">
          <div className="h-16 w-16 rounded-[1.2rem] bg-slate-50 dark:bg-secondary flex items-center justify-center border border-slate-200 dark:border-border shadow-sm dark:shadow-[0_10px_20px_rgba(0,0,0,0.3)] mb-4">
            <ClipboardList className="h-7 w-7 text-muted-foreground/60" />
          </div>
          <h4 className="text-[16px] font-bold text-foreground mb-1 transition-colors">No data available</h4>
          <p className="text-[13px] text-muted-foreground leading-relaxed transition-colors">
            There is no recent template activity to display at this time.
          </p>
        </div>
      </div>
    </div>
  );
}
