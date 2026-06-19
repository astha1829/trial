"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Eye, EyeOff, Mail, Phone, Hash, Key, Check, AlertTriangle, 
  Copy, ShieldCheck, Loader2, Server, Globe, Building2,
  Clock, Activity, Lock
} from "lucide-react";
import { motion } from "framer-motion";
import { settingsSchema, SettingsSchemaType } from "../schemas/settings.schema";
import { useProfile, useUpdateProfile } from "../hooks/use-settings";
import { showPromiseToast } from "@/lib/toast-helper";

export function SettingsForm() {
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { data: profile, isLoading } = useProfile();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const form = useForm<SettingsSchemaType>({
    resolver: zodResolver(settingsSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      whatsapp_app_id: "",
      whatsapp_phone_id: "",
      whatsapp_token: "",
    },
  });

  const { register, handleSubmit, formState: { errors, isDirty }, reset, watch } = form;

  const currentEmail = watch("email");
  const currentAppId = watch("whatsapp_app_id");
  const currentPhoneId = watch("whatsapp_phone_id");
  const currentToken = watch("whatsapp_token");

  useEffect(() => {
    if (profile) {
      reset({
        email: profile.email || "",
        whatsapp_app_id: profile.whatsapp_app_id || "",
        whatsapp_phone_id: profile.whatsapp_phone_id || "",
        whatsapp_token: profile.whatsapp_token || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: SettingsSchemaType) => {
    const promise = updateProfile(data);
    await showPromiseToast(promise, {
      loadingText: "Saving profile configuration...",
      successMessage: () => "Profile configuration saved successfully",
      errorMessage: () => "Failed to save profile configuration",
    });
    reset(data);
  };

  const handleCopyToken = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentToken) return;
    navigator.clipboard.writeText(currentToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    Boolean(currentEmail),
    Boolean(currentAppId),
    Boolean(currentPhoneId),
    Boolean(currentToken)
  ];
  const completedSteps = steps.filter(Boolean).length;
  const progressPercent = Math.round((completedSteps / steps.length) * 100);

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[calc(100vh-8rem)] items-center justify-center bg-slate-50 dark:bg-[#050816] rounded-3xl border border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  const ModularInputCard = ({
    title,
    description,
    id,
    type = "text",
    icon: Icon,
    isSecure = false,
    placeholder
  }: {
    title: string;
    description: string;
    id: keyof SettingsSchemaType;
    type?: string;
    icon: any;
    isSecure?: boolean;
    placeholder: string;
  }) => {
    const error = errors[id];
    const value = watch(id);
    const hasValue = Boolean(value);
    
    return (
      <div className="relative group bg-white dark:bg-[rgba(255,255,255,0.02)] hover:bg-slate-50 dark:hover:bg-[rgba(255,255,255,0.04)] border border-slate-200 dark:border-[rgba(255,255,255,0.06)] hover:border-slate-300 dark:hover:border-[rgba(255,255,255,0.1)] rounded-[20px] p-4 sm:p-5 transition-all duration-500 overflow-hidden shadow-sm dark:shadow-none">
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1 flex gap-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-[rgba(255,255,255,0.04)] border border-slate-200 dark:border-[rgba(255,255,255,0.08)] flex items-center justify-center text-slate-500 dark:text-white/60 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:border-indigo-300 dark:group-hover:border-indigo-500/30 transition-all duration-500 shrink-0 shadow-inner">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-slate-900 dark:text-white tracking-wide flex items-center gap-2">
                {title}
                {hasValue && !error && (
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
              </h3>
              <p className="text-[13px] text-slate-500 dark:text-white/40 mt-1 leading-relaxed">{description}</p>
            </div>
          </div>

          <div className="flex-1 relative w-full md:max-w-md">
            <input
              {...register(id)}
              id={id}
              type={type}
              placeholder={placeholder}
              className={`w-full h-[44px] px-4 rounded-xl bg-white dark:bg-[rgba(0,0,0,0.2)] border border-slate-200 dark:border-[rgba(255,255,255,0.08)] text-slate-900 dark:text-white text-[14px] focus:outline-none focus:border-indigo-500/50 focus:bg-white dark:focus:bg-[rgba(255,255,255,0.05)] focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 hover:border-slate-300 dark:hover:border-white/20 shadow-inner ${isSecure ? 'pr-24 font-mono text-[13px] tracking-wider' : ''}`}
            />
            {isSecure && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white transition-colors"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={handleCopyToken}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}
            {error && (
              <div className="absolute -bottom-6 left-1 text-rose-600 dark:text-rose-400 text-[11px] font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  let derivedName = (profile as any)?.name;
  if (!derivedName && profile?.email) {
    const part = profile.email.split("@")[0];
    derivedName = part
      .split(/[\._\-]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const displayName = derivedName || "Not Configured";
  const companyName = (profile as any)?.workspace_name || (profile as any)?.company_name || "Not Configured";
  const initials = displayName !== "Not Configured"
    ? displayName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() 
    : "N/A";
  const updatedTime = (profile as any)?.updated_at 
    ? new Date((profile as any).updated_at).toLocaleDateString() 
    : (profile ? "No Date Available" : "Not Configured");

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-[#050816] flex flex-col items-center pt-2 pb-6 px-4 sm:px-8">
      <div className="w-full max-w-[1400px] flex flex-col gap-4">

        {/* TOP HERO SECTION */}
        <div className="relative w-full rounded-[24px] border border-slate-200 dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[rgba(255,255,255,0.02)] backdrop-blur-3xl overflow-hidden shadow-sm dark:shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-violet-600/10 opacity-50" />
          <div className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-[100px] -left-[100px] w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-[2px] shadow-[0_0_40px_rgba(99,102,241,0.3)]">
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#050816] flex items-center justify-center border-4 border-transparent overflow-hidden">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-400">{initials}</span>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white dark:border-[#050816] shadow-[0_0_20px_rgba(16,185,129,0.3)] dark:shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse" />
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{displayName}</h1>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest shadow-inner">
                    {profile ? "Admin" : "Not Configured"}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[13px] text-slate-500 dark:text-white/50 font-medium">
                  <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {companyName}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Updated {updatedTime}</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-6 bg-slate-50 dark:bg-[rgba(0,0,0,0.2)] p-5 rounded-2xl border border-slate-200 dark:border-[rgba(255,255,255,0.05)] shadow-inner">
              <div className="flex flex-col gap-2 min-w-[200px] w-full sm:w-auto">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-white/60 uppercase tracking-wider">Configuration</span>
                  <span className="text-[14px] font-black text-indigo-600 dark:text-indigo-400">{progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-[rgba(255,255,255,0.05)] overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 relative"
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-200 dark:bg-white/10" />
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-inner ${progressPercent === 100 ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400'}`}>
                  {progressPercent === 100 ? <Server className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-white/60 uppercase tracking-wider">Status</span>
                  <span className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {progressPercent === 100 ? 'Fully Connected' : 'Action Required'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 w-full">
          
          {/* SETTINGS AREA (70%) */}
          <div className="lg:w-[70%] flex flex-col gap-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-[rgba(255,255,255,0.02)] border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-[24px] p-5 sm:p-8 backdrop-blur-xl shadow-sm dark:shadow-2xl flex flex-col relative overflow-hidden">
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">Account Integrations</h2>
                <p className="text-[14px] text-slate-500 dark:text-white/40 mt-1">Configure your primary communication and Meta routing parameters.</p>
              </div>

              <div className="flex flex-col gap-3">
                <ModularInputCard 
                  title="Email Configuration" 
                  description="Primary contact email for billing and major platform updates." 
                  id="email" 
                  type="email" 
                  placeholder="admin@acmecorp.com" 
                  icon={Mail} 
                />
                <ModularInputCard 
                  title="Business Configuration" 
                  description="Your unique WhatsApp Business Account (WABA) identifier." 
                  id="whatsapp_app_id" 
                  placeholder="109876543210987" 
                  icon={Hash} 
                />
                <ModularInputCard 
                  title="Phone Configuration" 
                  description="The dedicated Phone Number ID for outbound messaging." 
                  id="whatsapp_phone_id" 
                  placeholder="109876543210987" 
                  icon={Phone} 
                />
                
                {/* Access Token Security - Highlight Card */}
                <div className="relative group bg-gradient-to-b from-[rgba(99,102,241,0.08)] to-white dark:to-[rgba(255,255,255,0.02)] border border-indigo-500/20 hover:border-indigo-500/40 rounded-[20px] p-5 sm:p-6 transition-all duration-500 overflow-hidden mt-1 shadow-[0_4px_12px_rgba(99,102,241,0.05)] dark:shadow-[0_0_30px_rgba(99,102,241,0.05)] hover:shadow-[0_8px_24px_rgba(99,102,241,0.1)] dark:hover:shadow-[0_0_50px_rgba(99,102,241,0.1)]">
                  <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest shadow-inner">
                      <ShieldCheck className="w-3.5 h-3.5" /> High Security
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1 flex gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner shrink-0">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div className="pt-1">
                        <h3 className="text-[16px] font-bold text-slate-900 dark:text-white tracking-wide flex items-center gap-2">
                          Access Token Security
                        </h3>
                        <p className="text-[13px] text-slate-500 dark:text-white/50 mt-1.5 leading-relaxed max-w-sm">
                          Permanent or system user token required for authenticating with the Meta Cloud API. Keep this extremely secure.
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 relative w-full md:max-w-md mt-4 md:mt-0">
                      <input
                        {...register("whatsapp_token")}
                        id="whatsapp_token"
                        type={showToken ? "text" : "password"}
                        placeholder="EAAI..."
                        className="w-full h-[48px] px-4 rounded-xl bg-white dark:bg-[rgba(0,0,0,0.4)] border border-indigo-200 dark:border-indigo-500/30 text-slate-900 dark:text-white font-mono text-[13px] tracking-wider focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-[rgba(0,0,0,0.6)] focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 pr-24 shadow-inner"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowToken(!showToken)}
                          className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
                        >
                          {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={handleCopyToken}
                          className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
                        >
                          {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.whatsapp_token && (
                        <div className="absolute -bottom-6 left-1 text-rose-600 dark:text-rose-400 text-[11px] font-medium flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> {errors.whatsapp_token.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-[rgba(255,255,255,0.06)]">
                <button
                  type="submit"
                  disabled={isPending || !isDirty}
                  className="w-full h-[52px] rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 hover:from-indigo-400 hover:via-purple-400 hover:to-violet-400 text-white font-bold text-[16px] shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12" />
                  {isPending ? (
                    <><Loader2 className="w-5 h-5 animate-spin relative z-10" /> <span className="relative z-10">Deploying Changes...</span></>
                  ) : (
                    <span className="relative z-10">Save Configuration</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT SIDEBAR (30%) */}
          <div className="lg:w-[30%] flex flex-col gap-4">
            
            {/* Configuration Status */}
            <div className="bg-white dark:bg-[rgba(255,255,255,0.02)] border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-[24px] p-6 backdrop-blur-xl shadow-sm dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <h3 className="text-[12px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Globe className="w-4 h-4" /> System Health
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-inner transition-colors duration-300 ${currentEmail ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-[rgba(255,255,255,0.05)] border-slate-200 dark:border-[rgba(255,255,255,0.1)] text-slate-400 dark:text-white/30'}`}>
                      {currentEmail ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    </div>
                    <span className={`text-[14px] font-medium transition-colors duration-300 ${currentEmail ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-white/40'}`}>Email Binding</span>
                  </div>
                </div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-inner transition-colors duration-300 ${currentAppId ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-[rgba(255,255,255,0.05)] border-slate-200 dark:border-[rgba(255,255,255,0.1)] text-slate-400 dark:text-white/30'}`}>
                      {currentAppId ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    </div>
                    <span className={`text-[14px] font-medium transition-colors duration-300 ${currentAppId ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-white/40'}`}>Business Routing</span>
                  </div>
                </div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-inner transition-colors duration-300 ${currentPhoneId ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-[rgba(255,255,255,0.05)] border-slate-200 dark:border-[rgba(255,255,255,0.1)] text-slate-400 dark:text-white/30'}`}>
                      {currentPhoneId ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    </div>
                    <span className={`text-[14px] font-medium transition-colors duration-300 ${currentPhoneId ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-white/40'}`}>Phone Identity</span>
                  </div>
                </div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-inner transition-colors duration-300 ${currentToken ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-[rgba(255,255,255,0.05)] border-slate-200 dark:border-[rgba(255,255,255,0.1)] text-slate-400 dark:text-white/30'}`}>
                      {currentToken ? <Lock className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    </div>
                    <span className={`text-[14px] font-medium transition-colors duration-300 ${currentToken ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-white/40'}`}>Token Validation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Workspace Info */}
            <div className="bg-white dark:bg-[rgba(255,255,255,0.02)] border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-[24px] p-6 backdrop-blur-xl shadow-sm dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <h3 className="text-[12px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Account Identity
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[rgba(0,0,0,0.2)] border border-slate-200 dark:border-[rgba(255,255,255,0.04)] shadow-inner">
                  <span className="block text-[11px] text-slate-500 dark:text-white/40 font-bold uppercase tracking-wider mb-1">Unique Identifier</span>
                  <span className="block text-[13px] text-slate-900 dark:text-white font-mono tracking-widest">
                    {(profile as any)?.id || (profile as any)?.client_id || "Not Configured"}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[rgba(0,0,0,0.2)] border border-slate-200 dark:border-[rgba(255,255,255,0.04)] shadow-inner">
                  <span className="block text-[11px] text-slate-500 dark:text-white/40 font-bold uppercase tracking-wider mb-1">Environment</span>
                  <div className="flex items-center gap-2 mt-1">
                    {profile ? <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> : null}
                    <span className="text-[13px] text-slate-900 dark:text-white font-medium">
                      {profile ? "Production Network" : "Not Configured"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
