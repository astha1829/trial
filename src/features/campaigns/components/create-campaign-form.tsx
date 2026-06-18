"use client";

import React, { useState, useEffect } from "react";
import { useGroups } from "@/features/groups/hooks/use-groups";
import { useTemplates } from "@/features/templates/hooks/use-templates";
import { useCreateCampaign } from "../hooks/use-campaigns";
import { useRouter } from "next/navigation";
import { Loader2, Rocket, Calendar as CalendarIcon, Clock, Smartphone, MessageSquare, ArrowRight, Check } from "lucide-react";

export function CreateCampaignForm() {
  const router = useRouter();
  
  const { data: groups, isLoading: isLoadingGroups } = useGroups();
  const { data: templates, isLoading: isLoadingTemplates } = useTemplates();
  const { mutateAsync: createCampaign, isPending: isCreating } = useCreateCampaign();

  const [title, setTitle] = useState("");
  const [groupId, setGroupId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");
  const [parameters, setParameters] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const selectedTemplate = templates?.find((t: any) => t.template_id === templateId);

  useEffect(() => {
    if (selectedTemplate) {
      const initialParams: Record<string, string> = {};
      if ((selectedTemplate.content as any)?.image) {
        initialParams['header_image'] = "";
      }
      if (selectedTemplate.fields && Array.isArray(selectedTemplate.fields)) {
        selectedTemplate.fields.forEach((p: any) => {
          const paramName = typeof p === 'string' ? p : p?.name || String(p);
          initialParams[paramName] = "";
        });
      }
      setParameters(initialParams);
    } else {
      setParameters({});
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (groups) {

      const mappedGroups = groups.map((g: any) => ({
        value: g.id,
        label: g.title || g.name || "Unnamed Group"
      }));

    }
  }, [groups]);

  useEffect(() => {
    if (templates) {

      const options = templates.map((t: any) => ({
        value: t.template_id,
        label: t.template_name
      }));

    }
  }, [templates]);

  const handleParamChange = (param: string, value: string) => {
    setFormErrors([]);
    setParameters((prev) => ({ ...prev, [param]: value }));
  };

  const handleNextStep = () => {
    setFormErrors([]);
    if (step === 2) {
      const missingParams: string[] = [];
      if ((selectedTemplate?.content as any)?.image && !parameters['header_image']) {
        missingParams.push("Header Image URL");
      }
      if (selectedTemplate?.fields) {
        selectedTemplate.fields.forEach((p: any) => {
          const field = typeof p === 'string' ? p : p?.name || String(p);
          if (!parameters[field]) {
            const humanLabel = field.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            missingParams.push(humanLabel);
          }
        });
      }
      if (missingParams.length > 0) {
        setFormErrors([`Missing required parameters: ${missingParams.join(", ")}`]);
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);
    if (!title || !groupId || !templateId) return;

    if (isScheduled) {
      if (!scheduledAt) {
        setFormErrors(["Please select a valid date and time for scheduling."]);
        return;
      }
      if (new Date(scheduledAt) <= new Date()) {
        setFormErrors(["Scheduled date and time must be in the future."]);
        return;
      }
    }

    try {
      const payload = {
        title,
        group_id: groupId,
        template_id: templateId,
        is_scheduled: isScheduled,
        ...(isScheduled ? { scheduled_at: new Date(scheduledAt).toISOString() } : {}),
        parameters,
      };



      const res = await createCampaign(payload);
      if (res && res.data && res.data.id) {
        router.push(`/campaigns/${res.data.id}`);
      } else {
        router.push(`/campaigns`);
      }
    } catch (error) {
      // toast is handled in mutation
    }
  };

  const getPreviewBody = () => {
    if (!(selectedTemplate?.content as any)?.body) return "Select a template to view preview.";
    let bodyText = (selectedTemplate?.content as any)?.body;
    Object.keys(parameters).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      bodyText = bodyText.replace(regex, parameters[key] || `{{${key}}}`);
    });
    return bodyText;
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] bg-[#050816] flex flex-col pt-0 pb-0 px-4 sm:px-8 xl:px-12 overflow-hidden">
      <div className="w-[95%] max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 h-full min-h-0 pt-6 pb-6">
        
        {/* FORM SECTION */}
        <div className="flex-1 min-w-0 flex flex-col">
          <form onSubmit={handleSubmit} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 sm:p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col relative overflow-hidden h-full flex-1 min-h-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Header */}
            <div className="mb-10 relative z-10 shrink-0">
              <h1 className="text-[42px] font-black text-white tracking-tight leading-none flex items-center gap-4">
                <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <Rocket className="w-7 h-7 text-indigo-400" />
                </div>
                Create Campaign
              </h1>
              <p className="text-[16px] font-medium text-white/50 mt-4 ml-1">Create and launch WhatsApp campaigns in minutes.</p>
            </div>

            <div className="flex-1 min-h-0 flex flex-col relative z-10">
              {/* Steps Indicator */}
              <div className="flex items-center gap-2 sm:gap-4 mb-8 shrink-0 border-b border-[rgba(255,255,255,0.05)] pb-6">
                {[
                  { num: 1, label: "Audience" },
                  { num: 2, label: "Template" },
                  { num: 3, label: "Delivery" }
                ].map((s, i) => (
                  <div key={s.num} className="flex items-center gap-2 sm:gap-4">
                    <div className={`flex items-center gap-2.5 transition-colors duration-300 ${step === s.num ? 'text-indigo-400' : step > s.num ? 'text-emerald-400' : 'text-white/30'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold border transition-all duration-300 ${
                        step === s.num ? 'bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 
                        step > s.num ? 'bg-emerald-500/20 border-emerald-500/50' : 
                        'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)]'
                      }`}>
                        {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                      </div>
                      <span className="font-semibold text-[14px] hidden sm:block tracking-wide">{s.label}</span>
                    </div>
                    {i < 2 && (
                      <div className={`w-8 sm:w-16 h-[2px] rounded-full transition-colors duration-300 ${step > s.num ? 'bg-emerald-500/30' : 'bg-[rgba(255,255,255,0.05)]'}`} />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-4 space-y-8">
                {/* STEP 1: Audience */}
                <div className={`space-y-8 transition-all duration-500 ${step === 1 ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}`}>
                  {/* Title */}
                  <div>
                    <label className="block text-[12px] font-bold text-white/60 uppercase tracking-wider mb-2">Campaign Title</label>
                    <input
                      required={step === 1}
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Black Friday Promo"
                      className="w-full h-[52px] px-4 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.08)] text-white text-[15px] focus:outline-none focus:border-indigo-500/50 focus:bg-[rgba(255,255,255,0.05)] focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
                    />
                  </div>

                  {/* Group */}
                  <div>
                    <label className="block text-[12px] font-bold text-white/60 uppercase tracking-wider mb-2">Target Group</label>
                    <select
                      required={step === 1}
                      value={groupId}
                      onChange={(e) => setGroupId(e.target.value)}
                      className="w-full h-[52px] px-4 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.08)] text-white text-[15px] focus:outline-none focus:border-indigo-500/50 focus:bg-[rgba(255,255,255,0.05)] focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 appearance-none"
                    >
                      <option value="" disabled className="bg-gray-900">Select a target group...</option>
                      {groups?.map((g: any) => (
                        <option key={g.id} value={g.id} className="bg-gray-900">{g.title || g.name || "Unnamed Group"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* STEP 2: Template */}
                <div className={`space-y-8 transition-all duration-500 ${step === 2 ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}`}>
                  {/* Template */}
                  <div>
                    <label className="block text-[12px] font-bold text-white/60 uppercase tracking-wider mb-2">Message Template</label>
                    <select
                      required={step === 2}
                      value={templateId}
                      onChange={(e) => setTemplateId(e.target.value)}
                      className="w-full h-[52px] px-4 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.08)] text-white text-[15px] focus:outline-none focus:border-indigo-500/50 focus:bg-[rgba(255,255,255,0.05)] focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 appearance-none"
                    >
                      <option value="" disabled className="bg-gray-900">Select a template...</option>
                      {templates?.map((t: any) => (
                        <option key={t.template_id} value={t.template_id} className="bg-gray-900">{t.template_name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Parameters */}
                  {selectedTemplate && ((selectedTemplate.fields?.length > 0) || (selectedTemplate.content as any)?.image) ? (
                    <div className="p-6 rounded-2xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.04)] shadow-inner space-y-5">
                      <h3 className="text-[14px] font-bold text-white tracking-wide flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-indigo-400" /> Template Parameters
                      </h3>
                      
                      {(selectedTemplate.content as any)?.image && (
                        <div>
                          <label className="block text-[12px] font-bold text-white/50 uppercase tracking-wider mb-2">Header Image URL</label>
                          <input
                            required={step === 2}
                            type="text"
                            value={parameters['header_image'] || ""}
                            onChange={(e) => handleParamChange('header_image', e.target.value)}
                            placeholder={`Enter Header Image URL`}
                            className="w-full h-[48px] px-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-white text-[14px] focus:outline-none focus:border-indigo-500/50 focus:bg-[rgba(255,255,255,0.05)] focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
                          />
                        </div>
                      )}

                      {selectedTemplate.fields?.map((p: any) => {
                        const paramName = typeof p === 'string' ? p : p?.name || String(p);
                        const humanLabel = paramName.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                        return (
                        <div key={paramName}>
                          <label className="block text-[12px] font-bold text-white/50 uppercase tracking-wider mb-2">{humanLabel}</label>
                          <input
                            required={step === 2}
                            type="text"
                            value={parameters[paramName] || ""}
                            onChange={(e) => handleParamChange(paramName, e.target.value)}
                            placeholder={`Enter ${humanLabel}`}
                            className="w-full h-[48px] px-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-white text-[14px] focus:outline-none focus:border-indigo-500/50 focus:bg-[rgba(255,255,255,0.05)] focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
                          />
                        </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>

                {/* STEP 3: Delivery */}
                <div className={`space-y-8 transition-all duration-500 ${step === 3 ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}`}>
                  {/* Schedule */}
                  <div className="p-6 rounded-2xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.04)] shadow-inner">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <label className="block text-[15px] font-bold text-white tracking-wide">Schedule Delivery</label>
                        <span className="text-[13px] text-white/40">Send immediately or pick a future date and time.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsScheduled(!isScheduled)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isScheduled ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-[rgba(255,255,255,0.1)]'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${isScheduled ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                    
                    {isScheduled && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <input
                          required={step === 3}
                          type="datetime-local"
                          value={scheduledAt}
                          onChange={(e) => setScheduledAt(e.target.value)}
                          className="w-full h-[52px] px-4 rounded-xl bg-[rgba(0,0,0,0.2)] border border-indigo-500/30 text-white text-[15px] focus:outline-none focus:border-indigo-400 focus:bg-[rgba(0,0,0,0.6)] focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {formErrors.length > 0 && (
                <div className="mb-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <ul className="list-disc pl-4 space-y-1 font-medium">
                    {formErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Wizard Footer Actions */}
              <div className="pt-4 mt-2 flex items-center justify-between border-t border-[rgba(255,255,255,0.05)] shrink-0">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  className="px-6 h-[48px] rounded-xl bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white font-semibold transition-all disabled:opacity-0"
                >
                  Back
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={(step === 1 && (!title || !groupId)) || (step === 2 && (!templateId))}
                    className="px-8 h-[48px] rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-400 font-bold transition-all disabled:opacity-50 flex items-center gap-2 group"
                  >
                    Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isCreating || (isScheduled && (!scheduledAt || new Date(scheduledAt) <= new Date()))}
                    className="px-8 h-[48px] rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 hover:from-indigo-400 hover:via-purple-400 hover:to-violet-400 text-white font-bold text-[15px] shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-500 disabled:opacity-50 flex items-center gap-2 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12" />
                    {isCreating ? (
                      <><Loader2 className="w-4 h-4 animate-spin relative z-10" /> <span className="relative z-10">Launching...</span></>
                    ) : (
                      <span className="relative z-10 flex items-center gap-2"><Rocket className="w-4 h-4" /> {isScheduled ? "Schedule Campaign" : "Launch Campaign"}</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* PREVIEW SECTION (WhatsApp style) */}
        <div className="lg:w-[460px] xl:w-[500px] shrink-0 h-full flex flex-col">
          <div className="bg-[rgba(11,18,40,0.6)] rounded-[32px] border border-[rgba(255,255,255,0.08)] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col h-full flex-1 p-3">
            <div className="bg-[#0B141A] rounded-[24px] border border-[#202C33] overflow-hidden flex flex-col h-full shadow-inner relative">
              
              {/* Phone Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[24px] bg-[#202C33] rounded-b-[16px] z-20 flex items-end justify-center pb-1 gap-2 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-black/50" />
                <div className="w-8 h-1.5 rounded-full bg-black/50" />
              </div>

              {/* WhatsApp Header */}
              <div className="bg-[#202C33] px-6 pt-8 pb-4 flex items-center gap-4 z-10 shadow-md">
                <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-[#8696A0]" />
                </div>
                <div>
                  <div className="text-[#E9EDEF] text-[16px] font-bold tracking-wide">Message Preview</div>
                  <div className="text-[#8696A0] text-[13px]">WhatsApp Business</div>
                </div>
              </div>

              {/* Chat Background */}
              <div className="flex-1 p-6 bg-[#0B141A] relative overflow-y-auto custom-scrollbar flex flex-col">
                {/* Fixed background image pattern */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'url("https://static.whatsapp.net/rsrc.php/v3/yl/r/rro_2R-YJ8N.png")', opacity: 0.15, backgroundSize: 'cover' }} />
                
                {!templateId ? (
                  <div className="flex-1 relative flex flex-col justify-end pb-8">
                    {/* Simulated Empty State Mockup */}
                    <div className="bg-[#202C33] rounded-[12px] p-3 max-w-[85%] relative z-10 shadow-lg ml-auto opacity-40 blur-[1px]">
                      {/* Tail */}
                      <div className="absolute top-0 -right-2 w-3 h-3 bg-[#202C33]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                      <div className="px-1.5 pb-1">
                        <div className="text-[#E9EDEF] text-[15px] leading-[1.4]">
                          Hey! This is a preview placeholder. Select a template to see how your actual message will look here. 👋
                        </div>
                        <div className="flex justify-end mt-1.5">
                          <span className="text-[#8696A0] text-[11px] font-medium">11:59 AM</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#202C33] rounded-[12px] p-3 max-w-[85%] relative z-10 shadow-lg mt-4 opacity-70">
                      {/* Tail */}
                      <div className="absolute top-0 -left-2 w-3 h-3 bg-[#202C33]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                      <div className="px-1.5 pb-1">
                        <div className="text-[#E9EDEF] text-[15px] font-bold mb-2">
                          Special Offer Inside! 🎁
                        </div>
                        <div className="text-[#E9EDEF] text-[15px] leading-[1.4] whitespace-pre-wrap">
                          Select a template from the Campaign Builder to preview your interactive WhatsApp message.
                        </div>
                        <div className="text-[#8696A0] text-[13px] mt-2">
                          Reply STOP to opt out
                        </div>
                        <div className="flex justify-end mt-1.5">
                          <span className="text-[#8696A0] text-[11px] font-medium">12:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#202C33] rounded-[12px] p-3 max-w-[95%] relative z-10 shadow-sm mt-4">
                    {/* Tail */}
                    <div className="absolute top-0 -left-2 w-3 h-3 bg-[#202C33]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                    
                    <div className="px-1.5 pb-1">
                      {(selectedTemplate?.content as any)?.image && parameters['header_image'] && (
                        <div className="w-full h-32 bg-[rgba(255,255,255,0.05)] rounded-lg mb-2 overflow-hidden flex items-center justify-center">
                          <img src={parameters['header_image']} alt="Header" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        </div>
                      )}

                      {(selectedTemplate?.content as any)?.header && (
                        <div className="text-[#E9EDEF] text-[15px] font-bold mb-2">
                          {(selectedTemplate?.content as any)?.header}
                        </div>
                      )}
                      
                      <div className="text-[#E9EDEF] text-[15px] leading-[1.4] whitespace-pre-wrap">
                        {getPreviewBody()}
                      </div>
                      
                      {(selectedTemplate?.content as any)?.footer && (
                        <div className="text-[#8696A0] text-[13px] mt-2">
                          {(selectedTemplate?.content as any)?.footer}
                        </div>
                      )}

                      <div className="flex justify-end mt-1.5">
                        <span className="text-[#8696A0] text-[11px] font-medium">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
