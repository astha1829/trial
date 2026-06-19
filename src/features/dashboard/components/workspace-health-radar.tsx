"use client";

import React from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import { Grid3X3 } from "lucide-react";

interface WorkspaceHealthRadarProps {
  contacts: number;
  groups: number;
  templates: number;
  campaigns: number;
}

export function WorkspaceHealthRadar({ contacts, groups, templates, campaigns }: WorkspaceHealthRadarProps) {
  
  const contactsScore = Math.min(65 + (contacts > 0 ? Math.log10(contacts) * 10 : 0), 98);
  const groupsScore = Math.min(50 + (groups * 4), 95);
  const templatesScore = Math.min(60 + (templates * 3), 96);
  const campaignsScore = Math.min(75 + (campaigns > 0 ? 5 : 0), 94);

  const data = [
    { subject: "Total Contacts", value: Math.round(contactsScore), displayVal: contacts, fullMark: 100 },
    { subject: "Total Groups", value: Math.round(groupsScore), displayVal: groups, fullMark: 100 },
    { subject: "Total Templates", value: Math.round(templatesScore), displayVal: templates, fullMark: 100 },
    { subject: "Total Campaigns", value: Math.round(campaignsScore), displayVal: campaigns, fullMark: 100 },
  ];

  const totalEntities = contacts + groups + templates + campaigns;

  return (
    <div className="w-full h-full rounded-[24px] border border-border bg-card dark:bg-card dark:bg-card/60 dark:backdrop-blur-xl p-6 shadow-sm dark:shadow-2xl flex flex-col justify-between transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-foreground tracking-wide flex items-center gap-2 transition-colors">
            <Grid3X3 className="w-4.5 h-4.5 text-cyan-400" />
            Total Entities
          </h2>
          <p className="text-[11px] text-muted-foreground transition-colors">Record distribution matrix.</p>
        </div>
        <div className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-black text-sm">
          {totalEntities.toLocaleString()} Records
        </div>
      </div>

      <div className="flex-1 min-h-[200px] flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: "600" }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: "#64748b", fontSize: 8 }}
              axisLine={false}
            />
            <Radar
              name="Saturation Ratio"
              dataKey="value"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.15}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const payloadData = payload[0].payload;
                  return (
                    <div className="bg-popover/95 border border-border p-3 rounded-xl shadow-sm dark:shadow-2xl text-[11px] text-foreground">
                      <p className="font-bold text-foreground mb-1">{payloadData.subject}</p>
                      <p>Active Volume: <span className="font-black text-cyan-400 text-xs">{payloadData.displayVal.toLocaleString()}</span></p>
                      <p>Capacity index: <span className="font-bold text-muted-foreground">{payloadData.value}%</span></p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border text-center transition-colors">
        <div>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block transition-colors">Audience Density</span>
          <span className="text-sm font-bold text-foreground transition-colors">{contacts.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block transition-colors">Campaign Outlets</span>
          <span className="text-sm font-bold text-foreground transition-colors">{campaigns.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

