import React from "react";
import { Activity, RefreshCw, Send, CheckCircle2, Megaphone } from "lucide-react";

export function TemplateActivityTimeline() {
  // Mock operational events (In a real app, this would be fetched from an API)
  const events = [
    {
      id: 1,
      title: "Template Synced",
      description: "Successfully pulled 24 templates from WhatsApp Business API.",
      time: "2 minutes ago",
      icon: RefreshCw,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      id: 2,
      title: "Test Message Sent",
      description: "Test message for 'summer_promo' dispatched to +1234567890.",
      time: "45 minutes ago",
      icon: Send,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      id: 3,
      title: "Template Approved",
      description: "WhatsApp approved 'welcome_onboarding' template.",
      time: "3 hours ago",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      id: 4,
      title: "Campaign Activated",
      description: "Template 'black_friday_alert' attached to active campaign.",
      time: "Yesterday, 14:30",
      icon: Megaphone,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    }
  ];

  return (
    <div className="w-full flex flex-col h-full space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <Activity className="h-5 w-5 text-muted-foreground transition-colors" />
        <h3 className="text-[18px] font-bold text-foreground tracking-tight transition-colors">Recent Activity</h3>
      </div>
      
      <div className="flex-1 rounded-2xl border border-border bg-secondary/40 p-2 transition-colors">
        <div className="flex flex-col">
          {events.map((event, index) => {
            const Icon = event.icon;
            const isLast = index === events.length - 1;
            return (
              <div key={event.id} className={`flex items-start gap-4 p-4 hover:bg-secondary/60 transition-colors ${!isLast ? 'border-b border-border' : ''}`}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${event.bg} ${event.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[15px] font-semibold text-foreground truncate transition-colors">{event.title}</span>
                    <span className="text-[13px] text-muted-foreground whitespace-nowrap ml-4 transition-colors">{event.time}</span>
                  </div>
                  <p className="text-[14px] text-muted-foreground truncate transition-colors">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
