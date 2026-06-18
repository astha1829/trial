import React from "react";
import { Template } from "../types";
import { 
  BarChart3, 
  CheckCircle2, 
  MessageSquare,
  Globe2,
  TrendingUp,
  Activity
} from "lucide-react";

interface TemplateInsightsPanelProps {
  templates: Template[];
}

export function TemplateInsightsPanel({ templates }: TemplateInsightsPanelProps) {
  // Compute Analytics
  const totalTemplates = templates.length;
  const approvedTemplates = templates.filter(t => t.status.toLowerCase() === "approved").length;
  const approvalRate = totalTemplates > 0 ? Math.round((approvedTemplates / totalTemplates) * 100) : 0;
  
  // Find most used template
  const mostUsed = [...templates].sort((a, b) => {
    const aSent = typeof a.messages_sent === 'number' ? a.messages_sent : 0;
    const bSent = typeof b.messages_sent === 'number' ? b.messages_sent : 0;
    return bSent - aSent;
  })[0];

  const totalMessagesSent = templates.reduce((acc, t) => {
    return acc + (typeof t.messages_sent === 'number' ? t.messages_sent : 0);
  }, 0);

  // Get unique categories and languages
  const uniqueCategories = new Set(templates.map(t => t.category)).size;
  const uniqueLanguages = new Set(templates.map(t => t.language)).size;

  return (
    <div className="w-full flex flex-col h-full space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <BarChart3 className="h-5 w-5 text-muted-foreground transition-colors" />
        <h3 className="text-[18px] font-bold text-foreground tracking-tight transition-colors">Global Insights</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {/* Metric 1: Health & Approval */}
        <div className="p-6 rounded-2xl bg-secondary/40 border border-border space-y-3 flex flex-col justify-center transition-all hover:bg-secondary/60">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 transition-colors" />
            <span className="text-[14px] font-semibold text-muted-foreground transition-colors">Approval Health</span>
          </div>
          <div>
            <div className="text-[32px] font-black text-foreground leading-none transition-colors">{approvalRate}%</div>
            <p className="text-[14px] text-muted-foreground mt-2 transition-colors">{approvedTemplates} out of {totalTemplates} templates approved</p>
          </div>
          <div className="w-full h-2 bg-background rounded-full overflow-hidden mt-3 transition-colors">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${approvalRate}%` }} />
          </div>
        </div>

        {/* Metric 2: Engagement */}
        <div className="p-6 rounded-2xl bg-secondary/40 border border-border space-y-3 flex flex-col justify-center transition-all hover:bg-secondary/60">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4.5 w-4.5 text-blue-400 transition-colors" />
            <span className="text-[14px] font-semibold text-muted-foreground transition-colors">Total Dispatch</span>
          </div>
          <div>
            <div className="text-[32px] font-black text-foreground leading-none transition-colors">{totalMessagesSent.toLocaleString()}</div>
            <p className="text-[14px] text-muted-foreground mt-2 transition-colors">Messages sent across all campaigns</p>
          </div>
        </div>

        {/* Metric 3: Most Used Template */}
        <div className="p-6 rounded-2xl bg-secondary/40 border border-border space-y-3 flex flex-col justify-center transition-all hover:bg-secondary/60">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="h-4.5 w-4.5 text-purple-400 transition-colors" />
            <span className="text-[14px] font-semibold text-muted-foreground transition-colors">Most Used Template</span>
          </div>
          <div>
            <div className="text-[20px] font-bold text-foreground truncate max-w-full leading-tight transition-colors" title={mostUsed?.template_name || "N/A"}>
              {mostUsed?.template_name || "N/A"}
            </div>
            <p className="text-[14px] text-muted-foreground mt-2 transition-colors">
              {mostUsed && typeof mostUsed.messages_sent === 'number' ? `${mostUsed.messages_sent.toLocaleString()} dispatches` : 'No data available'}
            </p>
          </div>
        </div>

        {/* Metric 4: Diversity */}
        <div className="p-6 rounded-2xl bg-secondary/40 border border-border space-y-3 flex flex-col justify-center transition-all hover:bg-secondary/60">
          <div className="flex items-center gap-2 mb-1">
            <Globe2 className="h-4.5 w-4.5 text-amber-400 transition-colors" />
            <span className="text-[14px] font-semibold text-muted-foreground transition-colors">Content Diversity</span>
          </div>
          <div className="flex items-end gap-6 pt-1">
            <div>
              <div className="text-[32px] font-black text-foreground leading-none transition-colors">{uniqueCategories}</div>
              <p className="text-[14px] text-muted-foreground mt-2 transition-colors">Categories</p>
            </div>
            <div className="w-px h-10 bg-border transition-colors" />
            <div>
              <div className="text-[32px] font-black text-foreground leading-none transition-colors">{uniqueLanguages}</div>
              <p className="text-[14px] text-muted-foreground mt-2 transition-colors">Languages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
