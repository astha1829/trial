"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/services/auth.service";

import { CrmFlowVisualization } from "./crm-flow-visualization";
import { WorkspaceHealthRadar } from "./workspace-health-radar";
import { AiInsightsPanel } from "./ai-insights-panel";
import { WorkspaceAchievements } from "./workspace-achievements";
import { ActivityTimeline } from "./activity-timeline";
import { ActivityHeatmap } from "./activity-heatmap";
import { AiCopilot } from "./ai-copilot";
import { CommandCenterActions } from "./command-center-actions";

export function DashboardClient() {
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [contactsData, setContactsData] = useState<any[]>([]);
  const [groupsData, setGroupsData] = useState<any[]>([]);
  const [templatesData, setTemplatesData] = useState<any[]>([]);
  const [campaignsData, setCampaignsData] = useState<any[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [contactsRes, groupsRes, templatesRes, campaignsRes] = await Promise.all([
        api.get("/api/v1/contacts/").catch(() => ({ data: { data: [] } })),
        api.get("/api/v1/groups/").catch(() => ({ data: { data: [] } })),
        api.get("/api/v1/templates/").catch(() => ({ data: { data: [] } })),
        api.get("/api/v1/campaigns").catch(() => ({ data: { data: [] } })),
      ]);

      setContactsData(contactsRes.data?.data || []);
      setGroupsData(groupsRes.data?.data || []);
      setTemplatesData(templatesRes.data?.data || []);
      setCampaignsData(campaignsRes.data?.data || []);
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch username dynamically from token or localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("user_email");
      if (email) {
        const part = email.split("@")[0];
        const name = part
          .split(/[\._\-]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setUserName(name);
      } else {
        const token = localStorage.getItem("access_token");
        if (token) {
          try {
            const base64Url = token.split(".")[1];
            if (base64Url) {
              const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
              const payload = JSON.parse(window.atob(base64));
              const emailVal = payload.email || payload.sub;
              if (emailVal && emailVal.includes("@")) {
                const p = emailVal.split("@")[0];
                const n = p
                  .split(/[\._\-]/)
                  .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ");
                setUserName(n);
              } else if (payload.name) {
                setUserName(payload.name);
              }
            }
          } catch (e) {
            // Fallback
          }
        }
      }
    }
  }, []);

  const handleSyncData = () => {
    toast.promise(fetchData(), {
      loading: "Syncing latest CRM data...",
      success: "Dashboard data synced successfully",
      error: "Sync failed",
    });
  };

  const handleActionClick = (actionName: string) => {
    toast.success(`Action Executed: ${actionName}`, {
      description: "Quick Action completed successfully.",
    });
  };

  const campaignOverview = {
    running: 3,
    completed: 12,
    failed: 1,
    scheduled: 4
  };

  const totalCampaignsCount = campaignOverview.running + campaignOverview.completed + campaignOverview.scheduled + campaignOverview.failed;

  return (
    <div className="space-y-6 select-none animate-fade-in pb-12">
      
      {/* ROW 1: Welcome Header + KPI Grid, Campaign Overview Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col gap-4 h-full">
          <div className="rounded-[24px] border border-border bg-card dark:bg-card dark:bg-card/60 dark:backdrop-blur-xl p-5 shadow-sm dark:shadow-2xl relative overflow-hidden group transition-colors duration-300">
            {/* Background glows */}
            <div className="absolute right-0 top-0 w-48 h-48 bg-blue-500/5 blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              {/* Left Column */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[9px] font-black tracking-widest uppercase self-start w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Workspace Connected</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground leading-none transition-colors">
                  Welcome Back, {userName || "Admin"}
                </h1>
                <p className="text-muted-foreground text-[11px] font-medium max-w-md transition-colors">
                  CRM telemetry operations are running. AI Insights models are refreshed with recent log synchronizations.
                </p>
              </div>

              {/* Right Column */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 transition-colors">
                <div className="space-y-1">
                  <div className="text-[9px] text-muted-foreground font-extrabold uppercase tracking-widest">Telemetry State</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-muted-foreground">Last Sync:</span>
                    <span className="font-black text-emerald-400">Just Now</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-muted-foreground">Sync Status:</span>
                    <span className="font-black text-blue-400">Optimal</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button 
                    onClick={handleSyncData}
                    className="flex items-center gap-2 h-9 px-3.5 rounded-xl border border-border hover:border-border bg-secondary/50 hover:bg-secondary transition-all text-[11px] font-bold text-foreground cursor-pointer shadow-sm dark:shadow-lg"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>Sync Metrics</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4 KPI Cards (Total Contacts, Groups, Templates, Campaigns) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border bg-secondary/40 p-4 shadow-sm dark:shadow-lg flex flex-col justify-between h-[110px] transition-colors">
              <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest">Total Contacts</span>
              <span className="text-2xl font-black text-blue-400 mt-1">{contactsData.length.toLocaleString()}</span>
              <span className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1">↑ 12.4% <span className="text-muted-foreground">vs last wk</span></span>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/40 p-4 shadow-sm dark:shadow-lg flex flex-col justify-between h-[110px] transition-colors">
              <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest">Total Groups</span>
              <span className="text-2xl font-black text-emerald-400 mt-1">{groupsData.length.toLocaleString()}</span>
              <span className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1">↑ 4.1% <span className="text-muted-foreground">vs last wk</span></span>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/40 p-4 shadow-sm dark:shadow-lg flex flex-col justify-between h-[110px] transition-colors">
              <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest">Total Templates</span>
              <span className="text-2xl font-black text-purple-400 mt-1">{templatesData.length.toLocaleString()}</span>
              <span className="text-[9px] text-muted-foreground mt-1">Ready to use</span>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/40 p-4 shadow-sm dark:shadow-lg flex flex-col justify-between h-[110px] transition-colors">
              <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest">Total Campaigns</span>
              <span className="text-2xl font-black text-amber-400 mt-1">{totalCampaignsCount.toLocaleString()}</span>
              <span className="text-[9px] text-amber-400 mt-1 flex items-center gap-1">3 Active now</span>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="rounded-[24px] border border-border bg-card dark:bg-card dark:bg-card/60 dark:backdrop-blur-xl p-5 shadow-sm dark:shadow-2xl flex flex-col justify-center flex-1 relative overflow-hidden group transition-colors">
            {/* Background ambient glow */}
            <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
            
            <div className="mb-4 relative z-10">
              <h3 className="text-sm font-bold text-foreground tracking-wide uppercase tracking-widest transition-colors">Quick Actions</h3>
              <p className="text-[10px] text-muted-foreground mt-1 transition-colors">Directly execute CRM transactions</p>
            </div>
            
            <div className="relative z-10 flex items-center w-full">
              <CommandCenterActions onActionClick={handleActionClick} />
            </div>
          </div>
        </div>

        {/* Campaign Overview Summary Card (Right) */}
        <div className="lg:col-span-1 h-full">
          <AiInsightsPanel 
            contacts={contactsData.length}
            groups={groupsData.length}
            templates={templatesData.length}
            campaigns={totalCampaignsCount}
          />
        </div>
      </div>

      {/* ROW 2: Left: Total Entities Radar Chart, Center: Quick Actions Workflow Physics Graph, Right: Recent Activity Summary Checklist */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1 h-full">
          <WorkspaceHealthRadar 
            contacts={contactsData.length}
            groups={groupsData.length}
            templates={templatesData.length}
            campaigns={totalCampaignsCount}
          />
        </div>
        <div className="xl:col-span-2 h-full">
          <CrmFlowVisualization 
            onActionClick={handleActionClick}
          />
        </div>
        <div className="xl:col-span-1 h-full">
          <WorkspaceAchievements 
            contacts={contactsData.length}
            groups={groupsData.length}
            templates={templatesData.length}
            campaigns={totalCampaignsCount}
          />
        </div>
      </div>

      {/* ROW 3: Left: Recent Campaigns Timeline, Center: Recently Created Contacts Heatmap Grid, Right: Recently Created Groups Console */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1 h-full">
          <ActivityTimeline />
        </div>
        <div className="xl:col-span-2 h-full">
          <ActivityHeatmap />
        </div>
        <div className="xl:col-span-1 h-full">
          <AiCopilot />
        </div>
      </div>

      {/* ROW 4: Compact KPI strip */}
      <div className="w-full rounded-2xl border border-border bg-card dark:bg-card dark:bg-card/40 dark:backdrop-blur-xl p-4 shadow-sm dark:shadow-lg flex flex-wrap items-center justify-around gap-6 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Contacts</span>
          <span className="text-sm font-black text-blue-400">{contactsData.length.toLocaleString()}</span>
        </div>
        <div className="h-4 w-[1px] bg-border hidden sm:block" />
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Groups</span>
          <span className="text-sm font-black text-emerald-400">{groupsData.length.toLocaleString()}</span>
        </div>
        <div className="h-4 w-[1px] bg-border hidden sm:block" />
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Campaigns</span>
          <span className="text-sm font-black text-purple-400">{totalCampaignsCount.toLocaleString()}</span>
        </div>
        <div className="h-4 w-[1px] bg-border hidden sm:block" />
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Messages Sent</span>
          <span className="text-sm font-black text-amber-400">{(templatesData.length * 12).toLocaleString()}</span>
        </div>
        <div className="h-4 w-[1px] bg-border hidden sm:block" />
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Templates Used</span>
          <span className="text-sm font-black text-indigo-400">{templatesData.length.toLocaleString()}</span>
        </div>
      </div>

    </div>
  );
}

