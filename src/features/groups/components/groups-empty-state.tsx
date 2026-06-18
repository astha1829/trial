import React from "react";
import { Layers, Plus } from "lucide-react";

interface GroupsEmptyStateProps {
  onCreateClick: () => void;
}

export function GroupsEmptyState({ onCreateClick }: GroupsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center rounded-3xl border border-border bg-card dark:bg-card/40 dark:backdrop-blur-3xl relative overflow-hidden group shadow-sm dark:shadow-2xl transition-colors select-none">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center max-w-lg">
        {/* Composite Icon Container */}
        <div className="relative mb-8 group-hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
          <div className="h-28 w-28 rounded-[2rem] bg-secondary flex items-center justify-center border border-border shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-10 transition-colors">
            <Layers className="h-12 w-12 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.4)]" />
          </div>
        </div>
        
        <h3 className="text-3xl font-black text-foreground mb-4 tracking-tight transition-colors">No groups found</h3>
        <p className="text-sm text-muted-foreground mb-10 leading-relaxed font-medium transition-colors">
          Create your first contact group to get started.
        </p>
        
        <button
          onClick={onCreateClick}
          className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all text-sm font-bold text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-blue-500/50 cursor-pointer"
        >
          <Plus className="h-5 w-5" />
          Create Group
        </button>
      </div>
    </div>
  );
}
