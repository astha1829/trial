import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Users, Check, ChevronDown, Search } from "lucide-react";
import { createContactSchema, CreateContactSchemaType } from "../schemas/create-contact.schema";
import { useCreateContact } from "../hooks/use-contacts";
import { useGroups } from "@/features/groups/hooks/use-groups";
import { FormFieldWrapper } from "@/features/auth/components/form-field-wrapper";
import { SubmitButton } from "@/features/auth/components/submit-button";

interface CreateContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LANGUAGES = [
  { value: "en_US", label: "English (US)" },
  { value: "en_GB", label: "English (UK)" },
  { value: "es_ES", label: "Spanish" },
  { value: "fr_FR", label: "French" },
  { value: "de_DE", label: "German" },
];

const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "IN", label: "India" },
  { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
];

export function CreateContactModal({ isOpen, onClose }: CreateContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [groupSearchQuery, setGroupSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const { mutate: createContact, isPending } = useCreateContact();
  const { data: groups, isLoading: isLoadingGroups } = useGroups();

  const form = useForm<CreateContactSchemaType>({
    resolver: zodResolver(createContactSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile_number: "",
      email: "",
      language_code: "en_US",
      country: "US",
      marketing_opt_in: false,
      group_ids: [],
    },
  });

  const { register, handleSubmit, control, formState: { errors, isValid }, reset, setValue, watch } = form;
  
  const selectedGroups = watch("group_ids") || [];

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleModalClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setGroupSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  const handleModalClose = () => {
    reset();
    setIsDropdownOpen(false);
    setGroupSearchQuery("");
    onClose();
  };

  const onSubmit = (data: CreateContactSchemaType) => {
    createContact(data, {
      onSuccess: () => {
        handleModalClose();
      },
    });
  };

  const toggleGroup = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      setValue("group_ids", selectedGroups.filter(id => id !== groupId), { shouldValidate: true, shouldDirty: true });
    } else {
      setValue("group_ids", [...selectedGroups, groupId], { shouldValidate: true, shouldDirty: true });
    }
  };

  const filteredGroups = groups?.filter(g => g.title.toLowerCase().includes(groupSearchQuery.toLowerCase())) || [];

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in select-none">
      {}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
        onClick={handleModalClose}
      />
      
      {}
      <div className="relative w-full max-w-[720px] max-h-[90vh] flex flex-col bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden animate-slide-up transition-colors">
        
        {}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border/50 bg-background shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary border border-border/50 text-foreground">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground tracking-tight leading-none">
                Create Contact
              </h2>
              <p className="text-[13px] text-muted-foreground mt-1.5">
                Add a new contact to your CRM
              </p>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border/50 transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col min-h-0" noValidate>
          <div className="overflow-y-auto px-8 py-6 bg-background space-y-10">
            
            {}
            <div className="space-y-6">
              <div className="border-b border-border/40 pb-2">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <FormFieldWrapper label="First Name *" htmlFor="first_name" error={errors.first_name?.message}>
                  <input
                    {...register("first_name")}
                    id="first_name"
                    type="text"
                    placeholder="e.g. Jane"
                    disabled={isPending}
                    className={`w-full h-11 px-3.5 rounded-lg border bg-background text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all disabled:opacity-50 ${
                      errors.first_name ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive" : "border-border/60 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper label="Last Name" htmlFor="last_name" error={errors.last_name?.message}>
                  <input
                    {...register("last_name")}
                    id="last_name"
                    type="text"
                    placeholder="e.g. Doe"
                    disabled={isPending}
                    className={`w-full h-11 px-3.5 rounded-lg border bg-background text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all disabled:opacity-50 ${
                      errors.last_name ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive" : "border-border/60 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper label="Mobile Number *" htmlFor="mobile_number" error={errors.mobile_number?.message}>
                  <input
                    {...register("mobile_number")}
                    id="mobile_number"
                    type="text"
                    placeholder="e.g. +1234567890"
                    disabled={isPending}
                    className={`w-full h-11 px-3.5 rounded-lg border bg-background text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all disabled:opacity-50 ${
                      errors.mobile_number ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive" : "border-border/60 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper label="Email" htmlFor="email" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    disabled={isPending}
                    className={`w-full h-11 px-3.5 rounded-lg border bg-background text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all disabled:opacity-50 ${
                      errors.email ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive" : "border-border/60 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                </FormFieldWrapper>
              </div>
            </div>

            {}
            <div className="space-y-6">
              <div className="border-b border-border/40 pb-2">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Contact Settings</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <FormFieldWrapper label="Language" htmlFor="language_code" error={errors.language_code?.message}>
                  <div className="relative">
                    <select
                      {...register("language_code")}
                      id="language_code"
                      disabled={isPending}
                      className={`w-full h-11 px-3.5 appearance-none rounded-lg border bg-background text-[15px] text-foreground focus:outline-none transition-all disabled:opacity-50 ${
                        errors.language_code ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive" : "border-border/60 focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                    >
                      {LANGUAGES.map(lang => (
                        <option key={lang.value} value={lang.value}>{lang.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </FormFieldWrapper>

                <FormFieldWrapper label="Country" htmlFor="country" error={errors.country?.message}>
                  <div className="relative">
                    <select
                      {...register("country")}
                      id="country"
                      disabled={isPending}
                      className={`w-full h-11 px-3.5 appearance-none rounded-lg border bg-background text-[15px] text-foreground focus:outline-none transition-all disabled:opacity-50 ${
                        errors.country ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive" : "border-border/60 focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                    >
                      {COUNTRIES.map(country => (
                        <option key={country.value} value={country.value}>{country.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </FormFieldWrapper>
              </div>

              {}
              <div className="relative" ref={dropdownRef}>
                <FormFieldWrapper label="Assigned Groups *" htmlFor="groups" error={errors.group_ids?.message}>
                  <div 
                    onClick={() => !isPending && setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full min-h-[44px] px-3.5 py-2 rounded-lg border bg-background text-[15px] text-foreground flex items-center justify-between cursor-pointer transition-all ${isPending ? 'opacity-50 cursor-not-allowed' : ''} ${
                      errors.group_ids ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive" : "border-border/60 hover:border-border"
                    }`}
                  >
                    <div className="flex flex-wrap gap-2">
                      {selectedGroups.length > 0 ? (
                        selectedGroups.map(id => {
                          const group = groups?.find(g => g.id === id);
                          return (
                            <span key={id} className="inline-flex items-center px-2 py-1 rounded bg-secondary border border-border/50 text-foreground text-xs font-medium">
                              {group?.title || "Unknown"}
                              <button 
                                type="button" 
                                onClick={(e) => { e.stopPropagation(); toggleGroup(id); }}
                                className="ml-1.5 text-muted-foreground hover:text-foreground focus:outline-none"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-muted-foreground/50">Select groups...</span>
                      )}
                    </div>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground/70 ml-2 shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </FormFieldWrapper>
                
                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-card border border-border/80 rounded-xl shadow-xl max-h-72 flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
                    <div className="p-2 border-b border-border/50 shrink-0">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={groupSearchQuery}
                          onChange={(e) => setGroupSearchQuery(e.target.value)}
                          placeholder="Search groups..."
                          className="w-full h-9 pl-9 pr-3 rounded-md bg-secondary/30 border border-transparent focus:border-primary/50 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                    
                    <div className="overflow-y-auto p-1.5 space-y-0.5">
                      {isLoadingGroups ? (
                        <div className="p-3 text-sm text-muted-foreground text-center">Loading groups...</div>
                      ) : filteredGroups.length === 0 ? (
                        <div className="p-3 text-sm text-muted-foreground text-center">No groups found</div>
                      ) : (
                        filteredGroups.map(group => {
                          const isSelected = selectedGroups.includes(group.id);
                          return (
                            <div
                              key={group.id}
                              onClick={() => toggleGroup(group.id)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-secondary/50' : 'hover:bg-secondary/30'}`}
                            >
                              <span className="text-[14px] font-medium text-foreground">{group.title}</span>
                              {isSelected && <Check className="h-4 w-4 text-foreground" />}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>

              {}
              <div className="p-4 rounded-xl border border-border/40 bg-secondary/10 flex items-start gap-4">
                <Controller
                  name="marketing_opt_in"
                  control={control}
                  render={({ field }) => (
                    <button
                      type="button"
                      role="switch"
                      aria-checked={field.value}
                      disabled={isPending}
                      onClick={() => field.onChange(!field.value)}
                      className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 mt-0.5 ${
                        field.value ? 'bg-primary' : 'bg-muted border border-border/50'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          field.value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}
                />
                <div className="flex flex-col gap-1">
                  <span className="text-[15px] font-semibold text-foreground leading-none">Marketing Opt-in</span>
                  <p className="text-[13px] text-muted-foreground leading-snug">
                    Subscribe this contact to marketing campaigns and promotional newsletters.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {}
          <div className="px-8 py-5 border-t border-border/50 bg-secondary/20 shrink-0 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleModalClose}
              disabled={isPending}
              className="h-10 px-6 rounded-lg bg-background border border-border hover:bg-secondary text-[14px] font-medium text-foreground transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <SubmitButton
              isLoading={isPending}
              loadingText="Creating..."
              className="h-10 px-8 min-w-[180px] rounded-lg bg-foreground text-background hover:bg-foreground/90 font-medium text-[14px]"
              disabled={isPending || !isValid || (selectedGroups?.length === 0)}
            >
              Create Contact
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
