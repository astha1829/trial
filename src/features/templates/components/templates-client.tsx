"use client";

import React, { useState, useRef } from "react";
import { useTemplates, useSyncTemplates } from "../hooks/use-templates";
import { TemplatesSkeleton, TemplatesErrorState } from "./templates-skeleton";
import { TemplatesEmptyState } from "./templates-empty-state";
import { TemplatesMetrics } from "./templates-metrics";
import { TemplatesTable } from "./templates-table";
import { TemplateDetailsModal } from "./template-details-modal";
import { TemplateInsightsPanel } from "./template-insights-panel";
import { TemplateActivityTimeline } from "./template-activity-timeline";
import { RefreshCw, LayoutTemplate } from "lucide-react";

export function TemplatesClient() {
  const { data: templates, isLoading, isError, refetch, isRefetching } = useTemplates();
  const { mutate: syncTemplates, isPending: isSyncing } = useSyncTemplates();
  
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSync = () => {
    syncTemplates();
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
  };

  const selectedTemplate = templates?.find(t => t.template_id === selectedTemplateId);

  return (
    <div ref={containerRef} className="space-y-6 select-none animate-fade-in pb-12 flex flex-col">
      {/* Top Command Center */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-black tracking-widest uppercase self-start w-fit">
            <LayoutTemplate className="h-3.5 w-3.5" />
            <span>CRM Operations</span>
          </div>
          <h1 className="text-[40px] md:text-[48px] font-black tracking-tight text-foreground leading-none transition-colors">
            Templates Analytics
          </h1>
          <p className="text-muted-foreground text-[16px] font-medium max-w-xl leading-relaxed transition-colors">
            Monitor performance, health, and test your WhatsApp Business templates.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleRefresh}
            disabled={isRefetching || isLoading}
            className="flex items-center gap-2 h-10 px-4 rounded-xl border border-border hover:border-foreground/10 bg-secondary/50 hover:bg-secondary transition-all text-sm font-bold text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed shadow-sm dark:shadow-lg"
          >
            <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 h-10 px-5 rounded-xl border border-blue-500/20 bg-blue-600/20 hover:bg-blue-600/30 transition-all text-sm font-bold text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync Templates
          </button>
        </div>
      </div>

      {/* Main Content State Management */}
      {isLoading ? (
        <TemplatesSkeleton />
      ) : isError ? (
        <TemplatesErrorState onRetry={handleRefresh} />
      ) : !templates || templates.length === 0 ? (
        <TemplatesEmptyState onSync={handleSync} isSyncing={isSyncing} />
      ) : (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* Command Center KPIs */}
          <div className="shrink-0 z-20 relative">
            <TemplatesMetrics templates={templates} />
          </div>

          {/* Main Full-Width Table */}
          <div className="w-full relative">
            <TemplatesTable 
              templates={templates} 
              onSelect={(template) => handleSelectTemplate(template.template_id)}
              selectedId={selectedTemplateId}
            />
          </div>
          
          {/* Bottom Data Section: 50/50 Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Left: Operational Timeline */}
            <div>
              <TemplateActivityTimeline />
            </div>
            
            {/* Right: Insights Panel */}
            <div>
              <TemplateInsightsPanel 
                templates={templates} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Global Template Details Modal Overlay */}
      {selectedTemplate && (
        <TemplateDetailsModal 
          template={selectedTemplate} 
          onClose={() => setSelectedTemplateId(undefined)} 
        />
      )}
    </div>
  );
}

