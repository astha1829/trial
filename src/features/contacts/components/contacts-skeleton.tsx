import React from "react";
import { RefreshCw } from "lucide-react";

export function ContactsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse select-none">
      {/* Statistics Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-border bg-card/50 dark:bg-card/20 p-4 shadow-sm h-[105px] transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="h-2.5 w-24 bg-secondary rounded"></div>
              <div className="h-8 w-8 bg-secondary rounded-lg"></div>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <div className="h-7 w-16 bg-secondary rounded"></div>
              <div className="h-2 w-32 bg-secondary rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="w-full h-[550px] rounded-2xl border border-border bg-card dark:bg-card/40 shadow-sm dark:shadow-xl overflow-hidden flex flex-col transition-colors">
        {/* Toolbar Skeleton */}
        <div className="px-5 py-2.5 border-b border-border bg-secondary/40 flex justify-between items-center transition-colors">
          <div className="h-9 w-80 bg-secondary rounded-xl transition-colors"></div>
          <div className="h-4 w-32 bg-secondary rounded transition-colors"></div>
        </div>
        
        {/* Header Skeleton */}
        <div className="h-10 bg-secondary border-b border-border w-full flex items-center px-5 gap-8 transition-colors">
          <div className="h-4 w-[25%] bg-muted-foreground/20 rounded transition-colors"></div>
          <div className="h-4 w-[25%] bg-muted-foreground/20 rounded transition-colors"></div>
          <div className="h-4 w-[25%] bg-muted-foreground/20 rounded transition-colors"></div>
          <div className="h-4 w-[10%] bg-muted-foreground/20 rounded ml-auto transition-colors"></div>
        </div>

        {/* Rows Skeleton */}
        <div className="flex-1 px-5 py-4 space-y-4 overflow-hidden">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex items-center justify-between w-full h-8">
              <div className="h-4 w-[25%] bg-secondary rounded transition-colors"></div>
              <div className="h-4 w-[25%] bg-secondary rounded transition-colors"></div>
              <div className="h-4 w-[25%] bg-secondary rounded transition-colors"></div>
              <div className="h-7 w-10 bg-secondary rounded transition-colors ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactsErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-[24px] border border-destructive/10 bg-destructive/5 backdrop-blur-xl transition-colors select-none">
      <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6 border border-destructive/20 transition-colors">
        <span className="text-2xl font-black text-destructive transition-colors">!</span>
      </div>
      <h3 className="text-xl font-black text-foreground mb-2 transition-colors">Connection Error</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6 transition-colors">
        We encountered an issue while retrieving your contacts. Please verify your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 h-10 px-5 rounded-xl bg-secondary hover:bg-secondary/85 border border-border transition-all text-sm font-bold text-foreground shadow-sm dark:shadow-lg cursor-pointer"
      >
        <RefreshCw className="h-4 w-4" />
        Retry Connection
      </button>
    </div>
  );
}
