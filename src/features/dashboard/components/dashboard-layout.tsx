"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  MessageSquare, 
  LayoutDashboard, 
  Users, 
  Layers, 
  FileText, 
  Megaphone, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Menu, 
  X, 
  Sun,
  Moon,
  RefreshCw
} from "lucide-react";
import { removeToken } from "@/services/auth.service";
import { motion, AnimatePresence } from "framer-motion";
import { showPromiseToast } from "@/lib/toast-helper";
import { ThemeToggle } from "@/components/theme-toggle";
import { useProfile } from "@/features/settings/hooks/use-settings";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const { data: profile } = useProfile();
  const [userName, setUserName] = useState("Satish 9brainz2");
  const [userRole, setUserRole] = useState("Administrator");
  const [initials, setInitials] = useState("S9");

  useEffect(() => {
    setIsMounted(true);
    const savedState = localStorage.getItem("nexus_sidebar_state");
    
    const handleResize = () => {
      if (localStorage.getItem("nexus_sidebar_state") !== null) return;
      const width = window.innerWidth;
      if (width >= 1024 && width < 1280) {
        setIsSidebarCollapsed(true);
      } else if (width >= 1280) {
        setIsSidebarCollapsed(false);
      }
    };

    if (savedState) {
      setIsSidebarCollapsed(savedState === "true");
    } else {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (profile?.email) {
      const part = profile.email.split("@")[0];
      const name = part
        .split(/[\._\-]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setUserName(name);
      setUserRole("Administrator");
      const init = name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
      setInitials(init || "S9");
    } else if (typeof window !== "undefined") {
      const email = localStorage.getItem("user_email");
      if (email) {
        const part = email.split("@")[0];
        const name = part
          .split(/[\._\-]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setUserName(name);
        setUserRole("Administrator");
        const init = name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
        setInitials(init || "S9");
      }
    }
  }, [profile]);

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem("nexus_sidebar_state", String(newState));
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    const logoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        removeToken();
        resolve(true);
      }, 1000);
    });

    await showPromiseToast(logoutPromise, {
      loadingText: "Logging out...",
      successMessage: () => "Logged out successfully",
      errorMessage: () => "Logout failed",
    });

    router.push("/login");
  };

  const handleSyncStatus = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Contacts", href: "/contacts", icon: Users },
    { name: "Groups", href: "/groups", icon: Layers },
    { name: "Campaigns", href: "/campaigns", icon: Megaphone },
    { name: "Templates", href: "/templates", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex transition-colors duration-300">
      {/* Background radial glows for premium layout */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 dark:block hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#7C5CFF]/5 blur-[120px] mix-blend-screen" />
      </div>

      {/* Desktop Sidebar (Left Panel) */}
      <aside 
        className="hidden lg:flex flex-col border-r border-border/80 bg-[#07111F] shrink-0 z-30 relative group"
        style={{ 
          width: isMounted && isSidebarCollapsed ? 80 : 240, 
          height: "100vh",
          transition: "all 0.25s ease"
        }}
      >
        {/* Brand logo section */}
        <div 
          className={`h-16 flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-between px-6"} border-b border-border/50 shrink-0 overflow-hidden`}
          style={{ transition: "all 0.25s ease" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF]/10 border border-[#7C5CFF]/30 text-[#7C5CFF] shadow-inner shadow-[#7C5CFF]/10">
              <MessageSquare className="h-5 w-5" />
            </div>
            {!isSidebarCollapsed && (
              <span className="text-sm font-black uppercase tracking-widest text-white whitespace-nowrap">
                NEXUS CRM
              </span>
            )}
          </div>
        </div>

        {/* Sidebar Nav links */}
        <div 
          className="flex-grow flex-1 overflow-y-auto overflow-x-hidden p-3 hide-scrollbar"
          style={{ transition: "all 0.25s ease" }}
        >
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
              return (
                <a
                  key={item.name}
                  href={item.href}
                  title={isSidebarCollapsed ? item.name : undefined}
                  className={`flex items-center rounded-xl transition-all duration-300 relative border ${
                    isActive
                      ? "border-[#7C5CFF]/30 bg-[#7C5CFF]/10 text-[#A894FF] font-bold"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  } ${isSidebarCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"}`}
                  style={{ transition: "all 0.25s ease" }}
                >
                  {/* Active highlight bar on the left */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#7C5CFF] rounded-r-full shadow-[0_0_12px_rgba(124,92,255,0.8)]" />
                  )}
                  
                  <Icon className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                    isActive ? "text-[#7C5CFF]" : "text-muted-foreground"
                  }`} />
                  
                  {!isSidebarCollapsed && (
                     <span className="text-[13px] tracking-wide whitespace-nowrap">{item.name}</span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Sidebar widgets at bottom */}
        <div 
          className="mt-auto p-3 space-y-3 border-t border-border/30 shrink-0"
          style={{ transition: "all 0.25s ease" }}
        >
          {/* System Status Widget */}
          <div 
            className={`transition-all duration-300 ${
              isSidebarCollapsed ? "opacity-0 h-0 overflow-hidden pointer-events-none mt-0 p-0 border-none" : "opacity-100 h-auto p-4 rounded-[18px] border border-border/60 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(10,15,30,0.95))] shadow-inner"
            }`}
            style={{ transition: "all 0.25s ease" }}
          >
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">System Status</span>
            <div className="flex items-center gap-2 text-xs font-bold text-[#10D876]">
              <span className="h-2 w-2 rounded-full bg-[#10D876] animate-pulse" />
              <span>All systems operational</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground/80 mt-3 pt-2.5 border-t border-border/20">
              <span>Last Sync</span>
              <div className="flex items-center gap-1.5">
                <span>2 mins ago</span>
                <button 
                  onClick={handleSyncStatus} 
                  className={`hover:text-foreground transition-all cursor-pointer ${isSyncing ? "animate-spin text-[#7C5CFF]" : ""}`}
                >
                  <RefreshCw className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* User Profile Footer Card */}
          <div 
            onClick={handleLogout}
            className={`rounded-[18px] transition-all duration-300 cursor-pointer ${
              isSidebarCollapsed 
                ? "p-1.5 flex justify-center hover:opacity-80 border-transparent bg-transparent" 
                : "p-[16px] border border-border/60 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(10,15,30,0.95))] flex items-center justify-between shadow-sm relative group hover:border-border"
            }`}
            style={{ transition: "all 0.25s ease" }}
            title={isSidebarCollapsed ? `${userName} (Logout)` : undefined}
          >
            <div className="flex items-center gap-[12px] min-w-0">
              <div className="h-[44px] w-[44px] shrink-0 rounded-full bg-[#7C5CFF] text-white flex items-center justify-center font-bold text-sm shadow-inner">
                {initials}
              </div>
              <div 
                className={`min-w-0 transition-all duration-300 ${
                  isSidebarCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                }`}
              >
                <h4 className="text-[15px] font-semibold text-white truncate pr-1 leading-none whitespace-nowrap">{userName}</h4>
                <p className="text-[12px] font-medium text-muted-foreground tracking-wider mt-[4px] leading-none whitespace-nowrap">{userRole}</p>
              </div>
            </div>
            {!isSidebarCollapsed && (
              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
            )}
          </div>
        </div>

        {/* Sidebar Toggle Floating Button on right border */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-[26px] z-40 h-6 w-6 rounded-full border border-border/80 bg-[#07111F] text-white flex items-center justify-center shadow-lg hover:border-[#7C5CFF]/60 hover:bg-[#101a30] cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{
            transform: "translateX(50%)",
            opacity: isSidebarCollapsed ? 1 : undefined,
            pointerEvents: "auto",
          }}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground hover:text-white" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground hover:text-white" />
          )}
        </button>
      </aside>

      {/* Mobile Sidebar overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 border-r border-border bg-card z-50 flex flex-col lg:hidden transition-colors"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-[#7C5CFF] to-[#3B82F6] text-white">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-extrabold uppercase tracking-widest text-white">
                    NEXUS CRM
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-border transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? "bg-[#7C5CFF]/10 text-white border border-[#7C5CFF]/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                      <span>{item.name}</span>
                    </a>
                  );
                })}
              </nav>

              {/* Mobile Profile Footer */}
              <div className="p-4 border-t border-white/5 space-y-3">
                <div className="p-3 rounded-xl border border-border bg-secondary/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8.5 w-8.5 rounded-lg bg-[#7C5CFF]/20 border border-[#7C5CFF]/30 flex items-center justify-center font-bold text-xs text-[#7C5CFF]">
                      {initials}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-foreground">{userName}</h4>
                      <p className="text-[9px] text-muted-foreground">{userRole}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10 relative">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card/40 backdrop-blur-xl flex items-center justify-between px-6 z-20 shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary border border-border cursor-pointer transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Search bar inside header */}
          <div className="relative w-96 xl:w-[480px] max-w-lg">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="h-4 w-4 text-muted-foreground/80" />
            </span>
            <input
              type="text"
              placeholder="Search templates, logs, contacts..."
              className="w-full h-9 pl-9 pr-20 rounded-xl border border-border hover:border-border/80 focus:border-[#7C5CFF]/60 bg-secondary/30 focus:bg-secondary/50 text-[12px] font-medium text-foreground placeholder-muted-foreground focus:outline-none transition-all"
            />
            {/* Shortcut Badge Ctrl + K */}
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center px-2 py-0.5 rounded border border-border/80 bg-secondary font-mono text-[9px] text-muted-foreground/80 font-semibold select-none">
              Ctrl + K
            </div>
          </div>

          {/* Notifications and profile avatar inside header */}
          <div className="flex items-center gap-4">
            {/* Notifications Bell */}
            <div className="relative">
              <button className="relative p-2 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#7C5CFF] text-[9px] font-black text-white border-2 border-[#0b0e22] shadow-[0_0_10px_rgba(124,92,255,0.4)]">
                  4
                </span>
              </button>
            </div>

            <ThemeToggle />

            {/* User Profile avatar info inside header */}
            <div className="flex items-center gap-3 pl-2 select-none border-l border-border/40">
              <div className="h-9 w-9 rounded-full bg-[#7C5CFF] text-white font-extrabold flex items-center justify-center text-xs shadow-inner">
                {initials}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[11px] font-black text-white leading-tight flex items-center gap-1">
                  {userName}
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </span>
                <span className="text-[9px] font-bold text-muted-foreground/80 uppercase tracking-wider mt-0.5">{userRole}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Main Content Body */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
