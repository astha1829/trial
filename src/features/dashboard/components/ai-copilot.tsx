"use client";

import React, { useState, useRef, useEffect } from "react";
import { FolderOpen, Layers, RefreshCw, Send } from "lucide-react";
import { toast } from "sonner";

interface Group {
  id: string;
  name: string;
  count: number;
  time: string;
}

interface Message {
  sender: "system" | "user";
  text: string;
  timestamp: string;
}

export function AiCopilot() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "system",
      text: "Workspace Groups indexer loaded. Checked 5 active audience tables. Ready to partition contacts.",
      timestamp: "Just now"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockGroups: Group[] = [
    { id: "g-1", name: "VIP Customers", count: 1240, time: "10m ago" },
    { id: "g-2", name: "Newsletter Subscribers", count: 15420, time: "1h ago" },
    { id: "g-3", name: "Active Beta Users", count: 890, time: "3h ago" },
    { id: "g-4", name: "Inactive Leads", count: 342, time: "5h ago" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "Index updated. Contact record counts have been compiled successfully.";
      const lower = text.toLowerCase();
      if (lower.includes("vip") || lower.includes("segment")) {
        replyText = "Segmenting VIP list. Group VIP Customers updated with 12 new entries. Saturation index at 94%.";
      } else if (lower.includes("sync") || lower.includes("refresh")) {
        replyText = "Audience tags synchronized with remote contacts schema. 0 errors resolved.";
      }

      setMessages(prev => [...prev, {
        sender: "system",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1200);
  };

  const executeQuickAction = (actionName: string, promptText: string) => {
    toast.info(`Executing group action: ${actionName}`);
    handleSendMessage(promptText);
  };

  return (
    <div className="w-full h-[360px] rounded-[24px] border border-border bg-card dark:bg-card dark:bg-card/60 dark:backdrop-blur-xl p-5 shadow-sm dark:shadow-2xl flex flex-col justify-between transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border shrink-0 transition-colors">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground tracking-wide transition-colors">Recently Created Groups</h3>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black mt-0.5 transition-colors">Audience Segments</p>
          </div>
        </div>
        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* Grid containing list on left and console terminal logs on right */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 my-3 overflow-hidden text-[11px]">
        {/* Left Side: Groups List */}
        <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 hide-scrollbar border-r border-border pr-3 transition-colors">
          {mockGroups.map((group) => (
            <div 
              key={group.id} 
              className="flex items-center justify-between gap-2 p-2 rounded-xl bg-secondary/50 border border-border hover:bg-secondary/80 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <FolderOpen className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[10px] font-bold text-foreground truncate transition-colors">{group.name}</h4>
                  <p className="text-[8px] text-muted-foreground truncate mt-0.5 transition-colors">{group.count.toLocaleString()} contacts</p>
                </div>
              </div>
              <span className="text-[8px] font-bold text-muted-foreground shrink-0 uppercase tracking-wide transition-colors">{group.time}</span>
            </div>
          ))}
        </div>

        {/* Right Side: Command Console logs */}
        <div className="flex flex-col justify-between overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 hide-scrollbar">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[90%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
              >
                <div
                  className={`px-3 py-1.5 rounded-xl leading-normal ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary border border-border text-foreground rounded-bl-none font-medium"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[8px] text-muted-foreground mt-1 uppercase tracking-wider transition-colors">{msg.timestamp}</span>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] mr-auto transition-colors">
                <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
                <span>Processing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Actions & Form input */}
      <div className="space-y-3 shrink-0">
        <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
          <button
            onClick={() => executeQuickAction("Auto Segment VIPs", "Partition contacts into high value VIP list")}
            className="text-[9px] font-bold text-emerald-300 hover:text-white px-2 py-1 rounded-lg border border-emerald-500/15 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors whitespace-nowrap cursor-pointer"
          >
            Auto VIP
          </button>
          <button
            onClick={() => executeQuickAction("Index Sync", "Refresh groups counters")}
            className="text-[9px] font-bold text-foreground hover:text-primary px-2 py-1 rounded-lg border border-border bg-secondary hover:bg-secondary/80 transition-colors whitespace-nowrap cursor-pointer"
          >
            Sync Counters
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex items-center gap-1.5"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Command groups indexing..."
            className="flex-1 h-8.5 px-3 rounded-lg bg-secondary/50 border border-border text-[11px] text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-all"
          />
          <button
            type="submit"
            className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all cursor-pointer shadow-sm dark:shadow-lg shadow-primary/10"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

