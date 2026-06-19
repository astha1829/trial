"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Clock, 
  TrendingUp, 
  CheckCircle2 
} from "lucide-react";
import { AUTH_BRAND, CRM_METRICS } from "../constants/auth-constants";

type Props = {
  children: ReactNode;
};

export function AuthLayout({ children }: Props) {
  return (
    <main className="h-screen w-full grid grid-cols-1 lg:grid-cols-[58%_42%] overflow-hidden bg-background text-foreground font-sans transition-colors duration-300">
      <section className="relative hidden lg:flex flex-col justify-between pt-10 pb-6 px-10 xl:pt-12 xl:pb-8 xl:px-14 overflow-hidden bg-gradient-to-br from-background via-secondary to-background bg-grid-pattern transition-colors">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-[900px] h-[900px] rounded-full bg-blue-600/10 blur-[150px] animate-glow" />
          <div className="absolute -bottom-1/4 -right-1/4 w-[850px] h-[850px] rounded-full bg-indigo-500/10 blur-[140px] animate-glow animation-delay-4000" />
        </div>

        <div className="relative z-10 flex items-center gap-2.5 animate-fade-in">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <MessageSquare className="h-6 w-6" />
          </div>
          <span className="text-xl font-extrabold uppercase tracking-widest bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {AUTH_BRAND.name}
          </span>
        </div>

        <div className="relative z-10 my-auto flex flex-col gap-6 xl:gap-8 max-w-[850px] w-full mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
            className="space-y-4 xl:space-y-5"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-500/5 text-blue-400 text-xs font-semibold w-fit"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Smart Customer Relationship Platform</span>
            </motion.div>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl xl:text-[58px] font-black tracking-tighter leading-[1.05] w-full bg-gradient-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent transition-colors"
            >
              Engage, Automate &<br />Scale Customer Relationships
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[17px] xl:text-[18px] leading-[1.5] text-muted-foreground max-w-[620px] transition-colors"
            >
              {AUTH_BRAND.description}
            </motion.p>
          </motion.div>

          <div className="relative w-[85%] mx-auto mt-4 select-none">
            {/* New Leads card */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="glass-panel absolute -top-5 -right-5 z-20 p-4 rounded-xl border border-border shadow-[0_8px_32px_0_rgba(99,102,241,0.25)] flex items-center gap-3.5 backdrop-blur-md transition-all duration-300 cursor-default"
            >
              <div className="h-9 w-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider transition-colors">New Leads</div>
                <div className="text-sm font-black text-foreground transition-colors">+245 this week</div>
              </div>
            </motion.div>
 
            {/* Bottom Left Floating Card */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              whileHover={{ scale: 1.05 }}
              className="glass-panel absolute -bottom-5 -left-5 z-20 p-4 rounded-xl border border-border shadow-[0_8px_32px_0_rgba(59,130,246,0.25)] flex items-center gap-3.5 backdrop-blur-md transition-all duration-300 cursor-default"
            >
              <div className="h-9 w-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider transition-colors">Response Rate</div>
                <div className="text-sm font-black text-foreground transition-colors">98% SLA Met</div>
              </div>
            </motion.div>
 
            {/* Bottom Right Floating Card */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              whileHover={{ scale: 1.05 }}
              className="glass-panel absolute -bottom-5 -right-5 z-20 p-4 rounded-xl border border-border shadow-[0_8px_32px_0_rgba(168,85,247,0.25)] flex items-center gap-3.5 backdrop-blur-md transition-all duration-300 cursor-default"
            >
              <div className="h-9 w-9 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 shadow-inner">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider transition-colors">AI Copilot</div>
                <div className="text-sm font-black text-foreground transition-colors">Agent Active</div>
              </div>
            </motion.div>

            {/* Main Mock Inbox Card */}
            <div className="glass-panel rounded-2xl p-5 border border-border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_40px_-5px_rgba(59,130,246,0.15)] relative overflow-hidden backdrop-blur-xl bg-card dark:bg-card/60 transition-colors">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse-slow" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors">Live CRM Inbox</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-secondary text-muted-foreground transition-colors">
                  14 channels connected
                </span>
              </div>

              {/* Chat list items mockup */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-secondary/50 border border-border hover:bg-secondary/80 transition-all hover:scale-[1.01] duration-200">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-bold text-sm text-blue-400">
                        SL
                      </div>
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground transition-colors">Sales Lead (Inquiry)</h4>
                      <p className="text-xs text-muted-foreground truncate max-w-[280px] transition-colors">"Can we schedule a demo for WhatsApp API?"</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Active
                    </span>
                    <p className="text-[9px] text-muted-foreground mt-1 transition-colors">2m ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-secondary/50 border border-border hover:bg-secondary/80 transition-all hover:scale-[1.01] duration-200">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-sm text-purple-400">
                        AI
                      </div>
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-blue-500 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground transition-colors">Nexus Copilot (Agent)</h4>
                      <p className="text-xs text-muted-foreground truncate max-w-[280px] transition-colors">Resolved billing issue automatically</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Self-Resolved
                    </span>
                    <p className="text-[9px] text-muted-foreground mt-1 transition-colors">12m ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-secondary/50 border border-border hover:bg-secondary/80 transition-all hover:scale-[1.01] duration-200">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-bold text-sm text-amber-400">
                        MR
                      </div>
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-amber-500 animate-pulse-slow transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground transition-colors">Sarah Jenkins (Escalated)</h4>
                      <p className="text-xs text-muted-foreground truncate max-w-[280px] transition-colors">"Need help with active campaign settings."</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Pending
                    </span>
                    <p className="text-[9px] text-muted-foreground mt-1 transition-colors">45m ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="relative z-10 w-full border-t border-border pt-5 grid grid-cols-4 gap-8 animate-fade-in mx-auto max-w-[850px] transition-colors">
          {CRM_METRICS.map((metric, i) => (
            <div key={i} className="space-y-0.5 transition-transform duration-300 hover:-translate-y-1 cursor-default group">
              <span className="text-3xl xl:text-[36px] font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-foreground bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300">
                {metric.value}
              </span>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors duration-300 mt-0.5">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Right Panel: Auth Glass Form Shell */}
      <section className="flex flex-col justify-center items-center p-6 lg:p-12 bg-background relative h-full w-full min-h-0 overflow-y-auto transition-colors">
        {/* Glow circles for mobile backgrounds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-600/5 blur-[80px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ 
            scale: 1.01,
            boxShadow: "0 35px 75px rgba(15,23,42,0.22)" 
          }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut"
          }}
          className="w-full max-w-[520px] rounded-[32px] shadow-[0_25px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="glass-card rounded-[32px] p-10 relative border border-border backdrop-blur-sm w-full transition-colors">
            {children}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
