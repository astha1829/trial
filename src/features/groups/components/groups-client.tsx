"use client";

import React, { useState } from "react";
import { useGroups } from "../hooks/use-groups";
import { GroupsSkeleton, GroupsErrorState } from "./groups-skeleton";
import { GroupsEmptyState } from "./groups-empty-state";
import { GroupsTable } from "./groups-table";
import { CreateGroupModal } from "./create-group-modal";
import { RefreshCw, Layers, Plus, Clock, Users } from "lucide-react";

export function GroupsClient() {
  const { data: groups, isLoading, isError, refetch, isRefetching } = useGroups();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleRefresh = () => {
    refetch();
  };

  const latestGroup = groups && groups.length > 0 ? groups[groups.length - 1].title : "--";

  return (
    <div className="space-y-5 select-none animate-fade-in pb-10 flex flex-col">
      {/* Top Command Center */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-black tracking-widest uppercase self-start w-fit">
            <Layers className="h-3.5 w-3.5" />
            <span>CRM Audience Segments</span>
          </div>
          <h1 className="text-[44px] md:text-[52px] font-black tracking-tighter text-foreground leading-none transition-colors">
            Contact Groups
          </h1>
          <p className="text-muted-foreground text-[17px] md:text-[18px] font-medium max-w-2xl leading-relaxed transition-colors">
            Segment your contacts to streamline marketing campaigns, broadcasts, and automations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleRefresh}
            disabled={isRefetching || isLoading}
            className="flex items-center gap-2 h-10 px-4 rounded-xl border border-border hover:border-foreground/10 bg-secondary/50 hover:bg-secondary transition-all text-sm font-bold text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed shadow-sm dark:shadow-lg cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 h-10 px-5 rounded-xl border border-blue-500/20 bg-blue-600/20 hover:bg-blue-600/30 transition-all text-sm font-bold text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.2)] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Create Group
          </button>
        </div>
      </div>

      {/* Main Content States */}
      {(isLoading || isRefetching) ? (
        <GroupsSkeleton />
      ) : isError ? (
        <GroupsErrorState onRetry={handleRefresh} />
      ) : !groups || groups.length === 0 ? (
        <GroupsEmptyState onCreateClick={() => setIsCreateModalOpen(true)} />
      ) : (
        <div className="space-y-4 animate-fade-in">
          {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Total Groups */}
            <div className="rounded-2xl border border-border bg-card dark:bg-card/60 dark:backdrop-blur-xl p-4 shadow-lg dark:shadow-2xl flex flex-col justify-between h-auto relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-xl pointer-events-none rounded-full" />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em]">Total Groups</span>
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Layers className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-3 flex flex-col relative z-10">
                <span className="text-[32px] font-black text-foreground leading-none tracking-tight">{groups.length.toLocaleString()}</span>
                <span className="text-[13px] font-normal text-muted-foreground mt-1">Active contact groups</span>
              </div>
            </div>

            {/* 2. Recently Created */}
            <div className="rounded-2xl border border-border bg-card dark:bg-card/60 dark:backdrop-blur-xl p-4 shadow-lg dark:shadow-2xl flex flex-col justify-between h-auto relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-xl pointer-events-none rounded-full" />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em]">Recently Created</span>
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                </div>
              </div>
              <div className="mt-3 flex flex-col relative z-10 min-w-0">
                <span className="text-[24px] font-bold text-foreground leading-[1.1] tracking-tight truncate pr-2" title={latestGroup}>{latestGroup}</span>
                <span className="text-[13px] font-normal text-muted-foreground mt-1">Latest group added</span>
              </div>
            </div>

            {/* 3. Total Contacts */}
            <div className="rounded-2xl border border-border bg-card dark:bg-card/60 dark:backdrop-blur-xl p-4 shadow-lg dark:shadow-2xl flex flex-col justify-between h-auto relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-xl pointer-events-none rounded-full" />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em]">Total Contacts</span>
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Users className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                </div>
              </div>
              <div className="mt-3 flex flex-col relative z-10">
                <span className="text-[32px] font-black text-foreground leading-none tracking-tight">0</span>
                <span className="text-[13px] font-normal text-muted-foreground mt-1">Contacts across all groups</span>
              </div>
            </div>
          </div>

          <div className="w-full relative">
            <GroupsTable groups={groups} />
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      <CreateGroupModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
}
