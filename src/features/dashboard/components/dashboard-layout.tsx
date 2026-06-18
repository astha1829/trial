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
  Menu, 
  X, 
  Building,
  HelpCircle,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { removeToken } from "@/services/auth.service";
import { motion, AnimatePresence } from "framer-motion";
import { showPromiseToast } from "@/lib/toast-helper";
import { ThemeToggle } from "@/components/theme-toggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedState = localStorage.getItem("nexus_sidebar_state");
    if (savedState) {
      setIsSidebarCollapsed(savedState === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem("nexus_sidebar_state", String(newState));
  };

  // Close mobile sidebar on pathname change
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
      loadingText: "Logging out of workspace...",
      successMessage: () => "Logged out successfully",
      errorMessage: () => "Logout failed",
    });

    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Contacts", href: "/contacts", icon: Users, badge: "8.4k" },
    { name: "Groups", href: "/groups", icon: Layers, badge: "12" },
    { name: "Campaigns", href: "/campaigns", icon: Megaphone, badge: "Active" },
    { name: "Templates", href: "/templates", icon: FileText },
    { name: "Messages", href: "#", icon: MessageSquare },
    { name: "Analytics", href: "#", icon: LayoutDashboard },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex transition-colors duration-300">
      {/* Premium Mesh Background (Hidden in light mode for cleaner enterprise look, or keep transparent) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 dark:block hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-600/5 blur-[100px] mix-blend-screen" />
      </div>

      {/* Desktop Sidebar (Left Panel) */}
      <motion.aside 
        initial={false}
        animate={{ width: isMounted && isSidebarCollapsed ? 80 : 260 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="hidden lg:flex flex-col border-r border-border bg-card/60 backdrop-blur-xl shrink-0 z-30 relative group transition-colors duration-300"
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3.5 top-24 z-50 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground hover:text-foreground shadow-md hover:scale-110 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
        >
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* Brand/Logo Section */}
        <div className="h-16 flex items-center px-5 border-b border-border shrink-0 overflow-hidden transition-colors duration-300">
          <div className="flex items-center gap-3 w-full">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
              <MessageSquare className="h-5 w-5" />
            </div>
            <AnimatePresence>
              {!isSidebarCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-black uppercase tracking-widest text-foreground whitespace-nowrap"
                >
                  NEXUS CRM
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Scrollable Area (Nav + Widgets) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-between hide-scrollbar">
          {/* Navigation Links */}
          <nav className="px-3 py-6 space-y-1.5 shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  title={isSidebarCollapsed ? item.name : undefined}
                  className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-300 relative ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]"
                      : "text-muted-foreground border border-transparent hover:text-foreground hover:bg-secondary/50 hover:border-border"
                  } ${isSidebarCollapsed ? "justify-center" : "justify-between"}`}
                >
                  {isActive && (
                    <motion.div layoutId="activeNavIndicator" className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  )}
                  
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                      isActive ? "text-primary scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "text-muted-foreground group-hover:text-foreground"
                    }`} />
                    <AnimatePresence>
                      {!isSidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="text-sm font-bold whitespace-nowrap overflow-hidden"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <AnimatePresence>
                    {!isSidebarCollapsed && item.badge && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap ${
                          item.badge === "Active"
                            ? "bg-success/10 text-success border border-success/20"
                            : "bg-secondary text-muted-foreground border border-border"
                        }`}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
              );
            })}
          </nav>

          {/* Upgrade Plan Card at Bottom */}
          {!isSidebarCollapsed && (
            <div className="mx-4 my-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)] relative overflow-hidden group shrink-0">
              <div className="absolute top-[-20%] right-[-20%] w-24 h-24 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[9px] font-black uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded tracking-widest">Enterprise AI</span>
                <h4 className="text-xs font-bold text-white mt-2">Upgrade Workspace</h4>
                <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed transition-colors">Unlock advanced routing algorithms and unlimited contact pools.</p>
                <button className="w-full mt-3 h-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-[10px] font-bold text-white transition-all shadow-md shadow-indigo-600/10 cursor-pointer">
                  Upgrade Plan
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Footer */}
        <div className={`p-4 border-t border-border bg-background/40 shrink-0 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center overflow-hidden ${isSidebarCollapsed ? 'justify-center p-0 border-transparent bg-transparent' : 'justify-between p-2.5 rounded-2xl border border-border bg-secondary/50 hover:border-border transition-colors'}`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center font-black text-xs text-indigo-300 shadow-inner">
                JD
              </div>
              <AnimatePresence>
                {!isSidebarCollapsed && (
                  <motion.div 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="min-w-0"
                  >
                    <h4 className="text-xs font-black text-foreground truncate pr-2">John Doe</h4>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest truncate mt-0.5 pr-2">Admin</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <AnimatePresence>
              {!isSidebarCollapsed && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleLogout}
                  className="p-2 shrink-0 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all border border-transparent hover:border-destructive/20 cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Drawer Navigation (Side-Panel overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 border-r border-border bg-card z-50 flex flex-col lg:hidden transition-colors"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 text-white">
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
                  const isActive = pathname === item.href;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4.5 w-4.5" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          item.badge === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-secondary text-muted-foreground border border-border transition-colors"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </a>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/5">
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-secondary/40 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-300">
                      JD
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-foreground truncate transition-colors">John Doe</h4>
                      <p className="text-[10px] text-muted-foreground truncate transition-colors">Workspace Owner</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4.5 w-4.5" />
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
          {/* Mobile hamburger menu and breadcrumbs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary border border-border cursor-pointer transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Workspace Switcher */}
            <div className="relative">
              <button 
                onClick={() => setWorkspaceOpen(!workspaceOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border hover:border-border bg-secondary/50 hover:bg-secondary transition-all text-xs font-bold text-foreground cursor-pointer"
              >
                <Building className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline">Acme Corporation</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
              
              <AnimatePresence>
                {workspaceOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setWorkspaceOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-2xl z-50"
                    >
                      <div className="px-2.5 py-1.5 text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest">Switch Workspace</div>
                      <button className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-bold text-foreground bg-primary/10 border border-primary/20 text-left">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Acme Corporation
                      </button>
                      <button onClick={() => setWorkspaceOpen(false)} className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary text-left transition-colors">
                        <span className="h-2 w-2 rounded-full bg-muted" />
                        Demo Sandbox
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search, Notifications & Profile actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar - hidden on mobile */}
            <div className="relative hidden md:block w-64 xl:w-80">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search templates, logs, contacts..."
                className="w-full h-9 pl-9 pr-4 rounded-xl border border-border hover:border-border focus:border-primary bg-secondary/50 focus:bg-secondary text-xs font-medium text-foreground placeholder-muted-foreground focus:outline-none transition-all"
              />
            </div>

            {/* Notification Center */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl border border-border hover:border-border bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-card p-4 shadow-2xl z-50 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-border pb-2">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider">Alert Center</span>
                        <span className="text-[10px] font-bold text-primary hover:underline cursor-pointer">Mark all read</span>
                      </div>
                      
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                          <div className="flex gap-2.5">
                            <span className="h-2 w-2 mt-1.5 rounded-full bg-blue-500 shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-foreground transition-colors">Campaign "Summer Wave" Completed</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5 transition-colors">Delivery rate: 98.4% • 5m ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                          <div className="flex gap-2.5">
                            <span className="h-2 w-2 mt-1.5 rounded-full bg-amber-500 shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-foreground transition-colors">System Warning: API Rate Limit</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5 transition-colors">Approaching 80% threshold • 20m ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle />

            {/* Quick Profile/Help Actions */}
            <button className="hidden sm:flex p-2 rounded-xl border border-border hover:border-border bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all cursor-pointer">
              <HelpCircle className="h-4.5 w-4.5" />
            </button>

            {/* User Avatar Badge */}
            <div className="flex items-center gap-2 border-l border-white/5 pl-4 select-none">
              <div className="h-8.5 w-8.5 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-extrabold flex items-center justify-center text-xs shadow-inner">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
