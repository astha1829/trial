import React from "react";
import { FolderOpenDot, RefreshCw } from "lucide-react";

interface TemplatesEmptyStateProps {
  onSync: () => void;
  isSyncing: boolean;
}

export function TemplatesEmptyState({ onSync, isSyncing }: TemplatesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center rounded-3xl border border-border bg-card dark:bg-card dark:bg-card/40 dark:backdrop-blur-3xl relative overflow-hidden group shadow-sm dark:shadow-2xl transition-colors">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center max-w-lg">
        {/* Premium Illustration Placeholder (Icon composite) */}
        <div className="relative mb-8 group-hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
          <div className="h-28 w-28 rounded-[2rem] bg-secondary flex items-center justify-center border border-border shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-10 transition-colors">
            <FolderOpenDot className="h-12 w-12 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.4)]" />
          </div>
        </div>
        
        <h3 className="text-3xl font-black text-foreground mb-4 tracking-tight transition-colors">No templates synced yet</h3>
        <p className="text-sm text-muted-foreground mb-10 leading-relaxed font-medium transition-colors">
          Your account doesn't have any WhatsApp templates synced. Pull your latest approved templates from Meta Business Suite to start running operational workflows and targeted campaigns.
        </p>
        
        <button
          onClick={onSync}
          disabled={isSyncing}
          className="flex items-center justify-center gap-3 h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all text-sm font-bold text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500/50"
        >
          <RefreshCw className={`h-5 w-5 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "Syncing..." : "Sync Templates Now"}
        </button>
      </div>
    </div>
  );
}

