import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { WhatsAppPreview } from "@/components/whatsapp-preview";
import { X, CheckCircle2, Loader2, UploadCloud, Send, FileText, Globe, Tag, Activity } from "lucide-react";
import { Template, Contact } from "../types";
import { useTemplateRequirements, useContacts, useSendTemplate } from "../hooks/use-templates";

interface TemplateDetailsModalProps {
  template: Template;
  onClose: () => void;
}

export function TemplateDetailsModal({ template, onClose }: TemplateDetailsModalProps) {
  const { data: requirements, isLoading: isLoadingReqs } = useTemplateRequirements(template.template_id);
  const { data: contacts, isLoading: isLoadingContacts } = useContacts();
  const { mutate: sendTest, isPending: isSending } = useSendTemplate();

  const [selectedContact, setSelectedContact] = useState<string>("");
  const [params, setParams] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);


  const parsedContent = React.useMemo(() => {
    if (typeof template.content === 'string') {
      try {
        return JSON.parse(template.content);
      } catch {
        return null;
      }
    }
    return template.content;
  }, [template.content]);

  const requiresImage = parsedContent?.image === true || parsedContent?.header_type === 'IMAGE' || parsedContent?.header?.image === true;

  const hasParams = requiresImage || 
                    (!isLoadingReqs && requirements && requirements.length > 0) || 
                    (!isLoadingReqs && template.fields && template.fields.length > 0);

  const handleParamChange = (key: string, val: string) => {
    setParams(prev => ({ ...prev, [key]: val }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleParamChange('header_image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = () => {
    if (!selectedContact) return false;
    
    if (requiresImage && !params.header_image) {
      return false;
    }

    const textFields = Array.isArray(requirements) && requirements.length > 0 
      ? requirements.map((req: any) => ({ name: req.param_name, required: req.required }))
      : Array.isArray(template.fields) ? template.fields.map((f: string) => ({ name: f, required: true })) : [];
      
    for (const field of textFields) {
      if (field.name === 'header_image' || field.name?.toLowerCase().includes('image')) continue;
      if (field.required && !params[field.name]) {
        return false;
      }
    }

    return true;
  };

  const handleTestSend = () => {
    if (!isFormValid()) return;
    sendTest(
      {
        template_id: template.template_id,
        contact_id: selectedContact,
        parameters: params
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
        }
      }
    );
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Premium Modal Container */}
      <div className="relative w-full max-w-[1100px] w-[80vw] max-h-[90vh] flex flex-col bg-card border border-border rounded-3xl shadow-sm dark:shadow-2xl overflow-hidden animate-slide-up shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] transition-colors">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-border bg-secondary/60 shrink-0 transition-colors">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-foreground tracking-tight leading-none transition-colors">{template.template_name}</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest pt-1 transition-colors">
              <span>{template.category}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground transition-colors" />
              <span>{template.language}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground transition-colors" />
              <span className={`px-2 py-0.5 rounded-full border ${
                template.status.toLowerCase() === "approved" ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/10" : 
                template.status.toLowerCase() === "pending" ? "border-amber-500/20 text-amber-400 bg-amber-500/10" : 
                "border-rose-500/20 text-rose-400 bg-rose-500/10"
              }`}>{template.status}</span>
            </div>
            <p className="text-[10px] text-muted-foreground font-mono pt-1 transition-colors">Template ID: {template.template_id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all cursor-pointer bg-secondary border border-border"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT COLUMN: WhatsApp Preview (approx 40%) */}
            <div className="w-full lg:w-[40%] space-y-6 lg:sticky lg:top-0 h-fit">
              <div>
                <h3 className="text-sm font-black uppercase text-muted-foreground tracking-widest mb-4 transition-colors">Message Preview</h3>
                <WhatsAppPreview content={template.content} params={params} />
              </div>
            </div>

            {/* RIGHT COLUMN: Info, Parameters, Test Actions (approx 60%) */}
            <div className="w-full lg:w-[60%] space-y-8">
              
              {/* Template Information Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-secondary border border-border space-y-1 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2 transition-colors">
                    <Tag className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Category</span>
                  </div>
                  <p className="text-sm font-bold text-foreground truncate transition-colors">{template.category}</p>
                </div>
                <div className="p-4 rounded-2xl bg-secondary border border-border space-y-1 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2 transition-colors">
                    <Globe className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Language</span>
                  </div>
                  <p className="text-sm font-bold text-foreground truncate transition-colors">{template.language}</p>
                </div>
                <div className="p-4 rounded-2xl bg-secondary border border-border space-y-1 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2 transition-colors">
                    <FileText className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Format</span>
                  </div>
                  <p className="text-sm font-bold text-foreground truncate transition-colors">{template.parameter_format || "Named"}</p>
                </div>
                <div className="p-4 rounded-2xl bg-secondary border border-border space-y-1 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2 transition-colors">
                    <Activity className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Last Synced</span>
                  </div>
                  <p className="text-sm font-bold text-foreground truncate transition-colors">
                    {template.last_synced ? new Date(template.last_synced).toLocaleDateString() : "Never"}
                  </p>
                </div>
              </div>

              {/* Dynamic Parameters Form (Only renders if params exist) */}
              {hasParams && (
                <div>
                  <h3 className="text-sm font-black uppercase text-muted-foreground tracking-widest mb-4 flex items-center justify-between transition-colors">
                    <span>Dynamic Parameters</span>
                    {isLoadingReqs && <Loader2 className="h-4 w-4 animate-spin text-blue-400" />}
                  </h3>
                  <div className="space-y-4 bg-secondary/50 p-6 rounded-3xl border border-border transition-colors">
                    {/* Header Image Upload */}
                    {requiresImage && (
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-muted-foreground flex items-center gap-2 transition-colors">
                          Header Image
                          <span className="text-destructive text-[10px] uppercase font-black tracking-widest transition-colors">* Required</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <button type="button" className={`w-full h-12 rounded-xl bg-background border ${!params.header_image ? 'border-destructive/50 bg-destructive/5' : 'border-dashed border-border hover:border-primary/50 hover:bg-primary/5'} transition-all text-sm font-bold ${!params.header_image ? 'text-destructive' : 'text-primary'} flex items-center justify-center gap-2 relative`}>
                            <UploadCloud className="h-4 w-4" />
                            {params.header_image ? 'Image Uploaded' : 'Upload Media'}
                          </button>
                        </div>
                        {!params.header_image && (
                          <p className="text-destructive text-xs font-semibold mt-1 transition-colors">Header Image is required</p>
                        )}
                      </div>
                    )}

                    {/* Text Fields from Requirements or Fields */}
                    {Array.isArray(requirements) && requirements.length > 0 ? (
                      requirements.map((req: any, idx: number) => {
                        const paramName = req.param_name ? req.param_name.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) : "Unknown";
                        const isImageParam = req.param_name ? req.param_name.toLowerCase().includes("image") || req.param_type === "IMAGE" : false;
                        
                        if (isImageParam || req.param_name === 'header_image') return null; // handled above

                        return (
                          <div key={idx} className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground flex items-center gap-2 transition-colors">
                              {paramName}
                              {req.required && <span className="text-destructive text-[10px] uppercase font-black tracking-widest transition-colors">* Required</span>}
                            </label>
                            
                            <input
                              type="text"
                              value={params[req.param_name] || ""}
                              onChange={(e) => handleParamChange(req.param_name, e.target.value)}
                              placeholder={`Enter ${paramName}...`}
                              className="w-full h-12 rounded-xl bg-background border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                          </div>
                        );
                      })
                    ) : (
                      (Array.isArray(template.fields) ? template.fields : []).map((field, idx) => {
                        const paramName = field.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
                        const isImageParam = field.toLowerCase().includes("image");
                        
                        if (isImageParam || field === 'header_image') return null; // handled above

                        return (
                          <div key={idx} className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground capitalize transition-colors">{paramName}</label>
                            <input
                              type="text"
                              value={params[field] || ""}
                              onChange={(e) => handleParamChange(field, e.target.value)}
                              placeholder={`Enter ${paramName}...`}
                              className="w-full h-12 rounded-xl bg-background border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* Primary Dispatch Section */}
              <div className="pt-4 border-t border-border transition-colors">
                <h3 className="text-sm font-black uppercase text-blue-400 tracking-widest mb-2 flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Message Dispatch
                </h3>
                <p className="text-sm text-muted-foreground font-medium mb-6 transition-colors">
                  Dispatch this WhatsApp template directly to a verified contact. Delivery is immediate.
                </p>
                
                {isSuccess ? (
                  <div className="p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 text-center space-y-4 animate-scale-in">
                    <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-foreground transition-colors">Message Dispatched!</h4>
                      <p className="text-emerald-400 text-sm font-medium mt-1">Template delivered successfully.</p>
                    </div>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="mt-4 px-6 h-10 bg-secondary hover:bg-secondary/80 text-foreground text-sm font-bold rounded-xl border border-border transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <div className="p-6 rounded-3xl border border-blue-500/20 bg-blue-500/5 shadow-inner">
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-muted-foreground transition-colors">Select Contact</label>
                      {isLoadingContacts ? (
                        <div className="w-full h-12 rounded-xl bg-secondary border border-border animate-pulse transition-colors" />
                      ) : (
                        <div className="relative">
                          <select 
                            value={selectedContact}
                            onChange={(e) => setSelectedContact(e.target.value)}
                            className="w-full h-12 rounded-xl bg-background border border-border px-4 text-sm font-medium text-foreground focus:outline-none focus:border-blue-500/50 transition-colors appearance-none shadow-sm cursor-pointer hover:bg-secondary"
                          >
                            <option value="" disabled>Select a contact...</option>
                            {contacts?.map((c: Contact, idx) => {
                              const id = c.id || c.contact_id || String(idx);
                              const label = `${c.first_name || c.name || "Unknown"} (${c.mobile_number || c.phone || "No number"})`;
                              return (
                                <option key={id} value={id}>{label}</option>
                              );
                            })}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground transition-colors">
                            ▼
                          </div>
                        </div>
                      )}

                      <button 
                        onClick={handleTestSend}
                        disabled={isSending || !isFormValid()}
                        className="w-full h-14 mt-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all text-sm font-black tracking-wide text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3 border border-blue-500"
                      >
                        {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                        DISPATCH MESSAGE
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

