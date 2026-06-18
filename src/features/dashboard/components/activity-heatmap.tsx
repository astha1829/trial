"use client";

import React, { useState } from "react";
import { Grid3X3, Mail, Phone, Users } from "lucide-react";

export function ActivityHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<{ day: number; week: number; count: number } | null>(null);

  const mockContacts = [
    { id: "c-1", name: "Jane Smith", detail: "jane.s@acme.com", isPhone: false, time: "2 mins ago" },
    { id: "c-2", name: "Robert Johnson", detail: "+1 (555) 019-2834", isPhone: true, time: "15 mins ago" },
    { id: "c-3", name: "VIP Customer", detail: "vip@marketing.co", isPhone: false, time: "1 hour ago" },
    { id: "c-4", name: "Emily Davis", detail: "emily.d@gmail.com", isPhone: false, time: "2 hours ago" },
  ];

  const rows = 7;
  const cols = 16; // reduced slightly to fit the split pane layout perfectly
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  // Generate consistent activity grid
  const grid = Array.from({ length: rows }, (_, dayIndex) => {
    return Array.from({ length: cols }, (_, weekIndex) => {
      const val = (dayIndex * 7 + weekIndex * 13) % 11;
      let level = 0;
      let count = 0;
      if (val === 1 || val === 5) {
        level = 1;
        count = Math.floor(Math.random() * 3) + 1;
      } else if (val === 2 || val === 8) {
        level = 2;
        count = Math.floor(Math.random() * 5) + 4;
      } else if (val === 3) {
        level = 3;
        count = Math.floor(Math.random() * 8) + 9;
      } else if (val === 7) {
        level = 4;
        count = Math.floor(Math.random() * 12) + 16;
      }
      return { day: dayIndex, week: weekIndex, level, count };
    });
  });

  const getCellColor = (level: number) => {
    switch (level) {
      case 0: return "bg-secondary border border-border hover:border-foreground/20";
      case 1: return "bg-blue-900/30 border border-blue-900/50 hover:bg-blue-800/40";
      case 2: return "bg-blue-700/40 border border-blue-600/50 hover:bg-blue-600/50";
      case 3: return "bg-blue-500/60 border border-blue-400/50 hover:bg-blue-400/60";
      case 4: return "bg-blue-400 border border-blue-300/50 hover:bg-blue-300";
      default: return "bg-secondary";
    }
  };

  return (
    <div className="w-full h-full rounded-[24px] border border-border bg-card dark:bg-card dark:bg-card/60 dark:backdrop-blur-xl p-6 shadow-sm dark:shadow-2xl flex flex-col justify-between transition-colors duration-300">
      <div>
        <div className="flex items-center justify-between mb-5 border-b border-border pb-3 transition-colors">
          <div>
            <h2 className="text-base font-bold text-foreground tracking-wide flex items-center gap-2 transition-colors">
              <Users className="w-4.5 h-4.5 text-blue-400" />
              Recently Created Contacts
            </h2>
            <p className="text-[11px] text-muted-foreground transition-colors">Auditing active records acquisition rate.</p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground transition-colors">
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>Density Grid</span>
          </div>
        </div>

        {/* Split Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Column 1: Recently Created Contacts List (2/5 width) */}
          <div className="lg:col-span-2 flex flex-col gap-3 pr-2 border-r border-border transition-colors">
            {mockContacts.map((contact) => (
              <div 
                key={contact.id} 
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-secondary/50 border border-border hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    {contact.isPhone ? <Phone className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[11px] font-bold text-foreground truncate transition-colors">{contact.name}</h4>
                    <p className="text-[9px] text-muted-foreground truncate mt-0.5 transition-colors">{contact.detail}</p>
                  </div>
                </div>
                <span className="text-[8px] font-bold text-muted-foreground shrink-0 uppercase tracking-wide transition-colors">{contact.time}</span>
              </div>
            ))}
          </div>

          {/* Column 2: Heatmap Grid (3/5 width) */}
          <div className="lg:col-span-3 flex flex-col gap-1 overflow-x-auto select-none hide-scrollbar justify-center">
            {/* Month Labels */}
            <div className="flex pl-8 text-[8px] font-bold text-muted-foreground uppercase tracking-widest gap-3.5 mb-1.5 transition-colors">
              {months.map((m) => (
                <span key={m} className="w-6 text-center">{m}</span>
              ))}
            </div>

            <div className="flex gap-2 items-start">
              {/* Days Column */}
              <div className="flex flex-col justify-between h-[96px] text-[8px] font-bold text-muted-foreground uppercase tracking-widest pr-1 transition-colors">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* Grid Cells */}
              <div className="flex gap-[3px] flex-1">
                {Array.from({ length: cols }).map((_, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[3px]">
                    {Array.from({ length: rows }).map((_, dayIdx) => {
                      const cell = grid[dayIdx][weekIdx];
                      return (
                        <div
                          key={dayIdx}
                          onMouseEnter={() => setHoveredCell({ day: dayIdx, week: weekIdx, count: cell.count })}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`w-[11px] h-[11px] rounded-[3px] transition-all cursor-pointer ${getCellColor(cell.level)}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border transition-colors">
        <div className="text-[10px] text-muted-foreground font-medium transition-colors">
          {hoveredCell ? (
            <span>
              Acquisition Wk {hoveredCell.week + 1}: <span className="text-blue-400 font-bold">{hoveredCell.count} records added</span>
            </span>
          ) : (
            <span>Contact recruitment rate is stable.</span>
          )}
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-1 text-[8px] font-bold text-muted-foreground uppercase tracking-wider transition-colors">
          <span>Less</span>
          <div className="w-2 h-2 rounded-[2px] bg-secondary border border-border" />
          <div className="w-2 h-2 rounded-[2px] bg-blue-900/30" />
          <div className="w-2 h-2 rounded-[2px] bg-blue-500/60" />
          <div className="w-2 h-2 rounded-[2px] bg-blue-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

