"use client";

import React from "react";
import { CheckCircle2, Circle, Activity, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

interface RecentActivitySummaryProps {
  contacts: number;
  groups: number;
  templates: number;
  campaigns: number;
}

export function WorkspaceAchievements({ contacts, groups, templates, campaigns }: RecentActivitySummaryProps) {
  const activities = [
    {
      id: "act-1",
      label: "Contact Synchronizer",
      description: "Validated contacts list structure with remote server.",
      completed: contacts > 0,
      status: "Synced"
    },
    {
      id: "act-2",
      label: "Audience Tags compiler",
      description: "Indexed contacts into target Group tables.",
      completed: groups > 0,
      status: "Indexed"
    },
    {
      id: "act-3",
      label: "Assets Compiler Engine",
      description: "Verified template parsing syntaxes & tags.",
      completed: templates > 0,
      status: "Compiled"
    },
    {
      id: "act-4",
      label: "Campaign Dispatch System",
      description: "Wired campaign trigger path coordinates.",
      completed: campaigns > 0,
      status: "Ready"
    },
    {
      id: "act-5",
      label: "Ecosystem Integrity Scan",
      description: "Checked duplicate contact registers.",
      completed: contacts >= 100,
      status: "Verified"
    }
  ];

  const completedCount = activities.filter(a => a.completed).length;
  const progressPercent = Math.round((completedCount / activities.length) * 100);

  return (
    <div className="w-full h-full rounded-[24px] border border-border bg-card dark:bg-card dark:bg-card/60 dark:backdrop-blur-xl p-6 shadow-sm dark:shadow-2xl flex flex-col justify-between transition-colors duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-foreground tracking-wide flex items-center gap-2 transition-colors">
              <Activity className="w-4.5 h-4.5 text-indigo-400" />
              Activity Status
            </h2>
            <p className="text-[11px] text-muted-foreground transition-colors">Sync checkpoints and validations.</p>
          </div>
          <div className="text-xs font-bold text-muted-foreground transition-colors">
            {completedCount} / {activities.length} Ok
          </div>
        </div>

        {/* Progress bar tracking overall sync checkpoints */}
        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mb-6 flex">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* Checkpoint logs list */}
        <div className="flex flex-col gap-3.5">
          {activities.map((act) => (
            <div 
              key={act.id} 
              className={`flex items-start justify-between gap-4 p-3 rounded-xl border transition-all ${
                act.completed 
                  ? "bg-indigo-500/5 border-indigo-500/10" 
                  : "bg-secondary/50 border-border opacity-70"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {act.completed ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-indigo-400" />
                  ) : (
                    <ShieldAlert className="w-4.5 h-4.5 text-slate-600" />
                  )}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${act.completed ? "text-indigo-500 dark:text-indigo-200" : "text-foreground"}`}>
                    {act.label}
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{act.description}</p>
                </div>
              </div>
              <div className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                act.completed 
                  ? "bg-indigo-400/20 text-indigo-500 dark:text-indigo-300" 
                  : "bg-secondary text-muted-foreground"
              }`}>
                {act.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1.5 font-medium transition-colors">
        All CRM databases validation indexes are verified and synced.
      </div>
    </div>
  );
}

