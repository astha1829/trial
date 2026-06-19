import React from "react";
import { RefreshCw } from "lucide-react";

export function TemplatesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Compact Metrics Strip Skeleton */}
      <div className="w-full rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-card/40 px-6 py-4 flex items-center gap-8 transition-colors">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-2 w-16 bg-secondary rounded transition-colors"></div>
            <div className="h-4 w-8 bg-secondary rounded transition-colors"></div>
            {i !== 4 && <div className="h-4 w-[1px] bg-slate-200 dark:bg-border hidden sm:block ml-8 transition-colors" />}
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="w-full h-[600px] rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card/40 shadow-sm dark:shadow-xl overflow-hidden flex flex-col transition-colors">
        {/* Toolbar Skeleton */}
        <div className="p-4 border-b border-slate-200 dark:border-border bg-slate-50/50 dark:bg-secondary/40 flex justify-between transition-colors">
          <div className="h-9 w-72 bg-secondary rounded-lg transition-colors"></div>
          <div className="h-4 w-32 bg-secondary rounded transition-colors"></div>
        </div>
        
        {/* Header Skeleton */}
        <div className="h-10 bg-slate-50 dark:bg-secondary border-b border-slate-200 dark:border-border w-full flex items-center px-5 gap-10 transition-colors">
          <div className="h-3 w-20 bg-slate-200 dark:bg-muted-foreground/30 rounded transition-colors"></div>
          <div className="h-3 w-16 bg-slate-200 dark:bg-muted-foreground/30 rounded transition-colors"></div>
          <div className="h-3 w-16 bg-slate-200 dark:bg-muted-foreground/30 rounded transition-colors"></div>
          <div className="h-3 w-16 bg-slate-200 dark:bg-muted-foreground/30 rounded transition-colors"></div>
          <div className="h-3 w-16 bg-slate-200 dark:bg-muted-foreground/30 rounded transition-colors"></div>
        </div>

        {/* Rows Skeleton */}
        <div className="flex-1 p-5 space-y-6">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-2 w-[25%]">
                <div className="h-4 w-32 bg-secondary rounded transition-colors"></div>
                <div className="h-2 w-20 bg-secondary rounded transition-colors"></div>
              </div>
              <div className="h-4 w-16 bg-secondary rounded transition-colors"></div>
              <div className="h-4 w-16 bg-secondary rounded transition-colors"></div>
              <div className="h-4 w-12 bg-secondary rounded transition-colors"></div>
              <div className="h-4 w-16 bg-secondary rounded transition-colors"></div>
              <div className="h-6 w-6 bg-secondary rounded transition-colors"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TemplatesErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-[24px] border border-destructive/10 bg-destructive/5 backdrop-blur-xl transition-colors">
      <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6 border border-destructive/20 transition-colors">
        <span className="text-2xl font-black text-destructive transition-colors">!</span>
      </div>
      <h3 className="text-xl font-black text-foreground mb-2 transition-colors">Connection Error</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6 transition-colors">
        We encountered an issue while retrieving your templates. This might be a temporary network interruption.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 h-10 px-5 rounded-xl bg-secondary hover:bg-secondary/80 border border-slate-200 dark:border-border transition-all text-sm font-bold text-foreground shadow-sm dark:shadow-lg"
      >
        <RefreshCw className="h-4 w-4" />
        Retry Connection
      </button>
    </div>
  );
}

