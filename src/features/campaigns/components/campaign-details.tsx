"use client";

import React, { useState, useMemo } from "react";
import { useCampaign, useCampaignItems, useCampaignReport } from "../hooks/use-campaigns";
import { 
  Loader2, Calendar, Play, CheckCircle2, AlertTriangle, XCircle, 
  Users, Send, Clock, Rocket, Phone, Search, Target, MessageSquare,
  Copy, Download, FileText, Check, MoreVertical, Eye, MapPin, 
  UserCircle2, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import { RecipientDetailsModal } from "./recipient-details-modal";

export function CampaignDetails({ id }: { id: string }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);

  const { data: campaign, isLoading: isLoadingCampaign } = useCampaign(id);
  const { data: report, isLoading: isLoadingReport } = useCampaignReport(id);
  const { data: items, isLoading: isLoadingItems } = useCampaignItems(id, selectedStatus || undefined);

  const filteredItems = useMemo(() => {
    if (!items) return [];
    return items.filter((item: any) => {
      let searchMatches = true;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const name = `${item.first_name || ""} ${item.last_name || ""}`.toLowerCase();
        const phone = (item.mobile_number || "").toLowerCase();
        searchMatches = name.includes(q) || phone.includes(q);
      }
      return searchMatches;
    });
  }, [items, searchQuery]);

  if (isLoadingCampaign) {
    return (
      <div className="flex h-full min-h-[calc(100vh-8rem)] items-center justify-center bg-[#050816]">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex h-full min-h-[calc(100vh-8rem)] items-center justify-center bg-[#050816] flex-col gap-4">
        <AlertTriangle className="w-16 h-16 text-rose-500" />
        <h2 className="text-2xl font-bold text-white tracking-wide">Campaign Not Found</h2>
        <button onClick={() => router.push("/campaigns")} className="px-6 py-3 bg-indigo-500/20 text-indigo-400 font-bold rounded-xl hover:bg-indigo-500/30 transition-colors">
          Return to Campaigns
        </button>
      </div>
    );
  }

  // Derived Stats
  const totalRecipients = report?.total_recipients || report?.total || campaign?.total || 0;
  const sentCount = report?.sent || campaign?.sent || 0;
  const deliveredCount = report?.delivered || campaign?.delivered || 0;
  const readCount = report?.read || campaign?.read || 0;
  const failedCount = report?.failed || campaign?.failed || 0;
  const pendingCount = report?.in_transit || report?.pending || campaign?.pending || 0;
  
  const total = totalRecipients || 1; 
  const deliveryPercent = Math.round(((deliveredCount || sentCount) / total) * 100) || 0;
  
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (deliveryPercent / 100) * circumference;

  const isCompleted = campaign.status?.toLowerCase() === "completed";

  // Badges
  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "scheduled": return <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[13px] font-bold uppercase tracking-wider"><Calendar className="w-4 h-4" /> Scheduled</span>;
      case "running": return <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[13px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.2)]"><Play className="w-4 h-4" /> Running</span>;
      case "completed": return <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[13px] font-bold uppercase tracking-wider"><CheckCircle2 className="w-4 h-4" /> Completed</span>;
      case "failed": return <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[13px] font-bold uppercase tracking-wider"><AlertTriangle className="w-4 h-4" /> Failed</span>;
      case "cancelled": return <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[13px] font-bold uppercase tracking-wider"><XCircle className="w-4 h-4" /> Cancelled</span>;
      default: return <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[13px] font-bold uppercase tracking-wider">{status || "Draft"}</span>;
    }
  };

  const getRecipientBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "read":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold rounded-lg uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5" /> Read</span>;
      case "delivered": 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold rounded-lg uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5" /> Delivered</span>;
      case "sent":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold rounded-lg uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5" /> Sent</span>;
      case "failed":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] font-bold rounded-lg uppercase tracking-wider"><AlertTriangle className="w-3.5 h-3.5" /> Failed</span>;
      case "cancelled":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[11px] font-bold rounded-lg uppercase tracking-wider"><XCircle className="w-3.5 h-3.5" /> Cancelled</span>;
      case "pending": case "queued": default:
        return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-bold rounded-lg uppercase tracking-wider"><Clock className="w-3.5 h-3.5" /> Pending</span>;
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#050816] flex flex-col pt-4 pb-16 px-4 sm:px-8 xl:px-12">
      <div className="w-[98%] max-w-[1800px] mx-auto flex flex-col gap-8">
        
        {/* 1. BREADCRUMB */}
        <div className="flex items-center gap-2 mb-[-8px]">
          <Link href="/campaigns" className="text-[14px] font-semibold text-white/40 hover:text-white transition-colors">
            Campaigns
          </Link>
          <span className="text-white/20 text-[14px]">/</span>
          <span className="text-[14px] font-bold text-white/90">{campaign.title || campaign.name || "Untitled Campaign"}</span>
        </div>

        {/* 2. HERO SECTION */}
        <div className="relative w-full rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[#0A0D18] backdrop-blur-3xl overflow-hidden shadow-sm">
          {/* Subtle radial gradients (SaaS style, less intense, more refined) */}
          <div className="absolute top-0 left-1/4 w-[800px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 opacity-50" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2 opacity-50" />
          
          <div className="relative z-10 p-8 lg:p-10 flex flex-col lg:flex-row justify-between gap-10">
            
            {/* LEFT: Info & Actions */}
            <div className="flex flex-col gap-6 flex-1 justify-center">
              {/* Status Pill above Title */}
              <div className="flex items-center w-max">
                {getStatusBadge(campaign.status)}
              </div>
              
              <div className="flex flex-col gap-3">
                <h1 className="text-[40px] sm:text-[48px] font-bold text-white tracking-tight leading-[1.1]">
                  {campaign.title || campaign.name || "Untitled Campaign"}
                </h1>
                
                {/* Info Chips (Metadata) */}
                <div className="flex flex-wrap items-center gap-3 mt-2 text-[13px] font-medium text-white/70">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                    <Target className="w-4 h-4 text-white/40" /> 
                    <span>{campaign.group_title || campaign.group_name || "No Group"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                    <MessageSquare className="w-4 h-4 text-white/40" /> 
                    <span>{campaign.template_name || "No Template"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                    <Users className="w-4 h-4 text-white/40" /> 
                    <span>{totalRecipients.toLocaleString()} Recipients</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                    <Calendar className="w-4 h-4 text-white/40" />
                    <span>{campaign.created_at ? new Date(campaign.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "Unknown"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full lg:hidden mb-2">
                <button className="h-9 px-4 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.05)] text-white/60 hover:text-white/90 font-medium text-[13px] transition-all flex items-center gap-2">
                  <Download className="w-3.5 h-3.5" /> Export Report
                </button>
              </div>

            </div>

            {/* RIGHT: Actions & Business Summary Card */}
            <div className="lg:w-[400px] flex flex-col gap-6 shrink-0 relative">
              <div className="w-full flex justify-end hidden lg:flex">
                <button className="h-9 px-4 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.05)] text-white/60 hover:text-white/90 font-medium text-[13px] transition-all flex items-center gap-2">
                  <Download className="w-3.5 h-3.5" /> Export Report
                </button>
              </div>

              <div className="flex flex-col p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] overflow-hidden">
              <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-widest mb-5">Campaign Summary</h3>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-white/40 font-medium">Success Rate</span>
                  <span className="text-[24px] font-bold text-emerald-400">{deliveryPercent}%</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-white/40 font-medium">Messages Sent</span>
                  <span className="text-[24px] font-bold text-white">{sentCount.toLocaleString()}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-white/40 font-medium">Failed</span>
                  <span className="text-[24px] font-bold text-rose-400">{failedCount.toLocaleString()}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-white/40 font-medium">Completion</span>
                  <span className="text-[14px] font-medium text-white/90 mt-1">
                    {campaign.completed_at ? new Date(campaign.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "In Progress"}
                  </span>
                </div>
              </div>

              {/* Progress bar representing delivery rate */}
              <div className="w-full h-1.5 bg-white/5 rounded-full mt-6 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${deliveryPercent}%` }} 
                />
              </div>
            </div>

            </div>
          </div>
        </div>

        {/* 3. KPI SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 w-full">
          
          {/* Card 1: Delivery Success Ring */}
          <div className="h-[140px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-6 flex items-center justify-between shadow-sm hover:shadow-[0_10px_40px_rgba(16,185,129,0.1)] hover:border-emerald-500/30 transition-all duration-300 group">
            <div className="flex flex-col gap-2">
              <span className="text-[14px] text-white/50 font-bold uppercase tracking-wider">Delivery Success</span>
              <span className="text-[13px] text-white/40 mt-auto">{sentCount} of {total} Delivered</span>
            </div>
            <div className="relative w-[88px] h-[88px] flex items-center justify-center shrink-0">
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0%,rgba(16,185,129,0.15)_100%)] animate-[spin_4s_linear_infinite]" />
              <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]">
                <circle cx="44" cy="44" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
                <circle cx="44" cy="44" r={radius} stroke="#10b981" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out" />
              </svg>
              <span className="text-[20px] font-black text-white z-10 drop-shadow-md">{deliveryPercent}%</span>
            </div>
          </div>

          {/* Card 2: Total Recipients */}
          <div className="h-[140px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-6 flex flex-col shadow-sm hover:shadow-[0_10px_40px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/4 group-hover:bg-white/10 transition-colors duration-500" />
            <span className="text-[14px] text-white/50 font-bold uppercase tracking-wider flex items-center gap-2 mb-2"><Users className="w-4 h-4" /> Total Recipients</span>
            <span className="text-[48px] font-black text-white leading-none mt-auto tracking-tight">{totalRecipients.toLocaleString()}</span>
          </div>

          {/* Card 3: Successfully Sent */}
          <div className="h-[140px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-6 flex flex-col shadow-sm hover:shadow-[0_10px_40px_rgba(16,185,129,0.1)] hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/4 group-hover:bg-emerald-500/20 transition-colors duration-500" />
            <span className="text-[14px] text-emerald-400/60 font-bold uppercase tracking-wider flex items-center gap-2 mb-2"><Send className="w-4 h-4" /> Messages Sent</span>
            <span className="text-[36px] font-black text-emerald-400 leading-none mt-auto tracking-tight">{sentCount.toLocaleString()}</span>
          </div>

          {/* Card 4: Delivered */}
          <div className="h-[140px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-6 flex flex-col shadow-sm hover:shadow-[0_10px_40px_rgba(16,185,129,0.1)] hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/4 group-hover:bg-emerald-500/20 transition-colors duration-500" />
            <span className="text-[14px] text-emerald-400/60 font-bold uppercase tracking-wider flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4" /> Delivered</span>
            <span className="text-[36px] font-black text-emerald-400 leading-none mt-auto tracking-tight">{deliveredCount.toLocaleString()}</span>
          </div>

          {/* Card 5: Read */}
          <div className="h-[140px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-6 flex flex-col shadow-sm hover:shadow-[0_10px_40px_rgba(59,130,246,0.1)] hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/4 group-hover:bg-blue-500/20 transition-colors duration-500" />
            <span className="text-[14px] text-blue-400/60 font-bold uppercase tracking-wider flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4" /> Messages Read</span>
            <span className="text-[36px] font-black text-blue-400 leading-none mt-auto tracking-tight">{readCount.toLocaleString()}</span>
          </div>

          {/* Card 6: Failed Deliveries */}
          <div className="h-[140px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-6 flex flex-col shadow-sm hover:shadow-[0_10px_40px_rgba(244,63,94,0.1)] hover:border-rose-500/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/4 group-hover:bg-rose-500/20 transition-colors duration-500" />
            <span className="text-[14px] text-rose-400/60 font-bold uppercase tracking-wider flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4" /> Failed Deliveries</span>
            <span className="text-[36px] font-black text-rose-400 leading-none mt-auto tracking-tight">{failedCount.toLocaleString()}</span>
          </div>

          {/* Card 7: Pending / Queued */}
          <div className="h-[140px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-6 flex flex-col shadow-sm hover:shadow-[0_10px_40px_rgba(245,158,11,0.1)] hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/4 group-hover:bg-amber-500/20 transition-colors duration-500" />
            <span className="text-[14px] text-amber-500/60 font-bold uppercase tracking-wider flex items-center gap-2 mb-2"><Clock className="w-4 h-4" /> Pending / Transit</span>
            <span className="text-[36px] font-black text-amber-400 leading-none mt-auto tracking-tight">{pendingCount.toLocaleString()}</span>
          </div>

        </div>

        {/* 4. MAIN CONTENT GRID */}
        <div className="flex flex-col xl:flex-row gap-6 w-full mt-4 pb-4">
          
          {/* LEFT: Activity Timeline (55%) */}
          <div className="xl:w-[55%] flex flex-col gap-6">
            <h2 className="text-[20px] font-bold text-white flex items-center gap-2 px-2">
              <Calendar className="w-5 h-5 text-indigo-400" /> Activity Timeline
            </h2>
            
            <div className="bg-[rgba(11,18,40,0.6)] border border-[rgba(255,255,255,0.08)] rounded-[24px] backdrop-blur-xl p-8 sm:p-10 shadow-lg min-h-[500px] overflow-y-auto custom-scrollbar" style={{ maxHeight: '700px' }}>
              <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-500/20 space-y-12 py-4">
                
                {/* Event 1: Created */}
                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-[20px] h-[20px] rounded-full bg-[#050816] border-2 border-indigo-500 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    <div className="w-[8px] h-[8px] bg-indigo-400 rounded-full" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[rgba(255,255,255,0.02)] p-5 rounded-2xl border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.1)] transition-colors">
                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-[18px] font-bold text-white">Campaign Created</h4>
                      <span className="text-[14px] font-mono text-white/50">{campaign.created_at ? new Date(campaign.created_at).toLocaleString() : "Unknown"}</span>
                    </div>
                    <span className="px-3 py-1 bg-white/5 text-white/60 text-[12px] font-bold uppercase tracking-wider rounded-lg border border-white/10 self-start sm:self-center">System Event</span>
                  </div>
                </div>

                {/* Event 2: Started */}
                {campaign.started_at && (
                  <div className="relative group">
                    <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-[20px] h-[20px] rounded-full bg-[#050816] border-2 border-blue-500 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                      <div className="w-[8px] h-[8px] bg-blue-400 rounded-full" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[rgba(255,255,255,0.02)] p-5 rounded-2xl border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.1)] transition-colors">
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-[18px] font-bold text-white">Sending Started</h4>
                        <span className="text-[14px] font-mono text-white/50">{new Date(campaign.started_at).toLocaleString()}</span>
                      </div>
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[12px] font-bold uppercase tracking-wider rounded-lg border border-blue-500/20 self-start sm:self-center">In Progress</span>
                    </div>
                  </div>
                )}

                {/* Event 3: Completed */}
                {campaign.completed_at && (
                  <div className="relative group">
                    <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-[20px] h-[20px] rounded-full bg-[#050816] border-2 border-emerald-500 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                      <Check className="w-[12px] h-[12px] text-emerald-400 font-bold" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/20 hover:bg-emerald-500/10 transition-colors">
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-[18px] font-bold text-emerald-400">Delivery Completed</h4>
                        <span className="text-[14px] font-mono text-emerald-400/60">{new Date(campaign.completed_at).toLocaleString()}</span>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[12px] font-bold uppercase tracking-wider rounded-lg border border-emerald-500/30 self-start sm:self-center">Finalized</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* RIGHT: Recipients Panel (45%) */}
          <div className="xl:w-[45%] flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-[20px] font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" /> Recipients Panel
              </h2>
            </div>

            <div className="bg-[rgba(11,18,40,0.6)] border border-[rgba(255,255,255,0.08)] rounded-[24px] backdrop-blur-xl p-6 sm:p-8 shadow-lg flex flex-col min-h-[500px]">
              
              {/* Search & Filters */}
              <div className="flex flex-col xl:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search recipient..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-[54px] pl-12 pr-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[16px] focus:outline-none focus:border-indigo-500/50 focus:bg-[rgba(255,255,255,0.05)] focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 placeholder:text-white/30"
                  />
                </div>
                
                {/* Status Filters */}
                <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 xl:pb-0">
                  {["All", "Sent", "Delivered", "Read", "Failed", "Pending"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status === "All" ? "" : status.toLowerCase())}
                      className={`px-4 h-[54px] rounded-xl font-semibold text-[14px] whitespace-nowrap transition-all duration-300 border ${
                        (status === "All" && selectedStatus === "") || selectedStatus === status.toLowerCase()
                          ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400"
                          : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-white/60 hover:text-white hover:bg-[rgba(255,255,255,0.06)]"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Cards List */}
              {isLoadingItems ? (
                <div className="flex-1 flex justify-center items-center">
                  <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.05)] text-center">
                  <Users className="w-12 h-12 text-white/20 mb-4" />
                  <h3 className="text-[18px] font-bold text-white mb-2">No Recipients Found</h3>
                  <p className="text-[14px] text-white/40">Adjust your search query to see results.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 overflow-y-auto pr-3 custom-scrollbar" style={{ maxHeight: '600px' }}>
                  {filteredItems.map((item: any, i: number) => (
                    <div key={item.id || i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.15)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300 group">
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                          <UserCircle2 className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[16px] font-bold text-white tracking-wide">
                            {`${item.first_name || ""} ${item.last_name || ""}`.trim() || `Recipient #${i + 1}`}
                          </span>
                          <div className="flex items-center gap-2 text-[14px] font-mono text-white/50">
                            <Phone className="w-3.5 h-3.5 text-white/30" /> 
                            {item.mobile_number ? `+${item.mobile_number}` : "N/A"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full border-t sm:border-t-0 border-[rgba(255,255,255,0.05)] pt-3 sm:pt-0">
                        <div className="flex flex-col sm:items-end gap-1 text-right">
                          {getRecipientBadge(item.status)}
                          <div className="flex flex-col text-[11px] font-mono text-white/40 mt-1">
                            {item.sent_at && <span>Sent: {new Date(item.sent_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>}
                            {item.delivered_at && <span>Dlv: {new Date(item.delivered_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>}
                            {item.read_at && <span>Read: {new Date(item.read_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>}
                            {item.failed_at && <span>Failed: {new Date(item.failed_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setSelectedRecipient(item)}
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors border border-transparent hover:border-white/10 focus:outline-none"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          <DropdownMenu.Root
                            open={activeMenuId === (item.id || i.toString())}
                            onOpenChange={(open) => setActiveMenuId(open ? (item.id || i.toString()) : null)}
                          >
                            <DropdownMenu.Trigger asChild>
                              <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors border border-transparent hover:border-white/10 focus:outline-none">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                              <DropdownMenu.Content
                                align="end"
                                sideOffset={4}
                                className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(11,18,40,0.95)] backdrop-blur-xl p-1 shadow-xl z-[100] animate-fade-in text-left select-none w-48 focus:outline-none"
                              >
                                <DropdownMenu.Item
                                  onSelect={() => setSelectedRecipient(item)}
                                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-white/80 hover:text-white hover:bg-[rgba(255,255,255,0.06)] focus:bg-[rgba(255,255,255,0.06)] focus:outline-none transition-colors cursor-pointer select-none"
                                >
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </DropdownMenu.Item>

                                <DropdownMenu.Item
                                  onSelect={() => {
                                    navigator.clipboard.writeText(item.mobile_number || "");
                                    toast.success("Mobile number copied");
                                  }}
                                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-white/80 hover:text-white hover:bg-[rgba(255,255,255,0.06)] focus:bg-[rgba(255,255,255,0.06)] focus:outline-none transition-colors cursor-pointer select-none"
                                >
                                  <Copy className="h-4 w-4" />
                                  Copy Mobile
                                </DropdownMenu.Item>

                                <DropdownMenu.Item
                                  onSelect={() => {
                                    navigator.clipboard.writeText(item.message_id || item.whatsapp_message_id || "");
                                    toast.success("Message ID copied");
                                  }}
                                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-white/80 hover:text-white hover:bg-[rgba(255,255,255,0.06)] focus:bg-[rgba(255,255,255,0.06)] focus:outline-none transition-colors cursor-pointer select-none"
                                >
                                  <Copy className="h-4 w-4" />
                                  Copy Message ID
                                </DropdownMenu.Item>
                              </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                          </DropdownMenu.Root>
                        </div>
                      </div>
                      
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      
      {/* Modals */}
      {selectedRecipient && (
        <RecipientDetailsModal recipient={selectedRecipient} onClose={() => setSelectedRecipient(null)} />
      )}
    </div>
  );
}
