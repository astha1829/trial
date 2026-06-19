import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle2, Clock, AlertTriangle, MessageSquare, Phone, UserCircle2, Hash } from "lucide-react";

interface RecipientDetailsModalProps {
  recipient: any;
  onClose: () => void;
}

export function RecipientDetailsModal({ recipient, onClose }: RecipientDetailsModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!mounted || !recipient) return null;

  const fullName = `${recipient.first_name || ""} ${recipient.last_name || ""}`.trim() || "Unknown Recipient";
  const mobile = recipient.mobile_number ? `+${recipient.mobile_number}` : "N/A";
  const status = recipient.status || "Unknown";
  const messageId = recipient.message_id || recipient.whatsapp_message_id || "N/A";

  const getStatusBadge = (s: string) => {
    switch (s?.toLowerCase()) {
      case "read":
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold rounded-lg uppercase tracking-wider"><CheckCircle2 className="w-4 h-4" /> Read</span>;
      case "delivered": 
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold rounded-lg uppercase tracking-wider"><CheckCircle2 className="w-4 h-4" /> Delivered</span>;
      case "sent":
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold rounded-lg uppercase tracking-wider"><CheckCircle2 className="w-4 h-4" /> Sent</span>;
      case "failed":
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-bold rounded-lg uppercase tracking-wider"><AlertTriangle className="w-4 h-4" /> Failed</span>;
      default:
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm font-bold rounded-lg uppercase tracking-wider"><Clock className="w-4 h-4" /> Pending</span>;
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "N/A";
    return new Date(timeString).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 dark:bg-[#050816]/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-[500px] flex flex-col bg-white dark:bg-[#0b1228] border border-slate-200 dark:border-[rgba(255,255,255,0.08)] shadow-sm dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden animate-slide-up">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-[rgba(255,255,255,0.05)] bg-slate-50/50 dark:bg-[rgba(255,255,255,0.02)]">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Recipient Details</h2>
            <p className="text-sm font-medium text-slate-500 dark:text-white/50">View real-time status and timestamps</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:text-white/50 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Identity Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[rgba(255,255,255,0.03)] border border-slate-200 dark:border-[rgba(255,255,255,0.05)]">
            <div className="w-14 h-14 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <UserCircle2 className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">{fullName}</span>
              <div className="flex items-center gap-2 text-sm font-mono text-slate-600 dark:text-white/60">
                <Phone className="w-4 h-4 text-slate-400 dark:text-white/40" /> 
                {mobile}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[rgba(255,255,255,0.03)] border border-slate-200 dark:border-[rgba(255,255,255,0.05)]">
            <span className="text-sm font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider">Current Status</span>
            {getStatusBadge(status)}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[rgba(255,255,255,0.03)] border border-slate-200 dark:border-[rgba(255,255,255,0.05)] space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-white/50 font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Sent Time</span>
              <span className="font-mono text-slate-800 dark:text-white/90">{formatTime(recipient.sent_at)}</span>
            </div>
            <div className="h-px w-full bg-slate-200 dark:bg-[rgba(255,255,255,0.05)]" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-white/50 font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Delivered Time</span>
              <span className="font-mono text-slate-800 dark:text-white/90">{formatTime(recipient.delivered_at)}</span>
            </div>
            <div className="h-px w-full bg-slate-200 dark:bg-[rgba(255,255,255,0.05)]" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-white/50 font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Read Time</span>
              <span className="font-mono text-slate-800 dark:text-white/90">{formatTime(recipient.read_at)}</span>
            </div>
            {recipient.failed_at && (
              <>
                <div className="h-px w-full bg-slate-200 dark:bg-[rgba(255,255,255,0.05)]" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-rose-600/80 dark:text-rose-400/80 font-medium flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Failed Time</span>
                  <span className="font-mono text-rose-600 dark:text-rose-400">{formatTime(recipient.failed_at)}</span>
                </div>
              </>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[rgba(255,255,255,0.03)] border border-slate-200 dark:border-[rgba(255,255,255,0.05)] flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider flex items-center gap-2">
              <Hash className="w-3.5 h-3.5" /> WhatsApp Message ID
            </span>
            <span className="font-mono text-sm text-slate-800 dark:text-white break-all bg-white dark:bg-[#050816] p-3 rounded-xl border border-slate-200 dark:border-[rgba(255,255,255,0.05)] shadow-inner">
              {messageId}
            </span>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
