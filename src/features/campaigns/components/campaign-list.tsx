"use client";

import React from "react";
import { useCampaigns } from "../hooks/use-campaigns";
import { Plus, Loader2, Calendar, Play, CheckCircle2, AlertTriangle, XCircle, Rocket, ChevronRight, Users, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CampaignList() {
  const { data: campaigns, isLoading } = useCampaigns();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[calc(100vh-8rem)] items-center justify-center bg-[#050816] rounded-2xl border border-[rgba(255,255,255,0.08)]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  const stats = {
    total: campaigns?.length || 0,
    running: campaigns?.filter((c: any) => c.status?.toLowerCase() === "running").length || 0,
    completed: campaigns?.filter((c: any) => c.status?.toLowerCase() === "completed").length || 0,
    failed: campaigns?.filter((c: any) => c.status?.toLowerCase() === "failed").length || 0,
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return <span className="flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[12px] font-bold uppercase tracking-wider"><Calendar className="w-4 h-4" /> Scheduled</span>;
      case "running":
        return <span className="flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[12px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.2)]"><Play className="w-4 h-4" /> Running</span>;
      case "completed":
        return <span className="flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[12px] font-bold uppercase tracking-wider"><CheckCircle2 className="w-4 h-4" /> Completed</span>;
      case "failed":
        return <span className="flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[12px] font-bold uppercase tracking-wider"><AlertTriangle className="w-4 h-4" /> Failed</span>;
      case "cancelled":
        return <span className="flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[12px] font-bold uppercase tracking-wider"><XCircle className="w-4 h-4" /> Cancelled</span>;
      default:
        return <span className="flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[12px] font-bold uppercase tracking-wider">{status || "Draft"}</span>;
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#050816] flex flex-col pt-2 pb-6 px-4 sm:px-6">
      <div className="w-full mx-auto flex flex-col gap-6">
        
        {/* HERO SECTION */}
        <div className="relative w-full rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-3xl overflow-hidden shadow-sm">
          {/* Subtle radial purple glow behind the title area */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/4" />
          
          <div className="relative z-10 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] shrink-0 flex items-center justify-center shadow-lg backdrop-blur-md mt-1">
                <Rocket className="w-6 h-6 text-white/80" />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold text-white tracking-tight leading-none">
                  Campaigns
                </h1>
                <p className="text-[15px] text-white/60 font-medium tracking-wide">
                  Create, schedule and monitor WhatsApp campaign delivery.
                </p>
              </div>
            </div>
            
            <Link href="/campaigns/create">
              <button className="h-[48px] px-8 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 hover:from-indigo-400 hover:via-purple-400 hover:to-violet-400 text-white font-bold text-[14px] shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 flex items-center gap-2 relative overflow-hidden group">
                <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12" />
                <Plus className="w-5 h-5 relative z-10" /> 
                <span className="relative z-10 tracking-wide">New Campaign</span>
              </button>
            </Link>
          </div>
        </div>

        {/* STATS STRIP */}
        {campaigns && campaigns.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 flex flex-col gap-1.5 shadow-sm">
              <span className="text-[12px] text-white/40 font-semibold uppercase tracking-wider flex items-center gap-2"><Rocket className="w-3.5 h-3.5" /> Total Campaigns</span>
              <span className="text-2xl font-bold text-white">{stats.total}</span>
            </div>
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 flex flex-col gap-1.5 shadow-sm">
              <span className="text-[12px] text-indigo-400/60 font-semibold uppercase tracking-wider flex items-center gap-2"><Play className="w-3.5 h-3.5" /> Running</span>
              <span className="text-2xl font-bold text-indigo-400">{stats.running}</span>
            </div>
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 flex flex-col gap-1.5 shadow-sm">
              <span className="text-[12px] text-emerald-400/60 font-semibold uppercase tracking-wider flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>
              <span className="text-2xl font-bold text-emerald-400">{stats.completed}</span>
            </div>
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 flex flex-col gap-1.5 shadow-sm">
              <span className="text-[12px] text-rose-400/60 font-semibold uppercase tracking-wider flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5" /> Failed</span>
              <span className="text-2xl font-bold text-rose-400">{stats.failed}</span>
            </div>
          </div>
        )}

        {/* LIST SECTION */}
        {(!campaigns || campaigns.length === 0) ? (
          <div className="flex-1 flex flex-col items-center justify-center py-24 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] backdrop-blur-xl">
            <Rocket className="w-10 h-10 text-white/20 mb-4" />
            <h2 className="text-[15px] font-bold text-white mb-1">No campaigns created</h2>
            <p className="text-[13px] text-white/40 mb-6">Start engaging your contacts today.</p>
            <Link href="/campaigns/create">
              <button className="h-[36px] px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[13px] transition-all duration-300 flex items-center gap-2">
                <Plus className="w-4 h-4 text-white/60" /> Create Campaign
              </button>
            </Link>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 pb-3 text-[12px] font-semibold text-white/50 uppercase tracking-wider border-b border-[rgba(255,255,255,0.06)]">
              <div className="col-span-3">Campaign</div>
              <div className="col-span-3">Configuration</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Delivery</div>
              <div className="col-span-2 text-right">Created</div>
            </div>

            <div className="flex flex-col gap-3">
              {campaigns.map((campaign: any, i: number) => {
                const actualTotal = campaign.total || 0;
                const sent = campaign.sent || 0;
                const failed = campaign.failed || 0;
                const pending = campaign.pending || 0;
                
                const total = actualTotal || 1; 
                const sentPercent = Math.round((sent / total) * 100) || 0;
                const hasNoDeliveryData = actualTotal === 0 && sent === 0 && failed === 0 && pending === 0;

                return (
                  <div 
                    key={campaign.campaign_id || campaign.id || i}
                    onClick={() => router.push(`/campaigns/${campaign.campaign_id || campaign.id}`)}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.04)] rounded-xl px-5 py-5 min-h-[84px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(255,255,255,0.03)] hover:border-purple-500/30 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.2)]"
                  >
                    {/* Campaign Name */}
                    <div className="col-span-3 flex flex-col gap-1.5">
                      <span className="text-[18px] font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {campaign.title || campaign.name || "Untitled Campaign"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-white/40" />
                        <span className="text-[13px] text-white/60">{actualTotal} {actualTotal === 1 ? 'Recipient' : 'Recipients'}</span>
                      </div>
                    </div>

                    {/* Configuration */}
                    <div className="col-span-3 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        {campaign.group_title || campaign.group_name ? (
                          <span className="text-[15px] font-medium text-white/90">{campaign.group_title || campaign.group_name}</span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/50 text-[11px] uppercase tracking-wider border border-white/10">No Group</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-white/40" />
                        <span className="text-[14px] text-white/50">{campaign.template_name || "Unknown"}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      {getStatusBadge(campaign.status || "Draft")}
                    </div>

                    {/* Delivery Progress */}
                    <div className="col-span-2">
                      {!hasNoDeliveryData ? (
                        <div className="w-full flex flex-col gap-2 pr-4">
                          <div className="flex items-center justify-between text-[13px] font-medium text-white/80">
                            <span>{sentPercent}% Delivered</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${sentPercent}%` }} />
                          </div>
                        </div>
                      ) : (
                        <span className="text-[13px] text-white/40 italic">No delivery data</span>
                      )}
                    </div>

                    {/* Date & Hover Action */}
                    <div className="col-span-2 flex items-center justify-end relative h-full min-h-[40px]">
                      <span className="text-[14px] text-white/60 font-medium group-hover:opacity-0 transition-opacity duration-300 absolute right-0">
                        {campaign.created_at ? new Date(campaign.created_at).toLocaleDateString() : "-"}
                      </span>
                      <div className="absolute right-0 flex items-center gap-1.5 text-[14px] font-semibold text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-lg">
                        View Details <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
