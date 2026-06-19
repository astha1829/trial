"use client";

import React from "react";
import { UserPlus, FolderPlus, RefreshCw, Megaphone, Send, Brain } from "lucide-react";
import { motion } from "framer-motion";

interface CommandCenterActionsProps {
  onActionClick: (action: string) => void;
}

export function CommandCenterActions({ onActionClick }: CommandCenterActionsProps) {
  const leftActions = [
    {
      name: "Create Contact",
      desc: "Register new lead details",
      icon: UserPlus,
      action: "Create Contact",
      color: "#3b82f6",
      glowClass: "group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:border-blue-500/30"
    },
    {
      name: "Create Group",
      desc: "Segment target lists",
      icon: FolderPlus,
      action: "Create Group",
      color: "#10b981",
      glowClass: "group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:border-emerald-500/30"
    }
  ];

  const rightActions = [
    {
      name: "Sync Templates",
      desc: "Fetch latest layouts",
      icon: RefreshCw,
      action: "Sync Templates",
      color: "#a855f7",
      glowClass: "group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:border-purple-500/30"
    },
    {
      name: "Create Campaign",
      desc: "Design outreach streams",
      icon: Megaphone,
      action: "Create Campaign",
      color: "#f59e0b",
      glowClass: "group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-amber-500/30"
    },
    {
      name: "Send Message",
      desc: "Dispatch active broadcasts",
      icon: Send,
      action: "Send Message",
      color: "#ef4444",
      glowClass: "group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:border-rose-500/30"
    }
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      
      {}
      <div className="flex flex-col gap-3.5 w-full">
        {leftActions.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.name}
              whileHover={{ y: -2, scale: 1.025 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onActionClick(item.action)}
              className="group text-left relative w-full rounded-2xl bg-secondary/10 border border-border p-4 flex items-center gap-3.5 transition-all hover:bg-secondary/40 cursor-pointer"
            >
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: `${item.color}10`,
                  borderColor: `${item.color}30`
                }}
              >
                <Icon className="w-4 h-4" style={{ color: item.color }} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-foreground transition-colors">{item.name}</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{item.desc}</p>
              </div>
              
              {}
              <div className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 12px ${item.color}15, 0 0 10px ${item.color}10` }} />
            </motion.button>
          );
        })}
      </div>

      {}
      <div className="relative flex flex-col items-center justify-center w-full min-h-[180px] overflow-hidden select-none">
        
        {}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-36 h-36 rounded-full border border-dashed border-indigo-500/15"
        />

        {}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-28 h-28 rounded-full border border-border border-t-indigo-500/30 border-b-purple-500/20"
        />

        {}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-sm dark:shadow-xl cursor-pointer"
          style={{
            boxShadow: "0 0 35px rgba(99, 102, 241, 0.45), inset 0 0 15px rgba(255, 255, 255, 0.25)"
          }}
          whileHover={{ scale: 1.08 }}
        >
          {}
          <div className="absolute inset-1 rounded-full bg-background/40 backdrop-blur-[1px] flex items-center justify-center">
            <Brain className="w-8 h-8 text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] animate-pulse" />
          </div>
        </motion.div>

        {}
        <div className="absolute bottom-1 text-[9px] font-black uppercase text-indigo-400/70 tracking-[0.25em] animate-pulse">
          Nexus Core
        </div>

        {}
        {[...Array(4)].map((_, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0.6, 1.2, 0.6],
              y: [-15, -60],
              x: [(Math.random() - 0.5) * 35, (Math.random() - 0.5) * 50]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: idx * 0.85,
              ease: "easeOut"
            }}
            className="absolute w-1 h-1 rounded-full bg-indigo-400 blur-[0.5px]"
          />
        ))}
      </div>

      {}
      <div className="flex flex-col gap-3.5 w-full">
        {rightActions.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.name}
              whileHover={{ y: -2, scale: 1.025 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onActionClick(item.action)}
              className="group text-left relative w-full rounded-2xl bg-secondary/10 border border-border p-4 flex items-center gap-3.5 transition-all hover:bg-secondary/40 cursor-pointer"
            >
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: `${item.color}10`,
                  borderColor: `${item.color}30`
                }}
              >
                <Icon className="w-4 h-4" style={{ color: item.color }} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-foreground transition-colors">{item.name}</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{item.desc}</p>
              </div>
              
              {}
              <div className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 12px ${item.color}15, 0 0 10px ${item.color}10` }} />
            </motion.button>
          );
        })}
      </div>

    </div>
  );
}

